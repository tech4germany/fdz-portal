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
  let userId = user._id;
  if (user.role !== "researcher") {
    userId = params.userId || null;
  }

  const applications = await Application.find({ user: userId }, null, {
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
    await Project.findOneAndUpdate(
      { _id: params.id },
      { status: params.status },
      {
        new: true,
        runValidators: true,
      }
    );
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
