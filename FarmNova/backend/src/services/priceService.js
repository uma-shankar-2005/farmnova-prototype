const axios = require('axios');

const MANDI_API_URL = 'https://api.example.com/mandi-prices'; // Replace with actual API URL
const PRICE_HISTORY_API_URL = 'https://api.example.com/price-history'; // Replace with actual API URL

const fetchCurrentMarketPrice = async (productId) => {
    try {
        const response = await axios.get(`${MANDI_API_URL}?productId=${productId}`);
        return response.data.price;
    } catch (error) {
        throw new Error('Error fetching current market price');
    }
};

const fetchPriceTrends = async (productId) => {
    try {
        const response = await axios.get(`${PRICE_HISTORY_API_URL}?productId=${productId}`);
        return response.data.trends;
    } catch (error) {
        throw new Error('Error fetching price trends');
    }
};

module.exports = {
    fetchCurrentMarketPrice,
    fetchPriceTrends,
};