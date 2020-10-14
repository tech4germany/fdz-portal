const router = require("express").Router();
const asyncWrap = require("../../middleware/asyncWrap");
const usersServices = require("../../services/users");

router.get(
  "/",
  asyncWrap(async (req, res) => {
    const users = await usersServices.list();
    res.json({ status: 200, users });
  })
);

router.put(
  "/:id/reset",
  asyncWrap(async (req, res) => {
    await usersServices.reset(req.params.id);
    res.json({ status: 200 });
  })
);

module.exports = router;
