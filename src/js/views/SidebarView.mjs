import SidebarController from "../controllers/SidebarController.mjs";
import {
  capitalize,
  getLocalStorage,
  loadTemplate,
  qs,
  setClicks,
} from "../utils.mjs";

export default class SidebarView {
  constructor() {
    this.sidebar = qs("#sidebar");
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
    const html = `<p class="sidebar-subtitle" id="history-subtitle">History</p><ul class="search-options" id="history-list">${htmlHistory}</ul>`;
    this.sidebar.insertAdjacentHTML("beforeend", html);
    setClicks("#history-list > li", SidebarController.handleClickCity);
  }

  renderResults({ cities }) {
    this.removeResults();
    if (cities.length <= 0) {
      return this.showNoResults();
    }

    const htmlCities = cities.reduce(
      (acc, city) =>
        acc +
        `<li data-city="${city?.name}"><span>${city?.name}, ${city?.country}</span><img src="/images/arrow.svg" alt="Arrow icon" class="arrow-icon"></li>`,
      "",
    );
    const html = `<p class="sidebar-subtitle" id="results-subtitle">Results</p><ul class="search-options" id="form-results">${htmlCities}</ul>`;
    this.sidebar.insertAdjacentHTML("beforeend", html);
    setClicks("#form-results > li", SidebarController.handleClickCity);
  }

  removeResults() {
    const resultsSubtitle = qs("#results-subtitle");
    const formResults = qs("#form-results");
    const resultsMessage = qs("#results-message");
    resultsMessage?.remove();
    resultsSubtitle?.remove();
    formResults?.remove();
  }

  removeHistory() {
    const history = qs("#history-list");
    const historySubtitle = qs("#history-subtitle");
    historySubtitle?.remove();
    history?.remove();
  }

  showNoResults() {
    const html =
      "<p class='sidebar-subtitle' id='results-message'>No results found</p>";
    this.sidebar.insertAdjacentHTML("beforeend", html);
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
