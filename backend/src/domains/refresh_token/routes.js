const express = require("express");
const router = express.Router();
const { refresh_token } = require("./controller");

// email Verification
router.post("/", refresh_token);
module.exports = router;
