const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // ── Core fields ──
  name:  { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  phone: { type: String, trim: true },
  role:  { type: String, enum: ['free', 'basic', 'standard', 'pro', 'admin'], default: 'free' },

  // ── Extended profile ──
  firstName:  { type: String, trim: true },
  lastName:   { type: String, trim: true },
  dob:        { type: Date },
  gender:     { type: String, enum: ['male', 'female', 'other', ''] },
  category:   { type: String, trim: true },
  address:    { type: String, trim: true },
  profilePhoto: { type: String, trim: true },   // URL or base64

  // ── Emergency Contact ──
  emergencyContact: {
    name:         { type: String, trim: true },
    relationship: { type: String, trim: true },
    phone:        { type: String, trim: true },
  },

  // ── Academic / Enrolment ──
  batch:         { type: String, default: 'Batch 2025' },
  examTarget:    { type: String, default: 'Nursing Officer' },
  examGoal:      { type: String, trim: true },
  qualification: { type: String, trim: true },
  college:       { type: String, trim: true },
  passingYear:   { type: String, trim: true },
  registrationNo:{ type: String, trim: true },
  enrolledCourses: [{ type: String, trim: true }],

  weeklyScores: [{ week: Number, score: Number, date: { type: Date, default: Date.now } }],
  createdAt: { type: Date, default: Date.now },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

// Hash password before saving
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
