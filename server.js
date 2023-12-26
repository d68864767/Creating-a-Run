const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const threadsRoutes = require('./routes/threads');
const runsRoutes = require('./routes/runs');
const db = require('./config/database');

// Load environment variables from .env file
dotenv.config();

// Initialize the app
const app = express();

// Connect to the database
db.connect();

// Use body-parser middleware to parse incoming json requests
app.use(bodyParser.json());

// Use the routes
app.use('/threads', threadsRoutes);
app.use('/runs', runsRoutes);

// Handle 404
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// Handle errors
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

// Set the port from the environment variable or default to 3000
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
