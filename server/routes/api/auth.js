const router = require("express").Router();
const asyncWrap = require("../../middleware/asyncWrap");
const authService = require("../../services/auth");
const applicationsServices = require("../../services/applications");

router.post(
  "/login",
  asyncWrap(async (req, res) => {
    const jwtToken = await authService.login(req.body.email, req.body.password);
    res.json({ status: 200, jwtToken });
  })
);

// Reset application after logout
router.get(
  "/logout",
  asyncWrap(async (req, res) => {
    await applicationsServices.resetStatus();
    const result = "Status reset";
    res.json({ status: 200, result });
  })
);

module.exports = router;
