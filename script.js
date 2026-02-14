const phrases = [
    "Бусик, будешь моей валентинкой? 🌹",
    "Котик, ты точно уверена?",
    "Ну пожалуйста...",
    "Сердце трескается...",
    "Ну всё, я плачу...",
    "Бусик, ну перестань!",
    "Я щас умру от грусти!"
];

// Note: phrases[0] is initial, 
// click 1 -> phrases[1]
// click 2 -> phrases[2]
// click 3 -> phrases[3]
// click 4 -> phrases[4]
// click 5 -> phrases[5] ("Я щас умру от грусти!") -> Final state

let noCount = 0;

const noBtn = document.getElementById("no-btn");
const yesBtn = document.getElementById("yes-btn");
const questionSection = document.getElementById("question-section");
const successSection = document.getElementById("success-section");
const mainGif = document.getElementById("main-gif");
const titleElement = document.querySelector(".title");

// Images configuration (ImgBB URLs)
const images = [
    "https://i.ibb.co/nNYLbvvW/couple-heart.png",      // 0: Initial
    "https://i.ibb.co/JRJXckqK/2clickno.png",          // 1: Click 1
    "https://i.ibb.co/PswPvfYm/2second-click-no.png",  // 2: Click 2
    "https://i.ibb.co/TD7GndFp/3click-no.png",         // 3: Click 3
    "https://i.ibb.co/k2bK7pb6/4-click-no.png",        // 4: Click 4
    "https://i.ibb.co/pr57RLPN/5click-no.png"          // 5: Click 5 (Final)
];

noBtn.addEventListener("click", () => {
    noCount++;

    // Change image based on clicks
    if (noCount < images.length) {
        mainGif.src = images[noCount];
    }

    // Change Title Text
    // We start from index 1 because index 0 is the initial title
    if (noCount < phrases.length) {
        titleElement.innerText = phrases[noCount];
    } else {
        titleElement.innerText = phrases[phrases.length - 1]; // Keep final
    }

    // Special case for final stage (5th click)
    // 5th click corresponds to images[5] (5click-no) and phrases[5] ("Я щас умру от грусти!")
    if (noCount >= 5) {
        noBtn.classList.add("hidden"); // Hide No button
        yesBtn.style.fontSize = "3rem"; // Make Yes button huge
        yesBtn.style.width = "100%";
        noBtn.style.display = "none"; // Ensure it's gone
    }

    // Grow Yes button (until final stage logic takes over)
    if (noCount < 5) {
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

    // Set success image
    const couplePhoto = document.querySelector(".couple-photo");
    couplePhoto.src = "https://i.ibb.co/SwPqj3WX/clickyes.png";
});

// Create floating hearts background
function createHearts() {
    const heartsContainer = document.querySelector(".hearts-container");
    const heartCount = 40;

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
                createSingleHeart();
            });
        }, i * 150);
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
    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            createSingleHeart();
        }, i * 10);
    }
}

// Initialize background hearts
createHearts();
// Mobile responsiveness verified
// Redeploy timestamp: Sat Feb 14 15:16:09 CET 2026
