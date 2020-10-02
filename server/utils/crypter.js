const crypto = require("crypto");

const hash = (string) => {
  return crypto
    .createHash("sha256")
    .update(string + "9450232TB3769111")
    .digest("hex");
};

module.exports = { hash };
