const router = require("express").Router();
const applicationRoutes = require("./applications");
const authRoutes = require("./auth");
const authMiddleware = require("../../middleware/auth");

router.use("/auth", authRoutes);
router.use("/applications", authMiddleware, applicationRoutes);

router.use((req, res) => {
  throw new ValError("Invalid API route");
});

module.exports = router;
