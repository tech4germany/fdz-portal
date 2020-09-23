const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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
    mainSteps: [
      {
        id: {
          type: Number,
          required: true,
        },
        status: {
          type: String,
          enum: ["done", "current"],
          required: true,
        },
        date: {
          type: Date,
          required: false,
        },
      },
    ],
    history: [
      {
        action: {
          enum: STATUSES_NAMES,
        },
        actionDetail: {
          type: String,
          required: true,
        },
        user: {
          type: String,
          required: true,
        },
        fdzUser: {
          type: String,
          required: true,
        },
        date: {
          type: String,
          required: true,
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
    scripts: [{ type: Schema.Types.ObjectId, ref: "Scripts" }],
    user: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("Application", applicationSchema);
