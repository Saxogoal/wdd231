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