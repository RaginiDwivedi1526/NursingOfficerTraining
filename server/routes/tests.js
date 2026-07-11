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
    console.log(`[DEBUG] GET /api/tests - Found ${tests.length} tests in database (filter: ${JSON.stringify(filter)})`);
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const fs = require('fs');
const path = require('path');

// GET /api/tests/parse-txt
router.get('/parse-txt', (req, res) => {
  try {
    const filePath = path.join(__dirname, '../../questions and summary.txt');
    const content = fs.readFileSync(filePath, 'utf8');
    const blocks = content.split(/---\s*Image\s*\d+\s*---/i);
    
    const questions = [];
    let currentQuestion = null;
    
    for (let i = 1; i < blocks.length; i++) {
      const block = blocks[i].trim();
      if (!block) continue;
      
      const isQuestionBlock = block.match(/^[O©vVYXx\[\]]\s*\d+\./m) && !block.includes('Educational objective:');
      const isExplanationBlock = block.includes('Educational objective:') || block.includes('Explanation');
      
      if (isQuestionBlock && !isExplanationBlock) {
        currentQuestion = { questionText: '', options: [], correctAnswer: -1, explanation: '', topic: 'Mental Health (Psychiatric) Nursing' };
        const lines = block.split('\n').map(l => l.trim()).filter(l => l);
        let qText = [];
        let inOptions = false;
        
        for (const line of lines) {
          const optionMatch = line.match(/^[O©vVYXx\[\]]\s*(\d+)\.\s*(.*)/);
          if (optionMatch) {
            inOptions = true;
            currentQuestion.options.push(optionMatch[2]);
            if (line.match(/^[©vVY]/)) {
              currentQuestion.correctAnswer = parseInt(optionMatch[1]) - 1;
            }
          } else if (!inOptions) {
            qText.push(line);
          } else {
            currentQuestion.options[currentQuestion.options.length - 1] += ' ' + line;
          }
        }
        currentQuestion.questionText = qText.join(' ');
        questions.push(currentQuestion);
      } else if (isExplanationBlock && currentQuestion) {
        currentQuestion.explanation = block;
        const lines = block.split('\n').map(l => l.trim()).filter(l => l);
        for (const line of lines) {
          const optionMatch = line.match(/^[©vVY]\s*(\d+)\./);
          if (optionMatch) {
            currentQuestion.correctAnswer = parseInt(optionMatch[1]) - 1;
          }
        }
      }
    }
    
    const filtered = questions.filter(q => q.questionText && q.options.length > 0);
    fs.writeFileSync(path.join(__dirname, '../parsedQuestions.json'), JSON.stringify(filtered, null, 2));
    res.json({ message: "Parsed successfully", count: filtered.length, first: filtered[0] });
  } catch (err) {
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});


// GET /api/tests/results/my - Get user's test results (must be BEFORE /:id)
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

// GET /api/tests/:id - Get test with questions (for taking test)
router.get('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`[DEBUG] Attempting to fetch test with ID: ${id}`);
    
    // Validate ObjectId format to prevent crash
    const mongoose = require('mongoose');
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log(`[DEBUG] Invalid ID format requested: ${id}`);
      return res.status(404).json({ message: 'Test not found (Invalid ID format)' });
    }

    const test = await Test.findById(id).select('-questions.correctAnswer -questions.explanation');
    if (!test) {
      console.log(`[DEBUG] Test with ID ${id} NOT FOUND in database.`);
      return res.status(404).json({ message: 'Test not found' });
    }
    
    console.log(`[DEBUG] Test found: ${test.title}`);
    res.json(test);
  } catch (error) {
    console.error(`[DEBUG] Error fetching test ${req.params.id}:`, error.message);
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
    let incorrectCount = 0;
    const topicMap = {};
    const processedAnswers = [];

    for (const ans of answers) {
      const question = test.questions.id(ans.questionId);
      if (!question) continue;

      const isCorrect = question.correctAnswer === ans.selectedAnswer;
      const isAttempted = ans.selectedAnswer !== -1 && ans.selectedAnswer !== undefined && ans.selectedAnswer !== null;

      if (isCorrect) {
        correctCount++;
      } else if (isAttempted) {
        incorrectCount++;
      }

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

    const isMock = test.title.toLowerCase().includes('mock') || 
                   ['AIIMS', 'ESIC', 'RRB', 'DSSSB', 'PGIMER', 'SGPGI', 'PARAMILITARY'].some(exam => test.topic.includes(exam) || test.title.includes(exam));
    
    // Calculate Score with Negative Marking (1/3 for mock tests)
    const negativeMarking = isMock ? (1/3) : 0;
    const negativeMarksDeducted = Number((incorrectCount * negativeMarking).toFixed(2));
    let rawScore = correctCount - negativeMarksDeducted;
    if (rawScore < 0) rawScore = 0; // Prevent negative total scores
    
    const score = Math.round((rawScore / test.questions.length) * 100);

    const result = await TestResult.create({
      user: req.user._id,
      test: test._id,
      answers: processedAnswers,
      totalQuestions: test.questions.length,
      correctAnswers: correctCount,
      incorrectAnswers: incorrectCount,
      unattemptedAnswers: test.questions.length - (correctCount + incorrectCount),
      score,
      timeTaken: timeTaken || 0,
      topicPerformance,
      negativeMarksDeducted
    });

    // Update user's weekly scores (guard against missing createdAt)
    const userCreatedAt = req.user.createdAt ? new Date(req.user.createdAt).getTime() : Date.now();
    const currentWeek = Math.max(1, Math.ceil((Date.now() - userCreatedAt) / (7 * 24 * 60 * 60 * 1000)));
    await User.findByIdAndUpdate(req.user._id, {
      $push: { weeklyScores: { week: currentWeek, score, date: new Date() } }
    });

    // Return result with correct answers for review (reuse already-fetched test)
    res.status(201).json({
      result,
      correctAnswers: test.questions.map(q => ({
        questionId: q._id,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation
      }))
    });
  } catch (error) {
    console.error('Submit test error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
