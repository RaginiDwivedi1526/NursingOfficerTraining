const express = require('express');
const router = express.Router();
const LiveClass = require('../models/LiveClass');
const { protect, adminOnly } = require('../middleware/auth');
const meetService = require('../services/meetService');

// @route   GET /api/live-classes/auth-url
// @desc    Get Google OAuth URL for admin to authorize Calendar
// @access  Public (for easier setup)
router.get('/auth-url', (req, res) => {
  const url = meetService.getAuthUrl();
  res.json({ url });
});

// @route   GET /api/live-classes/oauth2callback
// @desc    Handle Google OAuth callback and display refresh token
// @access  Public (Used by Google Redirect)
router.get('/oauth2callback', async (req, res) => {
  try {
    const code = req.query.code;
    if (!code) return res.status(400).send('Code is required in the query parameters');
    
    const tokens = await meetService.getTokensFromCode(code);
    
    res.send(`
      <div style="font-family: sans-serif; padding: 20px;">
        <h2>Authorization Successful! ✅</h2>
        <p>Please copy the refresh token below and add it to your <strong>.env</strong> file:</p>
        <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; word-break: break-all; border: 1px solid #ccc;">
          <strong>GOOGLE_REFRESH_TOKEN=</strong>${tokens.refresh_token}
        </div>
        <p>After updating the .env file, you can close this window and restart your server.</p>
      </div>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send('Authentication failed: ' + err.message);
  }
});

// @route   GET /api/live-classes
// @desc    Get all live classes (upcoming and past)
// @access  Private (All authenticated users)
router.get('/', protect, async (req, res) => {
  try {
    const classes = await LiveClass.find().sort({ startTime: -1 });
    res.json(classes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/live-classes
// @desc    Schedule a new live class
// @access  Private (Admin only)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { title, description, startTime, duration } = req.body;
    
    // Check if refresh token is configured (basic check)
    if (!process.env.GOOGLE_REFRESH_TOKEN) {
      return res.status(400).json({ msg: 'Google Calendar integration is not fully set up. Missing GOOGLE_REFRESH_TOKEN.' });
    }

    // Create meeting in Google Meet
    const meetEvent = await meetService.createMeetEvent(title, description, startTime, duration);
    
    // Save to DB
    const newClass = new LiveClass({
      title,
      description,
      meetLink: meetEvent.meetLink,
      eventId: meetEvent.eventId,
      startTime,
      duration,
      createdBy: req.user.id
    });
    
    const savedClass = await newClass.save();
    res.json(savedClass);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error while scheduling class');
  }
});

// @route   DELETE /api/live-classes/:id
// @desc    Cancel a live class
// @access  Private (Admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
    try {
        const liveClass = await LiveClass.findById(req.params.id);
        
        if (!liveClass) {
            return res.status(404).json({ msg: 'Live class not found' });
        }
        
        // Delete from Google Calendar
        try {
           await meetService.deleteMeetEvent(liveClass.eventId);
        } catch(meetError) {
            console.error("Google Meet event could not be deleted or doesn't exist anymore");
        }

        await LiveClass.deleteOne({ _id: req.params.id });
        res.json({ msg: 'Live class cancelled' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
