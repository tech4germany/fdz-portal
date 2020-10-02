const router = require("express").Router();
// to catch errors (no need for try/catch)
const asyncWrap = require("../../middleware/asyncWrap");
const applicationsServices = require("../../services/applications");
const { permissionCheck } = require("../../middleware/auth");

// Single
router.get(
  "/:id",
  asyncWrap(async (req, res) => {
    const application = await applicationsServices.get(req.params.id);
    res.json({ status: 200, application });
  })
);

// List
router.get(
  "/",
  asyncWrap(async (req, res) => {
    const applications = await applicationsServices.list(req.params);
    res.json({ status: 200, applications });
  })
);

// New
router.post(
  "/",
  asyncWrap(async (req, res) => {
    await applicationsServices.create({
      name: req.body.name,
    });
    res.json({ status: 200 });
  })
);

// Update Status
router.put(
  "/:id/status",
  asyncWrap(async (req, res) => {
    const applicationName = await applicationsServices.updateStatus({
      id: req.params.id,
      status: req.body.status,
      message: req.body.message,
    });
    res.json({ status: 200, applicationName });
  })
);

// Update Status
router.get(
  "/:id/reset",
  asyncWrap(async (req, res) => {
    await applicationsServices.resetStatus({
      applicationId: req.params.id,
    });
    const result = "Status reset";
    res.json({ status: 200, result });
  })
);

// Fake script upload
router.post(
  "/:id/script/fake",
  asyncWrap(async (req, res) => {
    const fileName = await applicationsServices.uploadFakeScript({
      applicationId: req.params.id,
      fileName: req.body.fileName,
      resultMethod: req.body.resultMethod,
    });
    res.json({ status: 200, fileName });
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
