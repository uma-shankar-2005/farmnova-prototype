const express = require('express');
const router = express.Router();
const { 
    createOrder, 
    getOrderById, 
    getUserOrders, 
    updateOrderStatus 
} = require('../controllers/orderController');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

// Create a new order
router.post('/', createOrder);

// Get a specific order by ID
router.get('/:id', getOrderById);

// Get all orders for the authenticated user
router.get('/user/:userId', getUserOrders);

module.exports = router;