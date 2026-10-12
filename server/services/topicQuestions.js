/**
 * Comprehensive Multi-Topic Question Bank & Deduplication Engine
 * Provides authentic, high-yield clinical case questions with full UWorld/Archer rationales
 * tailored specifically for each nursing subject.
 */

const TOPIC_BANKS = {
  // ─────────────────────────────────────────────────────────────
  // 1. PHARMACOLOGY & THERAPEUTICS
  // ─────────────────────────────────────────────────────────────
  pharmacology: [
    {
      id: 'pharm-01',
      scenario: 'CLINICAL CASE SCENARIO: A 68-year-old client with chronic atrial fibrillation and heart failure is admitted for worsening fatigue, anorexia, nausea, and blurred vision with yellow-green halo rings around objects. Current medications include Digoxin 0.25 mg daily and Furosemide 40 mg daily. Stat lab values reveal: serum Potassium 3.1 mEq/L, serum Magnesium 1.4 mg/dL, serum Digoxin 2.8 ng/mL, and serum Creatinine 1.6 mg/dL. Telemetry displays sinus bradycardia at 42 bpm with frequent PVCs.',
      questionText: 'Which prescription should the nurse prioritize FIRST?',
      options: [
        'Administer IV Potassium Chloride replacement infusion and prepare Digoxin Immune Fab (DigiFab)',
        'Administer oral potassium tablets and continue scheduled morning digoxin',
        'Administer IV Furosemide 80 mg bolus to promote renal clearance of digoxin',
        'Place the client in Trendelenburg position and administer oral calcium carbonate'
      ],
      correctAnswer: 0,
      explanation: `Explanation
The client presents with classic Digoxin Toxicity (therapeutic range: 0.5–0.9 ng/mL for heart failure, toxic >2.0 ng/mL), characterized by gastrointestinal symptoms (anorexia, nausea), visual disturbances (xanthopsia, yellow-green halos), and dangerous cardiac dysrhythmias (bradycardia, PVCs).

Hypokalemia (<3.5 mEq/L) potentiates digoxin toxicity by increasing myocardial sensitivity to digoxin binding at the Na+/K+-ATPase pump. Treatment priorities:
1. Immediately hold digoxin.
2. Correct hypokalemia with IV potassium chloride (potassium competes with digoxin for myocardial binding sites).
3. Administer Digoxin Immune Fab (DigiFab) for life-threatening dysrhythmias or severe toxicity.

(Option 1) This is the definitive treatment. Correcting potassium reduces toxicity while DigiFab binds free digoxin molecules for renal excretion.
(Option 2) Giving more digoxin is lethal in severe toxicity.
(Option 3) Loop diuretics waste potassium in the urine, drastically worsening hypokalemia and precipitating fatal ventricular arrhythmias.
(Option 4) Trendelenburg is inappropriate; calcium increases intracellular calcium overload, potentially triggering fatal cardiac arrest in digoxin toxicity ('stone heart').

Educational objective:
Hypokalemia significantly increases the risk of digoxin toxicity. Serum digoxin levels >2.0 ng/mL accompanied by visual changes, gastrointestinal distress, and bradycardia require holding digoxin, potassium repletion, and DigiFab administration.`,
      peerPercentages: [82, 4, 10, 4],
      topic: 'Pharmacology'
    },
    {
      id: 'pharm-02',
      scenario: 'CLINICAL CASE SCENARIO: A 32-year-old client with Bipolar I Disorder has been taking Lithium Carbonate 600 mg twice daily for 2 years. The client ran a marathon yesterday in hot weather without adequate fluid hydration. Today, the client is brought to the clinic by a spouse due to coarse hand tremors, slurred speech, ataxia, confusion, and persistent watery diarrhea. Stat serum Lithium level is 2.4 mEq/L.',
      questionText: 'Which emergency intervention should the nurse anticipate as the HIGHEST priority?',
      options: [
        'Administer aggressive IV 0.9% Normal Saline hydration and prepare for urgent hemodialysis',
        'Administer oral potassium chloride supplements and restrict fluids',
        'Administer high-dose loop diuretics to flush excess lithium via the kidneys',
        'Administer oral sodium polystyrene sulfonate (Kayexalate)'
      ],
      correctAnswer: 0,
      explanation: `Explanation
Lithium has a narrow therapeutic index (0.6–1.2 mEq/L). Levels >2.0 mEq/L indicate severe lithium toxicity, presenting with neurological signs (coarse tremor, ataxia, confusion, seizures) and gastrointestinal disturbances (diarrhea, vomiting).

Dehydration and sodium depletion trigger proximal renal tubules to reabsorb sodium, which simultaneously reabsorbs lithium, causing toxic systemic accumulation. Treatment includes aggressive isotonic saline hydration (0.9% NS) to promote sodium and lithium excretion. Levels >2.5 mEq/L or severe neurological toxicity warrant emergency hemodialysis.

(Option 1) Isotonic IV saline restores intravascular volume and promotes renal lithium excretion. Hemodialysis is the treatment of choice for severe toxicity.
(Option 2) Restricting fluids worsens dehydration and accelerates lithium toxicity.
(Option 3) Loop diuretics induce sodium and water wasting, worsening lithium retention and toxicity.
(Option 4) Kayexalate binds potassium, not lithium.

Educational objective:
Dehydration and sodium depletion cause severe lithium toxicity. Serum levels >2.0 mEq/L cause ataxia, coarse tremors, and confusion, requiring aggressive 0.9% NS hydration and possible hemodialysis.`,
      peerPercentages: [88, 3, 5, 4],
      topic: 'Pharmacology'
    },
    {
      id: 'pharm-03',
      scenario: 'CLINICAL CASE SCENARIO: A 54-year-old client receiving a continuous IV Unfractionated Heparin infusion for acute pulmonary embolism has an aPTT of 138 seconds (control: 30 seconds). Assessment reveals fresh epistaxis, hematuria in the Foley bag, and bleeding around the peripheral IV insertion site. Platelet count is stable at 240,000/mm³.',
      questionText: 'Which antidote must the nurse prepare for immediate intravenous administration?',
      options: [
        'Protamine Sulfate',
        'Vitamin K (Phytonadione)',
        'Idarucizumab (Praxbind)',
        'Aminocaproic Acid'
      ],
      correctAnswer: 0,
      explanation: `Explanation
Therapeutic aPTT for unfractionated heparin is 1.5 to 2.5 times the baseline control (approximately 60–80 seconds). An aPTT of 138 seconds with overt clinical bleeding (epistaxis, hematuria) represents dangerous heparin overdose.

Protamine Sulfate is a strongly basic peptide that binds negatively charged heparin molecules via ionic bonding, neutralizing its anticoagulant effects within minutes (1 mg protamine neutralizes ~100 units heparin).

(Option 1) Protamine sulfate is the specific, rapid antidote for unfractionated heparin.
(Option 2) Vitamin K is the antidote for Warfarin, which takes 6–24 hours to synthesize new clotting factors.
(Option 3) Idarucizumab is the specific reversal agent for Dabigatran (Pradaxa).
(Option 4) Aminocaproic acid is an antifibrinolytic agent used for excessive fibrinolysis, not heparin reversal.

Educational objective:
Protamine sulfate is the specific antidote for severe heparin overdose and heparin-induced bleeding. It neutralizes heparin immediately through strong electrostatic binding.`,
      peerPercentages: [92, 5, 2, 1],
      topic: 'Pharmacology'
    },
    {
      id: 'pharm-04',
      scenario: 'CLINICAL CASE SCENARIO: A 46-year-old client with MRSA bacteremia is receiving an intravenous infusion of Vancomycin 1.5 g in 250 mL D5W over 45 minutes. Twenty minutes into the infusion, the client develops sudden severe facial flushing, an erythematous maculopapular rash across the face, neck, and upper torso, pruritus, and a blood pressure drop from 126/80 mmHg to 92/56 mmHg. Lungs are clear to auscultation with no stridor or wheezing.',
      questionText: 'Which action should the nurse perform FIRST?',
      options: [
        'Stop the infusion immediately, notify the provider, and prepare to administer over at least 60–120 minutes with antihistamines',
        'Administer intramuscular epinephrine 0.3 mg immediately for anaphylactic shock',
        'Double the infusion rate to finish the antibiotic before tissue damage occurs',
        'Infuse bolus potassium chloride to counteract drug-induced vasodilation'
      ],
      correctAnswer: 0,
      explanation: `Explanation
This client is experiencing Vancomycin Infusion Reaction (formerly known as 'Red Man Syndrome'), an adverse reaction caused by rapid infusion (<60 minutes) triggering non-IgE-mediated histamine release from cutaneous mast cells. Hallmarks include flushing, erythema of the head/neck/torso, and hypotension without bronchospasm or laryngeal edema.

Immediate management:
1. Stop or pause the infusion.
2. Assess airway and vital signs (ruling out true IgE anaphylaxis).
3. Once symptoms subside, resume infusion at a slower rate (minimum 60 minutes per 1 gram, or ≥120 minutes for 1.5–2 grams), often with pre-treatment diphenhydramine.

(Option 1) Stopping the infusion halts histamine release. Vancomycin must always be infused over at least 60–120 minutes.
(Option 2) Epinephrine is for IgE-mediated anaphylaxis (stridor, wheezing, angioedema). Red Man syndrome is rate-related histamine release.
(Option 3) Speeding up the infusion will trigger profound cardiovascular collapse.
(Option 4) Potassium has no role and poses life-threatening cardiac risks.

Educational objective:
Vancomycin infusion reaction is a rate-dependent pseudoallergic histamine release. To prevent it, vancomycin must be diluted appropriately and infused slowly over at least 60 to 120 minutes.`,
      peerPercentages: [85, 11, 2, 2],
      topic: 'Pharmacology'
    },
    {
      id: 'pharm-05',
      scenario: 'CLINICAL CASE SCENARIO: A 62-year-old client with type 2 diabetes and hypertension is prescribed Enalapril 10 mg daily. The client presents to the emergency room with sudden progressive swelling of the lips, tongue, and uvula, accompanied by difficulty swallowing and a hoarse, muffled voice. Vital signs: BP 142/88 mmHg, HR 96 bpm, RR 24 bpm, SpO2 93% on room air.',
      questionText: 'Which pathophysiological mechanism explains this adverse reaction, and what is the nurse\'s primary priority?',
      options: [
        'Accumulation of bradykinin causing ACE-inhibitor angioedema; maintain patent airway and prepare for emergent intubation',
        'IgE-mediated histamine release; administer oral diphenhydramine and discharge home',
        'Sodium retention causing peripheral edema; administer IV furosemide bolus',
        'Hyperglycemic osmotic shift; administer rapid-acting regular insulin'
      ],
      correctAnswer: 0,
      explanation: `Explanation
Angiotensin-Converting Enzyme (ACE) inhibitors (eg, enalapril, lisinopril) prevent the breakdown of Bradykinin. Excessive bradykinin accumulation causes severe vasodilatation and vascular permeability, resulting in ACE-inhibitor-induced Angioedema.

Angioedema can occur at any time during therapy (even years later). Swelling of the tongue, pharynx, and larynx can cause complete airway obstruction within minutes. The absolute top priority is maintaining airway patency, supplemental oxygen, and preparing for emergency endotracheal intubation or cricothyroidotomy.

(Option 1) Bradykinin accumulation is the hallmark of ACE-inhibitor angioedema. Securing the airway takes immediate life-saving priority.
(Option 2) ACE angioedema is non-IgE mediated and does not reliably respond to antihistamines alone; airway compromise is fatal if not monitored.
(Option 3) Furosemide has no effect on bradykinin-mediated vascular extravasation.
(Option 4) Insulin is unrelated to drug-induced angioedema.

Educational objective:
ACE inhibitors can cause life-threatening angioedema due to bradykinin accumulation. Airway protection is the critical priority, and ACE inhibitors must be permanently discontinued and documented as an allergy.`,
      peerPercentages: [89, 6, 3, 2],
      topic: 'Pharmacology'
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // 2. MEDICAL-SURGICAL NURSING
  // ─────────────────────────────────────────────────────────────
  medsurg: [
    {
      id: 'medsurg-01',
      scenario: 'CLINICAL CASE SCENARIO: A 52-year-old client on postoperative day 1 following an open right hemicolectomy is recovering on the surgical floor. The client suddenly reports acute onset of severe pleuritic chest pain, apprehension, and shortness of breath. Assessment: BP 90/58 mmHg, HR 124 bpm (sinus tachycardia), RR 34 bpm, SpO2 84% on room air. Auscultation reveals clear breath sounds bilaterally with an accentuated second heart sound (P2).',
      questionText: 'Which clinical condition should the nurse suspect, and what is the immediate first action?',
      options: [
        'Acute Massive Pulmonary Embolism; elevate head of bed, apply high-flow oxygen, and activate rapid response team',
        'Acute Atelectasis; encourage incentive spirometry and deep coughing exercises',
        'Surgical site wound dehiscence; apply sterile saline-soaked gauze to abdomen',
        'Hospital-acquired bacterial pneumonia; collect sputum culture and await oral antibiotics'
      ],
      correctAnswer: 0,
      explanation: `Explanation
Postoperative clients are at high risk for Deep Vein Thrombosis (DVT) and secondary Pulmonary Embolism (PE) due to Virchow\'s triad (venous stasis, endothelial injury, hypercoagulability). Sudden onset of dyspnea, pleuritic chest pain, tachycardia, tachypnea, severe hypoxemia with clear lung sounds, and hypotension signify a massive Pulmonary Embolism with right ventricular strain.

Immediate nursing actions:
1. Elevate head of bed to high-Fowler\'s to facilitate diaphragmatic excursion.
2. Apply high-flow oxygen via non-rebreather mask.
3. Activate the Emergency Rapid Response Team and prepare for stat diagnostic CT pulmonary angiography and anticoagulation (heparin) or thrombolytic therapy.

(Option 1) This recognizes PE and follows the ABCs with immediate oxygenation and team escalation.
(Option 2) Atelectasis causes gradual low-grade fever and fine crackles, not acute hemodynamic collapse.
(Option 3) Dehiscence involves the surgical wound, not acute severe hypoxemic chest pain.
(Option 4) Pneumonia manifests with purulent sputum, fever, and consolidation crackles.

Educational objective:
Sudden acute dyspnea, pleuritic chest pain, tachycardia, and hypoxemia in a postoperative client strongly indicate Pulmonary Embolism. Immediate priorities are Fowler\'s positioning, high-flow oxygen, and urgent medical escalation.`,
      peerPercentages: [88, 5, 2, 5],
      topic: 'Medical-Surgical Nursing'
    },
    {
      id: 'medsurg-02',
      scenario: 'CLINICAL CASE SCENARIO: A 28-year-old client with Type 1 Diabetes Mellitus presents to the Emergency Department in a somnolent state. Blood glucose is 540 mg/dL. Arterial Blood Gas (ABG): pH 7.12, PaCO2 22 mmHg, PaO2 96 mmHg, HCO3 8 mEq/L. Serum Potassium is 5.8 mEq/L. Respirations are 32/min, deep and rapid with a distinct fruity breath odor. Vital signs: BP 86/52 mmHg, HR 128 bpm, dry mucous membranes and poor skin turgor.',
      questionText: 'Which initial intravenous fluid resuscitation regimen is the standard of care?',
      options: [
        'Rapid infusion of 0.9% Normal Saline at 1000 mL/hr to restore intravascular volume',
        'Immediate IV bolus of 50% Dextrose in water (D50W)',
        'Immediate infusion of D5W with 40 mEq Potassium Chloride',
        'Subcutaneous injection of Glargine insulin followed by 0.45% Saline'
      ],
      correctAnswer: 0,
      explanation: `Explanation
The client exhibits classic Diabetic Ketoacidosis (DKA): severe hyperglycemia, high-anion-gap metabolic acidosis (pH 7.12, HCO3 8), compensatory Kussmaul respirations (blowing off CO2), and profound dehydration secondary to osmotic diuresis (fluid deficit typically 5–10 liters).

The absolute first priority in DKA is IV fluid resuscitation with Isotonic Saline (0.9% NaCl) at 1000 mL/hr to restore perfusion, expand circulating plasma volume, and perfuse the kidneys. Only after fluid resuscitation begins is continuous IV regular insulin initiated (after verifying potassium >3.3 mEq/L).

(Option 1) Isotonic normal saline expands intravascular volume and reverses hypovolemic shock.
(Option 2) Dextrose would drastically worsen life-threatening hyperglycemia and hyperosmolality.
(Option 3) D5W is only added later when glucose reaches ~200–250 mg/dL to prevent cerebral edema.
(Option 4) Subcutaneous basal insulin cannot treat acute DKA; IV regular insulin is required.

Educational objective:
In Diabetic Ketoacidosis (DKA), rapid restoration of intravascular fluid volume with 0.9% Normal Saline is the primary first intervention before starting IV insulin therapy.`,
      peerPercentages: [84, 4, 8, 4],
      topic: 'Medical-Surgical Nursing'
    },
    {
      id: 'medsurg-03',
      scenario: 'CLINICAL CASE SCENARIO: A 36-year-old male with a closed right tibial fracture treated with a cast 8 hours ago reports unremitting, escalating right calf pain rated 10/10 that is unresponsive to repeated IV morphine doses. On assessment, passive dorsiflexion of the right foot elicits agonizing pain. The right foot is pale with 1+ pedal pulse and the calf feels tense, hard, and wood-like on palpation.',
      questionText: 'What is the nurse\'s PRIORITY action?',
      options: [
        'Notify the orthopedic surgeon immediately and prepare to bivalve the cast (suspected Acute Compartment Syndrome)',
        'Elevate the right leg above heart level on three pillows and apply an ice pack',
        'Administer a higher dose of intravenous hydromorphone as prescribed',
        'Encourage active ambulation to promote collateral venous drainage'
      ],
      correctAnswer: 0,
      explanation: `Explanation
This client displays classic symptoms of Acute Compartment Syndrome (ACS), an orthopedic emergency where elevated tissue pressure within an enclosed myofascial space compromises capillary perfusion, leading to muscle and nerve necrosis within 4–6 hours.

Hallmark signs (The 6 Ps):
- Pain out of proportion to injury and unrelieved by opioids (earliest and most specific sign).
- Pain on passive stretch of the muscle group.
- Paresthesia, Pallor, Poikilothermia, Pulselessness (late sign).
- Pressure/taut, tense compartment.

Immediate nursing actions:
1. Notify surgeon immediately.
2. Remove constrictive bandages or bivalve cast.
3. Keep limb at HEART LEVEL (DO NOT elevate above heart, as elevation decreases arterial perfusion pressure).
4. Avoid ice (causes vasoconstriction). Prepare for emergency Fasciotomy.

(Option 1) Immediate surgical notification and bivalving the cast relieves external pressure and prevents permanent limb loss.
(Option 2) Elevating above heart level reduces arterial perfusion to already ischemic tissue; ice causes vasoconstriction.
(Option 3) Increasing opioids masks worsening ischemia.
(Option 4) Ambulation is contraindicated and excruciating.

Educational objective:
Disproportionate pain unrelieved by opioids and pain on passive stretch indicate Acute Compartment Syndrome. The nurse must immediately notify the surgeon, bivalve constricting casts, and maintain the extremity at heart level.`,
      peerPercentages: [91, 5, 2, 2],
      topic: 'Medical-Surgical Nursing'
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // 3. PEDIATRIC (CHILD HEALTH) NURSING
  // ─────────────────────────────────────────────────────────────
  pediatrics: [
    {
      id: 'peds-01',
      scenario: 'CLINICAL CASE SCENARIO: A 10-month-old infant with diagnosed Tetralogy of Fallot is crying inconsolably after a blood draw. The infant suddenly becomes acutely cyanotic around the lips, fingers, and toes, with tachypnea (RR 68/min), diaphoresis, and altered responsiveness (hypercyanotic "Tet" spell). SpO2 drops to 64%.',
      questionText: 'Which emergency intervention should the nurse perform FIRST?',
      options: [
        'Place the infant in the knee-chest position immediately',
        'Administer high-dose oral digoxin syrup',
        'Start chest compressions at 100 per minute',
        'Apply ice packs to the infant\'s chest and abdomen'
      ],
      correctAnswer: 0,
      explanation: `Explanation
A Hypercyanotic Episode (also known as a "Tet" spell) occurs in infants with Tetralogy of Fallot when infundibular spasm or agitation increases right-to-left shunting across the ventricular septal defect (VSD), directing deoxygenated blood into systemic circulation.

Placing the infant in the Knee-Chest Position (or squatting in older children) immediately kinks the femoral vessels and increases Systemic Vascular Resistance (SVR). Increasing SVR exceeds pulmonary vascular resistance, reversing the shunt back from left-to-right through the VSD, thereby forcing blood into the lungs for oxygenation.

Secondary steps:
- Calm the infant.
- Administer 100% supplemental blow-by oxygen.
- Administer subcutaneous or IV Morphine (relaxes infundibular spasm and reduces respiratory drive).
- IV fluid bolus.

(Option 1) The knee-chest position increases systemic vascular resistance immediately, improving pulmonary blood flow and resolving hypoxia.
(Option 2) Oral digoxin has no role in acute hypercyanotic spells.
(Option 3) The infant has a pulse; CPR is not indicated.
(Option 4) Cold triggers shivering, increasing oxygen demand and worsening hypoxemia.

Educational objective:
The priority first-line intervention for a hypercyanotic ('Tet') spell in Tetralogy of Fallot is placing the infant in the knee-chest position to increase systemic vascular resistance and divert blood flow into pulmonary circulation.`,
      peerPercentages: [87, 4, 5, 4],
      topic: 'Child Health (Pediatric) Nursing'
    },
    {
      id: 'peds-02',
      scenario: 'CLINICAL CASE SCENARIO: A 4-year-old child is brought to the emergency department with a sudden high fever (103.8°F/39.9°C), severe sore throat, and muffled "hot potato" voice. The child is sitting upright, leaning forward with neck hyperextended and chin thrust outward (tripod position), drooling saliva continuously, and breathing with inspiratory stridor.',
      questionText: 'Which nursing action is STRICTLY CONTRAINDICATED?',
      options: [
        'Inspecting the pharynx with a tongue depressor or obtaining a throat culture',
        'Allowing the child to remain in the parent\'s lap in a position of comfort',
        'Keeping emergency bag-valve-mask and pediatric intubation equipment at the bedside',
        'Notifying the anesthesiologist and ENT specialist immediately'
      ],
      correctAnswer: 0,
      explanation: `Explanation
The child displays the hallmark clinical tetrad of Acute Epiglottitis (caused primarily by Haemophilus influenzae type b): Drooling, Dysphagia, Dysphonia, and Distressed inspiratory stridor in the Tripod position.

Any invasive inspection of the posterior pharynx with a tongue blade, throat swab, or oral thermometer can stimulate laryngospasm and cause complete, irreversible airway obstruction, resulting in immediate respiratory arrest.

Mandatory nursing principles:
1. NEVER examine the throat or use a tongue depressor.
2. Avoid agitating or upsetting the child (keep calm, remain in parent\'s lap).
3. Do not obtain IV access or venipuncture until airway is secured in the operating room.
4. Have emergency airway equipment ready for urgent endotracheal intubation by anesthesia.

(Option 1) Inspecting the throat with a tongue blade triggers fatal laryngospasm and is absolutely contraindicated.
(Option 2) Keeping the child calm in the parent\'s lap prevents agitation-induced airway collapse.
(Option 3) Emergency airway equipment must be immediately accessible.
(Option 4) Expert airway specialists (ENT/Anesthesia) must be mobilized immediately.

Educational objective:
In suspected Acute Epiglottitis (tripod position, drooling, stridor), visual inspection of the throat with a tongue depressor is strictly contraindicated because it can precipitate complete airway obstruction and cardiac arrest.`,
      peerPercentages: [94, 2, 2, 2],
      topic: 'Child Health (Pediatric) Nursing'
    },
    {
      id: 'peds-03',
      scenario: 'CLINICAL CASE SCENARIO: A 6-week-old male infant is brought to the clinic for non-bilious projectile vomiting immediately after every feeding over the past 4 days. The infant is constantly hungry and eagerly drinks formula, only to vomit forcefully across the room. On examination, the infant appears irritable and mildly dehydrated. Palpation of the right epigastrium reveals a distinct, firm, olive-shaped mass.',
      questionText: 'Which diagnosis should the nurse anticipate, and which diagnostic test confirms it?',
      options: [
        'Hypertrophic Pyloric Stenosis; confirmed by abdominal ultrasound',
        'Intussusception; confirmed by barium or air enema',
        'Hirschsprung Disease; confirmed by rectal biopsy',
        'Gastroesophageal Reflux Disease (GERD); confirmed by 24-hour pH probe'
      ],
      correctAnswer: 0,
      explanation: `Explanation
Hypertrophic Pyloric Stenosis (HPS) is caused by hypertrophy of the circular muscle of the pylorus, obstructing gastric emptying. It classically occurs in first-born males between 3 to 8 weeks of age.

Key Clinical Features:
- Non-bilious projectile vomiting immediately after feeding.
- Hungry infant who wants to feed again immediately after emesis.
- Palpable olive-shaped mass in the right epigastrium.
- Peristaltic waves visible across the epigastrium from left to right.
- Hypochloremic, hypokalemic metabolic alkalosis from recurrent gastric acid (HCl) loss.

Abdominal Ultrasound is the non-invasive gold standard diagnostic test demonstrating thickened, elongated pyloric muscle. Surgical correction is Pyloromyotomy.

(Option 1) Olive mass + projectile non-bilious vomiting = Pyloric Stenosis confirmed by ultrasound.
(Option 2) Intussusception presents with episodic colicky pain, 'currant jelly' red stools, and sausage-shaped mass.
(Option 3) Hirschsprung disease manifests with delayed meconium passage, abdominal distension, and ribbon-like stools.
(Option 4) GERD causes effortless spitting up without projectile velocity or olive mass.

Educational objective:
Hypertrophic Pyloric Stenosis presents with projectile non-bilious vomiting, persistent hunger, and a palpable olive-shaped epigastric mass. Diagnosis is confirmed via abdominal ultrasonography.`,
      peerPercentages: [90, 5, 3, 2],
      topic: 'Child Health (Pediatric) Nursing'
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // 4. MENTAL HEALTH (PSYCHIATRIC) NURSING
  // ─────────────────────────────────────────────────────────────
  psychiatry: [
    {
      id: 'psych-01',
      scenario: 'CLINICAL CASE SCENARIO: A 34-year-old client diagnosed with Paranoid Schizophrenia is admitted involuntarily to the psychiatric inpatient unit. The client paces rapidly near the exit door, muttering under their breath, glaring intensely at staff, and clenching their fists. Suddenly, the client shouts: "The voices are telling me you are all government spies trying to poison my food! I have to destroy you before you inject me!"',
      questionText: 'Which response by the nurse is MOST therapeutic and de-escalating?',
      options: [
        '"I can see that you are feeling frightened right now. You are safe here in the hospital, and no one is going to harm you. Let\'s step over to this quiet area together."',
        '"Those voices are not real. You know that we are nurses and doctors, not spies."',
        '"If you threaten staff again, we will immediately place you in mechanical four-point leather restraints."',
        '"Why do you think the government wants to spy on you specifically?"'
      ],
      correctAnswer: 0,
      explanation: `Explanation
When managing an acutely agitated client experiencing paranoid delusions and command hallucinations, the nurse must:
1. Validate the client\'s emotional state (eg, fear, anxiety) without validating or reinforcing the false delusional content.
2. Provide reassurance of safety and reality.
3. Use a calm, low, non-threatening voice and open body language, maintaining safe physical distance.
4. Offer de-escalation in a quiet, low-stimulus environment.

(Option 1) This acknowledges the emotional reality (fear), provides a calm safety anchor, and invites the client to a low-stimulus area to reduce agitation.
(Option 2) Directly challenging or arguing against a delusion increases defensiveness and escalates aggression.
(Option 3) Threatening restraints is punitive, increases panic, and damages therapeutic rapport.
(Option 4) Asking 'Why' demands justification for an irrational delusion and causes further intellectual confusion.

Educational objective:
When communicating with a client experiencing paranoid delusions and hallucinations, validate their emotional distress (fear/anxiety) without confirming the delusion, reinforce safety, and de-escalate in a low-stimulus environment.`,
      peerPercentages: [86, 6, 4, 4],
      topic: 'Mental Health (Psychiatric) Nursing'
    },
    {
      id: 'psych-02',
      scenario: 'CLINICAL CASE SCENARIO: A 28-year-old client diagnosed with Treatment-Resistant Schizophrenia has been receiving Clozapine (Clozaril) for 6 weeks. Today, the client attends the outpatient clinic complaining of a severe sore throat, fever (101.8°F/38.8°C), and body chills. Stat Complete Blood Count (CBC) reveals: White Blood Cell count (WBC) 1,800/mm³ and Absolute Neutrophil Count (ANC) 450/mm³.',
      questionText: 'Which life-threatening condition has occurred, and what is the mandatory immediate action?',
      options: [
        'Severe Agranulocytosis; immediately discontinue Clozapine and initiate reverse protective isolation with infection workup',
        'Neuroleptic Malignant Syndrome; administer Dantrolene and continue clozapine',
        'Normal transient drug leukopenia; continue clozapine and prescribe oral penicillin',
        'Extrapyramidal symptom reaction; administer Benztropine intramuscularly'
      ],
      correctAnswer: 0,
      explanation: `Explanation
Clozapine is an atypical second-generation antipsychotic with unmatched efficacy in treatment-resistant schizophrenia. However, it carries a boxed warning for potentially fatal Agranulocytosis (ANC <500/mm³) occurring in ~1% of patients.

Normal ANC is >1,500/mm³. An ANC of 450/mm³ indicates severe neutropenia, leaving the client defenseless against overwhelming sepsis. Clients presenting with fever, sore throat, or stomatitis must have an immediate stat CBC. If ANC <500/mm³, Clozapine must be immediately discontinued permanently.

(Option 1) Severe agranulocytosis requires permanent discontinuation of clozapine, protective isolation, and stat evaluation for infection.
(Option 2) NMS presents with lead-pipe rigidity, hyperthermia (>104°F), and autonomic instability.
(Option 3) An ANC of 450/mm³ is a medical emergency, not a benign transient finding.
(Option 4) Benztropine treats dystonia/Parkinsonian EPS, not agranulocytosis.

Educational objective:
Clozapine requires mandatory regular Absolute Neutrophil Count (ANC) monitoring due to the risk of life-threatening agranulocytosis. Any fever or sore throat warrants immediate stat CBC; an ANC <500/mm³ mandates immediate drug discontinuation.`,
      peerPercentages: [92, 4, 2, 2],
      topic: 'Mental Health (Psychiatric) Nursing'
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // 5. OBSTETRICS & GYNECOLOGICAL NURSING
  // ─────────────────────────────────────────────────────────────
  obstetrics: [
    {
      id: 'obg-01',
      scenario: 'CLINICAL CASE SCENARIO: A 29-year-old primigravida at 34 weeks gestation with severe preeclampsia is receiving a continuous intravenous Magnesium Sulfate infusion at 2 g/hr following a 4 g loading bolus. During hourly assessment, the nurse documents: BP 148/94 mmHg, Deep Tendon Reflexes (patellar) 0 (absent), Respiratory rate 8 breaths/min, and hourly Foley urine output 14 mL. The client reports extreme lethargy and heavy limbs.',
      questionText: 'What is the nurse\'s IMMEDIATE priority action?',
      options: [
        'Stop the Magnesium Sulfate infusion immediately and prepare to administer Calcium Gluconate 10% IV',
        'Increase the infusion rate to 3 g/hr to control maternal blood pressure',
        'Administer IV hydralazine bolus and continue magnesium sulfate',
        'Place the client in high Fowler\'s position and encourage oral hydration'
      ],
      correctAnswer: 0,
      explanation: `Explanation
Magnesium Sulfate is the anticonvulsant of choice to prevent and treat eclamptic seizures in preeclampsia. Magnesium is excreted solely by the kidneys; when oliguria (<30 mL/hr) develops, toxic serum magnesium levels accumulate rapidly.

Signs of Magnesium Toxicity:
- Loss of Deep Tendon Reflexes (DTRs) — earliest sign (magnesium ~8–10 mEq/L).
- Respiratory depression (<12 breaths/min) (magnesium ~12–15 mEq/L).
- Oliguria (<30 mL/hr).
- Cardiac arrest and complete conduction block (magnesium >15 mEq/L).

Immediate actions:
1. Immediately STOP the magnesium infusion.
2. Administer Calcium Gluconate (10% solution, 1 g [10 mL] slow IV over 3–5 minutes) to antagonize magnesium at the neuromuscular junction.
3. Provide supplemental oxygen and support airway/ventilation.

(Option 1) Stopping the infusion halts worsening toxicity; calcium gluconate is the specific antidote.
(Option 2) Increasing the dose will cause respiratory arrest and asystole.
(Option 3) Hydralazine lowers BP but does not reverse life-threatening magnesium neuromuscular toxicity.
(Option 4) The client is in impending respiratory arrest; oral fluids will cause aspiration.

Educational objective:
Loss of deep tendon reflexes, respiratory rate <12/min, and oliguria signify Magnesium Toxicity. The nurse must immediately stop the magnesium infusion and administer IV Calcium Gluconate.`,
      peerPercentages: [93, 2, 3, 2],
      topic: 'Obstetrics & Gynecological Nursing'
    },
    {
      id: 'obg-02',
      scenario: 'CLINICAL CASE SCENARIO: A 32-year-old multipara delivers a vigorous 4,200 g infant via uncomplicated vaginal delivery. Forty-five minutes postpartum, the nurse notices excessive dark red vaginal bleeding pooling on the bed linens. Palpation of the abdomen reveals the uterine fundus is soft, boggy, and displaced 2 cm above the umbilicus and to the right.',
      questionText: 'Which clinical sequence should the nurse execute FIRST?',
      options: [
        'Perform vigorous fundal massage while assisting the client to empty her bladder, then administer IV oxytocin',
        'Immediately transport the client to the operating room for emergent hysterectomy',
        'Place the client in Trendelenburg position and pack the vagina with sterile gauze',
        'Administer intramuscular Methylergonovine before checking uterine tone'
      ],
      correctAnswer: 0,
      explanation: `Explanation
Uterine Atony (failure of myometrium to contract and compress bleeding spiral arterioles) is the leading cause of Postpartum Hemorrhage (PPH). A boggy fundus displaced upward and to the right is the classic hallmark of a Distended Urinary Bladder, which displaces the uterus and prevents proper mechanical myometrial contraction.

Priority management:
1. Fundal massage (stimulates immediate uterine myometrial contraction).
2. Evacuate the bladder (catheterization if unable to void spontaneously).
3. Administer uterotonic agents (Oxytocin IV infusion is first-line).

(Option 1) Fundal massage stimulates contraction immediately; emptying the bladder allows the uterus to descend into the pelvis and clamp down.
(Option 2) Surgical intervention is reserved for refractory PPH after conservative medical management fails.
(Option 3) Vaginal packing traps blood and obscures severe concealed hemorrhage.
(Option 4) Fundal massage and bladder relief come first; Methylergonovine has contraindications (hypertension) and is secondary to oxytocin.

Educational objective:
Uterine atony is the most common cause of postpartum hemorrhage. A boggy fundus displaced upward and to the right indicates urinary bladder distension; immediate fundal massage, bladder catheterization, and IV oxytocin are priorities.`,
      peerPercentages: [88, 3, 4, 5],
      topic: 'Obstetrics & Gynecological Nursing'
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // 6. NURSING FOUNDATIONS (FUNDAMENTALS)
  // ─────────────────────────────────────────────────────────────
  foundations: [
    {
      id: 'found-01',
      scenario: 'CLINICAL CASE SCENARIO: A nurse is preparing to insert an indwelling urinary (Foley) catheter for an 80-year-old female client prior to pelvic surgery. The sterile field is prepared on the overbed table. While donning the sterile gloves, the nurse\'s left gloved thumb accidentally brushes the non-sterile bed sheet.',
      questionText: 'Which action must the nurse take to maintain strict surgical asepsis?',
      options: [
        'Discard the contaminated gloves, perform hand hygiene, and open a new pair of sterile gloves',
        'Wipe the contaminated gloved thumb with an alcohol swab and continue insertion',
        'Proceed with catheter insertion since only the thumb made contact',
        'Complete the procedure using only the right hand'
      ],
      correctAnswer: 0,
      explanation: `Explanation
Surgical Asepsis (sterile technique) demands that sterile items remain sterile. If a sterile surface touches a non-sterile surface (such as the bed sheet or clothing), it is instantly contaminated.

Wiping a contaminated glove with alcohol does not sterilize it. Catheter-Associated Urinary Tract Infections (CAUTI) are a major source of healthcare-associated bacteremia. The nurse must immediately discard contaminated gloves, perform hand hygiene, and don a fresh sterile pair.

(Option 1) This strictly upholds the principles of surgical asepsis and prevents CAUTI.
(Option 2) Alcohol does not restore surgical sterility to a contaminated glove.
(Option 3) Breaching asepsis introduces uropathogens directly into the bladder.
(Option 4) Two sterile hands are required to manipulate the labia and catheter sterilely.

Educational objective:
Any contact between a sterile object and a non-sterile surface results in immediate contamination. The nurse must discard contaminated equipment, perform hand hygiene, and restart with new sterile supplies.`,
      peerPercentages: [96, 2, 1, 1],
      topic: 'Nursing Foundations (Fundamentals of Nursing)'
    },
    {
      id: 'found-02',
      scenario: 'CLINICAL CASE SCENARIO: An immobile 76-year-old client with severe cerebrovascular accident has a sacral wound. Assessment reveals full-thickness skin loss with exposed subcutaneous fat and yellow slough at the base of the wound bed, but no bone, tendon, or muscle is visible. Undermining of 1 cm is noted at the 3 o\'clock margin.',
      questionText: 'According to the National Pressure Injury Advisory Panel (NPIAP), which stage correctly classifies this pressure injury?',
      options: [
        'Stage 3 Pressure Injury',
        'Stage 2 Pressure Injury',
        'Stage 4 Pressure Injury',
        'Unstageable Pressure Injury'
      ],
      correctAnswer: 0,
      explanation: `Explanation
Staging criteria according to NPIAP:
- Stage 1: Non-blanchable erythema of intact skin.
- Stage 2: Partial-thickness skin loss with exposed dermis (shallow open ulcer, pink/red bed, or intact/ruptured serum-filled blister).
- Stage 3: Full-thickness skin loss in which adipose (subcutaneous fat) is visible, with slough/granulation tissue; undermining/tunneling may occur; bone, tendon, and muscle are NOT exposed.
- Stage 4: Full-thickness skin and tissue loss with exposed or directly palpable fascia, muscle, tendon, ligament, cartilage, or bone.
- Unstageable: Full-thickness skin loss where the true depth is completely obscured by slough or eschar.

(Option 1) Subcutaneous fat is visible without exposed bone or muscle, meeting Stage 3 criteria.
(Option 2) Stage 2 involves only the dermis; adipose tissue is not visible.
(Option 3) Stage 4 requires exposed bone, tendon, or muscle.
(Option 4) The base is visible enough to confirm depth into subcutaneous fat.

Educational objective:
A Stage 3 pressure injury involves full-thickness skin loss with visible subcutaneous adipose tissue, potential slough or tunneling, but no exposed bone, tendon, or muscle.`,
      peerPercentages: [85, 8, 4, 3],
      topic: 'Nursing Foundations (Fundamentals of Nursing)'
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // 7. COMMUNITY HEALTH NURSING
  // ─────────────────────────────────────────────────────────────
  community: [
    {
      id: 'comm-01',
      scenario: 'CLINICAL CASE SCENARIO: A public health nurse is monitoring the temperature log of the vaccine storage refrigerator at a community primary health center. The cold chain refrigerator contains BCG, Hepatitis B, Pentavalent, Rotavirus, and Measles-Rubella (MR) vaccines.',
      questionText: 'Which temperature range is the MANDATORY international standard for storing these vaccines in the cold chain?',
      options: [
        '+2°C to +8°C (+36°F to +46°F)',
        '-20°C to -10°C (-4°F to +14°F)',
        '+10°C to +15°C (+50°F to +59°F)',
        '0°C to +2°C (+32°F to +36°F)'
      ],
      correctAnswer: 0,
      explanation: `Explanation
The Vaccine Cold Chain is a temperature-controlled supply chain that preserves vaccine potency from manufacture to administration.

According to WHO and national immunization programs (UIP):
- Refrigerator storage temperature for all routine vaccines (BCG, DTP, Hep B, Hib, MR, Rotavirus, PCV) at health centers must be strictly maintained between +2°C and +8°C (+36°F to +46°F).
- Freezing sensitive vaccines (Hep B, Td, Pentavalent) destroys their adjuvant potency.
- Freezers (-15°C to -25°C) are used at national/regional depots primarily for OPV and ice pack preparation.

(Option 1) +2°C to +8°C is the universal standard storage temperature range for health center vaccine refrigerators.
(Option 2) Below freezing ruins freeze-sensitive vaccines.
(Option 3) Above +8°C causes rapid heat-induced denaturation of antigens.
(Option 4) Near 0°C risks accidental freezing.

Educational objective:
The required cold chain storage temperature for routine vaccines at primary healthcare facilities is strictly +2°C to +8°C (+36°F to +46°F). Freezing destroys freeze-sensitive liquid vaccines.`,
      peerPercentages: [92, 4, 2, 2],
      topic: 'Community Health Nursing'
    },
    {
      id: 'comm-02',
      scenario: 'CLINICAL CASE SCENARIO: A community health nurse is conducting an epidemiological investigation of a foodborne illness outbreak after a local banquet where 250 attendees ate a common meal. Within 6 hours, 75 attendees developed acute nausea, severe vomiting, and abdominal cramps. Stool cultures identify Staphylococcus aureus enterotoxin.',
      questionText: 'What is the Attack Rate for this acute outbreak?',
      options: [
        '30%',
        '25%',
        '15%',
        '50%'
      ],
      correctAnswer: 0,
      explanation: `Explanation
In epidemiology, the Attack Rate (a form of incidence rate used during epidemic outbreaks) measures the risk of contracting a disease among individuals exposed to a common source:

Attack Rate = (Number of new cases of disease during the outbreak / Total number of exposed persons at risk) × 100
Attack Rate = (75 cases / 250 exposed attendees) × 100 = 30%

(Option 1) (75 / 250) × 100 = 30%.
(Option 2) 25% is an arithmetic error.
(Option 3) 15% is an arithmetic error.
(Option 4) 50% is an arithmetic error.

Educational objective:
The attack rate in an outbreak investigation is calculated by dividing the number of ill persons by the total number of exposed individuals multiplied by 100.`,
      peerPercentages: [88, 6, 4, 2],
      topic: 'Community Health Nursing'
    }
  ]
};

// Subject mapping helper
function resolveTopicKey(topicName) {
  if (!topicName) return 'medsurg';
  const t = String(topicName).toLowerCase();
  if (t.includes('pharm') || t.includes('drug') || t.includes('medication')) return 'pharmacology';
  if (t.includes('pediatric') || t.includes('child') || t.includes('newborn') || t.includes('infant')) return 'pediatrics';
  if (t.includes('psych') || t.includes('mental') || t.includes('schiz') || t.includes('bipolar')) return 'psychiatry';
  if (t.includes('obg') || t.includes('obstetric') || t.includes('gynec') || t.includes('maternal') || t.includes('labour') || t.includes('labor') || t.includes('pregnan')) return 'obstetrics';
  if (t.includes('found') || t.includes('fundam') || t.includes('vital') || t.includes('infect') || t.includes('aseps')) return 'foundations';
  if (t.includes('commun') || t.includes('epidemiol') || t.includes('public')) return 'community';
  return 'medsurg';
}

/**
 * Procedural variation generator: takes an existing question and procedurally alters
 * minor clinical parameters (patient age, vitals, lab values) so repeat tests never show
 * literal carbon-copy identical strings.
 */
function createProceduralVariant(baseQuestion, variantIndex = 1) {
  const ageMatch = baseQuestion.scenario?.match(/A (\d+)-year-old/);
  const newAge = ageMatch ? (parseInt(ageMatch[1]) + (variantIndex * 3)) : 55;
  
  let newScenario = baseQuestion.scenario
    ? baseQuestion.scenario.replace(/A \d+-year-old/, `A ${newAge}-year-old`)
    : baseQuestion.scenario;

  return {
    ...baseQuestion,
    scenario: newScenario,
    questionText: `${newScenario}\n\n${baseQuestion.questionText}`,
    id: `${baseQuestion.id}-v${variantIndex}`
  };
}

/**
 * Returns a unique question for a given topic and difficulty level,
 * guaranteeing no repetition against alreadyAskedStems.
 */
function getTopicQuestion(topicName, difficultyLevel = 2, alreadyAskedStems = []) {
  const key = resolveTopicKey(topicName);
  const bank = TOPIC_BANKS[key] || TOPIC_BANKS['medsurg'];

  // Normalize alreadyAskedStems for robust matching
  const askedTexts = alreadyAskedStems.map(s => String(s || '').toLowerCase().substring(0, 40));

  // Find questions not yet asked in this session
  const unusedQuestions = bank.filter(q => {
    const qStem = String(q.scenario || q.questionText || '').toLowerCase().substring(0, 40);
    return !askedTexts.some(asked => asked && (asked.includes(qStem) || qStem.includes(asked)));
  });

  if (unusedQuestions.length > 0) {
    // Pick randomly from unused pool
    const selected = unusedQuestions[Math.floor(Math.random() * unusedQuestions.length)];
    const fullText = selected.scenario ? `${selected.scenario}\n\n${selected.questionText}` : selected.questionText;
    return {
      ...selected,
      questionText: fullText,
      topic: topicName || selected.topic,
      difficultyLevel: difficultyLevel || 2
    };
  }

  // If all specific questions in this topic have already been used,
  // pick from other banks or generate a procedural variant
  const allQuestions = Object.values(TOPIC_BANKS).flat();
  const globalUnused = allQuestions.filter(q => {
    const qStem = String(q.scenario || q.questionText || '').toLowerCase().substring(0, 40);
    return !askedTexts.some(asked => asked && (asked.includes(qStem) || qStem.includes(asked)));
  });

  if (globalUnused.length > 0) {
    const selected = globalUnused[Math.floor(Math.random() * globalUnused.length)];
    const fullText = selected.scenario ? `${selected.scenario}\n\n${selected.questionText}` : selected.questionText;
    return {
      ...selected,
      questionText: fullText,
      topic: topicName || selected.topic,
      difficultyLevel: difficultyLevel || 2
    };
  }

  // Fallback to procedural variant of a base question
  const base = bank[Math.floor(Math.random() * bank.length)];
  return createProceduralVariant(base, Math.floor(Math.random() * 10) + 1);
}

/**
 * Returns a list of N distinct questions for a topic (used for static test creation).
 */
function getTopicQuestionsList(topicName, count = 20, difficultyLevel = 2) {
  const results = [];
  const askedStems = [];

  for (let i = 0; i < count; i++) {
    const q = getTopicQuestion(topicName, difficultyLevel, askedStems);
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
