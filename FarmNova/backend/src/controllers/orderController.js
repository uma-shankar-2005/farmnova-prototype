const Order = require('../models/Order');

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const { user, products } = req.body;
        const newOrder = new Order({ user, products, status: 'Pending' });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user products');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order', error });
    }
};

// Get all orders for a user
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate('products');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error updating order', error });
    }
};

const createOrder = (req, res) => {
    // Example implementation
    res.json({ message: 'Order created successfully' });
};

// Add this function if you want to export getOrderById
const getOrderById = (req, res) => {
    // Example implementation, replace with your logic
    res.json({ message: 'Get order by ID' });
};

// Add this function if you want to export getUserOrders
const getUserOrders = (req, res) => {
    // Example implementation, replace with your logic
    res.json({ message: 'Get user orders' });
};

// Add this function if you want to export updateOrderStatus
const updateOrderStatus = (req, res) => {
    // Example implementation, replace with your logic
    res.json({ message: 'Order status updated' });
};

module.exports = {
    createOrder,
    getOrderById,
    getUserOrders,
    updateOrderStatus,
};