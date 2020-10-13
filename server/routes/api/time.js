const router = require("express").Router();
const asyncWrap = require("../../middleware/asyncWrap");
const timeServices = require("../../services/time");

router.get(
  "/",
  asyncWrap(async (req, res) => {
    const time = await timeServices.get();
    res.json({ status: 200, time });
  })
);

router.put(
  "/",
  asyncWrap(async (req, res) => {
    await timeServices.update(
      req.body.application,
      req.body.testdata,
      req.body.scriptPartial,
      req.body.scriptFull
    );
    res.json({ status: 200 });
  })
);

module.exports = router;
