const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const phoneRoutes = require('./routes/phoneRoutes');

dotenv.config();

const app = express();

app.use(cors({
    origin: 'https://cricketoracle.info', // Your live frontend
    methods: ['GET', 'POST'],
  }));

// Middleware
app.use(express.json());

const rateLimit = require('express-rate-limit');
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per IP
}));

// Routes
app.use('/api', phoneRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});