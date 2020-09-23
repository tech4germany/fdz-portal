const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
      enum: [
        "application_submitted",
        "application_checked",
        "application_accepted",
        "application_needs_update",
        "application_updated",
        "application_rejected",
        "testdata_delivered",
        "script_submitted",
        "script_checked",
        "script_executed",
        "script_failed",
        "results_submitted",
      ],
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
          enum: [
            "application_submitted",
            "application_checked",
            "application_accepted",
            "application_needs_update",
            "application_updated",
            "application_rejected",
            "testdata_delivered",
            "script_submitted",
            "script_checked",
            "script_executed",
            "script_failed",
            "results_submitted",
          ],
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
