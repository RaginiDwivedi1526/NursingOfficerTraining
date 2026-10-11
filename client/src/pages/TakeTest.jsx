import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { startCATSession, submitCATAnswer, getTest } from '../services/api';
import { 
  BrainCircuit, ShieldCheck, AlertTriangle, CheckCircle, XCircle, 
  ChevronRight, Award, RotateCcw, Activity, BarChart2, Layers, Clock, ArrowRight
} from 'lucide-react';
import AskAIButton from '../components/tests/AskAIButton';
import './TakeCATTest.css';

export default function TakeTest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [currentQ, setCurrentQ] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [lastFeedback, setLastFeedback] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [testInfo, setTestInfo] = useState(null);

  // Parse clinical scenario and question stem
  const parseQuestionContent = (rawText) => {
    if (!rawText) return { scenario: null, stem: '' };
    if (rawText.includes('\n\n')) {
      const parts = rawText.split('\n\n');
      const stem = parts.pop().trim();
      const scenario = parts.join('\n\n').trim();
      return { scenario, stem };
    }
    return { scenario: null, stem: rawText };
  };

  useEffect(() => {
    initTestSession();
  }, [id]);

  const initTestSession = async () => {
    setLoading(true);
    try {
      const state = location.state || {};
      let title = state.title || state.test?.title || 'Computer Adaptive Nursing Exam';
      let topic = state.topic || state.test?.topic || 'All Subjects';
      let examType = state.examType || state.test?.examType || (title.includes('AIIMS') || title.includes('NORCET') ? 'nursing_officer' : 'nclex_rn');
      let startingDiff = state.startingDifficulty;

      // If accessed directly by ID and state is missing, fetch test metadata
      if (!state.test && id && id !== 'adaptive' && id.match(/^[0-9a-fA-F]{24}$/)) {
        try {
          const { data } = await getTest(id);
          if (data) {
            title = data.title;
            topic = data.topic;
            examType = data.examType || (data.title.includes('AIIMS') ? 'nursing_officer' : 'nclex_rn');
            if (!startingDiff) {
              startingDiff = data.difficulty === 'hard' ? 3 : (data.difficulty === 'easy' ? 1 : 2);
            }
          }
        } catch (fetchErr) {
          console.warn('[TakeTest] Could not fetch static test by ID, proceeding with adaptive initialization:', fetchErr.message);
        }
      }

      setTestInfo({ title, topic, examType });

      // Start the Computer Adaptive Testing session
      const { data } = await startCATSession({
        title,
        topic,
        examType,
        startingDifficulty: startingDiff || 2,
        minQuestions: 15,
        maxQuestions: 40
      });

      setSession(data);
      setCurrentQ(data.currentQuestion);
      setStartTime(Date.now());
    } catch (err) {
      console.error('[TakeTest] Failed to initialize Computer Adaptive Test:', err);
      alert('Failed to initialize Computer Adaptive Test. Please check connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (index) => {
    if (submitting || showFeedbackModal) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = async () => {
    if (selectedOption === null || submitting || !session) return;
    setSubmitting(true);
    
    const elapsedSeconds = Math.round((Date.now() - startTime) / 1000);

    try {
      const { data } = await submitCATAnswer({
        sessionId: session.sessionId || session._id,
        selectedAnswer: selectedOption,
        timeTaken: elapsedSeconds
      });

      if (data.isCompleted) {
        setIsFinished(true);
        setSession(data.session);
      } else {
        setLastFeedback(data.feedback);
        setShowFeedbackModal(true);
        setSession(prev => ({
          ...prev,
          currentDifficultyLevel: data.currentDifficultyLevel,
          difficultyName: data.difficultyName,
          abilityTheta: data.abilityTheta,
          totalQuestionsAnswered: data.totalQuestionsAnswered,
          nextQuestion: data.nextQuestion
        }));
      }
    } catch (err) {
      console.error('[TakeTest] Error submitting adaptive answer:', err);
      alert('Failed to submit answer. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleNextAdaptiveQuestion = () => {
    setShowFeedbackModal(false);
    setSelectedOption(null);
    setCurrentQ(session.nextQuestion);
    setStartTime(Date.now());
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
            <h3>Question-by-Question Adaptive Review</h3>
            <div className="cat-q-history-list">
              {questionsList.map((q, idx) => (
                <div key={idx} className="cat-history-item">
                  <div className="history-item-top">
                    <span className="history-num">Q{idx + 1}</span>
                    <span className="history-subject">{q.topic}</span>
                    <span className="history-level">Level {q.difficultyLevel}: {q.difficultyName}</span>
                    <span className={`history-status-badge ${q.isCorrect ? 'correct' : 'incorrect'}`}>
                      {q.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                  </div>
                  <p className="history-q-text">{q.questionText}</p>
                  
                  <div className="history-options-grid">
                    {q.options?.map((opt, oIdx) => (
                      <div 
                        key={oIdx} 
                        className={`history-opt-box ${oIdx === q.correctAnswer ? 'opt-correct' : (oIdx === q.selectedAnswer && !q.isCorrect ? 'opt-wrong' : '')}`}
                      >
                        <strong>{String.fromCharCode(65 + oIdx)}.</strong> {opt}
                      </div>
                    ))}
                  </div>

                  <div className="history-explanation">
                    <strong>Clinical Rationale:</strong> {q.explanation}
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
            <span>{testInfo?.title || 'Computer Adaptive Test'}</span>
          </div>
          <span className="cat-subject-tag">{currentQ?.topic || testInfo?.topic || 'Core Nursing'}</span>
        </div>

        <div className="telemetry-right">
          {/* Difficulty Tier */}
          <div className="cat-difficulty-pill" style={{ background: diffBadge.bg, color: diffBadge.text, borderColor: diffBadge.border }}>
            <Layers size={14} /> {diffBadge.label}
          </div>

          {/* Passing Zone Meter */}
          <div className="cat-theta-pill" style={{ background: thetaInfo.bg, color: thetaInfo.color }}>
            {thetaInfo.icon} {thetaInfo.text}
          </div>

          <div className="cat-counter-pill">
            Adaptive Question #{session?.totalQuestionsAnswered ? session.totalQuestionsAnswered + 1 : 1}
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="cat-question-card">
        <div className="cat-q-header">
          <span className="cat-q-badge">Question {session?.totalQuestionsAnswered ? session.totalQuestionsAnswered + 1 : 1}</span>
          <span className="cat-q-level" style={{ color: diffBadge.text }}>
            Adaptive Difficulty: <strong>{currentQ?.difficultyName || 'Base'}</strong>
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
              <span className="opt-text">{optText}</span>
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
            {submitting ? 'Evaluating Response...' : 'Submit & Continue Adaptive Test →'}
          </button>
        </div>
      </div>

      {/* Immediate Adaptive Feedback Modal */}
      {showFeedbackModal && lastFeedback && (
        <div className="cat-modal-overlay">
          <div className="cat-feedback-modal">
            <div className={`feedback-header ${lastFeedback.isCorrect ? 'correct' : 'incorrect'}`}>
              {lastFeedback.isCorrect ? (
                <>
                  <CheckCircle size={36} />
                  <div>
                    <h3>Correct Answer!</h3>
                    <p>Computer Adaptive Engine is scaling up difficulty to <strong>Level {session.currentDifficultyLevel}: {session.difficultyName}</strong></p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle size={36} />
                  <div>
                    <h3>Incorrect Answer</h3>
                    <p>Computer Adaptive Engine adjusted level to <strong>Level {session.currentDifficultyLevel}: {session.difficultyName}</strong></p>
                  </div>
                </>
              )}
            </div>

            <div className="feedback-body">
              <div className="feedback-correct-answer">
                <strong>Correct Option:</strong> Option {String.fromCharCode(65 + lastFeedback.correctAnswer)}
              </div>
              <div className="feedback-explanation">
                <strong>Clinical Rationale:</strong>
                <p>{lastFeedback.explanation}</p>
              </div>
            </div>

            <div className="feedback-footer">
              <button className="cat-next-btn" onClick={handleNextAdaptiveQuestion}>
                Next Adaptive Question <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
