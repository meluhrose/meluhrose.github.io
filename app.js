// SPA Router and Navigation
class SPARouter {
    constructor() {
        this.routes = {
            'home': document.getElementById('home'),
            'about': document.getElementById('about'),
            'projects': document.getElementById('projects'),
            'contact': document.getElementById('contact')
        };
        this.currentPage = 'home';
        this.init();
    }

    init() {
        // Set up navigation links
        this.setupNavigation();
        
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                this.navigateTo(e.state.page, false);
            }
        });

        // Handle initial page load
        const hash = window.location.hash.slice(1) || 'home';
        this.navigateTo(hash, true);
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                this.navigateTo(page, true);
                
                // Close mobile menu if open
                this.closeMobileMenu();
            });
        });
    }

    navigateTo(page, updateHistory = true) {
        // Validate page exists
        if (!this.routes[page]) {
            page = 'home';
        }

        // Hide current page
        if (this.routes[this.currentPage]) {
            this.routes[this.currentPage].classList.remove('active');
        }

        // Show new page
        this.routes[page].classList.add('active');

        // Update navigation active state
        this.updateActiveNav(page);

        // Update browser history
        if (updateHistory) {
            window.history.pushState({ page: page }, '', `#${page}`);
        }

        // Update current page
        this.currentPage = page;

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    updateActiveNav(page) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (link.getAttribute('data-page') === page) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    closeMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
}

// Mobile Menu Toggle
class MobileMenu {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.init();
    }

    init() {
        if (this.hamburger && this.navMenu) {
            this.hamburger.addEventListener('click', () => {
                this.toggleMenu();
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('#navbar')) {
                    this.closeMenu();
                }
            });
        }
    }

    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    }

    closeMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
    }
}

// Contact Form Handler
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.messageDiv = document.getElementById('formMessage');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }
    }

    handleSubmit() {
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Validate form
        if (!this.validateForm(formData)) {
            this.showMessage('Please fill in all fields correctly.', 'error');
            return;
        }

        // Simulate form submission (in real app, this would send to a server)
        this.simulateSubmission(formData);
    }

    validateForm(data) {
        // Check if all fields are filled
        if (!data.name || !data.email || !data.message) {
            return false;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return false;
        }

        return true;
    }

    simulateSubmission(data) {
        // Show loading state
        const submitBtn = this.form.querySelector('.btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate network delay
        setTimeout(() => {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // Show success message
            this.showMessage('Thank you for your message! I will get back to you soon.', 'success');

            // Reset form
            this.form.reset();

            // Hide message after 5 seconds
            setTimeout(() => {
                this.hideMessage();
            }, 5000);
        }, 1500);
    }

    showMessage(text, type) {
        this.messageDiv.textContent = text;
        this.messageDiv.className = `form-message ${type}`;
    }

    hideMessage() {
        this.messageDiv.className = 'form-message';
    }
}

// Smooth Scroll for Internal Links
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Add smooth scrolling to all links that aren't nav links
        document.querySelectorAll('a[href^="#"]:not(.nav-link)').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    const page = href.slice(1);
                    if (window.router) {
                        window.router.navigateTo(page, true);
                    }
                }
            });
        });
    }
}

// Navbar Scroll Effect
class NavbarScroll {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.init();
    }

    init() {
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                this.navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
            } else {
                this.navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            }

            lastScroll = currentScroll;
        });
    }
}

// Animation Observer for scroll animations
class AnimationObserver {
    constructor() {
        this.init();
    }

    init() {
        // Create intersection observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements that should animate
        const animateElements = document.querySelectorAll('.project-card, .about-content, .contact-content');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize SPA Router
    window.router = new SPARouter();

    // Initialize Mobile Menu
    new MobileMenu();

    // Initialize Contact Form
    new ContactForm();

    // Initialize Smooth Scroll
    new SmoothScroll();

    // Initialize Navbar Scroll Effect
    new NavbarScroll();

    // Initialize Animation Observer
    new AnimationObserver();

    // Log initialization
    console.log('Portfolio SPA initialized successfully!');
});

// Export for potential testing or external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SPARouter,
        MobileMenu,
        ContactForm,
        SmoothScroll,
        NavbarScroll,
        AnimationObserver
    };
}
