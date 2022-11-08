const apiKey = "1863781c365515ce3e2b8d0a85181d0f";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), {
        origin: "cros"
    });
    const respData = await resp.json();
    
    if (respData.message == "city not found") {
        cityNotFound(respData);
    } else {
        addWeatherToPage(respData);
    }
    
}

function addWeatherToPage(data) {
    const temp = Ktoc(data.main.temp);
    const weather = document.createElement('div');
    
    weather.classList.add('weather');
    weather.innerHTML = `
    
    <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/> </h2>
    <small>${data.weather[0].main}</small>
    
    `;

    main.innerHTML = "";
    main.appendChild(weather);
}

function cityNotFound(data) {
    const weather = document.createElement('div');
    
    weather.classList.add('weather');
    weather.innerHTML = `
    
    <h2>code ${data.cod}</h2>
    <small style="color: red">${data.message}!</small>
    
    `;

    main.innerHTML = "";
    main.appendChild(weather);
}

function Ktoc(K) {
    return Math.floor(K - 273.15);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = search.value;

    if (city) {
        getWeatherByLocation(city);
    }
})
