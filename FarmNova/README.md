# FarmNova

FarmNova is a fully functional, production-grade E-Commerce platform built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This platform connects farmers directly to consumers, supporting both B2B listings and fast B2C delivery.

## Key Features

1. **Weekly Subscription Box System**: 
   - Users can subscribe to receive a curated box of fresh farm produce weekly.
   - Users can add or remove items from their subscription box.

2. **Real-Time Market Price Integration**: 
   - Fetch and display live mandi prices via public APIs.
   - Show price trends on product pages.

3. **Weather Report Integration**: 
   - Displays live weather data based on the user's location using the OpenWeatherMap API.

4. **AI-Powered Price Suggestions**: 
   - Suggest smart prices for farmers based on product type and market data using AI.

5. **AI Chatbot Support**: 
   - Provides real-time support for both farmers and consumers through an integrated chatbot.

6. **Role-Based Access Control**: 
   - Admin: Manage users, products, and analytics.
   - Farmer: Add/edit inventory, pricing, and view orders.
   - Consumer: Browse products, subscribe, order, and chat.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS or Material UI
- **Backend**: Node.js, Express.js, MongoDB
- **Mobile**: React Native (optional)

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Docker (for containerization)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd FarmNova
   ```

2. Set up the backend:
   - Navigate to the `backend` directory.
   - Install dependencies:
     ```
     npm install
     ```
   - Configure your environment variables in `.env`.
   - Start the server:
     ```
     npm start
     ```

3. Set up the frontend:
   - Navigate to the `frontend` directory.
   - Install dependencies:
     ```
     npm install
     ```
   - Start the React application:
     ```
     npm start
     ```

4. (Optional) Set up the mobile app:
   - Navigate to the `mobile` directory.
   - Install dependencies:
     ```
     npm install
     ```
   - Start the React Native application:
     ```
     npm start
     ```

## Docker

To run the application using Docker, use the provided `docker-compose.yml` file. This will set up both the backend and frontend services.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License. See the LICENSE file for details.