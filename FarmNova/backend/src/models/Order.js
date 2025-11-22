const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  customerName: String,
  address: String,
  phone: String,
  pincode: String,
  slot: String,
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
      farm: String
    }
  ],
  total: Number,
  paymentId: String,
  paymentStatus: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);