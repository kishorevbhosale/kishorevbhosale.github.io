document.addEventListener("DOMContentLoaded", function () {
    setupSidebarLinks();

    // Handle browser back/forward navigation
    window.addEventListener("popstate", function () {
        loadPageContent(window.location.pathname, false);
    });

    // If the user directly accesses a page (refresh or new tab), load it
    if (window.location.pathname !== "/") {
        loadPageContent(window.location.pathname, false);
    }
});

function setupSidebarLinks() {
    document.querySelectorAll(".sidebar-link").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default navigation

            let newUrl = this.getAttribute("href"); // Get target URL

            // Ensure the URL is absolute
            if (!newUrl.startsWith("/")) {
                newUrl = "/" + newUrl;
            }

            const absoluteUrl = new URL(newUrl, window.location.origin);

            // Update browser URL without reloading
            history.pushState({ path: absoluteUrl.pathname }, "", absoluteUrl.pathname);

            // Load content dynamically
            loadPageContent(absoluteUrl.pathname, true);
        });
    });
}

function loadPageContent(url, scrollToTop = true) {
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("Page not found");
            return response.text();
        })
        .then(html => {
            // Create a temporary container to parse the new page content
            let tempDiv = document.createElement("div");
            tempDiv.innerHTML = html;

            // Extract only the necessary content (assuming there's a common wrapper)
            let newContent = tempDiv.querySelector("#content-area");
            if (newContent) {
                document.getElementById("content-area").innerHTML = newContent.innerHTML;
            } else {
                document.getElementById("content-area").innerHTML = html;
            }

            setupSidebarLinks(); // Rebind sidebar links
            applyStylesAndScripts(); // Reload CSS and JS

            if (scrollToTop) {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        })
        .catch(error => {
            console.error("Error loading content:", error);
            document.getElementById("content-area").innerHTML = "<h2>Page not found</h2>";
        });
}

function applyStylesAndScripts() {
    // Reload styles.css to prevent missing styles
    let cssLink = document.querySelector("link[data-dynamic]");
    if (cssLink) cssLink.remove();

    let newCssLink = document.createElement("link");
    newCssLink.rel = "stylesheet";
    newCssLink.href = "/styles.css"; // Ensure correct path
    newCssLink.setAttribute("data-dynamic", "true");
    document.head.appendChild(newCssLink);

    // Reload script.js dynamically
    let existingScript = document.querySelector("script[data-dynamic]");
    if (existingScript) existingScript.remove();

    let newScript = document.createElement("script");
    newScript.src = "/script.js"; // Ensure correct path
    newScript.setAttribute("data-dynamic", "true");
    document.body.appendChild(newScript);
}

// Visitor Counter (localStorage-based)
document.addEventListener("DOMContentLoaded", function () {
    let count = localStorage.getItem("visitorCount");

    if (!count) {
        count = 1;
    } else {
        count = parseInt(count) + 1;
    }

    localStorage.setItem("visitorCount", count);
    document.getElementById("visitor-count").innerText = count;
});


function toggleCollapsible(event) {
    const header = event.currentTarget;
    const content = header.nextElementSibling;
    content.style.display = (content.style.display === "block") ? "none" : "block";
}

function loadPage(event) {
    event.preventDefault();
    const link = event.currentTarget;
    const pageUrl = link.getAttribute('href');

    // Fetch the content from the page and insert it into the right panel
    fetch(pageUrl)
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data;

            // Scroll to the right panel smoothly
            const rightPanel = document.querySelector('.right-panel');
            rightPanel.scrollIntoView({ behavior: 'smooth' });
        })
        .catch(error => {
            console.error('Error loading page:', error);
        });
}


document.addEventListener("DOMContentLoaded", function () {
    // Disable right-click context menu
    document.addEventListener("contextmenu", function (event) {
        event.preventDefault();
    });

    // Disable Shift + Click, Ctrl + Click, Middle Mouse Click (to prevent opening in new tab)
    document.addEventListener("click", function (event) {
        if (event.button === 1 || event.ctrlKey || event.shiftKey || event.metaKey) {
            event.preventDefault();
        }
    });

    // Handle internal link clicks to load content dynamically
    const links = document.querySelectorAll(".nav-link");
});


document.addEventListener("DOMContentLoaded", function () {
    let count = localStorage.getItem("visitorCount");

    if (!count) {
        count = 1;
    } else {
        count = parseInt(count) + 1;
    }

    localStorage.setItem("visitorCount", count);
    document.getElementById("visitor-count").innerText = count;
});





