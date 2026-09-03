import React, { useState } from 'react';
import { PlayCircle, Clock, CheckCircle2, Video, Award, Target, Activity } from 'lucide-react';
import './StudentSkillLab.css';

export default function SkillLab() {
  const [filter, setFilter] = useState('All');
  
  const SKILLS = [
    { id: 1, title: 'Intravenous (IV) Cannulation', category: 'Fundamental', desc: 'Master the step-by-step procedure of inserting an IV line, site selection, and complication management.', duration: '45 mins', modules: 6, progress: 100, color: '#10b981', icon: '💉' },
    { id: 2, title: 'Basic Life Support (BLS)', category: 'Emergency', desc: 'Interactive simulation for adult and pediatric CPR, AED usage, and choking relief protocols.', duration: '1h 20m', modules: 8, progress: 45, color: '#3b82f6', icon: '🫀' },
    { id: 3, title: 'Urinary Catheterization', category: 'Fundamental', desc: 'Male and female indwelling catheter insertion techniques, sterile field maintenance, and care.', duration: '50 mins', modules: 5, progress: 0, color: '#f59e0b', icon: '⚕️' },
    { id: 4, title: '12-Lead ECG Placement', category: 'Advanced', desc: 'Correct anatomical placement of electrodes and basic interpretation of normal sinus rhythm.', duration: '35 mins', modules: 4, progress: 20, color: '#ef4444', icon: '📈' },
    { id: 5, title: 'Wound Care & Dressing', category: 'Fundamental', desc: 'Assessment of wounds, aseptic dressing changes, and identification of infection signs.', duration: '40 mins', modules: 4, progress: 0, color: '#8b5cf6', icon: '🩹' },
    { id: 6, title: 'Nasogastric Tube Insertion', category: 'Advanced', desc: 'Measurement, insertion, placement verification, and securing of NG tubes.', duration: '55 mins', modules: 7, progress: 0, color: '#ec4899', icon: '🧪' },
  ];

  const filteredSkills = filter === 'All' ? SKILLS : SKILLS.filter(s => s.category === filter);

  return (
    <div className="skill-lab-container">
      {/* Header */}
      <div className="sl-header">
        <h1>Virtual Skill Lab 🔬</h1>
        <p>Master essential nursing procedures with interactive video modules and simulations.</p>
      </div>

      {/* Hero */}
      <div className="sl-hero">
        <div className="sl-hero-content">
          <div className="sl-hero-title">Practice Makes Perfect</div>
          <div className="sl-hero-sub">Experience lifelike virtual simulations designed by clinical experts. Build muscle memory and critical thinking before you step into the hospital.</div>
          <button className="sl-hero-btn"><PlayCircle size={16}/> Start Latest Module</button>
        </div>
        <div className="sl-hero-icon">🩺</div>
      </div>

      {/* Stats */}
      <div className="sl-stats">
        <div className="sl-stat-box">
          <div className="sl-sb-icon" style={{background:'#dcfce7', color:'#16a34a'}}><Target size={24}/></div>
          <div className="sl-sb-info">
            <div className="sl-sb-val">12</div>
            <div className="sl-sb-lbl">Skills Mastered</div>
          </div>
        </div>
        <div className="sl-stat-box">
          <div className="sl-sb-icon" style={{background:'#e0e7ff', color:'#4f46e5'}}><Video size={24}/></div>
          <div className="sl-sb-info">
            <div className="sl-sb-val">34</div>
            <div className="sl-sb-lbl">Modules Completed</div>
          </div>
        </div>
        <div className="sl-stat-box">
          <div className="sl-sb-icon" style={{background:'#fef3c7', color:'#d97706'}}><Activity size={24}/></div>
          <div className="sl-sb-info">
            <div className="sl-sb-val">8h 45m</div>
            <div className="sl-sb-lbl">Practice Time</div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="sl-grid-title">
        Skill Modules
        <div className="sl-grid-filters">
          {['All', 'Fundamental', 'Advanced', 'Emergency'].map(f => (
            <button key={f} className={`sl-filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
      </div>

      <div className="sl-grid">
        {filteredSkills.map(s => (
          <div className="sl-card" key={s.id}>
            <div className="sl-card-img" style={{background: `linear-gradient(135deg, ${s.color}22 0%, ${s.color}44 100%)`}}>
              {s.icon}
              <div className="sl-badge" style={{background: s.color}}>{s.category}</div>
              <div className="sl-duration"><Clock size={10}/> {s.duration}</div>
            </div>
            <div className="sl-card-body">
              <div className="sl-card-title">{s.title}</div>
              <div className="sl-card-desc">{s.desc}</div>
              
              <div className="sl-progress-row">
                <span style={{color: s.progress === 100 ? '#16a34a' : '#64748b'}}>
                  {s.progress === 100 ? 'Completed' : s.progress > 0 ? 'In Progress' : 'Not Started'}
                </span>
                <span>{s.progress}%</span>
              </div>
              <div className="sl-progress-bar">
                <div className="sl-progress-fill" style={{width: `${s.progress}%`, background: s.progress === 100 ? '#16a34a' : '#4f46e5'}}></div>
              </div>

              <div className="sl-card-foot">
                <div className="sl-modules"><Video size={14}/> {s.modules} Modules</div>
                <button className="sl-start-btn" style={{
                  background: s.progress === 100 ? '#f0fdf4' : s.progress > 0 ? '#eff6ff' : '#f8fafc',
                  color: s.progress === 100 ? '#16a34a' : s.progress > 0 ? '#3b82f6' : '#64748b'
                }}>
                  {s.progress === 100 ? 'Review' : s.progress > 0 ? 'Continue' : 'Start'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
