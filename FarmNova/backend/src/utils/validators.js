const { body, validationResult } = require('express-validator');

const validateUserRegistration = [
    body('username').notEmpty().withMessage('Username is required').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('email').isEmail().withMessage('Email is not valid'),
];

const validateUserLogin = [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
];

const validateProduct = [
    body('name').notEmpty().withMessage('Product name is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('category').notEmpty().withMessage('Category is required'),
];

const validateSubscription = [
    body('items').isArray().withMessage('Items must be an array'),
    body('frequency').notEmpty().withMessage('Frequency is required'),
];

const validateOrder = [
    body('products').isArray().withMessage('Products must be an array'),
    body('user').notEmpty().withMessage('User ID is required'),
];

const validateInput = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateUserRegistration,
    validateUserLogin,
    validateProduct,
    validateSubscription,
    validateOrder,
    validateInput,
};