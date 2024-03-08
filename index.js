const apiKey = "0b7223467e01f1d9caadef8b8212cb77";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        let data = await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + " °C";
        document.querySelector(".humidity-level").innerHTML = data.main.humidity + " %";
        document.querySelector(".wind-speed").innerHTML = data.wind.speed + " km/hr";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "weather-app-img/images/clouds.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "weather-app-img/images/rain.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "weather-app-img/images/clear.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "weather-app-img/images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "weather-app-img/images/mist.png";
        }
        document.querySelector(".weather").style.display = "block";
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})
searchBox.addEventListener("keypress", (event)=>{
    if(event.key=="Enter"){
        event.preventDefault();
        checkWeather(searchBox.value);
    }
})
