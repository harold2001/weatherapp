import { qs } from "../utils.mjs";

export default class WeatherView {
  constructor({
    name,
    temp,
    main,
    humidity,
    windSpeed,
    visibility,
    airPressure,
    icon,
    fObject,
  }) {
    this.name = name;
    this.temp = temp;
    this.main = main;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
    this.visibility = visibility;
    this.airPressure = airPressure;
    this.icon = icon;
    this.fObject = fObject;
  }

  render() {
    const h1 = qs("h1"),
      currentDescription = qs("#current-description"),
      currentLocation = qs("#current-location > p"),
      currentImg = qs("#current-img"),
      forecastCards = qs("#forecast-cards"),
      humidity = qs("#humidty"),
      windSpeed = qs("#wind-speed"),
      visibility = qs("#visibility"),
      airPressure = qs("#aire-pressure"),
      humidityBar = qs("#humidity-bar-fill");

    h1.innerHTML = `${parseInt(this.temp)}<span>°C</span>`;
    currentDescription.textContent = this.main;
    currentLocation.textContent = this.name;
    currentImg.src = `/images/weather/${this.icon}.png`;

    windSpeed.textContent = this.windSpeed;
    visibility.textContent = this.visibility;
    airPressure.textContent = this.airPressure;
    humidity.textContent = this.humidity;
    humidityBar.style.width = `${this.humidity}%`;

    let htmlCards = "";
    for (const day in this.fObject) {
      const { tempMax, tempMin, icon, dateObj } = this.fObject[day];
      const date = dateObj.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });

      htmlCards += `
      <div class="forecast-card">
        <span>${date}</span>
        <img src="/images/weather/${icon}.png" alt="Weather icon" />
        <span>${tempMax.toFixed(0)}°C</span>
        <span>${tempMin.toFixed(0)}°C</span>
      </div>
      `;
    }
    forecastCards.innerHTML = htmlCards;
  }
}
