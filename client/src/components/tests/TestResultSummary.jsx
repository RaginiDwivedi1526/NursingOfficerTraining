import { useState, useEffect, useRef } from 'react';
import { Award, CheckCircle2, XCircle, Timer, ClipboardList, Brain, BarChart3, RotateCcw, Microscope, Pill, HeartPulse, Stethoscope, BookOpen, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import './TestResultSummary.css';

const topicIcons = {
  'Microbiology': <Microscope size={16} color="#059669" />,
  'Pharmacology': <Pill size={16} color="#0284c7" />,
  'Anatomy': <HeartPulse size={16} color="var(--crimson)" />,
  'Nursing Procedures': <Stethoscope size={16} color="var(--navy)" />,
};

function TestResultSummary({ result, testId }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const scoreRef = useRef(null);

  const score = result?.score || 0;
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current >= score) { setAnimatedScore(score); clearInterval(interval); }
      else setAnimatedScore(current);
    }, 15);
    return () => clearInterval(interval);
  }, [score]);

  if (!result) return null;

  const totalTime = result.timeTaken ? Math.round(result.timeTaken / 60) : 0;
  const accColor = (acc) => acc >= 70 ? 'var(--success)' : acc >= 50 ? 'var(--gold)' : 'var(--crimson)';
  const accIcon = (acc) => acc >= 70 ? <CheckCircle2 size={14} color="var(--success)" /> : acc >= 50 ? <AlertTriangle size={14} color="var(--gold)" /> : <XCircle size={14} color="var(--crimson)" />;

  return (
    <div className="trs-card">
      <div className="trs-header">
        <h2>TEST COMPLETE</h2>
        <Award size={48} color="var(--gold)" />
      </div>

      <div className="trs-ring-wrap" ref={scoreRef}>
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="45" stroke="var(--light-gray)" strokeWidth="10" fill="none" />
          <circle cx="60" cy="60" r="45" stroke="url(#trsGrad)" strokeWidth="10" fill="none"
            strokeDasharray={circumference} strokeDashoffset={offset}
            strokeLinecap="round" style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 0.5s ease' }} />
          <defs>
            <linearGradient id="trsGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--crimson)" />
              <stop offset="100%" stopColor="var(--gold)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="trs-ring-center">
          <div className="trs-ring-num">{animatedScore}%</div>
          <div className="trs-ring-label">Overall Score</div>
        </div>
      </div>

      <div className="trs-stats">
        <div className="trs-stat"><CheckCircle2 size={20} color="var(--success)" /><span className="trs-stat-num">{result.correctAnswers}</span><span className="trs-stat-label">Correct</span></div>
        <div className="trs-stat"><XCircle size={20} color="var(--crimson)" /><span className="trs-stat-num">{result.incorrectAnswers}</span><span className="trs-stat-label">Wrong</span></div>
        <div className="trs-stat"><ClipboardList size={20} color="var(--gray)" /><span className="trs-stat-num">{result.unattemptedAnswers || 0}</span><span className="trs-stat-label">Skipped</span></div>
        <div className="trs-stat"><Timer size={20} color="var(--gold)" /><span className="trs-stat-num">{totalTime} min</span><span className="trs-stat-label">Time</span></div>
      </div>

      {result.negativeMarksDeducted > 0 && (
        <div style={{ background: 'rgba(192, 57, 43, 0.1)', border: '1px solid var(--crimson)', borderRadius: '12px', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', marginTop: '-12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--crimson)', fontWeight: '600' }}>
            <AlertTriangle size={18} /> Negative Marking Deducted (-1/3 per wrong answer)
          </div>
          <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--crimson)' }}>
            -{result.negativeMarksDeducted} Marks
          </div>
        </div>
      )}

      {result.topicPerformance?.length > 0 && (
        <div className="trs-topics">
          <h3>TOPIC BREAKDOWN</h3>
          {result.topicPerformance.map((t, i) => (
            <div className="trs-topic-row" key={i}>
              <span className="trs-topic-icon">{topicIcons[t.topic] || <BookOpen size={16} color="var(--navy)" />}</span>
              <span className="trs-topic-name">{t.topic}</span>
              <span className="trs-topic-score">{t.correctAnswers}/{t.totalQuestions}</span>
              <span className="trs-topic-pct" style={{ color: accColor(t.accuracy) }}>{t.accuracy}%</span>
              {accIcon(t.accuracy)}
            </div>
          ))}
        </div>
      )}

      {result.aiSuggestion && (
        <div className="trs-ai-box">
          <div className="trs-ai-header">
            <Brain size={18} className="brain-spin-icon" color="var(--purple)" />
            <span>AI Analysis</span>
          </div>
          <p>{result.aiSuggestion}</p>
        </div>
      )}

      <div className="trs-actions">
        {testId && <Link to={`/test/${testId}`} className="trs-action-btn"><RotateCcw size={16} /> Retry Test</Link>}
        <Link to="/dashboard" className="trs-action-btn trs-action-secondary"><BarChart3 size={16} /> Full Analytics</Link>
      </div>
    </div>
  );
}

export default TestResultSummary;
