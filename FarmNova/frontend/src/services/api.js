import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User authentication
export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

// Products
export const fetchProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export function getProducts() {
    return api.get('/products');
}

// Orders
export const createOrder = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

export const fetchOrders = async () => {
  const response = await api.get('/orders');
  return response.data;
};

// Subscriptions
export const fetchSubscriptions = async () => {
  const response = await api.get('/subscriptions');
  return response.data;
};

export const createSubscription = async (subscriptionData) => {
  const response = await api.post('/subscriptions', subscriptionData);
  return response.data;
};

// Add fetchSubscriptionItems
export const fetchSubscriptionItems = async () => {
    const response = await api.get('/subscriptions/items');
    return response.data;
};

// Add getOrders
export const getOrders = async () => {
    const response = await api.get('/orders');
    return response.data;
};

// Weather
export const fetchWeather = async (location) => {
  const response = await api.get(`/weather?location=${location}`);
  return response.data;
};

// AI Price Suggestions
export const fetchPriceSuggestions = async (productData) => {
  const response = await api.post('/ai/price-suggestions', productData);
  return response.data;
};

export const fetchAIPriceSuggestions = async (productId) => {
  const response = await api.get(`/ai/price-suggestions/${productId}`);
  return response.data;
};

// Chat
export const fetchChatHistory = async () => {
  const response = await api.get('/chat');
  return response.data;
};

export const sendMessage = async (messageData) => {
  const response = await api.post('/chat', messageData);
  return response.data;
};

export function getUserSubscriptions(userId) {
    return api.get(`/users/${userId}/subscriptions`);
}

export function getUsers() {
    // Example: return api.get('/users');
}

export function getWeather(location) {
    // Example: return api.get(`/weather?location=${location}`);
}

export default api;