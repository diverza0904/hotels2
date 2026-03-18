// Hotel Narayan Palace - Main JavaScript File

document.addEventListener('DOMContentLoaded', () => {

    // ==================== CONFIGURATION ====================
    const HOTEL_CONFIG = {
        phone: "919950119140", // Owner's WhatsApp number
        hotelName: "Hotel Narayan Palace",
        address: "Shahpura Rd, near Bus Stand, Ajeetgarh, Rajasthan 332701",
        coordinates: "27.403928,75.7543091"
    };

    // ==================== GLOBAL FUNCTIONS ====================
    
    // WhatsApp Booking Function (Global)
    window.bookViaWA = function(roomName) {
        const currentDate = new Date().toLocaleDateString('en-IN');
        const message = `*NEW BOOKING REQUEST - HOTEL NARAYAN PALACE*%0A%0A` +
                        `🏨 *Room:* ${roomName}%0A` +
                        `📅 *Date:* ${currentDate}%0A` +
                        `📍 *Location:* Ajeetgarh Bus Stand%0A%0A` +
                        `Please confirm availability and best price.`;
        
        const waUrl = `https://wa.me/${HOTEL_CONFIG.phone}?text=${message}`;
        window.open(waUrl, '_blank');
    };

    // ==================== NAVIGATION SCROLL EFFECT ====================
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('shadow-lg', 'py-2');
            nav.classList.remove('py-4');
        } else {
            nav.classList.remove('shadow-lg', 'py-2');
            nav.classList.add('py-4');
        }
    });

    // ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==================== FAQ ACCORDION ====================
    const faqButtons = document.querySelectorAll('.faq-btn');
    
    faqButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Toggle active class on button
            this.classList.toggle('active');
            
            // Find the answer div (next sibling)
            const answer = this.nextElementSibling;
            
            // Toggle answer visibility
            if (answer.classList.contains('hidden')) {
                answer.classList.remove('hidden');
                this.querySelector('i').style.transform = 'rotate(180deg)';
            } else {
                answer.classList.add('hidden');
                this.querySelector('i').style.transform = 'rotate(0deg)';
            }
        });
    });

    // ==================== SCROLL REVEAL ANIMATIONS ====================
    const revealElements = document.querySelectorAll('.room-card, .group, .review-card, .amenity-card');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // ==================== MOBILE MENU TOGGLE ====================
    // Note: You can add a hamburger menu button in HTML if needed
    // This is a placeholder for future mobile menu functionality
    
    // ==================== FORM SUBMISSION HANDLER ====================
    const bookingForm = document.getElementById('bookingForm');
    const successMsg = document.getElementById('successMsg');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('custName')?.value;
            const phone = document.getElementById('custPhone')?.value;
            const checkIn = document.getElementById('checkIn')?.value;
            const checkOut = document.getElementById('checkOut')?.value;
            const roomType = document.getElementById('roomType')?.value;
            
            // Basic validation
            if (!name || !phone) {
                alert('कृपया अपना नाम और मोबाइल नंबर दर्ज करें');
                return;
            }
            
            if (phone.length < 10) {
                alert('कृपया सही मोबाइल नंबर दर्ज करें');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                // Prepare WhatsApp message
                const message = `*🏨 NEW ENQUIRY - HOTEL NARAYAN PALACE*%0A%0A` +
                    `👤 *Name:* ${name}%0A` +
                    `📞 *Phone:* ${phone}%0A` +
                    `📅 *Check-in:* ${checkIn || 'Not specified'}%0A` +
                    `📅 *Check-out:* ${checkOut || 'Not specified'}%0A` +
                    `🛏️ *Room Type:* ${roomType || 'Not specified'}%0A%0A` +
                    `⏰ *Time:* ${new Date().toLocaleString('en-IN')}`;
                
                // Open WhatsApp with the message
                setTimeout(() => {
                    window.open(`https://wa.me/${HOTEL_CONFIG.phone}?text=${message}`, '_blank');
                }, 1000);
                
                // Show success message
                if (successMsg) {
                    successMsg.classList.remove('hidden');
                    bookingForm.reset();
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        successMsg.classList.add('hidden');
                    }, 5000);
                }
                
            } catch (error) {
                console.error('Error:', error);
                alert('कुछ गलती हुई है। कृपया सीधे कॉल करें।');
            } finally {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // ==================== PRICE COMPARISON HOVER EFFECT ====================
    const priceBoxes = document.querySelectorAll('.bg-orange-50');
    priceBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // ==================== DYNAMIC YEAR IN FOOTER ====================
    const footerYear = document.querySelector('.footer-year');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

    // ==================== IMAGE LAZY LOADING ====================
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));

    // ==================== GOOGLE MAPS DIRECTIONS ====================
    window.getDirections = function() {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        if (isMobile) {
            window.location.href = `google.navigation:q=${HOTEL_CONFIG.coordinates}&mode=d`;
        } else {
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${HOTEL_CONFIG.coordinates}`, '_blank');
        }
    };

    // ==================== COPY CONTACT NUMBER ====================
    const phoneNumbers = document.querySelectorAll('[data-copy-phone]');
    phoneNumbers.forEach(elem => {
        elem.addEventListener('click', function() {
            navigator.clipboard.writeText(HOTEL_CONFIG.phone).then(() => {
                // Show temporary tooltip
                const tooltip = document.createElement('div');
                tooltip.textContent = 'Number copied!';
                tooltip.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: #10b981;
                    color: white;
                    padding: 10px 20px;
                    border-radius: 50px;
                    font-size: 14px;
                    z-index: 9999;
                    animation: fadeOut 2s forwards;
                `;
                
                document.body.appendChild(tooltip);
                
                setTimeout(() => {
                    tooltip.remove();
                }, 2000);
            });
        });
    });

    // ==================== ACTIVE NAVIGATION HIGHLIGHT ====================
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('text-yellow-200');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-yellow-200');
            }
        });
    });

    // ==================== ROOM BOOKING BUTTON TRACKING ====================
    const bookButtons = document.querySelectorAll('[onclick^="bookViaWA"]');
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Track booking clicks (can be integrated with analytics)
            console.log('Booking clicked:', this.innerText);
            
            // Add haptic feedback for mobile
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        });
    });

    // ==================== INITIALIZE ANY THIRD-PARTY INTEGRATIONS ====================
    console.log('Hotel Narayan Palace website initialized successfully!');
});

// ==================== ERROR HANDLING ====================
window.addEventListener('error', function(e) {
    console.error('Website error:', e.message);
    // You can send this to an error tracking service
});

// ==================== PERFORMANCE MARKING ====================
window.addEventListener('load', function() {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${pageLoadTime}ms`);
    }
});