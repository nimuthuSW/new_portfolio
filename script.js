// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling
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
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.style.color = '#333';
        if (item.getAttribute('href').slice(1) === current) {
            item.style.color = '#5a8a5a';
        }
    });
});

// ====== SCROLL ANIMATION FOR ALL SECTIONS ======

// Intersection Observer options
const observerOptions = {
    threshold: 0.15, // Trigger when 15% of section is visible
    rootMargin: '0px 0px -100px 0px' // Start animation slightly before section enters viewport
};

// Create Intersection Observer
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add visible class to trigger animations
            entry.target.classList.add('visible');
            
            // Optional: Stop observing after animation (remove if you want repeating animations)
            // sectionObserver.unobserve(entry.target);
        } else {
            // Optional: Remove visible class when scrolling back up (enable repeating animations)
            // entry.target.classList.remove('visible');
        }
    });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
    sectionObserver.observe(section);
});

// Alternative scroll-based animation (more control, but less performant)
function animateSectionsOnScroll() {
    const windowHeight = window.innerHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionBottom = sectionTop + sectionHeight;
        
        // Check if section is in viewport
        if (scrollTop + windowHeight > sectionTop + 150 && scrollTop < sectionBottom) {
            section.classList.add('visible');
        } 
        // Optional: Remove class when scrolling away (for repeating animations)
        // else {
        //     section.classList.remove('visible');
        // }
    });
}

// Call on scroll
window.addEventListener('scroll', animateSectionsOnScroll);

// Call on page load to animate hero section immediately
window.addEventListener('load', () => {
    animateSectionsOnScroll();
    
    // Make hero section visible immediately
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        setTimeout(() => {
            heroSection.classList.add('visible');
        }, 100);
    }
});

// Add parallax effect to sections (optional enhancement)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax effect for hero section
    const hero = document.querySelector('#hero .hero-image');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Smooth reveal effect for individual elements within sections
function revealElements() {
    // Achievement cards
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (cardTop < windowHeight - 100) {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, index * 150);
        }
    });
    
    // Skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight - 100) {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1) rotate(0)';
            }, index * 100);
        }
    });
}

window.addEventListener('scroll', revealElements);
window.addEventListener('load', revealElements);

// Add scroll progress indicator (optional)
function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // You can use this to show a progress bar
    // document.getElementById('progressBar').style.width = scrolled + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// Smooth transitions between sections
let isScrolling = false;
window.addEventListener('scroll', () => {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
        // Scroll has stopped
        console.log('Scrolling has stopped');
    }, 100);
});

// Performance optimization: Debounce scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Use debounced scroll handler for better performance
const debouncedScroll = debounce(() => {
    animateSectionsOnScroll();
    revealElements();
}, 10);

window.addEventListener('scroll', debouncedScroll);