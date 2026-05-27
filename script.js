// ==========================================================================
// AUDIO & CURTAIN OVERLAY SYSTEMS
// ==========================================================================
const music = document.getElementById('bg-music');
const toggleBtn = document.getElementById('music-toggle');
const openBtn = document.getElementById('open-btn');
const curtain = document.getElementById('invitation-curtain');

music.volume = 0.4;

openBtn.addEventListener('click', () => {
    curtain.classList.add('fade-away');
    
    music.play().then(() => {
        toggleBtn.textContent = "🔊 Music On";
    }).catch(error => {
        console.log("Audio auto-play blocked by browser security.", error);
    });

    document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
});

toggleBtn.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        toggleBtn.textContent = "🔊 Music On";
    } else {
        music.pause();
        toggleBtn.textContent = "🔇 Music Off";
    }
});

// ==========================================================================
// COUNTDOWN TIMER ENGINE (Target Date: July 12, 2026 at 10:30 AM)
// ==========================================================================
const targetDate = new Date("July 12, 2026 10:30:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days < 10 ? "0" + days : days;
    document.getElementById("hours").textContent = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").textContent = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").textContent = seconds < 10 ? "0" + seconds : seconds;

    if (difference < 0) {
        clearInterval(timerInterval);
        document.querySelector(".timer-container").innerHTML = "<p style='font-family:\"DhVanolines\",sans-serif; color:#C85A32; font-size:1.8rem;'>JUST MARRIED!</p>";
    }
}

updateCountdown();
const timerInterval = setInterval(updateCountdown, 1000);

// ==========================================================================
// HIGHLY INTERACTIVE MOUSE-EVADING YELLOW PETALS ENGINE
// ==========================================================================
const container = document.getElementById('petal-container');
const totalPetals = 15;
const petalsArray = [];

// Mouse track coordinates
let mouseX = -1000;
let mouseY = -1000;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Support for Mobile/Touch interactivity
window.addEventListener('touchmove', (e) => {
    if(e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
    }
});

class YellowPetal {
    constructor() {
        this.el = document.createElement('div');
        this.el.className = 'petal';
        container.appendChild(this.el);
        this.reset();
    }

    reset() {
        this.w = Math.random() * 8 + 10; // Width sizing ranges
        this.h = this.w * (Math.random() * 0.2 + 0.9);
        this.el.style.width = `${this.w}px`;
        this.el.style.height = `${this.h}px`;
        
        this.x = Math.random() * window.innerWidth;
        this.y = -20 - (Math.random() * 100);
        
        this.speedY = Math.random() * 1.5 + 1.2;
        this.speedX = Math.random() * 1 - 0.5;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 2 - 1;
        
        // Sway parameters
        this.swayAngle = Math.random() * Math.PI * 2;
        this.swaySpeed = Math.random() * 0.02 + 0.01;
        this.swayRadius = Math.random() * 1.5 + 0.5;

        // Interactive offset storage variables
        this.offsetX = 0;
        this.offsetY = 0;
    }

    update() {
        // Base down-fall mechanics
        this.y += this.speedY;
        this.swayAngle += this.swaySpeed;
        this.x += this.speedX + Math.sin(this.swayAngle) * this.swayRadius;
        this.rotation += this.rotationSpeed;

        // Proximity calculation for mouse evasion interaction
        const currentTotalX = this.x + this.offsetX;
        const currentTotalY = this.y + this.offsetY;

        const diffX = currentTotalX - mouseX;
        const diffY = currentTotalY - mouseY;
        const distance = Math.sqrt(diffX * diffX + diffY * diffY);
        const evasionRadius = 90; // Proximity threshold

        if (distance < evasionRadius) {
            const force = (evasionRadius - distance) / evasionRadius;
            // Push petals outward away from current mouse plot vector point
            const pushX = (diffX / distance) * force * 12;
            const pushY = (diffY / distance) * force * 12;
            
            this.offsetX += pushX;
            this.offsetY += pushY;
        } else {
            // Smoothly ease back into natural falling pathways
            this.offsetX *= 0.95;
            this.offsetY *= 0.95;
        }

        // Render positions smoothly onto browser canvas layers
        this.el.style.top = `${this.y + this.offsetY}px`;
        this.el.style.left = `${this.x + this.offsetX}px`;
        this.el.style.transform = `rotate(${this.rotation}deg) rotateY(${this.rotation * 0.5}deg)`;

        // Reset if it drops past the viewport bounds
        if (this.y > window.innerHeight + 20 || this.x < -20 || this.x > window.innerWidth + 20) {
            this.reset();
        }
    }
}

// Generate the objects
for (let i = 0; i < totalPetals; i++) {
    petalsArray.push(new YellowPetal());
}

// Global physics loop runner
function animatePetals() {
    for (let i = 0; i < petalsArray.length; i++) {
        petalsArray[i].update();
    }
    requestAnimationFrame(animatePetals);
}
animatePetals();

// ==========================================================================
// SMART 3D PERSPECTIVE HOVER CORNER TILT FOR FLOATING CARDS
// ==========================================================================
const cards = document.querySelectorAll('.interactive-tilt-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        
        // Find cursor positions relative to center point of each card module
        const cardWidth = rect.width;
        const cardHeight = rect.height;
        const centerX = rect.left + cardWidth / 2;
        const centerY = rect.top + cardHeight / 2;
        
        const mouseRelativeX = e.clientX - centerX;
        const mouseRelativeY = e.clientY - centerY;

        // Map tilt thresholds precisely (Max values: 12 degrees tilt)
        const tiltX = (mouseRelativeY / (cardHeight / 2)) * -12;
        const tiltY = (mouseRelativeX / (cardWidth / 2)) * 12;

        card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.03, 1.03, 1.03)`;
    });

    card.addEventListener('mouseleave', () => {
        // Return back effortlessly when cursor goes focus out
        card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
});
