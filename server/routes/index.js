const express = require("express");
const router = express.Router();
const path = require("path");
const apiRoutes = require("./api");

// API
router.use("/api", apiRoutes);
// Landing
router.get("/landing", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/landing_page/index.html"));
});
// React App
router.get("/app", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/build/index.html"));
});

module.exports = router;
