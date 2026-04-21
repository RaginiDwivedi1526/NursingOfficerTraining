const mongoose = require('mongoose');

const aiAssessmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  overallScore: { type: Number, default: 0 },
  strongTopics: [{ type: String }],
  weakTopics: [{ type: String }],
  aiSuggestion: { type: String }, // raw ChatGPT response
  improvementTips: [{ type: String }],
  recommendedTests: [{ topic: String, difficulty: String, reason: String }],
  studyPlan: {
    daily: [{ topic: String, action: String, duration: String }],
    weekly: [{ week: Number, focus: String, targets: String }]
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AIAssessment', aiAssessmentSchema);
