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
                                                                                    