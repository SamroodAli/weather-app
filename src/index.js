function request(location, units = "metric") {
  return `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=&units=${units}`;
}

async function getWeather(location) {
  const data = await fetch(request(location));
  return data.json();
}

const data = getWeather("Alexandria");
console.log(data);
