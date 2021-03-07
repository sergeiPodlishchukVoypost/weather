import axios from 'axios';

const API_KEY = 'fbd583dc2f80d482ff910a55bc914fd9';

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
      temp: Math.round(main.temp - 273),
      wind_speed: wind.speed,
      // lat: coord.latitude,
      // lon: coord.longitude,
    };
    return objWeather;
  } catch (error) {
    throw Error(error);
  }
}
