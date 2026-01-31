document.addEventListener('DOMContentLoaded', function() {

    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        const scrollTop = document.getElementById('scrollTop');
        if (scrollTop) {
            if (window.scrollY > 300) {
                scrollTop.classList.add('visible');
            } else {
                scrollTop.classList.remove('visible');
            }
        }
    });
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        

        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
    
    const scrollTop = document.getElementById('scrollTop');
    if (scrollTop) {
        scrollTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===============================================
    // STATISTICS COUNTER ANIMATION
    // ===============================================
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };
        
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000; // 2 seconds
                    const steps = 60;
                    const increment = target / steps;
                    let current = 0;
                    
                    const timer = setInterval(function() {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target + (target === 98 ? '%' : '+');
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current) + (target === 98 ? '%' : '+');
                        }
                    }, duration / steps);
                    
                    counterObserver.unobserve(counter);
                }
            });
        }, observerOptions);
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    // ===============================================
    // TESTIMONIAL SLIDER
    // ===============================================
    const testimonialTrack = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (testimonialTrack && prevBtn && nextBtn) {
        let currentSlide = 0;
        const slides = testimonialTrack.children.length;
        
        function updateSlider() {
            testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        
        prevBtn.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + slides) % slides;
            updateSlider();
        });
        
        nextBtn.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % slides;
            updateSlider();
        });
        
        // Auto-slide every 5 seconds
        setInterval(function() {
            currentSlide = (currentSlide + 1) % slides;
            updateSlider();
        }, 5000);
    }
    
    // ===============================================
    // BLOG CATEGORY FILTER
    // ===============================================
    const categoryTags = document.querySelectorAll('.category-tag');
    const blogCards = document.querySelectorAll('.blog-card');
    
    if (categoryTags.length > 0 && blogCards.length > 0) {
        categoryTags.forEach(tag => {
            tag.addEventListener('click', function() {
                // Remove active class from all tags
                categoryTags.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tag
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                
                // Filter blog cards
                blogCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // ===============================================
    // FAQ ACCORDION
    // ===============================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', function() {
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        });
    }
    
    // ===============================================
    // CONTACT FORM HANDLING
    // ===============================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Basic validation
            if (!formData.name || !formData.email || !formData.phone || !formData.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            console.log('Contact Form Data:', formData);
            
            // Show success message
            alert('Thank you for contacting us! We will get back to you within 24 hours.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // ===============================================
    // APPOINTMENT FORM HANDLING
    // ===============================================
    const appointmentForm = document.getElementById('appointmentForm');
    const successModal = document.getElementById('successModal');
    
    if (appointmentForm) {
        // Set minimum date to today
        const dateInput = document.getElementById('date');
        const alternateDateInput = document.getElementById('alternateDate');
        const today = new Date().toISOString().split('T')[0];
        
        if (dateInput) {
            dateInput.setAttribute('min', today);
        }
        if (alternateDateInput) {
            alternateDateInput.setAttribute('min', today);
        }
        
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                consultationType: document.getElementById('consultationType').value,
                date: document.getElementById('date').value,
                time: document.getElementById('time').value,
                alternateDate: document.getElementById('alternateDate').value,
                caseDetails: document.getElementById('caseDetails').value,
                urgency: document.getElementById('urgency').value,
                terms: document.getElementById('terms').checked
            };
            
            // Validation
            if (!formData.firstName || !formData.lastName || !formData.email || 
                !formData.phone || !formData.service || !formData.consultationType || 
                !formData.date || !formData.time || !formData.caseDetails || 
                !formData.urgency) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Terms validation
            if (!formData.terms) {
                alert('Please accept the terms and conditions.');
                return;
            }
            
            // Simulate form submission
            console.log('Appointment Form Data:', formData);
            
            // Show success modal
            if (successModal) {
                successModal.classList.add('show');
            }
            
            // Reset form
            appointmentForm.reset();
        });
    }
    
    // Close success modal function
    window.closeSuccessModal = function() {
        if (successModal) {
            successModal.classList.remove('show');
        }
    };
    
    // Close modal when clicking outside
    if (successModal) {
        successModal.addEventListener('click', function(e) {
            if (e.target === successModal) {
                closeSuccessModal();
            }
        });
    }
    
    // ===============================================
    // NEWSLETTER FORM HANDLING
    // ===============================================
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate subscription
            console.log('Newsletter Subscription:', email);
            
            // Show success message
            alert('Thank you for subscribing to our newsletter!');
            
            // Reset form
            newsletterForm.reset();
        });
    }
    
    // ===============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ===============================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just '#'
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===============================================
    // FADE-IN ANIMATION ON SCROLL
    // ===============================================
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length > 0) {
        const fadeObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        fadeElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            fadeObserver.observe(element);
        });
    }
    
    // ===============================================
    // CARD HOVER EFFECTS
    // ===============================================
    const cards = document.querySelectorAll('.practice-card, .why-card, .blog-card, .team-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // ===============================================
    // LOADING STATE
    // ===============================================
    window.addEventListener('load', function() {
        // Remove any loading overlays
        const loadingOverlay = document.querySelector('.loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 300);
        }
    });
    
    // ===============================================
    // PRINT FUNCTIONALITY (Optional)
    // ===============================================
    const printButtons = document.querySelectorAll('.print-btn');
    
    printButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            window.print();
        });
    });
    
    // ===============================================
    // CONSOLE INFO
    // ===============================================
    console.log('%c Sterling & Associates ', 'background: #1a365d; color: #C9A961; font-size: 20px; font-weight: bold; padding: 10px;');
    console.log('%c Premium Law Firm Website ', 'background: #C9A961; color: #ffffff; font-size: 14px; padding: 5px;');
    console.log('Website developed with modern web technologies');
    
});

// ===============================================
// UTILITY FUNCTIONS
// ===============================================

// Format Phone Number
function formatPhoneNumber(phone) {
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phone;
}

// Validate Email
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Get Current Date
function getCurrentDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}


function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatPhoneNumber,
        validateEmail,
        getCurrentDate,
        throttle,
        debounce
    };
}