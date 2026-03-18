// Hotel Narayan Palace - Complete JavaScript File

// ==================== CONFIGURATION ====================
const HOTEL_CONFIG = {
    phone: "919950119140", // Owner's WhatsApp number
    hotelName: "Hotel Narayan Palace",
    address: "Shahpura Rd, near Bus Stand, Ajeetgarh, Rajasthan 332701",
    coordinates: "27.403928,75.7543091",
    plusCode: "CRCG+M4 Ajeetgarh"
};

// ==================== DOCUMENT READY ====================
document.addEventListener('DOMContentLoaded', () => {

    // ==================== GLOBAL FUNCTIONS ====================
    
    // WhatsApp Booking Function (Global)
    window.bookViaWA = function(roomName) {
        const currentDate = new Date().toLocaleDateString('en-IN');
        const currentTime = new Date().toLocaleTimeString('en-IN');
        const message = `*NEW BOOKING REQUEST - HOTEL NARAYAN PALACE*%0A%0A` +
                        `🏨 *Room:* ${roomName}%0A` +
                        `📅 *Date:* ${currentDate}%0A` +
                        `⏰ *Time:* ${currentTime}%0A` +
                        `📍 *Location:* ${HOTEL_CONFIG.plusCode}%0A` +
                        `📌 *Address:* ${HOTEL_CONFIG.address}%0A%0A` +
                        `Please confirm availability and best price.`;
        
        const waUrl = `https://wa.me/${HOTEL_CONFIG.phone}?text=${message}`;
        window.open(waUrl, '_blank');
        
        // Track booking click
        console.log('Booking initiated for:', roomName);
        
        // Add haptic feedback for mobile
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    };

    // ==================== MOBILE MENU TOGGLE ====================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
            
            // Change icon based on menu state
            const icon = this.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars';
            } else {
                icon.className = 'fas fa-times';
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                if (mobileMenuBtn) {
                    mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
                }
            }
        }
    });
    
    // Close mobile menu when clicking on a link
    if (mobileMenu) {
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                if (mobileMenuBtn) {
                    mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
                }
            });
        });
    }

    // ==================== NAVIGATION SCROLL EFFECT ====================
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('shadow-lg', 'py-2');
                nav.classList.remove('py-3', 'py-4');
            } else {
                nav.classList.remove('shadow-lg', 'py-2');
                nav.classList.add('py-3');
            }
        });
    }

    // ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const offset = 80; // Height of fixed header
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
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
                
                // Smooth scroll to show the answer
                setTimeout(() => {
                    this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            } else {
                answer.classList.add('hidden');
                this.querySelector('i').style.transform = 'rotate(0deg)';
            }
        });
    });

    // ==================== SCROLL REVEAL ANIMATIONS ====================
    const revealElements = document.querySelectorAll('.room-card, .group, .review-card, .amenity-card, .location-card');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            const revealPoint = 100;
            
            if (elementTop < windowHeight - revealPoint) {
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

    // ==================== FORM SUBMISSION HANDLER ====================
    const bookingForm = document.getElementById('bookingForm');
    const successMsg = document.getElementById('successMsg');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('custName')?.value.trim();
            const phone = document.getElementById('custPhone')?.value.trim();
            const checkIn = document.getElementById('checkIn')?.value;
            const checkOut = document.getElementById('checkOut')?.value;
            const roomType = document.getElementById('roomType')?.value;
            
            // Basic validation
            if (!name || !phone) {
                alert('कृपया अपना नाम और मोबाइल नंबर दर्ज करें');
                return;
            }
            
            if (phone.length < 10) {
                alert('कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें');
                return;
            }
            
            if (!/^\d{10}$/.test(phone)) {
                alert('कृपया केवल अंकों में मोबाइल नंबर दर्ज करें');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                // Prepare WhatsApp message with all details
                const currentDate = new Date().toLocaleString('en-IN');
                const message = `*🏨 NEW ENQUIRY - HOTEL NARAYAN PALACE*%0A%0A` +
                    `👤 *Name:* ${name}%0A` +
                    `📞 *Phone:* ${phone}%0A` +
                    `📅 *Check-in:* ${checkIn || 'Not specified'}%0A` +
                    `📅 *Check-out:* ${checkOut || 'Not specified'}%0A` +
                    `🛏️ *Room Type:* ${roomType || 'Not specified'}%0A` +
                    `📍 *Location:* ${HOTEL_CONFIG.plusCode}%0A%0A` +
                    `⏰ *Submitted:* ${currentDate}`;
                
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
                
                // Track form submission
                console.log('Form submitted successfully');
                
            } catch (error) {
                console.error('Error:', error);
                alert('कुछ गलती हुई है। कृपया सीधे कॉल करें: 099501 19140');
            } finally {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // ==================== COPY ADDRESS FUNCTIONALITY ====================
    const fullAddress = `${HOTEL_CONFIG.plusCode}, ${HOTEL_CONFIG.address}`;
    
    // Add copy buttons to location sections
    const addCopyButtons = () => {
        const locationElements = document.querySelectorAll('.location-plus-code, [class*="CRCG"], .font-mono.text-orange-400, .text-orange-600.font-mono');
        
        locationElements.forEach(el => {
            // Avoid adding multiple buttons
            if (el.closest('button') || el.querySelector('.copy-address-btn')) return;
            
            const wrapper = document.createElement('div');
            wrapper.className = 'flex items-center gap-2';
            
            // Move the element into wrapper
            el.parentNode.insertBefore(wrapper, el);
            wrapper.appendChild(el);
            
            // Add copy button
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-address-btn';
            copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
            copyBtn.setAttribute('aria-label', 'Copy address');
            
            copyBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                navigator.clipboard.writeText(fullAddress).then(() => {
                    const originalText = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    
                    setTimeout(() => {
                        this.innerHTML = originalText;
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy:', err);
                    alert('Address: ' + fullAddress);
                });
            });
            
            wrapper.appendChild(copyBtn);
        });
    };
    
    // Call after a short delay to ensure DOM is ready
    setTimeout(addCopyButtons, 500);

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
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
    
    // Advanced lazy loading for data-src images
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ==================== GOOGLE MAPS DIRECTIONS ====================
    window.getDirections = function() {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const destination = encodeURIComponent(HOTEL_CONFIG.plusCode);
        
        if (isMobile) {
            // Try to open Google Maps app
            window.location.href = `google.navigation:q=${HOTEL_CONFIG.coordinates}&mode=d`;
            
            // Fallback to web after a delay
            setTimeout(() => {
                window.open(`https://www.google.com/maps/dir/?api=1&destination=${HOTEL_CONFIG.coordinates}`, '_blank');
            }, 500);
        } else {
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, '_blank');
        }
    };

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
        
        document.querySelectorAll('nav a, #mobile-menu a').forEach(link => {
            link.classList.remove('text-yellow-200', 'font-bold', 'bg-orange-600');
            
            if (link.getAttribute('href') === `#${current}`) {
                if (link.closest('nav')) {
                    link.classList.add('text-yellow-200');
                } else if (link.closest('#mobile-menu')) {
                    link.classList.add('bg-orange-600', 'text-white');
                }
            }
        });
    });

    // ==================== ROOM BOOKING BUTTON TRACKING ====================
    const bookButtons = document.querySelectorAll('[onclick^="bookViaWA"]');
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Track booking clicks
            console.log('Booking clicked:', this.innerText);
            
            // Google Analytics event tracking (if available)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'booking_click', {
                    'event_category': 'engagement',
                    'event_label': this.innerText
                });
            }
        });
    });

    // ==================== FIX FOR BOTTOM BAR ON KEYBOARD OPEN (MOBILE) ====================
    if ('visualViewport' in window) {
        window.visualViewport.addEventListener('resize', function() {
            const bottomBar = document.querySelector('.fixed.bottom-4');
            if (bottomBar) {
                // Hide bottom bar when keyboard is open (viewport height reduced)
                if (window.visualViewport.height < window.innerHeight * 0.8) {
                    bottomBar.style.display = 'none';
                } else {
                    bottomBar.style.display = 'flex';
                }
            }
        });
    }

    // ==================== LOADING STATE FOR ALL FORMS ====================
    const allForms = document.querySelectorAll('form');
    allForms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn && !submitBtn.disabled) {
                // Auto-enable after 10 seconds in case something goes wrong
                setTimeout(() => {
                    submitBtn.disabled = false;
                }, 10000);
            }
        });
    });

    // ==================== TOUCH DEVICE OPTIMIZATIONS ====================
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Add haptic feedback for buttons on touch devices
        document.querySelectorAll('button, a').forEach(el => {
            el.addEventListener('touchstart', function() {
                if (navigator.vibrate) {
                    navigator.vibrate(10);
                }
            });
        });
    }

    // ==================== SCROLL TO TOP BUTTON (if needed) ====================
    const createScrollTopBtn = () => {
        const btn = document.createElement('button');
        btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        btn.className = 'fixed bottom-20 right-4 bg-orange-600 text-white w-10 h-10 rounded-full shadow-lg hidden z-50 hover:bg-orange-700 transition';
        btn.setAttribute('aria-label', 'Scroll to top');
        
        btn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        document.body.appendChild(btn);
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                btn.classList.remove('hidden');
            } else {
                btn.classList.add('hidden');
            }
        });
    };
    
    // Uncomment if you want scroll to top button
    // createScrollTopBtn();

    // ==================== INITIALIZATION COMPLETE ====================
    console.log('✅ Hotel Narayan Palace website initialized successfully!');
    console.log('📍 Location:', HOTEL_CONFIG.plusCode);
    console.log('📞 Phone:', HOTEL_CONFIG.phone);
});

// ==================== ERROR HANDLING ====================
window.addEventListener('error', function(e) {
    console.error('Website error:', e.message, 'at', e.filename, 'line', e.lineno);
    
    // You can send this to an error tracking service
    // Example: sendErrorToServer(e.message, e.filename, e.lineno);
});

// ==================== PERFORMANCE MARKING ====================
window.addEventListener('load', function() {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⏱️ Page load time: ${pageLoadTime}ms`);
        
        // Report slow loading (more than 3 seconds)
        if (pageLoadTime > 3000) {
            console.warn('⚠️ Page loading is slow. Consider optimizing images.');
        }
    }
});

// ==================== NETWORK STATUS ====================
window.addEventListener('online', () => {
    console.log('🌐 Network is online');
    // Show notification if needed
});

window.addEventListener('offline', () => {
    console.log('📴 Network is offline');
    // Show offline notification
    const offlineMsg = document.createElement('div');
    offlineMsg.className = 'fixed top-20 left-4 right-4 bg-red-600 text-white text-center p-2 rounded-lg z-50';
    offlineMsg.textContent = 'You are offline. Please check your internet connection.';
    document.body.appendChild(offlineMsg);
    
    setTimeout(() => {
        offlineMsg.remove();
    }, 3000);
});

// ==================== EXPORT FUNCTIONS FOR GLOBAL USE ====================
// These functions are already global, but we'll ensure they're available
window.bookViaWA = window.bookViaWA || function(roomName) {
    console.warn('bookViaWA function not fully initialized yet');
};

window.getDirections = window.getDirections || function() {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=CRCG%2BM4+Ajeetgarh`, '_blank');
};
