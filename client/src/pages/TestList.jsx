import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getTests, generateTest } from '../services/api';
import { Search, BookOpen, Stethoscope, ChevronRight, Target, Loader2 } from 'lucide-react';

const CORE_SUBJECTS = [
  { name: "All Subjects" },
  { 
    name: "Nursing Foundations (Fundamentals of Nursing)",
    units: [
      "Introduction to Nursing",
      "Nursing Theories and Process",
      "Hospital Admission, Transfer & Discharge",
      "Communication and Interpersonal Relationships",
      "Infection Prevention and Control",
      "Safety, Comfort and Hygiene",
      "Vital Signs Assessment",
      "Nutrition and Elimination",
      "Mobility and Positioning",
      "Medication Administration",
      "Specimen Collection and Diagnostic Procedures",
      "Wound Care and Dressings",
      "Oxygen Therapy and Airway Management",
      "First Aid and Emergency Care",
      "Documentation and Record Keeping",
      "Biomedical Waste Management",
      "Ethics and Legal Aspects of Nursing",
      "Patient Education and Health Promotion",
      "Gerontological and Palliative Care",
      "Professional Trends and Nursing Management"
    ]
  },
  { name: "Anatomy & Physiology" },
  { name: "Microbiology" },
  { 
    name: "Pharmacology",
    units: [
      "Introduction to Pharmacology",
      "Pharmacokinetics",
      "Pharmacodynamics",
      "Drug Administration and Dosage Calculations",
      "Autonomic Nervous System Drugs",
      "Central Nervous System Drugs",
      "Cardiovascular Drugs",
      "Respiratory System Drugs",
      "Gastrointestinal Drugs",
      "Endocrine System Drugs",
      "Chemotherapy and Antimicrobials",
      "Analgesics and Anti-inflammatory Drugs",
      "Hematological Drugs",
      "Renal System Drugs",
      "Immunological Drugs and Vaccines",
      "Emergency Drugs",
      "Toxicology and Antidotes",
      "Adverse Drug Reactions and Drug Interactions",
      "Rational Drug Therapy",
      "Nurse's Responsibilities in Drug Administration"
    ]
  },
  { name: "Nutrition & Dietetics" },
  { name: "Psychology" },
  { name: "Sociology" },
  { 
    name: "Medical-Surgical Nursing", 
    units: [
      "Introduction to Medical-Surgical Nursing",
      "Nursing Assessment",
      "Fluid, Electrolyte & Acid–Base Balance",
      "Perioperative Nursing",
      "Emergency & Trauma Nursing",
      "Pain & Palliative Care",
      "Infection Control",
      "Oncology Nursing",
      "Respiratory Disorders",
      "Cardiovascular Disorders",
      "Hematological Disorders",
      "Neurological Disorders",
      "Musculoskeletal Disorders",
      "Gastrointestinal Disorders",
      "Hepatobiliary & Pancreatic Disorders",
      "Endocrine Disorders",
      "Renal & Urinary Disorders",
      "Reproductive Disorders",
      "Skin Disorders",
      "Immune Disorders",
      "Communicable Diseases",
      "Critical Care Nursing",
      "Geriatric Nursing",
      "Burns & Rehabilitation",
      "Organ Transplantation"
    ]
  },
  { name: "Community Health Nursing" },
  { 
    name: "Child Health (Pediatric) Nursing",
    units: [
      "Introduction to Pediatric Nursing",
      "Growth and Development",
      "Newborn Care",
      "Nutrition and Infant Feeding",
      "Pediatric Assessment",
      "Common Childhood Disorders",
      "Respiratory Disorders",
      "Cardiovascular Disorders",
      "Gastrointestinal Disorders",
      "Neurological Disorders",
      "Hematological Disorders",
      "Endocrine Disorders",
      "Renal and Urinary Disorders",
      "Musculoskeletal Disorders",
      "Communicable Diseases",
      "Immunization",
      "Pediatric Emergencies",
      "Pediatric Oncology",
      "Pediatric Intensive Care (PICU/NICU)",
      "Child Mental Health",
      "Pediatric Pharmacology",
      "Family-Centered Care",
      "Pediatric Procedures and Nursing Care",
      "Rehabilitation and Palliative Care"
    ]
  },
  { 
    name: "Mental Health (Psychiatric) Nursing",
    units: [
      "Introduction to Psychiatric Nursing",
      "Mental Health and Mental Illness",
      "Psychiatric Assessment",
      "Therapeutic Communication",
      "Personality Development and Behavior",
      "Stress and Coping Disorders",
      "Anxiety Disorders",
      "Mood Disorders",
      "Schizophrenia and Psychotic Disorders",
      "Personality Disorders",
      "Substance Use Disorders",
      "Organic Mental Disorders",
      "Child and Adolescent Psychiatry",
      "Geriatric Psychiatry",
      "Psychiatric Emergencies",
      "Psychopharmacology",
      "Psychotherapies",
      "Community Mental Health Nursing",
      "Legal and Ethical Aspects",
      "Rehabilitation in Psychiatry"
    ]
  },
  { 
    name: "Obstetrics & Gynecological Nursing",
    units: [
      "Introduction to Obstetric & Gynecological Nursing",
      "Anatomy and Physiology of the Reproductive System",
      "Pregnancy (Antenatal Care)",
      "Normal Labour and Delivery",
      "Postnatal Care (Puerperium)",
      "Newborn Care",
      "High-Risk Pregnancy",
      "Obstetric Emergencies",
      "Family Planning and Contraception",
      "Infertility",
      "Gynecological Disorders",
      "Reproductive Tract Infections and STIs",
      "Menstrual Disorders",
      "Gynecological Surgeries",
      "Menopause and Climacteric Care",
      "Drugs Used in Obstetrics and Gynecology",
      "National Maternal and Child Health Programmes",
      "Legal and Ethical Aspects in Obstetric & Gynecological Nursing"
    ]
  },
  { 
    name: "Nursing Research & Statistics",
    units: [
      "Introduction to Nursing Research",
      "Research Process",
      "Research Problem and Objectives",
      "Literature Review",
      "Research Design",
      "Sampling Techniques",
      "Data Collection Methods",
      "Research Tools and Instrumentation",
      "Data Analysis and Statistics",
      "Interpretation of Results",
      "Research Report Writing",
      "Evidence-Based Nursing Practice",
      "Ethics in Nursing Research",
      "Biostatistics",
      "Computer Applications in Research"
    ]
  },
  { name: "Nursing Education & Nursing Administration & Management" },
  { name: "Nursing Ethics and Legal Aspects" },
  { name: "Emergency Nursing" },
  { name: "Infection Prevention and Biomedical Waste Management" }
];

const MOCK_EXAMS = [
  "All Mock Exams",
  "AIIMS CRE & NORCET",
  "ESIC",
  "RRB Nursing Officer",
  "DSSSB",
  "PGIMER",
  "SGPGI",
  "PARAMILITARY FORCES (BSF, CRPF, ITBP, SSB, CISF)"
];

function TestList({ defaultTab }) {
  const location = useLocation();
  const initialTab = defaultTab || (location.pathname === '/mock-tests' ? 'mock' : 'practice');
  const [activeTab, setActiveTab] = useState(initialTab);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [selectedMockExam, setSelectedMockExam] = useState('All Mock Exams');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAutoGenerating, setIsAutoGenerating] = useState(false);
  const [startingTestId, setStartingTestId] = useState(null);
  const autoGenRef = useRef(new Set()); // track which topics have already been auto-generated
  const navigate = useNavigate();

  const handleStartTestClick = (test) => {
    const topicToUse = test?.topic || (activeTab === 'practice' && selectedSubject !== 'All Subjects' ? selectedSubject : 'All Subjects');
    const examTypeToUse = activeTab === 'mock' ? 'nursing_officer' : 'nclex_rn';
    const testId = test?._id || 'adaptive';

    navigate(`/test/${testId}`, {
      state: {
        test,
        title: test?.title || `${topicToUse} - Practice Test`,
        topic: topicToUse,
        startingDifficulty: 2,
        examType: examTypeToUse
      }
    });
  };

  useEffect(() => {
    if (location.pathname === '/mock-tests' || defaultTab === 'mock') {
      setActiveTab('mock');
    } else if (location.pathname === '/tests') {
      setActiveTab('practice');
    }
  }, [location.pathname, defaultTab]);

  const fetchTests = async () => {
    try {
      const { data } = await getTests({});
      setTests(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const initialLoad = async () => {
      setLoading(true);
      await fetchTests();
      setLoading(false);
    };
    initialLoad();
  }, []);

  // Auto-generate practice test for a unit if none exist yet
  useEffect(() => {
    const autoGenerate = async () => {
      if (
        activeTab !== 'practice' ||
        selectedSubject === 'All Subjects' ||
        loading ||
        isAutoGenerating ||
        autoGenRef.current.has(selectedSubject)
      ) return;

      // Check if any tests exist for this topic
      const hasTests = tests.some(t => {
        const isMock = t.title.toLowerCase().includes('mock') || 
          MOCK_EXAMS.some(exam => exam !== "All Mock Exams" && (t.topic.includes(exam) || t.title.includes(exam)));
        if (isMock) return false;
        return t.topic === selectedSubject || selectedSubject.toLowerCase().includes(t.topic.toLowerCase());
      });

      if (!hasTests) {
        autoGenRef.current.add(selectedSubject);
        setIsAutoGenerating(true);
        try {
          await generateTest({
            topic: selectedSubject,
            difficulty: 'hard',
            numberOfQuestions: 10
          });
          await fetchTests(); // refresh list to show the new test
        } catch (err) {
          console.error('[AutoGen] Failed to generate test:', err);
          autoGenRef.current.delete(selectedSubject); // allow retry on next visit
        } finally {
          setIsAutoGenerating(false);
        }
      }
    };
    autoGenerate();
  }, [selectedSubject, activeTab, loading]);

  const difficultyEmoji = { easy: '🟢', medium: '🟡', hard: '🔴' };

  // Frontend filtering logic based on tabs and subjects
  const filteredTests = tests.filter(test => {
    // 1. Filter by Search Query
    if (searchQuery && !test.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // 2. Filter by Tab (Practice vs Mock)
    // We check if the test topic/title indicates it is a mock test.
    const isMock = test.title.toLowerCase().includes('mock') || 
                   MOCK_EXAMS.some(exam => exam !== "All Mock Exams" && (test.topic.includes(exam) || test.title.includes(exam)));
                   
    if (activeTab === 'mock' && !isMock) return false;
    if (activeTab === 'practice' && isMock) return false;

    // 3. Filter by Subject (Practice Tests)
    if (activeTab === 'practice' && selectedSubject !== 'All Subjects') {
      const mainSubject = CORE_SUBJECTS.find(s => s.name === selectedSubject);
      let isValid = false;

      if (test.topic === selectedSubject) {
        isValid = true;
      } else if (selectedSubject.toLowerCase().includes(test.topic.toLowerCase())) {
        isValid = true;
      } else if (mainSubject && mainSubject.units && mainSubject.units.includes(test.topic)) {
        // If a main subject is selected, include all tests that belong to its units
        isValid = true;
      }

      if (!isValid) return false;
    }

    // 4. Filter by Mock Exam (Mock Tests)
    if (activeTab === 'mock' && selectedMockExam !== 'All Mock Exams') {
      if (test.topic !== selectedMockExam && !test.title.toLowerCase().includes(selectedMockExam.toLowerCase())) {
        return false;
      }
    }

    return true;
  });

  if (loading) return <div className="page-container"><div className="loading"><div className="spinner"></div></div></div>;

  return (
    <div className="page-container bg-off-white" style={{ minHeight: '100vh' }}>
      
      {/* Header Banner */}
      <div className="tests-header-banner">
        <div className="tests-header-content">
          <h1>Test Series Hub</h1>
          <p>Master your nursing exams with our comprehensive practice and mock tests.</p>
        </div>
      </div>

      <div className="tests-layout">
        
        {/* Main Content Area */}
        <div className="tests-main">
          
          {/* Tabs */}
          <div className="test-tabs">
            <button 
              className={`test-tab ${activeTab === 'practice' ? 'active' : ''}`}
              onClick={() => setActiveTab('practice')}
            >
              <BookOpen size={18} /> Practice Tests
            </button>
            <button 
              className={`test-tab ${activeTab === 'mock' ? 'active' : ''}`}
              onClick={() => setActiveTab('mock')}
            >
              <Target size={18} /> Mock Tests
            </button>
          </div>

          <div className="tests-search-bar">
            <Search size={20} className="search-icon" />
            <input 
              type="text" 
              placeholder={`Search ${activeTab} tests...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {activeTab === 'practice' && selectedSubject !== 'All Subjects' && isAutoGenerating && (
            <div style={{ backgroundColor: '#eef2ff', border: '1px solid #c7d2fe', padding: '20px', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Loader2 size={24} style={{ color: 'var(--navy)', animation: 'spin 1s linear infinite' }} />
              <div>
                <h3 style={{ margin: '0 0 4px 0', color: 'var(--navy)' }}>Preparing your practice test…</h3>
                <p style={{ margin: 0, color: 'var(--gray)', fontSize: '14px' }}>AI is preparing authentic clinical questions for <strong>{selectedSubject}</strong>.</p>
              </div>
            </div>
          )}

          <div className="tests-grid">
            {filteredTests.map(test => (
              <div className="test-card-modern" key={test._id}>
                <div className="test-card-header-modern">
                  <span className="test-topic-badge">{test.topic}</span>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, background: '#ede9fe', color: '#6b21a8', padding: '2px 8px', borderRadius: '12px' }}>
                      ⚡ Clinical Practice
                    </span>
                    {test.isFree ? <span className="badge-free">Free</span> : <span className="badge-premium">Premium</span>}
                  </div>
                </div>
                <h3>{test.title}</h3>
                <p>{test.description}</p>
                <div className="test-meta-modern">
                  <span>📚 {test.totalQuestions || 10} Questions</span>
                  <span>⏱ {test.duration || 30} mins</span>
                  {activeTab === 'mock' && test.difficulty && (
                    <span style={{ fontWeight: 700, color: '#4f46e5' }}>
                      {(difficultyEmoji[test.difficulty] || '🔴') + ' ' + (test.difficulty.charAt(0).toUpperCase() + test.difficulty.slice(1))}
                    </span>
                  )}
                </div>

                <button 
                  className="test-start-btn" 
                  onClick={() => handleStartTestClick(test)}
                  disabled={startingTestId === test._id}
                  style={{ marginTop: 12 }}
                >
                  {startingTestId === test._id ? 'Preparing Test...' : `Start ${activeTab === 'practice' ? 'Practice' : 'Exam'}`} <ChevronRight size={18} />
                </button>
              </div>
            ))}
          </div>

          {filteredTests.length === 0 && (
            <div className="empty-tests-state" style={{ background: '#ffffff', borderRadius: 16, padding: '36px 20px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div className="empty-icon"><BrainCircuit size={48} color="#7c3aed" /></div>
              <h3 style={{ fontSize: 18, color: '#0f172a', margin: '12px 0 6px 0' }}>Launch Practice Test for {selectedSubject}</h3>
              <p style={{ color: '#64748b', fontSize: 14, maxWidth: 500, margin: '0 auto 18px auto' }}>
                Practice authentic clinical questions with vital signs, lab cues, and comprehensive rationales for {selectedSubject}.
              </p>
              <button
                className="test-start-btn"
                onClick={() => handleStartTestClick({ title: `${selectedSubject} - Practice Test`, topic: selectedSubject })}
                style={{ maxWidth: 300, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              >
                Launch Practice Test Now <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Sidebar for Subjects or Mock Exams */}
        <div className="tests-sidebar">
          {activeTab === 'practice' ? (
            <>
              <h3 className="sidebar-title">Core Nursing Subjects</h3>
              <div className="subject-list">
                {CORE_SUBJECTS.map(subject => {
                  const subjectName = subject.name || subject;
                  const hasUnits = subject.units && subject.units.length > 0;
                  const isExpanded = selectedSubject === subjectName || (hasUnits && subject.units.includes(selectedSubject));
                  
                  return (
                    <div key={subjectName} className="subject-group">
                      <button 
                        className={`subject-btn ${isExpanded ? 'active' : ''}`}
                        onClick={() => setSelectedSubject(subjectName)}
                      >
                        <div className="subject-name">{subjectName}</div>
                        {isExpanded ? <ChevronRight size={16} style={{ transform: 'rotate(90deg)', transition: '0.2s' }} /> : <ChevronRight size={16} style={{ transition: '0.2s' }} />}
                      </button>
                      
                      {hasUnits && isExpanded && (
                        <div className="sub-units-container" style={{ paddingLeft: '16px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          {subject.units.map(unit => (
                            <button 
                              key={unit}
                              className={`subject-btn ${selectedSubject === unit ? 'active' : ''}`}
                              onClick={() => setSelectedSubject(unit)}
                              style={{ padding: '8px 12px', fontSize: '13px', minHeight: '36px' }}
                            >
                              <div className="subject-name" style={{ fontSize: '13px', color: selectedSubject === unit ? 'var(--navy)' : '#64748b' }}>{unit}</div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <h3 className="sidebar-title">Mock Exams</h3>
              <div className="subject-list">
                {MOCK_EXAMS.map(exam => (
                  <button 
                    key={exam}
                    className={`subject-btn ${selectedMockExam === exam ? 'active' : ''}`}
                    onClick={() => setSelectedMockExam(exam)}
                  >
                    <div className="subject-name">{exam}</div>
                    {selectedMockExam === exam && <ChevronRight size={16} />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}

export default TestList;
