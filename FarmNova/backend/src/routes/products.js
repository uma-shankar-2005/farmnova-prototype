const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth');
const Product = require('../models/Product'); // You must have a Product model

const upload = multer({ storage: multer.memoryStorage() });

// GET /api/products/featured?lat=...&lng=... or ?pin=...
router.get('/featured', async (req, res) => {
  // ...fetch and filter products as needed...
  res.json([]); // Always return an array (replace [] with your products array)
});

// Farmer uploads product (with image)
router.post('/upload', auth("farmer"), upload.single('image'), async (req, res) => {
  try {
    // For demo: store image as base64 or use cloud storage in production
    let imageUrl = "";
    if (req.file) {
      imageUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    }
    const { name, price, quantity, category, description, deliveryDays } = req.body;
    const product = new Product({
      name,
      price,
      quantity,
      category,
      description,
      deliveryDays,
      image: imageUrl,
      status: "Pending",
      farm: req.user.id // or req.user.username, as needed
    });
    await product.save();
    res.json({ message: "Product uploaded for admin approval." });
  } catch (err) {
    res.status(500).json({ message: "Product upload failed." });
  }
});

// Get products, filter by status if provided
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    // Debug: log the filter and found products
    const filter = status ? { status } : {};
    const products = await Product.find(filter);
    console.log("Product filter:", filter);
    console.log("Products found:", products.length);
    res.json(products);
  } catch (err) {
    console.error("Error in /api/products:", err);
    res.status(500).json([]);
  }
});

// Add this route to update product status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    await Product.findByIdAndUpdate(req.params.id, { status });
    res.json({ message: "Status updated" });
  } catch {
    res.status(500).json({ message: "Failed to update status" });
  }
});

// Admin-only: Approve a product by ID
router.post('/:id/approve', auth("admin"), async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { status: "Approved" },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product approved", product });
  } catch (err) {
    res.status(500).json({ message: "Failed to approve product" });
  }
});

module.exports = router;