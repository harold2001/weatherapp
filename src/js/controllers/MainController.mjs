import {
  getLocalStorage,
  qs,
  qsAll,
  setClick,
  setClicks,
  setErrorToast,
  setSubmit,
} from "../utils.mjs";
import MainView from "../views/MainView.mjs";
import SidebarController from "./SidebarController.mjs";
import WeatherController from "./WeatherController.mjs";

export default class MainController {
  constructor() {
    this.formSearch = document.forms["form-search"];
    this.SidebarController = new SidebarController();
  }

  static closeSidebar() {
    qs("#sidebar").classList.remove("active");
  }

  static openSidebar() {
    qs("#sidebar").classList.add("active");
  }

  init() {
    MainView.init();
    setClick("#btn-close", MainController.closeSidebar);
    setClick("#btn-search", MainController.openSidebar);
    setClick("#btn-location", () =>
      navigator.geolocation.getCurrentPosition(
        this.handleSuccessGeolocation,
        this.handleErrorGeolocation,
      ),
    );
    setSubmit(this.formSearch, this.handleSearch.bind(this));
    this.SidebarController.init();
    setClicks("#forecast-temperature-btns > button", this.handleClickUnit);
  }

  handleClickUnit(e) {
    const unit = e.target.dataset.unit;

    const citiesSearched = getLocalStorage("citiesSearched");
    if (citiesSearched?.length > 0) {
      const btns = qsAll("#forecast-temperature-btns > button");
      const { city } = citiesSearched[0];
      const controller = new WeatherController(city, null, null, unit);

      btns.forEach((btn) => btn.classList.remove("active"));
      e.target.classList.add("active");
      controller.updateCurrentWeather();
    }
  }

  handleSearch() {
    const city = this.formSearch.city.value.toLowerCase();

    const controller = new WeatherController(city);
    controller.updateCurrentWeather();
  }

  async handleSuccessGeolocation(position) {
    const { latitude, longitude } = position.coords;
    const controller = new WeatherController(null, latitude, longitude);
    controller.updateCurrentWeather();
  }

  handleErrorGeolocation() {
    setErrorToast("Error getting your location");
  }
}
