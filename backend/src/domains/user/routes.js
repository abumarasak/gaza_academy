const express = require("express");
const router = express.Router();
const { protect } = require("../../middleware/auth_middleware");
const {
  getUserById,
  getAllUsers,
  deleteUserById,
  updateUserById,
} = require("./controller");

// get user by id
router.get("/:id", protect, getUserById);
// get all users
router.get("/", protect, getAllUsers);
// delete user by id
router.delete("/:id", protect, deleteUserById);
// update user by id
router.put("/:id", protect, updateUserById);
module.exports = router;
