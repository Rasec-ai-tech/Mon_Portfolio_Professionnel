// Main JavaScript for Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger) {
                hamburger.classList.remove('active');
            }
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (hamburger && navMenu) {
            if (!event.target.closest('.nav-container')) {
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        }
    });
    
    // Contact form handling - Advanced with validation & progress
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input[required], textarea[required], select[required]');
        const progressBar = document.getElementById('progressBar');
        const messageField = document.getElementById('message');
        const charCount = document.getElementById('charCount');
        const formSuccess = document.getElementById('formSuccess');

        // Update progress bar
        const updateProgress = () => {
            let filled = 0;
            inputs.forEach(input => {
                if (input.value.trim() !== '') filled++;
            });
            const percentage = (filled / inputs.length) * 100;
            if (progressBar) {
                progressBar.style.width = percentage + '%';
            }
        };

        // Character counter
        if (messageField) {
            messageField.addEventListener('input', function() {
                if (charCount) {
                    charCount.textContent = this.value.length;
                }
                updateProgress();
            });
        }

        // Update progress on input
        inputs.forEach(input => {
            input.addEventListener('input', updateProgress);
            input.addEventListener('change', updateProgress);
        });

        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Validation
            let isValid = true;
            document.querySelectorAll('.form-error').forEach(el => el.textContent = '');

            if (!name.trim()) {
                document.getElementById('nameError').textContent = 'Le nom est requis';
                isValid = false;
            }
            if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                document.getElementById('emailError').textContent = 'Email invalide';
                isValid = false;
            }
            if (!subject.trim()) {
                document.getElementById('subjectError').textContent = 'Le sujet est requis';
                isValid = false;
            }
            if (!message.trim()) {
                document.getElementById('messageError').textContent = 'Le message est requis';
                isValid = false;
            }

            if (isValid) {
                // Show success message
                if (formSuccess) {
                    formSuccess.classList.add('show');
                }
                alert(`Merci ${name}! Votre message a été reçu. Je vous répondrai bientôt à ${email}.`);
                contactForm.reset();
                progressBar.style.width = '0%';
                if (charCount) charCount.textContent = '0';
                setTimeout(() => {
                    if (formSuccess) {
                        formSuccess.classList.remove('show');
                    }
                }, 5000);
            }
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add animation to elements on scroll
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Optional: stop observing after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.project-card, .skill-item, .category-card, .product-card, .about-preview-image, .competence-card, .timeline-item, .value-item, .process-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Project Filtering Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    // Re-trigger animation
                    card.classList.remove('animate-in');
                    setTimeout(() => {
                        card.classList.add('animate-in');
                    }, 10);
                } else {
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === filterValue) {
                        card.style.display = 'block';
                        // Re-trigger animation
                        card.classList.remove('animate-in');
                        setTimeout(() => {
                            card.classList.add('animate-in');
                        }, 10);
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });

    // Skills Filtering Functionality
    const skillFilterButtons = document.querySelectorAll('.skills-filters .filter-btn');
    const competenceSections = document.querySelectorAll('[data-category]');
    
    skillFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            skillFilterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter competencies
            const filterValue = this.getAttribute('data-filter');
            
            competenceSections.forEach(section => {
                if (filterValue === 'all') {
                    section.style.display = 'block';
                    section.classList.remove('animate-in');
                    setTimeout(() => {
                        section.classList.add('animate-in');
                    }, 10);
                } else {
                    const sectionCategory = section.getAttribute('data-category');
                    if (sectionCategory === filterValue) {
                        section.style.display = 'block';
                        section.classList.remove('animate-in');
                        setTimeout(() => {
                            section.classList.add('animate-in');
                        }, 10);
                    } else {
                        section.style.display = 'none';
                    }
                }
            });
        });
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqId = this.getAttribute('data-faq');
            const answer = document.getElementById(`faq-${faqId}`);
            
            // Close other FAQs
            document.querySelectorAll('.faq-answer.show').forEach(el => {
                if (el.id !== `faq-${faqId}`) {
                    el.classList.remove('show');
                }
            });
            document.querySelectorAll('.faq-question.active').forEach(el => {
                if (el.getAttribute('data-faq') !== faqId) {
                    el.classList.remove('active');
                }
            });

            // Toggle current FAQ
            this.classList.toggle('active');
            if (answer) {
                answer.classList.toggle('show');
            }
        });
    });
    
    // Set current page link as active
    const currentPage = window.location.pathname;
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPage.includes(href) || (currentPage.endsWith('/') && href.includes('index.html'))) {
            link.classList.add('active');
        }
    });

    // Scroll to Top Button functionality
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Add smooth transitions on page load
    document.body.style.opacity = '1';
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .animate-in {
        animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    img {
        transition: opacity 0.3s ease;
        opacity: 1;
    }

    a {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// Timeline interactivity - Show/hide descriptions on click (only for process timeline)
const processTimelineItems = document.querySelectorAll('.process-timeline .timeline-item');
processTimelineItems.forEach(item => {
    const marker = item.querySelector('.timeline-marker');
    const title = item.querySelector('.timeline-content h3');
    
    const toggleDescription = () => {
        processTimelineItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        item.classList.toggle('active');
    };
    
    if (marker) {
        marker.addEventListener('click', toggleDescription);
    }
    
    if (title) {
        title.addEventListener('click', toggleDescription);
    }
});