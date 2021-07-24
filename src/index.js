import "./style.scss";
import { changePage, eleId } from "./api/render";
const API_KEY = process.env.API_KEY;

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
const temperature = eleId("temperature");
function updateWeatherData(data) {
  city.innerHTML = `Weather Data for ${location.value}`;
  temperature.innerHTML = `Temperature: ${data.temp} °C`;
}

function onSubmit(e) {
  e.preventDefault();
  getWeather(location.value).then(displayWeatherData);
}
form.addEventListener("submit", onSubmit);
