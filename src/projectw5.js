// Add a search engine, when searching for a city (i.e. Paris), show the weather elements, and change the formatDate following the search result
// it should display the name of the city on the result page and the current temperature of the city.

function formatDate(timestamp) {
  let now = new Date(timestamp);
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

  return `Lastest update: ${day} ${hour}:${min}`;
}

function weatherElement(response) {
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(response.data.main.temp);

  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;

  let currentWeather = document.querySelector("#weather-description");
  currentWeather.innerHTML = response.data.weather[0].description;

  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = response.data.main.humidity;

  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = response.data.wind.speed;

  let dateElement = document.querySelector("#date-time");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchEngine(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-city");
  let apiKey = `ebef9ca4a8de66ed586fac628fade056`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(weatherElement);
  console.log(`${apiUrl}&appid=${apiKey}`);
}

let form = document.querySelector("#search-engine");
form.addEventListener("submit", searchEngine);

//Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.
function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(weatherElement);
}

function currentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentButton = document.querySelector("#current-position");
currentButton.addEventListener("click", currentPosition);

// Normal setting will count on your current position
currentPosition();
