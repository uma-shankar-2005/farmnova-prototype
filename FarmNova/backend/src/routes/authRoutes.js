const express = require('express');
const router = express.Router();
// Make sure the path and function name match your controller file
const { loginUser } = require('../controllers/authController');

router.post('/login', loginUser);

module.exports = router;