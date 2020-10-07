const Application = require("../models/Application");
const Script = require("../models/Script");
const { STEPS } = require("../const/steps");
const { application } = require("express");

const get = async (id) => {
  const application = await Application.findById(id)
    .populate({
      path: "scripts",
      select: "fileName status",
    })
    .populate({
      path: "institution",
      select: "name",
    })
    .populate({
      path: "user",
      select: "email",
    })
    .lean();
  return application;
};

const list = async (params, user) => {
  const limit = parseInt(params.limit) || 100;
  const query = {};
  if (user.role === "researcher") {
    query.users = user.id;
  }

  const applications = await Application.find(query, null, {
    sort: { lastStatusUpdate: -1 },
  })
    .populate({
      path: "user",
      select: "email",
    })
    .limit(limit)
    .lean(); // .select({ "name": 1, "_id": 0})
  return applications;
};

const updateStatus = async (data, user) => {
  if (user.role === "researcher")
    throw new ValError("Not allowed to change status");

  try {
    const applicationDB = await Application.findById(data.id).select(
      "status history"
    );
    let newStatus = data.status;

    const nextStep = STEPS.find((step) => step.name === data.status);
    applicationDB.history.push({
      name: data.status,
      mainStep: nextStep.mainStep,
      message: data.message ? data.message : null,
      date: Date.now(),
    });

    if (nextStep.auto_next) {
      const nextAutoStep = STEPS.find(
        (step) => step.name === nextStep.auto_next
      );
      newStatus = nextStep.auto_next;
      applicationDB.history.push({
        name: nextAutoStep.name,
        mainStep: nextAutoStep.mainStep,
        date: Date.now(),
      });
    }

    applicationDB.status = newStatus;
    applicationDB.lastStatusUpdate = Date.now();
    await applicationDB.save();

    // Placeholder: notify user
  } catch (error) {
    throw error;
  }
};

const resetStatus = async () => {
  try {
    const applicationDB = await Application.findOne()
      .sort({ _id: 1 })
      .limit(1)
      .select("status history");
    applicationDB.history = applicationDB.history.slice(0, 10);

    applicationDB.status =
      applicationDB.history[applicationDB.history.length - 1].name;
    await applicationDB.save();
  } catch (error) {
    throw error;
  }
};

const uploadFakeScript = async (params, user) => {
  try {
    const applicationDB = await Application.findById(
      params.applicationId
    ).select("status history");

    let time = "";
    if (params.resultMethod === "full") time = "4 - 6 Wochen";
    else time = "2 - 3 Wochen";

    applicationDB.history.push({
      name: "script_updated",
      mainStep: 3,
      variable: params.fileName,
      user: user.id,
      date: Date.now(),
    });
    applicationDB.history.push({
      name: "script_unexecuted",
      mainStep: 3,
      time,
      user: user.id,
      date: Date.now(),
    });

    applicationDB.status =
      applicationDB.history[applicationDB.history.length - 1].name;
    applicationDB.lastStatusUpdate = Date.now();
    await applicationDB.save();
    return params.fileName;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  get,
  list,
  updateStatus,
  resetStatus,
  uploadFakeScript,
};
