const Application = require("../models/Application");
const User = require("../models/User");
const Script = require("../models/Script");
const { STEPS } = require("../const/steps");

const get = async (id, user) => {
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
      path: "users",
      select: "email",
    })
    .lean();
  return application;
};

const list = async (user) => {
  const limit = 100;
  const query = {};
  if (user.role === "research") {
    query.users = user.id;
  }

  const applications = await Application.find(query, null, {
    sort: { lastStatusUpdate: -1 },
  })
    .populate({
      path: "users",
      select: "email",
    })
    .limit(limit)
    .lean();
  return applications;
};

const listFilter = async (data, user) => {
  if (data === null) data = {};
  const limit = parseInt(data.limit) || 100;

  const query = {};
  if (user.role === "research") {
    query.users = user.id;
  } else if (user.role === "fdz" && data.user) {
    query.users = data.user;
  }

  if (data.status) {
    const requestedStatuses = STEPS.reduce((result, step) => {
      const type = data.status === "active" ? "waiting" : "unsubmitted";
      if (step.type === type) result.push(step.name);
      return result;
    }, []);
    query.status = {
      $in: requestedStatuses,
    };
  }

  const applications = await Application.find(query, null, {
    sort: { lastStatusUpdate: -1 },
  })
    .populate({
      path: "users",
      select: "email",
    })
    .limit(limit)
    .lean(); // .select({ "name": 1, "_id": 0})
  return applications;
};

const create = async (params, user) => {
  let additionalUser = await User.find({
    email: { $in: params.additionalUser },
  })
    .select("_id")
    .lean();

  const institutionId = (await User.findById(user.id).select("institution"))
    .institution;

  additionalUser = additionalUser.map((user) => user._id.toString());
  additionalUser.unshift(user.id);

  const data = {
    name: params.applicationName,
    status: "application_unsubmitted",
    description: params.applicationDesc,
    queuePosition: 1,
    institution: institutionId,
    users: additionalUser,
    history: [
      {
        name: "application_unsubmitted",
        user: user.id,
        mainStep: 1,
        date: Date.now(),
      },
    ],
  };

  const application = await new Application(data);
  await application.save();
  return application._id;
};

const updateStatus = async (data, user) => {
  if (user.role === "research")
    throw new ValError("Not allowed to change status");

  try {
    const applicationDB = await Application.findById(data.id).select(
      "status history"
    );
    let newStatus = data.status;

    const nextStep = STEPS.find((step) => step.name === data.status);
    let variable = null;
    if (
      nextStep.name === "script_failed" ||
      nextStep.name === "script_needs_update"
    )
      variable =
        applicationDB.history[applicationDB.history.length - 1].variable;
    applicationDB.history.push({
      name: data.status,
      mainStep: nextStep.mainStep,
      variable,
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
        variable,
        mainStep: nextAutoStep.mainStep,
        date: Date.now(),
      });
    }

    applicationDB.status = newStatus;
    applicationDB.lastStatusUpdate = Date.now();
    await applicationDB.save();
  } catch (error) {
    throw error;
  }
};

const upload = async (params, user) => {
  try {
    const applicationDB = await Application.findById(params.id).select(
      "status history"
    );

    const time = "2 - 3 Wochen";

    applicationDB.history.push({
      name: "application_submitted",
      mainStep: 1,
      user: user.id,
      date: Date.now(),
    });
    applicationDB.history.push({
      name: "application_unchecked",
      user: user.id,
      mainStep: 1,
      time,
      date: Date.now(),
    });

    applicationDB.status =
      applicationDB.history[applicationDB.history.length - 1].name;
    applicationDB.lastStatusUpdate = Date.now();
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
      time: params.time,
      variable: params.fileName,
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
  create,
  list,
  listFilter,
  updateStatus,
  upload,
  uploadFakeScript,
};
