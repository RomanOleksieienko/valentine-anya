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
    "couple_heart.jpg",   // 0: Initial
    "boy_hamster.png",    // 1: Click 1 (Hamster)
    "boy_crying.png",     // 2: Click 2 (Crying)
    "boy_kneeling.png",   // 3: Click 3 (Kneeling)
    "boy_puddle.png"      // 4: Click 4 (Puddle)
];

noBtn.addEventListener("click", () => {
    noCount++;

    // Change image based on clicks
    if (noCount < images.length) {
        mainGif.src = images[noCount];
    }

    // Special case for final stage (Puddle)
    if (noCount >= 4) {
        noBtn.classList.add("hidden"); // Hide No button
        yesBtn.style.fontSize = "3rem"; // Make Yes button huge
        yesBtn.style.width = "100%";
        noBtn.style.display = "none"; // Ensure it's gone
    }

    // Change text
    if (noCount < phrases.length) {
        noBtn.innerText = phrases[noCount];
    } else {
        noBtn.innerText = phrases[phrases.length - 1];
    }

    // Grow Yes button (until final stage logic takes over)
    if (noCount < 4) {
        const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
        const currentPadding = parseFloat(window.getComputedStyle(yesBtn).paddingTop);

        yesBtn.style.fontSize = `${currentSize * 1.4}px`;
        yesBtn.style.padding = `${currentPadding * 1.2}px ${currentPadding * 2}px`;
    }
});

yesBtn.addEventListener("click", () => {
    questionSection.classList.add("hidden");
    successSection.classList.remove("hidden");
    createConfetti();

    // Success Slideshow
    let toggle = false;
    setInterval(() => {
        const couplePhoto = document.querySelector(".couple-photo");
        if (toggle) {
            couplePhoto.src = "couple_kiss.png";
        } else {
            couplePhoto.src = "couple_heart.png";
        }
        toggle = !toggle;
    }, 3000); // Swap every 3 seconds
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
