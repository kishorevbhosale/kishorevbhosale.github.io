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
const links = [
    // DATABASE
    { text: "Database Concepts", url: "design/pages/db/database.html" },
    { text: "Database Types", url: "design/pages/db/different_types_db.html" },
    { text: "Right Database Choice", url: "design/pages/db/database-choice.html" },
    { text: "DynamoDB", url: "design/pages/db/dynamodb.html" },
    { text: "ElasticSearch", url: "design/pages/db/elasticsearch.html" },
    { text: "Redis", url: "design/pages/under_construction.html" },
    { text: "Cassendra", url: "design/pages/under_construction.html" },
    { text: "MySQL Queries", url: "design/pages/under_construction.html" },

    // OOPs
    { text: "Basic of OOPs", url: "design/pages/oops/basic_oops.html" },
    { text: "Data Hiding - Encapsulation", url: "design/pages/oops/encapsulation.html" },
    { text: "Data Hiding - Abstraction", url: "design/pages/oops/abstraction.html" },
    { text: "Inheritance", url: "design/pages/oops/inheritance.html" },
    { text: "Polymorphism", url: "design/pages/oops/polymorphism.html" },
    
    // SOLID
    { text: "Single Responsibility Principle (SRP)", url: "design/pages/solid/srp.html" },
    { text: "Open Closed Principle (OCP)", url: "design/pages/solid/ocp.html" },
    { text: "Liskov Substitution Principle (LSP)", url: "design/pages/solid/lsp.html" },
    { text: "Interface Segregation Principle (ISP)", url: "design/pages/solid/isp.html" },
    { text: "Dependency Inversion Principle (DIP)", url: "design/pages/solid/dip.html" },
    
    // Design Patterns
    { text: "Introduction to Design Patterns", url: "design/pages/design_pattern/introduction.html" },
    { text: "Creational Design Patterns", url: "design/pages/design_pattern/creational/creational_dp.html" },
    { text: "Singleton Design Patterns", url: "design/pages/design_pattern/creational/singleton.html" },
    
    
    // loww level design
    { text: "Design Parking-Lot", url: "design/pages/low_level_design/parking-lot.html" },
    { text: "Design Elevator", url: "design/pages/under_construction.html" },
    { text: "Design Library Management System", url: "design/pages/under_construction.html" },
    { text: "Design Amazon Locker", url: "design/pages/under_construction.html" },
    { text: "Design a Vending Machine", url: "design/pages/under_construction.html" },
    { text: "Design Meeting Scheduler", url: "design/pages/under_construction.html" },
    { text: "Design Movie Ticket Booking", url: "design/pages/under_construction.html" },
    { text: "Design Cab Booking like Uber, Ola", url: "design/pages/under_construction.html" },
    { text: "Design ATM", url: "design/pages/under_construction.html" },
    { text: "Design Restaurant Management System", url: "design/pages/under_construction.html" },
    { text: "Design StackOverflow", url: "design/pages/under_construction.html" },
    { text: "Design Cache System", url: "design/pages/under_construction.html" },
    { text: "Implement Logger System", url: "design/pages/under_construction.html" },
    { text: "Design CricInfo/Cricbuzz", url: "design/pages/under_construction.html" },
    { text: "Design Online Hotel Booking System", url: "design/pages/under_construction.html" },
    
    // system design theory
    { text: "Building Blocks of System Design", url: "design/pages/system_design_theory/building_blocks.html" },
    { text: "Scale Zero To Million", url: "design/pages/system_design_theory/scale_zero_to_million.html" },
    { text: "Effective Estimation", url: "design/pages/system_design_theory/estimation.html" },
    { text: "Performance vs Scalability", url: "design/pages/system_design_theory/performance_scalability.html" },
    { text: "CAP Theory", url: "design/pages/system_design_theory/cap.html" },
    { text: "Domain Name System (DNS)", url: "design/pages/system_design_theory/dns.html" },
    { text: "Content Delivery Network (CDN)", url: "design/pages/system_design_theory/cdn.html" },
    { text: "Load Balancer", url: "design/pages/system_design_theory/load_balancer.html" },
    { text: "Proxy vs Reverse Proxy", url: "design/pages/system_design_theory/proxy_vs_reverse_proxy.html" },
    { text: "Protocols: TCP/UDP/HTTP'S/SSL/TLS", url: "design/pages/system_design_theory/protocols.html" },
    { text: "Database", url: "design/pages/system_design_theory/database.html" },
    { text: "Different Types Of Databases", url: "design/pages/system_design_theory/different_types_db.html" },
    { text: "Cache", url: "design/pages/system_design_theory/cache.html" },
    { text: "Message Queues", url: "design/pages/system_design_theory/queues.html" },
    { text: "RabbitMQ", url: "design/pages/system_design_theory/rabbitmq.html" },
    { text: "Reference Sites", url: "design/pages/system_design_theory/sd_reference.html" },
    
    // system design example
    { text: "Sequence Generator", url: "design/pages/system_design_example/sequence_generator.html" },
    { text: "Design a URL Shortener", url: "design/pages/under_construction.html" },
    { text: "Design a Rate Limiter", url: "design/pages/under_construction.html" },
    { text: "Design a Cache (e.g. Redis)", url: "design/pages/under_construction.html" },
    { text: "Design a Notification System", url: "design/pages/under_construction.html" },
    { text: "Design a Distributed Search System", url: "design/pages/under_construction.html" },
    { text: "Design a Distributed Logging System", url: "design/pages/under_construction.html" },
    { text: "Design a Messaging System (e.g., WhatsApp)", url: "design/pages/under_construction.html" },
    { text: "Design a Search Autocomplete System", url: "design/pages/under_construction.html" },
    { text: "Design Facebook", url: "design/pages/under_construction.html" },
    { text: "Design Twitter", url: "design/pages/under_construction.html" },
    { text: "Design YouTube", url: "design/pages/under_construction.html" },
    { text: "Design QUORA", url: "design/pages/under_construction.html" },
    { text: "Design Google Map", url: "design/pages/under_construction.html" },
    { text: "Design Uber", url: "design/pages/under_construction.html" },
    { text: "Design Instagram", url: "design/pages/under_construction.html" },
    { text: "Design a Collaborative Document Editing Service / Google Docs", url: "design/pages/under_construction.html" },
    { text: "Design an e-commerce platform (like Amazon)", url: "design/pages/under_construction.html" },
    
    // microservices
    { text: "Monolithic vs Microservices", url: "design/pages/microservices/mono_vs_micro.html" },
    { text: "Build Microservice - Example", url: "design/pages/microservices/building_microservice.html" },
    { text: "Size of Microservices", url: "design/pages/microservices/sizing_of_microservice.html" },
    
    // spring boot
    { text: "Introduction to Spring Framework", url: "design/pages/spring_boot/introduction.html" },
    { text: "Introduction to Beans", url: "design/pages/spring_boot/spring_beans.html" },
    { text: "Spring Bean Scope", url: "design/pages/spring_boot/bean_scope.html" },
    { text: "Spring Bean Autowiring", url: "design/pages/spring_boot/spring_bean_autowiring.html" },
    { text: "Aspect Oriented Programming (AOP)", url: "design/pages/spring_boot/aop.html" },
    { text: "Stereotype Annotation", url: "design/pages/spring_boot/stereotype_annotations.html" },
    { text: "Spring Boot Annotations", url: "design/pages/spring_boot/spring_boot_annotations.html" },
    { text: "Spring Boot Exception Handling", url: "design/pages/spring_boot/exception_handling.html" },
    { text: "Spring Boot Input Data Validation", url: "design/pages/spring_boot/input_data_validation.html" },
    { text: "Spring Boot REST API Documentation", url: "design/pages/spring_boot/rest_api_documentation.html" },

    // cicd
    { text: "CICD flow", url: "design/pages/devops/cicd_flow.html" },
    { text: "Complete Git Command Cheatsheet", url: "design/pages/devops/git_commands.html" },
    { text: "Complete Docker Command Cheatsheet", url: "design/pages/devops/docker_commands.html" },
    
    // general
    { text: "OSI layer", url: "design/pages/general/osi_layer.html" },
    { text: "Improve API Performance", url: "design/pages/general/api_performace.html" }
];

document.getElementById('searchButton').addEventListener('click', function () {
    performSearch();
});

document.getElementById('searchInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const filter = document.getElementById('searchInput').value.toLowerCase(); // Search filter
    const foundLink = links.find(link => link.text.toLowerCase().includes(filter)); // Find matching link

    if (foundLink) {
        // Redirect to the found link
        const anchor = document.createElement('a');
        anchor.href = foundLink.url;
        anchor.className = 'nav-link';
        anchor.onclick = loadPage; // Ensure the loadPage function is called
        anchor.click(); // Simulate a click on the link
    } else {
        alert('No matching topic found.');
    }
}


