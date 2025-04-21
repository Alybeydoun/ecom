// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
    emailjs.init('nnFP0M-_Ldf2t4Rqu');

    // Hamburger menu functionality
    const hamburger = document.getElementById('hamburger');
    const itemsContainer = document.querySelector('.items-container');

    hamburger.addEventListener('click', function() {
        itemsContainer.classList.toggle('active');
        // Add slide animation class
        if (itemsContainer.classList.contains('active')) {
            itemsContainer.style.animation = 'slideDown 0.3s ease forwards';
        } else {
            itemsContainer.style.animation = 'slideUp 0.3s ease forwards';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !itemsContainer.contains(event.target)) {
            itemsContainer.classList.remove('active');
        }
    });

    // Navbar scroll effect
    const navbar = document.getElementById('first-nav');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Add/remove scrolled class based on scroll position
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Search functionality
    const searchInput = document.querySelector('.search-container input');
    const searchButton = document.querySelector('.search-container button');

    searchButton.addEventListener('click', function() {
        // Add your search functionality here
        console.log('Search for:', searchInput.value);
    });

    // Cart count demo
    const cartCount = document.querySelector('.cart-count');
    let count = 0;

    document.querySelector('.cart').addEventListener('click', function() {
        // Demo increment - replace with actual cart functionality
        count++;
        cartCount.textContent = count;
        
        // Add pop animation
        cartCount.style.animation = 'pop 0.3s ease';
        setTimeout(() => {
            cartCount.style.animation = '';
        }, 300);
    });

    // Categories mobile interaction
    const categories = document.querySelectorAll('.category');
    
    categories.forEach(category => {
        category.addEventListener('click', function(e) {
            // Only handle click for mobile devices
            if (window.innerWidth <= 968) {
                // If clicking on a link inside hover-info, allow default behavior
                if (e.target.classList.contains('hover-link')) {
                    return;
                }
                
                // Remove active class from other categories
                categories.forEach(c => {
                    if (c !== category) {
                        c.classList.remove('active');
                    }
                });
                
                // Toggle active class on clicked category
                category.classList.toggle('active');
                
                // Prevent click from bubbling up
                e.stopPropagation();
            }
        });
    });

    // Close categories when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 968) {
            if (!e.target.closest('.category')) {
                categories.forEach(category => {
                    category.classList.remove('active');
                });
            }
        }
    });

    // Intersection Observer for about section animations
    const aboutBoxes = document.querySelectorAll('.about-box');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const aboutObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    aboutBoxes.forEach(box => {
        aboutObserver.observe(box);
    });

    // Contact Form Interactions
    const contactForm = document.getElementById('contactForm');
    const formGroups = document.querySelectorAll('.form-group');
    
    // Add floating effect to form groups
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        
        // Handle focus events
        input.addEventListener('focus', () => {
            group.style.transform = 'translateY(-5px)';
            group.style.transition = 'transform 0.3s ease';
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                group.style.transform = 'translateY(0)';
            }
        });
        
        // Handle input content
        input.addEventListener('input', () => {
            if (input.value) {
                label.classList.add('active');
            } else {
                label.classList.remove('active');
            }
        });
    });
    
    // Handle form submission with animation
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add loading state
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span><i class="fas fa-spinner fa-spin"></i> Sending...</span>';
        submitBtn.disabled = true;

        // Prepare form data
        const formData = {
            name: this.querySelector('#name').value,
            email: this.querySelector('#email').value,
            message: this.querySelector('#message').value,
            to_name: 'Essential Baby Clothes',
        };

        // Send email using EmailJS
        // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS service and template IDs
        emailjs.send('service_cz42sfr', 'template_ea5hetb', formData)
            .then(() => {
                // Success animation
                submitBtn.innerHTML = '<span><i class="fas fa-check"></i> Sent!</span>';
                submitBtn.classList.add('success');
                
                // Reset form with delay
                setTimeout(() => {
                    formGroups.forEach(group => {
                        const input = group.querySelector('input, textarea');
                        input.value = '';
                        group.style.transform = 'translateY(0)';
                    });
                    
                    // Reset button
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.classList.remove('success');
                        submitBtn.disabled = false;
                    }, 2000);
                }, 1000);
            })
            .catch((error) => {
                // Error handling
                submitBtn.innerHTML = '<span><i class="fas fa-exclamation-circle"></i> Failed to send</span>';
                submitBtn.classList.add('error');
                console.error('EmailJS error:', error);
                
                // Reset button after error
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.classList.remove('error');
                    submitBtn.disabled = false;
                }, 3000);
            });
    });
    
    // Add parallax effect to social links
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            link.style.transform = `perspective(1000px) rotateX(${deltaY * 10}deg) rotateY(${deltaX * 10}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.getElementById('first-nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (itemsContainer.classList.contains('active')) {
                    itemsContainer.classList.remove('active');
                }
            }
        });
    });
}); 