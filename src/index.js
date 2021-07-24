import "./style.scss";
import { changePage, eleId } from "./api/render";
import weatherCard from "./pages/weather";
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

function displayWeatherData(weatherData) {
  const temperature = weatherData.data.main;
  updateWeatherData(data);
}

function updateWeatherData() {}

const form = eleId("form");
const location = eleId("location");

function onSubmit(e) {
  e.preventDefault();
  getWeather(location.value).then(displayWeatherData);
}

form.addEventListener("submit", onSubmit);
