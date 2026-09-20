(() => {
  "use strict";

  const sounds = {
    w: "sounds/crash.mp3",
    a: "sounds/kick-bass.mp3",
    s: "sounds/snare.mp3",
    d: "sounds/tom-1.mp3",
    j: "sounds/tom-2.mp3",
    k: "sounds/tom-3.mp3",
    l: "sounds/tom-4.mp3"
  };

  const buttons = [...document.querySelectorAll(".drum")];
  const statusText = document.getElementById("statusText");
  const audioCache = new Map();
  const activeTimers = new Map();

  function getAudio(key) {
    if (!sounds[key]) return null;
    if (!audioCache.has(key)) {
      const audio = new Audio(sounds[key]);
      audio.preload = "auto";
      audioCache.set(key, audio);
    }
    return audioCache.get(key);
  }

  function animate(key) {
    const button = document.querySelector(`.drum[data-key="${key}"]`);
    if (!button) return;

    button.classList.remove("pressed");
    void button.offsetWidth;
    button.classList.add("pressed");

    clearTimeout(activeTimers.get(key));
    activeTimers.set(key, setTimeout(() => {
      button.classList.remove("pressed");
    }, 110));
  }

  function playSound(key) {
    const normalized = String(key).toLowerCase();
    const audio = getAudio(normalized);
    if (!audio) return;

    audio.currentTime = 0;
    const result = audio.play();

    if (result && typeof result.catch === "function") {
      result.catch(() => {
        statusText.textContent = "Tap a drum once to enable sound";
      });
    } else {
      statusText.textContent = "Playing";
    }

    animate(normalized);
    statusText.textContent = `Playing: ${normalized.toUpperCase()}`;
  }

  buttons.forEach((button) => {
    const key = button.dataset.key;

    button.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      playSound(key);
    });

    button.addEventListener("keydown", (event) => {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        playSound(key);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.repeat) return;
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    playSound(event.key);
  });

  // Preload the short samples after the page becomes idle.
  const preload = () => Object.keys(sounds).forEach(getAudio);
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(preload);
  } else {
    window.setTimeout(preload, 500);
  }
})();
