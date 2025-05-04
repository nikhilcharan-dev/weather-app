// const axios = require('axios');

const api_key = 'ef9249bb7e1b4645ab861435243110';
const base_url = 'https://api.weatherapi.com/v1/current.json';



const city_name = document.getElementById('input');
const search_btn = document.getElementById('button');
const container = document.getElementById('data');
const weatherInfo = document.getElementById('weather-info');
const main = document.getElementById('main');
const time = document.getElementById('time');

const getWeather = async (city) => {
    let request = `${base_url}?key=${api_key}&q=${city}`;
    try {
        let response = await axios.get(request);
        return response.data;
    } catch(err) {
        showNoDataError();
        console.log(err.message);
        return null;
    }
}

const showNoDataError = () => {
    weatherInfo.style.paddingTop = '100px';
    weatherInfo.innerHTML = `Error: Couldn't Load Data <br>`;
    weatherInfo.style.display = 'block';
}

const check = (city) => {
    if(city === '') {
        container.innerHTML = `Please Enter a City Name <br>`;
        return false;
    }
    return true;
}

search_btn.addEventListener('click', async () => {
    weatherInfo.style.paddingTop = '0px';
    if(!check(city_name.value)) {
        return;
    } else {
        data = await getWeather(city_name.value);
    }
    if(data === null) {
        main.classList.add('shake');
        setTimeout(() => {
            main.classList.remove('shake');
        }, 500);
    } else {
        moveMain();
        dynamicLoad(data);
    }
});

const moveMain = () => {
    main.style.maxWidth = '100%';
    main.style.width = '90vw';
    main.style.height = '90vh';
    main.style.left = '0';
    main.style.top = '0';
    main.style.transform = 'none';
    main.style.padding = '20px';
}


const dynamicLoad = (data) => {
    weatherInfo.innerHTML = `
        <div class="weather-card">
            <img src="https:${data.current.condition.icon}" alt="${data.current.condition.text}" />
            <h2>Weather in ${data.location.name}, ${data.location.region}, ${data.location.country}</h2>
            <p>Temperature: ${data.current.temp_c}°C</p>
            <p>Condition: ${data.current.condition.text}</p>
            <p>Humidity: ${data.current.humidity}%</p>
            <p>Wind: ${data.current.wind_kph} kph ${data.current.wind_dir}</p>
            <p>Last updated: ${data.current.last_updated}</p>
        </div>
    `;
    weatherInfo.style.display = 'block';
}


const updatTime = () => {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const timeString = now.toLocaleTimeString(undefined, options);
    time.innerText = timeString;
}
setInterval(updatTime, 1000);
updatTime();