// join.js
// Optimized with Event Delegation and BFCache preservation hooks

window.addEventListener('pageshow', (event) => {
    const populateTimestamp = () => {
        const hiddenTimestamp = document.getElementById("timestamp");
        if (hiddenTimestamp) {
            hiddenTimestamp.value = new Date().toISOString();
        }
    };

    // Safely defer execution based on page cache persistence markers
    if (event.persisted) {
        if ('requestIdleCallback' in window) {
            requestIdleCallback(populateTimestamp);
        } else {
            setTimeout(populateTimestamp, 0);
        }
    } else {
        if ('requestIdleCallback' in window) {
            requestIdleCallback(populateTimestamp);
        } else {
            window.addEventListener('load', populateTimestamp);
        }
    }
});

// Event Delegation: Zero loops running on startup
document.addEventListener("click", (e) => {
    // 1. Open Dialog Modals
    const viewBtn = e.target.closest(".view-button[data-modal]");
    if (viewBtn) {
        const modal = document.getElementById(viewBtn.dataset.modal);
        if (modal) modal.showModal();
        return;
    }

    // 2. Close via Close Button
    const closeBtn = e.target.closest(".modal-close");
    if (closeBtn) {
        closeBtn.closest("dialog")?.close();
        return;
    }

    // 3. Close via Dialog Backdrop Click
    const dialog = e.target.closest("dialog.card");
    if (dialog && e.target === dialog) {
        const r = dialog.getBoundingClientRect();
        if (
            e.clientX < r.left || e.clientX > r.right ||
            e.clientY < r.top || e.clientY > r.bottom
        ) {
            dialog.close();
        }
    }
});