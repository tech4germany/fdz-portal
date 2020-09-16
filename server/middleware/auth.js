const jwt = require("jsonwebtoken");
const { AuthError } = require("../utils/errors");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];

    jwt.verify(token, process.env.SECRET, (error, user) => {
      if (error) {
        if (error.name === "TokenExpiredError")
          throw new AuthError("Sessions expired, please login");
        else throw new AuthError("Invalid session, please logout");
      }
      req.user = user;
    });
  } else {
    throw new AuthError("Not signed in");
  }
  next();
};

const permissionCheck = (role, userRole) => {
  if (role === userRole) next();
  else throw new AuthError("No permission");
};

module.exports = { auth, permissionCheck };
