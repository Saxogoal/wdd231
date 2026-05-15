const menuButton = document.querySelector("#menu");
const navLinks = document.querySelector("#navLinks");

menuButton.addEventListener("click", () => {

    navLinks.classList.toggle("open");

    menuButton.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");

    menuButton.setAttribute("aria-expanded", isOpen);
});

document.querySelector("#currentyear").textContent =
    new Date().getFullYear();

document.querySelector("#lastModified").textContent =
    document.lastModified;

const membersContainer = document.querySelector("#membersContainer");

const gridButton = document.querySelector("#gridView");

const listButton = document.querySelector("#listView");

async function getMembers() {

    try {

        const response =
            await fetch("data/members.json");

        if (!response.ok) {

            throw new Error(
                "Failed to fetch member data."
            );
        }

        const members = await response.json();

        displayMembers(members);

    } catch (error) {

        console.error(error);
    }
}

function getMembershipLevel(level) {

    if (level === 3) {
        return "Gold Member";
    }

    if (level === 2) {
        return "Silver Member";
    }

    return "Member";
}

function displayMembers(members) {

    membersContainer.innerHTML = "";

    members.forEach((member) => {

        const card = document.createElement("article");

        card.classList.add("member-card");

        card.innerHTML = `
            <img src="${member.image}"
                alt="${member.name}"
                loading="lazy"
                decoding="async"
                width="400"
                height="200">

            <div class="member-content">

                <h3>${member.name}</h3>

                <p>
                    <strong>Address:</strong>
                    ${member.address}
                </p>

                <p>
                    <strong>Phone:</strong>
                    ${member.phone}
                </p>

                <p>
                    <strong>Industry:</strong>
                    ${member.industry}
                </p>

                <p>${member.description}</p>

                <p>
                    <strong>Membership:</strong>
                    ${getMembershipLevel(member.membership)}
                </p>

                <a href="${member.website}"
                    target="_blank"
                    rel="noopener noreferrer">

                    Visit Website

                </a>

            </div>
        `;

        membersContainer.appendChild(card);
    });
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