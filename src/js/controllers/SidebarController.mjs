import City from "../models/City.mjs";
import { qs, setClicks } from "../utils.mjs";
import SidebarView from "../views/SidebarView.mjs";
import WeatherController from "./WeatherController.mjs";

export default class SidebarController {
  constructor() {
    this.typingTimeout = null;
    this.view = new SidebarView();
    this.loader = true;
  }

  init() {
    this.view.showLoader();
    qs("input[name='city']").addEventListener(
      "input",
      this.handleTyping.bind(this),
    );
  }

  handleTyping(event) {
    if (!this.loader) {
      this.view.showLoader();
    }

    clearTimeout(this.typingTimeout);

    this.typingTimeout = setTimeout(() => {
      this.handleCityChange(event);
    }, 500);
  }

  async handleCityChange(event) {
    const cityName = event.target.value;
    const cities = !cityName ? [] : await City.getCitiesByName(cityName);
    this.view.hideLoader();
    this.loader = false;
    this.view.render({ cities });
    setClicks("#form-results > li", this.handleClickCity);
  }

  handleClickCity(e) {
    const liElement = e.target.closest("li");
    if (!liElement) return;
    const { city } = liElement.dataset;
    const controller = new WeatherController(city);
    controller.updateCurrentWeather();
  }
}
