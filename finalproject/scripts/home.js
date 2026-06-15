// home.js — Quote rotator and dynamic stats

const QUOTES = [
    { text: "A reader lives a thousand lives before he dies. The man who never reads lives only one.", author: "George R.R. Martin" },
    { text: "Not all those who wander are lost.", author: "J.R.R. Tolkien" },
    { text: "Until I feared I would lose it, I never loved to read. One does not love breathing.", author: "Harper Lee" },
    { text: "A book is a dream that you hold in your hands.", author: "Neil Gaiman" },
    { text: "Reading is to the mind what exercise is to the body.", author: "Joseph Addison" },
    { text: "There is no friend as loyal as a book.", author: "Ernest Hemingway" },
    { text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.", author: "Dr. Seuss" },
];

let currentQuote = 0;
let quoteInterval;

function renderDots() {
    const container = document.getElementById('quoteDots');
    if (!container) return;
    container.innerHTML = QUOTES.map((_, i) =>
        `<button class="quote-dot ${i === currentQuote ? 'active' : ''}" 
                 aria-label="Quote ${i + 1}" 
                 data-index="${i}"></button>`
    ).join('');
    container.querySelectorAll('.quote-dot').forEach(btn => {
        btn.addEventListener('click', () => {
            currentQuote = parseInt(btn.dataset.index);
            showQuote(currentQuote);
            resetInterval();
        });
    });
}

function showQuote(index) {
    const textEl = document.getElementById('quote-text');
    const authorEl = document.getElementById('quote-author');
    if (!textEl || !authorEl) return;

    textEl.style.opacity = '0';
    setTimeout(() => {
        textEl.textContent = QUOTES[index].text;
        authorEl.textContent = `— ${QUOTES[index].author}`;
        textEl.style.opacity = '1';
        renderDots();
    }, 300);
}

function nextQuote() {
    currentQuote = (currentQuote + 1) % QUOTES.length;
    showQuote(currentQuote);
}

function resetInterval() {
    clearInterval(quoteInterval);
    quoteInterval = setInterval(nextQuote, 6000);
}

function initStats() {
    // Read log count from localStorage
    const logs = JSON.parse(localStorage.getItem('pgturner-log') || '[]');
    const statLogged = document.getElementById('stat-logged');
    if (statLogged) statLogged.textContent = logs.length;
}

document.addEventListener('DOMContentLoaded', () => {
    showQuote(0);
    resetInterval();
    initStats();
});
