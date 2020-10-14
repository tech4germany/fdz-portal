const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Application = require("../models/Application");

const list = async () => {
  const users = await User.find({ role: "research" })
    .select("email history forename surname status")
    .lean();

  return users;
};

const reset = async (id) => {
  const applications = await Application.find({ users: id });

  for (const application of applications) {
    if (application.name === "Diabetes Prävalenz") {
      application.history = application.history.slice(0, 10);
      application.status =
        application.history[application.history.length - 1].name;
      await application.save();
    } else if (application.name === "Covid Prävalenz") {
      application.history = application.history.slice(0, 2);
      application.status =
        application.history[application.history.length - 1].name;
      await application.save();
    } else if (application.name === "Off-Label-Use") {
      application.history = application.history.slice(0, 2);
      application.status =
        application.history[application.history.length - 1].name;
      await application.save();
    } else {
      await application.deleteOne();
    }
  }
};

module.exports = {
  list,
  reset,
};
