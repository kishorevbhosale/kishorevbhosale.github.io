/**
 * Tech Preparation Zone - Main JavaScript
 * Handles theme toggle, search, navigation, and UI interactions
 */

(function() {
    'use strict';

    // ============================================
    // Theme Management
    // ============================================
    const ThemeManager = {
        init: function() {
            // Check for saved theme preference or default to light
            const savedTheme = localStorage.getItem('theme') || 'light';
            this.setTheme(savedTheme);
            
            // Add event listeners to theme toggle buttons
            const themeToggle = document.getElementById('themeToggle');
            const themeToggleMobile = document.getElementById('themeToggleMobile');
            
            if (themeToggle) {
                themeToggle.addEventListener('click', () => this.toggleTheme());
            }
            
            if (themeToggleMobile) {
                themeToggleMobile.addEventListener('click', () => this.toggleTheme());
            }
        },
        
        setTheme: function(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            
            // Update icons
            const icons = document.querySelectorAll('#themeIcon, #themeIconMobile');
            icons.forEach(icon => {
                if (icon) {
                    icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
                }
            });
        },
        
        toggleTheme: function() {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme);
        }
    };

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            // ============================================
    // Search Functionality
    // ============================================
    const SearchManager = {
        searchData: [],
        searchInput: null,
        searchResults: null,
        
        init: function() {
            this.searchInput = document.getElementById('searchInput');
            this.searchResults = document.getElementById('searchResults');
            this.searchInputMobile = document.getElementById('searchInputMobile');
            this.searchResultsMobile = document.getElementById('searchResultsMobile');
            
            // Initialize desktop search
            if (this.searchInput && this.searchResults) {
                this.initializeSearch(this.searchInput, this.searchResults);
            }
            
            // Initialize mobile search
            if (this.searchInputMobile && this.searchResultsMobile) {
                this.initializeSearch(this.searchInputMobile, this.searchResultsMobile);
            }
        },
        
        initializeSearch: function(input, results) {
            // Build search index from sidebar links
            this.buildSearchIndex();
            
            // Add event listeners
            input.addEventListener('input', (e) => this.handleSearch(e.target.value, results));
            input.addEventListener('focus', () => {
                if (input.value.trim()) {
                    results.classList.add('show');
                }
            });
            
            // Close results when clicking outside
            document.addEventListener('click', (e) => {
                if (!input.contains(e.target) && !results.contains(e.target)) {
                    results.classList.remove('show');
                }
            });
            
            // Keyboard navigation
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    results.classList.remove('show');
                    input.blur();
                }
            });
        },
        
        buildSearchIndex: function() {
            const links = document.querySelectorAll('.sidebar-link');
            this.searchData = [];
            
            links.forEach(link => {
                const text = link.textContent.trim();
                const href = link.getAttribute('href');
                const icon = link.querySelector('i');
                const iconClass = icon ? icon.className : '';
                
                if (text && href && !href.includes('under_construction')) {
                    this.searchData.push({
                        title: text,
                        url: href,
                        icon: iconClass,
                        keywords: text.toLowerCase().split(/\s+/)
                    });
                }
            });
        },
        
        handleSearch: function(query, resultsContainer) {
            const searchTerm = query.toLowerCase().trim();
            
            if (searchTerm.length < 2) {
                resultsContainer.classList.remove('show');
                resultsContainer.innerHTML = '';
                return;
            }
            
            const results = this.searchData.filter(item => {
                return item.keywords.some(keyword => keyword.includes(searchTerm)) ||
                       item.title.toLowerCase().includes(searchTerm);
            }).slice(0, 10); // Limit to 10 results
            
            this.displayResults(results, searchTerm, resultsContainer);
        },
        
        displayResults: function(results, searchTerm, resultsContainer) {
            if (results.length === 0) {
                resultsContainer.innerHTML = `
                    <div class="search-result-item">
                        <p class="mb-0 text-muted">No results found for "${searchTerm}"</p>
                    </div>
                `;
                resultsContainer.classList.add('show');
                return;
            }
            
            let html = '';
            const self = this;
            results.forEach(result => {
                const highlightedTitle = this.highlightText(result.title, searchTerm);
                html += `
                    <div class="search-result-item" role="button" tabindex="0" 
                         data-url="${result.url}"
                         onclick="PageLoader.loadPageFromUrl('${result.url}'); SearchManager.closeSearch();">
                        <i class="${result.icon}" aria-hidden="true"></i>
                        <span>${highlightedTitle}</span>
                    </div>
                `;
            });
            
            resultsContainer.innerHTML = html;
            resultsContainer.classList.add('show');
            
            // Add keyboard navigation
            const resultItems = resultsContainer.querySelectorAll('.search-result-item');
            resultItems.forEach((item, index) => {
                item.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        const url = item.getAttribute('data-url');
                        if (url) {
                            PageLoader.loadPageFromUrl(url);
                            this.closeSearch();
                        }
                    } else if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        const next = resultItems[index + 1];
                        if (next) next.focus();
                    } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        const prev = resultItems[index - 1];
                        if (prev) prev.focus();
                    } else if (e.key === 'Escape') {
                        this.closeSearch();
                    }
                });
            });
        },
        
        closeSearch: function() {
            const results = document.querySelectorAll('.search-results');
            results.forEach(r => r.classList.remove('show'));
            const inputs = document.querySelectorAll('#searchInput, #searchInputMobile');
            inputs.forEach(input => {
                if (input) {
                    input.value = '';
                    input.blur();
                }
            });
        },
        
        highlightText: function(text, searchTerm) {
            const regex = new RegExp(`(${searchTerm})`, 'gi');
            return text.replace(regex, '<span class="search-highlight">$1</span>');
        }
    };

    // ============================================
    // Header Manager (Fixed, no auto-hide)
    // ============================================
    const HeaderManager = {
        init: function() {
            // Header is now always fixed and visible
            // Add mobile search visibility handler
            const mobileSearch = document.getElementById('searchInputMobile');
            if (mobileSearch) {
                mobileSearch.addEventListener('focus', () => {
                    document.body.classList.add('has-mobile-search');
                });
                mobileSearch.addEventListener('blur', () => {
                    // Small delay to allow click on results
                    setTimeout(() => {
                        if (document.activeElement !== mobileSearch && 
                            !document.getElementById('searchResultsMobile')?.contains(document.activeElement)) {
                            document.body.classList.remove('has-mobile-search');
                        }
                    }, 200);
                });
            }
        }
    };

    // ============================================
    // Back to Top Button
    // ============================================
    const BackToTop = {
        button: null,
        
        init: function() {
            this.button = document.getElementById('backToTop');
            if (!this.button) return;
            
            // Show/hide button based on scroll position
            window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
            
            // Scroll to top on click
            this.button.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        },
        
        handleScroll: function() {
            if (window.pageYOffset > 300) {
                this.button.classList.add('show');
            } else {
                this.button.classList.remove('show');
            }
        }
    };

    // ============================================
    // Sidebar Management
    // ============================================
    const SidebarManager = {
        init: function() {
            const toggleBtn = document.getElementById('sidebarToggle');
            const sidebar = document.querySelector('.left-panel');
            
            if (!toggleBtn || !sidebar) return;
            
            toggleBtn.addEventListener('click', () => {
                const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
                toggleBtn.setAttribute('aria-expanded', !isExpanded);
                sidebar.classList.toggle('show');
            });
            
            // Auto-close sidebar when clicking a link on mobile
            document.querySelectorAll('.left-panel a').forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth < 768) {
                        sidebar.classList.remove('show');
                        toggleBtn.setAttribute('aria-expanded', 'false');
                    }
                });
            });
            
            // Close sidebar when clicking outside on mobile
            document.addEventListener('click', (e) => {
                if (window.innerWidth < 768 && 
                    sidebar.classList.contains('show') &&
                    !sidebar.contains(e.target) &&
                    !toggleBtn.contains(e.target)) {
                    sidebar.classList.remove('show');
                    toggleBtn.setAttribute('aria-expanded', 'false');
                }
            });
        }
    };

    // ============================================
    // Page Loading
    // ============================================
    const PageLoader = {
        init: function() {
            // Handle sidebar link clicks
            document.querySelectorAll('.sidebar-link').forEach(link => {
                link.addEventListener('click', (e) => this.loadPage(e));
            });
            
            // Handle browser back/forward
            window.addEventListener('popstate', (e) => {
                if (e.state && e.state.pageUrl) {
                    this.fetchContent(e.state.pageUrl);
                }
            });
            
            // Load initial content if hash present
            const hashPath = window.location.hash.substring(1);
            if (hashPath) {
                this.fetchContent(hashPath);
            }
        },
        
        loadPage: function(event) {
    event.preventDefault();
    const link = event.currentTarget;
    const pageUrl = link.getAttribute('href');

            if (!pageUrl || pageUrl.includes('#')) return;
            
            this.loadPageFromUrl(pageUrl);
            
            // Update active link
            document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        },
        
        loadPageFromUrl: function(pageUrl) {
            this.fetchContent(pageUrl);
            
            // Update URL without reload
            history.pushState({ pageUrl }, '', `#${pageUrl}`);
            
            // Scroll to content
            const rightPanel = document.querySelector('.right-panel');
            if (rightPanel) {
                rightPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        },
        
        fetchContent: function(url) {
            fetch(url)
                .then(response => {
                    if (!response.ok) throw new Error('Failed to load page');
                    return response.text();
                })
        .then(data => {
                    const contentDiv = document.getElementById('content');
                    if (contentDiv) {
                        // Extract body content from full HTML document
                        let extractedContent = this.extractBodyContent(data);
                        contentDiv.innerHTML = extractedContent;
                        
                        // Re-initialize any page-specific functionality
                        this.initializePageContent();
                    }
        })
        .catch(error => {
            console.error('Error loading page:', error);
                    const contentDiv = document.getElementById('content');
                    if (contentDiv) {
                        contentDiv.innerHTML = `
                            <div class="alert alert-danger" role="alert">
                                <h4>Error Loading Content</h4>
                                <p>Unable to load the requested page. Please try again later.</p>
                            </div>
                        `;
                    }
                });
        },
        
        extractBodyContent: function(html) {
            // Create a temporary DOM element to parse HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            
            // Try to find body tag content
            const bodyTag = tempDiv.querySelector('body');
            if (bodyTag) {
                // Get all content inside body, excluding navbar placeholders
                let bodyContent = bodyTag.innerHTML;
                // Remove navbar placeholder divs
                bodyContent = bodyContent.replace(/<div[^>]*id=["']navbar-placeholder["'][^>]*>.*?<\/div>/gis, '');
                // Remove script tags that might cause issues
                bodyContent = bodyContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
                return bodyContent;
            }
            
            // If no body tag, check if it's just content (some pages are content-only)
            const container = tempDiv.querySelector('.container, .content, main, article');
            if (container) {
                return container.innerHTML;
            }
            
            // If it starts with content directly (like some pages), return as is but clean it
            let content = html;
            // Remove HTML/HEAD/BODY tags if present
            content = content.replace(/<!DOCTYPE[^>]*>/gi, '');
            content = content.replace(/<html[^>]*>/gi, '');
            content = content.replace(/<\/html>/gi, '');
            content = content.replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '');
            content = content.replace(/<body[^>]*>/gi, '');
            content = content.replace(/<\/body>/gi, '');
            // Remove script tags
            content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
            
            return content;
        },
        
        initializePageContent: function() {
            this.ensureActionBar();

            // Add lazy loading to images
            const images = document.querySelectorAll('#content img:not([loading])');
            images.forEach(img => {
                img.setAttribute('loading', 'lazy');
                if (!img.hasAttribute('alt')) {
                    img.setAttribute('alt', 'Content image');
                }
                // Ensure images are responsive
                if (!img.classList.contains('responsive-image') && !img.hasAttribute('style')) {
                    img.style.maxWidth = '100%';
                    img.style.height = 'auto';
                }
            });
            
            // Add smooth scroll to anchor links within content
            document.querySelectorAll('#content a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href !== '#' && href.length > 1) {
                        const target = document.querySelector(href);
                        if (target) {
                            e.preventDefault();
                            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }
                });
            });
            
            // Ensure tables are styled properly
            const tables = document.querySelectorAll('#content table');
            tables.forEach(table => {
                if (!table.classList.contains('table')) {
                    table.classList.add('table', 'table-bordered', 'table-hover');
                }
            });
            
            // Ensure code blocks are styled
            const codeBlocks = document.querySelectorAll('#content pre, #content code');
            codeBlocks.forEach(block => {
                if (block.tagName === 'PRE' && !block.hasAttribute('style')) {
                    block.style.backgroundColor = 'var(--code-bg)';
                    block.style.color = 'var(--code-text)';
                    block.style.padding = '16px';
                    block.style.borderRadius = '6px';
                    block.style.overflow = 'auto';
                }
            });
            
            // Re-initialize Bootstrap components if needed
            if (typeof bootstrap !== 'undefined') {
                // Reinitialize tooltips, popovers, etc. if any
                const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
                tooltipTriggerList.map(function (tooltipTriggerEl) {
                    return new bootstrap.Tooltip(tooltipTriggerEl);
                });
            }
            
            // Re-initialize Prism.js for syntax highlighting
            if (typeof Prism !== 'undefined') {
                Prism.highlightAll();
            }

            ShareManager.init();
            PrintManager.init();
        },

        ensureActionBar: function() {
            const content = document.getElementById('content');
            if (!content) return;

            const existingShareBtn = content.querySelector('#shareBtn');
            if (existingShareBtn) {
                return;
            }

            const toolbarWrapper = document.createElement('div');
            toolbarWrapper.className = 'article-header-row';
            toolbarWrapper.innerHTML = `
                <div class="article-tools-bar">
                    <span class="reading-time-badge" id="readingTime">
                        <i class="bi bi-clock" aria-hidden="true"></i>
                        <span id="readingTimeText">Calculating...</span>
                    </span>
                    <div class="article-actions">
                        <button class="btn btn-sm btn-outline-primary" id="shareBtn" aria-label="Share article" title="Share article">
                            <i class="bi bi-share" aria-hidden="true"></i> Share
                        </button>
                        <button class="btn btn-sm btn-outline-primary" id="printBtn" aria-label="Print article" title="Print article">
                            <i class="bi bi-printer" aria-hidden="true"></i> Print
                        </button>
                    </div>
                </div>
            `;

            content.insertBefore(toolbarWrapper, content.firstChild);
        }
    };

    // ============================================
    // Accessibility Enhancements
    // ============================================
    const AccessibilityManager = {
        init: function() {
            // Skip to main content link
            this.addSkipLink();
            
            // Keyboard navigation for custom elements
            this.enhanceKeyboardNavigation();
            
            // Focus management
            this.manageFocus();
        },
        
        addSkipLink: function() {
            const skipLink = document.createElement('a');
            skipLink.href = '#content';
            skipLink.className = 'skip-to-main';
            skipLink.textContent = 'Skip to main content';
            skipLink.style.cssText = `
                position: absolute;
                top: -40px;
                left: 0;
                background: var(--accent-primary);
                color: white;
                padding: 8px;
                text-decoration: none;
                z-index: 10000;
            `;
            skipLink.addEventListener('focus', function() {
                this.style.top = '0';
            });
            skipLink.addEventListener('blur', function() {
                this.style.top = '-40px';
            });
            document.body.insertBefore(skipLink, document.body.firstChild);
        },
        
        enhanceKeyboardNavigation: function() {
            // Make all interactive elements keyboard accessible
            document.querySelectorAll('[role="button"]').forEach(button => {
                if (!button.hasAttribute('tabindex')) {
                    button.setAttribute('tabindex', '0');
                }
            });
        },
        
        manageFocus: function() {
            // Trap focus in mobile sidebar when open
            const sidebar = document.querySelector('.left-panel');
            if (sidebar) {
                const focusableElements = sidebar.querySelectorAll(
                    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
                );
                
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                sidebar.addEventListener('keydown', (e) => {
                    if (e.key === 'Tab' && sidebar.classList.contains('show')) {
                        if (e.shiftKey && document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement.focus();
                        } else if (!e.shiftKey && document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement.focus();
                        }
                    }
                });
            }
        }
    };

    // ============================================
    // Reading Progress Indicator
    // ============================================
    const ReadingProgress = {
        progressBar: null,
        progressBarFill: null,
        
        init: function() {
            this.progressBar = document.getElementById('readingProgress');
            this.progressBarFill = document.querySelector('.reading-progress-bar');
            
            if (!this.progressBar || !this.progressBarFill) return;
            
            window.addEventListener('scroll', () => this.updateProgress(), { passive: true });
            this.updateProgress();
        },
        
        updateProgress: function() {
            const content = document.getElementById('content');
            if (!content) return;
            
            const contentHeight = content.scrollHeight - window.innerHeight;
            const scrolled = window.pageYOffset;
            const progress = Math.min((scrolled / contentHeight) * 100, 100);
            
            this.progressBarFill.style.width = progress + '%';
            this.progressBar.setAttribute('aria-valuenow', Math.round(progress));
            
            if (scrolled > 100) {
                this.progressBar.classList.add('show');
    } else {
                this.progressBar.classList.remove('show');
            }
        }
    };

    // ============================================
    // Reading Time Calculator
    // ============================================
    const ReadingTime = {
        init: function() {
            this.calculateReadingTime();
        },
        
        calculateReadingTime: function() {
            const content = document.getElementById('content');
            if (!content) return;
            
            const text = content.innerText || content.textContent || '';
            const trimmed = text.trim();
            const words = trimmed ? trimmed.split(/\s+/).length : 0;
            const wordsPerMinute = 200; // Average reading speed
            const minutes = words > 0 ? Math.max(1, Math.ceil(words / wordsPerMinute)) : 0;
            
            const readingTimeText = document.getElementById('readingTimeText');
            if (readingTimeText) {
                readingTimeText.textContent = minutes <= 0 ? 'Ready to read' : (minutes === 1 ? '1 min read' : `${minutes} min read`);
            }
        }
    };

    // ============================================
    // Copy Code Button
    // ============================================
    const CodeCopy = {
        init: function() {
            this.addCopyButtons();
        },
        
        addCopyButtons: function() {
            const codeBlocks = document.querySelectorAll('#content pre code');
            codeBlocks.forEach((codeBlock, index) => {
                const pre = codeBlock.parentElement;
                if (pre.querySelector('.code-copy-btn')) return; // Already has button
                
                const button = document.createElement('button');
                button.className = 'code-copy-btn';
                button.innerHTML = '<i class="bi bi-clipboard"></i> Copy';
                button.setAttribute('aria-label', 'Copy code');
                
                button.addEventListener('click', () => {
                    const text = codeBlock.textContent;
                    navigator.clipboard.writeText(text).then(() => {
                        button.innerHTML = '<i class="bi bi-check"></i> Copied!';
                        button.classList.add('copied');
                        setTimeout(() => {
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
        init: function() {
            const bookmarkBtn = document.getElementById('bookmarkBtn');
            if (!bookmarkBtn) return;
            
            bookmarkBtn.addEventListener('click', () => this.toggleBookmark());
            this.updateBookmarkButton();
        },
        
        getCurrentUrl: function() {
            return window.location.hash.substring(1) || 'index.html';
        },
        
        toggleBookmark: function() {
            const url = this.getCurrentUrl();
            const bookmarks = this.getBookmarks();
            const index = bookmarks.indexOf(url);
            
            if (index > -1) {
                bookmarks.splice(index, 1);
            } else {
                bookmarks.push(url);
            }
            
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
            this.updateBookmarkButton();
        },
        
        getBookmarks: function() {
            const stored = localStorage.getItem('bookmarks');
            return stored ? JSON.parse(stored) : [];
        },
        
        updateBookmarkButton: function() {
            const bookmarkBtn = document.getElementById('bookmarkBtn');
            if (!bookmarkBtn) return;
            
            const url = this.getCurrentUrl();
            const bookmarks = this.getBookmarks();
            const isBookmarked = bookmarks.includes(url);
            
            if (isBookmarked) {
                bookmarkBtn.classList.add('bookmarked');
                bookmarkBtn.setAttribute('title', 'Remove bookmark');
            } else {
                bookmarkBtn.classList.remove('bookmarked');
                bookmarkBtn.setAttribute('title', 'Bookmark this article');
            }
        }
    };

    // ============================================
    // Font Size Controls
    // ============================================
    const FontSizeManager = {
        currentSize: 100,
        minSize: 80,
        maxSize: 150,
        step: 10,
        
        init: function() {
            const savedSize = localStorage.getItem('fontSize');
            if (savedSize) {
                this.currentSize = parseInt(savedSize);
                this.applyFontSize();
            }
            
            const decreaseBtn = document.getElementById('fontDecrease');
            const increaseBtn = document.getElementById('fontIncrease');
            
            if (decreaseBtn) {
                decreaseBtn.addEventListener('click', () => this.decrease());
            }
            if (increaseBtn) {
                increaseBtn.addEventListener('click', () => this.increase());
            }
        },
        
        decrease: function() {
            if (this.currentSize > this.minSize) {
                this.currentSize -= this.step;
                this.applyFontSize();
            }
        },
        
        increase: function() {
            if (this.currentSize < this.maxSize) {
                this.currentSize += this.step;
                this.applyFontSize();
            }
        },
        
        applyFontSize: function() {
            const content = document.getElementById('content');
            if (content) {
                content.style.fontSize = this.currentSize + '%';
            }
            
            const indicator = document.getElementById('fontSizeIndicator');
            if (indicator) {
                indicator.textContent = this.currentSize + '%';
            }
            
            localStorage.setItem('fontSize', this.currentSize.toString());
        }
    };

    // ============================================
    // Share Functionality
    // ============================================
    const ShareManager = {
        init: function() {
            const shareBtn = document.getElementById('shareBtn');
            if (shareBtn) {
                shareBtn.onclick = (event) => {
                    event.preventDefault();
                    this.openShareModal();
                };
            }
            
            this.setupShareButtons();
        },
        
        openShareModal: function() {
            const modal = new bootstrap.Modal(document.getElementById('shareModal'));
            modal.show();
            this.updateShareLinks();
        },
        
        updateShareLinks: function() {
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            const text = encodeURIComponent('Check out this article: ' + document.title);
            
            // Twitter
            const twitterBtn = document.getElementById('shareTwitter');
            if (twitterBtn) {
                twitterBtn.href = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
            }
            
            // LinkedIn
            const linkedInBtn = document.getElementById('shareLinkedIn');
            if (linkedInBtn) {
                linkedInBtn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            }
            
            // WhatsApp
            const whatsappBtn = document.getElementById('shareWhatsApp');
            if (whatsappBtn) {
                whatsappBtn.href = `https://wa.me/?text=${text}%20${url}`;
            }
            
            // Copy Link
            const copyLinkBtn = document.getElementById('copyLinkBtn');
            if (copyLinkBtn) {
                copyLinkBtn.onclick = () => {
                    navigator.clipboard.writeText(window.location.href).then(() => {
                        copyLinkBtn.innerHTML = '<i class="bi bi-check me-2"></i> Link Copied!';
                        setTimeout(() => {
                            copyLinkBtn.innerHTML = '<i class="bi bi-link-45deg me-2"></i> Copy Link';
                        }, 2000);
                    });
                };
            }
        },
        
        setupShareButtons: function() {
            // Already done in updateShareLinks
        }
    };

    // ============================================
    // Print/Export to PDF
    // ============================================
    const PrintManager = {
        init: function() {
            const printBtn = document.getElementById('printBtn');
            if (printBtn) {
                printBtn.onclick = (event) => {
                    event.preventDefault();
                    this.printArticle();
                };
            }
        },
        
        printArticle: function() {
            window.print();
        }
    };

    // ============================================
    // Search in Article
    // ============================================
    const ArticleSearch = {
        init: function() {
            const searchBtn = document.getElementById('searchInArticleBtn');
            if (searchBtn) {
                searchBtn.addEventListener('click', () => this.openSearchModal());
            }
            
            const searchInput = document.getElementById('searchInArticleInput');
            if (searchInput) {
                searchInput.addEventListener('input', (e) => this.searchInArticle(e.target.value));
            }
        },
        
        openSearchModal: function() {
            const modal = new bootstrap.Modal(document.getElementById('searchInArticleModal'));
            modal.show();
            const input = document.getElementById('searchInArticleInput');
            if (input) {
                setTimeout(() => input.focus(), 300);
            }
        },
        
        searchInArticle: function(query) {
            const resultsContainer = document.getElementById('searchInArticleResults');
            if (!resultsContainer) return;
            
            if (query.length < 2) {
                resultsContainer.innerHTML = '';
                return;
            }
            
            const content = document.getElementById('content');
            if (!content) return;
            
            const text = content.innerText;
            const regex = new RegExp(query, 'gi');
            const matches = [];
            let match;
            
            while ((match = regex.exec(text)) !== null && matches.length < 20) {
                const start = Math.max(0, match.index - 50);
                const end = Math.min(text.length, match.index + match[0].length + 50);
                const context = text.substring(start, end);
                const highlighted = context.replace(regex, '<mark class="search-highlight-match">$&</mark>');
                
                matches.push({
                    text: highlighted,
                    index: match.index
                });
            }
            
            if (matches.length === 0) {
                resultsContainer.innerHTML = '<p class="text-muted">No matches found</p>';
                return;
            }
            
            let html = '';
            matches.forEach((match, index) => {
                html += `
                    <div class="search-result-match" data-index="${match.index}">
                        <div>${match.text}</div>
                        <div class="match-context">Match ${index + 1} of ${matches.length}</div>
                    </div>
                `;
            });
            
            resultsContainer.innerHTML = html;
            
            // Add click handlers
            resultsContainer.querySelectorAll('.search-result-match').forEach(item => {
                item.addEventListener('click', () => {
                    const index = parseInt(item.getAttribute('data-index'));
                    this.scrollToMatch(index, query);
                });
            });
        },
        
        scrollToMatch: function(index, query) {
            const content = document.getElementById('content');
            if (!content) return;
            
            const text = content.innerText;
            const element = this.findElementAtPosition(content, index);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Highlight the match
                element.style.backgroundColor = 'rgba(75, 108, 183, 0.2)';
                setTimeout(() => {
                    element.style.backgroundColor = '';
                }, 2000);
            }
        },
        
        findElementAtPosition: function(container, position) {
            let currentPos = 0;
            const walker = document.createTreeWalker(
                container,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );
            
            let node;
            while (node = walker.nextNode()) {
                if (currentPos + node.textContent.length >= position) {
                    return node.parentElement;
                }
                currentPos += node.textContent.length;
            }
            return null;
        }
    };

    // ============================================
    // Keyboard Shortcuts
    // ============================================
    const KeyboardShortcuts = {
        init: function() {
            document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        },
        
        handleKeyPress: function(e) {
            // Ctrl+K or Cmd+K - Open search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.getElementById('searchInput') || document.getElementById('searchInputMobile');
                if (searchInput) {
                    searchInput.focus();
                }
            }
            
            // Ctrl+F or Cmd+F - Search in article
            if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
                e.preventDefault();
                ArticleSearch.openSearchModal();
            }
            
            // Ctrl+B or Cmd+B - Bookmark
            if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
                e.preventDefault();
                BookmarkManager.toggleBookmark();
            }
            
            // Ctrl+P or Cmd+P - Print
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
                // Let default print dialog work
                return;
            }
            
            // ? - Show shortcuts
            if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
                const modal = new bootstrap.Modal(document.getElementById('shortcutsModal'));
                modal.show();
            }
        }
    };

    // ============================================
    // Reading History
    // ============================================
    const ReadingHistory = {
        init: function() {
            this.addToHistory();
        },
        
        addToHistory: function() {
            const url = window.location.hash.substring(1) || 'index.html';
            const history = this.getHistory();
            
            // Remove if already exists
            const index = history.indexOf(url);
            if (index > -1) {
                history.splice(index, 1);
            }
            
            // Add to beginning
            history.unshift(url);
            
            // Keep only last 20
            if (history.length > 20) {
                history.pop();
            }
            
            localStorage.setItem('readingHistory', JSON.stringify(history));
        },
        
        getHistory: function() {
            const stored = localStorage.getItem('readingHistory');
            return stored ? JSON.parse(stored) : [];
        }
    };

    // ============================================
    // Initialize Everything
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
        ThemeManager.init();
        HeaderManager.init();
        SearchManager.init();
        BackToTop.init();
        SidebarManager.init();
        PageLoader.init();
        AccessibilityManager.init();
        
        // New features
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
        
        // Initialize page content for initial load
        PageLoader.initializePageContent();
        
        // Re-initialize features when content changes
        const originalFetchContent = PageLoader.fetchContent;
        PageLoader.fetchContent = function(url) {
            originalFetchContent.call(this, url);
            setTimeout(() => {
                ReadingProgress.init();
                ReadingTime.calculateReadingTime();
                CodeCopy.init();
                BookmarkManager.updateBookmarkButton();
                ReadingHistory.addToHistory();
            }, 100);
        };
        
        console.log('Tech Preparation Zone initialized successfully!');
    });

    // Export functions for global access
    window.loadPage = function(event) {
        PageLoader.loadPage(event);
    };
    
    window.PageLoader = PageLoader;
    window.SearchManager = SearchManager;
    window.ArticleSearch = ArticleSearch;
    window.BookmarkManager = BookmarkManager;

})();
