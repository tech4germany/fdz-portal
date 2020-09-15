const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scriptSchema = new Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
      enum: [
        "new",
        "checking_formal",
        "running",
        "error",
        "successful",
        "updated",
      ],
      default: "new",
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

    application: {
      type: Schema.Types.ObjectId,
      ref: "Applications",
      required: true,
    },

    user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("Script", scriptSchema);
