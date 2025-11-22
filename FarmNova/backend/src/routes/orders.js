const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');

// Store order (customer checkout)
router.post('/', auth("customer"), async (req, res) => {
  try {
    const { address, phone, pincode, slot, items, total, paymentId, paymentStatus } = req.body;
    const customerId = req.user.id;
    const customerName = req.user.username || "";
    const order = new Order({
      customerId,
      customerName,
      address,
      phone,
      pincode,
      slot,
      items,
      total,
      paymentId,
      paymentStatus
    });
    await order.save();
    res.json({ message: "Order placed successfully", orderId: order._id });
  } catch (err) {
    res.status(500).json({ message: "Failed to place order" });
  }
});

// Customer order history
router.get('/my', auth("customer"), async (req, res) => {
  try {
    const orders = await Order.find({ customerId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch {
    res.status(500).json([]);
  }
});

// Farmer sales/orders view
router.get('/farmer', auth("farmer"), async (req, res) => {
  try {
    // Find orders containing products from this farmer
    const farmerName = req.user.username;
    const orders = await Order.find({ "items.farm": farmerName }).sort({ createdAt: -1 });
    res.json(orders);
  } catch {
    res.status(500).json([]);
  }
});

// GET /api/orders/:id - fetch order details by order ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({
      _id: order._id,
      status: order.paymentStatus || "Ordered",
      statusHistory: order.statusHistory || [
        { status: "ordered", time: order.createdAt }
      ],
      items: order.items,
      total: order.total,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      address: order.address,
      slot: order.slot,
      paymentId: order.paymentId,
      paymentStatus: order.paymentStatus,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch order" });
  }
});

module.exports = router;