// Animation des particules
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Position aléatoire
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Délai d'animation aléatoire
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Navigation fluide
function smoothScroll() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animation de la navigation au scroll
function animateNavOnScroll() {
    const nav = document.querySelector('nav');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            nav.style.background = 'rgba(0, 0, 0, 0.3)';
            nav.style.backdropFilter = 'blur(30px)';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.1)';
            nav.style.backdropFilter = 'blur(20px)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Animation d'apparition des éléments au scroll
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observer les cartes de bilan
    const bilanCards = document.querySelectorAll('.bilan-card');
    bilanCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.8s ease-out';
        observer.observe(card);
    });
}

// Animation de sparkles pour l'effet magique
function createSparkles(element, count = 5) {
    for (let i = 0; i < count; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        // Position aléatoire autour de l'élément
        const rect = element.getBoundingClientRect();
        sparkle.style.left = (Math.random() * rect.width) + 'px';
        sparkle.style.top = (Math.random() * rect.height) + 'px';
        
        element.appendChild(sparkle);
        
        // Supprimer le sparkle après l'animation
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1000);
    }
}

// Animation spéciale pour le changement de nom I->E
function animateNameChange() {
    const letterI = document.getElementById('letter-i');
    const letterE = document.getElementById('letter-e');
    
    if (letterI && letterE) {
        // Ajouter des sparkles lors du changement
        setTimeout(() => {
            const nameContainer = document.querySelector('.name-animation');
            if (nameContainer) {
                createSparkles(nameContainer, 8);
            }
        }, 2500); // Synchronisé avec l'animation CSS
    }
}

// Effet de parallax léger pour les sections
function addParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const sections = document.querySelectorAll('section');
        
        sections.forEach((section, index) => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            section.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Animation des icônes au survol
function animateIcons() {
    const icons = document.querySelectorAll('.bilan-card-icon');
    
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(360deg)';
            this.style.transition = 'all 0.5s ease';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Effet de frappe pour le texte
function typewriterEffect(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function typeChar() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeChar, speed);
        }
    }
    
    typeChar();
}

// Gestion des erreurs de chargement des vidéos YouTube
function handleVideoErrors() {
    const iframes = document.querySelectorAll('iframe');
    
    iframes.forEach(iframe => {
        iframe.addEventListener('error', function() {
            console.warn('Erreur de chargement de la vidéo YouTube');
            // Optionnel : afficher un message d'erreur à l'utilisateur
        });
    });
}

// Optimisation des performances
function optimizePerformance() {
    // Lazy loading pour les vidéos YouTube
    const iframes = document.querySelectorAll('iframe');
    
    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const iframe = entry.target;
                    if (iframe.dataset.src) {
                        iframe.src = iframe.dataset.src;
                        iframe.removeAttribute('data-src');
                        videoObserver.unobserve(iframe);
                    }
                }
            });
        });

        iframes.forEach(iframe => {
            if (iframe.src) {
                iframe.dataset.src = iframe.src;
                iframe.src = '';
                videoObserver.observe(iframe);
            }
        });
    }
}

// Initialisation de toutes les animations
function initializeAnimations() {
    // Vérifier que le DOM est chargé
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeAnimations);
        return;
    }
    
    createParticles();
    smoothScroll();
    animateNavOnScroll();
    animateOnScroll();
    animateNameChange();
    animateIcons();
    handleVideoErrors();
    
    // Optionnel : activer le parallax (peut ralentir sur mobile)
    if (window.innerWidth > 768) {
        addParallaxEffect();
    }
    
    // Optimisations
    optimizePerformance();
    
    console.log('🎉 Portfolio initialisé avec succès !');
}

// Démarrer les animations
initializeAnimations();

// Gestion du redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    // Recalculer les particules si nécessaire
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer && window.innerWidth !== particlesContainer.dataset.lastWidth) {
        particlesContainer.innerHTML = '';
        createParticles();
        particlesContainer.dataset.lastWidth = window.innerWidth;
    }
});

// Debug: vérifier que tous les éléments sont présents
window.addEventListener('load', () => {
    const requiredElements = [
        '#particles',
        'nav',
        '.hero-title',
        '.bilan-grid',
        '.youtube-embed'
    ];
    
    requiredElements.forEach(selector => {
        const element = document.querySelector(selector);
        if (!element) {
            console.warn(`⚠️ Élément manquant: ${selector}`);
        }
    });
});