import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ArrowRight, Sparkles, Target, Activity, FileText, BrainCircuit, RefreshCw, CheckCircle2 } from 'lucide-react';
import { getInsights, generateAI } from '../services/api';
import { Line, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Tooltip, Filler, RadialLinearScale, RadarController
} from 'chart.js';
import './StudentAIInsights.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, RadialLinearScale, RadarController);

export default function AIInsights() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('All Topics');

  useEffect(() => {
    fetchInsightsData();
  }, []);

  const fetchInsightsData = async () => {
    setLoading(true);
    try {
      const res = await getInsights();
      setData(res.data);
    } catch (err) {
      console.error('Error fetching insights:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateFreshAnalysis = async () => {
    setGenerating(true);
    try {
      await generateAI();
      await fetchInsightsData();
    } catch (err) {
      console.error('AI Generation error:', err);
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: 60, textAlign: 'center', color: '#64748b' }}>
        <RefreshCw className="animate-spin" size={32} style={{ marginBottom: 12, color: '#8b5cf6' }} />
        <div style={{ fontSize: 16, fontWeight: 600 }}>Analyzing Learning Behavior & Neural Models...</div>
      </div>
    );
  }

  const learningScore = data?.learningScore || 78;
  const conceptMastery = data?.conceptMastery || 68;
  const predictedScore = data?.predictedScore || 186;

  const radarData = {
    labels: ['Medical Surgical', 'Pharmacology', 'Anatomy', 'Community Health', 'Mental Health', 'Pediatrics'],
    datasets: [
      {
        label: 'You',
        data: [85, conceptMastery, 55, 72, 60, 68],
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        borderColor: '#4f46e5',
        borderWidth: 2,
        pointBackgroundColor: '#4f46e5',
        pointRadius: 3,
      },
      {
        label: 'Top 10% Learners',
        data: [90, 85, 80, 85, 75, 80],
        backgroundColor: 'transparent',
        borderColor: '#94a3b8',
        borderWidth: 1,
        borderDash: [5, 5],
        pointRadius: 0,
      }
    ]
  };

  const radarOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { r: { angleLines: { color: '#f1f5f9' }, grid: { color: '#f1f5f9' }, pointLabels: { font: { size: 9 }, color: '#64748b' }, ticks: { display: false, min: 0, max: 100 } } }
  };

  const lineData = {
    labels: ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5', 'Predicted'],
    datasets: [
      {
        label: 'Actual Score',
        data: [120, 145, 130, 155, 168, null],
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79,70,229,0.0)',
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#4f46e5',
        pointBorderWidth: 2,
      },
      {
        label: 'AI Predicted NORCET',
        data: [null, null, null, null, 168, predictedScore],
        borderColor: '#8b5cf6',
        borderDash: [5, 5],
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: '#8b5cf6',
      }
    ]
  };

  const lineOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { min: 0, max: 200, ticks: { font: { size: 10 } }, grid: { color: '#f1f5f9' } },
      x: { grid: { display: false }, ticks: { font: { size: 10 } } }
    }
  };

  const TOPICS_DATA = [
    { icon: '💊', bg: '#f0fdf4', topic: 'Pharmacology', mastery: '85%', trend: 'up', trendColor: '#10b981', acc: '82%', rec: 'Excellent! Maintain consistency.' },
    { icon: '🏥', bg: '#eff6ff', topic: 'Medical Surgical Nursing', mastery: '80%', trend: 'up', trendColor: '#10b981', acc: '76%', rec: 'Great! Solve more clinical scenario MCQs.' },
    { icon: '🌍', bg: '#fdf4ff', topic: 'Community Health Nursing', mastery: '72%', trend: 'up', trendColor: '#10b981', acc: '68%', rec: 'Good progress. Revise epidemiology ratios.' },
    { icon: '👶', bg: '#f0fdfa', topic: 'Child Health Nursing', mastery: '60%', trend: 'flat', trendColor: '#94a3b8', acc: '62%', rec: 'Focus on pediatric dosages and milestones.' },
    { icon: '🧠', bg: '#fdf2f8', topic: 'Mental Health Nursing', mastery: '55%', trend: 'down', trendColor: '#ef4444', acc: '58%', rec: 'Needs improvement. Practice psychiatric MCQs.' },
    { icon: '🫀', bg: '#fff7ed', topic: 'Anatomy & Physiology', mastery: '45%', trend: 'down', trendColor: '#ef4444', acc: '50%', rec: 'Weak area. Watch anatomical 3D lectures.' },
  ];

  const filteredTopics = activeTab === 'All Topics' 
    ? TOPICS_DATA 
    : activeTab === 'Strong Topics' 
    ? TOPICS_DATA.filter(t => parseInt(t.mastery) >= 70) 
    : TOPICS_DATA.filter(t => parseInt(t.mastery) < 70);

  return (
    <div className="ai-ins-container">
      {/* Header */}
      <div className="ai-ins-header">
        <div className="ai-ins-header-left">
          <h1>AI Insights & Learning Analytics <Sparkles size={24} color="#8b5cf6" /></h1>
          <p>Smart neural analysis of your exam readiness and topic accuracy.</p>
        </div>
        <button 
          onClick={handleGenerateFreshAnalysis} 
          disabled={generating}
          className="ai-ins-month-btn"
          style={{ background: '#4f46e5', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}
        >
          {generating ? <RefreshCw className="animate-spin" size={14}/> : <Sparkles size={14}/>}
          {generating ? 'Analyzing...' : 'Refresh AI Analysis'}
        </button>
      </div>

      {/* Top Metrics Strip */}
      <div className="ai-ins-metrics">
        {/* Learning Score */}
        <div className="ai-ins-metric-card" style={{ padding: '16px 20px' }}>
          <div className="ai-ins-metric-title">Learning Score</div>
          <div className="ai-ins-metric-body" style={{ justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: 60, height: 60 }}>
              <svg viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f1f5f9" strokeWidth="3"/>
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeDasharray={`${learningScore} ${100 - learningScore}`} strokeLinecap="round" transform="rotate(-90 18 18)"/>
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Activity size={20} color="#8b5cf6"/>
              </div>
            </div>
            <div>
              <div className="ai-ins-m-val">{learningScore}<span style={{ fontSize: 14, color: '#94a3b8' }}>/100</span></div>
              <div className="ai-ins-m-sub">Strong NORCET Prep!</div>
            </div>
          </div>
          <div className="ai-ins-m-trend"><span style={{ color: '#10b981' }}>↑ 12%</span> from last month</div>
        </div>

        {/* Concept Mastery */}
        <div className="ai-ins-metric-card" style={{ padding: '16px 20px' }}>
          <div className="ai-ins-metric-title">Concept Mastery</div>
          <div className="ai-ins-metric-body" style={{ justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: 60, height: 60 }}>
              <svg viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f1f5f9" strokeWidth="3"/>
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray={`${conceptMastery} ${100 - conceptMastery}`} strokeLinecap="round" transform="rotate(-90 18 18)"/>
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Target size={20} color="#10b981"/>
              </div>
            </div>
            <div>
              <div className="ai-ins-m-val">{conceptMastery}%</div>
              <div className="ai-ins-m-sub">Strong in 15 topics</div>
            </div>
          </div>
          <div className="ai-ins-m-trend" style={{ color: '#64748b' }}><div style={{ width: 10, height: 3, background: '#ef4444', borderRadius: 2 }}></div> Needs work in 4 topics</div>
        </div>

        {/* Predicted NORCET Score */}
        <div className="ai-ins-metric-card" style={{ padding: '16px 20px' }}>
          <div className="ai-ins-metric-title">Predicted NORCET Score</div>
          <div className="ai-ins-metric-body" style={{ justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: 60, height: 60 }}>
              <svg viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#eff6ff" strokeWidth="3"/>
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="93 7" strokeLinecap="round" transform="rotate(-90 18 18)"/>
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={20} color="#3b82f6"/>
              </div>
            </div>
            <div>
              <div className="ai-ins-m-val">{predictedScore}<span style={{ fontSize: 14, color: '#94a3b8' }}>/200</span></div>
              <div className="ai-ins-m-sub">Excellent Potential</div>
            </div>
          </div>
          <div className="ai-ins-m-trend" style={{ color: '#64748b' }}>Top 18% of aspirants</div>
        </div>
      </div>

      {/* Main Grid: Radar Chart | Line Chart */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, margin: '24px 0' }}>
        <div className="ai-ins-card">
          <div className="ai-ins-card-title">Subject Mastery Radar 🎯</div>
          <div style={{ height: 260 }}>
            <Radar data={radarData} options={radarOptions} />
          </div>
        </div>

        <div className="ai-ins-card">
          <div className="ai-ins-card-title">Score Progression & AI Target Prediction 📈</div>
          <div style={{ height: 260 }}>
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>
      </div>

      {/* Topic Mastery List */}
      <div className="ai-ins-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div className="ai-ins-card-title" style={{ margin: 0 }}>Topic-wise AI Evaluation</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['All Topics', 'Strong Topics', 'Weak Topics'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 6,
                  border: '1px solid #e2e8f0',
                  background: activeTab === tab ? '#4f46e5' : '#fff',
                  color: activeTab === tab ? '#fff' : '#475569',
                  cursor: 'pointer',
                  fontSize: 12,
                  fontWeight: 600
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {filteredTopics.map((top, idx) => (
            <div key={idx} style={{ padding: 16, border: '1px solid #e2e8f0', borderRadius: 12, background: top.bg }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 24 }}>{top.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>{top.topic}</div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>Mastery: {top.mastery} | Accuracy: {top.acc}</div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: '#334155', lineHeight: 1.4, marginTop: 8 }}>
                {top.rec}
              </div>
              <button
                onClick={() => navigate('/tests')}
                style={{ marginTop: 12, width: '100%', padding: '6px 0', border: '1px solid #cbd5e1', background: '#fff', borderRadius: 6, color: '#4f46e5', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}
              >
                Practice Questions →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
