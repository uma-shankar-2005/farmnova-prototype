const axios = require('axios');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions';

const getPriceSuggestions = async (productType, marketData) => {
    const prompt = `Suggest a smart price for a ${productType} based on the following market data: ${JSON.stringify(marketData)}`;

    try {
        const response = await axios.post(OPENAI_API_URL, {
            prompt: prompt,
            max_tokens: 50,
            n: 1,
            stop: null,
            temperature: 0.5,
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('Error fetching price suggestions:', error);
        throw new Error('Could not fetch price suggestions');
    }
};

module.exports = {
    getPriceSuggestions,
};