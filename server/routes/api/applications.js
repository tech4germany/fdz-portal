const router = require("express").Router();
// to catch errors (no need for try/catch)
const asyncWrap = require("../../middleware/asyncWrap");
const applicationsServices = require("../../services/applications");
const { permissionCheck } = require("../../middleware/auth");

// Single
router.get(
  "/:id",
  asyncWrap(async (req, res) => {
    const application = await applicationsServices.get(req.params.id, req.user);
    res.json({ status: 200, application });
  })
);

// List
router.get(
  "/",
  asyncWrap(async (req, res) => {
    const applications = await applicationsServices.list(req.user);
    res.json({ status: 200, applications });
  })
);

// List Filtered
router.post(
  "/",
  asyncWrap(async (req, res) => {
    const applications = await applicationsServices.listFilter(
      req.body.query,
      req.user
    );
    res.json({ status: 200, applications });
  })
);

// New
router.post(
  "/new",
  asyncWrap(async (req, res) => {
    const applicationId = await applicationsServices.create(
      {
        applicationName: req.body.applicationName,
        applicationDesc: req.body.applicationDesc,
        additionalUser: req.body.additionalUser,
      },
      req.user
    );
    res.json({ status: 200, applicationId });
  })
);

// Update Status
router.put(
  "/:id/status",
  asyncWrap(async (req, res) => {
    const applicationName = await applicationsServices.updateStatus(
      {
        id: req.params.id,
        status: req.body.status,
        message: req.body.message,
      },
      req.user
    );
    res.json({ status: 200, applicationName });
  })
);

// Upload new Application
router.post(
  "/:id/upload",
  asyncWrap(async (req, res) => {
    await applicationsServices.upload({ id: req.params.id }, req.user);
    res.json({ status: 200 });
  })
);

// Fake script upload
router.post(
  "/:id/script/fake",
  asyncWrap(async (req, res) => {
    const fileName = await applicationsServices.uploadFakeScript(
      {
        applicationId: req.params.id,
        fileName: req.body.fileName,
        resultMethod: req.body.resultMethod,
        time: req.body.time,
      },
      req.user
    );
    res.json({ status: 200, fileName });
  })
);

module.exports = router;
