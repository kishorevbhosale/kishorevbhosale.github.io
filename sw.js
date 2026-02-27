/**
 * Tech Preparation Zone — Service Worker
 * Strategy:
 *   - Static assets (CSS, JS, fonts, images): cache-first, then network fallback
 *   - Article pages (.html): stale-while-revalidate (serve cache immediately, update in background)
 *   - External CDN resources: cache-first with long TTL
 */

'use strict';

var CACHE_VERSION = 'pz-v3';
var STATIC_CACHE  = CACHE_VERSION + '-static';
var PAGES_CACHE   = CACHE_VERSION + '-pages';

var CORE_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/images/favicon.png'
];

/* ── Install: pre-cache core assets ── */
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(STATIC_CACHE).then(function (cache) {
            return cache.addAll(CORE_ASSETS);
        }).then(function () {
            return self.skipWaiting();
        })
    );
});

/* ── Activate: purge old caches ── */
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (keys) {
            return Promise.all(
                keys.filter(function (key) {
                    return key !== STATIC_CACHE && key !== PAGES_CACHE;
                }).map(function (key) {
                    return caches.delete(key);
                })
            );
        }).then(function () {
            return self.clients.claim();
        })
    );
});

/* ── Fetch: routing logic ── */
self.addEventListener('fetch', function (event) {
    var req = event.request;

    // Only handle GET requests
    if (req.method !== 'GET') return;

    var url = new URL(req.url);

    // Skip non-same-origin requests except CDN assets we trust
    var isSameOrigin = url.origin === self.location.origin;
    var isTrustedCDN = url.hostname === 'cdn.jsdelivr.net' ||
                       url.hostname === 'cdnjs.cloudflare.com' ||
                       url.hostname === 'fonts.googleapis.com' ||
                       url.hostname === 'fonts.gstatic.com';

    if (!isSameOrigin && !isTrustedCDN) return;

    var path = url.pathname;

    /* CDN resources: cache-first (they are versioned, rarely change) */
    if (isTrustedCDN) {
        event.respondWith(cacheFirst(req, STATIC_CACHE));
        return;
    }

    /* Local static assets: cache-first */
    if (path.match(/\.(css|js|png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf)$/)) {
        event.respondWith(cacheFirst(req, STATIC_CACHE));
        return;
    }

    /* HTML article pages: stale-while-revalidate */
    if (path.endsWith('.html') || path === '/' || path === '/index.html') {
        event.respondWith(staleWhileRevalidate(req, PAGES_CACHE));
        return;
    }

    /* Everything else: network-first */
    event.respondWith(networkFirst(req, PAGES_CACHE));
});

/* ─────────────────────────────────────────────
   Caching strategy helpers
───────────────────────────────────────────── */

/** Serve from cache; fetch & store on miss */
function cacheFirst(req, cacheName) {
    return caches.open(cacheName).then(function (cache) {
        return cache.match(req).then(function (cached) {
            if (cached) return cached;
            return fetch(req).then(function (response) {
                if (response && response.ok) cache.put(req, response.clone());
                return response;
            }).catch(function () {
                return new Response('', { status: 503, statusText: 'Offline' });
            });
        });
    });
}

/** Serve stale cache immediately; update cache in background */
function staleWhileRevalidate(req, cacheName) {
    return caches.open(cacheName).then(function (cache) {
        return cache.match(req).then(function (cached) {
            var fetchPromise = fetch(req).then(function (response) {
                if (response && response.ok) cache.put(req, response.clone());
                return response;
            }).catch(function () { return cached; });
            return cached || fetchPromise;
        });
    });
}

/** Try network; fall back to cache */
function networkFirst(req, cacheName) {
    return fetch(req).then(function (response) {
        if (response && response.ok) {
            caches.open(cacheName).then(function (cache) {
                cache.put(req, response.clone());
            });
        }
        return response;
    }).catch(function () {
        return caches.match(req).then(function (cached) {
            return cached || new Response('', { status: 503, statusText: 'Offline' });
        });
    });
}
