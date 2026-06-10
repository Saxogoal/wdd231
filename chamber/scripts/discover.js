//specific discover page scripts
import { places } from "../data/places.mjs";
import { getResponsivePaths } from "./utilities.js";

const placesContainer = document.querySelector("#placesContainer");

function displayPlaces(places) {
    // Keep the sr-only heading in the container when clearing out old members
    placesContainer.innerHTML = '<h2 class="sr-only">Places Listings</h2>';

    // Create DocumentFragment for performance optimization
    const fragment = document.createDocumentFragment();

    places.forEach((place) => {
        const card = document.createElement("article");
        card.classList.add("place-card");

        const { src1x, src2x } = getResponsivePaths(place.photoUrl);

        card.innerHTML = `
            <picture>
                <source
                    type="image/webp"
                    srcset="${src1x} 1x, ${src2x} 2x">
                <img
                    src="${src1x}"
                    alt="${place.name}"
                    loading="lazy"
                    decoding="async"
                    width="${place.width}"
                    height="${place.height}">
            </picture>

            <div class="place-content">
                <h3>${place.name}</h3>
                <p><strong>Address:</strong> ${place.address}</p>
                <p><strong>Phone:</strong> ${place.phone}</p>
                <p><strong>Industry:</strong> ${place.industry}</p>
                <p>${place.description}</p>
                <p><strong>Cost:</strong> ${place.cost}</p>
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
