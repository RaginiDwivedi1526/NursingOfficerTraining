import React, { useState } from 'react';
import { 
  Search, SlidersHorizontal, Play, ChevronRight, Bookmark, 
  MoreVertical, Clock, Download, FileText, CheckCircle2, ChevronDown
} from 'lucide-react';
import './StudentRecordedClasses.css';

export default function RecordedClasses() {
  const [activeTab, setActiveTab] = useState('Recent Added');

  // Placeholder data for the class list based on the image
  const classList = [
    {
      subject: 'PHARMACOLOGY',
      title: 'Diuretics & Their Uses',
      instructor: 'Pharmacology • Dr. Rajendra Jinjwaria',
      desc: 'Complete concept of diuretics, classification, mechanism and clinical uses with important MCQs.',
      date: '26 May 2024',
      duration: '1h 12m',
      time: '1:12:45',
      bg: 'linear-gradient(135deg, #0f172a, #1e1b4b)'
    },
    {
      subject: 'MEDICAL SURGICAL NURSING',
      title: 'Fluid & Electrolyte Balance',
      instructor: 'Medical Surgical Nursing • Dr. Rajendra Jinjwaria',
      desc: 'Detailed explanation of body fluids, electrolytes and their balance with clinical implications.',
      date: '25 May 2024',
      duration: '1h 28m',
      time: '1:28:36',
      bg: 'linear-gradient(135deg, #0f172a, #1e3a8a)'
    },
    {
      subject: 'COMMUNITY HEALTH NURSING',
      title: 'National Health Programs in India',
      instructor: 'Community Health Nursing • Mrs. Neha Verma',
      desc: 'Important national health programs, objectives and recent updates for nursing exams.',
      date: '24 May 2024',
      duration: '1h 05m',
      time: '1:05:20',
      bg: 'linear-gradient(135deg, #064e3b, #0f172a)'
    },
    {
      subject: 'ANATOMY & PHYSIOLOGY',
      title: 'Cardiovascular System',
      instructor: 'Anatomy & Physiology • Dr. Pooja Singh',
      desc: 'Structure, functions, blood circulation and important exam points.',
      date: '23 May 2024',
      duration: '1h 18m',
      time: '1:18:10',
      bg: 'linear-gradient(135deg, #2e1065, #0f172a)'
    },
    {
      subject: 'MENTAL HEALTH NURSING',
      title: 'Anxiety Disorders',
      instructor: 'Mental Health Nursing • Dr. Pooja Singh',
      desc: 'Types, causes, signs, symptoms and nursing management.',
      date: '22 May 2024',
      duration: '1h 02m',
      time: '1:02:15',
      bg: 'linear-gradient(135deg, #7c2d12, #0f172a)'
    }
  ];

  return (
    <div className="src-container">
      {/* Header & Filters */}
      <div className="src-header-row">
        <div className="src-header-left">
          <h1>Recorded Classes</h1>
          <p>Watch, learn and revise anytime, anywhere at your own pace.</p>
        </div>
        <div className="src-filters">
          <div className="src-search">
            <Search size={16} color="#94a3b8" />
            <input type="text" placeholder="Search recorded classes..." />
          </div>
          <select className="src-filter-select"><option>All Subjects</option></select>
          <select className="src-filter-select"><option>All Faculty</option></select>
          <select className="src-filter-select"><option>Sort by: Latest</option></select>
          <button className="src-filter-btn"><SlidersHorizontal size={14}/> Filters</button>
        </div>
      </div>

      {/* Category Carousel */}
      <div className="src-categories">
        <div className="src-cat-card active">
          <div className="src-cat-icon"><Play size={16} fill="currentColor"/></div>
          <div className="src-cat-title">All Recorded<br/>Classes</div>
          <div className="src-cat-count">1,248 Classes</div>
        </div>
        <div className="src-cat-card">
          <div className="src-cat-icon" style={{color:'#10b981',background:'#dcfce7'}}><FileText size={16}/></div>
          <div className="src-cat-title">Medical Surgical<br/>Nursing</div>
          <div className="src-cat-count">312 Classes</div>
        </div>
        <div className="src-cat-card">
          <div className="src-cat-icon" style={{color:'#f59e0b',background:'#fef3c7'}}><Clock size={16}/></div>
          <div className="src-cat-title"><br/>Pharmacology</div>
          <div className="src-cat-count">176 Classes</div>
        </div>
        <div className="src-cat-card">
          <div className="src-cat-icon" style={{color:'#ef4444',background:'#fee2e2'}}><CheckCircle2 size={16}/></div>
          <div className="src-cat-title">Community Health<br/>Nursing</div>
          <div className="src-cat-count">142 Classes</div>
        </div>
        <div className="src-cat-card">
          <div className="src-cat-icon" style={{color:'#3b82f6',background:'#dbeafe'}}><CheckCircle2 size={16}/></div>
          <div className="src-cat-title">Child Health<br/>Nursing</div>
          <div className="src-cat-count">118 Classes</div>
        </div>
        <div className="src-cat-card">
          <div className="src-cat-icon" style={{color:'#8b5cf6',background:'#e0e7ff'}}><CheckCircle2 size={16}/></div>
          <div className="src-cat-title">Mental Health<br/>Nursing</div>
          <div className="src-cat-count">96 Classes</div>
        </div>
        <div style={{display:'flex',alignItems:'center'}}>
          <button style={{width:32,height:32,borderRadius:16,border:'1px solid #e2e8f0',background:'white',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}><ChevronRight size={16}/></button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="src-main-grid">
        <div className="src-left">
          {/* Hero Banner */}
          <div className="src-hero">
            <div className="src-hero-graphic">
              <div style={{width:80,height:50,border:'2px solid white',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(255,255,255,0.2)'}}>
                <Play size={24} fill="white"/>
              </div>
            </div>
            <div className="src-hero-info">
              <div className="src-hero-lbl">Continue Watching</div>
              <div className="src-hero-title">Fluid & Electrolyte Balance</div>
              <div className="src-hero-sub">Medical Surgical Nursing • Dr. Rajendra Jinjwaria</div>
              <div className="src-hero-progress-row">
                <div className="src-hero-track"><div className="src-hero-fill" style={{width:'65%'}}></div></div>
                <div className="src-hero-pct">65% Completed</div>
                <button className="src-hero-btn">Continue Watching <Play size={12} fill="white"/></button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="src-tabs">
            {['Recent Added', 'In Progress', 'Completed', 'Bookmarked'].map(t => (
              <div key={t} className={`src-tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>{t}</div>
            ))}
          </div>

          {/* Class List */}
          <div className="src-class-list">
            {classList.map((cls, idx) => (
              <div className="src-class-card" key={idx}>
                <div className="src-cc-thumb" style={{background: cls.bg}}>
                  <div className="src-cc-tinfo">
                    <div className="src-cc-tsub">{cls.subject}</div>
                    <div className="src-cc-ttitle">{cls.title}</div>
                  </div>
                  <div className="src-cc-len">{cls.time}</div>
                </div>
                <div className="src-cc-body">
                  <div className="src-cc-title">{cls.title}</div>
                  <div className="src-cc-meta">{cls.instructor}</div>
                  <div className="src-cc-desc">{cls.desc}</div>
                </div>
                <div className="src-cc-right">
                  <div style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
                    <div className="src-cc-date">{cls.date}</div>
                    <MoreVertical size={14} color="#94a3b8" cursor="pointer"/>
                  </div>
                  <div className="src-cc-stats">
                    <div style={{display:'flex',alignItems:'center',gap:4}}><Clock size={12}/> {cls.duration}</div>
                    <div style={{border:'1px solid #cbd5e1',padding:'1px 4px',borderRadius:4,fontSize:9,fontWeight:700}}>HD</div>
                  </div>
                  <div className="src-cc-actions">
                    <button className="src-cc-btn-watch">Watch Now</button>
                    <button className="src-cc-btn-bm"><Bookmark size={14}/></button>
                  </div>
                </div>
              </div>
            ))}
            <button className="src-load-more">Load More Classes <ChevronDown size={14}/></button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="src-sidebar">
          
          <div className="src-side-card">
            <div className="src-sc-header">
              <div className="src-sc-title">Your Learning Stats</div>
              <div className="src-sc-filter">This Month <ChevronDown size={12}/></div>
            </div>
            <div className="src-stats-grid">
              <div className="src-stat-box">
                <div className="src-sb-icon" style={{background:'#f3e8ff',color:'#a855f7'}}><Play size={14} fill="currentColor"/></div>
                <div><div className="src-sb-val">48</div><div className="src-sb-lbl">Classes Watched</div></div>
              </div>
              <div className="src-stat-box">
                <div className="src-sb-icon" style={{background:'#dcfce7',color:'#22c55e'}}><Clock size={14}/></div>
                <div><div className="src-sb-val">62h 35m</div><div className="src-sb-lbl">Watch Time</div></div>
              </div>
              <div className="src-stat-box">
                <div className="src-sb-icon" style={{background:'#ffedd5',color:'#f97316'}}><FileText size={14}/></div>
                <div><div className="src-sb-val">18</div><div className="src-sb-lbl">Notes Made</div></div>
              </div>
              <div className="src-stat-box">
                <div className="src-sb-icon" style={{background:'#e0e7ff',color:'#3b82f6'}}><Download size={14}/></div>
                <div><div className="src-sb-val">32</div><div className="src-sb-lbl">Downloads</div></div>
              </div>
            </div>
          </div>

          <div className="src-side-card">
            <div className="src-sc-header">
              <div className="src-sc-title">Subject Wise Watch Time</div>
              <div className="src-sc-filter">This Month <ChevronDown size={12}/></div>
            </div>
            <div>
              <div className="src-wt-row"><div className="src-wt-head"><span className="src-wt-name">Medical Surgical Nursing</span><span className="src-wt-val">22h 15m (40%)</span></div><div className="src-wt-track"><div className="src-wt-fill" style={{width:'40%', background:'#4f46e5'}}></div></div></div>
              <div className="src-wt-row"><div className="src-wt-head"><span className="src-wt-name">Pharmacology</span><span className="src-wt-val">14h 30m (26%)</span></div><div className="src-wt-track"><div className="src-wt-fill" style={{width:'26%', background:'#3b82f6'}}></div></div></div>
              <div className="src-wt-row"><div className="src-wt-head"><span className="src-wt-name">Community Health Nursing</span><span className="src-wt-val">9h 20m (17%)</span></div><div className="src-wt-track"><div className="src-wt-fill" style={{width:'17%', background:'#10b981'}}></div></div></div>
              <div className="src-wt-row"><div className="src-wt-head"><span className="src-wt-name">Anatomy & Physiology</span><span className="src-wt-val">6h 10m (11%)</span></div><div className="src-wt-track"><div className="src-wt-fill" style={{width:'11%', background:'#ec4899'}}></div></div></div>
              <div className="src-wt-row"><div className="src-wt-head"><span className="src-wt-name">Mental Health Nursing</span><span className="src-wt-val">4h 20m (8%)</span></div><div className="src-wt-track"><div className="src-wt-fill" style={{width:'8%', background:'#f59e0b'}}></div></div></div>
            </div>
          </div>

          <div className="src-side-card">
            <div className="src-sc-header">
              <div className="src-sc-title">Recently Watched</div>
              <div className="src-sc-filter" style={{color:'#4f46e5', fontWeight:600}}>View All</div>
            </div>
            <div>
              <div className="src-rw-item">
                <div className="src-rw-thumb" style={{background:'linear-gradient(135deg, #0f172a, #1e3a8a)'}}><Play size={10} fill="white"/></div>
                <div className="src-rw-info">
                  <div className="src-rw-title">Fluid & Electrolyte Balance</div>
                  <div className="src-rw-sub">Medical Surgical Nursing</div>
                </div>
                <div className="src-rw-pct">65%</div>
              </div>
              <div className="src-rw-item">
                <div className="src-rw-thumb" style={{background:'linear-gradient(135deg, #0f172a, #1e1b4b)'}}><Play size={10} fill="white"/></div>
                <div className="src-rw-info">
                  <div className="src-rw-title">Diuretics & Their Uses</div>
                  <div className="src-rw-sub">Pharmacology</div>
                </div>
                <div className="src-rw-pct">100%</div>
              </div>
              <div className="src-rw-item">
                <div className="src-rw-thumb" style={{background:'linear-gradient(135deg, #064e3b, #0f172a)'}}><Play size={10} fill="white"/></div>
                <div className="src-rw-info">
                  <div className="src-rw-title">National Health Programs...</div>
                  <div className="src-rw-sub">Community Health Nursing</div>
                </div>
                <div className="src-rw-pct">30%</div>
              </div>
              <div className="src-rw-item">
                <div className="src-rw-thumb" style={{background:'linear-gradient(135deg, #2e1065, #0f172a)'}}><Play size={10} fill="white"/></div>
                <div className="src-rw-info">
                  <div className="src-rw-title">Cardiovascular System</div>
                  <div className="src-rw-sub">Anatomy & Physiology</div>
                </div>
                <div className="src-rw-pct">80%</div>
              </div>
            </div>
          </div>

          <div className="src-promo">
            <h4>Download & Learn Offline</h4>
            <p>Download lectures and watch anytime without internet.</p>
            <button className="src-promo-btn">Go to Downloads →</button>
            <div className="src-promo-icon"><Download size={32}/></div>
          </div>

        </div>
      </div>
    </div>
  );
}
