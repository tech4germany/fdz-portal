const express = require("express");
const router = express.Router();
const path = require("path");
const apiRoutes = require("./api");

// API
router.use("/api", apiRoutes);
// App
router.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../landing_page/index.html"));
});

module.exports = router;
