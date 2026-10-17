import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  Award, Trophy, Heart, BookOpen, CheckCircle2, XCircle, Lightbulb, 
  BarChart3, ClipboardList, ArrowLeft, Filter, ShieldCheck, Home
} from 'lucide-react';
import TestResultSummary from '../components/tests/TestResultSummary';
import FormattedExplanation from '../components/tests/FormattedExplanation';
import logo from '../assets/logo.png';
import './TestResult.css';

export default function TestResult() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'correct' | 'incorrect' | 'unattempted'

  if (!state?.result) {
    return (
      <div className="trs-page-wrapper">
        <div className="trs-empty-state">
          <h2>No result data found</h2>
          <p>Please take a test to generate an examination scorecard.</p>
          <Link to="/tests" className="trs-btn trs-btn-primary" style={{ marginTop: '16px' }}>
            <ClipboardList size={16} /> Explore Mock Tests
          </Link>
        </div>
      </div>
    );
  }

  const { result, correctAnswers, test } = state;
  const testTitle = test?.title || result?.test?.title || 'Free Nursing Test - 180/180';
  const questions = test?.questions || [];

  // Filter questions for review
  const filteredQuestions = questions.map((q, i) => {
    const userAnswer = result.answers ? result.answers[i] : null;
    const correct = correctAnswers ? correctAnswers.find(ca => ca.questionId === q._id) : null;
    const isAttempted = userAnswer?.selectedAnswer !== undefined && userAnswer?.selectedAnswer !== null && userAnswer?.selectedAnswer !== -1;
    const isCorrect = isAttempted && (userAnswer?.isCorrect || userAnswer?.selectedAnswer === correct?.correctAnswer);
    
    return {
      q,
      originalIndex: i,
      userAnswer,
      correct,
      isAttempted,
      isCorrect
    };
  }).filter(item => {
    if (filterMode === 'correct') return item.isCorrect;
    if (filterMode === 'incorrect') return item.isAttempted && !item.isCorrect;
    if (filterMode === 'unattempted') return !item.isAttempted;
    return true;
  });

  const correctTotal = questions.filter((_, i) => result.answers?.[i]?.isCorrect).length;
  const incorrectTotal = questions.filter((_, i) => {
    const a = result.answers?.[i];
    return a && a.selectedAnswer !== -1 && a.selectedAnswer !== null && !a.isCorrect;
  }).length;
  const unattemptedTotal = questions.length - (correctTotal + incorrectTotal);

  return (
    <div className="cbt-result-shell">
      
      {/* ─── 1. CBT BRANDED HEADER ─── */}
      <header className="cbt-res-header">
        <div className="cbt-res-header-left">
          <img src={logo} alt="Nursing Officer Logo" className="cbt-res-logo" />
          <div className="cbt-res-title-box">
            <span className="cbt-res-main-title">Nursing Officer Test Bank</span>
            <span className="cbt-res-helpline">Call or WhatsApp at: 9828474951</span>
          </div>
        </div>

        <div className="cbt-res-header-center">
          <span className="cbt-res-test-name">{testTitle}</span>
          <span className="cbt-res-sub-tag">Official CBT Examination Scorecard</span>
        </div>

        <div className="cbt-res-header-right">
          <Link to="/dashboard" className="cbt-res-btn-dash">
            <Home size={16} /> Exit to Dashboard
          </Link>
        </div>
      </header>

      {/* ─── 2. MAIN RESULT SCORECARD & SUMMARY ─── */}
      <main className="cbt-res-content">
        
        {/* Quantitative Scorecard & 5-Status Question Summary Table */}
        <TestResultSummary result={result} testId={test?._id} testTitle={testTitle} />

        {/* ─── 3. ANSWER REVIEW SECTION ─── */}
        {questions.length > 0 && correctAnswers && (
          <div className="cbt-review-card">
            
            <div className="cbt-review-header">
              <div className="cbt-review-title">
                <ClipboardList size={20} color="#0284c7" />
                <span>Question-by-Question Clinical Answer Review</span>
              </div>

              {/* Filter Pills */}
              <div className="cbt-filter-group">
                <button 
                  className={`cbt-filter-btn ${filterMode === 'all' ? 'active' : ''}`}
                  onClick={() => setFilterMode('all')}
                >
                  All ({questions.length})
                </button>
                <button 
                  className={`cbt-filter-btn green ${filterMode === 'correct' ? 'active' : ''}`}
                  onClick={() => setFilterMode('correct')}
                >
                  Correct ({correctTotal})
                </button>
                <button 
                  className={`cbt-filter-btn red ${filterMode === 'incorrect' ? 'active' : ''}`}
                  onClick={() => setFilterMode('incorrect')}
                >
                  Incorrect ({incorrectTotal})
                </button>
                <button 
                  className={`cbt-filter-btn gray ${filterMode === 'unattempted' ? 'active' : ''}`}
                  onClick={() => setFilterMode('unattempted')}
                >
                  Skipped ({unattemptedTotal})
                </button>
              </div>
            </div>

            <div className="cbt-review-list">
              {filteredQuestions.map(({ q, originalIndex, userAnswer, correct, isAttempted, isCorrect }) => {
                const markScore = isCorrect ? '+1.00 Marks' : (isAttempted ? '-0.33 Marks (-1/3 Penalty)' : '0.00 Marks (Skipped)');
                const markScoreClass = isCorrect ? 'score-green' : (isAttempted ? 'score-red' : 'score-gray');

                return (
                  <div key={originalIndex} className="cbt-qreview-item">
                    
                    <div className="cbt-qr-top">
                      <div className="cbt-qr-indicator">
                        {isCorrect ? (
                          <div className="cbt-status-icon green"><CheckCircle2 size={18} /></div>
                        ) : isAttempted ? (
                          <div className="cbt-status-icon red"><XCircle size={18} /></div>
                        ) : (
                          <div className="cbt-status-icon gray"><ClipboardList size={18} /></div>
                        )}
                        <strong className="cbt-qr-num">Question {originalIndex + 1}</strong>
                        {q.topic && <span className="cbt-qr-topic-pill">{q.topic}</span>}
                      </div>

                      <div className={`cbt-qr-mark-badge ${markScoreClass}`}>
                        {markScore}
                      </div>
                    </div>

                    <p className="cbt-qr-text">{q.questionText}</p>

                    <div className="cbt-qr-options">
                      {q.options.map((opt, optIdx) => {
                        const isUserChoice = isAttempted && userAnswer?.selectedAnswer === optIdx;
                        const isCorrectOption = correct?.correctAnswer === optIdx;

                        let optClass = 'cbt-opt-normal';
                        if (isCorrectOption) optClass = 'cbt-opt-correct';
                        else if (isUserChoice && !isCorrect) optClass = 'cbt-opt-wrong';

                        return (
                          <div key={optIdx} className={`cbt-qr-opt ${optClass}`}>
                            <div className="cbt-opt-letter">{String.fromCharCode(65 + optIdx)}</div>
                            <span className="cbt-opt-text">{opt}</span>
                            {isCorrectOption && (
                              <span className="cbt-opt-status-tag green">
                                <CheckCircle2 size={14} /> Correct Answer
                              </span>
                            )}
                            {isUserChoice && !isCorrect && (
                              <span className="cbt-opt-status-tag red">
                                <XCircle size={14} /> Your Choice
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {correct?.explanation && (
                      <div className="cbt-qr-explanation-wrap">
                        <FormattedExplanation 
                          explanation={correct.explanation} 
                          correctAnswer={correct.correctAnswer} 
                          selectedAnswer={userAnswer?.selectedAnswer} 
                          optionsList={q.options} 
                        />
                      </div>
                    )}

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* Footer Navigation */}
        <div className="cbt-res-footer-actions">
          <Link to={test?._id ? `/test/${test._id}/take` : '/tests'} className="trs-btn trs-btn-primary">
            Retake Examination
          </Link>
          <Link to="/dashboard" className="trs-btn trs-btn-outline">
            Return to Dashboard
          </Link>
          <Link to="/tests" className="trs-btn trs-btn-outline">
            Explore More Tests
          </Link>
        </div>

      </main>

    </div>
  );
}
