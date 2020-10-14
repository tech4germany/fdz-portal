const jwt = require("jsonwebtoken");
const User = require("../models/User");

const list = async () => {
  const users = await User.find({ role: "research" })
    .select("email history forename surname status")
    .lean();

  return users;
};

const reset = async (id) => {
  const user = await User.findById(id);
};

module.exports = {
  list,
  reset,
};
