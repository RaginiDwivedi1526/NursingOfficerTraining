import React, { useState } from 'react';
import { SlidersHorizontal, ChevronDown, MoreVertical, ArrowRight } from 'lucide-react';
import './StudentPYQ.css';

const PAPERS = [
  { year: '2023', yearColor: '#4f46e5', yearBg: '#e0e7ff', name: 'NORCET 2023', isLatest: true, date: 'Conducted on 05 Sep 2023', questions: 200, attempts: 2, score: '154 / 200', scorePct: '77%', scoreColor: '#16a34a' },
  { year: '2022', yearColor: '#10b981', yearBg: '#dcfce7', name: 'NORCET 2022', isLatest: false, date: 'Conducted on 11 Sep 2022', questions: 200, attempts: 1, score: '132 / 200', scorePct: '66%', scoreColor: '#d97706' },
  { year: '2021', yearColor: '#f59e0b', yearBg: '#fef3c7', name: 'NORCET 2021', isLatest: false, date: 'Conducted on 12 Sep 2021', questions: 200, attempts: 1, score: '128 / 200', scorePct: '64%', scoreColor: '#d97706' },
  { year: '2020', yearColor: '#ef4444', yearBg: '#fee2e2', name: 'NORCET 2020', isLatest: false, date: 'Conducted on 20 Oct 2020', questions: 200, attempts: 0, score: null, scorePct: null, scoreColor: null },
  { year: '2019', yearColor: '#8b5cf6', yearBg: '#ede9fe', name: 'NORCET 2019', isLatest: false, date: 'Conducted on 13 Oct 2019', questions: 200, attempts: 0, score: null, scorePct: null, scoreColor: null },
  { year: '2018', yearColor: '#ec4899', yearBg: '#fce7f3', name: 'NORCET 2018', isLatest: false, date: 'Conducted on 07 Oct 2018', questions: 200, attempts: 0, score: null, scorePct: null, scoreColor: null },
];

const SUBJECTS = [
  { name: 'Medical Surgical Nursing', icon: '🏥', pct: 72, val: '(86/120)', color: '#4f46e5' },
  { name: 'Pharmacology', icon: '💊', pct: 64, val: '(64/100)', color: '#10b981' },
  { name: 'Anatomy & Physiology', icon: '🫀', pct: 60, val: '(48/80)', color: '#f59e0b' },
  { name: 'Community Health Nursing', icon: '🌍', pct: 58, val: '(58/100)', color: '#3b82f6' },
  { name: 'Mental Health Nursing', icon: '🧠', pct: 54, val: '(34/63)', color: '#ec4899' },
];

const QUICK_ACTIONS = [
  { icon: '📋', bg: '#e0e7ff', name: 'Chapter-wise PYQs', desc: 'Practice by Topics' },
  { icon: '🔀', bg: '#fef3c7', name: 'Mixed PYQ Test', desc: 'Random PYQ Test' },
  { icon: '📊', bg: '#dcfce7', name: 'My PYQ Attempts', desc: 'View Your History' },
  { icon: '📝', bg: '#fce7f3', name: 'PYQ Notes', desc: 'Important PYQ Points' },
];

export default function PYQPractice() {
  const [activeTab, setActiveTab] = useState('Year Wise');

  return (
    <div className="pyq-container">
      {/* ─── LEFT ─── */}
      <div className="pyq-left">
        <div className="pyq-header">
          <h1>PYQ Practice 📋</h1>
          <p>Practice previous year questions to understand exam pattern and boost your score.</p>
        </div>

        {/* Hero Banner */}
        <div className="pyq-hero">
          <div className="pyq-hero-left">
            <div className="pyq-hero-title">Previous Year Questions, Perfect Preparation!</div>
            <div className="pyq-hero-feats">
              <div className="pyq-hero-feat"><span>✓</span> Chapter-wise & Year-wise PYQs</div>
              <div className="pyq-hero-feat"><span>✓</span> Detailed Solutions & Explanations</div>
              <div className="pyq-hero-feat"><span>✓</span> Track Your Progress & Accuracy</div>
              <div className="pyq-hero-feat"><span>✓</span> Identify Weak Areas</div>
            </div>
            <button className="pyq-hero-btn">Start Practicing Now →</button>
          </div>
          <div className="pyq-hero-right">
            <div className="pyq-hero-lbl">Total PYQs Available</div>
            <div className="pyq-hero-sub" style={{marginBottom:8}}>
              <span style={{fontSize:18}}>📚</span>
            </div>
            <div className="pyq-hero-count">8,562</div>
            <div className="pyq-hero-lbl" style={{marginTop:4}}>Questions</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="pyq-tabs">
          {['Year Wise', 'Subject Wise', 'Chapter Wise', 'Mixed PYQs'].map(t => (
            <div key={t} className={`pyq-tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>{t}</div>
          ))}
        </div>

        {/* Filter Row */}
        <div className="pyq-filter-row">
          <select className="pyq-select"><option>All Years</option></select>
          <select className="pyq-select"><option>All Subjects</option></select>
          <select className="pyq-select"><option>All Chapters</option></select>
          <select className="pyq-select"><option>All Difficulty Levels</option></select>
          <button className="pyq-filter-btn"><SlidersHorizontal size={14}/> Filters</button>
        </div>

        {/* Papers Table */}
        <div className="pyq-table-wrap">
          <div className="pyq-table-header">
            <span>PREVIOUS YEAR PAPERS</span>
            <span>QUESTIONS</span>
            <span>ATTEMPTS</span>
            <span>BEST SCORE</span>
            <span>ACTION</span>
          </div>

          {PAPERS.map((p, i) => (
            <div className="pyq-table-row" key={i}>
              <div className="pyq-paper-cell">
                <span className="pyq-year-badge" style={{background: p.yearBg, color: p.yearColor}}>{p.year}</span>
                <div className="pyq-paper-info">
                  <div className="pyq-paper-name">
                    {p.name}
                    {p.isLatest && <span className="pyq-latest-badge">Latest</span>}
                  </div>
                  <div className="pyq-paper-date">{p.date}</div>
                </div>
              </div>
              <div className="pyq-cell-val">{p.questions}</div>
              <div className="pyq-cell-val">{p.attempts}</div>
              <div className="pyq-score-cell">
                {p.score
                  ? <><div className="pyq-score-val" style={{color: p.scoreColor}}>{p.score}</div><div className="pyq-score-pct">{p.scorePct}</div></>
                  : <div className="pyq-score-none">– –</div>
                }
              </div>
              <div className="pyq-action-cell">
                <button className="pyq-action-btn">Start Practice</button>
                <button className="pyq-more-btn"><MoreVertical size={16}/></button>
              </div>
            </div>
          ))}

          <button className="pyq-load-more">Load More <ChevronDown size={14}/></button>
        </div>
      </div>

      {/* ─── RIGHT SIDEBAR ─── */}
      <div className="pyq-sidebar">

        {/* Performance */}
        <div className="pyq-side-card">
          <div className="pyq-sc-head">
            <div className="pyq-sc-title">Your PYQ Performance</div>
            <div className="pyq-sc-filter">This Month <ChevronDown size={12}/></div>
          </div>
          <div className="pyq-perf-top">
            <div className="pyq-donut-wrap">
              <svg viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f1f5f9" strokeWidth="3"/>
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#4f46e5" strokeWidth="3" strokeDasharray="68, 100" strokeLinecap="round"/>
              </svg>
              <div className="pyq-donut-label">
                <div className="pyq-donut-pct">68%</div>
                <div className="pyq-donut-sub">Avg Score</div>
              </div>
            </div>
            <div className="pyq-perf-stats">
              <div className="pyq-ps-row">
                <div className="pyq-ps-icon" style={{background:'#e0e7ff', color:'#4f46e5'}}>📋</div>
                <span>Tests Attempted</span>
                <span className="pyq-ps-val">12</span>
              </div>
              <div className="pyq-ps-row">
                <div className="pyq-ps-icon" style={{background:'#dcfce7', color:'#16a34a'}}>✅</div>
                <span>Tests Completed</span>
                <span className="pyq-ps-val">8</span>
              </div>
              <div className="pyq-ps-row">
                <div className="pyq-ps-icon" style={{background:'#fef3c7', color:'#d97706'}}>🏆</div>
                <span>Best Score</span>
                <span className="pyq-ps-val">136/200</span>
              </div>
              <div className="pyq-ps-row">
                <div className="pyq-ps-icon" style={{background:'#ffe4e6', color:'#e11d48'}}>⏱️</div>
                <span>Total Time Taken</span>
                <span className="pyq-ps-val">24h 30m</span>
              </div>
            </div>
          </div>
          <div className="pyq-analysis-link">View Detailed Analysis <ArrowRight size={12}/></div>
        </div>

        {/* Subject Wise Accuracy */}
        <div className="pyq-side-card">
          <div className="pyq-sc-head">
            <div className="pyq-sc-title">Subject Wise Accuracy</div>
            <div className="pyq-sc-filter">(This Month)</div>
          </div>
          {SUBJECTS.map((s, i) => (
            <div className="pyq-sw-row" key={i}>
              <div className="pyq-sw-head">
                <div className="pyq-sw-name"><span>{s.icon}</span>{s.name}</div>
                <div className="pyq-sw-vals" style={{color: s.color, fontWeight:700}}>{s.pct}% {s.val}</div>
              </div>
              <div className="pyq-sw-track">
                <div className="pyq-sw-fill" style={{width:`${s.pct}%`, background: s.color}}></div>
              </div>
            </div>
          ))}
          <div className="pyq-view-subs">View All Subjects <ArrowRight size={12}/></div>
        </div>

        {/* Quick Actions */}
        <div className="pyq-side-card">
          <div className="pyq-sc-head">
            <div className="pyq-sc-title">Quick Actions</div>
          </div>
          <div className="pyq-qa-grid">
            {QUICK_ACTIONS.map((a, i) => (
              <div className="pyq-qa-item" key={i}>
                <div className="pyq-qa-icon" style={{background: a.bg}}>{a.icon}</div>
                <div className="pyq-qa-text">
                  <div className="pyq-qa-name">{a.name}</div>
                  <div className="pyq-qa-desc">{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Motivational Card */}
        <div className="pyq-moti-card">
          <div className="pyq-moti-title">Revise. Practice. Succeed!</div>
          <div className="pyq-moti-text">Consistent PYQ practice is the key to cracking NORCET with confidence.</div>
          <button className="pyq-moti-btn">View Study Plan →</button>
          <div className="pyq-moti-icon">🎯</div>
        </div>

      </div>
    </div>
  );
}
