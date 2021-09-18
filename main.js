const api={
    key: "4e0d599dccfe221fa331ecf389d3dd6c",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('#search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode === 13) {
        getResults(searchbox.value);
    }
}

function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather){
    console.log(weather)
    let city = document.querySelector(".location .city")
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    let currentDate = new Date();
    let date = document.querySelector(".location .date")
    date.innerText = dateBuilder(currentDate);

    let temp = document.querySelector(".current .temp")
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
    changeWeather(weather)
}

function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

function changeWeather(weather){
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
    let weatherAnimation = document.querySelector(".weather-animation")
    if(weather_el.innerText == "Clouds"){
        weatherAnimation.style.background = "url('clouds.png')";
    }
    else if(weather_el.innerText == "Rain" || weather_el.innerText == "Shower rain"){
        weatherAnimation.style.background = "url('rain.gif')";
        weatherAnimation.style.backgroundSize = "cover";
    }
    else if(weather_el.innterText == "Snow"){
        weatherAnimation.style.background = "url('snow.gif') cover top-center";
    }
    else if(weather_el.innerText == "mist"){
        weatherAnimation.style.background = "url('mist.png') cover top-center";
    }
    else{
        weatherAnimation.style.background = "url()";
    }
}