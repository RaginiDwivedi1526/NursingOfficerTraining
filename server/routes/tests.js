const express = require('express');
const Test = require('../models/Test');
const TestResult = require('../models/TestResult');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const router = express.Router();

// GET /api/tests - Get all tests (metadata only, no questions)
router.get('/', async (req, res) => {
  try {
    const { topic, difficulty, examType } = req.query;
    const filter = {};
    if (topic) filter.topic = topic;
    if (difficulty) filter.difficulty = difficulty;
    if (examType) filter.examType = examType;

    const tests = await Test.find(filter).select('-questions.correctAnswer -questions.explanation').sort('-createdAt');
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/tests/:id - Get test with questions (for taking test)
router.get('/:id', protect, async (req, res) => {
  try {
    const test = await Test.findById(req.params.id).select('-questions.correctAnswer -questions.explanation');
    if (!test) return res.status(404).json({ message: 'Test not found' });
    res.json(test);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/tests/:id/submit - Submit test answers
router.post('/:id/submit', protect, async (req, res) => {
  try {
    const { answers, timeTaken } = req.body; // answers: [{ questionId, selectedAnswer, timeTaken }]
    const test = await Test.findById(req.params.id);
    if (!test) return res.status(404).json({ message: 'Test not found' });

    // Process answers
    let correctCount = 0;
    const topicMap = {};
    const processedAnswers = [];

    for (const ans of answers) {
      const question = test.questions.id(ans.questionId);
      if (!question) continue;

      const isCorrect = question.correctAnswer === ans.selectedAnswer;
      if (isCorrect) correctCount++;

      // Track topic performance
      if (!topicMap[question.topic]) {
        topicMap[question.topic] = { total: 0, correct: 0 };
      }
      topicMap[question.topic].total++;
      if (isCorrect) topicMap[question.topic].correct++;

      processedAnswers.push({
        questionId: ans.questionId,
        selectedAnswer: ans.selectedAnswer,
        isCorrect,
        topic: question.topic,
        timeTaken: ans.timeTaken || 0
      });
    }

    // Build topic performance array
    const topicPerformance = Object.entries(topicMap).map(([topic, data]) => ({
      topic,
      totalQuestions: data.total,
      correctAnswers: data.correct,
      accuracy: Math.round((data.correct / data.total) * 100)
    }));

    const score = Math.round((correctCount / test.questions.length) * 100);

    const result = await TestResult.create({
      user: req.user._id,
      test: test._id,
      answers: processedAnswers,
      totalQuestions: test.questions.length,
      correctAnswers: correctCount,
      incorrectAnswers: test.questions.length - correctCount,
      score,
      timeTaken: timeTaken || 0,
      topicPerformance
    });

    // Update user's weekly scores
    const currentWeek = Math.ceil((Date.now() - new Date(req.user.createdAt).getTime()) / (7 * 24 * 60 * 60 * 1000));
    await User.findByIdAndUpdate(req.user._id, {
      $push: { weeklyScores: { week: currentWeek, score, date: new Date() } }
    });

    // Return result with correct answers for review
    const testWithAnswers = await Test.findById(req.params.id);
    res.status(201).json({
      result,
      correctAnswers: testWithAnswers.questions.map(q => ({
        questionId: q._id,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation
      }))
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/tests/results/my - Get user's test results
router.get('/results/my', protect, async (req, res) => {
  try {
    const results = await TestResult.find({ user: req.user._id })
      .populate('test', 'title topic difficulty')
      .sort('-completedAt');
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
