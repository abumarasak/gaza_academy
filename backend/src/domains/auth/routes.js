const express = require("express");
const router = express.Router();
const { signin, signout, signup } = require("./controller");
const multer  = require('multer')
const uploadImage = multer({ dest: 'backend/src/uploads/images/' })
// signup
router.post("/signup",uploadImage.single('image'), signup);
// signin
router.post("/signin", signin);
// signout
router.post("/signout", signout);

module.exports = router;
