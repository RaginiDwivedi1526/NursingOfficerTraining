import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler } from 'chart.js';
import { ChevronDown, SlidersHorizontal, ChevronRight, MoreVertical, RefreshCw, ArrowRight, BookOpen } from 'lucide-react';
import { getMistakes, generateTest } from '../services/api';
import './StudentMistakes.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

export default function MyMistakes() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All Mistakes');
  const [practicing, setPracticing] = useState(false);

  useEffect(() => {
    fetchMistakesData();
  }, []);

  const fetchMistakesData = async () => {
    setLoading(true);
    try {
      const res = await getMistakes();
      setData(res.data);
    } catch (err) {
      console.error('Error fetching mistakes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePracticeWeakArea = async (topic) => {
    if (practicing) return;
    setPracticing(true);
    try {
      const res = await generateTest({
        topic: topic || 'Weak Areas Practice',
        difficulty: 'medium',
        numberOfQuestions: 10
      });
      navigate(`/test/${res.data._id}`);
    } catch (err) {
      console.error(err);
      alert('Failed to generate weak area practice test');
    } finally {
      setPracticing(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: 60, textAlign: 'center', color: '#64748b' }}>
        <RefreshCw className="animate-spin" size={32} style={{ marginBottom: 12, color: '#ef4444' }} />
        <div style={{ fontSize: 16, fontWeight: 600 }}>Analyzing Question Mistakes & Weak Topics...</div>
      </div>
    );
  }

  const totalMistakes = data?.totalMistakes || 128;
  const weakTopics = data?.weakTopics?.length > 0 
    ? data.weakTopics 
    : [
        { topic: 'Drug Calculation', mistakes: 14, accuracy: 45 },
        { topic: 'Acid Base Balance', mistakes: 12, accuracy: 50 },
        { topic: 'Fluid & Electrolyte Balance', mistakes: 10, accuracy: 55 },
        { topic: 'Nursing Process', mistakes: 9, accuracy: 58 },
        { topic: 'Oxygen Therapy', mistakes: 8, accuracy: 60 }
      ];

  const trendData = {
    labels: ['1 May', '2 May', '3 May', '4 May', '5 May', '6 May', 'Today'],
    datasets: [{
      label: 'Mistakes',
      data: [18, 24, 20, 32, 26, 22, 18],
      borderColor: '#ef4444',
      backgroundColor: 'rgba(239,68,68,0.06)',
      tension: 0.4,
      fill: true,
      pointRadius: 5,
      pointBackgroundColor: '#fff',
      pointBorderColor: '#ef4444',
      pointBorderWidth: 2,
    }]
  };

  const trendOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, ticks: { font: { size: 10 } }, grid: { color: '#f1f5f9' } },
      x: { grid: { display: false }, ticks: { font: { size: 10 } } }
    }
  };

  const QUESTIONS = [
    { icon: '🏥', iconBg: '#eff6ff', text: 'Q. A client with COPD is experiencing acute dyspnea...', test: 'Mock Test – 05', subject: 'Medical Surgical Nursing', topic: 'Respiratory Disorders', diff: 'Medium', diffClass: 'dt-medium', mistaken: 'Recent Test', correct: 'B' },
    { icon: '💊', iconBg: '#f0fdf4', text: 'Q. The primary action of furosemide is to...', test: 'Pharmacology Test – 02', subject: 'Pharmacology', topic: 'Diuretics', diff: 'Hard', diffClass: 'dt-hard', mistaken: 'Recent Test', correct: 'C' },
    { icon: '🫀', iconBg: '#fff7ed', text: 'Q. Which cranial nerve is responsible for facial sensations...', test: 'Anatomy Test – 03', subject: 'Anatomy & Physiology', topic: 'Cranial Nerves', diff: 'Medium', diffClass: 'dt-medium', mistaken: 'Recent Test', correct: 'D' },
    { icon: '👶', iconBg: '#f0fdfa', text: 'Q. The period of highest risk for falls in toddlers...', test: 'Child Health – 01', subject: 'Child Health Nursing', topic: 'Safety & Injury Prevention', diff: 'Easy', diffClass: 'dt-easy', mistaken: 'Recent Test', correct: 'A' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24, maxWidth: 1400, margin: '0 auto', paddingBottom: 40 }}>
      {/* LEFT */}
      <div>
        <div className="mist-header">
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0b1a30', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
              My Mistakes Tracker 📋
            </h1>
            <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>Analyze question mistakes, view explanations and improve your accuracy.</p>
          </div>
          <button className="mist-month-btn">This Month <ChevronDown size={12}/></button>
        </div>

        {/* Stats Strip */}
        <div className="mist-stats-strip">
          <div className="mist-stat-card">
            <div className="mist-sc-lbl">Total Mistakes</div>
            <div className="mist-sc-icon">📋</div>
            <div className="mist-sc-val">{totalMistakes}</div>
            <div className="mist-sc-sub">Questions</div>
          </div>
          <div className="mist-stat-card">
            <div className="mist-sc-lbl">Unresolved</div>
            <div className="mist-sc-icon">⚠️</div>
            <div className="mist-sc-val" style={{ color: '#ef4444' }}>{Math.round(totalMistakes * 0.6)}</div>
            <div className="mist-sc-sub">Needs Practice</div>
          </div>
          <div className="mist-stat-card">
            <div className="mist-sc-lbl">Resolved Mistakes</div>
            <div className="mist-sc-icon">✅</div>
            <div className="mist-sc-val" style={{ color: '#10b981' }}>{Math.round(totalMistakes * 0.4)}</div>
            <div className="mist-sc-sub">Mastered</div>
          </div>
          <div className="mist-stat-card">
            <div className="mist-sc-lbl">Avg. Time Lost</div>
            <div className="mist-sc-icon">⏱️</div>
            <div className="mist-sc-val">42s</div>
            <div className="mist-sc-sub">Per Question</div>
          </div>
        </div>

        {/* Main Grid: Trend | Weak Topics */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, margin: '24px 0' }}>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 20 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>Mistakes Trend Over Time</div>
            <div style={{ height: 160 }}>
              <Line data={trendData} options={trendOptions}/>
            </div>
          </div>

          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 20 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>Top Weak Topics</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {weakTopics.slice(0, 4).map((wt, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{wt.topic}</div>
                    <div style={{ fontSize: 11, color: '#ef4444' }}>{wt.mistakes || wt.count || 10} Mistakes</div>
                  </div>
                  <button 
                    onClick={() => handlePracticeWeakArea(wt.topic)}
                    disabled={practicing}
                    style={{ padding: '4px 12px', borderRadius: 6, background: '#ef4444', color: '#fff', border: 'none', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}
                  >
                    Practice
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mistakes List */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>Mistakes Log & Explanations</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['All Mistakes', 'Unresolved', 'Resolved'].map(t => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #e2e8f0', background: activeTab === t ? '#ef4444' : '#fff', color: activeTab === t ? '#fff' : '#475569', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {QUESTIONS.map((q, idx) => (
              <div key={idx} style={{ padding: 16, border: '1px solid #e2e8f0', borderRadius: 12, background: '#f8fafc' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 24 }}>{q.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: '#0f172a', marginBottom: 4 }}>{q.text}</div>
                    <div style={{ fontSize: 12, color: '#64748b', display: 'flex', gap: 12 }}>
                      <span>Subject: {q.subject}</span>
                      <span>Topic: {q.topic}</span>
                      <span style={{ color: '#ef4444', fontWeight: 600 }}>Correct Answer: {q.correct}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handlePracticeWeakArea(q.topic)}
                    style={{ padding: '6px 12px', borderRadius: 6, background: '#4f46e5', color: '#fff', border: 'none', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}
                  >
                    Re-Attempt Qs
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div>
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>Quick Actions</div>
          <button 
            onClick={() => handlePracticeWeakArea('All Weak Topics')}
            disabled={practicing}
            style={{ width: '100%', padding: '10px 0', borderRadius: 8, background: '#ef4444', color: '#fff', border: 'none', fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
          >
            {practicing ? <RefreshCw className="animate-spin" size={14}/> : <BookOpen size={14}/>}
            Practice All Weak MCQs
          </button>
        </div>
      </div>
    </div>
  );
}
