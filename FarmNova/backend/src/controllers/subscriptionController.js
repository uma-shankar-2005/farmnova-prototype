const Subscription = require('../models/Subscription');

// Create a new subscription
const createSubscription = async (req, res) => {
    try {
        const { userId, items, frequency } = req.body;
        const newSubscription = new Subscription({ user: userId, items, frequency });
        await newSubscription.save();
        res.status(201).json(newSubscription);
    } catch (error) {
        res.status(500).json({ message: 'Error creating subscription', error });
    }
};

// Get subscription details
const getSubscription = (req, res) => {
    res.json({ message: 'Get subscription' });
};

// Update subscription items
const updateSubscription = async (req, res) => {
    try {
        const { items } = req.body;
        const subscription = await Subscription.findByIdAndUpdate(
            req.params.subscriptionId,
            { items },
            { new: true }
        );
        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        res.status(200).json(subscription);
    } catch (error) {
        res.status(500).json({ message: 'Error updating subscription', error });
    }
};

// Delete subscription
const deleteSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.findByIdAndDelete(req.params.subscriptionId);
        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting subscription', error });
    }
};

module.exports = {
    createSubscription,
    getSubscription,
    updateSubscription,
    deleteSubscription
};