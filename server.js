const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const distPath = path.join(__dirname, "dist");
const indexPath = path.join(distPath, "index.html");

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use(express.static(distPath));

app.get("*", (_req, res) => {
  if (!fs.existsSync(indexPath)) {
    res.status(503).send("FTB app has not been built yet. Run `npm run build` first.");
    return;
  }

  res.sendFile(indexPath);
});

app.listen(port, "0.0.0.0", () => {
  console.log(`FTB pilot running at http://localhost:${port}`);
});
