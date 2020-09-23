const { application } = require("express");
const Application = require("../models/Application");
const Script = require("../models/Script");

const get = async (id) => {
  const application = await Application.findOne({ id })
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
  console.log(applications);
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

module.exports = {
  get,
  list,
  updateStatus,
};
