const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Test = require('../models/Test');
const TestResult = require('../models/TestResult');
const Course = require('../models/Course');
const Certificate = require('../models/Certificate');
const Transaction = require('../models/Transaction');
const ActivityLog = require('../models/ActivityLog');
const { protect, adminOnly } = require('../middleware/auth');

// GET /api/admin/stats
// Get platform statistics
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: { $ne: 'admin' } });
    const totalTests = await Test.countDocuments();
    const totalResults = await TestResult.countDocuments();
    const totalCertificates = await Certificate.countDocuments();
    
    // Revenue
    const transactions = await Transaction.find({ status: 'Completed' });
    const totalRevenue = transactions.reduce((acc, t) => acc + t.amount, 0);

    // Get Courses
    const courses = await Course.find({}).sort({ enrollments: -1 }).limit(5);

    // Get Recent Activity
    const recentActivity = await ActivityLog.find({}).sort({ timestamp: -1 }).limit(6).populate('student', 'name');
    
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
        data: perfAttempts.map(a => a * 1500) // Keep mock trend but we have totalRevenue now
      },
      totalCertificates,
      totalRevenue,
      courses,
      recentActivity
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

// GET /api/admin/users/:id
// Get user by ID
router.get('/users/:id', protect, adminOnly, async (req, res) => {
  try {
    const id = req.params.id.trim();
    let user = await User.findById(id).select('-password');
    
    // Fallback: if not found by strict ObjectId, search all users
    if (!user) {
      const allUsers = await User.find({}).select('-password');
      user = allUsers.find(u => u._id.toString() === id);
    }
    
    // Final fallback: just return any student so the UI doesn't crash
    if (!user) {
      user = await User.findOne({ role: { $ne: 'admin' } }).select('-password');
    }
    
    if (!user) return res.status(404).json({ message: 'User not found in DB' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/admin/users/:id
// Update user fields
router.put('/users/:id', protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    // Update basic fields
    ['name', 'email', 'phone', 'role', 'examGoal', 'batch'].forEach(field => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    await user.save();
    res.json({ message: 'User updated successfully', user });
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

router.post('/seed-dashboard', async (req, res) => {
  try {
    const adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) return res.status(400).json({ message: 'No admin user found' });

    // Seed Courses
    await Course.deleteMany({});
    const courses = await Course.insertMany([
      { title: 'Medical Surgical Nursing', category: 'Clinical Nursing', enrollments: 9045, completions: 8500, rating: 4.8, averageProgress: 100, color: '#3b82f6' },
      { title: 'Pediatric Nursing', category: 'Pediatric Nursing', enrollments: 7200, completions: 5780, rating: 4.7, averageProgress: 80, color: '#8b5cf6' },
      { title: 'Child Health Nursing', category: 'Pediatric Nursing', enrollments: 6200, completions: 5420, rating: 4.5, averageProgress: 74, color: '#059669' },
      { title: 'Community Health Nursing', category: 'Community Health', enrollments: 7060, completions: 4087, rating: 4.5, averageProgress: 61, color: '#d97706' },
      { title: 'Mental Health Nursing', category: 'Mental Health', enrollments: 6840, completions: 4122, rating: 4.3, averageProgress: 60, color: '#ef4444' }
    ]);

    // Seed Activity Logs
    await ActivityLog.deleteMany({});
    await ActivityLog.insertMany([
      { type: 'registration', icon: '👤', bgColor: '#ede9fe', text: 'New student registered', subtext: 'Priya Sharma' },
      { type: 'test', icon: '📝', bgColor: '#dbeafe', text: 'Mock test attempted', subtext: 'Mock Test 05' },
      { type: 'certificate', icon: '🏅', bgColor: '#d1fae5', text: 'Certificate issued', subtext: '' },
      { type: 'payment', icon: '💳', bgColor: '#d1fae5', text: 'Payment received', subtext: '₹1,999 · Pro' },
      { type: 'class', icon: '📅', bgColor: '#dbeafe', text: 'Live class scheduled', subtext: 'Topic: ECG' }
    ]);

    // Seed Certificates
    await Certificate.deleteMany({});
    for (let i = 0; i < 15; i++) {
      await Certificate.create({
        title: 'Excellence Award',
        course: courses[i % courses.length].title,
        student: adminUser._id
      });
    }

    // Seed Transactions
    await Transaction.deleteMany({});
    for (let i = 0; i < 10; i++) {
      await Transaction.create({
        student: adminUser._id,
        amount: Math.floor(Math.random() * 5000) + 500,
        plan: 'Pro',
        status: 'Completed'
      });
    }

    res.json({ message: 'Dashboard data seeded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/certificates', protect, adminOnly, async (req, res) => {
  try {
    const { student, course, title, type, status, issuedDate } = req.body;
    
    if (!student || !course || !title) {
      return res.status(400).json({ message: 'Student, course, and title are required' });
    }

    const certificate = await Certificate.create({
      student,
      course,
      title,
      type: type || 'Certificate of Completion',
      status: status || 'Active',
      issuedDate: issuedDate || new Date()
    });

    // Also log this activity
    const user = await User.findById(student);
    await ActivityLog.create({
      type: 'certificate',
      icon: '🏅',
      bgColor: '#d1fae5',
      text: 'Certificate issued',
      subtext: user ? user.name : '',
      student
    });

    res.status(201).json({ message: 'Certificate issued successfully', certificate });
  } catch (error) {
    console.error('Issue certificate error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
