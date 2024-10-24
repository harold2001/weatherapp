import { qs } from "../utils.mjs";

export default class MainView {
  static setCurrentDate() {
    const currentDate = qs("#current-date > span:last-child");
    currentDate.textContent = new Date().toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }
}
