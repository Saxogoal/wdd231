import { displayResults } from "./utilities.js";

document.addEventListener("DOMContentLoaded", () => {
    const resultsDiv = document.getElementById("results");

    if (!resultsDiv) return;

    const params = new URLSearchParams(window.location.search);
    displayResults(params);
});