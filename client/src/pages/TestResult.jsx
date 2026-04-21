import { useLocation, Link } from 'react-router-dom';
import { Award, Trophy, Heart, BookOpen, CheckCircle2, XCircle, Lightbulb, BarChart3, ClipboardList } from 'lucide-react';
import TestResultSummary from '../components/tests/TestResultSummary';

function TestResult() {
  const { state } = useLocation();

  if (!state?.result) {
    return (
      <div className="page-container">
        <div className="result-page" style={{ textAlign: 'center', paddingTop: '100px' }}>
          <h2>No result data found</h2>
          <Link to="/tests" className="btn-primary" style={{ marginTop: '20px', display: 'inline-flex' }}>← Back to Tests</Link>
        </div>
      </div>
    );
  }

  const { result, correctAnswers, test } = state;

  const getScoreIcon = (score) => {
    if (score >= 80) return <Trophy size={32} color="var(--gold)" />;
    if (score >= 60) return <Award size={32} color="var(--success)" />;
    if (score >= 40) return <Heart size={32} color="var(--crimson)" />;
    return <BookOpen size={32} color="var(--navy)" />;
  };

  return (
    <div className="page-container">
      <div className="result-page">
        {/* Summary Card — Feature 2 */}
        <TestResultSummary result={result} testId={test?._id} />

        {/* Answer Review */}
        {test?.questions && correctAnswers && (
          <div style={{ background: 'var(--white)', borderRadius: '20px', padding: '28px', border: '1px solid var(--light-gray)', marginBottom: '28px', marginTop: '28px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--navy)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ClipboardList size={18} color="var(--navy)" /> Answer Review
            </h3>
            {test.questions.map((q, i) => {
              const userAnswer = result.answers[i];
              const correct = correctAnswers.find(ca => ca.questionId === q._id);
              const isCorrect = userAnswer?.isCorrect;
              return (
                <div key={i} style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--light-gray)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    {isCorrect ? <CheckCircle2 size={18} color="var(--success)" /> : <XCircle size={18} color="var(--crimson)" />}
                    <strong style={{ color: 'var(--navy)', fontSize: '14px' }}>Q{i + 1}.</strong>
                    <span style={{ fontSize: '14px', color: 'var(--dark)' }}>{q.questionText}</span>
                  </div>
                  <div style={{ marginLeft: '34px' }}>
                    {q.options.map((opt, j) => (
                      <div key={j} style={{
                        padding: '8px 12px', marginBottom: '4px', borderRadius: '8px', fontSize: '13px',
                        background: j === correct?.correctAnswer ? 'rgba(39,174,96,0.1)' : (j === userAnswer?.selectedAnswer && !isCorrect) ? 'rgba(192,57,43,0.08)' : 'transparent',
                        color: j === correct?.correctAnswer ? 'var(--success)' : (j === userAnswer?.selectedAnswer && !isCorrect) ? 'var(--crimson)' : 'var(--dark)',
                        fontWeight: j === correct?.correctAnswer ? '600' : '400'
                      }}>
                        {String.fromCharCode(65 + j)}. {opt} {j === correct?.correctAnswer && <CheckCircle2 size={12} color="var(--success)" style={{ verticalAlign: 'middle' }} />} {j === userAnswer?.selectedAnswer && !isCorrect && <XCircle size={12} color="var(--crimson)" style={{ verticalAlign: 'middle' }} />}
                      </div>
                    ))}
                    {correct?.explanation && (
                      <div style={{ background: 'var(--off-white)', padding: '10px 14px', borderRadius: '8px', marginTop: '8px', fontSize: '13px', color: 'var(--gray)', lineHeight: '1.5', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                        <Lightbulb size={14} color="var(--gold)" style={{ marginTop: 2, flexShrink: 0 }} /> {correct.explanation}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link to="/dashboard" className="btn-primary"><BarChart3 size={16} /> View Dashboard</Link>
          <Link to="/tests" className="btn-outline"><ClipboardList size={16} /> Take Another Test</Link>
        </div>
      </div>
    </div>
  );
}

export default TestResult;
