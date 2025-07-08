function toggleCollapsible(event) {
    const header = event.currentTarget;
    const content = header.nextElementSibling;
    content.style.display = (content.style.display === "block") ? "none" : "block";
}

// function loadPage(event) {
//     event.preventDefault();
//     const link = event.currentTarget;
//     const pageUrl = link.getAttribute('href');

//     // Load content dynamically
//     fetch(pageUrl)
//         .then(response => response.text())
//         .then(data => {
//             document.getElementById('content').innerHTML = data;

//             // Update the browser URL
//             history.pushState({ pageUrl }, '', pageUrl);

//             // Scroll to content
//             document.querySelector('.right-panel').scrollIntoView({ behavior: 'smooth' });
//         })
//         .catch(error => {
//             console.error('Error loading page:', error);
//         });
// }

// function loadPage(event) {
//     event.preventDefault();
//     const link = event.currentTarget;
//     const pageUrl = link.getAttribute('href');

//     // Ensure we use an absolute path for the URL (no repetition)
//     const absoluteUrl = '/' + pageUrl.replace(/^\/+/, '');

//     // Load content into the right panel
//     fetch(pageUrl)
//         .then(response => response.text())
//         .then(data => {
//             document.getElementById('content').innerHTML = data;

//             // Update browser URL without repetition
//             history.pushState({ pageUrl }, '', absoluteUrl);

//             // Smooth scroll to content
//             document.querySelector('.right-panel').scrollIntoView({ behavior: 'smooth' });
//         })
//         .catch(error => {
//             console.error('Error loading page:', error);
//         });
// }


// window.addEventListener('popstate', (event) => {
//     if (event.state && event.state.pageUrl) {
//         fetch(event.state.pageUrl)
//             .then(response => response.text())
//             .then(data => {
//                 document.getElementById('content').innerHTML = data;
//             })
//             .catch(error => {
//                 console.error('Error loading page:', error);
//             });
//     }
// });

function loadPage(event) {
    event.preventDefault();
    const link = event.currentTarget;
    const pageUrl = link.getAttribute('href');

    // Load content dynamically
    fetch(pageUrl)
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data;
            history.pushState({ pageUrl }, '', `#${pageUrl}`);
            document.querySelector('.right-panel').scrollIntoView({ behavior: 'smooth' });
        })
        .catch(error => {
            console.error('Error loading page:', error);
        });
}

// Handle browser navigation
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.pageUrl) {
        fetch(event.state.pageUrl)
            .then(response => response.text())
            .then(data => {
                document.getElementById('content').innerHTML = data;
            });
    }
});

// Load initial content if hash present
window.addEventListener('DOMContentLoaded', () => {
    const hashPath = window.location.hash.substring(1); // Remove '#'
    if (hashPath) {
        fetch(hashPath)
            .then(response => response.text())
            .then(data => {
                document.getElementById('content').innerHTML = data;
            });
    }
});


// document.addEventListener("DOMContentLoaded", function () {
//     // Disable right-click context menu
//     document.addEventListener("contextmenu", function (event) {
//         event.preventDefault();
//     });
//     // Disable Shift + Click, Ctrl + Click, Middle Mouse Click (to prevent opening in new tab)
//     document.addEventListener("click", function (event) {
//         if (event.button === 1 || event.ctrlKey || event.shiftKey || event.metaKey) {
//             event.preventDefault();
//         }
//     });
//     // Handle internal link clicks to load content dynamically
//     const links = document.querySelectorAll(".nav-link");
// });

// document.addEventListener("DOMContentLoaded", function () {
//     let count = localStorage.getItem("visitorCount");
//     if (!count) {
//         count = 1;
//     } else {
//         count = parseInt(count) + 1;
//     }
//     localStorage.setItem("visitorCount", count);
//     document.getElementById("visitor-count").innerText = count;
// });



const routeMap = {
    "/java/basic-java/": "/design/pages/java/basic-java.html",
    "/java/qa-part-6/": "/design/pages/java/qa_part-6.html",
    "/java/qa-part-5/": "/design/pages/java/qa_part-5.html",

    // Add all mappings here
};

function loadPage(event) {
    event.preventDefault();
    const link = event.currentTarget;
    const urlPath = new URL(link.href).pathname;

    const actualFilePath = routeMap[urlPath];
    if (!actualFilePath) return alert("Page not found");

    fetch(actualFilePath)
        .then(res => res.text())
        .then(html => {
            document.getElementById("content").innerHTML = html;
            history.pushState({ path: urlPath }, '', urlPath);
        });
}


// Quiz Questions Array
const questions = [
    {
        question: "What is the main advantage of using Spot Instances?",
        options: ["Provides consistent performance", "Reduces cost by up to 90%", "Guaranteed availability", "Always available in all regions"],
        correct: 1,
        explanation: "Spot Instances are ideal for workloads that are fault-tolerant and can handle interruptions."
    },
    {
        question: "Which AWS service is used for object storage?",
        options: ["Amazon EC2", "Amazon RDS", "Amazon S3", "AWS Lambda"],
        correct: 2,
        explanation: "Amazon S3 is an object storage service that offers scalability, security, and performance."
    },
    {
        question: "What does AWS Lambda do?",
        options: ["Runs containers", "Manages databases", "Executes code without provisioning servers", "Provides virtual machines"],
        correct: 2,
        explanation: "AWS Lambda runs code in response to events without provisioning or managing servers."
    }
    // Add up to 100+ questions here
];

function renderQuiz() {
    const quizContainer = document.getElementById("quiz-container");
    questions.forEach((q, index) => {
        let questionHTML = `<div class="question" id="question-${index}">
            <p><strong>${index + 1}. ${q.question}</strong></p>
            <ul>`;
        
        q.options.forEach((option, optIndex) => {
            questionHTML += `
                <li>
                    <input type="radio" name="q${index}" value="${optIndex}" id="q${index}-${optIndex}">
                    <label for="q${index}-${optIndex}">${option}</label>
                </li>`;
        });

        questionHTML += `
            </ul>
            <p class="explanation" id="explanation-${index}"><strong>Explanation:</strong> ${q.explanation}</p>
        </div>`;

        quizContainer.innerHTML += questionHTML;
    });
}

function checkAnswers() {
    questions.forEach((q, index) => {
        let selected = document.querySelector(`input[name="q${index}"]:checked`);
        let explanation = document.getElementById(`explanation-${index}`);

        if (selected) {
            let allOptions = document.querySelectorAll(`input[name="q${index}"]`);
            allOptions.forEach(opt => opt.classList.remove("correct", "wrong"));

            if (parseInt(selected.value) === q.correct) {
                selected.classList.add("correct");
            } else {
                selected.classList.add("wrong");
                document.getElementById(`q${index}-${q.correct}`).classList.add("correct");
            }

            explanation.style.display = "block";
        }
    });
}

renderQuiz();