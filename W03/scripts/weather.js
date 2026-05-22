const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75657335563&lon=6.653147199720288&units=imperial&appid=87752bf08c51779202e8da8f3ad6e63f';

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data); 
            function displayResults(data) {
                currentTemp.innerHTML = `${data.main.temp}&deg;F`;

                const iconCode = data.weather[0].icon;
                weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${iconCode}@2x.png`);
                weatherIcon.setAttribute('alt', data.weather[0].description);

                captionDesc.textContent = data.weather[0].description;
            }
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

apiFetch();

apiFetch();

