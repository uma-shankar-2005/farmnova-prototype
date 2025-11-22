# FarmNova Backend

## Overview
FarmNova is a fully functional e-commerce platform that connects farmers directly to consumers. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js), it supports both B2B and B2C transactions, offering features like subscription boxes, real-time market prices, and AI-powered services.

## Features
- **Weekly Subscription Box System**: Users can subscribe to receive a curated box of fresh farm produce weekly, with options to add or remove items.
- **Real-Time Market Price Integration**: Fetch and display live mandi prices and price trends on product pages.
- **Weather Report Integration**: Display live weather data based on user location using the OpenWeatherMap API.
- **AI-Powered Price Suggestions**: Smart price suggestions for farmers based on product type and market data.
- **AI Chatbot Support**: Real-time support for farmers and consumers through an integrated chatbot.
- **Role-Based Access Control**: Different access levels for Admins, Farmers, and Consumers.

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- Docker (optional)

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/FarmNova.git
   ```
2. Navigate to the backend directory:
   ```
   cd FarmNova/backend
   ```
3. Install dependencies:
   ```
   npm install
   ```

### Configuration
- Create a `.env` file based on the `.env.example` provided and set your environment variables.

### Running the Application
- Start the server:
   ```
   npm start
   ```
- The server will run on `http://localhost:5000`.

### Docker
To run the backend using Docker, build the Docker image:
```
docker build -t farmnova-backend .
```
Then run the container:
```
docker run -p 5000:5000 farmnova-backend
```

## API Documentation
Refer to the individual controller files for detailed API endpoints and usage.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.