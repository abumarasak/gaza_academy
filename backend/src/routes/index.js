const express = require("express");
const router = express.Router();

// auth
const authRoutes = require("../domains/auth");
router.use("/api/auth", authRoutes);
// email Verification
const emailVerificationRoutes = require("../domains/email_verification");
router.use("/api/email_verification", emailVerificationRoutes);
// refresh token
const refreshTokenRoutes = require("../domains/refresh_token");
router.use("/api/refresh_token", refreshTokenRoutes);
// user
const userRoutes = require("../domains/user");
router.use("/api/user", userRoutes);
module.exports = router;
// blog
const blogRoutes = require("../domains/blog");
router.use("/api/blog", blogRoutes);
// get files
const getFilesRoutes = require("../domains/get_files");
router.use("/api/get_files", getFilesRoutes);