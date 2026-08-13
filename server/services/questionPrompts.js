const getNclexPrompt = (topic, number, difficulty) => `You are an expert NCLEX-RN item writer trained in the Next Generation NCLEX (NGN) 
Clinical Judgment Measurement Model, writing questions in the style of UWorld's 
NCLEX QBank.

TASK: Generate ${number} NCLEX-style practice questions on the topic: ${topic}
Difficulty: ${difficulty}

RULES:
1. EVERY question MUST be grounded in a realistic clinical scenario — include patient 
   age, gender, setting (ICU, ER, med-surg ward, clinic, etc.), chief complaint, 
   relevant vital signs, labs, or medication history. NEVER write a bare factual question 
   without a patient scenario.
2. The 'scenario' field must be 2–4 sentences describing the patient situation. 
   The 'question_stem' then asks what the nurse should do/assess/prioritize based on that scenario.
3. Rotate question types across the set: standard 4-option MCQ, select-all-that-apply (SATA), 
   prioritization/ordering, and matrix/grid (multiple statements, each answered True/False 
   or Consistent/Inconsistent).
4. Map each question to ONE NCLEX Client Needs category: 
   Safe and Effective Care Environment, Health Promotion and Maintenance, 
   Psychosocial Integrity, or Physiological Integrity (specify subcategory).
5. Tag each question with the Clinical Judgment step it tests: 
   Recognize Cues, Analyze Cues, Prioritize Hypotheses, Generate Solutions, 
   Take Action, or Evaluate Outcomes.
6. Write a rationale for the CORRECT answer AND a separate short rationale for 
   WHY EACH incorrect option is wrong — never leave a distractor unexplained.
7. Do not reuse the same clinical scenario twice in one batch.
8. Use only evidence-based, current US nursing practice standards.
9. NEVER start the 'question_stem' with the topic name, unit name, subject name, or any label/prefix such as 'Q:', a number, 'MCQ:', etc. The question_stem MUST begin directly with the first word of the actual question sentence.

OUTPUT FORMAT — return ONLY valid JSON, no preamble, matching this schema:
{
  "questions": [
    {
      "id": "string",
      "question_type": "MCQ | SATA | Prioritization | Matrix",
      "client_needs_category": "string",
      "clinical_judgment_step": "string",
      "difficulty": "Easy | Medium | Hard",
      "scenario": "string (2-4 sentence patient clinical situation — REQUIRED, never empty)",
      "question_stem": "string (the actual question asked, based on the scenario above)",
      "options": [{"label": "A", "text": "string", "is_correct": true/false}],
      "correct_rationale": "string",
      "distractor_rationales": {"A": "string", "B": "string", "C": "string", "D": "string"},
      "topic_tags": ["string"]
    }
  ]
}`;

const getIndianNursingPrompt = (subject, number, difficulty) => `You are an expert item writer for Indian Nursing Officer recruitment exams 
(NORCET, AIIMS, ESIC, RRB Staff Nurse), writing questions that match the exact 
pattern of these exams as set by AIIMS/NBE and Indian nursing boards.

TASK: Generate ${number} MCQs on the subject: ${subject}
Difficulty: ${difficulty}

RULES:
1. EVERY question MUST be presented as a clinical scenario. Present a brief patient 
   situation (1–3 sentences: patient age, gender, setting, presenting complaint or 
   clinical finding) and then ask what the nurse should do, assess, or prioritize. 
   NEVER write a bare definition or recall question without a patient context.
2. Single best-answer format only: exactly 4 options (A-D), exactly one correct.
3. Base content strictly on the Indian Nursing Council (INC) syllabus and 
   standard Indian nursing textbooks (e.g., BT Basavanthappa, Sudha C Ghai) 
   — not US-specific protocols.
4. The 'scenario' field (1–3 sentences) describes the patient. 
   The 'question_stem' then poses the clinical question. Both fields are REQUIRED.
5. Include the source topic and sub-topic as tags for filtering.
6. Provide ONE concise rationale (2-4 sentences) explaining why the correct 
   answer is right and briefly why the closest distractor is wrong.
7. Avoid ambiguous or opinion-based statements — every answer must be 
   objectively verifiable against standard nursing references.
8. Match the difficulty and phrasing style of real NORCET/AIIMS previous 
   year papers — direct, exam-board tone, not conversational.
9. NEVER start the 'question_stem' with the topic name, unit name, subject name, or any label/prefix such as 'Q:', a number, 'MCQ:', etc. The question_stem MUST begin directly with the first word of the actual question sentence.

OUTPUT FORMAT — return ONLY valid JSON, no preamble, matching this schema:
{
  "questions": [
    {
      "id": "string",
      "subject": "string",
      "sub_topic": "string",
      "difficulty": "Easy | Medium | Hard",
      "scenario": "string (1-3 sentence patient situation — REQUIRED, never empty)",
      "question_stem": "string (the clinical question based on the scenario — REQUIRED)",
      "options": [{"label": "A", "text": "string", "is_correct": true/false}],
      "rationale": "string",
      "reference": "string (textbook/topic reference)"
    }
  ]
}`;

module.exports = {
  getNclexPrompt,
  getIndianNursingPrompt
};
