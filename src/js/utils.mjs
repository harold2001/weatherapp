export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function qsAll(selector, parent = document) {
  return parent.querySelectorAll(selector);
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback(event);
  });
  qs(selector).addEventListener("click", callback);
}

export function setClicks(selector, callback) {
  document.querySelectorAll(selector).forEach((element) => {
    element.addEventListener("touchend", (event) => {
      event.preventDefault();
      callback(event);
    });
    element.addEventListener("click", callback);
  });
}

export function setSubmit(form, callback) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    callback();
  });
}

export function setErrorToast(message) {
  const toast = `
    <div id="toast">
      <img src="/images/wave.svg" alt="Wave Icon" class="wave" />
      <div class="icon-container">
        <img src="/images/close-icon.svg" alt="Close Icon" class="icon" />
      </div>
      <div class="message-text-container">
        <p class="message-text">Error message</p>
        <p class="sub-text">${message}</p>
      </div>
      <img src="/images/cross-icon.svg" alt="Cross Icon" class="cross-icon" />
    </div>
  `;
  qs("main").insertAdjacentHTML("beforeend", toast);

  setTimeout(() => {
    qs("#toast").classList.add("no-active");
  }, 1500);

  setTimeout(() => {
    qs("#toast").remove();
  }, 2500);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const parameter = urlParams.get(param);
  return parameter;
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  const htmlStrings = list.map(templateFn);

  if (clear) {
    parentElement.innerHTML = "";
  }

  parentElement?.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function renderWithTemplate(templateFn, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", templateFn);
  if (callback) {
    callback(data);
  }
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#main-header");
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}

export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });

  const main = document.querySelector("main");
  main.prepend(alert);
  if (scroll) window.scrollTo(0, 0);

  setTimeout(function () {
    main.removeChild(alert);
  }, duration);
}

export async function convertToJson(res) {
  const jsonResponse = await res.json();

  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse };
  }
}
