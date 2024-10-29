import City from "../models/City.mjs";
import {
  getLocalStorage,
  qs,
  setClicks,
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

  handleClickCity(e) {
    const liElement = e.target.closest("li");
    if (!liElement) return;
    const { city } = liElement.dataset;
    const controller = new WeatherController(city);
    controller.updateCurrentWeather();
  }

  static updateHistory(city, country) {
    const citiesSearched = getLocalStorage("citiesSearched") || [];
    const cityFound = citiesSearched.find((c) => c.city === city);
    if (!cityFound) {
      citiesSearched.push({ city, country, timestamp: Date() });
      setLocalStorage("citiesSearched", citiesSearched);
      this.view.renderHistory();
    }
  }

  async handleCityChange(event) {
    try {
      const city = event.target.value;
      const cities = !city ? [] : await City.getCitiesByName(city);
      // const cities = [];
      this.view.hideLoader();
      this.view.renderResults({ cities });
      setClicks("#form-results > li", this.handleClickCity);
      event.target.blur();
    } catch (error) {
      setErrorToast("Error getting cities");
    }
  }
}
