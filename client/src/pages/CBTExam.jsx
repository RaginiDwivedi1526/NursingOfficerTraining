import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Clock, X, Check, ArrowLeft, ChevronLeft, ChevronRight, HelpCircle, AlertCircle,
  BrainCircuit, ShieldCheck, TrendingUp, TrendingDown, Layers
} from 'lucide-react';
import { getTest, submitTest, startCATSession, submitCATAnswer } from '../services/api';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';
import './CBTExam.css';

// Status Constants
const STATUS = {
  NOT_VISITED: 'not-visited',           // 1 (white)
  VISITED_UNANSWERED: 'visited-unanswered', // 2 (red)
  ANSWERED: 'answered',                 // 3 (green)
  MARKED: 'marked',                     // 4 (purple)
  ANSWERED_MARKED: 'answered-marked'    // 5 (purple with green dot)
};

// 25 Authentic Nursing Questions (Matching Screenshot 3 question #1)
const DEFAULT_25_QUESTIONS = [
  {
    _id: 'q1',
    questionText: "Auscultation of the fetal heart rate at different abdominal sites can help determine the fetal:",
    questionTextHi: "विभिन्न पेट के स्थानों पर भ्रूण के दिल की धड़कन का श्रवण (Auscultation) भ्रूण के क्या निर्धारित करने में मदद कर सकता है:",
    options: [
      "Lie and attitude",
      "Presentation and position",
      "Engagement",
      "Uterine souffle"
    ],
    optionsHi: [
      "लाई और एटीट्यूड (Lie and attitude)",
      "प्रेजेंटेशन और पोजीशन (Presentation and position)",
      "एंगेजमेंट (Engagement)",
      "गर्भाशय का सूपल (Uterine souffle)"
    ],
    correctAnswer: 1,
    explanation: "Fetal heart rate is best heard over the fetal back. The location of maximum intensity helps in determining the presentation (cephalic vs breech) and position (left vs right, anterior vs posterior).",
    topic: "Obstetrics & Gynecological Nursing"
  },
  {
    _id: 'q2',
    questionText: "Which of the following hormones is primarily responsible for the maintenance of pregnancy during the first trimester before the placenta takes over fully?",
    questionTextHi: "प्लेसेंटा के पूर्ण कार्यभार संभालने से पहले पहली तिमाही के दौरान गर्भावस्था को बनाए रखने के लिए मुख्य रूप से कौन सा हार्मोन जिम्मेदार है?",
    options: [
      "Human chorionic gonadotropin (hCG) maintaining the corpus luteum",
      "Prolactin from the anterior pituitary",
      "Human placental lactogen (hPL)",
      "Oxytocin from the posterior pituitary"
    ],
    optionsHi: [
      "मानव कोरियोनिक गोनाडोट्रोपिन (hCG) कॉर्पस ल्यूटियम को बनाए रखता है",
      "अग्र पिट्यूटरी से प्रोलैक्टिन",
      "ह्यूमन प्लेसेंटल लैक्टोजेन (hPL)",
      "पश्च पिट्यूटरी से ऑक्सीटोसिन"
    ],
    correctAnswer: 0,
    explanation: "Human chorionic gonadotropin (hCG) secreted by the syncytiotrophoblast maintains the corpus luteum, which secretes progesterone and estrogen until the placenta assumes endocrine function around 8-10 weeks.",
    topic: "Obstetrics & Gynecological Nursing"
  },
  {
    _id: 'q3',
    questionText: "During Leopold's maneuvers, the nurse palpates the fundus and feels a soft, irregular, non-ballottable mass. This finding indicates which fetal part in the fundus?",
    questionTextHi: "लियोपोल्ड युद्धाभ्यास (Leopold's maneuvers) के दौरान, नर्स फंडस को टटोलती है और एक नरम, अनियमित, गैर-बैलोटेबल द्रव्यमान महसूस करती है। यह फंडस में किस भ्रूण के अंग को इंगित करता है?",
    options: [
      "Fetal head",
      "Fetal breech (buttocks)",
      "Fetal back",
      "Fetal small extremities"
    ],
    optionsHi: [
      "भ्रूण का सिर",
      "भ्रूण का ब्रीच / नितंब (Breech)",
      "भ्रूण की पीठ",
      "भ्रूण के छोटे छोर / अंग"
    ],
    correctAnswer: 1,
    explanation: "The breech feels softer, irregular, and does not ballot like the head. The fetal head feels round, hard, and ballottable.",
    topic: "Obstetrics & Gynecological Nursing"
  },
  {
    _id: 'q4',
    questionText: "A primigravida at 38 weeks gestation is in active labor. The nurse notes late decelerations on the electronic fetal monitor. Which nursing action takes the highest priority?",
    questionTextHi: "38 सप्ताह के गर्भ वाली एक प्राइमीग्रेविडा सक्रिय प्रसव में है। नर्स इलेक्ट्रॉनिक भ्रूण मॉनिटर पर लेट मंदी (late decelerations) देखती है। कौन सी नर्सिंग कार्रवाई सर्वोच्च प्राथमिकता है?",
    options: [
      "Administer IV oxytocin to expedite delivery",
      "Reposition the client to the left lateral position and administer oxygen",
      "Perform an immediate vaginal examination",
      "Encourage the client to begin pushing with contractions"
    ],
    optionsHi: [
      "प्रसव में तेजी लाने के लिए IV ऑक्सीटोसिन दें",
      "रोगी को बाईं करवट में रखें और ऑक्सीजन दें",
      "तत्काल योनि परीक्षण करें",
      "रोगी को संकुचन के साथ जोर लगाने के लिए प्रोत्साहित करें"
    ],
    correctAnswer: 1,
    explanation: "Late decelerations are caused by uteroplacental insufficiency. Immediate interventions include repositioning the mother onto her left side to increase placental perfusion, administering oxygen via non-rebreather mask, stopping oxytocin, and increasing IV fluids.",
    topic: "Obstetrics & Gynecological Nursing"
  },
  {
    _id: 'q5',
    questionText: "What is the antidote for magnesium sulfate toxicity in a preeclamptic client receiving IV magnesium infusion?",
    questionTextHi: "IV मैग्नीशियम जलसेक प्राप्त कर रही प्री-एक्लेम्पटिक रोगी में मैग्नीशियम सल्फेट विषाक्तता का मारक (Antidote) क्या है?",
    options: [
      "Naloxone hydrochloride",
      "Calcium gluconate 10%",
      "Protamine sulfate",
      "Potassium chloride"
    ],
    optionsHi: [
      "नालोक्सोन हाइड्रोक्लोराइड",
      "कैल्शियम ग्लूकोनेट 10%",
      "प्रोटामाइन सल्फेट",
      "पोटेशियम क्लोराइड"
    ],
    correctAnswer: 1,
    explanation: "Calcium gluconate 10% IV (10 mL given over 3-5 minutes) is the specific antidote for magnesium toxicity (manifested by loss of deep tendon reflexes, respiratory depression < 12/min, and oliguria).",
    topic: "Obstetrics & Gynecological Nursing"
  },
  {
    _id: 'q6',
    questionText: "A newborn's APGAR score at 1 minute shows heart rate 110 bpm, good vigorous cry, active motion of all extremities, grimace on suctioning, and pink body with blue extremities. What is the calculated APGAR score?",
    questionTextHi: "1 मिनट पर एक नवजात शिशु का APGAR स्कोर हृदय गति 110 bpm, जोरदार रोना, सभी अंगों की सक्रिय गति, चूषण पर शिकन, और नीले छोरों के साथ गुलाबी शरीर दिखाता है। गणना किया गया APGAR स्कोर क्या है?",
    options: [
      "10",
      "9",
      "8",
      "7"
    ],
    optionsHi: [
      "10",
      "9",
      "8",
      "7"
    ],
    correctAnswer: 1,
    explanation: "Heart rate > 100 (2) + Vigorous cry (2) + Active motion (2) + Grimace (2) + Acrocyanosis (1) = Total score of 9.",
    topic: "Obstetrics & Gynecological Nursing"
  },
  {
    _id: 'q7',
    questionText: "Which landmark on the fetal skull is defined as the junction between the sagittal, coronal, and frontal sutures?",
    questionTextHi: "भ्रूण की खोपड़ी पर कौन सा स्थल धनु (sagittal), कोरोनल और ललाट (frontal) टांके के बीच के जोड़ के रूप में परिभाषित किया गया है?",
    options: [
      "Lambda (Posterior fontanelle)",
      "Bregma (Anterior fontanelle)",
      "Mentum",
      "Occiput"
    ],
    optionsHi: [
      "लैम्ब्डा (पश्च फॉन्टानेल)",
      "ब्रेग्मा (अग्र फॉन्टानेल)",
      "मेन्टम (ठोड़ी)",
      "ऑसीपुट (खोपड़ी का पिछला भाग)"
    ],
    correctAnswer: 1,
    explanation: "The anterior fontanelle (Bregma) is diamond-shaped and formed by the junction of the sagittal, frontal, and two coronal sutures. It closes around 12-18 months of age.",
    topic: "Obstetrics & Gynecological Nursing"
  },
  {
    _id: 'q8',
    questionText: "In postpartum hemorrhage (PPH), the most common causative factor is:",
    questionTextHi: "प्रसवोत्तर रक्तस्राव (PPH) में सबसे आम कारण क्या है:",
    options: [
      "Uterine atony",
      "Genital tract lacerations",
      "Retained placental tissue",
      "Coagulopathy"
    ],
    optionsHi: [
      "गर्भाशय की शिथिलता / यूटेराइन एटोनी (Uterine atony)",
      "जननांग पथ के घाव",
      "प्लेसेंटल ऊतक का रुकना",
      "रक्त जमावट विकार"
    ],
    correctAnswer: 0,
    explanation: "Uterine atony accounts for approximately 70-80% of all cases of primary postpartum hemorrhage (PPH).",
    topic: "Obstetrics & Gynecological Nursing"
  },
  {
    _id: 'q9',
    questionText: "According to Naegele's rule, what is the Expected Date of Delivery (EDD) for a woman whose Last Menstrual Period (LMP) began on March 15, 2026?",
    questionTextHi: "नेगेले के नियम (Naegele's rule) के अनुसार, उस महिला के प्रसव की अनुमानित तिथि (EDD) क्या है जिसका अंतिम मासिक धर्म (LMP) 15 मार्च 2026 को शुरू हुआ था?",
    options: [
      "December 22, 2026",
      "December 15, 2026",
      "December 8, 2026",
      "January 22, 2027"
    ],
    optionsHi: [
      "22 दिसंबर 2026",
      "15 दिसंबर 2026",
      "8 दिसंबर 2026",
      "22 जनवरी 2027"
    ],
    correctAnswer: 0,
    explanation: "Naegele's Rule: Add 7 days to the first day of LMP and subtract 3 months (or add 9 months). March 15 + 7 days = March 22; subtract 3 months = December 22, 2026.",
    topic: "Obstetrics & Gynecological Nursing"
  },
  {
    _id: 'q10',
    questionText: "Which clinical sign observed in pregnancy is characterized by a bluish or purplish discoloration of the cervix and vaginal mucosa?",
    questionTextHi: "गर्भावस्था में गर्भाशय ग्रीवा और योनि म्यूकोसा का नीला या बैंगनी रंग किस नैदानिक लक्षण की विशेषता है?",
    options: [
      "Goodell's sign",
      "Hegar's sign",
      "Chadwick's sign",
      "Palmer's sign"
    ],
    optionsHi: [
      "गुडेल का लक्षण (Goodell's sign)",
      "हेगर का लक्षण (Hegar's sign)",
      "चाडविक का लक्षण (Chadwick's sign)",
      "पामर का लक्षण (Palmer's sign)"
    ],
    correctAnswer: 2,
    explanation: "Chadwick's sign is the bluish or violet discoloration of the mucous membranes of the cervix, vagina, and vulva due to increased vascularity (Jacquemier's sign).",
    topic: "Obstetrics & Gynecological Nursing"
  },
  {
    _id: 'q11',
    questionText: "The nurse is administering oxytocin (Pitocin) for induction of labor. The infusion should be immediately stopped if which of the following is observed?",
    questionTextHi: "नर्स प्रसव प्रेरण के लिए ऑक्सीटोसिन दे रही है। यदि निम्नलिखित में से क्या देखा जाए तो जलसेक तुरंत बंद कर देना चाहिए?",
    options: [
      "Contractions occurring every 2-3 minutes lasting 45-60 seconds",
      "Contractions lasting longer than 90 seconds or less than 2 minutes apart",
      "Cervical dilation progressing at 1 cm/hr",
      "Maternal heart rate of 88 bpm"
    ],
    optionsHi: [
      "संकुचन हर 2-3 मिनट में 45-60 सेकंड तक रहता है",
      "90 सेकंड से अधिक या 2 मिनट से कम अंतराल पर संकुचन",
      "ग्रीवा फैलाव 1 सेमी/घंटा की गति से बढ़ रहा है",
      "मातृ हृदय गति 88 बीपीएम"
    ],
    correctAnswer: 1,
    explanation: "Uterine tachysystole (hyperstimulation) is defined as contractions lasting > 90 seconds or occurring more frequently than every 2 minutes. This impairs uteroplacental blood flow and oxygen delivery to the fetus.",
    topic: "Obstetrics & Gynecological Nursing"
  },
  {
    _id: 'q12',
    questionText: "A patient presents with sudden severe painless bright red vaginal bleeding in the 32nd week of gestation. This presentation is classic for:",
    questionTextHi: "एक रोगी गर्भावस्था के 32वें सप्ताह में अचानक तेज दर्द रहित चमकीले लाल योनि रक्तस्राव के साथ प्रस्तुत होता है। यह प्रस्तुति किसके लिए क्लासिक है:",
    options: [
      "Abruptio placentae",
      "Placenta previa",
      "Ectopic pregnancy",
      "Hydatidiform mole"
    ],
    optionsHi: [
      "एब्रुप्शियो प्लेसेंटा (Abruptio placentae)",
      "प्लेसेंटा प्रीविया (Placenta previa)",
      "अस्थानिक गर्भावस्था (Ectopic pregnancy)",
      "मोलर गर्भावस्था (Hydatidiform mole)"
    ],
    correctAnswer: 1,
    explanation: "Placenta previa is characterized by painless, causeless, recurrent, bright red vaginal bleeding in the third trimester. Vaginal examination is contraindicated.",
    topic: "Obstetrics & Gynecological Nursing"
  },
  {
    _id: 'q13',
    questionText: "In a patient receiving blood transfusion, which of the following initial symptoms alerts the nurse to a hemolytic transfusion reaction?",
    questionTextHi: "रक्त आधान प्राप्त कर रहे रोगी में, निम्नलिखित में से कौन सा प्रारंभिक लक्षण नर्स को हेमोलिटिक ट्रांसफ्यूजन प्रतिक्रिया के प्रति सचेत करता है?",
    options: [
      "Chills, fever, low back pain, and tachycardia",
      "Urticaria, pruritus, and facial flushing",
      "Dry cough, dyspnea, and hypertension",
      "Bradycardia and peripheral edema"
    ],
    optionsHi: [
      "ठंड लगना, बुखार, पीठ के निचले हिस्से में दर्द और क्षिप्रहृदयता (tachycardia)",
      "पित्ती, खुजली और चेहरे का लाल होना",
      "सूखी खांसी, सांस फूलना और उच्च रक्तचाप",
      "मंदनाड़ी और परिधीय शोफ"
    ],
    correctAnswer: 0,
    explanation: "Acute hemolytic transfusion reaction manifests early with fever, chills, flank/low back pain, tachycardia, hypotension, and hemoglobinuria. The transfusion must be stopped immediately.",
    topic: "Nursing Foundations"
  },
  {
    _id: 'q14',
    questionText: "What is the recommended compression-to-ventilation ratio for adult basic life support (BLS) CPR performed by a single rescuer?",
    questionTextHi: "एकल बचावकर्ता द्वारा वयस्क बुनियादी जीवन समर्थन (BLS) CPR के लिए संपीड़न-से-वेंटिलेशन अनुपात क्या है?",
    options: [
      "15:2",
      "30:2",
      "5:1",
      "30:1"
    ],
    optionsHi: [
      "15:2",
      "30:2",
      "5:1",
      "30:1"
    ],
    correctAnswer: 1,
    explanation: "According to AHA guidelines, the compression-to-ventilation ratio for adult CPR by a single rescuer or two rescuers is 30 compressions to 2 breaths.",
    topic: "Emergency Nursing"
  },
  {
    _id: 'q15',
    questionText: "Which intravenous solution is considered isotonic and suitable for initial fluid resuscitation in hypovolemic shock?",
    questionTextHi: "हाइपोवेलेमिक शॉक में प्रारंभिक द्रव पुनर्जीवन के लिए कौन सा अंतःशिरा घोल आइसोटोनिक और उपयुक्त माना जाता है?",
    options: [
      "0.45% Sodium Chloride (Half-normal saline)",
      "0.9% Sodium Chloride (Normal saline) or Ringer's Lactate",
      "Dextrose 10% in water",
      "Dextrose 5% in 0.45% Sodium Chloride"
    ],
    optionsHi: [
      "0.45% सोडियम क्लोराइड",
      "0.9% सोडियम क्लोराइड (सामान्य सलाइन) या रिंगर लैक्टेट",
      "10% डेक्सट्रोज पानी में",
      "5% डेक्सट्रोज 0.45% सलाइन में"
    ],
    correctAnswer: 1,
    explanation: "Isotonic crystalloids (0.9% Normal Saline and Lactated Ringer's) expand extracellular volume without causing major fluid shifts, making them the preferred initial resuscitation fluids.",
    topic: "Emergency Nursing"
  },
  {
    _id: 'q16',
    questionText: "Before administering digoxin (Lanoxin) to an adult patient, the nurse must assess which parameter for one full minute?",
    questionTextHi: "एक वयस्क रोगी को डिगॉक्सिन (लैनोक्सिन) देने से पहले, नर्स को एक पूरे मिनट के लिए किस पैरामीटर का आकलन करना चाहिए?",
    options: [
      "Radial pulse rate",
      "Apical pulse rate",
      "Blood pressure",
      "Respiratory rate"
    ],
    optionsHi: [
      "रेडियल नाड़ी दर",
      "एपिकल पल्स दर (हृदय की धड़कन)",
      "रक्तचाप",
      "श्वसन दर"
    ],
    correctAnswer: 1,
    explanation: "The nurse must count the apical pulse rate for 60 seconds prior to administering digoxin. The medication is withheld and the physician notified if the heart rate is < 60 bpm in an adult.",
    topic: "Pharmacology"
  },
  {
    _id: 'q17',
    questionText: "The positive Trousseau's and Chvostek's signs are clinical indicators of which electrolyte imbalance?",
    questionTextHi: "सकारात्मक ट्राउसो (Trousseau) और च्वोस्टेक (Chvostek) संकेत किस इलेक्ट्रोलाइट असंतुलन के नैदानिक संकेतक हैं?",
    options: [
      "Hyperkalemia",
      "Hypocalcemia",
      "Hypernatremia",
      "Hypophosphatemia"
    ],
    optionsHi: [
      "हाइपरकेलेमिया",
      "हाइपोकैल्सीमिया (कैल्शियम की कमी)",
      "हाइपरनेट्रेमिया",
      "हाइपोफॉस्फेटेमिया"
    ],
    correctAnswer: 1,
    explanation: "Hypocalcemia causes increased neuromuscular excitability resulting in carpopedal spasm upon inflation of a BP cuff (Trousseau's sign) and facial twitching when tapping the facial nerve (Chvostek's sign).",
    topic: "Medical-Surgical Nursing"
  },
  {
    _id: 'q18',
    questionText: "In the management of biomedical waste in India, human anatomical waste and placenta must be discarded into which colored bag?",
    questionTextHi: "भारत में बायोमेडिकल कचरे के प्रबंधन में, मानव शारीरिक अपशिष्ट और नाल (प्लेसेंटा) को किस रंग के बैग में फेंकना चाहिए?",
    options: [
      "Yellow bag",
      "Red bag",
      "Blue container",
      "Black bag"
    ],
    optionsHi: [
      "पीला बैग (Yellow bag)",
      "लाल बैग (Red bag)",
      "नीला कंटेनर (Blue container)",
      "काला बैग (Black bag)"
    ],
    correctAnswer: 0,
    explanation: "Under the Bio-Medical Waste Management Rules, human anatomical waste, animal waste, soiled waste, and expired medications are segregated into Yellow non-chlorinated plastic bags for incineration or deep burial.",
    topic: "Infection Prevention"
  },
  {
    _id: 'q19',
    questionText: "The Glasgow Coma Scale (GCS) evaluates neurological responsiveness through which three key behavioral categories?",
    questionTextHi: "ग्लासगो कोमा स्केल (GCS) किन तीन प्रमुख व्यवहार श्रेणियों के माध्यम से न्यूरोलॉजिकल प्रतिक्रिया का मूल्यांकन करता है?",
    options: [
      "Eye opening, verbal response, motor response",
      "Pupillary reaction, reflex response, speech",
      "Motor strength, sensory response, consciousness",
      "Breathing pattern, heart rate, orientation"
    ],
    optionsHi: [
      "नेत्र खोलना, मौखिक प्रतिक्रिया, मोटर प्रतिक्रिया",
      "पुतली की प्रतिक्रिया, प्रतिवर्त प्रतिक्रिया, वाणी",
      "मोटर शक्ति, संवेदी प्रतिक्रिया, चेतना",
      "सांस लेने का पैटर्न, हृदय गति, अभिविन्यास"
    ],
    correctAnswer: 0,
    explanation: "GCS assesses Eye opening (1-4), Verbal response (1-5), and Motor response (1-6), yielding a maximum score of 15 (fully alert) and minimum of 3 (deep coma or brain death).",
    topic: "Medical-Surgical Nursing"
  },
  {
    _id: 'q20',
    questionText: "Which type of insulin is considered rapid-acting with an onset of 10 to 15 minutes?",
    questionTextHi: "किस प्रकार के इंसुलिन को 10 से 15 मिनट की शुरुआत के साथ तीव्र-अभिनय (rapid-acting) माना जाता है?",
    options: [
      "Regular insulin",
      "Insulin lispro (Humalog) or aspart (NovoLog)",
      "NPH insulin",
      "Insulin glargine (Lantus)"
    ],
    optionsHi: [
      "रेगुलर इंसुलिन",
      "इंसुलिन लिस्प्रो (ह्यूमालॉग) या एस्पार्ट (नोवोलॉग)",
      "NPH इंसुलिन",
      "इंसुलिन ग्लार्गिन (लैंटस)"
    ],
    correctAnswer: 1,
    explanation: "Rapid-acting insulins (Lispro, Aspart, Glulisine) have an onset of 10-15 minutes, peak in 30-90 minutes, and duration of 3-5 hours. Patients must eat within 10-15 minutes of injection.",
    topic: "Pharmacology"
  },
  {
    _id: 'q21',
    questionText: "A patient diagnosed with schizophrenia expresses belief that government satellites are inserting thoughts into his head. The nurse recognizes this symptom as:",
    questionTextHi: "सिज़ोफ्रेनिया से पीड़ित एक रोगी विश्वास व्यक्त करता है कि सरकारी उपग्रह उसके सिर में विचार डाल रहे हैं। नर्स इस लक्षण को किस रूप में पहचानती है:",
    options: [
      "Delusion of grandeur",
      "Delusion of thought insertion",
      "Auditory hallucination",
      "Idea of reference"
    ],
    optionsHi: [
      "भव्यता का भ्रम (Delusion of grandeur)",
      "विचार सम्मिलन का भ्रम (Thought insertion)",
      "श्रवण मतिभ्रम (Auditory hallucination)",
      "संदर्भ का विचार (Idea of reference)"
    ],
    correctAnswer: 1,
    explanation: "Thought insertion is a delusion in which the patient believes external forces or agencies have inserted thoughts into their mind.",
    topic: "Mental Health (Psychiatric) Nursing"
  },
  {
    _id: 'q22',
    questionText: "The nurse is inserting a nasogastric (NG) tube. What is the most reliable method to confirm correct placement into the stomach prior to initial feeding?",
    questionTextHi: "नर्स एक नासोगैस्ट्रिक (NG) ट्यूब डाल रही है। प्रारंभिक भोजन से पहले पेट में सही प्लेसमेंट की पुष्टि करने का सबसे विश्वसनीय तरीका क्या है?",
    options: [
      "Aspirating gastric contents and testing pH",
      "Auscultating air bolus over the epigastrium",
      "Radiographic confirmation via abdominal X-ray",
      "Checking the depth markings at the nares"
    ],
    optionsHi: [
      "गैस्ट्रिक सामग्री की आकांक्षा और पीएच परीक्षण",
      "अधिजठर पर हवा की गूँज सुनना",
      "पेट के एक्स-रे के माध्यम से रेडियोग्राफिक पुष्टि",
      "नथुने पर गहराई के निशान की जाँच करना"
    ],
    correctAnswer: 2,
    explanation: "Radiographic verification (X-ray) is the gold standard and most definitive method to confirm the position of an NG tube before administering medications or enteral nutrition.",
    topic: "Nursing Foundations"
  },
  {
    _id: 'q23',
    questionText: "Which position is best suited for a patient undergoing thoracentesis to withdraw excess pleural fluid?",
    questionTextHi: "अतिरिक्त फुफ्फुस द्रव को निकालने के लिए थोरैसेन्टेसिस (thoracentesis) से गुजरने वाले रोगी के लिए कौन सी स्थिति सबसे उपयुक्त है?",
    options: [
      "Supine with head elevated 30 degrees",
      "Sitting on edge of bed leaning forward over a padded bedside table",
      "Left lateral Trendelenburg position",
      "Prone position with pillow under abdomen"
    ],
    optionsHi: [
      "30 डिग्री सिर ऊंचा करके सीधे पीठ के बल",
      "बिस्तर के किनारे बैठकर गद्देदार बेडसाइड टेबल पर आगे झुकना",
      "बाईं ओर ट्रेंडेलनबर्ग स्थिति",
      "पेट के नीचे तकिया रखकर औंधे मुंह"
    ],
    correctAnswer: 1,
    explanation: "Sitting on the edge of the bed and leaning forward over an overbed table widens the intercostal spaces and provides optimal posterior access to the pleural space.",
    topic: "Medical-Surgical Nursing"
  },
  {
    _id: 'q24',
    questionText: "Which clinical condition presents with the classic triad of nuchal rigidity, sudden high fever, and altered mental status with positive Kernig's and Brudzinski's signs?",
    questionTextHi: "कौन सी नैदानिक स्थिति गर्दन की कठोरता (nuchal rigidity), अचानक तेज बुखार, और सकारात्मक कर्निंग और ब्रुडज़िंस्की संकेतों के साथ प्रस्तुत होती है?",
    options: [
      "Bacterial meningitis",
      "Encephalitis",
      "Subarachnoid hemorrhage",
      "Multiple sclerosis"
    ],
    optionsHi: [
      "बैक्टीरियल मेनिन्जाइटिस",
      "एन्सेफलाइटिस",
      "सबरैकनॉइड रक्तस्राव",
      "मल्टीपल स्केलेरोसिस"
    ],
    correctAnswer: 0,
    explanation: "Meningitis presents with fever, headache, stiff neck (nuchal rigidity), photophobia, and signs of meningeal irritation (Kernig's and Brudzinski's signs).",
    topic: "Medical-Surgical Nursing"
  },
  {
    _id: 'q25',
    questionText: "What is the normal physiological range of Central Venous Pressure (CVP) measured via a central venous catheter?",
    questionTextHi: "केंद्रीय शिरापरक कैथेटर के माध्यम से मापे गए केंद्रीय शिरापरक दबाव (CVP) की सामान्य शारीरिक सीमा क्या है?",
    options: [
      "2 to 6 mmHg (or 3 to 8 cm H2O)",
      "10 to 18 mmHg",
      "20 to 25 mmHg",
      "0 to 1 mmHg"
    ],
    optionsHi: [
      "2 से 6 mmHg (या 3 से 8 cm H2O)",
      "10 से 18 mmHg",
      "20 से 25 mmHg",
      "0 से 1 mmHg"
    ],
    correctAnswer: 0,
    explanation: "Normal CVP is 2 to 6 mmHg (or 3 to 8 cmH2O). A low CVP indicates hypovolemia, while an elevated CVP indicates fluid overload or right ventricular failure.",
    topic: "Medical-Surgical Nursing"
  }
];

export default function CBTExam() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Test metadata
  const [testTitle, setTestTitle] = useState('Free Nursing Test - 180/180');
  const [questions, setQuestions] = useState(DEFAULT_25_QUESTIONS);
  const [currentIdx, setCurrentIdx] = useState(0);

  // CAT Adaptive Engine State
  const [catSession, setCatSession] = useState(null);
  const [isCATMode, setIsCATMode] = useState(true);
  const [currentDifficultyLevel, setCurrentDifficultyLevel] = useState(2);
  const [currentDifficultyName, setCurrentDifficultyName] = useState('Level 2: Base (Standard Passing)');
  const [abilityTheta, setAbilityTheta] = useState(0.0);
  const [difficultyTransition, setDifficultyTransition] = useState(null); // 'up' | 'down' | 'same'
  const [submittingAnswer, setSubmittingAnswer] = useState(false);

  // User state per question
  // questionStatus: Array of STATUS strings (Initialized with 25 items: #0 visited, #1-24 not visited)
  const [questionStatus, setQuestionStatus] = useState(() => {
    const init = new Array(25).fill(STATUS.NOT_VISITED);
    init[0] = STATUS.VISITED_UNANSWERED;
    return init;
  });
  // userAnswers: Array of selected option index or null
  const [userAnswers, setUserAnswers] = useState(() => new Array(25).fill(null));
  // times: time spent per question
  const [questionTimes, setQuestionTimes] = useState(() => new Array(25).fill(0));

  // Live Timer
  const [durationSeconds, setDurationSeconds] = useState(30 * 60);
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  // UI States
  const [selectedFont, setSelectedFont] = useState('Khand');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [fontSizeLevel, setFontSizeLevel] = useState(1); // 0 = A-, 1 = A, 2 = A+
  const [isPaletteCollapsed, setIsPaletteCollapsed] = useState(false);
  const [showQuestionListModal, setShowQuestionListModal] = useState(false);
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const startTimeRef = useRef(Date.now());

  // Initialize test data and CAT session
  useEffect(() => {
    initExam();
  }, [id]);

  const initExam = async () => {
    let initialTitle = location.state?.title || location.state?.test?.title || 'Free Nursing Test - 180/180';
    let topic = location.state?.topic || location.state?.test?.topic || 'Obstetrics & Gynecological Nursing';
    let examType = location.state?.examType || location.state?.test?.examType || 'nclex_rn';
    let durationMins = location.state?.duration || location.state?.test?.duration || 30;

    setTestTitle(initialTitle);
    setCurrentDifficultyLevel(2);
    setCurrentDifficultyName('Level 2: Base (Standard Passing)');
    setAbilityTheta(0.0);
    setDifficultyTransition(null);

    const isExplicitCAT = Boolean(location.state?.isCAT || id === 'adaptive');

    // 1. If explicitly adaptive CAT mode (Practice Tests follow CAT adaptive standard):
    if (isExplicitCAT) {
      setIsCATMode(true);
      try {
        const { data } = await startCATSession({
          title: initialTitle,
          topic,
          examType,
          startingDifficulty: 2,
          minQuestions: 20,
          maxQuestions: 25
        });

        if (data && data.currentQuestion) {
          setCatSession(data);
          setCurrentDifficultyLevel(data.currentDifficultyLevel || 2);
          setCurrentDifficultyName(data.difficultyName || 'Level 2: Base (Standard Passing)');
          setAbilityTheta(data.abilityTheta || 0.0);

          const firstQ = {
            _id: data.currentQuestion._id || 'cat_q1',
            questionText: data.currentQuestion.questionText,
            options: data.currentQuestion.options,
            topic: data.currentQuestion.topic || topic,
            difficultyLevel: data.currentDifficultyLevel || 2,
            difficultyName: data.difficultyName || 'Level 2: Base',
            correctAnswer: data.currentQuestion.correctAnswer,
            explanation: data.currentQuestion.explanation
          };

          const total = 25;
          const initialQuestions = new Array(total).fill(null).map((_, i) => ({
            ...DEFAULT_25_QUESTIONS[i % DEFAULT_25_QUESTIONS.length],
            _id: `cat_q_${i + 1}`,
            difficultyLevel: 2,
            difficultyName: 'Level 2: Base'
          }));
          initialQuestions[0] = firstQ;
          setQuestions(initialQuestions);

          const initialStatus = new Array(total).fill(STATUS.NOT_VISITED);
          initialStatus[0] = STATUS.VISITED_UNANSWERED;
          setQuestionStatus(initialStatus);

          setUserAnswers(new Array(total).fill(null));
          setQuestionTimes(new Array(total).fill(0));

          const totalSeconds = durationMins * 60;
          setDurationSeconds(totalSeconds);
          setTimeLeft(totalSeconds);
          startTimeRef.current = Date.now();
          return;
        }
      } catch (catErr) {
        console.warn('[CBTExam] CAT start failed, falling back to clinical questions with adaptive engine:', catErr.message);
      }
    }

    // 2. If taking a database test (Mock test, Test Series, AI Generated Test, PYQ):
    if (isMongoId) {
      setIsCATMode(isExplicitCAT);
      try {
        const { data } = await getTest(id);
        if (data && data.questions && data.questions.length > 0) {
          const testQs = data.questions;
          const total = testQs.length;
          const mins = data.duration || durationMins || 30;

          setTestTitle(data.title || initialTitle);
          setQuestions(testQs);

          const initialStatus = new Array(total).fill(STATUS.NOT_VISITED);
          initialStatus[0] = STATUS.VISITED_UNANSWERED;
          setQuestionStatus(initialStatus);

          setUserAnswers(new Array(total).fill(null));
          setQuestionTimes(new Array(total).fill(0));

          const totalSeconds = mins * 60;
          setDurationSeconds(totalSeconds);
          setTimeLeft(totalSeconds);
          startTimeRef.current = Date.now();
          return;
        }
      } catch (fetchErr) {
        console.warn('[CBTExam] Could not fetch test by ID from backend, checking state:', fetchErr.message);
      }

      // Check if questions were passed via navigation state
      if (location.state?.test?.questions && location.state.test.questions.length > 0) {
        const testQs = location.state.test.questions;
        const total = testQs.length;
        setQuestions(testQs);

        const initialStatus = new Array(total).fill(STATUS.NOT_VISITED);
        initialStatus[0] = STATUS.VISITED_UNANSWERED;
        setQuestionStatus(initialStatus);

        setUserAnswers(new Array(total).fill(null));
        setQuestionTimes(new Array(total).fill(0));

        const totalSeconds = durationMins * 60;
        setDurationSeconds(totalSeconds);
        setTimeLeft(totalSeconds);
        startTimeRef.current = Date.now();
        return;
      }
    }

    // 3. Fallback for Free Practice Test (id === '571' or local default)
    setIsCATMode(isExplicitCAT);
    const total = DEFAULT_25_QUESTIONS.length;
    setQuestions(DEFAULT_25_QUESTIONS);

    const initialStatus = new Array(total).fill(STATUS.NOT_VISITED);
    initialStatus[0] = STATUS.VISITED_UNANSWERED;
    setQuestionStatus(initialStatus);

    setUserAnswers(new Array(total).fill(null));
    setQuestionTimes(new Array(total).fill(0));

    const totalSeconds = durationMins * 60;
    setDurationSeconds(totalSeconds);
    setTimeLeft(totalSeconds);
    startTimeRef.current = Date.now();
  };

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinalSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format timer HH:MM:SS or MM:SS
  const formatTimer = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // When moving to another question, mark it as visited if it was not visited
  const navigateToQuestion = (targetIdx) => {
    if (targetIdx < 0 || targetIdx >= questions.length) return;

    // Update status of target question if it is NOT_VISITED
    setQuestionStatus(prev => {
      const next = [...prev];
      if (next[targetIdx] === STATUS.NOT_VISITED) {
        next[targetIdx] = STATUS.VISITED_UNANSWERED;
      }
      return next;
    });

    setCurrentIdx(targetIdx);
  };

  // Option selection
  const handleOptionSelect = (optionIdx) => {
    setUserAnswers(prev => {
      const next = [...prev];
      next[currentIdx] = optionIdx;
      return next;
    });
  };

  // [Clear Response]
  const handleClearResponse = () => {
    setUserAnswers(prev => {
      const next = [...prev];
      next[currentIdx] = null;
      return next;
    });
    setQuestionStatus(prev => {
      const next = [...prev];
      next[currentIdx] = STATUS.VISITED_UNANSWERED;
      return next;
    });
  };

  // Adaptive CAT step: submit answer to CAT engine and dynamically adapt difficulty
  const processCATAnswerStep = async (selectedOpt) => {
    const elapsedSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
    startTimeRef.current = Date.now();
    const currentQ = questions[currentIdx];

    // If server CAT session is active:
    if (catSession && (catSession.sessionId || catSession._id)) {
      try {
        setSubmittingAnswer(true);
        const { data } = await submitCATAnswer({
          sessionId: catSession.sessionId || catSession._id,
          selectedAnswer: selectedOpt,
          timeTaken: elapsedSeconds
        });

        if (data) {
          setDifficultyTransition(data.transition || 'same');
          if (data.currentDifficultyLevel) setCurrentDifficultyLevel(data.currentDifficultyLevel);
          if (data.difficultyName) setCurrentDifficultyName(data.difficultyName);
          if (data.abilityTheta !== undefined) setAbilityTheta(data.abilityTheta);

          if (data.isCompleted) {
            handleFinalSubmit();
            return;
          }

          if (data.nextQuestion && currentIdx + 1 < questions.length) {
            const nextQuestionObj = {
              _id: data.nextQuestion._id || `cat_q_${currentIdx + 2}`,
              questionText: data.nextQuestion.questionText,
              options: data.nextQuestion.options,
              topic: data.nextQuestion.topic || currentQ.topic,
              difficultyLevel: data.currentDifficultyLevel,
              difficultyName: data.difficultyName,
              correctAnswer: data.nextQuestion.correctAnswer,
              explanation: data.nextQuestion.explanation
            };
            setQuestions(prev => {
              const updated = [...prev];
              updated[currentIdx + 1] = nextQuestionObj;
              return updated;
            });
          }
        }
      } catch (catSubmitErr) {
        console.warn('[CBTExam] Server submitCATAnswer error, applying client-side adaptive calculation:', catSubmitErr.message);
        applyLocalAdaptiveStep(selectedOpt);
      } finally {
        setSubmittingAnswer(false);
      }
    } else {
      // Client-side local adaptive algorithm
      applyLocalAdaptiveStep(selectedOpt);
    }
  };

  // Local adaptive engine simulation (IRT Theta estimation)
  const applyLocalAdaptiveStep = (selectedOpt) => {
    const currentQ = questions[currentIdx];
    const isCorrect = selectedOpt !== null && selectedOpt === currentQ?.correctAnswer;
    let nextLevel = currentDifficultyLevel;
    let trans = 'same';
    let newTheta = abilityTheta;

    if (isCorrect) {
      newTheta = Math.min(3.0, Number((abilityTheta + 0.28).toFixed(2)));
      if (currentDifficultyLevel < 4) {
        nextLevel = currentDifficultyLevel + 1;
        trans = 'up';
      }
    } else if (selectedOpt !== null) {
      newTheta = Math.max(-3.0, Number((abilityTheta - 0.22).toFixed(2)));
      if (currentDifficultyLevel > 1) {
        nextLevel = currentDifficultyLevel - 1;
        trans = 'down';
      }
    }

    setAbilityTheta(newTheta);
    setCurrentDifficultyLevel(nextLevel);
    setDifficultyTransition(trans);

    const levelLabels = {
      1: 'Level 1: Below Base (Foundational)',
      2: 'Level 2: Base (Standard Passing)',
      3: 'Level 3: Advanced Hard (Clinical Prioritization)',
      4: 'Level 4: Peak Level (High Acuity / Critical Care) 🔥'
    };
    setCurrentDifficultyName(levelLabels[nextLevel] || 'Level 2: Base');

    if (currentIdx + 1 < questions.length) {
      setQuestions(prev => {
        const updated = [...prev];
        if (updated[currentIdx + 1]) {
          updated[currentIdx + 1] = {
            ...updated[currentIdx + 1],
            difficultyLevel: nextLevel,
            difficultyName: levelLabels[nextLevel] || 'Level 2: Base'
          };
        }
        return updated;
      });
    }
  };

  // [Save & Next]
  const handleSaveAndNext = async () => {
    const currentAnswer = userAnswers[currentIdx];
    setQuestionStatus(prev => {
      const next = [...prev];
      if (currentAnswer !== null && currentAnswer !== undefined) {
        next[currentIdx] = STATUS.ANSWERED;
      } else {
        next[currentIdx] = STATUS.VISITED_UNANSWERED;
      }
      return next;
    });

    // Run CAT adaptation
    if (isCATMode && currentAnswer !== null && currentAnswer !== undefined) {
      await processCATAnswerStep(currentAnswer);
    }

    if (currentIdx + 1 < questions.length) {
      navigateToQuestion(currentIdx + 1);
    } else {
      handleFinalSubmit();
    }
  };

  // [Mark & Next]
  const handleMarkAndNext = async () => {
    const currentAnswer = userAnswers[currentIdx];
    setQuestionStatus(prev => {
      const next = [...prev];
      if (currentAnswer !== null && currentAnswer !== undefined) {
        next[currentIdx] = STATUS.ANSWERED_MARKED;
      } else {
        next[currentIdx] = STATUS.MARKED;
      }
      return next;
    });

    // Run CAT adaptation
    if (isCATMode && currentAnswer !== null && currentAnswer !== undefined) {
      await processCATAnswerStep(currentAnswer);
    }

    if (currentIdx + 1 < questions.length) {
      navigateToQuestion(currentIdx + 1);
    } else {
      handleFinalSubmit();
    }
  };

  // [Back]
  const handleBack = () => {
    if (currentIdx > 0) {
      navigateToQuestion(currentIdx - 1);
    }
  };

  // Status Summary Counts
  const answeredCount = questionStatus.filter(s => s === STATUS.ANSWERED).length;
  const answeredMarkedCount = questionStatus.filter(s => s === STATUS.ANSWERED_MARKED).length;
  const visitedUnansweredCount = questionStatus.filter(s => s === STATUS.VISITED_UNANSWERED).length;
  const markedCount = questionStatus.filter(s => s === STATUS.MARKED).length;
  // Ensure notVisited precisely balances total questions
  const notVisitedCount = Math.max(0, questions.length - (answeredCount + answeredMarkedCount + visitedUnansweredCount + markedCount));

  const counts = {
    answered: answeredCount,
    answeredMarked: answeredMarkedCount,
    visitedUnanswered: visitedUnansweredCount,
    marked: markedCount,
    notVisited: notVisitedCount,
    total: questions.length
  };

  // Final Submit
  const handleFinalSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const totalTimeTaken = Math.max(1, durationSeconds - timeLeft);

    // Compute evaluation
    // Note: Per CBT guidelines (Screenshot 2), both Answered (1) and Answered & Marked (2) are evaluated
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    const processedAnswers = questions.map((q, i) => {
      const chosen = userAnswers[i];
      const isAttempted = chosen !== null && chosen !== undefined && chosen !== -1;
      const hasAnswerKey = q.correctAnswer !== undefined && q.correctAnswer !== null;
      const isCorrect = isAttempted && hasAnswerKey && Number(chosen) === Number(q.correctAnswer);

      if (isAttempted) {
        if (isCorrect) correctCount++;
        else if (hasAnswerKey) incorrectCount++;
      } else {
        unattemptedCount++;
      }

      return {
        questionId: q._id,
        questionIndex: i,
        selectedAnswer: isAttempted ? Number(chosen) : -1,
        isCorrect,
        topic: q.topic || 'Nursing',
        timeTaken: questionTimes[i] || Math.round(totalTimeTaken / Math.max(1, questions.length))
      };
    });

    // Competitive Nursing Exam Scoring (-1/3 Negative Marking per wrong answer)
    const totalMarks = questions.length * 1.0;
    const positiveMarks = Number((correctCount * 1.0).toFixed(2));
    const negativeMarksDeducted = Number((incorrectCount * (1 / 3)).toFixed(2));
    let marksObtained = Number((positiveMarks - negativeMarksDeducted).toFixed(2));
    if (marksObtained < 0) marksObtained = 0;

    const attemptedCount = correctCount + incorrectCount;
    const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
    const score = totalMarks > 0 ? Math.round((marksObtained / totalMarks) * 100) : 0;
    const minPassPercentage = 50.0;
    const passingMarksRequired = Number((totalMarks * 0.5).toFixed(2));
    const isPassed = marksObtained >= passingMarksRequired;

    const statusSummary = {
      answered: counts.answered,
      answeredMarked: counts.answeredMarked,
      visitedUnanswered: counts.visitedUnanswered,
      marked: counts.marked,
      notVisited: counts.notVisited,
      total: questions.length
    };

    const catTelemetry = {
      isCATMode,
      abilityTheta,
      finalDifficultyLevel: currentDifficultyLevel,
      finalDifficultyName: currentDifficultyName,
      catDecision: abilityTheta >= 0.20 ? 'Above Passing Standard (Met Criteria)' : (abilityTheta >= -0.20 ? 'Near Passing Standard' : 'Below Passing Standard')
    };

    const resultPayload = {
      user: user?._id || 'guest',
      test: id || '571',
      answers: processedAnswers,
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      incorrectAnswers: incorrectCount,
      unattemptedAnswers: unattemptedCount,
      totalMarks,
      positiveMarks,
      negativeMarksDeducted,
      marksObtained,
      accuracy,
      score,
      isPassed,
      minPassPercentage,
      passingMarksRequired,
      statusSummary,
      catTelemetry,
      timeTaken: totalTimeTaken,
      completedAt: new Date()
    };

    // Try posting to backend if mongo ID
    if (id && id !== 'adaptive' && id !== '571' && /^[0-9a-fA-F]{24}$/.test(id)) {
      try {
        const { data: submitRes } = await submitTest(id, {
          answers: processedAnswers,
          timeTaken: totalTimeTaken,
          statusSummary,
          catTelemetry
        });
        const backendResult = submitRes?.result || {};
        const finalMergedResult = {
          ...resultPayload,
          ...backendResult,
          positiveMarks: backendResult.positiveMarks !== undefined ? backendResult.positiveMarks : resultPayload.positiveMarks,
          marksObtained: backendResult.marksObtained !== undefined ? backendResult.marksObtained : resultPayload.marksObtained,
          score: backendResult.score !== undefined ? backendResult.score : resultPayload.score,
          accuracy: backendResult.accuracy !== undefined ? backendResult.accuracy : resultPayload.accuracy,
          statusSummary: backendResult.statusSummary || statusSummary,
          answers: (backendResult.answers && backendResult.answers.length > 0) ? backendResult.answers : processedAnswers
        };
        navigate(`/result/${id}`, {
          state: {
            result: finalMergedResult,
            correctAnswers: submitRes.correctAnswers || questions.map(q => ({
              questionId: q._id,
              correctAnswer: q.correctAnswer,
              explanation: q.explanation
            })),
            test: {
              _id: id,
              title: testTitle,
              questions
            }
          }
        });
        return;
      } catch (err) {
        console.warn('[CBTExam] Backend submission failed, navigating with local payload:', err.message);
      }
    }

    // Local navigation fallback
    navigate(`/result/${id || '571'}`, {
      state: {
        result: resultPayload,
        correctAnswers: questions.map(q => ({
          questionId: q._id,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation
        })),
        test: {
          _id: id || '571',
          title: testTitle,
          questions
        }
      }
    });
  };

  const currentQ = questions[currentIdx] || questions[0];
  const currentSelected = userAnswers[currentIdx];

  // Font styling dynamic
  const fontFamilies = {
    'Khand': "'Khand', sans-serif",
    'Inter': "'Inter', sans-serif",
    'DM Sans': "'DM Sans', sans-serif",
    'Roboto': "'Roboto', sans-serif"
  };

  const fontSizes = {
    0: { q: '15px', opt: '13px' }, // A-
    1: { q: '17px', opt: '15px' }, // A
    2: { q: '19px', opt: '17px' }  // A+
  };

  const isHindi = selectedLanguage === 'hi';
  const displayQuestionText = (isHindi && currentQ.questionTextHi) ? currentQ.questionTextHi : currentQ.questionText;
  const displayOptions = (isHindi && currentQ.optionsHi) ? currentQ.optionsHi : currentQ.options;

  return (
    <div className="cbt-container" style={{ fontFamily: fontFamilies[selectedFont] || "'DM Sans', sans-serif" }}>

      {/* ─── 1. TOP HEADER NAVBAR ─── */}
      <header className="cbt-header">
        <div className="cbt-header-left">
          <img src={logo} alt="Nursing Officer Logo" className="cbt-logo" />
          <div className="cbt-portal-title">
            <span className="cbt-main-title">Nursing Officer Test Bank</span>
            <span className="cbt-helpline">Call or WhatsApp at: 9828474951</span>
          </div>
        </div>

        <div className="cbt-header-right">
          {/* Live Digital Timer */}
          <div className={`cbt-timer-box ${timeLeft < 300 ? 'warning' : ''}`} id="cbt-timer">
            <Clock size={20} />
            <span>{formatTimer(timeLeft)}</span>
          </div>

          {/* Font Selector Dropdown */}
          <div className="cbt-control-group">
            <select
              id="cbt-font-select"
              className="cbt-select"
              value={selectedFont}
              onChange={(e) => setSelectedFont(e.target.value)}
            >
              <option value="Khand">Khand</option>
              <option value="DM Sans">DM Sans</option>
              <option value="Inter">Inter</option>
              <option value="Roboto">Roboto</option>
            </select>
            <span className="cbt-control-label">Font</span>
          </div>

          {/* Translate Dropdown */}
          <div className="cbt-control-group">
            <select
              id="cbt-lang-select"
              className="cbt-select"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              <option value="en">US English</option>
              <option value="hi">हिन्दी (Hindi)</option>
            </select>
            <span className="cbt-control-label">Translate</span>
          </div>
        </div>
      </header>

      {/* ─── 2. SECONDARY SUB-BAR (Dark) ─── */}
      <div className="cbt-subbar">
        <div className="cbt-subbar-left">
          <span className="cbt-bullet"></span>
          <span>{testTitle}</span>
        </div>

        <div>
          <button
            id="cbt-btn-question-list"
            className="cbt-btn-qlist"
            onClick={() => setShowQuestionListModal(true)}
          >
            Question List
          </button>
        </div>

        <div className="cbt-subbar-right">
          <span className="cbt-candidate-id">
            {user?.phone || user?.email || '7049924868@pcbtnursing'}
          </span>
          <div className="cbt-font-buttons">
            <button
              className="cbt-font-btn"
              title="Decrease Font Size"
              onClick={() => setFontSizeLevel(Math.max(0, fontSizeLevel - 1))}
            >
              A-
            </button>
            <button
              className="cbt-font-btn"
              title="Reset Font Size"
              onClick={() => setFontSizeLevel(1)}
            >
              A
            </button>
            <button
              className="cbt-font-btn"
              title="Increase Font Size"
              onClick={() => setFontSizeLevel(Math.min(2, fontSizeLevel + 1))}
            >
              A+
            </button>
          </div>
        </div>
      </div>

      {/* ─── 2.5 LIVE CAT ADAPTIVE TELEMETRY STRIP ─── */}
      {isCATMode && (
        <div className="cbt-cat-strip">
          <div className="cbt-cat-left">
            <span className="cbt-cat-tag">
              <BrainCircuit size={14} /> Computer Adaptive Testing (CAT)
            </span>

            <span className={`cbt-cat-badge level-${currentDifficultyLevel}`}>
              ⚡ {currentDifficultyName}
            </span>

            {difficultyTransition === 'up' && (
              <span className="cbt-cat-transition up">
                <TrendingUp size={12} /> ▲ Difficulty Escalated
              </span>
            )}

            {difficultyTransition === 'down' && (
              <span className="cbt-cat-transition down">
                <TrendingDown size={12} /> ▼ Difficulty Adjusted
              </span>
            )}
          </div>

          <div className="cbt-cat-right">
            <div className="cbt-theta-wrap">
              <span>Candidate Ability (θ):</span>
              <span className="cbt-theta-val">
                {abilityTheta >= 0 ? `+${abilityTheta.toFixed(2)}` : abilityTheta.toFixed(2)}
              </span>
              <span className={`cbt-theta-badge ${abilityTheta >= 0.20 ? 'passing' : (abilityTheta >= -0.10 ? 'borderline' : 'below')}`}>
                {abilityTheta >= 0.20 ? 'Passing Zone 🛡️' : (abilityTheta >= -0.10 ? 'Borderline' : 'Needs Practice')}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ─── 3. MAIN EXAM BODY ─── */}
      <div className="cbt-body">

        {/* Left Column: Question Area */}
        <div className="cbt-question-pane">
          <div className="cbt-q-card">

            {/* Question Header */}
            <div className="cbt-q-header" style={{ fontSize: fontSizes[fontSizeLevel].q }}>
              <span className="cbt-q-number">Q. {currentIdx + 1}.</span>
              <span>{displayQuestionText}</span>
            </div>

            {/* Options List */}
            <div className="cbt-options-list">
              {displayOptions.map((optText, optIdx) => {
                const optLetter = String.fromCharCode(65 + optIdx);
                const isSelected = currentSelected === optIdx;
                return (
                  <div
                    key={optIdx}
                    id={`opt-${optIdx}`}
                    className={`cbt-option-item ${isSelected ? 'selected' : ''}`}
                    style={{ fontSize: fontSizes[fontSizeLevel].opt }}
                    onClick={() => handleOptionSelect(optIdx)}
                  >
                    <div className="cbt-radio-circle">
                      {isSelected && <div className="cbt-radio-dot" />}
                    </div>
                    <span><strong>{optLetter}.</strong> {optText}</span>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Bottom Action Bar */}
          <div className="cbt-action-bar">
            <div className="cbt-action-left">
              <button
                id="btn-mark-next"
                className="cbt-btn cbt-btn-purple"
                onClick={handleMarkAndNext}
                disabled={submittingAnswer}
              >
                {submittingAnswer ? 'Evaluating...' : 'Mark & Next'}
              </button>
              <button
                id="btn-clear-response"
                className="cbt-btn cbt-btn-coral"
                onClick={handleClearResponse}
                disabled={submittingAnswer}
              >
                Clear Response
              </button>
            </div>

            <div className="cbt-action-right">
              <button
                id="btn-back"
                className="cbt-btn cbt-btn-sky"
                onClick={handleBack}
                disabled={currentIdx === 0 || submittingAnswer}
              >
                Back
              </button>
              <button
                id="btn-save-next"
                className="cbt-btn cbt-btn-green"
                onClick={handleSaveAndNext}
                disabled={submittingAnswer}
              >
                {submittingAnswer ? 'Evaluating...' : 'Save & Next'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Question Palette */}
        <div className={`cbt-palette-pane ${isPaletteCollapsed ? 'collapsed' : ''}`}>

          {/* Collapse/Expand Toggle Tab */}
          <button
            className="cbt-toggle-collapse"
            onClick={() => setIsPaletteCollapsed(!isPaletteCollapsed)}
            title={isPaletteCollapsed ? "Expand Question Palette" : "Collapse Question Palette"}
          >
            {isPaletteCollapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>

          <div className="cbt-palette-card">

            {/* Status Summary */}
            <div className="cbt-status-summary">
              <div className="cbt-summary-title">Question Status Summary</div>

              <div className="cbt-summary-grid">

                {/* 1 Answered */}
                <div className="cbt-summary-row">
                  <div className="cbt-summary-badge-wrap">
                    <div className="cbt-sbadge answered">1</div>
                    <span>Answered:</span>
                  </div>
                  <span className="cbt-summary-count green">{counts.answered}</span>
                </div>

                {/* 2 Answered and Marked */}
                <div className="cbt-summary-row">
                  <div className="cbt-summary-badge-wrap">
                    <div className="cbt-sbadge answered-marked">2</div>
                    <span>Answered and Marked:</span>
                  </div>
                  <span className="cbt-summary-count purple">{counts.answeredMarked}</span>
                </div>

                {/* 3 Visited but Not Answered */}
                <div className="cbt-summary-row">
                  <div className="cbt-summary-badge-wrap">
                    <div className="cbt-sbadge visited-unanswered">3</div>
                    <span>Visited but Not Answered:</span>
                  </div>
                  <span className="cbt-summary-count red">{counts.visitedUnanswered}</span>
                </div>

                {/* 4 Marked for Review */}
                <div className="cbt-summary-row">
                  <div className="cbt-summary-badge-wrap">
                    <div className="cbt-sbadge marked">4</div>
                    <span>Marked for Review:</span>
                  </div>
                  <span className="cbt-summary-count violet">{counts.marked}</span>
                </div>

                {/* 5 Not Visited */}
                <div className="cbt-summary-row">
                  <div className="cbt-summary-badge-wrap">
                    <div className="cbt-sbadge not-visited">5</div>
                    <span>Not Visited:</span>
                  </div>
                  <span className="cbt-summary-count gray">{counts.notVisited}</span>
                </div>

                {/* Total Questions */}
                <div className="cbt-total-row">
                  <span>Total Questions:</span>
                  <span>{counts.total}</span>
                </div>

              </div>
            </div>

            {/* Question Navigation Grid */}
            <div className="cbt-nav-sec">
              <div className="cbt-nav-title">Question Navigation</div>

              <div className="cbt-grid">
                {questions.map((_, i) => {
                  const status = questionStatus[i] || STATUS.NOT_VISITED;
                  const isActive = i === currentIdx;
                  return (
                    <div
                      key={i}
                      id={`nav-q-${i + 1}`}
                      className={`cbt-grid-item ${status} ${isActive ? 'active' : ''}`}
                      onClick={() => navigateToQuestion(i)}
                    >
                      {i + 1}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <button
              id="btn-submit-test"
              className="cbt-btn-submit"
              onClick={() => setShowSubmitConfirmModal(true)}
            >
              Submit Test
            </button>

          </div>
        </div>

      </div>

      {/* ─── 4. QUESTION LIST MODAL ─── */}
      {showQuestionListModal && (
        <div className="cbt-modal-overlay" onClick={() => setShowQuestionListModal(false)}>
          <div className="cbt-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="cbt-modal-header">
              <div className="cbt-modal-title">Question List Overview ({questions.length} Questions)</div>
              <button className="cbt-modal-close" onClick={() => setShowQuestionListModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="cbt-modal-body">
              {questions.map((q, i) => {
                const status = questionStatus[i] || STATUS.NOT_VISITED;
                const statusLabels = {
                  [STATUS.NOT_VISITED]: { label: 'Not Visited', bg: '#f1f5f9', color: '#64748b' },
                  [STATUS.VISITED_UNANSWERED]: { label: 'Not Answered', bg: '#fee2e2', color: '#dc2626' },
                  [STATUS.ANSWERED]: { label: 'Answered', bg: '#dcfce7', color: '#16a34a' },
                  [STATUS.MARKED]: { label: 'Marked', bg: '#f3e8ff', color: '#9333ea' },
                  [STATUS.ANSWERED_MARKED]: { label: 'Answered & Marked', bg: '#ede9fe', color: '#7c3aed' }
                };
                const sObj = statusLabels[status];
                return (
                  <div
                    key={i}
                    className="cbt-ql-item"
                    onClick={() => {
                      navigateToQuestion(i);
                      setShowQuestionListModal(false);
                    }}
                  >
                    <div className="cbt-ql-left">
                      <strong>Q.{i + 1}</strong>
                      <span>{q.questionText.substring(0, 90)}...</span>
                    </div>
                    <span
                      className="cbt-ql-status"
                      style={{ background: sObj.bg, color: sObj.color }}
                    >
                      {sObj.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ─── 5. SUBMIT CONFIRMATION MODAL ─── */}
      {showSubmitConfirmModal && (
        <div className="cbt-modal-overlay" onClick={() => setShowSubmitConfirmModal(false)}>
          <div className="cbt-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cbt-confirm-title">Submit Test Confirmation</div>
            <p className="cbt-confirm-sub">
              Are you sure you want to submit your test? Once submitted, you cannot change your answers.
            </p>

            <div className="cbt-confirm-stats-card">
              <div className="cbt-confirm-table-header">
                <span>Status Category</span>
                <span>Count</span>
              </div>

              {/* 1 Answered */}
              <div className="cbt-confirm-row">
                <div className="cbt-summary-badge-wrap">
                  <div className="cbt-sbadge answered">1</div>
                  <span className="cbt-crow-label">Answered</span>
                </div>
                <span className="cbt-crow-val green">{counts.answered}</span>
              </div>

              {/* 2 Answered and Marked */}
              <div className="cbt-confirm-row">
                <div className="cbt-summary-badge-wrap">
                  <div className="cbt-sbadge answered-marked">2</div>
                  <span className="cbt-crow-label">Answered and Marked for Review</span>
                </div>
                <span className="cbt-crow-val purple">{counts.answeredMarked}</span>
              </div>

              {/* 3 Visited but Not Answered */}
              <div className="cbt-confirm-row">
                <div className="cbt-summary-badge-wrap">
                  <div className="cbt-sbadge visited-unanswered">3</div>
                  <span className="cbt-crow-label">Visited but Not Answered</span>
                </div>
                <span className="cbt-crow-val red">{counts.visitedUnanswered}</span>
              </div>

              {/* 4 Marked for Review */}
              <div className="cbt-confirm-row">
                <div className="cbt-summary-badge-wrap">
                  <div className="cbt-sbadge marked">4</div>
                  <span className="cbt-crow-label">Marked for Review (Unanswered)</span>
                </div>
                <span className="cbt-crow-val violet">{counts.marked}</span>
              </div>

              {/* 5 Not Visited */}
              <div className="cbt-confirm-row">
                <div className="cbt-summary-badge-wrap">
                  <div className="cbt-sbadge not-visited">5</div>
                  <span className="cbt-crow-label">Not Visited</span>
                </div>
                <span className="cbt-crow-val gray">{counts.notVisited}</span>
              </div>

              {/* Total Questions */}
              <div className="cbt-confirm-total-row">
                <span>Total Questions</span>
                <span className="cbt-total-count">{counts.total}</span>
              </div>
            </div>

            <div className="cbt-confirm-evaluation-note">
              <ShieldCheck size={16} />
              <span><strong>Official Evaluation Rule:</strong> Questions marked <strong>1 (Answered)</strong> and <strong>2 (Answered & Marked)</strong> will be evaluated with <strong>-1/3 negative marking</strong>.</span>
            </div>

            <div className="cbt-confirm-actions">
              <button
                className="cbt-btn"
                style={{ background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1' }}
                onClick={() => setShowSubmitConfirmModal(false)}
              >
                Return to Test
              </button>
              <button
                id="btn-confirm-submit"
                className="cbt-btn cbt-btn-green"
                disabled={isSubmitting}
                onClick={handleFinalSubmit}
              >
                {isSubmitting ? 'Submitting...' : 'Yes, Submit Test'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
