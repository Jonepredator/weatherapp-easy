// min privata api key: 0fb74e260c7abb60eb31802fe70257fb

const api = {
    key: "0fb74e260c7abb60eb31802fe70257fb",
    baseurl: "http://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box');
const searchBtn = document.querySelector('#locity')

searchBox.addEventListener('keypress', showInfo);
searchBtn.addEventListener('click', showInfo);

function showInfo(e) {
    if (e.keyCode == 13 || e.target.id) {
        getResults(searchBox.value);
        searchBox.value = "";
        console.log(searchBox.value);
    } 
    // if (e.target.id){
    // getResults(searchbox.value);
    // console.log(searchbox.value);
    // }

}

function getResults(query) {
    fetch(`${api.baseurl}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults (weather) {
    console.log(weather);
    
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    // date.innerText = createDate();

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = createDate(now);
    
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp * 10) / 10}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let minmax = document.querySelector('.hi-low');
    minmax.innerText = `min ${Math.round(weather.main.temp_min * 10) / 10}°c / max ${Math.round(weather.main.temp_max * 10) / 10}°c`;

    // let icon = document.querySelector('.current .wicon');
    // icon.innerText = `${weather.icon}`;
}

function createDate (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    
    return `${day} ${date} ${month} ${year}`;
    
}

