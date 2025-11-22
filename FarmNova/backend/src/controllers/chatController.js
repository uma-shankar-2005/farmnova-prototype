const Chat = require('../models/Chat');

// Function to create a new chat
const createChat = (req, res) => {
    res.status(200).json({ message: 'createChat called' });
};

const getChat = (req, res) => {
    res.status(200).json({ message: 'getChat called' });
};

const updateChat = (req, res) => {
    res.status(200).json({ message: 'updateChat called' });
};

const deleteChat = (req, res) => {
    res.status(200).json({ message: 'deleteChat called' });
};

module.exports = {
    createChat,
    getChat,
    updateChat,
    deleteChat
};