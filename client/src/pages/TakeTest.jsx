import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { startCATSession, submitCATAnswer, getTest, submitTest } from '../services/api';
import { 
  BrainCircuit, ShieldCheck, AlertTriangle, CheckCircle, XCircle, 
  ChevronRight, Award, RotateCcw, Activity, BarChart2, Layers, Clock, ArrowRight, X
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

  // Mode: 'static' (test has pre-defined questions in DB) or 'adaptive' (AI generated)
  const [testMode, setTestMode] = useState('adaptive');
  const [staticQuestions, setStaticQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [totalQuestionsCount, setTotalQuestionsCount] = useState(TOTAL_TEST_QUESTIONS);

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
      let startingDiff = state.startingDifficulty;

      let fetchedQuestions = [];
      // Fetch test details from backend if accessible
      if (id && id !== 'adaptive' && id.match(/^[0-9a-fA-F]{24}$/)) {
        try {
          const { data } = await getTest(id);
          if (data) {
            title = data.title;
            topic = data.topic;
            examType = data.examType || (data.title.includes('AIIMS') ? 'nursing_officer' : 'nclex_rn');
            if (Array.isArray(data.questions) && data.questions.length > 0) {
              fetchedQuestions = data.questions;
            }
            if (!startingDiff) {
              startingDiff = data.difficulty === 'hard' ? 3 : (data.difficulty === 'easy' ? 1 : 2);
            }
          }
        } catch (fetchErr) {
          console.warn('[TakeTest] Could not fetch static test by ID, proceeding with adaptive initialization:', fetchErr.message);
        }
      }

      setTestInfo({ title, topic, examType });

      // If test already has authentic pre-created questions in database, run them directly!
      const availableQuestions = fetchedQuestions.length > 0 ? fetchedQuestions : (state.test?.questions || []);
      if (availableQuestions.length > 0) {
        setTestMode('static');
        setStaticQuestions(availableQuestions);
        setTotalQuestionsCount(availableQuestions.length);
        setCurrentQ(availableQuestions[0]);
        setCurrentQuestionNumber(1);
        setUserAnswers([]);
        setSession({
          result: 'IN_PROGRESS',
          totalQuestions: availableQuestions.length,
          correctCount: 0,
          abilityTheta: 0.0,
          currentDifficultyLevel: startingDiff || 2,
          difficultyName: startingDiff === 3 ? 'Advanced Hard' : 'Base',
          questionsAnswered: []
        });
        setStartTime(Date.now());
        setTimeLeft(TEST_DURATION_SECONDS);
        return;
      }

      // Otherwise, run adaptive session with anti-cliché engine
      setTestMode('adaptive');
      setTotalQuestionsCount(TOTAL_TEST_QUESTIONS);
      const { data } = await startCATSession({
        title,
        topic,
        examType,
        startingDifficulty: startingDiff || 2,
        minQuestions: TOTAL_TEST_QUESTIONS,
        maxQuestions: TOTAL_TEST_QUESTIONS
      });

      setSession(data);
      setCurrentQ(data.currentQuestion);
      setCurrentQuestionNumber(1);
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

    // ── Static Test Mode Handler ──
    if (testMode === 'static' && staticQuestions.length > 0) {
      try {
        const currentQuestionObj = staticQuestions[currentQuestionNumber - 1];
        const newAnswers = [
          ...userAnswers,
          {
            questionId: currentQuestionObj._id,
            selectedAnswer: selectedOption,
            timeTaken: elapsedSeconds
          }
        ];
        setUserAnswers(newAnswers);

        if (currentQuestionNumber >= staticQuestions.length) {
          // Submit final static test to server
          let serverReview = null;
          try {
            const { data } = await submitTest(id, {
              answers: newAnswers,
              timeTaken: Math.round((Date.now() - (startTime - (currentQuestionNumber * 30000))) / 1000)
            });
            serverReview = data;
          } catch (submitErr) {
            console.warn('[TakeTest] Submit test server fallback:', submitErr.message);
          }

          // Build question history review list with rationales
          const correctMap = {};
          if (serverReview && Array.isArray(serverReview.correctAnswers)) {
            serverReview.correctAnswers.forEach(ca => {
              correctMap[ca.questionId] = ca;
            });
          }

          let correctCount = 0;
          const questionsList = staticQuestions.map((sq, i) => {
            const userAns = newAnswers[i];
            const serverInfo = correctMap[sq._id] || {};
            const correctAns = serverInfo.correctAnswer !== undefined ? serverInfo.correctAnswer : sq.correctAnswer;
            const isCorrect = userAns ? userAns.selectedAnswer === correctAns : false;
            if (isCorrect) correctCount++;

            return {
              questionNumber: i + 1,
              questionText: sq.questionText,
              options: sq.options,
              selectedAnswer: userAns ? userAns.selectedAnswer : -1,
              correctAnswer: correctAns !== undefined ? correctAns : 0,
              isCorrect,
              explanation: serverInfo.explanation || sq.explanation || '',
              topic: sq.topic || testInfo?.topic || 'Core Nursing',
              difficultyLevel: sq.difficultyLevel || 2,
              difficultyName: sq.difficultyName || 'Base'
            };
          });

          const isPass = (correctCount / staticQuestions.length) >= 0.50;
          setSession({
            result: isPass ? 'PASSED' : 'DID NOT MEET BENCHMARK',
            totalQuestions: staticQuestions.length,
            correctCount,
            abilityTheta: Number(((correctCount / staticQuestions.length) * 2 - 0.5).toFixed(2)),
            questionsAnswered: questionsList
          });
          setIsFinished(true);
        } else {
          setSelectedOption(null);
          setCurrentQuestionNumber(prev => prev + 1);
          setCurrentQ(staticQuestions[currentQuestionNumber]);
          setStartTime(Date.now());
        }
      } catch (err) {
        console.error('[TakeTest] Error processing static answer:', err);
        alert('Error processing answer. Please try again.');
      } finally {
        setSubmitting(false);
      }
      return;
    }

    // ── Adaptive CAT Mode Handler ──
    try {
      const { data } = await submitCATAnswer({
        sessionId: session?.sessionId || session?._id,
        selectedAnswer: selectedOption,
        timeTaken: elapsedSeconds
      });

      // Complete test after last question or when engine marks isCompleted
      if (data.isCompleted || currentQuestionNumber >= totalQuestionsCount) {
        setIsFinished(true);
        if (data.session) {
          setSession(data.session);
        }
      } else {
        setSelectedOption(null);
        setCurrentQuestionNumber(prev => prev + 1);
        setCurrentQ(data.nextQuestion);
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
    switch (level) {
      case 1: return { bg: '#fef3c7', text: '#d97706', border: '#fde68a', label: 'Level 1: Below Base' };
      case 2: return { bg: '#e0e7ff', text: '#4338ca', border: '#c7d2fe', label: 'Level 2: Base (Standard Passing)' };
      case 3: return { bg: '#f3e8ff', text: '#6b21a8', border: '#e9d5ff', label: 'Level 3: Advanced Hard' };
      case 4: return { bg: '#fee2e2', text: '#b91c1c', border: '#fca5a5', label: 'Level 4: Peak Level 🔥' };
      default: return { bg: '#e0e7ff', text: '#4338ca', border: '#c7d2fe', label: 'Level 2: Base' };
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
        <h2>Initializing Computer Adaptive Test...</h2>
        <p>Configuring base benchmark & strictly calibrating subject distribution matrix...</p>
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
            <h1>{isPass ? 'CONGRATULATIONS! YOU PASSED (MET STANDARD)' : 'TEST COMPLETED - DID NOT MEET PASSING STANDARD'}</h1>
            <p className="cat-report-sub">
              {isPass 
                ? 'Your adaptive performance demonstrated statistical confidence above the passing standard threshold.'
                : 'Your ability score remained below the required passing line for this adaptive exam session.'}
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="cat-stats-grid">
            <div className="cat-stat-box">
              <span className="stat-label">CAT Decision</span>
              <span className={`stat-val ${isPass ? 'green-txt' : 'red-txt'}`}>
                {session.result}
              </span>
            </div>
            <div className="cat-stat-box">
              <span className="stat-label">Questions to Decision</span>
              <span className="stat-val">{session.totalQuestions} Questions</span>
            </div>
            <div className="cat-stat-box">
              <span className="stat-label">Final Ability Score (θ)</span>
              <span className="stat-val">{(session.abilityTheta || 0).toFixed(2)}</span>
            </div>
            <div className="cat-stat-box">
              <span className="stat-label">Overall Accuracy</span>
              <span className="stat-val">
                {Math.round(((session.correctCount || 0) / (session.totalQuestions || 1)) * 100)}%
              </span>
            </div>
          </div>

          {/* Adaptive Difficulty Trajectory Curve Chart */}
          <div className="cat-trajectory-section">
            <h3><BarChart2 size={20} /> Adaptive Difficulty Trajectory Curve</h3>
            <p className="cat-chart-desc">
              This graph displays how the Computer Adaptive Algorithm dynamically scaled your question difficulty up towards Peak Level (Level 4) or down based on your performance relative to the Passing Threshold line.
            </p>
            <div className="cat-chart-container">
              <svg viewBox="0 0 500 160" className="cat-svg-chart">
                {/* Passing Line */}
                <line x1="40" y1="80" x2="480" y2="80" stroke="#16a34a" strokeWidth="2" strokeDasharray="4 4" />
                <text x="380" y="74" fill="#16a34a" fontSize="10" fontWeight="bold">Passing Line (Base +0.20)</text>

                {/* Level Guides */}
                <line x1="40" y1="20" x2="480" y2="20" stroke="#e2e8f0" strokeWidth="1" />
                <text x="5" y="24" fill="#64748b" fontSize="9">Level 4 (Peak)</text>

                <line x1="40" y1="50" x2="480" y2="50" stroke="#e2e8f0" strokeWidth="1" />
                <text x="5" y="54" fill="#64748b" fontSize="9">Level 3 (Hard)</text>

                <text x="5" y="84" fill="#64748b" fontSize="9">Level 2 (Base)</text>

                <line x1="40" y1="120" x2="480" y2="120" stroke="#e2e8f0" strokeWidth="1" />
                <text x="5" y="124" fill="#64748b" fontSize="9">Level 1 (Below)</text>

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
              Back to Practice Tests
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────
  // ACTIVE ADAPTIVE QUESTION SCREEN
  // ──────────────────────────────────────────────────────────
  const diffBadge = getDifficultyBadgeColor(currentQ?.difficultyLevel || 2);
  const thetaInfo = getThetaStatus(session?.abilityTheta || 0.0);
  const { scenario, stem } = parseQuestionContent(currentQ?.questionText);

  return (
    <div className="cat-container">
      {/* Telemetry Header */}
      <div className="cat-telemetry-bar">
        <div className="telemetry-left">
          <div className="cat-logo-tag">
            <BrainCircuit size={20} color="#7c3aed" />
            <span>{testInfo?.title || 'Practice Test'}</span>
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

      {/* Main Question Card */}
      <div className="cat-question-card">
        <div className="cat-q-header">
          <span className="cat-q-badge">Question {currentQuestionNumber} of {totalQuestionsCount}</span>
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
