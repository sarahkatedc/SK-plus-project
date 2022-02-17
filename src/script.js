// ADD DATE
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Nov",
  "Dec",
  "Jan",
];

let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];

let currentDate = document.querySelector("#current-date");
let cleanDate = "";
formatDate(new Date());
currentDate.innerHTML = cleanDate;

function formatDate(now) {
  let date = now.getDate();
  let year = now.getFullYear();
  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  cleanDate = `${day}, ${month} ${date}, ${year}`;
}

//SHOW SEARCHED CITY NAME

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let city = document.querySelector("#city-name");
  city.innerHTML = `${searchInput.value}`;

  let apiKey = "e4582b00344cb9805ef4d7c4e07102d8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", handleSubmit);

//SHOW SEARCHED CITY TEMP
function showTemperature(response) {
  let searchedTemp = document.querySelector("#current-weather");
  let formatTemp = Math.round(response.data.main.temp);
  searchedTemp.innerHTML = `${formatTemp}°C`;
}

//CURRENT LOCATION

let searchCurrent = document.querySelector("#search-current-location");
searchCurrent.addEventListener("click", showCurrentTemp);

function showCurrentTemp() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "e4582b00344cb9805ef4d7c4e07102d8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  // console.log(position.coords.latitude);
  // console.log(position.coords.longitude);

  axios.get(apiUrl).then(showMyTemperature);
}

function showMyTemperature(response) {
  let temperature = Math.round(response.data.main.temp);

  let city = document.querySelector("#city-name");
  city.innerHTML = `Your Location: ${response.data.name}`;

  let currentWeather = document.querySelector("#current-weather");
  currentWeather.innerHTML = `${temperature}°C`;
}
