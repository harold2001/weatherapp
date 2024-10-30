import Weather from "../models/Weather.mjs";
import { setErrorToast } from "../utils.mjs";
import WeatherView from "../views/WeatherView.mjs";
import MainController from "./MainController.mjs";
import SidebarController from "./SidebarController.mjs";

export default class WeatherController {
  constructor(city = null, latitude = null, longitude = null, unit = "metric") {
    this.city = city;
    this.latitude = latitude;
    this.longitude = longitude;
    this.unit = unit;
    this.weatherModel = new Weather(unit);
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
        unit: this.unit,
      });
      view.render();

      MainController.closeSidebar();
      const controller = new SidebarController();
      controller.updateHistory(name, sys?.country, this.unit);
    } catch (error) {
      setErrorToast("Error getting weather data");
    }
  }

  getFiveDaysForecast(list) {
    const today = new Date();
    const limitDate = today.setDate(today.getDate() + 5);
    const days = {};

    for (const forecast of list) {
      const fDate = new Date(forecast.dt_txt);
      if (fDate > limitDate) continue;

      const fDay = fDate.getDate();
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

    const sortedDays = Object.values(days).sort(
      (a, b) => a.dateObj - b.dateObj,
    );

    return sortedDays;
  }
}
