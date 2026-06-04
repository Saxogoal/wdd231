// thankyou.js
// Reads URL params submitted from join form and renders them on the page

document.addEventListener("DOMContentLoaded", () => {
    const resultsDiv = document.getElementById("results");
    if (!resultsDiv) return;

    const params = new URLSearchParams(window.location.search);

    const membershipLabels = {
        np: "NP Membership (Non-Profit — No Fee)",
        bronze: "Bronze Membership",
        silver: "Silver Membership",
        gold: "Gold Membership"
    };

    const firstName = params.get("firstName") || "—";
    const lastName = params.get("lastName") || "—";
    const email = params.get("email") || "—";
    const phone = params.get("phone") || "—";
    const business = params.get("business") || "—";
    const membership = membershipLabels[params.get("membership")] || params.get("membership") || "—";
    const rawDate = params.get("timestamp");
    const formattedDate = rawDate
        ? new Date(rawDate).toLocaleString("en-US", {
            dateStyle: "long",
            timeStyle: "short"
        })
        : "—";

    resultsDiv.innerHTML = `
        <ul class="results-list">
            <li><strong>First Name:</strong> ${firstName}</li>
            <li><strong>Last Name:</strong> ${lastName}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Mobile Phone:</strong> ${phone}</li>
            <li><strong>Business / Organization:</strong> ${business}</li>
            <li><strong>Membership Level:</strong> ${membership}</li>
            <li><strong>Application Date:</strong> ${formattedDate}</li>
        </ul>
    `;
});