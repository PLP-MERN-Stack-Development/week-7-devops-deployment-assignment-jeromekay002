const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const foodRoutes = require('./routes/food');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors({
  origin: "https://week-7-devops-deployment-assignment-topaz-eight.vercel.app/",
  credentials: true // only if needed
}));
app.use(express.json());
app.use(helmet());
app.use(morgan('combined'));

// ✅ Serve uploads folder statically with proper headers
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res, path) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin"); // ✅ This fixes Chrome/Edge
    },
  })
);

// MongoDB (mongoose) connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Atlas Connected Successfully");

    // Import and use routes
    app.use('/foods', foodRoutes);

    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Mongo connection error:', err);
  });

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
