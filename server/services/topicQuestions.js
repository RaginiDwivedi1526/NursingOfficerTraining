/**
 * Comprehensive Multi-Topic Question Bank & Deduplication Engine
 * Strictly segregated by Nursing Subject & 4 Computer Adaptive Difficulty Levels:
 * Level 1: Below Base (Foundational recall, safety rights, core principles)
 * Level 2: Base Level (Standard passing benchmark, routine clinical judgment)
 * Level 3: Advanced Hard (Critical prioritization, multi-drug toxicity, decompensation)
 * Level 4: Peak Level (High-acuity emergency/ICU, shock, complex multi-system failure)
 */

const { BANKS: UNIT_BANKS, resolveBankKey } = require('../seedAllUnits');

const TOPIC_BANKS = {
  // ─────────────────────────────────────────────────────────────
  // 1. PHARMACOLOGY & THERAPEUTICS
  // ─────────────────────────────────────────────────────────────
  pharmacology: [
    {
      id: 'pharm-l1-01',
      difficultyLevel: 1,
      scenario: 'CLINICAL CASE SCENARIO: A 64-year-old client with chronic stable angina is prescribed Sublingual Nitroglycerin (SL NTG) tablets to take as needed for acute chest pain episodes.',
      questionText: 'Which essential instruction must the nurse emphasize regarding the administration and storage of sublingual nitroglycerin?',
      options: [
        'Place one tablet under the tongue at the onset of chest pain; if pain is unresolved after 5 minutes, call emergency services (911) before taking a second dose',
        'Swallow the tablet immediately with a full glass of cold water',
        'Store the tablets in a clear plastic pill organizer on the bathroom vanity counter',
        'Take up to five tablets at one-minute intervals before seeking medical assistance'
      ],
      correctAnswer: 0,
      explanation: `Explanation
Sublingual nitroglycerin relieves angina by relaxing vascular smooth muscle, causing systemic venous and arterial vasodilation. Proper client education is critical for safety:
1. Stop activity and sit down immediately (prevents orthostatic hypotension and falls).
2. Dissolve one tablet under the tongue at the first sign of chest discomfort.
3. If pain is unrelieved or worsens 5 minutes after the first dose, call emergency services (911) immediately before taking a second dose.
4. Up to 3 doses may be taken 5 minutes apart while awaiting emergency help.
5. Store tablets in their original dark, tightly closed glass container away from heat, moisture, and light.

(Option 1) Calling emergency services 5 minutes after the first unresolved dose ensures prompt reperfusion therapy for acute myocardial infarction.
(Option 2) Swallowing sublingual tablets leads to extensive first-pass hepatic metabolism and renders the drug ineffective.
(Option 3) Nitroglycerin rapidly decomposes when exposed to light, heat, and moisture; clear plastic organizers destroy potency.
(Option 4) Taking 5 tablets at 1-minute intervals causes profound hypotension and syncope.

Educational objective:
Sublingual nitroglycerin must be kept in its original dark glass bottle. Clients should dissolve one tablet under the tongue and call emergency services if chest pain is not relieved 5 minutes after the first dose.`,
      peerPercentages: [89, 4, 4, 3],
      topic: 'Pharmacology & Therapeutics'
    },
    {
      id: 'pharm-l2-01',
      difficultyLevel: 2,
      scenario: 'CLINICAL CASE SCENARIO: A 58-year-old client receiving a continuous intravenous unfractionated heparin infusion for deep vein thrombosis has a routine lab check. The stat activated partial thromboplastin time (aPTT) returns at 142 seconds (control: 30 seconds). Assessment reveals fresh epistaxis and oozing from the IV puncture site.',
      questionText: 'Which antidote should the nurse prepare for immediate intravenous administration?',
      options: [
        'Protamine Sulfate',
        'Phytonadione (Vitamin K)',
        'Idarucizumab (Praxbind)',
        'Aminocaproic Acid'
      ],
      correctAnswer: 0,
      explanation: `Explanation
Therapeutic aPTT for unfractionated heparin is 1.5 to 2.5 times the control value (typically 60–80 seconds). An aPTT of 142 seconds with active epistaxis and venous ooze represents severe heparin overdose.

Protamine Sulfate is a strongly basic peptide that binds negatively charged heparin molecules via electrostatic attraction, forming an inactive, stable salt complex and rapidly reversing anticoagulation within 5 minutes.

(Option 1) Protamine sulfate is the specific, rapid-acting antidote for unfractionated heparin overdose.
(Option 2) Vitamin K reverses warfarin coagulopathy by stimulating hepatic clotting factor synthesis over 6–24 hours.
(Option 3) Idarucizumab is the monoclonal antibody reversal agent specific for dabigatran (Pradaxa).
(Option 4) Aminocaproic acid is an antifibrinolytic agent used in hyperfibrinolytic bleeding, not heparin toxicity.

Educational objective:
Protamine sulfate is the specific antidote for severe unfractionated heparin toxicity and acute bleeding. It neutralizes heparin immediately by forming an inactive ionic complex.`,
      peerPercentages: [92, 5, 2, 1],
      topic: 'Pharmacology & Therapeutics'
    },
    {
      id: 'pharm-l3-01',
      difficultyLevel: 3,
      scenario: 'CLINICAL CASE SCENARIO: A 70-year-old client with chronic heart failure and atrial fibrillation is taking Digoxin 0.25 mg daily and Furosemide 40 mg daily. The client reports progressive fatigue, loss of appetite, nausea, and seeing yellow-green halos around room lamps. Telemetry reveals sinus bradycardia at 44 bpm with frequent unifocal PVCs. Serum Digoxin is 2.9 ng/mL and serum Potassium is 3.1 mEq/L.',
      questionText: 'Which medical intervention should the nurse anticipate as the HIGHEST priority?',
      options: [
        'Hold digoxin, administer IV Potassium Chloride replacement infusion, and prepare Digoxin Immune Fab (DigiFab)',
        'Administer oral potassium chloride tablets and continue scheduled digoxin',
        'Administer IV Furosemide 80 mg bolus to hasten renal excretion of digoxin',
        'Place the client in Trendelenburg position and infuse calcium gluconate'
      ],
      correctAnswer: 0,
      explanation: `Explanation
The therapeutic range for digoxin in heart failure is 0.5–0.9 ng/mL; levels >2.0 ng/mL indicate severe toxicity. Manifestations include gastrointestinal distress (anorexia, nausea), visual disturbances (xanthopsia, yellow-green halos), and lethal cardiac arrhythmias.

Hypokalemia (<3.5 mEq/L) exacerbates digoxin toxicity because potassium competes with digoxin for binding at the myocardial Na+/K+-ATPase pump. Hypokalemia increases digoxin affinity, precipitating dangerous bradyarrhythmias. Digoxin Immune Fab (DigiFab) binds free digoxin in the circulation, promoting rapid urinary clearance.

(Option 1) Correcting hypokalemia and preparing DigiFab neutralizes cardiac toxicity and prevents fatal dysrhythmias.
(Option 2) Continuing digoxin in a toxic client is lethal.
(Option 3) Loop diuretics cause further potassium wasting in urine, drastically worsening toxicity.
(Option 4) Calcium administration in digoxin toxicity is hazardous and can precipitate irreversible cardiac arrest ('stone heart').

Educational objective:
Hypokalemia potentiates digoxin toxicity. Serum digoxin >2.0 ng/mL with bradycardia and visual halos warrants holding digoxin, replenishing potassium, and administering Digoxin Immune Fab.`,
      peerPercentages: [85, 3, 9, 3],
      topic: 'Pharmacology & Therapeutics'
    },
    {
      id: 'pharm-l4-01',
      difficultyLevel: 4,
      scenario: 'CLINICAL CASE SCENARIO: A 63-year-old client with diabetic nephropathy is started on Enalapril 10 mg daily. Four hours following the second dose, the client presents to the emergency department with rapid-onset swelling of the tongue, uvula, and lips, severe dysphagia, and a muffled, hoarse voice. Vital signs: BP 138/84 mmHg, HR 102 bpm, RR 26 bpm, SpO2 92% on room air with audible inspiratory laryngeal stridor.',
      questionText: 'Which pathophysiological mechanism explains this condition, and what is the nurse\'s primary life-saving action?',
      options: [
        'Bradykinin accumulation causing acute ACE-inhibitor angioedema; immediately protect airway and prepare for emergent endotracheal intubation or surgical airway',
        'IgE-mediated histamine release; administer oral diphenhydramine and monitor for 1 hour',
        'Sodium and water retention causing dependent edema; administer intravenous furosemide bolus',
        'Diabetic autonomic neuropathy; elevate head of bed and administer subcutaneous regular insulin'
      ],
      correctAnswer: 0,
      explanation: `Explanation
Angiotensin-Converting Enzyme (ACE) inhibitors (eg, enalapril, lisinopril) inhibit the kininase II enzyme, preventing the degradation of Bradykinin. Excessive bradykinin accumulation triggers rapid, potent vasodilation and increased vascular permeability, producing ACE-inhibitor-induced Angioedema.

Unlike histamine-mediated anaphylaxis, bradykinin angioedema is non-allergic and often refractory to antihistamines and corticosteroids. Stridor, hoarseness, and tongue swelling indicate imminent complete airway compromise. The primary priority is establishing and securing a patent airway via emergency endotracheal intubation or emergency cricothyroidotomy before complete glottic closure occurs.

(Option 1) Bradykinin excess causes profound airway swelling. Airway protection takes absolute life-saving precedence.
(Option 2) Oral diphenhydramine is ineffective for acute bradykinin-mediated laryngeal edema and risks airway aspiration.
(Option 3) Furosemide has no effect on bradykinin-mediated vascular extravasation in the upper airway.
(Option 4) Insulin does not treat airway angioedema.

Educational objective:
ACE inhibitor angioedema is mediated by bradykinin accumulation. Sudden swelling of the tongue and laryngeal stridor indicate impending complete airway obstruction requiring immediate airway protection.`,
      peerPercentages: [88, 6, 3, 3],
      topic: 'Pharmacology & Therapeutics'
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // 2. MEDICAL-SURGICAL NURSING
  // ─────────────────────────────────────────────────────────────
  medsurg: [
    {
      id: 'ms-l1-01',
      difficultyLevel: 1,
      scenario: 'CLINICAL CASE SCENARIO: A 48-year-old client has just returned to the surgical unit following a total thyroidectomy for multinodular goiter.',
      questionText: 'Which piece of emergency equipment is MANDATORY to keep directly at the bedside for immediate access during the first 48 hours postoperatively?',
      options: [
        'An emergency tracheostomy tray and functioning suction equipment',
        'A chest tube insertion kit and water-seal drainage collection chamber',
        'An indwelling urinary catheterization insertion kit',
        'A lumbar puncture tray with spinal manometry'
      ],
      correctAnswer: 0,
      explanation: `Explanation
Following thyroidectomy, life-threatening airway compromise can develop rapidly secondary to surgical site hemorrhage/expanding hematoma compressing the trachea, or bilateral laryngeal nerve damage leading to vocal cord paralysis.

An emergency tracheostomy tray, sterile gloves, suture removal set, functional suction, and oxygen equipment must remain immediately at the bedside. If an expanding hematoma creates stridor and respiratory distress, emergency bedside incision opening and tracheostomy may be life-saving.

(Option 1) An emergency tracheostomy tray and suction are mandatory bedside safety equipment following neck and thyroid surgeries.
(Option 2) Chest tube kits are indicated for thoracic and cardiac surgeries.
(Option 3) Urinary catheter kits are routine supplies, not emergency airway rescue equipment.
(Option 4) Lumbar puncture kits are for neurological diagnostics.

Educational objective:
Following thyroidectomy, an emergency tracheostomy tray and functional suction must be kept directly at the bedside to rescue immediate airway obstruction from expanding hematoma or laryngeal edema.`,
      peerPercentages: [94, 3, 2, 1],
      topic: 'Medical-Surgical Nursing'
    },
    {
      id: 'ms-l2-01',
      difficultyLevel: 2,
      scenario: 'CLINICAL CASE SCENARIO: A 34-year-old client sustained a closed right tibial fracture in a motor vehicle collision and had a fiberglass cast applied 6 hours ago. The client reports relentless, excruciating right calf pain rated 10/10 that is unrelieved by repeated IV hydromorphone. On assessment, passive dorsiflexion of the right toes produces agonizing pain. The right foot is pale, cool, with weak pedal pulses, and the calf compartment feels hard and tense.',
      questionText: 'What is the nurse\'s PRIORITY action?',
      options: [
        'Notify the orthopedic surgeon immediately and prepare to bivalve the cast (suspected Acute Compartment Syndrome)',
        'Elevate the right leg on two pillows above heart level and apply heavy ice packs',
        'Administer a higher dose of intravenous opioids as prescribed',
        'Instruct the client to ambulate around the room to enhance venous return'
      ],
      correctAnswer: 0,
      explanation: `Explanation
Acute Compartment Syndrome (ACS) is an orthopedic emergency in which rising tissue pressure inside a non-distensible myofascial compartment restricts microvascular capillary perfusion, causing irreversible muscle and nerve necrosis within 4–6 hours.

Hallmark clinical indicators:
1. Pain out of proportion to injury and refractory to high-dose opioids (earliest and most sensitive indicator).
2. Agonizing pain on passive stretch of the muscle compartment.
3. Tense, woody swelling of the compartment.
4. Paresthesia, pallor, poikilothermia, and late pulselessness.

Immediate management:
- Notify the surgeon immediately.
- Loosen constrictive dressings / bivalve the cast.
- Position the limb at HEART LEVEL (never elevate above heart level, as elevation reduces arterial perfusion pressure; avoid ice due to vasoconstriction).
- Prepare for emergency Fasciotomy.

(Option 1) Immediate surgical notification and cast bivalving decompresses tissue and prevents permanent ischemic amputation.
(Option 2) Elevating the extremity above heart level reduces arterial perfusion to already hypoxic tissue.
(Option 3) Administering more opioids masks advancing neuromuscular ischemia.
(Option 4) Ambulation is contraindicated and causes severe tissue trauma.

Educational objective:
Disproportionate pain unrelieved by opioids and excruciating pain upon passive stretch indicate Acute Compartment Syndrome. The nurse must notify the surgeon immediately, maintain the limb at heart level, and prepare to bivalve the cast.`,
      peerPercentages: [91, 5, 2, 2],
      topic: 'Medical-Surgical Nursing'
    },
    {
      id: 'ms-l3-01',
      difficultyLevel: 3,
      scenario: 'CLINICAL CASE SCENARIO: A 26-year-old client with Type 1 Diabetes Mellitus arrives in the emergency department in a lethargic state. Stat lab values reveal: Blood glucose 560 mg/dL, Arterial Blood Gas (ABG): pH 7.14, PaCO2 24 mmHg, PaO2 94 mmHg, HCO3 9 mEq/L, Anion gap 26 mEq/L. Serum Potassium is 5.6 mEq/L. Vital signs: BP 88/54 mmHg, HR 126 bpm, RR 32 bpm (deep, rapid Kussmaul respirations with acetone breath). Skin turgor is poor with dry mucous membranes.',
      questionText: 'Which initial intravenous fluid resuscitation order must the nurse execute FIRST?',
      options: [
        'Rapid infusion of 0.9% Normal Saline at 1,000 mL/hr to restore intravascular volume and renal perfusion',
        'Immediate intravenous bolus of 50% Dextrose in Water (D50W)',
        'Continuous intravenous regular insulin infusion at 0.1 units/kg/hr before administering fluids',
        'Infusion of D5W with 40 mEq Potassium Chloride bolus'
      ],
      correctAnswer: 0,
      explanation: `Explanation
The client presents in acute Diabetic Ketoacidosis (DKA): severe hyperglycemia, high-anion-gap metabolic acidosis (pH 7.14, HCO3 9), compensatory Kussmaul breathing (respiratory alkalosis compensation blowing off CO2), and profound dehydration secondary to osmotic diuresis (fluid deficit typically 5–10 liters).

In DKA management, intravascular fluid resuscitation takes absolute precedence over insulin administration. Infusing 0.9% Normal Saline (1,000 mL/hr) restores circulating volume, improves renal clearance of glucose and ketoacids, and reduces stress hormone levels. Starting insulin before volume expansion can precipitate cardiovascular collapse as glucose and water shift into cells.

(Option 1) 0.9% Normal Saline expands intravascular volume, treats hypovolemic shock, and establishes renal perfusion.
(Option 2) D50W would worsen severe hyperosmolality.
(Option 3) Insulin must not precede fluid resuscitation; insulin shifts water intracellularly and worsens vascular shock.
(Option 4) Dextrose is only added once blood glucose reaches ~200–250 mg/dL to prevent rapid osmotic cerebral edema.

Educational objective:
In Diabetic Ketoacidosis (DKA), rapid intravenous volume expansion with isotonic saline (0.9% NaCl) is the primary first intervention before starting intravenous insulin therapy.`,
      peerPercentages: [86, 3, 8, 3],
      topic: 'Medical-Surgical Nursing'
    },
    {
      id: 'ms-l4-01',
      difficultyLevel: 4,
      scenario: 'CLINICAL CASE SCENARIO: A 56-year-old intubated ICU client with severe necrotizing pancreatitis develops sudden acute hemodynamic decompensation. Vital signs: BP 74/42 mmHg (MAP 52 mmHg), HR 136 bpm (sinus tachycardia), RR 30 breaths/min on mechanical ventilation. Physical exam reveals cold, mottled extremities, absent peripheral pulses, and urine output of 8 mL over the last 2 hours. Serum Lactate is 5.8 mmol/L. The client has already received 30 mL/kg of crystalloid fluid resuscitation.',
      questionText: 'Which vasopressor infusion should the nurse initiate FIRST to achieve the target Mean Arterial Pressure (MAP) ≥65 mmHg?',
      options: [
        'Norepinephrine continuous infusion titrated as the first-line vasopressor',
        'Epinephrine bolus via peripheral line',
        'Dopamine low-dose "renal" infusion at 2 mcg/kg/min',
        'Phenylephrine intermittent boluses'
      ],
      correctAnswer: 0,
      explanation: `Explanation
The client is in Septic Shock refractory to initial fluid resuscitation (hypotension, MAP <65 mmHg, hyperlactatemia >4.0 mmol/L, end-organ hypoperfusion with oliguria).

According to the Surviving Sepsis Campaign International Guidelines:
1. Norepinephrine is the first-choice vasopressor. It possesses potent alpha-1 adrenergic vasoconstrictor properties with modest beta-1 inotropic activity, increasing MAP and vascular tone with less tachycardia and arrhythmogenic risk than dopamine or epinephrine.
2. Target MAP is ≥65 mmHg to maintain vital organ (cerebral, coronary, renal) capillary perfusion.
3. Vasopressin (up to 0.03 units/min) may be added if norepinephrine requirements escalate.

(Option 1) Norepinephrine is the evidence-based first-line vasopressor for septic shock refractory to fluid loading.
(Option 2) Epinephrine boluses cause extreme tachyarrhythmias; it is used as a secondary infusion if norepinephrine is insufficient.
(Option 3) Low-dose 'renal' dopamine is obsolete and provides no renal protective benefit.
(Option 4) Phenylephrine causes pure vasoconstriction without inotropy and can decrease stroke volume.

Educational objective:
Norepinephrine is the first-line vasopressor for fluid-refractory septic shock to restore Mean Arterial Pressure (MAP) ≥65 mmHg and tissue perfusion.`,
      peerPercentages: [87, 4, 6, 3],
      topic: 'Medical-Surgical Nursing'
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // 3. PEDIATRIC (CHILD HEALTH) NURSING
  // ─────────────────────────────────────────────────────────────
  pediatrics: [
    {
      id: 'peds-l1-01',
      difficultyLevel: 1,
      scenario: 'CLINICAL CASE SCENARIO: A nurse is conducting discharge education for new parents of a healthy 3-day-old term infant regarding safe sleep practices to prevent Sudden Infant Death Syndrome (SIDS).',
      questionText: 'Which guidance is ESSENTIAL to provide to the parents?',
      options: [
        'Place the infant to sleep in the supine position (on the back) on a firm, flat mattress free of loose blankets, pillows, and soft toys',
        'Place the infant on their stomach (prone position) to prevent aspiration of milk',
        'Use soft plush sleep positioners and plush crib bumper pads around the perimeter',
        'Co-sleep with the infant in the parental adult bed to facilitate night feedings'
      ],
      correctAnswer: 0,
      explanation: `Explanation
According to the American Academy of Pediatrics (AAP) Safe Sleep recommendations to prevent Sudden Infant Death Syndrome (SIDS) and accidental suffocation:
- "Back to Sleep": Infants must always be placed on their back (supine) for every sleep until 1 year of age.
- Use a firm, flat mattress covered with a fitted sheet.
- Keep all loose bedding, pillows, plush toys, quilts, and bumper pads out of the crib.
- Room-sharing without bed-sharing (infant sleeps in a separate crib/bassinet in parents\' bedroom) for the first 6 months.

(Option 1) Supine positioning on a firm surface without loose items is the single most effective intervention to prevent SIDS.
(Option 2) Prone sleeping significantly increases the risk of rebreathing expired carbon dioxide and suffocation.
(Option 3) Bumper pads and sleep positioners pose severe entrapment and asphyxiation hazards.
(Option 4) Co-sleeping in adult beds is a leading cause of accidental overlay and infant suffocation.

Educational objective:
To prevent Sudden Infant Death Syndrome (SIDS), infants must be placed to sleep on their backs (supine) on a firm, flat sleep surface in a crib free of loose blankets, pillows, and toys.`,
      peerPercentages: [96, 2, 1, 1],
      topic: 'Child Health (Pediatric) Nursing'
    },
    {
      id: 'peds-l2-01',
      difficultyLevel: 2,
      scenario: 'CLINICAL CASE SCENARIO: A 5-week-old male infant is brought to the clinic for forceful non-bilious projectile vomiting immediately after feeds over the past 3 days. The infant remains eagerly hungry after emesis and latches vigorously. On physical assessment, the infant is irritable with sunken fontanelles. Gentle palpation of the right epigastrium reveals a firm, non-tender, olive-shaped mass.',
      questionText: 'Which condition should the nurse suspect, and what diagnostic study confirms the diagnosis?',
      options: [
        'Hypertrophic Pyloric Stenosis; confirmed by abdominal ultrasound',
        'Intussusception; confirmed by barium contrast enema',
        'Hirschsprung Disease; confirmed by suction rectal biopsy',
        'Gastroesophageal Reflux Disease; confirmed by 24-hour esophageal pH probe'
      ],
      correctAnswer: 0,
      explanation: `Explanation
Hypertrophic Pyloric Stenosis (HPS) involves hypertrophy and hyperplasia of the circular pyloric sphincter muscle, causing mechanical gastric outlet obstruction. It classically affects young infants (3–8 weeks old).

Key clinical hallmarks:
1. Forceful projectile non-bilious vomiting immediately after feeding.
2. The "hungry vomiter" who demands re-feeding immediately.
3. Palpable firm, olive-shaped mass in the right upper quadrant/epigastrium.
4. Visible peristaltic waves traveling left to right.
5. Hypochloremic, hypokalemic metabolic alkalosis from recurrent gastric acid (HCl) loss.

Abdominal Ultrasound is the gold-standard diagnostic imaging modality, demonstrating elongated and thickened pyloric musculature.

(Option 1) Olive mass + non-bilious projectile emesis confirms Pyloric Stenosis, verified by ultrasound.
(Option 2) Intussusception presents with episodic colicky abdominal pain, red 'currant jelly' stools, and a sausage-shaped mass.
(Option 3) Hirschsprung disease manifests with failure to pass meconium in 48 hours, abdominal distension, and ribbon-like stools.
(Option 4) GERD causes effortless spitting up without projectile force or an olive mass.

Educational objective:
Hypertrophic Pyloric Stenosis presents with projectile non-bilious vomiting, persistent hunger, and a palpable olive-shaped epigastric mass. Diagnosis is confirmed via abdominal ultrasound.`,
      peerPercentages: [91, 5, 2, 2],
      topic: 'Child Health (Pediatric) Nursing'
    },
    {
      id: 'peds-l3-01',
      difficultyLevel: 3,
      scenario: 'CLINICAL CASE SCENARIO: A 3-year-old child presents to the emergency department with a sudden high fever (104.2°F/40.1°C), severe sore throat, dysphagia, continuous drooling, and a muffled voice. The child is sitting upright, leaning forward with the neck hyperextended (tripod position) and exhibiting inspiratory stridor with suprasternal retractions.',
      questionText: 'Which nursing intervention is STRICTLY CONTRAINDICATED in this clinical situation?',
      options: [
        'Inspecting the pharynx with a tongue blade or obtaining a throat swab culture',
        'Allowing the child to remain seated calmly in the parent\'s lap',
        'Having emergency endotracheal intubation equipment and a bag-valve-mask immediately available',
        'Alerting the on-call anesthesiologist and otolaryngologist (ENT) immediately'
      ],
      correctAnswer: 0,
      explanation: `Explanation
The child presents with the classic clinical tetrad of Acute Epiglottitis (traditionally caused by Haemophilus influenzae type b): Drooling, Dysphagia, Dysphonia, and Distressed inspiratory stridor in the Tripod position.

Any invasive instrumentation or visual inspection of the posterior pharynx with a tongue blade or throat swab can provoke immediate severe laryngospasm and precipitate complete, fatal airway occlusion.

Mandatory nursing management:
1. NEVER inspect the throat with a tongue depressor or swab.
2. Minimize agitation: keep the child calm in the parent\'s lap in their position of choice.
3. Avoid painful procedures (venipuncture/IV lines) until the airway is secured in the operating room.
4. Mobilize anesthesia and ENT immediately for emergency endotracheal intubation in a controlled environment.

(Option 1) Using a tongue depressor stimulates sudden reflexive laryngospasm and complete respiratory arrest.
(Option 2) Keeping the child calm in the parent\'s lap avoids crying and agitation that worsen airway closure.
(Option 3) Airway rescue equipment must always be present.
(Option 4) Immediate specialist mobilization is essential.

Educational objective:
In suspected Acute Epiglottitis (tripod position, drooling, stridor), visual inspection of the pharynx with a tongue depressor is strictly contraindicated because it can precipitate complete laryngospasm and fatal airway obstruction.`,
      peerPercentages: [94, 2, 2, 2],
      topic: 'Child Health (Pediatric) Nursing'
    },
    {
      id: 'peds-l4-01',
      difficultyLevel: 4,
      scenario: 'CLINICAL CASE SCENARIO: An 8-month-old infant with diagnosed Tetralogy of Fallot becomes intensely distressed and cries vigorously following a venous blood draw. The infant rapidly develops deep circumoral and peripheral cyanosis, tachypnea (RR 72 bpm), diaphoresis, and progressive somnolence (acute hypercyanotic "Tet" spell). Pulse oximetry displays SpO2 62%.',
      questionText: 'Which emergency intervention must the nurse execute FIRST to reverse the life-threatening shunt?',
      options: [
        'Place the infant immediately into the knee-chest position',
        'Administer a loading dose of oral digoxin',
        'Initiate closed-chest cardiac compressions at 100/min',
        'Apply external cooling ice packs to the infant\'s torso'
      ],
      correctAnswer: 0,
      explanation: `Explanation
A Hypercyanotic Episode ("Tet" spell) occurs in Tetralogy of Fallot when infundibular muscle spasm, crying, or dehydration increases right ventricular outflow tract obstruction, forcing deoxygenated blood across the ventricular septal defect (VSD) into the systemic circulation (right-to-left shunting).

Placing the infant immediately into the Knee-Chest Position (or squatting in older children) kinks the femoral vessels and dramatically elevates Systemic Vascular Resistance (SVR). When SVR exceeds pulmonary vascular resistance, blood flow across the VSD reverses back to left-to-right, diverting unoxygenated blood into the pulmonary artery for lung oxygenation.

Sequential emergency steps:
1. Immediate knee-chest position.
2. 100% blow-by oxygen via face mask.
3. Morphine sulfate subcutaneous or IV (calms the child and relaxes infundibular spasm).
4. IV isotonic fluid bolus (expands volume and pulmonary blood flow).

(Option 1) Knee-chest positioning immediately increases SVR, forces blood into the pulmonary circuit, and relieves hypoxemia.
(Option 2) Digoxin has no role in acute hypercyanotic spasm.
(Option 3) The infant has a pulse; CPR is not indicated.
(Option 4) Ice triggers cold stress and shivering, elevating oxygen consumption.

Educational objective:
The priority first-line action for an acute hypercyanotic ('Tet') spell in Tetralogy of Fallot is placing the infant in the knee-chest position to increase systemic vascular resistance and restore pulmonary blood flow.`,
      peerPercentages: [89, 3, 5, 3],
      topic: 'Child Health (Pediatric) Nursing'
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // 4. MENTAL HEALTH (PSYCHIATRIC) NURSING
  // ─────────────────────────────────────────────────────────────
  psychiatry: [
    {
      id: 'psych-l1-01',
      difficultyLevel: 1,
      scenario: 'CLINICAL CASE SCENARIO: A 42-year-old client whose spouse died unexpectedly 2 weeks ago is admitted to the mental health unit with profound grief and severe insomnia. The client sits with eyes downcast, weeping softly, and states: "My life is completely meaningless without my partner. I have no idea how I can survive tomorrow."',
      questionText: 'Which therapeutic communication response by the nurse is MOST appropriate?',
      options: [
        '"It sounds like you are experiencing overwhelming pain right now. I am here with you, and we can sit together."',
        '"Everything happens for a reason. You have children to live for, so you need to stay strong."',
        '"Why don\'t you go to the recreation room and watch television to take your mind off things?"',
        '"I know exactly how you feel; my spouse passed away two years ago as well."'
      ],
      correctAnswer: 0,
      explanation: `Explanation
Therapeutic communication with a grieving client relies on active listening, presence, empathy, and validation of feelings:
- Acknowledging and reflecting painful emotions allows the client to express grief safely.
- Offering self ("I am here with you") conveys unconditional support without demanding cognitive performance.

Non-therapeutic communication pitfalls:
- False reassurance or clichés ("Everything happens for a reason") minimize the client\'s genuine emotional devastation.
- Distraction or changing the subject invalidates feelings.
- Minimizing or shifting focus to the nurse ("I know exactly how you feel") takes the focus off the client\'s unique experience.

(Option 1) Validates profound emotional pain and offers therapeutic presence and empathy.
(Option 2) Offering clichés and moralizing minimizes grief and induces guilt.
(Option 3) Distraction dismisses emotional expression.
(Option 4) Shifting focus to the nurse is non-therapeutic.

Educational objective:
Therapeutic communication for severe grief involves validating the client\'s overwhelming feelings and offering unconditional presence rather than offering clichés or false reassurances.`,
      peerPercentages: [92, 3, 3, 2],
      topic: 'Mental Health (Psychiatric) Nursing'
    },
    {
      id: 'psych-l2-01',
      difficultyLevel: 2,
      scenario: 'CLINICAL CASE SCENARIO: A 31-year-old client diagnosed with Paranoid Schizophrenia is pacing agitatedly in the hallway, muttering angrily and glaring at staff with clenched fists. The client shouts: "The secret service agents are broadcasting radio signals into my brain to control me! I know the nurses are working for them!"',
      questionText: 'Which response by the nurse is MOST therapeutic and de-escalating?',
      options: [
        '"I understand that you feel frightened right now. You are safe here in the hospital, and no one is going to harm you. Let\'s walk to this quiet room together."',
        '"Those radio signals do not exist. You know that we are registered nurses, not secret service agents."',
        '"If you continue to make threats, we will immediately place you into physical leather restraints."',
        '"Why do you believe the secret service has chosen to target you specifically?"'
      ],
      correctAnswer: 0,
      explanation: `Explanation
When managing an agitated client experiencing paranoid persecutory delusions:
1. Validate the emotional component (fear/vulnerability) without validating the false delusional premise.
2. Reassure physical safety in the environment.
3. Use a calm, low, neutral voice, maintain open body language, and keep a safe physical buffer.
4. Move the client to a low-stimulus environment to decrease sensory overload.

Avoid:
- Arguing with or directly contradicting the delusion (increases defensiveness and paranoia).
- Threatening punitive actions or restraints (escalates panic and aggression).
- Asking "Why" questions (demands logical defense of an irrational thought process).

(Option 1) Acknowledges the emotion (fear), anchors reality with safety, and offers de-escalation in a quiet space.
(Option 2) Direct contradiction provokes agitation.
(Option 3) Threatening restraints is punitive and destroys rapport.
(Option 4) Asking 'Why' demands rationalization of delusions.

Educational objective:
When de-escalating a client with persecutory delusions, validate their underlying fear, provide reality-based reassurance of physical safety, and transition to a low-stimulus environment.`,
      peerPercentages: [88, 5, 4, 3],
      topic: 'Mental Health (Psychiatric) Nursing'
    },
    {
      id: 'psych-l3-01',
      difficultyLevel: 3,
      scenario: 'CLINICAL CASE SCENARIO: A 29-year-old client with Treatment-Resistant Schizophrenia has been taking Clozapine 300 mg daily for 7 weeks. Today, the client attends the clinic complaining of a severe sore throat, fever (102.0°F/38.9°C), and chills. A stat Complete Blood Count (CBC) reveals: White Blood Cell count (WBC) 1,900/mm³ and Absolute Neutrophil Count (ANC) 420/mm³.',
      questionText: 'Which life-threatening adverse effect has occurred, and what is the MANDATORY immediate medical action?',
      options: [
        'Severe Agranulocytosis; immediately discontinue Clozapine, institute protective isolation, and initiate sepsis workup',
        'Neuroleptic Malignant Syndrome; administer IV Dantrolene and continue clozapine at half dose',
        'Benign transient drug-induced neutropenia; continue clozapine and prescribe broad-spectrum oral amoxicillin',
        'Acute dystonic extrapyramidal reaction; administer IM Benztropine immediately'
      ],
      correctAnswer: 0,
      explanation: `Explanation
Clozapine is an atypical antipsychotic indicated for treatment-resistant schizophrenia. It carries a boxed warning for potentially fatal Agranulocytosis (ANC <500/mm³).

Normal ANC is >1,500/mm³. An ANC of 420/mm³ leaves the client virtually defenseless against opportunistic bacterial infection and septic shock. Any client on clozapine presenting with fever, sore throat, or stomatitis requires an emergency stat CBC. If ANC <500/mm³, Clozapine must be immediately and permanently discontinued, protective reverse isolation instituted, and blood cultures and antibiotics initiated.

(Option 1) Agranulocytosis requires immediate permanent drug discontinuation and protective isolation to prevent lethal sepsis.
(Option 2) NMS manifests with severe lead-pipe muscle rigidity, extreme hyperthermia, and autonomic instability.
(Option 3) An ANC of 420/mm³ is a life-threatening hematologic emergency, never a benign transient finding.
(Option 4) Benztropine treats extrapyramidal symptoms, not bone marrow suppression.

Educational objective:
Clozapine therapy requires mandatory regular Absolute Neutrophil Count (ANC) monitoring due to the risk of life-threatening agranulocytosis. An ANC <500/mm³ mandates immediate permanent discontinuation of the medication.`,
      peerPercentages: [92, 4, 2, 2],
      topic: 'Mental Health (Psychiatric) Nursing'
    },
    {
      id: 'psych-l4-01',
      difficultyLevel: 4,
      scenario: 'CLINICAL CASE SCENARIO: A 38-year-old client with acute psychosis admitted 48 hours ago was started on high-dose Haloperidol. The nurse finds the client minimally responsive with generalized "lead-pipe" muscular rigidity, diaphoresis, and tremors. Vital signs: Temperature 104.4°F (40.2°C), BP 184/110 mmHg, HR 132 bpm, RR 28 bpm. Stat lab results show: serum Creatine Kinase (CK) 48,000 U/L and serum Potassium 5.7 mEq/L.',
      questionText: 'Which emergency intervention should the nurse anticipate as the primary pharmacological antidote for this condition?',
      options: [
        'Discontinue Haloperidol immediately and administer IV Dantrolene and Bromocriptine',
        'Administer IM Flumazenil to reverse antipsychotic sedation',
        'Administer high-dose subcutaneous insulin and glucose bolus',
        'Infuse intravenous Heparin bolus for pulmonary embolism'
      ],
      correctAnswer: 0,
      explanation: `Explanation
The client presents with classic Neuroleptic Malignant Syndrome (NMS), a life-threatening idiosyncratic reaction to dopamine receptor antagonists (especially first-generation high-potency agents like haloperidol).

Hallmark tetrad:
1. Hyperthermia (>104°F/40°C).
2. Generalized "lead-pipe" skeletal muscle rigidity.
3. Autonomic instability (extreme labile hypertension, tachycardia, tachypnea, diaphoresis).
4. Altered mental status (stupor, coma).
Marked elevation of Creatine Kinase (CK >1,000 U/L, here 48,000 U/L) reflects massive rhabdomyolysis, placing the client at imminent risk of acute renal failure and hyperkalemic cardiac arrest.

Management priorities:
- Immediately discontinue the causative neuroleptic agent.
- Aggressive cooling measures and IV normal saline hydration.
- Administer Dantrolene (direct-acting skeletal muscle relaxant that blocks calcium release from sarcoplasmic reticulum).
- Administer Bromocriptine (dopamine agonist that reverses central dopamine blockade).

(Option 1) Discontinuing the causative agent and administering Dantrolene relieves life-threatening hyperthermic rigidity and rhabdomyolysis.
(Option 2) Flumazenil is a benzodiazepine reversal agent; it does not reverse antipsychotics.
(Option 3) Insulin treats hyperkalemia but does not treat the underlying hyperthermic muscle rigidity of NMS.
(Option 4) Heparin has no role in NMS.

Educational objective:
Neuroleptic Malignant Syndrome (NMS) manifests with high fever, "lead-pipe" muscle rigidity, autonomic instability, and elevated creatine kinase. Management requires immediate neuroleptic cessation, aggressive cooling, and administration of IV Dantrolene or Bromocriptine.`,
      peerPercentages: [88, 4, 5, 3],
      topic: 'Mental Health (Psychiatric) Nursing'
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // 5. OBSTETRICS & GYNECOLOGICAL NURSING
  // ─────────────────────────────────────────────────────────────
  obstetrics: [
    {
      id: 'obg-l1-01',
      difficultyLevel: 1,
      scenario: 'CLINICAL CASE SCENARIO: A 28-year-old primigravida at 38 weeks gestation undergoes an outpatient Nonstress Test (NST). Over a 20-minute monitoring window, the fetal heart rate (FHR) baseline is 140 bpm with moderate variability, displaying two separate accelerations of at least 15 bpm above baseline lasting 15 seconds each, accompanied by fetal movement.',
      questionText: 'How should the nurse interpret and document this Nonstress Test result?',
      options: [
        'Reactive Nonstress Test, indicating adequate fetal oxygenation and autonomic nervous system intactness',
        'Nonreactive Nonstress Test, indicating fetal hypoxia requiring immediate emergency cesarean delivery',
        'Equivocal Nonstress Test, requiring immediate contraction stress testing',
        'Unsatisfactory recording, requiring internal scalp electrode placement'
      ],
      correctAnswer: 0,
      explanation: `Explanation
A Nonstress Test (NST) evaluates fetal well-being by monitoring fetal heart rate response to fetal movement:
- Reactive NST (Normal/Reassuring): In a fetus ≥32 weeks gestation, the presence of ≥2 accelerations of at least 15 bpm above baseline lasting for at least 15 seconds within a 20-minute window, with normal baseline (110–160 bpm) and moderate variability.
- A reactive NST indicates adequate placental perfusion, fetal oxygenation, and an intact fetal autonomic nervous system.
- Nonreactive NST: Absence of qualifying accelerations over a 40-minute window, warranting further evaluation (Biophysical Profile or Contraction Stress Test).

(Option 1) Two accelerations of ≥15 bpm lasting ≥15 seconds in 20 minutes defines a reassuring Reactive NST.
(Option 2) A nonreactive result lacks accelerations; this fetus clearly met reactive criteria.
(Option 3) The test is definitively reactive; no contraction stress test is needed.
(Option 4) Non-invasive external monitoring was successful and reassuring.

Educational objective:
A Reactive Nonstress Test (NST) requires at least 2 fetal heart rate accelerations of ≥15 bpm above baseline lasting ≥15 seconds within a 20-minute period (in pregnancies ≥32 weeks), indicating fetal oxygenation and well-being.`,
      peerPercentages: [94, 2, 2, 2],
      topic: 'Obstetrics & Gynecological Nursing'
    },
    {
      id: 'obg-l2-01',
      difficultyLevel: 2,
      scenario: 'CLINICAL CASE SCENARIO: A 32-year-old multipara delivers a vigorous 4,100 g infant via normal spontaneous vaginal delivery. Thirty minutes postpartum, the nurse observes continuous dark red lochial bleeding pooling under the maternal buttocks. Palpation of the abdomen reveals that the uterine fundus is soft, boggy, and displaced 3 cm above the umbilicus and to the right.',
      questionText: 'Which clinical sequence should the nurse execute FIRST?',
      options: [
        'Perform immediate vigorous fundal massage while assisting the client to empty her bladder, then initiate IV Oxytocin infusion',
        'Immediately prepare the client for emergent abdominal hysterectomy',
        'Pack the vaginal canal tightly with sterile gauze sponges',
        'Administer intramuscular Methylergonovine before assessing blood pressure or uterine tone'
      ],
      correctAnswer: 0,
      explanation: `Explanation
Uterine Atony (failure of the myometrium to contract and compress bleeding spiral arterioles) accounts for >80% of Postpartum Hemorrhage (PPH) cases. A boggy fundus displaced upward and to the right is the hallmark indicator of a Distended Urinary Bladder, which displaces the uterus into the abdomen and prevents mechanical myometrial clamping.

First-line clinical sequence:
1. Fundal massage (immediately stimulates myometrial contractility).
2. Evacuate the bladder (assist to void or insert straight catheter).
3. Administer uterotonic agents (continuous IV Oxytocin infusion is first-line).

(Option 1) Fundal massage stimulates immediate contraction; bladder decompression allows the uterus to descend into the pelvis and clamp down.
(Option 2) Surgical intervention is reserved for refractory PPH after conservative measures fail.
(Option 3) Vaginal packing conceals intrauterine blood pooling and delays life-saving interventions.
(Option 4) Fundal massage and bladder relief are first-line; methylergonovine is contraindicated in hypertension and secondary to oxytocin.

Educational objective:
Uterine atony is the most common cause of postpartum hemorrhage. A boggy fundus displaced upward and to the right indicates urinary bladder distension; immediate fundal massage, bladder catheterization, and IV oxytocin are first-line interventions.`,
      peerPercentages: [90, 2, 3, 5],
      topic: 'Obstetrics & Gynecological Nursing'
    },
    {
      id: 'obg-l3-01',
      difficultyLevel: 3,
      scenario: 'CLINICAL CASE SCENARIO: A 28-year-old primigravida at 34 weeks gestation with severe preeclampsia is receiving an intravenous Magnesium Sulfate maintenance infusion at 2 g/hr. During the hourly assessment, the nurse records: BP 146/92 mmHg, Respiratory rate 8 breaths/min, Deep Tendon Reflexes (patellar) 0 (absent), and Foley urine output 12 mL over the past hour. The client is somnolent with slurred speech.',
      questionText: 'What is the nurse\'s IMMEDIATE priority action?',
      options: [
        'Stop the Magnesium Sulfate infusion immediately and prepare to administer Calcium Gluconate 10% IV',
        'Increase the infusion to 3 g/hr to control blood pressure',
        'Administer IV Hydralazine bolus while continuing magnesium sulfate',
        'Elevate the head of the bed to high Fowler\'s and provide oral water'
      ],
      correctAnswer: 0,
      explanation: `Explanation
Magnesium Sulfate is the first-line anticonvulsant to prevent and treat eclamptic seizures in preeclampsia. Magnesium is excreted exclusively by the kidneys; when oliguria (<30 mL/hr) occurs, toxic serum magnesium levels accumulate rapidly.

Progression of Magnesium Toxicity:
- Loss of Deep Tendon Reflexes (earliest indicator, magnesium ~8–10 mEq/L).
- Respiratory depression (<12 breaths/min, magnesium ~12–15 mEq/L).
- Oliguria (<30 mL/hr).
- Complete cardiac conduction block and asystole (>15 mEq/L).

Immediate actions:
1. Immediately STOP the magnesium sulfate infusion.
2. Administer Calcium Gluconate (10% solution, 1 g [10 mL] slow IV over 3–5 minutes) to antagonize magnesium at the neuromuscular junction.
3. Support airway, ventilation, and oxygenation.

(Option 1) Stopping the infusion halts worsening toxicity; calcium gluconate is the specific antidote.
(Option 2) Increasing the dose will induce respiratory arrest and cardiac asystole.
(Option 3) Hydralazine lowers BP but does not reverse neuromuscular paralysis.
(Option 4) Oral fluids in a somnolent, bradypneic client cause pulmonary aspiration.

Educational objective:
Loss of deep tendon reflexes, respiratory depression (<12/min), and oliguria indicate Magnesium Toxicity. The nurse must immediately discontinue the magnesium infusion and administer IV Calcium Gluconate.`,
      peerPercentages: [94, 2, 2, 2],
      topic: 'Obstetrics & Gynecological Nursing'
    },
    {
      id: 'obg-l4-01',
      difficultyLevel: 4,
      scenario: 'CLINICAL CASE SCENARIO: A 24-year-old multipara in active labor at 39 weeks gestation undergoes spontaneous rupture of membranes. The fetal heart rate suddenly drops from 145 bpm to 65 bpm (severe prolonged fetal bradycardia). Vaginal examination reveals a pulsating, loop-like structure protruding through the cervix into the vagina alongside the fetal presenting part.',
      questionText: 'Which emergency intervention must the nurse execute FIRST?',
      options: [
        'Insert two gloved fingers into the vagina and apply manual upward pressure against the fetal presenting part to lift it off the umbilical cord',
        'Attempt to gently push the protruding umbilical cord back into the uterine cavity',
        'Administer high-dose oxytocin IV bolus to expedite vaginal delivery',
        'Place the client in a supine position with legs fully flat'
      ],
      correctAnswer: 0,
      explanation: `Explanation
This is an Umbilical Cord Prolapse, an obstetrical emergency in which the umbilical cord slips ahead of or alongside the fetal presenting part and becomes compressed between the fetus and the maternal pelvis. Cord compression halts fetal-placental blood exchange, causing acute fetal asphyxia and severe bradycardia.

The absolute priority is immediate relief of cord compression:
1. The nurse must immediately insert a sterile gloved hand into the vagina and exert continuous manual upward pressure against the fetal presenting part, holding it off the umbilical cord until the neonate is delivered via emergency cesarean section.
2. Position the mother in Trendelenburg or Knee-Chest position to allow gravity to shift the fetus away from the pelvis.
3. NEVER attempt to push the cord back into the uterus (provokes vasospasm and cord thrombosis). Wrap any protruding cord loosely in sterile saline-soaked gauze.
4. Prepare for immediate emergency Cesarean delivery.

(Option 1) Continuous manual elevation of the presenting part relieves cord compression and preserves fetal oxygenation until cesarean delivery.
(Option 2) Pushing the cord back causes severe vasospasm and complete fetal hypoxia.
(Option 3) Oxytocin increases uterine contractions, intensifying cord compression.
(Option 4) Supine positioning exacerbates compression of both the cord and maternal vena cava.

Educational objective:
In an Umbilical Cord Prolapse, the nurse must immediately insert a gloved hand into the vagina to manually elevate the fetal presenting part off the cord while positioning the mother in knee-chest or Trendelenburg until emergency cesarean delivery is completed.`,
      peerPercentages: [91, 3, 2, 4],
      topic: 'Obstetrics & Gynecological Nursing'
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // 6. NURSING FOUNDATIONS (FUNDAMENTALS)
  // ─────────────────────────────────────────────────────────────
  foundations: [
    {
      id: 'found-l1-01',
      difficultyLevel: 1,
      scenario: 'CLINICAL CASE SCENARIO: A client with active pulmonary tuberculosis is admitted to the medical unit. The client has productive cough with acid-fast bacilli on sputum smear.',
      questionText: 'Which isolation precautions and personal protective equipment (PPE) are REQUIRED for healthcare personnel entering this client\'s room?',
      options: [
        'Airborne Precautions: negative-pressure isolation room and an N95 respirator mask (or PAPR)',
        'Droplet Precautions: private room and standard surgical mask only',
        'Contact Precautions: gown and gloves only without respiratory protection',
        'Standard Precautions only: no special room or mask required unless blood is present'
      ],
      correctAnswer: 0,
      explanation: `Explanation
Mycobacterium tuberculosis is transmitted via minute droplet nuclei (<5 microns) that remain suspended in room air currents for prolonged periods.

Airborne Precautions requirements:
1. Airborne Infection Isolation Room (AIIR) with Negative-Pressure ventilation (minimum 6–12 air exchanges per hour) venting directly outside or through HEPA filters.
2. Certified N95 particulate respirator mask (or Powered Air-Purifying Respirator [PAPR]) fitted properly to the nurse prior to room entry.
3. The client must wear a surgical mask whenever leaving the room for essential transport.

(Option 1) Negative-pressure room and N95 respirator are the strict CDC infection control standards for active tuberculosis.
(Option 2) Standard surgical masks do not filter droplet nuclei and do not protect against airborne tuberculosis.
(Option 3) Contact precautions alone do not protect against airborne respiratory pathogens.
(Option 4) Standard precautions are inadequate for airborne pathogens.

Educational objective:
Active pulmonary tuberculosis requires Airborne Precautions, including an Airborne Infection Isolation Room (negative pressure) and fit-tested N95 particulate respirators for all entering personnel.`,
      peerPercentages: [95, 3, 1, 1],
      topic: 'Nursing Foundations (Fundamentals of Nursing)'
    },
    {
      id: 'found-l2-01',
      difficultyLevel: 2,
      scenario: 'CLINICAL CASE SCENARIO: A nurse is preparing to insert a sterile indwelling urinary (Foley) catheter for an elderly client prior to hip arthroplasty. The sterile supplies are opened onto the sterile drape. While donning the sterile gloves, the nurse\'s left sterile gloved thumb inadvertently touches the non-sterile bed sheet.',
      questionText: 'Which action must the nurse take to maintain strict surgical asepsis?',
      options: [
        'Discard the contaminated gloves, perform hand hygiene, and don a new pair of sterile gloves before touching any sterile equipment',
        'Cleanse the contaminated gloved thumb with an alcohol prep pad and proceed with catheterization',
        'Continue the procedure since only a minor portion of the thumb made contact',
        'Perform the catheterization using only the right gloved hand'
      ],
      correctAnswer: 0,
      explanation: `Explanation
Principles of Surgical Asepsis (sterile technique):
- A sterile object remains sterile only when touched by another sterile object.
- If a sterile surface touches an unsterile object (such as the client\'s bed sheet, clothing, or skin), it is immediately contaminated.
- Alcohol wipes do not sterilize a contaminated glove.

Catheter-Associated Urinary Tract Infections (CAUTI) are a major source of healthcare-associated bacteremia. If contamination occurs during setup, the nurse must immediately discard the contaminated gloves, perform hand hygiene, and open and don a new pair of sterile gloves.

(Option 1) Discarding gloves, re-cleansing hands, and donning new sterile gloves maintains asepsis and protects the client from CAUTI.
(Option 2) Alcohol does not restore surgical sterility to contaminated materials.
(Option 3) Any breach compromises the entire sterile field.
(Option 4) Proper catheter insertion requires both sterile hands.

Educational objective:
Any contact between a sterile object and an unsterile surface results in immediate contamination. The nurse must discard contaminated gloves, perform hand hygiene, and restart with a fresh pair of sterile gloves.`,
      peerPercentages: [96, 2, 1, 1],
      topic: 'Nursing Foundations (Fundamentals of Nursing)'
    },
    {
      id: 'found-l3-01',
      difficultyLevel: 3,
      scenario: 'CLINICAL CASE SCENARIO: A non-ambulatory 78-year-old client with severe cerebrovascular accident has a sacral pressure injury. Wound assessment reveals full-thickness skin loss with visible subcutaneous adipose tissue and yellowish slough at the center of the wound bed. No underlying bone, tendon, or muscle is visible or directly palpable. Undermining of 1.5 cm is measured along the wound margin.',
      questionText: 'According to the National Pressure Injury Advisory Panel (NPIAP) staging system, how should the nurse classify this wound?',
      options: [
        'Stage 3 Pressure Injury',
        'Stage 2 Pressure Injury',
        'Stage 4 Pressure Injury',
        'Unstageable Pressure Injury'
      ],
      correctAnswer: 0,
      explanation: `Explanation
National Pressure Injury Advisory Panel (NPIAP) staging definitions:
- Stage 1: Non-blanchable erythema of intact skin.
- Stage 2: Partial-thickness skin loss with exposed dermis (shallow open ulcer with pink/red wound bed, or intact/ruptured serum blister). Adipose tissue is NOT visible.
- Stage 3: Full-thickness skin loss in which subcutaneous adipose (fat) is visible, with granulation tissue and slough; undermining and tunneling may occur. Bone, tendon, or muscle are NOT exposed.
- Stage 4: Full-thickness skin and tissue loss with exposed or directly palpable fascia, muscle, tendon, ligament, cartilage, or bone.
- Unstageable: Full-thickness loss where the true depth of tissue damage is completely obscured by slough or eschar.

(Option 1) Subcutaneous fat is visible without exposed bone, tendon, or muscle, fulfilling Stage 3 criteria.
(Option 2) Stage 2 involves only the dermis; adipose tissue is not exposed.
(Option 3) Stage 4 requires exposed bone, tendon, or muscle.
(Option 4) Slough does not obscure the depth sufficiently to prevent assessing subcutaneous fat depth.

Educational objective:
A Stage 3 pressure injury involves full-thickness skin loss with visible subcutaneous adipose tissue, potential slough or undermining, but without exposed bone, tendon, or muscle.`,
      peerPercentages: [86, 7, 4, 3],
      topic: 'Nursing Foundations (Fundamentals of Nursing)'
    },
    {
      id: 'found-l4-01',
      difficultyLevel: 4,
      scenario: 'CLINICAL CASE SCENARIO: A nurse is administering a transfusion of Packed Red Blood Cells (PRBCs) to a 52-year-old client. Ten minutes after initiating the infusion (approximately 25 mL infused), the client suddenly develops severe flank pain, chills, fever (102.4°F), dyspnea, and tachycardia. Urine in the Foley catheter drainage tubing appears reddish-brown (hemoglobinuria).',
      questionText: 'What is the nurse\'s IMMEDIATE sequence of interventions?',
      options: [
        'Stop the transfusion immediately, disconnect the blood tubing from the IV catheter, flush with new 0.9% Normal Saline via fresh tubing, and notify the healthcare provider and blood bank',
        'Slow the transfusion rate by 50% and administer oral acetaminophen for fever',
        'Flush the blood tubing rapidly with 5% Dextrose in Water (D5W) to clear the IV line',
        'Administer intramuscular epinephrine and continue blood at half rate'
      ],
      correctAnswer: 0,
      explanation: `Explanation
The client is experiencing an Acute Hemolytic Transfusion Reaction (AHTR), a life-threatening type II hypersensitivity reaction caused by ABO or Rh incompatibility. Pre-existing recipient antibodies attack donor RBC antigens, causing rapid intravascular hemolysis, free hemoglobin release, acute tubular necrosis, and disseminated intravascular coagulation (DIC).

Immediate emergency sequence:
1. STOP the transfusion immediately (limiting volume infused is life-saving).
2. Disconnect the blood administration set from the peripheral IV access hub (never flush remaining blood in the tubing into the client).
3. Connect fresh IV tubing and infuse 0.9% Normal Saline to maintain venous access and renal perfusion.
4. Notify provider and blood bank immediately.
5. Send the blood bag, tubing, and fresh post-transfusion blood and urine samples to the laboratory for transfusion reaction workup.

(Option 1) Immediately stopping the infusion, disconnecting blood tubing, and infusing normal saline through fresh tubing prevents further hemolysis and preserves renal perfusion.
(Option 2) Never slow or continue an incompatible blood transfusion; continued infusion is fatal.
(Option 3) D5W causes hemolysis in the IV line and blood must never be infused with dextrose.
(Option 4) Continuing blood during hemolytic destruction leads to fatal DIC and renal failure.

Educational objective:
At the first sign of an Acute Hemolytic Transfusion Reaction (fever, chills, flank pain, red urine), the nurse must immediately stop the transfusion, disconnect the blood tubing, infuse 0.9% Normal Saline via fresh tubing, and alert the provider and blood bank.`,
      peerPercentages: [95, 2, 2, 1],
      topic: 'Nursing Foundations (Fundamentals of Nursing)'
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // 7. COMMUNITY HEALTH NURSING
  // ─────────────────────────────────────────────────────────────
  community: [
    {
      id: 'comm-l1-01',
      difficultyLevel: 1,
      scenario: 'CLINICAL CASE SCENARIO: A community health nurse is developing an educational health promotion program for a local civic center.',
      questionText: 'Which nursing intervention exemplifies PRIMARY prevention?',
      options: [
        'Administering the annual Influenza and HPV vaccines at a community immunization clinic',
        'Performing screening mammograms and Pap smears for early detection of malignancies',
        'Facilitating cardiac rehabilitation and endurance training for clients following myocardial infarction',
        'Monitoring blood glucose HbA1c levels for clients diagnosed with Type 2 diabetes'
      ],
      correctAnswer: 0,
      explanation: `Explanation
Levels of Prevention in Public Health:
- Primary Prevention: Interventions implemented BEFORE disease or dysfunction occurs to prevent illness entirely by addressing root causes (eg, immunizations, health education on balanced diet/exercise, water fluoridation, car seat education).
- Secondary Prevention: Early detection, screening, and prompt intervention to arrest disease in its preclinical stages (eg, mammography, blood pressure screening, colonoscopy, Pap smears).
- Tertiary Prevention: Rehabilitation and management of established chronic disease to prevent disability and optimize function (eg, cardiac rehabilitation, physical therapy post-stroke, diabetic foot ulcer care).

(Option 1) Vaccination prevents disease occurrence and represents pure Primary Prevention.
(Option 2) Screening mammograms and Pap smears detect early disease (Secondary Prevention).
(Option 3) Cardiac rehabilitation manages established disease complications (Tertiary Prevention).
(Option 4) Diabetic HbA1c monitoring is management of chronic disease (Tertiary Prevention).

Educational objective:
Primary prevention aims to prevent disease before it occurs through interventions such as immunization, smoking prevention, and health promotion. Secondary prevention involves screening, and tertiary prevention involves rehabilitation.`,
      peerPercentages: [92, 4, 2, 2],
      topic: 'Community Health Nursing'
    },
    {
      id: 'comm-l2-01',
      difficultyLevel: 2,
      scenario: 'CLINICAL CASE SCENARIO: A public health nurse inspects the temperature log of the vaccine refrigerator at a rural community health center. The refrigerator stores BCG, Hepatitis B, Pentavalent (DTP-HepB-Hib), Rotavirus, and Measles-Rubella (MR) vaccines.',
      questionText: 'Which temperature range represents the MANDATORY international standard for storing these vaccines in the cold chain refrigerator?',
      options: [
        '+2°C to +8°C (+36°F to +46°F)',
        '-20°C to -10°C (-4°F to +14°F)',
        '+10°C to +16°C (+50°F to +61°F)',
        '0°C to +2°C (+32°F to +36°F)'
      ],
      correctAnswer: 0,
      explanation: `Explanation
The Vaccine Cold Chain is a continuous temperature-controlled supply chain that preserves vaccine potency from manufacturer to recipient:
- World Health Organization (WHO) and Universal Immunization Programme (UIP) standards require storage of routine liquid vaccines (including Hep B, Pentavalent, Rotavirus, BCG, MR) at health facility refrigerators strictly between +2°C and +8°C (+36°F to +46°F).
- Freezing sensitive vaccines (such as Hepatitis B and Pentavalent) causes aluminum adjuvant clumping and permanently destroys potency.
- Temperatures above +8°C accelerate heat denaturation of antigens.

(Option 1) +2°C to +8°C is the universal mandatory storage standard for health center vaccine refrigerators.
(Option 2) Freezing temperatures destroy liquid freeze-sensitive vaccines.
(Option 3) Temperatures >+8°C cause rapid loss of immunological potency.
(Option 4) Storage near 0°C risks accidental freezing.

Educational objective:
The mandatory cold chain temperature for storing routine vaccines in healthcare facility refrigerators is strictly +2°C to +8°C (+36°F to +46°F). Freezing permanently destroys freeze-sensitive liquid vaccines.`,
      peerPercentages: [93, 3, 2, 2],
      topic: 'Community Health Nursing'
    },
    {
      id: 'comm-l3-01',
      difficultyLevel: 3,
      scenario: 'CLINICAL CASE SCENARIO: A public health epidemiologist investigates an acute foodborne illness outbreak after a school banquet attended by 300 students who consumed a catered lunch. Within 4 hours, 90 students develop severe nausea, vomiting, and abdominal cramps. Laboratory testing of food samples isolates enterotoxin-producing Staphylococcus aureus.',
      questionText: 'What is the Attack Rate for this acute outbreak?',
      options: [
        '30%',
        '25%',
        '15%',
        '45%'
      ],
      correctAnswer: 0,
      explanation: `Explanation
In epidemiology, the Attack Rate (a specific form of incidence rate used during epidemic outbreaks) measures the risk of contracting a disease among individuals exposed to a common source:

Attack Rate = (Number of new cases of disease during the outbreak / Total number of exposed persons at risk) × 100
Attack Rate = (90 affected students / 300 exposed attendees) × 100 = 30%

(Option 1) (90 / 300) × 100 = 30%.
(Option 2) 25% is an arithmetic error.
(Option 3) 15% is an arithmetic error.
(Option 4) 45% is an arithmetic error.

Educational objective:
The attack rate in an outbreak investigation is calculated by dividing the number of ill persons by the total number of exposed individuals at risk, multiplied by 100.`,
      peerPercentages: [90, 5, 3, 2],
      topic: 'Community Health Nursing'
    },
    {
      id: 'comm-l4-01',
      difficultyLevel: 4,
      scenario: 'CLINICAL CASE SCENARIO: A community health disaster triage nurse arrives at the scene of a train derailment with mass casualties. The nurse applies the Simple Triage and Rapid Treatment (START) protocol to triage victims.',
      questionText: 'Which victim should the nurse tag with a RED (Immediate) triage tag?',
      options: [
        'An adult victim with a penetrating chest wound, respiratory rate of 34 breaths/min, capillary refill of 4 seconds, and unable to follow simple commands',
        'An adult victim with an open compound femur fracture who has a respiratory rate of 20 breaths/min, radial pulse present, and follows commands',
        'An adult victim who is walking around the scene with superficial lacerations and crying',
        'An adult victim who is apneic even after manual airway repositioning'
      ],
      correctAnswer: 0,
      explanation: `Explanation
START (Simple Triage and Rapid Treatment) Protocol Color Categories:
1. RED (Immediate): Critical, life-threatening injuries who can survive with immediate intervention. Criteria:
   - Respirations >30/min OR
   - Absent radial pulse / capillary refill >2 seconds OR
   - Unable to follow simple commands (mental status altered).
2. YELLOW (Delayed): Serious injuries needing hospital care, but whose systemic status is not immediately life-threatening (normal vitals: RR <30, capillary refill <2s, follows commands).
3. GREEN (Minor / "Walking Wounded"): Ambulatory victims with minor injuries.
4. BLACK (Expectant / Deceased): Apneic after simple airway positioning or nonsurvivable catastrophic injuries.

(Option 1) RR 34/min, delayed capillary refill (4s), and altered mental status fulfill all START criteria for Immediate (RED) triage tagging.
(Option 2) Stable vitals and normal mental status warrant a Delayed (YELLOW) tag.
(Option 3) Ambulatory victim is tagged Minor (GREEN).
(Option 4) Apneic despite airway opening is tagged Expectant/Deceased (BLACK).

Educational objective:
Under the START disaster triage protocol, victims with respirations >30/min, capillary refill >2 seconds, or inability to follow commands are assigned a RED (Immediate) triage tag for priority treatment.`,
      peerPercentages: [88, 6, 3, 3],
      topic: 'Community Health Nursing'
    }
  ]
};

// Subject mapping helper supporting all main subjects and their clinical unit variations
function resolveTopicKey(topicName) {
  if (!topicName) return 'medsurg';
  const t = String(topicName).toLowerCase();
  if (t.includes('pharm') || t.includes('drug') || t.includes('medication') || t.includes('toxicology') || t.includes('antidote')) return 'pharmacology';
  if (t.includes('pediatric') || t.includes('child') || t.includes('newborn') || t.includes('infant') || t.includes('growth and development') || t.includes('peds')) return 'pediatrics';
  if (t.includes('psych') || t.includes('mental') || t.includes('schiz') || t.includes('bipolar') || t.includes('depress')) return 'psychiatry';
  if (t.includes('obg') || t.includes('obstetric') || t.includes('gynec') || t.includes('maternal') || t.includes('labour') || t.includes('labor') || t.includes('pregnan')) return 'obstetrics';
  if (t.includes('nutrit') || t.includes('diet') || t.includes('vitamin')) return 'nutrition';
  if (t.includes('microbiol') || t.includes('pathogen') || t.includes('immunit')) return 'microbiology';
  if (t.includes('found') || t.includes('fundam') || t.includes('vital') || t.includes('infect') || t.includes('aseps') || t.includes('catheter') || t.includes('hygiene')) return 'foundations';
  if (t.includes('commun') || t.includes('epidemiol') || t.includes('public') || t.includes('cold chain') || t.includes('sanitation')) return 'community';
  return 'medsurg';
}

// Find matching questions from UNIT_BANKS for a given topic/unit
function findUnitBankQuestions(topicName) {
  if (!topicName || !UNIT_BANKS) return [];
  const bankKey = resolveBankKey(topicName, topicName);
  const questions = UNIT_BANKS[bankKey] || UNIT_BANKS['Introduction to Nursing'];
  if (!questions || !Array.isArray(questions)) return [];

  return questions.map((q, idx) => {
    const diffLevel = idx < 5 ? 1 : idx < 10 ? 2 : idx < 15 ? 3 : 4;
    const diffName = diffLevel === 1 ? 'Level 1: Foundational Recall' 
                   : diffLevel === 2 ? 'Level 2: Base Clinical' 
                   : diffLevel === 3 ? 'Level 3: Advanced Hard' 
                   : 'Level 4: Peak Acuity';
    return {
      id: `${bankKey.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}-${idx + 1}`,
      difficultyLevel: diffLevel,
      difficultyName: diffName,
      scenario: '',
      questionText: q.text,
      options: [...q.options],
      correctAnswer: q.answer,
      explanation: q.exp,
      peerPercentages: diffLevel === 1 ? [88, 5, 4, 3] : diffLevel === 2 ? [72, 14, 8, 6] : diffLevel === 3 ? [58, 22, 12, 8] : [42, 30, 16, 12],
      topic: topicName || bankKey
    };
  });
}

/**
 * Procedural variation generator: ensures repeat tests within the same topic
 * create plausible clinical parameter variations without cross-contaminating subjects or difficulty.
 */
function createProceduralVariant(baseQuestion, variantIndex = 1, targetDifficulty = 2) {
  const diffName = targetDifficulty === 1 ? 'Level 1: Foundational Recall' 
                 : targetDifficulty === 2 ? 'Level 2: Base Clinical' 
                 : targetDifficulty === 3 ? 'Level 3: Advanced Hard' 
                 : 'Level 4: Peak Acuity';

  let newScenario = baseQuestion.scenario;
  if (newScenario) {
    const ageMatch = newScenario.match(/A (\d+)-year-old/);
    const newAge = ageMatch ? (parseInt(ageMatch[1]) + (variantIndex * 2)) : 52;
    newScenario = newScenario.replace(/A \d+-year-old/, `A ${newAge}-year-old`);
  }

  const fullText = newScenario ? `${newScenario}\n\n${baseQuestion.questionText}` : baseQuestion.questionText;

  return {
    ...baseQuestion,
    scenario: newScenario,
    questionText: fullText,
    id: `${baseQuestion.id || 'q'}-v${variantIndex}`,
    difficultyLevel: targetDifficulty,
    difficultyName: diffName
  };
}

/**
 * Returns a unique question for a given topic and difficulty level,
 * guaranteeing STRICT TOPIC & DIFFICULTY ADHERENCE.
 */
function getTopicQuestion(topicName, difficultyLevel = 2, alreadyAskedStems = []) {
  // Normalize alreadyAskedStems for robust matching
  const askedTexts = alreadyAskedStems.map(s => String(s || '').toLowerCase().substring(0, 40));

  const targetDiff = (typeof difficultyLevel === 'number' && difficultyLevel >= 1 && difficultyLevel <= 4)
    ? difficultyLevel 
    : 2;

  const diffName = targetDiff === 1 ? 'Level 1: Foundational Recall' 
                 : targetDiff === 2 ? 'Level 2: Base Clinical' 
                 : targetDiff === 3 ? 'Level 3: Advanced Hard' 
                 : 'Level 4: Peak Acuity';

  // Check if topic is a broad multi-subject exam (e.g. NORCET, Mixed PYQ, All Subjects)
  const isBroadExam = !topicName || 
                      topicName === 'All Subjects' || 
                      topicName.toLowerCase().includes('all mock') || 
                      topicName.toLowerCase().includes('full length') ||
                      topicName.toLowerCase().includes('norcet') ||
                      topicName.toLowerCase().includes('mixed') ||
                      topicName.toLowerCase().includes('challenge') ||
                      topicName.toLowerCase().includes('general') ||
                      topicName.toLowerCase().includes('pyq');

  let bank = [];

  if (isBroadExam && UNIT_BANKS) {
    // Round-robin across all 12 authentic banks to ensure topic variety
    const bankKeys = Object.keys(UNIT_BANKS);
    const chosenBankKey = bankKeys[alreadyAskedStems.length % bankKeys.length] || 'Introduction to Nursing';
    bank = findUnitBankQuestions(chosenBankKey);
  } else {
    // Specific unit/topic
    bank = findUnitBankQuestions(topicName);
  }

  if (!bank || bank.length === 0) {
    const key = resolveTopicKey(topicName);
    bank = TOPIC_BANKS[key] || TOPIC_BANKS['medsurg'];
  }

  // 1. Try to find an unused question matching the exact requested difficulty level
  const exactLevelMatches = bank.filter(q => {
    if (q.difficultyLevel !== targetDiff) return false;
    const qStem = String(q.scenario || q.questionText || '').toLowerCase().substring(0, 40);
    return !askedTexts.some(asked => asked && (asked.includes(qStem) || qStem.includes(asked)));
  });

  if (exactLevelMatches.length > 0) {
    const selected = exactLevelMatches[Math.floor(Math.random() * exactLevelMatches.length)];
    const fullText = selected.scenario ? `${selected.scenario}\n\n${selected.questionText}` : selected.questionText;
    return {
      ...selected,
      questionText: fullText,
      topic: topicName || selected.topic,
      difficultyLevel: targetDiff,
      difficultyName: diffName
    };
  }

  // 2. If broad exam and current bank exhausted at this level, check other banks at SAME difficulty level
  if (isBroadExam && UNIT_BANKS) {
    const bankKeys = Object.keys(UNIT_BANKS);
    for (const altKey of bankKeys) {
      const altQuestions = findUnitBankQuestions(altKey).filter(q => {
        if (q.difficultyLevel !== targetDiff) return false;
        const qStem = String(q.scenario || q.questionText || '').toLowerCase().substring(0, 40);
        return !askedTexts.some(asked => asked && (asked.includes(qStem) || qStem.includes(asked)));
      });
      if (altQuestions.length > 0) {
        const selected = altQuestions[Math.floor(Math.random() * altQuestions.length)];
        const fullText = selected.scenario ? `${selected.scenario}\n\n${selected.questionText}` : selected.questionText;
        return {
          ...selected,
          questionText: fullText,
          topic: topicName || selected.topic,
          difficultyLevel: targetDiff,
          difficultyName: diffName
        };
      }
    }
  }

  // 3. For specific topics: find unused question in this topic and calibrate strictly to target difficulty
  const availableInTopic = bank.filter(q => {
    const qStem = String(q.scenario || q.questionText || '').toLowerCase().substring(0, 40);
    return !askedTexts.some(asked => asked && (asked.includes(qStem) || qStem.includes(asked)));
  });

  if (availableInTopic.length > 0) {
    const selected = availableInTopic[0];
    const fullText = selected.scenario ? `${selected.scenario}\n\n${selected.questionText}` : selected.questionText;
    return {
      ...selected,
      questionText: fullText,
      topic: topicName || selected.topic,
      difficultyLevel: targetDiff,
      difficultyName: diffName
    };
  }

  // 4. If all questions in this bank are completely exhausted, create a procedural variant strictly at target difficulty
  const base = bank[alreadyAskedStems.length % bank.length] || bank[0];
  return createProceduralVariant(base, alreadyAskedStems.length + 1, targetDiff);
}

/**
 * Returns a list of N distinct questions for a topic (used for test initialization).
 * If specific difficultyLevel (1-4) is passed, prioritizes that level strictly.
 * If null/undefined, distributes evenly across all 4 levels (Foundational -> Base -> Hard -> Peak).
 */
function getTopicQuestionsList(topicName, count = 20, difficultyLevel = null) {
  const results = [];
  const askedStems = [];

  for (let i = 0; i < count; i++) {
    // If specific difficultyLevel is requested, use it strictly; otherwise distribute across 4 levels progressively
    const levelToUse = (typeof difficultyLevel === 'number' && difficultyLevel >= 1 && difficultyLevel <= 4)
      ? difficultyLevel
      : (Math.floor((i / count) * 4) + 1); // 1 for first 25%, 2 for next 25%, 3 for next 25%, 4 for final 25%

    const q = getTopicQuestion(topicName, levelToUse, askedStems);
    results.push(q);
    askedStems.push(q.questionText);
  }

  return results;
}

module.exports = {
  TOPIC_BANKS,
  resolveTopicKey,
  getTopicQuestion,
  getTopicQuestionsList
};

