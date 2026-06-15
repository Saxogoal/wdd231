// log.js — ES Module
// Demonstrates: (1) DOM manipulation, (2) localStorage, (3) template literals, (4) array methods

const LS_LOG_KEY = 'pgturner-log';
const LS_GOAL_KEY = 'pgturner-goal';

// ── LocalStorage helpers ──────────────────────────────────────────────────────
function getLog() {
    return JSON.parse(localStorage.getItem(LS_LOG_KEY) || '[]');
}

function saveLog(entries) {
    localStorage.setItem(LS_LOG_KEY, JSON.stringify(entries));
}

function getGoal() {
    return JSON.parse(localStorage.getItem(LS_GOAL_KEY) || 'null');
}

function saveGoal(goal) {
    localStorage.setItem(LS_GOAL_KEY, JSON.stringify(goal));
}

// ── Stars ─────────────────────────────────────────────────────────────────────
function starsText(n) {
    return '★'.repeat(n) + '☆'.repeat(5 - n);
}

let selectedRating = 0;

function initStarRating() {
    const stars = document.querySelectorAll('.star-btn');
    stars.forEach(btn => {
        btn.addEventListener('click', () => {
            selectedRating = parseInt(btn.dataset.value);
            document.getElementById('ratingValue').value = selectedRating;
            updateStarDisplay(selectedRating);
        });

        btn.addEventListener('mouseenter', () => updateStarDisplay(parseInt(btn.dataset.value)));
    });

    document.getElementById('ratingInput').addEventListener('mouseleave', () => {
        updateStarDisplay(selectedRating);
    });
}

function updateStarDisplay(count) {
    document.querySelectorAll('.star-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i < count);
    });
}

// ── Render log entries using template literals + array methods ────────────────
function renderLog() {
    const entries = getLog();
    const list = document.getElementById('logList');
    const countEl = document.getElementById('logCount');

    countEl.textContent = `(${entries.length})`;

    if (entries.length === 0) {
        list.innerHTML = `<p class="empty-log">No books logged yet. Use the form above to add your first one!</p>`;
    } else {
        // Sort by date logged descending using array method
        const sorted = [...entries].sort((a, b) => new Date(b.loggedAt) - new Date(a.loggedAt));
        list.innerHTML = sorted.map(entry => `
            <div class="log-entry" data-id="${entry.id}">
                <div class="log-entry-info">
                    <p class="log-entry-title">${entry.title}</p>
                    <p class="log-entry-meta">
                        ${entry.author ? `by ${entry.author}` : ''}
                        ${entry.genre ? ` · ${entry.genre}` : ''}
                        ${entry.date ? ` · Finished ${entry.date}` : ''}
                        ${entry.review ? ` · <em>${entry.review.slice(0, 60)}${entry.review.length > 60 ? '…' : ''}</em>` : ''}
                    </p>
                </div>
                ${entry.rating > 0
                ? `<span class="log-entry-stars" aria-label="${entry.rating} stars">${starsText(entry.rating)}</span>`
                : ''}
                <button class="log-entry-delete" data-id="${entry.id}" aria-label="Remove ${entry.title} from log" title="Remove">✕</button>
            </div>
        `).join('');

        // Delete handlers
        list.querySelectorAll('.log-entry-delete').forEach(btn => {
            btn.addEventListener('click', () => deleteEntry(btn.dataset.id));
        });
    }

    updateGoalProgress();
}

// ── Delete entry ──────────────────────────────────────────────────────────────
function deleteEntry(id) {
    const entries = getLog().filter(e => e.id !== id);
    saveLog(entries);
    renderLog();
}

// ── Goal ──────────────────────────────────────────────────────────────────────
function initGoal() {
    const goalYear = document.getElementById('goalYear');
    if (goalYear) goalYear.textContent = new Date().getFullYear();

    const saved = getGoal();
    if (saved) {
        const targetInput = document.getElementById('goalTarget');
        if (targetInput) targetInput.value = saved.target;
    }

    document.getElementById('saveGoalBtn').addEventListener('click', () => {
        const target = parseInt(document.getElementById('goalTarget').value);
        if (!target || target < 1) return;
        saveGoal({ target, year: new Date().getFullYear() });
        updateGoalProgress();
    });
}

function updateGoalProgress() {
    const goal = getGoal();
    const progressSection = document.getElementById('goalProgress');
    if (!goal || !progressSection) return;

    const count = getLog().length;
    const pct = Math.min(100, Math.round((count / goal.target) * 100));

    progressSection.style.display = 'block';
    document.getElementById('progressFill').style.width = `${pct}%`;
    document.getElementById('progressLabel').textContent =
        `${count} of ${goal.target} books (${pct}%)${pct >= 100 ? ' 🎉 Goal reached!' : ''}`;
}

// ── Pre-fill from URL params (coming from library modal) ─────────────────────
function prefillFromURL() {
    const params = new URLSearchParams(window.location.search);
    const title = params.get('title');
    const author = params.get('author');
    if (title) document.getElementById('bookTitle').value = title;
    if (author) document.getElementById('bookAuthor').value = author;
}

// ── Form submit — save to localStorage, then submit to action page ────────────
function initForm() {
    const form = document.getElementById('logForm');
    if (!form) return;

    form.addEventListener('submit', e => {
        const titleInput = document.getElementById('bookTitle');
        if (!titleInput.value.trim()) {
            e.preventDefault();
            titleInput.focus();
            titleInput.style.borderColor = '#c0392b';
            setTimeout(() => (titleInput.style.borderColor = ''), 2000);
            return;
        }

        // Save to localStorage before navigating to action page
        const entry = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
            title: titleInput.value.trim(),
            author: document.getElementById('bookAuthor').value.trim(),
            genre: document.getElementById('bookGenre').value,
            date: document.getElementById('dateFinished').value,
            rating: selectedRating,
            review: document.getElementById('bookReview').value.trim(),
            loggedAt: new Date().toISOString(),
        };

        const entries = getLog();
        entries.push(entry);
        saveLog(entries);

        // Allow form to navigate to action page naturally (GET method)
    });
}

// ── Init ──────────────────────────────────────────────────────────────────────
initStarRating();
initGoal();
prefillFromURL();
initForm();
renderLog();
