import { loadTemplate, qs } from "../utils.mjs";

export default class SidebarView {
  constructor() {
    this.sidebar = qs("#sidebar");
    this.formResults = qs("#form-results");
    this.resultsMessage = qs("#results-message");
  }

  render({ cities }) {
    if (cities.length <= 0) {
      this.showNoResults();
      this.clearResults();
      return;
    }

    this.resultsMessage.style.display = "none";
    const htmlCities = cities.reduce(
      (acc, city) =>
        acc +
        `<li data-city="${city?.name}"><span>${city?.name}, ${city?.country}</span><img src="/images/arrow.svg" alt="Arrow icon" class="arrow-icon"></li>`,
      "",
    );
    this.formResults.innerHTML = htmlCities;
  }

  clearResults() {
    this.formResults.innerHTML = "";
  }

  showNoResults() {
    this.resultsMessage.style.display = "block";
    this.resultsMessage.innerHTML = "No results found";
  }

  async showLoader() {
    const loader = await loadTemplate("../partials/loader.html");
    this.sidebar.insertAdjacentHTML("beforeend", loader);
  }

  hideLoader() {
    const loader = qs("#loader-container");
    loader?.remove();
  }
}
