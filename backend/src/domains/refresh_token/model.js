const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const refreshTokenSchema = new Schema(
  {
    refreshToken: String,
    userId: String,
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
module.exports = mongoose.model("RefreshToken", refreshTokenSchema);
