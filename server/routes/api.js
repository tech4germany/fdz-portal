const express = require("express");
const router = express.Router();

router.use((req, res) => {
  throw new ValError("Invalid API route");
});

module.exports = router;
