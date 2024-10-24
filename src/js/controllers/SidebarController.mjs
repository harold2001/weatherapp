import City from "../models/City.mjs";
import { qs, setClicks, setErrorToast } from "../utils.mjs";
import SidebarView from "../views/SidebarView.mjs";
import WeatherController from "./WeatherController.mjs";

export default class SidebarController {
  constructor() {
    this.typingTimeout = null;
    this.view = new SidebarView();
  }

  init() {
    this.view.showLoader();
    qs("input[name='city']").addEventListener(
      "input",
      this.handleTyping.bind(this),
    );
  }

  handleTyping(event) {
    clearTimeout(this.typingTimeout);

    this.typingTimeout = setTimeout(() => {
      this.handleCityChange(event);
    }, 500);
  }

  async handleCityChange(event) {
    try {
      const cityName = event.target.value;
      // const cities = [];
      const cities = !cityName ? [] : await City.getCitiesByName(cityName);
      this.view.hideLoader();
      this.view.render({ cities });
      setClicks("#form-results > li", this.handleClickCity);
      event.target.blur();
    } catch (error) {
      setErrorToast("Error getting cities");
    }
  }

  handleClickCity(e) {
    const liElement = e.target.closest("li");
    if (!liElement) return;
    const { city } = liElement.dataset;
    const controller = new WeatherController(city);
    controller.updateCurrentWeather();
  }
}
