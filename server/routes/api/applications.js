const router = require("express").Router();
// to catch errors (no need for try/catch)
const asyncWrap = require("../../middleware/asyncWrap");

// Single
router.get(
  "/:id",
  asyncWrap(async (req, res) => {
    //const application = await applicationService.get(req.params.id);
    const application = `Application: ${req.params.id}`;
    res.json({ status: 200, application });
  })
);

// List
router.get(
  "/",
  asyncWrap(async (req, res) => {
    //const applications = await applicationsService.list();
    const applications = ["1", "2", "3"];
    res.json({ status: 200, applications });
  })
);

// New
router.post(
  "/",
  asyncWrap(async (req, res) => {
    // await applicationsService.create({
    //   name: req.body.name,
    // });
    res.json({ status: 200 });
  })
);

// Update
router.put(
  "/:id",
  asyncWrap(async (req, res) => {
    // const applicationName = await applicationsServiceService.update(
    //   req.params.id,
    //   {
    //     name: req.body.name,
    //     statusUser: req.body.statusUser,
    //   }
    // );
    const applicationName = "Test Application";
    res.json({ status: 200, applicationName });
  })
);

module.exports = router;
