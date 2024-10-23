import { qs } from "../utils.mjs";

export default class CityView {
  constructor({ cities }) {
    this.cities = cities;
    this.formResults = qs("#form-results");
    this.resultsMessage = qs("#results-message");
  }

  render() {
    if (this.cities.length <= 0) {
      this.resultsMessage.style.display = "block";
      this.resultsMessage.innerHTML = "No results found";
      this.formResults.innerHTML = "";
      return;
    }

    this.resultsMessage.style.display = "none";
    const htmlCities = this.cities.reduce(
      (acc, city) =>
        acc +
        `<li><span>${city?.name}, ${city?.country}</span><img src="/images/arrow.svg" alt="Arrow icon" class="arrow-icon"></li>`,
      "",
    );
    this.formResults.innerHTML = htmlCities;
  }
}
