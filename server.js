const express = require("express");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const defaultConfigPath = path.join(__dirname, "data", "site-config.json");
const configPath = process.env.SITE_CONFIG_PATH || path.join(__dirname, "data", "site-config.json");
const isRender = process.env.RENDER === "true";
const adminPassword = process.env.ADMIN_PASSWORD || (isRender ? "" : "fortheboys");
const sessions = new Map();
const sessionMs = 1000 * 60 * 60 * 8;

app.use(express.json({ limit: "120kb" }));

function ensureConfig() {
  if (fs.existsSync(configPath)) {
    return;
  }

  fs.mkdirSync(path.dirname(configPath), { recursive: true });
  fs.copyFileSync(defaultConfigPath, configPath);
}

function readConfig() {
  ensureConfig();
  return JSON.parse(fs.readFileSync(configPath, "utf8"));
}

function writeConfig(config) {
  fs.mkdirSync(path.dirname(configPath), { recursive: true });
  fs.writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`);
}

function pruneSessions() {
  const now = Date.now();

  for (const [token, expiry] of sessions.entries()) {
    if (expiry <= now) {
      sessions.delete(token);
    }
  }
}

function requireAdmin(req, res, next) {
  pruneSessions();
  const header = req.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  const expiry = sessions.get(token);

  if (!expiry || expiry <= Date.now()) {
    res.status(401).json({ error: "Admin login required." });
    return;
  }

  sessions.set(token, Date.now() + sessionMs);
  next();
}

function isConfigShape(config) {
  return Boolean(
    config &&
      typeof config === "object" &&
      config.theme &&
      config.visibility &&
      config.content &&
      typeof config.content === "object"
  );
}

app.use(express.static(path.join(__dirname, "public")));

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/api/config", (_req, res) => {
  res.json(readConfig());
});

app.post("/api/admin/login", (req, res) => {
  if (!adminPassword) {
    res.status(503).json({
      error: "Admin password is not configured. Set ADMIN_PASSWORD in Render before using /admin online."
    });
    return;
  }

  if (req.body?.password !== adminPassword) {
    res.status(401).json({ error: "Incorrect password." });
    return;
  }

  const token = crypto.randomBytes(32).toString("hex");
  sessions.set(token, Date.now() + sessionMs);
  res.json({ token });
});

app.post("/api/admin/config", requireAdmin, (req, res) => {
  const config = req.body;

  if (!isConfigShape(config)) {
    res.status(400).json({ error: "Invalid site config." });
    return;
  }

  writeConfig(config);
  res.json({ ok: true, config });
});

app.get(["/admin", "/admin/"], (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`FTB Mentor site running at http://localhost:${port}`);
  if (!process.env.ADMIN_PASSWORD && !isRender) {
    console.log("Local admin password: fortheboys");
  }
});
