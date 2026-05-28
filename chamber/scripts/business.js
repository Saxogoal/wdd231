import { getMembershipLevel, getResponsivePaths } from "./utils.js";

const membersContainer = document.querySelector("#membersContainer");
const currentWeatherEl = document.querySelector("#currentWeather");
const forecastEl = document.querySelector("#weatherForecast");
const eventsEl = document.querySelector("#eventsContent");

const LAT = -23.5505;
const LON = -46.6333;
const APIKEY = "87752bf08c51779202e8da8f3ad6e63f";
const UNITS = "imperial";

// ─── MEMBERS ────────────────────────────────────────────────────────

async function getMembers() {
    try {
        const response = await fetch("data/business.json");
        if (!response.ok) throw new Error("Failed to fetch member data.");
        const members = await response.json();
        displayHomeMembers(members);
    } catch (error) {
        console.error(error);
    }
}

// Home page card - RANDOM SPOTLIGHTS
// Home page card - RANDOM SPOTLIGHTS
function displayHomeMembers(members) {
    // Keep the screen-reader heading
    membersContainer.innerHTML = '<h2 class="sr-only">Member Listings</h2>';
    const fragment = document.createDocumentFragment();

    // 1. Filter for only Gold (3) or Silver (2) members
    const qualifiedMembers = members.filter(m => m.membership === 2 || m.membership === 3);

    // 2. Randomly shuffle the filtered array
    qualifiedMembers.sort(() => 0.5 - Math.random());

    // 3. Randomly choose to display either 2 or 3 members
    const displayCount = Math.floor(Math.random() * 2) + 2;

    // 4. Slice the array to grab the random spotlights
    const spotlight = qualifiedMembers.slice(0, displayCount);

    // 5. Build the HTML for each selected member
    spotlight.forEach((member) => {
        const { src1x, src2x } = getResponsivePaths(member.image);
        const card = document.createElement("article");
        card.classList.add("home-member-card");

        // Display Company Name, Membership Level, Logo, Phone, Address, and Website
        card.innerHTML = `
            <div class="home-member-card-top">
                <h3>${member.name}</h3>
                <p class="home-member-tagline">${getMembershipLevel(member.membership)}</p>
            </div>
            <div class="home-member-card-bottom">
                <picture>
                    <source type="image/webp" srcset="${src1x} 1x, ${src2x} 2x">
                    <img class="home-member-thumb"
                        src="${src1x}"
                        alt="${member.name} Logo"
                        width="64" height="64"
                        loading="lazy"
                        decoding="async">
                </picture>
                <div class="home-member-info">
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p><strong>URL:</strong> <a href="${member.website}" target="_blank" rel="noopener noreferrer">${member.website.replace('https://', '')}</a></p>
                </div>
            </div>
        `;

        fragment.appendChild(card);
    });

    membersContainer.appendChild(fragment);
}
// ─── CURRENT WEATHER ────────────────────────────────────────────────

async function getWeather() {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${APIKEY}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        displayCurrentWeather(data);
    } catch (error) {
        if (currentWeatherEl) {
            currentWeatherEl.innerHTML = `<p class="loading-text">Weather unavailable.</p>`;
        }
        console.error(error);
    }
}

function displayCurrentWeather(data) {
    if (!currentWeatherEl) return;
    const { temp, feels_like, temp_min, temp_max, humidity } = data.main;
    const desc = data.weather[0].description;
    const icon = data.weather[0].icon;
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    currentWeatherEl.innerHTML = `
        <div class="weather-top">
            <div class="weather-icon">
                <img src="${iconUrl}" alt="${desc}" width="50" height="50">
            </div>
            <div>
                <div class="weather-temp">${Math.round(temp)}&deg;F</div>
                <div class="weather-desc">${desc}</div>
            </div>
        </div>
        <div class="weather-details">
            <p>High: ${Math.round(temp_max)}&deg; &nbsp; Low: ${Math.round(temp_min)}&deg;</p>
            <p>Humidity: ${humidity}%</p>
            <p>Sunrise: ${sunrise}</p>
            <p>Sunset: ${sunset}</p>
        </div>
    `;
}

// ─── WEATHER FORECAST ───────────────────────────────────────────────

async function getForecast() {
    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=${UNITS}&cnt=24&appid=${APIKEY}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        if (forecastEl) {
            forecastEl.innerHTML = `<p class="loading-text">Forecast unavailable.</p>`;
        }
        console.error(error);
    }
}

function displayForecast(data) {
    if (!forecastEl) return;

    const days = {};
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const key = date.toDateString();
        const hour = date.getHours();
        if (!days[key] && hour >= 11 && hour <= 14) {
            days[key] = item;
        }
    });

    const entries = Object.values(days).slice(0, 3);

    const items = entries.map(item => {
        const date = new Date(item.dt * 1000);
        const label = date.toLocaleDateString('en-US', { weekday: 'long' });
        const temp = Math.round(item.main.temp);
        const desc = item.weather[0].description;
        return `<li><span>${label}</span><span>${temp}&deg;F — ${desc}</span></li>`;
    }).join('');

    forecastEl.innerHTML = `<ul class="forecast-list">${items || '<li>No forecast data.</li>'}</ul>`;
}


function displayEvents() {
    if (!eventsEl) return;

    const events = [
        { date: "Jun 10, 2026", title: "Business Networking Night", location: "Av. Paulista, SP" },
        { date: "Jun 18, 2026", title: "Annual General Meeting", location: "Chamber HQ, SP" },
        { date: "Jul 3, 2026", title: "Innovation & Tech Forum", location: "Japan House, SP" },
    ];

    const html = events.map(e => `
        <div class="event-item">
            <p class="event-date">${e.date}</p>
            <p class="event-title">${e.title}</p>
            <p class="event-location">${e.location}</p>
        </div>
    `).join('');

    eventsEl.innerHTML = html;
}


getMembers();
getWeather();
getForecast();
displayEvents();