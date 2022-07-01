const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    isAdmin: Boolean,
    isActive: Boolean,
    image: String,
    phoneNumber: String,
    address: String,
    city: String,
    gender: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
