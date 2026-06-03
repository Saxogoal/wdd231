export function getMembershipLevel(level) {
    if (level === 3) return "Gold Member";
    if (level === 2) return "Silver Member";
    return "Member";
}

export function getResponsivePaths(imagePath) {
    const stem = imagePath.replace(".webp", "");
    return {
        src1x: `${stem}-1x.webp`,
        src2x: `${stem}-2x.webp`
    };
}
export const myInfo = new URLSearchParams(window.location.search);
console.log(myInfo);

export function displayResults(params) {
    const resultsDiv = document.getElementById("results");
    if (!resultsDiv) return;

    const firstName = params.get("firstName") || "N/A";
    const lastName = params.get("lastName") || "N/A";
    const email = params.get("email") || "N/A";
    const phone = params.get("phone") || "N/A";
    const business = params.get("business") || "N/A";
    const membership = params.get("membership") || "N/A";
    const timestamp = params.get("timestamp") || "N/A";

    // Format timestamp to readable date
    let formattedDate = timestamp;
    if (timestamp !== "N/A") {
        const date = new Date(timestamp);
        formattedDate = date.toLocaleString();
    }

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
}