const express = require('express'); // Import Express
const mongoose = require('mongoose'); // Import Mongoose for MongoDB interaction
const dotenv = require('dotenv'); // Import dotenv to manage environment variables
const cors = require('cors'); // Import cors for Cross-Origin Resource Sharing
const morgan = require('morgan'); // Import Morgan for logging
const authRoutes = require('./routes/authRoutes'); // Import authentication routes
const assetRoutes = require('./routes/assetRoutes'); // Import asset management routes

// Load environment variables from .env file
dotenv.config();

// Create an instance of Express
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON requests
app.use(morgan('dev')); // Use Morgan to log requests in 'dev' format

// Define routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/assets', assetRoutes); // Asset management routes

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to Database')
        // Start the server once the database connection is successful
        app.listen(process.env.PORT || 5500, () => {
        console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
    }).catch((error) => {
    // Log any connection error
        console.error('MongoDB connection error:', error);
    });

// Handle 404 errors for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});
