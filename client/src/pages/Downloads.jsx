import React, { useState } from 'react';
import { Search, SlidersHorizontal, ChevronDown, DownloadCloud, Folder, Trash2, MoreVertical, ArrowRight, ChevronRight, Crown } from 'lucide-react';
import './StudentDownloads.css';

export default function Downloads() {
  const [activeTab, setActiveTab] = useState('All Downloads');

  const TABS = [
    { id: 'All Downloads', count: 56 },
    { id: 'Study Materials', count: 24 },
    { id: 'Tests', count: 18 },
    { id: 'PYQs', count: 8 },
    { id: 'Notes', count: 4 },
    { id: 'Others', count: 2 },
  ];

  const ITEMS = [
    { icon: '📄', iconBg: '#fee2e2', title: 'Anatomy & Physiology - Complete Notes', sub: 'High Yield Notes', type: 'PDF', typeClass: 'tb-pdf', subject: 'Anatomy & Physiology', size: '12.4 MB', date: '23 May 2024\n10:24 AM' },
    { icon: '📄', iconBg: '#dcfce7', title: 'Pharmacology - Important Topics', sub: 'Study Material', type: 'PDF', typeClass: 'tb-pdf', subject: 'Pharmacology', size: '8.7 MB', date: '22 May 2024\n09:15 PM' },
    { icon: '📄', iconBg: '#f5f3ff', title: 'Mock Test – 05', sub: 'Full Length Test', type: 'PDF', typeClass: 'tb-pdf', subject: 'Full Length Test', size: '3.2 MB', date: '22 May 2024\n08:45 PM' },
    { icon: '📦', iconBg: '#eff6ff', title: 'PYQ – Medical Surgical Nursing', sub: '2018 - 2023', type: 'ZIP', typeClass: 'tb-zip', subject: 'Medical Surgical Nursing', size: '45.6 MB', date: '21 May 2024\n07:30 PM' },
    { icon: '▶️', iconBg: '#ffedd5', title: 'Community Health Nursing', sub: 'Video Lecture', type: 'MP4', typeClass: 'tb-mp4', subject: 'Community Health Nursing', size: '126 MB', date: '21 May 2024\n06:20 PM' },
    { icon: '📄', iconBg: '#dcfce7', title: 'Mental Health Nursing - Notes', sub: 'Quick Revision Notes', type: 'PDF', typeClass: 'tb-pdf', subject: 'Mental Health Nursing', size: '6.1 MB', date: '20 May 2024\n05:50 PM' },
    { icon: '📄', iconBg: '#fee2e2', title: 'NORCET 2023 - Solved Paper', sub: 'Detailed Solutions', type: 'PDF', typeClass: 'tb-pdf', subject: 'Previous Year Paper', size: '9.8 MB', date: '20 May 2024\n04:40 PM' },
    { icon: '📄', iconBg: '#eff6ff', title: 'Nursing Process - Charts', sub: 'Quick Reference', type: 'PDF', typeClass: 'tb-pdf', subject: 'Nursing Foundation', size: '5.3 MB', date: '19 May 2024\n03:25 PM' },
  ];

  return (
    <div className="dl-container">
      {/* ─── LEFT ─── */}
      <div className="dl-left">
        
        {/* Header */}
        <div className="dl-header">
          <h1>Downloads 📥</h1>
          <p>All your downloaded study materials, tests and resources in one place.</p>
        </div>

        {/* Tabs */}
        <div className="dl-tabs">
          {TABS.map(t => (
            <div key={t.id} className={`dl-tab ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
              {t.id} ({t.count})
            </div>
          ))}
        </div>

        {/* Stats Strip */}
        <div className="dl-stats">
          <div className="dl-stat-box">
            <div className="dl-s-icon" style={{background:'#f5f3ff',color:'#7c3aed'}}>📄</div>
            <div>
              <div className="dl-s-val">56</div>
              <div className="dl-s-lbl">Total Downloads</div>
              <div className="dl-s-trend">↑ 12 this week</div>
            </div>
          </div>
          <div className="dl-stat-box">
            <div className="dl-s-icon" style={{background:'#dcfce7',color:'#16a34a'}}>💾</div>
            <div>
              <div className="dl-s-val">1.42 <span style={{fontSize:14,color:'#64748b'}}>GB</span></div>
              <div className="dl-s-lbl">Total Size</div>
              <div className="dl-s-trend">↑ 280 MB this week</div>
            </div>
          </div>
          <div className="dl-stat-box">
            <div className="dl-s-icon" style={{background:'#ffedd5',color:'#ea580c'}}>📁</div>
            <div>
              <div className="dl-s-val">24</div>
              <div className="dl-s-lbl">PDF Files</div>
            </div>
          </div>
          <div className="dl-stat-box">
            <div className="dl-s-icon" style={{background:'#eff6ff',color:'#3b82f6'}}>▶️</div>
            <div>
              <div className="dl-s-val">12</div>
              <div className="dl-s-lbl">Videos</div>
            </div>
          </div>
          <div className="dl-stat-box">
            <div className="dl-s-icon" style={{background:'#fdf4ff',color:'#c026d3'}}>📦</div>
            <div>
              <div className="dl-s-val">8</div>
              <div className="dl-s-lbl">ZIP Files</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="dl-filter-row">
          <div className="dl-search">
            <Search size={16} color="#94a3b8"/>
            <input type="text" placeholder="Search downloads..."/>
          </div>
          <select className="dl-select"><option>All Types</option></select>
          <select className="dl-select"><option>All Subjects</option></select>
          <select className="dl-select"><option>Latest First</option></select>
          <button className="dl-filter-btn"><SlidersHorizontal size={14}/> Filters</button>
        </div>

        {/* Table */}
        <div className="dl-table-wrap">
          <div className="dl-table-header">Downloaded Items</div>
          <table className="dl-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Subject</th>
                <th>Size</th>
                <th>Downloaded On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {ITEMS.map((item, i) => (
                <tr key={i}>
                  <td>
                    <div className="dl-item-cell">
                      <div className="dl-item-icon" style={{background: item.iconBg}}>{item.icon}</div>
                      <div className="dl-item-info">
                        <div className="dl-item-title">{item.title}</div>
                        <div className="dl-item-sub">{item.sub}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className={`dl-type-badge ${item.typeClass}`}>{item.type}</span></td>
                  <td>{item.subject}</td>
                  <td>{item.size}</td>
                  <td style={{whiteSpace:'pre-line'}}>{item.date}</td>
                  <td>
                    <div className="dl-actions">
                      <button className="dl-btn-icon"><DownloadCloud size={16}/></button>
                      <button className="dl-btn-icon"><Folder size={16}/></button>
                      <button className="dl-btn-icon danger"><Trash2 size={16}/></button>
                      <button className="dl-btn-icon"><MoreVertical size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="dl-load-more">Load More <ChevronDown size={14}/></button>
        </div>

        {/* Promo Footer */}
        <div className="dl-promo-banner">
          <div className="dl-pb-left">
            <div className="dl-pb-img">📱</div>
            <div>
              <div className="dl-pb-title">Take your study material everywhere!</div>
              <div className="dl-pb-text">Access all downloaded content even without internet and boost your preparation.</div>
            </div>
          </div>
          <button className="dl-pb-btn">Download Mobile App <ArrowRight size={14}/></button>
        </div>

      </div>

      {/* ─── RIGHT SIDEBAR ─── */}
      <div className="dl-sidebar">
        
        {/* Storage Overview */}
        <div className="dl-card">
          <div className="dl-card-title">Storage Overview</div>
          <div className="dl-storage-inner">
            <div className="dl-donut">
              <svg viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="14" fill="none" stroke="#f1f5f9" strokeWidth="4"/>
                <circle cx="18" cy="18" r="14" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="55 45" strokeDashoffset="0" transform="rotate(-90 18 18)"/>
                <circle cx="18" cy="18" r="14" fill="none" stroke="#3b82f6" strokeWidth="4" strokeDasharray="23 77" strokeDashoffset="-55" transform="rotate(-90 18 18)"/>
                <circle cx="18" cy="18" r="14" fill="none" stroke="#4f46e5" strokeWidth="4" strokeDasharray="15 85" strokeDashoffset="-78" transform="rotate(-90 18 18)"/>
                <circle cx="18" cy="18" r="14" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="7 93" strokeDashoffset="-93" transform="rotate(-90 18 18)"/>
              </svg>
              <div className="dl-donut-label">
                <div className="dl-donut-val">1.42<span style={{fontSize:10}}>GB</span></div>
                <div className="dl-donut-sub">Used</div>
              </div>
            </div>
            <div className="dl-legend">
              <div className="dl-legend-row"><div className="dl-leg-dot" style={{background:'#ef4444'}}></div><span className="dl-leg-name">PDF Files</span><span className="dl-leg-val">780 MB</span></div>
              <div className="dl-legend-row"><div className="dl-leg-dot" style={{background:'#3b82f6'}}></div><span className="dl-leg-name">Videos</span><span className="dl-leg-val">320 MB</span></div>
              <div className="dl-legend-row"><div className="dl-leg-dot" style={{background:'#4f46e5'}}></div><span className="dl-leg-name">ZIP Files</span><span className="dl-leg-val">210 MB</span></div>
              <div className="dl-legend-row"><div className="dl-leg-dot" style={{background:'#f59e0b'}}></div><span className="dl-leg-name">Others</span><span className="dl-leg-val">110 MB</span></div>
            </div>
          </div>
        </div>

        {/* Quick Access */}
        <div className="dl-card">
          <div className="dl-card-title">Quick Access</div>
          <div className="dl-qa-list">
            <div className="dl-qa-item">
              <div className="dl-qa-icon" style={{background:'#eff6ff',color:'#3b82f6'}}>🕒</div>
              <div className="dl-qa-info">
                <div className="dl-qa-title">Recently Downloaded</div>
                <div className="dl-qa-sub">8 items</div>
              </div>
              <ChevronRight size={14} color="#94a3b8"/>
            </div>
            <div className="dl-qa-item">
              <div className="dl-qa-icon" style={{background:'#f5f3ff',color:'#7c3aed'}}>📁</div>
              <div className="dl-qa-info">
                <div className="dl-qa-title">Large Files</div>
                <div className="dl-qa-sub">Above 50 MB</div>
              </div>
              <ChevronRight size={14} color="#94a3b8"/>
            </div>
            <div className="dl-qa-item">
              <div className="dl-qa-icon" style={{background:'#dcfce7',color:'#16a34a'}}>📝</div>
              <div className="dl-qa-info">
                <div className="dl-qa-title">Offline Tests</div>
                <div className="dl-qa-sub">18 tests available</div>
              </div>
              <ChevronRight size={14} color="#94a3b8"/>
            </div>
            <div className="dl-qa-item">
              <div className="dl-qa-icon" style={{background:'#fee2e2',color:'#ef4444'}}>📚</div>
              <div className="dl-qa-info">
                <div className="dl-qa-title">All Study Materials</div>
                <div className="dl-qa-sub">24 files</div>
              </div>
              <ChevronRight size={14} color="#94a3b8"/>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="dl-tips-card">
          <div className="dl-tips-title">Download Tips</div>
          <div className="dl-tip"><span className="dl-tip-check">✓</span> Download PDFs for offline reading</div>
          <div className="dl-tip"><span className="dl-tip-check">✓</span> Watch videos anytime, anywhere</div>
          <div className="dl-tip"><span className="dl-tip-check">✓</span> ZIP files contain organized content</div>
          <div className="dl-tip"><span className="dl-tip-check">✓</span> Save more and study smart!</div>
          <div className="dl-tips-img">📥</div>
        </div>

        {/* Upgrade Storage */}
        <div className="dl-up-card">
          <div className="dl-up-title">Need More Space?</div>
          <div className="dl-up-text">You have used 78% of your storage. Upgrade now for more downloads.</div>
          <div className="dl-up-img">💽</div>
          <button className="dl-up-btn"><Crown size={14}/> Upgrade Storage</button>
        </div>

      </div>
    </div>
  );
}
