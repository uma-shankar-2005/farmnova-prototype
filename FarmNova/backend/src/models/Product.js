const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    deliveryDays: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        default: "Pending"
    },
    farm: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

productSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;