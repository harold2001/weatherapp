import { qs, setClick, setErrorToast, setSubmit } from "../utils.mjs";
import MainView from "../views/MainView.mjs";
import SidebarController from "./SidebarController.mjs";
import WeatherController from "./WeatherController.mjs";

export default class MainController {
  constructor() {
    this.formSearch = document.forms["form-search"];
    this.SidebarController = new SidebarController();
  }

  init() {
    MainView.setCurrentDate();
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

  handleErrorGeolocation(error) {
    setErrorToast("Error getting your location");
  }

  static closeSidebar() {
    qs("#sidebar").classList.remove("active");
  }

  static openSidebar() {
    qs("#sidebar").classList.toggle("active");
  }
}
