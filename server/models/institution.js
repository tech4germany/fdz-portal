const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const institutionSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["new", "awatingVerification", "verified"],
    default: "new",
  },
  applications: [
    {
      type: Schema.Types.ObjectId,
      ref: "Applications",
    },
  ],
  adminUser: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Institution", institutionSchema);
