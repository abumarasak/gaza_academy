const asuncHandler = require("express-async-handler");
const User = require("../user/model");

// @desc signup user
// @route Posr /api/auth/signup
// @access Public
const signup = asuncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(500);
    throw new Error("name is required");
  }
});
// @desc signin user
// @route Posr /api/auth/signin
// @access Public
const signin = asuncHandler(async (req, res) => {});
// @desc signout user
// @route Posr /api/auth/signout
// @access Public
const signout = asuncHandler(async (req, res) => {});

module.exports = {
  signup,
  signin,
  signout,
};
