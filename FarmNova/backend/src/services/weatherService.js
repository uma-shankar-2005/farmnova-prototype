const axios = require('axios');

const API_KEY = process.env.OPENWEATHERMAP_API_KEY; // Ensure to set your API key in the environment variables

const getWeatherData = async (location) => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching weather data: ' + error.message);
    }
};

module.exports = {
    getWeatherData,
};