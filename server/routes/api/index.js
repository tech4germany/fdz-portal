const router = require("express").Router();
const applicationsRoutes = require("./applications");
const authRoutes = require("./auth");
const timeRoutes = require("./time");
const usersRoutes = require("./users");
const authMiddleware = require("../../middleware/auth");

router.use("/auth", authRoutes);
router.use("/time", authMiddleware, timeRoutes);
router.use("/users", authMiddleware, usersRoutes);
router.use("/applications", authMiddleware, applicationsRoutes);

router.use((req, res) => {
  throw new ValError("Invalid API route");
});

module.exports = router;
