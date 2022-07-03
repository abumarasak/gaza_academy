const express = require("express");
const router = express.Router();

// auth
const authRoutes = require("../domains/auth");
router.use("/api/auth", authRoutes);
// email Verification
const emailVerificationRoutes = require("../domains/email_verification");
router.use("/api/email_verification", emailVerificationRoutes);

module.exports = router;
