// CareLoop Website JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeModal();
    initializeScrollEffects();
    initializeFormHandling();
    initializeAnimations();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Modal functionality
function initializeModal() {
    const modal = document.getElementById('demo-modal');
    const closeBtn = document.querySelector('.close');

    // Close modal when clicking the X
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    if (modal) {
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal && modal.style.display === 'block') {
            closeModal();
        }
    });
}

// Open demo modal
function openDemo() {
    const modal = document.getElementById('demo-modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Focus on first input for accessibility
        const firstInput = modal.querySelector('input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }
}

// Close demo modal
function closeModal() {
    const modal = document.getElementById('demo-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Open contact (placeholder function)
function openContact() {
    // In a real implementation, this would open a contact form or redirect
    alert('Contact form coming soon! For now, please email us at hello@careloop.com');
}

// Scroll to section utility function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerOffset = 80;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Form handling
function initializeFormHandling() {
    const demoForm = document.querySelector('.demo-form');
    
    if (demoForm) {
        demoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleDemoFormSubmission(this);
        });
    }

    // Add form validation
    const inputs = document.querySelectorAll('input[required], select[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

// Handle demo form submission
function handleDemoFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!validateForm(form)) {
        return;
    }

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Starting Trial...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // In a real implementation, this would make an actual API call
        console.log('Demo form submitted:', data);
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        form.reset();
        closeModal();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Form validation
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
            showFieldError(field, 'Please enter a valid email address');
            isValid = false;
        }
    });
    
    return isValid;
}

// Individual field validation
function validateField(e) {
    const field = e.target;
    clearFieldError(field);
    
    if (field.hasAttribute('required') && !field.value.trim()) {
        showFieldError(field, 'This field is required');
    } else if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
        showFieldError(field, 'Please enter a valid email address');
    }
}

// Clear field error
function clearFieldError(field) {
    if (typeof field === 'object' && field.target) {
        field = field.target;
    }
    
    field.classList.remove('error');
    const errorMsg = field.parentNode.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff4757';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorDiv);
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show success message
function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            z-index: 3000;
            animation: slideIn 0.3s ease;
        ">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-check-circle"></i>
                <span>Free trial started! Check your email for next steps.</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(successDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Scroll effects and animations
function initializeScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card, .step');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Initialize animations
function initializeAnimations() {
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
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
        
        .feature-card,
        .testimonial-card,
        .pricing-card,
        .step {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .feature-card.animate-in,
        .testimonial-card.animate-in,
        .pricing-card.animate-in,
        .step.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .form-group input.error,
        .form-group select.error {
            border-color: #ff4757;
            box-shadow: 0 0 0 2px rgba(255, 71, 87, 0.2);
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                left: -100%;
                top: 70px;
                flex-direction: column;
                background-color: white;
                width: 100%;
                text-align: center;
                transition: 0.3s;
                box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
                padding: 2rem 0;
            }
            
            .nav-menu.active {
                left: 0;
            }
            
            .hamburger.active span:nth-child(2) {
                opacity: 0;
            }
            
            .hamburger.active span:nth-child(1) {
                transform: translateY(8px) rotate(45deg);
            }
            
            .hamburger.active span:nth-child(3) {
                transform: translateY(-8px) rotate(-45deg);
            }
        }
    `;
    document.head.appendChild(style);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Analytics tracking (placeholder)
function trackEvent(eventName, properties = {}) {
    // In a real implementation, this would send data to analytics service
    console.log('Event tracked:', eventName, properties);
}

// Track button clicks
document.addEventListener('click', function(e) {
    if (e.target.matches('.primary-btn, .secondary-btn, .cta-button')) {
        const buttonText = e.target.textContent.trim();
        trackEvent('button_click', {
            button_text: buttonText,
            page_url: window.location.href
        });
    }
});

// Track form submissions
document.addEventListener('submit', function(e) {
    if (e.target.matches('.demo-form')) {
        trackEvent('form_submit', {
            form_type: 'demo_request',
            page_url: window.location.href
        });
    }
});

// Performance monitoring
window.addEventListener('load', function() {
    // Track page load time
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    trackEvent('page_load', {
        load_time: loadTime,
        page_url: window.location.href
    });
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    trackEvent('javascript_error', {
        error_message: e.message,
        error_file: e.filename,
        error_line: e.lineno,
        page_url: window.location.href
    });
});

// Service worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/sw.js')
        //     .then(function(registration) {
        //         console.log('SW registered: ', registration);
        //     })
        //     .catch(function(registrationError) {
        //         console.log('SW registration failed: ', registrationError);
        //     });
    });
}
