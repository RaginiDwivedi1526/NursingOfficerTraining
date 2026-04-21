import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getDashboard, generateAI } from '../services/api';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Activity, ClipboardList, CheckCircle2, XCircle, Brain, BookOpen, Lightbulb, Play, NotebookPen, FlaskConical, RotateCcw, Target } from 'lucide-react';
import StatsStrip from '../components/dashboard/StatsStrip';
import WeeklyProgressChart from '../components/dashboard/WeeklyProgressChart';
import SmartTestRecommendation from '../components/dashboard/SmartTestRecommendation';
import StudyPlan from '../components/dashboard/StudyPlan';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => { fetchDashboard(); }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboard();
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAI = async () => {
    setAiLoading(true);
    try {
      await generateAI();
      await fetchDashboard();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to generate AI analysis');
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) return <div className="page-container"><div className="loading"><div className="spinner"></div></div></div>;

  const getBarColor = (accuracy) => {
    if (accuracy >= 70) return 'green';
    if (accuracy >= 50) return 'yellow';
    return 'red';
  };

  const ai = data?.aiAssessment;
  const tipIcons = [<BookOpen size={16} />, <NotebookPen size={16} />, <Play size={16} />, <FlaskConical size={16} />, <RotateCcw size={16} />];

  return (
    <div className="page-container">
      <div className="dashboard">
        {/* Header */}
        <div className="dash-header">
          <div>
            <h1><Activity size={24} color="var(--navy)" style={{ verticalAlign: 'middle', marginRight: 8 }} />My Performance Analytics</h1>
            <p className="subtitle">Welcome back, {user?.name} • {user?.batch || 'Batch 2025'}</p>
          </div>
          <Link to="/tests" className="btn-outline"><ClipboardList size={16} /> Take a Test</Link>
        </div>

        {/* Stats Strip — Feature 6 */}
        <StatsStrip />

        {/* Performance Layout */}
        {data?.totalTests > 0 && (
          <div className="perf-layout">
            {/* Score Ring */}
            <div className="score-ring-card">
              <h3>Overall Performance</h3>
              <div className="ring-wrap">
                <svg width="160" height="160" viewBox="0 0 160 160">
                  <circle cx="80" cy="80" r="65" stroke="rgba(255,255,255,0.08)" strokeWidth="12" fill="none"/>
                  <circle cx="80" cy="80" r="65" stroke="url(#dashRingGrad)" strokeWidth="12" fill="none"
                    strokeDasharray="408.4" strokeDashoffset={408.4 - (408.4 * (data?.overallScore || 0) / 100)} strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="dashRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#c0392b"/>
                      <stop offset="100%" stopColor="#f39c12"/>
                    </linearGradient>
                  </defs>
                </svg>
                <div className="ring-center">
                  <div className="ring-num">{data?.overallScore || 0}%</div>
                  <div className="ring-label">Overall Score</div>
                </div>
              </div>
              <div className="strong-weak">
                <div className="topic-strong"><CheckCircle2 size={12} /> Strong: {ai?.strongTopics?.length || 0}</div>
                <div className="topic-weak"><XCircle size={12} /> Weak: {ai?.weakTopics?.length || 0}</div>
              </div>
            </div>

            {/* Topic Bars */}
            <div className="topics-card">
              <h3><Activity size={18} color="var(--navy)" style={{ verticalAlign: 'middle', marginRight: 6 }} />Topic-wise Performance</h3>
              {data?.topicPerformance?.map((t, i) => (
                <div className="topic-row" key={i}>
                  <span className={`topic-label ${t.accuracy < 60 ? 'weak' : ''}`}>
                    {t.topic} {t.accuracy < 60 ? <XCircle size={12} color="var(--crimson)" /> : t.accuracy >= 70 ? <CheckCircle2 size={12} color="var(--success)" /> : ''}
                  </span>
                  <div className="topic-bar-bg">
                    <div className={`topic-bar ${getBarColor(t.accuracy)}`} style={{ width: `${t.accuracy}%` }}></div>
                  </div>
                  <span className={`topic-pct ${t.accuracy < 60 ? 'weak' : ''}`}>{t.accuracy}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Suggestion Box */}
        <div className="ai-box">
          <div className="ai-box-content">
            <div className="ai-box-header">
              <span><Brain size={24} color="var(--gold)" className="brain-spin-icon" /></span>
              <span>AI Performance Coach</span>
            </div>
            {ai ? (
              <>
                <p className="ai-text">{ai.aiSuggestion}</p>
                <div className="ai-tips">
                  {ai.improvementTips?.map((tip, i) => (
                    <div className="ai-tip" key={i}>
                      <span className="ai-tip-icon">{tipIcons[i % 5]}</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="ai-text">Take a test to get personalized AI analysis of your performance. Our AI will detect your weak areas and suggest an improvement plan.</p>
            )}
            <div style={{ marginTop: '20px' }}>
              <button className="generate-ai-btn" onClick={handleGenerateAI} disabled={aiLoading || data?.totalTests === 0}>
                {aiLoading ? 'Analyzing...' : <><Brain size={16} /> Generate AI Analysis</>}
              </button>
            </div>
          </div>
        </div>

        {/* Weekly Progress Chart — Feature 1 */}
        <WeeklyProgressChart />

        {/* Smart Test Recommendations — Feature 3 */}
        <SmartTestRecommendation />

        {/* Study Plan — Feature 4 */}
        <StudyPlan />

        {/* Empty State */}
        {data?.totalTests === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--white)', borderRadius: '20px', border: '1px solid var(--light-gray)' }}>
            <ClipboardList size={64} color="var(--navy)" style={{ marginBottom: 16 }} />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--navy)', marginBottom: '8px' }}>No Tests Attempted Yet</h3>
            <p style={{ color: 'var(--gray)', marginBottom: '24px' }}>Start your first test to see your performance analytics and AI recommendations.</p>
            <Link to="/tests" className="btn-primary"><Target size={16} /> Take Your First Test</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
