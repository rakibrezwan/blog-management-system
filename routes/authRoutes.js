const express = require("express");

const {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    logoutUser
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// Register
router.post("/register", registerUser);


// Login
router.post("/login", loginUser);


// Profile
router.get("/profile", authMiddleware, getProfile);


// Update Profile
router.put("/profile", authMiddleware, updateProfile);


// Logout
router.post("/logout", logoutUser);


module.exports = router;