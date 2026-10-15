const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env vars FIRST
dotenv.config();

const connectDB = require('./config/db');
const seedTests = require('./seed');
const parseAndSeed = require('./parseOCR');

// Connect to DB and start server
connectDB().then(() => {
  const app = express();

  // Middleware
  app.use(cors({
    origin: '*',
    credentials: true
  }));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Routes
  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/tests', require('./routes/tests'));
  app.use('/api/analytics', require('./routes/analytics'));
  app.use('/api/ai', require('./routes/ai'));
  app.use('/api/admin', require('./routes/admin'));
  app.use('/api/live-classes', require('./routes/liveClasses'));
  app.use('/api/cat', require('./routes/cat'));

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'NursingOfficerTraining API is running 🏥' });
  });

  // Direct Reseed endpoint
  app.get('/api/reseed', async (req, res) => {
    try {
      console.log('[RESEED] Triggering authentic topic seeding via /api/reseed...');
      const { seedDatabase } = require('./seedAllUnits');
      const result = await seedDatabase();
      res.json({ success: true, message: 'Seeding completed', result });
    } catch (err) {
      console.error('[RESEED] Error:', err);
      res.status(500).json({ error: err.message });
    }
  });

  // Seed data on boot
  seedTests();
  parseAndSeed();
  require('./seedDashboard')();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
