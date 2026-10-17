const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId },
  selectedAnswer: { type: Number },
  isCorrect: { type: Boolean },
  topic: { type: String },
  timeTaken: { type: Number, default: 0 } // seconds per question
});

const topicPerformanceSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  totalQuestions: { type: Number, default: 0 },
  correctAnswers: { type: Number, default: 0 },
  accuracy: { type: Number, default: 0 } // percentage
});

const testResultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  answers: [answerSchema],
  totalQuestions: { type: Number, required: true },
  correctAnswers: { type: Number, default: 0 },
  incorrectAnswers: { type: Number, default: 0 },
  unattemptedAnswers: { type: Number, default: 0 },
  negativeMarksDeducted: { type: Number, default: 0 },
  marksObtained: { type: Number, default: 0 },
  totalMarks: { type: Number, default: 0 },
  accuracy: { type: Number, default: 0 },
  isPassed: { type: Boolean, default: false },
  statusSummary: {
    answered: { type: Number, default: 0 },
    answeredMarked: { type: Number, default: 0 },
    visitedUnanswered: { type: Number, default: 0 },
    marked: { type: Number, default: 0 },
    notVisited: { type: Number, default: 0 },
    total: { type: Number, default: 0 }
  },
  catTelemetry: { type: mongoose.Schema.Types.Mixed },
  score: { type: Number, default: 0 }, // percentage
  timeTaken: { type: Number, default: 0 }, // total seconds
  topicPerformance: [topicPerformanceSchema],
  completedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TestResult', testResultSchema);
