
// Futuristic 3D Portfolio JavaScript

// Global variables
let mouseX = 0;
let mouseY = 0;
let particles = [];
let isLoaded = false;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializePortfolio();
});

// Main initialization function
function initializePortfolio() {
    // Show loading screen
    showLoadingScreen();
    
    // Initialize components
    setTimeout(() => {
        initializeNavigation();
        initializeParticleSystem();
        initialize3DEffects();
        initializeAnimations();
        initializeScrollEffects();
        initializeContactHandlers();
        initializeTypingAnimation();
        
        // Hide loading screen
        hideLoadingScreen();
        isLoaded = true;
    }, 2000);
}

// Loading screen
function showLoadingScreen() {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading';
    loadingDiv.innerHTML = `
        <div class="loading-spinner"></div>
    `;
    document.body.appendChild(loadingDiv);
}

function hideLoadingScreen() {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.remove();
        }, 500);
    }
}

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.header');

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Close mobile menu
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        if (scrolled > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.transform = 'translateZ(10px)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.8)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.transform = 'translateZ(0px)';
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Enhanced particle system
function initializeParticleSystem() {
    const particlesContainer = document.querySelector('.particles-container');
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.bottom = '-10px';
        
        // Random animation duration and delay
        const duration = Math.random() * 6 + 4; // 4-10 seconds
        const delay = Math.random() * 2; // 0-2 seconds delay
        
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';
        
        // Random size
        const size = Math.random() * 3 + 1; // 1-4px
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.7 + 0.3; // 0.3-1.0
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, (duration + delay) * 1000);
    }
    
    // Create particles continuously
    setInterval(createParticle, 200);
    
    // Create initial burst of particles
    for (let i = 0; i < 20; i++) {
        setTimeout(createParticle, i * 100);
    }
}

// Advanced 3D effects
function initialize3DEffects() {
    // Parallax effect for hero background and photo
    function updateParallax3D() {
        const heroBg = document.querySelector('.hero-bg-3d');
        if (heroBg) {
            const intensity = 20;
            heroBg.style.transform = `
                translate3d(${mouseX * intensity}px, ${mouseY * intensity}px, 0)
                rotateY(${mouseX * 5}deg)
                rotateX(${-mouseY * 5}deg)
            `;
        }
        
        // Update photo 3D effects
        updatePhoto3D();
        
        // Update floating background elements
        updateFloatingElements();
    }
    
    // 3D Photo effects based on mouse movement
    function updatePhoto3D() {
        const photoFrame = document.querySelector('.photo-frame');
        const photo = document.querySelector('.profile-photo-3d');
        
        if (photoFrame && photo) {
            const intensity = 15;
            const rotationX = mouseY * intensity;
            const rotationY = mouseX * intensity;
            
            photoFrame.style.transform = `
                translateY(0px)
                rotateX(${-rotationX}deg)
                rotateY(${rotationY}deg)
                translateZ(20px)
            `;
            
            // Add subtle scale effect
            const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
            const scale = 1 + (distance * 0.1);
            photo.style.transform = `translateZ(50px) scale(${Math.min(scale, 1.15)})`;
        }
    }
    
    // Update floating 3D elements
    function updateFloatingElements() {
        const cubes = document.querySelectorAll('.floating-cube');
        const spheres = document.querySelectorAll('.floating-sphere');
        
        cubes.forEach((cube, index) => {
            const intensity = 15 + (index * 5);
            const rotationX = mouseY * intensity;
            const rotationY = mouseX * intensity;
            
            cube.style.transform = `
                translate3d(${mouseX * intensity}px, ${mouseY * intensity}px, 0)
                rotateX(${rotationX}deg)
                rotateY(${rotationY}deg)
            `;
        });
        
        spheres.forEach((sphere, index) => {
            const intensity = 10 + (index * 3);
            sphere.style.transform = `
                translate3d(${mouseX * intensity}px, ${mouseY * intensity}px, 0)
            `;
        });
    }
    
    // 3D card hover effects
    function update3DCards(e) {
        const cards = document.querySelectorAll('.skill-category-3d, .project-card-3d, .hologram-card');
        
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;
            
            const deltaX = (e.clientX - cardCenterX) / (rect.width / 2);
            const deltaY = (e.clientY - cardCenterY) / (rect.height / 2);
            
            // Only apply effect if mouse is near the card
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            if (distance < 1.5) {
                const rotateX = deltaY * 10;
                const rotateY = deltaX * 10;
                const translateZ = Math.max(0, 20 - distance * 10);
                
                card.style.transform = `
                    perspective(1000px)
                    rotateX(${-rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateZ(${translateZ}px)
                    scale(${1 + (1 - distance) * 0.05})
                `;
            } else {
                card.style.transform = '';
            }
        });
    }
    
    // Reset card transforms when mouse leaves window
    document.addEventListener('mouseleave', () => {
        const cards = document.querySelectorAll('.skill-category-3d, .project-card-3d, .hologram-card');
        cards.forEach(card => {
            card.style.transform = '';
        });
    });
    
    // Mouse tracking for global 3D effects (moved after function definitions)
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) - 0.5;
        mouseY = (e.clientY / window.innerHeight) - 0.5;
        
        updateParallax3D();
        update3DCards(e);
    });
}

// Advanced scroll animations
function initializeScrollEffects() {
    // Intersection Observer for reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Staggered animations for grid items
                if (entry.target.parentElement.classList.contains('skills-grid') || 
                    entry.target.parentElement.classList.contains('projects-grid')) {
                    const siblings = Array.from(entry.target.parentElement.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const animateElements = document.querySelectorAll(`
        .skill-category-3d,
        .project-card-3d,
        .hologram-card,
        .timeline-content,
        .contact-form-3d
    `);
    
    animateElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
    
    // Parallax scrolling for sections
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Photo scroll effects
        updatePhotoScroll(scrolled);
        
        // Parallax effect for floating elements
        const floatingElements = document.querySelectorAll('.floating-cube, .floating-sphere');
        floatingElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.1);
            element.style.transform += ` translateY(${scrolled * speed}px)`;
        });
        
        // Update neural network animation based on scroll
        updateNeuralNetwork(scrolled);
    });
    
    function updatePhotoScroll(scrolled) {
        const photoFrame = document.querySelector('.photo-frame');
        const photo = document.querySelector('.profile-photo-3d');
        const photoGlow = document.querySelector('.photo-glow');
        const particles = document.querySelectorAll('.code-particle');
        
        if (photoFrame) {
            // Enhanced scroll-based rotation and translation with more dynamic effects
            const scrollIntensity = scrolled * 0.08;
            const rotationY = Math.sin(scrolled * 0.012) * 15;
            const rotationX = Math.cos(scrolled * 0.01) * 8;
            const tiltZ = Math.sin(scrolled * 0.015) * 5;
            const scale = 1 + Math.sin(scrolled * 0.008) * 0.1;
            
            photoFrame.style.transform = `
                translateY(${scrollIntensity}px)
                translateX(${Math.sin(scrolled * 0.006) * 10}px)
                rotateY(${rotationY + (mouseX * 15)}deg)
                rotateX(${rotationX + (-mouseY * 15)}deg)
                rotateZ(${tiltZ}deg)
                translateZ(${20 + Math.sin(scrolled * 0.01) * 10}px)
                scale(${scale})
            `;
        }
        
        if (photo) {
            // Additional photo-specific transforms
            const photoScale = 1 + Math.cos(scrolled * 0.007) * 0.08;
            const photoRotate = Math.sin(scrolled * 0.005) * 3;
            
            photo.style.transform = `
                translateZ(50px)
                scale(${photoScale})
                rotate(${photoRotate}deg)
            `;
        }
        
        if (photoGlow) {
            // Enhanced glow intensity based on scroll with pulsing effect
            const glowIntensity = Math.abs(Math.sin(scrolled * 0.015)) * 0.9 + 0.3;
            const glowScale = 1 + Math.sin(scrolled * 0.02) * 0.15;
            
            photoGlow.style.opacity = glowIntensity;
            photoGlow.style.transform = `scale(${glowScale})`;
        }
        
        // Enhanced particle animations with more complex movements
        particles.forEach((particle, index) => {
            const particleScroll = scrolled * (0.025 + index * 0.015);
            const rotateAmount = scrolled * (0.8 + index * 0.3);
            const orbitRadius = 25 + index * 10;
            const orbitX = Math.cos(particleScroll) * orbitRadius;
            const orbitY = Math.sin(particleScroll) * (orbitRadius * 0.6);
            const depth = Math.sin(scrolled * 0.01 + index) * 20;
            
            particle.style.transform = `
                translateY(${orbitY}px)
                translateX(${orbitX}px)
                translateZ(${depth}px)
                rotate(${rotateAmount}deg)
                scale(${1 + Math.sin(scrolled * 0.012 + index) * 0.3})
            `;
            
            // Dynamic opacity based on scroll position
            const opacityFactor = Math.abs(Math.sin(scrolled * 0.008 + index)) * 0.6 + 0.4;
            particle.style.opacity = opacityFactor;
        });
    }
    
    function updateNeuralNetwork(scrolled) {
        const nodes = document.querySelectorAll('.neural-node');
        const connections = document.querySelectorAll('.neural-connection');
        
        nodes.forEach((node, index) => {
            const intensity = Math.sin(scrolled * 0.01 + index) * 10;
            node.style.transform = `translate(${intensity}px, ${intensity * 0.5}px)`;
        });
        
        connections.forEach((conn, index) => {
            const opacity = Math.abs(Math.sin(scrolled * 0.005 + index)) * 0.8 + 0.2;
            conn.style.opacity = opacity;
        });
    }
}

// Enhanced animations
function initializeAnimations() {
    // Initialize typing animation for hero subtitle
    const subtitle = document.querySelector('.typing-text');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        
        setTimeout(() => {
            typeWriter(subtitle, text, 100);
        }, 1000);
    }
    
    // Animate skill items on hover
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px) scale(1.1) rotateZ(5deg)';
            item.style.boxShadow = '0 10px 25px rgba(139, 92, 246, 0.4)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
            item.style.boxShadow = '';
        });
    });
    
    // Animate project cards on scroll
    const projectCards = document.querySelectorAll('.project-card-3d');
    projectCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = `
                translateY(-20px)
                rotateX(10deg)
                rotateY(10deg)
                scale(1.02)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
    
    // Animate contact methods
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach(method => {
        method.addEventListener('mouseenter', () => {
            method.style.transform = 'translateY(-10px) scale(1.05)';
            method.style.boxShadow = '0 15px 40px rgba(139, 92, 246, 0.3)';
        });
        
        method.addEventListener('mouseleave', () => {
            method.style.transform = '';
            method.style.boxShadow = '';
        });
    });
    
    // Terminal typing animation
    animateTerminal();
}

// Terminal animation
function animateTerminal() {
    const codeLines = document.querySelectorAll('.code-line');
    
    codeLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            line.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, index * 200);
    });
}

// Enhanced typing animation
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Add blinking cursor
            element.innerHTML += '<span class="cursor">|</span>';
        }
    }
    
    type();
}

// Contact handlers with enhanced feedback
function initializeContactHandlers() {
    const contactItems = document.querySelectorAll('.contact-item-3d, .contact-method');
    
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.textContent.trim();
            
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Handle different contact types
            if (text.includes('@')) {
                window.location.href = `mailto:${text.split(' ').pop()}`;
            } else if (text.includes('linkedin')) {
                window.open(`https://${text.split(' ').pop()}`, '_blank');
            } else if (text.match(/\d/)) {
                window.location.href = `tel:${text.split(' ').pop()}`;
            }
            
            // Create ripple effect
            createRippleEffect(this, event);
        });
    });
}

// Ripple effect for buttons and interactive elements
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    // Add ripple styles
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(139, 92, 246, 0.6)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Advanced typing animation for the terminal
function initializeTypingAnimation() {
    const terminalBody = document.querySelector('.terminal-body');
    if (!terminalBody) return;
    
    // Hide all code lines initially
    const codeLines = terminalBody.querySelectorAll('.code-line');
    codeLines.forEach(line => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(10px)';
    });
    
    // Animate each line with typing effect
    let delay = 500;
    codeLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
            
            // Add typing sound effect (visual)
            line.style.borderLeft = '2px solid var(--neon-violet)';
            setTimeout(() => {
                line.style.borderLeft = 'none';
            }, 500);
        }, delay);
        
        delay += 300;
    });
}

// Performance optimization
function optimizePerformance() {
    // Throttle mouse move events
    let ticking = false;
    
    document.addEventListener('mousemove', (e) => {
        if (!ticking) {
            requestAnimationFrame(() => {
                if (isLoaded) {
                    updateParallax3D();
                    update3DCards(e);
                }
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Optimize scroll events
    let scrollTicking = false;
    
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                // Scroll-based updates here
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    });
}

// Initialize performance optimizations
optimizePerformance();

// Debug mode (remove in production)
if (window.location.hash === '#debug') {
    console.log('🚀 Futuristic Portfolio Debug Mode Enabled');
    
    // Add debug panel
    const debugPanel = document.createElement('div');
    debugPanel.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 10px;
        border-radius: 5px;
        font-family: monospace;
        font-size: 12px;
        z-index: 10000;
    `;
    debugPanel.innerHTML = `
        <div>Mouse: <span id="mouse-pos">0, 0</span></div>
        <div>Particles: <span id="particle-count">0</span></div>
        <div>FPS: <span id="fps">60</span></div>
    `;
    document.body.appendChild(debugPanel);
    
    // Update debug info
    document.addEventListener('mousemove', (e) => {
        document.getElementById('mouse-pos').textContent = `${e.clientX}, ${e.clientY}`;
    });
    
    setInterval(() => {
        const particleCount = document.querySelectorAll('.particle').length;
        document.getElementById('particle-count').textContent = particleCount;
    }, 1000);
}

// Export functions for external use
window.portfolioAPI = {
    createParticle: () => createParticle(),
    showLoadingScreen,
    hideLoadingScreen,
    typeWriter
};

console.log('🚀 Futuristic 3D Portfolio Loaded Successfully!');
