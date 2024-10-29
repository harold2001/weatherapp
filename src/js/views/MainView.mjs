import MainController from "../controllers/MainController.mjs";
import WeatherController from "../controllers/WeatherController.mjs";
import { getLocalStorage, qs } from "../utils.mjs";

export default class MainView {
  static init() {
    MainView.setCurrentDate();
    const citiesSearched = getLocalStorage("citiesSearched") || [];
    if (citiesSearched.length <= 0) {
      return MainController.openSidebar();
    }

    const { city } = citiesSearched[0];
    const controller = new WeatherController(city, null, null);
    controller.updateCurrentWeather();
  }

  static setCurrentDate() {
    const currentDate = qs("#current-date > span:last-child");
    currentDate.textContent = new Date().toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }
}
