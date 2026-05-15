//JSON
const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    console.table(data.prophets); // temporary testing of data response
    displayProphets(data.prophets);
}

getProphetData();

console.table('Fetching prophet data from:', url);

getProphetData();

function displayProphets(prophets) {
    prophets.forEach((prophet) => {
        const card = document.createElement('section');
        card.classList.add('card');
        card.innerHTML = `
            <h2>${prophet.name} ${prophet.lastname}</h2>
            <p>Birthdate: ${prophet.birthdate}</p>
            <p>Birthplace: ${prophet.birthplace}</p>
            <img src="${prophet.imageurl}" alt="Portrait of ${prophet.name} ${prophet.lastname}">
        `;
        cards.appendChild(card);
    });
}

//FOOTER
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;