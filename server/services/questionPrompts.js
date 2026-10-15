const DIFFICULTY_CONFIGS = {
  1: {
    level: 1,
    key: 'easy',
    name: 'Level 1: Foundational Recall',
    focus: 'CORE NURSING ASSESSMENT, DIRECT RECALL & PATIENT SAFETY',
    scenarioGuidelines: '1–2 sentences. Clinical setting scenario presenting a standard patient encounter, admission evaluation, routine pre/post-op care, or health promotion context. Keep scenario short and straightforward.',
    questionType: 'Foundational nursing assessments, normal vital signs thresholds, standard laboratory reference values, core patient safety protocols (two patient identifiers, infection prevention, aseptic technique), or essential medication administration rights.'
  },
  2: {
    level: 2,
    key: 'moderate',
    name: 'Level 2: Base Clinical',
    focus: 'STANDARD CLINICAL PASSING BENCHMARK & CLINICAL DECISION MAKING',
    scenarioGuidelines: '2–3 sentences. Inpatient Medical-Surgical, Pediatric, or Obstetric patient with active clinical management needs. Include patient status, relevant vital signs or lab values, diagnostic findings, and ongoing treatments.',
    questionType: 'Clinical decision-making, priority nursing care, therapeutic drug monitoring, expected vs adverse reaction identification, or patient education. Distractors must challenge standard understanding of nursing priorities.'
  },
  3: {
    level: 3,
    key: 'hard',
    name: 'Level 3: Advanced Hard',
    focus: 'HIGH-ORDER CLINICAL JUDGMENT, PRIORITIZATION & ADVERSE DECOMPENSATION',
    scenarioGuidelines: '3–4 sentences. Complex clinical vignette with abnormal vital signs, unexpected lab values, decompensation cues, or adverse drug interactions. Must include detailed patient profile with vitals/labs.',
    questionType: 'Clinical prioritization ("Which client should the nurse assess FIRST?", "Which prescription should the nurse clarify?"), acute physiological deterioration recognition, or multi-faceted nursing intervention choice.'
  },
  4: {
    level: 4,
    key: 'expert',
    name: 'Level 4: Peak Acuity',
    focus: 'ICU RESUSCITATION, HEMODYNAMICS, MULTI-SYSTEM COLLAPSE & TITRATION',
    scenarioGuidelines: '3–5 sentences. High-acuity ICU, Emergency, or Trauma resuscitation patient experiencing acute shock, multi-system organ failure, severe dysrhythmias, or life-threatening drug toxicity with full vital signs, labs (ABGs, lactate), and vasoactive infusions.',
    questionType: 'Immediate life-saving emergency intervention ("Which action takes ABSOLUTE FIRST priority?"), sudden lethal decompensation cue recognition, vasopressor titration, or contraindication check in unstable patient.'
  }
};

const resolveDiffConfig = (diff) => {
  const s = String(diff || '').toLowerCase();
  if (s === '4' || s.includes('peak') || s.includes('expert') || s.includes('icu')) return DIFFICULTY_CONFIGS[4];
  if (s === '3' || s.includes('hard') || s.includes('advanc')) return DIFFICULTY_CONFIGS[3];
  if (s === '1' || s.includes('easy') || s.includes('foundat') || s.includes('low')) return DIFFICULTY_CONFIGS[1];
  return DIFFICULTY_CONFIGS[2]; // Default to Moderate (Level 2)
};

const getNclexPrompt = (topic, number = 10, difficulty = 'hard') => {
  const cfg = resolveDiffConfig(difficulty);
  const randomSeed = Math.random().toString(36).substring(7);
  return `You are a senior expert NCLEX-RN and Next Generation NCLEX (NGN) Item Writer.

TASK: Generate ${number} authentic Computer Adaptive Testing (CAT) quality questions specifically on the topic: ${topic}
TARGET DIFFICULTY LEVEL: ${cfg.name} (${cfg.focus})
VARIATION SEED: ${randomSeed}

SCENARIO SPECIFICATIONS FOR ${cfg.name}:
- Scenario Depth: ${cfg.scenarioGuidelines}
- Clinical Judgment Focus: ${cfg.questionType}
- Every question MUST feature a unique clinical vignette in the 'scenario' field specifically related to ${topic}.
- DIVERSITY REQUIREMENT: Ensure each of the ${number} questions covers a COMPLETELY DIFFERENT clinical pathology, drug, age group, or nursing intervention within ${topic}. DO NOT REPEAT scenarios.
- CRITICAL: DO NOT include or append option choices (A, B, C, D) inside the 'scenario' or 'question_stem'. Choices MUST ONLY appear in the 'options' array without letter prefixes.
- Provide a thorough clinical rationale for the correct answer AND explain why distractors are inappropriate.

OUTPUT FORMAT — return ONLY valid JSON matching this schema:
{
  "questions": [
    {
      "id": "string",
      "difficultyLevel": ${cfg.level},
      "difficultyName": "${cfg.name}",
      "clinical_judgment_step": "Recognize Cues | Analyze Cues | Prioritize Hypotheses | Generate Solutions | Take Action | Evaluate Outcomes",
      "scenario": "string (detailed clinical case with vitals/labs - NEVER include options here)",
      "question_stem": "string (the priority clinical question asked - NEVER include options here)",
      "options": [
        {"label": "A", "text": "string (option text only, no 'A.' prefix)", "is_correct": true},
        {"label": "B", "text": "string", "is_correct": false},
        {"label": "C", "text": "string", "is_correct": false},
        {"label": "D", "text": "string", "is_correct": false}
      ],
      "correct_rationale": "string",
      "topic_tags": ["${topic}"]
    }
  ]
}`;
};

const getIndianNursingPrompt = (subject, number = 10, difficulty = 'hard') => {
  const cfg = resolveDiffConfig(difficulty);
  const randomSeed = Math.random().toString(36).substring(7);
  return `You are a Chief Item Writer for Indian Nursing Officer recruitment examinations (AIIMS NORCET, ESIC, RRB Staff Nurse, DSSSB, PGIMER, SGPGI).

TASK: Generate ${number} authentic Computer Adaptive Testing (CAT) quality clinical questions specifically on the subject/topic: ${subject}
TARGET DIFFICULTY LEVEL: ${cfg.name} (${cfg.focus})
VARIATION SEED: ${randomSeed}

MANDATORY RULES:
1. Scenario: ${cfg.scenarioGuidelines}
2. Clinical Focus: ${cfg.questionType}
3. DIVERSITY & NON-REPETITION: Every question MUST cover a DISTINCT, unique clinical condition, nursing situation, or pharmacology entity strictly belonging to ${subject}. Do NOT repeat similar patient vignettes or clinical dilemmas within this test or across generations.
4. DO NOT APPEND OPTIONS TO SCENARIO OR QUESTION STEM: Option choices (A, B, C, D) MUST NEVER be typed inside 'scenario' or 'question_stem'. They must ONLY appear in the 'options' array.
5. 4 options (A-D) with exactly ONE correct answer. Do NOT include option letter prefixes inside option text.
6. Comprehensive 3–5 sentence clinical rationale explaining the exact pathophysiology and why the priority intervention is essential.
7. Do NOT include prefixes like 'Q1.' or '[Subject]' in the question stem.

OUTPUT FORMAT — return ONLY valid JSON matching this schema:
{
  "questions": [
    {
      "id": "string",
      "difficultyLevel": ${cfg.level},
      "difficultyName": "${cfg.name}",
      "subject": "${subject}",
      "scenario": "string (detailed clinical case study with vitals/labs)",
      "question_stem": "string (explicit clinical question asking for priority action/assessment)",
      "options": [
        {"label": "A", "text": "string", "is_correct": true},
        {"label": "B", "text": "string", "is_correct": false},
        {"label": "C", "text": "string", "is_correct": false},
        {"label": "D", "text": "string", "is_correct": false}
      ],
      "rationale": "string",
      "reference": "AIIMS NORCET Standard Practice Guidelines"
    }
  ]
}`;
};

module.exports = {
  DIFFICULTY_CONFIGS,
  resolveDiffConfig,
  getNclexPrompt,
  getIndianNursingPrompt
};
