const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const seedTests = require('./seed');
const parseAndSeed = require('./parseOCR');

// Load env vars
dotenv.config();

// Connect to DB and start server
connectDB().then(() => {
  const app = express();

  // Middleware
  app.use(cors({
    origin: '*',
    credentials: true
  }));
  app.use(express.json());

  // Routes
  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/tests', require('./routes/tests'));
  app.use('/api/analytics', require('./routes/analytics'));
  app.use('/api/ai', require('./routes/ai'));
  app.use('/api/admin', require('./routes/admin'));
  app.use('/api/live-classes', require('./routes/liveClasses'));

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'NursingOfficerTraining API is running 🏥' });
  });

  // Seed data on first run
  seedTests();
  parseAndSeed();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
