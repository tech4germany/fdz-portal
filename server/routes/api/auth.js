const router = require("express").Router();
const asyncWrap = require("../../middleware/asyncWrap");
const authService = require("../../services/auth");

router.post(
  "/login",
  asyncWrap(async (req, res) => {
    const jwtToken = await authService.login(req.body.email, req.body.password);
    res.json({ status: 200, jwtToken });
  })
);

module.exports = router;
