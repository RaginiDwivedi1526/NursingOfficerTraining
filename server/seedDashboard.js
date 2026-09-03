const mongoose = require('mongoose');
const User = require('./models/User');
const Course = require('./models/Course');
const Certificate = require('./models/Certificate');
const Transaction = require('./models/Transaction');
const ActivityLog = require('./models/ActivityLog');

const seedDashboard = async () => {
  try {
    console.log('Seeding dashboard data...');
    const adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
      console.log('No admin user found, skipping dashboard seed.');
      return;
    }

    const courseCount = await Course.countDocuments();
    if (courseCount > 0) {
      console.log('Dashboard data already seeded.');
      return;
    }

    await Course.deleteMany({});
    const courses = await Course.insertMany([
      { title: 'Medical Surgical Nursing', category: 'Clinical Nursing', enrollments: 9045, completions: 8500, rating: 4.8, averageProgress: 100, color: '#3b82f6' },
      { title: 'Pediatric Nursing', category: 'Pediatric Nursing', enrollments: 7200, completions: 5780, rating: 4.7, averageProgress: 80, color: '#8b5cf6' },
      { title: 'Child Health Nursing', category: 'Pediatric Nursing', enrollments: 6200, completions: 5420, rating: 4.5, averageProgress: 74, color: '#059669' },
      { title: 'Community Health Nursing', category: 'Community Health', enrollments: 7060, completions: 4087, rating: 4.5, averageProgress: 61, color: '#d97706' },
      { title: 'Mental Health Nursing', category: 'Mental Health', enrollments: 6840, completions: 4122, rating: 4.3, averageProgress: 60, color: '#ef4444' }
    ]);

    await ActivityLog.deleteMany({});
    await ActivityLog.insertMany([
      { type: 'registration', icon: '👤', bgColor: '#ede9fe', text: 'New student registered', subtext: 'Priya Sharma' },
      { type: 'test', icon: '📝', bgColor: '#dbeafe', text: 'Mock test attempted', subtext: 'Mock Test 05' },
      { type: 'certificate', icon: '🏅', bgColor: '#d1fae5', text: 'Certificate issued', subtext: '' },
      { type: 'payment', icon: '💳', bgColor: '#d1fae5', text: 'Payment received', subtext: '₹1,999 · Pro' },
      { type: 'class', icon: '📅', bgColor: '#dbeafe', text: 'Live class scheduled', subtext: 'Topic: ECG' }
    ]);

    await Certificate.deleteMany({});
    for (let i = 0; i < 15; i++) {
      await Certificate.create({
        title: 'Excellence Award',
        course: courses[i % courses.length].title,
        student: adminUser._id
      });
    }

    await Transaction.deleteMany({});
    for (let i = 0; i < 10; i++) {
      await Transaction.create({
        student: adminUser._id,
        amount: Math.floor(Math.random() * 5000) + 500,
        plan: 'Pro',
        status: 'Completed'
      });
    }
    console.log('Dashboard data seeded successfully.');
  } catch (error) {
    console.error('Error seeding dashboard data:', error.message);
  }
};

module.exports = seedDashboard;
