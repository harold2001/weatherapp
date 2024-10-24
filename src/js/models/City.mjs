import { convertToJson } from "../utils.mjs";

const citiesURL = import.meta.env.VITE_API_CITIES_URL;
const API_CITIES_KEY = import.meta.env.VITE_API_CITIES_KEY;

export default class City {
  static async getCitiesByName(cityName) {
    const response = await fetch(`${citiesURL}?name=${cityName}&limit=30`, {
      headers: { "X-Api-Key": API_CITIES_KEY },
    });
    const data = await convertToJson(response);
    return data;
  }
}
