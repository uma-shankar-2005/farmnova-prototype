const express = require('express');
const { createSubscription, getSubscription, updateSubscription, deleteSubscription } = require('../controllers/subscriptionController');
const { authMiddleware } = require('../middleware/auth');

// Debug: Log imported controller functions
console.log('createSubscription:', typeof createSubscription);
console.log('getSubscription:', typeof getSubscription);
console.log('updateSubscription:', typeof updateSubscription);
console.log('deleteSubscription:', typeof deleteSubscription);

const { authenticate, authorize } = require('../middleware/auth');
const router = express.Router();

// Create a new subscription
router.post('/', createSubscription);

// Get subscription details
router.get('/:id', getSubscription);

// Update subscription
router.put('/:id', updateSubscription);

// Delete subscription
router.delete('/:id', deleteSubscription);

module.exports = router;