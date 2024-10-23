import { qs } from "../utils.mjs";

export default class MainView {
  static setCurrentDate() {
    const today = new Date();
    const currentDate = qs("#current-date > span:last-child");
    currentDate.textContent = today.toDateString();
  }
}
