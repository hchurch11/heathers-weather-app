const apiKey = "cb530e74a8abb9cfc411a5cea0c93d6b";
//Function to show current time and date START
function formatDate() {
  let now = new Date();

  // setting variables for formatDate function START
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let weekDay = days[now.getDay()];
  let date = now.getDate();
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
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  // setting variables for formatDate function END

  // time formatting START
  let hours = now.getHours();
  if (hours < 10) {
    hours = `${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`; //time formatting END
  }
  let timeNow = `${weekDay}, ${month} ${date}, ${year} ${hours}:${minutes}`;
  let currentTime = document.querySelector("#current-time");
  currentTime.innerHTML = timeNow;
}
formatDate(); //Function to show current time and date END

//add fº and cº converter
// Covert to Fahrenheit
function convertCelsToFahr(event) {
  event.preventDefault();
  let tempToday = document.querySelector("#temp-today");
  let temperature = tempToday.innerHTML;
  temperature = Number(temperature);
  tempToday.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fahr = document.querySelector("#fahrenheit-link");
fahr.addEventListener("click", convertCelsToFahr);

//Convert to Celsius
function convertFahrToCels(event) {
  event.preventDefault();
  let tempToday = document.querySelector("#temp-today");
  let temperature = tempToday.innerHTML;
  let celsiusTemp = Math.round(((temperature - 32) * 5) / 9);
  tempToday.innerHTML = celsiusTemp;
}

let celsLink = document.querySelector("#celsius-link");
celsLink.addEventListener("click", convertFahrToCels);

function getCurrentCity() {
  let searchInput = document.querySelector("#search-input");
  let searchCity = searchInput.value.trim();
  return searchCity;
}

//GEOLOCATION SHOW TEMPERATURE START
async function inputGeoPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiGeoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
  try {
    const response = await axios.get(apiGeoUrl);
    console.log(response);
    showTemp(response);
    showConditions(response);
  } catch (err) {
    console.error(`error: fetchCityWeather`, err);
  } finally {
  }
}

function getGeoPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(inputGeoPosition);
}

let findMeButton = document.querySelector("#find-me-button");
findMeButton.addEventListener("click", getGeoPosition);

//GEOLOCATION SHOW TEMPERATURE END

async function fetchCityWeather(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#current-city");
  currentCity = getCurrentCity();

  const apiKey = "cb530e74a8abb9cfc411a5cea0c93d6b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=imperial&appid=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    showTemp(response);
    showConditions(response);
    /*   displayCurrentCity(currentCity); */
  } catch (err) {
    console.error(`error: fetchCityWeather`, err);
  } finally {
  }
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", fetchCityWeather);

function showTemp(response) {
  let currentTemp = document.querySelector("#temp-today");
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  let currentCity = response.data.name;
  let changeCurrentCity = document.querySelector("#current-city");
  changeCurrentCity.innerHTML = currentCity;
  let iconId = response.data.weather[0].icon;
  let changeIcon = document.querySelector("#weather-icon-today");
  changeIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconId}@2x.png`
  );
}
// Change conditions to current city START
function showConditions(response) {
  let currentConditions = document.querySelector("#sky");
  currentConditions.innerHTML = response.data.weather[0].description;

  let currentHighLow = document.querySelector("#high-low");
  currentHighLow.innerHTML = `high: ${Math.round(
    response.data.main.temp_max
  )}ºf, low: ${Math.round(response.data.main.temp_min)}ºf`;

  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `humidity: ${Math.round(
    response.data.main.humidity
  )}%`;

  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `wind speed: ${Math.round(
    response.data.wind.speed
  )} mph`;
  console.log(response);
}
// Change conditions to current city END

// ShowMore - ShowLess conditions button
function setUpEvents() {
  let content = document.getElementById("content");
  let button = document.getElementById("showMore");

  button.onclick = function () {
    if (content.className === "open") {
      //shrink the box
      content.className = "";
      button.innerHTML = "show more";
    } else {
      //expand the box
      content.className = "open";
      button.innerHTML = "show less";
    }
  };
}

window.onload = function () {
  setUpEvents();
};
