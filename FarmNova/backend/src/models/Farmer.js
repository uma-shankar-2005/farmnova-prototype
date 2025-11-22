const mongoose = require('mongoose');

const FarmerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "farmer" } // Add this field if not present
});

module.exports = mongoose.model('Farmer', FarmerSchema);
