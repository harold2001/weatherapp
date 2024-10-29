import { capitalize, getLocalStorage, loadTemplate, qs } from "../utils.mjs";

export default class SidebarView {
  constructor() {
    this.sidebar = qs("#sidebar");
    this.formResults = qs("#form-results");
    this.resultsMessage = qs("#results-message");
  }

  init() {
    this.showLoader();
    this.renderHistory();
  }

  renderHistory() {
    this.removeHistory();
    const history = getLocalStorage("citiesSearched") || [];
    if (history.length <= 0) return;

    const htmlHistory = history.reduce(
      (acc, city) =>
        acc +
        `<li data-city="${city?.city}">
          <span>${capitalize(city?.city)}, ${city?.country || "No country"}</span>
          <img src="/images/arrow.svg" alt="Arrow icon" class="arrow-icon" />
        </li>`,
      "",
    );
    const html = `<p class="sidebar-subtitle">History</p><ul class="search-options" id="history-list">${htmlHistory}</ul>`;
    this.sidebar.insertAdjacentHTML("beforeend", html);
  }

  renderResults({ cities }) {
    if (cities.length <= 0) {
      this.showNoResults();
      this.removeResults();
      return;
    }

    this.resultsMessage.style.display = "none";
    const htmlCities = cities.reduce(
      (acc, city) =>
        acc +
        `<li data-city="${city?.name}"><span>${city?.name}, ${city?.country}</span><img src="/images/arrow.svg" alt="Arrow icon" class="arrow-icon"></li>`,
      "",
    );
    const html = `<p class="sidebar-subtitle">Results</p><ul class="search-options" id="form-results">${htmlCities}</ul>`;
    this.sidebar.insertAdjacentHTML("beforeend", html);
  }

  removeResults() {
    this.formResults.innerHTML = "";
  }

  removeHistory() {
    const history = qs("#history-container");
    history?.remove();
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
