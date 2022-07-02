const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userVerificationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    howManyTimes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("UserVerification", userVerificationSchema);
