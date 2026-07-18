/*==================================================
    OLIVER SAIN PORTFOLIO
    Part 3A
    Navigation & Scroll Effects
==================================================*/

// ==========================================
// ELEMENTS
// ==========================================

const header = document.getElementById("header");
const progressBar = document.getElementById("progress-bar");
const backToTop = document.getElementById("backToTop");

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

const navItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");


// ==========================================
// MOBILE MENU
// ==========================================

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("show");

});


// Close menu after clicking a link

navItems.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("show");

    });

});


// ==========================================
// SMOOTH SCROLL
// ==========================================

navItems.forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(
            this.getAttribute("href")
        );

        target.scrollIntoView({

            behavior: "smooth"

        });

    });

});


// ==========================================
// SCROLL EVENTS
// ==========================================

window.addEventListener("scroll", () => {

    // Sticky Header

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

    // Scroll Progress Bar

    const scrollTop = document.documentElement.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress = (scrollTop / scrollHeight) * 100;

    progressBar.style.width = progress + "%";

    // Back To Top Button

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


// ==========================================
// ACTIVE NAVIGATION
// ==========================================

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        const sectionHeight = section.offsetHeight;

        if (
            pageYOffset >= sectionTop &&
            pageYOffset < sectionTop + sectionHeight
        ) {

            current = section.getAttribute("id");

        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === "#" + current
        ) {

            link.classList.add("active");

        }

    });

});


// ==========================================
// BACK TO TOP
// ==========================================

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


// ==========================================
// ESC KEY CLOSES MOBILE MENU
// ==========================================

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        navLinks.classList.remove("show");

    }

});


// ==========================================
// CLICK OUTSIDE MENU TO CLOSE
// ==========================================

document.addEventListener("click", (e) => {

    const insideMenu =
        navLinks.contains(e.target);

    const clickedButton =
        menuBtn.contains(e.target);

    if (!insideMenu && !clickedButton) {

        navLinks.classList.remove("show");

    }

});

/*==================================================
    PART 3B
    Animations
==================================================*/

// ==========================================
// TYPEWRITER EFFECT
// ==========================================

const typingElement = document.querySelector(".typing-text");

const words = [
    "Helping Businesses Save Time Through AI & Automation",
    "AI Chatbot Development",
    "CRM Automation",
    "Workflow Automation",
    "Lead Generation Systems",
    "Customer Support Automation"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeWriter() {

    if (!typingElement) return;

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingElement.textContent =
            currentWord.substring(0, charIndex++);

        if (charIndex > currentWord.length) {

            deleting = true;

            setTimeout(typeWriter, 1800);

            return;
        }

    } else {

        typingElement.textContent =
            currentWord.substring(0, charIndex--);

        if (charIndex < 0) {

            deleting = false;

            wordIndex = (wordIndex + 1) % words.length;

            charIndex = 0;
        }

    }

    setTimeout(typeWriter, deleting ? 40 : 80);
}

typeWriter();


// ==========================================
// COUNTER ANIMATION
// ==========================================

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = +counter.dataset.target;

        let current = 0;

        const increment = Math.max(1, Math.ceil(target / 100));

        const updateCounter = () => {

            current += increment;

            if (current >= target) {

                counter.textContent = target + "+";

                return;
            }

            counter.textContent = current;

            requestAnimationFrame(updateCounter);
        };

        updateCounter();

        counterObserver.unobserve(counter);

    });

}, {
    threshold: 0.5
});

counters.forEach(counter => counterObserver.observe(counter));


// ==========================================
// SCROLL REVEAL
// ==========================================

const revealElements = document.querySelectorAll(
    ".section, .service-card, .project-card, .timeline-item, .contact-card, .skill"
);

const revealObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("active");

        }

    });

}, {
    threshold: 0.15
});

revealElements.forEach(item => {

    item.classList.add("reveal");

    revealObserver.observe(item);

});


// ==========================================
// FLOATING HERO IMAGE
// ==========================================

const heroImage = document.querySelector(".image-wrapper");

if (heroImage) {

    let direction = 1;

    setInterval(() => {

        heroImage.style.transform =
            `translateY(${direction * 8}px)`;

        direction *= -1;

    }, 2500);

}

/*==================================================
    PART 3C
    Final Effects & Performance
==================================================*/

// ==========================================
// HERO IMAGE MOUSE TILT
// ==========================================

const imageWrapper = document.querySelector(".image-wrapper");

if (imageWrapper) {

    imageWrapper.addEventListener("mousemove", (e) => {

        const rect = imageWrapper.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 12;
        const rotateX = ((y / rect.height) - 0.5) * -12;

        imageWrapper.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-8px)
        `;

    });

    imageWrapper.addEventListener("mouseleave", () => {

        imageWrapper.style.transform = `
            perspective(1000px)
            rotateX(0deg)
            rotateY(0deg)
            translateY(0)
        `;

    });

}


// ==========================================
// BUTTON RIPPLE EFFECT
// ==========================================

document.querySelectorAll(".btn, .contact-btn").forEach(button => {

    button.addEventListener("click", function(e){

        const ripple = document.createElement("span");

        const rect = this.getBoundingClientRect();

        const size = Math.max(rect.width, rect.height);

        ripple.style.width = size + "px";
        ripple.style.height = size + "px";

        ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
        ripple.style.top = (e.clientY - rect.top - size / 2) + "px";

        ripple.className = "ripple";

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});


// ==========================================
// STAGGER REVEAL ANIMATION
// ==========================================

document.querySelectorAll(".services-grid, .portfolio-grid, .contact-grid")
.forEach(grid => {

    const cards = grid.children;

    [...cards].forEach((card, index) => {

        card.style.transitionDelay = `${index * 0.12}s`;

    });

});


// ==========================================
// PRELOAD HERO IMAGE
// ==========================================

const preloadImage = new Image();
preloadImage.src = "images/profile.jpg";


// ==========================================
// CURRENT YEAR
// ==========================================

const year = new Date().getFullYear();

const footerText = document.querySelector(".footer-bottom p");

if (footerText) {

    footerText.innerHTML =
        `&copy; ${year} Oliver Sain. All Rights Reserved.`;

}


// ==========================================
// CONSOLE MESSAGE
// ==========================================

console.log(
"%cOliver Sain Portfolio",
"color:#60a5fa;font-size:20px;font-weight:bold;"
);

console.log(
"%cDesigned & Developed with HTML, CSS & JavaScript",
"color:white;font-size:13px;"
);


// ==========================================
// WEBSITE LOADED
// ==========================================

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});


// ==========================================
// SIMPLE PERFORMANCE OPTIMIZATION
// ==========================================

let resizeTimer;

window.addEventListener("resize", () => {

    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {

        console.log("Layout Updated");

    }, 250);

});


// ==========================================
// OPTIONAL PARALLAX HERO
// ==========================================

window.addEventListener("scroll", () => {

    const scrolled = window.pageYOffset;

    const hero = document.querySelector(".hero");

    if(hero){

        hero.style.backgroundPositionY = `${scrolled * 0.25}px`;

    }

});
