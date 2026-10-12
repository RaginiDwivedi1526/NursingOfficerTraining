import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { startCATSession, submitCATAnswer } from '../services/api';
import { 
  BrainCircuit, ShieldCheck, AlertTriangle, CheckCircle, XCircle, 
  ChevronRight, Award, RotateCcw, Activity, BarChart2, Layers, HelpCircle
} from 'lucide-react';
import AskAIButton from '../components/tests/AskAIButton';
import FormattedExplanation from '../components/tests/FormattedExplanation';
import './TakeCATTest.css';

export default function TakeCATTest() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [currentQ, setCurrentQ] = useState(null);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [lastFeedback, setLastFeedback] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());

  // Initialize CAT session on component mount
  useEffect(() => {
    initCAT();
  }, []);

  const initCAT = async () => {
    setLoading(true);
    try {
      const { data } = await startCATSession({ examType: 'nclex_rn' });
      setSession(data);
      setCurrentQ(data.currentQuestion);
      setCurrentQuestionNumber(1);
      setStartTime(Date.now());
    } catch (err) {
      console.error('[CAT UI] Failed to start CAT session:', err);
      alert('Failed to initialize Computer Adaptive Test. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (index) => {
    if (submitting || showFeedbackModal) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = async () => {
    if (selectedOption === null || submitting) return;
    setSubmitting(true);
    
    const elapsedSeconds = Math.round((Date.now() - startTime) / 1000);

    try {
      const { data } = await submitCATAnswer({
        sessionId: session.sessionId,
        selectedAnswer: selectedOption,
        timeTaken: elapsedSeconds
      });

      if (data.isCompleted) {
        setIsFinished(true);
        setSession(data.session);
      } else {
        setLastFeedback({
          ...data.feedback,
          questionNumber: currentQuestionNumber
        });
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
      console.error('[CAT UI] Error submitting answer:', err);
      alert('Failed to submit answer. Please check connection.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleNextAdaptiveQuestion = () => {
    setShowFeedbackModal(false);
    setSelectedOption(null);
    setCurrentQuestionNumber(prev => prev + 1);
    setCurrentQ(session.nextQuestion);
    setStartTime(Date.now());
  };

  const getDifficultyBadgeColor = (level) => {
    switch (level) {
      case 1: return { bg: '#fef3c7', text: '#d97706', border: '#fde68a', label: 'Level 1: Below Base' };
      case 2: return { bg: '#e0e7ff', text: '#4338ca', border: '#c7d2fe', label: 'Level 2: Base Level' };
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
        <h2>Initializing Computer Adaptive Test (CAT)...</h2>
        <p>Calibrating adaptive difficulty standard & subject matrix (UWorld & Archer CAT Model)...</p>
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────
  // FINAL CAT DIAGNOSTIC REPORT
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
            <h1>{isPass ? 'CONGRATULATIONS! YOU PASSED' : 'TEST COMPLETED - DID NOT MEET STANDARD'}</h1>
            <p className="cat-report-sub">
              {isPass 
                ? 'Your adaptive performance met and maintained >95% statistical confidence above the passing standard.'
                : 'Your ability score remained below the required passing line for this adaptive exam.'}
            </p>
          </div>

          {/* Key Metrics */}
          <div className="cat-stats-grid">
            <div className="cat-stat-box">
              <span className="stat-label">CAT Decision Result</span>
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

          {/* Adaptive Difficulty Trajectory Chart */}
          <div className="cat-trajectory-section">
            <h3><BarChart2 size={20} /> Adaptive Difficulty Trajectory Curve</h3>
            <p className="cat-chart-desc">
              This graph displays how the Computer Adaptive Algorithm scaled question difficulty up (Peak Level) or down (Below Base) based on your answers relative to the Passing Threshold line.
            </p>
            <div className="cat-chart-container">
              <svg viewBox="0 0 500 160" className="cat-svg-chart">
                {/* Passing Line */}
                <line x1="40" y1="80" x2="480" y2="80" stroke="#16a34a" strokeWidth="2" strokeDasharray="4 4" />
                <text x="410" y="74" fill="#16a34a" fontSize="10" fontWeight="bold">Passing Line (Base +0.2)</text>

                {/* Grid Lines */}
                <line x1="40" y1="20" x2="480" y2="20" stroke="#e2e8f0" strokeWidth="1" />
                <text x="5" y="24" fill="#64748b" fontSize="9">Level 4 (Peak)</text>

                <line x1="40" y1="50" x2="480" y2="50" stroke="#e2e8f0" strokeWidth="1" />
                <text x="5" y="54" fill="#64748b" fontSize="9">Level 3 (Hard)</text>

                <text x="5" y="84" fill="#64748b" fontSize="9">Level 2 (Base)</text>

                <line x1="40" y1="120" x2="480" y2="120" stroke="#e2e8f0" strokeWidth="1" />
                <text x="5" y="124" fill="#64748b" fontSize="9">Level 1 (Below)</text>

                {/* Trajectory Data Points */}
                {questionsList.map((q, idx) => {
                  const stepX = 40 + (idx / Math.max(1, questionsList.length - 1)) * 440;
                  // Level 4 -> y=20, Level 3 -> y=50, Level 2 -> y=80, Level 1 -> y=120
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

          {/* Question Breakdown */}
          <div className="cat-review-section">
            <h3><Layers size={20} /> Question-by-Question Adaptive Log</h3>
            <div className="cat-review-list">
              {questionsList.map((q, idx) => (
                <div key={idx} className={`cat-review-item ${q.isCorrect ? 'correct-item' : 'incorrect-item'}`}>
                  <div className="cat-review-top">
                    <span className="q-num-badge">Q{q.questionNumber}</span>
                    <span className="q-diff-badge" style={{ background: getDifficultyBadgeColor(q.difficultyLevel).bg, color: getDifficultyBadgeColor(q.difficultyLevel).text }}>
                      {q.difficultyName}
                    </span>
                    <span className="q-topic-badge">{q.topic}</span>
                    <span className={`q-status-badge ${q.isCorrect ? 'green' : 'red'}`}>
                      {q.isCorrect ? '✓ Correct' : '✕ Incorrect'}
                    </span>
                  </div>
                  <p className="q-text-body">{q.questionText}</p>
                  <div style={{ marginTop: 12 }}>
                    <FormattedExplanation 
                      explanation={q.explanation} 
                      correctAnswer={q.correctAnswer} 
                      selectedAnswer={q.selectedAnswer} 
                      optionsList={q.options} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cat-actions">
            <button className="cat-primary-btn" onClick={() => navigate('/cat-test')}>
              <RotateCcw size={18} /> Start New CAT Test
            </button>
            <button className="cat-secondary-btn" onClick={() => navigate('/dashboard')}>
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────
  // ACTIVE CAT QUESTION SCREEN
  // ──────────────────────────────────────────────────────────
  const diffBadge = getDifficultyBadgeColor(currentQ?.difficultyLevel || 2);
  const thetaInfo = getThetaStatus(session?.abilityTheta || 0.0);

  return (
    <div className="cat-container">
      {/* CAT Telemetry Header */}
      <div className="cat-telemetry-bar">
        <div className="telemetry-left">
          <div className="cat-logo-tag">
            <BrainCircuit size={20} color="#7c3aed" />
            <span>Computer Adaptive Test (CAT)</span>
          </div>
          <span className="cat-subject-tag">{currentQ?.topic || 'Core Nursing'}</span>
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
            Adaptive Question #{currentQuestionNumber}
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="cat-question-card">
        <div className="cat-q-header">
          <span className="cat-q-badge">Question {currentQuestionNumber}</span>
          <span className="cat-q-level" style={{ color: diffBadge.text }}>
            Adaptive Difficulty: <strong>{currentQ?.difficultyName || 'Base'}</strong>
          </span>
        </div>

        <div className="cat-q-text">
          {currentQ?.questionText}
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
            {submitting ? 'Evaluating Adaptive Response...' : 'Submit & Continue Adaptive Test →'}
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
                    <h3>Question #{lastFeedback.questionNumber || currentQuestionNumber}: Correct Answer! ✓</h3>
                    <p>Adaptive Engine is scaling up next Question (#{(lastFeedback.questionNumber || currentQuestionNumber) + 1}) to <strong>Level {session.currentDifficultyLevel}: {session.difficultyName}</strong></p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle size={36} />
                  <div>
                    <h3>Question #{lastFeedback.questionNumber || currentQuestionNumber}: Incorrect Answer ✗</h3>
                    <p>Adaptive Engine calibrated next Question (#{(lastFeedback.questionNumber || currentQuestionNumber) + 1}) to <strong>Level {session.currentDifficultyLevel}: {session.difficultyName}</strong></p>
                  </div>
                </>
              )}
            </div>

            <div className="feedback-body">
              {lastFeedback.questionText && (
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: 10,
                  padding: '14px 16px',
                  marginBottom: 16,
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: '#1e293b'
                }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#4f46e5', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>
                    Question #{lastFeedback.questionNumber || currentQuestionNumber} Scenario & Stem
                  </div>
                  <div style={{ whiteSpace: 'pre-line' }}>{lastFeedback.questionText}</div>
                </div>
              )}

              <FormattedExplanation
                explanation={lastFeedback.explanation}
                correctAnswer={lastFeedback.correctAnswer}
                selectedAnswer={lastFeedback.selectedAnswer}
                optionsList={lastFeedback.options}
                peerPercentages={lastFeedback.peerPercentages}
              />
            </div>

            <div className="feedback-footer">
              <button 
                className="cat-next-btn" 
                onClick={handleNextAdaptiveQuestion}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: 15,
                  padding: '12px 26px',
                  borderRadius: 10,
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Continue to Question #{(lastFeedback.questionNumber || currentQuestionNumber) + 1} <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
