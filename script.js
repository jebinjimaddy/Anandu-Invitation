// ==========================================================================
// 3D ENVELOPE OPENING & DASHBOARD ENTRY INTERACTION
// ==========================================================================
const music = document.getElementById('bg-music');
const toggleBtn = document.getElementById('music-toggle');
const openEnvelopeBtn = document.getElementById('open-envelope-btn');
const envelopeOverlay = document.getElementById('envelope-overlay');
const dashboardView = document.getElementById('dashboard-viewport');

music.volume = 0.4;

openEnvelopeBtn.addEventListener('click', () => {
    // 1. Unseal and pop open top flap via class mappings
    envelopeOverlay.classList.add('envelope-opened');
    
    // 2. Bring the main invitation dashboard smoothly into screen view focus
    setTimeout(() => {
        dashboardView.classList.remove('dashboard-hidden');
    }, 600); // Gives time for the letter slide animation to feature clearly
    
    // 3. Play background music
    music.play().then(() => {
        toggleBtn.textContent = "🔊 Music On";
    }).catch(err => {
        console.log("Audio block active until user context registers.", err);
    });
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
        document.querySelector(".timer-container").innerHTML = "<p style='font-family:\"DhVanolines\",sans-serif; color:#C85A32; font-size:1.6rem;'>JUST MARRIED!</p>";
    }
}
updateCountdown();
const timerInterval = setInterval(updateCountdown, 1000);

// ==========================================================================
// FLOWER PETAL INTERACTION PHYSICS
// ==========================================================================
const container = document.getElementById('petal-container');
const totalPetals = 16;
const petalsArray = [];

let mouseX = -1000; let mouseY = -1000; let isUserInteracting = false;
let tapX = -1000; let tapY = -1000; let tapShockwaveRadius = 0;
const maxShockwaveRadius = 220;

window.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; isUserInteracting = true; });
window.addEventListener('touchmove', (e) => { if(e.touches.length > 0) { mouseX = e.touches[0].clientX; mouseY = e.touches[0].clientY; isUserInteracting = true; } });
window.addEventListener('mouseout', () => { isUserInteracting = false; });

function triggerScatterBlast(clientX, clientY) { tapX = clientX; tapY = clientY; tapShockwaveRadius = 10; }

window.addEventListener('mousedown', (e) => {
    if(e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.tagName === 'SELECT' || e.target.tagName === 'INPUT' || e.target.tagName === 'IFRAME') return;
    triggerScatterBlast(e.clientX, e.clientY);
});
window.addEventListener('touchstart', (e) => {
    if(e.touches.length > 0) {
        if(e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.tagName === 'SELECT' || e.target.tagName === 'INPUT' || e.target.tagName === 'IFRAME') return;
        triggerScatterBlast(e.touches[0].clientX, e.touches[0].clientY);
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
        this.w = Math.random() * 6 + 10; this.h = this.w * (Math.random() * 0.2 + 0.9);
        this.el.style.width = `${this.w}px`; this.el.style.height = `${this.h}px`;
        this.x = Math.random() * window.innerWidth; this.y = -20 - (Math.random() * 100);
        this.speedY = Math.random() * 1.2 + 1.0; this.speedX = Math.random() * 0.8 - 0.4;
        this.rotation = Math.random() * 360; this.rotationSpeed = Math.random() * 1.5 - 0.75;
        this.swayAngle = Math.random() * Math.PI * 2; this.swaySpeed = Math.random() * 0.02 + 0.01; this.swayRadius = Math.random() * 1.2 + 0.4;
        this.offsetX = 0; this.offsetY = 0;
    }
    update() {
        this.y += this.speedY; this.swayAngle += this.swaySpeed; this.x += this.speedX + Math.sin(this.swayAngle) * this.swayRadius; this.rotation += this.rotationSpeed;
        const currentTotalX = this.x + this.offsetX; const currentTotalY = this.y + this.offsetY;
        let appliedForceThisFrame = false;

        if (tapShockwaveRadius > 0) {
            const dxTap = currentTotalX - tapX; const dyTap = currentTotalY - tapY; const distToTap = Math.sqrt(dxTap * dxTap + dyTap * dyTap);
            if (distToTap < tapShockwaveRadius + 60 && distToTap > tapShockwaveRadius - 60) {
                const blastAngle = Math.atan2(dyTap, dxTap); const power = (maxShockwaveRadius - tapShockwaveRadius) / maxShockwaveRadius;
                this.offsetX += Math.cos(blastAngle) * power * 18; this.offsetY += Math.sin(blastAngle) * power * 18; appliedForceThisFrame = true;
            }
        }
        if (!appliedForceThisFrame && isUserInteracting) {
            const diffX = mouseX - currentTotalX; const diffY = mouseY - currentTotalY; const distance = Math.sqrt(diffX * diffX + diffY * diffY);
            const attractionRadius = 300;
            if (distance < attractionRadius && distance > 15) {
                const angle = Math.atan2(diffY, diffX); const proximityScale = (attractionRadius - distance) / attractionRadius; const targetedPullVelocity = proximityScale * 3.8;
                this.offsetX += Math.cos(angle) * targetedPullVelocity * 0.16; this.offsetY += Math.sin(angle) * targetedPullVelocity * 0.16;
            } else { this.offsetX *= 0.94; this.offsetY *= 0.94; }
        } else if (!appliedForceThisFrame) { this.offsetX *= 0.94; this.offsetY *= 0.94; }

        this.el.style.top = `${this.y + this.offsetY}px`; this.el.style.left = `${this.x + this.offsetX}px`;
        this.el.style.transform = `rotate(${this.rotation}deg) rotateY(${this.rotation * 0.3}deg)`;
        if (this.y > window.innerHeight + 20 || this.x < -20 || this.x > window.innerWidth + 20) { this.reset(); }
    }
}

for (let i = 0; i < totalPetals; i++) { petalsArray.push(new YellowPetal()); }

function animatePetals() {
    if (tapShockwaveRadius > 0) { tapShockwaveRadius += 6; if (tapShockwaveRadius > maxShockwaveRadius) { tapShockwaveRadius = 0; tapX = -1000; tapY = -1000; } }
    for (let i = 0; i < petalsArray.length; i++) { petalsArray[i].update(); }
    requestAnimationFrame(animatePetals);
}
animatePetals();

// ==========================================================================
// MOUSE MOVE PARALLAX TILT EFFECTS ON DASHBOARD CARDS
// ==========================================================================
const cards = document.querySelectorAll('.interactive-tilt-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cardWidth = rect.width; const cardHeight = rect.height;
        const centerX = rect.left + cardWidth / 2; const centerY = rect.top + cardHeight / 2;
        const mouseRelativeX = e.clientX - centerX; const mouseRelativeY = e.clientY - centerY;

        const tiltX = (mouseRelativeY / (cardHeight / 2)) * -8;
        const tiltY = (mouseRelativeX / (cardWidth / 2)) * 8;

        card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
});
