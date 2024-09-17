const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection string
const mongoUri = 'mongodb+srv://sivanesandh:HsncXijCJsAE2tD2@buddy-cluster.5dpdf.mongodb.net/?retryWrites=true&w=majority&appName=Buddy-Cluster';

if (!mongoUri) {
  console.error('Error: MongoDB connection string is undefined. Please check the .env file.');
  process.exit(1); // Exit the process if the connection string is missing
}

// Connect to MongoDB without deprecated options
mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const protectedRoutes = require('./routes/protected');
app.use('/api', protectedRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
