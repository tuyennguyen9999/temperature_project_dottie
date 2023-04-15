//In your project, display the current date and time using JavaScript: Tuesday 16:00

let now = new Date();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let min = now.getMinutes();
if (min < 10) {
  min = `0${min}`;
}
let dayList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = dayList[now.getDay()];
let time = `${hour}:${min}`;

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day}`;

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${time}`;

// Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.
// it should display the name of the city on the result page and the current temperature of the city.

function searchEngine(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-city");
  let apiKey = `ebef9ca4a8de66ed586fac628fade056`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(weatherElement);

  function weatherElement(response) {
    let currentTemp = document.querySelector("#current-temp");
    currentTemp.innerHTML = Math.round(response.data.main.temp);

    let currentCity = document.querySelector("#current-city");
    currentCity.innerHTML = response.data.name;
  }
}

let form = document.querySelector("#search-engine");
form.addEventListener("submit", searchEngine);

//Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.

function currentPosition() {
  function showWeather(response) {
    let currentCity = document.querySelector("#current-city");
    currentCity.innerHTML = response.data.name;
    let currentTemp = document.querySelector("#current-temp");
    currentTemp.innerHTML = Math.round(response.data.main.temp);
  }

  function retrievePosition(position) {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showWeather);
  }

  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentButton = document.querySelector("#current-position");
currentButton.addEventListener("click", currentPosition);
