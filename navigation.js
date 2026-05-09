// navigation.js
// Handles the responsive hamburger navigation menu

const hamburger = document.getElementById("hamburger");
const mainNav = document.getElementById("main-nav");

hamburger.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen.toString());
});

// Close nav when a link is clicked on mobile
mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        hamburger.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
    });
});
