const sounds = {
  whale: new Audio("assets/sounds/whale.mp3"),
  dolphin: new Audio("assets/sounds/dolphin.mp3"),
  coral: new Audio("assets/sounds/coral.mp3"),
  submarine: new Audio("assets/sounds/submarine.mp3"),
  shark: new Audio("assets/sounds/shark.mp3"),
  jellyfish: new Audio("assets/sounds/jellyfish.mp3"),
  ship: new Audio("assets/sounds/ship.mp3"),
  tortoise: new Audio("assets/sounds/tortoise.mp3"),
};

let currentSound = null;
let currentButton = null;

function toggleSound(name, button) {
  const selectedSound = sounds[name];

  if (!selectedSound) return;

  // Pause currently playing
  if (currentSound && !currentSound.paused) {
    currentSound.pause();
    currentSound.currentTime = 0;
    if (currentButton) currentButton.innerText = "Play";
  }

  // Toggle same sound
  if (currentSound === selectedSound && !selectedSound.paused) {
    selectedSound.pause();
    button.innerText = "Play";
    currentSound = null;
    currentButton = null;
    return;
  }

  selectedSound.currentTime = 0;
  selectedSound.play().catch(err => console.error("Playback failed:", err));
  currentSound = selectedSound;
  currentButton = button;
  button.innerText = "Pause";
}

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".play-btn");
  const dropdown = document.getElementById("soundSelector");
  const dropdownBtn = document.getElementById("playSelectedSound");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const name = button.getAttribute("data-sound");
      toggleSound(name, button);
    });
  });

  dropdownBtn.addEventListener("click", () => {
    const selected = dropdown.value;
    if (!selected) {
      alert("Please select an animal!");
      return;
    }

    // Find corresponding card button and trigger it
    const cardButton = document.querySelector(`.play-btn[data-sound="${selected}"]`);
    if (cardButton) {
      cardButton.click();
      cardButton.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const flipCards = document.querySelectorAll(".flip-card-inner");

  flipCards.forEach(card => {
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });
  });
});

