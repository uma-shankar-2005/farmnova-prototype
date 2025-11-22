const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check for token in header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    // If no token, return unauthorized
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
});

// Grant access to specific roles
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized, no user' });
        }

        const hasRole = roles.includes(req.user.role);

        if (!hasRole) {
            return res.status(403).json({ message: 'Forbidden, you do not have the right role' });
        }

        next();
    };
};

module.exports = {
    protect,
    authorize,
};