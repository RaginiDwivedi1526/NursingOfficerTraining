const express = require('express');
const Test = require('../models/Test');
const TestResult = require('../models/TestResult');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const { chat } = require('../services/openaiService');
const { getIndianNursingPrompt } = require('../services/questionPrompts');
const router = express.Router();

/**
 * Shared helper — strips all known AI-generated prefixes from a question string.
 * Handles:
 *   [Topic Name] prefix  →  "[Emergency Nursing] A patient..."
 *   Plain topic prefix   →  "Anxiety Disorders: What is..."
 *   Q-number prefix      →  "Q1.", "Question 1:", "1."
 */
const stripPrefix = (text) => {
  if (!text) return text;
  let s = text.trim();
  // Strip [Any text in brackets] at the very start
  s = s.replace(/^\[[^\]]+\]\s*/i, '');
  // Strip topic/subject name followed by : or – or -
  s = s.replace(/^[A-Za-z ,&()\-/]{3,80}\s*[-\u2013:]\s+(?=[A-Z])/, '');
  // Strip Q1., Question 1:, 1., 1) etc.
  s = s.replace(/^(Question\s*\d+|Q\s*\d+)[.:\s]+/i, '');
  s = s.replace(/^\d+[.):] +/, '');
  return s.trim();
};

const generateFallbackQuestions = (topic, count = 10) => {
  const sampleBank = [
    {
      questionText: `A patient admitted with suspected myocardial infarction is prescribed sublingual nitroglycerin. Which vital sign must the nurse monitor most closely prior to administration?`,
      options: ['Blood Pressure', 'Respiratory Rate', 'Body Temperature', 'Oxygen Saturation'],
      correctAnswer: 0,
      explanation: 'Nitroglycerin is a potent vasodilator and can cause severe hypotension. Blood pressure must be checked before each dose.',
      topic: topic
    },
    {
      questionText: `During blood transfusion, the patient complains of chills, lower back pain, and fever. What is the immediate nursing action?`,
      options: ['Stop the blood transfusion immediately', 'Slow down the infusion rate', 'Administer paracetamol and continue', 'Notify the blood bank operator'],
      correctAnswer: 0,
      explanation: 'These are classic signs of an acute hemolytic reaction. The immediate priority is to stop the blood transfusion to prevent further reaction.',
      topic: topic
    },
    {
      questionText: `Which position is most appropriate for a patient immediately following a lumbar puncture?`,
      options: ['Prone position', 'Flat supine position for 4 to 6 hours', 'High Fowler\'s position', 'Trendelenburg position'],
      correctAnswer: 1,
      explanation: 'Remaining flat supine for 4–6 hours prevents spinal headache caused by cerebrospinal fluid (CSF) leakage.',
      topic: topic
    },
    {
      questionText: `A child with nephrotic syndrome presents with generalized edema. Which dietary modification should the nurse recommend?`,
      options: ['Low sodium, adequate protein diet', 'High sodium, low protein diet', 'Fluid restriction only', 'High carbohydrate, high fat diet'],
      correctAnswer: 0,
      explanation: 'Nephrotic syndrome leads to sodium retention and edema. A low-sodium diet with adequate protein helps manage fluid overload and protein loss.',
      topic: topic
    },
    {
      questionText: `Which antidote should be readily available for a patient receiving continuous IV heparin therapy?`,
      options: ['Protamine Sulfate', 'Vitamin K', 'Calcium Gluconate', 'Flumazenil'],
      correctAnswer: 0,
      explanation: 'Protamine sulfate is the specific antidote for heparin overdose. Vitamin K is the antidote for Warfarin.',
      topic: topic
    },
    {
      questionText: `While assessing a newborn, the nurse notes blue hands and feet with a pink trunk. How should the nurse document this finding?`,
      options: ['Acrocyanosis (Normal finding in newborns)', 'Central Cyanosis (Pathological)', 'Hypoxia requiring oxygen therapy', 'Raynaud Phenomenon'],
      correctAnswer: 0,
      explanation: 'Acrocyanosis (bluish hands/feet) is normal in the first 24–48 hours of life due to immature peripheral circulation.',
      topic: topic
    },
    {
      questionText: `A patient with type 1 diabetes presents with tremors, diaphoresis, and confusion. What is the priority nursing intervention?`,
      options: ['Administer 15–20g of fast-acting carbohydrate', 'Administer regular insulin IV', 'Check serum potassium level', 'Encourage deep breathing exercises'],
      correctAnswer: 0,
      explanation: 'These are symptoms of hypoglycemia. Immediate oral fast-acting glucose or simple sugar is required for conscious patients.',
      topic: topic
    },
    {
      questionText: `Which landmark is used by the nurse to measure fundal height in a pregnant woman at 20 weeks of gestation?`,
      options: ['At the level of the Umbilicus', 'Symphysis pubis', 'Xiphoid process', 'Midway between symphysis pubis and umbilicus'],
      correctAnswer: 0,
      explanation: 'At 20 weeks gestation, the uterine fundus is typically at the level of the umbilicus.',
      topic: topic
    },
    {
      questionText: `A patient receiving digoxin reports seeing yellowish-green halos around lights. What action should the nurse take first?`,
      options: ['Withhold digoxin and check serum digoxin level', 'Reassure patient this is normal', 'Increase fluid intake', 'Administer atropine IV'],
      correctAnswer: 0,
      explanation: 'Visual disturbances (yellow-green halos) are classic signs of digoxin toxicity. Digoxin should be withheld and serum level checked.',
      topic: topic
    },
    {
      questionText: `What is the recommended chest compression depth for adult CPR according to AHA guidelines?`,
      options: ['At least 2 inches (5 cm)', '1 inch (2.5 cm)', '3 inches (7.5 cm)', '1.5 inches (4 cm)'],
      correctAnswer: 0,
      explanation: 'High-quality CPR in adults requires chest compressions of at least 2 inches (5 cm) at a rate of 100–120 compressions/min.',
      topic: topic
    }
  ];

  const result = [];
  for (let i = 0; i < count; i++) {
    const template = sampleBank[i % sampleBank.length];
    result.push({
      ...template,
      questionText: `${template.questionText} (${topic} Practice Q${i + 1})`,
      topic: topic
    });
  }
  return result;
};

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

// GET /api/tests/debug-long
router.get('/debug-long', async (req, res) => {
  try {
    const tests = await Test.find({ title: /AIIMS NORCET - Psychiatry Mock Test/ });
    let longQs = [];
    tests.forEach(test => {
      test.questions.forEach((q, i) => {
        if (q.questionText && q.questionText.length > 300) {
          longQs.push(`Q${i+1}: ${q.questionText.substring(0, 100)}...`);
        }
      });
    });
    res.json({ longQuestions: longQs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/tests/debug-mock
router.get('/debug-mock', async (req, res) => {
  try {
    const tests = await Test.find({ title: /AIIMS NORCET - Psychiatry Mock Test/ });
    if (tests.length === 0) return res.json({ message: "No tests found" });
    
    // Just return the first 3 questions of the first test
    const debugData = tests[0].questions.slice(0, 3).map(q => ({
      questionText: q.questionText,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation
    }));
    res.json(debugData);
  } catch (err) {
    res.status(500).json({ error: err.message });
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

    // Clean any leftover prefixes from question text before sending to client
    const testObj = test.toObject();
    testObj.questions = testObj.questions.map(q => ({
      ...q,
      questionText: stripPrefix(q.questionText)
    }));

    console.log(`[DEBUG] Test found: ${test.title}`);
    res.json(testObj);
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

// POST /api/tests/generate - Generate custom AI test
router.post('/generate', protect, async (req, res) => {
  try {
    const { topic, difficulty = 'medium', numberOfQuestions = 10 } = req.body;
    console.log(`[GENERATE] Starting generation for topic: "${topic}", difficulty: ${difficulty}, count: ${numberOfQuestions}`);
    
    if (!topic) {
      return res.status(400).json({ message: 'Topic is required' });
    }

    const prompt = getIndianNursingPrompt(topic, numberOfQuestions, difficulty);
    console.log(`[GENERATE] Prompt built, calling AI...`);

    const aiResponse = await chat(
      [
        { role: 'system', content: prompt },
        { role: 'user', content: 'Generate the questions as JSON now.' }
      ],
      4000
    );

    console.log(`[GENERATE] AI responded. Length: ${aiResponse ? aiResponse.length : 0}`);
    console.log(`[GENERATE] Raw response (first 500 chars): ${aiResponse ? aiResponse.substring(0, 500) : 'NULL'}`);

    let questions = [];

    if (!aiResponse || aiResponse.startsWith('ERROR:') || aiResponse.startsWith('AI analysis unavailable')) {
      console.warn(`[GENERATE] AI service unavailable (${aiResponse}). Generating curated fallback test questions for "${topic}"...`);
      questions = generateFallbackQuestions(topic, numberOfQuestions);
    } else {
      // Robust JSON extraction
      let jsonString = aiResponse.trim();
      if (jsonString.includes('```json')) {
        jsonString = jsonString.split('```json')[1].split('```')[0].trim();
      } else if (jsonString.includes('```')) {
        jsonString = jsonString.split('```')[1].split('```')[0].trim();
      }
      const firstBrace = jsonString.indexOf('{');
      const lastBrace = jsonString.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1) {
        jsonString = jsonString.substring(firstBrace, lastBrace + 1);
      }

      console.log(`[GENERATE] Cleaned JSON (first 300 chars): ${jsonString.substring(0, 300)}`);

      let parsed;
      try {
        parsed = JSON.parse(jsonString);
      } catch (parseErr) {
        console.error(`[GENERATE] JSON parse error: ${parseErr.message}, falling back to curated questions`);
        questions = generateFallbackQuestions(topic, numberOfQuestions);
      }

      if (parsed && parsed.questions && Array.isArray(parsed.questions) && parsed.questions.length > 0) {
        questions = parsed.questions.map((q, idx) => {
          const correctIndex = Array.isArray(q.options)
            ? q.options.findIndex(opt => opt.is_correct === true)
            : -1;
          
          const mappedOptions = Array.isArray(q.options)
            ? q.options.map(opt => typeof opt === 'string' ? opt : (opt.text || String(opt)))
            : [];

          const scenario = q.scenario ? q.scenario.trim() : '';
          const stem = stripPrefix(q.question_stem || q.questionText || `Question ${idx + 1}`);
          const fullText = scenario ? `${scenario}\n\n${stem}` : stem;

          return {
            questionText: fullText,
            options: mappedOptions,
            correctAnswer: correctIndex !== -1 ? correctIndex : 0,
            explanation: q.rationale || q.correct_rationale || '',
            topic: topic
          };
        }).filter(q => q.options.length >= 2);
      }

      if (questions.length === 0) {
        console.warn(`[GENERATE] No valid questions parsed from AI. Using fallback questions for "${topic}"`);
        questions = generateFallbackQuestions(topic, numberOfQuestions);
      }
    }

    if (questions.length === 0) {
      questions = generateFallbackQuestions(topic, numberOfQuestions);
    }

    console.log(`[GENERATE] Creating test with ${questions.length} questions in DB...`);

    const newTest = await Test.create({
      title: `${topic} - AI Practice Test`,
      description: `Custom generated AI practice test for ${topic}.`,
      topic: topic,
      difficulty: difficulty,
      examType: 'general',
      questions: questions,
      isFree: true
    });

    console.log(`[GENERATE] Test created: ${newTest._id}`);
    res.status(201).json(newTest);

  } catch (error) {
    console.error('[GENERATE] Unhandled error:', error);
    res.status(500).json({ message: 'Failed to generate test using AI', error: error.message });
  }
});

module.exports = router;
