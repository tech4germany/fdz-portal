const jwt = require("jsonwebtoken");
const Time = require("../models/Time");

const get = async () => {
  const time = await Time.findOne().lean();

  return time;
};

const update = async (application, testdata, scriptPartial, scriptFull) => {
  await Time.findOneAndUpdate(
    {},
    { application, testdata, scriptPartial, scriptFull }
  );
};

module.exports = {
  get,
  update,
};
