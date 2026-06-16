// log.js — ES Module

const LS_LOG_KEY = 'pgturner-log';

// ── LocalStorage helpers ─────────────────────────────────────

function getLog() {
    return JSON.parse(localStorage.getItem(LS_LOG_KEY) || '[]');
}

function saveLog(entries) {
    localStorage.setItem(LS_LOG_KEY, JSON.stringify(entries));
}

// ── Stars ────────────────────────────────────────────────────

function starsText(n) {
    return '★'.repeat(n) + '☆'.repeat(5 - n);
}

let selectedRating = 0;

function initStarRating() {
    const stars = document.querySelectorAll('.star-btn');
    const ratingInput = document.getElementById('bookRating');
    const ratingContainer = document.querySelector('.rating-input');

    if (!ratingInput || !ratingContainer) return;

    stars.forEach(btn => {
        btn.addEventListener('click', () => {
            selectedRating = parseInt(btn.dataset.value);
            ratingInput.value = selectedRating;
            updateStarDisplay(selectedRating);
        });

        btn.addEventListener('mouseenter', () => {
            updateStarDisplay(parseInt(btn.dataset.value));
        });
    });

    ratingContainer.addEventListener('mouseleave', () => {
        updateStarDisplay(selectedRating);
    });
}

function updateStarDisplay(count) {
    document.querySelectorAll('.star-btn').forEach((btn, index) => {
        btn.classList.toggle('active', index < count);
    });
}

// ── Render logged books ──────────────────────────────────────

function renderLog() {
    const entries = getLog();

    const list = document.getElementById('logList');
    const count = document.getElementById('logCount');

    if (!list || !count) return;

    count.textContent = `(${entries.length})`;

    if (entries.length === 0) {
        list.innerHTML = `
            <p class="empty-log">
                No books logged yet. Use the form above to add your first one!
            </p>
        `;
        return;
    }

    const sortedEntries = [...entries].sort(
        (a, b) => new Date(b.loggedAt) - new Date(a.loggedAt)
    );

    list.innerHTML = sortedEntries.map(entry => `
        <div class="log-entry">
            <div class="log-entry-info">
                <p class="log-entry-title">${entry.title}</p>

                <p class="log-entry-meta">
                    by ${entry.author}
                    ${entry.genre ? ` · ${entry.genre}` : ''}
                    ${entry.date ? ` · Finished ${entry.date}` : ''}
                </p>

                ${entry.notes
            ? `<p class="log-entry-meta">${entry.notes}</p>`
            : ''
        }
            </div>

            <span class="log-entry-stars">
                ${starsText(entry.rating)}
            </span>
        </div>
    `).join('');
}

// ── Pre-fill from URL params ─────────────────────────────────

function prefillFromURL() {
    const params = new URLSearchParams(window.location.search);

    const title = params.get('title');
    const author = params.get('author');

    if (title) {
        const titleInput = document.getElementById('bookTitle');
        if (titleInput) titleInput.value = title;
    }

    if (author) {
        const authorInput = document.getElementById('bookAuthor');
        if (authorInput) authorInput.value = author;
    }
}

// ── Save book before form submits ────────────────────────────

function initForm() {
    const form = document.getElementById('logBookForm');

    if (!form) return;

    form.addEventListener('submit', () => {

        const entry = {
            id: crypto.randomUUID(),

            title: document.getElementById('bookTitle').value.trim(),

            author: document.getElementById('bookAuthor').value.trim(),

            genre: document.getElementById('bookGenre').value,

            pages: document.getElementById('bookPages').value,

            date: document.getElementById('bookFinishDate').value,

            rating: Number(document.getElementById('bookRating').value),

            notes: document.getElementById('bookNotes').value.trim(),

            loggedAt: new Date().toISOString()
        };

        const entries = getLog();

        entries.push(entry);

        saveLog(entries);

        // Form continues normally to log-action.html
    });
}

// ── Init ─────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    initStarRating();
    prefillFromURL();
    initForm();
    renderLog();
});