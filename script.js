/**
 * Tech Preparation Zone — Main JavaScript
 * Handles theme toggle, search, navigation, breadcrumbs, and UI interactions
 */

(function () {
    'use strict';

    // ============================================
    // Theme Management
    // ============================================
    const ThemeManager = {
        init: function () {
            const savedTheme = localStorage.getItem('theme') || 'light';
            this.setTheme(savedTheme);

            const themeToggle = document.getElementById('themeToggle');
            const themeToggleMobile = document.getElementById('themeToggleMobile');

            if (themeToggle) themeToggle.addEventListener('click', () => this.toggleTheme());
            if (themeToggleMobile) themeToggleMobile.addEventListener('click', () => this.toggleTheme());
        },

        setTheme: function (theme) {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);

            document.querySelectorAll('#themeIcon, #themeIconMobile').forEach(function (icon) {
                if (icon) icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
            });
        },

        toggleTheme: function () {
            var currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            this.setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        }
    };

    // ============================================
    // Search Functionality
    // ============================================
    const SearchManager = {
        searchData: [],

        init: function () {
            var searchInput = document.getElementById('searchInput');
            var searchResults = document.getElementById('searchResults');
            var searchInputMobile = document.getElementById('searchInputMobile');
            var searchResultsMobile = document.getElementById('searchResultsMobile');

            if (searchInput && searchResults) this.initializeSearch(searchInput, searchResults);
            if (searchInputMobile && searchResultsMobile) this.initializeSearch(searchInputMobile, searchResultsMobile);
        },

        initializeSearch: function (input, results) {
            this.buildSearchIndex();
            var self = this;

            input.addEventListener('input', function (e) {
                self.handleSearch(e.target.value, results);
            });

            input.addEventListener('focus', function () {
                if (input.value.trim()) results.classList.add('show');
            });

            document.addEventListener('click', function (e) {
                if (!input.contains(e.target) && !results.contains(e.target)) {
                    results.classList.remove('show');
                }
            });

            input.addEventListener('keydown', function (e) {
                if (e.key === 'Escape') {
                    results.classList.remove('show');
                    input.blur();
                }
            });
        },

        buildSearchIndex: function () {
            var links = document.querySelectorAll('.sidebar-link');
            this.searchData = [];
            var self = this;

            links.forEach(function (link) {
                var text = link.textContent.trim();
                var href = link.getAttribute('href');
                var icon = link.querySelector('i');
                var iconClass = icon ? icon.className : '';

                if (href && href.startsWith('#')) href = href.substring(1);

                if (text && href && !href.includes('under_construction')) {
                    self.searchData.push({
                        title: text,
                        url: href,
                        icon: iconClass,
                        keywords: text.toLowerCase().split(/\s+/)
                    });
                }
            });
        },

        handleSearch: function (query, resultsContainer) {
            var searchTerm = query.toLowerCase().trim();
            if (searchTerm.length < 2) {
                resultsContainer.classList.remove('show');
                resultsContainer.innerHTML = '';
                return;
            }

            var results = this.searchData.filter(function (item) {
                return item.keywords.some(function (kw) { return kw.includes(searchTerm); }) ||
                    item.title.toLowerCase().includes(searchTerm);
            }).slice(0, 10);

            this.displayResults(results, searchTerm, resultsContainer);
        },

        displayResults: function (results, searchTerm, resultsContainer) {
            if (results.length === 0) {
                resultsContainer.innerHTML = '<div class="search-result-item"><p class="mb-0 text-muted">No results found for "' + searchTerm + '"</p></div>';
                resultsContainer.classList.add('show');
                return;
            }

            var html = '';
            var self = this;
            results.forEach(function (result) {
                var highlightedTitle = self.highlightText(result.title, searchTerm);
                html += '<div class="search-result-item" role="button" tabindex="0" data-url="' + result.url + '" onclick="PageLoader.loadPageFromUrl(\'' + result.url + '\'); SearchManager.closeSearch();">' +
                    '<i class="' + result.icon + '" aria-hidden="true"></i>' +
                    '<span>' + highlightedTitle + '</span></div>';
            });

            resultsContainer.innerHTML = html;
            resultsContainer.classList.add('show');

            var resultItems = resultsContainer.querySelectorAll('.search-result-item');
            var closeFn = this.closeSearch.bind(this);
            resultItems.forEach(function (item, index) {
                item.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter') {
                        var url = item.getAttribute('data-url');
                        if (url) { PageLoader.loadPageFromUrl(url); closeFn(); }
                    } else if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        if (resultItems[index + 1]) resultItems[index + 1].focus();
                    } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        if (resultItems[index - 1]) resultItems[index - 1].focus();
                    } else if (e.key === 'Escape') {
                        closeFn();
                    }
                });
            });
        },

        closeSearch: function () {
            document.querySelectorAll('.search-results').forEach(function (r) { r.classList.remove('show'); });
            document.querySelectorAll('#searchInput, #searchInputMobile').forEach(function (input) {
                if (input) { input.value = ''; input.blur(); }
            });
        },

        highlightText: function (text, searchTerm) {
            var regex = new RegExp('(' + searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
            return text.replace(regex, '<span class="search-highlight">$1</span>');
        }
    };

    // ============================================
    // Header Manager
    // ============================================
    const HeaderManager = {
        init: function () {
            var mobileSearch = document.getElementById('searchInputMobile');
            if (mobileSearch) {
                mobileSearch.addEventListener('focus', function () {
                    document.body.classList.add('has-mobile-search');
                });
                mobileSearch.addEventListener('blur', function () {
                    setTimeout(function () {
                        var mobilResults = document.getElementById('searchResultsMobile');
                        if (document.activeElement !== mobileSearch && !(mobilResults && mobilResults.contains(document.activeElement))) {
                            document.body.classList.remove('has-mobile-search');
                        }
                    }, 200);
                });
            }
        }
    };

    // ============================================
    // Back to Top
    // ============================================
    const BackToTop = {
        button: null,

        init: function () {
            this.button = document.getElementById('backToTop');
            if (!this.button) return;
            var self = this;
            window.addEventListener('scroll', function () { self.handleScroll(); }, { passive: true });
            this.button.addEventListener('click', function () {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        },

        handleScroll: function () {
            if (window.pageYOffset > 300) this.button.classList.add('show');
            else this.button.classList.remove('show');
        }
    };

    // ============================================
    // Sidebar Management
    // ============================================
    const SidebarManager = {
        init: function () {
            var toggleBtn = document.getElementById('sidebarToggle');
            var sidebar = document.querySelector('.left-panel');
            if (!toggleBtn || !sidebar) return;

            toggleBtn.addEventListener('click', function () {
                var isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
                toggleBtn.setAttribute('aria-expanded', !isExpanded);
                sidebar.classList.toggle('show');
            });

            document.querySelectorAll('.left-panel a').forEach(function (link) {
                link.addEventListener('click', function () {
                    if (window.innerWidth < 768) {
                        sidebar.classList.remove('show');
                        toggleBtn.setAttribute('aria-expanded', 'false');
                    }
                });
            });

            document.addEventListener('click', function (e) {
                if (window.innerWidth < 768 && sidebar.classList.contains('show') &&
                    !sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
                    sidebar.classList.remove('show');
                    toggleBtn.setAttribute('aria-expanded', 'false');
                }
            });
        }
    };

    // ============================================
    // Breadcrumb Generator
    // ============================================
    const BreadcrumbGenerator = {
        categoryMap: {
            'java': 'Java',
            'oops': 'OOPs',
            'solid': 'SOLID Principles',
            'design_pattern': 'Design Patterns',
            'creational': 'Creational Patterns',
            'db': 'Databases',
            'dsa': 'DSA',
            'coding': 'Coding',
            'system_design_theory': 'System Design Theory',
            'system_design_example': 'System Design Examples',
            'low_level_design': 'Low-Level Design',
            'microservices': 'Microservices',
            'spring_boot': 'Spring Boot',
            'devops': 'DevOps & CI/CD',
            'ddia': 'DDIA',
            'general': 'General Concepts',
            'api_design': 'API Design',
            'interview': 'Interview Prep',
            'papers': 'Papers & Blogs',
            'pocs': 'Proof of Concepts',
            'resources': 'Resources',
            'pages': null
        },

        generate: function (url) {
            if (!url) return '';
            var parts = url.replace(/^design\/pages\//, '').replace(/\.html$/, '').split('/');
            var breadcrumbs = '<nav class="breadcrumb-nav" aria-label="Breadcrumb">';
            breadcrumbs += '<a href="/index.html"><i class="bi bi-house-fill"></i> Home</a>';

            for (var i = 0; i < parts.length; i++) {
                var part = parts[i];
                var label = this.categoryMap[part] || this.formatLabel(part);
                if (!label) continue;
                breadcrumbs += '<span class="separator"><i class="bi bi-chevron-right"></i></span>';
                if (i === parts.length - 1) {
                    breadcrumbs += '<span class="current">' + label + '</span>';
                } else {
                    breadcrumbs += '<span>' + label + '</span>';
                }
            }
            breadcrumbs += '</nav>';
            return breadcrumbs;
        },

        formatLabel: function (slug) {
            return slug.replace(/[-_]/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); });
        }
    };

    // ============================================
    // Page Loading
    // ============================================
    const PageLoader = {
        init: function () {
            document.querySelectorAll('.sidebar-link').forEach(function (link) {
                link.addEventListener('click', function (e) { PageLoader.loadPage(e); });
            });

            window.addEventListener('popstate', function (e) {
                if (e.state && e.state.pageUrl) PageLoader.fetchContent(e.state.pageUrl);
            });

            var hashPath = window.location.hash.substring(1);
            if (hashPath) {
                var contentPath = hashPath;
                if (hashPath.includes('index.html#')) {
                    var hParts = hashPath.split('#');
                    contentPath = hParts.length > 1 ? hParts[hParts.length - 1] : hashPath.replace('index.html', '');
                }
                if (contentPath) this.fetchContent(contentPath);
            }
        },

        loadPage: function (event) {
            event.preventDefault();
            var link = event.currentTarget;
            var pageUrl = link.getAttribute('href');
            if (!pageUrl) return;

            if (pageUrl.startsWith('#')) pageUrl = pageUrl.substring(1);
            if (pageUrl.includes('#') && pageUrl.includes('index.html')) pageUrl = pageUrl.split('#')[1];
            if (!pageUrl || pageUrl === '#') return;

            this.loadPageFromUrl(pageUrl);

            document.querySelectorAll('.sidebar-link').forEach(function (l) { l.classList.remove('active'); });
            link.classList.add('active');
        },

        loadPageFromUrl: function (pageUrl) {
            if (pageUrl.startsWith('#')) pageUrl = pageUrl.substring(1);
            this.fetchContent(pageUrl);

            var hashUrl = pageUrl.startsWith('#') ? pageUrl : '#' + pageUrl;
            history.pushState({ pageUrl: pageUrl }, '', hashUrl);

            var rightPanel = document.querySelector('.right-panel');
            if (rightPanel) rightPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        },

        fetchContent: function (url) {
            var contentDiv = document.getElementById('content');
            if (!contentDiv) return;

            fetch(url)
                .then(function (response) {
                    if (!response.ok) throw new Error('Failed to load page: ' + response.status + ' ' + response.statusText);
                    return response.text();
                })
                .then(function (data) {
                    PageLoader.cleanupPageStyles();
                    var extractedContent = PageLoader.extractBodyContent(data);
                    var breadcrumb = BreadcrumbGenerator.generate(url);

                    contentDiv.innerHTML = breadcrumb + extractedContent;
                    PageLoader.initializePageContent();

                    PageLoader.highlightActiveLink(url);
                })
                .catch(function (error) {
                    contentDiv.innerHTML = '<div class="alert alert-danger" role="alert">' +
                        '<h4 class="alert-heading"><i class="bi bi-exclamation-triangle-fill me-2"></i>Error Loading Content</h4>' +
                        '<p>Unable to load the requested page: ' + error.message + '</p>' +
                        '<p class="mb-0"><small>URL: ' + url + '</small></p></div>';
                });
        },

        highlightActiveLink: function (url) {
            document.querySelectorAll('.sidebar-link').forEach(function (link) {
                var href = link.getAttribute('href') || '';
                link.classList.toggle('active', href.includes(url));
            });
        },

        cleanupPageStyles: function () {
            document.querySelectorAll('style[data-page-specific]').forEach(function (s) { s.remove(); });
        },

        extractBodyContent: function (html) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, 'text/html');

            var headTag = doc.querySelector('head');
            var pageStyles = '';
            if (headTag) {
                headTag.querySelectorAll('style').forEach(function (style) {
                    pageStyles += style.outerHTML;
                });
            }

            var bodyTag = doc.querySelector('body');
            if (bodyTag) {
                var bodyClone = bodyTag.cloneNode(true);
                var header = bodyClone.querySelector('header');
                var footer = bodyClone.querySelector('footer');
                var backToTop = bodyClone.querySelector('#backToTop, .back-to-top');
                var navbarP = bodyClone.querySelector('#navbar-placeholder, [id*="navbar"]');

                if (header) header.remove();
                if (footer) footer.remove();
                if (backToTop) backToTop.remove();
                if (navbarP) navbarP.remove();

                var bodyContent = bodyClone.innerHTML;
                bodyContent = bodyContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

                if (!bodyContent.trim()) {
                    var sections = bodyClone.querySelectorAll('section, main, article, .container');
                    if (sections.length > 0) {
                        bodyContent = Array.from(sections).map(function (s) { return s.outerHTML; }).join('');
                    }
                }

                if (pageStyles) {
                    pageStyles = pageStyles.replace(/<style([^>]*)>/gi, '<style$1 data-page-specific>');
                    bodyContent = pageStyles + bodyContent;
                }
                return bodyContent;
            }

            var container = doc.querySelector('.container, .content, main, article');
            if (container) {
                var cnt = container.innerHTML;
                if (pageStyles) {
                    pageStyles = pageStyles.replace(/<style([^>]*)>/gi, '<style$1 data-page-specific>');
                    cnt = pageStyles + cnt;
                }
                return cnt;
            }

            var content = html;
            content = content.replace(/<!DOCTYPE[^>]*>/gi, '');
            content = content.replace(/<html[^>]*>/gi, '');
            content = content.replace(/<\/html>/gi, '');
            var headMatch = content.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
            if (headMatch) {
                var styleMatch = headMatch[1].match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
                if (styleMatch) pageStyles = styleMatch.join('');
            }
            content = content.replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '');
            content = content.replace(/<body[^>]*>/gi, '');
            content = content.replace(/<\/body>/gi, '');
            content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

            if (pageStyles) {
                pageStyles = pageStyles.replace(/<style([^>]*)>/gi, '<style$1 data-page-specific>');
                content = pageStyles + content;
            }
            return content;
        },

        initializePageContent: function () {
            this.ensureActionBar();

            document.querySelectorAll('#content img:not([loading])').forEach(function (img) {
                img.setAttribute('loading', 'lazy');
                if (!img.hasAttribute('alt')) img.setAttribute('alt', 'Content image');
                if (!img.classList.contains('responsive-image') && !img.hasAttribute('width')) {
                    img.style.maxWidth = '100%';
                    img.style.height = 'auto';
                }
            });

            document.querySelectorAll('#content a[href^="#"]').forEach(function (anchor) {
                anchor.addEventListener('click', function (e) {
                    var href = this.getAttribute('href');
                    if (href !== '#' && href.length > 1) {
                        var target = document.querySelector(href);
                        if (target) {
                            e.preventDefault();
                            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }
                });
            });

            document.querySelectorAll('#content table').forEach(function (table) {
                if (!table.classList.contains('table')) {
                    table.classList.add('table', 'table-bordered', 'table-hover');
                }
            });

            if (typeof bootstrap !== 'undefined') {
                [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function (el) {
                    return new bootstrap.Tooltip(el);
                });
            }

            if (typeof Prism !== 'undefined') Prism.highlightAll();

            ShareManager.init();
            PrintManager.init();
            TableOfContents.generate();
            QAToggle.init();
        },

        ensureActionBar: function () {
            var content = document.getElementById('content');
            if (!content || content.querySelector('#shareBtn')) return;

            var toolbarWrapper = document.createElement('div');
            toolbarWrapper.className = 'article-header-row';
            toolbarWrapper.innerHTML =
                '<div class="article-tools-bar">' +
                '<span class="reading-time-badge" id="readingTime">' +
                '<i class="bi bi-clock" aria-hidden="true"></i> ' +
                '<span id="readingTimeText">Calculating...</span></span>' +
                '<div class="article-actions">' +
                '<button class="btn btn-sm btn-outline-primary" id="shareBtn" aria-label="Share article" title="Share article">' +
                '<i class="bi bi-share" aria-hidden="true"></i> Share</button>' +
                '<button class="btn btn-sm btn-outline-primary" id="printBtn" aria-label="Print article" title="Print article">' +
                '<i class="bi bi-printer" aria-hidden="true"></i> Print</button>' +
                '</div></div>';

            var breadcrumb = content.querySelector('.breadcrumb-nav');
            if (breadcrumb) {
                breadcrumb.after(toolbarWrapper);
            } else {
                content.insertBefore(toolbarWrapper, content.firstChild);
            }
        }
    };

    // ============================================
    // Auto Table of Contents
    // ============================================
    const TableOfContents = {
        observer: null,

        generate: function () {
            var content = document.getElementById('content');
            if (!content) return;

            if (this.observer) { this.observer.disconnect(); this.observer = null; }

            var existing = content.querySelector('.auto-toc');
            if (existing) existing.remove();

            if (content.querySelector('.custom-container')) return;
            if (content.querySelector('.welcome-section')) return;

            var headings = [];
            content.querySelectorAll('h3, h4, h5').forEach(function (h) {
                if (h.closest('.auto-toc') || h.closest('.article-header-row') || h.closest('.breadcrumb-nav')) return;
                var text = h.textContent.trim();
                if (!text || text.length < 4) return;
                headings.push(h);
            });

            if (headings.length < 3) return;

            var tocHtml = '<div class="auto-toc"><div class="auto-toc-title"><i class="bi bi-list-nested"></i> Table of Contents</div><ol>';
            var ids = [];
            headings.forEach(function (h, i) {
                var parent = h.closest('div[id]');
                var targetId = (parent && parent.id) ? parent.id : h.id;
                if (!targetId) {
                    targetId = 'section-' + i;
                    if (parent) parent.id = targetId;
                    else h.id = targetId;
                }
                ids.push(targetId);
                var text = h.textContent.trim();
                if (text.length > 85) text = text.substring(0, 82) + '...';
                tocHtml += '<li><a href="#' + targetId + '" class="toc-link" data-toc-idx="' + i + '">' + text + '</a></li>';
            });
            tocHtml += '</ol></div>';

            var actionBar = content.querySelector('.article-header-row');
            var breadcrumb = content.querySelector('.breadcrumb-nav');
            if (actionBar) {
                actionBar.insertAdjacentHTML('afterend', tocHtml);
            } else if (breadcrumb) {
                breadcrumb.insertAdjacentHTML('afterend', tocHtml);
            } else {
                var firstH2 = content.querySelector('h2');
                if (firstH2 && firstH2.nextSibling) {
                    firstH2.insertAdjacentHTML('afterend', tocHtml);
                } else {
                    content.insertAdjacentHTML('afterbegin', tocHtml);
                }
            }

            content.querySelectorAll('.auto-toc a.toc-link').forEach(function (link) {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    var target = document.getElementById(this.getAttribute('href').substring(1));
                    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            });

            this.initScrollSpy(content, ids);
        },

        initScrollSpy: function (content, ids) {
            var tocLinks = content.querySelectorAll('.auto-toc a.toc-link');
            if (!tocLinks.length) return;

            this.observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        tocLinks.forEach(function (l) {
                            l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id);
                        });
                    }
                });
            }, { rootMargin: '-80px 0px -65% 0px', threshold: 0 });

            var self = this;
            ids.forEach(function (id) {
                var el = document.getElementById(id);
                if (el) self.observer.observe(el);
            });
        }
    };

    // ============================================
    // Accessibility
    // ============================================
    const AccessibilityManager = {
        init: function () {
            this.addSkipLink();
            document.querySelectorAll('[role="button"]').forEach(function (btn) {
                if (!btn.hasAttribute('tabindex')) btn.setAttribute('tabindex', '0');
            });
        },

        addSkipLink: function () {
            var skipLink = document.createElement('a');
            skipLink.href = '#content';
            skipLink.className = 'skip-to-main';
            skipLink.textContent = 'Skip to main content';
            skipLink.style.cssText = 'position:absolute;top:-40px;left:0;background:var(--accent-primary);color:white;padding:8px 16px;text-decoration:none;z-index:10000;border-radius:0 0 6px 0;font-weight:600;font-size:0.875rem;';
            skipLink.addEventListener('focus', function () { this.style.top = '0'; });
            skipLink.addEventListener('blur', function () { this.style.top = '-40px'; });
            document.body.insertBefore(skipLink, document.body.firstChild);
        }
    };

    // ============================================
    // Reading Progress
    // ============================================
    const ReadingProgress = {
        progressBar: null,
        progressBarFill: null,

        init: function () {
            this.progressBar = document.getElementById('readingProgress');
            this.progressBarFill = document.querySelector('.reading-progress-bar');
            if (!this.progressBar || !this.progressBarFill) return;
            var self = this;
            window.addEventListener('scroll', function () { self.updateProgress(); }, { passive: true });
            this.updateProgress();
        },

        updateProgress: function () {
            var content = document.getElementById('content');
            if (!content) return;
            var contentHeight = content.scrollHeight - window.innerHeight;
            var scrolled = window.pageYOffset;
            var progress = Math.min((scrolled / contentHeight) * 100, 100);

            this.progressBarFill.style.width = progress + '%';
            this.progressBar.setAttribute('aria-valuenow', Math.round(progress));
            this.progressBar.classList.toggle('show', scrolled > 100);
        }
    };

    // ============================================
    // Reading Time
    // ============================================
    const ReadingTime = {
        init: function () { this.calculateReadingTime(); },

        calculateReadingTime: function () {
            var content = document.getElementById('content');
            if (!content) return;
            var text = (content.innerText || content.textContent || '').trim();
            var words = text ? text.split(/\s+/).length : 0;
            var minutes = words > 0 ? Math.max(1, Math.ceil(words / 200)) : 0;
            var el = document.getElementById('readingTimeText');
            if (el) {
                el.textContent = minutes <= 0 ? 'Ready to read' : minutes === 1 ? '1 min read' : minutes + ' min read';
            }
        }
    };

    // ============================================
    // Code Copy Button
    // ============================================
    const CodeCopy = {
        init: function () {
            document.querySelectorAll('#content pre code').forEach(function (codeBlock) {
                var pre = codeBlock.parentElement;
                if (pre.querySelector('.code-copy-btn')) return;

                var button = document.createElement('button');
                button.className = 'code-copy-btn';
                button.innerHTML = '<i class="bi bi-clipboard"></i> Copy';
                button.setAttribute('aria-label', 'Copy code');

                button.addEventListener('click', function () {
                    navigator.clipboard.writeText(codeBlock.textContent).then(function () {
                        button.innerHTML = '<i class="bi bi-check-lg"></i> Copied!';
                        button.classList.add('copied');
                        setTimeout(function () {
                            button.innerHTML = '<i class="bi bi-clipboard"></i> Copy';
                            button.classList.remove('copied');
                        }, 2000);
                    });
                });

                pre.appendChild(button);
            });
        }
    };

    // ============================================
    // Bookmark Manager
    // ============================================
    const BookmarkManager = {
        init: function () {
            var bookmarkBtn = document.getElementById('bookmarkBtn');
            if (!bookmarkBtn) return;
            var self = this;
            bookmarkBtn.addEventListener('click', function () { self.toggleBookmark(); });
            this.updateBookmarkButton();
        },

        getCurrentUrl: function () { return window.location.hash.substring(1) || 'index.html'; },

        toggleBookmark: function () {
            var url = this.getCurrentUrl();
            var bookmarks = this.getBookmarks();
            var index = bookmarks.indexOf(url);
            if (index > -1) bookmarks.splice(index, 1);
            else bookmarks.push(url);
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
            this.updateBookmarkButton();
        },

        getBookmarks: function () {
            var stored = localStorage.getItem('bookmarks');
            return stored ? JSON.parse(stored) : [];
        },

        updateBookmarkButton: function () {
            var btn = document.getElementById('bookmarkBtn');
            if (!btn) return;
            var isBookmarked = this.getBookmarks().includes(this.getCurrentUrl());
            btn.classList.toggle('bookmarked', isBookmarked);
            btn.setAttribute('title', isBookmarked ? 'Remove bookmark' : 'Bookmark this article');
        }
    };

    // ============================================
    // Font Size Controls
    // ============================================
    const FontSizeManager = {
        currentSize: 100,

        init: function () {
            var savedSize = localStorage.getItem('fontSize');
            if (savedSize) { this.currentSize = parseInt(savedSize); this.applyFontSize(); }
            var self = this;
            var decreaseBtn = document.getElementById('fontDecrease');
            var increaseBtn = document.getElementById('fontIncrease');
            if (decreaseBtn) decreaseBtn.addEventListener('click', function () { self.decrease(); });
            if (increaseBtn) increaseBtn.addEventListener('click', function () { self.increase(); });
        },

        decrease: function () { if (this.currentSize > 80) { this.currentSize -= 10; this.applyFontSize(); } },
        increase: function () { if (this.currentSize < 150) { this.currentSize += 10; this.applyFontSize(); } },

        applyFontSize: function () {
            var content = document.getElementById('content');
            if (content) content.style.fontSize = this.currentSize + '%';
            var indicator = document.getElementById('fontSizeIndicator');
            if (indicator) indicator.textContent = this.currentSize + '%';
            localStorage.setItem('fontSize', this.currentSize.toString());
        }
    };

    // ============================================
    // Share
    // ============================================
    const ShareManager = {
        init: function () {
            var shareBtn = document.getElementById('shareBtn');
            if (shareBtn) {
                shareBtn.onclick = function (e) { e.preventDefault(); ShareManager.openShareModal(); };
            }
        },

        openShareModal: function () {
            var modal = new bootstrap.Modal(document.getElementById('shareModal'));
            modal.show();
            this.updateShareLinks();
        },

        updateShareLinks: function () {
            var url = encodeURIComponent(window.location.href);
            var text = encodeURIComponent('Check out this article: ' + document.title);

            var twitterBtn = document.getElementById('shareTwitter');
            if (twitterBtn) twitterBtn.href = 'https://twitter.com/intent/tweet?url=' + url + '&text=' + text;

            var linkedInBtn = document.getElementById('shareLinkedIn');
            if (linkedInBtn) linkedInBtn.href = 'https://www.linkedin.com/sharing/share-offsite/?url=' + url;

            var whatsappBtn = document.getElementById('shareWhatsApp');
            if (whatsappBtn) whatsappBtn.href = 'https://wa.me/?text=' + text + '%20' + url;

            var copyLinkBtn = document.getElementById('copyLinkBtn');
            if (copyLinkBtn) {
                copyLinkBtn.onclick = function () {
                    navigator.clipboard.writeText(window.location.href).then(function () {
                        copyLinkBtn.innerHTML = '<i class="bi bi-check-lg me-2"></i> Link Copied!';
                        setTimeout(function () {
                            copyLinkBtn.innerHTML = '<i class="bi bi-link-45deg me-2"></i> Copy Link';
                        }, 2000);
                    });
                };
            }
        }
    };

    // ============================================
    // Print
    // ============================================
    const PrintManager = {
        init: function () {
            var printBtn = document.getElementById('printBtn');
            if (printBtn) printBtn.onclick = function (e) { e.preventDefault(); window.print(); };
        }
    };

    // ============================================
    // Article Search
    // ============================================
    const ArticleSearch = {
        init: function () {
            var searchBtn = document.getElementById('searchInArticleBtn');
            if (searchBtn) searchBtn.addEventListener('click', function () { ArticleSearch.openSearchModal(); });

            var searchInput = document.getElementById('searchInArticleInput');
            if (searchInput) searchInput.addEventListener('input', function (e) { ArticleSearch.searchInArticle(e.target.value); });
        },

        openSearchModal: function () {
            var modal = new bootstrap.Modal(document.getElementById('searchInArticleModal'));
            modal.show();
            var input = document.getElementById('searchInArticleInput');
            if (input) setTimeout(function () { input.focus(); }, 300);
        },

        searchInArticle: function (query) {
            var resultsContainer = document.getElementById('searchInArticleResults');
            if (!resultsContainer) return;
            if (query.length < 2) { resultsContainer.innerHTML = ''; return; }

            var content = document.getElementById('content');
            if (!content) return;

            var text = content.innerText;
            var regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
            var matches = [];
            var match;

            while ((match = regex.exec(text)) !== null && matches.length < 20) {
                var start = Math.max(0, match.index - 50);
                var end = Math.min(text.length, match.index + match[0].length + 50);
                var context = text.substring(start, end);
                var highlighted = context.replace(regex, '<mark class="search-highlight-match">$&</mark>');
                matches.push({ text: highlighted, index: match.index });
            }

            if (matches.length === 0) {
                resultsContainer.innerHTML = '<p class="text-muted p-3">No matches found</p>';
                return;
            }

            var html = '';
            matches.forEach(function (m, i) {
                html += '<div class="search-result-match" data-index="' + m.index + '"><div>...' + m.text + '...</div><div class="match-context">Match ' + (i + 1) + ' of ' + matches.length + '</div></div>';
            });
            resultsContainer.innerHTML = html;
        }
    };

    // ============================================
    // Keyboard Shortcuts
    // ============================================
    const KeyboardShortcuts = {
        init: function () {
            document.addEventListener('keydown', function (e) {
                if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                    e.preventDefault();
                    var input = document.getElementById('searchInput') || document.getElementById('searchInputMobile');
                    if (input) input.focus();
                }
                if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
                    e.preventDefault();
                    ArticleSearch.openSearchModal();
                }
                if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
                    e.preventDefault();
                    BookmarkManager.toggleBookmark();
                }
                if (e.key === '?' && !e.ctrlKey && !e.metaKey && !e.target.matches('input, textarea')) {
                    var modal = new bootstrap.Modal(document.getElementById('shortcutsModal'));
                    modal.show();
                }
            });
        }
    };

    // ============================================
    // Reading History
    // ============================================
    const ReadingHistory = {
        init: function () { this.addToHistory(); },

        addToHistory: function () {
            var url = window.location.hash.substring(1) || 'index.html';
            var history = this.getHistory();
            var index = history.indexOf(url);
            if (index > -1) history.splice(index, 1);
            history.unshift(url);
            if (history.length > 20) history.pop();
            localStorage.setItem('readingHistory', JSON.stringify(history));
        },

        getHistory: function () {
            var stored = localStorage.getItem('readingHistory');
            return stored ? JSON.parse(stored) : [];
        }
    };

    // ============================================
    // Q&A Toggle (Interview Pages)
    // ============================================
    const QAToggle = {
        init: function () {
            var content = document.getElementById('content');
            if (!content) return;

            var toggleBtns = content.querySelectorAll('.qa-toggle-btn');
            if (!toggleBtns.length) return;

            toggleBtns.forEach(function (btn) {
                btn.addEventListener('click', function () {
                    var item = btn.closest('.qa-item');
                    if (!item) return;
                    var answer = item.querySelector('.qa-answer');
                    if (!answer) return;

                    var isOpen = answer.classList.contains('show');
                    if (isOpen) {
                        answer.classList.remove('show');
                        item.classList.remove('qa-open');
                        btn.classList.remove('active');
                        btn.textContent = 'Show Answer';
                        btn.setAttribute('aria-expanded', 'false');
                    } else {
                        answer.classList.add('show');
                        item.classList.add('qa-open');
                        btn.classList.add('active');
                        btn.textContent = 'Hide Answer';
                        btn.setAttribute('aria-expanded', 'true');
                    }
                });
            });

            content.querySelectorAll('.qa-expand-all').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    var section = btn.closest('.qa-section') || btn.parentElement.parentElement;
                    if (!section) return;
                    var items = section.querySelectorAll('.qa-item');
                    var allOpen = Array.from(items).every(function (it) {
                        return it.querySelector('.qa-answer.show');
                    });

                    items.forEach(function (it) {
                        var ans = it.querySelector('.qa-answer');
                        var toggle = it.querySelector('.qa-toggle-btn');
                        if (!ans || !toggle) return;

                        if (allOpen) {
                            ans.classList.remove('show');
                            it.classList.remove('qa-open');
                            toggle.classList.remove('active');
                            toggle.textContent = 'Show Answer';
                            toggle.setAttribute('aria-expanded', 'false');
                        } else {
                            ans.classList.add('show');
                            it.classList.add('qa-open');
                            toggle.classList.add('active');
                            toggle.textContent = 'Hide Answer';
                            toggle.setAttribute('aria-expanded', 'true');
                        }
                    });

                    btn.textContent = allOpen ? 'Expand All' : 'Collapse All';
                });
            });
        }
    };

    // ============================================
    // Direct File Access Handler
    // ============================================
    (function () {
        var currentPath = window.location.pathname;
        var isIndexPage = currentPath.endsWith('index.html') || currentPath.endsWith('/') || currentPath === '';

        if (!isIndexPage && !window.location.hash) {
            if (currentPath.includes('design/pages/') || currentPath.includes('design\\pages\\')) {
                var relativePath = currentPath;
                if (relativePath.startsWith('/')) relativePath = relativePath.substring(1);
                relativePath = relativePath.replace(/\\/g, '/');
                window.location.replace(window.location.origin + '/index.html#' + relativePath);
                return;
            }
        }
    })();

    // ============================================
    // Initialize
    // ============================================
    document.addEventListener('DOMContentLoaded', function () {
        ThemeManager.init();
        HeaderManager.init();
        SearchManager.init();
        BackToTop.init();
        SidebarManager.init();
        PageLoader.init();
        AccessibilityManager.init();
        ReadingProgress.init();
        ReadingTime.init();
        CodeCopy.init();
        BookmarkManager.init();
        FontSizeManager.init();
        ShareManager.init();
        PrintManager.init();
        ArticleSearch.init();
        KeyboardShortcuts.init();
        ReadingHistory.init();
        PageLoader.initializePageContent();

        var originalFetchContent = PageLoader.fetchContent;
        PageLoader.fetchContent = function (url) {
            originalFetchContent.call(this, url);
            setTimeout(function () {
                ReadingProgress.init();
                ReadingTime.calculateReadingTime();
                CodeCopy.init();
                BookmarkManager.updateBookmarkButton();
                ReadingHistory.addToHistory();
            }, 150);
        };
    });

    window.loadPage = function (event) { PageLoader.loadPage(event); };
    window.PageLoader = PageLoader;
    window.SearchManager = SearchManager;
    window.ArticleSearch = ArticleSearch;
    window.BookmarkManager = BookmarkManager;
})();
