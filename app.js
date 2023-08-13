// app.js
const express = require('express');
const app = express();
const router = require('./src/router/router');
const loggerMiddleware = require('./src/middleware/logger');
const connectToDatabase = require('./src/config/db'); // Import the database connection function
require('dotenv').config(); // Load environment variables from .env

app.use(express.json());

// Use the logger middleware before routes
app.use(loggerMiddleware);

app.use('/api', router);

// Call the database connection function
connectToDatabase().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
