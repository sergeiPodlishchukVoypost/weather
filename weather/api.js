import axios from 'axios';

const API_KEY = '122a2fa1f27a8aa65f79180c2a64b5f2';

axios.defaults.baseURL = 'http://api.openweathermap.org/data/2.5/weather';

export default async function getWeather(latitude, longitude) {
  try {
    const data = await axios.get(
      `?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`,
    );
    const {wind, name, main} = data.data;

    const objWeather = {
      city: name,
      pressure: main.pressure,
      temp: main.temp - 273,
      wind_speed: wind.speed,
      // lat: coord.latitude,
      // lon: coord.longitude,
    };
    return objWeather;
  } catch (error) {
    throw Error(error);
  }
}
