let flows = {
  anger: {
    label: "Anger reset",
    heading: "Pause before you react.",
    mentorOne: "You cannot control what was said. You can control what you do next.",
    user: "I want to message him back now.",
    mentorTwo: "Then we slow down first. What outcome do you actually want in one hour?",
    steps: ["Breathe for 30 seconds", "Write it but do not send", "Speak to someone trusted"]
  }
};

let currentFlow = "anger";

const themeVars = {
  bg: "--bg",
  bgDeep: "--bg-deep",
  panel: "--panel",
  panelSoft: "--panel-soft",
  line: "--line",
  text: "--text",
  muted: "--muted",
  accent: "--accent",
  accentDark: "--accent-dark",
  cream: "--cream"
};

function byId(id) {
  return document.getElementById(id);
}

function setText(id, value) {
  const element = byId(id);

  if (element && typeof value === "string") {
    element.textContent = value;
  }
}

function setLink(id, cta) {
  const element = byId(id);

  if (!element || !cta) {
    return;
  }

  setText(id, cta.label);
  if (typeof cta.href === "string") {
    element.setAttribute("href", cta.href);
  }
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (typeof text === "string") {
    element.textContent = text;
  }

  return element;
}

function applyTheme(theme = {}) {
  Object.entries(themeVars).forEach(([key, cssVar]) => {
    if (typeof theme[key] === "string") {
      document.documentElement.style.setProperty(cssVar, theme[key]);
    }
  });
}

function applyVisibility(visibility = {}) {
  Object.entries(visibility).forEach(([key, isVisible]) => {
    document.querySelectorAll(`[data-config-section="${key}"]`).forEach((element) => {
      element.hidden = isVisible === false;
    });
  });
}

function renderNav(nav = []) {
  const primaryNav = byId("primary-nav");

  if (!primaryNav || !Array.isArray(nav)) {
    return;
  }

  primaryNav.replaceChildren(
    ...nav.map((item) => {
      const link = createElement("a", "", item.label || "");
      link.setAttribute("href", item.href || "#");
      return link;
    })
  );
}

function renderPhone(phone = {}) {
  setText("phone-logo", phone.logo);
  setText("phone-kicker", phone.kicker);
  setText("phone-heading", phone.heading);
  setText("phone-check-title", phone.checkInTitle);
  setText("phone-check-text", phone.checkInText);
  setText("phone-check-button", phone.checkInButton);

  const toolGrid = byId("tool-grid");

  if (!toolGrid || !Array.isArray(phone.tools)) {
    return;
  }

  toolGrid.replaceChildren(
    ...phone.tools.map((tool) => {
      const button = createElement("button", "tool-card", "");
      button.type = "button";
      button.dataset.flow = tool.flow || "";
      button.append(createElement("strong", "", tool.title || ""));
      button.append(createElement("span", "", tool.text || ""));
      return button;
    })
  );
}

function renderStrip(items = []) {
  const strip = byId("strip");

  if (!strip || !Array.isArray(items)) {
    return;
  }

  strip.replaceChildren(...items.map((item) => createElement("span", "", item)));
}

function renderJourneys(journeys = {}) {
  setText("journeys-eyebrow", journeys.eyebrow);
  setText("journeys-heading", journeys.heading);
  setText("journeys-text", journeys.text);

  flows = journeys.flows || flows;
  currentFlow = journeys.defaultFlow || Object.keys(flows)[0] || currentFlow;

  const journeyList = byId("journey-list");

  if (journeyList && Array.isArray(journeys.items)) {
    journeyList.replaceChildren(
      ...journeys.items.map((journey) => {
        const button = createElement("button", "journey", "");
        button.type = "button";
        button.dataset.flow = journey.flow || "";
        button.append(createElement("span", "", journey.number || ""));
        button.append(createElement("strong", "", journey.title || ""));
        button.append(createElement("small", "", journey.text || ""));
        return button;
      })
    );
  }

  bindFlowButtons();
  setFlow(currentFlow);
}

function renderFeatures(features = []) {
  const featureGrid = byId("feature-grid");

  if (!featureGrid || !Array.isArray(features)) {
    return;
  }

  featureGrid.replaceChildren(
    ...features.map((feature) => {
      const article = createElement("article");
      article.append(createElement("span", "", feature.number || ""));
      article.append(createElement("h3", "", feature.title || ""));
      article.append(createElement("p", "", feature.text || ""));
      return article;
    })
  );
}

function renderSafety(items = []) {
  const safetyList = byId("safety-list");

  if (!safetyList || !Array.isArray(items)) {
    return;
  }

  safetyList.replaceChildren(...items.map((item) => createElement("li", "", item)));
}

function setFlow(key) {
  const flow = flows[key];

  if (!flow) {
    return;
  }

  currentFlow = key;
  setText("flow-label", flow.label);
  setText("flow-heading", flow.heading);
  setText("mentor-one", flow.mentorOne);
  setText("user-line", flow.user);
  setText("mentor-two", flow.mentorTwo);

  const microSteps = byId("micro-steps");
  if (microSteps && Array.isArray(flow.steps)) {
    microSteps.replaceChildren(...flow.steps.map((step) => createElement("span", "", step)));
  }

  document.querySelectorAll("[data-flow]").forEach((button) => {
    button.classList.toggle("active", button.dataset.flow === key);
  });
}

function bindFlowButtons() {
  document.querySelectorAll("[data-flow]").forEach((button) => {
    button.addEventListener("click", () => setFlow(button.dataset.flow));
  });
}

function applyConfig(config) {
  const content = config.content || {};

  document.title = content.siteTitle || document.title;
  const description = document.querySelector('meta[name="description"]');
  if (description && content.metaDescription) {
    description.setAttribute("content", content.metaDescription);
  }

  applyTheme(config.theme);
  applyVisibility(config.visibility);
  setText("brand-mark", content.brandMark);
  setText("brand-name", content.brandName);
  renderNav(content.nav);
  setLink("nav-cta", content.navCta);

  setText("hero-eyebrow", content.hero?.eyebrow);
  setText("hero-headline", content.hero?.headline);
  setText("hero-lede", content.hero?.lede);
  setLink("hero-primary-cta", content.hero?.primaryCta);
  setLink("hero-secondary-cta", content.hero?.secondaryCta);

  renderPhone(content.phone);
  renderStrip(content.strip);
  renderJourneys(content.journeys);

  setText("schools-eyebrow", content.schools?.eyebrow);
  setText("schools-heading", content.schools?.heading);
  renderFeatures(content.schools?.features);

  setText("safety-eyebrow", content.safety?.eyebrow);
  setText("safety-heading", content.safety?.heading);
  setText("safety-text", content.safety?.text);
  renderSafety(content.safety?.items);

  setText("proof-eyebrow", content.proof?.eyebrow);
  setText("proof-heading", content.proof?.heading);
  setText("proof-text", content.proof?.text);
  const proofImage = byId("proof-image");
  if (proofImage && content.proof?.imageAlt) {
    proofImage.setAttribute("alt", content.proof.imageAlt);
  }

  setText("pilot-eyebrow", content.pilot?.eyebrow);
  setText("pilot-heading", content.pilot?.heading);
  setText("pilot-text", content.pilot?.text);
  setLink("pilot-cta", content.pilot?.cta);

  setText("footer-brand", content.footer?.brand);
  setText("footer-tagline", content.footer?.tagline);
}

async function loadConfig() {
  try {
    const response = await fetch("/api/config", { headers: { Accept: "application/json" } });

    if (!response.ok) {
      throw new Error("Config request failed.");
    }

    applyConfig(await response.json());
  } catch (error) {
    bindFlowButtons();
    setFlow(currentFlow);
  }
}

loadConfig();
