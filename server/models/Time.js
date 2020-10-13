const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timeSchema = new Schema(
  {
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
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("Time", timeSchema);
