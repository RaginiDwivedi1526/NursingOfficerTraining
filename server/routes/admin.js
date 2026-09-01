const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Test = require('../models/Test');
const TestResult = require('../models/TestResult');
const { protect, adminOnly } = require('../middleware/auth');

// GET /api/admin/stats
// Get platform statistics
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: { $ne: 'admin' } });
    const totalTests = await Test.countDocuments();
    const totalResults = await TestResult.countDocuments();
    
    // Get role distribution
    const roleStats = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);

    // Get recent students
    const recentStudents = await User.find({ role: { $ne: 'admin' } })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name examGoal enrolledCourses createdAt batch status');

    // Aggregate Exam Goals
    const examGoalsAgg = await User.aggregate([
      { $match: { role: { $ne: 'admin' }, examGoal: { $ne: null } } },
      { $group: { _id: '$examGoal', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    const examGoals = examGoalsAgg.map((g, i) => {
      const colors = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
      return {
        label: g._id,
        num: g.count,
        pct: Math.round((g.count / (totalUsers || 1)) * 100),
        color: colors[i % colors.length]
      };
    });

    // Aggregate Performance (Test Results over last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const performanceAgg = await TestResult.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      { 
        $group: { 
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          attempts: { $sum: 1 },
          avgScore: { $avg: "$score" }
        } 
      },
      { $sort: { _id: 1 } }
    ]);

    const perfLabels = performanceAgg.map(p => p._id);
    const perfAttempts = performanceAgg.map(p => p.attempts);
    const perfScores = performanceAgg.map(p => Math.round(p.avgScore));

    res.json({
      totalUsers,
      totalTests,
      totalResults,
      roleStats,
      recentStudents,
      examGoals,
      performance: {
        labels: perfLabels.length ? perfLabels : ['No Data'],
        attempts: perfAttempts.length ? perfAttempts : [0],
        scores: perfScores.length ? perfScores : [0],
        active: perfAttempts.length ? perfAttempts : [0] // Mocking active students with attempts for now
      },
      revenue: {
        labels: perfLabels.length ? perfLabels : ['No Data'],
        data: perfAttempts.map(a => a * 1500) // Mock calculation for now
      }
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

// POST /api/admin/students
// Create a new student (admin-only)
router.post('/students', protect, adminOnly, async (req, res) => {
  try {
    const {
      // Personal
      firstName, lastName, email, phone, dob, gender, category, address, profilePhoto,
      // Emergency contact
      emergencyContact,
      // Academic
      qualification, college, passingYear, registrationNo, examGoal, batch,
      // Enrollments
      enrolledCourses,
      // Login & Access
      password, role,
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'First name, last name, email, and password are required.' });
    }

    // Check duplicate email
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(400).json({ message: 'A user with this email already exists.' });
    }

    const fullName = `${firstName.trim()} ${lastName.trim()}`;

    const user = await User.create({
      name:         fullName,
      firstName:    firstName.trim(),
      lastName:     lastName.trim(),
      email:        email.toLowerCase().trim(),
      password,                          // hashed by pre-save hook
      phone:        phone || '',
      dob:          dob ? new Date(dob) : undefined,
      gender:       gender || '',
      category:     category || '',
      address:      address || '',
      profilePhoto: profilePhoto || '',
      emergencyContact: {
        name:         emergencyContact?.name || '',
        relationship: emergencyContact?.relationship || '',
        phone:        emergencyContact?.phone || '',
      },
      qualification:  qualification || '',
      college:        college || '',
      passingYear:    passingYear || '',
      registrationNo: registrationNo || '',
      examGoal:       examGoal || '',
      batch:          batch || 'Batch 2025',
      enrolledCourses: Array.isArray(enrolledCourses) ? enrolledCourses : [],
      role:           role || 'free',
    });

    // Return user without password
    const { password: _pw, ...userOut } = user.toObject();
    res.status(201).json({ message: 'Student created successfully', user: userOut });
  } catch (error) {
    console.error('Create student error:', error);
    res.status(500).json({ message: error.message });
  }
});

// POST /api/admin/test-series
// Create a new test series (admin-only)
router.post('/test-series', protect, adminOnly, async (req, res) => {
  try {
    const {
      title, description, topic, difficulty, duration,
      examType, isFree, _meta,
    } = req.body;

    if (!title) return res.status(400).json({ message: 'Test series title is required.' });

    // Build a rich description with metadata
    const meta = _meta || {};
    const enrichedDesc = description || `Test series: ${title}`;

    const series = await Test.create({
      title,
      description: enrichedDesc,
      topic:       topic || meta.course || 'General',
      difficulty:  difficulty || meta.difficulty || 'medium',
      duration:    duration || meta.testDuration || 60,
      examType:    examType || 'nursing_officer',
      isFree:      isFree ?? false,
      questions:   [],   // Questions added separately
      // Store extra metadata in the document if needed
    });

    res.status(201).json({ message: 'Test series created successfully', series });
  } catch (error) {
    console.error('Create test series error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Temporary seed route
router.get('/seed-real-data', (req, res) => {
  const { exec } = require('child_process');
  exec('node seedAllUnits.js', { cwd: require('path').join(__dirname, '..') }, (error, stdout, stderr) => {
    res.json({ error: error ? error.message : null, stdout, stderr });
  });
});

router.get('/test-students', async (req, res) => {
  try {
    const students = await User.find({ role: { $ne: 'admin' } });
    res.json({ count: students.length, students });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
