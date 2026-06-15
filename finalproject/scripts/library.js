// library.js — ES Module
// Demonstrates: (1) async/await with try/catch, (2) array methods, (3) template literals, (4) modal dialog, (5) DOM manipulation

const DATA_URL = 'data/books.json';

let allBooks = [];
let filteredBooks = [];

// ── Fetch books (async + try/catch) ──────────────────────────────────────────
async function fetchBooks() {
    try {
        const response = await fetch(DATA_URL);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        allBooks = data;
        initFilters(allBooks);
        applyFilters();
    } catch (error) {
        console.error('Failed to load books:', error);
        document.getElementById('booksGrid').innerHTML =
            `<p class="no-results">⚠️ Could not load books. Please try refreshing.</p>`;
        document.getElementById('bookCount').textContent = 'Error loading data';
    }
}

// ── Build genre filter options using array methods ────────────────────────────
function initFilters(books) {
    const genres = [...new Set(books.map(b => b.genre))].sort();
    const genreSelect = document.getElementById('genreFilter');
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        genreSelect.appendChild(option);
    });
}

// ── Generate star string using template literal ───────────────────────────────
function starsHTML(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return `${'★'.repeat(full)}${'½'.repeat(half)}${'☆'.repeat(empty)}`;
}

// ── Render book cards using template literals ─────────────────────────────────
function renderBooks(books) {
    const grid = document.getElementById('booksGrid');
    const count = document.getElementById('bookCount');

    count.textContent = `${books.length} book${books.length !== 1 ? 's' : ''}`;

    if (books.length === 0) {
        grid.innerHTML = `<p class="no-results">No books match your search. Try adjusting the filters.</p>`;
        return;
    }

    grid.innerHTML = books.map(book => `
        <article class="book-card" 
                 tabindex="0"
                 role="button"
                 aria-label="View details for ${book.title}"
                 data-id="${book.id}">
            <img 
                src="${book.cover}" 
                alt="Cover of ${book.title}" 
                class="book-cover"
                loading="lazy"
                onerror="this.src='images/book-placeholder.svg'; this.onerror=null;"
            >
            <div class="book-info">
                <span class="book-genre-tag">${book.genre}</span>
                <h2 class="book-title">${book.title}</h2>
                <p class="book-author">${book.author}</p>
                <div class="book-meta">
                    <span class="book-rating stars" aria-label="Rating: ${book.rating} out of 5">${starsHTML(book.rating)}</span>
                    <span class="book-rating">${book.rating}/5</span>
                    <span>${book.pages.toLocaleString()} pp</span>
                    <span>${book.year}</span>
                </div>
            </div>
        </article>
    `).join('');

    // Attach click/keyboard handlers
    grid.querySelectorAll('.book-card').forEach(card => {
        card.addEventListener('click', () => openModal(parseInt(card.dataset.id)));
        card.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(parseInt(card.dataset.id));
            }
        });
    });
}

// ── Filter + sort using array methods ────────────────────────────────────────
function applyFilters() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    const genre = document.getElementById('genreFilter').value;
    const sort = document.getElementById('sortSelect').value;

    // filter
    filteredBooks = allBooks.filter(book => {
        const matchesQuery = !query ||
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query);
        const matchesGenre = !genre || book.genre === genre;
        return matchesQuery && matchesGenre;
    });

    // sort
    filteredBooks.sort((a, b) => {
        switch (sort) {
            case 'title-asc': return a.title.localeCompare(b.title);
            case 'title-desc': return b.title.localeCompare(a.title);
            case 'rating-desc': return b.rating - a.rating;
            case 'rating-asc': return a.rating - b.rating;
            case 'pages-asc': return a.pages - b.pages;
            case 'pages-desc': return b.pages - a.pages;
            case 'year-desc': return b.year - a.year;
            case 'year-asc': return a.year - b.year;
            default: return 0;
        }
    });

    renderBooks(filteredBooks);
}

// ── Modal ─────────────────────────────────────────────────────────────────────
function openModal(id) {
    const book = allBooks.find(b => b.id === id);
    if (!book) return;

    document.getElementById('modalCover').src = book.cover;
    document.getElementById('modalCover').alt = `Cover of ${book.title}`;
    document.getElementById('modalGenre').textContent = book.genre;
    document.getElementById('modalTitle').textContent = book.title;
    document.getElementById('modalAuthor').textContent = `by ${book.author}`;
    document.getElementById('modalRating').innerHTML = `<span class="stars">${starsHTML(book.rating)}</span> ${book.rating}`;
    document.getElementById('modalPages').textContent = book.pages.toLocaleString();
    document.getElementById('modalYear').textContent = book.year;
    document.getElementById('modalDescription').textContent = book.description;

    // Pre-fill the log page link with book title
    const logLink = document.getElementById('modalLogLink');
    logLink.href = `log.html?title=${encodeURIComponent(book.title)}&author=${encodeURIComponent(book.author)}`;

    const overlay = document.getElementById('modalOverlay');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    setTimeout(() => document.getElementById('modalClose').focus(), 50);
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('open');
    document.body.style.overflow = '';
}

// ── Event listeners ───────────────────────────────────────────────────────────
document.getElementById('modalClose').addEventListener('click', closeModal);

document.getElementById('modalOverlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});

document.getElementById('searchInput').addEventListener('input', applyFilters);
document.getElementById('genreFilter').addEventListener('change', applyFilters);
document.getElementById('sortSelect').addEventListener('change', applyFilters);

// ── Init ──────────────────────────────────────────────────────────────────────
fetchBooks();
