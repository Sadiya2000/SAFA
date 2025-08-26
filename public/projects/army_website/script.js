// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Hero Slideshow
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-slide');
const nextBtn = document.querySelector('.next-slide');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
    currentSlide = index;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Auto slide
setInterval(nextSlide, 5000);

// Manual controls
if (nextBtn) nextBtn.addEventListener('click', nextSlide);
if (prevBtn) prevBtn.addEventListener('click', prevSlide);

// Statistics Counter Animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString('bn-BD');
    }, 20);
}

// Intersection Observer for statistics
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.dataset.count);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Smooth scrolling for navigation links
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

// Emergency Button Click
const emergencyBtn = document.querySelector('.emergency-btn');
if (emergencyBtn) {
    emergencyBtn.addEventListener('click', () => {
        alert('জরুরি পরিস্থিতিতে নিকটস্থ সেনা ইউনিট অথবা স্থানীয় প্রশাসনের সাথে যোগাযোগ করুন।\n\nজরুরি নম্বর: ৯৯৯');
    });
}

// Apply Button Actions
document.querySelectorAll('.apply-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (btn.disabled) return;
        
        const jobItem = btn.closest('.job-item');
        const jobTitle = jobItem.querySelector('h4').textContent;
        
        // Show loading state
        const originalText = btn.textContent;
        btn.textContent = 'প্রক্রিয়াকরণ...';
        btn.style.pointerEvents = 'none';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.pointerEvents = 'auto';
            
            alert(`${jobTitle} এর জন্য আবেদন করতে চান?\n\nঅনলাইন আবেদনের জন্য:\n১. www.joinbangladesharmy.mil.bd ভিজিট করুন\n২. প্রয়োজনীয় কাগজপত্র প্রস্তুত রাখুন\n৩. নির্দেশনা অনুসরণ করুন`);
        }, 1500);
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelector('select').value;
        const message = contactForm.querySelector('textarea').value;
        
        if (!name || !email || !subject || !message) {
            alert('অনুগ্রহ করে সকল ক্ষেত্র পূরণ করুন।');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'পাঠানো হচ্ছে...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            alert('আপনার বার্তা সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।');
            contactForm.reset();
        }, 2000);
    });
}

// Gallery Item Click
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const title = item.querySelector('h4').textContent;
        const description = item.querySelector('p').textContent;
        
        alert(`${title}\n\n${description}\n\nআরও ছবি দেখতে আমাদের অফিসিয়াল গ্যালারি পেজ দেখুন।`);
    });
});

// News Card Click Handler
document.querySelectorAll('.news-card').forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('h3').textContent;
        const content = card.querySelector('p').textContent;
        
        alert(`সংবাদ: ${title}\n\n${content}\n\nবিস্তারিত জানতে আমাদের সংবাদ পাতা দেখুন।`);
    });
});

// Recruitment Link
const recruitmentLink = document.querySelector('.recruitment');
if (recruitmentLink) {
    recruitmentLink.addEventListener('click', (e) => {
        e.preventDefault();
        
        const recruitmentInfo = `বাংলাদেশ সেনাবাহিনীতে নিয়োগ:\n\n১. অফিসার পদ - চলমান\n২. সৈনিক পদ - চলমান\n৩. টেকনিক্যাল পদ - আসছে শীঘ্রই\n\nবিস্তারিত জানতে নিচে স্ক্রল করুন অথবা www.joinbangladesharmy.mil.bd ভিজিট করুন।`;
        
        alert(recruitmentInfo);
        
        // Scroll to recruitment section
        const recruitmentSection = document.getElementById('recruitment');
        if (recruitmentSection) {
            recruitmentSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Language Switch
const langSwitch = document.querySelector('.lang-switch');
if (langSwitch) {
    langSwitch.addEventListener('click', (e) => {
        e.preventDefault();
        alert('ভাষা পরিবর্তন ফিচার শীঘ্রই আসছে।');
    });
}

// Intersection Observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .benefit-item, .job-item, .news-card, .gallery-item, .contact-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        navbar.style.background = 'white';
        navbar.style.backdropFilter = 'none';
    }
});

// Service Card Hover Effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.service-icon');
        icon.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.service-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Contact Item Click to Copy
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('click', () => {
        const details = item.querySelector('.contact-details p').textContent;
        
        // Try to copy to clipboard
        if (navigator.clipboard) {
            navigator.clipboard.writeText(details).then(() => {
                alert('যোগাযোগের তথ্য কপি করা হয়েছে।');
            }).catch(() => {
                alert(`যোগাযোগের তথ্য:\n${details}`);
            });
        } else {
            alert(`যোগাযোগের তথ্য:\n${details}`);
        }
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    .service-card:hover .service-icon {
        transition: transform 0.3s ease;
    }
    
    .news-card {
        cursor: pointer;
    }
    
    .gallery-item {
        cursor: pointer;
    }
    
    .contact-item {
        cursor: pointer;
    }
    
    .job-item:hover {
        cursor: pointer;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
`;
document.head.appendChild(style);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl + R for recruitment
    if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        const recruitmentSection = document.getElementById('recruitment');
        if (recruitmentSection) {
            recruitmentSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Ctrl + C for contact
    if (e.ctrlKey && e.key === 'c') {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Auto-hide security notice after 15 seconds
setTimeout(() => {
    const securityNotice = document.querySelector('.security-notice');
    if (securityNotice) {
        securityNotice.style.opacity = '0.7';
    }
}, 15000);

