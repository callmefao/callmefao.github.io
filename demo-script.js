// DOM Elements
const header = document.getElementById("header");
const menuToggle = document.getElementById("menu-toggle");
const menu = document.querySelector(".menu");
const menuLinks = document.querySelectorAll(".menu-link");
const currentYearEl = document.getElementById("current-year");

// Set current year in footer
currentYearEl.textContent = new Date().getFullYear();

// Header scroll effect
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// Mobile menu toggle
menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
    menuToggle.classList.toggle("active");
});

// Close mobile menu when clicking a link
menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
        menu.classList.remove("active");
        menuToggle.classList.remove("active");
    });
});

// Lazy load video elements
document.addEventListener("DOMContentLoaded", function() {
    // Enhance video playback
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        // Add loading="lazy" attribute for better performance
        video.setAttribute('loading', 'lazy');
        
        // Add poster image if not already set
        if (!video.hasAttribute('poster') && video.getAttribute('src')) {
            // You can set a default poster image or generate one
            // video.setAttribute('poster', 'images/video-placeholder.jpg');
        }
        
        // Add pause when out of viewport to save resources
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Don't autoplay, just prepare the video
                    video.load();
                } else {
                    // Pause the video when not in view
                    if (!video.paused) {
                        video.pause();
                    }
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(video);
    });
    
    // Handle image loading
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
});