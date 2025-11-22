const express = require('express');
const { 
    createProduct, 
    getAllProducts, 
    getProductById,
    editProduct
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   POST /api/products
// @desc    Create a new product
// @access  Private (Farmer)
router.post('/', protect, authorize('farmer'), createProduct);

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', getAllProducts);

// @route   GET /api/products/:id
// @desc    Get a product by ID
// @access  Public
router.get('/:id', getProductById);

// @route   DELETE /api/products/:id
// @desc    Delete a product
// @access  Private (Farmer)
// router.delete('/:id', protect, authorize('farmer'), deleteProduct);

module.exports = router;