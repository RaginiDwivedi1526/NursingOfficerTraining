const { chat } = require('./openaiService');
const { getNclexPrompt, getIndianNursingPrompt } = require('./questionPrompts');

// Core Subject Weightings (Percentage Distribution)
const SUBJECT_WEIGHTS = [
  { name: 'Medical-Surgical Nursing', weight: 0.25 },
  { name: 'Pharmacology & Therapeutics', weight: 0.20 },
  { name: 'Obstetrics & Gynecological Nursing', weight: 0.15 },
  { name: 'Pediatric (Child Health) Nursing', weight: 0.15 },
  { name: 'Mental Health (Psychiatric) Nursing', weight: 0.10 },
  { name: 'Nursing Foundations (Fundamentals of Nursing)', weight: 0.10 },
  { name: 'Community Health Nursing', weight: 0.05 }
];

const DIFFICULTY_LEVELS = {
  1: { level: 1, name: 'Below Base', label: 'Level 1: Below Base (Foundational)' },
  2: { level: 2, name: 'Base', label: 'Level 2: Base (Standard Passing)' },
  3: { level: 3, name: 'Advanced Hard', label: 'Level 3: Advanced Hard' },
  4: { level: 4, name: 'Peak Level', label: 'Level 4: Peak Level (High Complexity)' }
};

// Select next subject following exact target subject weight proportions or fixed subject
const selectNextSubject = (subjectQuotas = {}, fixedSubject = null) => {
  if (fixedSubject && fixedSubject !== 'All Subjects' && !fixedSubject.toLowerCase().includes('all mock') && !fixedSubject.toLowerCase().includes('full length')) {
    return fixedSubject;
  }
  let minFulfilledSubject = SUBJECT_WEIGHTS[0].name;
  let minRatio = Infinity;

  for (const item of SUBJECT_WEIGHTS) {
    const currentCount = subjectQuotas[item.name] || 0;
    const currentRatio = currentCount / item.weight;
    if (currentRatio < minRatio) {
      minRatio = currentRatio;
      minFulfilledSubject = item.name;
    }
  }

  return minFulfilledSubject;
};

// Calculate next adaptive difficulty level based on candidate answer performance
const calculateNextDifficulty = (currentLevel, isCorrect, consecutiveCorrect, consecutiveIncorrect) => {
  let nextLevel = currentLevel;

  if (isCorrect) {
    // Correct answer -> move up level towards Peak
    if (currentLevel === 1) nextLevel = 2; // Below Base -> Base
    else if (currentLevel === 2) nextLevel = 3; // Base -> Hard
    else if (currentLevel === 3) nextLevel = 4; // Hard -> Peak
    else if (currentLevel === 4) nextLevel = 4; // Stay at Peak level
  } else {
    // Incorrect answer -> move down or step down from Peak after 2-3 misses
    if (currentLevel === 4) {
      // If student gets 2 or 3 tough questions wrong at Peak, step down to Level 3 (Hard)
      if (consecutiveIncorrect >= 2) {
        nextLevel = 3;
      } else {
        nextLevel = 4; // Give one more chance at Peak level before dropping down
      }
    } else if (currentLevel === 3) {
      nextLevel = 2; // Hard -> Base
    } else if (currentLevel === 2) {
      nextLevel = 1; // Base -> Below Base
    } else if (currentLevel === 1) {
      nextLevel = 1; // Stay at Below Base until answered correctly
    }
  }

  return nextLevel;
};

// Update Rasch ability score (theta)
const updateAbilityTheta = (currentTheta, isCorrect, difficultyLevel) => {
  // Higher difficulty questions yield larger theta increases when correct
  const deltaCorrect = 0.15 + (difficultyLevel * 0.08);
  // Lower difficulty questions cause larger drops when wrong
  const deltaIncorrect = 0.15 + ((5 - difficultyLevel) * 0.08);

  if (isCorrect) {
    return Math.min(3.0, currentTheta + deltaCorrect);
  } else {
    return Math.max(-3.0, currentTheta - deltaIncorrect);
  }
};

// Evaluate statistical confidence interval & stopping condition
const evaluateStoppingCondition = (history, theta, passingStandard = 0.20, minQuestions = 15, maxQuestions = 50) => {
  const n = history.length;

  if (n < minQuestions) {
    return { shouldStop: false, result: null, reason: null };
  }

  // Calculate Standard Error (SE) of theta estimate
  const se = 1.0 / Math.sqrt(n);
  const lowerBound = theta - (1.96 * se);
  const upperBound = theta + (1.96 * se);

  // If 95% confidence interval is entirely above passing standard line
  if (lowerBound > passingStandard) {
    return {
      shouldStop: true,
      result: 'PASSED',
      reason: 'confidence_interval_met_pass'
    };
  }

  // If 95% confidence interval is entirely below passing standard line
  if (upperBound < passingStandard) {
    return {
      shouldStop: true,
      result: 'FAILED',
      reason: 'confidence_interval_met_fail'
    };
  }

  // If max questions reached, decision based on final theta vs passing line
  if (n >= maxQuestions) {
    const passed = theta >= passingStandard;
    return {
      shouldStop: true,
      result: passed ? 'PASSED' : 'FAILED',
      reason: 'max_questions'
    };
  }

  return { shouldStop: false, result: null, reason: null };
};

// Generate adaptive question dynamically via AI or curated pool
const generateAdaptiveQuestion = async (subject, difficultyLevel, examType = 'nclex_rn') => {
  const diffInfo = DIFFICULTY_LEVELS[difficultyLevel] || DIFFICULTY_LEVELS[2];
  
  const prompt = `You are a Computer Adaptive Testing (CAT) Item Writer for Next Generation NCLEX (NGN) and AIIMS NORCET.

TASK: Generate ONE highly specific practice question for the subject: ${subject}.
TARGET ADAPTIVE LEVEL: Level ${diffInfo.level} - ${diffInfo.name}.

LEVEL-SPECIFIC INSTRUCTIONS:
- Level 1 (Below Base): Foundational recall & core nursing assessment principles. Patient scenario (1-2 sentences).
- Level 2 (Base): Standard NCLEX/NORCET passing level clinical decision making. Patient scenario (2-3 sentences).
- Level 3 (Advanced Hard): High-order priority nursing action, complex pharmacological toxicity, or sudden clinical decompensation. Patient scenario (3-4 sentences with vitals/labs).
- Level 4 (Peak Level): Extremely challenging multi-system complication, high-acuity ICU/Emergency trauma scenario, or subtle prioritization differential. Patient scenario (4-5 sentences with detailed vitals, labs, ABGs, and ongoing interventions).

MANDATORY JSON OUTPUT SCHEMA:
{
  "questionText": "string (the complete clinical scenario followed by the explicit question stem)",
  "options": ["Option A text", "Option B text", "Option C text", "Option D text"],
  "correctAnswer": 0, // integer index (0, 1, 2, or 3)
  "explanation": "string (detailed rationale explaining the correct answer and distractor analysis)",
  "topic": "${subject}"
}`;

  try {
    const aiResponse = await chat([
      { role: 'system', content: prompt },
      { role: 'user', content: 'Generate the adaptive CAT question as JSON now.' }
    ], 2000);

    let jsonString = aiResponse ? aiResponse.trim() : '';
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

    const parsed = JSON.parse(jsonString);
    if (parsed && parsed.questionText && Array.isArray(parsed.options) && parsed.options.length === 4) {
      return {
        questionText: parsed.questionText,
        options: parsed.options,
        correctAnswer: typeof parsed.correctAnswer === 'number' ? parsed.correctAnswer : 0,
        explanation: parsed.explanation || '',
        topic: subject,
        difficultyLevel: diffInfo.level,
        difficultyName: diffInfo.name
      };
    }
  } catch (err) {
    console.warn('[CAT Engine] AI generation fallback triggered:', err.message);
  }

  // Fallback curated questions per level if AI service is slow
  return getCuratedFallbackAdaptiveQuestion(subject, difficultyLevel);
};

// Fallback curated pool per adaptive level
const getCuratedFallbackAdaptiveQuestion = (subject, difficultyLevel) => {
  const pool = {
    1: { // Below Base
      questionText: `A patient admitted to the medical ward under ${subject} is scheduled for an invasive diagnostic procedure. Which fundamental nursing action must be confirmed prior to procedure initiation?`,
      options: [
        'Verify signed informed consent and patient identity using two unique identifiers',
        'Administer broad-spectrum IV antibiotics immediately',
        'Place patient in strict Trendelenburg position',
        'Discontinue all routine home oral medications'
      ],
      correctAnswer: 0,
      explanation: 'Patient safety guidelines mandate verifying identity using two identifiers and confirming informed consent prior to invasive procedures.',
      topic: subject
    },
    2: { // Base
      questionText: `A nurse is caring for a patient in ${subject}. The patient's vital signs are: BP 118/76 mmHg, HR 84 bpm, RR 18/min, SpO2 97% on room air. The patient reports mild incisional discomfort rated 3/10. What is the most appropriate initial nursing intervention?`,
      options: [
        'Reposition patient for comfort and offer non-pharmacological pain relief methods',
        'Activate emergency rapid response team immediately',
        'Administer IV bolus opioid analgesia without assessment',
        'Prepare patient for emergency surgical re-exploration'
      ],
      correctAnswer: 0,
      explanation: 'Mild pain with stable vital signs calls for conservative non-pharmacological interventions and re-assessment.',
      topic: subject
    },
    3: { // Advanced Hard
      questionText: `CLINICAL CASE SCENARIO: A 54-year-old patient admitted under ${subject} develops sudden dyspnea, bilateral basalar crackles, and a blood pressure drop from 134/82 mmHg to 90/58 mmHg 2 hours after starting a rapid IV fluid bolus. Heart rate is 114 bpm.\n\nWhich intervention should the nurse perform FIRST?`,
      options: [
        'Stop IV fluid infusion, elevate head of bed to High-Fowler\'s, and administer supplemental oxygen',
        'Increase IV fluid infusion rate to treat hypotension',
        'Administer IV vasopressors without assessing lung sounds',
        'Place patient in flat supine position and recheck vitals in 1 hour'
      ],
      correctAnswer: 0,
      explanation: 'These findings indicate fluid overload and acute pulmonary congestion. Stopping fluids, elevating HOB, and giving O2 are immediate priorities.',
      topic: subject
    },
    4: { // Peak Level
      questionText: `CLINICAL CASE SCENARIO: A 66-year-old patient in the Intensive Care Unit undergoing aggressive management for severe ${subject} decompensation exhibits telemetry showing widening QRS complexes and peaked T waves. Arterial Blood Gas reveals pH 7.15, PaCO2 28 mmHg, HCO3 10 mEq/L, and serum potassium is 7.1 mEq/L.\n\nWhich emergency drug combination must the nurse prepare for IMMEDIATE administration to prevent fatal cardiac arrest?`,
      options: [
        'IV Calcium Gluconate to stabilize cardiac membranes, followed by IV Regular Insulin with 50% Dextrose',
        'Oral Sodium Polystyrene Sulfonate (Kayexalate) only',
        'IV Furosemide bolus without continuous EKG monitoring',
        'IV Sublingual Nitroglycerin with Subcutaneous Heparin'
      ],
      correctAnswer: 0,
      explanation: 'Severe hyperkalemia with EKG changes is a cardiac emergency. Calcium Gluconate stabilizes the myocardium immediately while insulin/dextrose shifts potassium into cells.',
      topic: subject
    }
  };

  const selected = pool[difficultyLevel] || pool[2];
  const diffInfo = DIFFICULTY_LEVELS[difficultyLevel] || DIFFICULTY_LEVELS[2];

  return {
    ...selected,
    difficultyLevel: diffInfo.level,
    difficultyName: diffInfo.name
  };
};

module.exports = {
  SUBJECT_WEIGHTS,
  DIFFICULTY_LEVELS,
  selectNextSubject,
  calculateNextDifficulty,
  updateAbilityTheta,
  evaluateStoppingCondition,
  generateAdaptiveQuestion
};
