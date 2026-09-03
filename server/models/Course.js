const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  enrollments: { type: Number, default: 0 },
  completions: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  averageProgress: { type: Number, default: 0 },
  color: { type: String, default: '#4f46e5' },
  status: { type: String, enum: ['Published', 'Draft', 'In Review'], default: 'Published' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);
