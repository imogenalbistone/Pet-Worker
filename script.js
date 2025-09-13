document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section, article');
    const header = document.querySelector('.header');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Section highlight on scroll with improved detection
    const highlightNav = () => {
        let current = '';
        const scrollPosition = window.pageYOffset + header.offsetHeight + 50;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });
        
        // If no section is detected and we're at the top, default to home
        if (!current && window.pageYOffset < 100) {
            current = 'home';
        }
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href').substring(1);
            if (linkHref === current) {
                link.classList.add('active');
            }
        });
    };
    
    // Throttled scroll event for better performance
    let ticking = false;
    const handleScroll = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                highlightNav();
                ticking = false;
            });
            ticking = true;
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Call on load to set initial highlight
    highlightNav();
    
    // Enhanced CTA button interaction
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Scroll to contact section
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = contactSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe sections for animations
    sections.forEach(section => {
        section.classList.add('fade-target');
        observer.observe(section);
    });
    
    // Service items hover effect enhancement
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Contact items hover effect
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add loading animation for images (if any are added later)
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
    
    // Mobile menu toggle (for future enhancement)
    const createMobileMenu = () => {
        if (window.innerWidth <= 768) {
            const nav = document.querySelector('.nav');
            const navUl = nav.querySelector('ul');
            
            if (!nav.querySelector('.mobile-toggle')) {
                const toggle = document.createElement('button');
                toggle.classList.add('mobile-toggle');
                toggle.innerHTML = '☰';
                toggle.style.cssText = `
                    background: none;
                    border: none;
                    color: #d4af37;
                    font-size: 1.5rem;
                    cursor: pointer;
                    display: none;
                `;
                
                nav.insertBefore(toggle, navUl);
                
                toggle.addEventListener('click', () => {
                    navUl.classList.toggle('mobile-open');
                });
            }
        }
    };
    
    // Handle window resize
    window.addEventListener('resize', () => {
        highlightNav();
        createMobileMenu();
    });
    
    // Initialize mobile menu
    createMobileMenu();
});

