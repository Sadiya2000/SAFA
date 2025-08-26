// Emergency Banner Close
const closeBanner = document.querySelector('.close-banner');
const emergencyBanner = document.querySelector('.emergency-banner');

if (closeBanner) {
    closeBanner.addEventListener('click', () => {
        emergencyBanner.style.display = 'none';
    });
}

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

// Emergency Button Click
const emergencyBtn = document.querySelector('.emergency-btn');
if (emergencyBtn) {
    emergencyBtn.addEventListener('click', () => {
        if (confirm('জরুরি সেবার জন্য ৯৯৯ নম্বরে কল করতে চান?')) {
            window.open('tel:999', '_self');
        }
    });
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

// Station Search Functionality
const stationSearch = document.getElementById('stationSearch');
const searchBtn = document.querySelector('.search-btn');
const stationItems = document.querySelectorAll('.station-item');

function searchStations() {
    const searchTerm = stationSearch.value.toLowerCase();
    
    stationItems.forEach(station => {
        const stationName = station.querySelector('h4').textContent.toLowerCase();
        const stationAddress = station.querySelector('p:last-child').textContent.toLowerCase();
        
        if (stationName.includes(searchTerm) || stationAddress.includes(searchTerm)) {
            station.style.display = 'block';
            station.style.animation = 'fadeIn 0.3s ease';
        } else {
            station.style.display = searchTerm === '' ? 'block' : 'none';
        }
    });
    
    if (searchTerm && !Array.from(stationItems).some(station => station.style.display !== 'none')) {
        alert('কোন থানা পাওয়া যায়নি। অনুগ্রহ করে অন্য নাম দিয়ে খোঁজ করুন।');
    }
}

if (searchBtn) {
    searchBtn.addEventListener('click', searchStations);
}

if (stationSearch) {
    stationSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchStations();
        }
    });
    
    stationSearch.addEventListener('input', () => {
        if (stationSearch.value === '') {
            stationItems.forEach(station => {
                station.style.display = 'block';
            });
        }
    });
}

// Wanted Person Report
document.querySelectorAll('.report-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const wantedCard = btn.closest('.wanted-card');
        const personName = wantedCard.querySelector('h3').textContent;
        
        if (confirm(`${personName} সম্পর্কে তথ্য প্রদান করতে চান?\n\nআপনাকে নিকটস্থ থানায় যোগাযোগ করতে হবে।`)) {
            alert('ধন্যবাদ! অনুগ্রহ করে নিকটস্থ থানায় যোগাযোগ করুন অথবা ৯৯৯ নম্বরে কল করুন।');
        }
    });
});

// Service Button Actions
document.querySelectorAll('.service-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const serviceCard = btn.closest('.service-card');
        const serviceName = serviceCard.querySelector('h3').textContent;
        
        // Special handling for emergency service
        if (btn.getAttribute('href') === 'tel:999') {
            if (confirm('জরুরি সেবার জন্য ৯৯৯ নম্বরে কল করতে চান?')) {
                window.open('tel:999', '_self');
            }
            return;
        }
        
        // Show loading state
        const originalText = btn.textContent;
        btn.textContent = 'লোড হচ্ছে...';
        btn.style.pointerEvents = 'none';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.pointerEvents = 'auto';
            alert(`${serviceName} সেবার জন্য আবেদন করতে চান?\n\nঅনলাইন পোর্টালে যান অথবা নিকটস্থ থানায় যোগাযোগ করুন।`);
        }, 1500);
    });
});

// Emergency Contact Items Click
document.querySelectorAll('.emergency-item').forEach(item => {
    item.addEventListener('click', () => {
        const phone = item.querySelector('.emergency-info p').textContent;
        if (phone.match(/^\d/) || phone === '৯৯৯' || phone === '১০০') {
            if (confirm(`${phone} নম্বরে কল করতে চান?`)) {
                window.open(`tel:${phone}`, '_self');
            }
        }
    });
});

// Station Item Click to Call
document.querySelectorAll('.station-item').forEach(station => {
    station.addEventListener('click', () => {
        const phoneElement = station.querySelector('p i.fa-phone').parentElement;
        const phone = phoneElement.textContent.replace(/[^\d-]/g, '');
        const stationName = station.querySelector('h4').textContent;
        
        if (confirm(`${stationName} এ কল করতে চান?\nনম্বর: ${phone}`)) {
            window.open(`tel:${phone}`, '_self');
        }
    });
});

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
    const animateElements = document.querySelectorAll('.service-card, .wanted-card, .news-card, .station-item, .emergency-item');
    
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

// News Card Click Handler
document.querySelectorAll('.news-card').forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('h3').textContent;
        const content = card.querySelector('p').textContent;
        
        alert(`সংবাদ: ${title}\n\n${content}\n\nবিস্তারিত জানতে আমাদের অফিসিয়াল ওয়েবসাইট দেখুন।`);
    });
});

// Report Crime Button
const reportCrimeBtn = document.querySelector('.report-crime');
if (reportCrimeBtn) {
    reportCrimeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const crimeTypes = [
            'চুরি/ডাকাতি',
            'জালিয়াতি',
            'সাইবার অপরাধ',
            'পারিবারিক সহিংসতা',
            'মাদক সংক্রান্ত',
            'অন্যান্য'
        ];
        
        let crimeTypeList = 'অপরাধের ধরন নির্বাচন করুন:\n\n';
        crimeTypes.forEach((type, index) => {
            crimeTypeList += `${index + 1}. ${type}\n`;
        });
        
        const selection = prompt(crimeTypeList + '\nনম্বর লিখুন (১-৬):');
        
        if (selection && selection >= 1 && selection <= 6) {
            const selectedCrime = crimeTypes[selection - 1];
            alert(`${selectedCrime} সংক্রান্ত অভিযোগ দাখিলের জন্য:\n\n১. নিকটস্থ থানায় যোগাযোগ করুন\n২. অনলাইন FIR দাখিল করুন\n৩. জরুরি ক্ষেত্রে ৯৯৯ ডায়াল করুন`);
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

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .service-card:hover .service-icon {
        transform: scale(1.1) rotate(5deg);
    }
    
    .wanted-card:hover .wanted-image img {
        filter: grayscale(0%);
    }
    
    .news-card {
        cursor: pointer;
    }
    
    .station-item {
        cursor: pointer;
    }
    
    .emergency-item {
        cursor: pointer;
    }
`;
document.head.appendChild(style);

// Auto-hide emergency banner after 10 seconds
setTimeout(() => {
    if (emergencyBanner && emergencyBanner.style.display !== 'none') {
        emergencyBanner.style.opacity = '0.8';
    }
}, 10000);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl + E for emergency
    if (e.ctrlKey && e.key === 'e') {
        e.preventDefault();
        if (confirm('জরুরি সেবার জন্য ৯৯৯ নম্বরে কল করতে চান?')) {
            window.open('tel:999', '_self');
        }
    }
    
    // Ctrl + S for search
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        if (stationSearch) {
            stationSearch.focus();
        }
    }
});

