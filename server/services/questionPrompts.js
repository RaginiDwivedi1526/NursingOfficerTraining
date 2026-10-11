const DIFFICULTY_CONFIGS = {
  1: {
    level: 1,
    key: 'hard',
    name: 'Level 1: Hard',
    focus: 'PEAK ACUITY / HIGH-ORDER CLINICAL JUDGMENT & PRIORITIZATION',
    scenarioGuidelines: '3–5 sentences. High-acuity ICU, Emergency, or Trauma patient experiencing acute physiological decompensation, multi-system failure, or life-threatening drug toxicity. Must include full patient profile (age, gender, department), exact abnormal vital signs (BP, HR, RR, SpO2, Temp), critical lab values (ABGs, electrolytes, cardiac enzymes, lactate), and current medical infusions.',
    questionType: 'Emergency priority intervention ("Which action is the ABSOLUTE FIRST priority?"), sudden decompensation cue recognition ("Which finding requires IMMEDIATE escalation?"), or contraindication check ("Which physician order is CONTRAINDICATED?"). Distractors must all be plausible nursing interventions that seem valid at first glance.'
  },
  2: {
    level: 2,
    key: 'moderate',
    name: 'Level 2: Moderate',
    focus: 'STANDARD CLINICAL PASSING BENCHMARK & CLINICAL DECISION MAKING',
    scenarioGuidelines: '2–4 sentences. Inpatient Medical-Surgical, Pediatric, or Obstetric patient with active clinical management needs. Include patient status, relevant vital signs or lab values, diagnostic findings, and ongoing treatments.',
    questionType: 'Clinical decision-making, priority nursing care, therapeutic drug monitoring, adverse reaction identification, or patient education. Distractors must challenge standard understanding of nursing priorities.'
  },
  3: {
    level: 3,
    key: 'easy',
    name: 'Level 3: Easy',
    focus: 'FOUNDATIONAL CORE NURSING ASSESSMENT & PATIENT SAFETY',
    scenarioGuidelines: '1–3 sentences. Clinical setting scenario presenting a standard patient encounter, admission evaluation, routine pre/post-op care, or health promotion context.',
    questionType: 'Foundational nursing assessments, core patient safety protocols (two patient identifiers, infection prevention, aseptic technique), standard vital signs thresholds, or essential medication administration rights.'
  }
};

const resolveDiffConfig = (diff) => {
  const s = String(diff || '').toLowerCase();
  if (s === '1' || s.includes('hard') || s.includes('peak')) return DIFFICULTY_CONFIGS[1];
  if (s === '3' || s.includes('easy') || s.includes('foundat')) return DIFFICULTY_CONFIGS[3];
  return DIFFICULTY_CONFIGS[2]; // Default to Moderate (Level 2)
};

const getNclexPrompt = (topic, number = 10, difficulty = 'hard') => {
  const cfg = resolveDiffConfig(difficulty);
  return `You are a senior expert NCLEX-RN and Next Generation NCLEX (NGN) Item Writer.

TASK: Generate ${number} authentic Computer Adaptive Testing (CAT) quality questions on the topic: ${topic}
TARGET DIFFICULTY LEVEL: ${cfg.name} (${cfg.focus})

SCENARIO SPECIFICATIONS FOR ${cfg.name}:
- Scenario Depth: ${cfg.scenarioGuidelines}
- Clinical Judgment Focus: ${cfg.questionType}
- Every question MUST feature a detailed clinical vignette in the 'scenario' field.
- Provide a thorough clinical rationale for the correct answer AND explain why distractors are inappropriate.

OUTPUT FORMAT — return ONLY valid JSON matching this schema:
{
  "questions": [
    {
      "id": "string",
      "difficultyLevel": ${cfg.level},
      "difficultyName": "${cfg.name}",
      "clinical_judgment_step": "Recognize Cues | Analyze Cues | Prioritize Hypotheses | Generate Solutions | Take Action | Evaluate Outcomes",
      "scenario": "string (detailed clinical case with vitals/labs)",
      "question_stem": "string (the priority clinical question asked based on the scenario)",
      "options": [
        {"label": "A", "text": "string", "is_correct": true},
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
  return `You are a Chief Item Writer for Indian Nursing Officer recruitment examinations (AIIMS NORCET, ESIC, RRB Staff Nurse, DSSSB, PGIMER, SGPGI).

TASK: Generate ${number} authentic Computer Adaptive Testing (CAT) quality clinical questions on the subject/topic: ${subject}
TARGET DIFFICULTY LEVEL: ${cfg.name} (${cfg.focus})

MANDATORY RULES:
1. Scenario: ${cfg.scenarioGuidelines}
2. Clinical Focus: ${cfg.questionType}
3. 4 options (A-D) with exactly ONE correct answer.
4. Comprehensive 3–5 sentence clinical rationale explaining the exact pathophysiology and why the priority intervention is essential.
5. Do NOT include prefixes like 'Q1.' or '[Subject]' in the question stem.

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
