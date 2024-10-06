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



// Search functionality
document.getElementById('searchButton').addEventListener('click', function () {
    performSearch();
});

document.getElementById('searchInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    let filter = document.getElementById('searchInput').value.toLowerCase(); // Search filter
    let rows = document.querySelectorAll('#postTable tbody tr'); // Get all table rows

    rows.forEach(row => {
        let title = row.cells[0].textContent.toLowerCase(); // Get text content from the first cell (Title column)

        if (title.includes(filter)) {
            row.style.display = ''; // Show the row if it matches
        } else {
            row.style.display = 'none'; // Hide the row if it doesn't match
        }
    });
}


