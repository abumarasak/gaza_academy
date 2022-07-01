const express = require("express");
const router = express.Router();

// auth
const authRoutes = require("../domains/auth/index");
router.use("/auth", authRoutes);

module.exports = router;
