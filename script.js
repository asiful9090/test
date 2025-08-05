// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initSmoothScrolling();
    initNavbarEffects();
    initNewsletterForm();
    initAnimations();
    initTestimonialSlider();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking on links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar Effects (Background change on scroll)
function initNavbarEffects() {
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('bg-white', 'shadow-lg');
                navbar.classList.remove('bg-white/95');
            } else {
                navbar.classList.remove('bg-white', 'shadow-lg');
                navbar.classList.add('bg-white/95');
            }
        });
    }
}

// Newsletter Form Handling
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('newsletter-name');
            const emailInput = document.getElementById('newsletter-email');
            
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            
            // Basic validation
            if (!name || !email) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Submitting...', 'info');
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Thank you for subscribing! We\'ll keep you updated.', 'success');
                newsletterForm.reset();
            }, 2000);
        });
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed top-20 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;
    
    // Set colors based on type
    switch (type) {
        case 'success':
            notification.classList.add('bg-green-500', 'text-white');
            break;
        case 'error':
            notification.classList.add('bg-red-500', 'text-white');
            break;
        case 'info':
            notification.classList.add('bg-blue-500', 'text-white');
            break;
        default:
            notification.classList.add('bg-gray-500', 'text-white');
    }
    
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Animations and Intersection Observer
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.card-hover, .bg-white.rounded-xl, .bg-gradient-to-br');
    animatedElements.forEach(el => {
        el.classList.add('opacity-0', 'transform', 'translate-y-8');
        observer.observe(el);
    });
    
    // Add CSS for fade-in animation
    const style = document.createElement('style');
    style.textContent = `
        .animate-fade-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Testimonial Slider (Simple version)
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.bg-white.rounded-xl.p-8.shadow-lg');
    let currentIndex = 0;
    
    if (testimonials.length > 0) {
        // Add fade effect to testimonials
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.opacity = '0.5';
                testimonial.style.transform = 'scale(0.95)';
            }
        });
        
        // Auto-rotate testimonials every 5 seconds
        setInterval(() => {
            testimonials[currentIndex].style.opacity = '0.5';
            testimonials[currentIndex].style.transform = 'scale(0.95)';
            
            currentIndex = (currentIndex + 1) % testimonials.length;
            
            testimonials[currentIndex].style.opacity = '1';
            testimonials[currentIndex].style.transform = 'scale(1)';
        }, 5000);
    }
}

// CTA Button Click Handlers
document.addEventListener('DOMContentLoaded', function() {
    // Handle "Start Now" buttons
    const startButtons = document.querySelectorAll('button:contains("Start Now"), .bg-primary');
    startButtons.forEach(button => {
        button.addEventListener('click', function() {
            showNotification('Redirecting to sign up page...', 'info');
            // Add your sign-up logic here
        });
    });
    
    // Handle "Watch Demo" button
    const demoButton = document.querySelector('button:contains("Watch Demo")');
    if (demoButton) {
        demoButton.addEventListener('click', function() {
            showNotification('Opening demo video...', 'info');
            // Add your demo video logic here
        });
    }
});

// Performance optimization: Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Search functionality (if needed)
function initSearch() {
    const searchInput = document.querySelector('#search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            // Add your search logic here
        });
    }
}

// Analytics tracking (Google Analytics 4)
function initAnalytics() {
    // Add your Google Analytics tracking code here
    // Example:
    // gtag('config', 'GA_MEASUREMENT_ID');
}

// Service Worker registration for PWA
function initServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then((registration) => {
                    console.log('SW registered: ', registration);
                })
                .catch((registrationError) => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}

// Keyboard navigation support
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Escape key to close mobile menu
        if (e.key === 'Escape') {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
        
        // Enter key for form submission
        if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
            const form = e.target.closest('form');
            if (form) {
                form.dispatchEvent(new Event('submit'));
            }
        }
    });
}

// Accessibility improvements
function initAccessibility() {
    // Add ARIA labels and roles
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label') && !button.textContent.trim()) {
            button.setAttribute('aria-label', 'Button');
        }
    });
    
    // Add focus indicators
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.classList.add('ring-2', 'ring-primary', 'ring-opacity-50');
        });
        
        element.addEventListener('blur', function() {
            this.classList.remove('ring-2', 'ring-primary', 'ring-opacity-50');
        });
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initLazyLoading();
    initSearch();
    initAnalytics();
    initServiceWorker();
    initKeyboardNavigation();
    initAccessibility();
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You can send error reports to your analytics service here
});

// Performance monitoring
window.addEventListener('load', function() {
    // Measure page load time
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log('Page load time:', loadTime + 'ms');
    
    // You can send performance metrics to your analytics service here
});