import { displayResults } from "./utilities.js";

document.addEventListener("DOMContentLoaded", () => {

    // Set hidden timestamp when form loads
    const hiddenTimestamp = document.getElementById("timestamp");
    if (hiddenTimestamp) {
        hiddenTimestamp.value = new Date().toISOString();
    }

    // Modal open buttons
    document.querySelectorAll(".view-button[data-modal]").forEach(btn => {
        btn.addEventListener("click", () => {
            const targetModal = document.getElementById(btn.getAttribute("data-modal"));
            if (targetModal) targetModal.showModal();
        });
    });

    // Modal close buttons
    document.querySelectorAll(".modal-close").forEach(btn => {
        btn.addEventListener("click", () => {
            const dialog = btn.closest("dialog");
            if (dialog) dialog.close();
        });
    });

    // Close modal when clicking on backdrop
    document.querySelectorAll("dialog.card").forEach(dialog => {
        dialog.addEventListener("click", (e) => {
            const rect = dialog.getBoundingClientRect();
            if (
                e.clientX < rect.left ||
                e.clientX > rect.right ||
                e.clientY < rect.top ||
                e.clientY > rect.bottom
            ) {
                dialog.close();
            }
        });
    });

    // Display results on thankyou.html
    const resultsDiv = document.getElementById("results");
    if (resultsDiv) {
        const params = new URLSearchParams(window.location.search);
        displayResults(params);
    }
});