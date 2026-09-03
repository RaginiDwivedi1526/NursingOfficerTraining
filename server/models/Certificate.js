const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  course: { type: String, required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, default: 'Course Completion' },
  status: { type: String, enum: ['Active', 'Draft', 'Revoked'], default: 'Active' },
  issuedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Certificate', certificateSchema);
