const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  farmerId: { type: String }, // optional, for farmer reviews
  customerId: { type: String, required: true },
  customerName: String,
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);
