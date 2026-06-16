// log-action.js
// Reads URL search params from the log form submission and displays them on the action page.
// Demonstrates: (1) URLSearchParams, (2) DOM manipulation, (3) template literals

function starsText(n) {
    const count = parseInt(n) || 0;
    if (count < 1) return 'Not rated';
    return '★'.repeat(count) + '☆'.repeat(5 - count);
}

function formatDate(dateStr) {
    if (!dateStr) return '—';
    const [year, month, day] = dateStr.split('-');
    if (!year || !month || !day) return dateStr;
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function buildRows(params) {
    const fields = [
        { key: 'title', label: 'Title', format: v => v || '—' },
        { key: 'author', label: 'Author', format: v => v || '—' },
        { key: 'genre', label: 'Genre', format: v => v || '—' },
        { key: 'pages', label: 'Pages', format: v => v ? Number(v).toLocaleString() : '—' },
        { key: 'finishDate', label: 'Date Finished', format: v => formatDate(v) },
        { key: 'rating', label: 'Rating', format: v => starsText(v) },
        { key: 'notes', label: 'Notes', format: v => v || '—' },
    ];

    return fields.map(field => {
        const value = params.get(field.key);
        return `
            <div class="data-row">
                <span class="data-key">${field.label}</span>
                <span class="data-val">${field.format(value)}</span>
            </div>
        `;
    }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const container = document.getElementById('submittedData');

    if (!container) return;

    // If no params at all, show a fallback message
    if (!params.has('title')) {
        container.innerHTML = `<p class="loading-text" style="padding:1rem;">No submission data found.</p>`;
        return;
    }

    container.innerHTML = buildRows(params);

    // Update the success title with the book name
    const title = params.get('title');
    const successTitle = document.getElementById('successTitle');
    if (successTitle && title) {
        successTitle.textContent = `"${title}" has been logged!`;
    }
});