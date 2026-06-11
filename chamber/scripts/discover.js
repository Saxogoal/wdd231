// discover.js — module
import { places } from "../data/places.mjs";

const placesContainer = document.querySelector("#placesContainer");

/* ── Visitor Message (localStorage) ── */
function showVisitorMessage() {
    const msgEl = document.getElementById("visitor-message");
    if (!msgEl) return;

    const lastVisit = localStorage.getItem("discoverLastVisit");
    const now = Date.now();

    let message;

    if (!lastVisit) {
        message = "Welcome! Let us know if you have any questions.";
    } else {
        const diffMs = now - Number(lastVisit);
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays < 1) {
            message = "Back so soon! Awesome!";
        } else if (diffDays === 1) {
            message = "You last visited 1 day ago.";
        } else {
            message = `You last visited ${diffDays} days ago.`;
        }
    }

    localStorage.setItem("discoverLastVisit", String(now));
    msgEl.textContent = message;
}

/* ── Render Cards ── */
function displayPlaces(placesList) {
    if (!placesContainer) return;

    // Preserve sr-only heading
    placesContainer.innerHTML = '<h1 class="sr-only">Places Listings</h1>';

    const fragment = document.createDocumentFragment();

    placesList.forEach((place) => {
        const card = document.createElement("article");
        card.classList.add("place-card");

        card.innerHTML = `
            <h2 class="card-title-top">${place.name}</h2>
            <figure>
                <img
                    src="${place.photoUrl}"
                    alt="${place.name}"
                    loading="lazy"
                    fetchpriority="high"
                    decoding="async"
                    width="300" 
                    height="200">
            </figure>
            <div class="place-content">
                <address>${place.address}</address>
                <p class="card-info"><strong>Industry:</strong> ${place.industry}</p>
                <p class="card-info">${place.description}</p>
                <button class="learn-more-btn" type="button">Learn More</button>
            </div>
        `;

        fragment.appendChild(card);
    });

    placesContainer.appendChild(fragment);
}

displayPlaces(places);
showVisitorMessage();