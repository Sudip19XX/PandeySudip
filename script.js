/**
 * Vintage Portfolio - JavaScript
 * Handles navigation, smooth scrolling, and interactive features
 */

document.addEventListener('DOMContentLoaded', () => {




    // ==========================================================================
    // Smooth Scroll for Anchor Links
    // ==========================================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = targetPosition - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================================================
    // Card Animation on Scroll
    // ==========================================================================
    const animateCards = () => {
        const cards = document.querySelectorAll('.card');

        const cardObserverOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const cardObserverCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        };

        const cardObserver = new IntersectionObserver(cardObserverCallback, cardObserverOptions);

        cards.forEach((card, index) => {
            // Initial state
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;

            cardObserver.observe(card);
        });
    };

    // Initialize card animations
    animateCards();



    // ==========================================================================
    // Typing Effect for Hero Title (optional enhancement)
    // ==========================================================================
    const heroTitle = document.querySelector('.hero-title');

    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid var(--color-primary-blue)';

        let charIndex = 0;
        const typeSpeed = 50;

        const type = () => {
            if (charIndex < originalText.length) {
                heroTitle.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(type, typeSpeed);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 500);
            }
        };

        // Start typing after a short delay
        setTimeout(type, 800);
    }

    // ==========================================================================
    // Tag Hover Ripple Effect
    // ==========================================================================
    const tags = document.querySelectorAll('.tag');

    tags.forEach(tag => {
        tag.addEventListener('mouseenter', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            this.style.setProperty('--ripple-x', `${x}px`);
            this.style.setProperty('--ripple-y', `${y}px`);
        });
    });

    // ==========================================================================
    // Splash Screen / Envelope Opening Animation
    // ==========================================================================
    const splashScreen = document.getElementById('splashScreen');

    // Function to handle animation sequence
    const triggerEnvelopeAnimation = () => {
        // Step 1: Small delay before starting
        setTimeout(() => {
            splashScreen.classList.add('active');
            document.body.classList.add('loaded');

            // Step 2: Start opening the envelope
            splashScreen.classList.add('active');
            document.body.classList.add('loaded');

            // Step 3: Start expanding after flap opens
            setTimeout(() => {
                splashScreen.classList.add('expanding');

                // Step 4: Fade out everything once expanded
                setTimeout(() => {
                    splashScreen.classList.add('fade-out');

                    // Step 5: Remove from DOM
                    setTimeout(() => {
                        splashScreen.remove();
                    }, 1000);
                }, 1000); // Wait for expansion to complete
            }, 800); // Wait for flap to open a bit
        }, 500);
    };

    // Trigger animation when everything is loaded
    if (splashScreen) {
        window.addEventListener('load', triggerEnvelopeAnimation);

        // Fallback in case window load takes too long
        setTimeout(() => {
            if (document.body.contains(splashScreen)) {
                triggerEnvelopeAnimation();
            }
        }, 3000);
    }

    // ==========================================================================
    // Console Easter Egg
    // ==========================================================================
    console.log('%c✉️ Welcome to my vintage portfolio!', 'font-size: 20px; color: #1e4d8c; font-family: Georgia, serif;');
    console.log('%cBuilt with care and attention to detail.', 'font-size: 12px; color: #64748b;');
});
