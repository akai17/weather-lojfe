// feature 1
function formatDate(date) {
  let now = new Date();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}
let currentDay = document.querySelector("#current-day");

let currentTime = new Date();
currentDay.innerHTML = formatDate(currentTime);

function displayWeatherCondition(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#value").innerHTML = Math.round(
    response.data.main.temp
  );
}
debugger;

function searchCity(city) {
  let apiKey = "0a5fa90de7f8ab3382190f4b5e85c980";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#insert-city").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "0a5fa90de7f8ab3382190f4b5e85c980";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#insert");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector(
  ".btn.btn-outline-secondary"
);
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Ho Chi Minh");
