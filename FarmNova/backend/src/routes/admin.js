const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');

// Protect all admin routes
router.get("/dashboard", auth("admin"), (req, res) => {
  res.json({ message: "Admin dashboard data" });
});

module.exports = router;
  

router.get("/farmers", (req, res) => {
  res.json([
    { _id: "1", name: "Ravi Kumar", farmName: "Green Valley", location: "Pune" },
    { _id: "2", name: "Sita Devi", farmName: "Fresh Farms", location: "Nashik" }
  ]);
});

router.post("/farmers/:id/approve", (req, res) => {
  // Approve logic here
  res.json({ success: true });
});

router.post("/farmers/:id/reject", (req, res) => {
  // Reject logic here
  res.json({ success: true });
});

// Protect all admin routes
router.get("/dashboard", auth("admin"), (req, res) => {
  res.json({ message: "Admin dashboard data" });
});

module.exports = router;
