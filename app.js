require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();


// Database
connectDB();


// Middleware
app.use(express.json());
app.use(cookieParser());


// Home
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Blog Management System API is running"
    });
});


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});