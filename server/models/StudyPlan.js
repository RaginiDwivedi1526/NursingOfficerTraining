const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  duration: { type: String, required: true },
  type: { type: String, enum: ['Lecture', 'MCQ', 'Revision', 'Mock', 'Rest'], required: true },
  completed: { type: Boolean, default: false }
});

const daySchema = new mongoose.Schema({
  day: { type: String, required: true },
  tasks: [taskSchema]
});

const studyPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  weekStart: { type: Date, required: true },
  plan: [daySchema],
  generatedAt: { type: Date, default: Date.now }
});

studyPlanSchema.index({ userId: 1, weekStart: 1 }, { unique: true });

module.exports = mongoose.model('StudyPlan', studyPlanSchema);
