import "./style.scss";
const API_KEY = process.env.API_KEY;

export const eleId = (id) => document.getElementById(id);

function fromOpenWeatherMap(location, units = "metric") {
  return `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=${units}`;
}

const loader = eleId("loader");
async function getWeather(location) {
  loader.classList.toggle("none");
  const response = await fetch(fromOpenWeatherMap(location));
  const data = await response.json();
  loader.classList.toggle("none");
  if (response.status === 200) {
    return data;
  } else {
    alert("Unknown city or no temperature for city");
    return {
      main: { temp: 0 },
    };
  }
}

const form = eleId("form");
const location = eleId("location");

function displayWeatherData(weatherData) {
  console.log(weatherData);
  const data = weatherData.main;
  updateWeatherData(data);
}

const city = eleId("city");
const tempatureElement = eleId("temperature");
let temperature = 0;

const updateCelius = () =>
  (tempatureElement.innerHTML = `Temperature: ${temperature} °C`);

const calcFahrenheit = () => temperature * (9 / 5) + 32;

const updateFahrenheit = () =>
  (tempatureElement.innerHTML = `Temperature: ${calcFahrenheit()} °C`);

const weatherCard = eleId("weatherCard");

function updateWeatherData(data) {
  city.innerHTML = `Weather Data for ${location.value}`;
  temperature = Number(data.temp);
  if (temperature < 15) {
    document.body.style.backgroundColor = "#0f5ebb";
  } else {
    document.body.style.backgroundColor = "#ff0000";
  }
  weatherCard.classList.remove("hidden");
  updateCelius();
}

function onSubmit(e) {
  e.preventDefault();
  getWeather(location.value).then(displayWeatherData);
}

form.addEventListener("submit", onSubmit);

const fahrenheit = eleId("fahrenheit");
fahrenheit.addEventListener("click", updateFahrenheit);
const celsius = eleId("celsius");
celsius.addEventListener("click", updateCelius);
