import { qs, setClick, setSubmit } from "../utils.mjs";
import MainView from "../views/MainView.mjs";
import CityController from "./CityController.mjs";
import WeatherController from "./WeatherController.mjs";

export default class MainController {
  constructor() {
    this.formSearch = document.forms["form-search"];
    this.cityController = new CityController();
  }

  init() {
    MainView.setCurrentDate();
    setClick("#btn-close", MainController.closeSidebar);
    setClick("#btn-search", MainController.openSidebar);
    setClick("#btn-location", MainController.openSidebar);
    setSubmit(this.formSearch, this.handleSearch.bind(this));
    this.cityController.init();
  }

  handleSearch() {
    const newCity = this.formSearch.city.value.toLowerCase();
    const weatherController = new WeatherController();
    weatherController.setCity(newCity);
  }

  static closeSidebar() {
    qs("#sidebar").classList.remove("active");
  }

  static openSidebar() {
    qs("#sidebar").classList.toggle("active");
  }
}
