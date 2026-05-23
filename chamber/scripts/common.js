//Navigation Menu
const menuButton = document.querySelector("#menu");
const navLinks = document.querySelector("#navLinks");

menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    menuButton.classList.toggle("open");
    const isOpen = navLinks.classList.contains("open");
    menuButton.setAttribute("aria-expanded", isOpen);
});


//Last Modified Footer
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;