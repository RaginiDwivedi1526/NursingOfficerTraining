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

/**
 * Strips any embedded options block (e.g. A. ... B. ... C. ... D. ...) from question text or scenario.
 */
const stripEmbeddedOptions = (text) => {
  if (!text) return '';
  const lines = String(text).split('\n');
  let optionStartIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (/^(?:[A-Da-d1-4][.)\]\-]|\([A-Da-d1-4]\))\s+/.test(trimmed)) {
      const remainingLines = lines.slice(i).filter(l => l.trim().length > 0);
      const optionLikeCount = remainingLines.filter(l => /^(?:[A-Da-d1-4][.)\]\-]|\([A-Da-d1-4]\))\s+/.test(l.trim())).length;
      if (optionLikeCount >= 2) {
        optionStartIndex = i;
        break;
      }
    }
  }

  if (optionStartIndex !== -1) {
    return lines.slice(0, optionStartIndex).join('\n').trim();
  }
  return text.trim();
};

/**
 * Strips option prefixes like "A. ", "B) ", "(C) ", "1. " from individual options.
 */
const stripOptionPrefix = (text) => {
  if (!text) return '';
  return String(text).replace(/^(?:[A-Da-d1-4][.)\]\-]|\([A-Da-d1-4]\))\s*/, '').trim();
};

const { getTopicQuestionsList } = require('../services/topicQuestions');

const generateFallbackQuestions = (topic, count = 10, diffLevel = 1, initialExcludedStems = []) => {
  return getTopicQuestionsList(topic, count, diffLevel, initialExcludedStems);
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

// GET /api/tests/reseed - Trigger full database reseed of authentic topic tests with 4 difficulty levels
router.get('/reseed', async (req, res) => {
  try {
    console.log('[RESEED] Starting full authentic reseed via endpoint...');
    const { seedDatabase } = require('../seedAllUnits');
    const result = await seedDatabase();
    const count = await Test.countDocuments({ title: { $regex: /Practice Test/i } });
    res.json({
      success: true,
      message: `Successfully re-seeded ${count} authentic topic-wise tests with 4 distinct difficulty levels!`,
      testsCount: count,
      result
    });
  } catch (err) {
    console.error('[RESEED] Error during reseed:', err);
    res.status(500).json({ success: false, error: err.message });
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
    console.log('[DEBUG-MOCK] Running authentic database reseed...');
    const { seedDatabase } = require('../seedAllUnits');
    const result = await seedDatabase();
    res.json({ message: "Reseed completed successfully", result });
  } catch (err) {
    res.status(500).json({ error: err.message, stack: err.stack });
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

    // Clean any leftover prefixes and embedded options from question text & options before sending to client
    const testObj = test.toObject();
    testObj.questions = testObj.questions.map(q => ({
      ...q,
      questionText: stripEmbeddedOptions(stripPrefix(q.questionText)),
      options: (q.options || []).map(stripOptionPrefix)
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
    const { answers, timeTaken } = req.body; // answers: [{ questionId, questionIndex, selectedAnswer, timeTaken }]
    const test = await Test.findById(req.params.id);
    if (!test) return res.status(404).json({ message: 'Test not found' });

    const mongoose = require('mongoose');

    // Process answers
    let correctCount = 0;
    let incorrectCount = 0;
    const topicMap = {};
    const processedAnswers = [];

    const answerList = Array.isArray(answers) ? answers : [];

    for (let i = 0; i < answerList.length; i++) {
      const ans = answerList[i];
      let question = null;

      // 1. Try matching by ObjectId if valid
      if (ans.questionId) {
        if (test.questions.id && mongoose.Types.ObjectId.isValid(ans.questionId)) {
          question = test.questions.id(ans.questionId);
        }
        if (!question) {
          question = test.questions.find(q => String(q._id) === String(ans.questionId));
        }
      }

      // 2. If not matched by ID, try matching by questionIndex or array index i
      if (!question) {
        const targetIndex = ans.questionIndex !== undefined ? ans.questionIndex : i;
        if (targetIndex >= 0 && targetIndex < test.questions.length) {
          question = test.questions[targetIndex];
        }
      }

      if (!question) continue;

      const isAttempted = ans.selectedAnswer !== -1 && ans.selectedAnswer !== undefined && ans.selectedAnswer !== null;
      const isCorrect = isAttempted && Number(question.correctAnswer) === Number(ans.selectedAnswer);

      if (isCorrect) {
        correctCount++;
      } else if (isAttempted) {
        incorrectCount++;
      }

      // Track topic performance
      const topicName = question.topic || test.topic || 'General Nursing';
      if (!topicMap[topicName]) {
        topicMap[topicName] = { total: 0, correct: 0 };
      }
      topicMap[topicName].total++;
      if (isCorrect) topicMap[topicName].correct++;

      processedAnswers.push({
        questionId: question._id,
        selectedAnswer: isAttempted ? Number(ans.selectedAnswer) : -1,
        isCorrect,
        topic: topicName,
        timeTaken: ans.timeTaken || 0
      });
    }

    // Build topic performance array
    const topicPerformance = Object.entries(topicMap).map(([topic, data]) => ({
      topic,
      totalQuestions: data.total,
      correctAnswers: data.correct,
      accuracy: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0
    }));

    // Calculate Score with -1/3 Negative Marking per wrong answer
    const negativeMarking = 1 / 3;
    const negativeMarksDeducted = Number((incorrectCount * negativeMarking).toFixed(2));
    const totalMarks = test.questions.length * 1.0;
    const positiveMarks = Number((correctCount * 1.0).toFixed(2));
    let marksObtained = Number((positiveMarks - negativeMarksDeducted).toFixed(2));
    if (marksObtained < 0) marksObtained = 0; // Prevent negative total scores
    
    const attemptedCount = correctCount + incorrectCount;
    const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
    const score = totalMarks > 0 ? Math.round((marksObtained / totalMarks) * 100) : 0;
    const isPassed = marksObtained >= (totalMarks * 0.5);

    const defaultStatusSummary = req.body.statusSummary || {
      answered: correctCount + incorrectCount,
      answeredMarked: 0,
      visitedUnanswered: 0,
      marked: 0,
      notVisited: Math.max(0, test.questions.length - (correctCount + incorrectCount)),
      total: test.questions.length
    };

    const result = await TestResult.create({
      user: req.user._id,
      test: test._id,
      answers: processedAnswers,
      totalQuestions: test.questions.length,
      correctAnswers: correctCount,
      incorrectAnswers: incorrectCount,
      unattemptedAnswers: Math.max(0, test.questions.length - (correctCount + incorrectCount)),
      positiveMarks,
      negativeMarksDeducted,
      marksObtained,
      totalMarks,
      accuracy,
      isPassed,
      statusSummary: defaultStatusSummary,
      catTelemetry: req.body.catTelemetry || null,
      score,
      timeTaken: timeTaken || 0,
      topicPerformance
    });

    // Update user's weekly scores (guard against missing createdAt)
    const userCreatedAt = req.user.createdAt ? new Date(req.user.createdAt).getTime() : Date.now();
    const currentWeek = Math.max(1, Math.ceil((Date.now() - userCreatedAt) / (7 * 24 * 60 * 60 * 1000)));
    await User.findByIdAndUpdate(req.user._id, {
      $push: { weeklyScores: { week: currentWeek, score, date: new Date() } }
    });

    // Return result with correct answers and explanations for comprehensive review
    const resultObj = result.toObject();
    resultObj.positiveMarks = positiveMarks;

    res.status(201).json({
      result: resultObj,
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

// POST /api/tests/generate - Generate custom AI test with CAT qualities
router.post('/generate', protect, async (req, res) => {
  try {
    const { topic, difficulty = 'hard', numberOfQuestions = 10, examType = 'general' } = req.body;
    
    // Resolve difficulty strictly: 1-Easy/Foundational, 2-Moderate/Base, 3-Hard/Advanced, 4-Expert/Peak
    let diffKey = 'moderate';
    let diffLevel = 2;
    let diffName = 'Level 2: Base Clinical';

    const diffStr = String(difficulty || '').toLowerCase();
    if (diffStr === '4' || diffStr.includes('peak') || diffStr.includes('expert') || diffStr.includes('icu') || diffStr.includes('level-4') || diffStr.includes('level 4')) {
      diffKey = 'expert';
      diffLevel = 4;
      diffName = 'Level 4: Peak Acuity';
    } else if (diffStr === '3' || diffStr.includes('hard') || diffStr.includes('advanc') || diffStr.includes('level-3') || diffStr.includes('level 3')) {
      diffKey = 'hard';
      diffLevel = 3;
      diffName = 'Level 3: Advanced Hard';
    } else if (diffStr === '1' || diffStr.includes('easy') || diffStr.includes('foundat') || diffStr.includes('level-1') || diffStr.includes('level 1') || diffStr.includes('basic')) {
      diffKey = 'easy';
      diffLevel = 1;
      diffName = 'Level 1: Foundational Recall';
    } else {
      diffKey = 'moderate';
      diffLevel = 2;
      diffName = 'Level 2: Base Clinical';
    }

    const targetCount = Math.min(Math.max(Number(numberOfQuestions) || 10, 1), 25);
    console.log(`[GENERATE] Starting fast AI generation for topic: "${topic}", difficulty: ${diffName} (${diffKey}), count: ${targetCount}`);
    
    if (!topic) {
      return res.status(400).json({ message: 'Topic is required' });
    }

    // 1. Gather previously seen / attempted question stems for this user and topic
    const userId = req.user?._id;
    const userExcludedStems = new Set();
    const recentScenariosForPrompt = [];

    const cleanStemKey = (text) => {
      return String(text || '')
        .toLowerCase()
        .replace(/^clinical\s+(case\s+scenario|vignette|case\s+study|scenario)[\s:]+/i, '')
        .replace(/[^a-z0-9]/g, '')
        .substring(0, 100);
    };

    if (userId) {
      try {
        const [recentResults, userTests] = await Promise.all([
          TestResult.find({ user: userId }).populate('test', 'questions').sort({ createdAt: -1 }).limit(8).lean(),
          Test.find({ createdBy: userId }).sort({ createdAt: -1 }).limit(8).lean()
        ]);

        const addQuestions = (qs) => {
          if (Array.isArray(qs)) {
            for (const q of qs) {
              if (q && q.questionText) {
                const key = cleanStemKey(q.questionText);
                if (key) userExcludedStems.add(key);
                if (recentScenariosForPrompt.length < 12) {
                  const firstSentence = q.questionText.split(/[.?!]/)[0].substring(0, 80).replace(/\n/g, ' ').trim();
                  if (firstSentence && !recentScenariosForPrompt.includes(firstSentence)) {
                    recentScenariosForPrompt.push(firstSentence);
                  }
                }
              }
            }
          }
        };

        for (const r of recentResults) {
          if (r.test) addQuestions(r.test.questions);
        }
        for (const t of userTests) {
          addQuestions(t.questions);
        }
      } catch (err) {
        console.warn('[GENERATE] Error gathering user past questions:', err.message);
      }
    }

    console.log(`[GENERATE] Exclusion set populated with ${userExcludedStems.size} stems; ${recentScenariosForPrompt.length} recent cases provided to AI for anti-repetition.`);

    let collectedQuestions = [];
    const chosenStems = new Set();

    const isQuestionUnique = (qText) => {
      const key = cleanStemKey(qText);
      if (!key) return false;
      if (chosenStems.has(key)) return false;
      if (userExcludedStems.has(key)) return false;
      return true;
    };

    // Helper: Robust JSON extraction & parsing
    const parseAiQuestions = (aiResponse) => {
      if (!aiResponse || typeof aiResponse !== 'string') return [];
      if (aiResponse.startsWith('ERROR:') || aiResponse.startsWith('AI analysis unavailable')) return [];

      let text = aiResponse.trim();
      if (text.includes('```json')) {
        text = text.split('```json')[1].split('```')[0].trim();
      } else if (text.includes('```')) {
        text = text.split('```')[1].split('```')[0].trim();
      }

      const firstBrace = text.indexOf('{');
      const firstBracket = text.indexOf('[');
      let jsonString = text;

      if (firstBracket !== -1 && (firstBrace === -1 || firstBracket < firstBrace)) {
        const lastBracket = text.lastIndexOf(']');
        if (lastBracket !== -1) {
          jsonString = text.substring(firstBracket, lastBracket + 1);
        }
      } else if (firstBrace !== -1) {
        const lastBrace = text.lastIndexOf('}');
        if (lastBrace !== -1) {
          jsonString = text.substring(firstBrace, lastBrace + 1);
        }
      }

      jsonString = jsonString.replace(/,\s*([}\]])/g, '$1');

      try {
        const parsed = JSON.parse(jsonString);
        if (Array.isArray(parsed)) return parsed;
        if (parsed && Array.isArray(parsed.questions)) return parsed.questions;
        return [];
      } catch (err) {
        console.warn('[AI Parse Error]', err.message);
        return [];
      }
    };

    // Helper: Map raw AI question items to standard model
    const processRawQuestions = (rawList) => {
      if (!Array.isArray(rawList)) return;
      for (const q of rawList) {
        if (!q) continue;

        let correctIndex = -1;
        let cleanOptions = [];

        if (Array.isArray(q.options)) {
          q.options.forEach((opt, idx) => {
            if (typeof opt === 'object' && opt !== null) {
              cleanOptions.push(stripOptionPrefix(opt.text || opt.label || ''));
              if (opt.is_correct === true || opt.correct === true) {
                correctIndex = idx;
              }
            } else {
              cleanOptions.push(stripOptionPrefix(String(opt)));
            }
          });
        }

        if (correctIndex === -1 && typeof q.correctAnswer === 'number' && q.correctAnswer >= 0 && q.correctAnswer < cleanOptions.length) {
          correctIndex = q.correctAnswer;
        }
        if (correctIndex === -1) {
          correctIndex = 0;
        }

        const scenario = q.scenario ? q.scenario.trim() : '';
        const stem = stripPrefix(q.question_stem || q.questionText || '');
        const fullText = stripEmbeddedOptions(scenario ? `${scenario}\n\n${stem}` : stem);
        const validOptions = cleanOptions.map(stripOptionPrefix).filter(Boolean);

        if (validOptions.length >= 2 && isQuestionUnique(fullText)) {
          chosenStems.add(cleanStemKey(fullText));
          collectedQuestions.push({
            questionText: fullText,
            options: validOptions,
            correctAnswer: correctIndex,
            explanation: q.rationale || q.correct_rationale || q.explanation || '',
            topic: topic,
            difficultyLevel: diffLevel,
            difficultyName: diffName
          });
          if (collectedQuestions.length >= targetCount) break;
        }
      }
    };

    // 2. Parallel Fast AI Generation (cuts response time from ~28s to ~12s!)
    try {
      const isNclex = String(examType || '').toLowerCase().includes('nclex');
      const getPromptFn = isNclex ? getNclexPrompt : getIndianNursingPrompt;

      const aiPromises = [];
      const withTimeout = (promise, ms = 45000) => {
        return Promise.race([
          promise,
          new Promise((_, reject) => setTimeout(() => reject(new Error('AI request timeout (>45s)')), ms))
        ]);
      };

      if (targetCount >= 6) {
        const count1 = Math.ceil(targetCount / 2);
        const count2 = Math.floor(targetCount / 2);

        console.log(`[GENERATE] Launching 2 parallel AI streams (${count1} + ${count2} questions)...`);

        const prompt1 = getPromptFn(topic, count1, diffKey, recentScenariosForPrompt, 'Acute Assessment, Diagnosis, Nursing Priorities & Emergency Management');
        const prompt2 = getPromptFn(topic, count2, diffKey, recentScenariosForPrompt, 'Pharmacology Interventions, Adverse Reactions, Complications & Patient Safety');

        const p1 = withTimeout(chat([
          { role: 'system', content: prompt1 },
          { role: 'user', content: `Generate ${count1} authentic ${diffName} clinical case study questions on ${topic} as JSON now.` }
        ], 1800, { temperature: 0.85 }));

        const p2 = withTimeout(chat([
          { role: 'system', content: prompt2 },
          { role: 'user', content: `Generate ${count2} authentic ${diffName} clinical case study questions on ${topic} as JSON now.` }
        ], 1800, { temperature: 0.88 }));

        aiPromises.push(p1, p2);
      } else {
        console.log(`[GENERATE] Launching single AI stream for ${targetCount} questions...`);
        const promptSingle = getPromptFn(topic, targetCount, diffKey, recentScenariosForPrompt, 'Clinical Assessment, Priority Decision Making & Nursing Interventions');
        const pSingle = withTimeout(chat([
          { role: 'system', content: promptSingle },
          { role: 'user', content: `Generate ${targetCount} authentic ${diffName} clinical case study questions on ${topic} as JSON now.` }
        ], 2200, { temperature: 0.85 }));

        aiPromises.push(pSingle);
      }

      const results = await Promise.allSettled(aiPromises);

      for (const res of results) {
        if (res.status === 'fulfilled' && res.value) {
          const parsedList = parseAiQuestions(res.value);
          processRawQuestions(parsedList);
        } else if (res.status === 'rejected') {
          console.warn(`[GENERATE] An AI stream failed:`, res.reason?.message);
        }
      }

      console.log(`[GENERATE] AI generation retrieved ${collectedQuestions.length}/${targetCount} unique fresh questions.`);
    } catch (aiErr) {
      console.warn(`[GENERATE] AI generation error: ${aiErr.message}`);
    }

    // 3. Fallback: If AI did not return full quota, draw remaining needed questions from DB pool
    if (collectedQuestions.length < targetCount) {
      try {
        const topicKeywords = topic.split(/[-–—,: /]+/).filter(w => w.length > 3);
        const searchRegex = topicKeywords.length > 0 ? topicKeywords.join('|') : topic;

        const dbTests = await Test.find({
          $or: [
            { topic: { $regex: searchRegex, $options: 'i' } },
            { title: { $regex: searchRegex, $options: 'i' } }
          ]
        }).select('questions').limit(20).lean();

        let pool = [];
        for (const t of dbTests) {
          if (Array.isArray(t.questions)) {
            for (const q of t.questions) {
              if (q && q.questionText && isQuestionUnique(q.questionText)) {
                pool.push(q);
              }
            }
          }
        }

        // Shuffle pool randomly
        pool.sort(() => Math.random() - 0.5);

        for (const q of pool) {
          const key = cleanStemKey(q.questionText);
          if (!chosenStems.has(key)) {
            chosenStems.add(key);
            collectedQuestions.push({
              questionText: q.questionText,
              options: Array.isArray(q.options) ? [...q.options] : [],
              correctAnswer: typeof q.correctAnswer === 'number' ? q.correctAnswer : 0,
              explanation: q.explanation || '',
              topic: topic,
              difficultyLevel: q.difficultyLevel || diffLevel,
              difficultyName: q.difficultyName || diffName
            });
            if (collectedQuestions.length >= targetCount) break;
          }
        }
      } catch (dbErr) {
        console.warn('[GENERATE] Error drawing from DB question pool:', dbErr.message);
      }
    }

    // 4. Fallback: If still more questions needed, draw from curated LEVEL-DIFFERENTIATED banks
    if (collectedQuestions.length < targetCount) {
      const remainingCount = targetCount - collectedQuestions.length;
      const initialExcluded = Array.from(new Set([...userExcludedStems, ...chosenStems]));
      const fallbackQuestions = generateFallbackQuestions(topic, remainingCount, diffLevel, initialExcluded);

      for (const q of fallbackQuestions) {
        const key = cleanStemKey(q.questionText);
        if (!chosenStems.has(key)) {
          chosenStems.add(key);
          collectedQuestions.push(q);
        } else {
          const variant = getTopicQuestionsList(topic, 1, diffLevel, Array.from(chosenStems))[0];
          if (variant) {
            chosenStems.add(cleanStemKey(variant.questionText));
            collectedQuestions.push(variant);
          }
        }
        if (collectedQuestions.length >= targetCount) break;
      }
    }

    // 5. Final polish: dynamically shuffle options (A, B, C, D) and recalculate correctAnswer index
    const finalizedQuestions = collectedQuestions.slice(0, targetCount).map((q) => {
      const opts = Array.isArray(q.options) ? [...q.options] : [];
      const origCorrectIdx = typeof q.correctAnswer === 'number' ? q.correctAnswer : 0;
      const correctText = opts[origCorrectIdx] || opts[0];

      // Shuffle options randomly
      const shuffledOpts = opts.slice().sort(() => Math.random() - 0.5);
      const newCorrectIdx = shuffledOpts.indexOf(correctText) !== -1 ? shuffledOpts.indexOf(correctText) : 0;

      return {
        ...q,
        options: shuffledOpts,
        correctAnswer: newCorrectIdx,
        difficultyLevel: q.difficultyLevel || diffLevel,
        difficultyName: q.difficultyName || diffName
      };
    });

    console.log(`[GENERATE] Test successfully generated with ${finalizedQuestions.length} unique questions for user ${userId || 'anonymous'}`);

    const newTest = await Test.create({
      title: `${topic} (${diffName}) - Practice Test`,
      description: `CAT-quality practice test for ${topic} at ${diffName}.`,
      topic: topic,
      difficulty: diffKey,
      difficultyLevel: diffLevel,
      difficultyName: diffName,
      examType: examType || 'general',
      questions: finalizedQuestions,
      totalQuestions: finalizedQuestions.length,
      createdBy: userId || null,
      isFree: true
    });

    res.status(201).json(newTest);

  } catch (error) {
    console.error('[GENERATE] Unhandled error:', error);
    res.status(500).json({ message: 'Failed to generate test', error: error.message });
  }
});

module.exports = router;
