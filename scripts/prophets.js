//JSON
const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

async function getProphets() {
    try {
        const response = await fetch(url);
        const prophets = await response.json();
        displayProphets(prophets);
    } catch (error) {
        console.error('Error fetching prophets:', error);
    }
}

function displayProphets(prophets) {
    const cardsContainer = document.getElementById('cards');
    cardsContainer.innerHTML = '';

    prophets.forEach(prophet => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h2>${prophet.name}</h2>
            <p>${prophet.description}</p>
        `;
        cardsContainer.appendChild(card);
    });
}

getProphets();

//FOOTER
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;