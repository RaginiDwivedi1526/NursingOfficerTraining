import React, { useState } from 'react';
import { Search, SlidersHorizontal, ChevronDown, Eye, Trash2, MoreVertical, Bookmark as BookmarkIcon, ArrowRight, CheckCircle2 } from 'lucide-react';
import './StudentBookmarks.css';

export default function Bookmarks() {
  const [activeTab, setActiveTab] = useState('All Bookmarks');

  const TABS = [
    { id: 'All Bookmarks', icon: <BookmarkIcon size={14}/>, count: 128 },
    { id: 'Questions', icon: '❓', count: 86 },
    { id: 'Topics', icon: '📋', count: 24 },
    { id: 'Tests', icon: '📝', count: 12 },
    { id: 'Notes', icon: '📓', count: 6 },
  ];

  const ITEMS = [
    { icon: '❓', iconBg: '#f5f3ff', title: 'Q. The primary action of Furosemide is to:', sub: 'Mock Test – 05', type: 'Question', subject: 'Pharmacology', date: '23 May 2024\n10:24 AM', diff: 'Medium', diffClass: 'diff-medium' },
    { icon: '📋', iconBg: '#dcfce7', title: 'Anatomy of Heart - Complete Notes', sub: 'Detailed Study Material', type: 'Topic', subject: 'Anatomy & Physiology', date: '22 May 2024\n09:15 PM' },
    { icon: '❓', iconBg: '#fee2e2', title: 'Q. Which cranial nerve is responsible for facial expression?', sub: 'Test: Anatomy Test - 03', type: 'Question', subject: 'Anatomy & Physiology', date: '21 May 2024\n08:40 PM', diff: 'Easy', diffClass: 'diff-easy' },
    { icon: '📝', iconBg: '#ffedd5', title: 'Mock Test - 04', sub: 'Full Length Test', score: 'Score: 162/200', type: 'Test', subject: 'Full Length Test', date: '20 May 2024\n07:21 PM' },
    { icon: '📋', iconBg: '#eff6ff', title: 'Nursing Process - Detailed Explanation', sub: 'Study Material', type: 'Topic', subject: 'Nursing Foundation', date: '20 May 2024\n06:45 PM' },
    { icon: '❓', iconBg: '#fee2e2', title: 'Q. Signs and symptoms of Hypoglycemia include:', sub: 'Test: Medical Surgical Nursing - 02', type: 'Question', subject: 'Medical Surgical Nursing', date: '19 May 2024\n09:30 PM', diff: 'Medium', diffClass: 'diff-medium' },
    { icon: '📋', iconBg: '#dcfce7', title: 'Pharmacokinetics - Absorption, Distribution', sub: 'Study Material', type: 'Topic', subject: 'Pharmacology', date: '19 May 2024\n08:15 PM' },
    { icon: '📝', iconBg: '#ffedd5', title: 'Sectional Test - Pharmacology', sub: 'Sectional Test', score: 'Score: 68/100', type: 'Test', subject: 'Pharmacology', date: '18 May 2024\n07:05 PM' },
  ];

  return (
    <div className="bm-container">
      {/* ─── LEFT ─── */}
      <div className="bm-left">
        
        {/* Header */}
        <div className="bm-header">
          <h1>Bookmarks <BookmarkIcon size={24} color="#8b5cf6" /></h1>
          <p>All your saved questions, topics, tests and resources in one place.</p>
        </div>

        {/* Tabs */}
        <div className="bm-tabs">
          {TABS.map(t => (
            <div key={t.id} className={`bm-tab ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
              {t.icon} {t.id} <span className="bm-tab-count">({t.count})</span>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bm-filter-row">
          <div className="bm-search">
            <Search size={16} color="#94a3b8"/>
            <input type="text" placeholder="Search in bookmarks..."/>
          </div>
          <select className="bm-select"><option>All Types</option></select>
          <select className="bm-select"><option>All Subjects</option></select>
          <select className="bm-select"><option>Latest Added</option></select>
          <button className="bm-filter-btn"><SlidersHorizontal size={14}/> Filters</button>
        </div>

        {/* Table */}
        <div className="bm-table-wrap">
          <div className="bm-table-header">Bookmarked Items</div>
          <table className="bm-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Type</th>
                <th>Subject</th>
                <th>Added On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {ITEMS.map((item, i) => (
                <tr key={i}>
                  <td>
                    <div className="bm-item-cell">
                      <div className="bm-item-icon" style={{background: item.iconBg}}>{item.icon}</div>
                      <div className="bm-item-info">
                        <div className="bm-item-title">{item.title} {item.diff && <span className={`bm-tag-diff ${item.diffClass}`} style={{marginLeft:6}}>{item.diff}</span>}</div>
                        <div className="bm-item-sub">{item.sub} {item.score && <span className="bm-tag-score">{item.score}</span>}</div>
                      </div>
                    </div>
                  </td>
                  <td>{item.type}</td>
                  <td>{item.subject}</td>
                  <td style={{whiteSpace:'pre-line'}}>{item.date}</td>
                  <td>
                    <div className="bm-actions">
                      <button className="bm-btn-icon"><Eye size={16}/></button>
                      <button className="bm-btn-icon danger"><Trash2 size={16}/></button>
                      <button className="bm-btn-icon"><MoreVertical size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="bm-load-more">Load More <ChevronDown size={14}/></button>
        </div>

        {/* Promo Footer */}
        <div className="bm-bottom-promo">
          <div className="bm-bp-left">
            <div className="bm-bp-icon">⭐</div>
            <div>
              <div className="bm-bp-title">Smart learners bookmark smart!</div>
              <div className="bm-bp-sub">Keep your important content organized and revise faster.</div>
            </div>
          </div>
          <button className="bm-bp-btn">Explore More Topics <ArrowRight size={12}/></button>
        </div>

      </div>

      {/* ─── RIGHT SIDEBAR ─── */}
      <div className="bm-sidebar">
        
        {/* Overview Chart */}
        <div className="bm-card">
          <div className="bm-card-title">Bookmarks Overview <BookmarkIcon size={16} color="#4f46e5"/></div>
          <div className="bm-overview">
            <div className="bm-donut">
              <svg viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="14" fill="none" stroke="#f1f5f9" strokeWidth="4"/>
                {/* Questions 67% */}
                <circle cx="18" cy="18" r="14" fill="none" stroke="#4f46e5" strokeWidth="4" strokeDasharray="67 33" strokeDashoffset="0" transform="rotate(-90 18 18)"/>
                {/* Topics 19% */}
                <circle cx="18" cy="18" r="14" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="19 81" strokeDashoffset="-67" transform="rotate(-90 18 18)"/>
                {/* Tests 9% */}
                <circle cx="18" cy="18" r="14" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="9 91" strokeDashoffset="-86" transform="rotate(-90 18 18)"/>
                {/* Notes 5% */}
                <circle cx="18" cy="18" r="14" fill="none" stroke="#ec4899" strokeWidth="4" strokeDasharray="5 95" strokeDashoffset="-95" transform="rotate(-90 18 18)"/>
              </svg>
              <div className="bm-donut-label">
                <div className="bm-donut-val">128</div>
                <div className="bm-donut-sub">Total Bookmarks</div>
              </div>
            </div>
            <div className="bm-legend">
              <div className="bm-legend-item"><CheckCircle2 size={12} color="#4f46e5"/><span className="bm-leg-name">Questions</span><span className="bm-leg-val">86</span><span className="bm-leg-pct">(67%)</span></div>
              <div className="bm-legend-item"><CheckCircle2 size={12} color="#10b981"/><span className="bm-leg-name">Topics</span><span className="bm-leg-val">24</span><span className="bm-leg-pct">(19%)</span></div>
              <div className="bm-legend-item"><CheckCircle2 size={12} color="#f59e0b"/><span className="bm-leg-name">Tests</span><span className="bm-leg-val">12</span><span className="bm-leg-pct">(9%)</span></div>
              <div className="bm-legend-item"><CheckCircle2 size={12} color="#ec4899"/><span className="bm-leg-name">Notes</span><span className="bm-leg-val">6</span><span className="bm-leg-pct">(5%)</span></div>
            </div>
          </div>
        </div>

        {/* Quick Access */}
        <div className="bm-card">
          <div className="bm-card-title" style={{margin:0, marginBottom:16}}>Quick Access</div>
          <div className="bm-qa-grid">
            <div className="bm-qa-item">
              <div className="bm-qa-icon" style={{background:'#fef2f2',color:'#ef4444'}}>❓</div>
              <div className="bm-qa-lbl">Most Bookmarked Subject</div>
              <div className="bm-qa-val">Pharmacology</div>
              <div className="bm-qa-sub">32 Items</div>
            </div>
            <div className="bm-qa-item">
              <div className="bm-qa-icon" style={{background:'#f5f3ff',color:'#7c3aed'}}>❓</div>
              <div className="bm-qa-lbl">Most Bookmarked Type</div>
              <div className="bm-qa-val">Questions</div>
              <div className="bm-qa-sub">86 Items</div>
            </div>
            <div className="bm-qa-item">
              <div className="bm-qa-icon" style={{background:'#eff6ff',color:'#3b82f6'}}>🕒</div>
              <div className="bm-qa-lbl">Recently Added</div>
              <div className="bm-qa-val">8 Items</div>
              <div className="bm-qa-sub">This Week</div>
            </div>
            <div className="bm-qa-item">
              <div className="bm-qa-icon" style={{background:'#fff7ed',color:'#ea580c'}}>🏆</div>
              <div className="bm-qa-lbl">Study Time Saved</div>
              <div className="bm-qa-val">12h 45m</div>
              <div className="bm-qa-sub">With Bookmarks</div>
            </div>
          </div>
        </div>

        {/* Bookmark Tips */}
        <div className="bm-card">
          <div className="bm-card-title">Bookmark Tips</div>
          <div className="bm-tips-list">
            <div className="bm-tip"><span className="bm-tip-icon">🗃️</span> Bookmark important questions while solving tests.</div>
            <div className="bm-tip"><span className="bm-tip-icon">✓</span> Save topics & notes for quick revision.</div>
            <div className="bm-tip"><span className="bm-tip-icon">✓</span> Access all your saved content anytime, anywhere!</div>
          </div>
          <div style={{textAlign:'right', fontSize:40}}>📋</div>
        </div>

        {/* Review Promo */}
        <div className="bm-card bm-review-promo">
          <div className="bm-card-title" style={{justifyContent:'flex-start'}}>Review Your Bookmarks</div>
          <div className="bm-rp-text">Revise your bookmarked items regularly to improve retention and performance.</div>
          <div style={{fontSize:50, marginBottom:16}}>📚</div>
          <button className="bm-rp-btn">Start Revising Now <ArrowRight size={14}/></button>
        </div>

      </div>
    </div>
  );
}
