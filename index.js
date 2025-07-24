require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;
const url = process.env.MONGO_URI;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('combined'));

// Static folder for uploaded images (optional)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import routes
const foodRoutes = require('./routes/foods');

// Connect to MongoDB
MongoClient.connect(url)
  .then(client => {
    const db = client.db('foodDB');
    const foodCollection = db.collection('foods');

    // Store collection in app.locals for use in routes
    app.locals.foodCollection = foodCollection;

    // Use food routes
    app.use('/foods', foodRoutes);

    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Mongo connection error:', err);
  });

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
