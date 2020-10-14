const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timeSchema = new Schema({
  application: {
    type: String,
    required: true,
  },
  testdata: {
    type: String,
    required: false,
  },
  scriptPartial: {
    type: String,
    required: true,
  },
  scriptFull: {
    type: String,
    required: true,
  },
  lastUpdate: {
    type: Number,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Time", timeSchema);
