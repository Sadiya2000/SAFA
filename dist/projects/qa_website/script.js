// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);

// Update theme toggle icon
function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (body.getAttribute('data-theme') === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

updateThemeIcon();

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
});

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

// Search Functionality
const searchInput = document.getElementById('searchInput');
const heroSearch = document.getElementById('heroSearch');
const searchBtn = document.querySelector('.search-btn');
const heroSearchBtn = document.querySelector('.hero-search-btn');

function performSearch(query) {
    if (!query.trim()) {
        alert('অনুগ্রহ করে একটি প্রশ্ন লিখুন।');
        return;
    }
    
    // Simulate search
    alert(`"${query}" এর জন্য খোঁজ করা হচ্ছে...\n\nখোঁজের ফলাফল শীঘ্রই দেখানো হবে।`);
    
    // In a real application, this would trigger a search API call
    console.log('Searching for:', query);
}

searchBtn.addEventListener('click', () => {
    performSearch(searchInput.value);
});

heroSearchBtn.addEventListener('click', () => {
    performSearch(heroSearch.value);
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch(searchInput.value);
    }
});

heroSearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch(heroSearch.value);
    }
});

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

// Ask Question Modal
const askQuestionBtn = document.querySelector('.ask-question-btn');
const modal = document.getElementById('askQuestionModal');
const closeModal = document.querySelector('.close-modal');
const cancelBtn = document.querySelector('.cancel-btn');
const questionForm = document.getElementById('questionForm');

function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModalFunc() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    questionForm.reset();
}

askQuestionBtn.addEventListener('click', openModal);
closeModal.addEventListener('click', closeModalFunc);
cancelBtn.addEventListener('click', closeModalFunc);

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalFunc();
    }
});

// Question Form Submission
questionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = questionForm.querySelector('input[type="text"]').value;
    const description = questionForm.querySelector('textarea').value;
    const category = questionForm.querySelector('select').value;
    const tags = questionForm.querySelector('input[placeholder*="ট্যাগ"]').value;
    
    if (!title || !description || !category) {
        alert('অনুগ্রহ করে সকল প্রয়োজনীয় ক্ষেত্র পূরণ করুন।');
        return;
    }
    
    // Show loading state
    const submitBtn = questionForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'পোস্ট করা হচ্ছে...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        alert('আপনার প্রশ্ন সফলভাবে পোস্ট করা হয়েছে!\n\nশীঘ্রই সম্প্রদায়ের সদস্যরা উত্তর দেবেন।');
        closeModalFunc();
    }, 2000);
});

// Category Card Clicks
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
        const categoryName = card.querySelector('h3').textContent;
        const questionCount = card.querySelector('.category-stats span').textContent;
        
        alert(`${categoryName} বিভাগে যাচ্ছেন...\n\n${questionCount} দেখার জন্য প্রস্তুত।`);
    });
});

// Vote Buttons
document.querySelectorAll('.vote-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        const isUpvote = btn.classList.contains('upvote');
        const voteCountElement = btn.parentElement.querySelector('.vote-count');
        let currentCount = parseInt(voteCountElement.textContent);
        
        // Toggle vote
        if (btn.classList.contains('voted')) {
            btn.classList.remove('voted');
            currentCount += isUpvote ? -1 : 1;
        } else {
            // Remove vote from opposite button
            const oppositeBtn = btn.parentElement.querySelector(isUpvote ? '.downvote' : '.upvote');
            if (oppositeBtn.classList.contains('voted')) {
                oppositeBtn.classList.remove('voted');
                currentCount += isUpvote ? 2 : -2;
            } else {
                currentCount += isUpvote ? 1 : -1;
            }
            btn.classList.add('voted');
        }
        
        voteCountElement.textContent = currentCount;
        
        // Visual feedback
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 150);
    });
});

// Question Card Clicks
document.querySelectorAll('.question-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // Don't trigger if clicking on buttons
        if (e.target.closest('.vote-btn') || e.target.closest('.action-btn')) {
            return;
        }
        
        const title = card.querySelector('h3').textContent;
        const author = card.querySelector('.author').textContent;
        const answerCount = card.querySelector('.answers').textContent;
        
        alert(`প্রশ্ন: ${title}\n\nপ্রশ্নকর্তা: ${author}\n${answerCount}\n\nবিস্তারিত দেখতে প্রশ্নের পাতায় যান।`);
    });
});

// Action Buttons
document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        const icon = btn.querySelector('i');
        let action = '';
        
        if (icon.classList.contains('fa-bookmark')) {
            action = 'সেভ';
            btn.classList.toggle('saved');
            if (btn.classList.contains('saved')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        } else if (icon.classList.contains('fa-share')) {
            action = 'শেয়ার';
            // Copy to clipboard simulation
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert('লিংক কপি করা হয়েছে!');
            }).catch(() => {
                alert('শেয়ার করার জন্য লিংক প্রস্তুত।');
            });
            return;
        } else if (icon.classList.contains('fa-flag')) {
            action = 'রিপোর্ট';
            if (confirm('এই প্রশ্নটি রিপোর্ট করতে চান?')) {
                alert('রিপোর্ট জমা দেওয়া হয়েছে। আমরা পর্যালোচনা করব।');
            }
            return;
        }
        
        alert(`প্রশ্নটি ${action} করা হয়েছে।`);
    });
});

// Expert Card Clicks
document.querySelectorAll('.expert-card').forEach(card => {
    card.addEventListener('click', () => {
        const name = card.querySelector('h3').textContent;
        const title = card.querySelector('.expert-title').textContent;
        const answers = card.querySelector('.expert-stats span').textContent;
        
        alert(`বিশেষজ্ঞ: ${name}\n${title}\n\n${answers}\n\nপ্রোফাইল দেখতে ক্লিক করুন।`);
    });
});

// Load More Questions
const loadMoreBtn = document.querySelector('.load-more-btn');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        const originalText = loadMoreBtn.textContent;
        loadMoreBtn.textContent = 'লোড হচ্ছে...';
        loadMoreBtn.disabled = true;
        
        setTimeout(() => {
            loadMoreBtn.textContent = originalText;
            loadMoreBtn.disabled = false;
            alert('নতুন প্রশ্ন লোড করা হয়েছে!');
        }, 1500);
    });
}

// Newsletter Subscription
const newsletterForm = document.querySelector('.newsletter');
if (newsletterForm) {
    const newsletterBtn = newsletterForm.querySelector('button');
    const newsletterInput = newsletterForm.querySelector('input');
    
    newsletterBtn.addEventListener('click', () => {
        const email = newsletterInput.value;
        
        if (!email || !email.includes('@')) {
            alert('অনুগ্রহ করে একটি বৈধ ইমেইল ঠিকানা দিন।');
            return;
        }
        
        const originalText = newsletterBtn.textContent;
        newsletterBtn.textContent = 'সাবস্ক্রাইব হচ্ছে...';
        newsletterBtn.disabled = true;
        
        setTimeout(() => {
            newsletterBtn.textContent = originalText;
            newsletterBtn.disabled = false;
            newsletterInput.value = '';
            alert('সফলভাবে নিউজলেটার সাবস্ক্রাইব করেছেন!');
        }, 1500);
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
    const animateElements = document.querySelectorAll('.category-card, .question-card, .expert-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl + K for search
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
    
    // Ctrl + Q for ask question
    if (e.ctrlKey && e.key === 'q') {
        e.preventDefault();
        openModal();
    }
    
    // Ctrl + D for dark mode toggle
    if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        themeToggle.click();
    }
    
    // Escape to close modal
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModalFunc();
    }
});

// Auto-save draft functionality
let draftTimer;
const draftKey = 'qa_question_draft';

function saveDraft() {
    if (!modal.classList.contains('active')) return;
    
    const title = questionForm.querySelector('input[type="text"]').value;
    const description = questionForm.querySelector('textarea').value;
    const category = questionForm.querySelector('select').value;
    const tags = questionForm.querySelector('input[placeholder*="ট্যাগ"]').value;
    
    const draft = { title, description, category, tags };
    localStorage.setItem(draftKey, JSON.stringify(draft));
}

function loadDraft() {
    const draft = localStorage.getItem(draftKey);
    if (draft) {
        const { title, description, category, tags } = JSON.parse(draft);
        questionForm.querySelector('input[type="text"]').value = title || '';
        questionForm.querySelector('textarea').value = description || '';
        questionForm.querySelector('select').value = category || '';
        questionForm.querySelector('input[placeholder*="ট্যাগ"]').value = tags || '';
    }
}

function clearDraft() {
    localStorage.removeItem(draftKey);
}

// Load draft when opening modal
askQuestionBtn.addEventListener('click', () => {
    setTimeout(loadDraft, 100);
});

// Auto-save while typing
questionForm.addEventListener('input', () => {
    clearTimeout(draftTimer);
    draftTimer = setTimeout(saveDraft, 1000);
});

// Clear draft on successful submission
questionForm.addEventListener('submit', () => {
    setTimeout(clearDraft, 2000);
});

// Add CSS for voted buttons
const style = document.createElement('style');
style.textContent = `
    .vote-btn.voted {
        background: var(--primary-color) !important;
        color: white !important;
        border-color: var(--primary-color) !important;
    }
    
    .vote-btn.upvote.voted {
        background: var(--secondary-color) !important;
        border-color: var(--secondary-color) !important;
    }
    
    .vote-btn.downvote.voted {
        background: #dc2626 !important;
        border-color: #dc2626 !important;
    }
    
    .action-btn.saved {
        background: var(--accent-color) !important;
        color: white !important;
        border-color: var(--accent-color) !important;
    }
    
    .question-card {
        cursor: pointer;
    }
    
    .category-card {
        cursor: pointer;
    }
    
    .expert-card {
        cursor: pointer;
    }
`;
document.head.appendChild(style);

// Initialize tooltips for better UX
function addTooltips() {
    const tooltips = [
        { selector: '.theme-toggle', text: 'থিম পরিবর্তন করুন (Ctrl+D)' },
        { selector: '.search-btn', text: 'খুঁজুন (Ctrl+K)' },
        { selector: '.ask-question-btn', text: 'নতুন প্রশ্ন করুন (Ctrl+Q)' },
        { selector: '.vote-btn.upvote', text: 'আপভোট' },
        { selector: '.vote-btn.downvote', text: 'ডাউনভোট' },
        { selector: '.action-btn .fa-bookmark', text: 'সেভ করুন' },
        { selector: '.action-btn .fa-share', text: 'শেয়ার করুন' },
        { selector: '.action-btn .fa-flag', text: 'রিপোর্ট করুন' }
    ];
    
    tooltips.forEach(({ selector, text }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.setAttribute('title', text);
        });
    });
}

// Initialize tooltips after DOM is loaded
document.addEventListener('DOMContentLoaded', addTooltips);

