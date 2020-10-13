const router = require("express").Router();
const applicationRoutes = require("./applications");
const authRoutes = require("./auth");
const timeRoutes = require("./time");
const authMiddleware = require("../../middleware/auth");

router.use("/auth", authRoutes);
router.use("/time", authMiddleware, timeRoutes);
router.use("/applications", authMiddleware, applicationRoutes);

router.use((req, res) => {
  throw new ValError("Invalid API route");
});

module.exports = router;
