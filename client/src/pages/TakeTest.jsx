import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { startCATSession, submitCATAnswer, getTest, submitTest } from '../services/api';
import { 
  BrainCircuit, ShieldCheck, AlertTriangle, 
  ChevronRight, Award, RotateCcw, Activity, BarChart2, Clock, X, BookOpen
} from 'lucide-react';
import AskAIButton from '../components/tests/AskAIButton';
import FormattedExplanation from '../components/tests/FormattedExplanation';
import './TakeCATTest.css';

const TOTAL_TEST_QUESTIONS = 20;
const TEST_DURATION_SECONDS = 30 * 60; // 30 minutes

export default function TakeTest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [currentQ, setCurrentQ] = useState(null);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [timeLeft, setTimeLeft] = useState(TEST_DURATION_SECONDS);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [testInfo, setTestInfo] = useState(null);

  // Mode tracking: fixed topic test vs adaptive CAT session
  const [isAdaptiveMode, setIsAdaptiveMode] = useState(false);
  const [fixedQuestions, setFixedQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [totalQuestionsCount, setTotalQuestionsCount] = useState(TOTAL_TEST_QUESTIONS);

  // Live CAT Transition Telemetry Tracking
  const [lastTransition, setLastTransition] = useState(null); // 'up' | 'down' | 'same'
  const [previousLevel, setPreviousLevel] = useState(null);

  // Strip embedded choices (A. ... B. ... C. ... D. ...) from question text or scenario
  const stripEmbeddedOptions = (text) => {
    if (!text) return '';
    const lines = String(text).split('\n');
    let optionStartIndex = -1;

    for (let i = 0; i < lines.length; i++) {
      const trimmed = lines[i].trim();
      if (/^(?:[A-Da-d1-4][.)\]\-]|\([A-Da-d1-4]\))\s+/.test(trimmed)) {
        const remainingLines = lines.slice(i).filter(l => l.trim().length > 0);
        const optionLikeCount = remainingLines.filter(l => /^(?:[A-Da-d1-4][.)\]\-]|\([A-Da-d1-4]\))\s+/.test(l.trim())).length;
        if (optionLikeCount >= 2) {
          optionStartIndex = i;
          break;
        }
      }
    }

    if (optionStartIndex !== -1) {
      return lines.slice(0, optionStartIndex).join('\n').trim();
    }
    return text.trim();
  };

  // Strip option prefixes like "A. ", "B) ", "(C) ", "1. " from individual options
  const stripOptionPrefix = (text) => {
    if (!text) return '';
    return String(text).replace(/^(?:[A-Da-d1-4][.)\]\-]|\([A-Da-d1-4]\))\s*/, '').trim();
  };

  // Parse clinical scenario and question stem
  const parseQuestionContent = (rawText) => {
    if (!rawText) return { scenario: null, stem: '' };
    const cleaned = stripEmbeddedOptions(rawText);
    if (cleaned.includes('\n\n')) {
      const parts = cleaned.split('\n\n');
      const stem = parts.pop().trim();
      const scenario = parts.join('\n\n').trim();
      return { scenario, stem };
    }
    return { scenario: null, stem: cleaned };
  };

  useEffect(() => {
    initTestSession();
  }, [id]);

  // Live Timer Countdown Effect
  useEffect(() => {
    if (loading || isFinished) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [loading, isFinished]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const initTestSession = async () => {
    setLoading(true);
    try {
      const state = location.state || {};
      let title = state.title || state.test?.title || 'Practice Test';
      let topic = state.topic || state.test?.topic || 'All Subjects';
      let examType = state.examType || state.test?.examType || (title.includes('AIIMS') || title.includes('NORCET') ? 'nursing_officer' : 'nclex_rn');
      let fetchedTestData = null;

      // Fetch test details from backend if accessible
      if (id && id !== 'adaptive' && id.match(/^[0-9a-fA-F]{24}$/)) {
        try {
          const { data } = await getTest(id);
          if (data) {
            fetchedTestData = data;
            title = data.title || title;
            topic = data.topic || topic;
            examType = data.examType || examType;
          }
        } catch (fetchErr) {
          console.warn('[TakeTest] Could not fetch test metadata by ID, continuing with defaults:', fetchErr.message);
        }
      }

      setTestInfo({ title, topic, examType, ...fetchedTestData });

      // 1. FIXED TOPIC TEST MODE:
      // If the test already has pre-seeded questions in the database, play those exact topic questions!
      if (fetchedTestData && Array.isArray(fetchedTestData.questions) && fetchedTestData.questions.length > 0 && !state?.isAdaptive) {
        setIsAdaptiveMode(false);
        setFixedQuestions(fetchedTestData.questions);
        setTotalQuestionsCount(fetchedTestData.questions.length);
        setCurrentQuestionNumber(1);
        setCurrentQ(fetchedTestData.questions[0]);
        setSelectedOption(null);
        setUserAnswers([]);
        setStartTime(Date.now());
        const totalDuration = (fetchedTestData.duration || 30) * 60;
        setTimeLeft(totalDuration);
        setLoading(false);
        return;
      }

      // 2. ADAPTIVE CAT MODE:
      // Run the Computer Adaptive Testing session with dynamic theta tracking
      setIsAdaptiveMode(true);
      setTotalQuestionsCount(TOTAL_TEST_QUESTIONS);
      const { data } = await startCATSession({
        title,
        topic,
        examType,
        startingDifficulty: 2,
        minQuestions: TOTAL_TEST_QUESTIONS,
        maxQuestions: TOTAL_TEST_QUESTIONS
      });

      setSession(data);
      setCurrentQ(data.currentQuestion);
      setCurrentQuestionNumber(1);
      setLastTransition(null);
      setPreviousLevel(null);
      setStartTime(Date.now());
      setTimeLeft(TEST_DURATION_SECONDS);
    } catch (err) {
      console.error('[TakeTest] Failed to initialize test session:', err);
      alert('Failed to initialize test. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (index) => {
    if (submitting) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = async () => {
    if (selectedOption === null || submitting) return;
    setSubmitting(true);
    
    const elapsedSeconds = Math.round((Date.now() - startTime) / 1000);

    // FIXED TOPIC TEST MODE SUBMISSION:
    if (!isAdaptiveMode && fixedQuestions.length > 0) {
      const currentIdx = currentQuestionNumber - 1;
      const currentQuestionItem = fixedQuestions[currentIdx];
      const updatedAnswers = [...userAnswers];
      updatedAnswers[currentIdx] = {
        questionId: currentQuestionItem._id,
        selectedAnswer: selectedOption,
        timeTaken: elapsedSeconds
      };
      setUserAnswers(updatedAnswers);

      if (currentQuestionNumber >= fixedQuestions.length) {
        // Final question: submit test to backend and navigate to result review
        try {
          const totalTimeSpent = Math.round(((testInfo?.duration || 30) * 60) - timeLeft);
          const { data: submitRes } = await submitTest(id, {
            answers: updatedAnswers,
            timeTaken: Math.max(1, totalTimeSpent)
          });
          setIsFinished(true);
          navigate(`/result/${id}`, {
            state: {
              result: submitRes.result,
              correctAnswers: submitRes.correctAnswers,
              test: { ...testInfo, questions: fixedQuestions }
            }
          });
        } catch (submitErr) {
          console.error('[TakeTest] Error submitting test:', submitErr);
          alert('Failed to submit test results. Please try again.');
        } finally {
          setSubmitting(false);
        }
        return;
      } else {
        // Advance to next question in the test
        const nextIdx = currentQuestionNumber;
        setCurrentQuestionNumber(prev => prev + 1);
        setCurrentQ(fixedQuestions[nextIdx]);
        setSelectedOption(userAnswers[nextIdx]?.selectedAnswer ?? null);
        setStartTime(Date.now());
        setSubmitting(false);
        return;
      }
    }

    // ADAPTIVE CAT MODE SUBMISSION:
    try {
      const { data } = await submitCATAnswer({
        sessionId: session?.sessionId || session?._id,
        selectedAnswer: selectedOption,
        timeTaken: elapsedSeconds
      });

      // Complete test after last question or when engine marks isCompleted
      if (data.isCompleted || currentQuestionNumber >= TOTAL_TEST_QUESTIONS) {
        setIsFinished(true);
        if (data.session) {
          setSession(data.session);
        }
      } else {
        setSelectedOption(null);
        setCurrentQuestionNumber(prev => prev + 1);
        setCurrentQ(data.nextQuestion);
        setLastTransition(data.transition || 'same');
        setPreviousLevel(data.previousDifficultyLevel || session?.currentDifficultyLevel || 2);
        setSession(prev => ({
          ...prev,
          currentDifficultyLevel: data.currentDifficultyLevel,
          difficultyName: data.difficultyName,
          abilityTheta: data.abilityTheta,
          totalQuestionsAnswered: data.totalQuestionsAnswered
        }));
        setStartTime(Date.now());
      }
    } catch (err) {
      console.error('[TakeTest] Error submitting adaptive answer:', err);
      alert('Failed to submit answer. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getDifficultyBadgeColor = (level) => {
    switch (Number(level)) {
      case 1: 
        return { 
          bg: '#fef3c7', 
          text: '#b45309', 
          border: '#fde68a', 
          label: 'Level 1: Below Base (Foundational Recall)' 
        };
      case 2: 
        return { 
          bg: '#e0e7ff', 
          text: '#4338ca', 
          border: '#c7d2fe', 
          label: 'Level 2: Base Level (Standard Passing Benchmark)' 
        };
      case 3: 
        return { 
          bg: '#f3e8ff', 
          text: '#7e22ce', 
          border: '#e9d5ff', 
          label: 'Level 3: Advanced Hard (Clinical Prioritization)' 
        };
      case 4: 
        return { 
          bg: '#fee2e2', 
          text: '#b91c1c', 
          border: '#fca5a5', 
          label: 'Level 4: Peak Level (High Acuity / Critical Care) 🔥' 
        };
      default: 
        return { 
          bg: '#e0e7ff', 
          text: '#4338ca', 
          border: '#c7d2fe', 
          label: 'Level 2: Base Level' 
        };
    }
  };

  const getThetaStatus = (theta) => {
    if (theta >= 0.20) {
      return { text: 'Passing Zone', color: '#16a34a', bg: '#dcfce7', icon: <ShieldCheck size={16}/> };
    } else if (theta >= -0.10) {
      return { text: 'Borderline Zone', color: '#d97706', bg: '#fef3c7', icon: <Activity size={16}/> };
    } else {
      return { text: 'Below Passing Standard', color: '#dc2626', bg: '#fee2e2', icon: <AlertTriangle size={16}/> };
    }
  };

  if (loading) {
    return (
      <div className="cat-loading-container">
        <BrainCircuit size={48} className="cat-spinner" />
        <h2>Initializing Computer Adaptive Test (CAT)...</h2>
        <p>Calibrating Base Level (Level 2) and configuring subject-wise percentage matrix...</p>
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────
  // FINAL ARCHER & UWORLD STYLE CAT DIAGNOSTIC REPORT
  // ──────────────────────────────────────────────────────────
  if (isFinished && session) {
    const isPass = session.result === 'PASSED';
    const questionsList = session.questionsAnswered || [];

    return (
      <div className="cat-container">
        <div className="cat-report-card">
          <div className={`cat-report-header ${isPass ? 'pass-header' : 'fail-header'}`}>
            <div className="cat-badge-icon">
              {isPass ? <Award size={56} /> : <AlertTriangle size={56} />}
            </div>
            <h1>{isPass ? 'CONGRATULATIONS! YOU PASSED (MET PASSING STANDARD)' : 'TEST COMPLETED - DID NOT MEET PASSING STANDARD'}</h1>
            <p className="cat-report-sub">
              {isPass 
                ? 'Your adaptive ability score (θ) successfully exceeded and maintained statistical confidence above the required Passing Standard line.'
                : 'Your adaptive ability score (θ) remained below the required Passing Standard threshold for this examination session.'}
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="cat-stats-grid">
            <div className="cat-stat-box">
              <span className="stat-label">CAT Decision</span>
              <span className={`stat-val ${isPass ? 'green-txt' : 'red-txt'}`}>
                {session.result || (isPass ? 'PASSED' : 'FAILED')}
              </span>
            </div>
            <div className="cat-stat-box">
              <span className="stat-label">Questions Evaluated</span>
              <span className="stat-val">{session.totalQuestions || questionsList.length} Questions</span>
            </div>
            <div className="cat-stat-box">
              <span className="stat-label">Final Ability Score (θ)</span>
              <span className="stat-val">{(session.abilityTheta || 0).toFixed(2)}</span>
            </div>
            <div className="cat-stat-box">
              <span className="stat-label">Overall Accuracy</span>
              <span className="stat-val">
                {Math.round(((session.correctCount || 0) / Math.max(1, session.totalQuestions || questionsList.length)) * 100)}%
              </span>
            </div>
          </div>

          {/* Adaptive Difficulty Trajectory Curve Chart */}
          <div className="cat-trajectory-section">
            <h3><BarChart2 size={20} /> Computer Adaptive Difficulty Trajectory Curve</h3>
            <p className="cat-chart-desc">
              This graph displays how the CAT algorithm dynamically scaled your difficulty level up towards Peak (Level 4) or down based on your performance relative to the Passing Threshold line.
            </p>
            <div className="cat-chart-container">
              <svg viewBox="0 0 500 160" className="cat-svg-chart">
                {/* Passing Line */}
                <line x1="40" y1="80" x2="480" y2="80" stroke="#16a34a" strokeWidth="2" strokeDasharray="4 4" />
                <text x="370" y="74" fill="#16a34a" fontSize="10" fontWeight="bold">Passing Standard (Base +0.20)</text>

                {/* Level Guides */}
                <line x1="40" y1="20" x2="480" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                <text x="5" y="24" fill="#dc2626" fontSize="9" fontWeight="bold">Level 4 (Peak)</text>

                <line x1="40" y1="50" x2="480" y2="50" stroke="#f1f5f9" strokeWidth="1" />
                <text x="5" y="54" fill="#7e22ce" fontSize="9" fontWeight="bold">Level 3 (Hard)</text>

                <text x="5" y="84" fill="#4338ca" fontSize="9" fontWeight="bold">Level 2 (Base)</text>

                <line x1="40" y1="120" x2="480" y2="120" stroke="#f1f5f9" strokeWidth="1" />
                <text x="5" y="124" fill="#b45309" fontSize="9" fontWeight="bold">Level 1 (Below)</text>

                {/* Trajectory Data Points & Connecting Line */}
                {questionsList.map((q, idx) => {
                  const stepX = 40 + (idx / Math.max(1, questionsList.length - 1)) * 440;
                  const yMap = { 4: 20, 3: 50, 2: 80, 1: 120 };
                  const stepY = yMap[q.difficultyLevel] || 80;

                  const prevQ = questionsList[idx - 1];
                  const prevX = prevQ ? 40 + ((idx - 1) / Math.max(1, questionsList.length - 1)) * 440 : stepX;
                  const prevY = prevQ ? yMap[prevQ.difficultyLevel] || 80 : stepY;

                  return (
                    <g key={idx}>
                      {idx > 0 && (
                        <line x1={prevX} y1={prevY} x2={stepX} y2={stepY} stroke="#4f46e5" strokeWidth="2.5" />
                      )}
                      <circle 
                        cx={stepX} 
                        cy={stepY} 
                        r="5" 
                        fill={q.isCorrect ? '#16a34a' : '#dc2626'} 
                        stroke="#ffffff" 
                        strokeWidth="1.5" 
                      />
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Full Question-by-Question Review with Rationales */}
          <div className="cat-review-section">
            <h3>Question-by-Question Test Summary & Rationales</h3>
            <div className="cat-q-history-list">
              {questionsList.map((q, idx) => (
                <div key={idx} className="cat-history-item">
                  <div className="history-item-top">
                    <span className="history-num">Q{idx + 1}</span>
                    <span className="history-subject">{q.topic}</span>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 12,
                      background: q.difficultyLevel === 4 ? '#fee2e2' : q.difficultyLevel === 3 ? '#f3e8ff' : q.difficultyLevel === 1 ? '#fef3c7' : '#e0e7ff',
                      color: q.difficultyLevel === 4 ? '#b91c1c' : q.difficultyLevel === 3 ? '#7e22ce' : q.difficultyLevel === 1 ? '#b45309' : '#4338ca'
                    }}>
                      Level {q.difficultyLevel}: {q.difficultyName}
                    </span>
                    <span className={`history-status-badge ${q.isCorrect ? 'correct' : 'incorrect'}`}>
                      {q.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                  </div>
                  <p className="history-q-text">{stripEmbeddedOptions(q.questionText)}</p>

                  <div style={{ marginTop: 14 }}>
                    <FormattedExplanation 
                      explanation={q.explanation} 
                      correctAnswer={q.correctAnswer} 
                      selectedAnswer={q.selectedAnswer} 
                      optionsList={(q.options || []).map(stripOptionPrefix)} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cat-actions">
            <button className="cat-primary-btn" onClick={() => window.location.reload()}>
              <RotateCcw size={18} /> Retake Adaptive Test
            </button>
            <button className="cat-secondary-btn" onClick={() => navigate('/tests')}>
              Back to Test Series Hub
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────
  // ACTIVE ADAPTIVE QUESTION SCREEN
  // ──────────────────────────────────────────────────────────
  const activeLevel = currentQ?.difficultyLevel || session?.currentDifficultyLevel || 2;
  const diffBadge = getDifficultyBadgeColor(activeLevel);
  const thetaInfo = getThetaStatus(session?.abilityTheta || 0.0);
  const { scenario, stem } = parseQuestionContent(currentQ?.questionText);

  return (
    <div className="cat-container">
      {/* Top Telemetry Header */}
      <div className="cat-telemetry-bar">
        <div className="telemetry-left">
          <div className="cat-logo-tag">
            <BrainCircuit size={20} color="#7c3aed" />
            <span>{testInfo?.title || 'Computer Adaptive Test'}</span>
          </div>
          <span className="cat-subject-tag">{currentQ?.topic || testInfo?.topic || 'Core Nursing'}</span>
        </div>

        <div className="telemetry-right">
          {/* Live Timer Pill */}
          <div className={`cat-timer-pill ${timeLeft <= 60 ? 'danger' : (timeLeft <= 300 ? 'warning' : '')}`}>
            <Clock size={15} color={timeLeft <= 60 ? '#dc2626' : (timeLeft <= 300 ? '#b45309' : '#475569')} />
            <span>{formatTimer(timeLeft)}</span>
          </div>

          {/* Question Counter */}
          <div className="cat-counter-pill">
            Question {currentQuestionNumber} of {totalQuestionsCount}
          </div>

          {/* Cancel Test Button */}
          <button 
            type="button" 
            className="cat-cancel-btn"
            onClick={() => setShowCancelModal(true)}
          >
            <X size={15} /> Cancel Test
          </button>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          TELEMETRY PANEL
          If Fixed Mode: Displays Topic Practice progress bar
          If Adaptive Mode: Displays 4-level barometer and dynamic level scaling alerts
      ────────────────────────────────────────────────────────── */}
      {!isAdaptiveMode ? (
        <div style={{
          background: '#ffffff',
          borderRadius: 14,
          padding: '16px 20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
          marginBottom: 20
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <BookOpen size={18} color="#4f46e5" />
              <span style={{ fontSize: 13.5, fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Topic Practice: {currentQ?.topic || testInfo?.topic}
              </span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#4f46e5' }}>
              Progress: {Math.round((currentQuestionNumber / totalQuestionsCount) * 100)}% ({currentQuestionNumber}/{totalQuestionsCount})
            </span>
          </div>
          <div style={{ width: '100%', height: 8, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{
              width: `${(currentQuestionNumber / totalQuestionsCount) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #4f46e5, #7c3aed)',
              borderRadius: 4,
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>
      ) : (
        <div className="cat-barometer-card" style={{
          background: '#ffffff',
          borderRadius: 14,
          padding: '16px 20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
          marginBottom: 20
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Activity size={17} color="#7c3aed" />
              <span style={{ fontSize: 13.5, fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Adaptive Acuity Barometer
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 12.5, color: '#64748b' }}>Rasch Ability θ: <strong style={{ color: '#0f172a' }}>{(session?.abilityTheta || 0).toFixed(2)}</strong></span>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                fontSize: 12,
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: 20,
                background: thetaInfo.bg,
                color: thetaInfo.color
              }}>
                {thetaInfo.icon} {thetaInfo.text}
              </span>
            </div>
          </div>

          {/* 4-Level Interactive Stepper Barometer */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, margin: '8px 0 12px 0' }}>
            {[
              { level: 1, name: 'Level 1: Below Base', sub: 'Foundational Recall', color: '#b45309', bg: '#fef3c7', border: '#fde68a' },
              { level: 2, name: 'Level 2: Base Level', sub: 'Passing Benchmark', color: '#4338ca', bg: '#e0e7ff', border: '#c7d2fe' },
              { level: 3, name: 'Level 3: Hard', sub: 'Clinical Judgement', color: '#7e22ce', bg: '#f3e8ff', border: '#e9d5ff' },
              { level: 4, name: 'Level 4: Peak 🔥', sub: 'High Complexity ICU', color: '#b91c1c', bg: '#fee2e2', border: '#fca5a5' }
            ].map((lvl) => {
              const isActive = activeLevel === lvl.level;
              return (
                <div 
                  key={lvl.level}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 10,
                    border: isActive ? `2px solid ${lvl.color}` : '1px solid #e2e8f0',
                    background: isActive ? lvl.bg : '#f8fafc',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    transition: 'all 0.25s ease',
                    boxShadow: isActive ? `0 4px 12px ${lvl.border}` : 'none'
                  }}
                >
                  <div style={{
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    background: isActive ? lvl.color : '#cbd5e1',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    fontWeight: 800,
                    flexShrink: 0
                  }}>
                    {lvl.level}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: isActive ? 800 : 600, color: isActive ? lvl.color : '#475569', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {lvl.name} {isActive && '✓'}
                    </div>
                    <div style={{ fontSize: 11, color: '#64748b' }}>
                      {lvl.sub}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dynamic Transition Banner */}
          {lastTransition && (
            <div style={{
              marginTop: 8,
              padding: '8px 14px',
              borderRadius: 8,
              fontSize: 12.5,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: lastTransition === 'up' ? '#f0fdf4' : lastTransition === 'down' ? '#fffbeb' : '#f8fafc',
              color: lastTransition === 'up' ? '#166534' : lastTransition === 'down' ? '#92400e' : '#475569',
              border: `1px solid ${lastTransition === 'up' ? '#bbf7d0' : lastTransition === 'down' ? '#fef08a' : '#e2e8f0'}`
            }}>
              {lastTransition === 'up' && (
                <span>
                  ▲ <strong>Difficulty Scaled UP:</strong> Promoted to <strong>Level {activeLevel} ({currentQ?.difficultyName})</strong> due to correct response. Tougher questions are being offered!
                </span>
              )}
              {lastTransition === 'down' && (
                <span>
                  ▼ <strong>Difficulty Scaled DOWN:</strong> Recalibrated to <strong>Level {activeLevel} ({currentQ?.difficultyName})</strong>. Answer correctly to climb back towards Peak!
                </span>
              )}
              {lastTransition === 'same' && activeLevel === 4 && (
                <span>
                  ★ <strong>Maintained at Peak Level:</strong> Offering high-acuity questions to solidify passing confidence!
                </span>
              )}
              {lastTransition === 'same' && activeLevel !== 4 && (
                <span>
                  ● <strong>Maintained at Level {activeLevel} ({currentQ?.difficultyName}):</strong> Stabilizing ability score around passing benchmark.
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Main Question Card */}
      <div className="cat-question-card">
        <div className="cat-q-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span className="cat-q-badge">Question {currentQuestionNumber} of {totalQuestionsCount}</span>
            <span style={{
              fontSize: 12,
              fontWeight: 700,
              padding: '4px 12px',
              borderRadius: 20,
              background: diffBadge.bg,
              color: diffBadge.text,
              border: `1px solid ${diffBadge.border}`
            }}>
              {diffBadge.label}
            </span>
          </div>
          <span style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>
            Subject: <strong style={{ color: '#0f172a' }}>{currentQ?.topic || testInfo?.topic}</strong>
          </span>
        </div>

        {scenario && (
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderLeft: '4px solid #6366f1',
            borderRadius: '8px',
            padding: '16px 18px',
            marginBottom: '18px',
            color: '#1e293b',
            fontSize: '15px',
            lineHeight: 1.6
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, fontSize: '11px', fontWeight: 800, color: '#4f46e5', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <Activity size={14} /> Clinical Case Vignette
            </div>
            <div style={{ whiteSpace: 'pre-line' }}>{scenario.replace(/^CLINICAL CASE SCENARIO:\s*/i, '')}</div>
          </div>
        )}

        <div className="cat-q-text">
          {stem}
        </div>

        <div className="cat-options-list">
          {currentQ?.options?.map((optText, idx) => (
            <button
              key={idx}
              className={`cat-option-btn ${selectedOption === idx ? 'selected' : ''}`}
              onClick={() => handleOptionSelect(idx)}
            >
              <span className="opt-letter">{String.fromCharCode(65 + idx)}</span>
              <span className="opt-text">{stripOptionPrefix(optText)}</span>
            </button>
          ))}
        </div>

        <div className="cat-footer-bar">
          <AskAIButton 
            question={currentQ?.questionText} 
            options={currentQ?.options} 
            correctAnswer={currentQ?.correctAnswer} 
          />

          <button
            className="cat-submit-btn"
            onClick={handleSubmitAnswer}
            disabled={selectedOption === null || submitting}
          >
            {submitting 
              ? (currentQuestionNumber >= totalQuestionsCount ? 'Submitting Final Answer...' : 'Submitting Answer...') 
              : (currentQuestionNumber >= totalQuestionsCount ? 'Submit & Finish Test ✓' : 'Submit & Next Question →')}
          </button>
        </div>
      </div>

      {/* Cancel Test Confirmation Modal */}
      {showCancelModal && (
        <div className="cat-modal-overlay">
          <div className="cat-feedback-modal" style={{ maxWidth: 440, padding: '28px 24px', textAlign: 'center' }}>
            <div style={{
              width: 54,
              height: 54,
              borderRadius: '50%',
              background: '#fee2e2',
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto'
            }}>
              <AlertTriangle size={28} />
            </div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: 19, fontWeight: 800, color: '#0f172a' }}>
              Cancel Practice Test?
            </h3>
            <p style={{ margin: '0 0 24px 0', fontSize: 13.5, color: '#64748b', lineHeight: 1.5 }}>
              Are you sure you want to cancel? Your test session will end and unsubmitted answers will not be recorded.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button 
                type="button"
                onClick={() => setShowCancelModal(false)}
                style={{
                  padding: '10px 20px',
                  borderRadius: 8,
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  color: '#475569',
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer'
                }}
              >
                Resume Test
              </button>
              <button 
                type="button"
                onClick={() => navigate('/tests')}
                style={{
                  padding: '10px 20px',
                  borderRadius: 8,
                  border: 'none',
                  background: '#dc2626',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer'
                }}
              >
                Yes, Cancel Test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
