const express = require('express');
const TestResult = require('../models/TestResult');
const AIAssessment = require('../models/AIAssessment');
const StudyPlan = require('../models/StudyPlan');
const Test = require('../models/Test');
const User = require('../models/User');
const { protect, premiumOnly, proOnly } = require('../middleware/auth');
const { getAIAnalysis } = require('../services/aiService');
const router = express.Router();

// GET /api/analytics/dashboard - Get complete dashboard data
router.get('/dashboard', protect, async (req, res) => {
  try {
    const userId = req.user._id;

    // Get all test results
    const results = await TestResult.find({ user: userId })
      .populate('test', 'title topic difficulty')
      .sort('-completedAt');

    if (results.length === 0) {
      return res.json({
        overallScore: 0,
        totalTests: 0,
        totalQuestions: 0,
        correctAnswers: 0,
        topicPerformance: [],
        weeklyScores: [],
        recentResults: [],
        aiAssessment: null
      });
    }

    // Calculate overall metrics
    const totalQuestions = results.reduce((sum, r) => sum + r.totalQuestions, 0);
    const totalCorrect = results.reduce((sum, r) => sum + r.correctAnswers, 0);
    const overallScore = Math.round((totalCorrect / totalQuestions) * 100);

    // Aggregate topic performance across all tests
    const topicAgg = {};
    results.forEach(r => {
      r.topicPerformance.forEach(tp => {
        if (!topicAgg[tp.topic]) {
          topicAgg[tp.topic] = { total: 0, correct: 0 };
        }
        topicAgg[tp.topic].total += tp.totalQuestions;
        topicAgg[tp.topic].correct += tp.correctAnswers;
      });
    });

    const topicPerformance = Object.entries(topicAgg).map(([topic, data]) => ({
      topic,
      totalQuestions: data.total,
      correctAnswers: data.correct,
      accuracy: Math.round((data.correct / data.total) * 100)
    })).sort((a, b) => a.accuracy - b.accuracy);

    // Get weekly scores
    const user = await User.findById(userId);
    const weeklyScores = user.weeklyScores || [];

    // Get latest AI assessment
    let aiAssessment = await AIAssessment.findOne({ user: userId }).sort('-createdAt');

    res.json({
      overallScore,
      totalTests: results.length,
      totalQuestions,
      correctAnswers: totalCorrect,
      topicPerformance,
      weeklyScores: weeklyScores.slice(-8), // last 8 weeks
      recentResults: results.slice(0, 5),
      aiAssessment
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/analytics/generate-ai - Generate AI analysis
router.post('/generate-ai', protect, async (req, res) => {
  try {
    const userId = req.user._id;

    const results = await TestResult.find({ user: userId }).sort('-completedAt');
    if (results.length === 0) {
      return res.status(400).json({ message: 'No test results found. Take a test first.' });
    }

    // Aggregate data for AI
    const totalQuestions = results.reduce((sum, r) => sum + r.totalQuestions, 0);
    const totalCorrect = results.reduce((sum, r) => sum + r.correctAnswers, 0);
    const overallScore = Math.round((totalCorrect / totalQuestions) * 100);

    const topicAgg = {};
    results.forEach(r => {
      r.topicPerformance.forEach(tp => {
        if (!topicAgg[tp.topic]) topicAgg[tp.topic] = { total: 0, correct: 0 };
        topicAgg[tp.topic].total += tp.totalQuestions;
        topicAgg[tp.topic].correct += tp.correctAnswers;
      });
    });

    const topicPerformance = Object.entries(topicAgg).map(([topic, data]) => ({
      topic,
      totalQuestions: data.total,
      correctAnswers: data.correct,
      accuracy: Math.round((data.correct / data.total) * 100)
    }));

    const user = await User.findById(userId);
    const weeklyScores = user.weeklyScores || [];

    // Call AI service
    const aiResult = await getAIAnalysis({
      overallScore,
      totalTests: results.length,
      topicPerformance,
      weeklyScores
    });

    // Save assessment
    const assessment = await AIAssessment.create({
      user: userId,
      overallScore,
      strongTopics: aiResult.strongTopics,
      weakTopics: aiResult.weakTopics,
      aiSuggestion: aiResult.aiSuggestion,
      improvementTips: aiResult.improvementTips,
      recommendedTests: aiResult.recommendedTests,
      studyPlan: aiResult.studyPlan
    });

    res.status(201).json(assessment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/analytics/study-plan - Pro feature: personalized study plan
router.get('/study-plan', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const now = new Date();
    const monday = new Date(now);
    monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
    monday.setHours(0, 0, 0, 0);

    let plan = await StudyPlan.findOne({ userId, weekStart: monday });
    if (plan) return res.json(plan);

    // Generate new plan from weak areas
    const results = await TestResult.find({ user: userId }).sort('-completedAt');
    const topicAgg = {};
    results.forEach(r => {
      r.topicPerformance.forEach(tp => {
        if (!topicAgg[tp.topic]) topicAgg[tp.topic] = { total: 0, correct: 0 };
        topicAgg[tp.topic].total += tp.totalQuestions;
        topicAgg[tp.topic].correct += tp.correctAnswers;
      });
    });
    const weakTopics = Object.entries(topicAgg)
      .map(([topic, d]) => ({ topic, accuracy: Math.round((d.correct / d.total) * 100) }))
      .filter(t => t.accuracy < 70)
      .sort((a, b) => a.accuracy - b.accuracy)
      .map(t => t.topic);

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const types = ['Lecture', 'MCQ', 'Revision', 'Lecture', 'MCQ', 'Mock', 'Rest'];
    const durations = ['2 hrs', '30 Qs', '1.5 hrs', '2 hrs', '30 Qs', 'Full', '1 hr'];
    const allTopics = weakTopics.length > 0 ? weakTopics : ['Anatomy', 'Pharmacology', 'Microbiology', 'Nursing Procedures'];

    const generatedPlan = days.map((day, i) => ({
      day,
      tasks: [{ topic: allTopics[i % allTopics.length], duration: durations[i], type: types[i], completed: false }]
    }));

    plan = await StudyPlan.create({ userId, weekStart: monday, plan: generatedPlan });
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH /api/analytics/study-plan/complete - Toggle task completion
router.patch('/study-plan/complete', protect, async (req, res) => {
  try {
    const { dayIndex, taskIndex, completed } = req.body;
    const userId = req.user._id;
    const now = new Date();
    const monday = new Date(now);
    monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
    monday.setHours(0, 0, 0, 0);

    const plan = await StudyPlan.findOne({ userId, weekStart: monday });
    if (!plan) return res.status(404).json({ message: 'No study plan found for this week.' });

    plan.plan[dayIndex].tasks[taskIndex].completed = completed;
    await plan.save();
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/analytics/weekly-progress - Weekly score data for chart
router.get('/weekly-progress', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const scores = (user.weeklyScores || []).slice(-8);
    res.json(scores.map((w, i) => ({ week: `Week ${i + 1}`, score: w.score, date: w.date })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/analytics/recommendations - Smart test recommendations
router.get('/recommendations', protect, async (req, res) => {
  try {
    const results = await TestResult.find({ user: req.user._id }).sort('-completedAt');
    const topicAgg = {};
    results.forEach(r => {
      r.topicPerformance.forEach(tp => {
        if (!topicAgg[tp.topic]) topicAgg[tp.topic] = { total: 0, correct: 0, lastDate: null };
        topicAgg[tp.topic].total += tp.totalQuestions;
        topicAgg[tp.topic].correct += tp.correctAnswers;
        if (!topicAgg[tp.topic].lastDate || r.completedAt > topicAgg[tp.topic].lastDate) {
          topicAgg[tp.topic].lastDate = r.completedAt;
        }
      });
    });

    const weakTopics = Object.entries(topicAgg)
      .map(([topic, d]) => ({ topic, accuracy: Math.round((d.correct / d.total) * 100), lastAttempted: d.lastDate }))
      .filter(t => t.accuracy < 60)
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 3);

    // Find matching tests
    const recommendations = [];
    for (const wt of weakTopics) {
      const test = await Test.findOne({ topic: wt.topic }).select('_id title topic difficulty').lean();
      if (test) {
        recommendations.push({
          testId: test._id,
          title: test.title,
          topic: test.topic,
          difficulty: test.difficulty || 'Easy',
          lastAccuracy: wt.accuracy,
          lastAttempted: wt.lastAttempted
        });
      }
    }
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/analytics/stats-strip - Overall stat cards with trends
router.get('/stats-strip', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const now = new Date();
    const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
    const fourteenDaysAgo = new Date(now - 14 * 24 * 60 * 60 * 1000);

    const allResults = await TestResult.find({ user: userId });
    const recentResults = allResults.filter(r => r.completedAt >= sevenDaysAgo);
    const priorResults = allResults.filter(r => r.completedAt >= fourteenDaysAgo && r.completedAt < sevenDaysAgo);

    const totalCorrect = allResults.reduce((s, r) => s + r.correctAnswers, 0);
    const totalWrong = allResults.reduce((s, r) => s + r.incorrectAnswers, 0);
    const totalTime = allResults.reduce((s, r) => s + r.timeTaken, 0);
    const totalQs = allResults.reduce((s, r) => s + r.totalQuestions, 0);
    const avgTime = totalQs > 0 ? Math.round(totalTime / totalQs) : 0;

    const recentCorrectRate = recentResults.length > 0 ? recentResults.reduce((s, r) => s + r.correctAnswers, 0) / recentResults.reduce((s, r) => s + r.totalQuestions, 0) : 0;
    const priorCorrectRate = priorResults.length > 0 ? priorResults.reduce((s, r) => s + r.correctAnswers, 0) / priorResults.reduce((s, r) => s + r.totalQuestions, 0) : 0;

    const getTrend = (recent, prior) => {
      if (recent > prior) return 'up';
      if (recent < prior) return 'down';
      return 'stable';
    };

    res.json({
      totalCorrect,
      totalWrong,
      avgTimePerQuestion: avgTime,
      testsAttempted: allResults.length,
      trendCorrect: getTrend(recentCorrectRate, priorCorrectRate),
      trendWrong: getTrend(priorCorrectRate, recentCorrectRate), // inverse
      trendTime: 'stable',
      trendTests: recentResults.length > priorResults.length ? 'up' : recentResults.length < priorResults.length ? 'down' : 'stable'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/analytics/performance - Detailed performance metrics
router.get('/performance', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const results = await TestResult.find({ user: userId }).sort('completedAt');
    
    if (results.length === 0) {
      return res.json({ trendData: [], scoreDistribution: [], subjectData: [] });
    }

    // Trend data
    const trendData = results.map(r => ({
      date: r.completedAt,
      score: r.score
    }));

    // Score distribution
    const dist = { '0-20%': 0, '21-40%': 0, '41-60%': 0, '61-80%': 0, '81-100%': 0 };
    results.forEach(r => {
      if (r.score <= 20) dist['0-20%']++;
      else if (r.score <= 40) dist['21-40%']++;
      else if (r.score <= 60) dist['41-60%']++;
      else if (r.score <= 80) dist['61-80%']++;
      else dist['81-100%']++;
    });

    // Subject data
    const topicAgg = {};
    results.forEach(r => {
      r.topicPerformance.forEach(tp => {
        if (!topicAgg[tp.topic]) topicAgg[tp.topic] = { total: 0, correct: 0 };
        topicAgg[tp.topic].total += tp.totalQuestions;
        topicAgg[tp.topic].correct += tp.correctAnswers;
      });
    });

    const subjectData = Object.entries(topicAgg).map(([topic, data]) => ({
      subject: topic,
      accuracy: Math.round((data.correct / data.total) * 100)
    }));

    res.json({ trendData, scoreDistribution: Object.values(dist), subjectData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/analytics/insights - AI Insights summary
router.get('/insights', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const results = await TestResult.find({ user: userId }).sort('-completedAt');
    
    const totalQs = results.reduce((s, r) => s + r.totalQuestions, 0);
    const totalCorrect = results.reduce((s, r) => s + r.correctAnswers, 0);
    const totalIncorrect = results.reduce((s, r) => s + r.incorrectAnswers, 0);
    const accuracy = totalQs > 0 ? Math.round((totalCorrect / totalQs) * 100) : 0;
    
    const topicAgg = {};
    results.forEach(r => {
      r.topicPerformance.forEach(tp => {
        if (!topicAgg[tp.topic]) topicAgg[tp.topic] = { total: 0, correct: 0 };
        topicAgg[tp.topic].total += tp.totalQuestions;
        topicAgg[tp.topic].correct += tp.correctAnswers;
      });
    });

    const topicInsights = Object.entries(topicAgg).map(([topic, data]) => ({
      topic,
      mastery: Math.round((data.correct / data.total) * 100),
      trend: 'up', // Simplified for mock
      accuracy: Math.round((data.correct / data.total) * 100),
      recommendation: 'Keep practicing'
    }));

    res.json({
      learningScore: accuracy,
      conceptMastery: accuracy - 10,
      predictedScore: Math.round(accuracy * 2), // 200 total
      totalQs,
      totalCorrect,
      totalIncorrect,
      topicInsights
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/analytics/mistakes - Mistakes tracking
router.get('/mistakes', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const results = await TestResult.find({ user: userId }).sort('-completedAt');
    
    // In a real app we'd query individual incorrect answers. 
    // Here we'll generate aggregate data based on test results.
    const totalIncorrect = results.reduce((s, r) => s + r.incorrectAnswers, 0);
    
    const topicAgg = {};
    results.forEach(r => {
      r.topicPerformance.forEach(tp => {
        const incorrect = tp.totalQuestions - tp.correctAnswers;
        if (!topicAgg[tp.topic]) topicAgg[tp.topic] = { total: 0, incorrect: 0 };
        topicAgg[tp.topic].total += tp.totalQuestions;
        topicAgg[tp.topic].incorrect += incorrect;
      });
    });

    const weakTopics = Object.entries(topicAgg)
      .map(([topic, data]) => ({
        topic,
        mistakes: data.incorrect,
        accuracy: Math.round(((data.total - data.incorrect) / data.total) * 100)
      }))
      .filter(t => t.mistakes > 0)
      .sort((a, b) => b.mistakes - a.mistakes);

    res.json({
      totalMistakes: totalIncorrect,
      weakTopics
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

