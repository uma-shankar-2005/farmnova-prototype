const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authorizeRoles = (...roles) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id);

            if (!user || !roles.includes(user.role)) {
                return res.status(403).json({ message: 'Access denied' });
            }

            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    };
};

module.exports = authorizeRoles;