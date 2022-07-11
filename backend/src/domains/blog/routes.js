const express = require("express");
const router = express.Router();
const { createBlog,createCategory,getAllCategories,getAllBlogs } = require("./controller")

const { protect } = require("../../middleware/auth_middleware");
// create category
router.post("/category",protect, createCategory);
// get all categories
router.get("/category", getAllCategories);
// create blog
router.post("/", protect,  createBlog);
// get all blogs
router.get("/",getAllBlogs);
module.exports = router;