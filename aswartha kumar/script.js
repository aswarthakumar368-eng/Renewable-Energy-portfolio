// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const activitySections = document.querySelectorAll('.activity-section');

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get target activity ID
            const targetId = this.getAttribute('href').substring(1);
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            activitySections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link and corresponding section
            this.classList.add('active');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Smooth scroll to top of the section
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle hash navigation on page load
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const targetLink = document.querySelector(`.nav-link[href="#${hash}"]`);
        const targetSection = document.getElementById(hash);
        
        if (targetLink && targetSection) {
            navLinks.forEach(l => l.classList.remove('active'));
            activitySections.forEach(s => s.classList.remove('active'));
            
            targetLink.classList.add('active');
            targetSection.classList.add('active');
        }
    } else {
        // Default to Activity 1
        const firstLink = navLinks[0];
        const firstSection = activitySections[0];
        if (firstLink && firstSection) {
            firstLink.classList.add('active');
            firstSection.classList.add('active');
        }
    }

    // Smooth scroll behavior for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe explanation sections
    document.querySelectorAll('.explanation').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

