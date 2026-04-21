const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  
  // Debug: verify JWT_SECRET is loaded
  if (!process.env.JWT_SECRET) {
    console.error('[CRITICAL] JWT_SECRET is not defined in environment variables!');
  }

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        console.warn(`[AUTH] Token valid but user ${decoded.id} not found in DB.`);
        return res.status(401).json({ message: 'User no longer exists. Please log in again.' });
      }
      
      return next();
    } catch (error) {
      console.error('[AUTH] Token Verification Failed:', error.name, '-', error.message);
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Session expired. Please log in again.' });
      }
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const premiumOnly = (req, res, next) => {
  if (req.user && ['standard', 'pro'].includes(req.user.role)) {
    next();
  } else {
    res.status(403).json({ message: 'Premium feature. Upgrade your plan.' });
  }
};

const proOnly = (req, res, next) => {
  if (req.user && req.user.role === 'pro') {
    next();
  } else {
    res.status(403).json({ message: 'Pro feature. Upgrade to Pro plan.' });
  }
};

module.exports = { protect, premiumOnly, proOnly };
