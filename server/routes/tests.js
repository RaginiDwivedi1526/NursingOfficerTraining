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

const generateFallbackQuestions = (topic, count = 10, diffLevel = 1) => {
  const level1Bank = [
    {
      scenario: `CLINICAL CASE SCENARIO: A 58-year-old male with a history of acute anterior wall myocardial infarction 3 days ago is admitted to the Cardiac Intensive Care Unit (CICU). During assessment, the nurse notes sudden dyspnea, bilateral pulmonary crackles in all lung fields, a new loud holosystolic murmur at the apex radiating to the axilla, and a blood pressure drop from 130/80 mmHg to 88/54 mmHg. Heart rate is 118 bpm (sinus tachycardia).`,
      questionText: `Which life-threatening complication should the nurse suspect FIRST and prepare for immediate emergency management?`,
      options: [
        'Acute papillary muscle rupture causing severe mitral regurgitation and cardiogenic shock',
        'Ventricular septal defect resulting in left-to-right shunt',
        'Acute pericarditis with pericardial friction rub and cardiac tamponade',
        'Pulmonary embolism secondary to deep vein thrombosis'
      ],
      correctAnswer: 0,
      explanation: 'A sudden holosystolic murmur at the apex following anterior/inferior MI accompanied by pulmonary edema and acute severe hypotension indicates acute papillary muscle rupture leading to massive mitral regurgitation and cardiogenic shock, a surgical emergency.',
      topic: topic,
      difficultyLevel: 1,
      difficultyName: 'Level 1: Hard'
    },
    {
      scenario: `CLINICAL CASE SCENARIO: A 42-year-old female patient undergoing blood transfusion for severe anemia (Hb 6.2 g/dL) suddenly develops severe fever (102.4°F/39.1°C), rigors, severe flank pain, dyspnea, and reddish-brown urine in the Foley urinary bag 15 minutes after the start of packed red blood cell (PRBC) infusion. Her BP drops rapidly to 82/46 mmHg.`,
      questionText: `What is the immediate priority action the nurse must take?`,
      options: [
        'Stop the blood transfusion immediately and disconnect the tubing at the IV hub',
        'Slow the infusion rate to keep vein open and administer IV paracetamol',
        'Notify the attending physician and blood bank while continuing transfusion',
        'Administer IV diphenhydramine and hydrocortisone and flush line with D5W'
      ],
      correctAnswer: 0,
      explanation: 'These findings signify an acute ABO hemolytic transfusion reaction (a life-threatening type II hypersensitivity reaction). The nurse must stop the infusion immediately to prevent further hemolysis, disconnect tubing at the hub, and maintain line with 0.9% normal saline.',
      topic: topic,
      difficultyLevel: 1,
      difficultyName: 'Level 1: Hard'
    },
    {
      scenario: `CLINICAL CASE SCENARIO: A 34-year-old male patient with severe traumatic brain injury (TBI) following a motor vehicle collision is monitored in the Trauma ICU. The baseline intracranial pressure (ICP) was 12 mmHg. The nurse observes the ICP monitor rising abruptly to 28 mmHg, with Cushing\'s triad: BP 184/60 mmHg (widening pulse pressure), HR 48 bpm (bradycardia), and irregular Cheyne-Stokes respirations.`,
      questionText: `Which immediate nursing intervention is indicated to control elevated ICP?`,
      options: [
        'Administer IV hypertonic saline (3%) or Mannitol as prescribed and maintain head of bed at 30° in neutral alignment',
        'Place the patient in Trendelenburg position to improve cerebral venous drainage',
        'Perform vigorous endotracheal suctioning to clear secretions and improve oxygenation',
        'Flex the patient\'s hips and knees to 90 degrees to relieve abdominal muscle tension'
      ],
      correctAnswer: 0,
      explanation: 'Hyperosmolar therapy (Mannitol/Hypertonic Saline) decreases brain tissue edema. Elevating HOB to 30 degrees with neck in neutral alignment facilitates venous drainage from the brain. Hip flexion and suctioning elevate ICP further and must be avoided.',
      topic: topic,
      difficultyLevel: 1,
      difficultyName: 'Level 1: Hard'
    },
    {
      scenario: `CLINICAL CASE SCENARIO: A primigravida at 38 weeks gestation with severe preeclampsia (BP 174/110 mmHg, 3+ proteinuria, hyperreflexia with clonus) is receiving continuous IV Magnesium Sulfate infusion at 2 g/hr. During hourly monitoring, the nurse notes: Deep tendon reflexes (DTRs) are absent (0), Respiratory rate is 9 breaths/min, and Urine output is 18 mL over the past hour.`,
      questionText: `What is the immediate priority nursing action?`,
      options: [
        'Stop the Magnesium Sulfate infusion immediately and prepare to administer IV Calcium Gluconate',
        'Increase the infusion rate to control maternal blood pressure',
        'Document as expected therapeutic effect of magnesium sulfate',
        'Administer IV hydralazine and continue magnesium sulfate at current rate'
      ],
      correctAnswer: 0,
      explanation: 'Loss of DTRs, respiratory depression (<12/min), and oliguria (<30 mL/hr) are signs of severe Magnesium Toxicity. The infusion must be stopped immediately and the antidote Calcium Gluconate administered slow IV push.',
      topic: topic,
      difficultyLevel: 1,
      difficultyName: 'Level 1: Hard'
    },
    {
      scenario: `CLINICAL CASE SCENARIO: A 28-year-old male patient with Type 1 Diabetes Mellitus is brought to the emergency department unconscious. Blood glucose level is 480 mg/dL, arterial blood gas shows pH 7.14, PaCO2 24 mmHg, HCO3 10 mEq/L (Severe Diabetic Ketoacidosis - DKA). The nurse initiates IV fluid resuscitation and regular insulin infusion. Serum potassium level returns from lab at 3.1 mEq/L.`,
      questionText: `Which action must the nurse take regarding potassium and insulin management?`,
      options: [
        'Hold regular insulin infusion and administer IV potassium replacement until K+ is >3.3 mEq/L',
        'Double the regular insulin bolus to clear ketoacids rapidly',
        'Continue insulin infusion at current rate and withhold potassium until urinary output is >100 mL/hr',
        'Administer sodium bicarbonate IV push before starting potassium'
      ],
      correctAnswer: 0,
      explanation: 'Insulin drives potassium into cells, aggravating hypokalemia. If potassium is <3.3 mEq/L, insulin must be withheld and potassium repleted to avoid fatal cardiac arrhythmias.',
      topic: topic,
      difficultyLevel: 1,
      difficultyName: 'Level 1: Hard'
    }
  ];

  const level2Bank = [
    {
      scenario: `CLINICAL CASE SCENARIO: A 48-year-old female is 24 hours post-laparoscopic cholecystectomy on the surgical ward. She reports severe right shoulder pain rating 6/10. Her vital signs are: BP 122/78 mmHg, HR 78 bpm, RR 16/min, Temp 98.6°F (37°C), SpO2 99% on ambient air. Surgical incisions are clean, dry, and intact with no bleeding or erythema.`,
      questionText: `Which explanation and nursing intervention is most appropriate for this patient?`,
      options: [
        'Explain that pain is referred phrenic nerve irritation from residual CO2 gas; position in Sims\' left lateral recumbent position and encourage ambulation',
        'Activate code blue for suspected acute myocardial infarction',
        'Prepare the patient for emergency laparotomy for internal hemorrhage',
        'Place an abdominal binder on the patient tightly to compress incisions'
      ],
      correctAnswer: 0,
      explanation: 'Post-laparoscopic shoulder pain is caused by diaphragmatic phrenic nerve irritation from residual carbon dioxide. Early ambulation and positioning on the left side with knees flexed facilitate gas absorption.',
      topic: topic,
      difficultyLevel: 2,
      difficultyName: 'Level 2: Moderate'
    },
    {
      scenario: `CLINICAL CASE SCENARIO: A 62-year-old male with chronic heart failure is prescribed Enalapril 10 mg PO daily and Spironolactone 25 mg PO daily. During the outpatient clinic follow-up, the nurse reviews his latest laboratory findings: Serum Potassium is 5.6 mEq/L (normal: 3.5–5.0), Serum Creatinine 1.2 mg/dL, and Blood Pressure 124/80 mmHg.`,
      questionText: `What is the most appropriate action by the nurse?`,
      options: [
        'Withhold the next dose of Spironolactone, notify the healthcare provider, and review dietary potassium intake',
        'Administer the scheduled doses and encourage the client to eat more bananas and citrus fruits',
        'Instruct the client to double the Enalapril dose to clear the excess potassium',
        'Reassure the client that a potassium of 5.6 mEq/L is expected and safe on ACE inhibitors'
      ],
      correctAnswer: 0,
      explanation: 'Both ACE inhibitors (Enalapril) and aldosterone antagonists (Spironolactone) cause potassium retention. A serum potassium of 5.6 mEq/L represents hyperkalemia requiring withholding spironolactone and notifying the provider to prevent arrhythmias.',
      topic: topic,
      difficultyLevel: 2,
      difficultyName: 'Level 2: Moderate'
    },
    {
      scenario: `CLINICAL CASE SCENARIO: A 30-year-old G2P1 pregnant client at 32 weeks gestation attends the antenatal clinic. She tests positive for Gestational Diabetes Mellitus (GDM) on a 100g oral glucose tolerance test. Fasting plasma glucose is 108 mg/dL and 2-hour postprandial glucose is 156 mg/dL.`,
      questionText: `What is the first-line therapeutic management strategy the nurse should educate the client about?`,
      options: [
        'Individualized Medical Nutritional Therapy (MNT) with carbohydrate distribution and moderate daily physical activity',
        'Immediate commencement of high-dose subcutaneous insulin glargine',
        'Strict bed rest and restriction of all carbohydrate intake',
        'Elective induction of labor at 34 weeks gestation'
      ],
      correctAnswer: 0,
      explanation: 'Nutritional therapy and moderate exercise are the fundamental initial treatment for GDM. Pharmacotherapy (insulin or metformin) is only added if glycemic targets are not achieved by lifestyle modification alone.',
      topic: topic,
      difficultyLevel: 2,
      difficultyName: 'Level 2: Moderate'
    },
    {
      scenario: `CLINICAL CASE SCENARIO: A 5-year-old child admitted with acute bronchial asthma exacerbation is receiving nebulized Salbutamol (Albuterol) every 4 hours. Following the third treatment, the nurse assesses: Respiratory rate 24/min (down from 40/min), SpO2 96% on room air, Heart rate 116 bpm, and slight finger tremors.`,
      questionText: `How should the nurse interpret these findings?`,
      options: [
        'Improvement in respiratory status with anticipated beta-2 adrenergic medication side effects (tachycardia and tremors)',
        'Acute drug hypersensitivity reaction requiring immediate adrenaline injection',
        'Worsening respiratory failure requiring emergency endotracheal intubation',
        'Paradoxical bronchospasm requiring discontinuation of all bronchodilators'
      ],
      correctAnswer: 0,
      explanation: 'Beta-2 agonists like Salbutamol commonly stimulate adrenergic receptors leading to transient tachycardia and fine peripheral skeletal muscle tremors, while respiratory improvement is demonstrated by normalized RR and SpO2.',
      topic: topic,
      difficultyLevel: 2,
      difficultyName: 'Level 2: Moderate'
    }
  ];

  const level3Bank = [
    {
      scenario: `CLINICAL CASE SCENARIO: The nurse is preparing to administer 09:00 morning oral medications to an alert, oriented adult client admitted to the medical unit. The client is wearing a hospital identification bracelet and verbalizes their name and date of birth.`,
      questionText: `According to standard patient safety practice, what must the nurse perform to confirm patient identification before administering the medication?`,
      options: [
        'Compare the client’s stated name and birth date with the Medication Administration Record (MAR) and barcode ID band',
        'Check the room number and bed number on the door',
        'Ask the client’s roommate to confirm the client’s identity',
        'Administer the medication based on the client acknowledging their first name alone'
      ],
      correctAnswer: 0,
      explanation: 'Standard international patient safety goals mandate using at least two independent identifiers (name and date of birth or medical record number) cross-referenced against the MAR before medication administration. Room numbers are not acceptable identifiers.',
      topic: topic,
      difficultyLevel: 3,
      difficultyName: 'Level 3: Easy'
    },
    {
      scenario: `CLINICAL CASE SCENARIO: A nurse is measuring vital signs on an adult client admitted for elective knee arthroscopy. The nurse records: Oral temperature 98.4°F (36.9°C), Radial pulse 72 bpm regular, Blood pressure 118/76 mmHg, Respiratory rate 16 breaths/min regular and unlabored, SpO2 98% on ambient air.`,
      questionText: `How should the nurse document and evaluate these vital signs?`,
      options: [
        'All vital signs fall within expected adult physiological reference limits; document and continue routine care',
        'Hypotension present; notify physician immediately for fluid challenge',
        'Tachypnea present; apply supplemental oxygen via non-rebreather mask',
        'Bradypnea present; prepare intravenous naloxone'
      ],
      correctAnswer: 0,
      explanation: 'Normal resting adult vital sign ranges are: Pulse 60-100 bpm, BP <120/<80 mmHg, RR 12-20/min, Temp 97.8-99.1°F, SpO2 95-100%. All findings are completely normal.',
      topic: topic,
      difficultyLevel: 3,
      difficultyName: 'Level 3: Easy'
    },
    {
      scenario: `CLINICAL CASE SCENARIO: A registered nurse is preparing to perform a simple dry sterile dressing change for a clean surgical wound on the abdomen of a patient 2 days post-appendectomy.`,
      questionText: `Which fundamental principle of aseptic technique must the nurse adhere to?`,
      options: [
        'Perform thorough hand hygiene before and after touching the patient, and clean the wound from the center outward (least contaminated to most contaminated area)',
        'Clean the wound from the outer periphery inward towards the center',
        'Reuse the outer soiled dressing if the inner layer appears clean',
        'Touch sterile supplies with clean unwashed hands before applying sterile gloves'
      ],
      correctAnswer: 0,
      explanation: 'Surgical wound cleansing follows the principle of cleaning from cleanest (incision center) to dirtiest (periphery) to prevent reintroducing organisms into the surgical line, accompanied by hand hygiene.',
      topic: topic,
      difficultyLevel: 3,
      difficultyName: 'Level 3: Easy'
    },
    {
      scenario: `CLINICAL CASE SCENARIO: A nurse is collecting a routine midstream clean-catch urine specimen from an ambulatory female client to screen for suspected urinary tract infection.`,
      questionText: `Which instruction should the nurse provide to the client to ensure an accurate specimen?`,
      options: [
        'Cleanse the labia from front to back, begin voiding into the toilet, and pass the collection container into the stream without stopping',
        'Cleanse from back to front and collect the initial few milliliters of urine',
        'Collect urine from the bedpan after emptying bowels',
        'Fast from all liquids for 12 hours prior to collecting the specimen'
      ],
      correctAnswer: 0,
      explanation: 'A clean-catch midstream collection requires front-to-back cleansing to prevent perineal flora contamination, followed by letting the initial stream flush the urethral meatus before capturing the midstream portion.',
      topic: topic,
      difficultyLevel: 3,
      difficultyName: 'Level 3: Easy'
    }
  ];

  let bank = level1Bank;
  if (diffLevel === 3) bank = level3Bank;
  else if (diffLevel === 2) bank = level2Bank;

  const result = [];
  for (let i = 0; i < count; i++) {
    const template = bank[i % bank.length];
    result.push({
      questionText: `${template.scenario}\n\n${template.questionText}`,
      options: template.options,
      correctAnswer: template.correctAnswer,
      explanation: template.explanation,
      topic: topic,
      difficultyLevel: template.difficultyLevel,
      difficultyName: template.difficultyName
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

// POST /api/tests/generate - Generate custom AI test with CAT qualities
router.post('/generate', protect, async (req, res) => {
  try {
    const { topic, difficulty = 'hard', numberOfQuestions = 10, examType = 'general' } = req.body;
    
    // Resolve level 1-hard, 2-moderate, 3-easy
    let diffKey = 'hard';
    let diffLevel = 1;
    let diffName = 'Level 1: Hard';

    const diffStr = String(difficulty || '').toLowerCase();
    if (diffStr === '3' || diffStr.includes('easy') || diffStr.includes('level-3') || diffStr.includes('level 3')) {
      diffKey = 'easy';
      diffLevel = 3;
      diffName = 'Level 3: Easy';
    } else if (diffStr === '2' || diffStr.includes('mod') || diffStr.includes('med') || diffStr.includes('level-2') || diffStr.includes('level 2')) {
      diffKey = 'moderate';
      diffLevel = 2;
      diffName = 'Level 2: Moderate';
    } else {
      diffKey = 'hard';
      diffLevel = 1;
      diffName = 'Level 1: Hard';
    }

    console.log(`[GENERATE] Starting CAT generation for topic: "${topic}", difficulty: ${diffName} (${diffKey}), count: ${numberOfQuestions}`);
    
    if (!topic) {
      return res.status(400).json({ message: 'Topic is required' });
    }

    const prompt = getIndianNursingPrompt(topic, numberOfQuestions, diffKey);
    console.log(`[GENERATE] CAT Prompt built for ${diffName}, calling AI...`);

    const aiResponse = await chat(
      [
        { role: 'system', content: prompt },
        { role: 'user', content: `Generate authentic ${diffName} clinical case study questions as JSON now.` }
      ],
      6000
    );

    let questions = [];

    if (!aiResponse || aiResponse.startsWith('ERROR:') || aiResponse.startsWith('AI analysis unavailable')) {
      console.warn(`[GENERATE] AI service unavailable (${aiResponse}). Generating curated fallback test questions for "${topic}" at ${diffName}...`);
      questions = generateFallbackQuestions(topic, numberOfQuestions, diffLevel);
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

      let parsed;
      try {
        parsed = JSON.parse(jsonString);
      } catch (parseErr) {
        console.error(`[GENERATE] JSON parse error: ${parseErr.message}, falling back to curated questions`);
        questions = generateFallbackQuestions(topic, numberOfQuestions, diffLevel);
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
            topic: topic,
            difficultyLevel: diffLevel,
            difficultyName: diffName
          };
        }).filter(q => q.options.length >= 2);
      }

      if (questions.length === 0) {
        console.warn(`[GENERATE] No valid questions parsed from AI. Using fallback questions for "${topic}" at ${diffName}`);
        questions = generateFallbackQuestions(topic, numberOfQuestions, diffLevel);
      }
    }

    if (questions.length === 0) {
      questions = generateFallbackQuestions(topic, numberOfQuestions, diffLevel);
    }

    console.log(`[GENERATE] Creating test with ${questions.length} questions in DB at ${diffName}...`);

    const newTest = await Test.create({
      title: `${topic} (${diffName}) - Practice Test`,
      description: `CAT-quality practice test for ${topic} at ${diffName}.`,
      topic: topic,
      difficulty: diffKey,
      difficultyLevel: diffLevel,
      difficultyName: diffName,
      examType: examType || 'general',
      questions: questions,
      isFree: true
    });

    console.log(`[GENERATE] Test created: ${newTest._id} (${diffName})`);
    res.status(201).json(newTest);

  } catch (error) {
    console.error('[GENERATE] Unhandled error:', error);
    res.status(500).json({ message: 'Failed to generate test using AI', error: error.message });
  }
});

module.exports = router;
