// Import Libraries
const dotenv = require('dotenv');
// Load environment variables
dotenv.config();
const express = require('express');

const connectDB = require('./config/db'); // DB Connection
const passport = require('./config/passport');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes');

// Connect to MongoDBclear
connectDB();

// Create Express App
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies

// Session middleware
app.use(session({ secret: 'Shhhhsupersecret', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

// Test route to confirm server is running
app.get('/', (req, res) => {
    res.send('Server is running! 🚀');
});

// Mount User and Bookmark routes
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
});