import React, { useState } from 'react';
import { 
  Search, SlidersHorizontal, Play, ChevronRight, Bookmark, 
  MoreVertical, Clock, Download, FileText, CheckCircle2, ChevronDown, X, RefreshCw
} from 'lucide-react';
import './StudentRecordedClasses.css';

export default function RecordedClasses() {
  const [activeTab, setActiveTab] = useState('Recent Added');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [bookmarked, setBookmarked] = useState({});

  // Active Video Modal State
  const [activeVideo, setActiveVideo] = useState(null);

  const classList = [
    {
      id: 1,
      subject: 'PHARMACOLOGY',
      title: 'Diuretics & Their Clinical Uses',
      instructor: 'Pharmacology • Dr. Rajendra Jinjwaria',
      desc: 'Complete concept of diuretics, classification, mechanism of action and clinical MCQs.',
      date: '26 May 2024',
      duration: '1h 12m',
      time: '1:12:45',
      bg: 'linear-gradient(135deg, #0f172a, #1e1b4b)',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 2,
      subject: 'MEDICAL SURGICAL NURSING',
      title: 'Fluid & Electrolyte Balance Masterclass',
      instructor: 'Medical Surgical Nursing • Dr. Rajendra Jinjwaria',
      desc: 'Detailed explanation of body fluids, electrolyte imbalance and clinical nursing management.',
      date: '25 May 2024',
      duration: '1h 28m',
      time: '1:28:36',
      bg: 'linear-gradient(135deg, #0f172a, #1e3a8a)',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 3,
      subject: 'COMMUNITY HEALTH NURSING',
      title: 'National Health Programs in India',
      instructor: 'Community Health Nursing • Mrs. Neha Verma',
      desc: 'Important national health programs, ratios, targets and recent updates for NORCET.',
      date: '24 May 2024',
      duration: '1h 05m',
      time: '1:05:20',
      bg: 'linear-gradient(135deg, #064e3b, #0f172a)',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 4,
      subject: 'ANATOMY & PHYSIOLOGY',
      title: 'Cardiovascular System Applied Physiology',
      instructor: 'Anatomy & Physiology • Dr. Pooja Singh',
      desc: 'Cardiac cycle, heart sounds, conduction system and high-yield exam points.',
      date: '23 May 2024',
      duration: '1h 18m',
      time: '1:18:10',
      bg: 'linear-gradient(135deg, #2e1065, #0f172a)',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 5,
      subject: 'MENTAL HEALTH NURSING',
      title: 'Anxiety Disorders & Nursing Care',
      instructor: 'Mental Health Nursing • Dr. Pooja Singh',
      desc: 'Types of anxiety, panic attacks, obsessive compulsive disorders and nursing care plans.',
      date: '22 May 2024',
      duration: '1h 02m',
      time: '1:02:15',
      bg: 'linear-gradient(135deg, #7c2d12, #0f172a)',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  ];

  const toggleBookmark = (id) => {
    setBookmarked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredClasses = classList.filter(c => {
    if (searchQuery && !c.title.toLowerCase().includes(searchQuery.toLowerCase()) && !c.subject.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedSubject !== 'All Subjects' && !c.subject.toLowerCase().includes(selectedSubject.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="src-container">
      {/* Header & Filters */}
      <div className="src-header-row">
        <div className="src-header-left">
          <h1>Recorded Lecture Library 🎥</h1>
          <p>Watch, learn and revise nursing lectures anytime at your own pace.</p>
        </div>
        
        <div className="src-filters">
          <div className="src-search">
            <Search size={16} color="#94a3b8" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recorded classes by title..." 
            />
          </div>
          
          <select 
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="src-filter-select"
            style={{ cursor: 'pointer' }}
          >
            <option value="All Subjects">All Subjects</option>
            <option value="PHARMACOLOGY">Pharmacology</option>
            <option value="MEDICAL SURGICAL">Medical Surgical</option>
            <option value="COMMUNITY HEALTH">Community Health</option>
            <option value="ANATOMY">Anatomy & Physiology</option>
            <option value="MENTAL HEALTH">Mental Health</option>
          </select>
        </div>
      </div>

      {/* Hero Featured Video Banner */}
      <div className="src-hero-card" style={{ background: classList[0].bg }}>
        <div className="src-hero-content">
          <div className="src-badge">FEATURED LECTURE</div>
          <div className="src-hero-title">{classList[0].title}</div>
          <div className="src-hero-inst">{classList[0].instructor}</div>
          <p className="src-hero-desc">{classList[0].desc}</p>
          
          <div className="src-hero-meta">
            <span>📅 {classList[0].date}</span>
            <span>⏱️ {classList[0].duration}</span>
            <span>⭐ 4.9/5 Rating</span>
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <button 
              onClick={() => setActiveVideo(classList[0])}
              className="src-watch-btn" 
              style={{ padding: '10px 20px', borderRadius: 8, background: '#4f46e5', color: '#fff', border: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}
            >
              Watch Video Lecture <Play size={16}/>
            </button>
            <button 
              onClick={() => alert('Downloading class PDF notes...')}
              className="src-notes-btn" 
              style={{ padding: '10px 16px', borderRadius: 8, background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', fontWeight: 600, cursor: 'pointer' }}
            >
              Download PDF Notes
            </button>
          </div>
        </div>

        <div className="src-hero-player-mock" onClick={() => setActiveVideo(classList[0])} style={{ cursor: 'pointer' }}>
          <div className="src-play-circle">
            <Play size={24} color="#fff" fill="#fff"/>
          </div>
          <div className="src-time-badge">{classList[0].time}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="src-tabs">
        {['Recent Added', 'Most Watched', 'Bookmarked', 'Notes Included'].map(t => (
          <div 
            key={t} 
            className={`src-tab ${activeTab === t ? 'active' : ''}`}
            onClick={() => setActiveTab(t)}
            style={{ cursor: 'pointer' }}
          >
            {t}
          </div>
        ))}
      </div>

      {/* Class List */}
      <div className="src-class-list">
        {filteredClasses.map(cls => (
          <div className="src-class-card" key={cls.id}>
            <div className="src-card-thumb" style={{ background: cls.bg }} onClick={() => setActiveVideo(cls)}>
              <div className="src-card-play">
                <Play size={18} color="#fff" fill="#fff"/>
              </div>
              <div className="src-card-time">{cls.time}</div>
            </div>

            <div className="src-card-info">
              <div className="src-card-tag">{cls.subject}</div>
              <div className="src-card-title">{cls.title}</div>
              <div className="src-card-inst">{cls.instructor}</div>
              <p className="src-card-desc">{cls.desc}</p>
              
              <div className="src-card-footer">
                <div style={{ display: 'flex', gap: 12, fontSize: 12, color: '#64748b' }}>
                  <span>📅 {cls.date}</span>
                  <span>⏱️ {cls.duration}</span>
                </div>
                
                <div style={{ display: 'flex', gap: 8 }}>
                  <button 
                    onClick={() => toggleBookmark(cls.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: bookmarked[cls.id] ? '#f59e0b' : '#94a3b8' }}
                  >
                    <Bookmark size={18} fill={bookmarked[cls.id] ? '#f59e0b' : 'none'}/>
                  </button>
                  <button 
                    onClick={() => setActiveVideo(cls)}
                    style={{ padding: '6px 14px', borderRadius: 6, background: '#4f46e5', color: '#fff', border: 'none', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}
                  >
                    Watch Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Video Player */}
      {activeVideo && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: '#0f172a', borderRadius: 16, padding: 24, width: '90%', maxWidth: 720, color: '#fff', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 12, color: '#818cf8', fontWeight: 600 }}>{activeVideo.subject}</div>
                <h3 style={{ margin: 0, fontSize: 18, color: '#f8fafc' }}>{activeVideo.title}</h3>
              </div>
              <button onClick={() => setActiveVideo(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={24}/></button>
            </div>

            <div style={{ position: 'relative', paddingTop: '56.25%', borderRadius: 12, overflow: 'hidden', background: '#000' }}>
              <iframe 
                src={`${activeVideo.videoUrl}?autoplay=1`}
                title={activeVideo.title}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
              <div style={{ fontSize: 13, color: '#94a3b8' }}>{activeVideo.instructor}</div>
              <button 
                onClick={() => alert(`Downloading PDF notes for "${activeVideo.title}"...`)}
                style={{ padding: '8px 16px', borderRadius: 6, background: '#334155', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}
              >
                Download PDF Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
