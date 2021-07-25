import './style.scss';

const { API_KEY } = process.env;

const eleId = (id) => document.getElementById(id);

function fromOpenWeatherMap(location, units = 'metric') {
  return `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=${units}`;
}

const loader = eleId('loader');

async function getWeather(location) {
  const placeholder = { main: { temp: 0 } };

  loader.classList.toggle('none');

  try {
    const response = await fetch(fromOpenWeatherMap(location));
    const data = await response.json();
    loader.classList.toggle('none');

    if (response.status === 200) {
      return data;
    }
    return placeholder;
  } catch (e) {
    console.error(e);
    return placeholder;
  }
}

const form = eleId('form');
const location = eleId('location');

const city = eleId('city');
const tempatureElement = eleId('temperature');
let temperature = 0;

const updateCelius = () => {
  if (temperature === 0) {
    tempatureElement.innerHTML = 'No weather data available';
  } else {
    tempatureElement.innerHTML = `Temperature: ${temperature} °C`;
  }
};

const calcFahrenheit = () => (temperature * (9 / 5) + 32).toFixed(2);

const updateFahrenheit = () => {
  if (temperature === 0) {
    tempatureElement.innerHTML = 'No weather data available';
  } else {
    tempatureElement.innerHTML = `Temperature: ${calcFahrenheit()} °F`;
  }
};

const weatherCard = eleId('weatherCard');

function updateWeatherData(data) {
  temperature = Number(data.temp);
  city.innerHTML = 'Weather Data';
  if (temperature) {
    city.innerHTML += ` for ${location.value}`;
  }
  if (temperature < 15) {
    document.body.style.backgroundColor = '#0f5ebb';
  } else {
    document.body.style.backgroundColor = '#ff0000';
  }
  weatherCard.classList.remove('hidden');
  updateCelius();
}

function displayWeatherData(weatherData) {
  const data = weatherData.main;
  updateWeatherData(data);
}

function onSubmit(e) {
  e.preventDefault();
  getWeather(location.value).then(displayWeatherData);
}

form.addEventListener('submit', onSubmit);

const fahrenheit = eleId('fahrenheit');
fahrenheit.addEventListener('click', updateFahrenheit);
const celsius = eleId('celsius');
celsius.addEventListener('click', updateCelius);
