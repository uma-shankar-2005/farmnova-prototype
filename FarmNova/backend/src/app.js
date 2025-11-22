require('dotenv').config();
// Make sure your backend server is running and listening on port 5000
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const chatRoutes = require('./routes/chatRoutes');
const aiRoutes = require('./routes/aiRoutes');
const errorHandler = require('./middleware/errorHandler');
const ordersRouter = require('./routes/orders');
const aiChatRouter = require('./routes/ai-chat');
const priceSuggestionRouter = require('./routes/price-suggestion');
const adminRouter = require('./routes/admin');
const farmersRouter = require('./routes/farmers');
const productsRouter = require('./routes/products');
const reviewsRouter = require('./routes/reviews');
const subscribeRouter = require('./routes/subscribe');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
const mongoURI = 'mongodb://localhost:27017/farmnova'; // Change 'farmnova' if needed
console.log('Connecting to MongoDB at:', mongoURI);

mongoose.connect('mongodb://localhost:27017/farmnova', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/ai-chat', aiChatRouter);
app.use('/api/price-suggestion', priceSuggestionRouter);
app.use('/api/admin', adminRouter);
app.use('/api/farmers', farmersRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/subscribe', subscribeRouter);

// Error handling middleware
app.use(errorHandler);

// Remove any usage of util._extend and replace with Object.assign if present
// Example replacement:
// const obj = util._extend({}, source); // deprecated
// const obj = Object.assign({}, source); // recommended

// If you do not use util._extend directly, you can ignore this warning as it may come from a dependency.

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});