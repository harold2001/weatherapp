import { convertToJson } from "../utils.mjs";

const weatherURL = import.meta.env.VITE_API_WEATHER_URL;
const API_WEATHER_KEY = import.meta.env.VITE_API_WEATHER_KEY;

export default class Weather {
  async getDataByName(cityName) {
    const response = await fetch(
      `${weatherURL}/weather?q=${cityName}&appid=${API_WEATHER_KEY}&units=metric`,
    );
    const data = await convertToJson(response);
    return data;
  }

  async getDataByCoordinates(latitude, longitude) {
    const response = await fetch(
      `${weatherURL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_WEATHER_KEY}&units=metric`,
    );
    const data = await convertToJson(response);
    return data;
  }

  async getForecastByName(cityName) {
    const response = await fetch(
      `${weatherURL}/forecast?q=${cityName}&appid=${API_WEATHER_KEY}&units=metric`,
    );
    const data = await convertToJson(response);
    return data;
  }

  async getForecastByCoordinates(latitude, longitude) {
    const response = await fetch(
      `${weatherURL}/forecast?lat=${latitude}&lon=${longitude}&appid=${API_WEATHER_KEY}&units=metric`,
    );
    const data = await convertToJson(response);
    return data;
  }
}
