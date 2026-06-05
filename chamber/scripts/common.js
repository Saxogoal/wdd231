// common.js
// Non-critical DOM interactions deferred to eliminate main-thread blocking time

if ('requestIdleCallback' in window) {
    requestIdleCallback(initCommonLayout);
} else {
    window.addEventListener('load', initCommonLayout);
}

function initCommonLayout() {
    const menuButton = document.querySelector("#menu");
    const navLinks = document.querySelector("#navLinks");

    if (menuButton && navLinks) {
        menuButton.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");
            menuButton.classList.toggle("open", isOpen);
            menuButton.setAttribute("aria-expanded", String(isOpen));
        });
    }

    // Dynamic Footer Components
    const yearEl = document.getElementById("currentyear");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const modifiedEl = document.getElementById("lastModified");
    if (modifiedEl) modifiedEl.textContent = document.lastModified;
}