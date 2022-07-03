const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userVerificationSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    otp: {
      type: String,
      required: true,
    },
    attempts: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("UserVerification", userVerificationSchema);
