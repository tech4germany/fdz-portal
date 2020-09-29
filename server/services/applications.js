const Application = require("../models/Application");
const Script = require("../models/Script");

const get = async (id) => {
  const application = await Application.findById(id)
    .populate({
      path: "scripts",
      select: "fileName status",
    })
    .lean();
  return application;
};

const list = async (params, user) => {
  const limit = parseInt(params.limit) || 100;
  const query = {};
  if (false && user.role === "researcher") {
    query.user = params.userId;
  }

  const applications = await Application.find(query, null, {
    sort: { created_at: -1 },
  })
    .limit(limit)
    .lean(); // .select({ "name": 1, "_id": 0})
  return applications;
};

const updateStatus = async (params, user) => {
  if (user.role === "researcher")
    throw new ValError("Not allowed to change status");

  try {
    const applicationDB = await Application.findById(params.id).select(
      "status history"
    );

    applicationDB.history.push({
      action: "status_update",
      actionDetail: `${applicationDB.status} to ${params.status}`,
      fdzUser: user._id,
      time: Math.floor(Date.now() / 1000),
    });
    applicationDB.status = params.status;
    await applicationDB.save();

    // await Application.findOneAndUpdate(
    //   { _id: params.id },
    //   { status: params.status },
    //   {
    //     new: true,
    //     runValidators: true,
    //   }
    // );

    // Placeholder: notify user
  } catch (error) {
    throw error;
  }
};

const resetStatus = async (params) => {
  console.log(params);
  try {
    const applicationDB = await Application.findById(
      params.applicationId
    ).select("status history");

    applicationDB.history.pop();
    applicationDB.history.pop();

    applicationDB.status =
      applicationDB.history[applicationDB.history.length - 1].name;
    await applicationDB.save();
  } catch (error) {
    throw error;
  }
};

const uploadFakeScript = async (params) => {
  try {
    const applicationDB = await Application.findById(
      params.applicationId
    ).select("status history");

    userId = applicationDB.history[0].user;

    applicationDB.history.push({
      name: "script_submitted",
      mainStep: 3,
      var: params.fileName,
      user: userId,
      date: Math.floor(Date.now() / 1000),
    });
    applicationDB.history.push({
      name: "script_unexecuted",
      mainStep: 3,
      time: "4 - 6 Wochen",
      user: userId,
      date: Math.floor(Date.now() / 1000),
    });

    applicationDB.status =
      applicationDB.history[applicationDB.history.length - 1].name;
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
