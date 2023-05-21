function formatDate(now) {
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hour}:${minutes}`;
}
function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(city) {
  let apiKey = "50c2acd53349fabd54f52b93c8650d37";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function manageSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#weather-input").value;
  searchCity(city);
}

function displayLocation(position) {
  let apiKey = "50c2acd53349fabd54f52b93c8650d37";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(displayLocation);
}

function changeFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = document.querySelector("#current-temp");
  fahrenheitTemperature.innerHTML = 80;
}

function changeCelsius(event) {
  event.preventDefault();
  let celsiusTemperature = document.querySelector("#current-temp");
  celsiusTemperature.innerHTML = 20;
}

let dateElement = document.querySelector("#date-time");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#form-input");
searchForm.addEventListener("submit", manageSubmit);

let tempButton = document.querySelector("#current-location");
tempButton.addEventListener("click", getCurrent);

searchCity("Randburg");
