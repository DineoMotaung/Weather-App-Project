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

function displayForecast() {
  let forecast = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` 
                <div class="col-2">
                  <div class="weather-forecast-date">${day}</div>
                  <img
                    src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/scattered-clouds-night.png"
                    alt=""
                    width="52"
                  />
                  <div class="weather-forecast-temperatures">
                    <span class="weather-forecast-temperature-max">
                      18&deg;
                    </span>
                    <span class="weather-forecast-temperature-min">
                      12&deg;
                    </span>
                  </div>
                </div>
              `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.city;
  let temperature = document.querySelector("#current-temp");

  celsiusTemperature = response.data.temperature.current;

  temperature.innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.temperature.feels_like
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
  icon.setAttribute("alt", response.data.condition.description);
}

function searchCity(city) {
  let apiKey = "0fff693ado40fca5c31aa3t915ba61fd";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function manageSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#weather-input").value;
  searchCity(city);
}

function displayLocation(coordinates) {
  let apiKey = "0fff693ado40fca5c31aa3t915ba61fd";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${coordinates.coords.latitude}&lon=${coordinates.coords.longitude}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(displayLocation);
}

function changeFahrenheit(event) {
  event.preventDefault();
  linkCelsius.classList.remove("active");
  linkFahrenhiet.classList.add("active");
  let temperature = document.querySelector("#current-temp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}

function changeCelsius(event) {
  event.preventDefault();
  linkCelsius.classList.add("active");
  linkFahrenhiet.classList.remove("active");
  let temperature = document.querySelector("#current-temp");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let dateElement = document.querySelector("#date-time");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#form-input");
searchForm.addEventListener("submit", manageSubmit);

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getCurrent);

let celsiusTemperature = null;

let linkFahrenhiet = document.querySelector("#link-fahrenheit");
linkFahrenhiet.addEventListener("click", changeFahrenheit);

let linkCelsius = document.querySelector("#link-celsius");
linkCelsius.addEventListener("click", changeCelsius);

searchCity("Randburg");
displayForecast();
