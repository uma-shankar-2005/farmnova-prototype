const express = require('express');
const router = express.Router();
const { getPriceSuggestions, createAISomething } = require('../controllers/aiController');

// Route for getting AI-powered price suggestions
router.get('/price-suggestions/:productId', getPriceSuggestions);

// Route for creating AI something
router.post('/', createAISomething);

module.exports = router;