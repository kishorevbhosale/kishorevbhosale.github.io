// script.js


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






