import City from "../models/City.mjs";
import {
  getLocalStorage,
  qs,
  setErrorToast,
  setLocalStorage,
} from "../utils.mjs";
import SidebarView from "../views/SidebarView.mjs";
import WeatherController from "./WeatherController.mjs";

export default class SidebarController {
  constructor() {
    this.typingTimeout = null;
    this.view = new SidebarView();
  }

  static handleClickCity(e) {
    const liElement = e.target.closest("li");
    if (!liElement) return;
    const { city } = liElement.dataset;
    const controller = new WeatherController(city);
    controller.updateCurrentWeather();
  }

  init() {
    this.view.init();
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
      const city = event.target.value;
      const cities = !city ? [] : await City.getCitiesByName(city);
      this.view.hideLoader();
      this.view.renderResults({ cities });
      event.target.blur();
    } catch (error) {
      setErrorToast("Error getting cities");
    }
  }

  updateHistory(city, country) {
    const citiesSearched = getLocalStorage("citiesSearched") || [];
    const cityFound = citiesSearched.find(
      (c) => c.city === city && c.country === country,
    );
    if (!cityFound) {
      citiesSearched.unshift({ city, country, timestamp: Date() });
      setLocalStorage("citiesSearched", citiesSearched);
      this.view.renderHistory();
    }
  }
}
