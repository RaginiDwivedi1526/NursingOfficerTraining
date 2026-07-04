const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Test = require('../models/Test');
const TestResult = require('../models/TestResult');
const { protect, adminOnly } = require('../middleware/auth');

// GET /api/admin/stats
// Get platform statistics
router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTests = await Test.countDocuments();
    const totalResults = await TestResult.countDocuments();
    
    // Get role distribution
    const roleStats = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);

    res.json({
      totalUsers,
      totalTests,
      totalResults,
      roleStats
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/admin/users
// Get all users
router.get('/users', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/admin/users/:id/role
// Update user role
router.put('/users/:id/role', protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.role = req.body.role || user.role;
    await user.save();
    res.json({ message: 'User role updated', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/admin/users/:id
// Delete user
router.delete('/users/:id', protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    await user.deleteOne();
    res.json({ message: 'User removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/admin/tests
// Get all tests with full details
router.get('/tests', protect, adminOnly, async (req, res) => {
  try {
    const tests = await Test.find({}).sort({ createdAt: -1 });
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
