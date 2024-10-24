import Weather from "../models/Weather.mjs";
import WeatherView from "../views/WeatherView.mjs";
import MainController from "./MainController.mjs";

export default class WeatherController {
  constructor(city) {
    this.city = city;
    this.weatherModel = new Weather();
  }

  async updateCurrentWeather() {
    try {
      const { name, main, weather } =
        await this.weatherModel.getCurrentCityData(this.city);
      MainController.closeSidebar();

      const view = new WeatherView({
        name,
        temp: main.temp,
        main: weather[0].main,
        icon: weather[0].icon,
      });
      view.render();
    } catch (error) {
      console.log(error);
    }
  }
}
