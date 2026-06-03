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

export function displayResults(myInfo) {
    console.log(myInfo.get("firstName"));
    console.log(myInfo.get("lastName"));
    console.log(myInfo.get("email"));
    console.log(myInfo.get("phone"));
    console.log(myInfo.get("business"));
    console.log(myInfo.get("membership"));

    document.querySelector("#results").textContent = `
        <p>Thank you, ${myInfo.get("firstName")} ${myInfo.get("lastName")}, for your interest in joining the Chamber of Commerce!</p>
        <p>Your provided information:</p> 
        <ul>
            <li><strong>Email:</strong> ${myInfo.get("email")}</li>
            <li><strong>Phone:</strong> ${myInfo.get("phone")}</li>
            <li><strong>Business:</strong> ${myInfo.get("business")}</li>
            <li><strong>Membership:</strong> ${myInfo.get("membership")}</li>
        </ul>
        `;
}