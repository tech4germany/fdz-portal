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
      required: false,
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
      default: "new",
    },
    statusUser: {
      type: String,
      required: false,
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
      default: "new",
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
