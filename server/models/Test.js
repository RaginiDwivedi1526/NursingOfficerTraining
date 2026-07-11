const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true }, // index of correct option (0-3)
  explanation: { type: String },
  topic: { type: String, required: true }
});

const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  topic: { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  duration: { type: Number, default: 30 }, // minutes
  questions: [questionSchema],
  totalQuestions: { type: Number },
  examType: { type: String, enum: ['nursing_officer', 'nclex_rn', 'nclex_pn', 'general'], default: 'general' },
  isFree: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

testSchema.pre('save', async function() {
  this.totalQuestions = this.questions ? this.questions.length : 0;
});

module.exports = mongoose.model('Test', testSchema);
