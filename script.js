const music = document.getElementById('bg-music');
const toggleBtn = document.getElementById('music-toggle');
const openBtn = document.getElementById('open-btn');
const curtain = document.getElementById('invitation-curtain');

// Soft volume so it doesn't scare guests
music.volume = 0.4;

// Tap action to open envelope and start music smoothly
openBtn.addEventListener('click', () => {
    // 1. Fade out the opening screen
    curtain.classList.add('fade-away');
    
    // 2. Play music immediately now that user interacted
    music.play().then(() => {
        toggleBtn.textContent = "🔊 Music On";
    }).catch(error => {
        console.log("Audio auto-play blocked by browser security.", error);
    });

    // 3. Glide smoothly into the welcome section
    document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
});

// Manual play/pause control button
toggleBtn.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        toggleBtn.textContent = "🔊 Music On";
    } else {
        music.pause();
        toggleBtn.textContent = "🔇 Music Off";
    }
});
