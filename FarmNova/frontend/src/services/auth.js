import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

const register = async (userData) => {
    const response = await axios.post(`${API_URL}register`, userData);
    return response.data;
};

export function login(credentials) {
    // Implement your login logic here
    // Example:
    // return fetch('/api/login', { method: 'POST', body: JSON.stringify(credentials) });
}

export function registerUser(userData) {
    // Implement your registration logic here
    // Example:
    // return fetch('/api/register', { method: 'POST', body: JSON.stringify(userData) });
}

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const authService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default authService;