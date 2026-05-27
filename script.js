const music = document.getElementById('bg-music');
const toggleBtn = document.getElementById('music-toggle');
const openBtn = document.getElementById('open-btn');
const curtain = document.getElementById('invitation-curtain');

music.volume = 0.4;

openBtn.addEventListener('click', () => {
    curtain.classList.add('fade-away');
    
    music.play().then(() => {
        toggleBtn.textContent = "🔊";
    }).catch(error => {
        console.log("Audio auto-play blocked by browser security.", error);
    });

    document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
});

toggleBtn.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        toggleBtn.textContent = "🔊";
    } else {
        music.pause();
        toggleBtn.textContent = "🔇";
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
