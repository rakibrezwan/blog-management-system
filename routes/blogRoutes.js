const express = require("express");

const {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog
} = require("../controllers/blogController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// Create Blog
router.post("/", authMiddleware, createBlog);


// Get All Blogs
router.get("/", authMiddleware, getAllBlogs);


// Get Single Blog
router.get("/:id", authMiddleware, getSingleBlog);


// Update Blog
router.put("/:id", authMiddleware, updateBlog);


// Delete Blog
router.delete("/:id", authMiddleware, deleteBlog);


module.exports = router;