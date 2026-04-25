// ===== Preloader =====
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        // Trigger skill bar animations after preloader
        setTimeout(triggerSkillAnimations, 500);
    }, 1500);
});

// ===== Mobile Menu Toggle =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// ===== Close Mobile Menu on Link Click =====
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ===== Particle System for Hero =====
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// ===== Animated Counter =====
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');

            // Animate counters in hero stats
            if (entry.target.classList.contains('hero-stats')) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    animateCounter(counter);
                });
            }

            // Animate skill bars
            if (entry.target.classList.contains('skills')) {
                const skillBars = entry.target.querySelectorAll('.skill-fill');
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
            }

            // Animate service cards staggered
            if (entry.target.classList.contains('services-grid')) {
                const cards = entry.target.querySelectorAll('.service-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate-in');
                    }, index * 100);
                });
            }

            // Animate video items staggered
            if (entry.target.classList.contains('video-grid')) {
                const items = entry.target.querySelectorAll('.video-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate-in');
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('animate-section');
    observer.observe(section);
});

// Observe specific elements
const elementsToObserve = [
    '.hero-stats',
    '.skills',
    '.services-grid',
    '.video-grid',
    '.about-highlights'
];

elementsToObserve.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => observer.observe(el));
});

// Add animation styles
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .animate-section {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .animate-section.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .video-item,
    .service-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .video-item.animate-in,
    .service-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(animationStyles);

// ===== Skill Bar Animations =====
function triggerSkillAnimations() {
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const skillBars = skillsSection.querySelectorAll('.skill-fill');
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
}

// ===== Contact Form Handler =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Por favor completa todos los campos', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Por favor ingresa un email válido', 'error');
            return;
        }
        
        // Simulate form submission
        console.log('Form submitted:', { name, email, subject, message });
        
        showNotification('¡Mensaje enviado con éxito! Te contactaré pronto.', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

// ===== Email Validation =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 18px 30px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : type === 'error' ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
        z-index: 9999;
        animation: slideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        font-weight: 500;
        font-size: 0.95rem;
        letter-spacing: 0.5px;
    `;
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
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
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 5000);
}

// ===== Scroll to Top Button =====
const scrollTopBtn = document.getElementById('scrollTop');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Parallax Effect for Hero =====
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

if (hero && heroContent) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });
}

// ===== Video Lazy Loading =====
document.addEventListener('DOMContentLoaded', () => {
    const videoContainers = document.querySelectorAll('.video-container');
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target.querySelector('iframe');
                if (iframe && iframe.dataset.src) {
                    iframe.src = iframe.dataset.src;
                    videoObserver.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.1 });
    
    videoContainers.forEach(container => {
        const iframe = container.querySelector('iframe');
        if (iframe && iframe.src) {
            iframe.dataset.src = iframe.src;
            // Keep the src for demo purposes, but in production you'd set it to empty
            // iframe.src = '';
            videoObserver.observe(container);
        }
    });
});

// ===== Add Hover Effect to Video Items =====
document.querySelectorAll('.video-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const iframe = this.querySelector('iframe');
        if (iframe) {
            iframe.style.opacity = '0.7';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        const iframe = this.querySelector('iframe');
        if (iframe) {
            iframe.style.opacity = '1';
        }
    });
});

// ===== Testimonial Auto-Rotate (Placeholder for Future Slider) =====
const testimonials = [
    {
        text: "Trabajar con este filmmaker fue una experiencia transformadora. Capturó la esencia de nuestra marca de una manera que nunca imaginamos.",
        author: "María Rodríguez",
        role: "CEO, Creative Studio",
        initials: "MR"
    },
    {
        text: "La visión artística y la ejecución técnica superaron todas nuestras expectativas. El resultado fue simplemente cinematográfico.",
        author: "Carlos Mendoza",
        role: "Director de Marketing, TechCorp",
        initials: "CM"
    },
    {
        text: "Profesional, creativo y puntual. Entendió perfectamente lo que queríamos transmitir y lo llevó a otro nivel.",
        author: "Ana García",
        role: "Productora Ejecutiva, FilmStudio",
        initials: "AG"
    }
];

let currentTestimonial = 0;

function rotateTestimonial() {
    const card = document.querySelector('.testimonial-card');
    if (!card) return;
    
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    const t = testimonials[currentTestimonial];
    
    card.style.opacity = '0';
    card.style.transform = 'translateX(20px)';
    
    setTimeout(() => {
        card.innerHTML = `
            <p class="testimonial-text">"${t.text}"</p>
            <div class="testimonial-author">
                <div class="testimonial-avatar">${t.initials}</div>
                <div class="testimonial-info">
                    <h4>${t.author}</h4>
                    <p>${t.role}</p>
                </div>
            </div>
        `;
        card.style.transition = 'all 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateX(0)';
    }, 500);
}

// Auto-rotate every 8 seconds
setInterval(rotateTestimonial, 8000);

// ===== Console Welcome Message =====
console.log('%c🎬 FILMMAKER PORTFOLIO', 'font-size: 24px; font-weight: bold; color: #e50914; text-shadow: 0 0 10px rgba(229,9,20,0.5);');
console.log('%c✨ Sitio web cinematográfico creado con ❤️', 'font-size: 12px; color: #a0a0a0;');
console.log('%c¿Listo para crear algo extraordinario?', 'font-size: 11px; color: #666;');
