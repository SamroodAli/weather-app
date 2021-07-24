import "./style.scss";
const API_KEY = process.env.API_KEY;

export const eleId = (id) => document.getElementById(id);

function fromOpenWeatherMap(location, units = "metric") {
  return `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=${units}`;
}

async function getWeather(location) {
  const response = await fetch(fromOpenWeatherMap(location));
  const data = await response.json();
  const status = response.status;
  return { data, status };
}

const form = eleId("form");
const location = eleId("location");

function displayWeatherData(weatherData) {
  const data = weatherData.data.main;
  console.log(data);
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

function updateWeatherData(data) {
  city.innerHTML = `Weather Data for ${location.value}`;
  temperature = Number(data.temp);
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
