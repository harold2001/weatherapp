import MainController from "../controllers/MainController.mjs";
import WeatherController from "../controllers/WeatherController.mjs";
import { getLocalStorage, qs, qsAll } from "../utils.mjs";

export default class MainView {
  static init() {
    MainView.setCurrentDate();
    const citiesSearched = getLocalStorage("citiesSearched") || [];
    if (citiesSearched.length <= 0) {
      return MainController.openSidebar();
    }

    const { city, unit } = citiesSearched[0];
    const btns = qsAll("#forecast-temperature-btns > button");
    btns.forEach((btn) => btn.classList.remove("active"));

    if (unit === "metric") {
      btns[0].classList.add("active");
    } else {
      btns[1].classList.add("active");
    }

    const controller = new WeatherController(city, null, null, unit);
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
