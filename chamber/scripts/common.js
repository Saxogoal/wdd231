// common.js
// Navigation menu toggle + footer dynamic content

const menuButton = document.querySelector("#menu");
const navLinks = document.querySelector("#navLinks");

if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        menuButton.classList.toggle("open", isOpen);
        menuButton.setAttribute("aria-expanded", String(isOpen));
    });
}

// Footer: current year
const yearEl = document.getElementById("currentyear");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Footer: last modified
const modifiedEl = document.getElementById("lastModified");
if (modifiedEl) modifiedEl.textContent = document.lastModified;