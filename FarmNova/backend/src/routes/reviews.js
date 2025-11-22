const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Review = require('../models/Review');

// Add a review for a product or farmer
router.post('/', auth("customer"), async (req, res) => {
  try {
    const { productId, farmerId, rating, comment } = req.body;
    const review = new Review({
      productId,
      farmerId,
      customerId: req.user.id,
      customerName: req.user.username,
      rating,
      comment
    });
    await review.save();
    res.json({ message: "Review submitted" });
  } catch {
    res.status(500).json({ message: "Failed to submit review" });
  }
});

// Get reviews for a product
router.get('/product/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId });
    res.json(reviews);
  } catch {
    res.status(500).json([]);
  }
});

// Get reviews for a farmer
router.get('/farmer/:farmerId', async (req, res) => {
  try {
    const reviews = await Review.find({ farmerId: req.params.farmerId });
    res.json(reviews);
  } catch {
    res.status(500).json([]);
  }
});

module.exports = router;
