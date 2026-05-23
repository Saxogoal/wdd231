const menuButton = document.querySelector("#menu");
const navLinks = document.querySelector("#navLinks");

menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    menuButton.classList.toggle("open");
    const isOpen = navLinks.classList.contains("open");
    menuButton.setAttribute("aria-expanded", isOpen);
});

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

const membersContainer = document.querySelector("#membersContainer");
const gridButton = document.querySelector("#gridView");
const listButton = document.querySelector("#listView");

async function getMembers() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) {
            throw new Error("Failed to fetch member data.");
        }
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error(error);
    }
}

function getMembershipLevel(level) {
    if (level === 3) return "Gold Member";
    if (level === 2) return "Silver Member";
    return "Member";
}

// Derive 1x and 2x paths from the base image path in members.json.
function getResponsivePaths(imagePath) {
    const stem = imagePath.replace('.webp', '');
    return {
        src1x: `${stem}-1x.webp`,
        src2x: `${stem}-2x.webp`,
    };
}

function displayMembers(members) {
    // Keep the sr-only heading in the container when clearing out old members
    membersContainer.innerHTML = '<h2 class="sr-only">Member Listings</h2>';

    // Create DocumentFragment for performance optimization
    const fragment = document.createDocumentFragment();

    members.forEach((member) => {
        const card = document.createElement("article");
        card.classList.add("member-card");

        const { src1x, src2x } = getResponsivePaths(member.image);

        card.innerHTML = `
            <picture>
                <source
                    type="image/webp"
                    srcset="${src1x} 1x, ${src2x} 2x">
                <img
                    src="${src1x}"
                    alt="${member.name}"
                    loading="lazy"
                    decoding="async"
                    width="${member.width}"
                    height="${member.height}">
            </picture>

            <div class="member-content">
                <h3>${member.name}</h3>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Industry:</strong> ${member.industry}</p>
                <p>${member.description}</p>
                <p><strong>Membership:</strong> ${getMembershipLevel(member.membership)}</p>
                <a href="${member.website}" target="_blank" rel="noopener noreferrer">
                    Visit Website
                </a>
            </div>
        `;

        fragment.appendChild(card);
    });

    // Append fragment all at once
    membersContainer.appendChild(fragment);
}

gridButton.addEventListener("click", () => {
    membersContainer.classList.add("grid-view");
    membersContainer.classList.remove("list-view");
});

listButton.addEventListener("click", () => {
    membersContainer.classList.add("list-view");
    membersContainer.classList.remove("grid-view");
});

getMembers();