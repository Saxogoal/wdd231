// join-form.js

document.addEventListener("DOMContentLoaded", () => {

    // timestamp only needed on join page
    const hiddenTimestamp = document.getElementById("timestamp");
    if (hiddenTimestamp) {
        hiddenTimestamp.value = new Date().toISOString();
    }

    // modal buttons
    document.querySelectorAll(".view-button[data-modal]").forEach(btn => {
        btn.addEventListener("click", () => {
            const modal = document.getElementById(btn.dataset.modal);
            if (modal) modal.showModal();
        });
    });

    // close buttons
    document.querySelectorAll(".modal-close").forEach(btn => {
        btn.addEventListener("click", () => {
            btn.closest("dialog")?.close();
        });
    });

    // backdrop close
    document.querySelectorAll("dialog.card").forEach(dialog => {
        dialog.addEventListener("click", (e) => {
            const r = dialog.getBoundingClientRect();
            if (
                e.clientX < r.left ||
                e.clientX > r.right ||
                e.clientY < r.top ||
                e.clientY > r.bottom
            ) {
                dialog.close();
            }
        });
    });
});