const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, examTarget } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists with this email' });

    const user = await User.create({ name, email, password, phone, examTarget });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: error.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        batch: user.batch,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

// GET /api/auth/profile
router.get('/profile', protect, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.json(user);
});

// POST /api/auth/forgotpassword
router.post('/forgotpassword', async (req, res) => {
  try {
    const rawEmail = req.body.email || '';
    const email = rawEmail.trim().toLowerCase();

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'There is no user with that email address' });
    }

    // Get reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    // Set expire (10 minutes)
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    // Auto-detect frontend URL from request origin (e.g. http://localhost:5173), fallback to env
    let clientUrl = req.headers.origin;
    if (!clientUrl && req.headers.referer) {
      try {
        const parsed = new URL(req.headers.referer);
        clientUrl = parsed.origin;
      } catch (e) {
        // ignore
      }
    }
    if (!clientUrl) {
      clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    }
    // Remove trailing slash if present
    clientUrl = clientUrl.replace(/\/+$/, '');

    const resetUrl = `${clientUrl}/reset-password/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) requested a password reset for your Nursing Officer Training account.\n\nPlease visit the following link to reset your password:\n\n${resetUrl}\n\nThis link is valid for 10 minutes. If you did not request this, please ignore this email.`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <h2 style="color: #4f46e5; margin-bottom: 16px;">Nursing Officer Training 🏥</h2>
        <h3 style="color: #1e293b; margin-top: 0;">Password Reset Request</h3>
        <p style="color: #475569; font-size: 15px; line-height: 1.6;">
          You requested a password reset for your account. Click the button below to choose a new password:
        </p>
        <div style="margin: 28px 0;">
          <a href="${resetUrl}" style="background-color: #4f46e5; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p style="color: #64748b; font-size: 13px; line-height: 1.5;">
          This link will expire in <strong>10 minutes</strong>. If the button above does not work, copy and paste this link into your browser:
        </p>
        <p style="color: #4f46e5; font-size: 13px; word-break: break-all;">
          <a href="${resetUrl}" style="color: #4f46e5;">${resetUrl}</a>
        </p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
        <p style="color: #94a3b8; font-size: 12px;">
          If you did not request this password reset, please ignore this email or contact support if you have questions.
        </p>
      </div>
    `;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Password Reset Request - Nursing Officer Training',
        message,
        html
      });

      res.status(200).json({ success: true, data: 'Email sent' });
    } catch (err) {
      console.log('EMAIL ERROR:', err);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save({ validateBeforeSave: false });

      return res.status(500).json({ message: `Email could not be sent: ${err.message}` });
    }
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/auth/resetpassword/:token
router.put('/resetpassword/:token', async (req, res) => {
  try {
    // Get hashed token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
