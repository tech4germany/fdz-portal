const jwt = require("jsonwebtoken");
const Time = require("../models/Time");

const get = async () => {
  const time = await Time.findOne().lean();

  return time;
};

const update = async (application, testdata, script) => {
  await Time.findOneAndUpdate({}, { application, testdata, script });
};

module.exports = {
  get,
  update,
};
