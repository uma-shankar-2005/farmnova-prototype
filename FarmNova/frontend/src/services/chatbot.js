import axios from 'axios';

const API_URL = 'http://localhost:5000/api/chat'; // Adjust the URL as needed

export const sendMessage = async (message) => {
    try {
        const response = await axios.post(`${API_URL}/send`, { message });
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

export const getChatHistory = async () => {
    try {
        const response = await axios.get(`${API_URL}/history`);
        return response.data;
    } catch (error) {
        console.error('Error fetching chat history:', error);
        throw error;
    }
};