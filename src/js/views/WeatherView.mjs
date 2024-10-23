import { qs } from "../utils.mjs";

export default class WeatherView {
  constructor({ name, temp, main, icon }) {
    this.name = name;
    this.temp = temp;
    this.main = main;
    this.icon = icon;
  }

  render() {
    const h1 = qs("h1");
    const currentDescription = qs("#current-description");
    const currentLocation = qs("#current-location > p");
    const currentImg = qs("#current-img");

    h1.textContent = `${parseInt(this.temp)}°C`;
    currentDescription.textContent = this.main;
    currentLocation.textContent = this.name;
    currentImg.src = `/images/weather/${this.icon}.png`;
  }
}
