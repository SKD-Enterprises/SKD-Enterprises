document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate on Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    // Sticky Header
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle icon
            const icon = hamburger.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close mobile menu when a link is clicked
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // Active Link Highlighting
    const sections = document.querySelectorAll('section');
    if (sections.length > 0 && navLinksItems.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinksItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
});

/**
 * Global function to handle WhatsApp form submission
 * @param {Event} event - The form submission event
 */
function sendToWhatsApp(event) {
    // Prevent default form submission
    event.preventDefault();

    try {
        // Collect form data using reliable name-based selectors
        const nameEl = document.querySelector('input[name="name"]');
        const phoneEl = document.querySelector('input[name="phone"]');
        const emailEl = document.querySelector('input[name="email"]');
        const productEl = document.getElementById('product');
        const messageEl = document.querySelector('textarea[name="message"]');

        // Check if required elements exist to avoid null errors
        if (!nameEl || !phoneEl || !productEl) {
            throw new Error("Required form elements not found.");
        }

        const name = nameEl.value.trim();
        const phone = phoneEl.value.trim();
        const email = emailEl ? emailEl.value.trim() : "";
        const product = productEl.options[productEl.selectedIndex].text;
        const message = messageEl ? messageEl.value.trim() : "";

        // Business Number
        const businessNumber = "918107270621";

        // Construct WhatsApp Message
        let whatsappMessage = `Hello SKD Enterprises,

I am interested in your products.

Name: ${name}
Phone: ${phone}
Product: ${product}`;

        // Include email only if entered
        if (email !== "") {
            whatsappMessage += `\nEmail: ${email}`;
        }

        // Include message only if entered
        if (message !== "") {
            whatsappMessage += `\nMessage: ${message}`;
        }

        whatsappMessage += `\n\nPlease share your best price and details.`;

        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/${businessNumber}?text=${encodedMessage}`;

        // Open WhatsApp in a new tab
        window.open(whatsappUrl, '_blank');

        // Reset form after successful submission
        event.target.reset();

    } catch (error) {
        console.error("WhatsApp Redirection Error:", error);
        alert("Sorry, something went wrong while sending the message. Please try again.");
    }
}
