const router = require("express").Router();
const applicationRoutes = require("./applications");

router.use("/applications", applicationRoutes);

router.use((req, res) => {
  throw new ValError("Invalid API route");
});

module.exports = router;
