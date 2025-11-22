const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['farmer', 'buyer', 'admin'],
        default: 'buyer',
    },
    // ...add more fields as needed...
}, {
    timestamps: true,
});

// Prevent OverwriteModelError in development
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
