// Theme Toggle
let themeButton = document.getElementById("theme-button");
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
};
if (themeButton) {
  themeButton.addEventListener("click", toggleDarkMode);
}

// RSVP Counter & Participants
let count = 3;

const addParticipant = (person) => {
  const participantsDiv = document.querySelector(".rsvp-participants");
  
  // Add new participant line
  const newParagraph = document.createElement("p");
  newParagraph.textContent = `🎟️ ${person.name} from ${person.state} has RSVP'd.`;
  participantsDiv.appendChild(newParagraph);

  // Update participant counter
  const oldCounter = document.getElementById("rsvp-count");
  if (oldCounter) {
    oldCounter.remove();
  }

  count = count + 1;

  const newCounter = document.createElement("p");
  newCounter.id = "rsvp-count";
  newCounter.textContent = "⭐ " + count + " people have RSVP'd to this event!";
  participantsDiv.appendChild(newCounter);
};

// Form Validation
const validateForm = (event) => {
  if (event) event.preventDefault();

  let nameInput = document.getElementById('rsvp-name');
  let emailInput = document.getElementById('rsvp-email');
  let stateInput = document.getElementById('rsvp-state');

  let person = {
    name: nameInput ? nameInput.value.trim() : "",
    email: emailInput ? emailInput.value.trim() : "",
    state: stateInput ? stateInput.value.trim() : ""
  };

  if (person.name.length < 2 || !person.email.includes("@") || person.state.length < 2) {
    alert("Please fill out all fields with valid information!");
    return;
  }

  addParticipant(person);
  toggleModal(person);

  nameInput.value = '';
  emailInput.value = '';
  stateInput.value = '';
};

const rsvpButton = document.getElementById("rsvp-button");
if (rsvpButton) {
  rsvpButton.addEventListener("click", validateForm);
}

// Scroll Reveal Animations
let revealableContainers = document.querySelectorAll('.revealable');
const reveal = () => {
  for (let i = 0; i < revealableContainers.length; i++) {
    let current = revealableContainers[i];
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
    let revealDistance = parseInt(getComputedStyle(current).getPropertyValue('--reveal-distance'), 10) || 100;

    if (topOfRevealableContainer < windowHeight - revealDistance) {
      revealableContainers[i].classList.add('active');
    } else { 
      revealableContainers[i].classList.remove('active');
    }
  }
};
window.addEventListener('scroll', reveal);

// Reduce Motion Toggle
let reduceMotionBtn = document.getElementById('reduce-motion-btn');
const reduceMotion = () => {
  document.body.classList.toggle('reduce-motion');
};
if (reduceMotionBtn) {
  reduceMotionBtn.addEventListener('click', reduceMotion);
}

// Modal & Image Animation Logic
let rotateFactor = 0;
let modalImage = document.getElementById('modal-img');

const animateImage = () => {
  if (document.body.classList.contains('reduce-motion')) {
    return; // Respect reduce motion setting
  }

  rotateFactor = rotateFactor === 0 ? -10 : 0;
  if (modalImage) {
    modalImage.style.transform = `rotate(${rotateFactor}deg)`;
    modalImage.style.transition = 'transform 0.3s ease';
  }
};

const toggleModal = (person) => {
  let modal = document.getElementById('success-modal');
  let modalText = document.getElementById('modal-text');

  if (!modal) return;

  modalText.textContent = `Thanks for RSVPing, ${person.name}! We can't wait to see you at Tuliptopia! 🌷`;
  modal.style.display = 'flex';

  let intervalId = setInterval(animateImage, 500);

  let timeoutId = setTimeout(() => {
    modal.style.display = 'none';
    clearInterval(intervalId);
  }, 5000);

  let closeBtn = document.getElementById('close-modal-btn');
  if (closeBtn) {
    closeBtn.onclick = () => {
      modal.style.display = 'none';
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }
};