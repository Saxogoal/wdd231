// join.js — no DOMContentLoaded wrapper needed with type="module"

// Set hidden timestamp immediately
const hiddenTimestamp = document.getElementById("timestamp");
if (hiddenTimestamp) {
    hiddenTimestamp.value = new Date().toISOString();
}

// Open modals
document.querySelectorAll(".view-button[data-modal]").forEach(btn => {
    btn.addEventListener("click", () => {
        const modal = document.getElementById(btn.dataset.modal);
        if (modal) modal.showModal();
    });
});

// Close via X button
document.querySelectorAll(".modal-close").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.closest("dialog")?.close();
    });
});

// Close via backdrop click
document.querySelectorAll("dialog.card").forEach(dialog => {
    dialog.addEventListener("click", (e) => {
        const r = dialog.getBoundingClientRect();
        if (
            e.clientX < r.left || e.clientX > r.right ||
            e.clientY < r.top || e.clientY > r.bottom
        ) {
            dialog.close();
        }
    });
});