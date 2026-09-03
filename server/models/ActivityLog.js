const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g., 'registration', 'test', 'certificate', 'payment', 'class'
  icon: { type: String, default: '👤' },
  bgColor: { type: String, default: '#ede9fe' },
  text: { type: String, required: true },
  subtext: { type: String },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ActivityLog', activityLogSchema);
