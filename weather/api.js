import axios from 'axios';

const API_KEY = 'd7e0f09441a5fb1b26a4b4597b0d8348';

axios.defaults.baseURL = 'http://api.openweathermap.org/data/2.5/weather';

export default async function getWeather(latitude, longitude) {
  try {
    const data = await axios.get(
      `?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`,
    );

    const {wind, name, main, clouds, sys, dt} = data.data;

    const objWeather = {
      city: name,
      pressure: main.pressure,
      temp: Math.round(main.temp - 273),
      wind_speed: wind.speed,
      clouds: clouds.all,
      dayTime: dt,
      sunrise: sys.sunrise,
      sunset: sys.sunset,
    };
    return objWeather;
  } catch (error) {
    throw Error(error);
  }
}
