const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

dotenv.config();

const seedSpecific = async () => {
  try {
    const salt = await bcrypt.genSalt(10);
    const pwd = bcrypt.hashSync('password123', salt);

    const users = [
      {
        name: "Ragini",
        firstName: "Ragini",
        email: "ragini@example.com",
        password: pwd,
        role: "pro",
        examGoal: "NORCET",
        enrolledCourses: ["NORCET 2025 Complete Course"],
        batch: "NORCET 2025 Target",
        createdAt: new Date()
      },
      {
        name: "Pankaj",
        firstName: "Pankaj",
        email: "pankaj@example.com",
        password: pwd,
        role: "standard",
        examGoal: "AIIMS",
        enrolledCourses: ["AIIMS Nursing Prep"],
        batch: "AIIMS Nursing 2024",
        createdAt: new Date(Date.now() - 1000 * 60 * 5)
      }
    ];

    await User.insertMany(users);
    console.log('✅ Seeded Ragini and Pankaj successfully!');
  } catch (err) {
    console.error(err);
  }
};

module.exports = seedSpecific;
