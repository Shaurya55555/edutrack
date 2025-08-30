// Import required modules
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Connect to the MongoDB database
connectDB();

// Initialize the Express application
const app = express();

// --- Middleware ---

// Enable Cross-Origin Resource Sharing (CORS) to allow requests from the React frontend
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

// --- API Routes ---

// Basic health check endpoint to verify the server is running
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Mount routers for specific API endpoints
// All student-related routes will be prefixed with /api/students
app.use('/api/students', require('./routes/studentRoutes'));
// All authentication-related routes will be prefixed with /api/auth
app.use('/api/auth', require('./routes/authRoutes'));


// --- 404 Not Found Handler ---
// This middleware will catch any request that doesn't match a defined route
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});


// --- Server Initialization ---

// Determine the port to run the server on, defaulting to 5000 if not specified in the .env file
const PORT = process.env.PORT || 5000;

// Start the server and listen for incoming connections
app.listen(PORT, () => {
  console.log(`🚀 Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
