import React, { useState, useEffect } from 'react';
import { 
  Award, CheckCircle2, XCircle, Timer, ClipboardList, Brain, BarChart3, 
  RotateCcw, Microscope, Pill, HeartPulse, Stethoscope, BookOpen, 
  AlertTriangle, Check, ShieldCheck, TrendingUp, HelpCircle, Target, Percent
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './TestResultSummary.css';

const topicIcons = {
  'Microbiology': <Microscope size={16} color="#059669" />,
  'Pharmacology': <Pill size={16} color="#0284c7" />,
  'Anatomy': <HeartPulse size={16} color="#dc2626" />,
  'Nursing Procedures': <Stethoscope size={16} color="#0d2b5e" />,
  'Obstetrics & Gynecological Nursing': <HeartPulse size={16} color="#ec4899" />,
  'Mental Health (Psychiatric) Nursing': <Brain size={16} color="#7c3aed" />,
  'Medical-Surgical Nursing': <Stethoscope size={16} color="#0284c7" />
};

export default function TestResultSummary({ result, testId, testTitle }) {
  if (!result) return null;

  // 1. Precise Quantitative Scoring
  const totalQuestions = Number(result.totalQuestions || (result.answers ? result.answers.length : 25));
  const totalMarks = Number(result.totalMarks || (totalQuestions * 1.0));
  const correctCount = Number(result.correctAnswers || 0);
  const incorrectCount = Number(result.incorrectAnswers || 0);
  const unattemptedCount = result.unattemptedAnswers !== undefined 
    ? Number(result.unattemptedAnswers) 
    : Math.max(0, totalQuestions - (correctCount + incorrectCount));
  
  const positiveMarks = result.positiveMarks !== undefined 
    ? Number(result.positiveMarks) 
    : Number((correctCount * 1.0).toFixed(2));
  const negativeMarksDeducted = result.negativeMarksDeducted !== undefined 
    ? Number(result.negativeMarksDeducted) 
    : Number((incorrectCount * (1 / 3)).toFixed(2));
  
  const marksObtained = result.marksObtained !== undefined 
    ? Number(result.marksObtained) 
    : Math.max(0, Number((positiveMarks - negativeMarksDeducted).toFixed(2)));
  const attemptedCount = correctCount + incorrectCount;
  const accuracy = result.accuracy !== undefined 
    ? Number(result.accuracy) 
    : (attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0);
  const scorePercentage = result.score !== undefined 
    ? Number(result.score) 
    : (totalMarks > 0 ? Math.round((marksObtained / totalMarks) * 100) : 0);
  
  const minPassPercentage = Number(result.minPassPercentage || 50.0);
  const passingMarksRequired = result.passingMarksRequired !== undefined 
    ? Number(result.passingMarksRequired) 
    : Number((totalMarks * (minPassPercentage / 100)).toFixed(2));
  const isPassed = result.isPassed !== undefined 
    ? Boolean(result.isPassed) 
    : (marksObtained >= passingMarksRequired);

  // 2. Question Status Summary (Matching Screenshot 2 & 3)
  const statusSummary = result.statusSummary || {
    answered: correctCount + incorrectCount,
    answeredMarked: 0,
    visitedUnanswered: 0,
    marked: 0,
    notVisited: unattemptedCount,
    total: totalQuestions
  };

  // 3. CAT Adaptive Telemetry
  const catTelemetry = result.catTelemetry || null;

  // 4. Time
  const timeTakenSec = result.timeTaken || 0;
  const minutes = Math.floor(timeTakenSec / 60);
  const seconds = timeTakenSec % 60;
  const formattedTime = `${minutes} min ${seconds} sec`;

  return (
    <div className="trs-scorecard-container">
      
      {/* ─── 1. TOP RESULT BANNER & QUALIFICATION BADGE ─── */}
      <div className={`trs-banner ${isPassed ? 'passed' : 'failed'}`}>
        <div className="trs-banner-badge">
          {isPassed ? <CheckCircle2 size={24} /> : <AlertTriangle size={24} />}
          <span>{isPassed ? 'QUALIFIED / PASSED' : 'DID NOT QUALIFY (BELOW CUTOFF)'}</span>
        </div>
        <h2 className="trs-banner-title">
          {isPassed ? 'Congratulations on Clearing the Standard!' : 'Exam Result: Needs Improvement'}
        </h2>
        <p className="trs-banner-sub">
          Passing Cutoff Benchmark: <strong>{minPassPercentage}% ({passingMarksRequired.toFixed(2)} / {totalMarks.toFixed(2)} Marks)</strong>
        </p>
      </div>

      {/* ─── 2. HERO METRIC CARDS ─── */}
      <div className="trs-hero-grid">
        
        {/* Card 1: Marks Scored */}
        <div className="trs-hcard primary">
          <div className="trs-hcard-header">
            <Award size={20} color="#0284c7" />
            <span>Marks Obtained</span>
          </div>
          <div className="trs-hcard-num">
            {marksObtained.toFixed(2)} <span className="trs-hcard-denom">/ {totalMarks.toFixed(2)}</span>
          </div>
          <div className="trs-hcard-sub">Net Marks after -1/3 Negative Marking</div>
        </div>

        {/* Card 2: Accuracy Rate */}
        <div className="trs-hcard">
          <div className="trs-hcard-header">
            <Target size={20} color="#16a34a" />
            <span>Accuracy Rate</span>
          </div>
          <div className="trs-hcard-num" style={{ color: accuracy >= 70 ? '#16a34a' : accuracy >= 50 ? '#d97706' : '#dc2626' }}>
            {accuracy}%
          </div>
          <div className="trs-hcard-sub">{correctCount} Correct of {attemptedCount} Attempted</div>
        </div>

        {/* Card 3: Overall Percentage */}
        <div className="trs-hcard">
          <div className="trs-hcard-header">
            <Percent size={20} color="#9333ea" />
            <span>Percentage Score</span>
          </div>
          <div className="trs-hcard-num" style={{ color: '#9333ea' }}>
            {scorePercentage}%
          </div>
          <div className="trs-hcard-sub">Calculated out of {totalMarks} Total Marks</div>
        </div>

        {/* Card 4: Total Time */}
        <div className="trs-hcard">
          <div className="trs-hcard-header">
            <Timer size={20} color="#f59e0b" />
            <span>Time Taken</span>
          </div>
          <div className="trs-hcard-num" style={{ color: '#f59e0b' }}>
            {formattedTime}
          </div>
          <div className="trs-hcard-sub">Allocated Duration: 30 minutes</div>
        </div>

      </div>

      {/* ─── 3. DETAILED MARKS CALCULATION BREAKDOWN ─── */}
      <div className="trs-calc-card">
        <div className="trs-card-title">
          <ClipboardList size={18} color="#0284c7" />
          <span>Official Marks Calculation Breakdown</span>
        </div>

        <div className="trs-calc-grid">
          
          <div className="trs-calc-item">
            <span className="trs-c-label">Total Questions</span>
            <span className="trs-c-val">{totalQuestions} Questions</span>
          </div>

          <div className="trs-calc-item">
            <span className="trs-c-label">Maximum Marks</span>
            <span className="trs-c-val">{totalMarks.toFixed(2)} Marks (1.0 per Q)</span>
          </div>

          <div className="trs-calc-item">
            <span className="trs-c-label">Positive Marks Earned</span>
            <span className="trs-c-val green">+{positiveMarks.toFixed(2)} Marks ({correctCount} Correct)</span>
          </div>

          <div className="trs-calc-item">
            <span className="trs-c-label">Negative Marking Penalty</span>
            <span className="trs-c-val red">-{negativeMarksDeducted.toFixed(2)} Marks ({incorrectCount} Wrong × 1/3)</span>
          </div>

          <div className="trs-calc-item highlight">
            <span className="trs-c-label"><strong>Net Marks Scored</strong></span>
            <span className="trs-c-val blue"><strong>{marksObtained.toFixed(2)} / {totalMarks.toFixed(2)} Marks</strong></span>
          </div>

          <div className="trs-calc-item highlight">
            <span className="trs-c-label"><strong>Passing Status</strong></span>
            <span className={`trs-c-val ${isPassed ? 'green' : 'red'}`}>
              <strong>{isPassed ? 'PASSED (Qualified)' : 'FAILED (Below 50% Cutoff)'}</strong>
            </span>
          </div>

        </div>
      </div>

      {/* ─── 4. OFFICIAL CBT "QUESTION STATUS SUMMARY" TABLE ─── */}
      {/* (Directly reproduces the 5-status categories from User's Screenshot 2 & 3) */}
      <div className="trs-summary-table-card">
        <div className="trs-card-title">
          <ShieldCheck size={18} color="#16a34a" />
          <span>Official Question Status Summary</span>
        </div>
        <p className="trs-card-sub">
          Summary of candidate responses recorded during the Computer-Based Examination:
        </p>

        <div className="trs-qsummary-list">
          
          {/* Row 1: Answered */}
          <div className="trs-qs-row">
            <div className="trs-qs-left">
              <div className="trs-sbadge answered">1</div>
              <div className="trs-qs-text">
                <strong className="trs-qs-name">Answered</strong>
                <span className="trs-qs-desc">Questions attempted and marked for evaluation</span>
              </div>
            </div>
            <div className="trs-qs-count green">{statusSummary.answered}</div>
          </div>

          {/* Row 2: Answered and Marked for Review */}
          <div className="trs-qs-row">
            <div className="trs-qs-left">
              <div className="trs-sbadge answered-marked">2</div>
              <div className="trs-qs-text">
                <strong className="trs-qs-name">Answered and Marked for Review</strong>
                <span className="trs-qs-desc">Attempted with review flag (Considered for evaluation)</span>
              </div>
            </div>
            <div className="trs-qs-count purple">{statusSummary.answeredMarked}</div>
          </div>

          {/* Row 3: Visited but Not Answered */}
          <div className="trs-qs-row">
            <div className="trs-qs-left">
              <div className="trs-sbadge visited-unanswered">3</div>
              <div className="trs-qs-text">
                <strong className="trs-qs-name">Visited but Not Answered</strong>
                <span className="trs-qs-desc">Candidate opened but did not choose an option</span>
              </div>
            </div>
            <div className="trs-qs-count red">{statusSummary.visitedUnanswered}</div>
          </div>

          {/* Row 4: Marked for Review */}
          <div className="trs-qs-row">
            <div className="trs-qs-left">
              <div className="trs-sbadge marked">4</div>
              <div className="trs-qs-text">
                <strong className="trs-qs-name">Marked for Review (Unanswered)</strong>
                <span className="trs-qs-desc">Flagged for review without selecting an answer</span>
              </div>
            </div>
            <div className="trs-qs-count violet">{statusSummary.marked}</div>
          </div>

          {/* Row 5: Not Visited */}
          <div className="trs-qs-row">
            <div className="trs-qs-left">
              <div className="trs-sbadge not-visited">5</div>
              <div className="trs-qs-text">
                <strong className="trs-qs-name">Not Visited</strong>
                <span className="trs-qs-desc">Questions candidate did not open during the exam</span>
              </div>
            </div>
            <div className="trs-qs-count gray">{statusSummary.notVisited}</div>
          </div>

          {/* Total Row */}
          <div className="trs-qs-total-row">
            <span>Total Questions in Test</span>
            <span className="trs-total-num">{statusSummary.total}</span>
          </div>

        </div>

        <div className="trs-rule-callout">
          <ShieldCheck size={16} />
          <span>
            <strong>Official Evaluation Standard:</strong> As specified in test instructions, only questions in category <strong>1 (Answered)</strong> and <strong>2 (Answered and Marked for Review)</strong> were evaluated. Negative marking of <strong>-0.33 Marks (-1/3)</strong> was applied for each incorrect response.
          </span>
        </div>
      </div>

      {/* ─── 5. COMPUTER ADAPTIVE TESTING (CAT) TELEMETRY ─── */}
      {catTelemetry && (
        <div className="trs-cat-card">
          <div className="trs-card-title">
            <TrendingUp size={18} color="#7c3aed" />
            <span>Computer Adaptive Testing (CAT) Telemetry</span>
          </div>

          <div className="trs-cat-grid">
            <div className="trs-cat-item">
              <span className="trs-cat-label">Candidate Ability (θ Theta)</span>
              <span className="trs-cat-val" style={{ color: catTelemetry.abilityTheta >= 0 ? '#16a34a' : '#dc2626' }}>
                {catTelemetry.abilityTheta >= 0 ? `+${catTelemetry.abilityTheta}` : catTelemetry.abilityTheta}
              </span>
            </div>
            <div className="trs-cat-item">
              <span className="trs-cat-label">Final Difficulty Tier Reached</span>
              <span className="trs-cat-val purple">
                {catTelemetry.finalDifficultyName || `Level ${catTelemetry.finalDifficultyLevel || 2}`}
              </span>
            </div>
            <div className="trs-cat-item full">
              <span className="trs-cat-label">Passing Standard Decision</span>
              <span className="trs-cat-val">
                {catTelemetry.catDecision || (catTelemetry.abilityTheta >= 0.20 ? 'Above Passing Standard (Met Criteria)' : 'Below Passing Standard')}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ─── 6. TOPIC PERFORMANCE BREAKDOWN ─── */}
      {result.topicPerformance?.length > 0 && (
        <div className="trs-topics-card">
          <div className="trs-card-title">
            <BarChart3 size={18} color="#0284c7" />
            <span>Subject & Topic Wise Performance</span>
          </div>
          <div className="trs-topics-list">
            {result.topicPerformance.map((t, i) => (
              <div className="trs-topic-row" key={i}>
                <span className="trs-topic-icon">{topicIcons[t.topic] || <BookOpen size={16} color="#0284c7" />}</span>
                <span className="trs-topic-name">{t.topic}</span>
                <span className="trs-topic-score">{t.correctAnswers}/{t.totalQuestions} Correct</span>
                <div className="trs-topic-bar-wrap">
                  <div className="trs-topic-bar" style={{ width: `${t.accuracy}%`, background: t.accuracy >= 70 ? '#16a34a' : t.accuracy >= 50 ? '#f59e0b' : '#dc2626' }} />
                </div>
                <span className="trs-topic-pct" style={{ color: t.accuracy >= 70 ? '#16a34a' : t.accuracy >= 50 ? '#f59e0b' : '#dc2626' }}>
                  {t.accuracy}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── 7. AI CLINICAL FEEDBACK & SUGGESTIONS ─── */}
      {result.aiSuggestion && (
        <div className="trs-ai-card">
          <div className="trs-ai-header">
            <Brain size={18} color="#7c3aed" />
            <span>AI Examination Insight & Clinical Recommendation</span>
          </div>
          <p className="trs-ai-text">{result.aiSuggestion}</p>
        </div>
      )}

      {/* ─── 8. ACTIONS ─── */}
      <div className="trs-action-row">
        <Link to={testId ? `/test/${testId}/take` : '/tests'} className="trs-btn trs-btn-primary">
          <RotateCcw size={16} /> Retake Test
        </Link>
        <Link to="/dashboard" className="trs-btn trs-btn-outline">
          <BarChart3 size={16} /> Student Dashboard
        </Link>
      </div>

    </div>
  );
}
