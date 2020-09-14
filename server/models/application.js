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
    statusFdz: {
      type: String,
      required: true,
      enum: [
        "new",
        "checking_identity",
        "checking_formal",
        "checking_content",
        "response_needed",
        "approved",
        "waiting_testdata",
        "waiting_script",
      ],
    },
    statusUser: {
      type: String,
      required: true,
      enum: [
        "new",
        "checking_identity",
        "checking_formal",
        "checking_content",
        "response_needed",
        "approved",
        "waiting_testdata",
        "waiting_script",
      ],
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
        action: {
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
        time: {
          type: String,
          required: true,
        },
      },
    ],
    accessLevel: [
      {
        type: String,
        required: true,
        enum: ["referencedata", "suf", "syntheticdata", "customizeddata"],
      },
    ],
    scripts: [{ type: Schema.Types.ObjectId, ref: "Scripts" }],
    user: { type: Schema.Types.ObjectId, required: false },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("Application", applicationSchema);
