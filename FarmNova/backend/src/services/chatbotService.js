const axios = require('axios');

const CHATBOT_API_URL = process.env.CHATBOT_API_URL; // URL for the chatbot API

// Function to send a message to the chatbot and receive a response
const sendMessageToChatbot = async (message) => {
    try {
        const response = await axios.post(CHATBOT_API_URL, { message });
        return response.data;
    } catch (error) {
        throw new Error('Error communicating with the chatbot API');
    }
};

// Function to handle chat interactions
const handleChatInteraction = async (userId, message) => {
    // Here you can implement logic to log the chat, manage sessions, etc.
    const response = await sendMessageToChatbot(message);
    return {
        userId,
        message,
        response,
    };
};

module.exports = {
    sendMessageToChatbot,
    handleChatInteraction,
};