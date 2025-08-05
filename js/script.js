// Inicializa GSAP e ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Inicializa AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true
});

// Animação da seção Hero
const heroAnimations = () => {
    gsap.to('.hero-subtitle', {
        opacity: 1,
        duration: 1.5,
        delay: 0.5,
        ease: "power2.out"
    });
    
    gsap.to('.hero-title', {
        opacity: 1,
        y: 0,
        duration: 1.5,
        delay: 0.8,
        ease: "power3.out"
    });
    
    gsap.to('.hero-text', {
        opacity: 1,
        y: 0,
        duration: 1.5,
        delay: 1.3,
        ease: "power3.out"
    });
    
    gsap.to('.hero-buttons', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 1.8,
        ease: "power3.out"
    });
};

// Animação de revelação ao scroll
const scrollAnimations = () => {
    gsap.utils.toArray('.reveal').forEach(element => {
        gsap.fromTo(element, {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none none"
            },
            ease: "power3.out"
        });
    });
};

// Efeitos hover para cards
const cardHoverEffects = () => {
    document.querySelectorAll('.portfolio-item, .feature-card, .portfolio-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.03,
                boxShadow: "0 15px 40px rgba(0, 0, 0, 0.6)",
                duration: 0.4,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                duration: 0.4,
                ease: "power2.out"
            });
        });
    });
};

// Efeitos hover para botões
const buttonHoverEffects = () => {
    document.querySelectorAll('.cta-button, .btn, .portfolio-btn, .portfolio-btn-new, .science-proof-btn').forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
};

// Efeito de scroll no header
const headerScrollEffect = () => {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
};

// Manipulação de formulários
const formHandling = () => {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Verifica se é o formulário de CTA
            if (form.classList.contains('cta-form')) {
                window.location.href = "https://segunda-pagnina.vercel.app/";
            } else {
                // Lógica para outros formulários
                alert('Solicitação enviada com sucesso! Entraremos em contato em breve.');
                form.reset();
            }
        });
    });
};

// Menu mobile (hamburger)
const mobileMenu = () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            hamburger.innerHTML = navLinks.style.display === 'flex' ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        
        // Fecha o menu ao clicar em um link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.style.display = 'none';
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
};

// Inicialização de todos os efeitos
const init = () => {
    heroAnimations();
    scrollAnimations();
    cardHoverEffects();
    buttonHoverEffects();
    headerScrollEffect();
    formHandling();
    mobileMenu();
    
    // Verifica se há um player de vídeo e inicializa
    if (document.getElementById('player')) {
        const player = cloudinary.videoPlayer('player', {
            cloud_name: 'demo',
            publicId: 'docs/walking_talking',
            autoplay: true,
            loop: true,
            muted: true,
            controls: false
        });
    }
};

// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', init);

// Atualiza o layout quando a janela é redimensionada
window.addEventListener('resize', () => {
    // Fecha o menu mobile se estiver aberto
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (window.innerWidth > 768 && navLinks) {
        navLinks.style.display = 'flex';
    } else if (navLinks) {
        navLinks.style.display = 'none';
        if (hamburger) hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    }
});
