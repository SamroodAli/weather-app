import "./style.scss";
import { changePage } from "./api/render";
import { p } from "./api/tags";
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

function getTemperature(data) {
  const temperature = data.data.main.temp;
  changePage(p(temperature));
  return data.main.temperature;
}

getWeather("Delhi").then(getTemperature);

const form = document.getElementById("form");

function onSubmit(e) {
  e.preventDefault();
  changePage(p("Submitted"));
}

form.addEventListener("submit", onSubmit);
