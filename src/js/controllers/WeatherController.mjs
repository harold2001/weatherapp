import Weather from "../models/Weather.mjs";
import { setErrorToast } from "../utils.mjs";
import WeatherView from "../views/WeatherView.mjs";
import MainController from "./MainController.mjs";
import SidebarController from "./SidebarController.mjs";

export default class WeatherController {
  constructor(city = null, latitude = null, longitude = null) {
    this.city = city;
    this.latitude = latitude;
    this.longitude = longitude;
    this.weatherModel = new Weather();
  }

  async updateCurrentWeather() {
    try {
      const { name, main, weather, wind, visibility, sys } = this.city
        ? await this.weatherModel.getDataByName(this.city)
        : await this.weatherModel.getDataByCoordinates(
            this.latitude,
            this.longitude,
          );
      const { list } = this.city
        ? await this.weatherModel.getForecastByName(this.city)
        : await this.weatherModel.getForecastByCoordinates(
            this.latitude,
            this.longitude,
          );
      const forecastData = this.getFiveDaysForecast(list);

      const view = new WeatherView({
        name,
        temp: main.temp,
        main: weather[0].main,
        humidity: main.humidity,
        windSpeed: wind.speed,
        visibility,
        airPressure: main.pressure,
        icon: weather[0].icon,
        fObject: forecastData,
      });
      view.render();

      MainController.closeSidebar();
      SidebarController.updateHistory(name, sys?.country);
    } catch (error) {
      setErrorToast("Error getting weather data");
    }
  }

  getFiveDaysForecast(list) {
    const today = new Date().getDate();
    const days = {};

    for (const forecast of list) {
      const fDate = new Date(forecast.dt_txt);
      const fDay = fDate.getDate();

      if (fDay === today || fDay >= today + 6) continue;

      const max = forecast.main.temp_max;
      const min = forecast.main.temp_min;

      if (!(fDay in days)) {
        days[fDay] = {
          tempMax: max,
          tempMin: min,
          icon: forecast.weather[0].icon,
          dateObj: fDate,
          times: 1,
        };
      } else {
        days[fDay].tempMax += max;
        days[fDay].tempMin += min;
        days[fDay].times += 1;
      }
    }

    for (const day in days) {
      days[day].tempMax /= days[day].times;
      days[day].tempMin /= days[day].times;
    }

    return days;
  }
}
