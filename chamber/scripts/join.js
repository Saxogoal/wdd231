import { displayResults } from "./utilities.js";

document.addEventListener("DOMContentLoaded", () => {
    // Corrected target lookup matching the new timestamp ID
    const hiddenTimestamp = document.getElementById("timestamp");
    if (hiddenTimestamp) {
        hiddenTimestamp.value = new Date().toISOString();
    }

    // Modal triggering controls mapping
    const modalLaunchers = document.querySelectorAll(".view-button[data-modal]");
    const modalDismissers = document.querySelectorAll(".modal-close");

    // Launch targeted popup element using showModal browser API
    modalLaunchers.forEach(btn => {
        btn.addEventListener("click", () => {
            const destinationId = btn.getAttribute("data-modal");
            const targetPopup = document.getElementById(destinationId);
            if (targetPopup) {
                targetPopup.showModal();
            }
        });
    });

    // Dismiss open dialog layout
    modalDismissers.forEach(btn => {
        btn.addEventListener("click", () => {
            const dialog = btn.closest("dialog");
            if (dialog) dialog.close();
        });
    });

    // Cleanly close when user clicks on backdrop blur areas
    document.querySelectorAll("dialog.card").forEach(dialog => {
        dialog.addEventListener("click", (e) => {
            const limits = dialog.getBoundingClientRect();
            if (
                e.clientX < limits.left ||
                e.clientX > limits.right ||
                e.clientY < limits.top ||
                e.clientY > limits.bottom
            ) {
                dialog.close();
            }
        });
    });

    const myInfo = {};
    displayResults(myInfo);
});