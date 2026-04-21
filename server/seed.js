const Test = require('./models/Test');

const seedTests = async () => {
  const count = await Test.countDocuments();
  if (count > 0) {
    console.log('📚 Tests already seeded');
    return;
  }

  const sampleTests = [
    {
      title: 'Anatomy – Cardiovascular System',
      description: 'Test your knowledge of the heart, blood vessels, and circulatory system.',
      topic: 'Anatomy',
      difficulty: 'medium',
      duration: 20,
      examType: 'nursing_officer',
      isFree: true,
      questions: [
        {
          questionText: 'Which chamber of the heart receives deoxygenated blood from the body?',
          options: ['Left atrium', 'Right atrium', 'Left ventricle', 'Right ventricle'],
          correctAnswer: 1,
          explanation: 'The right atrium receives deoxygenated blood from the superior and inferior vena cava.',
          topic: 'Anatomy'
        },
        {
          questionText: 'The normal adult heart rate at rest is:',
          options: ['40-60 bpm', '60-100 bpm', '100-120 bpm', '120-140 bpm'],
          correctAnswer: 1,
          explanation: 'Normal resting heart rate for adults is 60-100 beats per minute.',
          topic: 'Anatomy'
        },
        {
          questionText: 'Which valve separates the left atrium from the left ventricle?',
          options: ['Tricuspid valve', 'Pulmonary valve', 'Mitral valve', 'Aortic valve'],
          correctAnswer: 2,
          explanation: 'The mitral (bicuspid) valve separates the left atrium from the left ventricle.',
          topic: 'Anatomy'
        },
        {
          questionText: 'The SA node is located in the:',
          options: ['Left atrium', 'Right atrium', 'Left ventricle', 'Right ventricle'],
          correctAnswer: 1,
          explanation: 'The sinoatrial (SA) node, the natural pacemaker, is located in the right atrium.',
          topic: 'Anatomy'
        },
        {
          questionText: 'Which blood vessel carries oxygenated blood from the lungs to the heart?',
          options: ['Pulmonary artery', 'Pulmonary vein', 'Superior vena cava', 'Aorta'],
          correctAnswer: 1,
          explanation: 'Pulmonary veins carry oxygenated blood from lungs to the left atrium.',
          topic: 'Anatomy'
        }
      ]
    },
    {
      title: 'Microbiology – Infection Control',
      description: 'Questions on sterilization, disinfection, and infection prevention.',
      topic: 'Microbiology',
      difficulty: 'medium',
      duration: 20,
      examType: 'nursing_officer',
      isFree: true,
      questions: [
        {
          questionText: 'The most effective method of sterilization is:',
          options: ['Boiling', 'Autoclaving', 'Chemical disinfection', 'UV radiation'],
          correctAnswer: 1,
          explanation: 'Autoclaving (steam under pressure at 121°C for 15 min) is the most effective sterilization method.',
          topic: 'Microbiology'
        },
        {
          questionText: 'Hand hygiene should be performed for at least:',
          options: ['5 seconds', '10 seconds', '20 seconds', '60 seconds'],
          correctAnswer: 2,
          explanation: 'WHO recommends handwashing for at least 20 seconds with soap and water.',
          topic: 'Microbiology'
        },
        {
          questionText: 'Which type of isolation is used for tuberculosis patients?',
          options: ['Contact isolation', 'Droplet isolation', 'Airborne isolation', 'Protective isolation'],
          correctAnswer: 2,
          explanation: 'TB is spread through airborne droplet nuclei, requiring airborne precautions with N95 masks.',
          topic: 'Microbiology'
        },
        {
          questionText: 'The chain of infection includes all EXCEPT:',
          options: ['Reservoir', 'Portal of exit', 'Vaccination', 'Susceptible host'],
          correctAnswer: 2,
          explanation: 'The chain of infection: agent, reservoir, portal of exit, mode of transmission, portal of entry, susceptible host. Vaccination breaks the chain but is not part of it.',
          topic: 'Microbiology'
        },
        {
          questionText: 'Which organism causes healthcare-associated MRSA infections?',
          options: ['E. coli', 'Staphylococcus aureus', 'Streptococcus', 'Pseudomonas'],
          correctAnswer: 1,
          explanation: 'MRSA stands for Methicillin-Resistant Staphylococcus aureus.',
          topic: 'Microbiology'
        }
      ]
    },
    {
      title: 'Pharmacology – Drug Calculations',
      description: 'Essential drug dosage calculations for nursing practice.',
      topic: 'Pharmacology',
      difficulty: 'hard',
      duration: 25,
      examType: 'nursing_officer',
      isFree: false,
      questions: [
        {
          questionText: 'A doctor orders 500mg of a drug. Available: 250mg tablets. How many tablets to give?',
          options: ['1 tablet', '2 tablets', '3 tablets', '1.5 tablets'],
          correctAnswer: 1,
          explanation: 'Dose calculation: 500mg / 250mg per tablet = 2 tablets.',
          topic: 'Pharmacology'
        },
        {
          questionText: 'IV drip rate for 1000ml over 8 hours with drop factor 20 drops/ml is:',
          options: ['25 drops/min', '42 drops/min', '50 drops/min', '38 drops/min'],
          correctAnswer: 1,
          explanation: 'Drip rate = (1000 × 20) / (8 × 60) = 20000/480 = 41.6 ≈ 42 drops/min.',
          topic: 'Pharmacology'
        },
        {
          questionText: 'Which drug is a common anticoagulant used in nursing practice?',
          options: ['Aspirin', 'Heparin', 'Metformin', 'Amlodipine'],
          correctAnswer: 1,
          explanation: 'Heparin is a widely used anticoagulant. Aspirin is an antiplatelet.',
          topic: 'Pharmacology'
        },
        {
          questionText: 'The antidote for heparin overdose is:',
          options: ['Vitamin K', 'Protamine sulfate', 'Naloxone', 'Flumazenil'],
          correctAnswer: 1,
          explanation: 'Protamine sulfate neutralizes heparin. Vitamin K is the antidote for warfarin.',
          topic: 'Pharmacology'
        },
        {
          questionText: 'A child weighs 20 kg. Dose is 10mg/kg/day divided q8h. Each dose is:',
          options: ['200mg', '66.7mg', '100mg', '50mg'],
          correctAnswer: 1,
          explanation: 'Total daily: 20 × 10 = 200mg. Divided q8h (3 times): 200/3 = 66.7mg per dose.',
          topic: 'Pharmacology'
        }
      ]
    },
    {
      title: 'Nursing Procedures – Patient Care',
      description: 'Fundamental nursing procedures and patient assessment.',
      topic: 'Nursing Procedures',
      difficulty: 'easy',
      duration: 15,
      examType: 'nursing_officer',
      isFree: true,
      questions: [
        {
          questionText: 'The normal body temperature in Celsius is:',
          options: ['35.5°C', '36.1°C', '37°C', '38°C'],
          correctAnswer: 2,
          explanation: 'Normal body temperature is 37°C (98.6°F).',
          topic: 'Nursing Procedures'
        },
        {
          questionText: 'Which position is given to a patient with difficulty breathing?',
          options: ['Supine', 'Fowlers', 'Prone', 'Trendelenburg'],
          correctAnswer: 1,
          explanation: 'Fowlers position (semi-upright 45-60°) helps in lung expansion and easier breathing.',
          topic: 'Nursing Procedures'
        },
        {
          questionText: 'Before administering medication, the nurse checks:',
          options: ['3 rights', '5 rights', '7 rights', '10 rights'],
          correctAnswer: 2,
          explanation: 'The 7 rights: right patient, right drug, right dose, right route, right time, right documentation, right reason.',
          topic: 'Nursing Procedures'
        },
        {
          questionText: 'A patient presents with fever, chills, and BP of 80/50 mmHg. First nursing intervention?',
          options: ['Administer antipyretics', 'Start IV fluids', 'Collect blood cultures', 'Notify physician'],
          correctAnswer: 1,
          explanation: 'With hypotension (BP 80/50), IV access and fluid resuscitation is the priority (ABCs).',
          topic: 'Nursing Procedures'
        },
        {
          questionText: 'The site for intramuscular injection in adults is:',
          options: ['Deltoid only', 'Ventrogluteal', 'Abdomen', 'Forearm'],
          correctAnswer: 1,
          explanation: 'Ventrogluteal is the preferred IM injection site for adults due to thick muscle and low risk.',
          topic: 'Nursing Procedures'
        }
      ]
    }
  ];

  await Test.insertMany(sampleTests);
  console.log('✅ Sample tests seeded successfully (4 tests, 20 questions)');
};

module.exports = seedTests;
