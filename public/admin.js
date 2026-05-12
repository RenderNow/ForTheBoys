const tokenKey = "ftb-admin-token";
let token = sessionStorage.getItem(tokenKey) || "";
let config = null;

const loginPanel = document.getElementById("login-panel");
const editor = document.getElementById("editor");
const loginForm = document.getElementById("login-form");
const loginStatus = document.getElementById("login-status");
const editorStatus = document.getElementById("editor-status");
const jsonEditor = document.getElementById("config-json");
const logoutButton = document.getElementById("logout-button");

function setStatus(element, message, isError = false) {
  element.textContent = message;
  element.classList.toggle("error", isError);
}

function getDeep(source, path) {
  return path.split(".").reduce((value, part) => value?.[part], source);
}

function setDeep(target, path, value) {
  const parts = path.split(".");
  const last = parts.pop();
  const parent = parts.reduce((current, part) => {
    if (!current[part] || typeof current[part] !== "object") {
      current[part] = {};
    }

    return current[part];
  }, target);

  parent[last] = value;
}

function linesToArray(value) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function arrayToLines(value) {
  return Array.isArray(value) ? value.join("\n") : "";
}

function showEditor() {
  loginPanel.hidden = true;
  editor.hidden = false;
  logoutButton.hidden = false;
}

function showLogin() {
  loginPanel.hidden = false;
  editor.hidden = true;
  logoutButton.hidden = true;
}

function updateJsonFromFields() {
  if (!config) {
    return;
  }

  document.querySelectorAll("[data-path]").forEach((field) => {
    setDeep(config, field.dataset.path, field.value);
  });

  document.querySelectorAll("[data-lines]").forEach((field) => {
    setDeep(config, field.dataset.lines, linesToArray(field.value));
  });

  document.querySelectorAll("[data-visibility]").forEach((field) => {
    config.visibility[field.dataset.visibility] = field.checked;
  });

  jsonEditor.value = JSON.stringify(config, null, 2);
}

function renderFields() {
  document.querySelectorAll("[data-path]").forEach((field) => {
    field.value = getDeep(config, field.dataset.path) ?? "";
  });

  document.querySelectorAll("[data-lines]").forEach((field) => {
    field.value = arrayToLines(getDeep(config, field.dataset.lines));
  });

  document.querySelectorAll("[data-visibility]").forEach((field) => {
    field.checked = getDeep(config, `visibility.${field.dataset.visibility}`) !== false;
  });

  jsonEditor.value = JSON.stringify(config, null, 2);
}

async function fetchConfig() {
  const response = await fetch("/api/config");

  if (!response.ok) {
    throw new Error("Could not load site config.");
  }

  config = await response.json();
  renderFields();
}

async function login(password) {
  const response = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password })
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.error || "Login failed.");
  }

  token = result.token;
  sessionStorage.setItem(tokenKey, token);
}

async function saveConfig() {
  const parsedConfig = JSON.parse(jsonEditor.value);

  const response = await fetch("/api/admin/config", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(parsedConfig)
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.error || "Save failed.");
  }

  config = result.config;
  renderFields();
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  setStatus(loginStatus, "Checking password...");

  try {
    await login(document.getElementById("password").value);
    await fetchConfig();
    showEditor();
    setStatus(editorStatus, "Logged in. Changes are not live until you save.");
  } catch (error) {
    setStatus(loginStatus, error.message, true);
  }
});

document.querySelectorAll("[data-path], [data-lines], [data-visibility]").forEach((field) => {
  field.addEventListener("input", updateJsonFromFields);
  field.addEventListener("change", updateJsonFromFields);
});

document.getElementById("save-button").addEventListener("click", async () => {
  setStatus(editorStatus, "Saving...");

  try {
    await saveConfig();
    setStatus(editorStatus, "Saved. Refresh the public site to see the changes.");
  } catch (error) {
    setStatus(editorStatus, error.message, true);
  }
});

document.getElementById("reload-button").addEventListener("click", async () => {
  setStatus(editorStatus, "Reloading...");

  try {
    await fetchConfig();
    setStatus(editorStatus, "Reloaded current site config.");
  } catch (error) {
    setStatus(editorStatus, error.message, true);
  }
});

document.getElementById("load-json-button").addEventListener("click", () => {
  try {
    config = JSON.parse(jsonEditor.value);
    renderFields();
    setStatus(editorStatus, "Loaded JSON into the quick fields.");
  } catch (error) {
    setStatus(editorStatus, "JSON is not valid. Fix it before loading.", true);
  }
});

logoutButton.addEventListener("click", () => {
  token = "";
  sessionStorage.removeItem(tokenKey);
  showLogin();
});

fetchConfig()
  .then(() => {
    if (token) {
      showEditor();
    }
  })
  .catch((error) => {
    setStatus(loginStatus, error.message, true);
  });
