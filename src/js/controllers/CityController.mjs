import City from "../models/City.mjs";
import { qs } from "../utils.mjs";
import CityView from "../views/CityView.mjs";

export default class CityController {
  constructor() {
    this.typingTimeout = null;
  }

  init() {
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
    const cityName = event.target.value;

    if (!cityName) return;
    const cities = await City.getCitiesByName(cityName);
    // const cities = [];
    const view = new CityView({ cities });
    view.render();
  }
}
