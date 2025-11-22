const aiService = require('../services/aiService');

exports.getPriceSuggestions = async (req, res) => {
    try {
        const { productType } = req.body;
        const suggestions = await aiService.getPriceSuggestions(productType);
        res.status(200).json(suggestions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching price suggestions', error });
    }
};

exports.getChatbotResponse = async (req, res) => {
    try {
        const { message } = req.body;
        const response = await aiService.getChatbotResponse(message);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching chatbot response', error });
    }
};

const aiHandler = (req, res) => {
    res.status(200).json({ message: 'aiHandler called' });
};

const getPriceSuggestions = (req, res) => {
    res.status(200).json({ message: 'getPriceSuggestions called' });
};

const createAISomething = (req, res) => {
    res.status(200).json({ message: 'createAISomething called' });
};

module.exports = {
    getPriceSuggestions,
    createAISomething
};