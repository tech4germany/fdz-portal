const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");
const Script = require("./Script");
const Institution = require("./Institution");
const { STATUSES_NAMES } = require("../const/steps.js");

const applicationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: false,
      enum: STATUSES_NAMES,
      default: "application_submitted",
    },
    currentStepTimeEstimate: {
      type: Number,
      default: 0,
    },
    totalTimeEstimate: {
      type: Number,
      default: 0,
    },
    queuePosition: {
      type: Number,
      default: 0,
    },
    history: [
      {
        name: {
          type: String,
          required: true,
          enum: STATUSES_NAMES,
        },
        mainStep: {
          type: Number,
          required: true,
          default: 1,
        },
        user: {
          type: String,
          required: false,
        },
        date: {
          type: Number,
          required: true,
        },
        variable: {
          type: String,
          required: false,
        },
        time: {
          type: String,
          required: false,
        },
        message: {
          type: String,
          required: false,
        },
      },
    ],
    accessLevel: [
      {
        type: String,
        required: true,
        enum: [
          "none",
          "referencedata",
          "suf",
          "syntheticdata",
          "customizeddata",
        ],
        default: "none",
      },
    ],
    scripts: [{ type: Schema.Types.ObjectId, ref: "Script" }],
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    institution: {
      type: Schema.Types.ObjectId,
      ref: "Institution",
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

module.exports = mongoose.model("Application", applicationSchema);
