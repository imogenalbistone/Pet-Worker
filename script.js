// Navigation highlighting and smooth scrolling functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('nav a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Highlight current page in navigation
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.style.backgroundColor = '#d4af37';
            link.style.color = '#1a1a1a';
            link.style.fontWeight = '700';
        }
    });
    
    // Smooth scrolling for anchor links (if any are added later)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's an anchor link (starts with #)
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add scroll effect to header
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow effect when scrolling
        if (scrollTop > 10) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
        } else {
            header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add loading animation
    const main = document.querySelector('main');
    if (main) {
        main.style.opacity = '0';
        main.style.transform = 'translateY(20px)';
        main.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            main.style.opacity = '1';
            main.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Add hover effects to article paragraphs
    const articleParagraphs = document.querySelectorAll('article p');
    articleParagraphs.forEach(paragraph => {
        paragraph.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(212, 175, 55, 0.05)';
            this.style.transition = 'background-color 0.3s ease';
        });
        
        paragraph.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
    });
    
    // Mobile menu toggle functionality (if needed)
    const nav = document.querySelector('nav');
    const navToggle = document.createElement('button');
    navToggle.innerHTML = '☰';
    navToggle.className = 'nav-toggle';
    navToggle.style.display = 'none';
    navToggle.style.background = 'none';
    navToggle.style.border = 'none';
    navToggle.style.color = '#fff';
    navToggle.style.fontSize = '1.5em';
    navToggle.style.cursor = 'pointer';
    navToggle.style.padding = '0.5rem';
    
    // Insert toggle button before nav
    nav.parentNode.insertBefore(navToggle, nav);
    
    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        const navUl = nav.querySelector('ul');
        if (navUl.style.display === 'none' || navUl.style.display === '') {
            navUl.style.display = 'flex';
            navUl.style.flexDirection = 'column';
        } else {
            navUl.style.display = 'none';
        }
    });
    
    // Show/hide toggle button based on screen size
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            navToggle.style.display = 'block';
            nav.querySelector('ul').style.display = 'none';
        } else {
            navToggle.style.display = 'none';
            nav.querySelector('ul').style.display = 'flex';
        }
    }
    
    // Check screen size on load and resize
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
});

// Add some newspaper-style animations
function addNewspaperEffects() {
    // Typewriter effect for the main headline (optional)
    const mainHeadline = document.querySelector('article h2');
    if (mainHeadline) {
        const text = mainHeadline.textContent;
        mainHeadline.textContent = '';
        mainHeadline.style.borderRight = '2px solid #d4af37';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                mainHeadline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                setTimeout(() => {
                    mainHeadline.style.borderRight = 'none';
                }, 500);
            }
        };
        
        // Start typewriter effect after a short delay
        setTimeout(typeWriter, 800);
    }
}

// Call newspaper effects after DOM is loaded
document.addEventListener('DOMContentLoaded', addNewspaperEffects);

