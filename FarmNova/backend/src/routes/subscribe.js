const express = require('express');
const router = express.Router();
const db = require('../firebase');

function validateEmail(email) {
  // Simple email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email address." });
    }
    // Check for duplicate
    const snapshot = await db.collection("subscribers").where("email", "==", email).get();
    if (!snapshot.empty) {
      return res.status(409).json({ message: "Email already subscribed." });
    }
    await db.collection("subscribers").add({
      email,
      timestamp: new Date(),
    });
    res.json({ message: "Subscribed successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

module.exports = router;
