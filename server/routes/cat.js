const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const CATSession = require('../models/CATSession');
const {
  DIFFICULTY_LEVELS,
  selectNextSubject,
  calculateNextDifficulty,
  updateAbilityTheta,
  evaluateStoppingCondition,
  generateAdaptiveQuestion
} = require('../services/catEngine');

// POST /api/cat/start - Start a new Computer Adaptive Test (CAT)
router.post('/start', protect, async (req, res) => {
  try {
    const { 
      examType = 'nclex_rn', 
      topic = 'All Subjects', 
      title = 'Computer Adaptive Test',
      startingDifficulty = 2,
      minQuestions = 20,
      maxQuestions = 20
    } = req.body;

    // Resolve starting difficulty (Default Level 2: Base)
    let initialDifficulty = 2;
    const diffStr = String(startingDifficulty || '').toLowerCase();
    if (diffStr === '3' || diffStr.includes('hard') || diffStr === '1' && diffStr !== 'below') {
      initialDifficulty = 3; // Start at Hard (Level 3)
    } else if (diffStr === '4' || diffStr.includes('peak')) {
      initialDifficulty = 4; // Start at Peak (Level 4)
    } else if (diffStr === '1' || diffStr.includes('easy') || diffStr.includes('below')) {
      initialDifficulty = 1; // Start at Below Base (Level 1)
    } else {
      initialDifficulty = 2; // Default Base (Level 2)
    }

    // Select initial subject (honors specific topic if chosen, otherwise uses subject percentage weighting)
    const initialSubject = selectNextSubject({}, topic);

    console.log(`[CAT Engine] Initializing CAT test for user ${req.user._id}. Title: "${title}", Topic: "${topic}", Starting at Level ${initialDifficulty} (${DIFFICULTY_LEVELS[initialDifficulty].name}) - Initial Subject: "${initialSubject}"`);

    // Generate Question 1
    const firstQuestion = await generateAdaptiveQuestion(initialSubject, initialDifficulty, examType, []);

    const newSession = await CATSession.create({
      user: req.user._id,
      title,
      topic,
      examType,
      status: 'in_progress',
      abilityTheta: 0.0,
      passingStandard: 0.20,
      minQuestions: Number(minQuestions) || 20,
      maxQuestions: Number(maxQuestions) || 20,
      currentDifficultyLevel: initialDifficulty,
      currentDifficultyName: DIFFICULTY_LEVELS[initialDifficulty].name,
      consecutiveCorrect: 0,
      consecutiveIncorrect: 0,
      subjectQuotas: { [initialSubject]: 0 },
      questionsAnswered: [],
      totalQuestions: 0,
      correctCount: 0,
      incorrectCount: 0,
      currentQuestion: firstQuestion
    });

    res.status(201).json({
      sessionId: newSession._id,
      title: newSession.title,
      topic: newSession.topic,
      questionNumber: 1,
      currentQuestion: {
        questionText: firstQuestion.questionText,
        options: firstQuestion.options,
        topic: firstQuestion.topic,
        difficultyLevel: firstQuestion.difficultyLevel,
        difficultyName: firstQuestion.difficultyName
      },
      currentDifficultyLevel: initialDifficulty,
      difficultyName: DIFFICULTY_LEVELS[initialDifficulty].name,
      abilityTheta: 0.0,
      totalQuestionsAnswered: 0
    });

  } catch (error) {
    console.error('[CAT Engine] Error starting CAT session:', error);
    res.status(500).json({ message: 'Failed to start Computer Adaptive Test', error: error.message });
  }
});

// POST /api/cat/submit-answer - Process answer & get next adaptive question or final decision
router.post('/submit-answer', protect, async (req, res) => {
  try {
    const { sessionId, selectedAnswer, timeTaken = 0 } = req.body;

    if (!sessionId || selectedAnswer === undefined) {
      return res.status(400).json({ message: 'Session ID and selectedAnswer are required' });
    }

    const session = await CATSession.findOne({ _id: sessionId, user: req.user._id });
    if (!session) {
      return res.status(404).json({ message: 'Active CAT session not found' });
    }

    if (session.status === 'completed') {
      return res.status(400).json({ message: 'This CAT session has already completed', session });
    }

    // Deep copy the currently answered question so subsequent mutations to session.currentQuestion cannot overwrite it
    const currentQ = JSON.parse(JSON.stringify(session.currentQuestion || {}));
    const isCorrect = selectedAnswer === currentQ.correctAnswer;

    // Build the immutable feedback snapshot for the question that was just answered
    const answeredFeedback = {
      questionNumber: session.questionsAnswered.length + 1,
      isCorrect,
      correctAnswer: currentQ.correctAnswer,
      explanation: currentQ.explanation,
      questionText: currentQ.questionText,
      options: currentQ.options || [],
      selectedAnswer,
      topic: currentQ.topic,
      difficultyLevel: currentQ.difficultyLevel,
      difficultyName: currentQ.difficultyName,
      peerPercentages: currentQ.peerPercentages || [12, 72, 10, 6],
      timeTaken
    };

    // Update consecutive counters
    let newConsecutiveCorrect = isCorrect ? session.consecutiveCorrect + 1 : 0;
    let newConsecutiveIncorrect = !isCorrect ? session.consecutiveIncorrect + 1 : 0;

    // Calculate next difficulty level using CAT algorithm
    const nextDifficultyLevel = calculateNextDifficulty(
      session.currentDifficultyLevel,
      isCorrect,
      newConsecutiveCorrect,
      newConsecutiveIncorrect
    );

    // Update ability theta
    const newTheta = updateAbilityTheta(session.abilityTheta, isCorrect, session.currentDifficultyLevel);

    // Update subject quota
    const currentSubjectCount = (session.subjectQuotas.get(currentQ.topic) || 0) + 1;
    session.subjectQuotas.set(currentQ.topic, currentSubjectCount);

    // Push answered question to history
    const answeredItem = {
      ...answeredFeedback,
      thetaAfter: newTheta
    };

    session.questionsAnswered.push(answeredItem);
    session.totalQuestions = session.questionsAnswered.length;
    session.correctCount = session.questionsAnswered.filter(q => q.isCorrect).length;
    session.incorrectCount = session.questionsAnswered.length - session.correctCount;
    session.abilityTheta = newTheta;
    session.consecutiveCorrect = newConsecutiveCorrect;
    session.consecutiveIncorrect = newConsecutiveIncorrect;

    // Evaluate stopping condition (dynamic min and max questions configured for session)
    const minQ = session.minQuestions || 20;
    const maxQ = session.maxQuestions || 20;
    const stopping = evaluateStoppingCondition(
      session.questionsAnswered,
      newTheta,
      session.passingStandard,
      minQ,
      maxQ
    );

    if (stopping.shouldStop) {
      session.status = 'completed';
      session.result = stopping.result;
      session.stoppingReason = stopping.reason;
      session.completedAt = new Date();
      await session.save();

      console.log(`[CAT Engine] CAT Session ${session._id} COMPLETED. Result: ${session.result} (Reason: ${stopping.reason})`);

      return res.json({
        isCompleted: true,
        result: session.result,
        stoppingReason: stopping.reason,
        feedback: {
          ...answeredFeedback,
          nextDifficultyLevel: session.currentDifficultyLevel,
          nextDifficultyName: session.currentDifficultyName,
          abilityTheta: newTheta
        },
        session
      });
    }

    // Select next subject & generate next question at target adaptive level
    const nextSubject = selectNextSubject(Object.fromEntries(session.subjectQuotas), session.topic);
    session.currentDifficultyLevel = nextDifficultyLevel;
    session.currentDifficultyName = DIFFICULTY_LEVELS[nextDifficultyLevel].name;

    const alreadyAsked = session.questionsAnswered.map(q => q.questionText);
    const nextQ = await generateAdaptiveQuestion(nextSubject, nextDifficultyLevel, session.examType, alreadyAsked);
    session.currentQuestion = nextQ;

    await session.save();

    res.json({
      isCompleted: false,
      feedback: {
        ...answeredFeedback,
        nextDifficultyLevel,
        nextDifficultyName: DIFFICULTY_LEVELS[nextDifficultyLevel].name,
        abilityTheta: newTheta
      },
      nextQuestion: {
        questionText: nextQ.questionText,
        options: nextQ.options,
        topic: nextQ.topic,
        difficultyLevel: nextQ.difficultyLevel,
        difficultyName: nextQ.difficultyName
      },
      currentDifficultyLevel: nextDifficultyLevel,
      difficultyName: DIFFICULTY_LEVELS[nextDifficultyLevel].name,
      abilityTheta: newTheta,
      totalQuestionsAnswered: session.questionsAnswered.length
    });

  } catch (error) {
    console.error('[CAT Engine] Error processing CAT answer:', error);
    res.status(500).json({ message: 'Error processing adaptive answer', error: error.message });
  }
});

// GET /api/cat/session/:id - Fetch session details
router.get('/session/:id', protect, async (req, res) => {
  try {
    const session = await CATSession.findOne({ _id: req.params.id, user: req.user._id });
    if (!session) return res.status(404).json({ message: 'CAT session not found' });
    res.json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/cat/history - Fetch user's previous CAT sessions
router.get('/history', protect, async (req, res) => {
  try {
    const history = await CATSession.find({ user: req.user._id }).sort('-createdAt');
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
