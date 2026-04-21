import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTests } from '../services/api';

function TestList() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const params = filter !== 'all' ? { topic: filter } : {};
        const { data } = await getTests(params);
        setTests(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, [filter]);

  const topics = ['all', 'Anatomy', 'Microbiology', 'Pharmacology', 'Nursing Procedures'];
  const difficultyEmoji = { easy: '🟢', medium: '🟡', hard: '🔴' };

  if (loading) return <div className="page-container"><div className="loading"><div className="spinner"></div></div></div>;

  return (
    <div className="page-container">
      <div className="test-list-page">
        <h1>📝 Test Series</h1>
        <p className="subtitle">Choose a test to practice. Each test is timed and auto-scored with detailed explanations.</p>

        <div className="test-filters">
          {topics.map(t => (
            <button key={t} className={`filter-btn ${filter === t ? 'active' : ''}`} onClick={() => setFilter(t)}>
              {t === 'all' ? 'All Topics' : t}
            </button>
          ))}
        </div>

        <div className="tests-grid">
          {tests.map(test => (
            <div className="test-card" key={test._id}>
              <div className="test-card-header">
                <h3>{test.title}</h3>
                {test.isFree ? <span className="free-badge">FREE</span> : <span className="premium-badge">PREMIUM</span>}
              </div>
              <p>{test.description}</p>
              <div className="test-card-meta">
                <span className="test-meta-pill">📚 {test.totalQuestions} Qs</span>
                <span className="test-meta-pill">⏱ {test.duration} min</span>
                <span className="test-meta-pill">{difficultyEmoji[test.difficulty]} {test.difficulty}</span>
                <span className="test-meta-pill">🏷️ {test.topic}</span>
              </div>
              <button className="test-card-btn" onClick={() => navigate(`/test/${test._id}`)}>
                Start Test →
              </button>
            </div>
          ))}
        </div>

        {tests.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--gray)' }}>
            <p style={{ fontSize: '48px', marginBottom: '12px' }}>📭</p>
            <p>No tests found for this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TestList;
