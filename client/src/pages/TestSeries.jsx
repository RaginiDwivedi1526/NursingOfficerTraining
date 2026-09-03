import React, { useState } from 'react';
import { Search, SlidersHorizontal, ArrowRight, ChevronDown, MoreVertical } from 'lucide-react';
import './StudentTestSeries.css';

const QUICK_STATS = [
  { icon: '📋', bg: '#e0e7ff', val: '20', lbl: 'Total Tests\nFull Length' },
  { icon: '✅', bg: '#dcfce7', val: '7', lbl: 'Tests Attempted' },
  { icon: '📊', bg: '#ffedd5', val: '58%', lbl: 'Avg. Score' },
  { icon: '🏆', bg: '#fef3c7', val: 'Top 18%', lbl: 'Your Rank' },
  { icon: '🎯', bg: '#fce7f3', val: '65%', lbl: 'Accuracy' },
];

const TESTS = [
  {
    num: '01', title: 'NORCET 2024 Full Length Test – 01', isNew: true,
    sub: 'Based on Latest Pattern', type: 'Full Length', typeBg: '#e0e7ff', typeColor: '#4338ca',
    questions: 200, marks: 200, duration: '3 hrs', attempts: '1 / 3',
    score: '142 / 200', scorePct: '71%', scoreClass: 'sts-score-green',
    btn: 'Attempt Again', btnClass: 'btn-dark'
  },
  {
    num: '02', title: 'NORCET 2024 Full Length Test – 02', isNew: false,
    sub: 'Based on Latest Pattern', type: 'Full Length', typeBg: '#e0e7ff', typeColor: '#4338ca',
    questions: 200, marks: 200, duration: '3 hrs', attempts: '1 / 3',
    score: '128 / 200', scorePct: '64%', scoreClass: 'sts-score-orange',
    btn: 'View Analysis', btnClass: 'btn-outline-blue'
  },
  {
    num: '03', title: 'Medical Surgical Nursing – Sectional Test', isNew: false,
    sub: 'Subject Wise', type: 'Sectional', typeBg: '#dcfce7', typeColor: '#166534',
    questions: 50, marks: 50, duration: '75 min', attempts: '2 / 3',
    score: '38 / 50', scorePct: '76%', scoreClass: 'sts-score-green',
    btn: 'Attempt Test', btnClass: 'btn-outline'
  },
  {
    num: '04', title: 'Pharmacology – Sectional Test', isNew: false,
    sub: 'Subject Wise', type: 'Sectional', typeBg: '#dcfce7', typeColor: '#166534',
    questions: 50, marks: 50, duration: '75 min', attempts: '1 / 3',
    score: '30 / 50', scorePct: '60%', scoreClass: 'sts-score-orange',
    btn: 'Attempt Test', btnClass: 'btn-outline'
  },
  {
    num: '05', title: 'PYQ 2023 Full Length Test', isNew: false,
    sub: 'Previous Year Paper', type: 'PYQ', typeBg: '#fef3c7', typeColor: '#92400e',
    questions: 200, marks: 200, duration: '3 hrs', attempts: '1 / 3',
    score: '146 / 200', scorePct: '73%', scoreClass: 'sts-score-green',
    btn: 'View Analysis', btnClass: 'btn-outline-blue'
  },
];

const SUBJECT_PERF = [
  { name: 'Medical Surgical Nursing', icon: '🏥', pct: 72, val: '4/6', color: '#4f46e5' },
  { name: 'Pharmacology', icon: '💊', pct: 63, val: '3/5', color: '#10b981' },
  { name: 'Anatomy & Physiology', icon: '🫀', pct: 58, val: '2/4', color: '#f59e0b' },
  { name: 'Community Health Nursing', icon: '🌍', pct: 54, val: '2/4', color: '#3b82f6' },
  { name: 'Mental Health Nursing', icon: '🧠', pct: 48, val: '1/3', color: '#ec4899' },
];

const RECOS = [
  { icon: '📋', bg: '#e0e7ff', color: '#4f46e5', title: 'Mixed Subject Full Test – 03', sub: '200 Questions • 3 hrs' },
  { icon: '⚠️', bg: '#fee2e2', color: '#dc2626', title: 'Weak Areas Test', sub: 'Based on Your Performance' },
  { icon: '💊', bg: '#dcfce7', color: '#16a34a', title: 'Pharmacology Mega Test', sub: '50 Questions • 75 min' },
];

export default function TestSeries() {
  const [activeTab, setActiveTab] = useState('All Tests');

  return (
    <div className="sts-container">
      {/* ─── LEFT ─── */}
      <div className="sts-left">
        <div className="sts-header">
          <h1>Test Series</h1>
          <p>Practice more, improve faster. Get exam ready with our structured test series.</p>
        </div>

        {/* Hero Banner */}
        <div className="sts-hero">
          <div className="sts-hero-left">
            <div className="sts-hero-tag">Complete Test Series</div>
            <div className="sts-hero-title">All India NORCET 2024</div>
            <div className="sts-hero-feats">
              <div className="sts-hero-feat"><span>✓</span> 20 Full Length Tests</div>
              <div className="sts-hero-feat"><span>✓</span> Based on Latest Exam Pattern</div>
              <div className="sts-hero-feat"><span>✓</span> Detailed Solutions & Analysis</div>
              <div className="sts-hero-feat"><span>✓</span> Performance Comparison</div>
            </div>
            <button className="sts-hero-btn">Start Now →</button>
          </div>
          <div className="sts-hero-right">
            <div className="sts-hero-graphic">
              <div className="sts-hero-graphic-inner">
                <div className="sts-hero-pct-lbl">Progress</div>
                <div className="sts-hero-pct">35%</div>
              </div>
            </div>
            <div className="sts-hero-tests" style={{color:'#c4b5fd', fontSize:12}}>7 / 20 Tests Completed</div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="sts-quick-stats">
          {QUICK_STATS.map((s, i) => (
            <div className="sts-qs-card" key={i}>
              <div className="sts-qs-icon" style={{background: s.bg}}>{s.icon}</div>
              <div className="sts-qs-info">
                <div className="sts-qs-val">{s.val}</div>
                {s.lbl.split('\n').map((l, j) => <div key={j} className="sts-qs-lbl">{l}</div>)}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="sts-tabs">
          {['All Tests', 'Full Length Tests', 'Sectional Tests', 'Subject Wise Tests', 'Previous Year Papers', 'Free Tests'].map(t => (
            <div key={t} className={`sts-tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>{t}</div>
          ))}
        </div>

        {/* Filters */}
        <div className="sts-filter-row">
          <div className="sts-search">
            <Search size={16} color="#94a3b8"/>
            <input type="text" placeholder="Search tests..."/>
          </div>
          <select className="sts-select"><option>All Subjects</option></select>
          <select className="sts-select"><option>All Tests</option></select>
          <select className="sts-select"><option>Sort by: Newest</option></select>
          <button className="sts-filter-btn"><SlidersHorizontal size={14}/> Filters</button>
        </div>

        {/* Tests Table */}
        <div className="sts-table-wrap">
          <div className="sts-table-header">
            <span>TEST</span>
            <span>TYPE</span>
            <span>QUESTIONS</span>
            <span>DURATION</span>
            <span>ATTEMPTS</span>
            <span>BEST SCORE</span>
            <span>ACTION</span>
          </div>
          {TESTS.map((t, i) => (
            <div className="sts-table-row" key={i}>
              <div className="sts-test-cell">
                <span className="sts-test-num">{t.num}</span>
                <div className="sts-test-info">
                  <div className="sts-test-title">
                    {t.title}
                    {t.isNew && <span className="sts-new-badge">New</span>}
                  </div>
                  <div className="sts-test-sub">{t.sub}</div>
                </div>
              </div>
              <div>
                <span className="sts-type-badge" style={{background: t.typeBg, color: t.typeColor}}>{t.type}</span>
              </div>
              <div className="sts-cell-val">{t.questions}</div>
              <div className="sts-cell-val">{t.duration}</div>
              <div className="sts-cell-val">{t.attempts}</div>
              <div>
                <div className={`sts-score-cell ${t.scoreClass}`}>{t.score}</div>
                <div className="sts-score-pct">{t.scorePct}</div>
              </div>
              <div style={{display:'flex', gap:8, alignItems:'center'}}>
                <button className={`sts-action-btn ${t.btnClass}`}>{t.btn}</button>
                <button style={{background:'none', border:'none', cursor:'pointer', color:'#94a3b8'}}><MoreVertical size={16}/></button>
              </div>
            </div>
          ))}
          <button className="sts-view-all">View All Tests <ArrowRight size={14}/></button>
        </div>
      </div>

      {/* ─── RIGHT SIDEBAR ─── */}
      <div className="sts-sidebar">
        {/* Test Performance */}
        <div className="sts-side-card">
          <div className="sts-sc-head">
            <div className="sts-sc-title">Your Test Performance</div>
            <div className="sts-sc-filter">This Month <ChevronDown size={12}/></div>
          </div>
          <div className="sts-perf-inner">
            <div className="sts-donut-wrap">
              <svg viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f1f5f9" strokeWidth="3"/>
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#4f46e5" strokeWidth="3" strokeDasharray="58, 100" strokeLinecap="round"/>
              </svg>
              <div className="sts-donut-label">
                <div className="sts-donut-pct">58%</div>
                <div className="sts-donut-sub">Avg Score</div>
              </div>
            </div>
            <div className="sts-perf-stats">
              <div className="sts-perf-row"><div className="sts-perf-dot" style={{background:'#4f46e5'}}></div><span>Tests Attempted</span><span className="sts-perf-val">7</span></div>
              <div className="sts-perf-row"><div className="sts-perf-dot" style={{background:'#10b981'}}></div><span>Tests Completed</span><span className="sts-perf-val">4</span></div>
              <div className="sts-perf-row"><div className="sts-perf-dot" style={{background:'#f59e0b'}}></div><span>Average Accuracy</span><span className="sts-perf-val">65%</span></div>
              <div className="sts-perf-row"><div className="sts-perf-dot" style={{background:'#ec4899'}}></div><span>Total Time</span><span className="sts-perf-val">18h 30m</span></div>
            </div>
          </div>
        </div>

        {/* Subject Wise Performance */}
        <div className="sts-side-card">
          <div className="sts-sc-head">
            <div className="sts-sc-title">Subject Wise Performance</div>
            <div className="sts-sc-filter">This Month <ChevronDown size={12}/></div>
          </div>
          {SUBJECT_PERF.map((s, i) => (
            <div className="sts-sw-row" key={i}>
              <div className="sts-sw-head">
                <div className="sts-sw-name"><span>{s.icon}</span>{s.name}</div>
                <div className="sts-sw-vals" style={{color: s.color, fontWeight:700}}>{s.pct}% ({s.val})</div>
              </div>
              <div className="sts-sw-track">
                <div className="sts-sw-fill" style={{width:`${s.pct}%`, background: s.color}}></div>
              </div>
            </div>
          ))}
          <button className="sts-view-analysis">View Detailed Analysis →</button>
        </div>

        {/* Recommended */}
        <div className="sts-side-card">
          <div className="sts-sc-head">
            <div className="sts-sc-title">Recommended for You</div>
          </div>
          {RECOS.map((r, i) => (
            <div className="sts-reco-item" key={i}>
              <div className="sts-reco-icon" style={{background: r.bg, color: r.color}}>{r.icon}</div>
              <div className="sts-reco-info">
                <div className="sts-reco-title">{r.title}</div>
                <div className="sts-reco-sub">{r.sub}</div>
              </div>
              <button className="sts-reco-btn">Start</button>
            </div>
          ))}
        </div>

        {/* Ace Card */}
        <div className="sts-ace-card">
          <div className="sts-ace-title">Ace Your Exam with Test Series</div>
          <div className="sts-ace-text">Consistent practice is the key to success. Keep going!</div>
          <button className="sts-ace-btn">View My Plan →</button>
          <div className="sts-ace-icon">🏆</div>
        </div>
      </div>
    </div>
  );
}
