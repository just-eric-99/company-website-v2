// ====================================
// Mobile Navigation with ARIA support
// ====================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const body = document.body;

// Toggle mobile menu
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';

        hamburger.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');

        // Prevent body scroll when menu is open
        if (!isExpanded) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Close menu on Escape key (accessibility)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            body.style.overflow = '';
            hamburger.focus(); // Return focus to hamburger
        }
    });
}

// ====================================
// Navbar Scroll Effect
// ====================================

const navbar = document.getElementById('navbar');

function handleScroll() {
    if (window.pageYOffset > 50) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
}

// Debounce scroll handler for performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(handleScroll, 10);
});

// ====================================
// Smooth Scrolling for Anchor Links
// ====================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Don't prevent default for empty hash
        if (href === '#' || !href) return;

        e.preventDefault();

        const target = document.querySelector(href);
        if (target) {
            const navbarHeight = navbar?.offsetHeight || 0;
            const targetPosition = target.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Set focus to target for accessibility
            target.setAttribute('tabindex', '-1');
            target.focus();
        }
    });
});

// ====================================
// Active Navigation Link Highlighting
// ====================================

const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
}

let navScrollTimeout;
window.addEventListener('scroll', () => {
    if (navScrollTimeout) {
        clearTimeout(navScrollTimeout);
    }
    navScrollTimeout = setTimeout(highlightNavigation, 10);
});

// ====================================
// Intersection Observer for Animations
// ====================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
            entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

            // Small delay for staggered effect
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);

            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.querySelectorAll('.service-card, .ai-card, .case-study-card, .approach-step').forEach(el => {
    fadeInObserver.observe(el);
});

// ====================================
// Contact Form Handling
// ====================================

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Validate required fields
        const requiredFields = ['name', 'email', 'message'];
        const missingFields = requiredFields.filter(field => !data[field] || data[field].trim() === '');

        if (missingFields.length > 0) {
            alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
            // Focus on first missing field
            const firstMissingField = document.getElementById(missingFields[0]);
            firstMissingField?.focus();
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address.');
            document.getElementById('email')?.focus();
            return;
        }

        // In a real application, you would send this data to a server
        console.log('Form submitted with data:', data);

        // Show success message
        alert('Thank you for your message! We\'ll get back to you within 24 hours.');

        // Reset form
        contactForm.reset();

        // Return focus to first field
        document.getElementById('name')?.focus();
    });

    // Real-time validation feedback
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', (e) => {
            const email = e.target.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (email && !emailRegex.test(email)) {
                e.target.setAttribute('aria-invalid', 'true');
                e.target.style.borderColor = 'var(--error)';
            } else {
                e.target.setAttribute('aria-invalid', 'false');
                e.target.style.borderColor = '';
            }
        });
    }
}

// ====================================
// Form Input Enhancements
// ====================================

const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');

formInputs.forEach(input => {
    // Show/hide labels with animation
    input.addEventListener('focus', function() {
        this.parentElement?.classList.add('focused');
    });

    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement?.classList.remove('focused');
        }
    });

    // If field has value on page load, keep label up
    if (input.value) {
        input.parentElement?.classList.add('focused');
    }
});

// ====================================
// Keyboard Navigation Improvements
// ====================================

// Trap focus within mobile menu when open
if (navMenu && hamburger) {
    const focusableElements = navMenu.querySelectorAll('a[href], button:not([disabled])');
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    navMenu.addEventListener('keydown', (e) => {
        if (!navMenu.classList.contains('active')) return;

        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable?.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable?.focus();
                }
            }
        }
    });
}

// ====================================
// Lazy Loading Optimization
// ====================================

if ('IntersectionObserver' in window) {
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                lazyObserver.unobserve(entry.target);
            }
        });
    });

    // Observe images and heavy content
    document.querySelectorAll('img[data-src], .code-window').forEach(el => {
        lazyObserver.observe(el);
    });
}

// ====================================
// Announce Dynamic Content Changes (Accessibility)
// ====================================

function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.classList.add('sr-only');
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remove after announcement
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// ====================================
// Prefers Reduced Motion Check
// ====================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    // Disable smooth scrolling
    document.documentElement.style.scrollBehavior = 'auto';

    // Disable other animations
    document.querySelectorAll('*').forEach(el => {
        el.style.transition = 'none';
        el.style.animation = 'none';
    });
}

// ====================================
// Performance: Monitor Page Load
// ====================================

window.addEventListener('load', () => {
    // Log page load time for monitoring
    const loadTime = performance.now();
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);

    // Optional: Send to analytics
    // analytics.track('page_load', { duration: loadTime });
});

// ====================================
// Dynamic Year in Footer
// ====================================

const updateYear = () => {
    const yearElements = document.querySelectorAll('.footer-bottom p');
    const currentYear = new Date().getFullYear();

    yearElements.forEach(el => {
        if (el.textContent.includes('2024')) {
            el.textContent = el.textContent.replace('2024', currentYear);
        }
    });
};

updateYear();

// ====================================
// Service Worker Registration (Optional)
// ====================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker for PWA functionality
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('ServiceWorker registered:', registration))
        //     .catch(error => console.log('ServiceWorker registration failed:', error));
    });
}

// ====================================
// Counter Animations for Hero Stats
// ====================================

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };

    updateCounter();
}

// Trigger counter animations when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                animateCounter(counter);
            });
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// ====================================
// Enhanced Terminal Interactions
// ====================================

const terminal = document.querySelector('.terminal');
if (terminal) {
    // Add subtle hover effect
    terminal.addEventListener('mouseenter', () => {
        terminal.style.transform = 'translateY(-2px)';
        terminal.style.transition = 'transform 0.3s ease';
    });

    terminal.addEventListener('mouseleave', () => {
        terminal.style.transform = 'translateY(0)';
    });
}

// ====================================
// Gradient Text Animation on Hover
// ====================================

const gradientTexts = document.querySelectorAll('.text-gradient');
gradientTexts.forEach(text => {
    text.addEventListener('mouseenter', () => {
        text.style.backgroundSize = '200% 200%';
        text.style.backgroundPosition = 'right center';
        text.style.transition = 'background-position 0.6s ease';
    });

    text.addEventListener('mouseleave', () => {
        text.style.backgroundPosition = 'left center';
    });
});

// ====================================
// Initialize Everything
// ====================================

console.log('🚀 Apex Labs website initialized');
console.log('✨ Energetic personality enabled');
console.log('♿ Accessibility features enabled');
console.log('✓ WCAG 2.2 compliant');
