import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTest, submitTest } from '../services/api';
import { Timer } from 'lucide-react';
import AskAIButton from '../components/tests/AskAIButton';

function TakeTest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const startTime = useRef(Date.now());
  const qStartTime = useRef(Date.now());

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const { data } = await getTest(id);
        setTest(data);
        setTimeLeft(data.duration * 60);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to load test. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };
    fetchTest();
  }, [id]);

  // Auto-submit when timer runs out (no confirm dialog needed)
  const autoSubmit = async () => {
    if (submitting || !test) return;
    setSubmitting(true);
    const totalTimeTaken = Math.round((Date.now() - startTime.current) / 1000);
    const formattedAnswers = test.questions.map((q, i) => ({
      questionId: q._id,
      selectedAnswer: answers[i]?.selectedAnswer ?? -1,
      timeTaken: answers[i]?.timeTaken || 0
    }));
    try {
      const { data } = await submitTest(id, { answers: formattedAnswers, timeTaken: totalTimeTaken });
      navigate(`/result/${data.result._id}`, { state: { result: data.result, correctAnswers: data.correctAnswers, test } });
    } catch (err) {
      alert('Failed to submit test. Please try again.');
      setSubmitting(false);
    }
  };

  // Timer — dependency on `timeLeft` (not the boolean `timeLeft > 0`)
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(timer); autoSubmit(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const selectAnswer = (qIndex, optIndex) => {
    const now = Date.now();
    const timeTaken = Math.round((now - qStartTime.current) / 1000);
    setAnswers(prev => ({
      ...prev,
      [qIndex]: { selectedAnswer: optIndex, timeTaken }
    }));
  };

  const goNext = () => {
    qStartTime.current = Date.now();
    setCurrentQ(prev => Math.min(prev + 1, test.questions.length - 1));
  };

  const goPrev = () => {
    qStartTime.current = Date.now();
    setCurrentQ(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (submitting || !test) return;
    const answered = Object.keys(answers).length;
    const confirmed = window.confirm(`You have answered ${answered}/${test.questions.length} questions. Submit now?`);
    if (!confirmed) return;
    setSubmitting(true);

    const totalTimeTaken = Math.round((Date.now() - startTime.current) / 1000);
    const formattedAnswers = test.questions.map((q, i) => ({
      questionId: q._id,
      selectedAnswer: answers[i]?.selectedAnswer ?? -1,
      timeTaken: answers[i]?.timeTaken || 0
    }));

    try {
      const { data } = await submitTest(id, { answers: formattedAnswers, timeTaken: totalTimeTaken });
      navigate(`/result/${data.result._id}`, { state: { result: data.result, correctAnswers: data.correctAnswers, test } });
    } catch (err) {
      alert('Failed to submit test. Please try again.');
      setSubmitting(false);
    }
  };

  if (loading) return <div className="page-container"><div className="loading"><div className="spinner"></div></div></div>;
  
  if (error) {
    const isAuthError = error.includes('Session expired') || error.includes('token failed') || error.includes('not found in DB');
    
    const handleReLogin = () => {
      localStorage.removeItem('nursingUser');
      window.location.href = '/login';
    };

    return (
      <div className="page-container">
        <div style={{padding: '60px', textAlign: 'center'}}>
          <p style={{fontSize: '48px', marginBottom: '20px'}}>⚠️</p>
          <h2 style={{color: 'var(--navy)', marginBottom: '12px'}}>Authentication Required</h2>
          <p style={{color: 'var(--gray)', marginBottom: '24px'}}>{error}</p>
          {isAuthError ? (
            <button className="btn-primary" onClick={handleReLogin}>Login Again</button>
          ) : (
            <button className="btn-primary" onClick={() => window.location.reload()}>Try Again</button>
          )}
        </div>
      </div>
    );
  }

  if (!test) return <div className="page-container"><p style={{padding: '40px', textAlign: 'center'}}>Test not found</p></div>;

  const q = test.questions[currentQ];
  const progress = ((currentQ + 1) / test.questions.length) * 100;

  return (
    <div className="page-container">
      <div className="test-page">
        <div className="test-topbar">
          <h2>{test.title}</h2>
          <div className="test-timer-live"><Timer size={16} /> {formatTime(timeLeft)}</div>
        </div>

        <div className="test-progress-bar">
          <div className="test-progress-fill" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="question-card">
          <div className="question-num">Question {currentQ + 1} of {test.questions.length}</div>
          <div className="question-text">{q.questionText}</div>
          <div className="option-list">
            {q.options.map((opt, i) => (
              <button key={i} className={`option-btn ${answers[currentQ]?.selectedAnswer === i ? 'selected' : ''}`} onClick={() => selectAnswer(currentQ, i)}>
                <div className="option-letter">{String.fromCharCode(65 + i)}</div>
                {opt}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
            <AskAIButton question={q.questionText} options={q.options} correctAnswer={q.correctAnswer} />
          </div>
        </div>

        <div className="test-nav-btns">
          <button className="test-nav-btn prev" onClick={goPrev} disabled={currentQ === 0}>← Previous</button>
          {currentQ < test.questions.length - 1 ? (
            <button className="test-nav-btn next" onClick={goNext}>Next →</button>
          ) : (
            <button className="test-nav-btn submit" onClick={handleSubmit} disabled={submitting}>
              {submitting ? 'Submitting...' : '✓ Submit Test'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TakeTest;
