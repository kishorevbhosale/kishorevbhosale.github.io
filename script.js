// script.js

function toggleCollapsible(event) {
    const header = event.target; // Get the header that was clicked
    const content = header.nextElementSibling; // Get the next sibling, which is the content

    // Toggle the display of the collapsible content
    if (content.style.display === "block") {
        content.style.display = "none"; // Hide the content if currently visible
    } else {
        // First, hide all other collapsible contents
        const allContents = document.querySelectorAll('.collapsible-content');
        allContents.forEach(function (c) {
            c.style.display = 'none'; // Hide all contents
        });

        content.style.display = "block"; // Show the clicked content
    }
}

function loadPage(event) {
    event.preventDefault(); // Prevent default link behavior
    const pageUrl = event.target.getAttribute('href'); // Get the href attribute

    // Load the content of the selected page into the right panel
    fetch(pageUrl)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(data => {
            document.getElementById('right-panel').innerHTML = data;
        })
        .catch(error => console.error('There was a problem with the fetch operation:', error));
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


