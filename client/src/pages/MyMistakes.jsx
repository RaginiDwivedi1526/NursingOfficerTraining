import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler } from 'chart.js';
import { ChevronDown, SlidersHorizontal, ChevronRight, MoreVertical } from 'lucide-react';
import './StudentMistakes.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

const trendData = {
  labels: ['1 May','2 May','3 May','4 May','5 May','6 May','Today'],
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

const SUBJECTS = [
  { name: 'Medical Surgical Nursing', count: 32, pct: '25%', color: '#4f46e5' },
  { name: 'Pharmacology', count: 28, pct: '22%', color: '#10b981' },
  { name: 'Anatomy & Physiology', count: 24, pct: '19%', color: '#f59e0b' },
  { name: 'Mental Health Nursing', count: 18, pct: '14%', color: '#ec4899' },
  { name: 'Child Health Nursing', count: 14, pct: '11%', color: '#3b82f6' },
  { name: 'Community Health Nursing', count: 12, pct: '9%', color: '#06b6d4' },
];

const QUESTIONS = [
  { icon: '🏥', iconBg: '#eff6ff', text: 'Q. A client with COPD is experiencing...', test: 'Test: Mock Test – 05', subject: 'Medical Surgical Nursing', topic: 'Respiratory Disorders', diff: 'Medium', diffClass: 'dt-medium', mistaken: '20 May, 2024\n10:24 AM', correct: 'B' },
  { icon: '💊', iconBg: '#f0fdf4', text: 'Q. The primary action of furosemide is to...', test: 'Test: Pharmacology Test – 02', subject: 'Pharmacology', topic: 'Diuretics', diff: 'Hard', diffClass: 'dt-hard', mistaken: '19 May, 2024\n09:15 PM', correct: 'C' },
  { icon: '🫀', iconBg: '#fff7ed', text: 'Q. Which cranial nerve is responsible for...', test: 'Test: Anatomy Test – 03', subject: 'Anatomy &\nPhysiology', topic: 'Cranial Nerves', diff: 'Medium', diffClass: 'dt-medium', mistaken: '18 May, 2024\n08:40 PM', correct: 'D' },
  { icon: '👶', iconBg: '#f0fdfa', text: 'Q. The period of highest risk for falls in...', test: 'Test: Child Health – 01', subject: 'Child Health Nursing', topic: 'Safety & Injury Prevention', diff: 'Easy', diffClass: 'dt-easy', mistaken: '18 May, 2024\n07:10 PM', correct: 'A' },
  { icon: '🌍', iconBg: '#fdf4ff', text: 'Q. Community health nurse plays a key...', test: 'Test: Community Health Test – 01', subject: 'Community Health Nursing', topic: 'Role of CHN', diff: 'Medium', diffClass: 'dt-medium', mistaken: '17 May, 2024\n06:45 PM', correct: 'B' },
];

const WEAK_TOPICS = [
  { name: 'Drug Calculation', count: '14 Mistakes', width: 93 },
  { name: 'Acid Base Balance', count: '12 Mistakes', width: 80 },
  { name: 'Fluid & Electrolyte Balance', count: '10 Mistakes', width: 67 },
  { name: 'Nursing Process', count: '9 Mistakes', width: 60 },
  { name: 'Oxygen Therapy', count: '8 Mistakes', width: 53 },
];

export default function MyMistakes() {
  const [activeTab, setActiveTab] = useState('All Mistakes');

  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 280px',gap:24,maxWidth:1400,margin:'0 auto',paddingBottom:40}}>
      {/* ─── LEFT ─── */}
      <div>
        {/* Header */}
        <div className="mist-header">
          <div className="mist-header-left">
            <h1 className="mist-header-left" style={{fontSize:24,fontWeight:800,color:'#0b1a30',margin:'0 0 4px 0',display:'flex',alignItems:'center',gap:10}}>My Mistakes 📋</h1>
            <p style={{color:'#64748b',fontSize:13,margin:0}}>Analyze your mistakes, learn from them and improve your accuracy.</p>
          </div>
          <button className="mist-month-btn">This Month <ChevronDown size={12}/></button>
        </div>

        {/* Stats Strip */}
        <div className="mist-stats-strip">
          <div className="mist-stat-card">
            <div className="mist-sc-lbl">Total Mistakes</div>
            <div className="mist-sc-icon">📋</div>
            <div className="mist-sc-val">128</div>
            <div className="mist-sc-sub">Questions</div>
            <div className="mist-sc-trend-down">↓ 18% from last month</div>
          </div>
          {/* Mistake % Ring */}
          <div className="mist-ring-card">
            <div className="mist-ring-wrap">
              <svg viewBox="0 0 36 36" width="70" height="70">
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#fde68a" strokeWidth="3"/>
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#f59e0b" strokeWidth="3"
                  strokeDasharray="28 72" strokeLinecap="round" transform="rotate(-90 18 18)"/>
                <circle cx="18" cy="18" r="12" fill="white"/>
              </svg>
              <div className="mist-ring-label"><div className="mist-ring-val">28%</div></div>
            </div>
            <div>
              <div className="mist-sc-lbl">Mistake Percentage</div>
              <div className="mist-sc-val" style={{fontSize:22}}>28%</div>
              <div className="mist-sc-sub">of total attempts</div>
              <div className="mist-sc-trend-down">↓ 6% from last month</div>
            </div>
          </div>
          <div className="mist-stat-card">
            <div className="mist-sc-lbl">Concepts to Improve</div>
            <div className="mist-sc-icon">🎯</div>
            <div className="mist-sc-val">24</div>
            <div className="mist-sc-sub">Weak Topics</div>
            <div className="mist-sc-trend-up">↑ 4 more than last month</div>
          </div>
          <div className="mist-stat-card">
            <div className="mist-sc-lbl">Accuracy Lost</div>
            <div className="mist-sc-icon">⚠️</div>
            <div className="mist-sc-val">32%</div>
            <div className="mist-sc-sub">due to mistakes</div>
            <div className="mist-sc-trend-down">↓ 8% from last month</div>
          </div>
          <div className="mist-stat-card">
            <div className="mist-sc-lbl">Potential Score Lost</div>
            <div className="mist-sc-icon">📉</div>
            <div className="mist-sc-val" style={{fontSize:20}}>46 / 200</div>
            <div className="mist-sc-sub">In Mock Test – 05</div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="mist-main-grid">
          {/* Trend */}
          <div className="mist-card">
            <div className="mist-card-head">
              <div className="mist-card-title">Mistakes Trend</div>
              <div className="mist-card-filter">Last 7 Days <ChevronDown size={11}/></div>
            </div>
            <div style={{height:150}}>
              <Line data={trendData} options={trendOptions}/>
            </div>
            <div className="mist-moti-bar">
              <div>
                <div className="mist-moti-text">Good job! Your mistakes are decreasing.</div>
                <div className="mist-moti-sub">Keep it up and focus on weak topics.</div>
              </div>
              <div className="mist-moti-icon">🎯</div>
            </div>
          </div>

          {/* Mistakes by Subject */}
          <div className="mist-card">
            <div className="mist-card-head">
              <div className="mist-card-title">Mistakes by Subject</div>
            </div>
            <div className="mist-sub-inner">
              <div className="mist-sub-donut">
                <svg viewBox="0 0 36 36" width="130" height="130">
                  {[
                    {color:'#4f46e5',d:25,offset:0},
                    {color:'#10b981',d:22,offset:-25},
                    {color:'#f59e0b',d:19,offset:-47},
                    {color:'#ec4899',d:14,offset:-66},
                    {color:'#3b82f6',d:11,offset:-80},
                    {color:'#06b6d4',d:9,offset:-91},
                  ].map((s,i) => (
                    <circle key={i} cx="18" cy="18" r="15.9155" fill="none" stroke={s.color} strokeWidth="3.5"
                      strokeDasharray={`${s.d*0.159155} ${100*0.159155}`}
                      strokeDashoffset={`${s.offset*0.159155 * -1}`}
                      transform="rotate(-90 18 18)"/>
                  ))}
                  <circle cx="18" cy="18" r="12" fill="white"/>
                  <text x="18" y="16" textAnchor="middle" fontSize="4" fill="#94a3b8">128</text>
                  <text x="18" y="21" textAnchor="middle" fontSize="3.5" fill="#94a3b8">Total</text>
                </svg>
                <div className="mist-sub-label">
                  <div className="mist-sub-lval">128</div>
                  <div className="mist-sub-ltotal">Total</div>
                </div>
              </div>
              <div className="mist-sub-legend">
                {SUBJECTS.map((s, i) => (
                  <div className="mist-sub-row" key={i}>
                    <div className="mist-sub-dot" style={{background:s.color}}></div>
                    <div className="mist-sub-name">{s.name}</div>
                    <div className="mist-sub-count">{s.count}</div>
                    <div className="mist-sub-pct">({s.pct})</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mist-view-all">View All Subjects <ChevronRight size={12}/></div>
          </div>

          {/* Mistakes by Difficulty */}
          <div className="mist-card">
            <div className="mist-card-head">
              <div className="mist-card-title">Mistakes by Difficulty</div>
            </div>
            <div style={{marginTop:8}}>
              <div className="mist-right-diff-row">
                <div className="mist-rd-name">Easy</div>
                <div className="mist-rd-track"><div className="mist-rd-fill" style={{width:'32%',background:'#10b981'}}></div></div>
                <div style={{fontSize:11,color:'#64748b',width:32,textAlign:'right'}}>32%</div>
                <div className="mist-rd-count">41</div>
              </div>
              <div className="mist-right-diff-row">
                <div className="mist-rd-name">Medium</div>
                <div className="mist-rd-track"><div className="mist-rd-fill" style={{width:'45%',background:'#f59e0b'}}></div></div>
                <div style={{fontSize:11,color:'#64748b',width:32,textAlign:'right'}}>45%</div>
                <div className="mist-rd-count">58</div>
              </div>
              <div className="mist-right-diff-row">
                <div className="mist-rd-name">Hard</div>
                <div className="mist-rd-track"><div className="mist-rd-fill" style={{width:'23%',background:'#ef4444'}}></div></div>
                <div style={{fontSize:11,color:'#64748b',width:32,textAlign:'right'}}>23%</div>
                <div className="mist-rd-count">29</div>
              </div>
            </div>
            <div className="mist-focus-note">
              <div className="mist-fn-title">💡 Focus on Medium questions</div>
              <div className="mist-fn-text">You are making more mistakes in Medium level questions.</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mist-tabs">
          {['All Mistakes','Concept Wise','Subject Wise','Difficulty Wise','Recently Added'].map(t => (
            <div key={t} className={`mist-tab ${activeTab===t?'active':''}`} onClick={()=>setActiveTab(t)}>{t}</div>
          ))}
        </div>

        {/* Filters */}
        <div className="mist-filter-row">
          <select className="mist-select"><option>All Subjects</option></select>
          <select className="mist-select"><option>All Topics</option></select>
          <select className="mist-select"><option>All Difficulty Levels</option></select>
          <select className="mist-select"><option>All Question Types</option></select>
          <button className="mist-filter-btn"><SlidersHorizontal size={13}/> Filters</button>
        </div>

        {/* Questions Table */}
        <div className="mist-table-wrap">
          <div className="mist-table-header">
            <span>QUESTION</span>
            <span>SUBJECT</span>
            <span>TOPIC</span>
            <span>DIFFICULTY</span>
            <span>MISTAKEN ON</span>
            <span>CORRECT ANSWER</span>
            <span>ACTION</span>
          </div>
          {QUESTIONS.map((q, i) => (
            <div className="mist-table-row" key={i}>
              <div className="mist-q-cell">
                <div className="mist-q-icon" style={{background:q.iconBg}}>{q.icon}</div>
                <div className="mist-q-info">
                  <div className="mist-q-text">{q.text}</div>
                  <div className="mist-q-test">{q.test}</div>
                </div>
              </div>
              <div className="mist-cell-sub" style={{fontSize:11,whiteSpace:'pre-line'}}>{q.subject}</div>
              <div className="mist-cell-topic">{q.topic}</div>
              <div><span className={`mist-diff-tag ${q.diffClass}`}>{q.diff}</span></div>
              <div className="mist-cell-val" style={{whiteSpace:'pre-line',fontSize:11}}>{q.mistaken}</div>
              <div className="mist-correct">{q.correct}</div>
              <div style={{display:'flex',alignItems:'center',gap:6}}>
                <button className="mist-review-btn">Review</button>
                <button style={{background:'none',border:'none',color:'#94a3b8',cursor:'pointer'}}><MoreVertical size={14}/></button>
              </div>
            </div>
          ))}
          <button className="mist-load-more">Load More <ChevronDown size={14}/></button>
        </div>
      </div>

      {/* ─── RIGHT SIDEBAR ─── */}
      <div className="mist-sidebar">
        {/* Top Weak Topics */}
        <div className="mist-side-card">
          <div className="mist-sc-head">
            <div className="mist-sc-title">Top Weak Topics</div>
            <span style={{fontSize:11,color:'#4f46e5',fontWeight:600,cursor:'pointer'}}>View All</span>
          </div>
          {WEAK_TOPICS.map((t, i) => (
            <div className="mist-weak-item" key={i}>
              <div style={{flex:1}}>
                <div className="mist-weak-name">{t.name}</div>
                <div className="mist-weak-bar"><div className="mist-weak-fill" style={{width:`${t.width}%`}}></div></div>
              </div>
              <div className="mist-weak-count" style={{marginLeft:16}}>⚠ {t.count}</div>
            </div>
          ))}
        </div>

        {/* How to Reduce Mistakes */}
        <div className="mist-how-card">
          <div className="mist-how-title">How to Reduce Mistakes?</div>
          {[
            'Review your mistakes regularly',
            'Understand the correct concepts',
            'Practice more on weak topics',
            'Take more mock tests'
          ].map((tip, i) => (
            <div className="mist-how-item" key={i}>
              <span className="mist-how-check">✓</span>
              <span>{tip}</span>
            </div>
          ))}
          <div style={{marginTop:16,textAlign:'right',fontSize:32}}>🎯</div>
        </div>
      </div>
    </div>
  );
}
