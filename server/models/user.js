const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "fdz", "admin"],
    default: "user",
  },
  status: {
    type: String,
    enum: [
      "new",
      "awatingVerification",
      "verified",
      "awaitingApproval",
      "approved",
    ],
    default: "new",
  },
  institution: {
    type: Schema.Types.ObjectId,
    ref: "Institution",
  },
  applications: [
    {
      type: Schema.Types.ObjectId,
      ref: "Applications",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
