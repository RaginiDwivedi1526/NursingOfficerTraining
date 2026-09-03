import React, { useState } from 'react';
import { Search, SlidersHorizontal, ChevronDown, MoreVertical, ArrowRight, List, LayoutGrid } from 'lucide-react';
import './StudentQuestionBank.css';

const OVERVIEW = [
  { icon: '📋', bg: '#e0e7ff', val: '32,450', lbl: 'Total Questions' },
  { icon: '📚', bg: '#dcfce7', val: '25', lbl: 'Subjects' },
  { icon: '📌', bg: '#ffedd5', val: '850+', lbl: 'Topics' },
  { icon: '🎯', bg: '#fef3c7', val: '5', lbl: 'Difficulty Levels' },
  { icon: '✅', bg: '#fce7f3', val: '98%', lbl: 'Quality Verified' },
];

const SUBJECTS = [
  { icon: '🏥', bg: '#eff6ff', name: 'Medical Surgical Nursing', count: '6,250 Questions' },
  { icon: '💊', bg: '#f0fdf4', name: 'Pharmacology', count: '4,180 Questions' },
  { icon: '🫀', bg: '#fff7ed', name: 'Anatomy & Physiology', count: '3,850 Questions' },
  { icon: '🌍', bg: '#fdf4ff', name: 'Community Health Nursing', count: '3,200 Questions' },
  { icon: '🧠', bg: '#fdf2f8', name: 'Mental Health Nursing', count: '2,950 Questions' },
  { icon: '👶', bg: '#f0fdfa', name: 'Child Health Nursing', count: '2,480 Questions' },
];

const QUESTIONS = [
  { icon: '🫀', iconBg: '#eff6ff', title: 'Cardiovascular System – Basics', isNew: true, sub: 'Heart, Blood Vessels, Circulation', subject: 'Anatomy & Physiology', subColor: '#f59e0b', questions: 85, diff: 'Easy', diffClass: 'diff-easy', practiced: 'Today' },
  { icon: '💊', iconBg: '#f0fdf4', title: 'Antibiotics – Classification & Uses', isNew: false, sub: 'Drugs, Antimicrobials', subject: 'Pharmacology', subColor: '#10b981', questions: 120, diff: 'Medium', diffClass: 'diff-medium', practiced: 'Yesterday' },
  { icon: '🏥', iconBg: '#eff6ff', title: 'Nursing Process', isNew: false, sub: 'Steps, ADPIE, Application', subject: 'Medical Surgical Nursing', subColor: '#4f46e5', questions: 150, diff: 'Medium', diffClass: 'diff-medium', practiced: '2 Days Ago' },
  { icon: '🫀', iconBg: '#fff7ed', title: 'Human Skeleton System', isNew: false, sub: 'Bones, Joints, Functions', subject: 'Anatomy & Physiology', subColor: '#f59e0b', questions: 95, diff: 'Easy', diffClass: 'diff-easy', practiced: '3 Days Ago' },
  { icon: '🌍', iconBg: '#f0fdfa', title: 'Community Health Nursing Practices', isNew: false, sub: 'Health Programs, Services', subject: 'Community Health Nursing', subColor: '#0d9488', questions: 110, diff: 'Hard', diffClass: 'diff-hard', practiced: '4 Days Ago' },
  { icon: '🧠', iconBg: '#fdf2f8', title: 'Mental Disorders – Overview', isNew: false, sub: 'Anxiety, Depression, Schizophrenia', subject: 'Mental Health Nursing', subColor: '#db2777', questions: 75, diff: 'Medium', diffClass: 'diff-medium', practiced: '5 Days Ago' },
];

const QUICK_PRACTICE = [
  { icon: '📋', bg: '#e0e7ff', name: 'Practice by Topic', desc: 'Select a specific topic' },
  { icon: '🔀', bg: '#fef3c7', name: 'Random Questions', desc: 'Get random questions' },
  { icon: '📅', bg: '#ffedd5', name: 'Daily 50 Challenge', desc: '50 Questions Everyday' },
  { icon: '⚠️', bg: '#fce7f3', name: 'Weak Areas', desc: 'Focus on weak topics' },
];

export default function QuestionBank() {
  const [activeTab, setActiveTab] = useState('All Questions');
  const [activeView, setActiveView] = useState('list');

  return (
    <div className="qb-container">
      {/* ─── LEFT ─── */}
      <div className="qb-left">
        <div className="qb-header">
          <h1>Question Bank 📋</h1>
          <p>Explore a vast collection of high-quality questions to strengthen your concepts and exam preparation.</p>
        </div>

        {/* Overview Stats */}
        <div className="qb-overview-row">
          {OVERVIEW.map((o, i) => (
            <div className="qb-ov-card" key={i}>
              <div className="qb-ov-icon" style={{background: o.bg}}>{o.icon}</div>
              <div><div className="qb-ov-val">{o.val}</div><div className="qb-ov-lbl">{o.lbl}</div></div>
            </div>
          ))}
        </div>

        {/* Filter Row */}
        <div className="qb-filter-row">
          <div className="qb-search">
            <Search size={16} color="#94a3b8"/>
            <input type="text" placeholder="Search questions, topics or keywords..."/>
          </div>
          <select className="qb-select"><option>All Subjects</option></select>
          <select className="qb-select"><option>All Topics</option></select>
          <select className="qb-select"><option>All Difficulty Levels</option></select>
          <button className="qb-filter-btn"><SlidersHorizontal size={14}/> Filters</button>
        </div>

        {/* Browse by Subject */}
        <div className="qb-section-head">
          <div className="qb-section-title">Browse by Subject</div>
          <span className="qb-view-all">View All Subjects <ArrowRight size={13}/></span>
        </div>
        <div className="qb-subjects">
          {SUBJECTS.map((s, i) => (
            <div className="qb-sub-card" key={i}>
              <div className="qb-sub-icon" style={{background: s.bg}}>{s.icon}</div>
              <div className="qb-sub-name">{s.name}</div>
              <div className="qb-sub-count">{s.count}</div>
            </div>
          ))}
          <div style={{display:'flex',alignItems:'center',flexShrink:0}}>
            <button style={{width:32,height:32,borderRadius:16,border:'1px solid #e2e8f0',background:'white',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}><ArrowRight size={14}/></button>
          </div>
        </div>

        {/* Tabs + Sort/View */}
        <div className="qb-tabs-row">
          <div className="qb-tabs">
            {['All Questions', 'Recently Added', 'My Attempts', 'Bookmarked', 'My Notes'].map(t => (
              <div key={t} className={`qb-tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>{t}</div>
            ))}
          </div>
          <div className="qb-sort-view">
            <select className="qb-sort-select"><option>Sort by: Latest</option></select>
            <div className="qb-view-btns">
              <button className={`qb-view-btn ${activeView === 'list' ? 'active' : ''}`} onClick={() => setActiveView('list')}><List size={14}/></button>
              <button className={`qb-view-btn ${activeView === 'grid' ? 'active' : ''}`} onClick={() => setActiveView('grid')}><LayoutGrid size={14}/></button>
            </div>
          </div>
        </div>

        {/* Questions Table */}
        <div className="qb-table-wrap">
          <div className="qb-table-header">
            <span>QUESTION SET / TOPIC</span>
            <span>SUBJECT</span>
            <span>QUESTIONS</span>
            <span>DIFFICULTY</span>
            <span>LAST PRACTICED</span>
            <span>ACTION</span>
          </div>
          {QUESTIONS.map((q, i) => (
            <div className="qb-table-row" key={i}>
              <div className="qb-q-cell">
                <div className="qb-q-icon" style={{background: q.iconBg}}>{q.icon}</div>
                <div className="qb-q-info">
                  <div className="qb-q-title">
                    {q.title}
                    {q.isNew && <span className="qb-new-badge">New</span>}
                  </div>
                  <div className="qb-q-sub">{q.sub}</div>
                </div>
              </div>
              <div className="qb-subject-tag" style={{color: q.subColor}}>{q.subject}</div>
              <div className="qb-q-count">{q.questions}</div>
              <div><span className={`qb-diff-tag ${q.diffClass}`}>{q.diff}</span></div>
              <div className="qb-practiced">{q.practiced}</div>
              <div className="qb-action-cell">
                <button className="qb-practice-btn">Practice Now</button>
                <button className="qb-more-btn"><MoreVertical size={16}/></button>
              </div>
            </div>
          ))}
          <button className="qb-load-more">Load More <ChevronDown size={14}/></button>
        </div>
      </div>

      {/* ─── RIGHT SIDEBAR ─── */}
      <div className="qb-sidebar">

        {/* Stats */}
        <div className="qb-side-card">
          <div className="qb-sc-head">
            <div className="qb-sc-title">Your Question Bank Stats</div>
            <div className="qb-sc-filter">This Month <ChevronDown size={12}/></div>
          </div>
          <div className="qb-stats-grid">
            <div className="qb-stat-box">
              <div className="qb-sb-icon" style={{background:'#e0e7ff',color:'#4f46e5'}}>📋</div>
              <div><div className="qb-sb-val">650</div><div className="qb-sb-lbl">Questions Practiced</div></div>
            </div>
            <div className="qb-stat-box">
              <div className="qb-sb-icon" style={{background:'#dcfce7',color:'#16a34a'}}>✅</div>
              <div><div className="qb-sb-val">24</div><div className="qb-sb-lbl">Sets Completed</div></div>
            </div>
            <div className="qb-stat-box">
              <div className="qb-sb-icon" style={{background:'#ffedd5',color:'#ea580c'}}>⏱️</div>
              <div><div className="qb-sb-val">28h 15m</div><div className="qb-sb-lbl">Time Spent</div></div>
            </div>
            <div className="qb-stat-box">
              <div className="qb-sb-icon" style={{background:'#fce7f3',color:'#db2777'}}>🎯</div>
              <div><div className="qb-sb-val">89%</div><div className="qb-sb-lbl">Accuracy</div></div>
            </div>
          </div>
        </div>

        {/* Difficulty Donut */}
        <div className="qb-side-card">
          <div className="qb-sc-head">
            <div className="qb-sc-title">Difficulty Wise Distribution</div>
          </div>
          <div className="qb-donut-section">
            <div className="qb-donut-wrap">
              <svg viewBox="0 0 36 36">
                {/* Background circle */}
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#f1f5f9" strokeWidth="3"/>
                {/* Hard: 19% - red */}
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#ef4444" strokeWidth="3"
                  strokeDasharray="19 81" strokeDashoffset="0" strokeLinecap="butt"
                  transform="rotate(-90 18 18)"/>
                {/* Medium: 41% - orange */}
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#f59e0b" strokeWidth="3"
                  strokeDasharray="41 59" strokeDashoffset="-19" strokeLinecap="butt"
                  transform="rotate(-90 18 18)"/>
                {/* Easy: 40% - green */}
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#10b981" strokeWidth="3"
                  strokeDasharray="40 60" strokeDashoffset="-60" strokeLinecap="butt"
                  transform="rotate(-90 18 18)"/>
              </svg>
              <div className="qb-donut-label">
                <div className="qb-donut-val">32,450</div>
                <div className="qb-donut-sub">Total Questions</div>
              </div>
            </div>
            <div className="qb-donut-legend">
              <div className="qb-legend-row"><div className="qb-legend-dot" style={{background:'#10b981'}}></div><span className="qb-legend-name">Easy</span><span className="qb-legend-val">12,850 (40%)</span></div>
              <div className="qb-legend-row"><div className="qb-legend-dot" style={{background:'#f59e0b'}}></div><span className="qb-legend-name">Medium</span><span className="qb-legend-val">13,450 (41%)</span></div>
              <div className="qb-legend-row"><div className="qb-legend-dot" style={{background:'#ef4444'}}></div><span className="qb-legend-name">Hard</span><span className="qb-legend-val">6,150 (19%)</span></div>
            </div>
          </div>
        </div>

        {/* Quick Practice */}
        <div className="qb-side-card">
          <div className="qb-sc-head">
            <div className="qb-sc-title">Quick Practice</div>
          </div>
          <div className="qb-qp-grid">
            {QUICK_PRACTICE.map((a, i) => (
              <div className="qb-qp-item" key={i}>
                <div className="qb-qp-icon" style={{background: a.bg}}>{a.icon}</div>
                <div>
                  <div className="qb-qp-name">{a.name}</div>
                  <div className="qb-qp-desc">{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Promo */}
        <div className="qb-promo-card">
          <div className="qb-promo-left">
            <div className="qb-promo-title">Strengthen Your Concepts!</div>
            <div className="qb-promo-text">The more you practice, the better you perform.</div>
            <button className="qb-promo-btn">Start Practicing Now →</button>
          </div>
          <div className="qb-promo-img">📝</div>
        </div>

      </div>
    </div>
  );
}
