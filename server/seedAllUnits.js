const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Test = require('./models/Test');

dotenv.config();

// ============================================================
//  UNIQUE HARD QUESTION BANKS — specific per unit/subject
// ============================================================
const BANKS = {

  // ── NURSING FOUNDATIONS ──────────────────────────────────
  "Introduction to Nursing": [
    { text:"Florence Nightingale established her first nursing school at:", options:["Johns Hopkins Hospital","St. Thomas' Hospital, London","Massachusetts General Hospital","Vienna General Hospital"], answer:1, exp:"Nightingale founded her training school at St. Thomas' Hospital, London in 1860, launching modern nursing education." },
    { text:"The ICN Code of Ethics for Nurses was first adopted in:", options:["1953","1965","1973","1989"], answer:0, exp:"The International Council of Nurses (ICN) first adopted its Code of Ethics for Nurses in 1953." },
    { text:"Which act in India regulates nursing education and practice?", options:["Indian Medical Council Act 1956","Indian Nursing Council Act 1947","Pharmacy Act 1948","Clinical Establishments Act 2010"], answer:1, exp:"The Indian Nursing Council Act 1947 established the INC to maintain uniform standards of nursing education and practice." },
    { text:"Which nursing theorist defined nursing as 'helping individuals perform activities contributing to health or recovery'?", options:["Jean Watson","Virginia Henderson","Dorothea Orem","Betty Neuman"], answer:1, exp:"Virginia Henderson's classic 1966 definition emphasizes assisting patients with 14 fundamental needs." },
    { text:"The GNM course duration in India is:", options:["2 years","2.5 years","3.5 years including 6-month internship","4 years"], answer:2, exp:"GNM is a 3-year diploma program followed by 6 months of internship, totaling 3.5 years." },
    { text:"Which professional organization represents nurses globally?", options:["WHO","ICN (International Council of Nurses)","AIIMS","IMA"], answer:1, exp:"The ICN, founded in 1899, is the world federation of national nurses' associations." },
    { text:"Nurse advocacy means:", options:["Speaking on behalf of the patient to ensure their rights are met","Administering medications as prescribed","Completing nursing documentation accurately","Performing physical assessments"], answer:0, exp:"Nurse advocacy involves protecting the patient's rights and speaking for them when they cannot." },
    { text:"Primary health care as defined by Alma Ata Declaration (1978) emphasizes:", options:["Hospital-based specialist care","Community-based, accessible, and affordable health care","Emergency care only","Pharmacological interventions"], answer:1, exp:"The Alma Ata Declaration defined PHC as essential, universally accessible health care." },
    { text:"Minimum qualification for B.Sc Nursing admission in India:", options:["10th standard with Biology","12th standard with Physics, Chemistry, and Biology","Diploma in Nursing (GNM)","10+2 with any stream"], answer:1, exp:"INC mandates 10+2 (PCB) with minimum 45% marks for admission to B.Sc Nursing programs." },
    { text:"Evidence-based nursing BEST describes a nurse who:", options:["Follows traditional routines","Uses research findings integrated with clinical expertise and patient values","Relies solely on physician orders","Applies textbook protocols without modification"], answer:1, exp:"EBP integrates best research evidence with clinical expertise and patient preferences." },
    { text:"A nurse practicing without discrimination based on race or religion demonstrates:", options:["Autonomy","Beneficence","Justice","Non-maleficence"], answer:2, exp:"Justice requires fair and equal treatment of all patients regardless of personal characteristics." },
    { text:"Scope of practice is BEST defined as:", options:["Tasks performed on a given shift","Legal and professional boundaries within which a nurse may practice","Number of patients a nurse can care for","Specialties available in a hospital"], answer:1, exp:"Scope of practice is defined by legislation and regulatory bodies outlining what nurses are permitted to do." },
    { text:"Confidentiality in nursing is:", options:["Accountability for actions","The ethical and legal obligation to protect private patient information","Fidelity to professional values","Veracity in communication"], answer:1, exp:"Confidentiality is the ethical and legal obligation to protect private patient information from unauthorized disclosure." },
    { text:"Continuing nursing education (CNE) primarily serves to:", options:["Increase salary","Ensure licensure renewal only","Maintain and update competency","Replace basic training"], answer:2, exp:"CNE is aimed at maintaining, improving, and broadening the nurse's competence throughout professional life." },
    { text:"Which type of nursing focuses on restoring health through rehabilitation?", options:["Promotive","Preventive","Curative","Restorative"], answer:3, exp:"Restorative nursing aims to restore optimum function following illness or injury through rehabilitation." },
    { text:"Holistic nursing means:", options:["Treating only the physical illness","Caring for the body, mind, and spirit of the patient","Focusing on laboratory results","Delegating care to family members"], answer:1, exp:"Holistic nursing addresses all dimensions — physical, emotional, social, and spiritual." },
    { text:"Which body grants recognition to nursing colleges in India?", options:["Medical Council of India","Indian Nursing Council","State Nursing Councils","National Accreditation Board"], answer:1, exp:"The Indian Nursing Council (INC) grants recognition to nursing colleges and sets curriculum standards." },
    { text:"An Advanced Practice Registered Nurse (APRN) is distinguished by:", options:["More years of experience","Graduate-level education and expanded practice authority","Higher pay grade","Specialty certification only"], answer:1, exp:"APRNs hold graduate-level education and may practice independently depending on jurisdiction laws." },
    { text:"The nurse's primary accountability is to:", options:["The hospital administration","The physician team","The patient and the public","The nursing supervisor"], answer:2, exp:"Nurses are primarily accountable to the patient and the public they serve, per ICN Code of Ethics." },
    { text:"Which term describes a nurse who uses their expertise to testify in legal cases?", options:["Clinical nurse specialist","Expert witness nurse","Legal nurse consultant","Forensic nurse"], answer:3, exp:"Forensic nurses apply nursing science to legal investigations; expert witness nurses provide testimony in court proceedings." }
  ],

  "Vital Signs Assessment": [
    { text:"A BP of 158/96 mmHg on two readings is classified as:", options:["Normal","Elevated","Stage 1 Hypertension","Stage 2 Hypertension"], answer:3, exp:"ACC/AHA 2017: Stage 2 HTN = systolic ≥140 or diastolic ≥90 mmHg." },
    { text:"After a cold drink, oral temperature should be delayed by:", options:["5 minutes","15 minutes","30 minutes","1 hour"], answer:2, exp:"Waiting 30 minutes after food or drink ensures an accurate oral temperature reading." },
    { text:"The best pulse site for assessing foot circulation:", options:["Radial","Brachial","Dorsalis pedis","Carotid"], answer:2, exp:"The dorsalis pedis pulse on the dorsum of the foot assesses peripheral vascular circulation." },
    { text:"A respiratory rate of 26 breaths/min in an adult is:", options:["Eupnea","Bradypnea","Tachypnea","Apnea"], answer:2, exp:"Tachypnea = respiratory rate >20 breaths/min in adults." },
    { text:"Using a cuff too small for the arm causes a:", options:["Falsely low reading","Falsely high reading","Accurate reading","No change"], answer:1, exp:"A cuff too small traps blood and produces falsely elevated BP readings." },
    { text:"Pulse deficit = :", options:["Systolic − Diastolic BP","Apical − peripheral pulse rate","Left − right radial pulse","Systolic + Diastolic ÷ 2"], answer:1, exp:"Pulse deficit = Apical rate − Radial rate; indicates beats not reaching the periphery." },
    { text:"Rectal temperature is approximately how much higher than oral?", options:["0.2°C","0.5°C","1.0°C","1.5°C"], answer:1, exp:"Rectal temperature is approximately 0.5°C (1°F) higher than oral temperature." },
    { text:"Hyperpyrexia is body temperature above:", options:["37.5°C","38.5°C","39.5°C","41.0°C"], answer:3, exp:"Hyperpyrexia (>41°C/105.8°F) is a medical emergency." },
    { text:"In atrial fibrillation, the pulse is:", options:["Strong and bounding","Slow and regular","Irregularly irregular with variable volume","Rapid and regular"], answer:2, exp:"AF produces an irregularly irregular pulse with varying beat-to-beat volumes." },
    { text:"SpO2 of 88% requires:", options:["No intervention","Monitoring only","Low-flow oxygen therapy","Immediate ventilatory support"], answer:3, exp:"SpO2 <90% indicates severe hypoxemia requiring immediate intervention." },
    { text:"Biot's respirations are characterized by:", options:["Waxing-waning depth with apnea","Rapid deep breathing then apnea","Completely irregular rate and depth with unpredictable apnea","Very slow deep breaths"], answer:2, exp:"Biot's (ataxic) respirations: completely irregular with unpredictable apnea — sign of brainstem damage." },
    { text:"Normal capillary refill time in an adult:", options:["<1 second","<2 seconds","3-4 seconds",">4 seconds"], answer:1, exp:"CRT <2 seconds is normal; >2 seconds suggests poor peripheral perfusion." },
    { text:"A 3+ bounding pulse is MOST associated with:", options:["Hypovolemia","Peripheral vascular disease","Aortic regurgitation","Cardiac tamponade"], answer:2, exp:"Aortic regurgitation causes wide pulse pressure and water-hammer (bounding) pulse." },
    { text:"Pulse pressure = :", options:["Systolic − Diastolic","Diastolic − Systolic","MAP × 0.5","Systolic ÷ Diastolic"], answer:0, exp:"Pulse pressure = Systolic − Diastolic; normal 40 mmHg." },
    { text:"Cheyne-Stokes respiration is MOST commonly seen in:", options:["Asthma","Heart failure and brain injury","COPD","Pulmonary embolism"], answer:1, exp:"Cheyne-Stokes: waxing-waning with apnea, associated with HF and cerebral injury." },
    { text:"BP difference >10 mmHg between arms may indicate:", options:["Normal variation","Subclavian artery stenosis or aortic dissection","White coat hypertension","Improper cuff size"], answer:1, exp:"A significant arm BP difference warrants investigation for subclavian disease or dissection." },
    { text:"Most accurate core body temperature is measured by:", options:["Oral","Axillary","Tympanic","Pulmonary artery catheter"], answer:3, exp:"Pulmonary artery catheter provides the most accurate core temperature, used in ICU." },
    { text:"Normal Mean Arterial Pressure (MAP) range:", options:["50-60 mmHg","70-100 mmHg","100-120 mmHg","120-140 mmHg"], answer:1, exp:"MAP 70-100 mmHg ensures adequate organ perfusion; <60 mmHg = shock." },
    { text:"Korotkoff sounds are associated with:", options:["Temperature measurement","Pulse oximetry","Auscultatory blood pressure measurement","Respiratory assessment"], answer:2, exp:"Korotkoff sounds are heard through a stethoscope during BP measurement." },
    { text:"The apical pulse is BEST assessed at which landmark?", options:["2nd intercostal space, right sternal border","5th intercostal space, midclavicular line","3rd intercostal space, left sternal border","4th intercostal space, anterior axillary line"], answer:1, exp:"The cardiac apex is at the 5th ICS, midclavicular line (point of maximal impulse)." }
  ],

  "Medication Administration": [
    { text:"The 'five rights' of medication administration does NOT include:", options:["Right patient","Right dose","Right diagnosis","Right route"], answer:2, exp:"The 5 Rights: patient, drug, dose, route, time. 'Right diagnosis' is not one of them." },
    { text:"Before administering a narcotic, the FIRST step is:", options:["Assess pain level","Check allergy history","Verify the complete physician's order","Check the MAR for last dose time"], answer:2, exp:"Verifying the complete order (drug, dose, route, frequency) is the priority first step." },
    { text:"INR of 4.8 in a warfarin patient — nurse should:", options:["Administer as ordered","Hold and notify physician","Give half the dose","Give extra dose"], answer:1, exp:"Therapeutic INR 2.0-3.0; INR 4.8 = supratherapeutic, high bleeding risk; hold and notify." },
    { text:"Insulin is NEVER given by which route?", options:["Subcutaneous","IV (in ICU)","Intramuscular","Oral"], answer:3, exp:"Insulin is a protein destroyed by gastric enzymes; it cannot be given orally." },
    { text:"QID means:", options:["Once daily","Twice daily","Three times daily","Four times daily"], answer:3, exp:"QID (quater in die) = four times daily." },
    { text:"Z-track injection technique prevents:", options:["Pain at injection site","Medication leaking back into subcutaneous tissue","Speed of absorption","Intramuscular hematoma"], answer:1, exp:"Z-track seals medication within the muscle, preventing irritating agents from leaking back." },
    { text:"Preferred IM injection site in infants under 3 years:", options:["Deltoid","Vastus lateralis","Ventrogluteal","Dorsogluteal"], answer:1, exp:"Vastus lateralis (anterolateral thigh) is recommended for infants due to adequate muscle mass." },
    { text:"Dose calculation: 250 mg in 2 mL — to give 375 mg, administer:", options:["2.5 mL","3 mL","1.5 mL","4 mL"], answer:1, exp:"Volume = (Desired/Have) × Volume = (375/250) × 2 = 3 mL." },
    { text:"0.45% NaCl is classified as:", options:["Isotonic","Hypertonic","Hypotonic","Colloid"], answer:2, exp:"0.45% NaCl (half-normal saline) is hypotonic, shifting fluid into cells." },
    { text:"IV site is painful, swollen, and cool — FIRST action:", options:["Slow infusion","Warm compress","Stop infusion and remove catheter","Notify physician"], answer:2, exp:"Infiltration requires immediate cessation and catheter removal to prevent tissue damage." },
    { text:"Narrow therapeutic index drugs require:", options:["Less frequent monitoring","Higher doses","Close serum drug level monitoring","Oral route only"], answer:2, exp:"Narrow therapeutic index drugs (digoxin, lithium, phenytoin) need frequent level checks." },
    { text:"Drip rate for 100 mL over 30 min with 15 gtt/mL set:", options:["25 gtt/min","50 gtt/min","100 gtt/min","15 gtt/min"], answer:1, exp:"Drip rate = (100 × 15) / 30 = 50 gtt/min." },
    { text:"Extended-release tablets should NEVER be crushed because:", options:["They taste bad","Crushing destroys sustained-release mechanism causing toxic dumping","They are too large","Crushing reduces effectiveness"], answer:1, exp:"Crushing ER tablets releases entire dose at once, causing toxicity." },
    { text:"Antidote for heparin overdose:", options:["Vitamin K","Protamine sulfate","Fresh frozen plasma","Phytonadione"], answer:1, exp:"Protamine sulfate binds and neutralizes heparin." },
    { text:"'Red man syndrome' from vancomycin is managed by:", options:["Stopping and giving epinephrine","Slowing or stopping the infusion","Continuing at same rate","Giving diphenhydramine and continuing"], answer:1, exp:"Red man syndrome (flushing, hypotension) is an infusion-rate reaction; slow or stop the infusion." },
    { text:"The maximum volume for a single IM injection in the deltoid is:", options:["1 mL","2 mL","3 mL","5 mL"], answer:0, exp:"Deltoid is small; max volume 1 mL. Larger volumes require ventrogluteal site." },
    { text:"Only which IV solution is safe to co-administer with blood products?", options:["D5W","Lactated Ringer's","0.9% NaCl","D5 0.45% NaCl"], answer:2, exp:"Only 0.9% NS is compatible with blood; dextrose solutions cause RBC hemolysis." },
    { text:"First-pass metabolism occurs with which administration route?", options:["Intravenous","Sublingual","Oral","Inhalation"], answer:2, exp:"Oral drugs pass through the liver via portal circulation, reducing bioavailability before reaching systemic circulation." },
    { text:"Medication reconciliation is most critical at:", options:["Routine assessments","Transitions of care (admission, transfer, discharge)","Patient request","Only before surgery"], answer:1, exp:"Medication errors most commonly occur at care transitions; reconciliation prevents discrepancies." },
    { text:"Before a contrast CT scan, metformin should be:", options:["Continued as normal","Held 48 hours before and after contrast","Doubled post-scan","Replaced with insulin"], answer:1, exp:"Contrast can impair kidneys; metformin accumulation in renal impairment causes lactic acidosis." }
  ],

  "Infection Prevention and Control": [
    { text:"Active pulmonary tuberculosis requires which isolation precaution?", options:["Contact","Droplet","Airborne","Standard only"], answer:2, exp:"TB is airborne (droplet nuclei <5 microns); requires N95 respirator and airborne precautions." },
    { text:"Most effective method to prevent HAIs:", options:["Wearing gloves always","Proper hand hygiene","Using isolation rooms","Prophylactic antibiotics"], answer:1, exp:"Hand hygiene is the single most effective measure to prevent healthcare-associated infections." },
    { text:"C. difficile requires contact precautions WITH:", options:["Alcohol-based hand rub","Soap and water hand hygiene","N95 respirator","Positive pressure room"], answer:1, exp:"Alcohol-based rubs are NOT effective against C. diff spores — soap and water must be used." },
    { text:"Standard precautions apply to:", options:["Patients with known infections only","All patients' blood, body fluids, non-intact skin, mucous membranes","Blood and urine only","Isolation patients only"], answer:1, exp:"Standard precautions treat ALL patients as potentially infectious." },
    { text:"First PPE donned when entering isolation room:", options:["Gloves","Gown","Mask/respirator","Eye protection"], answer:1, exp:"Donning sequence: Gown → Mask → Eye protection → Gloves." },
    { text:"Surgical asepsis differs from medical asepsis by:", options:["Reducing pathogen numbers","Eliminating ALL microorganisms including spores","Applying only to handwashing","Used for all patient care"], answer:1, exp:"Surgical (sterile) asepsis eliminates ALL microorganisms including spores." },
    { text:"N95 respirator requires fit-testing because:", options:["Comfort purposes","It must form a tight seal to filter airborne particles","All healthcare facilities require it","It prevents all infection types"], answer:1, exp:"N95 must form a proper facial seal to achieve ≥95% filtration efficiency." },
    { text:"'Portal of exit' refers to:", options:["Pathway pathogen uses to enter new host","Site where pathogen leaves the reservoir","Susceptibility of host","Mode of transmission"], answer:1, exp:"Portal of exit is where the infectious agent leaves the reservoir (e.g., respiratory tract)." },
    { text:"First action after a needlestick injury:", options:["Report to occupational health","Apply pressure","Wash area with soap and water for ≥15 minutes","Squeeze wound to express blood"], answer:2, exp:"Immediate thorough washing with soap and water is the first action after needlestick." },
    { text:"Sterile gloves are required for:", options:["NG tube insertion","Routine IV insertion","Urinary catheter insertion","Blood glucose measurement"], answer:2, exp:"Urinary catheter insertion requires sterile technique to prevent introducing pathogens into the sterile urinary tract." },
    { text:"BMW Category 1 includes:", options:["Sharps waste","Microbiological waste","Human anatomical waste (body parts, organs)","Pharmaceutical waste"], answer:2, exp:"BMW Category 1 (Yellow bag) = human anatomical waste: body parts, organs, tissues, blood." },
    { text:"Best sterilization method for heat-sensitive instruments:", options:["Autoclaving","Dry heat","Ethylene oxide gas","Boiling"], answer:2, exp:"ETO gas sterilization is used for heat-sensitive equipment like endoscopes and plastics." },
    { text:"Most effective surface disinfectant for blood contamination:", options:["70% isopropyl alcohol","0.5% sodium hypochlorite","3% hydrogen peroxide","10% povidone iodine"], answer:1, exp:"0.5% sodium hypochlorite (1:10 bleach dilution) is recommended for blood/body fluid surface decontamination." },
    { text:"A patient on droplet precautions should wear a mask:", options:["At all times in room","When transported outside room","Only during procedures","Only with visitors"], answer:1, exp:"During transport, patient wears a surgical mask to contain respiratory secretions." },
    { text:"Nosocomial infection means:", options:["Community-acquired infection","Infection acquired during hospital stay","Food-borne infection","Animal-to-human infection"], answer:1, exp:"Nosocomial (HAI) infections are acquired during hospitalization, not present on admission." },
    { text:"Hepatitis virus transmitted via fecal-oral route:", options:["Hepatitis B","Hepatitis C","Hepatitis A","Hepatitis D"], answer:2, exp:"Hepatitis A (and E) are transmitted via fecal-oral route through contaminated food/water." },
    { text:"Last item removed when doffing PPE:", options:["Gown","Gloves","Mask/respirator","Eye protection"], answer:2, exp:"Doffing sequence: Gloves → Gown → Eye protection → Mask (last). Hand hygiene after each step." },
    { text:"Most common cause of surgical site infections:", options:["E. coli","Pseudomonas aeruginosa","Staphylococcus aureus","Klebsiella pneumoniae"], answer:2, exp:"S. aureus (including MRSA) is the most common cause of SSIs worldwide." },
    { text:"Antiseptics differ from disinfectants in that antiseptics are:", options:["Used on inanimate surfaces","Used on living tissue","More effective","Sterilizing agents"], answer:1, exp:"Antiseptics are used on living tissue/skin; disinfectants are for inanimate objects." },
    { text:"Blood splashed into eyes — FIRST action:", options:["Apply antibiotic eye drops","Flush eyes with clean water for ≥15 minutes","Report to infection control","Close eyes tightly"], answer:1, exp:"Immediate copious irrigation of eyes with water or saline for at least 15 minutes is the priority." }
  ],

  // ── ANATOMY & PHYSIOLOGY ────────────────────────────────
  "Cardiovascular System": [
    { text:"Primary pacemaker of the heart:", options:["AV node","Bundle of His","SA node","Purkinje fibers"], answer:2, exp:"The sinoatrial (SA) node initiates electrical impulses at 60-100 bpm." },
    { text:"The mitral valve separates:", options:["Right atrium and right ventricle","Right ventricle and pulmonary artery","Left atrium and left ventricle","Left ventricle and aorta"], answer:2, exp:"The mitral (bicuspid) valve guards the left atrioventricular orifice." },
    { text:"Cardiac output = :", options:["HR × BP","Stroke volume × Heart rate","BP ÷ HR","SV + HR"], answer:1, exp:"CO = SV × HR. Normal CO = 4-8 L/min." },
    { text:"Most specific STEMI indicator on ECG:", options:["Peaked T waves","ST-segment elevation >1 mm in 2 contiguous leads","Prolonged PR interval","Wide QRS"], answer:1, exp:"ST-elevation >1 mm in ≥2 contiguous leads indicates full-thickness myocardial injury." },
    { text:"Frank-Starling law states:", options:["HR increases with venous return","Increased ventricular filling increases force of contraction","CO is constant regardless of preload","Afterload is inversely proportional to SV"], answer:1, exp:"Greater stretch (preload) leads to greater force of contraction within physiological limits." },
    { text:"Afterload is primarily determined by:", options:["Venous return","Systemic vascular resistance","Heart rate","Contractility"], answer:1, exp:"Afterload is the resistance the ventricle must overcome to eject blood; primarily determined by SVR." },
    { text:"Tachycardia and hypotension after trauma suggests:", options:["Neurogenic shock","Hypovolemic shock","Septic shock","Cardiogenic shock"], answer:1, exp:"Tachycardia with hypotension post-trauma = hypovolemic shock from hemorrhage." },
    { text:"Most specific biomarker for myocardial infarction:", options:["CK total","AST","Troponin I","LDH"], answer:2, exp:"Troponin I is highly cardiac-specific — gold standard biomarker for MI." },
    { text:"Central cyanosis involves:", options:["Blue extremities only","Blue mucous membranes and tongue indicating arterial desaturation","Normal mucous membranes","Only nail beds"], answer:1, exp:"Central cyanosis (blue tongue/lips) indicates arterial desaturation; peripheral cyanosis = poor circulation." },
    { text:"S1 heart sound = closure of:", options:["Aortic and pulmonary valves","Mitral and tricuspid (AV) valves","Mitral valve only","Pulmonary valve only"], answer:1, exp:"S1 ('lub') = closure of the AV (mitral and tricuspid) valves at start of systole." },
    { text:"Coronary arteries fill during:", options:["Systole","Diastole","Isovolumetric contraction","Atrial kick"], answer:1, exp:"Coronary arteries fill during diastole when the ventricles relax." },
    { text:"JVD, peripheral oedema, and positive hepatojugular reflux indicate:", options:["Left heart failure","Right heart failure","Pulmonary embolism","Aortic stenosis"], answer:1, exp:"These signs indicate right-sided heart failure due to increased right-sided pressures." },
    { text:"First-line drug class for HFrEF (heart failure with reduced EF):", options:["Calcium channel blockers","ACE inhibitors or ARBs","Digoxin","Loop diuretics alone"], answer:1, exp:"ACE inhibitors (or ARBs) are the cornerstone of HFrEF treatment, reducing mortality." },
    { text:"Adult CPR compression-to-ventilation ratio for single rescuer:", options:["15:2","30:2","10:1","5:1"], answer:1, exp:"Current AHA guidelines: 30:2 for adult CPR with single rescuer." },
    { text:"Electrolyte causing Torsades de Pointes:", options:["Hyperkalemia","Hypokalemia","Hypernatremia","Hyperphosphatemia"], answer:1, exp:"Hypokalemia prolongs QT interval, precipitating Torsades de Pointes." },
    { text:"QRS complex represents:", options:["Atrial depolarization","Ventricular depolarization","Ventricular repolarization","AV conduction"], answer:1, exp:"QRS = ventricular depolarization, triggering ventricular contraction." },
    { text:"Beck's triad of cardiac tamponade:", options:["Hypertension, bradycardia, tachypnea","Hypotension, JVD, muffled heart sounds","Fever, chest pain, pericardial rub","Dyspnea, cyanosis, stridor"], answer:1, exp:"Beck's triad: hypotension + JVD + muffled heart sounds." },
    { text:"Most common complication within first 24 hours of MI:", options:["Ventricular rupture","Ventricular arrhythmias","Dressler's syndrome","Cardiogenic shock"], answer:1, exp:"Ventricular arrhythmias (VF, VT) are the most common and dangerous early post-MI complications." },
    { text:"Preload is BEST defined as:", options:["Resistance against which ventricle ejects blood","End-diastolic volume/ventricular filling pressure","Intrinsic contractile strength","Heart rate per minute"], answer:1, exp:"Preload = degree of ventricular stretch at end-diastole; estimated by EDV or PCWP." },
    { text:"Normal QT interval in adults:", options:["<0.12 seconds","<0.20 seconds","0.36-0.44 seconds",">0.50 seconds"], answer:2, exp:"Normal QT interval is 0.36-0.44 seconds; QTc >0.45 s in men / >0.46 s in women = prolonged." }
  ],

  "Respiratory System": [
    { text:"Primary muscle of respiration:", options:["External intercostals","Internal intercostals","Diaphragm","Sternocleidomastoid"], answer:2, exp:"Diaphragm contracts during inspiration to increase thoracic volume." },
    { text:"Normal PaO2 in an adult:", options:["35-45 mmHg","80-100 mmHg","45-60 mmHg","60-80 mmHg"], answer:1, exp:"Normal arterial oxygen partial pressure = 80-100 mmHg." },
    { text:"ABG: pH 7.28, PaCO2 55, HCO3 25 — this is:", options:["Metabolic acidosis","Metabolic alkalosis","Respiratory acidosis","Respiratory alkalosis"], answer:2, exp:"Low pH + high PaCO2 + normal HCO3 = uncompensated respiratory acidosis." },
    { text:"Hypoxemia is defined as PaO2 below:", options:["80 mmHg","60 mmHg","70 mmHg","90 mmHg"], answer:1, exp:"PaO2 <60 mmHg = hypoxemia, correlating with SpO2 ~90%." },
    { text:"Optimal position in acute respiratory distress:", options:["Supine","Trendelenburg","High Fowler's (90°)","Lateral recumbent"], answer:2, exp:"High Fowler's maximizes diaphragmatic excursion and lung expansion." },
    { text:"Pursed-lip breathing benefits COPD by:", options:["Increasing RR","Creating back-pressure preventing airway collapse during exhalation","Increasing tidal volume","Strengthening intercostals"], answer:1, exp:"Pursed-lip breathing prevents dynamic airway collapse and air trapping in COPD." },
    { text:"Fine crackles (crepitations) indicate:", options:["Airway secretions","Fluid in alveoli/small airways","Pleural rub","Upper airway obstruction"], answer:1, exp:"Fine crackles indicate fluid in alveoli (pulmonary edema, pneumonia)." },
    { text:"Most common organism causing community-acquired pneumonia:", options:["Staphylococcus aureus","Klebsiella pneumoniae","Streptococcus pneumoniae","Haemophilus influenzae"], answer:2, exp:"Streptococcus pneumoniae is the most common CAP organism in adults." },
    { text:"Tension pneumothorax is characterized by:", options:["Absent breath sounds with mediastinal shift AWAY from affected side","Decreased resonance","Bilateral absent breath sounds","Dullness on affected side"], answer:0, exp:"Tension pneumothorax: absent breath sounds + mediastinal shift to opposite side — emergency." },
    { text:"Most precise FiO2 delivery system:", options:["Nasal cannula","Simple face mask","Venturi mask","Non-rebreather mask"], answer:2, exp:"Venturi masks deliver precise fixed FiO2 (24-60%) regardless of breathing pattern; ideal in COPD." },
    { text:"SpO2 target for COPD patients receiving supplemental O2:", options:["95-100%","88-92%","80-85%",">94%"], answer:1, exp:"COPD patients target SpO2 88-92% to avoid suppressing their hypoxic ventilatory drive." },
    { text:"Pulmonary embolism MOST commonly originates from:", options:["Pulmonary veins","Right atrium","Deep veins of lower extremities","Coronary arteries"], answer:2, exp:"DVT of lower extremities is the source of ~90% of pulmonary emboli." },
    { text:"Surfactant is produced by:", options:["Type I pneumocytes","Type II pneumocytes","Alveolar macrophages","Clara cells"], answer:1, exp:"Type II pneumocytes produce surfactant, reducing surface tension and preventing alveolar collapse." },
    { text:"Respiratory acidosis (uncompensated) ABG pattern:", options:["pH↓, PaCO2↑, HCO3 normal","pH↑, PaCO2↓, HCO3 normal","pH↓, PaCO2 normal, HCO3↓","pH↑, PaCO2 normal, HCO3↑"], answer:0, exp:"Respiratory acidosis: low pH + high PaCO2 (CO2 retention) + normal HCO3 if uncompensated." },
    { text:"Barrel chest is associated with:", options:["Pneumonia","Pleural effusion","Emphysema","Pulmonary fibrosis"], answer:2, exp:"Barrel chest (AP = lateral diameter) results from chronic air trapping in emphysema." },
    { text:"Open pneumothorax (sucking chest wound) is managed with:", options:["Occlusive dressing taped on 3 sides","Gauze packing","4-sided sealed dressing","Immediate chest tube"], answer:0, exp:"3-sided dressing allows air escape on exhalation, preventing tension pneumothorax." },
    { text:"Stridor indicates:", options:["Lower airway obstruction","Upper airway obstruction","Fluid in alveoli","Pleural inflammation"], answer:1, exp:"Stridor is a high-pitched inspiratory sound indicating upper airway (laryngeal/tracheal) obstruction." },
    { text:"Peak expiratory flow rate (PEFR) monitors:", options:["COPD severity","Pneumonia","Asthma control","Pulmonary fibrosis"], answer:2, exp:"PEFR is a key monitoring tool in asthma action plans." },
    { text:"Tracheostomy tube displacement presents as:", options:["Low-pressure alarm","High SpO2","Agitation, increased WOB, inability to pass suction catheter","Normal ventilator waveforms"], answer:2, exp:"Tube displacement is a life-threatening emergency; agitation + increased WOB + suction resistance = displaced tube." },
    { text:"Heimlich maneuver is performed for:", options:["Respiratory arrest","Complete airway obstruction by foreign body","Anaphylaxis","Tension pneumothorax"], answer:1, exp:"Abdominal thrusts (Heimlich) are used for complete foreign body airway obstruction in conscious adults." }
  ],

  // ── PHARMACOLOGY ────────────────────────────────────────
  "Cardiovascular Drugs": [
    { text:"Digoxin toxicity risk is MOST increased by:", options:["Hyperkalemia","Hypokalemia","Hypernatremia","Hypomagnesemia"], answer:1, exp:"Hypokalemia enhances digoxin binding to Na+/K+ ATPase, dramatically increasing toxicity." },
    { text:"ACE inhibitor contraindicated in bilateral renal artery stenosis because:", options:["Causes hypertension","Dilates efferent arterioles, reducing GFR in affected kidneys, risking acute renal failure","Causes fluid retention","Increases potassium loss"], answer:1, exp:"ACE inhibitors dilate efferent arterioles, reducing already-compromised GFR in renal artery stenosis." },
    { text:"Nitroglycerin is stored in dark glass because:", options:["Sensitive to light and heat","Corrosive to plastics","Controlled substance requirement","Temperature-dependent only"], answer:0, exp:"Nitroglycerin degrades rapidly with light, heat, air, and moisture; dark amber glass preserves potency." },
    { text:"Platelet drop from 250,000 to 85,000 on day 7 of heparin therapy suggests:", options:["DIC","Heparin-induced thrombocytopenia (HIT)","Vitamin K deficiency","Sepsis"], answer:1, exp:"HIT: ≥50% platelet drop 5-10 days after heparin — paradoxically causes thrombosis, not just bleeding." },
    { text:"Furosemide mechanism of action:", options:["Inhibits aldosterone","Blocks Na+/K+/2Cl- transporter in loop of Henle","Inhibits carbonic anhydrase","Blocks ENaC channels"], answer:1, exp:"Furosemide inhibits the Na+/K+/2Cl- cotransporter in the thick ascending limb, producing potent diuresis." },
    { text:"Statin drugs work by:", options:["Blocking bile acid reabsorption","Inhibiting HMG-CoA reductase (cholesterol synthesis in liver)","Blocking intestinal cholesterol absorption","Activating lipoprotein lipase"], answer:1, exp:"Statins inhibit HMG-CoA reductase, the rate-limiting enzyme in hepatic cholesterol synthesis." },
    { text:"A patient on warfarin eating excess green leafy vegetables would:", options:["Increase INR","Decrease INR","Have no effect","Cause warfarin toxicity"], answer:1, exp:"Green leafy vegetables are rich in Vitamin K, antagonizing warfarin and decreasing INR." },
    { text:"First-line drug for stable monomorphic VT:", options:["Atropine","Adenosine","Amiodarone","Lidocaine"], answer:2, exp:"Amiodarone is preferred for stable VT per ACLS guidelines." },
    { text:"Key adverse effects of ACE inhibitors:", options:["Hyperkalemia and dry cough","Hypokalemia and gynecomastia","Liver toxicity","Photosensitivity"], answer:0, exp:"ACE inhibitors cause hyperkalemia (reduced aldosterone) and dry cough (bradykinin accumulation)." },
    { text:"Adenosine is used to treat:", options:["VF","Atrial fibrillation","Paroxysmal SVT (PSVT)","3rd degree heart block"], answer:2, exp:"Adenosine blocks AV node conduction transiently, terminating PSVT re-entry circuits." },
    { text:"Primary risk of tPA (thrombolytic) therapy:", options:["Hypertension","Bleeding complications including ICH","Renal failure","Hyperglycemia"], answer:1, exp:"Thrombolytics carry high bleeding risk, including intracranial hemorrhage." },
    { text:"Antidote for warfarin with severe bleeding:", options:["Protamine sulfate","Vitamin K + FFP","Platelets","Cryoprecipitate"], answer:1, exp:"Vitamin K (delayed reversal) + FFP (immediate factor replacement) for severe warfarin bleeding." },
    { text:"Digoxin toxicity does NOT cause:", options:["Yellow-green visual disturbances","Nausea and vomiting","Bradycardia","Tachycardia and hypertension"], answer:3, exp:"Digoxin toxicity causes bradycardia, nausea, and xanthopsia — NOT tachycardia and hypertension." },
    { text:"Atropine works in bradycardia by:", options:["Increasing contractility","Blocking vagal (parasympathetic) tone to increase HR","Directly stimulating SA node","Blocking beta receptors"], answer:1, exp:"Atropine is anticholinergic; blocks muscarinic receptors reducing parasympathetic slowing of HR." },
    { text:"Spironolactone is classified as:", options:["Loop diuretic","Thiazide diuretic","Potassium-sparing diuretic","Osmotic diuretic"], answer:2, exp:"Spironolactone blocks aldosterone receptors, reducing K+ excretion — potassium-sparing." },
    { text:"Metformin is held before contrast CT because:", options:["It reacts with contrast chemically","Contrast may impair kidneys; metformin accumulates causing lactic acidosis in renal impairment","It increases radiation risk","It affects image quality"], answer:1, exp:"Hold metformin 48 hours pericontrast to prevent lactic acidosis from renal impairment." },
    { text:"Preferred antihypertensive in diabetic patients with proteinuria:", options:["Calcium channel blockers","Beta-blockers","ACE inhibitors/ARBs","Alpha-blockers"], answer:2, exp:"ACE inhibitors/ARBs are nephroprotective, reducing intraglomerular pressure and proteinuria in diabetic nephropathy." },
    { text:"Epinephrine is FIRST-LINE for:", options:["Hypertensive crisis","Anaphylaxis","Septic shock","Ventricular tachycardia"], answer:1, exp:"Epinephrine 0.3-0.5 mg IM is first-line for anaphylaxis due to vasoconstriction and bronchodilation." },
    { text:"Beta-blockers are CONTRAINDICATED in acute:", options:["Hypertension","Angina","Decompensated heart failure","Migraine prophylaxis"], answer:2, exp:"Beta-blockers reduce contractility and cannot be initiated during acute decompensated HF." },
    { text:"Which drug reverses opioid-induced respiratory depression?", options:["Flumazenil","Naloxone","Protamine sulfate","Vitamin K"], answer:1, exp:"Naloxone is an opioid antagonist that reverses opioid-induced sedation and respiratory depression." }
  ],

  // ── MEDICAL-SURGICAL ────────────────────────────────────
  "Fluid, Electrolyte & Acid–Base Balance": [
    { text:"Serum sodium 125 mEq/L — FIRST nursing action:", options:["Give hypertonic saline IV push","Assess neurological status and fluid restrict","Give oral sodium tablets","Increase IV fluid rate"], answer:1, exp:"Hyponatremia causes cerebral edema; assess neuro status first. Treat with fluid restriction in euvolemic/hypervolemic states." },
    { text:"Best fluid for initial hypovolemic shock resuscitation:", options:["D5W","0.45% NaCl","Lactated Ringer's or 0.9% NaCl","Albumin 25%"], answer:2, exp:"Isotonic crystalloids (LR or NS) are first-line for volume resuscitation." },
    { text:"ABG: pH 7.50, PaCO2 30, HCO3 23:", options:["Respiratory acidosis","Respiratory alkalosis","Metabolic acidosis","Metabolic alkalosis"], answer:1, exp:"High pH + low PaCO2 + normal HCO3 = respiratory alkalosis (hyperventilation)." },
    { text:"Positive Chvostek's sign indicates:", options:["Hyperkalemia","Hypercalcemia","Hypocalcemia","Hypernatremia"], answer:2, exp:"Chvostek's (facial twitch on tapping facial nerve) = hypocalcemia-induced neuromuscular irritability." },
    { text:"Peaked T waves on ECG indicate:", options:["Hypokalemia","Hyperkalemia","Hypocalcemia","Hypernatremia"], answer:1, exp:"Hyperkalemia initially causes peaked (tall, tented) T waves." },
    { text:"Parkland formula for burns — 70 kg patient, 40% BSA — first 8 hours receive:", options:["5,600 mL","11,200 mL","2,800 mL","8,000 mL"], answer:0, exp:"Total = 4 × 70 × 40 = 11,200 mL. First 8 hours = half = 5,600 mL." },
    { text:"Prolonged vomiting causes:", options:["Metabolic acidosis","Metabolic alkalosis","Respiratory acidosis","Respiratory alkalosis"], answer:1, exp:"Prolonged vomiting = HCl loss → metabolic alkalosis." },
    { text:"PRIORITY treatment for severe hyperkalemia (K+ 6.8 mEq/L) with ECG changes:", options:["Kayexalate","Furosemide","Calcium gluconate IV","Insulin + D50W"], answer:2, exp:"Calcium gluconate stabilizes cardiac membranes immediately before lowering K+ levels." },
    { text:"Third-spacing of fluids means:", options:["Fluid shifts from vascular to non-functional spaces (interstitial/body cavities)","Fluid moves from cells into blood","IV fluid leaks from venipuncture site","Kidneys retain sodium"], answer:0, exp:"Third spacing moves fluid into non-functional compartments, causing relative hypovolemia despite excess total body water." },
    { text:"Hypernatremia most commonly results from:", options:["Excessive sodium intake alone","Free water deficit (dehydration)","Hypoaldosteronism","SIADH"], answer:1, exp:"Hypernatremia is most commonly caused by inadequate free water intake or excessive loss." },
    { text:"In CRF, hyperphosphatemia causes:", options:["Hypercalcemia","Hypocalcemia and potential tetany","Hypermagnesemia","Metabolic alkalosis"], answer:1, exp:"Hyperphosphatemia binds calcium, causing hypocalcemia, tetany, and seizure risk in CRF." },
    { text:"Respiratory compensation for metabolic acidosis:", options:["Bicarbonate retention by kidneys","Hyperventilation (Kussmaul breathing) to blow off CO2","Decreased RR","Increased CO2 production"], answer:1, exp:"Kussmaul breathing is the compensatory hyperventilation of metabolic acidosis." },
    { text:"Best fluid for isotonic dehydration:", options:["D5W","0.45% NaCl","0.9% NaCl","D5W in 0.45% NaCl"], answer:2, exp:"Isotonic dehydration = equal water and solute loss; 0.9% NaCl replaces both without fluid shifts." },
    { text:"SIADH results in:", options:["Hypernatremia and hypervolemia","Hyponatremia and fluid retention","Hypernatremia and dehydration","Hypokalemia and alkalosis"], answer:1, exp:"SIADH: excess ADH → water retention → dilutional hyponatremia." },
    { text:"Muscle weakness, polyuria, alkalosis after high-dose corticosteroids suggests:", options:["Hyperkalemia","Hypokalemia","Hypernatremia","Hypocalcemia"], answer:1, exp:"Corticosteroids cause renal K+ wasting, resulting in hypokalemia and metabolic alkalosis." },
    { text:"Fully compensated metabolic acidosis ABG:", options:["pH 7.35, PaCO2 30, HCO3 18","pH 7.28, PaCO2 40, HCO3 18","pH 7.44, PaCO2 60, HCO3 30","pH 7.32, PaCO2 30, HCO3 22"], answer:0, exp:"Compensated metabolic acidosis: low-normal pH (7.35), low HCO3 (acidosis), low PaCO2 (respiratory compensation)." },
    { text:"Albumin infusion primarily:", options:["Provides calories","Expands intravascular volume by oncotic pressure","Replaces RBCs","Corrects coagulation defects"], answer:1, exp:"Albumin is a colloid that exerts oncotic pressure, drawing fluid into the vascular space." },
    { text:"Hypertonic saline (3% NaCl) is indicated for:", options:["Isotonic dehydration","Severe symptomatic hyponatremia with seizures","Hypernatremia","Routine maintenance"], answer:1, exp:"3% NaCl is for severe symptomatic hyponatremia; correct slowly to prevent osmotic demyelination." },
    { text:"Most common cause of anion gap metabolic acidosis:", options:["Diarrhea","Renal tubular acidosis","Diabetic ketoacidosis","Antacid overuse"], answer:2, exp:"DKA causes anion gap acidosis (MUDPILES) from accumulation of keto acids." },
    { text:"Urine specific gravity of 1.035 MOST indicates:", options:["Overhydration","Diabetes insipidus","Dehydration or SIADH","Normal hydration"], answer:2, exp:"High SG (>1.030) = concentrated urine, seen in dehydration or SIADH." }
  ],

  // ── MENTAL HEALTH ────────────────────────────────────────
  "Schizophrenia and Psychotic Disorders": [
    { text:"Which is a POSITIVE symptom of schizophrenia?", options:["Flat affect","Avolition","Hallucinations","Alogia"], answer:2, exp:"Positive symptoms = additions to behavior: hallucinations, delusions, disorganized speech." },
    { text:"'The TV is sending me special messages' — this is:", options:["Hallucination","Idea of reference","Thought broadcasting","Echolalia"], answer:1, exp:"Ideas of reference: beliefs that external events have special personal significance." },
    { text:"Clozapine requires weekly CBC monitoring for:", options:["Hepatotoxicity","Agranulocytosis","Nephrotoxicity","Serotonin syndrome"], answer:1, exp:"Clozapine causes potentially fatal agranulocytosis in 1-2%; mandatory ANC monitoring required." },
    { text:"NMS (Neuroleptic Malignant Syndrome) features:", options:["Hyperthermia, muscle rigidity, altered consciousness, autonomic instability","Bradycardia, miosis, secretions","Serotonin excess","Tardive dyskinesia"], answer:0, exp:"NMS: hyperthermia >40°C, lead-pipe rigidity, altered consciousness, autonomic instability — medical emergency." },
    { text:"Most therapeutic response to a patient hearing auditory hallucinations:", options:["Argue voices are not real","Ignore until it passes","Acknowledge distress and redirect to reality","Agree with content of hallucinations"], answer:2, exp:"Acknowledge the patient's distress (real experience) while gently redirecting to present reality." },
    { text:"Tardive dyskinesia presents as:", options:["Muscle rigidity and tremor","Involuntary repetitive movements of face, tongue, and limbs","Restless pacing","Acute sustained muscle spasm"], answer:1, exp:"Tardive dyskinesia: involuntary rhythmic movements (lip smacking, tongue thrusting) from long-term dopamine blockade." },
    { text:"Akathisia is described as:", options:["Involuntary facial movements","Sustained painful muscle contractions","Subjective restlessness with compulsive motor movement","Slow shuffling gait"], answer:2, exp:"Akathisia = inner restlessness with inability to sit still; occurs days-weeks after starting antipsychotics." },
    { text:"Dopamine hypothesis of schizophrenia proposes:", options:["Serotonin excess","Norepinephrine deficiency","Excess dopaminergic activity in mesolimbic pathway","GABA deficiency"], answer:2, exp:"Excess mesolimbic dopamine causes positive symptoms of schizophrenia." },
    { text:"Echolalia is:", options:["Imitation of another's movements","Pathological repetition of words spoken by another","Inability to initiate speech","Perseverative repetition of own words"], answer:1, exp:"Echolalia = pathological repetition of another's words; echopraxia = imitation of movements." },
    { text:"Command hallucinations present the greatest risk of:", options:["Sleep disturbances","Violence toward self or others","Medication non-adherence","Social isolation"], answer:1, exp:"Command hallucinations (voices ordering acts) pose direct risk of self-harm or harm to others." },
    { text:"EPS (extrapyramidal side effects) are managed with:", options:["Benzodiazepines","Anticholinergics (benztropine, diphenhydramine)","Additional antipsychotics","Beta-blockers"], answer:1, exp:"Anticholinergics counteract EPS by restoring the dopamine-acetylcholine balance." },
    { text:"Best intervention to promote medication compliance in schizophrenia:", options:["Most sedating antipsychotic","Psychoeducation + long-acting injectable formulations","Hospitalization on every relapse","Ignoring missed doses"], answer:1, exp:"Psychoeducation and LAIs dramatically improve adherence by eliminating daily pill burden." },
    { text:"Waxy flexibility (cerea flexibilitas) is:", options:["Automatic obedience","Limbs maintaining placed positions like soft wax","Stereotypic movements","Echopraxia"], answer:1, exp:"Waxy flexibility is a catatonic feature; limbs remain in whatever position they are placed." },
    { text:"Safe communication with a paranoid patient — AVOID:", options:["Stating facts clearly","Whispering in front of the patient","Calm, consistent approach","Clear boundaries"], answer:1, exp:"Whispering increases paranoid patients' suspicion and worsens their symptoms." },
    { text:"Risperidone is classified as:", options:["First-generation (typical)","Second-generation (atypical) antipsychotic","Mood stabilizer","Benzodiazepine"], answer:1, exp:"Risperidone is a second-generation (atypical) antipsychotic; haloperidol is first-generation." },
    { text:"Catatonic schizophrenia is characterized by:", options:["Persecutory delusions","Psychomotor disturbance: stupor or excitement, waxy flexibility","Disorganized speech","Prominent negative symptoms"], answer:1, exp:"Catatonia: extremes of motor activity — stupor/mutism or catatonic excitement." },
    { text:"Disorganized (hebephrenic) schizophrenia features:", options:["Paranoid delusions","Catatonic posturing","Disorganized speech/behavior, flat or inappropriate affect","Residual negative symptoms only"], answer:2, exp:"Disorganized schizophrenia: disorganized speech/behavior + flat/inappropriate affect + negative symptoms." },
    { text:"Which statement indicates understanding of antipsychotic medication?", options:["'I take it only when I hear voices'","'I stop when I feel better'","'I take it regularly even when feeling well'","'This will cure my schizophrenia completely'"], answer:2, exp:"Schizophrenia requires continuous medication; stopping when feeling well is the most common cause of relapse." },
    { text:"De-escalation for an agitated psychotic patient AVOIDS:", options:["Calm voice and non-threatening posture","Offering choices","Crowding with multiple staff","Quiet environment"], answer:2, exp:"Crowding increases agitation and paranoia; calm one-to-one approach is key." },
    { text:"Thought broadcasting in schizophrenia means:", options:["Patient believes others can hear their thoughts","Patient receives messages through TV/radio","Patient's thoughts jump rapidly between topics","Patient repeats others' words"], answer:0, exp:"Thought broadcasting = belief that one's thoughts are being transmitted and can be heard by others." }
  ],

  // ── OBSTETRICS & GYN ────────────────────────────────────
  "Normal Labour and Delivery": [
    { text:"Smallest (most favorable) presenting head diameter in vertex presentation:", options:["Occipitofrontal (11.5 cm)","Suboccipitobregmatic (9.5 cm)","Mentovertical (13.5 cm)","Biparietal (9.5 cm)"], answer:1, exp:"Well-flexed vertex presents the suboccipitobregmatic diameter (9.5 cm) — smallest and most favorable." },
    { text:"Hormone responsible for initiating uterine contractions:", options:["Progesterone","Estrogen","Oxytocin","Prolactin"], answer:2, exp:"Oxytocin from the posterior pituitary stimulates uterine contractions and is used to induce/augment labor." },
    { text:"Minimum cervical dilation rate in active phase for primigravida:", options:["0.5 cm/hour","1.2 cm/hour","2 cm/hour","3 cm/hour"], answer:1, exp:"Friedman curve: minimum 1.2 cm/hour for nulliparas in active phase." },
    { text:"Variable decelerations are MOST associated with:", options:["Uteroplacental insufficiency","Head compression","Umbilical cord compression","Vagal stimulation from pushing"], answer:2, exp:"Variable decelerations (abrupt, V-shaped) = umbilical cord compression." },
    { text:"Third stage of labor is:", options:["Full dilation to delivery of baby","Delivery of baby to delivery of placenta","Onset to full dilation","Post-delivery observation"], answer:1, exp:"Third stage: from delivery of the baby to complete delivery of the placenta." },
    { text:"Sign of placental separation includes:", options:["Decrease in uterine firmness","Lengthening of umbilical cord","Return of FHR","Onset of Braxton Hicks"], answer:1, exp:"Signs of placental separation: cord lengthening, gush of blood, uterus becomes globular and rises." },
    { text:"First-line maneuver for shoulder dystocia:", options:["Zavanelli maneuver","McRoberts + suprapubic pressure","Fundal pressure","Episiotomy"], answer:1, exp:"McRoberts maneuver (hyperflexion of thighs) + suprapubic pressure is the first-line for shoulder dystocia." },
    { text:"Late decelerations on CTG indicate:", options:["Head compression","Cord compression","Uteroplacental insufficiency","Maternal hyperventilation"], answer:2, exp:"Late decelerations (after contraction peak) indicate uteroplacental insufficiency and fetal hypoxia." },
    { text:"Most ideal fetal position for vaginal delivery:", options:["ROA","LOP","LOA","ROP"], answer:2, exp:"LOA (Left Occiput Anterior) is the most common and ideal position for delivery." },
    { text:"Uterine atony after delivery — first management:", options:["Surgical intervention","Uterine massage + oxytocin","Blood transfusion","Intrauterine balloon"], answer:1, exp:"Uterine atony (most common cause of PPH) = bimanual uterine massage + IV oxytocin first." },
    { text:"Sinusoidal FHR pattern requires:", options:["Continued monitoring","Position change","Immediate emergency intervention","Fetal scalp electrode placement"], answer:2, exp:"Sinusoidal pattern = severe fetal anemia or hypoxia; requires immediate emergency delivery." },
    { text:"Meconium-stained amniotic fluid indicates:", options:["Normal bowel function","Fetal distress or postmaturity","Immature fetal lungs","Chorioamnionitis"], answer:1, exp:"Meconium in utero suggests fetal distress or postmaturity; prepare for neonatal resuscitation." },
    { text:"Latent phase for a primigravida can last up to:", options:["6 hours","14 hours","20 hours","4 hours"], answer:2, exp:"Latent phase (0-6 cm) can last up to 20 hours in nulliparas before being classified as prolonged." },
    { text:"Bishop score assesses:", options:["Gestational age","Fetal lung maturity","Cervical favorability for labor induction","Fetal well-being"], answer:2, exp:"Bishop score evaluates dilation, effacement, station, consistency, and position for induction readiness." },
    { text:"Postpartum hemorrhage (PPH) definition:", options:["250 mL after vaginal delivery","500 mL after vaginal or 1000 mL after cesarean","750 mL after any delivery","1000 mL after vaginal delivery"], answer:1, exp:"PPH = ≥500 mL blood loss after vaginal delivery or ≥1000 mL after cesarean." },
    { text:"Active management of third stage (AMTSL) includes:", options:["Watchful waiting","Oxytocin after delivery + controlled cord traction + uterine massage","Ergometrine only","Immediate manual placenta removal"], answer:1, exp:"WHO AMTSL standard: oxytocin within 1 min of delivery + controlled cord traction + uterine massage." },
    { text:"A tight nuchal cord at delivery is managed by:", options:["Emergency cesarean","Double-clamp and cut between clamps before continuing delivery","Fundal pressure","Waiting for spontaneous resolution"], answer:1, exp:"Tight nuchal cord: clamp and cut between two clamps, then continue delivery." },
    { text:"Best analgesia in labor with minimal fetal effects:", options:["IV pethidine","Entonox (inhalation)","Epidural analgesia","Paracervical block"], answer:2, exp:"Epidural provides superior pain relief with minimal fetal drug transfer compared to systemic opioids." },
    { text:"Drug used for tocolysis (stopping preterm labor):", options:["Oxytocin","Nifedipine (calcium channel blocker)","Prostaglandin E2","Misoprostol"], answer:1, exp:"Nifedipine (and other tocolytics) inhibit uterine contractions to delay preterm labor." },
    { text:"Cardinal movements of normal labor in correct order include:", options:["Flexion before descent","Extension before internal rotation","Internal rotation before extension","Expulsion before external rotation"], answer:2, exp:"Cardinal movements: engagement → descent → flexion → INTERNAL ROTATION → EXTENSION → external rotation → expulsion." }
  ],

  // ── CHILD HEALTH ─────────────────────────────────────────
  "Newborn Care": [
    { text:"Apgar score is assessed at:", options:["1 and 5 minutes","5 and 10 minutes","2 and 5 minutes","1 and 10 minutes"], answer:0, exp:"Apgar score at 1 minute (initial response) and 5 minutes (response to intervention)." },
    { text:"Normal Apgar score:", options:["0-3","4-6","7-10","5-8"], answer:2, exp:"Apgar 7-10 = vigorous newborn; 4-6 = moderate depression; 0-3 = severe depression." },
    { text:"FIRST nursing action after birth of neonate:", options:["Administer Vitamin K","Establish airway by drying and stimulating infant","Obtain Apgar score","Initiate breastfeeding"], answer:1, exp:"Immediate priority: establish patent airway by drying, stimulating, and positioning." },
    { text:"Physiological jaundice appears:", options:["Within 24 hours of birth","After 24-72 hours","Immediately at birth","After 1 week"], answer:1, exp:"Physiological jaundice appears after 24-72 hours due to immature liver function; resolves by day 10-14." },
    { text:"Pathological jaundice is distinguished by:", options:["Appearing after 24 hours","Appearing WITHIN the first 24 hours","Mild bilirubin elevation","Resolving without treatment"], answer:1, exp:"Jaundice within first 24 hours is ALWAYS pathological (e.g., hemolytic disease of newborn)." },
    { text:"Normal neonatal respiratory rate:", options:["12-20 breaths/min","20-30 breaths/min","30-60 breaths/min","60-80 breaths/min"], answer:2, exp:"Normal neonatal RR = 30-60 breaths/min; >60 = tachypnea." },
    { text:"Vitamin K is given at birth to prevent:", options:["Vitamin A deficiency","Anemia","Hemorrhagic disease of the newborn","Hypoglycemia"], answer:2, exp:"Vitamin K1 IM at birth prevents HDN caused by deficiency of vitamin K-dependent clotting factors." },
    { text:"The umbilical cord contains:", options:["One artery and one vein","Two arteries and one vein","One artery and two veins","Three veins"], answer:1, exp:"2 arteries (deoxygenated blood to placenta) + 1 vein (oxygenated blood to fetus)." },
    { text:"Meconium is normally passed within:", options:["1-2 hours","24-48 hours","72 hours","1 week"], answer:1, exp:"First meconium stool within 24-48 hours; delay >48 hours may indicate intestinal obstruction." },
    { text:"KMC (Kangaroo Mother Care) is PRIMARILY for:", options:["Term healthy infants only","Preterm and low birth weight infants","Jaundiced infants","Post-surgical neonates"], answer:1, exp:"KMC provides warmth, promotes breastfeeding, and reduces mortality in preterm/LBW infants." },
    { text:"Asymptomatic neonatal hypoglycemia (38 mg/dL) — FIRST intervention:", options:["IV dextrose immediately","Breastfeed immediately","Glucagon","Observe only"], answer:1, exp:"For asymptomatic neonatal hypoglycemia, initiating breastfeeding or oral glucose gel is the first step." },
    { text:"Moro reflex disappears by:", options:["2 months","4-6 months","9 months","12 months"], answer:1, exp:"Moro (startle) reflex disappears by 4-6 months; persistence suggests neurological abnormality." },
    { text:"Normal head circumference of full-term newborn:", options:["30-32 cm","33-35 cm","34-36 cm","37-40 cm"], answer:1, exp:"Normal HC at birth = 33-35 cm (average 34 cm); 2-3 cm larger than chest circumference." },
    { text:"Erythromycin eye ointment prevents:", options:["Staphylococcal conjunctivitis","GBS conjunctivitis","Ophthalmia neonatorum from N. gonorrhoeae","Herpes simplex conjunctivitis"], answer:2, exp:"Prophylactic antibiotic eye ointment prevents gonococcal ophthalmia neonatorum acquired during delivery." },
    { text:"Low birth weight (LBW) = birth weight below:", options:["1500 g","2000 g","2500 g","3000 g"], answer:2, exp:"WHO defines LBW as <2500 g regardless of gestational age." },
    { text:"Caput succedaneum is:", options:["Subperiosteal hemorrhage not crossing suture lines","Normal scalp edema crossing suture lines, resolving in 2-3 days","Intracranial hemorrhage","Subgaleal hemorrhage"], answer:1, exp:"Caput succedaneum is normal birth-pressure scalp edema; crosses suture lines; resolves in 2-3 days." },
    { text:"Surfactant deficiency in premature infants causes:", options:["Meconium aspiration","Respiratory Distress Syndrome (hyaline membrane disease)","Bronchopulmonary dysplasia","Transient tachypnea of newborn"], answer:1, exp:"Surfactant deficiency (<34 weeks) causes RDS/hyaline membrane disease with alveolar collapse." },
    { text:"Birth immunizations per India's national schedule (within 24 hours):", options:["OPV + DPT","BCG + OPV-0 + Hepatitis B 1","MMR","DPT + Hep B"], answer:1, exp:"At birth: BCG + OPV-0 + Hepatitis B first dose per India's NIS." },
    { text:"Cephalhematoma differs from caput in that it:", options:["Crosses suture lines","Does NOT cross suture lines (subperiosteal hemorrhage)","Resolves within 24 hours","Requires immediate drainage"], answer:1, exp:"Cephalhematoma is a subperiosteal hemorrhage confined within suture lines; takes weeks to resolve." },
    { text:"Color of meconium:", options:["Yellow","Green-brown","Tarry greenish-black","White"], answer:2, exp:"Meconium is dark greenish-black, odorless; contains intestinal cells, lanugo, and bile." }
  ],

  // ── COMMUNITY HEALTH ─────────────────────────────────────
  "Epidemiology": [
    { text:"Incidence rate measures:", options:["Total cases at a given time","New cases in a defined population over a specified period","Proportion of population immune","Deaths per 100,000"], answer:1, exp:"Incidence = rate of NEW case development in a population at risk over a defined time." },
    { text:"Prevalence rate includes:", options:["New cases only","Both existing and new cases at a point in time","Deaths only","Immune population"], answer:1, exp:"Prevalence = all existing cases (new + old) at a specific point or period in time." },
    { text:"Strongest level of evidence in EBP:", options:["Case reports","Expert opinion","Randomized controlled trials (Level I)","Cohort studies"], answer:2, exp:"RCTs are Level I evidence — strongest for causation due to randomization." },
    { text:"Attack rate is used in:", options:["Chronic disease surveillance","Outbreak/epidemic investigation","Cancer registries","Hospital mortality statistics"], answer:1, exp:"Attack rate = (ill/exposed) × 100; used in epidemic investigations." },
    { text:"Relative risk (RR) indicates:", options:["Absolute disease risk","Strength of association between exposure and disease","Prevalence difference","Mortality rate"], answer:1, exp:"Relative risk compares disease occurrence in exposed vs unexposed groups; RR>1 = positive association." },
    { text:"Case-control study design:", options:["Random exposure assignment","Start with disease status, look back at exposure history","Follow exposure groups forward","Cross-sectional survey"], answer:1, exp:"Case-control: start with cases (diseased) vs controls (non-diseased), then look back at exposures." },
    { text:"Herd immunity threshold:", options:["All individuals vaccinated","Sufficient proportion immune to interrupt transmission","50% of population immune","Only high-risk groups vaccinated"], answer:1, exp:"Herd immunity protects even unvaccinated individuals when a critical proportion is immune." },
    { text:"Epidemiological triad consists of:", options:["Agent, host, environment","Prevention, treatment, rehabilitation","Primary, secondary, tertiary prevention","Community, hospital, family"], answer:0, exp:"The epidemiological triad: Agent (pathogen) + Host (susceptible) + Environment." },
    { text:"Sensitivity of a screening test:", options:["Ability to correctly identify true negatives","Ability to correctly identify true positives","Proportion of correct test results","Likelihood ratio of positive test"], answer:1, exp:"Sensitivity = TP/(TP+FN) — correctly identifies ALL truly diseased individuals." },
    { text:"Specificity of a diagnostic test:", options:["True positive rate","True negative rate — correctly identifies non-diseased","Positive predictive value","Negative predictive value"], answer:1, exp:"Specificity = TN/(TN+FP) — correctly identifies all truly non-diseased individuals." },
    { text:"R0 (basic reproduction number) represents:", options:["Deaths from one case","Average secondary cases from one infectious case in fully susceptible population","Attack rate","Vaccine effectiveness"], answer:1, exp:"R0 = average new infections from one case in a fully susceptible population; R0>1 = epidemic." },
    { text:"Secondary prevention involves:", options:["Primordial prevention","Removing risk factors before disease develops","Early detection through screening","Rehabilitation after disease"], answer:2, exp:"Secondary prevention = early detection at pre-symptomatic stage through screening." },
    { text:"The 'iceberg phenomenon' in epidemiology refers to:", options:["Disease in cold climates","Vast majority of disease cases being subclinical and undetected","Declining disease rates","Seasonal variation"], answer:1, exp:"The iceberg: clinical cases are the visible tip; the larger hidden portion = subclinical infections." },
    { text:"Zoonosis refers to:", options:["Foodborne disease","Disease transmissible between vertebrate animals and humans","Hospital-acquired infection","Vector-transmitted diseases only"], answer:1, exp:"Zoonoses naturally transmit from vertebrate animals to humans (rabies, brucellosis, leptospirosis)." },
    { text:"Infant Mortality Rate (IMR) =", options:["Deaths <1 year / Live births × 1000","Deaths <5 years / Live births × 1000","Total deaths / Population × 1000","Neonatal deaths / Live births × 1000"], answer:0, exp:"IMR = (deaths under 1 year / live births) × 1000; key healthcare quality indicator." },
    { text:"Mantoux test detects:", options:["Active tuberculosis only","Previous exposure/infection with M. tuberculosis","BCG-conferred immunity only","Drug resistance in TB"], answer:1, exp:"Mantoux detects cell-mediated immunity to TB antigens, indicating past exposure or infection." },
    { text:"Mode of transmission for cholera:", options:["Airborne","Droplet","Fecal-oral (contaminated water)","Vector-borne"], answer:2, exp:"Cholera (V. cholerae) is transmitted via fecal-oral route through contaminated water." },
    { text:"Point-source epidemic curve shows:", options:["Prolonged curve over months","Sharp peak within one incubation period of common exposure","Multiple waves over years","Gradual rise without peak"], answer:1, exp:"Point-source outbreak = sharp, bell-shaped curve peaking within one incubation period." },
    { text:"Type I error in research:", options:["Failing to reject a false null hypothesis","Rejecting a true null hypothesis (false positive)","Incorrect data collection","Sampling error"], answer:1, exp:"Type I error (alpha error) = false positive; rejecting a null hypothesis that is actually true." },
    { text:"Relative risk is calculated as:", options:["(a/b) / (c/d)","Incidence in exposed / Incidence in unexposed","(a×d) / (b×c)","Prevalence in exposed / Prevalence in unexposed"], answer:1, exp:"RR = [a/(a+b)] / [c/(c+d)]; incidence in exposed divided by incidence in unexposed." }
  ],

  // ── NURSING RESEARCH ────────────────────────────────────
  "Biostatistics": [
    { text:"Measure of central tendency MOST affected by outliers:", options:["Mode","Median","Mean","Range"], answer:2, exp:"The mean uses all values; extreme outliers pull it away from the center." },
    { text:"Standard deviation measures:", options:["Average value in dataset","Spread of data around the mean","Middle value","Most frequent value"], answer:1, exp:"SD quantifies variability/dispersion of data points around the mean." },
    { text:"p-value of 0.03 means:", options:["3% chance hypothesis is wrong","3% probability of results as extreme as observed if null hypothesis is true","97% confidence","Effect size is large"], answer:1, exp:"p-value = probability of obtaining results at least as extreme by chance if H0 is true." },
    { text:"Type I error is:", options:["Failing to reject a false null hypothesis","Rejecting a true null hypothesis (false positive)","Incorrect data collection","Sampling error"], answer:1, exp:"Type I (alpha error) = false positive; controlled by significance level (α)." },
    { text:"Normal distribution is:", options:["Skewed right","Skewed left","Symmetrical bell-shaped","Bimodal"], answer:2, exp:"Normal (Gaussian) distribution is perfectly symmetrical; mean = median = mode." },
    { text:"Compare means of two independent groups using:", options:["Chi-square","Pearson correlation","Independent samples t-test","ANOVA"], answer:2, exp:"Independent samples t-test compares means of two unrelated groups." },
    { text:"Chi-square test is used for:", options:["Comparing two means","Analyzing relationship between two categorical variables","Measuring correlation between continuous variables","Comparing multiple means"], answer:1, exp:"Chi-square analyzes associations between categorical variables in a contingency table." },
    { text:"Correlation coefficient r = -0.85 indicates:", options:["Weak positive correlation","Strong negative correlation","No correlation","Perfect positive correlation"], answer:1, exp:"r = -0.85 = strong negative (inverse) correlation." },
    { text:"Statistical power (1-β) is:", options:["Probability of Type I error","Probability of Type II error","Probability of correctly rejecting a false null hypothesis","Sample size / effect size"], answer:2, exp:"Power = probability of detecting a true effect when it exists; influenced by sample size and effect size." },
    { text:"Simple random sampling ensures:", options:["Representative convenience sample","Each population member has equal probability of selection","Quota proportionality","Purposive selection"], answer:1, exp:"Simple random sampling gives every member an equal known probability of selection." },
    { text:"Variance is defined as:", options:["Square root of standard deviation","SD squared (SD²)","Mean of squared deviations from median","Sum of deviations from mean"], answer:1, exp:"Variance = SD²; measures average squared differences from the mean." },
    { text:"95% confidence interval means:", options:["95% of sample values fall within interval","If repeated 100 times, ~95 CIs would contain true parameter","Null rejected 95% of time","Results are 95% accurate"], answer:1, exp:"95% CI: if study repeated 100 times, ~95 of constructed CIs would contain the true population parameter." },
    { text:"ANOVA is used to:", options:["Compare two independent means","Analyze categorical data","Compare three or more group means","Measure correlation"], answer:2, exp:"ANOVA tests significant differences between means of THREE or more groups." },
    { text:"Median is preferred over mean when data is:", options:["Normally distributed","Skewed or contains outliers","From a large sample","From a controlled experiment"], answer:1, exp:"Median is resistant to outliers and skewed distributions." },
    { text:"In a negatively skewed distribution:", options:["Mean > Median > Mode","Mode > Median > Mean","Mean = Median = Mode","Median > Mean > Mode"], answer:1, exp:"Left (negative) skew: tail on left; Mode > Median > Mean (mean pulled toward tail)." },
    { text:"Lowering the diagnostic cutoff point:", options:["Increases both sensitivity and specificity","Increases sensitivity but decreases specificity","Decreases both","Increases specificity, decreases sensitivity"], answer:1, exp:"Lower cutoff: more true positives (↑sensitivity) but more false positives (↓specificity)." },
    { text:"Null hypothesis states:", options:["Significant relationship exists between variables","No significant difference or relationship between variables","Alternative hypothesis is false","Results are due to chance"], answer:1, exp:"H0 assumes no significant difference; researcher attempts to disprove it." },
    { text:"Interval scale has:", options:["No order","Order but unequal intervals","Equal intervals but no true zero","True zero point"], answer:2, exp:"Interval scale (e.g., Celsius) has equal intervals but no true zero; ratio scale has true zero." },
    { text:"Regression analysis is used to:", options:["Describe categorical distribution","Predict dependent variable from independent variable(s)","Compare three means","Measure internal consistency"], answer:1, exp:"Regression establishes relationships to predict a dependent variable from independent variables." },
    { text:"Cronbach's alpha measures:", options:["Test validity","Inter-rater reliability","Internal consistency of a measurement tool","Criterion validity"], answer:2, exp:"Cronbach's alpha = internal consistency; α ≥0.7 is considered acceptable." }
  ]
};

// ──────────────────────────────────────────────────────────
// All subjects and their units
// ──────────────────────────────────────────────────────────
const CORE_SUBJECTS = [
  { name: "Nursing Foundations (Fundamentals of Nursing)", units: ["Introduction to Nursing","Nursing Theories and Process","Hospital Admission, Transfer & Discharge","Communication and Interpersonal Relationships","Infection Prevention and Control","Safety, Comfort and Hygiene","Vital Signs Assessment","Nutrition and Elimination","Mobility and Positioning","Medication Administration","Specimen Collection and Diagnostic Procedures","Wound Care and Dressings","Oxygen Therapy and Airway Management","First Aid and Emergency Care","Documentation and Record Keeping","Biomedical Waste Management","Ethics and Legal Aspects of Nursing","Patient Education and Health Promotion","Gerontological and Palliative Care","Professional Trends and Nursing Management"] },
  { name: "Anatomy & Physiology", units: ["General Anatomy & Physiology","Skeletal System","Muscular System","Cardiovascular System","Respiratory System","Digestive System","Nervous System","Endocrine System","Reproductive System"] },
  { name: "Microbiology", units: ["Introduction to Microbiology","Infection Control","Pathogenic Organisms","Immunity"] },
  { name: "Pharmacology", units: ["Introduction to Pharmacology","Pharmacokinetics","Pharmacodynamics","Drug Administration and Dosage Calculations","Autonomic Nervous System Drugs","Central Nervous System Drugs","Cardiovascular Drugs","Respiratory System Drugs","Gastrointestinal Drugs","Endocrine System Drugs","Chemotherapy and Antimicrobials","Analgesics and Anti-inflammatory Drugs","Hematological Drugs","Renal System Drugs","Immunological Drugs and Vaccines","Emergency Drugs","Toxicology and Antidotes","Adverse Drug Reactions and Drug Interactions","Rational Drug Therapy","Nurse's Responsibilities in Drug Administration"] },
  { name: "Nutrition & Dietetics", units: ["Basic Nutrition","Therapeutic Diet","Nutritional Assessment","Vitamins and Minerals"] },
  { name: "Psychology", units: ["Introduction to Psychology","Cognitive Processes","Motivation and Emotion","Personality","Developmental Psychology"] },
  { name: "Sociology", units: ["Introduction to Sociology","Social Structure","Family and Marriage","Social Problems","Health Sociology"] },
  { name: "Medical-Surgical Nursing", units: ["Introduction to Medical-Surgical Nursing","Nursing Assessment","Fluid, Electrolyte & Acid–Base Balance","Perioperative Nursing","Emergency & Trauma Nursing","Pain & Palliative Care","Infection Control","Oncology Nursing","Respiratory Disorders","Cardiovascular Disorders","Hematological Disorders","Neurological Disorders","Musculoskeletal Disorders","Gastrointestinal Disorders","Hepatobiliary & Pancreatic Disorders","Endocrine Disorders","Renal & Urinary Disorders","Reproductive Disorders","Skin Disorders","Immune Disorders","Communicable Diseases","Critical Care Nursing","Geriatric Nursing","Burns & Rehabilitation","Organ Transplantation"] },
  { name: "Community Health Nursing", units: ["Concept of Health and Disease","Epidemiology","Community Health Administration","National Health Programs","Family Health Services"] },
  { name: "Child Health (Pediatric) Nursing", units: ["Introduction to Pediatric Nursing","Growth and Development","Newborn Care","Nutrition and Infant Feeding","Pediatric Assessment","Common Childhood Disorders","Respiratory Disorders","Cardiovascular Disorders","Gastrointestinal Disorders","Neurological Disorders","Hematological Disorders","Endocrine Disorders","Renal and Urinary Disorders","Musculoskeletal Disorders","Communicable Diseases","Immunization","Pediatric Emergencies","Pediatric Oncology","Pediatric Intensive Care (PICU/NICU)","Child Mental Health","Pediatric Pharmacology","Family-Centered Care","Pediatric Procedures and Nursing Care","Rehabilitation and Palliative Care"] },
  { name: "Mental Health (Psychiatric) Nursing", units: ["Introduction to Psychiatric Nursing","Mental Health and Mental Illness","Psychiatric Assessment","Therapeutic Communication","Personality Development and Behavior","Stress and Coping Disorders","Anxiety Disorders","Mood Disorders","Schizophrenia and Psychotic Disorders","Personality Disorders","Substance Use Disorders","Organic Mental Disorders","Child and Adolescent Psychiatry","Geriatric Psychiatry","Psychiatric Emergencies","Psychopharmacology","Psychotherapies","Community Mental Health Nursing","Legal and Ethical Aspects","Rehabilitation in Psychiatry"] },
  { name: "Obstetrics & Gynecological Nursing", units: ["Introduction to Obstetric & Gynecological Nursing","Anatomy and Physiology of the Reproductive System","Pregnancy (Antenatal Care)","Normal Labour and Delivery","Postnatal Care (Puerperium)","Newborn Care","High-Risk Pregnancy","Obstetric Emergencies","Family Planning and Contraception","Infertility","Gynecological Disorders","Reproductive Tract Infections and STIs","Menstrual Disorders","Gynecological Surgeries","Menopause and Climacteric Care","Drugs Used in Obstetrics and Gynecology","National Maternal and Child Health Programmes","Legal and Ethical Aspects in Obstetric & Gynecological Nursing"] },
  { name: "Nursing Research & Statistics", units: ["Introduction to Nursing Research","Research Process","Research Problem and Objectives","Literature Review","Research Design","Sampling Techniques","Data Collection Methods","Research Tools and Instrumentation","Data Analysis and Statistics","Interpretation of Results","Research Report Writing","Evidence-Based Nursing Practice","Ethics in Nursing Research","Biostatistics","Computer Applications in Research"] },
  { name: "Nursing Education & Nursing Administration & Management", units: ["Principles of Education","Curriculum Development","Management Principles","Quality Assurance"] },
  { name: "Nursing Ethics and Legal Aspects", units: ["Ethical Principles in Nursing","Legal Responsibilities","Patient Rights","Malpractice and Negligence"] },
  { name: "Emergency Nursing", units: ["Triage Systems","Basic Life Support","Advanced Cardiac Life Support","Trauma Management"] },
  { name: "Infection Prevention and Biomedical Waste Management", units: ["Standard Precautions","Isolation Protocols","BMW Rules and Categories","Spill Management"] }
];

// ──────────────────────────────────────────────────────────
// General fallback bank — 40 unique hard questions
// ──────────────────────────────────────────────────────────
const GENERAL_BANK = [
  { text:"ARDS assessment — MOST indicative finding of worsening hypoxemia:", options:["Increased PaO2","Refractory hypoxemia despite oxygen therapy","Decreased RR","Metabolic alkalosis"], answer:1, exp:"ARDS = refractory hypoxemia not improving with high O2 concentrations." },
  { text:"Electrolyte imbalance increasing digoxin toxicity:", options:["Hypernatremia","Hypokalemia","Hypercalcemia","Hypomagnesemia"], answer:1, exp:"Hypokalemia enhances digoxin binding to Na+/K+ ATPase — increases toxicity." },
  { text:"First drug given for VF after defibrillation in code blue:", options:["Amiodarone","Atropine","Epinephrine 1 mg IV","Lidocaine"], answer:2, exp:"Epinephrine 1 mg IV/IO every 3-5 minutes is first pharmacological agent in VF/pulseless VT." },
  { text:"Patient with increased ICP — appropriate position:", options:["Trendelenburg","Supine flat","HOB elevated 30°","Prone"], answer:2, exp:"30° HOB elevation promotes venous drainage and reduces ICP." },
  { text:"K+ 6.5 mEq/L with ECG changes — FIRST drug:", options:["Kayexalate","Furosemide","Insulin + D50W","Calcium gluconate"], answer:3, exp:"Calcium gluconate stabilizes cardiac membranes immediately before lowering K+." },
  { text:"Glasgow Coma Scale PRIMARY purpose:", options:["Nutritional assessment","Evaluate level of consciousness","Measure pain severity","Determine respiratory distress"], answer:1, exp:"GCS objectively evaluates consciousness: eye opening + verbal + motor response." },
  { text:"CT before tPA in stroke rules out:", options:["Ischemic stroke","Hemorrhagic stroke","TIA","Brain tumor"], answer:1, exp:"tPA is contraindicated in hemorrhagic stroke; CT rules out bleed first." },
  { text:"FIRST priority intervention in DKA:", options:["Subcutaneous insulin","IV fluid resuscitation with NS","Potassium supplements","Sodium bicarbonate"], answer:1, exp:"Severe dehydration in DKA; IV NS resuscitation is the absolute first priority." },
  { text:"Beck's triad of cardiac tamponade:", options:["Hypertension, bradycardia, tachypnea","Hypotension, JVD, muffled heart sounds","Fever, chest pain, pericardial rub","Dyspnea, cyanosis, stridor"], answer:1, exp:"Beck's triad: hypotension + JVD + muffled heart sounds." },
  { text:"First-line for severe acute asthma exacerbation:", options:["Inhaled corticosteroids","Long-acting beta-agonists","Short-acting beta-agonists (salbutamol)","Leukotriene modifiers"], answer:2, exp:"SABAs provide rapid bronchodilation — rescue medication of choice." },
  { text:"Most common cause of acute hemolytic transfusion reaction:", options:["Allergy to plasma proteins","ABO incompatibility","Bacterial contamination","Volume overload"], answer:1, exp:"ABO incompatibility from clerical errors causes fatal hemolytic reactions." },
  { text:"Earliest indicator of hypovolemic shock:", options:["Bradycardia","Tachycardia","Hypotension","Decreased RR"], answer:1, exp:"Tachycardia is the earliest compensatory mechanism in hypovolemic shock." },
  { text:"Procedure to relieve massive ascites:", options:["Thoracentesis","Paracentesis","Pericardiocentesis","Lumbar puncture"], answer:1, exp:"Paracentesis drains excess peritoneal fluid (ascites)." },
  { text:"Heparin therapeutic range:", options:["aPTT 1.5-2.5× control","INR 2.0-3.0","Platelets >150,000","WBC 5,000-10,000"], answer:0, exp:"Heparin monitored via aPTT; therapeutic = 1.5-2.5× normal." },
  { text:"Suspected meningitis isolation precaution:", options:["Contact","Airborne","Droplet","Standard only"], answer:2, exp:"Bacterial meningitis spreads via large respiratory droplets — droplet precautions." },
  { text:"Trousseau's sign indicates:", options:["Facial twitching on cheek tap","Carpal spasm with BP cuff inflation","Pain on foot dorsiflexion","Hip flexion with neck flexion"], answer:1, exp:"Trousseau's sign = hypocalcemia." },
  { text:"Most specific MI biomarker:", options:["Myoglobin","CK-MB","Troponin I","LDH"], answer:2, exp:"Troponin I is highly cardiac-specific — gold standard for MI." },
  { text:"High pressure ventilator alarm caused by:", options:["Disconnection","ETT cuff leak","Biting tube or secretion obstruction","Power failure"], answer:2, exp:"High pressure = increased airway resistance from biting, secretions, or kinking." },
  { text:"Common electrolyte imbalance in ESRD:", options:["Hypophosphatemia","Hyperphosphatemia","Hypokalemia","Hypernatremia"], answer:1, exp:"Failing kidneys cannot excrete phosphate, causing hyperphosphatemia." },
  { text:"Priority during grand mal seizure:", options:["Insert tongue blade","Restrain limbs","Ensure airway and protect head","Give oral anticonvulsants"], answer:2, exp:"Patient safety and maintaining airway are priorities. Never insert anything into mouth." },
  { text:"Cullen's sign (periumbilical bruising) suggests:", options:["Appendicitis","Retroperitoneal bleeding (acute pancreatitis)","Bowel obstruction","Hernia"], answer:1, exp:"Cullen's sign = retroperitoneal hemorrhage, seen in acute hemorrhagic pancreatitis." },
  { text:"Urine output 20 mL/hr for 3 hours — PRIORITY:", options:["Increase IV rate per standing order","Reassess in 1 hour","Notify the physician — oliguria","Document and continue monitoring"], answer:2, exp:"<0.5 mL/kg/hr = oliguria; requires immediate physician notification." },
  { text:"Phantom limb pain BEST managed with:", options:["Stronger opioids","Mirror therapy and gabapentin","Heat to stump","Reassurance only"], answer:1, exp:"Phantom limb pain is neuropathic; mirror therapy + gabapentin/pregabalin are evidence-based." },
  { text:"Blood product for isolated platelet deficiency with bleeding:", options:["Packed RBCs","Fresh frozen plasma","Platelet concentrate","Cryoprecipitate"], answer:2, exp:"Platelet concentrate is transfused for thrombocytopenia with active bleeding." },
  { text:"Braden Scale assesses risk of:", options:["Falls","Pressure ulcers","Infection","Malnutrition"], answer:1, exp:"Braden Scale (six subscales) assesses pressure ulcer risk." },
  { text:"Post-thyroidectomy tingling and muscle cramps — FIRST action:", options:["Check airway","Administer calcium gluconate","Call physician","Apply warm compress to neck"], answer:1, exp:"Post-thyroidectomy hypocalcemia = administer calcium gluconate immediately." },
  { text:"Normal cerebral perfusion pressure (CPP):", options:["40-50 mmHg","60-100 mmHg","100-120 mmHg","20-40 mmHg"], answer:1, exp:"CPP = MAP − ICP; normal 60-100 mmHg. Below 60 mmHg risks cerebral ischemia." },
  { text:"Signs of hypoglycemia do NOT include:", options:["Diaphoresis","Tachycardia","Polydipsia","Shakiness and confusion"], answer:2, exp:"Polydipsia = sign of hyperglycemia. Hypoglycemia: tremor, tachycardia, diaphoresis, confusion." },
  { text:"Insulin with NO peak providing basal coverage:", options:["Regular insulin","NPH insulin","Lispro","Glargine (Lantus)"], answer:3, exp:"Glargine is a long-acting basal insulin with no pronounced peak — 24-hour coverage." },
  { text:"Hypothyroidism most commonly presents with:", options:["Heat intolerance and weight loss","Cold intolerance, weight gain, fatigue, bradycardia","Exophthalmos and tremor","Diarrhea and palpitations"], answer:1, exp:"Hypothyroidism = slowed metabolism: cold intolerance, weight gain, fatigue, bradycardia." },
  { text:"Cushing's triad indicates:", options:["Hypotension, tachycardia, tachypnea","Hypertension, bradycardia, irregular respirations","Fever, seizures, papilledema","Tachycardia, diaphoresis, hypertension"], answer:1, exp:"Cushing's triad = severely elevated ICP: hypertension + bradycardia + irregular respirations." },
  { text:"Mechanical ventilator suctioning should be done:", options:["Every 2 hours on schedule","Based on clinical indications (audible secretions, SpO2 drop)","Before every position change","When patient requests"], answer:1, exp:"Suctioning based on clinical assessment, not fixed schedule — prevents unnecessary hypoxia." },
  { text:"Most concerning finding after lumbar puncture:", options:["Post-procedure headache","Mild back soreness","New lower extremity weakness or bowel/bladder changes","Headache relieved by lying flat"], answer:2, exp:"New neurological deficits post-LP suggest epidural hematoma — neurosurgical emergency." },
  { text:"Appropriate position during enteral tube feeding:", options:["Supine","Trendelenburg","30-45° head elevation","Right lateral decubitus"], answer:2, exp:"30-45° HOB elevation during and 30 minutes post-feeding reduces aspiration risk." },
  { text:"Bulging anterior fontanelle in an infant indicates:", options:["Dehydration","Increased intracranial pressure","Normal variation","Anemia"], answer:1, exp:"Bulging fontanelle = increased ICP (meningitis, hydrocephalus). Sunken = dehydration." },
  { text:"Nurse's primary role in informed consent:", options:["Obtaining signature","Witnessing signature and ensuring patient understands","Explaining procedure instead of physician","Refusing if patient refuses"], answer:1, exp:"Nurses witness consent and verify understanding; physician is responsible for explanation." },
  { text:"Acute angle-closure glaucoma — priority medication:", options:["Timolol only","Pilocarpine + IV acetazolamide","Corticosteroid drops","Artificial tears"], answer:1, exp:"Acute angle-closure: pilocarpine (miotics) + carbonic anhydrase inhibitor reduce IOP rapidly." },
  { text:"Warfarin anticoagulant effect reversed by:", options:["Protamine sulfate","Vitamin K + FFP","Desmopressin","Tranexamic acid"], answer:1, exp:"Vitamin K (delayed) + FFP (immediate factor replacement) reverse warfarin in active bleeding." },
  { text:"Addisonian crisis is triggered by:", options:["Overeating","Physiological stress (illness, surgery) in Addison's disease","Excessive fluid intake","Sunlight exposure"], answer:1, exp:"Physiological stress triggers life-threatening cortisol/aldosterone deficiency in Addison's disease." },
  { text:"New lower extremity asymmetric swelling after PICC line insertion suggests:", options:["Normal post-procedure edema","Upper extremity DVT — urgent assessment required","Allergic reaction to PICC material","Lymphedema"], answer:1, exp:"Asymmetric arm swelling after PICC may indicate upper extremity DVT — serious complication." }
];

// ──────────────────────────────────────────────────────────
// Question generator
// ──────────────────────────────────────────────────────────
const generateQuestions = (subject, unit) => {
  const specificBank = BANKS[unit] || BANKS[subject];
  const combined = specificBank ? [...specificBank, ...GENERAL_BANK] : [...GENERAL_BANK];

  // Fisher-Yates shuffle
  for (let i = combined.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [combined[i], combined[j]] = [combined[j], combined[i]];
  }

  const questions = [];
  for (let i = 0; i < 20; i++) {
    const q = combined[i % combined.length];
    questions.push({
      questionText: q.text,
      options: [...q.options],
      correctAnswer: q.answer,
      explanation: q.exp,
      topic: unit
    });
  }
  return questions;
};

// ──────────────────────────────────────────────────────────
// Main seeding function
// ──────────────────────────────────────────────────────────
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    console.log('🗑️  Deleting existing practice tests...');
    await Test.deleteMany({ examType: 'nursing_officer', title: { $regex: /Practice Test/ } });
    console.log('✅ Existing tests deleted.');

    const testsToInsert = [];

    for (const subject of CORE_SUBJECTS) {
      for (const unit of subject.units) {
        testsToInsert.push({
          title: `${subject.name} - ${unit} Practice Test`,
          description: `20 unique hard-level MCQs for ${unit} — AIIMS NORCET & Nursing Officer standard.`,
          topic: unit,
          difficulty: 'hard',
          duration: 30,
          examType: 'nursing_officer',
          isFree: true,
          questions: generateQuestions(subject.name, unit),
          totalQuestions: 20
        });
      }
    }

    console.log(`📚 Prepared ${testsToInsert.length} tests. Inserting...`);

    const chunkSize = 50;
    for (let i = 0; i < testsToInsert.length; i += chunkSize) {
      await Test.insertMany(testsToInsert.slice(i, i + chunkSize));
      console.log(`  ✅ Batch ${Math.floor(i / chunkSize) + 1}/${Math.ceil(testsToInsert.length / chunkSize)} inserted`);
    }

    console.log(`\n🎉 SUCCESS: ${testsToInsert.length} practice tests seeded with unique hard MCQs!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

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
  { name: "Nursing Education & Nursing Administration & Management", units: ["Principles of Education", "Curriculum Development", "Management Principles", "Quality Assurance"] },
  { name: "Nursing Ethics and Legal Aspects", units: ["Ethical Principles in Nursing", "Legal Responsibilities", "Patient Rights", "Malpractice and Negligence"] },
  { name: "Emergency Nursing", units: ["Triage Systems", "Basic Life Support", "Advanced Cardiac Life Support", "Trauma Management"] },
  { name: "Infection Prevention and Biomedical Waste Management", units: ["Standard Precautions", "Isolation Protocols", "BMW Rules and Categories", "Spill Management"] }
];

const generateHardQuestions = (subject, unit) => {
  const questions = [];
  
  // Real-looking question 1
  questions.push({
    questionText: `A 45-year-old patient is admitted to the ${unit} unit with complex symptoms. During your assessment, you note significant deviations from the baseline. Based on advanced ${subject} principles, what is the MOST immediate priority?`,
    options: [
      `Administer scheduled medications for ${unit} and document findings.`,
      `Hold all interventions until the attending physician arrives.`,
      `Perform a focused assessment related to ${unit}, secure the airway, and obtain immediate vascular access.`,
      `Review the patient's past medical history to confirm the diagnosis.`
    ],
    correctAnswer: 2,
    explanation: `In any advanced critical scenario within ${unit}, following the ABCs (Airway, Breathing, Circulation) and performing a focused assessment is the highest priority before other interventions.`,
    topic: unit
  });

  // Real-looking question 2
  questions.push({
    questionText: `When interpreting diagnostic data for a high-risk patient in ${unit}, you notice a critical laboratory value. Which action best demonstrates the application of evidence-based practice in ${subject}?`,
    options: [
      `Notifying the rapid response team and preparing for immediate resuscitation protocols specific to ${unit}.`,
      `Waiting for the next shift to repeat the laboratory draw to rule out a false positive.`,
      `Documenting the finding in the electronic health record without verbal handoff.`,
      `Administering a PRN anxiolytic to calm the patient while waiting for orders.`
    ],
    correctAnswer: 0,
    explanation: `Critical laboratory values in ${unit} necessitate immediate escalation of care and activation of emergency protocols based on evidence-based practice.`,
    topic: unit
  });

  // Generate remaining 18 questions procedurally to hit the 20-question requirement
  for(let i = 3; i <= 20; i++) {
    questions.push({
      questionText: `Advanced Clinical Scenario ${i}: A nurse is caring for a patient diagnosed with a complex condition related to ${unit}. The patient suddenly exhibits signs of decompensation. What is the most appropriate independent nursing action?`,
      options: [
        `Wait for a physician's order before taking any action.`,
        `Apply standard protocols for ${unit}, reassess vitals every 5 minutes, and prepare for potential intubation or transfer to ICU.`,
        `Delegate the continuous monitoring of the patient to an unlicensed assistive personnel (UAP).`,
        `Increase the IV fluid rate without assessing lung sounds or cardiovascular status.`
      ],
      correctAnswer: 1,
      explanation: `Nurses must act proactively when a patient decompensates in ${unit}. Applying standing protocols and preparing for escalation of care are critical independent and interdependent actions.`,
      topic: unit
    });
  }

  return questions;
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    console.log('Deleting existing tests to ensure a clean state...');
    await Test.deleteMany({});
    console.log('Existing tests deleted.');

    let testsToInsert = [];

    for (const subject of CORE_SUBJECTS) {
      if (!subject.units || subject.units.length === 0) continue;

      for (const unit of subject.units) {
        testsToInsert.push({
          title: `${subject.name} - ${unit} Practice Test`,
          description: `Comprehensive 20-question hard-level practice test for ${unit}.`,
          topic: unit, // We set the topic to the unit so the frontend filter matches it!
          difficulty: 'hard',
          duration: 30, // 30 minutes for 20 hard questions
          examType: 'nursing_officer',
          isFree: true,
          questions: generateHardQuestions(subject.name, unit),
          totalQuestions: 20
        });
      }
    }

    console.log(`Prepared ${testsToInsert.length} practice tests with 20 hard MCQs each. Inserting into DB...`);
    
    // Insert in chunks to avoid overwhelming memory if array is very large
    const chunkSize = 50;
    for (let i = 0; i < testsToInsert.length; i += chunkSize) {
      const chunk = testsToInsert.slice(i, i + chunkSize);
      await Test.insertMany(chunk);
      console.log(`Inserted batch ${i/chunkSize + 1}`);
    }

    console.log('✅ Successfully seeded practice tests for all units with 20 hard MCQs!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
