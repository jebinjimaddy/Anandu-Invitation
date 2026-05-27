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
// HIGH-ACCURACY VELOCITY POINTER-TRACKING PETALS ENGINE
// ==========================================================================
const container = document.getElementById('petal-container');
const totalPetals = 16;
const petalsArray = [];

let mouseX = -1000;
let mouseY = -1000;
let isUserInteracting = false;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isUserInteracting = true;
});

window.addEventListener('touchmove', (e) => {
    if(e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
        isUserInteracting = true;
    }
});

window.addEventListener('mouseout', () => {
    isUserInteracting = false;
});

class YellowPetal {
    constructor() {
        this.el = document.createElement('div');
        this.el.className = 'petal';
        container.appendChild(this.el);
        this.reset();
    }

    reset() {
        this.w = Math.random() * 8 + 10; 
        this.h = this.w * (Math.random() * 0.2 + 0.9);
        this.el.style.width = `${this.w}px`;
        this.el.style.height = `${this.h}px`;
        
        this.x = Math.random() * window.innerWidth;
        this.y = -20 - (Math.random() * 100);
        
        this.speedY = Math.random() * 1.2 + 1.0;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 1.5 - 0.75;
        
        this.swayAngle = Math.random() * Math.PI * 2;
        this.swaySpeed = Math.random() * 0.02 + 0.01;
        this.swayRadius = Math.random() * 1.2 + 0.4;

        this.offsetX = 0;
        this.offsetY = 0;
    }

    update() {
        // Base environmental physics forces
        this.y += this.speedY;
        this.swayAngle += this.swaySpeed;
        this.x += this.speedX + Math.sin(this.swayAngle) * this.swayRadius;
        this.rotation += this.rotationSpeed;

        const currentTotalX = this.x + this.offsetX;
        const currentTotalY = this.y + this.offsetY;

        if (isUserInteracting) {
            const diffX = mouseX - currentTotalX;
            const diffY = mouseY - currentTotalY;
            const distance = Math.sqrt(diffX * diffX + diffY * diffY);
            
            // Interaction threshold boundary
            const attractionRadius = 300; 

            if (distance < attractionRadius && distance > 5) {
                // Determine normalized heading vectors
                const angle = Math.atan2(diffY, diffX);
                
                // Calculate pull velocity scaling based on proximity
                const proximityScale = (attractionRadius - distance) / attractionRadius;
                const targetedPullVelocity = proximityScale * 3.5; 

                // Blend pointer pull vectors cleanly over existing offsets
                this.offsetX += Math.cos(angle) * targetedPullVelocity * 0.15;
                this.offsetY += Math.sin(angle) * targetedPullVelocity * 0.15;
            } else {
                // Smooth friction dampening back to standard trajectories
                this.offsetX *= 0.94;
                this.offsetY *= 0.94;
            }
        } else {
            this.offsetX *= 0.94;
            this.offsetY *= 0.94;
        }

        this.el.style.top = `${this.y + this.offsetY}px`;
        this.el.style.left = `${this.x + this.offsetX}px`;
        this.el.style.transform = `rotate(${this.rotation}deg) rotateY(${this.rotation * 0.3}deg)`;

        // Reset if petals pass layout borders
        if (this.y > window.innerHeight + 20 || this.x < -20 || this.x > window.innerWidth + 20) {
            this.reset();
        }
    }
}

for (let i = 0; i < totalPetals; i++) {
    petalsArray.push(new YellowPetal());
}

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
        
        const cardWidth = rect.width;
        const cardHeight = rect.height;
        const centerX = rect.left + cardWidth / 2;
        const centerY = rect.top + cardHeight / 2;
        
        const mouseRelativeX = e.clientX - centerX;
        const mouseRelativeY = e.clientY - centerY;

        const tiltX = (mouseRelativeY / (cardHeight / 2)) * -12;
        const tiltY = (mouseRelativeX / (cardWidth / 2)) * 12;

        card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.03, 1.03, 1.03)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
});
