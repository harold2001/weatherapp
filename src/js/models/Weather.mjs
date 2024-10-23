const weatherURL = import.meta.env.VITE_API_WEATHER_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export default class Weather {
  async getCurrentCityData(cityName) {
    const response = await fetch(
      `${weatherURL}?q=${cityName}&appid=${API_KEY}&units=metric`,
    );
    const data = await this.convertToJson(response);
    console.log(data);
    return data;
  }

  async convertToJson(res) {
    const jsonResponse = await res.json();

    if (res.ok) {
      return jsonResponse;
    } else {
      throw { name: "servicesError", message: jsonResponse };
    }
  }
}
