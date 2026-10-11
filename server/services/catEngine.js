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
  
  const prompt = `You are an expert Chief Item Writer for UWorld, Archer Review, NCLEX-RN (NGN), and AIIMS NORCET.

TASK: Generate ONE authentic Computer Adaptive Testing (CAT) question for: ${subject}.
TARGET ADAPTIVE LEVEL: Level ${diffInfo.level} - ${diffInfo.name}.

LEVEL-SPECIFIC INSTRUCTIONS:
- Level 1 (Below Base): Foundational recall, core assessment principles, infection control, client safety rights.
- Level 2 (Base): Standard NCLEX/NORCET passing level clinical judgment, medication verification, diagnostic prioritization.
- Level 3 (Advanced Hard): High-order priority nursing action, complex pharmacological toxicity, sudden decompensation with vitals and labs.
- Level 4 (Peak Level): High-acuity ICU/Emergency trauma scenario with multi-system failure, detailed ABGs, telemetry dysrhythmias, critical lab values.

MANDATORY EXPLANATION SUMMARY FORMAT (STRICT UWORLD / ARCHER PATTERN):
The 'explanation' field MUST strictly follow this exact 3-part layout:
Explanation
[2-3 detailed paragraphs providing pathophysiological background, clinical assessment findings (e.g. vital signs, lab cues), and why the correct intervention takes absolute clinical priority.]

(Option 1) [Detailed rationale explaining why Option 1 is incorrect, contraindicated, or secondary.]
(Option 2) [Detailed rationale explaining why Option 2 is correct or incorrect.]
(Option 3) [Detailed rationale explaining why Option 3 is incorrect.]
(Option 4) [Detailed rationale explaining why Option 4 is incorrect.]

Educational objective:
[1-2 sentences stating the high-yield clinical takeaway and memorization principle for nursing exam success.]

MANDATORY JSON OUTPUT SCHEMA:
{
  "questionText": "string (the complete clinical case vignette with vitals/labs followed by explicit question stem)",
  "options": ["Option A text", "Option B text", "Option C text", "Option D text"],
  "correctAnswer": 0, // integer index (0, 1, 2, or 3)
  "explanation": "string (strictly formatted as shown above)",
  "peerPercentages": [14, 68, 11, 7], // 4 integers representing plausible peer percentage distribution totaling 100
  "topic": "${subject}"
}`;

  try {
    const aiResponse = await chat([
      { role: 'system', content: prompt },
      { role: 'user', content: 'Generate the adaptive CAT question with full UWorld/Archer summary pattern as JSON now.' }
    ], 2500);

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
        peerPercentages: Array.isArray(parsed.peerPercentages) && parsed.peerPercentages.length === 4 ? parsed.peerPercentages : [10, 72, 12, 6],
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

// Fallback curated pool per adaptive level (Authentic UWorld/Archer Pattern)
const getCuratedFallbackAdaptiveQuestion = (subject, difficultyLevel) => {
  const pool = {
    1: { // Below Base (Level 1)
      questionText: `CLINICAL CASE SCENARIO: A 62-year-old client admitted to the medical unit under ${subject} is scheduled for an invasive diagnostic procedure. The client is awake, alert, and oriented to person, place, and time. Prior to the procedure team arriving, the nurse enters the room to initiate the pre-procedure checklist.\n\nWhich fundamental nursing action must the nurse complete FIRST prior to procedure initiation?`,
      options: [
        'Verify signed informed consent and verify client identity using two unique identifiers',
        'Administer broad-spectrum prophylactic IV antibiotics immediately',
        'Place the client in a steep Trendelenburg position',
        'Discontinue all routine home oral cardiac medications indefinitely'
      ],
      correctAnswer: 0,
      peerPercentages: [84, 7, 5, 4],
      explanation: `Explanation
The National Patient Safety Goals (NPSGs) and hospital accreditation guidelines emphasize the critical importance of patient identification and procedural verification. Prior to any invasive procedure, the nurse must verify the client's identity using at least two unique identifiers (eg, full name and date of birth or medical record number) and verify that voluntary, fully informed consent has been obtained and documented.

Informed consent ensures that the client comprehends the procedure, intended benefits, potential risks, and available alternatives. Starting an invasive procedure without proper verification exposes the client to severe sentinel events (eg, wrong-patient or wrong-site surgery) and violates fundamental legal and ethical standards of nursing practice.

(Option 1) This is the essential first priority. Verifying two patient identifiers against the medical chart and confirming signed consent prevents medical errors and verifies client autonomy.
(Option 2) Prophylactic antibiotics require a licensed healthcare provider's order and specific timing (typically within 60 minutes prior to surgical incision), not routine unverified administration.
(Option 3) The steep Trendelenburg position (head lower than feet) increases intracranial pressure and compromises respiratory excursion; it is contraindicated unless specifically indicated for line placement.
(Option 4) Abruptly stopping essential chronic medications (such as beta-blockers) without provider direction can precipitate rebound hypertension or cardiac dysrhythmias.

Educational objective:
Prior to initiating any invasive procedure, the nurse must verify the client's identity using two unique identifiers and verify that signed informed consent is present in the medical record.`,
      topic: subject
    },
    2: { // Base (Level 2)
      questionText: `CLINICAL CASE SCENARIO: A 48-year-old client admitted under ${subject} underwent uncomplicated laparoscopic surgery 6 hours ago. Vital signs are: blood pressure 122/78 mmHg, pulse 80/min, respirations 16/min, and oxygen saturation 98% on room air. The client reports surgical site soreness rated 3/10 on the numeric pain scale and is able to converse comfortably.\n\nWhich intervention by the nurse is MOST appropriate at this time?`,
      options: [
        'Assist the client into a position of comfort and implement non-pharmacological relief strategies',
        'Immediately activate the hospital emergency rapid response team',
        'Administer an unscheduled IV push high-dose opioid bolus',
        'Prepare the client for immediate emergency exploratory laparotomy'
      ],
      correctAnswer: 0,
      peerPercentages: [79, 4, 11, 6],
      explanation: `Explanation
Pain management requires a multimodal and stepwise approach based on comprehensive assessment. Clients reporting mild pain (rating 1 to 3 out of 10) who exhibit hemodynamic stability and eupneic respirations are optimal candidates for non-pharmacological interventions (eg, repositioning, guided imagery, splinting with a pillow during coughing, cool compresses) and mild non-opioid oral analgesics if ordered.

Overly aggressive or unindicated pharmacological therapy introduces unnecessary risks of respiratory depression, sedation, and opioid-induced ileus, especially in post-surgical clients with stable baseline parameters.

(Option 1) Repositioning, elevating the head of the bed, splinting the surgical incision, and providing quiet surroundings provide effective relief for mild discomfort without adverse systemic side effects.
(Option 2) Rapid response teams are reserved for acute clinical deterioration (eg, acute hypoxemia, severe sustained hypotension, acute neurological deficits), none of which are present in this stable client.
(Option 3) IV push opioids are indicated for acute severe pain (typically ratings 7–10) or breakthrough pain when milder modalities have failed; they carry significant sedation risks.
(Option 4) Emergency surgical re-exploration is indicated only for surgical emergencies such as massive intra-abdominal hemorrhage, peritonitis, or wound evisceration.

Educational objective:
For stable post-surgical clients experiencing mild pain (ratings 1–3/10), initial management focuses on non-pharmacological comfort measures and conservative non-opioid strategies before escalating to high-potency opioids.`,
      topic: subject
    },
    3: { // Advanced Hard (Level 3)
      questionText: `CLINICAL CASE SCENARIO: A 56-year-old client with acute decompensated heart failure admitted under ${subject} is receiving an IV infusion of 0.9% normal saline at 150 mL/hr. Two hours into the infusion, the client develops sudden severe dyspnea, orthopnea, and an audible cough productive of pink, frothy sputum. Vital signs: blood pressure 168/98 mmHg, pulse 118/min, respirations 32/min, and SpO2 86% on room air. Auscultation reveals diffuse bilateral coarse crackles throughout both lung fields.\n\nWhich nursing intervention should the nurse perform FIRST?`,
      options: [
        'Discontinue the IV fluid infusion, position the client upright in High-Fowler\'s, and apply high-flow oxygen',
        'Increase the IV fluid rate to 200 mL/hr to maintain organ perfusion',
        'Place the client in the supine position with legs elevated',
        'Administer oral potassium supplements and encourage fluid intake'
      ],
      correctAnswer: 0,
      peerPercentages: [88, 3, 5, 4],
      explanation: `Explanation
The client is exhibiting hallmark signs of acute pulmonary edema secondary to hypervolemia (fluid volume overload). In clients with compromised ventricular performance, rapid crystalloid administration causes rapid elevation of left ventricular end-diastolic pressure, resulting in fluid transudation into the pulmonary interstitium and alveoli. Characteristic clinical manifestations include severe dyspnea, tachypnea, orthopnea, diffuse crackles, and classic pink, frothy sputum.

Priority nursing interventions follow the ABCs (Airway, Breathing, Circulation):
1. Immediately stop the IV fluid infusion to prevent further pulmonary vascular engorgement.
2. Elevate the head of the bed into high-Fowler's position (90 degrees) with the legs dependent. This reduces venous return (preload) to the right heart and maximizes diaphragmatic excursion.
3. Apply high-flow supplemental oxygen (non-rebreather mask or positive airway pressure) to address severe arterial hypoxemia.

(Option 1) This action directly addresses the underlying trigger (fluid overload), reduces cardiac preload via positional gravitational pooling, and corrects life-threatening hypoxemia.
(Option 2) Increasing fluid infusion rate would rapidly worsen alveolar flooding, precipitating respiratory arrest and cardiogenic shock.
(Option 3) Placing the client supine increases venous return to an already overloaded heart, exacerbating pulmonary capillary hydrostatic pressure and worsening dyspnea.
(Option 4) Oral administration during acute respiratory distress poses an extreme aspiration risk and does nothing to alleviate acute respiratory compromise.

Educational objective:
Acute pulmonary edema is a medical emergency manifested by pink, frothy sputum, diffuse crackles, and severe hypoxemia. Immediate priority nursing interventions include stopping IV fluid infusions, placing the client in high-Fowler's position with legs dependent, and applying high-flow oxygen.`,
      topic: subject
    },
    4: { // Peak Level (Level 4)
      questionText: `CLINICAL CASE SCENARIO: A 64-year-old client in the Intensive Care Unit being managed for severe septic shock and acute kidney injury under ${subject} exhibits new cardiac telemetry changes showing widening QRS complexes, prolonged PR intervals, and tall, peaked T waves. The client is lethargic with a heart rate of 46/min and blood pressure 82/48 mmHg. Stat arterial blood gas (ABG) reveals: pH 7.18, PaCO2 30 mmHg, HCO3 11 mEq/L. Stat serum potassium is 7.4 mEq/L.\n\nWhich emergency medication must the nurse prepare for IMMEDIATE administration to prevent fatal ventricular fibrillation or asystole?`,
      options: [
        'Intravenous Calcium Gluconate (10%) administered slowly over 2–5 minutes',
        'Oral Sodium Polystyrene Sulfonate (Kayexalate) mixed in sorbitol',
        'Subcutaneous Regular Insulin without IV dextrose co-administration',
        'Intravenous push Epinephrine 1 mg rapid bolus as initial monotherapy'
      ],
      correctAnswer: 0,
      peerPercentages: [67, 18, 9, 6],
      explanation: `Explanation
Severe hyperkalemia (serum potassium > 6.5 mEq/L) accompanied by EKG alterations (peaked T waves, widening QRS complex, prolonged PR interval, loss of P waves) is a life-threatening medical emergency capable of rapidly deteriorating into ventricular fibrillation or asystole.

In severe symptomatic hyperkalemia, therapeutic priorities proceed in strict clinical sequence:
1. Membrane Stabilization (IMMEDIATE): IV Calcium Gluconate does NOT lower serum potassium levels; however, it immediately raises the cardiac threshold potential, stabilizing the cardiomyocyte resting membrane and protecting the myocardium against fatal dysrhythmias within 1 to 3 minutes.
2. Intracellular Potassium Shifting (SECONDARY): Once cardiac membranes are stabilized with calcium, IV Regular Insulin (10 units) administered with 50% Dextrose (D50W 25–50g) shifts extracellular potassium into intracellular compartments by stimulating Na+/K+-ATPase pumps. Inhaled high-dose albuterol and IV sodium bicarbonate also facilitate cellular shifts.
3. Potassium Elimination (DEFINITIVE): Loop diuretics (furosemide), gastrointestinal cation exchange resins (sodium zirconium cyclosilicate or sodium polystyrene sulfonate), or urgent hemodialysis permanently remove excess potassium from the body.

(Option 1) IV Calcium Gluconate is the mandatory first-line emergency intervention to prevent cardiac arrest by antagonizing hyperkalemia-induced myocardial excitability.
(Option 2) Sodium Polystyrene Sulfonate works in the gastrointestinal tract and requires hours to days to reduce total body potassium; it provides zero immediate protection against fatal conduction blocks.
(Option 3) Administering insulin without dextrose will cause catastrophic hypoglycemia. Furthermore, insulin shifts potassium but does not stabilize cardiac membranes against immediate ventricular fibrillation.
(Option 4) Epinephrine is indicated in pulseless cardiac arrest (ACLS protocol); administering it as monotherapy without membrane stabilization does not resolve the electrophysiological toxicity of 7.4 mEq/L potassium.

Educational objective:
In severe hyperkalemia with EKG abnormalities (peaked T waves, widening QRS), the immediate priority medication is IV Calcium Gluconate to stabilize the cardiac cell membrane and prevent fatal dysrhythmias, followed by interventions that shift and eliminate potassium.`,
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
