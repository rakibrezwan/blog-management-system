const Blog = require("../models/Blog");


// ================= CREATE BLOG =================

const createBlog = async (req, res) => {
    try {
        const {
            title,
            content,
            authorName,
            tags,
            blogImage
        } = req.body;

        if (!title || !content || !authorName) {
            return res.status(400).json({
                success: false,
                message: "Title, content and authorName are required"
            });
        }

        const blog = await Blog.create({
            title,
            content,
            authorName,
            tags: tags || [],
            blogImage: blogImage || "",
            author: req.user.userId
        });

        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            blog
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= GET ALL BLOGS =================

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
            .populate("author", "name email")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: blogs.length,
            blogs
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= GET SINGLE BLOG =================

const getSingleBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
            .populate("author", "name email");

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        res.json({
            success: true,
            blog
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= UPDATE BLOG =================

const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        if (blog.author.toString() !== req.user.userId) {
            return res.status(403).json({
                success: false,
                message: "You can only update your own blog"
            });
        }

        const {
            title,
            content,
            authorName,
            tags,
            blogImage
        } = req.body;

        if (title !== undefined) {
            blog.title = title;
        }

        if (content !== undefined) {
            blog.content = content;
        }

        if (authorName !== undefined) {
            blog.authorName = authorName;
        }

        if (tags !== undefined) {
            blog.tags = tags;
        }

        if (blogImage !== undefined) {
            blog.blogImage = blogImage;
        }

        await blog.save();

        res.json({
            success: true,
            message: "Blog updated successfully",
            blog
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= DELETE BLOG =================

const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        if (blog.author.toString() !== req.user.userId) {
            return res.status(403).json({
                success: false,
                message: "You can only delete your own blog"
            });
        }

        await Blog.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Blog deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog
};