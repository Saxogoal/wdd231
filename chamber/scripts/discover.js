// specific discover page scripts
import { places } from "../data/places.mjs";
import { getResponsivePaths } from "./utilities.js";

const placesContainer = document.querySelector("#placesContainer");

function displayPlaces(places) {
    // Prevent errors if the container doesn't exist on the current page
    if (!placesContainer) return;

    // Keep the sr-only heading in the container when clearing out old members
    placesContainer.innerHTML = '<h1 class="sr-only">Places Listings</h1>';

    // Create DocumentFragment for performance optimization
    const fragment = document.createDocumentFragment();

    places.forEach((place) => {
        const card = document.createElement("article");
        card.classList.add("place-card");

        const { src1x, src2x } = getResponsivePaths(place.photoUrl);

        card.innerHTML = ` 
        <h2 class="card-title-top">${place.name}</h2>
            <figure>
                <img
                    src="${place.photoUrl}"
                    alt="${place.name}"
                    loading="lazy"
                    decoding="async"
                    width="${place.width}"
                    height="${place.height}">
            </figure>

            <div class="place-content">
                <p class="card-info"><strong>Address:</strong> ${place.address}</p>
                <p class="card-info"><strong>Industry:</strong> ${place.industry}</p>
                <p class="card-info">${place.description}</p>
                <a href="${place.photoUrl}" target="_blank" rel="noopener noreferrer">
                    View Photo
                </a>
            </div>
        `;

        fragment.appendChild(card);
    });

    // Append fragment all at once
    placesContainer.appendChild(fragment);
}

displayPlaces(places);