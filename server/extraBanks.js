/**
 * Authentic Question Banks for the 7 Specialized Nursing Subjects
 * Each bank contains 20 authentic questions strictly tiered into 4 difficulty levels:
 * - Questions 0-4:   Level 1 (Foundational Recall, normal values, definitions)
 * - Questions 5-9:   Level 2 (Base Clinical decision-making, standard care)
 * - Questions 10-14: Level 3 (Advanced Hard, clinical prioritization, adverse reactions)
 * - Questions 15-19: Level 4 (Peak Acuity Emergency, resuscitation, ICU, shock)
 */

module.exports = {

  // ─────────────────────────────────────────────────────────────
  // 13. COMMUNITY HEALTH NURSING
  // ─────────────────────────────────────────────────────────────
  "Community Health Nursing": [
    // L1: Foundational Recall
    { 
      text: "According to WHO and national immunization guidelines, what is the mandatory storage temperature range for the vaccine cold chain at the primary health center (PHC) level?", 
      options: ["-20°C to -10°C", "+2°C to +8°C", "+10°C to +15°C", "0°C to +4°C"], 
      answer: 1, 
      exp: "The vaccine cold chain at PHC, CHC, and sub-center levels must be maintained strictly between +2°C and +8°C." 
    },
    { 
      text: "Which level of disease prevention is exemplified by conducting routine Pap smear screenings and mammography?", 
      options: ["Primordial prevention", "Primary prevention", "Secondary prevention (early detection and prompt intervention)", "Tertiary prevention"], 
      answer: 2, 
      exp: "Secondary prevention focuses on early diagnosis and prompt treatment of subclinical disease before irreversible harm occurs." 
    },
    { 
      text: "Under the Universal Immunization Programme (UIP) in India, which vaccine is STRICTLY CONTRAINDICATED to be frozen?", 
      options: ["Oral Polio Vaccine (OPV)", "Measles/MR vaccine", "Hepatitis B and DPT/Pentavalent vaccines", "BCG vaccine"], 
      answer: 2, 
      exp: "Hepatitis B, DPT, TT, and Pentavalent vaccines contain aluminum adjuvants that precipitate and lose potency if frozen." 
    },
    { 
      text: "The Infant Mortality Rate (IMR) is demographically defined as the number of deaths of infants under 1 year of age per:", 
      options: ["100 total live births", "1,000 total live births", "10,000 total live births", "100,000 total live births"], 
      answer: 1, 
      exp: "IMR represents the ratio of infant deaths (<1 year) per 1,000 live births in a given calendar year." 
    },
    { 
      text: "Which chemical reagent test is used at the community water supply level to measure free residual chlorine following breakpoint chlorination?", 
      options: ["Benedict's qualitative test", "Orthotolidine (OT) / DPD test", "Biuret protein test", "Eschka reagent test"], 
      answer: 1, 
      exp: "The Orthotolidine (OT) or DPD test measures free and combined residual chlorine in drinking water (minimum 0.5 mg/L after 30 min)." 
    },
    // L2: Base Clinical Practice
    { 
      text: "A community health nurse suspects a vial of Pentavalent vaccine was accidentally exposed to sub-zero temperatures. To determine if the vaccine has been damaged by freezing, the nurse performs the:", 
      options: ["Mantoux tuberculin test", "Shake Test protocol", "Litmus paper test", "Centrifugation assay"], 
      answer: 1, 
      exp: "The Shake Test compares sedimentation rates of the suspected vial against a deliberately frozen control vial." 
    },
    { 
      text: "In the National Tuberculosis Elimination Program (NTEP), what is the first-line intensive phase regimen for drug-susceptible pulmonary tuberculosis?", 
      options: ["Isoniazid and Rifampicin for 6 months", "2 months of Isoniazid, Rifampicin, Pyrazinamide, and Ethambutol (2HRZE), followed by 4 months of HRE (4HRE)", "Streptomycin, Kanamycin, and Amikacin for 12 months", "Ciprofloxacin and Doxycycline for 3 months"], 
      answer: 1, 
      exp: "NTEP daily regimen: 2 months of HRZE daily followed by 4 months of HRE daily for drug-susceptible TB." 
    },
    { 
      text: "A postpartum woman in a rural community asks how long a Copper-T 380A intrauterine contraceptive device provides effective contraception. The nurse responds:", 
      options: ["3 years", "5 years", "10 years", "15 years"], 
      answer: 2, 
      exp: "Cu-T 380A is approved and clinically effective for up to 10 continuous years of reversible contraception." 
    },
    { 
      text: "During a home visit, the nurse identifies a low-birth-weight neonate weighing 1,800 grams with mild hypothermia (36.0°C). The community health nurse's primary immediate intervention is:", 
      options: ["Immersing the infant in a warm bath", "Initiating continuous skin-to-skin Kangaroo Mother Care (KMC) with exclusive breastfeeding", "Administering oral dextrose water", "Placing the infant directly under an electric heater"], 
      answer: 1, 
      exp: "KMC provides physiological thermal regulation, promotes exclusive breastfeeding, and significantly reduces neonatal mortality." 
    },
    { 
      text: "Which vector is biologically responsible for the transmission of Dengue fever and Chikungunya?", 
      options: ["Anopheles stephensi mosquito (night biter)", "Aedes aegypti mosquito (day biter, container breeder)", "Culex quinquefasciatus mosquito", "Phlebotomus argentipes sandfly"], 
      answer: 1, 
      exp: "Aedes aegypti breeds in clean standing domestic water containers and bites predominantly during daylight hours." 
    },
    // L3: Advanced Hard / Prioritization
    { 
      text: "During an acute foodborne disease outbreak in a residential school, 45 out of 150 students who consumed potato salad developed violent gastroenteritis within 4 hours. The nurse calculates the attack rate as:", 
      options: ["15%", "30%", "45%", "60%"], 
      answer: 1, 
      exp: "Attack rate = (Number of new cases / Population at risk exposed) x 100: (45 / 150) x 100 = 30%." 
    },
    { 
      text: "A client with Multi-Drug Resistant Tuberculosis (MDR-TB) is receiving an aminoglycoside (Kanamycin/Amikacin) and Levofloxacin. Which clinical monitoring is essential to prevent permanent toxicity?", 
      options: ["Monthly visual acuity checks only", "Baseline and monthly pure-tone audiometry for ototoxicity and serum creatinine for nephrotoxicity", "Liver biopsy every 2 weeks", "Daily complete blood counts"], 
      answer: 1, 
      exp: "Injectable aminoglycosides cause irreversible cochlear/vestibular ototoxicity and acute tubular nephrotoxicity." 
    },
    { 
      text: "A community health nurse has four home visits scheduled today. Which client must the nurse visit FIRST based on clinical urgency?", 
      options: ["A 55-year-old with stable hypertension needing routine medication refill", "A 4-day-old neonate with purulent umbilical drainage, foul odor, and lethargy (Omphalitis)", "A 32-year-old prenatal client at 16 weeks gestation for routine iron-folic acid distribution", "A 65-year-old client with osteoarthritic knee pain rated 4/10"], 
      answer: 1, 
      exp: "Neonatal omphalitis can rapidly deteriorate into fatal systemic septicemia within hours; immediate evaluation and IV antibiotic referral are vital." 
    },
    { 
      text: "In epidemiological surveillance, how does 'Sentinel Surveillance' differ from routine passive surveillance?", 
      options: ["It relies solely on annual death certificate registrations", "Selected high-quality reporting facilities actively monitor specific conditions to detect trends and missed cases", "It requires door-to-door surveying of every citizen weekly", "It tracks only animal reservoirs"], 
      answer: 1, 
      exp: "Sentinel surveillance uses pre-selected reporting sites to provide rapid, sensitive trends on specific diseases like HIV or influenza." 
    },
    { 
      text: "A village experiences a sudden surge in acute watery diarrhea following river flooding. To ensure potable drinking water for households, the nurse instructs villagers to boil water vigorously for at least:", 
      options: ["30 seconds", "1 full rolling minute (3 minutes at high altitude)", "30 minutes", "2 hours"], 
      answer: 1, 
      exp: "Vigorous rolling boiling for 1 minute kills virtually all enteric pathogens including Cryptosporidium, Giardia, Vibrio cholerae, and viruses." 
    },
    // L4: Peak Acuity Emergency
    { 
      text: "In a mass casualty disaster triage scenario (START protocol), the community triage nurse evaluates a victim with respirations 38 breaths/min, capillary refill 3.5 seconds, and confusion. The assigned triage tag is:", 
      options: ["GREEN (Minor / Walking Wounded)", "YELLOW (Delayed)", "RED (Immediate Priority 1)", "BLACK (Expectant / Deceased)"], 
      answer: 2, 
      exp: "Under START protocol, RPM criteria: Respirations >30/min, Perfusion (CRT >2s), or altered Mental status mandate an immediate RED tag." 
    },
    { 
      text: "An explosive outbreak of Cholera strikes an internally displaced persons (IDP) camp. A client arrives collapsed, radial pulses absent, sunken eyes, and skin tenting >3 seconds (Severe Dehydration). The nurse's IMMEDIATE action is:", 
      options: ["Encourage drinking sips of oral rehydration solution", "Rapid intravenous fluid resuscitation with Ringer's Lactate (100 mL/kg divided per WHO plan C protocol)", "Administer oral doxycycline tablets immediately", "Wait for laboratory stool culture confirmation"], answer: 1, exp: "Severe cholera dehydration causes fatal hypovolemic shock within hours; immediate high-volume IV Ringer's Lactate resuscitation is life-saving." },
    { 
      text: "A farmer is severely bitten on the face and neck by a confirmed rabid stray dog (Category III exposure). In addition to wound washing, the mandatory life-saving post-exposure prophylaxis (PEP) protocol is:", 
      options: ["Oral broad-spectrum antibiotics and tetanus toxoid only", "Immediate infiltration of Rabies Immunoglobulin (RIG) directly into and around all wound margins, plus full modern cell-culture Rabies Vaccine series", "Suturing the facial lacerations tightly without immunoglobulin", "Isolating the farmer in quarantine for 10 days"], 
      answer: 1, 
      exp: "Category III bites require both local infiltration of Rabies Immunoglobulin (RIG) into wounds and prompt active rabies vaccination." 
    },
    { 
      text: "During an organophosphate insecticide mass toxicity disaster in an agricultural community, patients present with pinpoint pupils, bronchospasm, profuse secretions, bradycardia, and muscle fasciculations. The priority antidote titration is:", 
      options: ["Intravenous Naloxone bolus", "Intravenous Atropine Sulfate titrated until bronchial secretions dry and airway clears, plus Pralidoxime (2-PAM)", "Intravenous Flumazenil", "Subcutaneous Epinephrine"], 
      answer: 1, 
      exp: "Atropine competes with acetylcholine at muscarinic receptors; titration to clear airway secretions is the primary life-saving goal." 
    },
    { 
      text: "A chemical factory explosion releases chlorine gas into a surrounding community. Victims present with acute laryngeal edema, chemical pneumonitis, and severe dyspnea. The primary emergency response is:", 
      options: ["Instructing residents to stay in basements and low-lying ground", "Evacuation upwind and uphill, immediate decontamination, 100% humidified oxygen, and emergency airway support", "Inducing emesis in all casualties", "Administering oral activated charcoal"], 
      answer: 1, 
      exp: "Chlorine gas is heavier than air; evacuation must be upwind and to higher elevations, followed by rapid decontamination and respiratory support." 
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // 14. ANATOMY & PHYSIOLOGY
  // ─────────────────────────────────────────────────────────────
  "Anatomy & Physiology": [
    // L1: Foundational Recall
    { 
      text: "How many total bones comprise the adult human skeletal system, and how many are found in the axial skeleton?", 
      options: ["180 total; 60 axial", "206 total; 80 axial", "214 total; 126 axial", "300 total; 100 axial"], 
      answer: 1, 
      exp: "The adult human skeleton contains 206 bones: 80 in the axial skeleton (skull, vertebral column, ribs, sternum) and 126 in the appendicular skeleton." 
    },
    { 
      text: "What is the microscopic structural and functional contractile unit of human skeletal muscle tissue?", 
      options: ["Myofibril", "Sarcomere (bordered by Z-discs)", "Fascicle", "Sarcoplasmic reticulum"], 
      answer: 1, 
      exp: "The sarcomere is the segment between two adjacent Z-lines containing overlapping actin and myosin filaments." 
    },
    { 
      text: "Which cranial nerve provides extensive parasympathetic motor innervation to the heart, bronchi, stomach, and small intestines?", 
      options: ["Cranial Nerve V (Trigeminal)", "Cranial Nerve VII (Facial)", "Cranial Nerve X (Vagus nerve)", "Cranial Nerve XII (Hypoglossal)"], 
      answer: 2, 
      exp: "Cranial Nerve X (Vagus) conveys parasympathetic preganglionic fibers regulating thoracic and abdominal viscera." 
    },
    { 
      text: "In normal cardiac circulation, deoxygenated blood returning from systemic circulation traverses which cardiac valves in correct anatomical order?", 
      options: ["Mitral -> Aortic -> Tricuspid -> Pulmonary", "Tricuspid -> Pulmonary -> Mitral -> Aortic", "Pulmonary -> Tricuspid -> Aortic -> Mitral", "Aortic -> Mitral -> Pulmonary -> Tricuspid"], 
      answer: 1, 
      exp: "Venous blood enters right atrium -> Tricuspid valve -> Right ventricle -> Pulmonary valve -> Lungs -> Left atrium -> Mitral valve -> Left ventricle -> Aortic valve." 
    },
    { 
      text: "What is the microscopic functional unit of the human kidney responsible for blood ultrafiltration and urine formation?", 
      options: ["Glomerulus only", "Nephron (renal corpuscle and tubule system)", "Major calyx", "Renal pyramid"], 
      answer: 1, 
      exp: "Each kidney contains approximately 1 to 1.2 million nephrons, the fundamental functional filtration units." 
    },
    // L2: Base Clinical Practice
    { 
      text: "In renal physiology, what physiological stimulus triggers the juxtaglomerular apparatus to release the enzyme Renin?", 
      options: ["Hypervolemia and hypertension", "Decreased renal perfusion pressure, reduced renal sodium delivery to the macula densa, or sympathetic beta-1 stimulation", "Excessive dietary potassium intake", "Elevated atrial natriuretic peptide (ANP)"], 
      answer: 1, 
      exp: "Hypoperfusion, hypotension, or hyponatremia stimulates renin secretion, initiating the RAAS vasoconstriction cascade." 
    },
    { 
      text: "What is the primary physiological function of pulmonary surfactant secreted by alveolar Type II pneumocytes?", 
      options: ["Facilitating red blood cell synthesis in lung capillaries", "Lowering alveolar surface tension at end-expiration, preventing alveolar collapse (atelectasis)", "Phagocytizing inhaled bacterial debris", "Neutralizing acidic gastric aspirate"], 
      answer: 1, 
      exp: "Dipalmitoylphosphatidylcholine in surfactant reduces surface tension in inverse proportion to alveolar radius, stabilizing alveoli." 
    },
    { 
      text: "The intrinsic electrical conduction of the healthy human heart originates at which primary pacemaker structure?", 
      options: ["Atrioventricular (AV) node", "Sinoatrial (SA) node (located at the junction of superior vena cava and right atrium)", "Bundle of His", "Purkinje fiber network"], 
      answer: 1, 
      exp: "The SA node possesses the highest intrinsic pacemaker automaticity (60–100 depolarizations/min)." 
    },
    { 
      text: "Where is Cerebrospinal Fluid (CSF) predominantly produced, and where is it primarily reabsorbed back into the venous circulation?", 
      options: ["Produced in the cerebral cortex; reabsorbed in spinal central canal", "Produced by the choroid plexuses in brain ventricles; reabsorbed through arachnoid granulations into the superior sagittal sinus", "Produced in the pituitary gland; reabsorbed in jugular vein", "Produced in cerebellar vermis; reabsorbed in lymphatic ducts"], 
      answer: 1, 
      exp: "Choroid plexus ependymal cells produce ~500 mL CSF/day, flowing through ventricular apertures and draining via arachnoid villi." 
    },
    { 
      text: "Which hormone secreted by the thyroid gland decreases serum calcium levels by inhibiting osteoclastic bone resorption?", 
      options: ["Parathyroid Hormone (PTH)", "Calcitonin", "Thyroxine (T4)", "Triiodothyronine (T3)"], 
      answer: 1, 
      exp: "Calcitonin, secreted by thyroid parafollicular C-cells, counters PTH by reducing osteoclast activity and lowering serum calcium." 
    },
    // L3: Advanced Hard / Prioritization
    { 
      text: "According to the Frank-Starling mechanism of the heart, what is the direct physiological effect of increasing end-diastolic myocardial sarcomere stretch (preload)?", 
      options: ["Decreased myocardial contractility and decreased cardiac output", "Increased force of ventricular contraction and increased stroke volume up to an optimal physiological limit", "Immediate development of complete AV block", "Profound systemic arterial vasodilation"], 
      answer: 1, 
      exp: "Greater end-diastolic filling increases actin-myosin overlap and calcium sensitivity, producing stronger contraction." 
    },
    { 
      text: "Which cluster of physiological conditions causes a 'RIGHT SHIFT' in the oxyhemoglobin dissociation curve (facilitating oxygen unloading to tissues)?", 
      options: ["Alkalosis, hypothermia, low 2,3-BPG, and low PaCO2", "Acidosis (low pH), hypercapnia (high PaCO2), hyperthermia (fever), and elevated 2,3-BPG (Bohr effect)", "Carbon monoxide poisoning and fetal hemoglobin", "High altitude polycythemia with respiratory alkalosis"], 
      answer: 1, 
      exp: "Acidosis, fever, hypercapnia, and high 2,3-BPG decrease hemoglobin's affinity for oxygen, enhancing oxygen delivery to metabolically active tissues." 
    },
    { 
      text: "A patient displays hyperactive deep tendon reflexes (4+), ankle clonus, spastic paralysis, and a positive Babinski sign. This constellation confirms:", 
      options: ["A Lower Motor Neuron (LMN) lesion", "An Upper Motor Neuron (UMN) lesion along the corticospinal pathway", "Peripheral sensory neuropathy", "Myasthenia gravis"], 
      answer: 1, 
      exp: "UMN lesions eliminate descending cortical inhibition, resulting in spasticity, hyperreflexia, and extensor plantar responses." 
    },
    { 
      text: "The countercurrent multiplier mechanism that establishes high hyperosmolarity in the renal medullary interstitium depends primarily on active transport in the:", 
      options: ["Proximal convoluted tubule", "Thick ascending limb of the loop of Henle (Na+/K+/2Cl- symporter)", "Thin descending limb of Henle", "Cortical collecting tubule"], 
      answer: 1, 
      exp: "The thick ascending limb actively pumps out NaCl without water permeability, creating the hyperosmotic medullary gradient essential for urine concentration." 
    },
    { 
      text: "An occlusion of the Left Anterior Descending (LAD) coronary artery impairs perfusion to which critical anatomical cardiac structures?", 
      options: ["Right atrium and SA node only", "Anterior two-thirds of the interventricular septum, anterior left ventricular wall, and cardiac apex", "Posterior left ventricular wall and AV node", "Right ventricular free wall"], 
      answer: 1, 
      exp: "The LAD artery supplies the anterior ventricular septum and anterior LV wall; occlusion causes extensive anterior STEMI and cardiogenic failure." 
    },
    // L4: Peak Acuity Emergency
    { 
      text: "According to the Monro-Kellie hypothesis, what must occur when an intracranial mass or hematoma expands inside the rigid, non-compliant adult cranium?", 
      options: ["Intracranial pressure drops paradoxically", "Compensatory displacement and extrusion of CSF into the spinal subarachnoid space and venous blood into jugular veins", "Immediate doubling of brain parenchymal volume", "Increase in cerebral arterial caliber"], 
      answer: 1, 
      exp: "The cranial vault is rigid (Brain + Blood + CSF = Constant). Any volume increase forces CSF and venous blood out until compliance is exhausted." 
    },
    { 
      text: "In evaluating hemodynamic shock states, a patient with low cardiac output (CO), high systemic vascular resistance (SVR >1400 dynes), and high pulmonary capillary wedge pressure (PCWP >18 mmHg) is in:", 
      options: ["Distributive / Septic shock", "Cardiogenic shock (pump failure)", "Neurogenic shock", "Hypovolemic shock"], 
      answer: 1, 
      exp: "Cardiogenic shock is characterized by primary pump failure (low CO/CI), pulmonary congestion (high PCWP), and compensatory vasoconstriction (high SVR)." 
    },
    { 
      text: "What is the primary underlying pathophysiology of acute compartment syndrome following lower extremity trauma?", 
      options: ["Systemic arterial hypotension reducing muscle perfusion", "Elevated intracompartmental tissue pressure exceeding capillary perfusion pressure (>30 mmHg), causing microvascular collapse, muscle ischemia, and necrosis", "Rupture of the femoral vein", "Loss of parasympathetic nerve tone"], 
      answer: 1, 
      exp: "Tissue pressure exceeding venous/capillary pressure halts capillary flow, precipitating irreversible neuromuscular necrosis within 4-6 hours." 
    },
    { 
      text: "In Acute Respiratory Distress Syndrome (ARDS), what histological and physiological disruption causes profound, refractory hypoxemia?", 
      options: ["Isolated bronchospasm relieved by albuterol", "Diffuse alveolar epithelial and capillary endothelial injury, leading to protein-rich alveolar flooding, surfactant inactivation, and physiological intrapulmonary shunting", "Bronchial foreign body obstruction", "Pleural effusion without parenchymal involvement"], 
      answer: 1, 
      exp: "Non-cardiogenic pulmonary edema and alveolar collapse create right-to-left intrapulmonary shunt refractory to high FiO2." 
    },
    { 
      text: "An ICU patient with severe head trauma develops expanding uncal transtentorial herniation. Compression of which anatomical structures causes the classic fixed, dilated unilateral pupil and contralateral hemiplegia?", 
      options: ["Cranial nerve VII and optic chiasm", "Ipsilateral Cranial Nerve III (Oculomotor nerve) and the cerebral peduncle (corticospinal tract)", "Cranial Nerve VIII and pons", "Pituitary stalk and thalamus"], 
      answer: 1, 
      exp: "Medial temporal lobe uncus herniates across the tentorial notch, compressing the ipsilateral CN III (causing blown pupil) and crus cerebri." 
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // 15. MEDICAL-SURGICAL NURSING
  // ─────────────────────────────────────────────────────────────
  "Medical-Surgical Nursing": [
    // L1: Foundational Recall
    { 
      text: "Under American Society of Anesthesiologists (ASA) fasting guidelines, what is the minimum required fasting duration for clear liquids prior to elective surgery?", 
      options: ["30 minutes", "2 hours", "6 hours", "12 hours"], 
      answer: 1, 
      exp: "Clear liquids (water, pulp-free juice, black coffee) are permitted up to 2 hours prior to elective procedural sedation or anesthesia." 
    },
    { 
      text: "A postoperative surgical wound opens with visible separation of incision edges without organ protrusion. The nurse documents this complication as:", 
      options: ["Wound evisceration", "Wound dehiscence", "Keloid formation", "First-intention healing"], 
      answer: 1, 
      exp: "Dehiscence is the separation of surgical margins. Evisceration involves the extrusion of internal viscera through the wound." 
    },
    { 
      text: "What is the earliest and most sensitive clinical indicator of developing hypoxemia in a postoperative client?", 
      options: ["Central cyanosis of mucous membranes", "Restlessness, anxiety, agitation, and mild tachycardia", "Coma and flaccid paralysis", "Severe clubbing of the fingers"], 
      answer: 1, 
      exp: "Cerebral hypoxemia manifests earliest as behavioral changes: restlessness, subtle anxiety, irritability, and tachypnea." 
    },
    { 
      text: "Which intervention is the most fundamental, evidence-based nursing measure to prevent postoperative pulmonary atelectasis?", 
      options: ["Complete bedrest for 72 hours", "Hourly sustained maximal inspiration using an Incentive Spirometer with coughing and deep breathing", "Administering cough suppressants", "Restricting oral fluid intake"], 
      answer: 1, 
      exp: "Incentive spirometry inflates collapsed alveoli via sustained negative intrathoracic pressure, preventing atelectasis." 
    },
    { 
      text: "In managing a closed underwater-seal chest drainage system, what is the significance of continuous, vigorous bubbling in the water-seal chamber?", 
      options: ["Expected normal functioning during expiration", "A persistent air leak within the drainage system or patient's pleural space", "Blockage or clot in the chest tube", "The lung has fully expanded"], 
      answer: 1, 
      exp: "Intermittent bubbling with coughing/expiration is normal, but continuous bubbling indicates a leak in the tube, connections, or chest wall." 
    },
    // L2: Base Clinical Practice
    { 
      text: "A client presenting with suspected acute appendicitis exhibits rebound tenderness at McBurney's point. Where is this point anatomically located?", 
      options: ["Directly over the symphysis pubis", "One-third of the distance from the anterior superior iliac spine (ASIS) to the umbilicus in the right lower quadrant", "Midway between xiphoid process and umbilicus", "Left lower quadrant midclavicular line"], 
      answer: 1, 
      exp: "McBurney's point corresponds to the base of the appendix: 1/3 distance from the right ASIS to the umbilicus." 
    },
    { 
      text: "A client who underwent a subtotal gastrectomy for gastric cancer reports cramping abdominal pain, diaphoresis, flushing, palpitations, and diarrhea 20 minutes after eating. The nurse identifies:", 
      options: ["Paralytic ileus", "Early Dumping Syndrome caused by rapid hyperosmolar carbohydrate emptying into the jejunum", "Acute peritonitis", "Gastric ulcer perforation"], 
      answer: 1, 
      exp: "Dumping syndrome results from hypertonic chyme rapidly entering the jejunum, shifting fluid intravascularly to lumen." 
    },
    { 
      text: "A client with Chronic Obstructive Pulmonary Disease (COPD) with chronic CO2 retention is prescribed oxygen therapy. Why should high-flow FiO2 be used with extreme caution?", 
      options: ["It causes instant pulmonary fibrosis", "Blunting the client's hypoxic respiratory drive by eliminating hypoxemia as the stimulus to breathe", "High oxygen destroys surfactant immediately", "It causes rapid hypoglycemia"], 
      answer: 1, 
      exp: "In chronic hypercapnia, chemoreceptors adapt to high CO2, making hypoxemia the primary respiratory drive; uncontrolled O2 can induce hypoventilation." 
    },
    { 
      text: "When assessing a client with suspected deep vein thrombosis (DVT) in the left calf, which nursing action is STRICTLY CONTRAINDICATED?", 
      options: ["Measuring bilateral calf circumferences with a tape measure", "Vigorously massaging the left calf or performing aggressive Homan's sign dorsiflexion", "Elevating the affected extremity", "Maintaining strict bedrest until anticoagulation is initiated"], 
      answer: 1, 
      exp: "Massaging or forcefully manipulating the calf can dislodge the thrombus, triggering a fatal pulmonary embolism." 
    },
    { 
      text: "A client with peptic ulcer disease reports burning epigastric gnawing pain that occurs 2 to 3 hours after meals and frequently awakens the client at 2:00 AM. This presentation is classic for:", 
      options: ["Gastric ulcer", "Duodenal ulcer (relieved by food, exacerbated on empty stomach)", "Esophageal varices", "Acute pancreatitis"], 
      answer: 1, 
      exp: "Duodenal ulcers cause postprandial pain when stomach acid enters an empty duodenum 2-3 hours post-meal, relieved by food or antacids." 
    },
    // L3: Advanced Hard / Prioritization
    { 
      text: "A client with acute pancreatitis develops bluish periumbilical ecchymosis (Cullen's sign) and flank ecchymosis (Grey Turner's sign). What life-threatening complication do these signs signify?", 
      options: ["Benign superficial subcutaneous bruising", "Severe necrotizing pancreatitis with extensive retroperitoneal hemorrhage", "Acute cholecystitis with gallstones", "Intestinal perforation from diverticulitis"], 
      answer: 1, 
      exp: "Cullen's and Grey Turner's signs indicate retroperitoneal blood dissecting along tissue planes, heralding high mortality." 
    },
    { 
      text: "A client who underwent an open exploratory laparotomy suddenly cries out that 'something popped inside.' The nurse inspects the wound and discovers loops of bowel protruding through the incision. The immediate action is:", 
      options: ["Push the bowel loops back into the abdominal cavity firmly with clean hands", "Cover the protruding organs with sterile gauze moistened with warm sterile normal saline, place client in low Fowler's with knees flexed, and notify surgeon", "Administer oral pain medication", "Apply a dry elastic abdominal binder tightly"], 
      answer: 1, 
      exp: "Moist saline-soaked sterile dressings protect bowel viability and prevent drying; flexed knees reduce abdominal wall tension." 
    },
    { 
      text: "A client with end-stage cirrhosis has a Sengstaken-Blakemore tube in place for bleeding esophageal varices. The client suddenly displays acute respiratory distress, cyanosis, and tachycardia. The nurse's FIRST action is to:", 
      options: ["Increase the traction on the tube", "Keep a pair of scissors at the bedside and immediately cut all lumens of the tube to deflate the balloons and extract it from the airway", "Administer intravenous morphine", "Call for a portable chest X-ray"], 
      answer: 1, 
      exp: "If the gastric balloon ruptures or deflates, the esophageal balloon migrates upward, occluding the larynx; cutting the lumens deflates balloons instantly." 
    },
    { 
      text: "An oncology client receiving high-dose chemotherapy develops fever (38.6°C), shivering, and an Absolute Neutrophil Count (ANC) of 320/mm3 (Febrile Neutropenia). What is the mandatory time frame for initiating empiric broad-spectrum IV antibiotics?", 
      options: ["Within 1 hour of fever presentation ('The Golden Hour')", "Within 12 hours", "Only after 48 hours of blood culture incubation", "After white blood cell count returns to normal"], 
      answer: 0, 
      exp: "Neutropenic fever is an oncologic emergency; pseudomonal sepsis can be fatal within hours unless IV antibiotics begin within 60 minutes." 
    },
    { 
      text: "A client with chronic kidney disease on hemodialysis presents with muscle weakness and a serum potassium of 7.2 mEq/L. The 12-lead ECG shows tall peaked T-waves, PR prolongation, and widening QRS. The nurse's immediate priority medication is:", 
      options: ["Oral Kayexalate (sodium polystyrene sulfonate)", "Intravenous Calcium Gluconate 10% infused over 2 to 3 minutes", "Oral potassium bicarbonate", "Subcutaneous heparin"], 
      answer: 1, 
      exp: "IV Calcium Gluconate instantly stabilizes myocardial cell membranes against hyperkalemic dysrhythmias and arrest." 
    },
    // L4: Peak Acuity Emergency
    { 
      text: "A 70 kg client sustains second- and third-degree thermal burns covering 40% Total Body Surface Area (TBSA). Using the Parkland Formula (4 mL x kg x % TBSA), what is the total crystalloid volume required in the first 24 hours, and how much is given in the first 8 hours?", 
      options: ["5,600 mL total; 2,800 mL in first 8 hours", "11,200 mL total; 5,600 mL in first 8 hours from time of injury", "8,000 mL total; 4,000 mL in first 8 hours", "14,000 mL total; 7,000 mL in first 8 hours"], 
      answer: 1, 
      exp: "Parkland: 4 x 70 x 40 = 11,200 mL Lactated Ringer's. Half (5,600 mL) must be infused in the first 8 hours from the time the burn occurred." 
    },
    { 
      text: "A client with a closed tibial fracture placed in a full leg cast 4 hours ago reports excruciating pain rated 10/10 that is unresponsive to IV opioids. Passive dorsiflexion of the toes triggers agonizing pain, and paresthesias are developing. The nurse anticipates:", 
      options: ["Administering a higher dose of oral sedatives and elevating limb above heart", "Immediately bivalving the cast, releasing all circumferential dressings, and preparing for emergent surgical fasciotomy", "Applying ice packs directly onto the plaster cast", "Encouraging the client to walk on the leg"], 
      answer: 1, 
      exp: "Pain out of proportion and paresthesias signal Acute Compartment Syndrome; immediate decompression by bivalving cast and emergent fasciotomy prevents limb loss." 
    },
    { 
      text: "A client on postoperative day 3 following total hip arthroplasty suddenly develops acute pleuritic chest pain, dyspnea, SpO2 82%, tachycardia (138 bpm), and hemoptysis. What is the immediate priority medical management for massive pulmonary embolism?", 
      options: ["Immediate intravenous Unfractionated Heparin bolus and infusion, with preparation for systemic thrombolysis (Alteplase) or catheter embolectomy", "Oral aspirin 81 mg and discharge to home", "Antibiotic therapy for hospital-acquired pneumonia", "Stat lumbar puncture"], 
      answer: 0, 
      exp: "Acute massive PE with hemodynamic instability requires immediate anticoagulation and emergent reperfusion via thrombolytics or embolectomy." 
    },
    { 
      text: "A client presenting with crushing substernal chest pain displays 3 mm ST-segment elevation in leads V1 through V4 on 12-lead ECG (Anterior STEMI). What is the national ACC/AHA benchmark door-to-balloon time for primary Percutaneous Coronary Intervention (PCI)?", 
      options: ["Within 30 minutes", "Within 90 minutes of hospital arrival", "Within 6 hours", "Within 24 hours"], 
      answer: 1, 
      exp: "Door-to-balloon time for primary PCI in acute STEMI must be achieved within 90 minutes to salvage ischemic myocardium." 
    },
    { 
      text: "A mechanically ventilated patient with severe ARDS is receiving high PEEP (16 cmH2O). The high-pressure ventilator alarm sounds, BP drops from 124/78 to 68/38 mmHg, HR rises to 144 bpm, and breath sounds are absent on the left with rightward tracheal deviation. The nurse's immediate action is:", 
      options: ["Disconnect ventilator and administer inhaled bronchodilators", "Immediate emergency needle thoracostomy decompression in the 2nd left intercostal space, midclavicular line", "Order an emergency portable chest X-ray", "Infuse 1000 mL normal saline"], 
      answer: 1, 
      exp: "Tension pneumothorax with obstructive shock is a fatal emergency; waiting for a chest X-ray causes arrest. Decompress immediately." 
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // 16. EMERGENCY & CRITICAL CARE NURSING
  // ─────────────────────────────────────────────────────────────
  "Emergency & Critical Care Nursing": [
    // L1: Foundational Recall
    { 
      text: "According to current American Heart Association (AHA) and ERC resuscitation guidelines, what is the recommended chest compression rate for adult basic life support (BLS)?", 
      options: ["60 to 80 compressions/min", "80 to 100 compressions/min", "100 to 120 compressions/min", "140 to 160 compressions/min"], 
      answer: 2, 
      exp: "High-quality CPR mandates a compression rate of 100 to 120 per minute with full chest recoil between compressions." 
    },
    { 
      text: "What is the recommended chest compression-to-ventilation ratio for a single rescuer performing CPR on an adult victim in cardiac arrest?", 
      options: ["15 compressions to 2 breaths", "30 compressions to 2 breaths", "50 compressions to 5 breaths", "Continuous compressions without breaths"], 
      answer: 1, 
      exp: "Single-rescuer adult CPR utilizes 30 compressions followed by 2 rescue breaths (each delivered over 1 second)." 
    },
    { 
      text: "In the primary survey of trauma resuscitation, what does the mnemonic 'ABCDE' systematically represent?", 
      options: ["Airway with C-spine, Breathing, Circulation, Disability, Exposure/Environment", "Assessment, Blood pressure, Chest compressions, Defibrillation, Evaluation", "Airway, Bandaging, Circulation, Drugs, Electrocardiogram", "Alertness, Breathing, Cardiac rate, Diet, Exercise"], 
      answer: 0, 
      exp: "Primary trauma survey: Airway maintenance with cervical spine protection, Breathing, Circulation, Disability, Exposure." 
    },
    { 
      text: "What is the universal international sign of severe foreign body airway obstruction (choking)?", 
      options: ["Waving arms vigorously in the air", "Clutching the neck/throat with one or both hands", "Loud, clear coughing", "Lying supine with eyes closed"], 
      answer: 1, 
      exp: "Clutching the throat with hands is the universal choking sign, indicating inability to speak, cough, or breathe." 
    },
    { 
      text: "During cardiopulmonary resuscitation on an adult, what is the minimum recommended chest compression depth?", 
      options: ["1 inch (2.5 cm)", "At least 2 inches (5 cm) but no more than 2.4 inches (6 cm)", "3 inches (7.5 cm)", "0.5 inches (1.2 cm)"], 
      answer: 1, 
      exp: "AHA guidelines specify compressing to a depth of at least 2 inches (5 cm) while avoiding excessive depths >2.4 inches." 
    },
    // L2: Base Clinical Practice
    { 
      text: "When applying Automated External Defibrillator (AED) electrode pads on an adult patient in cardiac arrest, where are the pads correctly positioned?", 
      options: ["Directly over the center of the sternum and over the spine", "Upper right anterior chest below the clavicle and lower left lateral chest midaxillary line (anterolateral position)", "Both pads placed on the left side of the chest", "Over the upper abdomen and lower back"], 
      answer: 1, 
      exp: "Standard anterolateral placement places one pad below right clavicle and the other lateral to left nipple in midaxillary line." 
    },
    { 
      text: "A client presenting with severe active anterior epistaxis is being managed in the emergency department. The nurse positions the client:", 
      options: ["Lying flat on the back with neck hyperextended", "Sitting upright and leaning slightly forward while firmly pinching the soft lower portion of the nose for 10 to 15 minutes", "Trendelenburg position with cold compress on neck", "Prone position with ice in mouth"], 
      answer: 1, 
      exp: "Leaning forward prevents swallowing or aspirating blood into the airway, while pinching compresses Kiesselbach's plexus." 
    },
    { 
      text: "An athlete collapses during marathon running in high heat and humidity: core body temperature is 41.1°C (106°F), skin is hot and dry, and the athlete is confused (Heat Stroke). The immediate priority intervention is:", 
      options: ["Administering oral antipyretic tablets (acetaminophen)", "Immediate evaporative cooling and cold-water immersion until core temperature drops below 38.9°C (102°F)", "Infusing iced 5% dextrose water subcutaneously", "Giving hot oral electrolyte fluids"], 
      answer: 1, 
      exp: "Heat stroke is a medical emergency requiring rapid cooling via cold-water immersion or evaporative misting to halt organ damage." 
    },
    { 
      text: "A client arrives in the emergency center in hypovolemic shock following major trauma. What is the preferred initial intravenous crystalloid solution for rapid fluid resuscitation?", 
      options: ["5% Dextrose in Water (D5W)", "0.45% Half-Normal Saline", "Warmed isotonic crystalloids (0.9% Normal Saline or Lactated Ringer's solution)", "Sterile water for injection"], 
      answer: 2, 
      exp: "Isotonic crystalloids (Normal Saline or Lactated Ringer's) remain predominantly within the intravascular compartment to restore circulating volume." 
    },
    { 
      text: "A trauma client presents with a segment of the anterior chest wall moving paradoxically (sucking inward on inspiration and ballooning outward on expiration). The nurse recognizes:", 
      options: ["Simple rib fracture", "Flail Chest caused by multiple rib fractures in two or more places", "Cardiac tamponade", "Diaphragmatic rupture"], 
      answer: 1, 
      exp: "Flail chest disrupts thoracic wall integrity, producing paradoxical respiration that impairs ventilation." 
    },
    // L3: Advanced Hard / Prioritization
    { 
      text: "Under Advanced Cardiovascular Life Support (ACLS) protocols, which two cardiac arrest rhythms are classified as 'SHOCKABLE' with immediate defibrillation?", 
      options: ["Asystole and Pulseless Electrical Activity (PEA)", "Ventricular Fibrillation (VF) and Pulseless Ventricular Tachycardia (pVT)", "Sinus Bradycardia and Atrial Fibrillation", "First-degree AV block and Junctional rhythm"], 
      answer: 1, 
      exp: "VF and pulseless VT are shockable rhythms. Defibrillation delivers unsynchronized energy to reset chaotic electrical activity." 
    },
    { 
      text: "In ACLS, what are the primary reversible causes of cardiac arrest summarized by the '5 Hs and 5 Ts'?", 
      options: ["Headache, Hunger, Heat, Hernia, Hearing; Tinnitus, Tremor, Tetanus, Tics, Trauma", "Hypovolemia, Hypoxia, Hydrogen ion (acidosis), Hypo/Hyperkalemia, Hypothermia; Tension pneumothorax, Tamponade, Toxins, Thrombosis (pulmonary), Thrombosis (coronary)", "Hyperglycemia, Hepatitis, Hemorrhoids, Herpes, Hives; Tonsillitis, Tendonitis, Tracheitis, Thyroiditis, Ticks", "Hypertension, Hyperlipidemia, Heartburn, Hypernatremia, Hiccoughs; Tuberculosis, Typhoid, Tetanus, Trauma, Tumors"], 
      answer: 1, 
      exp: "The 5 Hs and 5 Ts represent the standard reversible underlying etiologies requiring systematic exclusion during cardiac arrest." 
    },
    { 
      text: "A client in the emergency department develops severe anaphylactic shock following an ampicillin injection: stridor, facial angioedema, and BP 70/40 mmHg. The FIRST-LINE medication that must be administered immediately is:", 
      options: ["Intravenous Diphenhydramine 50 mg", "Intravenous Hydrocortisone 100 mg", "Intramuscular Epinephrine (1:1,000) 0.3 to 0.5 mg into the anterolateral thigh", "Inhaled Salbutamol nebulizer"], 
      answer: 2, 
      exp: "Intramuscular Epinephrine into the vastus lateralis is the single first-line life-saving drug in anaphylaxis." 
    },
    { 
      text: "An arterial blood gas (ABG) report for a client in respiratory distress reveals: pH 7.20, PaCO2 68 mmHg, PaO2 55 mmHg, and HCO3 24 mEq/L. The nurse interprets this as:", 
      options: ["Fully compensated metabolic alkalosis", "Acute uncompensated respiratory acidosis with moderate hypoxemia", "Uncompensated metabolic acidosis", "Compensated respiratory alkalosis"], 
      answer: 1, 
      exp: "pH <7.35 (acidosis) with elevated PaCO2 >45 mmHg and normal HCO3 confirms acute uncompensated respiratory acidosis." 
    },
    { 
      text: "In a patient undergoing Massive Transfusion Protocol (MTP) for exsanguinating trauma, what balanced ratio of blood products is current standard of care?", 
      options: ["10 units PRBCs to 1 unit FFP", "1:1:1 ratio (1 unit Packed Red Blood Cells : 1 unit Fresh Frozen Plasma : 1 unit Platelets)", "PRBCs only with normal saline boluses", "Whole blood with high-dose heparin"], 
      answer: 1, 
      exp: "1:1:1 balanced resuscitation replicates whole blood, preventing dilution of clotting factors, hypofibrinogenemia, and trauma-induced coagulopathy." 
    },
    // L4: Peak Acuity Emergency
    { 
      text: "An emergency trauma client develops acute Cardiac Tamponade. Which classic triad of physical signs (Beck's Triad) confirms this life-threatening obstructive shock?", 
      options: ["Hypertension, bradycardia, and irregular respirations", "Hypotension with narrowed pulse pressure, Jugular Venous Distension (JVD), and Muffled/Distant heart sounds", "Fever, tachycardia, and pleuritic friction rub", "Wide pulse pressure, bounding pulses, and systolic murmur"], 
      answer: 1, 
      exp: "Beck's Triad indicates fluid accumulating in pericardium, compressing ventricles and precipitating cardiac arrest; emergency pericardiocentesis is needed." 
    },
    { 
      text: "A client in septic shock has received 30 mL/kg crystalloids but Mean Arterial Pressure (MAP) remains 52 mmHg with serum lactate 5.4 mmol/L. What is the FIRST-LINE vasopressor of choice to titrate?", 
      options: ["Dobutamine infusion", "Norepinephrine infusion titrated to maintain MAP ≥65 mmHg", "Epinephrine sublingual spray", "Atropine IV push"], 
      answer: 1, 
      exp: "Norepinephrine is the first-choice vasopressor in septic shock, acting on alpha-1 receptors to restore vascular tone without excessive tachycardia." 
    },
    { 
      text: "During general anesthesia for emergency laparotomy, a client develops sudden unexplained end-tidal CO2 elevation, extreme generalized muscle rigidity, tachycardia, and core temperature spiking to 42°C. The nurse prepares the specific antidote:", 
      options: ["Naloxone", "Dantrolene Sodium IV (2.5 mg/kg initial bolus)", "Neostigmine", "Succinylcholine"], 
      answer: 1, 
      exp: "Malignant Hyperthermia is triggered by volatile anesthetics/succinylcholine; Dantrolene inhibits ryanodine receptor calcium release from sarcoplasmic reticulum." 
    },
    { 
      text: "In managing a victim of an explosive bombing with 'Blast Lung' (primary blast injury), which pathophysiological injury pattern is expected?", 
      options: ["External thermal skin burns only", "Pulmonary contusions, systemic air embolism, alveolar-capillary rupture, and pneumothorax resulting from the supersonic blast shock wave", "Superficial shrapnel lacerations only", "Isolated long bone fractures"], 
      answer: 1, 
      exp: "Primary blast injury causes barotrauma to gas-containing organs (lungs, ears, GI tract); blast lung features parenchymal contusion and air embolism." 
    },
    { 
      text: "An adult patient in cardiac arrest has persistent pulseless ventricular tachycardia refractory to three shocks and initial CPR. In accordance with ACLS algorithms, which antiarrhythmic drug and initial dose should the nurse administer IV push?", 
      options: ["Lidocaine 0.1 mg/kg", "Amiodarone 300 mg IV push (or Lidocaine 1 to 1.5 mg/kg)", "Atropine 1 mg IV push", "Adenosine 6 mg rapid push"], 
      answer: 1, 
      exp: "For shock-refractory VF/pVT, Amiodarone 300 mg IV push is administered following the third shock; a second dose of 150 mg may be given if needed." 
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // 17. NURSING RESEARCH & STATISTICS
  // ─────────────────────────────────────────────────────────────
  "Nursing Research & Statistics": [
    // L1: Foundational Recall
    { 
      text: "What is the formal definition of Evidence-Based Nursing Practice (EBP)?", 
      options: ["Practicing nursing strictly based on hospital tradition and historical seniority", "The conscientious integration of best research evidence with clinical nursing expertise and patient values and preferences", "Following medical prescriptions without questioning rationale", "Relying exclusively on non-peer-reviewed textbook chapters"], 
      answer: 1, 
      exp: "EBP integrates the best external clinical research with individual clinical expertise and patient values for optimal outcomes." 
    },
    { 
      text: "What is universally recognized as the FIRST critical step in the scientific nursing research process?", 
      options: ["Selecting a statistical software program", "Identifying and formulating the research problem / research question", "Publishing results in a journal", "Collecting survey questionnaires"], 
      answer: 1, 
      exp: "Every research endeavor commences with identifying, defining, and delimiting a clear research problem." 
    },
    { 
      text: "In an experimental nursing study evaluating the effect of music therapy on postoperative pain scores, what is the Independent Variable?", 
      options: ["The postoperative pain score measured on a visual analog scale", "Music therapy intervention", "The patient's age and surgical procedure", "The hospital discharge time"], 
      answer: 1, 
      exp: "The Independent Variable is the antecedent condition or intervention manipulated by the researcher (Music therapy)." 
    },
    { 
      text: "In clinical research, what term describes the entire aggregate of cases or individuals who meet a designated set of criteria?", 
      options: ["Sample subset", "Target Population", "Strata group", "Control cohort"], 
      answer: 1, 
      exp: "Target population denotes the entire set of elements about which the researcher wishes to draw inferences." 
    },
    { 
      text: "Which historical landmark code of research ethics established the absolute necessity of voluntary, competent informed consent following Nazi war crimes?", 
      options: ["The Belmont Report (1979)", "The Nuremberg Code (1947)", "The Declaration of Alma-Ata (1978)", "The Flexner Report (1910)"], 
      answer: 1, 
      exp: "The 1947 Nuremberg Code formulated 10 ethical standards, emphasizing voluntary uncoerced human subject consent as paramount." 
    },
    // L2: Base Clinical Practice
    { 
      text: "Which probability sampling method divides the target population into homogeneous subgroups (e.g., by ward specialty: ICU, pediatrics, surgery) before randomly selecting subjects from each subgroup?", 
      options: ["Convenience sampling", "Stratified Random Sampling", "Snowball sampling", "Purposive sampling"], 
      answer: 1, 
      exp: "Stratified random sampling ensures proportional representation of distinct subgroups within the sample." 
    },
    { 
      text: "In a statistical distribution of patient recovery times, what measure of central tendency represents the score that occurs with the greatest frequency?", 
      options: ["Arithmetic Mean", "Median", "Mode", "Standard Deviation"], 
      answer: 2, 
      exp: "The Mode is the numerical value appearing most frequently in a dataset." 
    },
    { 
      text: "A nursing researcher evaluates a newly developed blood pressure monitor. Repeated measurements on the same stable client yield identical readings every time, but the values are consistently 25 mmHg higher than true arterial pressure. The instrument is:", 
      options: ["Both valid and reliable", "Reliable but not valid", "Valid but not reliable", "Neither valid nor reliable"], 
      answer: 1, 
      exp: "Reliability measures consistency/repeatability. Validity measures accuracy in measuring the true concept. High consistency with systemic bias = Reliable but invalid." 
    },
    { 
      text: "What is the primary statutory function of an Institutional Review Board (IRB) or Institutional Ethics Committee (IEC)?", 
      options: ["To ensure the research project stays within budget", "To protect the rights, dignity, safety, and welfare of human research participants", "To write the statistical analysis section for the researcher", "To distribute research grants to faculty"], 
      answer: 1, 
      exp: "The primary mandate of an IRB is safeguarding human subjects against exploitation, risk, and ethical breaches." 
    },
    { 
      text: "Which research design is characterized by exploring the lived human experience of individuals through in-depth narrative interviews?", 
      options: ["Double-blind randomized controlled trial", "Phenomenological qualitative research", "Retrospective cohort study", "Correlational cross-sectional survey"], 
      answer: 1, 
      exp: "Phenomenology is a qualitative approach aimed at understanding the essence of human experiences as described by participants." 
    },
    // L3: Advanced Hard / Prioritization
    { 
      text: "In experimental clinical research, what three essential structural properties define a true Randomized Controlled Trial (RCT)?", 
      options: ["Surveys, open-ended interviews, and narrative analysis", "Researcher manipulation of the independent variable, an active control/comparison group, and random assignment of subjects", "Historical records, small sample size, and unblinded assessment", "No control group, single subject, and observation only"], 
      answer: 1, 
      exp: "A true experimental design strictly requires Manipulation, Control, and Randomization." 
    },
    { 
      text: "In hypothesis testing, committing a 'Type I Error' (alpha error) occurs when the researcher:", 
      options: ["Accepts a false null hypothesis", "Rejects a true null hypothesis (declaring a significant difference or treatment effect when none actually exists / false positive)", "Uses an inadequate sample size", "Calculates the arithmetic mean incorrectly"], 
      answer: 1, 
      exp: "Type I error is a false positive: concluding an intervention works when in reality the null hypothesis is true." 
    },
    { 
      text: "In nursing statistical analysis, what is the meaning of a reported p-value of p < 0.01?", 
      options: ["There is a 99% probability that the study was conducted improperly", "The probability that the observed result occurred by random chance alone is less than 1%", "The intervention failed in 99% of patients", "The sample size was too small by 10%"], 
      answer: 1, 
      exp: "A p-value < 0.01 indicates less than 1 in 100 chance that the observed relationship was due to random sampling variation." 
    },
    { 
      text: "Which statistical test is appropriate for comparing the mean blood pressure reduction between two independent, normally distributed patient groups (e.g., drug group vs placebo group)?", 
      options: ["Chi-square test of independence", "Independent samples Student's t-test", "Pearson's correlation coefficient", "Kruskal-Wallis test"], 
      answer: 1, 
      exp: "The independent two-sample t-test is the standard parametric test for comparing means between two independent groups." 
    },
    { 
      text: "According to the hierarchy of clinical evidence in Evidence-Based Practice, which research design represents the highest level of methodological rigor (Level 1 Evidence)?", 
      options: ["Expert clinical opinion and narrative reviews", "Single qualitative case study", "Systematic Reviews and Meta-Analyses of multiple randomized controlled trials (RCTs)", "Single descriptive correlational survey"], 
      answer: 2, 
      exp: "Systematic reviews and meta-analyses synthesizing multiple high-quality RCTs occupy the pinnacle of evidence pyramids." 
    },
    // L4: Peak Acuity Emergency
    { 
      text: "In interpreting a Meta-Analysis Forest Plot evaluating a new medication's effect on mortality, the 95% Confidence Interval (CI) line of the pooled odds ratio (OR) crosses the vertical line of no effect (null line at 1.0). What is the statistical conclusion?", 
      options: ["The medication causes significant harm in all patients", "The finding is NOT statistically significant; no definitive treatment difference can be claimed", "The medication reduces mortality by exactly 95%", "The meta-analysis must be retracted"], 
      answer: 1, 
      exp: "When an odds ratio or relative risk 95% confidence interval crosses 1.0, the null hypothesis cannot be rejected (p ≥ 0.05)." 
    },
    { 
      text: "In clinical trial protocol design, a statistical Power Analysis is executed prior to study initiation primarily to determine:", 
      options: ["The financial cost of the clinical study", "The minimum sample size required to detect a clinically meaningful effect size and prevent Type II errors (beta)", "The exact salary of the research nurses", "The number of research journals to submit to"], 
      answer: 1, 
      exp: "A priori power calculation (standard power 0.80, alpha 0.05) ensures sufficient sample size to avoid false-negative results." 
    },
    { 
      text: "In evaluating heterogeneity among clinical trials included in a systematic review, an I-squared (I²) statistic of 78% is calculated. The researcher concludes:", 
      options: ["All studies are perfectly identical with zero variability", "Substantial statistical heterogeneity exists between the studies, warranting random-effects modeling or subgroup sensitivity analysis", "The trials must be discarded immediately", "The p-value is zero"], 
      answer: 1, 
      exp: "An I² > 50-75% reflects substantial heterogeneity between trial results, indicating variation beyond chance." 
    },
    { 
      text: "In multivariable logistic regression analysis, what does an Adjusted Odds Ratio (aOR) of 3.4 (95% CI: 1.8 - 6.2, p = 0.001) for hospital readmission indicate?", 
      options: ["Patients with the risk factor have 3.4 times higher odds of readmission after controlling for confounding variables", "The risk factor prevents readmission in 3.4% of patients", "The study had 3.4 confounding errors", "Readmission is guaranteed in 34 days"], 
      answer: 0, 
      exp: "An aOR of 3.4 indicates that after adjusting for covariates, the exposure is associated with a 3.4-fold increase in odds." 
    },
    { 
      text: "A principal investigator in an international multi-center clinical drug trial alters laboratory values in the database to show favorable drug outcomes (Scientific Misconduct). This specific ethical violation is legally classified as:", 
      options: ["Plagiarism", "Data Falsification (manipulating research data or altering records)", "Data Fabrication (making up data entirely)", "Honest clinical error"], 
      answer: 1, 
      exp: "Falsification involves manipulating research materials, equipment, or processes, or changing/omitting data so research is misrepresented." 
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // 18. NURSING EDUCATION & MANAGEMENT
  // ─────────────────────────────────────────────────────────────
  "Nursing Education & Management": [
    // L1: Foundational Recall
    { 
      text: "According to Benjamin Bloom's Taxonomy of Educational Objectives, what are the three fundamental domains of learning?", 
      options: ["Physical, Chemical, Biological", "Cognitive (knowledge), Affective (attitudes), and Psychomotor (skills)", "Primary, Secondary, Tertiary", "Past, Present, Future"], 
      answer: 1, 
      exp: "Bloom's taxonomy organizes educational objectives into Cognitive (thinking), Affective (feeling/values), and Psychomotor (motor skills)." 
    },
    { 
      text: "In management theory, the classic acronym 'POSDCORB' introduced by Luther Gulick outlines which core executive functions?", 
      options: ["Patients, Operations, Surgery, Diagnostics, Care, Observation, Records, Billing", "Planning, Organizing, Staffing, Directing, Co-ordinating, Reporting, and Budgeting", "Protocols, Orders, Safety, Delivery, Communication, Outcomes, Research, Benefits", "Preparation, Orientation, Supervision, Documentation, Consultation, Review, Balance"], 
      answer: 1, 
      exp: "POSDCORB summarizes classic administrative functions: Planning, Organizing, Staffing, Directing, Coordinating, Reporting, Budgeting." 
    },
    { 
      text: "Which leadership style is characterized by the leader making all managerial decisions unilaterally without soliciting input from nursing staff?", 
      options: ["Democratic / Participative leadership", "Autocratic / Authoritarian leadership", "Laissez-faire leadership", "Transformational leadership"], 
      answer: 1, 
      exp: "Autocratic leaders maintain strict centralized control, making decisions without delegation or team consultation." 
    },
    { 
      text: "In nursing curriculum design, what constitutes a 'Lesson Plan'?", 
      options: ["A legal employment contract between nurse and hospital", "A structured, sequential outline of specific learning objectives, teaching methods, content, instructional media, and evaluation for a single class", "The annual hospital financial audit", "A list of student grades"], 
      answer: 1, 
      exp: "A lesson plan provides an operational pedagogical roadmap detailing specific instructional objectives and evaluation strategies." 
    },
    { 
      text: "What is the mandatory professional requirement for registered nurses to maintain clinical competence and licensure renewal through structured workshops and courses?", 
      options: ["Basic literacy training", "Continuing Nursing Education (CNE) / Continuing Professional Development (CPD)", "High school diploma renewal", "Annual driving test"], 
      answer: 1, 
      exp: "Continuing Nursing Education (CNE) credits are legally mandated by nursing councils to ensure lifelong professional competence." 
    },
    // L2: Base Clinical Practice
    { 
      text: "How does 'Formative Evaluation' fundamentally differ from 'Summative Evaluation' in nursing education?", 
      options: ["Formative evaluation occurs only at graduation; summative occurs on day one", "Formative evaluation is ongoing, diagnostic feedback during the learning process; summative evaluation assesses final overall achievement at course completion", "Formative evaluation uses only multiple-choice questions; summative uses only essays", "There is no difference between them"], 
      answer: 1, 
      exp: "Formative evaluation monitors learning to provide ongoing feedback; summative evaluates cumulative learning against a benchmark." 
    },
    { 
      text: "In modern nursing clinical skills evaluation, what does the acronym 'OSCE' represent?", 
      options: ["Objective Structured Clinical Examination", "Operational Standard Care Evaluation", "Official Surgical Competency Exam", "Organizational Staff Credentialing Exercise"], 
      answer: 0, 
      exp: "An OSCE uses standardized timed stations with clinical scenarios or standardized patients to assess hands-on competencies." 
    },
    { 
      text: "According to the Thomas-Kilmann Conflict Mode Instrument, which conflict resolution approach seeks an assertive, cooperative 'win-win' solution that satisfies both parties' core concerns?", 
      options: ["Avoiding", "Accommodating", "Collaborating", "Competing"], 
      answer: 2, 
      exp: "Collaborating involves working together to integrate both viewpoints and craft a creative solution where both parties achieve goals." 
    },
    { 
      text: "What is the difference between a Retrospective Nursing Audit and a Concurrent Nursing Audit?", 
      options: ["Retrospective audits evaluate closed patient charts after discharge; concurrent audits examine patient care while the client is actively receiving treatment", "Retrospective audits evaluate future care; concurrent evaluates past years", "Retrospective audits check salaries; concurrent checks medicines", "Retrospective audits involve only doctors"], 
      answer: 0, 
      exp: "Concurrent audits evaluate active inpatient charts and live nursing interventions; retrospective audits review completed charts post-discharge." 
    },
    { 
      text: "In hospital quality accreditation (e.g., NABH / JCI standards), what constitutes a 'Sentinel Event'?", 
      options: ["A minor charting error with no harm", "An unanticipated medical occurrence resulting in death or serious physical or psychological injury (e.g., wrong-site surgery or inpatient suicide)", "A nurse arriving 5 minutes late for shift handover", "A scheduled hospital fire drill"], 
      answer: 1, 
      exp: "Sentinel events are severe unexpected safety lapses resulting in death or permanent harm, requiring immediate root-cause investigation." 
    },
    // L3: Advanced Hard / Prioritization
    { 
      text: "Following a near-fatal medication error in the intensive care unit, the nursing quality director initiates a Root Cause Analysis (RCA). What is the primary purpose of RCA?", 
      options: ["To identify which individual nurse to publicly reprimand and terminate", "To identify latent systemic, environmental, and procedural vulnerabilities that allowed the error to occur, preventing future recurrence", "To conceal the incident from hospital administration", "To reduce nursing staff salaries"], 
      answer: 1, 
      exp: "RCA is a structured, non-punitive systems analysis focused on identifying underlying latent system flaws rather than assigning individual blame." 
    },
    { 
      text: "In nursing administration, what is a Patient Classification System (Acuity Tool) primarily used for?", 
      options: ["Classifying patients by their insurance payment status", "Quantifying the intensity and complexity of nursing care required by individual patients to determine safe, equitable nurse-to-patient staffing allocations", "Assigning private rooms based on patient age", "Organizing medical records alphabetically"], 
      answer: 1, 
      exp: "Acuity systems measure required nursing hours and patient dependency to dynamically determine safe staffing staffing ratios." 
    },
    { 
      text: "According to Kurt Lewin's classic Three-Stage Theory of Planned Change, what are the three sequential phases of organizational change?", 
      options: ["Initiating, Executing, Terminating", "Unfreezing (breaking current routine), Moving/Changing (transitioning to new workflow), and Refreezing (solidifying change into policy)", "Planning, Budgeting, Spending", "Denial, Resistance, Acceptance"], 
      answer: 1, 
      exp: "Lewin's change model: Unfreezing disrupts the status quo, Moving introduces the innovation, and Refreezing locks in the new equilibrium." 
    },
    { 
      text: "Under the 'Just Culture' framework in modern healthcare management, how should nursing leadership respond when an experienced nurse makes an unintentional honest human slip due to a confusing look-alike drug label?", 
      options: ["Immediate suspension and punitive disciplinary filing", "Consoling and supporting the nurse, while redesigning the medication storage system and labeling to eliminate the hazard", "Ignoring the incident completely", "Re-educating the entire hospital staff with mandatory unpaid weekend lectures"], 
      answer: 1, 
      exp: "Just Culture differentiates human error (deserving console and system fix) from reckless behavior (deserving disciplinary action)." 
    },
    { 
      text: "In healthcare financial management, how does 'Zero-Based Budgeting' (ZBB) differ from traditional incremental budgeting?", 
      options: ["It gives every department zero dollars", "Every department manager must justify every single proposed expenditure from a base of zero each budget cycle, rather than simply adjusting the prior year's budget", "It automatically increases expenses by 10% annually", "It is used only in private clinics"], 
      answer: 1, 
      exp: "Zero-based budgeting requires full justification for all operational costs every year, eliminating historical fiscal bloat." 
    },
    // L4: Peak Acuity Emergency
    { 
      text: "During a sudden mass casualty disaster resulting from a passenger train derailment, the Hospital Incident Command System (HICS) is activated. What is the immediate role of the Chief Nursing Officer / Nursing Incident Commander?", 
      options: ["Personally transporting casualties in ambulances", "Mobilizing the hospital emergency disaster staffing plan, expanding surge inpatient bed capacity, coordinating triage zones, and reallocating critical nursing staff", "Reviewing routine nursing vacation schedules", "Closing the hospital emergency department doors"], 
      answer: 1, 
      exp: "The Nursing Incident Commander commands strategic mobilization: staff call-ins, discharge of stable patients, surge capacity, and triage logistics." 
    },
    { 
      text: "A hospital experiences an acute sudden strike by nursing union personnel. Under the Essential Services Maintenance Act (ESMA) and professional nursing ethics, what is the absolute priority?", 
      options: ["Shutting down all life-support systems in intensive care units", "Ensuring minimum essential emergency nursing coverage for life-sustaining critical units (ICUs, NICU, Dialysis, Emergency trauma, and ORs)", "Transferring all patients onto the street", "Locking medication dispensing machines"], 
      answer: 1, 
      exp: "Professional codes of ethics and emergency regulations mandate maintaining critical life-saving care during labor disputes." 
    },
    { 
      text: "In prospective clinical risk management, what is the objective of conducting a Failure Mode and Effects Analysis (FMEA) before commissioning a new automated IV chemotherapy infusion system?", 
      options: ["Evaluating the cost after the system breaks", "Proactively anticipating every conceivable way a process could fail (failure modes), calculating a Risk Priority Number (RPN), and redesigning safeguards before any patient is exposed", "Testing drugs on laboratory animals", "Auditing past medical charts"], 
      answer: 1, 
      exp: "FMEA is a proactive, prospective risk assessment tool that identifies potential failures and implements interlocks before rollout." 
    },
    { 
      text: "Under legal doctrine in healthcare management, what is the principle of 'Respondeat Superior' (Vicarious Liability)?", 
      options: ["Nurses are never liable for any actions", "An employer or hospital corporation is legally held responsible for the negligent acts of its employees performed within the scope of their employment", "Physicians are responsible for hospital building repairs", "Patients bear all financial liability for medical accidents"], 
      answer: 1, 
      exp: "Respondeat superior ('let the master answer') holds healthcare institutions vicariously liable for employees' on-the-job negligence." 
    },
    { 
      text: "Following a catastrophic hospital fire in an intensive care unit, which formal emergency evacuation protocol must the nurse executive oversee immediately?", 
      options: ["Horizontal evacuation past smoke-barrier fire doors to an adjacent safe compartment on the same floor first, followed by vertical evacuation if threatened", "Direct vertical evacuation via public elevators immediately", "Instructing staff to hide in patient rooms", "Waiting for fire department permission before moving any ventilator"], 
      answer: 0, 
      exp: "Hospital fire protocol: Horizontal evacuation through fire-rated barrier doors is faster and safer for bed-bound ICU clients before descending stairwells." 
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // 19. NURSING ETHICS & LEGAL ASPECTS
  // ─────────────────────────────────────────────────────────────
  "Nursing Ethics & Legal Aspects": [
    // L1: Foundational Recall
    { 
      text: "Which core ethical principle obligates the nurse to 'do no harm' and prevent intentional or unintentional injury to patients?", 
      options: ["Autonomy", "Beneficence", "Non-maleficence", "Justice"], 
      answer: 2, 
      exp: "Non-maleficence (Primum non nocere) asserts the fundamental duty to avoid inflicting harm or risk on clients." 
    },
    { 
      text: "A nurse tells a conscious patient: 'If you do not stop calling for the nurse, I will tie your hands to the bed rails.' In medical jurisprudence, this threat constitutes:", 
      options: ["Battery", "Assault (creating apprehension of imminent harmful or unconsented touching)", "Negligence", "Defamation"], 
      answer: 1, 
      exp: "Assault is an intentional threat that causes reasonable apprehension of imminent harmful or offensive contact. Battery is the physical contact." 
    },
    { 
      text: "Which ethical principle represents the client's fundamental right to self-determination and autonomous decision-making regarding their healthcare?", 
      options: ["Paternalism", "Autonomy", "Fidelity", "Veracity"], 
      answer: 1, 
      exp: "Autonomy upholds the moral right of competent individuals to make decisions about their own medical treatment without coercion." 
    },
    { 
      text: "In healthcare ethics, the principle of 'Veracity' obligates the nurse to practice:", 
      options: ["Strict silence at all times", "Complete truthfulness, honesty, and disclosure with patients", "Blind obedience to hospital administrators", "Treating all clients with equal financial billing"], 
      answer: 1, 
      exp: "Veracity requires comprehensive, truthful communication, establishing trust in therapeutic nurse-patient relationships." 
    },
    { 
      text: "What are the four essential legal elements required to prove clinical nursing malpractice in a court of law?", 
      options: ["Anger, argument, accident, apology", "Duty of care owed, Breach of duty (failure to meet standard of care), Causation (proximate cause), and Damages/Harm sustained", "Witness, signature, notary, contract", "Malice, intention, hospital admission, discharge"], 
      answer: 1, 
      exp: "To sustain a malpractice claim, plaintiff must prove Duty, Breach of Duty, Direct Proximate Causation, and Actual Damages." 
    },
    // L2: Base Clinical Practice
    { 
      text: "A competent, fully oriented adult client with acute appendicitis refuses emergency surgery and insists on going home. The surgical team attempts to physically block the exit doors. Legally, this action constitutes:", 
      options: ["Beneficence", "False Imprisonment (unlawful intentional restraint of a person without legal justification)", "Assault", "Justified medical practice"], 
      answer: 1, 
      exp: "Restraining a competent adult against their will constitutes False Imprisonment; clients have the legal right to leave Against Medical Advice (AMA)." 
    },
    { 
      text: "When a nurse acts as a witness to a patient signing a surgical Informed Consent form, what is the nurse legally certifying?", 
      options: ["That the nurse personally explained all surgical risks, alternatives, and complications to the patient", "That the patient signed voluntarily, is competent to sign, and the signature is authentic", "That the surgery is guaranteed to succeed", "That the surgeon is board-certified"], 
      answer: 1, 
      exp: "The nurse's signature witnesses that the patient appears competent, understands the purpose of the form, and signed voluntarily." 
    },
    { 
      text: "Under legal standards of professional nursing documentation, which action is STRICTLY PROHIBITED?", 
      options: ["Recording entries chronologically with exact times and signatures", "Using correction fluid (whiteout), erasing entries, or obliterating lines in a medical record", "Documenting objective clinical assessment findings", "Recording the exact dosage of medication administered"], 
      answer: 1, 
      exp: "Altering, whiting out, or erasing medical records destroys legal integrity; errors must be struck through with a single line, marked 'error', and initialed." 
    },
    { 
      text: "Under statutory reporting laws, in which clinical circumstance is a nurse LEGALLY MANDATED to breach client confidentiality and report immediately to authorities?", 
      options: ["A client admitting they broke a traffic signal last year", "Reasonable suspicion of child abuse, neglect, elder abuse, or reportable communicable disease", "A client disclosing a past civil divorce settlement", "A client admitting they dislike their employer"], 
      answer: 1, 
      exp: "Mandatory reporting statutes override confidentiality in cases of suspected child abuse, elder abuse, gunshot wounds, or infectious epidemics." 
    },
    { 
      text: "What legal protection is provided to off-duty nurses who voluntarily stop to administer emergency assistance at a roadside automobile collision under 'Good Samaritan Laws'?", 
      options: ["Immunity from civil liability for ordinary negligence, provided care was given in good faith and without gross negligence or compensation", "Exemption from all federal tax laws", "A guaranteed monetary reward from the police department", "Immunity from criminal homicide charges in all cases"], 
      answer: 0, 
      exp: "Good Samaritan laws protect voluntary first responders from liability for ordinary negligence if acting in good faith within competence." 
    },
    // L3: Advanced Hard / Prioritization
    { 
      text: "An adult, fully competent client who is a devout Jehovah's Witness is admitted with severe gastrointestinal hemorrhage (Hemoglobin 4.2 g/dL) and explicitly refuses life-saving blood transfusion. The client's family demands that the nurse infuse the blood. The nurse must:", 
      options: ["Infuse the blood secretly while the client is sleeping", "Respect and uphold the competent client's legally documented refusal of blood products, while offering non-blood volume expanders", "Obtain a court order to force transfusion against the client's will", "Discharge the client onto the street immediately without care"], 
      answer: 1, 
      exp: "A competent adult's autonomous right to bodily integrity and religious freedom legally supersedes medical beneficence; transfusion without consent is Battery." 
    },
    { 
      text: "A terminally ill cancer patient has an active, legally executed Do-Not-Resuscitate (DNR) order in the medical record. The patient goes into cardiac arrest. The patient's visiting child frantically screams 'Do something, save my parent!' The nurse's duty is to:", 
      options: ["Begin vigorous chest compressions and call a code blue", "Withhold CPR, uphold the patient's legally valid advance directive, and provide compassionate emotional support to the child", "Administer high-dose epinephrine IV push", "Remove the DNR order from the chart"], 
      answer: 1, 
      exp: "Advance directives reflect the patient's legal autonomous will; family members cannot unilaterally revoke a valid DNR unless designated as active healthcare proxy." 
    },
    { 
      text: "A physician prescribes an intravenous push dose of Morphine Sulfate 25 mg for a opioid-naive client with moderate ankle sprain pain (a potentially fatal ten-fold overdose). The nurse recognizes the lethal error. The nurse's legal and ethical responsibility is to:", 
      options: ["Administer the prescribed dose because nurses must obey all physician orders", "Withhold the medication, immediately clarify the order with the prescribing physician, and notify the nursing supervisor if unresolved", "Give half the dose secretly without telling anyone", "Delegate administration to an unlicensed assistant"], 
      answer: 1, 
      exp: "Nurses are independently licensed professionals with a legal duty to protect patients; executing an obvious lethal order constitutes shared malpractice." 
    },
    { 
      text: "A client who is HIV-positive confides in the nurse: 'I am not going to tell my spouse about my diagnosis.' Under bioethical and legal frameworks, what is the nurse's ethical priority?", 
      options: ["Immediately broadcast the diagnosis on social media", "Counsel the client regarding partner notification services and refer to the state public health department / partner tracing unit in accordance with statutory protocols", "Tell the spouse during visiting hours without the client's knowledge", "Refuse to provide nursing care to the client"], 
      answer: 1, 
      exp: "Tarasoff warnings and partner notification for communicable diseases follow strict statutory public health channels, not unauthorized informal disclosures." 
    },
    { 
      text: "A nurse on an understaffed medical floor is assigned 18 high-acuity patients. The nurse feels this staffing level is acutely unsafe. What is the legally protective action the nurse should take before beginning the shift?", 
      options: ["Walk out of the hospital and go home immediately (Patient Abandonment)", "Formally document and submit an 'Assignment Despite Objection' (ADO) / Safe Harbor protest form to nursing administration, while continuing to prioritize care to the best of ability", "Refuse to give any medications", "Falsify charting to show more staff were present"], 
      answer: 1, 
      exp: "Walking out after accepting assignment constitutes Patient Abandonment; filing a formal Assignment Despite Objection legally documents systemic institutional liability." 
    },
    // L4: Peak Acuity Emergency
    { 
      text: "An unconscious multi-trauma victim with severe hemothorax arrives in the emergency department with no family or identification. The trauma team must perform an emergency thoracotomy. Under which legal doctrine is treatment authorized without signed consent?", 
      options: ["Expressed verbal consent", "The Doctrine of Implied Consent (emergency privilege)", "Informed refusal", "Substituted judgment"], 
      answer: 1, 
      exp: "Implied consent presumes that a reasonable unconscious person facing imminent death or irreversible harm would consent to life-saving emergency care." 
    },
    { 
      text: "What are the rigorous clinical and legal criteria required to declare Brain Death (Death by Neurologic Criteria)?", 
      options: ["A coma score of 8 on GCS while sedated", "Complete, irreversible cessation of all cerebral and brainstem functions, confirmed by absent brainstem reflexes, negative apnea test, and absence of confounding hypothermia, drugs, or shock", "A flat EEG while receiving high-dose pentobarbital coma", "Fixed dilated pupils while blood pressure is unrecordable"], 
      answer: 1, 
      exp: "Brain death determination mandates irreversible loss of all brain and brainstem function, verified absent brainstem reflexes, apnea testing, and exclusion of reversible confounders." 
    },
    { 
      text: "During a catastrophic global respiratory pandemic with 50 dying patients and only 5 available mechanical ventilators, the hospital activates 'Crisis Standards of Care'. What ethical principle governs resource allocation?", 
      options: ["First come, first served regardless of prognosis", "Utilitarianism (maximizing the greatest number of lives saved and life-years gained) via an independent, objective clinical triage committee", "Auctioning ventilators to the highest financial bidder", "Allocating ventilators based on patient celebrity status"], 
      answer: 1, 
      exp: "Crisis standards of care transition from individual autonomy to utilitarian public health ethics, allocating scarce equipment to maximize lives saved." 
    },
    { 
      text: "A patient dies unexpectedly in the emergency department within 2 hours of arrival following an unwitnessed domestic altercation. The nurse's immediate medico-legal duty regarding evidence and autopsy is to:", 
      options: ["Remove all endotracheal tubes, IV lines, catheters, and thoroughly bathe the body before the family arrives", "Leave all invasive lines, tubes, and medical devices strictly in place, secure all clothing in paper bags to preserve chain of custody, and notify the Medical Examiner / Coroner", "Send the body directly to a private funeral home", "Discard the clothing in the biomedical waste container"], 
      answer: 1, 
      exp: "In unnatural or medical examiner cases, all invasive lines, clothing, and evidence must remain untouched to preserve the forensic chain of custody." 
    },
    { 
      text: "A staff nurse discovers that a hospital administrator and chief surgeon have been systematically billing government insurance for phantom surgical procedures and reusing single-use disposable catheters. What legal act protects the nurse from employer retaliation when reporting this fraud?", 
      options: ["The Whistleblower Protection Act / False Claims Act (Qui Tam)", "The Freedom of Information Act only", "The Occupational Safety and Health Act (OSHA)", "The Fair Labor Standards Act"], 
      answer: 0, 
      exp: "Whistleblower Protection laws shield healthcare employees who disclose institutional Medicare/insurance fraud or severe patient safety violations from termination." 
    }
  ]

};
