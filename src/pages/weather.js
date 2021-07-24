import { section, h1 } from "../api/tags";

const weatherCard = section([h1()]);

heading = h1();
temperature = p();

const weatherInfo = (data) => {
  h1.innerHTML = `Weather data for city`;
  return section([h1]);
};

export default weatherInfo;
