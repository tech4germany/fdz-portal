const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { hash } = require("../utils/crypter");

const login = async (email, password) => {
  const user = await User.findOne({ email }).lean();

  if (!user) throw new ValError("Invalid user");
  if (user.password !== hash(password)) throw new ValError("Invalid password");

  return jwt.sign({ email, role: user.role }, process.env.SECRET, {
    expiresIn: 1209600,
  });
};

const permissionCheck = (role, userRole) => {
  if (role === userRole) next();
  else throw new AuthError("No permission");
};

module.exports = {
  login,
  permissionCheck,
};
