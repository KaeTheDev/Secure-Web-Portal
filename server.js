// Import Libraries
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // DB Connection
const userRoutes = require('./routes/userRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express App
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies

// Test route to confirm server is running
app.get('/', (req, res) => {
    res.send('Server is running! 🚀');
});

// Mount User and Bookmark routes
app.unsubscribe('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
});