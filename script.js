// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const navTabs = document.querySelectorAll('.nav-tab');

// Theme Toggle Functionality
function toggleTheme() {
    const isDark = body.classList.contains('dark-mode');
    
    if (isDark) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeToggle.innerHTML = '☀️';
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '🌙';
        localStorage.setItem('theme', 'dark');
    }
}

// Initialize Theme from Local Storage
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeToggle.innerHTML = '☀️';
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '🌙';
    }
}

// Navigation Tab Functionality
function setActiveNavTab(targetTab) {
    // Remove active class from all tabs
    navTabs.forEach(tab => tab.classList.remove('active'));
    
    // Add active class to clicked tab
    targetTab.classList.add('active');
}

// Smooth Scrolling to Sections
function smoothScrollToSection(targetId) {
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Handle Navigation Tab Clicks
function handleNavTabClick(e) {
    e.preventDefault();
    
    const targetTab = e.currentTarget;
    const targetId = targetTab.getAttribute('href');
    
    // Set active tab
    setActiveNavTab(targetTab);
    
    // Smooth scroll to section
    smoothScrollToSection(targetId);
}

// Update Active Tab Based on Scroll Position
function updateActiveTabOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100; // Offset for better detection
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            // Remove active class from all tabs
            navTabs.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to corresponding tab
            const correspondingTab = document.querySelector(`.nav-tab[href="#${sectionId}"]`);
            if (correspondingTab) {
                correspondingTab.classList.add('active');
            }
        }
    });
}

// Form Submission Handler
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Simulate form submission
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate sending process (no external API calls)
    setTimeout(() => {
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        e.target.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Log the message for debugging (you can check browser console)
        console.log('Contact Form Submission:', {
            name: name,
            email: email,
            message: message,
            timestamp: new Date().toISOString()
        });
        
    }, 1500); // 1.5 second delay to simulate sending
}

// Intersection Observer for Animations
function initAnimations() {
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

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Typing Animation for Hero Title
function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing animation after a short delay
    setTimeout(typeWriter, 500);
}

// Parallax Effect for Hero Section
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Initialize animations
    initAnimations();
    
    // Initialize typing animation
    initTypingAnimation();
    
    // Initialize parallax effect
    initParallax();
    
    // Theme toggle event
    themeToggle.addEventListener('click', toggleTheme);
    
    // Navigation tab events
    navTabs.forEach(tab => {
        tab.addEventListener('click', handleNavTabClick);
    });
    
    // Scroll event for updating active tab
    window.addEventListener('scroll', updateActiveTabOnScroll);
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('click', () => {
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.transform = 'scale(1.05)';
            }, 150);
        });
    });
}); 