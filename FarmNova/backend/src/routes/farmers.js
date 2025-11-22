const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Farmer = require('../models/Farmer');
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const auth = require('../middleware/auth');

// Registration with validation
router.post('/register', async (req, res) => {
  try {
    const { username, password, email, role } = req.body;
    if (!username || !password || !email) {
      return res.status(400).json({ message: "All fields are required." });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }
    const existing = await Farmer.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      return res.status(409).json({ message: "Username or email already exists." });
    }
    const hashed = await bcrypt.hash(password, 10);
    const farmer = new Farmer({ username, email, password: hashed, role: role || "farmer" });
    await farmer.save();
    return res.json({ message: "Registration successful" });
  } catch (err) {
    console.error("Farmer registration error:", err);
    return res.status(500).json({ message: "Server error. Please try again." });
  }
});

// Login with JWT
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
    }
    const farmer = await Farmer.findOne({
      $or: [{ username }, { email: username }]
    });
    if (!farmer) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const match = await bcrypt.compare(password, farmer.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: farmer._id, role: farmer.role }, JWT_SECRET, { expiresIn: "7d" });
    return res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error. Please try again." });
  }
});

// Password reset request (send token)
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const farmer = await Farmer.findOne({ email });
    if (!farmer) {
      return res.status(404).json({ message: "No user with that email." });
    }
    // Generate a reset token (short-lived JWT)
    const resetToken = jwt.sign({ id: farmer._id }, JWT_SECRET, { expiresIn: "15m" });
    // In production, send this token via email
    // For demo, return it in response
    return res.json({ message: "Reset link sent.", resetToken });
  } catch (err) {
    console.error("Forgot password error:", err);
    return res.status(500).json({ message: "Server error." });
  }
});

// Password reset (with token)
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token and new password required." });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    const farmer = await Farmer.findById(decoded.id);
    if (!farmer) {
      return res.status(404).json({ message: "User not found." });
    }
    farmer.password = await bcrypt.hash(newPassword, 10);
    await farmer.save();
    return res.json({ message: "Password reset successful." });
  } catch (err) {
    console.error("Reset password error:", err);
    return res.status(400).json({ message: "Invalid or expired token." });
  }
});

// Example: Protect a farmer-only route
router.get('/my-products', auth("farmer"), async (req, res) => {
  // ...existing code...
  res.json([]);
});

module.exports = router;