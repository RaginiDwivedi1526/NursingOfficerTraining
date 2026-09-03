import React, { useState } from 'react';
import {
  Search, SlidersHorizontal, Plus, Upload, Folder, PenLine,
  Star, Bookmark, MoreVertical, ChevronLeft, ChevronRight,
  FileText, Crown
} from 'lucide-react';
import './StudentNotes.css';

const SUBJECTS = [
  { name: 'All Subjects', count: 128, active: true },
  { name: 'Medical Surgical Nursing', count: 32 },
  { name: 'Pharmacology', count: 21 },
  { name: 'Anatomy & Physiology', count: 18 },
  { name: 'Community Health Nursing', count: 16 },
  { name: 'Mental Health Nursing', count: 12 },
  { name: 'Child Health Nursing', count: 9 },
  { name: 'Nursing Foundation', count: 8 },
  { name: 'Others', count: 12 },
];

const NOTES = [
  {
    title: 'Fluid & Electrolyte Balance',
    starred: true,
    type: 'Handwritten Note',
    subject: 'Med Surg Nursing',
    subColor: '#1d4ed8', subBg: '#dbeafe',
    topic: 'Nursing Care',
    updated: 'Today, 10:30 AM',
    thumbColor: '#e0e7ff'
  },
  {
    title: 'Diuretics – Important Points',
    starred: false,
    type: 'Typed Note',
    subject: 'Pharmacology',
    subColor: '#16a34a', subBg: '#dcfce7',
    topic: 'Diuretics',
    updated: 'Today, 09:15 AM',
    thumbColor: '#f0fdf4'
  },
  {
    title: 'Anatomy of Heart – Diagram',
    starred: false,
    type: 'Handwritten Note',
    subject: 'Anatomy & Physiology',
    subColor: '#ea580c', subBg: '#ffedd5',
    topic: 'Heart',
    updated: 'Yesterday, 07:45 PM',
    thumbColor: '#fff7ed'
  },
  {
    title: 'Community Health Programs',
    starred: false,
    type: 'Typed Note',
    subject: 'Community Health',
    subColor: '#0d9488', subBg: '#ccfbf1',
    topic: 'National Programs',
    updated: 'Yesterday, 06:20 PM',
    thumbColor: '#f0fdfa'
  },
  {
    title: 'Psychiatric Nursing – Key Terms',
    starred: false,
    type: 'Handwritten Note',
    subject: 'Mental Health Nursing',
    subColor: '#db2777', subBg: '#fce7f3',
    topic: 'Psychiatric Care',
    updated: 'Yesterday, 05:10 PM',
    thumbColor: '#fdf2f8'
  },
  {
    title: 'Childhood Immunization Schedule',
    starred: false,
    type: 'Handwritten Note',
    subject: 'Child Health Nursing',
    subColor: '#2563eb', subBg: '#dbeafe',
    topic: 'Immunization',
    updated: '25 May 2024',
    thumbColor: '#eff6ff'
  },
  {
    title: 'Nursing Process – Flow Chart',
    starred: false,
    type: 'Handwritten Note',
    subject: 'Nursing Foundation',
    subColor: '#d97706', subBg: '#fef3c7',
    topic: 'Nursing Process',
    updated: '24 May 2024',
    thumbColor: '#fefce8'
  },
];

const RECENT_NOTES = [
  { title: 'Fluid & Electrolyte Balance', sub: 'Med Surg Nursing', time: 'Today, 10:30 AM', bg: '#e0e7ff' },
  { title: 'Diuretics – Important Points', sub: 'Pharmacology', time: 'Today, 09:15 AM', bg: '#dcfce7' },
  { title: 'Anatomy of Heart – Diagram', sub: 'Anatomy & Physiology', time: 'Yesterday, 07:45 PM', bg: '#ffedd5' },
  { title: 'Psychiatric Nursing – Key Terms', sub: 'Mental Health Nursing', time: 'Yesterday, 05:10 PM', bg: '#fce7f3' },
];

const QUICK_ACTIONS = [
  { icon: '+', iconBg: '#4f46e5', color: '#fff', name: 'Note', desc: 'Create new note' },
  { icon: '↑', iconBg: '#10b981', color: '#fff', name: 'Upload Notes', desc: 'PDF, Image, Doc' },
  { icon: '📁', iconBg: '#f59e0b', color: '#fff', name: 'New Folder', desc: 'Organize notes' },
  { icon: '✏️', iconBg: '#8b5cf6', color: '#fff', name: 'Handwritten Note', desc: 'Use digital notebook' },
];

export default function Notes() {
  const [activeTab, setActiveTab] = useState('My Notes');
  const [activeSub, setActiveSub] = useState('All Subjects');
  const [activePage, setActivePage] = useState(1);

  return (
    <div className="snp-container">
      {/* ─── LEFT MAIN ─── */}
      <div className="snp-main">
        {/* Header */}
        <div className="snp-header">
          <h1><FileText size={22} /> My Notes</h1>
          <p>Create, organize and revise your handwritten & important notes in one place.</p>
        </div>

        {/* Tabs */}
        <div className="snp-tabs">
          {['My Notes', 'Shared with Me', 'My Folders'].map(t => (
            <div key={t} className={`snp-tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>{t}</div>
          ))}
        </div>

        {/* Stats Strip */}
        <div className="snp-stats-row">
          <div className="snp-stat-card">
            <div className="snp-sc-icon" style={{background:'#e0e7ff'}}>📝</div>
            <div className="snp-sc-info"><div className="snp-sc-val">128</div><div className="snp-sc-lbl">All Notes</div></div>
          </div>
          <div className="snp-stat-card">
            <div className="snp-sc-icon" style={{background:'#fef3c7'}}>📁</div>
            <div className="snp-sc-info"><div className="snp-sc-val">18</div><div className="snp-sc-lbl">Folders</div></div>
          </div>
          <div className="snp-stat-card">
            <div className="snp-sc-icon" style={{background:'#dcfce7'}}>🔖</div>
            <div className="snp-sc-info"><div className="snp-sc-val">26</div><div className="snp-sc-lbl">Bookmarked</div></div>
          </div>
          <div className="snp-stat-card">
            <div className="snp-sc-icon" style={{background:'#fdf2f8'}}>✍️</div>
            <div className="snp-sc-info"><div className="snp-sc-val">42</div><div className="snp-sc-lbl">Handwritten</div></div>
          </div>
          <div className="snp-stat-card">
            <div className="snp-sc-icon" style={{background:'#eff6ff'}}>⏱️</div>
            <div className="snp-sc-info"><div className="snp-sc-val">26h 40m</div><div className="snp-sc-lbl">Study Time This Month</div></div>
          </div>
        </div>

        {/* Filter Row */}
        <div className="snp-filter-row">
          <div className="snp-search">
            <Search size={16} color="#94a3b8" />
            <input type="text" placeholder="Search notes by title, topic..." />
          </div>
          <select className="snp-select"><option>All Subjects</option></select>
          <select className="snp-select"><option>All Topics</option></select>
          <select className="snp-select"><option>Sort by: Latest</option></select>
          <button className="snp-filter-btn"><SlidersHorizontal size={14}/> Filters</button>
        </div>

        {/* Body Split: Subjects + Notes Table */}
        <div className="snp-body">
          {/* Subject List */}
          <div className="snp-subjects">
            <div className="snp-sub-section-title">Subjects</div>
            {SUBJECTS.map((s, i) => (
              <div
                key={i}
                className={`snp-sub-item ${activeSub === s.name ? 'active' : ''}`}
                onClick={() => setActiveSub(s.name)}
              >
                <span>{s.name}</span>
                <span className="snp-sub-badge">{s.count}</span>
              </div>
            ))}

            {/* Storage */}
            <div className="snp-storage">
              <div className="snp-storage-title">Storage Used</div>
              <div className="snp-storage-track">
                <div className="snp-storage-fill" style={{width:'48%'}}></div>
              </div>
              <div className="snp-storage-info">
                <span>2.4 GB of 5 GB</span>
                <span className="snp-storage-pct">48%</span>
              </div>
              <button className="snp-upgrade-btn"><Crown size={12}/> Upgrade Storage +</button>
            </div>
          </div>

          {/* Notes Table */}
          <div className="snp-table-wrap">
            <div className="snp-table-header">
              <span>NOTE TITLE</span>
              <span>SUBJECT</span>
              <span>TOPIC</span>
              <span>UPDATED ON</span>
              <span>ACTIONS</span>
            </div>

            {NOTES.map((n, i) => (
              <div className="snp-table-row" key={i}>
                <div className="snp-note-cell">
                  <div className="snp-note-thumb" style={{background: n.thumbColor}}>
                    <FileText size={18} color="#94a3b8"/>
                  </div>
                  <div>
                    <div className="snp-note-title">
                      {n.title}
                      {n.starred && <Star size={13} fill="#f59e0b" color="#f59e0b"/>}
                    </div>
                    <div className="snp-note-type">{n.type}</div>
                  </div>
                </div>
                <div>
                  <span className="snp-sub-tag" style={{background: n.subBg, color: n.subColor}}>{n.subject}</span>
                </div>
                <div className="snp-topic-cell">{n.topic}</div>
                <div className="snp-date-cell">{n.updated}</div>
                <div className="snp-actions-cell">
                  <button title="Bookmark"><Bookmark size={15}/></button>
                  <button title="More"><MoreVertical size={15}/></button>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div className="snp-pagination">
              <button className="snp-pg-btn nav"><ChevronLeft size={14}/></button>
              {[1, 2, 3].map(p => (
                <button key={p} className={`snp-pg-btn ${activePage === p ? 'active' : ''}`} onClick={() => setActivePage(p)}>{p}</button>
              ))}
              <span className="snp-pg-dots">…</span>
              <button className="snp-pg-btn">9</button>
              <button className="snp-pg-btn nav"><ChevronRight size={14}/></button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── RIGHT SIDEBAR ─── */}
      <div className="snp-sidebar">
        {/* Quick Actions */}
        <div className="snp-qa-card">
          <div className="snp-qa-title">Quick Actions</div>
          <div className="snp-qa-grid">
            {QUICK_ACTIONS.map((a, i) => (
              <div className="snp-qa-item" key={i}>
                <div className="snp-qa-icon" style={{background: a.iconBg, color: a.color, fontSize:14, fontWeight:700}}>{a.icon}</div>
                <div className="snp-qa-text">
                  <div className="snp-qa-name">{a.name}</div>
                  <div className="snp-qa-desc">{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Notes */}
        <div className="snp-recent-card">
          <div className="snp-rc-head">
            <div className="snp-rc-title">Recent Notes</div>
            <div className="snp-view-all">View All</div>
          </div>
          {RECENT_NOTES.map((n, i) => (
            <div className="snp-rn-item" key={i}>
              <div className="snp-rn-thumb" style={{background: n.bg}}>
                <FileText size={18} color="#94a3b8"/>
              </div>
              <div className="snp-rn-info">
                <div className="snp-rn-title">{n.title}</div>
                <div className="snp-rn-sub">{n.sub}</div>
                <div className="snp-rn-time">{n.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Active Recall */}
        <div className="snp-recall-card">
          <div className="snp-recall-icon">💡</div>
          <div className="snp-recall-title">Active Recall</div>
          <div className="snp-recall-text">
            Cover your notes and try to recall key points. It strengthens memory and improves long-term retention.
          </div>
          <div className="snp-recall-dots">
            <div className="snp-rd active"></div>
            <div className="snp-rd"></div>
            <div className="snp-rd"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
