import React, { useState } from 'react';
import { Search, SlidersHorizontal, ChevronDown, Download, Bookmark, MoreVertical, ArrowRight, BookOpen, FileText, Zap, Image, BookMarked, Cross, Eye } from 'lucide-react';
import './StudentStudyMaterial.css';

const TYPE_CARDS = [
  { label: 'All Materials', val: '1,248', sub: 'Resources', icon: '📚', bg: '#4f46e5', iconBg: '#e0e7ff' },
  { label: 'E-Books', val: '156', sub: 'Resources', icon: '📖', bg: '#10b981', iconBg: '#dcfce7' },
  { label: 'Notes', val: '642', sub: 'Resources', icon: '📝', bg: '#f59e0b', iconBg: '#fef3c7' },
  { label: 'Quick Revision', val: '218', sub: 'Resources', icon: '⚡', bg: '#8b5cf6', iconBg: '#ede9fe' },
  { label: 'Infographics', val: '132', sub: 'Resources', icon: '🖼️', bg: '#ef4444', iconBg: '#fee2e2' },
  { label: 'Clinical Guides', val: '100', sub: 'Resources', icon: '🏥', bg: '#06b6d4', iconBg: '#cffafe' },
];

const SUBJECTS = [
  { name: 'Medical Surgical Nursing', count: '312 Resources', emoji: '🏥', bg: '#eff6ff', color: '#3b82f6' },
  { name: 'Pharmacology', count: '176 Resources', emoji: '💊', bg: '#f0fdf4', color: '#16a34a' },
  { name: 'Community Health Nursing', count: '142 Resources', emoji: '🌍', bg: '#fdf4ff', color: '#9333ea' },
  { name: 'Anatomy & Physiology', count: '118 Resources', emoji: '🫀', bg: '#fff7ed', color: '#ea580c' },
  { name: 'Mental Health Nursing', count: '96 Resources', emoji: '🧠', bg: '#fdf2f8', color: '#db2777' },
  { name: 'Child Health Nursing', count: '84 Resources', emoji: '👶', bg: '#f0fdfa', color: '#0d9488' },
];

const MATERIALS = [
  { title: 'Fluid & Electrolyte Balance – Complete Notes', isNew: true, ftype: 'PDF', ftColor: '#ef4444', ftBg: '#fee2e2', mtLabel: 'PDF Notes', subject: 'Med Surg Nursing', date: '27 May 2024', size: '2.4 MB' },
  { title: 'Pharmacology – Important Drugs List', isNew: false, ftype: 'DOC', ftColor: '#2563eb', ftBg: '#dbeafe', mtLabel: 'DOC Notes', subject: 'Pharmacology', date: '26 May 2024', size: '1.8 MB' },
  { title: 'Nursing Process – Quick Revision Charts', isNew: false, ftype: 'PPT', ftColor: '#ea580c', ftBg: '#ffedd5', mtLabel: 'PPT', subject: 'Fundamentals of Nursing', date: '25 May 2024', size: '3.1 MB' },
  { title: 'Community Health Nursing – Key Points', isNew: false, ftype: 'PDF', ftColor: '#4f46e5', ftBg: '#e0e7ff', mtLabel: 'PDF Notes', subject: 'Community Health Nursing', date: '24 May 2024', size: '2.7 MB' },
  { title: 'Anatomy of Heart – Easy Notes', isNew: false, ftype: 'DOC', ftColor: '#16a34a', ftBg: '#dcfce7', mtLabel: 'DOC Notes', subject: 'Anatomy & Physiology', date: '23 May 2024', size: '1.2 MB' },
];

const TOP_MATERIALS = [
  { name: 'Diuretics & Their Uses', sub: 'Pharmacology', views: '2.4K' },
  { name: 'Fluid & Electrolyte Balance', sub: 'Med Surg Nursing', views: '2.1K' },
  { name: 'Anatomy – Heart', sub: 'Anatomy & Physiology', views: '1.7K' },
  { name: 'Nursing Care Plan on Fever', sub: 'Med Surg Nursing', views: '1.3K' },
  { name: 'Mental Health Disorders', sub: 'Mental Health Nursing', views: '1.1K' },
];

export default function StudyMaterial() {
  const [activeType, setActiveType] = useState(0);
  const [activeTab, setActiveTab] = useState('All');
  const [topTab, setTopTab] = useState('Viewed');

  return (
    <div className="ssm-container">
      {/* Header & Filters */}
      <div className="ssm-header">
        <h1>Study Material</h1>
        <p>Curated notes, ebooks, articles and more to help you learn better.</p>
        <div className="ssm-filter-row">
          <div className="ssm-search">
            <Search size={16} color="#94a3b8" />
            <input type="text" placeholder="Search study material..." />
          </div>
          <select className="ssm-select"><option>All Subjects</option></select>
          <select className="ssm-select"><option>All Topics</option></select>
          <button className="ssm-filter-btn"><SlidersHorizontal size={14}/> Filters</button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="ssm-grid">
        <div className="ssm-left">
          {/* Material Type Cards */}
          <div className="ssm-type-row">
            {TYPE_CARDS.map((t, i) => (
              <div
                key={i}
                className={`ssm-type-card ${activeType === i ? 'active' : ''}`}
                onClick={() => setActiveType(i)}
              >
                <div className="ssm-tc-label">{t.label}</div>
                <div className="ssm-tc-val">{t.val}</div>
                <div className="ssm-tc-sub">{t.sub}</div>
                <div className="ssm-tc-icon" style={{background: t.iconBg, color: t.bg}}>{t.icon}</div>
              </div>
            ))}
          </div>

          {/* Browse by Subject */}
          <div>
            <div className="ssm-section-head">
              <div className="ssm-section-title">Browse by Subject</div>
              <span className="ssm-view-all">View All Subjects <ArrowRight size={13}/></span>
            </div>
            <div className="ssm-subjects">
              {SUBJECTS.map((s, i) => (
                <div className="ssm-sub-card" key={i}>
                  <div className="ssm-sub-icon" style={{background: s.bg, color: s.color}}>{s.emoji}</div>
                  <div className="ssm-sub-name">{s.name}</div>
                  <div className="ssm-sub-count">{s.count}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recently Added */}
          <div>
            <div className="ssm-section-head" style={{marginBottom: 0}}>
              <div className="ssm-section-title">Recently Added</div>
            </div>
            <div className="ssm-material-list">
              <div className="ssm-mat-tabs">
                {['All', 'E-Books', 'Notes', 'Quick Revision', 'Infographics', 'Clinical Guides'].map(t => (
                  <div key={t} className={`ssm-mat-tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>{t}</div>
                ))}
              </div>
              {MATERIALS.map((m, i) => (
                <div className="ssm-mat-item" key={i}>
                  <div className="ssm-mat-ftype" style={{background: m.ftBg, color: m.ftColor}}>{m.ftype}</div>
                  <div className="ssm-mat-info">
                    <div className="ssm-mat-title">
                      {m.title}
                      {m.isNew && <span className="ssm-mat-new">New</span>}
                    </div>
                    <div className="ssm-mat-type">{m.mtLabel}</div>
                  </div>
                  <div className="ssm-mat-subject">{m.subject}</div>
                  <div className="ssm-mat-date">{m.date}</div>
                  <div className="ssm-mat-size">{m.size}</div>
                  <div className="ssm-mat-actions">
                    <button title="Download"><Download size={16}/></button>
                    <button title="Bookmark"><Bookmark size={16}/></button>
                    <button title="More"><MoreVertical size={16}/></button>
                  </div>
                </div>
              ))}
              <button className="ssm-view-all-btn">View All Study Material <ArrowRight size={14}/></button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="ssm-sidebar">
          {/* Stats */}
          <div className="ssm-side-card">
            <div className="ssm-sc-head">
              <div className="ssm-sc-title">My Study Material Stats</div>
              <div className="ssm-sc-filter">This Month <ChevronDown size={12}/></div>
            </div>
            <div className="ssm-stats-grid">
              <div className="ssm-stat-box">
                <div className="ssm-sb-icon" style={{background:'#dbeafe',color:'#3b82f6'}}><Download size={14}/></div>
                <div className="ssm-sb-info"><div className="ssm-sb-val">18</div><div className="ssm-sb-lbl">Downloaded</div></div>
              </div>
              <div className="ssm-stat-box">
                <div className="ssm-sb-icon" style={{background:'#e0e7ff',color:'#4f46e5'}}><Bookmark size={14}/></div>
                <div className="ssm-sb-info"><div className="ssm-sb-val">42</div><div className="ssm-sb-lbl">Bookmarks</div></div>
              </div>
              <div className="ssm-stat-box">
                <div className="ssm-sb-icon" style={{background:'#dcfce7',color:'#16a34a'}}><span style={{fontSize:13}}>⏱️</span></div>
                <div className="ssm-sb-info"><div className="ssm-sb-val">26h 40m</div><div className="ssm-sb-lbl">Time Spent</div></div>
              </div>
              <div className="ssm-stat-box">
                <div className="ssm-sb-icon" style={{background:'#fef3c7',color:'#d97706'}}><BookOpen size={14}/></div>
                <div className="ssm-sb-info"><div className="ssm-sb-val">128</div><div className="ssm-sb-lbl">Materials Viewed</div></div>
              </div>
            </div>
          </div>

          {/* Continue Reading */}
          <div className="ssm-side-card">
            <div className="ssm-sc-head" style={{marginBottom:12}}>
              <div className="ssm-sc-title">Continue Reading</div>
            </div>
            <div className="ssm-cr-card">
              <div className="ssm-cr-cover">
                <BookOpen size={24} color="white" />
              </div>
              <div className="ssm-cr-body">
                <div className="ssm-cr-title">Pharmacology – Diuretics and Their Uses</div>
                <div className="ssm-cr-sub">PDF Notes • 12 Pages</div>
                <div className="ssm-cr-progress"><div className="ssm-cr-fill" style={{width:'66%'}}></div></div>
                <div className="ssm-cr-pct">66% Complete</div>
                <button className="ssm-cr-btn">Continue <ArrowRight size={11}/></button>
              </div>
            </div>
          </div>

          {/* Top Materials */}
          <div className="ssm-side-card">
            <div className="ssm-sc-head">
              <div className="ssm-sc-title">Top Materials</div>
            </div>
            <div className="ssm-top-tabs">
              {['Viewed', 'Downloaded', 'Bookmarked'].map(t => (
                <div key={t} className={`ssm-top-tab ${topTab === t ? 'active' : ''}`} onClick={() => setTopTab(t)}>{t}</div>
              ))}
            </div>
            {TOP_MATERIALS.map((m, i) => (
              <div className="ssm-top-item" key={i}>
                <div className="ssm-top-num">{i + 1}</div>
                <div className="ssm-top-info">
                  <div className="ssm-top-name">{m.name}</div>
                  <div className="ssm-top-sub">{m.sub}</div>
                </div>
                <div className="ssm-top-views"><Eye size={11}/> {m.views}</div>
              </div>
            ))}
          </div>

          {/* Request Material */}
          <div className="ssm-request-card">
            <div className="ssm-req-title">Can't find what you need?</div>
            <div className="ssm-req-sub">Request a topic or material and we will add it for you.</div>
            <button className="ssm-req-btn">Request Material <ArrowRight size={12}/></button>
            <div className="ssm-req-img">📬</div>
          </div>

        </div>
      </div>
    </div>
  );
}
