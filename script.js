const phrases = [
    "Нет",
    "Котик, ты точно уверена?",
    "Ну пожалуйста...",
    "Сердце трескается...",
    "Ну всё, я плачу...",
    "Бусик, ну перестань!",
    "Я щас умру от грусти!",
    "Нажми уже ДА!",
    "Я не отстану...",
    "Люблю тебя! (Нажми ДА)"
];

let noCount = 0;

const noBtn = document.getElementById("no-btn");
const yesBtn = document.getElementById("yes-btn");
const questionSection = document.getElementById("question-section");
const successSection = document.getElementById("success-section");
const mainGif = document.getElementById("main-gif");

// Images configuration
const images = [
    "couple_heart.png", // 0: Initial
    "boy_hamster.png",  // 1: Click 1 (Hamster meme)
    "boy_crying.png",   // 2: Click 2 (Crying)
    "heart_crack.png"   // 3: Click 3 (Crack)
];

noBtn.addEventListener("click", () => {
    noCount++;

    // Change image based on clicks
    if (noCount === 1) {
        mainGif.src = images[1]; // Hamster
    } else if (noCount === 2) {
        mainGif.src = images[2]; // Crying
    } else if (noCount >= 3) {
        mainGif.src = images[3]; // Crack (stays cracked or cycle?)
        // Let's keep it cracked to be dramatic
    }

    // Change text
    if (noCount < phrases.length) {
        noBtn.innerText = phrases[noCount];
    } else {
        noBtn.innerText = phrases[phrases.length - 1];
    }

    // Grow Yes button
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
    const currentPadding = parseFloat(window.getComputedStyle(yesBtn).paddingTop);

    yesBtn.style.fontSize = `${currentSize * 1.4}px`;
    yesBtn.style.padding = `${currentPadding * 1.2}px ${currentPadding * 2}px`; // Increase padding too
});

yesBtn.addEventListener("click", () => {
    questionSection.classList.add("hidden");
    successSection.classList.remove("hidden");
    createConfetti();
});

// Create floating hearts background
function createHearts() {
    const heartsContainer = document.querySelector(".hearts-container");
    const heartCount = 40; // Increased from 20 to 40 for more density

    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            const heart = document.createElement("div");
            heart.classList.add("heart");

            // Random positioning and delay
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.animationDuration = `${Math.random() * 3 + 4}s`; // 4-7s
            heart.style.animationDelay = `${Math.random() * 5}s`;

            heartsContainer.appendChild(heart);

            // Cleanup after animation
            heart.addEventListener('animationend', () => {
                heart.remove();
                // Replace with new one to keep flow infinite/dense enough
                createSingleHeart();
            });
        }, i * 150); // Faster generation interval
    }
}

function createSingleHeart() {
    const heartsContainer = document.querySelector(".hearts-container");
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${Math.random() * 3 + 4}s`;
    heartsContainer.appendChild(heart);

    heart.addEventListener('animationend', () => {
        heart.remove();
        createSingleHeart();
    });
}

// Simple JS Confetti function for the Yes click
function createConfetti() {
    for (let i = 0; i < 80; i++) { // More confetti!
        setTimeout(() => {
            createSingleHeart();
        }, i * 10);
    }
}

// Initialize background hearts
createHearts();
