const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Test = require('./models/Test');

dotenv.config();

// ============================================================
//  AUTHENTIC NURSING QUESTION BANKS ACROSS ALL SUBJECTS & UNITS
//  Organized by 4 genuine difficulty tiers:
//  - Questions 0-4:   Level 1 (Foundational recall, normal values, standard safety)
//  - Questions 5-9:   Level 2 (Base clinical decision-making, standard med-surg care)
//  - Questions 10-14: Level 3 (Advanced hard, prioritization, adverse decompensation)
//  - Questions 15-19: Level 4 (Peak acuity, emergency escalation, ICU resuscitation)
// ============================================================
const BANKS = {

  // ─────────────────────────────────────────────────────────────
  // 1. NURSING FOUNDATIONS & INTRODUCTION
  // ─────────────────────────────────────────────────────────────
  "Introduction to Nursing": [
    // L1: Foundational Recall
    { text: "Florence Nightingale established her first formal nursing training school at:", options: ["Johns Hopkins Hospital", "St. Thomas' Hospital, London", "Massachusetts General Hospital", "Vienna General Hospital"], answer: 1, exp: "Nightingale founded modern nursing education at St. Thomas' Hospital, London in 1860." },
    { text: "The primary purpose of the International Council of Nurses (ICN) Code of Ethics is to:", options: ["Establish legal salary scales", "Provide an ethical standard for nursing practice globally", "Regulate hospital accreditation", "Determine medical treatment protocols"], answer: 1, exp: "The ICN Code of Ethics provides an international standard for ethical nursing decision-making." },
    { text: "Which statutory body regulates nursing education and practice standards in India?", options: ["Indian Medical Council", "Indian Nursing Council (INC)", "Pharmacy Council of India", "National Board of Examinations"], answer: 1, exp: "The Indian Nursing Council Act of 1947 established the INC to regulate uniform nursing standards." },
    { text: "Which nursing theorist defined nursing as 'assisting individuals with 14 fundamental human needs'?", options: ["Jean Watson", "Virginia Henderson", "Dorothea Orem", "Sister Callista Roy"], answer: 1, exp: "Virginia Henderson proposed the 14 basic human needs framework defining independent nursing practice." },
    { text: "Confidentiality of patient medical records is rooted in which ethical principle?", options: ["Autonomy and Fidelity", "Beneficence and Veracity", "Justice and Maleficence", "Paternalism"], answer: 0, exp: "Confidentiality protects patient autonomy and fulfills the nurse's fidelity (loyalty and promise-keeping)." },
    // L2: Base Clinical Practice
    { text: "Nurse advocacy for an unconscious patient without a designated surrogate is best demonstrated by:", options: ["Following the attending physician's personal recommendations", "Acting as the patient's voice to protect their best interests and fundamental rights", "Discharging the patient to extended care immediately", "Requesting the court to appoint hospital administration as guardian"], answer: 1, exp: "Advocacy requires the nurse to actively protect vulnerable clients' dignity and rights." },
    { text: "In evidence-based practice (EBP), the nurse synthesizes research evidence primarily with:", options: ["Hospital tradition and historical policy", "Clinical expertise and client values/preferences", "Physician personal intuition", "Cost-minimization metrics"], answer: 1, exp: "EBP integrates best external research with clinical expertise and individual patient preferences." },
    { text: "A nurse witnesses a colleague preparing a medication without checking two patient identifiers. The appropriate immediate action is:", options: ["Report the colleague to the state licensing board", "Privately and immediately intervene before the drug is administered", "Document the error after the colleague administers the dose", "Inform the patient to verify their own medication"], answer: 1, exp: "Patient safety requires immediate intervention to intercept potential adverse drug errors." },
    { text: "When delegating vital sign measurement to an unlicensed assistive personnel (UAP), the nurse retains accountability for:", options: ["Physically taking the measurements personally", "Interpreting the clinical significance of the results", "Calibrating the blood pressure monitor", "Supervising every second of the measurement"], answer: 1, exp: "Delegators transfer responsibility for task execution but retain accountability for analysis and outcome." },
    { text: "Informed consent is legally valid only if the patient:", options: ["Is verbally oriented to person only", "Receives adequate information, has cognitive capacity, and agrees voluntarily without coercion", "Signs the form regardless of reading comprehension", "Has a family member co-sign the document"], answer: 1, exp: "Valid consent requires voluntary choice, complete disclosure of risks/benefits, and mental capacity." },
    // L3: Advanced Hard / Prioritization
    { text: "During morning rounds, which client should the nurse prioritize to assess FIRST?", options: ["A 45-year-old post-cholecystectomy reporting surgical site pain rated 6/10", "A 62-year-old with chronic heart failure reporting mild ankle edema", "A 54-year-old with pneumonia who is newly confused, restless, and has SpO2 88%", "A 70-year-old with diabetes and a fasting blood glucose of 145 mg/dL"], answer: 2, exp: "Acute confusion, restlessness, and SpO2 88% indicate cerebral hypoxia requiring immediate airway/O2 intervention." },
    { text: "A terminally ill client with an active DNR order develops sudden agonal respirations. The client's spouse frantically demands CPR. The nurse's priority action is to:", options: ["Initiate chest compressions immediately", "Gently support the spouse, explain the DNR directive, and provide comfort care to the client", "Call the code blue team", "Page the attending physician for a stat order"], answer: 1, exp: "The nurse must uphold the client's documented legal advance directive while providing compassionate support." },
    { text: "A nurse is assigned four clients. Which laboratory result requires the most URGENT provider clarification?", options: ["Hemoglobin 11.2 g/dL in a post-op orthopedic client", "Serum potassium 6.2 mEq/L in an oliguric client", "WBC count 11,500/mm3 in a client with cellulitis", "Serum sodium 136 mEq/L in a client on IV fluids"], answer: 1, exp: "Serum potassium 6.2 mEq/L poses imminent risk of fatal ventricular dysrhythmias and cardiac arrest." },
    { text: "A client who underwent an open exploratory laparotomy 4 hours ago has a saturated abdominal dressing with bright red blood. Vital signs: BP 90/58 mmHg, HR 122 bpm. The nurse's immediate action is to:", options: ["Change the dressing completely with sterile gauze", "Reinforce the dressing, elevate the client's legs, and immediately summon the surgical team", "Administer prescribed oral analgesics", "Encourage deep breathing and coughing"], answer: 1, exp: "Signs of active surgical hemorrhage and hypovolemic shock require dressing reinforcement and immediate surgeon escalation." },
    { text: "Which ethical dilemma represents a conflict between Beneficence and Patient Autonomy?", options: ["Administering pain medication per scheduled orders", "A competent Jehovah's Witness refusing a life-saving blood transfusion for severe anemia", "Refusing to care for an infectious patient", "Documenting a medication error truthfully"], answer: 1, exp: "Beneficence impels saving the client's life, while autonomy respects the competent client's right to refuse." },
    // L4: Peak Acuity Emergency
    { text: "A multi-trauma client arrives in the emergency department with severe facial trauma, gurgling respirations, and cyanosis. The FIRST priority life-saving intervention is:", options: ["Insert a large-bore peripheral IV catheter", "Clear secretions with rigid suction and prepare for immediate endotracheal intubation or surgical airway", "Obtain a portable cervical spine X-ray", "Infuse 2 units of uncrossmatched packed red blood cells"], answer: 1, exp: "Airway with cervical spine protection is the absolute first priority in emergency trauma resuscitation." },
    { text: "During rapid sequence intubation (RSI) for a critically decompensating client, the nurse notes severe bradycardia (HR 32 bpm) and falling SpO2 (68%). The nurse must immediately:", options: ["Administer the neuromuscular paralytic agent", "Halt the intubation attempt, ventilate with 100% O2 via bag-valve-mask, and administer Atropine if indicated", "Insert a nasogastric tube", "Apply warm blankets for hypothermia"], answer: 1, exp: "Profound hypoxia-induced bradycardia during intubation requires immediate abort and manual bag-valve-mask re-oxygenation." },
    { text: "A client in the ICU on mechanical ventilation suddenly develops severe tracheal deviation to the left, absent right breath sounds, and BP 72/40 mmHg. The nurse should anticipate:", options: ["Stat portable chest X-ray", "Immediate needle thoracostomy decompression in the 2nd right intercostal space", "Increasing the tidal volume on the ventilator", "Administering IV furosemide"], answer: 1, exp: "Tension pneumothorax with obstructive shock is a clinical emergency requiring immediate needle decompression without waiting for X-ray." },
    { text: "A client with septic shock remains hypotensive (MAP 52 mmHg) despite 30 mL/kg crystalloid resuscitation. The nurse's priority vasoactive drug titration is:", options: ["Dobutamine infusion", "Norepinephrine infusion titrated to maintain MAP ≥65 mmHg", "Epinephrine sublingually", "Atropine IV push"], answer: 1, exp: "Norepinephrine is the first-line vasopressor in septic shock to restore systemic vascular resistance and organ perfusion." },
    { text: "In a mass casualty disaster triage (START protocol), which patient receives an immediate RED (Priority 1) tag?", options: ["An unconscious client with no respirations after airway repositioning", "A client with respiratory rate 36 breaths/min, capillary refill >2 seconds, and altered mental status", "A client with a closed wrist fracture who is ambulatory", "A client with severe third-degree burns over 95% of body surface and agonal respirations"], answer: 1, exp: "Tachypnea (>30/min), prolonged CRT (>2s), and inability to follow commands indicate Immediate Red (Priority 1) status." }
  ],

  // ─────────────────────────────────────────────────────────────
  // 2. VITAL SIGNS ASSESSMENT
  // ─────────────────────────────────────────────────────────────
  "Vital Signs Assessment": [
    // L1: Foundational Recall
    { text: "According to standard clinical guidelines, what is considered the normal resting adult respiratory rate range?", options: ["8 to 12 breaths/min", "12 to 20 breaths/min", "22 to 28 breaths/min", "30 to 36 breaths/min"], answer: 1, exp: "Normal resting adult respiratory rate is 12 to 20 breaths per minute." },
    { text: "Which pulse site is the most reliable and standard for assessing cardiovascular status in an adult undergoing CPR?", options: ["Radial pulse", "Carotid pulse", "Brachial pulse", "Dorsalis pedis pulse"], answer: 1, exp: "The carotid artery provides the most accessible central pulse during adult cardiac arrest." },
    { text: "Using a blood pressure cuff that is too narrow (too small) for the client's arm circumference will result in:", options: ["A falsely low blood pressure reading", "A falsely high blood pressure reading", "No effect on the reading", "An undetectable Korotkoff sound"], answer: 1, exp: "A cuff bladder that is too small requires excessive pressure to occlude the artery, producing falsely elevated BP." },
    { text: "What is the normal adult core body temperature range measured orally?", options: ["35.0°C to 36.0°C (95.0°F to 96.8°F)", "36.5°C to 37.5°C (97.7°F to 99.5°F)", "38.0°C to 39.0°C (100.4°F to 102.2°F)", "34.5°C to 35.5°C (94.1°F to 95.9°F)"], answer: 1, exp: "Normal adult oral temperature ranges between 36.5°C and 37.5°C." },
    { text: "A pulse deficit is calculated by determining the difference between:", options: ["The systolic and diastolic blood pressure", "The apical heart rate and the radial pulse rate measured simultaneously", "The right arm and left arm blood pressure", "The morning and evening body temperatures"], answer: 1, exp: "Pulse deficit = Apical rate - Radial rate; indicates non-perfusing ventricular contractions." },
    // L2: Base Clinical Practice
    { text: "A client who had a hot cup of tea 5 minutes ago requires an oral temperature check. The nurse should:", options: ["Take the oral temperature immediately", "Wait 20 to 30 minutes before obtaining an oral reading", "Add 1.0°F to the obtained value", "Use an axillary measurement and multiply by 1.5"], answer: 1, exp: "Hot or cold ingestion alters oral mucosal temperature; waiting 20-30 minutes ensures accuracy." },
    { text: "The nurse assesses a client's apical pulse at which anatomical landmark?", options: ["2nd intercostal space, right sternal border", "5th intercostal space, left midclavicular line", "3rd intercostal space, left sternal border", "4th intercostal space, midaxillary line"], answer: 1, exp: "The point of maximal impulse (PMI) is located at the 5th intercostal space, left midclavicular line." },
    { text: "A client's blood pressure is 156/94 mmHg on two consecutive visits. Under AHA/ACC guidelines, this is classified as:", options: ["Normal Blood Pressure", "Elevated Blood Pressure", "Stage 1 Hypertension", "Stage 2 Hypertension"], answer: 3, exp: "Stage 2 Hypertension is defined as systolic ≥140 mmHg or diastolic ≥90 mmHg." },
    { text: "When evaluating orthostatic hypotension, the nurse records blood pressure and heart rate in which sequence?", options: ["Standing, then sitting, then lying down", "Supine, then sitting, then standing (with 2-3 min intervals)", "Walking, then resting supine", "Simultaneously using two cuffs"], answer: 1, exp: "Orthostatics are measured supine, sitting, then standing with 2-3 minutes between position changes." },
    { text: "A client's pulse oximeter reads 89% SpO2 on room air. The client is alert and speaking in full sentences without distress. The nurse's first action is to:", options: ["Call a code blue", "Verify sensor placement, probe position, and peripheral perfusion", "Administer 100% O2 via non-rebreather", "Prepare for endotracheal intubation"], answer: 1, exp: "Before escalating, verify probe alignment, skin warmth, and plethysmographic waveform reliability." },
    // L3: Advanced Hard / Prioritization
    { text: "A client with head trauma exhibits Cheyne-Stokes respirations. The nurse recognizes this breathing pattern as:", options: ["Rapid, deep respirations with a fruity acetone odor", "A rhythmic pattern of increasing rate and depth followed by gradual decrease and temporary apnea", "Completely irregular respirations with unpredictable pauses", "Prolonged gasping inspiration followed by short expiration"], answer: 1, exp: "Cheyne-Stokes breathing cycles between hyperpnea and apnea, indicating bilateral hemispheric or diencephalic injury." },
    { text: "Which client should the nurse evaluate FIRST based on vital signs?", options: ["Post-op client with BP 118/76 mmHg, HR 82 bpm, RR 18/min", "COPD client with SpO2 90% on 2 L/min nasal cannula and HR 88 bpm", "Pneumonia client with HR 128 bpm, RR 30/min, BP 84/52 mmHg, and SpO2 86%", "Hypertensive client with BP 148/92 mmHg, HR 76 bpm, and no complaints"], answer: 2, exp: "Severe tachycardia, tachypnea, hypotension, and severe hypoxia indicate decompensating septic shock." },
    { text: "A client with a history of hypertension reports a sudden tearing chest pain radiating to the back. BP is 194/110 mmHg in the right arm and 142/80 mmHg in the left arm. The nurse anticipates:", options: ["Myocardial infarction requiring immediate tPA", "Acute aortic dissection requiring emergency CT angiogram and blood pressure reduction", "Pulmonary embolism requiring heparin", "Costochondritis requiring NSAIDs"], answer: 1, exp: "Tearing back pain with an inter-arm BP differential >20 mmHg is classic for acute aortic dissection; thrombolytics are fatal." },
    { text: "The nurse notes a client's pulse pressure has narrowed from 45 mmHg to 18 mmHg over 2 hours, with muffled heart tones and distended jugular veins. This indicates:", options: ["Left ventricular hypertrophy", "Cardiac tamponade (Beck's triad)", "Hyperthyroidism", "Aortic valve regurgitation"], answer: 1, exp: "Beck's triad (hypotension with narrowed pulse pressure, JVD, muffled heart sounds) indicates acute cardiac tamponade." },
    { text: "In a patient receiving patient-controlled analgesia (PCA) morphine, the nurse assesses RR 7 breaths/min and lethargy. The immediate priority intervention is to:", options: ["Stop the PCA infusion, stimulate the client, and administer IV Naloxone", "Check blood glucose level", "Administer oxygen via nasal cannula and continue PCA", "Document findings as expected deep sleep"], answer: 0, exp: "Life-threatening opioid-induced respiratory depression requires immediate drug cessation, stimulation, and IV Naloxone reversal." },
    // L4: Peak Acuity Emergency
    { text: "An ICU client's arterial line waveform suddenly displays severe pulsus paradoxus (drop in systolic BP >15 mmHg during inspiration). The nurse prepares for:", options: ["Immediate emergency pericardiocentesis", "Infusion of 500 mL albumin", "Endotracheal extubation", "Initiating a beta-blocker infusion"], answer: 0, exp: "Marked pulsus paradoxus indicates pericardial tamponade causing ventricular compromise requiring emergent pericardiocentesis." },
    { text: "A post-coronary bypass client displays sudden ventricular tachycardia with no palpable carotid pulse. The nurse's immediate action is to:", options: ["Administer IV Amiodarone 300 mg over 10 minutes", "Initiate immediate chest compressions, call code blue, and defibrillate as soon as the defibrillator is ready", "Perform synchronous cardioversion at 50 Joules", "Administer IV Epinephrine 1 mg before CPR"], answer: 1, exp: "Pulseless VT is a shockable cardiac arrest rhythm requiring immediate high-quality CPR and rapid unsynchronized defibrillation." },
    { text: "A client with traumatic brain injury displays Cushing's Triad. Which cluster of vital signs confirms this life-threatening state?", options: ["BP 80/50 mmHg, HR 130 bpm, RR 32/min", "BP 196/64 mmHg (widened pulse pressure), HR 42 bpm (bradycardia), RR 8/min irregular", "BP 120/80 mmHg, HR 72 bpm, RR 16/min", "BP 160/100 mmHg, HR 110 bpm, RR 24/min"], answer: 1, exp: "Cushing's Triad (severe hypertension with widened pulse pressure, bradycardia, irregular respirations) signals impending brain herniation." },
    { text: "A client in anaphylactic shock displays BP 68/38 mmHg, HR 140 bpm, and severe audible laryngeal stridor. The absolute FIRST medication to administer is:", options: ["Intravenous Diphenhydramine 50 mg", "Intravenous Methylprednisolone 125 mg", "Intramuscular Epinephrine (1:1000) 0.3–0.5 mg into the anterolateral thigh", "Inhaled Albuterol nebulizer"], answer: 2, exp: "IM Epinephrine is the first-line life-saving medication for anaphylaxis, causing immediate vasoconstriction and bronchodilation." },
    { text: "During hemodynamic titration in septic shock, which parameter indicates adequate end-organ cellular perfusion?", options: ["Central venous pressure (CVP) of 2 mmHg", "Mean arterial pressure (MAP) ≥65 mmHg and serum lactate clearing to <2.0 mmol/L", "Heart rate >120 bpm", "Urine output of 10 mL/hr"], answer: 1, exp: "MAP ≥65 mmHg combined with lactate clearance confirms restoration of cellular tissue perfusion." }
  ],

  // ─────────────────────────────────────────────────────────────
  // 3. MEDICATION ADMINISTRATION & PHARMACOLOGY
  // ─────────────────────────────────────────────────────────────
  "Medication Administration": [
    // L1: Foundational Recall
    { text: "Which of the following is NOT one of the traditional core 'rights' of medication administration?", options: ["Right patient", "Right dose", "Right room number", "Right route"], answer: 2, exp: "Core rights include: patient, drug, dose, route, time. Room number is not an acceptable identifier." },
    { text: "Which intramuscular injection site is the preferred and safest choice for infants under 12 months?", options: ["Deltiod muscle", "Vastus lateralis muscle (anterolateral thigh)", "Dorsogluteal muscle", "Abdominal rectus muscle"], answer: 1, exp: "The vastus lateralis is well-developed in infants and avoids major nerves and vascular bundles." },
    { text: "The primary purpose of using the Z-track technique for intramuscular injections is to:", options: ["Speed up the rate of systemic absorption", "Prevent leakage of irritating medication into the subcutaneous tissue and skin", "Reduce the needle penetration depth", "Allow administration of large volumes up to 10 mL"], answer: 1, exp: "Z-track seals the needle path, trapping irritating drugs (like iron) deep within the muscle." },
    { text: "A physician prescribes medication 'QID'. The nurse administers this medication:", options: ["Once every other day", "Twice daily", "Three times daily", "Four times daily"], answer: 3, exp: "QID (quater in die) designates administration four times daily." },
    { text: "Sublingual tablets are administered by placing them:", options: ["Between the cheek and gum", "Under the tongue until dissolved completely without swallowing water", "Directly swallowed with warm milk", "Crushed and mixed with applesauce"], answer: 1, exp: "Sublingual drugs dissolve under the tongue for rapid absorption through the sublingual vascular bed." },
    // L2: Base Clinical Practice
    { text: "A client is prescribed regular insulin 8 units and NPH insulin 20 units subcutaneously. In what order should the nurse draw them into a single syringe?", options: ["Air into Regular, air into NPH, draw NPH, draw Regular", "Air into NPH, air into Regular, draw Regular (clear), draw NPH (cloudy)", "Draw NPH first, then draw Regular", "Mix both in a medicine cup before aspiration"], answer: 1, exp: "Clear before cloudy: inject air into NPH, air into Regular, draw Regular (clear), then draw NPH (cloudy)." },
    { text: "Prior to administering a scheduled morning dose of Digoxin 0.25 mg, the nurse counts an apical pulse of 52 bpm. The nurse must:", options: ["Administer the medication with orange juice", "Hold the dose, document the pulse, and notify the healthcare provider", "Give half of the prescribed dose", "Administer the dose intramuscularly"], answer: 1, exp: "Digoxin slows AV node conduction; withhold if apical HR is <60 bpm in adults to prevent fatal bradycardia." },
    { text: "The nurse is infusing IV Vancomycin over 30 minutes. The client suddenly develops intense facial flushing, erythematous rash on the neck and torso, and pruritus. The nurse recognizes this as:", options: ["An immediate IgE-mediated anaphylactic reaction", "'Red Man Syndrome' caused by too-rapid infusion of Vancomycin", "Stevens-Johnson syndrome", "Expected therapeutic antibiotic effect"], answer: 1, exp: "Red Man Syndrome is a rate-dependent histamine release managed by stopping/slowing infusion over ≥60-120 min." },
    { text: "Which oral medication can be safely crushed for a client with dysphagia?", options: ["Metoprolol Succinate Extended-Release (ER)", "Enteric-coated Aspirin (Ecotrin)", "Acetaminophen immediate-release regular tablet", "Potassium Chloride Extended-Release (Micro-K)"], answer: 2, exp: "Immediate-release acetaminophen can be crushed; crushing ER or enteric-coated drugs causes toxic dumping." },
    { text: "A client receiving IV peripheral fluid therapy reports sudden burning pain at the site. The nurse assesses coolness to touch, pallor, and swelling. The nurse's immediate action is:", options: ["Apply a warm compress and continue infusion", "Stop the infusion immediately and remove the peripheral IV catheter (Infiltration)", "Slow the infusion rate to keep vein open (KVO)", "Flush the catheter with 10 mL heparin"], answer: 1, exp: "Coolness, pallor, and swelling confirm infiltration; the infusion must be stopped and catheter discontinued." },
    // L3: Advanced Hard / Prioritization
    { text: "A client receiving a continuous IV unfractionated heparin infusion for deep vein thrombosis has an aPTT of 152 seconds (control: 30 seconds) with new epistaxis. The nurse anticipates administering:", options: ["Phytonadione (Vitamin K)", "Protamine Sulfate IV", "Fresh Frozen Plasma (FFP)", "Aminocaproic acid"], answer: 1, exp: "Protamine Sulfate is the specific, rapid-acting chemical antagonist for unfractionated heparin overdose." },
    { text: "A client with bipolar disorder taking Lithium Carbonate 600 mg TID presents with coarse tremors, persistent vomiting, severe diarrhea, ataxia, and confusion. Serum lithium level is 2.6 mEq/L. The nurse anticipates:", options: ["Administering additional oral lithium", "Withholding lithium, initiating aggressive IV hydration with 0.9% NS, and preparing for hemodialysis", "Administering potassium chloride bolus", "Administering oral activated charcoal"], answer: 1, exp: "Lithium level >2.0 mEq/L with neurological symptoms represents severe toxicity requiring IV saline or hemodialysis." },
    { text: "A client on Warfarin has an INR of 7.8 with active hematuria. The nurse prepares to administer:", options: ["Protamine sulfate", "Vitamin K (Phytonadione) and Prothrombin Complex Concentrate (PCC)", "Aspirin 325 mg", "Low-molecular-weight heparin"], answer: 1, exp: "Supratherapeutic INR with major bleeding warrants rapid reversal with Vitamin K and 4-factor PCC." },
    { text: "A nurse is preparing to administer IV Potassium Chloride 40 mEq. Which administration route/technique is FATALLY CONTRAINDICATED?", options: ["IV infusion via volumetric pump at 10 mEq/hr", "Direct IV push injection (bolus)", "Diluting in 500 mL normal saline", "Continuous cardiac telemetry monitoring during infusion"], answer: 1, exp: "Potassium Chloride must NEVER be given IV push; rapid bolus causes instant cardiac arrest." },
    { text: "Which assessment finding in a client receiving Gentamicin IV requires IMMEDIATE intervention to prevent permanent disability?", options: ["Mild dry mouth", "Tinnitus, high-frequency hearing loss, or progressive dizziness (ototoxicity)", "Nausea after meals", "Slight headache"], answer: 1, exp: "Aminoglycosides cause irreversible ototoxicity (damage to CN VIII) and nephrotoxicity; report immediately." },
    // L4: Peak Acuity Emergency
    { text: "A client receiving a continuous IV Nitroglycerin infusion for STEMI has a sudden blood pressure drop to 74/42 mmHg with HR 118 bpm. The nurse's first action is to:", options: ["Increase the nitroglycerin rate", "Turn off the nitroglycerin infusion immediately and elevate the client's legs", "Administer sublingual nitroglycerin", "Administer IV metoprolol"], answer: 1, exp: "Profound hypotension compromises coronary perfusion; stop the nitrate vasodilator immediately." },
    { text: "A client experiencing status epilepticus has received two doses of IV Lorazepam without seizure termination. The next emergent medication to prepare is:", options: ["Oral Phenobarbital", "Intravenous Fosphenytoin or Levetiracetam infusion", "Sublingual Carbamazepine", "Subcutaneous Insulin"], answer: 1, exp: "Refractory status epilepticus following benzodiazepines requires second-line IV anticonvulsants (fosphenytoin/levetiracetam)." },
    { text: "During continuous epidural bupivacaine infusion, the client develops perioral numbness, metallic taste, severe agitation, followed by cardiovascular collapse. The nurse prepares the antidote:", options: ["Naloxone", "Flumazenil", "Intravenous Lipid Emulsion (Intralipid 20%)", "Sodium bicarbonate"], answer: 2, exp: "Local Anesthetic Systemic Toxicity (LAST) from bupivacaine requires emergent 20% Lipid Emulsion resuscitation." },
    { text: "A patient with myasthenic crisis vs cholinergic crisis receives the Tensilon (Edrophonium) test. Following injection, the patient develops profound muscle weakness and apnea. The nurse immediately gives:", options: ["Neostigmine", "Atropine Sulfate IV", "Dantrolene", "Calcium gluconate"], answer: 1, exp: "Worsening symptoms upon Tensilon confirm Cholinergic Crisis; Atropine is the immediate anticholinergic antidote." },
    { text: "A septic client is receiving Norepinephrine at maximum dose with persistent MAP 54 mmHg. The intensivist orders a second-line vasopressor to restore tone. The nurse anticipates:", options: ["Vasopressin (0.03 units/min non-titrated infusion)", "Furosemide IV", "Nitroprusside IV", "Metoprolol IV"], answer: 0, exp: "Vasopressin acts on V1 receptors and is the standard second-line agent added to norepinephrine in refractory septic shock." }
  ],

  // ─────────────────────────────────────────────────────────────
  // 4. INFECTION PREVENTION AND CONTROL & MICROBIOLOGY
  // ─────────────────────────────────────────────────────────────
  "Infection Prevention and Control": [
    // L1: Foundational Recall
    { text: "What is the single most effective method to prevent healthcare-associated infections (HAIs)?", options: ["Wearing clean gloves for all client interactions", "Thorough hand hygiene with soap and water or alcohol-based hand rub", "Routine prophylactic antibiotic administration", "Using ultraviolet radiation in all patient rooms"], answer: 1, exp: "Hand hygiene is universally recognized as the single most effective intervention to prevent HAI transmission." },
    { text: "A client with active pulmonary tuberculosis requires which category of transmission-based precautions?", options: ["Standard precautions only", "Contact precautions", "Droplet precautions", "Airborne precautions with an N95 respirator and negative-pressure room"], answer: 3, exp: "Mycobacterium tuberculosis travels via airborne droplet nuclei; requires negative airflow and N95 respirators." },
    { text: "What is the proper sequence for DONNING personal protective equipment (PPE)?", options: ["Gloves -> Gown -> Mask -> Goggles", "Gown -> Mask/Respirator -> Goggles/Face Shield -> Gloves", "Mask -> Gloves -> Gown -> Goggles", "Goggles -> Gown -> Gloves -> Mask"], answer: 1, exp: "Donning sequence: Gown first, followed by Mask/Respirator, Goggles/Face Shield, and Gloves last." },
    { text: "What is the proper sequence for DOFFING personal protective equipment (PPE)?", options: ["Gown -> Mask -> Goggles -> Gloves", "Gloves -> Goggles/Face Shield -> Gown -> Mask/Respirator (clean hands between)", "Mask -> Gown -> Gloves -> Goggles", "Gloves -> Mask -> Gown -> Goggles"], answer: 1, exp: "Doffing sequence: Remove most contaminated items first: Gloves, Goggles, Gown, then Mask last outside the room." },
    { text: "According to biomedical waste management guidelines, human anatomical waste and soiled dressings are discarded in:", options: ["Blue container", "Red puncture-proof container", "Yellow bag", "Black general waste container"], answer: 2, exp: "Yellow biomedical bags are designated for anatomical waste, pathological specimens, and blood-soaked items." },
    // L2: Base Clinical Practice
    { text: "A client is admitted with confirmed Clostridioides difficile enteritis. Which hand hygiene protocol is MANDATORY?", options: ["Alcohol-based hand rub for 15 seconds", "Washing hands with soap and water for at least 20 seconds", "Wiping hands with sterile saline gauze", "Using chlorhexidine sponge without water"], answer: 1, exp: "C. difficile produces spores resistant to alcohol; mechanical friction with soap and water is required." },
    { text: "When caring for a client on Droplet Precautions (e.g., bacterial meningitis or influenza), the nurse must wear:", options: ["An N95 particulate respirator", "A surgical mask upon entering the room within 3-6 feet of the client", "A sterile positive-pressure space suit", "Gloves only"], answer: 1, exp: "Droplet transmission occurs via large respiratory droplets; a surgical mask within close proximity is mandatory." },
    { text: "A nurse sustains an accidental needlestick injury from a contaminated needle used on an unknown patient. The nurse's FIRST action is:", options: ["Squeeze the wound vigorously to express blood", "Wash the needlestick site thoroughly with soap and water", "Apply a tourniquet proximal to the puncture", "Report directly to the employee health department without washing"], answer: 1, exp: "Immediate copious washing of the puncture site with soap and water is the critical first action." },
    { text: "In maintaining a sterile field for catheterization, which action by the nurse VIOLATES surgical asepsis?", options: ["Keeping sterile hands above waist level at all times", "Turning one's back on the sterile field to answer a question", "Pouring sterile liquid without splashing onto the field", "Discarding a kit whose wrapper is torn or wet"], answer: 1, exp: "Turning one's back or losing visual contact breaks sterility and renders the field unsterile." },
    { text: "Which organism is the most frequent cause of surgical site infections (SSIs)?", options: ["Staphylococcus aureus (including MRSA)", "Pseudomonas aeruginosa", "Escherichia coli", "Candida albicans"], answer: 0, exp: "Staphylococcus aureus colonizing skin is the leading cause of surgical wound infections worldwide." },
    // L3: Advanced Hard / Prioritization
    { text: "A client with neutropenia (Absolute Neutrophil Count ANC 350/mm3) is placed in protective isolation. Which item is CONTRAINDICATED in the room?", options: ["Bottled sterile water", "Cooked vegetables and well-done meats", "Fresh flowers, live plants, and unpeeled raw fruits", "Electric razor for shaving"], answer: 2, exp: "Fresh flowers, plants, and raw fruits harbor soil microbes and Aspergillus, posing fatal infection risks to neutropenic clients." },
    { text: "A postoperative client with a central venous catheter develops rigors, temp 39.4°C, HR 122 bpm, and BP 88/50 mmHg. The nurse's immediate priority is to:", options: ["Administer oral acetaminophen", "Draw two sets of blood cultures (one peripheral, one from central line) and begin stat broad-spectrum IV antibiotics", "Remove the central line immediately without culturing", "Infuse 5% dextrose water at 50 mL/hr"], answer: 1, exp: "Suspected central line-associated bloodstream infection (CLABSI) requires urgent blood cultures followed immediately by broad-spectrum empiric antibiotics." },
    { text: "When evaluating culture and sensitivity reports for a client with urosepsis, the nurse identifies ESBL-producing Klebsiella pneumoniae. Which isolation precaution is required?", options: ["Airborne precautions", "Contact precautions", "Droplet precautions", "Standard precautions only"], answer: 1, exp: "Extended-Spectrum Beta-Lactamase (ESBL) producing bacteria are multidrug-resistant and require strict Contact Precautions." },
    { text: "A client undergoing hemodialysis tests positive for Hepatitis B surface antigen (HBsAg). The nurse ensures that:", options: ["The client is isolated in a negative pressure airborne room", "The client is dialyzed on a dedicated machine in an isolated Hepatitis B dialysis area", "Dialysis tubing is disinfected with alcohol and reused", "The client receives an immediate dose of Hepatitis B vaccine"], answer: 1, exp: "Hepatitis B transmission in dialysis requires dedicated dialysis machines and isolated treatment spaces." },
    { text: "Which sterilization method is standard for heat-sensitive surgical instruments like flexible endoscopes?", options: ["Steam autoclaving at 121°C", "Ethylene Oxide (EtO) gas or low-temperature hydrogen peroxide gas plasma", "Boiling water for 15 minutes", "Immersion in 70% ethyl alcohol"], answer: 1, exp: "Low-temperature hydrogen peroxide plasma or EtO gas sterilizes heat-labile optical equipment without heat damage." },
    // L4: Peak Acuity Emergency
    { text: "A client in septic shock secondary to necrotizing fasciitis displays mottled extremities, severe acidosis (pH 7.15, lactate 6.8 mmol/L), and crepitus over the thigh. The nurse anticipates:", options: ["Conservative dressing changes with antibiotic ointment", "Immediate emergent surgical fasciotomy and debridement in the operating room", "Hyperbaric oxygen therapy next week", "Corticosteroid therapy alone"], answer: 1, exp: "Necrotizing soft tissue infection is a surgical emergency; immediate aggressive debridement is essential to halt lethal toxemia." },
    { text: "A client presenting with suspected Ebola or Viral Hemorrhagic Fever displays hematemesis and delirium. The nurse's absolute safety requirement before entering is:", options: ["Surgical mask and clean gloves", "Full-body impermeable protective suit, PAPR or N95, double gloving, boot covers, with trained observer oversight", "Standard precautions with eye goggles", "Administering oral ribavirin"], answer: 1, exp: "VHF protocols mandate complete skin barrier coverage with trained observer monitoring during donning and doffing." },
    { text: "During the first hour of a suspected septic shock presentation (Surviving Sepsis Campaign bundle), which four actions must be executed?", options: ["Stat head CT, lumbar puncture, chest tube, insulin infusion", "Measure lactate, obtain blood cultures before antibiotics, administer broad-spectrum antibiotics, begin 30 mL/kg crystalloids for hypotension/lactate ≥4", "Insert arterial line, endotracheal tube, swan-ganz catheter, dialysis catheter", "Administer vasopressors before IV fluids"], answer: 1, exp: "The 1-hour sepsis bundle: measure lactate, blood cultures prior to antibiotics, broad-spectrum antibiotics, and 30 mL/kg fluids for shock." },
    { text: "A healthcare worker is splashed with HIV-positive blood directly across mucous membranes (eyes). Post-exposure prophylaxis (PEP) should ideally be initiated within:", options: ["72 hours, preferably within 2 hours", "1 week", "24 hours only", "1 month"], answer: 0, exp: "HIV PEP is most effective when started immediately, ideally within 2 hours and no later than 72 hours post-exposure." },
    { text: "An intensive care client with multidrug-resistant Acinetobacter baumannii ventilator-associated pneumonia requires transport to CT. The infection control requirement is:", options: ["Canceling the CT scan indefinitely", "Placing an in-line bacterial filter on the ventilator circuit and alerting the destination department to prepare contact isolation barriers", "Removing the endotracheal tube for transport", "Spraying the client with bleach prior to transfer"], answer: 1, exp: "Safe transport of critically ill colonized patients requires in-line closed filtration and barrier isolation at the receiving unit." }
  ],

  // ─────────────────────────────────────────────────────────────
  // 5. NUTRITION & DIETETICS
  // ─────────────────────────────────────────────────────────────
  "Basic Nutrition": [
    // L1: Foundational Recall
    { text: "Which vitamin deficiency is classically responsible for scurvy, characterized by bleeding gums and poor wound healing?", options: ["Vitamin A", "Vitamin B1 (Thiamine)", "Vitamin C (Ascorbic acid)", "Vitamin D"], answer: 2, exp: "Vitamin C is essential for collagen synthesis; deficiency causes capillary fragility, bleeding gums, and scurvy." },
    { text: "Which vitamin is synthesized in the skin upon exposure to ultraviolet B (UVB) sunlight?", options: ["Vitamin A", "Vitamin D", "Vitamin E", "Vitamin K"], answer: 1, exp: "Cholecalciferol (Vitamin D3) is synthesized in epidermal keratinocytes catalyzed by UVB radiation." },
    { text: "Which group consists entirely of fat-soluble vitamins?", options: ["Vitamins B1, B6, B12, and C", "Vitamins A, D, E, and K", "Vitamins B, C, D, and Iron", "Folic acid, Niacin, Biotin, and Calcium"], answer: 1, exp: "Vitamins A, D, E, and K are fat-soluble and stored in the liver and adipose tissue." },
    { text: "To maximize absorption of non-heme oral iron supplements, the client should take them with:", options: ["A full glass of whole milk", "Orange juice or food rich in Vitamin C", "Hot black tea or coffee", "Calcium carbonate antacid tablets"], answer: 1, exp: "Vitamin C reduces ferric iron to ferrous iron, which is significantly more soluble and easily absorbed in the duodenum." },
    { text: "What is the primary macronutrient responsible for tissue building, cellular repair, and wound healing?", options: ["Carbohydrates", "Proteins", "Dietary fats", "Insoluble fiber"], answer: 1, exp: "Amino acids from dietary protein provide the essential structural nitrogen required for tissue regeneration." },
    // L2: Base Clinical Practice
    { text: "A client with Chronic Kidney Disease (Stage 4, pre-dialysis) requires dietary modification. Which diet is prescribed?", options: ["High protein, high potassium, unrestricted sodium", "Low protein, restricted potassium, restricted sodium, and low phosphorus", "High sodium, high potassium liquid diet", "Strict ketogenic diet"], answer: 1, exp: "Non-dialyzed CKD clients require protein, potassium, sodium, and phosphorus restrictions to prevent uremia and hyperkalemia." },
    { text: "A client with newly diagnosed Celiac Disease must strictly avoid which grains?", options: ["Corn, rice, and soy", "Wheat, barley, and rye", "Oats, millet, and quinoa", "Buckwheat, arrowroot, and tapioca"], answer: 1, exp: "Gluten is a protein complex found in wheat, barley, and rye that triggers autoimmune intestinal villous atrophy." },
    { text: "Which food item is permitted on a Full Liquid diet but excluded from a Clear Liquid diet?", options: ["Apple juice", "Strained cream of chicken soup and milk", "Black coffee without sugar", "Clear chicken broth"], answer: 1, exp: "Milk, cream soups, and puddings are opaque liquids allowed on full liquid diets but excluded from clear liquid diets." },
    { text: "To prevent aspiration in a client receiving continuous enteral tube feeding via nasogastric tube, the nurse must:", options: ["Keep the head of the bed elevated at 30 to 45 degrees at all times", "Lay the client flat in supine position during infusions", "Flush the tube with iced ginger ale every hour", "Administer bolus feeds over 2 minutes"], answer: 0, exp: "Maintaining HOB elevation at 30-45 degrees significantly reduces gastroesophageal reflux and aspiration pneumonia." },
    { text: "A client with cirrhosis and hepatic encephalopathy has an elevated serum ammonia level. The nurse anticipates:", options: ["Encouraging a massive red-meat protein diet", "Administering Lactulose orally to trap ammonia in the colon and promote excretion", "Restricting all dietary fluids to <200 mL/day", "Administering high-dose potassium supplements"], answer: 1, exp: "Lactulose acidifies colonic contents, converting ammonia (NH3) to non-absorbable ammonium (NH4+) excreted in stool." },
    // L3: Advanced Hard / Prioritization
    { text: "A client with severe anorexia nervosa and BMI 13 kg/m2 is started on Total Parenteral Nutrition (TPN). The nurse monitors for Refeeding Syndrome by evaluating which critical electrolyte triad?", options: ["Hypernatremia, hypercalcemia, and hypermagnesemia", "Severe Hypophosphatemia, Hypokalemia, and Hypomagnesemia", "Hyperkalemia and metabolic acidosis", "Elevated blood urea nitrogen and creatinine"], answer: 1, exp: "Carbohydrate infusion stimulates insulin, driving phosphorus, potassium, and magnesium into cells causing life-threatening hypophosphatemia." },
    { text: "A client receiving continuous TPN has their infusion bag run out unexpectedly, and the next bag is delayed from pharmacy. To prevent acute rebound hypoglycemia, the nurse immediately infuses:", options: ["0.9% Normal Saline at 50 mL/hr", "10% Dextrose in Water (D10W) at the same infusion rate", "Sterile Water for injection", "Lactated Ringer's solution"], answer: 1, exp: "Abrupt cessation of high-glucose TPN triggers profound hypoglycemia from hyperinsulinemia; infuse 10% dextrose while awaiting new bag." },
    { text: "A client who underwent a total gastrectomy 1 year ago presents with severe fatigue, smooth beefy red tongue, paresthesias in the feet, and macrocytic anemia. The nurse identifies:", options: ["Iron deficiency microcytic anemia", "Vitamin B12 deficiency (Pernicious anemia) due to loss of parietal cell Intrinsic Factor", "Folic acid deficiency from poor citrus intake", "Thiamine deficiency (Beri-beri)"], answer: 1, exp: "Gastrectomy removes parietal cells that produce intrinsic factor, preventing terminal ileal B12 absorption." },
    { text: "Which client is at the HIGHEST risk for developing Wernicke-Korsakoff Encephalopathy, requiring immediate IV Thiamine?", options: ["A teenager with type 1 diabetes", "A chronic alcohol-dependent client presenting with malnutrition, ataxia, and nystagmus", "An elderly client with osteoporosis taking calcium", "A pregnant client with mild morning sickness"], answer: 1, exp: "Chronic alcoholism impairs thiamine absorption; thiamine deficiency leads to life-threatening acute Wernicke encephalopathy." },
    { text: "In a client with severe acute pancreatitis, which nutritional strategy is supported by current clinical guidelines?", options: ["Total starvation for 3 weeks with no IV support", "Early enteral nutrition via nasojejunal tube past the ligament of Treitz to maintain gut mucosal barrier", "High-fat oral liquid supplements", "Immediate exploratory laparotomy"], answer: 1, exp: "Early enteral nutrition distal to the duodenum prevents gut bacterial translocation and reduces systemic infectious complications." },
    // L4: Peak Acuity Emergency
    { text: "A severely malnourished client developing acute Refeeding Syndrome exhibits serum phosphorus 0.8 mg/dL (normal: 2.5-4.5 mg/dL), acute respiratory muscle paralysis, and cardiac dysrhythmias. The nurse's immediate action is:", options: ["Continue TPN at increased rate", "Halt carbohydrate infusion and administer emergent IV Sodium or Potassium Phosphate with continuous cardiac telemetry", "Administer oral antacids containing aluminum", "Give subcutaneous regular insulin"], answer: 1, exp: "Severe hypophosphatemia (<1.0 mg/dL) impairs ATP synthesis and diaphragm contractility; requires urgent IV phosphate repletion." },
    { text: "A client on TPN presents with acute fever (40.1°C), chills, hypotension (BP 76/42 mmHg), and purulent drainage at the central line insertion site. The nurse's priority action is:", options: ["Change the dressing and flush line with heparin", "Stop TPN infusion, obtain blood cultures from line and periphery, remove catheter and culture catheter tip, and start IV resuscitation", "Increase TPN infusion rate to maintain calories", "Administer oral antipyretics only"], answer: 1, exp: "Catheter-related bloodstream infection with septic shock mandates immediate line removal, culture, and resuscitation." },
    { text: "A type 1 diabetic client on an intensive insulin regimen is found unconscious, diaphoresis profuse, with blood glucose 24 mg/dL. The client has no IV access. The immediate life-saving intervention is:", options: ["Forcing oral orange juice with sugar into the mouth", "Administering Glucagon 1 mg intramuscularly or subcutaneously", "Waiting for emergency medical services to establish an arterial line", "Administering regular insulin"], answer: 1, exp: "Never give oral fluids to an unconscious client due to fatal aspiration; IM/SC Glucagon mobilizes hepatic glycogen stores." },
    { text: "A client with end-stage renal disease accidentally consumes high-potassium dried fruits and presents with muscle flaccidity, HR 34 bpm, and tall peaked T waves merging into a sine wave. The nurse's FIRST life-saving drug to give is:", options: ["Sodium polystyrene sulfonate (Kayexalate) orally", "Intravenous Calcium Gluconate 10% over 2-3 minutes to stabilize the myocardium", "Furosemide IV bolus", "Hemodialysis tomorrow morning"], answer: 1, exp: "Calcium gluconate does not lower potassium, but instantly antagonizes membrane excitability, preventing imminent cardiac arrest." },
    { text: "A client receiving an intravenous lipid emulsion (IVLE) during parenteral nutrition suddenly develops dyspnea, cyanosis, back pain, and anaphylactoid shock. The nurse's immediate action is:", options: ["Increase the lipid infusion to finish quickly", "Immediately stop the lipid infusion and maintain airway and emergency vascular access", "Administer oral antihistamines", "Document as normal infusion sensation"], answer: 1, exp: "Acute lipid intolerance/anaphylactoid reaction mandates immediate infusion cessation and emergency airway/shock management." }
  ],

  // ─────────────────────────────────────────────────────────────
  // 6. MICROBIOLOGY & IMMUNOLOGY
  // ─────────────────────────────────────────────────────────────
  "Introduction to Microbiology": [
    // L1: Foundational Recall
    { text: "Under Gram-staining microscopy, Gram-positive bacteria retain which color?", options: ["Pink or Red", "Crystal violet or Purple", "Bright yellow", "Colorless"], answer: 1, exp: "Gram-positive bacteria have thick peptidoglycan cell walls that retain crystal violet-iodine complex, appearing purple." },
    { text: "Bacterial endospores produced by Bacillus and Clostridium species are clinically significant because they:", options: ["Are easily killed by standard alcohol rubs", "Are highly resistant to heat, drying, chemical disinfectants, and radiation", "Cause immediate viral replication", "Form only in freezing temperatures"], answer: 1, exp: "Endospores are dormant, highly durable dehydrated structures that survive standard boiling and chemical agents." },
    { text: "Which organism represents the predominant normal bacterial flora of healthy human skin?", options: ["Escherichia coli", "Staphylococcus epidermidis", "Pseudomonas aeruginosa", "Clostridium perfringens"], answer: 1, exp: "Staphylococcus epidermidis is the dominant coagulase-negative commensal bacterium inhabiting normal skin." },
    { text: "Passive immunity is best exemplified by:", options: ["Immunity acquired following natural infection with measles", "Immunity acquired through active vaccination with MMR vaccine", "Transfer of maternal antibodies (IgG and IgA) across the placenta and through breast milk", "Antibodies produced by memory B-cells years after exposure"], answer: 2, exp: "Passive immunity involves receiving preformed antibodies from an external source, providing immediate but temporary protection." },
    { text: "Which diagnostic stain is specifically utilized to identify Acid-Fast Bacilli (Mycobacterium tuberculosis)?", options: ["Gram stain", "Ziehl-Neelsen stain", "India ink preparation", "Giemsa stain"], answer: 1, exp: "Ziehl-Neelsen acid-fast staining identifies mycolic acid in Mycobacterium cell walls that resist acid-alcohol decolorization." },
    // L2: Base Clinical Practice
    { text: "Prior to initiating prescribed broad-spectrum intravenous antibiotic therapy for a client with pneumonia, the nurse must ensure that:", options: ["The client has finished lunch", "Diagnostic blood and sputum cultures have been collected", "The client has received a chest CT scan", "The white blood cell count is above 20,000/mm3"], answer: 1, exp: "Cultures must always be obtained prior to starting antibiotics to prevent false-negative culture suppression." },
    { text: "Endotoxins differ from exotoxins primarily in that endotoxins are:", options: ["Proteins actively secreted by living Gram-positive bacteria", "Lipopolysaccharide (LPS) components of Gram-negative outer cell walls released upon bacterial lysis", "Inactivated readily by boiling for 5 minutes", "Used to produce commercial toxoid vaccines"], answer: 1, exp: "Endotoxin (Lipid A of LPS) resides in Gram-negative outer membranes and triggers severe systemic inflammatory cascades upon lysis." },
    { text: "The most frequent bacterial cause of uncomplicated community-acquired urinary tract infections (UTIs) is:", options: ["Staphylococcus aureus", "Escherichia coli (uropathogenic strains)", "Proteus mirabilis", "Klebsiella pneumoniae"], answer: 1, exp: "Uropathogenic E. coli ascends from the gastrointestinal tract and accounts for 80-85% of uncomplicated UTIs." },
    { text: "A client who completed a 14-day course of oral Clindamycin develops watery diarrhea (8-10 episodes/day) with abdominal cramping. The nurse suspects enteritis caused by:", options: ["Salmonella enterica", "Clostridioides difficile", "Campylobacter jejuni", "Shigella dysenteriae"], answer: 1, exp: "Broad-spectrum antibiotics eliminate normal gut flora, allowing spore-forming C. difficile to proliferate and produce enterotoxins." },
    { text: "Which antibody isotype crosses the human placenta to confer passive humoral immunity to the developing fetus?", options: ["Immunoglobulin M (IgM)", "Immunoglobulin G (IgG)", "Immunoglobulin A (IgA)", "Immunoglobulin E (IgE)"], answer: 1, exp: "IgG is the only immunoglobulin class with Fc-receptor mediated active transport across the human placental syncytiotrophoblast." },
    // L3: Advanced Hard / Prioritization
    { text: "Methicillin-resistant Staphylococcus aureus (MRSA) confers resistance to all beta-lactam antibiotics via which genetic mechanism?", options: ["Production of beta-lactamase enzyme only", "Acquisition of the mecA gene encoding an altered Penicillin-Binding Protein (PBP2a) with low antibiotic affinity", "Efflux pumps that eliminate aminoglycosides", "Mutation in DNA gyrase enzyme"], answer: 1, exp: "The mecA gene encodes PBP2a, which prevents beta-lactam drugs (methicillin, oxacillin) from binding to the cell wall." },
    { text: "A client receives an injection of penicillin and within 3 minutes develops acute stridor, urticaria, facial angioedema, and BP 78/40 mmHg. Which immunological mechanism is responsible?", options: ["Type I IgE-mediated immediate hypersensitivity with mast cell degranulation", "Type II antibody-mediated cytotoxic reaction", "Type III immune-complex mediated Arthus reaction", "Type IV T-cell mediated delayed hypersensitivity"], answer: 0, exp: "Type I anaphylactic hypersensitivity involves allergen cross-linking of IgE on mast cells and basophils, releasing histamine and leukotrienes." },
    { text: "A client with persistent fever has blood cultures growing Gram-positive cocci in clusters that are coagulase-positive. The identification is:", options: ["Staphylococcus epidermidis", "Staphylococcus aureus", "Streptococcus pyogenes", "Enterococcus faecalis"], answer: 1, exp: "Coagulase-positivity definitively differentiates pathogenic Staphylococcus aureus from coagulase-negative staphylococci." },
    { text: "A child presents with acute pharyngitis. A rapid antigen detection test (RADT) confirms Group A Beta-Hemolytic Streptococcus (GABHS). Prompt antibiotic treatment is critical to prevent which non-suppurative complication?", options: ["Rheumatic Fever and post-streptococcal glomerulonephritis", "Infectious mononucleosis", "Measles encephalitis", "Diphtheria membranous croup"], answer: 0, exp: "Eradication of GABHS pharyngitis with penicillin within 9 days prevents acute rheumatic fever and valvular carditis." },
    { text: "Which viral pathogen has a single-stranded RNA genome and replicates via a reverse transcriptase enzyme integrating into human host DNA?", options: ["Hepatitis B virus", "Human Immunodeficiency Virus (HIV)", "Influenza A virus", "Herpes Simplex virus"], answer: 1, exp: "HIV is a retrovirus that uses reverse transcriptase to synthesize cDNA, which viral integrase embeds into host chromosomes." },
    // L4: Peak Acuity Emergency
    { text: "A client in the ICU with Gram-negative bacteremia develops profound refractory septic shock, diffuse bleeding from venipuncture sites, and petechiae. Labs reveal platelets 32,000/mm3, prolonged PT/INR, low fibrinogen, and high D-dimer. The nurse identifies:", options: ["Immune thrombocytopenic purpura (ITP)", "Disseminated Intravascular Coagulation (DIC) triggered by bacterial endotoxin release", "Heparin-induced thrombocytopenia", "Vitamin K deficiency"], answer: 1, exp: "Gram-negative endotoxin activates widespread tissue factor, causing explosive microvascular thrombosis and consumption of clotting factors (DIC)." },
    { text: "A client with acute meningococcal meningitis (Neisseria meningitidis) presents with purpuric petechial rash, high fever, and sudden profound hypotension and cyanosis. The nurse anticipates Waterhouse-Friderichsen syndrome, which represents:", options: ["Acute renal tubular necrosis", "Bilateral adrenal gland hemorrhagic infarction causing acute adrenal failure", "Acute pulmonary embolism", "Severe diabetic ketoacidosis"], answer: 1, exp: "Fulminant meningococcemia causes bilateral adrenal hemorrhage and acute cortisol deficiency (Waterhouse-Friderichsen syndrome)." },
    { text: "A client with suspected botulism intoxication presents with descending symmetrical flaccid paralysis, ptosis, diplopia, dysphagia, and clear sensorium. The priority life-saving nursing intervention is:", options: ["Administering oral broad-spectrum antibiotics", "Continuous monitoring of forced vital capacity and immediate preparation for endotracheal intubation and mechanical ventilation", "Inducing emesis immediately", "Applying warm heating pads to limbs"], answer: 1, exp: "Botulinum neurotoxin blocks acetylcholine release at the neuromuscular junction; descending paralysis leads to fatal respiratory arrest." },
    { text: "A young female client presents with high fever (40.2°C), diffuse 'sunburn-like' macular erythroderma, desquamation of palms/soles, and BP 68/40 mmHg during menstruation while using superabsorbent tampons. The nurse identifies:", options: ["Toxic Shock Syndrome (TSS) mediated by TSST-1 superantigen from S. aureus", "Toxic epidermal necrolysis", "Scarlet fever", "Meningococcemia"], answer: 0, exp: "TSST-1 functions as a superantigen, non-specifically activating massive polyclonal T-cells and precipitating lethal cytokine storms." },
    { text: "During biological warfare emergency response, a patient presents with widened mediastinum on chest X-ray, acute respiratory failure, and Gram-positive spore-forming rods in blood. The diagnosis is:", options: ["Inhalation Anthrax (Bacillus anthracis)", "Pneumonic Plague (Yersinia pestis)", "Pulmonary Tularemia", "Smallpox"], answer: 0, exp: "Inhalation anthrax presents with hemorrhagic mediastinitis, widened mediastinal silhouette, and rapid septic collapse." }
  ],

  // ─────────────────────────────────────────────────────────────
  // 7. PSYCHOLOGY & SOCIOLOGY IN NURSING
  // ─────────────────────────────────────────────────────────────
  "Introduction to Psychology": [
    // L1: Foundational Recall
    { text: "According to Maslow's Hierarchy of Human Needs, which tier represents the fundamental base that must be satisfied first?", options: ["Love and belonging needs", "Self-esteem needs", "Physiological needs (air, water, food, shelter, elimination)", "Self-actualization needs"], answer: 2, exp: "Maslow's hierarchy states basic physiological survival needs must be met before higher psychosocial needs." },
    { text: "In Sigmund Freud's psychoanalytic model of personality, the 'Id' operates strictly on the:", options: ["Reality principle", "Pleasure principle (seeking immediate gratification of instinctual impulses)", "Moral principle", "Social conformity principle"], answer: 1, exp: "The Id represents unconscious biological drives functioning entirely on the pleasure principle." },
    { text: "In classical conditioning demonstrated by Ivan Pavlov, the dog salivating in response to meat powder before any conditioning is the:", options: ["Conditioned stimulus", "Unconditioned response (UCR)", "Conditioned response", "Extinct response"], answer: 1, exp: "Unconditioned response is the innate, unlearned physiological reaction triggered by an unconditioned stimulus." },
    { text: "A traditional 'Nuclear Family' structure is sociologically defined as:", options: ["Three or more generations living in a single household", "Two parents (mother and father) and their biological or adopted children residing together", "Single individuals living in communal arrangements", "Extended kinship networks sharing agricultural resources"], answer: 1, exp: "A nuclear family consists strictly of two parents and their dependent offspring in a shared residence." },
    { text: "Which stage of Erikson's Psychosocial Development corresponds to infancy (0 to 18 months)?", options: ["Autonomy vs. Shame and Doubt", "Trust vs. Mistrust", "Initiative vs. Guilt", "Industry vs. Inferiority"], answer: 1, exp: "Infants develop basic trust when primary caregivers provide consistent, reliable warmth, nourishment, and comfort." },
    // L2: Base Clinical Practice
    { text: "A client who recently received a diagnosis of terminal pancreatic cancer states: 'The laboratory mixed up my biopsy results with someone else's; I am completely fine.' According to Kubler-Ross, this exemplifies:", options: ["Anger", "Denial", "Bargaining", "Depression"], answer: 1, exp: "Denial is the initial defense mechanism buffering the sudden psychological shock of catastrophic news." },
    { text: "A hospitalized toddler (2 years old) screams, kicks, and cries inconsolably when their mother leaves the bedside. According to John Bowlby, this phase of separation anxiety is:", options: ["Protest", "Despair", "Detachment (Denial)", "Acceptance"], answer: 0, exp: "The Protest phase is characterized by acute distress, crying, and active search for the departed primary caregiver." },
    { text: "Which therapeutic communication technique is demonstrated when the nurse states: 'You said you feel overwhelmed when your family visits. Can you describe what happens during those visits?'", options: ["Giving false reassurance", "Clarifying and Exploring", "Changing the subject", "Passing moral judgment"], answer: 1, exp: "Exploring encourages the client to delve deeper into thoughts and feelings without feeling judged." },
    { text: "A client who feels intense hostility toward their direct supervisor at work comes home and yells aggressively at their spouse and children. Which ego defense mechanism is this?", options: ["Sublimation", "Displacement", "Reaction Formation", "Intellectualization"], answer: 1, exp: "Displacement transfers emotional reactions from a threatening original object to a safer substitute target." },
    { text: "According to Jean Piaget's stages of cognitive development, a 4-year-old child who believes the moon follows them wherever they walk exhibits:", options: ["Abstract operational reasoning", "Egocentric thinking (Preoperational stage)", "Conservation mastery", "Sensorimotor reflexes"], answer: 1, exp: "Egocentrism in Piaget's preoperational stage reflects an inability to perceive situations from perspectives other than one's own." },
    // L3: Advanced Hard / Prioritization
    { text: "A client admitted following a motor vehicle collision in which their sibling died is uninjured but has no memory of the collision or sibling's death. Organic neurological causes are ruled out. This exemplifies:", options: ["Malingering", "Dissociative Amnesia", "Obsessive-compulsive disorder", "Schizophrenic delusion"], answer: 1, exp: "Dissociative amnesia involves an inability to recall important personal traumatic information beyond ordinary forgetfulness." },
    { text: "A medical resident who has deep, unconscious hatred for a difficult client treats that client with exaggerated, effusive sweetness, gifts, and excessive praise. This defense mechanism is:", options: ["Reaction Formation", "Projection", "Sublimation", "Rationalization"], answer: 0, exp: "Reaction formation transforms unacceptable unconscious impulses into their exact behavioral opposites." },
    { text: "In sociological analysis of healthcare, 'The Sick Role' described by Talcott Parsons confers which social right and obligation to the patient?", options: ["Exemption from normal social responsibilities, coupled with the obligation to seek competent medical help and try to get well", "Right to permanent financial compensation without seeking treatment", "Obligation to self-treat without medical intervention", "Right to disregard physician counsel"], answer: 0, exp: "Parsons' sick role legitimizes temporary deviance from social roles while obligating the individual to cooperate with medical care." },
    { text: "A 42-year-old client presents with bilateral lower limb paralysis. Comprehensive neurological workup (MRI, EMG, nerve conduction) is entirely normal. The paralysis developed immediately after discovering marital infidelity. The diagnosis is:", options: ["Illness Anxiety Disorder", "Conversion Disorder (Functional Neurological Symptom Disorder)", "Hypochondriasis", "Somatic Symptom Disorder"], answer: 1, exp: "Conversion disorder presents with altered voluntary motor or sensory function incompatible with recognized neurological disease." },
    { text: "When evaluating a client's risk for completed suicide, which factor represents the HIGHEST acute predictive risk?", options: ["Occasional sad mood without a plan", "A concrete, lethal suicide plan with immediate access to lethal means and a history of previous attempts", "Expressing religious beliefs against suicide", "Having strong family and social support"], answer: 1, exp: "A detailed, lethal plan, accessible means, and prior suicide attempts are the strongest predictors of imminent suicide completion." },
    // L4: Peak Acuity Emergency
    { text: "A disaster survivor from a collapsed building is admitted to the emergency center experiencing profound psychological dissociation, mutism, tremor, and tachycardia. The nurse's immediate psychological crisis intervention is:", options: ["Pressuring the client to narrate the trauma in detail", "Providing a quiet, safe, secure environment, grounding techniques, calm orientation, and basic physical needs", "Administering high-dose intravenous stimulants", "Isolating the client in complete darkness"], answer: 1, exp: "Acute crisis intervention requires establishing physiological safety, calm containment, and sensory grounding." },
    { text: "An acutely manic client in an inpatient psychiatric unit is pacing rapidly, shouting profanities, threatening staff, and brandishing a heavy metal chair. The priority action is to:", options: ["Argue with the client about their behavior", "Ensure safety of all clients in the milieu, maintain clear escape routes, call for immediate staff show of force, and implement de-escalation protocols", "Tackle the client alone from behind", "Turn off the lights in the ward"], answer: 1, exp: "Milieu safety and staff protection take absolute priority; never attempt physical containment alone without trained assistance." },
    { text: "A client who experienced severe sexual assault 2 hours ago is brought to the emergency department. The client sits rocking back and forth, repeating 'I'm dirty, I'm dead.' The nurse's first communication approach must be:", options: ["'You should be grateful you survived.'", "'You are safe here in the hospital. I am your nurse, and I will stay with you. You will not be left alone.'", "'Why were you out so late?'", "'Please sign these legal forms before we can talk.'"], answer: 1, exp: "Trauma-informed crisis communication provides explicit safety reassurance, continuous presence, and predictable boundaries." },
    { text: "A client with delirium in the ICU becomes severely combative, pulls out a central line, and attempts to pull out an endotracheal tube. The nurse's priority emergency management is:", options: ["Restraining all four limbs without medical evaluation", "Securing the airway, applying direct pressure to the central line site, and obtaining emergency orders for chemical de-escalation (Dexmedetomidine or Haloperidol)", "Administering high-dose neuromuscular blockers without sedation", "Discharging the client to a psychiatric facility immediately"], answer: 1, exp: "Protect the airway and vascular access while rapidly treating the underlying organic delirium pharmacologically." },
    { text: "A nurse is conducting a suicide lethality assessment on a client with Major Depressive Disorder who suddenly appears calm, happy, and peaceful after weeks of profound depression. The nurse recognizes that this sudden euphoria indicates:", options: ["Immediate cure of the clinical depression", "High imminent risk of suicide because the client has finalized their suicide plan and feels relief", "Effectiveness of oral antidepressant taken 2 days ago", "Malingering"], answer: 1, exp: "A sudden, unexplained elevation in mood in severe depression often indicates the client has resolved internal conflict by deciding to complete suicide." }
  ],

  // ─────────────────────────────────────────────────────────────
  // 8. MEDICAL-SURGICAL: NEUROLOGICAL & ENDOCRINE DISORDERS
  // ─────────────────────────────────────────────────────────────
  "Neurological Disorders": [
    // L1: Foundational Recall
    { text: "In the Glasgow Coma Scale (GCS), what is the minimum possible total score and what does it indicate?", options: ["Score 0 (Mild confusion)", "Score 3 (Deep unconsciousness or coma)", "Score 1 (Normal response)", "Score 5 (Brain death)"], answer: 1, exp: "GCS ranges from 3 (no eye, verbal, or motor response) to 15 (fully alert and oriented)." },
    { text: "What is the normal physiological range for Cerebral Perfusion Pressure (CPP = MAP - ICP) in adults?", options: ["20 to 40 mmHg", "60 to 100 mmHg", "120 to 160 mmHg", "180 to 220 mmHg"], answer: 1, exp: "Normal CPP is 60 to 100 mmHg; CPP <50 mmHg results in critical cerebral ischemia." },
    { text: "Which cranial nerve (CN) provides motor innervation to the muscles of facial expression and conveys taste from the anterior two-thirds of the tongue?", options: ["Cranial Nerve V (Trigeminal)", "Cranial Nerve VII (Facial)", "Cranial Nerve IX (Glossopharyngeal)", "Cranial Nerve XII (Hypoglossal)"], answer: 1, exp: "CN VII (Facial nerve) controls facial expression muscles; dysfunction causes Bell's palsy." },
    { text: "Decerebrate posturing (abnormal extensor posturing with adducted, extended arms and pronated wrists) indicates damage to which central nervous system structure?", options: ["Cerebral cortex", "Brainstem (Midbrain or Upper Pons)", "Cerebellar vermis", "Thoracic spinal cord"], answer: 1, exp: "Decerebrate posturing reflects severe brainstem compression or disruption, indicating worse prognosis than decorticate posturing." },
    { text: "A positive Babinski sign (dorsiflexion of the great toe with fanning of the other toes) in an adult indicates:", options: ["A normal healthy plantar reflex", "An Upper Motor Neuron (UMN) lesion along the corticospinal tract", "A peripheral sensory neuropathy", "A Lower Motor Neuron (LMN) lesion"], answer: 1, exp: "In adults, the normal response is plantar flexion; extension/fanning is abnormal and indicates pyramidal tract pathology." },
    // L2: Base Clinical Practice
    { text: "The classic clinical triad of Parkinson's Disease consists of:", options: ["Chorea, dementia, and dysphagia", "Resting 'pill-rolling' tremor, cogwheel rigidity, and bradykinesia", "Spastic paraparesis, optic neuritis, and urinary retention", "Ptosis, diplopia, and proximal limb weakness"], answer: 1, exp: "Dopamine deficiency in the substantia nigra produces the hallmark motor triad: tremor, rigidity, and bradykinesia." },
    { text: "A client with newly diagnosed Myasthenia Gravis is prescribed Pyridostigmine (Mestinon). The nurse instructs the client to take the medication:", options: ["Directly before going to sleep at night", "30 to 45 minutes before meals to optimize swallowing muscle strength and prevent aspiration", "Only when experiencing severe shortness of breath", "With high-dose antacids on an empty stomach"], answer: 1, exp: "Administering anticholinesterase inhibitors 30-45 minutes before meals ensures peak muscle strength for chewing and swallowing." },
    { text: "When performing nursing care for a client with increased intracranial pressure (ICP), which intervention is appropriate?", options: ["Positioning the client flat with head rotated to the extreme left", "Elevating the head of the bed 30 degrees with neck in neutral midline alignment", "Clustering all nursing care activities together in one 2-hour window", "Performing deep tracheal suctioning every 30 minutes routinely"], answer: 1, exp: "Elevating HOB 30° with midline neck alignment promotes jugular venous drainage and minimizes intracranial pressure." },
    { text: "A client with Multiple Sclerosis (MS) experiencing acute relapsing exacerbation is treated with which first-line therapy?", options: ["Oral NSAIDs", "High-dose intravenous Methylprednisolone (corticosteroid pulse)", "Lifelong bedrest and fluid restriction", "Oral Pyridostigmine"], answer: 1, exp: "High-dose IV glucocorticoids shorten the duration and accelerate recovery from acute MS inflammatory relapses." },
    { text: "During a generalized tonic-clonic seizure, the nurse's priority action is to:", options: ["Force a plastic bite-block between the client's teeth", "Protect the client's head from injury, turn client onto side to prevent aspiration, and maintain airway", "Physically restrain the client's flailing extremities", "Administer oral antiepileptic tablets immediately"], answer: 1, exp: "Never insert objects into the mouth or restrain limbs; protect the head and turn the client lateral to keep airway clear." },
    // L3: Advanced Hard / Prioritization
    { text: "A client with an acute ischemic stroke presents 2.5 hours after symptom onset. Before initiating IV Alteplase (tPA), which criterion must be strictly met?", options: ["Non-contrast head CT scan rules out intracranial hemorrhage, and BP is maintained <185/110 mmHg", "Blood glucose is >400 mg/dL", "Platelet count is <50,000/mm3", "The client is on therapeutic warfarin with INR >3.0"], answer: 0, exp: "Thrombolysis requires ruling out hemorrhage on non-contrast CT and strictly controlling BP <185/110 mmHg to prevent hemorrhagic conversion." },
    { text: "A client with a spinal cord injury at T4 suddenly develops severe throbbing headache, profuse diaphoresis and flushing above T4, and BP 210/115 mmHg with HR 48 bpm. The nurse's IMMEDIATE action is to:", options: ["Place the client flat in Trendelenburg position", "Elevate the head of the bed 90 degrees (high-Fowler's) and loosen tight clothing, then assess for bladder distention", "Administer IV morphine bolus", "Wait 15 minutes and repeat vital signs"], answer: 1, exp: "Autonomic Dysreflexia is a medical emergency; sitting the client upright induces orthostatic pooling while eliminating the noxious trigger (e.g., full bladder)." },
    { text: "A client has been experiencing continuous generalized tonic-clonic seizures for 8 minutes without regaining consciousness (Status Epilepticus). The FIRST-LINE medication to administer is:", options: ["Oral Carbamazepine", "Intravenous Lorazepam (Ativan) 4 mg slow push", "Subcutaneous Insulin", "Intramuscular Neostigmine"], answer: 1, exp: "IV benzodiazepines (Lorazepam 0.1 mg/kg or Diazepam) cross the blood-brain barrier rapidly to terminate ongoing seizure activity." },
    { text: "A client who underwent a lumbar puncture 3 hours ago reports a severe throbbing headache that worsens significantly when sitting up and improves when lying flat. The nurse identifies this as:", options: ["Bacterial meningitis relapse", "Post-Dural Puncture Headache (PDPH) caused by persistent CSF leakage through the dural puncture site", "Epidural abscess formation", "Acute cerebral herniation"], answer: 1, exp: "Low CSF pressure from persistent dural leak causes traction on pain-sensitive meninges when upright, relieved by recumbency." },
    { text: "Which assessment finding in a client following head trauma indicates a Basilar Skull Fracture?", options: ["Bilateral papilledema and hyperreflexia", "Periorbital ecchymosis ('raccoon eyes'), Battle's sign (mastoid ecchymosis), and clear CSF rhinorrhea/otorrhea", "Unilateral dilated pupil only", "Neck stiffness with high fever"], answer: 1, exp: "Raccoon eyes, Battle's sign, and CSF rhinorrhea (halo sign) are pathognomonic physical signs of a basilar skull fracture." },
    // L4: Peak Acuity Emergency
    { text: "An ICU client with traumatic brain injury displays sudden bradycardia (HR 38 bpm), systolic hypertension with widening pulse pressure (BP 208/62 mmHg), and irregular agonal respirations. The nurse identifies:", options: ["Spinal shock", "Cushing's Triad signaling imminent brainstem herniation through the foramen magnum", "Neurogenic shock", "Severe pulmonary embolism"], answer: 1, exp: "Cushing's Triad reflects terminal intracranial hypertension with brainstem compression; an emergency hyperosmolar therapy is indicated." },
    { text: "A client with acute massive ischemic stroke deteriorates neurologically: GCS drops from 12 to 6, right pupil becomes fixed and dilated (8 mm), and left-sided hemiplegia worsens. The nurse prepares for:", options: ["Stat administration of 3% Hypertonic Saline or IV Mannitol 20% and emergent decompressive craniectomy", "Infusing Dextrose 5% in water rapidly", "Administering oral aspirin", "Discharging to rehabilitation"], answer: 0, exp: "Uncal herniation compressing CN III requires immediate hyperosmolar therapy (mannitol/3% saline) and emergent neurosurgical decompression." },
    { text: "A client with Guillain-Barré Syndrome has ascending flaccid paralysis progressing to the thoracic level. Which assessment finding signals the NEED FOR IMMEDIATE MECHANICAL VENTILATION?", options: ["Paresthesias in the toes", "Forced Vital Capacity (FVC) falling below 15 mL/kg and Negative Inspiratory Force (NIF) weaker than -20 cmH2O", "Mild sinus tachycardia", "Loss of ankle deep tendon reflexes"], answer: 1, exp: "FVC <15 mL/kg indicates respiratory muscle exhaustion and imminent diaphragmatic paralysis requiring elective intubation." },
    { text: "A client presents with the 'worst headache of my life' (thunderclap headache) followed by syncope and nuchal rigidity. Non-contrast CT reveals a ruptured cerebral berry aneurysm with Subarachnoid Hemorrhage (SAH). The primary priority medication to prevent delayed ischemic neurological deficits from vasospasm is:", options: ["Oral Nimodipine (calcium channel blocker) 60 mg every 4 hours", "Intravenous Heparin infusion", "High-dose Aspirin", "Sublingual Nitroglycerin"], answer: 0, exp: "Oral Nimodipine is the standard of care to prevent cerebral vasospasm and secondary infarction in aneurysmal SAH." },
    { text: "A post-neurosurgery client with a ventriculostomy drainage system displays ICP rising to 32 mmHg for >5 minutes. The nurse's immediate corrective checks include:", options: ["Lowering the transducer below the ear level", "Verifying leveling of the transducer at the Foramen of Monro (tragus of the ear) and checking system patency for kinks or closed stopcocks", "Clamping the drainage bag permanently", "Flushing the intraventricular catheter with 10 mL saline bolus"], answer: 1, exp: "Improper leveling or closed stopcocks produce false readings or prevent CSF venting; zero at the tragus of the ear." }
  ],

  // ─────────────────────────────────────────────────────────────
  // 9. MEDICAL-SURGICAL: ENDOCRINE DISORDERS & DIABETES
  // ─────────────────────────────────────────────────────────────
  "Endocrine Disorders": [
    // L1: Foundational Recall
    { text: "What is the normal diagnostic fasting plasma glucose (FPG) threshold for diagnosing Diabetes Mellitus?", options: ["Fasting plasma glucose ≥100 mg/dL", "Fasting plasma glucose ≥126 mg/dL (on two separate tests)", "Fasting plasma glucose ≥200 mg/dL only", "HbA1c between 5.0% and 5.6%"], answer: 1, exp: "An FPG ≥126 mg/dL on more than one occasion or HbA1c ≥6.5% establishes the diagnosis of Diabetes Mellitus." },
    { text: "The primary underlying pathophysiology of Type 1 Diabetes Mellitus is:", options: ["Insulin resistance in peripheral tissues", "Autoimmune destruction of pancreatic beta-cells resulting in absolute insulin deficiency", "Excessive glucagon secretion by alpha cells", "Renal tubular glycosuria"], answer: 1, exp: "Type 1 diabetes is characterized by autoimmune T-cell mediated destruction of pancreatic islet beta-cells." },
    { text: "Which anatomical endocrine structure is traditionally termed the 'master gland' of the endocrine system?", options: ["Thyroid gland", "Adrenal gland", "Pituitary gland (Hypophysis)", "Pancreas"], answer: 2, exp: "The pituitary gland secretes tropic hormones (TSH, ACTH, FSH, LH, GH) that regulate peripheral endocrine glands." },
    { text: "The classic clinical signs of hypoglycemia include:", options: ["Polyuria, polydipsia, and warm dry skin", "Diaphoresis, tremors, tachycardia, palpitations, hunger, and dizziness", "Deep Kussmaul respirations and fruity breath", "Severe constipation and cold intolerance"], answer: 1, exp: "Adrenergic surge during acute hypoglycemia stimulates sweating, tremor, tachycardia, and hunger." },
    { text: "A client is prescribed Levothyroxine (Synthroid) for primary hypothyroidism. The nurse instructs the client to take the medication:", options: ["With a high-fat dinner", "In the morning on an empty stomach at least 30 to 60 minutes before breakfast with water", "Only when feeling fatigued", "Simultaneously with calcium and iron supplements"], answer: 1, exp: "Levothyroxine requires an acidic gastric environment; food, iron, and calcium significantly impair absorption." },
    // L2: Base Clinical Practice
    { text: "A client with Graves' disease (hyperthyroidism) typically displays which clinical manifestation?", options: ["Weight gain, cold intolerance, and constipation", "Heat intolerance, unexplained weight loss, exophthalmos, fine tremors, and palpitations", "Moon facies, buffalo hump, and purple abdominal striae", "Severe hypercalcemia and bone fractures"], answer: 1, exp: "Excess thyroid hormones stimulate hypermetabolism: weight loss, heat intolerance, and autoimmune exophthalmos." },
    { text: "A client with Cushing's Syndrome from chronic corticosteroid use exhibits which constellation of physical findings?", options: ["Hypoglycemia and bronze hyperpigmentation of skin", "Central obesity, 'moon facies', 'buffalo hump', purple abdominal striae, and muscle wasting", "Profound weight loss and hypotension", "Severe dehydration and low blood pressure"], answer: 1, exp: "Hypercortisolemia causes fat redistribution (face, neck), catabolism (thin skin, striae), and hypertension." },
    { text: "Which assessment finding confirms a positive Chvostek's sign following accidental parathyroid removal during thyroidectomy?", options: ["Carpal spasm when a BP cuff is inflated on the upper arm", "Twitching of the facial muscles elicited by tapping the facial nerve anterior to the ear (Hypocalcemia)", "Pain in the calf upon dorsiflexion of the foot", "Flexion of the knees upon passive neck flexion"], answer: 1, exp: "Chvostek's sign reflects neuromuscular hyperexcitability secondary to acute hypocalcemia." },
    { text: "A client with Type 2 Diabetes is scheduled for a contrast-enhanced CT scan. The nurse verifies that which medication is held 48 hours pre- and post-procedure?", options: ["Metformin (Glucophage)", "Glipizide", "Atorvastatin", "Lisinopril"], answer: 0, exp: "Contrast can induce acute renal impairment; Metformin accumulation in renal failure triggers fatal Lactic Acidosis." },
    { text: "In managing a conscious client experiencing mild hypoglycemia (blood glucose 54 mg/dL), the nurse follows the 'Rule of 15':", options: ["Administer 15 grams of fast-acting carbohydrate (e.g., 4 oz fruit juice), recheck glucose in 15 minutes", "Give 15 units of regular insulin subcutaneously", "Provide 15 grams of pure fat (butter)", "Withhold all carbohydrates for 15 minutes"], answer: 0, exp: "The Rule of 15: 15g simple fast-acting carbs, wait 15 min, recheck blood sugar, repeat if still <70 mg/dL." },
    // L3: Advanced Hard / Prioritization
    { text: "A client with Type 1 Diabetes is admitted with Diabetic Ketoacidosis (DKA): glucose 480 mg/dL, arterial pH 7.18, HCO3 11 mEq/L, and potassium 5.8 mEq/L. The ABSOLUTE FIRST priority intervention is:", options: ["Administer high-dose subcutaneous glargine insulin", "Rapid IV fluid resuscitation with 0.9% Normal Saline at 1000 mL/hr to restore intravascular volume", "Administer IV sodium bicarbonate bolus", "Administer oral potassium chloride"], answer: 1, exp: "Fluid deficit in DKA is typically 5-10 liters; restoring perfusion with isotonic saline precedes insulin therapy." },
    { text: "In managing DKA, when blood glucose decreases to 250 mg/dL (13.9 mmol/L), what essential change must be made to the IV fluid regimen?", options: ["Stop all IV infusions immediately", "Add 5% Dextrose (D5W or D5 0.45% NS) to the IV fluids while continuing regular insulin infusion", "Switch to sterile water infusion", "Double the insulin infusion rate"], answer: 1, exp: "Adding dextrose prevents rapid glucose drops that trigger cerebral edema, while insulin continues to clear ketoacids." },
    { text: "A client with small cell lung cancer develops SIADH (Syndrome of Inappropriate Antidiuretic Hormone). The nurse anticipates which lab profile?", options: ["Serum sodium 118 mEq/L (dilutional hyponatremia), low serum osmolality (<275 mOsm/kg), and concentrated urine (urine SG >1.030)", "Hypernatremia (Na 158 mEq/L) and dilute urine", "Hyperglycemia and ketoacidosis", "Elevated serum potassium and low calcium"], answer: 0, exp: "Excess ADH causes water retention without edema, producing dilutional hyponatremia and inappropriately concentrated urine." },
    { text: "A client following pituitary surgery develops massive dilute urine output of 600 mL/hr, urine specific gravity 1.002, and serum sodium 152 mEq/L. The nurse identifies Diabetes Insipidus (DI) and anticipates administering:", options: ["Intravenous Furosemide", "Desmopressin Acetate (DDAVP) subcutaneously or IV", "10% Dextrose in saline bolus", "Oral Spironolactone"], answer: 1, exp: "Central DI is caused by ADH deficiency; Desmopressin (DDAVP) replaces ADH, stopping life-threatening water loss." },
    { text: "A client with primary adrenal insufficiency (Addison's disease) is maintained on oral hydrocortisone. During periods of acute physiological stress (infection, surgery), the nurse instructs the client to:", options: ["Stop taking hydrocortisone until the stress resolves", "Increase (double or triple) the hydrocortisone dosage to prevent acute adrenal crisis", "Substitute hydrocortisone with high-dose aspirin", "Switch to an all-liquid diet"], answer: 1, exp: "The normal adrenal response to stress is increased cortisol; Addisonian clients must double or triple doses ('sick-day rules')." },
    // L4: Peak Acuity Emergency
    { text: "A client with Addison's disease presents in acute Addisonian Crisis: BP 64/38 mmHg, HR 126 bpm, lethargy, serum sodium 116 mEq/L, and potassium 6.9 mEq/L. The priority life-saving medication is:", options: ["Oral fludrocortisone", "Intravenous Hydrocortisone 100 mg stat bolus with aggressive IV 0.9% Normal Saline and Dextrose", "Subcutaneous Insulin without glucose", "IV Furosemide"], answer: 1, exp: "Acute adrenal crisis causes lethal vascular collapse and hyperkalemic arrest; high-dose IV hydrocortisone is life-saving." },
    { text: "A client with severe Graves' disease develops Thyroid Storm (Thyrotoxic Crisis): temp 41.2°C (106.1°F), HR 174 bpm (atrial fibrillation), extreme agitation, and jaundice. The sequence of emergency medications includes:", options: ["Aspirin, calcium, and levothyroxine", "Beta-blocker (Propranolol) stat, Propylthiouracil (PTU), Lugol's iodine (after PTU), and IV Hydrocortisone", "Methimazole only after 48 hours", "External warm blankets and thyroid extract"], answer: 1, exp: "Thyroid storm requires beta-blockade, thionamides (PTU), delayed iodine (prevents hormone release), and corticosteroids." },
    { text: "A client with Hyperosmolar Hyperglycemic State (HHS) presents with glucose 980 mg/dL, serum osmolality 360 mOsm/kg, profound dehydration, and stupor without significant ketoacidosis. The primary risk during initial fluid therapy is:", options: ["Acute hypoglycemia", "Cerebral edema from too-rapid reduction of serum osmolality and hypokalemia from insulin driving K+ intracellularly", "Immediate renal stone formation", "Hypercalcemic tetany"], answer: 1, exp: "Overly rapid fluid and osmolar shifts cause water to rush into brain cells (cerebral edema); gradual correction is vital." },
    { text: "A client 6 hours post-subtotal thyroidectomy develops acute laryngeal stridor, restlessness, respiratory distress, and an expanding neck hematoma. The nurse's immediate action is to:", options: ["Administer an aerosolized bronchodilator", "Immediately cut the neck sutures at the bedside to decompress the trachea, call for emergency surgical airway, and ventilate with 100% O2", "Apply a pressure dressing tightly around the neck", "Administer oral calcium tablets"], answer: 1, exp: "Expanding neck hematoma compresses the trachea; immediate suture release at the bedside is the only life-saving intervention." },
    { text: "A client with severe symptomatic hyponatremia (Na 108 mEq/L) secondary to SIADH develops generalized seizures and coma. The nurse prepares to infuse 3% Hypertonic Saline. The critical safety precaution is to:", options: ["Infuse 1000 mL rapidly over 30 minutes", "Limit sodium correction rate to no more than 6 to 8 mEq/L in 24 hours to prevent Central Pontine Myelinolysis (Osmotic Demyelination Syndrome)", "Allow sodium to rise by 25 mEq/L in 4 hours", "Administer free sterile water simultaneously"], answer: 1, exp: "Rapid correction of chronic hyponatremia causes irreversible brainstem demyelination (osmotic demyelination syndrome)." }
  ],

  // ─────────────────────────────────────────────────────────────
  // 10. CHILD HEALTH (PEDIATRIC) NURSING
  // ─────────────────────────────────────────────────────────────
  "Growth and Development": [
    // L1: Foundational Recall
    { text: "At what age does a normal infant's birth weight typically double and triple, respectively?", options: ["Doubles by 2 months, triples by 6 months", "Doubles by 5 to 6 months, triples by 12 months", "Doubles by 9 months, triples by 24 months", "Doubles by 12 months, triples by 36 months"], answer: 1, exp: "Healthy infants double birth weight by 5-6 months and triple their birth weight by 1 year." },
    { text: "By what age does the anterior fontanelle of a normal healthy infant normally close?", options: ["2 to 3 months", "12 to 18 months", "24 to 36 months", "At birth"], answer: 1, exp: "The posterior fontanelle closes by 2-3 months; the anterior fontanelle closes between 12-18 months." },
    { text: "What is the normal resting heart rate range for a healthy newborn infant?", options: ["60 to 80 bpm", "80 to 100 bpm", "110 to 160 bpm", "180 to 220 bpm"], answer: 2, exp: "Normal newborn heart rate ranges between 110 and 160 bpm, varying with crying or sleep." },
    { text: "At what developmental age is an infant expected to sit independently without support?", options: ["2 to 3 months", "6 to 8 months", "12 to 14 months", "18 months"], answer: 1, exp: "Independent sitting unsupported is a classic gross motor milestone achieved between 6-8 months." },
    { text: "Which play behavior is characteristic of normal toddlers (1 to 3 years old)?", options: ["Solitary play with no awareness of others", "Parallel play (playing alongside other children without interactive cooperation)", "Associative cooperative team play", "Competitive organized sports"], answer: 1, exp: "Toddlers engage in parallel play: playing side-by-side with similar toys without direct cooperative interaction." },
    // L2: Base Clinical Practice
    { text: "A 4-week-old male infant presents with non-bilious projectile vomiting immediately after feedings, persistent hunger, and an olive-shaped mass in the right upper quadrant. The nurse suspects:", options: ["Gastroesophageal reflux disease", "Hypertrophic Pyloric Stenosis", "Intussusception", "Hirschsprung disease"], answer: 1, exp: "Projectile non-bilious vomiting with a palpable olive mass confirms hypertrophic pyloric stenosis." },
    { text: "A 10-month-old infant presents with sudden episodic abdominal pain, crying while pulling knees to chest, vomiting, and passage of red 'currant jelly' stools. The diagnosis is:", options: ["Acute appendicitis", "Intussusception", "Celiac disease", "Meckel's diverticulum"], answer: 1, exp: "Currant jelly stools (blood and mucus) with episodic colic and drawing knees to chest characterize intussusception." },
    { text: "When administering oral liquid iron supplement to a child with iron deficiency anemia, the nurse advises the parent to:", options: ["Mix the iron directly into a full bottle of cow's milk", "Administer through a straw or dropper directed to the back of the mouth, followed by citrus juice, to prevent tooth staining", "Give with calcium antacids", "Avoid brushing the child's teeth after administration"], answer: 1, exp: "Liquid iron stains dental enamel; administration via straw/dropper with vitamin C enhances absorption and protects teeth." },
    { text: "A 3-year-old child presents with barking 'seal-like' cough, hoarseness, and inspiratory stridor that worsens at night (Croup / Laryngotracheobronchitis). Standard medical management includes:", options: ["Immediate oral antibiotics and warm blankets", "Nebulized Racemic Epinephrine and oral/IM Dexamethasone", "Immediate tonsillectomy", "High-dose sedatives"], answer: 1, exp: "Croup responds to nebulized racemic epinephrine (rapid subglottic vasoconstriction) and dexamethasone (systemic anti-inflammatory)." },
    { text: "A child with Nephrotic Syndrome presents with severe generalized edema (anasarca) and proteinuria. What is the classic laboratory triad?", options: ["Hematuria, hypertension, and azotemia", "Massive proteinuria (>3.5g/24hr or 3+), profound Hypoalbuminemia, and Hyperlipidemia", "Hyperglycemia, ketonuria, and acidosis", "Elevated liver enzymes and jaundice"], answer: 1, exp: "Glomerular podocyte effacement leads to massive proteinuria, hypoalbuminemia, fluid shifts (edema), and compensatory hyperlipidemia." },
    // L3: Advanced Hard / Prioritization
    { text: "A 6-month-old infant with Tetralogy of Fallot (TOF) suddenly becomes irritable, intensely cyanotic, tachypneic, and tachypneic ('Tet spell' / hypercyanotic episode). The nurse's IMMEDIATE action is to:", options: ["Place the infant in the knee-chest position", "Administer oral digoxin", "Start chest compressions", "Lay the infant completely flat on their stomach"], answer: 0, exp: "The knee-chest position increases systemic vascular resistance, reversing right-to-left shunting and forcing blood into the pulmonary circulation." },
    { text: "A 4-year-old child presents with high fever, sore throat, severe dysphagia, drooling, muffled voice, and sits in a 'tripod' position. What action is STRICTLY CONTRAINDICATED?", options: ["Administering supplemental humidified oxygen", "Inspecting the throat with a tongue depressor or obtaining a throat swab (Acute Epiglottitis)", "Calling the emergency airway team", "Preparing for lateral neck X-ray with emergency staff present"], answer: 1, exp: "Oral instrumentation in suspected acute epiglottitis can trigger sudden, fatal, complete laryngospasm and airway obstruction." },
    { text: "A child with Sickle Cell Disease is admitted in severe Vaso-Occlusive Pain Crisis. What are the two HIGHEST priority nursing interventions?", options: ["Immediate vigorous intravenous hydration and aggressive opioid pain management", "Ice packs applied directly to painful joints and fluid restriction", "Immediate blood transfusion before hydration", "High-dose aspirin and complete immobilization"], answer: 0, exp: "Aggressive IV hydration reverses sickling and improves microvascular capillary flow, while opioids manage severe ischemic pain." },
    { text: "A child diagnosed with Wilms' Tumor (Nephroblastoma) is admitted. The nurse places a prominent warning sign over the head of the bed stating:", options: ["'Strict fluid restriction'", "'DO NOT PALPATE ABDOMEN'", "'Check rectal temperatures every 2 hours'", "'Keep in Trendelenburg position'"], answer: 1, exp: "Abdominal palpation of Wilms' tumor can rupture the delicate encapsulated renal mass, spilling malignant cells throughout the peritoneum." },
    { text: "A 5-year-old presents with fever lasting 6 days, bilateral non-purulent conjunctivitis, strawberry tongue, erythema of palms/soles with edema, and cervical lymphadenopathy (Kawasaki Disease). The nurse prepares to administer:", options: ["Intravenous Immunoglobulin (IVIG) and high-dose Aspirin therapy", "Oral Penicillin and steroids", "Acyclovir infusion", "Warfarin anticoagulation alone"], answer: 0, exp: "High-dose IVIG within the first 10 days combined with aspirin prevents coronary artery aneurysm formation in Kawasaki disease." },
    // L4: Peak Acuity Emergency
    { text: "An infant presents in severe respiratory failure with nasal flaring, grunting, intercostal retractions, and RR 84 breaths/min, followed by sudden bradycardia (HR 54 bpm). The nurse recognizes that in pediatrics:", options: ["Bradycardia is an expected sign of deep relaxation", "Bradycardia is the critical ominous terminal sign of severe hypoxia, signaling imminent cardiopulmonary arrest", "The infant needs immediate feeding", "The infant has heart block unrelated to respiration"], answer: 1, exp: "In pediatrics, respiratory failure precedes cardiac arrest; hypoxia-induced bradycardia indicates imminent cardiac arrest requiring ventilation and chest compressions." },
    { text: "During pediatric resuscitation for pulseless ventricular fibrillation, the recommended initial defibrillation energy dose is:", options: ["0.5 Joules/kg", "2 Joules/kg (followed by 4 J/kg if refractory)", "10 Joules/kg immediately", "Adult fixed dose of 200 Joules"], answer: 1, exp: "PALS guidelines mandate initial shock energy of 2 J/kg for pediatric shockable rhythms, escalating to 4 J/kg for subsequent shocks." },
    { text: "An 18-month-old child presents in septic shock refractory to fluid boluses. Capillary refill is 5 seconds, extremities cold, and pulses weak. Intraosseous (IO) access is required. The standard site for pediatric IO insertion is:", options: ["Anterior superior iliac spine", "Proximal tibia (1-2 cm below and medial to the tibial tuberosity)", "Distal radius", "Sternum"], answer: 1, exp: "The anteromedial surface of the proximal tibia provides rapid, safe, high-flow vascular access in pediatric emergencies." },
    { text: "A 7-year-old child with severe asthma exacerbation has had severe wheezing, but on re-assessment the breath sounds have become completely ABSENT ('silent chest') with lethargy. The nurse identifies:", options: ["Complete resolution of bronchospasm", "Critical impending respiratory arrest due to air movement cessation requiring immediate emergency airway management", "Sleepiness from nebulizer", "Pneumothorax alone"], answer: 1, exp: "A 'silent chest' indicates severe airflow obstruction where ventilation is insufficient to generate wheezing, heralding immediate arrest." },
    { text: "A neonate born at 28 weeks gestation presents with respiratory distress syndrome (RDS) due to surfactant deficiency. Following endotracheal intubation, the nurse prepares to assist with:", options: ["Endotracheal instillation of exogenous lung surfactant (e.g., Beractant/Poractant alfa)", "Subcutaneous terbutaline injection", "Intravenous broad-spectrum penicillins only", "Chest physiotherapy with vigorous percussion"], answer: 0, exp: "Intratracheal surfactant instillation restores alveolar surface tension, preventing widespread atelectasis and improving compliance." }
  ],

  // ─────────────────────────────────────────────────────────────
  // 11. OBSTETRICS & GYNECOLOGICAL NURSING
  // ─────────────────────────────────────────────────────────────
  "Normal Labour and Delivery": [
    // L1: Foundational Recall
    { text: "Using Naegele's rule, calculate the Estimated Date of Delivery (EDD) for a woman whose Last Menstrual Period (LMP) began on May 10, 2024:", options: ["February 17, 2025", "February 10, 2025", "August 17, 2025", "March 17, 2025"], answer: 0, exp: "Naegele's rule: LMP + 7 days - 3 months + 1 year: May 10 + 7 days = May 17; May - 3 months = February 17, 2025." },
    { text: "Which anatomical landmark defines 'zero station' (Station 0) in the assessment of fetal descent during labor?", options: ["Iliac crests", "Ischial spines of the maternal pelvis", "Pubic symphysis", "Sacral promontory"], answer: 1, exp: "Station 0 indicates that the widest diameter of the fetal presenting part has engaged at the level of the maternal ischial spines." },
    { text: "What is the normal baseline Fetal Heart Rate (FHR) range during labor at term?", options: ["80 to 110 bpm", "110 to 160 bpm", "160 to 200 bpm", "60 to 90 bpm"], answer: 1, exp: "Normal baseline fetal heart rate ranges between 110 and 160 beats per minute." },
    { text: "The third stage of labor begins and ends with which physiological events?", options: ["From onset of regular contractions to complete cervical dilation (10 cm)", "From complete cervical dilation to delivery of the infant", "From delivery of the infant to the complete delivery of the placenta", "From delivery of the placenta through the first 4 hours postpartum"], answer: 2, exp: "The third stage of labor encompasses the interval between delivery of the neonate and complete expulsion of the placenta." },
    { text: "Chadwick's sign, a probable sign of pregnancy, is characterized by:", options: ["Softening of the cervix (Goodell's sign)", "Bluish-purple discoloration of the vaginal mucosa and cervix caused by increased pelvic vascularity", "Softening of the lower uterine segment (Hegar's sign)", "Painless irregular uterine contractions"], answer: 1, exp: "Chadwick's sign is the deep violet-blue coloration of the cervix and vagina resulting from estrogen-induced venous congestion." },
    // L2: Base Clinical Practice
    { text: "A laboring client's cardiotocograph (CTG) displays FHR decelerations that begin after the peak of a uterine contraction and return to baseline well after the contraction ends. These are:", options: ["Early decelerations (head compression)", "Variable decelerations (cord compression)", "Late decelerations indicating uteroplacental insufficiency", "Accelerations indicating fetal well-being"], answer: 2, exp: "Late decelerations reflect compromised intervillous placental blood flow and fetal hypoxemia during contractions." },
    { text: "The primary initial action when the nurse identifies late decelerations on the fetal monitor is to:", options: ["Increase the oxytocin (Pitocin) infusion rate", "Turn the client onto her left side, administer O2 at 8-10 L/min via non-rebreather, stop oxytocin, and increase IV fluids", "Perform an immediate vaginal examination", "Prepare for immediate vacuum extraction without repositioning"], answer: 1, exp: "Intrauterine resuscitation: maternal left-lateral positioning relieves caval compression, stop oxytocin, give O2 and IV fluids." },
    { text: "A pregnant client at 28 weeks gestation is Rh-negative and unsensitized (negative indirect Coombs' test). The nurse prepares to administer:", options: ["Rho(D) Immune Globulin (RhoGAM) 300 mcg intramuscularly", "Packed red blood cell transfusion", "Rubella vaccination immediately", "Oxytocin infusion"], answer: 0, exp: "RhoGAM at 28 weeks and within 72 hours postpartum prevents maternal isoimmunization against Rh-positive fetal cells." },
    { text: "A client who gave birth vaginally 1 hour ago has a boggy (atonic) uterus displaced to the right of the midline with increased lochial bleeding. The nurse's first action is to:", options: ["Administer methylergonovine immediately", "Assist the client to void or catheterize the bladder, then perform fundal massage", "Place client in Trendelenburg position", "Pack the vagina with sterile gauze"], answer: 1, exp: "A full bladder displaces the uterus, inhibiting normal myometrial contractions; emptying the bladder restores fundal tone." },
    { text: "Postpartum Hemorrhage (PPH) is clinically defined as cumulative blood loss of:", options: ["≥100 mL after delivery", "≥500 mL following vaginal delivery or ≥1000 mL following Cesarean delivery", "≥2000 mL in all deliveries", "≥250 mL within 24 hours"], answer: 1, exp: "Standard obstetric criteria define PPH as ≥500 mL blood loss post-vaginal or ≥1000 mL post-cesarean delivery." },
    // L3: Advanced Hard / Prioritization
    { text: "A client with severe preeclampsia is receiving continuous intravenous Magnesium Sulfate for seizure prophylaxis. Which finding indicates acute MAGNESIUM TOXICITY?", options: ["Hyperactive deep tendon reflexes (4+) and clonus", "Loss of patellar deep tendon reflexes (0), respiratory rate <12 breaths/min, and urine output <30 mL/hr", "Serum magnesium level of 5.5 mg/dL", "Mild facial flushing and warmth"], answer: 1, exp: "Loss of DTRs is the earliest clinical sign of toxicity, followed by respiratory depression; antidote is Calcium Gluconate." },
    { text: "A pregnant client at 34 weeks gestation presents with sudden, dark red, painful vaginal bleeding, severe abdominal pain, and a rigid 'board-like' tender uterus. The nurse identifies:", options: ["Placenta Previa", "Placental Abruption (Abruptio Placentae)", "Cervical incompetence", "Normal bloody show"], answer: 1, exp: "Dark painful bleeding with a hypertonic board-like uterus characterizes premature separation of the placenta (abruption)." },
    { text: "A client at 32 weeks gestation presents with painless, bright red vaginal bleeding. What procedure is STRICTLY CONTRAINDICATED?", options: ["Transabdominal ultrasound", "Digital vaginal examination or sterile speculum exam (until placenta previa is ruled out)", "External fetal monitoring", "Drawing maternal blood for type and crossmatch"], answer: 1, exp: "Digital vaginal exam in placenta previa can puncture the low-lying placenta, triggering catastrophic fatal hemorrhage." },
    { text: "During delivery of a macrosomic infant, the fetal head delivers but immediately retracts tightly against the perineum ('turtle sign'). The nurse prepares for:", options: ["Fundal pressure applied firmly from above", "Shoulder Dystocia emergency: execute McRoberts maneuver (hyperflexing maternal thighs) with suprapubic pressure", "Pushing the head back into the uterus", "Immediate vacuum application to the neck"], answer: 1, exp: "McRoberts maneuver widens pelvic diameters and suprapubic pressure dislodges the anterior shoulder; fundal pressure is contraindicated." },
    { text: "A client with severe preeclampsia develops HELLP Syndrome. What clinical laboratory abnormalities define this syndrome?", options: ["Hypoglycemia, elevated lipids, low platelets", "Hemolysis (schistocytes on smear), Elevated Liver enzymes (AST/ALT), and Low Platelets (<100,000/mm3)", "High eosinophils, low lactate, low potassium", "Hypernatremia, elevated leukocytes, high platelets"], answer: 1, exp: "HELLP syndrome represents severe microangiopathic hemolytic anemia, hepatic necrosis, and platelet consumption." },
    // L4: Peak Acuity Emergency
    { text: "Following spontaneous rupture of membranes, the fetal monitor displays prolonged severe bradycardia (HR 60 bpm). On vaginal examination, the nurse visualizes a pulsating loop in the vagina. The IMMEDIATE life-saving intervention is:", options: ["Push the cord back into the uterus with a dry sponge", "Insert a sterile gloved hand into the vagina and exert upward manual pressure to lift the fetal presenting part off the umbilical cord", "Instruct the mother to bear down and push vigorously", "Administer high-dose oxytocin"], answer: 1, exp: "Umbilical cord prolapse causes total fetal hypoxia; holding the fetal head off the cord manually until emergency C-section is life-saving." },
    { text: "A client in active labor suddenly gasps, clutches her chest, becomes cyanotic, dyspneic, and collapses with cardiac arrest and severe coagulopathy (Amniotic Fluid Embolism / AFE). The priority action is:", options: ["Initiate high-quality CPR, ventilate with 100% O2, and perform immediate perimortem Cesarean delivery within 4 to 5 minutes", "Administer oral aspirin", "Transport to radiology for CT", "Wait for spontaneous recovery"], answer: 0, exp: "AFE causes anaphylactoid vascular collapse; CPR with resuscitative hysterotomy within 5 minutes optimizes maternal and fetal survival." },
    { text: "A client with severe preeclampsia begins having a generalized tonic-clonic eclamptic seizure. The nurse's immediate actions are:", options: ["Restrain the client and insert an oral airway", "Protect the airway, turn client on side, administer Magnesium Sulfate IV 4-6g bolus, and prevent maternal injury", "Administer immediate IV glucose bolus", "Perform immediate vaginal delivery during the convulsion"], answer: 1, exp: "Airway protection, left-lateral positioning, and IV Magnesium Sulfate are the cornerstones of eclampsia management." },
    { text: "A postpartum client who had a precipitous delivery develops refractory uterine atony unresponsive to bimanual massage and oxytocin. Bleeding exceeds 1500 mL and BP is 70/40 mmHg. The nurse anticipates:", options: ["Second-line uterotonics (Methylergonovine, Carboprost/Hemabate, Misoprostol) and intrauterine balloon tamponade (Bakri)", "Applying an ice pack to the perineum", "Oral iron supplements", "Observation for 2 hours"], answer: 0, exp: "Refractory PPH requires rapid second-line uterotonics, intrauterine balloon tamponade, and massive transfusion protocol." },
    { text: "A woman at 8 weeks gestation presents with sudden severe sharp unilateral lower quadrant abdominal pain, referred right shoulder pain, and syncope with BP 74/42 mmHg. The nurse identifies:", options: ["Ruptured Ectopic Pregnancy causing severe hemoperitoneum and hypovolemic shock", "Normal round ligament pain", "Appendicitis without rupture", "Severe morning sickness"], answer: 0, exp: "Unilateral pelvic pain, Kehr's sign (referred shoulder pain from diaphragmatic blood irritation), and shock indicate ruptured tubal pregnancy." }
  ],

  // ─────────────────────────────────────────────────────────────
  // 12. MENTAL HEALTH & PSYCHIATRIC NURSING
  // ─────────────────────────────────────────────────────────────
  "Schizophrenia and Psychotic Disorders": [
    // L1: Foundational Recall
    { text: "Which symptom of Schizophrenia is classified as a 'POSITIVE' symptom?", options: ["Flat or blunted emotional affect", "Auditory hallucinations and persecutory delusions", "Avolition (lack of motivation)", "Alogia (poverty of speech)"], answer: 1, exp: "Positive symptoms reflect an excess or distortion of normal functions: hallucinations, delusions, and disorganized speech." },
    { text: "A client states: 'The television news anchor is blinking in a code specifically designed to transmit secret instructions to me.' This exemplifies:", options: ["A somatic delusion", "An Idea of Reference (Delusion of Reference)", "Echolalia", "Thought broadcasting"], answer: 1, exp: "Ideas of reference involve interpreting neutral, coincidental external events as having direct personal significance." },
    { text: "A client prescribed Clozapine (Clozaril) must undergo mandatory regular laboratory monitoring of which parameter?", options: ["Serum creatinine and BUN", "Complete Blood Count (Absolute Neutrophil Count - ANC) to detect Agranulocytosis", "Serum amylase and lipase", "Coagulation PT/INR profile"], answer: 1, exp: "Clozapine carries a black-box warning for potentially fatal agranulocytosis; regular ANC monitoring is legally mandated." },
    { text: "What is the primary neurotransmitter abnormality hypothesized in the development of the positive symptoms of Schizophrenia?", options: ["Serotonin deficiency", "Dopamine hyperactivity in the mesolimbic pathway", "GABA hypersecretion", "Acetylcholine destruction"], answer: 1, exp: "The dopamine hypothesis attributes positive psychotic symptoms to excessive dopaminergic transmission in mesolimbic pathways." },
    { text: "A client diagnosed with catatonic schizophrenia maintains awkward physical limb postures for hours when positioned by the nurse. This sign is:", options: ["Waxy flexibility (Cerea flexibilitas)", "Akathisia", "Tardive dyskinesia", "Echopraxia"], answer: 0, exp: "Waxy flexibility allows a catatonic patient's limbs to be molded into positions that are held indefinitely." },
    // L2: Base Clinical Practice
    { text: "When a client with Schizophrenia states: 'I hear FBI agents whispering through the air vents that they are going to kill me,' the most therapeutic response is:", options: ["'You are completely mistaken; there is nobody in the vents.'", "'I do not hear the voices, but I understand that this must be very frightening for you. You are safe here.'", "'Why do you think the FBI cares about you?'", "'I hear them too; let's hide under the bed.'"], answer: 1, exp: "Acknowledge the client's emotional distress and validate their feeling without validating or reinforcing the false hallucination." },
    { text: "A client taking Haloperidol (Haldol) develops intense subjective motor restlessness, inability to sit still, and paces constantly. The nurse identifies:", options: ["Acute dystonic reaction", "Akathisia (an Extrapyramidal Side Effect)", "Tardive dyskinesia", "Catatonic stupor"], answer: 1, exp: "Akathisia is an EPS characterized by motor restlessness and an inner compulsion to move continuously." },
    { text: "A client on long-term first-generation antipsychotics displays involuntary rhythmic tongue protrusion, lip smacking, and grimacing. The nurse recognizes:", options: ["Tardive Dyskinesia, which may become permanent if the medication is not modified", "Parkinsonian resting tremor", "Normal age-related facial tics", "Acute allergic reaction"], answer: 0, exp: "Tardive dyskinesia consists of involuntary choreoathetoid movements of face and limbs from prolonged dopamine blockade." },
    { text: "To manage Extrapyramidal Symptoms (EPS) such as acute muscle rigidity or neck dystonia from antipsychotics, the nurse anticipates administering:", options: ["Additional doses of Haloperidol", "Anticholinergic agents such as Benztropine (Cogentin) or Diphenhydramine", "Selective Serotonin Reuptake Inhibitors (SSRIs)", "Oral Lithium carbonate"], answer: 1, exp: "Centrally-acting anticholinergics (Benztropine, Diphenhydramine) restore the dopamine-acetylcholine balance, resolving acute EPS." },
    { text: "A client experiencing paranoid persecutory delusions refuses hospital food, claiming it is poisoned. The nurse's best intervention is to:", options: ["Force-feed the client with a nasogastric tube", "Provide factory-sealed prepackaged food items or allow the client to select sealed food themselves", "Taste the food in front of the client to prove it is safe", "Tell the client they will be restrained if they don't eat"], answer: 1, exp: "Commercially sealed or unopened food reduces paranoid suspicion and promotes voluntary nutritional intake." },
    // L3: Advanced Hard / Prioritization
    { text: "A client taking Fluphenazine develops sudden high fever (40.5°C), severe 'lead-pipe' muscle rigidity, altered mental status, diaphoresis, and BP 188/104 mmHg. The nurse identifies:", options: ["Serotonin syndrome", "Neuroleptic Malignant Syndrome (NMS), a life-threatening medical emergency", "Anticholinergic toxicity", "Acute catatonic excitation"], answer: 1, exp: "NMS is a fatal idiosyncratic reaction to antipsychotics characterized by severe hyperthermia, rigidity, autonomic instability, and elevated CK." },
    { text: "In managing Neuroleptic Malignant Syndrome (NMS), the nurse immediately discontinues the antipsychotic and prepares to administer which specific medication?", options: ["Dantrolene (skeletal muscle relaxant) and Bromocriptine (dopamine agonist)", "Benztropine and Haloperidol", "Propranolol and Lithium", "Fluoxetine"], answer: 0, exp: "Dantrolene relieves malignant muscle rigidity while Bromocriptine restores central dopaminergic tone." },
    { text: "A client reports hearing command auditory hallucinations telling them to 'jump off the hospital balcony right now.' The nurse's PRIORITY action is to:", options: ["Place the client on continuous 1:1 one-to-one visual observation and ensure environment safety", "Encourage the client to listen to loud music through headphones", "Ask the client to sign a 'no-harm' contract and leave them in their room", "Administer vitamins"], answer: 0, exp: "Command hallucinations instructing self-harm carry the highest immediate lethality risk and mandate continuous 1:1 supervision." },
    { text: "A client taking an MAOI antidepressant (e.g., Tranylcypromine, Phenelzine) consumes aged cheeses, smoked sausages, and red wine. The nurse monitors for which life-threatening crisis?", options: ["Profound orthostatic hypotension and hypothermia", "Hypertensive Crisis (severe headache, BP >220/120 mmHg, risk of intracranial hemorrhage) due to Tyramine accumulation", "Agranulocytosis and sepsis", "Severe hypoglycemia"], answer: 1, exp: "MAO inhibition prevents degradation of dietary tyramine, which displaces massive norepinephrine into the circulation." },
    { text: "A client taking Sertraline (SSRI) and Tramadol presents with acute tremor, hyperreflexia, bilateral inducible ankle clonus, agitation, and temp 39.1°C. The nurse identifies:", options: ["Neuroleptic Malignant Syndrome", "Serotonin Syndrome", "Lithium toxicity", "Opioid withdrawal"], answer: 1, exp: "Serotonin syndrome features neuromuscular hyperactivity (clonus, hyperreflexia) and autonomic instability from excess serotonergic stimulation." },
    // L4: Peak Acuity Emergency
    { text: "A client with alcohol use disorder is admitted to the medical floor. 72 hours after the last drink, the client develops extreme agitation, gross tremors, visual hallucinations of insects crawling on the skin, drenching sweats, BP 198/114 mmHg, and HR 142 bpm. The nurse identifies:", options: ["Mild alcohol hangover", "Delirium Tremens (DTs), a life-threatening medical emergency", "Korsakoff's psychosis", "Schizophrenic relapse"], answer: 1, exp: "Delirium tremens is the most severe manifestation of alcohol withdrawal, with a 5-15% mortality rate if untreated." },
    { text: "In the emergency management of Delirium Tremens (DTs), the priority pharmacological treatment protocol utilizes:", options: ["High-dose intramuscular Haloperidol alone", "Aggressive intravenous Benzodiazepines (e.g., Diazepam or Lorazepam) titrated to CIWA-Ar scores, and IV Thiamine before glucose", "Oral Disulfiram (Antabuse)", "Naltrexone injection"], answer: 1, exp: "High-dose IV benzodiazepines prevent fatal status epilepticus and autonomic collapse in severe alcohol withdrawal delirium." },
    { text: "A client with an acute acetaminophen (paracetamol) overdose of 25 grams presents 4 hours post-ingestion. To prevent irreversible fatal acute liver failure, the nurse anticipates stat administration of:", options: ["Naloxone", "N-acetylcysteine (NAC / Mucomyst)", "Flumazenil", "Deferoxamine"], answer: 1, exp: "N-acetylcysteine replenishes hepatic glutathione stores, neutralizing the toxic metabolite NAPQI if given within 8-10 hours." },
    { text: "A client in the psychiatric emergency unit becomes acutely violent, breaks a glass mirror, and lunges at staff with a jagged shard. De-escalation has failed. The team must:", options: ["Run out of the facility and leave the building unlocked", "Execute a coordinated multi-person physical takedown with dedicated leader, secure the weapon, and administer emergency chemical restraint", "Confront the client alone with a broom", "Offer the client a cup of hot coffee"], answer: 1, exp: "Imminent weaponized violence requires immediate coordinated security team takedown to neutralize deadly force." },
    { text: "An unconscious client presents with pinpoint pupils (miosis), respiratory rate of 4 breaths/min, and cyanosis following an opioid overdose. The immediate life-saving intervention is:", options: ["Administering IV Flumazenil", "Assisting ventilation with bag-valve-mask 100% O2 and administering IV/IM/Nasal Naloxone (Narcan)", "Administering oral activated charcoal", "Performing emergency hemodialysis"], answer: 1, exp: "The opioid overdose triad: miosis, coma, and severe respiratory depression; immediate Naloxone and ventilation are life-saving." }
  ],
  ...require('./extraBanks')
};

// Map subjects and unit names to appropriate authentic question banks
const resolveBankKey = (unit = '', subject = '') => {
  if (BANKS[unit]) return unit;
  if (BANKS[subject]) return subject;

  const target = `${subject} ${unit}`.toLowerCase();

  // 1. Emergency, Trauma & Critical Care Resuscitation
  if (target.includes('emergency') || target.includes('trauma') || target.includes('triage') || target.includes('cpr') || target.includes('resuscitation') || target.includes('disaster') || target.includes('first aid') || target.includes('critical care') || target.includes('shock') || target.includes('airway management')) {
    return 'Emergency & Critical Care Nursing';
  }

  // 2. Infection Prevention, Control & Biomedical Waste (MUST be before generic Management)
  if (target.includes('infect') || target.includes('aseps') || target.includes('sterile') || target.includes('ppe') || target.includes('biomedical') || target.includes('waste') || target.includes('isolation') || target.includes('hygiene') || target.includes('decontaminat') || target.includes('steriliz') || target.includes('wound care') || target.includes('dressing')) {
    return 'Infection Prevention and Control';
  }

  // 3. Community Health, Epidemiology & Public Health
  if (target.includes('community') || target.includes('epidemiol') || target.includes('public health') || target.includes('cold chain') || target.includes('sanitation') || target.includes('national health') || target.includes('health program') || target.includes('family health') || target.includes('water purification')) {
    return 'Community Health Nursing';
  }

  // 4. Nursing Research, Statistics & Evidence-Based Practice
  if (target.includes('research') || target.includes('statistic') || target.includes('biostat') || target.includes('sampling') || target.includes('literature review') || target.includes('evidence-based') || target.includes('data collection') || target.includes('instrumentation') || target.includes('hypothesis') || target.includes('computer applications in research')) {
    return 'Nursing Research & Statistics';
  }

  // 5. Nursing Education, Administration & Management
  if (target.includes('education') || target.includes('curriculum') || target.includes('administration') || target.includes('leadership') || target.includes('staffing') || target.includes('educational principles') || target.includes('professional trends') || target.includes('nursing audit') || target.includes('hospital administration') || target.includes('management styles')) {
    return 'Nursing Education & Management';
  }

  // 6. Nursing Ethics, Legal Aspects & Malpractice
  if (target.includes('ethics') || target.includes('legal') || target.includes('malpractice') || target.includes('consent') || target.includes('negligence') || target.includes('liability') || target.includes('advance directive') || target.includes('professional boundaries') || target.includes('code of ethics') || target.includes('patient rights')) {
    return 'Nursing Ethics & Legal Aspects';
  }

  // 7. Anatomy & Physiology (Systems, Bones, Muscles)
  if (target.includes('anatomy') || target.includes('physiolog') || target.includes('skelet') || target.includes('muscul') || target.includes('digestive') || target.includes('bone') || target.includes('joint')) {
    return 'Anatomy & Physiology';
  }

  // 8. Medication Administration & Pharmacology
  if (target.includes('medication') || target.includes('drug') || target.includes('pharmacolog') || target.includes('dose') || target.includes('inject') || target.includes('infusion') || target.includes('antidote') || target.includes('toxicolog') || target.includes('antibiotic') || target.includes('chemotherap') || target.includes('analgesic') || target.includes('pharmacokinetics') || target.includes('pharmacodynamics')) {
    return 'Medication Administration';
  }

  // 9. Basic Nutrition, Dietetics & Elimination
  if (target.includes('nutrition') || target.includes('diet') || target.includes('vitamin') || target.includes('mineral') || target.includes('food') || target.includes('feeding') || target.includes('tpn') || target.includes('caloric') || target.includes('elimination') || target.includes('metabol')) {
    return 'Basic Nutrition';
  }

  // 10. Microbiology & Immunology & Pathogens
  if (target.includes('microbiol') || target.includes('pathogen') || target.includes('immunit') || target.includes('bacteria') || target.includes('virus') || target.includes('fungus') || target.includes('culture') || target.includes('stain') || target.includes('vaccin') || target.includes('antibody')) {
    return 'Introduction to Microbiology';
  }

  // 11. Psychology & Sociology & Behavioral Sciences
  if (target.includes('psycholog') || target.includes('cognitive') || target.includes('sociolog') || target.includes('social') || target.includes('family') || target.includes('communicat') || target.includes('interpersonal') || target.includes('motivation') || target.includes('emotion') || target.includes('counseling') || target.includes('developmental psych') || target.includes('stress') || target.includes('coping')) {
    return 'Introduction to Psychology';
  }

  // 12. Neurological Disorders & CNS & Neurovascular
  if (target.includes('neuro') || target.includes('brain') || target.includes('cns') || target.includes('stroke') || target.includes('seizure') || target.includes('spinal') || target.includes('gcs') || target.includes('coma') || target.includes('cranial') || target.includes('myasthenia') || target.includes('parkinson') || target.includes('head trauma') || target.includes('unconscious')) {
    return 'Neurological Disorders';
  }

  // 13. Endocrine Disorders & Diabetes
  if (target.includes('endocrin') || target.includes('diabet') || target.includes('thyroid') || target.includes('adrenal') || target.includes('cushing') || target.includes('addison') || target.includes('insulin') || target.includes('pancreat')) {
    return 'Endocrine Disorders';
  }

  // 14. Pediatrics & Child Health & Growth
  if (target.includes('pediatric') || target.includes('child') || target.includes('growth') || target.includes('toddler') || target.includes('infant') || target.includes('newborn') || target.includes('neonat') || target.includes('development') || target.includes('immuniz') || target.includes('picu') || target.includes('congenital') || target.includes('croup') || target.includes('tetralogy')) {
    return 'Growth and Development';
  }

  // 15. Obstetrics & Gynecological & Labour & Pregnancy
  if (target.includes('labour') || target.includes('labor') || target.includes('delivery') || target.includes('obstetric') || target.includes('pregnan') || target.includes('maternal') || target.includes('gynec') || target.includes('antenatal') || target.includes('postnatal') || target.includes('puerperium') || target.includes('preeclampsia') || target.includes('contraception') || target.includes('infertility') || target.includes('reproductive')) {
    return 'Normal Labour and Delivery';
  }

  // 16. Psychiatry & Mental Health & Schizophrenia
  if (target.includes('schiz') || target.includes('psychiat') || target.includes('mental health') || target.includes('hallucinat') || target.includes('delusion') || target.includes('bipolar') || target.includes('depress') || target.includes('suicide') || target.includes('substance') || target.includes('anxiety') || target.includes('mood') || target.includes('phobia') || target.includes('addiction')) {
    return 'Schizophrenia and Psychotic Disorders';
  }

  // 17. Vital Signs Assessment & Cardiovascular / Hemodynamics
  if (target.includes('vital') || target.includes('temperature') || target.includes('pulse') || target.includes('blood pressure') || target.includes('cardio') || target.includes('heart') || target.includes('circulation') || target.includes('hemodynamic') || target.includes('vascular')) {
    return 'Vital Signs Assessment';
  }

  // 18. Medical-Surgical Nursing (Systemic Clinical Units)
  if (target.includes('med-surg') || target.includes('medical-surgical') || target.includes('surgical') || target.includes('perioperative') || target.includes('oncology') || target.includes('respiratory') || target.includes('hematolog') || target.includes('gastro') || target.includes('hepatobiliary') || target.includes('renal') || target.includes('urinary') || target.includes('skin') || target.includes('integumentary') || target.includes('burns') || target.includes('transplant') || target.includes('fluid') || target.includes('electrolyte') || target.includes('acid') || target.includes('pain') || target.includes('palliative') || target.includes('communicable') || target.includes('immune')) {
    return 'Medical-Surgical Nursing';
  }

  return 'Introduction to Nursing';
};

const generateQuestionsForUnit = (subject, unit) => {
  const bankKey = resolveBankKey(unit, subject);
  const sourceBank = BANKS[bankKey] || BANKS['Introduction to Nursing'];

  return sourceBank.slice(0, 20).map((q, idx) => {
    const diffLevel = idx < 5 ? 1 : idx < 10 ? 2 : idx < 15 ? 3 : 4;
    const diffName = diffLevel === 1 ? 'Level 1: Foundational Recall' 
                   : diffLevel === 2 ? 'Level 2: Base Clinical' 
                   : diffLevel === 3 ? 'Level 3: Advanced Hard' 
                   : 'Level 4: Peak Acuity';

    return {
      questionText: q.text,
      options: [...q.options],
      correctAnswer: q.answer,
      explanation: q.exp,
      topic: unit,
      difficultyLevel: diffLevel,
      difficultyName: diffName
    };
  });
};

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/nursing_training';
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri);
      console.log('✅ Connected to MongoDB');
    }

    console.log('🗑️  Deleting all old generic practice tests...');
    await Test.deleteMany({ title: { $regex: /Practice Test/i } });

    const CORE_SUBJECTS = [
      { 
        name: "Nursing Foundations (Fundamentals of Nursing)",
        units: [
          "Introduction to Nursing", "Nursing Theories and Process", "Hospital Admission, Transfer & Discharge",
          "Communication and Interpersonal Relationships", "Infection Prevention and Control", "Safety, Comfort and Hygiene",
          "Vital Signs Assessment", "Nutrition and Elimination", "Mobility and Positioning",
          "Medication Administration", "Specimen Collection and Diagnostic Procedures", "Wound Care and Dressings",
          "Oxygen Therapy and Airway Management", "First Aid and Emergency Care", "Documentation and Record Keeping",
          "Biomedical Waste Management", "Ethics and Legal Aspects of Nursing", "Patient Education and Health Promotion",
          "Gerontological and Palliative Care", "Professional Trends and Nursing Management"
        ]
      },
      { 
        name: "Anatomy & Physiology",
        units: ["General Anatomy & Physiology", "Skeletal System", "Muscular System", "Cardiovascular System", "Respiratory System", "Digestive System", "Nervous System", "Endocrine System", "Reproductive System"]
      },
      { 
        name: "Microbiology",
        units: ["Introduction to Microbiology", "Infection Control", "Pathogenic Organisms", "Immunity"]
      },
      { 
        name: "Pharmacology",
        units: [
          "Introduction to Pharmacology", "Pharmacokinetics", "Pharmacodynamics", "Drug Administration and Dosage Calculations",
          "Autonomic Nervous System Drugs", "Central Nervous System Drugs", "Cardiovascular Drugs", "Respiratory System Drugs",
          "Gastrointestinal Drugs", "Endocrine System Drugs", "Chemotherapy and Antimicrobials", "Analgesics and Anti-inflammatory Drugs",
          "Hematological Drugs", "Renal System Drugs", "Immunological Drugs and Vaccines", "Emergency Drugs",
          "Toxicology and Antidotes", "Adverse Drug Reactions and Drug Interactions", "Rational Drug Therapy", "Nurse's Responsibilities in Drug Administration"
        ]
      },
      { 
        name: "Nutrition & Dietetics",
        units: ["Basic Nutrition", "Therapeutic Diet", "Nutritional Assessment", "Vitamins and Minerals"]
      },
      { 
        name: "Psychology",
        units: ["Introduction to Psychology", "Cognitive Processes", "Motivation and Emotion", "Personality", "Developmental Psychology"]
      },
      { 
        name: "Sociology",
        units: ["Introduction to Sociology", "Social Structure", "Family and Marriage", "Social Problems", "Health Sociology"]
      },
      { 
        name: "Medical-Surgical Nursing", 
        units: [
          "Introduction to Medical-Surgical Nursing", "Nursing Assessment", "Fluid, Electrolyte & Acid–Base Balance", "Perioperative Nursing",
          "Emergency & Trauma Nursing", "Pain & Palliative Care", "Infection Control", "Oncology Nursing", "Respiratory Disorders",
          "Cardiovascular Disorders", "Hematological Disorders", "Neurological Disorders", "Musculoskeletal Disorders", "Gastrointestinal Disorders",
          "Hepatobiliary & Pancreatic Disorders", "Endocrine Disorders", "Renal & Urinary Disorders", "Reproductive Disorders", "Skin Disorders",
          "Immune Disorders", "Communicable Diseases", "Critical Care Nursing", "Geriatric Nursing", "Burns & Rehabilitation", "Organ Transplantation"
        ]
      },
      { 
        name: "Community Health Nursing",
        units: ["Concept of Health and Disease", "Epidemiology", "Community Health Administration", "National Health Programs", "Family Health Services"]
      },
      { 
        name: "Child Health (Pediatric) Nursing",
        units: [
          "Introduction to Pediatric Nursing", "Growth and Development", "Newborn Care", "Nutrition and Infant Feeding",
          "Pediatric Assessment", "Common Childhood Disorders", "Respiratory Disorders", "Cardiovascular Disorders",
          "Gastrointestinal Disorders", "Neurological Disorders", "Hematological Disorders", "Endocrine Disorders",
          "Renal and Urinary Disorders", "Musculoskeletal Disorders", "Communicable Diseases", "Immunization",
          "Pediatric Emergencies", "Pediatric Oncology", "Pediatric Intensive Care (PICU/NICU)", "Child Mental Health",
          "Pediatric Pharmacology", "Family-Centered Care", "Pediatric Procedures and Nursing Care", "Rehabilitation and Palliative Care"
        ]
      },
      { 
        name: "Mental Health (Psychiatric) Nursing",
        units: [
          "Introduction to Psychiatric Nursing", "Mental Health and Mental Illness", "Psychiatric Assessment", "Therapeutic Communication",
          "Personality Development and Behavior", "Stress and Coping Disorders", "Anxiety Disorders", "Mood Disorders",
          "Schizophrenia and Psychotic Disorders", "Personality Disorders", "Substance Use Disorders", "Organic Mental Disorders",
          "Child and Adolescent Psychiatry", "Geriatric Psychiatry", "Psychiatric Emergencies", "Psychopharmacology",
          "Psychotherapies", "Community Mental Health Nursing", "Legal and Ethical Aspects", "Rehabilitation in Psychiatry"
        ]
      },
      { 
        name: "Obstetrics & Gynecological Nursing",
        units: [
          "Introduction to Obstetric & Gynecological Nursing", "Anatomy and Physiology of the Reproductive System", "Pregnancy (Antenatal Care)", "Normal Labour and Delivery",
          "Postnatal Care (Puerperium)", "Newborn Care", "High-Risk Pregnancy", "Obstetric Emergencies",
          "Family Planning and Contraception", "Infertility", "Gynecological Disorders", "Reproductive Tract Infections and STIs",
          "Menstrual Disorders", "Gynecological Surgeries", "Menopause and Climacteric Care", "Drugs Used in Obstetrics and Gynecology",
          "National Maternal and Child Health Programmes", "Legal and Ethical Aspects in Obstetric & Gynecological Nursing"
        ]
      },
      { 
        name: "Nursing Research & Statistics",
        units: [
          "Introduction to Nursing Research", "Research Process", "Research Problem and Objectives", "Literature Review",
          "Research Design", "Sampling Techniques", "Data Collection Methods", "Research Tools and Instrumentation",
          "Data Analysis and Statistics", "Interpretation of Results", "Research Report Writing", "Evidence-Based Nursing Practice",
          "Ethics in Nursing Research", "Biostatistics", "Computer Applications in Research"
        ]
      },
      { 
        name: "Nursing Education & Nursing Administration & Management",
        units: ["Educational Principles in Nursing", "Curriculum Development", "Leadership and Management Styles", "Hospital Administration and Staffing"]
      },
      { 
        name: "Nursing Ethics and Legal Aspects",
        units: ["Ethical Principles in Nursing", "Legal Responsibilities and Malpractice", "Informed Consent and Advance Directives", "Professional Boundaries"]
      },
      { 
        name: "Emergency Nursing",
        units: ["Triage Systems and START Protocol", "Cardiopulmonary Resuscitation", "Trauma Resuscitation", "Disaster Nursing and Mass Casualty"]
      },
      { 
        name: "Infection Prevention and Biomedical Waste Management",
        units: ["Aseptic Techniques and Hand Hygiene", "Standard and Transmission-Based Precautions", "Biomedical Waste Segregation", "Sterilization and Disinfection"]
      }
    ];

    let testsToInsert = [];
    for (const subject of CORE_SUBJECTS) {
      if (subject.units && subject.units.length > 0) {
        // Also insert a top-level subject practice test
        testsToInsert.push({
          title: `${subject.name} Practice Test`,
          description: `Authentic 20-question practice test with 4 progressive difficulty levels covering ${subject.name}.`,
          topic: subject.name,
          difficulty: 'hard',
          duration: 30,
          examType: 'nursing_officer',
          isFree: true,
          questions: generateQuestionsForUnit(subject.name, subject.name),
          totalQuestions: 20
        });

        for (const unit of subject.units) {
          testsToInsert.push({
            title: `${subject.name} - ${unit} Practice Test`,
            description: `Authentic 20-question practice test with 4 progressive difficulty levels for ${unit}.`,
            topic: unit,
            difficulty: 'hard',
            duration: 30,
            examType: 'nursing_officer',
            isFree: true,
            questions: generateQuestionsForUnit(subject.name, unit),
            totalQuestions: 20
          });
        }
      } else {
        testsToInsert.push({
          title: `${subject.name} Practice Test`,
          description: `Authentic 20-question practice test with 4 progressive difficulty levels for ${subject.name}.`,
          topic: subject.name,
          difficulty: 'hard',
          duration: 30,
          examType: 'nursing_officer',
          isFree: true,
          questions: generateQuestionsForUnit(subject.name, subject.name),
          totalQuestions: 20
        });
      }
    }

    // Official CAT Approved Practice Tests (Archer & UWorld Computer Adaptive System)
    const catApprovedTests = [
      {
        title: "NCLEX-RN Official Comprehensive Simulator (CAT Approved)",
        description: "Official Archer & UWorld Computer Adaptive System (CAT). Starts at Base Level (Level 2), dynamically scales to Peak Level on correct answers, offers tough question buffer chances before stepping down, adheres strictly to core nursing subject percentage quotas, and terminates early once uncertainty is eliminated with 95% confidence.",
        topic: "All Subjects",
        difficulty: "hard",
        duration: 45,
        examType: "nclex_rn",
        isFree: true,
        isCAT: true,
        isCATApproved: true,
        questions: generateQuestionsForUnit("Medical-Surgical Nursing", "Comprehensive NCLEX CAT"),
        totalQuestions: 25
      },
      {
        title: "AIIMS NORCET Nursing Officer Adaptive Benchmark (CAT Approved)",
        description: "Adaptive computer-based test for Nursing Officer exams. Real-time difficulty calibration following the Archer CAT escalation ladder across Med-Surg, Pharmacology, OB/GYN, Pediatrics, Psychiatry, Foundations, and Community Health.",
        topic: "All Subjects",
        difficulty: "hard",
        duration: 45,
        examType: "nursing_officer",
        isFree: true,
        isCAT: true,
        isCATApproved: true,
        questions: generateQuestionsForUnit("Pharmacology & Therapeutics", "Nursing Officer Adaptive"),
        totalQuestions: 25
      },
      {
        title: "Medical-Surgical & Pharmacology High-Yield CAT (CAT Approved)",
        description: "Computer Adaptive Practice Test focused on the highest-weighted domains: Medical-Surgical Nursing (25%) and Pharmacology & Therapeutics (20%). Difficulty adapts in real time.",
        topic: "Medical-Surgical Nursing",
        difficulty: "hard",
        duration: 35,
        examType: "nclex_rn",
        isFree: true,
        isCAT: true,
        isCATApproved: true,
        questions: generateQuestionsForUnit("Medical-Surgical Nursing", "High-Yield MedSurg CAT"),
        totalQuestions: 20
      },
      {
        title: "Maternal-Child & Pediatric Health Adaptive Test (CAT Approved)",
        description: "Computer Adaptive Practice Test balancing Obstetrics & Gynecological Nursing (15%) and Pediatric Nursing (15%) with dynamic clinical judgment difficulty escalation.",
        topic: "Obstetrics & Gynecological Nursing",
        difficulty: "hard",
        duration: 35,
        examType: "nclex_rn",
        isFree: true,
        isCAT: true,
        isCATApproved: true,
        questions: generateQuestionsForUnit("Obstetrics & Gynecological Nursing", "Maternal-Child CAT"),
        totalQuestions: 20
      },
      {
        title: "Foundations & Mental Health Clinical CAT (CAT Approved)",
        description: "Computer Adaptive Practice Test covering Nursing Foundations (10%), Mental Health (10%), and Community Health (5%) with progressive difficulty and uncertainty elimination.",
        topic: "Mental Health (Psychiatric) Nursing",
        difficulty: "hard",
        duration: 30,
        examType: "nclex_rn",
        isFree: true,
        isCAT: true,
        isCATApproved: true,
        questions: generateQuestionsForUnit("Mental Health (Psychiatric) Nursing", "Mental Health CAT"),
        totalQuestions: 20
      }
    ];

    testsToInsert.unshift(...catApprovedTests);

    console.log(`📚 Seeding ${testsToInsert.length} authentic topic practice tests (including ${catApprovedTests.length} CAT Approved Adaptive Tests)...`);
    const chunkSize = 50;
    for (let i = 0; i < testsToInsert.length; i += chunkSize) {
      const chunk = testsToInsert.slice(i, i + chunkSize);
      await Test.insertMany(chunk);
    }
    console.log(`🎉 SUCCESS: ${testsToInsert.length} practice tests seeded with authentic, level-differentiated questions!`);
    return { success: true, count: testsToInsert.length };

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};

if (require.main === module) {
  seedDatabase().then(() => process.exit(0));
}

module.exports = {
  BANKS,
  resolveBankKey,
  generateQuestionsForUnit,
  seedDatabase
};
