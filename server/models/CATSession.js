const mongoose = require('mongoose');

const catAnswerSchema = new mongoose.Schema({
  questionNumber: { type: Number, required: true },
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true },
  selectedAnswer: { type: Number, required: true },
  isCorrect: { type: Boolean, required: true },
  explanation: { type: String },
  difficultyLevel: { type: Number, required: true }, // 1: Below Base, 2: Base, 3: Hard, 4: Peak
  difficultyName: { type: String, required: true }, // 'Below Base', 'Base', 'Advanced Hard', 'Peak Level'
  topic: { type: String, required: true },
  thetaAfter: { type: Number, required: true },
  timeTaken: { type: Number, default: 0 } // seconds
});

const catSessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, default: 'Computer Adaptive Test' },
  topic: { type: String, default: 'All Subjects' },
  examType: { type: String, enum: ['nclex_rn', 'nursing_officer', 'general'], default: 'nclex_rn' },
  status: { type: String, enum: ['in_progress', 'completed'], default: 'in_progress' },
  result: { type: String, enum: ['PASSED', 'FAILED', null], default: null },
  stoppingReason: { type: String, default: null }, // 'confidence_interval_met_pass', 'confidence_interval_met_fail', 'max_questions'
  minQuestions: { type: Number, default: 15 },
  maxQuestions: { type: Number, default: 50 },
  
  abilityTheta: { type: Number, default: 0.0 }, // Rasch theta score, passing line is +0.20
  passingStandard: { type: Number, default: 0.20 },
  
  currentDifficultyLevel: { type: Number, default: 2 }, // Starts at Level 2 (Base)
  currentDifficultyName: { type: String, default: 'Base' },
  
  consecutiveCorrect: { type: Number, default: 0 },
  consecutiveIncorrect: { type: Number, default: 0 },
  
  subjectQuotas: { type: Map, of: Number, default: {} },
  
  questionsAnswered: [catAnswerSchema],
  totalQuestions: { type: Number, default: 0 },
  correctCount: { type: Number, default: 0 },
  incorrectCount: { type: Number, default: 0 },
  
  currentQuestion: {
    questionText: { type: String },
    options: [{ type: String }],
    correctAnswer: { type: Number },
    explanation: { type: String },
    topic: { type: String },
    difficultyLevel: { type: Number },
    difficultyName: { type: String }
  },
  
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date }
});

module.exports = mongoose.model('CATSession', catSessionSchema);
