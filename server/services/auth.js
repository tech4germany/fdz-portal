const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { hash } = require("../utils/crypter");

const login = async (email, password) => {
  const user = await User.findOne({ email }).lean();

  if (!user || user.password !== hash(password))
    throw new ValError(
      "Die gewählte Kombination aus Email und Passwort konnte nicht gefunden werden"
    );

  return jwt.sign(
    { email, role: user.role, id: user._id },
    process.env.SECRET,
    {
      expiresIn: 1209600,
    }
  );
};

const permissionCheck = (role, userRole) => {
  if (role === userRole) next();
  else throw new AuthError("No permission");
};

module.exports = {
  login,
  permissionCheck,
};
