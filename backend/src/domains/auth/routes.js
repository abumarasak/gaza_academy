const express = require("express");
const router = express.Router();
const { signin, signout, signup } = require("./controller");

// signup
router.post("/signup", signup);
// signin
router.post("/signin", signin);
// signout
router.post("/signout", signout);

module.exports = router;
