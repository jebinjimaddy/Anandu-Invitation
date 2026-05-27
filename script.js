const music = document.getElementById('bg-music');
const toggleBtn = document.getElementById('music-toggle');

// Adjust volume so it's a soft background ambiance
music.volume = 0.4; 

toggleBtn.addEventListener('click', () => {
    if (music.paused) {
            music.play().then(() => {
                        toggleBtn.textContent = "⏸️ Pause Music";
                                }).catch(error => {
                                            console.log("Playback blocked by browser settings:", error);
                                                    });
                                                        } else {
                                                                music.pause();
                                                                        toggleBtn.textContent = "🎵 Play Music";
                                                                            }
                                                                            });
                                                                            