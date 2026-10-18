const { chat } = require('./openaiService');
const { getNclexPrompt, getIndianNursingPrompt } = require('./questionPrompts');
const { getTopicQuestion, resolveTopicKey } = require('./topicQuestions');

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

const CLINICAL_DOMAINS = {
  medsurg: [
    'Acute Coronary Syndrome & STEMI Emergency Intervention',
    'Pulmonary Embolism & Anticoagulant Escalation',
    'Acute Ischemic Stroke & Thrombolytic Safety Window',
    'Diabetic Ketoacidosis vs Hyperosmolar Hyperglycemic State',
    'Acute Kidney Injury & Life-Threatening Hyperkalemia',
    'Acute Pancreatitis & Intra-abdominal Sepsis',
    'Tension Pneumothorax & Immediate Needle Thoracostomy',
    'Cirrhosis Portal Hypertension & Ruptured Esophageal Varices',
    'Myasthenia Gravis Myasthenic Crisis vs Cholinergic Crisis',
    'Acute Compartment Syndrome & Neurovascular Deterioration',
    'Syndrome of Inappropriate Antidiuretic Hormone (SIADH)',
    'Addisonian Adrenal Crisis & Glucocorticoid Resuscitation',
    'Sepsis Bundle & High-Lactate Crystalloid Resuscitation',
    'Subdural Hematoma & Cushing Triad Decompensation',
    'Mechanical Bowel Obstruction & Peritonitis Signs'
  ],
  pharmacology: [
    'Digoxin Toxicity & Hypokalemia Potentiation',
    'Lithium Carbonate Severe Dehydration Toxicity',
    'Heparin-Induced Thrombocytopenia (HIT Type 2) & Argatroban',
    'Vancomycin Peak/Trough Monitoring & Red Man Syndrome',
    'ACE-Inhibitor Severe Angioedema Airway Threat',
    'Warfarin Coagulopathy Reversal with Phytonadione',
    'Potassium Chloride IV Infusion Rate Protocol & Cardiac Risk',
    'Beta-Blocker Toxicity & Emergency Glucagon Reversal',
    'Phenytoin Sodium Toxicity & Therapeutic Range Control',
    'Basal vs Prandial Insulin Administration & Hypoglycemia Management'
  ],
  pediatrics: [
    'Tetralogy of Fallot Hypercyanotic Tet Spell Positioning',
    'Acute Epiglottitis Airway Compromise & Immediate Tracheostomy Prep',
    'Pyloric Stenosis Hypochloremic Metabolic Alkalosis Correction',
    'Intussusception Currant Jelly Stools & Air Enema Reduction',
    'Kawasaki Disease Coronary Aneurysm Prevention & High-Dose IVIG',
    'Hirschsprung Disease Toxic Enterocolitis & Hirschsprung Stools',
    'Croup (Laryngotracheobronchitis) Inspiratory Stridor & Racemic Epinephrine',
    'Wilms Tumor (Nephroblastoma) Abdominal Palpation Precaution',
    'Pediatric Sickle Cell Vaso-occlusive Crisis & Hydration Priority',
    'Toddler Developmental Milestones & Autonomy vs Shame'
  ],
  psychiatry: [
    'Paranoid Schizophrenia Command Hallucinations & Milieu Safety',
    'Clozapine Severe Agranulocytosis & Absolute Neutrophil Count Monitoring',
    'Neuroleptic Malignant Syndrome Severe Hyperthermia & Dantrolene',
    'Bipolar I Acute Manic Phase & High-Calorie Finger Foods',
    'Major Depressive Disorder Sudden Euphoria & Suicide Energy Surge',
    'MAOI Dietary Tyramine Restrictions & Hypertensive Crisis Emergency',
    'Anorexia Nervosa Severe Malnutrition & Refeeding Syndrome',
    'Extrapyramidal Symptoms: Acute Dystonic Reaction & Anticholinergics'
  ],
  obstetrics: [
    'Severe Preeclampsia Magnesium Sulfate Toxicity & Calcium Gluconate',
    'Postpartum Hemorrhage Uterine Atony & Fundal Massage Protocol',
    'Placental Abruption Concealed Hemorrhage vs Placenta Previa',
    'Shoulder Dystocia Emergency & McRoberts Maneuver with Suprapubic Pressure',
    'Umbilical Cord Prolapse Manual Head Elevation & Trendelenburg',
    'Ectopic Pregnancy Tubal Rupture & Hemoperitoneum Signs',
    'Hyperemesis Gravidarum Severe Wernicke Encephalopathy Prevention',
    'Rh Incompatibility & RhoGAM Immunoglobulin Prophylaxis'
  ],
  foundations: [
    'Surgical Asepsis Principles & Sterile Field Boundary Violations',
    'Pressure Injury Staging 1-4, Deep Tissue Injury & Unstageable Wounds',
    'ABO Incompatible Acute Hemolytic Blood Transfusion Reaction Emergency',
    'Enteral Tube Feeding Gastric Residual Volume & Aspiration Prevention',
    'Clean-Catch Midstream Urine Specimen Collection Protocol',
    'Transmission-Based Precautions: Airborne vs Droplet vs Contact Isolation',
    'Postoperative Atelectasis Prevention & Sustained Maximal Inspiration',
    'Medical Restraints Documentation & Neurovascular Checks'
  ],
  community: [
    'Vaccine Cold Chain Temperature Standards & Shake Test Protocol',
    'Disease Outbreak Attack Rate Calculation & Epidemic Curve',
    'Tuberculosis Directly Observed Therapy Short-Course (DOTS) Compliance',
    'Epidemiological Triad & Primary vs Secondary Prevention',
    'Community Water Purification Breakpoint Chlorination',
    'START Disaster Triage Color Tagging Protocol'
  ]
};

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

  // At the start of a test with no quotas yet, randomly pick a starting subject to avoid always starting on Med-Surg
  const totalCount = Object.values(subjectQuotas).reduce((a, b) => a + b, 0);
  if (totalCount === 0) {
    const randomInitial = SUBJECT_WEIGHTS[Math.floor(Math.random() * SUBJECT_WEIGHTS.length)];
    return randomInitial.name;
  }

  let minRatio = Infinity;
  let candidates = [];

  for (const item of SUBJECT_WEIGHTS) {
    const currentCount = subjectQuotas[item.name] || 0;
    const currentRatio = currentCount / item.weight;
    if (currentRatio < minRatio) {
      minRatio = currentRatio;
      candidates = [item.name];
    } else if (Math.abs(currentRatio - minRatio) < 0.0001) {
      candidates.push(item.name);
    }
  }

  return candidates[Math.floor(Math.random() * candidates.length)] || SUBJECT_WEIGHTS[0].name;
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

// Clean trailing embedded options from questionText
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

// Clean letter prefixes like "A. ", "B) " from individual options
const stripOptionPrefix = (text) => {
  if (!text) return '';
  return String(text).replace(/^(?:[A-Da-d1-4][.)\]\-]|\([A-Da-d1-4]\))\s*/, '').trim();
};

// Generate adaptive question dynamically via AI or topic-specific bank with strict deduplication
const generateAdaptiveQuestion = async (subject, difficultyLevel, examType = 'nclex_rn', alreadyAsked = []) => {
  const diffInfo = DIFFICULTY_LEVELS[difficultyLevel] || DIFFICULTY_LEVELS[2];

  // Clean already asked stems for prompt avoidance
  const avoidList = Array.isArray(alreadyAsked)
    ? alreadyAsked.slice(-20).map(s => String(s || '').substring(0, 90).replace(/\n/g, ' ')).filter(Boolean)
    : [];

  // Pick clinical domain: if specific topic/unit is passed, honor it; otherwise balance domains
  const isGenericSubject = !subject ||
    subject === 'All Subjects' ||
    subject.toLowerCase().includes('all mock') ||
    subject.toLowerCase().includes('full length');

  const topicKey = resolveTopicKey(subject);
  const domainList = CLINICAL_DOMAINS[topicKey] || CLINICAL_DOMAINS.medsurg;
  const availableDomains = domainList.filter(d => !alreadyAsked.some(prev => prev && prev.toLowerCase().includes(d.toLowerCase().split(' ')[0])));
  const chosenDomain = availableDomains.length > 0
    ? availableDomains[Math.floor(Math.random() * availableDomains.length)]
    : domainList[Math.floor(Math.random() * domainList.length)];

  const targetTopicName = isGenericSubject ? chosenDomain : subject;

  const randomAge = topicKey === 'pediatrics'
    ? `${Math.floor(Math.random() * 12) + 1}-year-old`
    : `${Math.floor(Math.random() * 55) + 20}-year-old`;
  const randomGender = Math.random() > 0.5 ? 'female' : 'male';
  const randomSeed = Math.random().toString(36).substring(7);

  const prompt = `You are an expert Chief Item Writer for UWorld, Archer Review, NCLEX-RN (NGN), and AIIMS NORCET.

TASK: Generate ONE authentic, fresh Computer Adaptive Testing (CAT) question STRICTLY for: ${targetTopicName}.
TARGET ADAPTIVE LEVEL: Level ${diffInfo.level} - ${diffInfo.name}.
${avoidList.length > 0 ? `CRITICAL ANTI-DUPLICATION RULE: You MUST NOT generate questions similar to these already-tested scenarios: [${avoidList.join('; ')}]. Provide a COMPLETELY DIFFERENT clinical situation with a new patient age and condition.` : ''}

MANDATORY CLINICAL SCENARIO FOCUS:
- You MUST construct this scenario specifically around the topic: "${targetTopicName}".
- Patient Demographic: A ${randomAge} ${randomGender} patient in an appropriate clinical setting.
- Randomization seed: ${randomSeed}.

STRICT PROHIBITION (BANNED CLICHÉ):
- DO NOT generate scenarios involving alcohol withdrawal, alcohol use disorder, blood glucose of 45 mg/dL, or tremors/sweating in a 45-year-old male. This specific scenario is STRICTLY FORBIDDEN.
- You MUST focus strictly on "${targetTopicName}".

CRITICAL FORMATTING INSTRUCTIONS:
- DO NOT list or append the answer choices (A, B, C, D) inside 'questionText'. 'questionText' MUST contain ONLY the clinical scenario and the explicit question stem.
- The 4 answer choices MUST be placed ONLY inside the 'options' array.
- DO NOT include letter prefixes in the options (e.g. write "The significance of play in developing social skills", NOT "B. The significance of play...").

LEVEL-SPECIFIC DIFFICULTY RULES (MANDATORY TO DIFFERENTIATE):
${diffInfo.level === 1 ? `
- LEVEL 1 (BELOW BASE / FOUNDATIONAL RECALL):
  * Keep the scenario SHORT, DIRECT, and SIMPLE (1-2 sentences).
  * Focus on FOUNDATIONAL RECALL: normal physiological values/ranges, core terminology and definitions, basic patient rights, infection control standards (hand hygiene, standard precautions, PPE order), or basic nursing safety principles.
  * DO NOT include complex multi-system ICU vitals, severe trauma, or decompensation.
  * Questions should test: "What is the normal...", "Which principle requires...", "Which action demonstrates proper technique for...".
` : diffInfo.level === 2 ? `
- LEVEL 2 (BASE / STANDARD PASSING BENCHMARK):
  * Moderate clinical scenario (2-3 sentences) in a standard med-surg or general inpatient/outpatient unit.
  * Focus on ROUTINE CLINICAL JUDGMENT: evaluating expected medication side effects, routine pre/post-op care, basic patient discharge education, or standard diagnostic verification.
  * Patient is relatively stable with expected physiological responses.
` : diffInfo.level === 3 ? `
- LEVEL 3 (ADVANCED HARD / CLINICAL PRIORITIZATION):
  * Challenging clinical vignette with abnormal vital signs, unexpected lab values, or adverse drug interactions.
  * Focus on CLINICAL PRIORITIZATION ("Which client should the nurse assess FIRST?", "Which prescription should the nurse clarify with the healthcare provider?"), acute deterioration detection, or nuanced clinical decision-making.
  * Distractors must be plausible nursing interventions that seem valid at first glance but are secondary or unsafe.
` : `
- LEVEL 4 (PEAK LEVEL / HIGH ACUITY EMERGENCY):
  * High-acuity ICU, Emergency Department, or Trauma resuscitation scenario.
  * Patient experiencing acute physiological decompensation, shock, multi-system organ failure, critical ABG abnormalities, or life-threatening dysrhythmias.
  * Focus on IMMEDIATE, life-saving emergency escalation, advanced hemodynamics, vasopressor titration, or rapid sequence airway rescue.
`}

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
  "questionText": "string (clinical scenario and question sentence only - NEVER include option choices here)",
  "options": ["Option A text", "Option B text", "Option C text", "Option D text"],
  "correctAnswer": 0, // integer index (0, 1, 2, or 3)
  "explanation": "string (strictly formatted as shown above)",
  "peerPercentages": [14, 68, 11, 7], // 4 integers representing plausible peer percentage distribution totaling 100
  "topic": "${targetTopicName}"
}`;

  try {
    const aiResponse = await chat([
      { role: 'system', content: prompt },
      { role: 'user', content: `Generate a fresh, unique ${targetTopicName} clinical case for Level ${diffInfo.level} (${diffInfo.name}) as valid JSON now.` }
    ], 2500, { temperature: 0.88 });

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
      const cleanStem = stripEmbeddedOptions(parsed.questionText);
      const cleanOptions = parsed.options.map(opt => stripOptionPrefix(typeof opt === 'string' ? opt : (opt.text || String(opt))));

      const isDuplicate = alreadyAsked.some(prev =>
        prev && (prev.includes(cleanStem.substring(0, 40)) || cleanStem.includes(prev.substring(0, 40)))
      );

      // Programmatic guard against the overused alcohol withdrawal cliché
      const isBannedCliché = cleanStem.toLowerCase().includes('alcohol use disorder') ||
        cleanStem.toLowerCase().includes('alcohol withdrawal') ||
        (cleanStem.toLowerCase().includes('blood glucose') && cleanStem.toLowerCase().includes('45 mg/dl')) ||
        (cleanStem.toLowerCase().includes('45-year-old') && cleanStem.toLowerCase().includes('tremors'));

      if (!isDuplicate && !isBannedCliché) {
        return {
          questionText: cleanStem,
          options: cleanOptions,
          correctAnswer: typeof parsed.correctAnswer === 'number' ? parsed.correctAnswer : 0,
          explanation: parsed.explanation || '',
          peerPercentages: Array.isArray(parsed.peerPercentages) && parsed.peerPercentages.length === 4 ? parsed.peerPercentages : [14, 68, 11, 7],
          topic: subject,
          difficultyLevel: diffInfo.level,
          difficultyName: diffInfo.name
        };
      } else if (isBannedCliché) {
        console.warn(`[CAT Engine] Programmatic filter rejected banned alcohol withdrawal cliché for topic "${subject}".`);
      }
    }
  } catch (err) {
    console.warn('[CAT Engine] AI generation fallback triggered:', err.message);
  }

  // Draw from diverse, topic-tailored question bank with guaranteed anti-duplication
  const topicQuestion = getTopicQuestion(subject, difficultyLevel, alreadyAsked);
  return {
    ...topicQuestion,
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
