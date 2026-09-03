import React, { useState } from 'react';
import { Search, SlidersHorizontal, ChevronDown, MoreVertical, ArrowRight, CheckCircle2, Shield, Target, Clock, Activity, Play } from 'lucide-react';
import './StudentFreeTests.css';

export default function FreeTests() {
  const [activeTab, setActiveTab] = useState('All Tests');
  const TABS = ['All Tests', 'Full Length Tests', 'Subject Wise Tests', 'Sectional Tests', 'Topic Tests'];

  const TESTS = [
    { icon: '📋', iconBg: '#dcfce7', iconCol: '#16a34a', title: 'NORCET 2024 Free Full Length Test - 01', sub: 'Based on Latest Exam Pattern', q: 200, t: '3 Hours', a: '13,245' },
    { icon: '📝', iconBg: '#ffedd5', iconCol: '#ea580c', title: 'Medical Surgical Nursing - Free Test', sub: 'Subject Wise Test', q: 50, t: '75 Min', a: '8,672' },
    { icon: '💊', iconBg: '#e0e7ff', iconCol: '#4f46e5', title: 'Pharmacology - Free Test', sub: 'Subject Wise Test', q: 50, t: '75 Min', a: '6,891' },
    { icon: '👶', iconBg: '#f3e8ff', iconCol: '#9333ea', title: 'Child Health Nursing - Free Test', sub: 'Subject Wise Test', q: 50, t: '75 Min', a: '5,432' },
    { icon: '🧠', iconBg: '#fee2e2', iconCol: '#ef4444', title: 'Mental Health Nursing - Free Test', sub: 'Subject Wise Test', q: 50, t: '75 Min', a: '4,987' },
    { icon: '🌍', iconBg: '#e0f2fe', iconCol: '#0ea5e9', title: 'Community Health Nursing - Free Test', sub: 'Subject Wise Test', q: 50, t: '75 Min', a: '4,210' },
  ];

  return (
    <div className="ft-container">
      {/* ─── LEFT ─── */}
      <div className="ft-left">
        
        {/* Header */}
        <div className="ft-header">
          <h1>Free Tests 📋</h1>
          <p>High-quality free tests to help you evaluate your preparation and build confidence.</p>
        </div>

        {/* Hero */}
        <div className="ft-hero">
          <div className="ft-hero-content">
            <div className="ft-hero-title">Practice Free. Succeed Big!</div>
            <div className="ft-hero-sub">Attempt free tests curated by experts and experience the real exam environment.</div>
            
            <div className="ft-hero-features">
              <div className="ft-hf-item">
                <div className="ft-hf-icon">📋</div>
                <div className="ft-hf-text">Exam Pattern<br/>Based Tests</div>
              </div>
              <div className="ft-hf-item">
                <div className="ft-hf-icon">⏱️</div>
                <div className="ft-hf-text">Instant Results<br/>& Analysis</div>
              </div>
              <div className="ft-hf-item">
                <div className="ft-hf-icon">🏆</div>
                <div className="ft-hf-text">All India<br/>Rank</div>
              </div>
            </div>
          </div>
          <div className="ft-hero-img">📋⏱️</div>
        </div>

        {/* Tabs & Filters */}
        <div className="ft-tabs">
          {TABS.map(t => (
            <div key={t} className={`ft-tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>{t}</div>
          ))}
        </div>
        
        <div className="ft-filter-row">
          <div className="ft-search">
            <Search size={16} color="#94a3b8"/>
            <input type="text" placeholder="Search tests..."/>
          </div>
          <select className="ft-select"><option>All Subjects</option></select>
          <select className="ft-select"><option>All Tests</option></select>
          <select className="ft-select"><option>Sort by: Latest</option></select>
          <button className="ft-filter-btn"><SlidersHorizontal size={14}/> Filters</button>
        </div>

        {/* Test List */}
        <div className="ft-list">
          {TESTS.map((t, i) => (
            <div className="ft-item" key={i}>
              <div className="ft-item-icon" style={{background:t.iconBg, color:t.iconCol}}>{t.icon}</div>
              <div className="ft-item-info">
                <div className="ft-item-title">{t.title} <span className="ft-badge-free">Free</span></div>
                <div className="ft-item-sub">{t.sub}</div>
              </div>
              <div className="ft-item-stats">
                <div className="ft-istat"><div className="ft-istat-lbl">Questions</div><div className="ft-istat-val">{t.q}</div></div>
                <div className="ft-istat"><div className="ft-istat-lbl">Time</div><div className="ft-istat-val">{t.t}</div></div>
                <div className="ft-istat"><div className="ft-istat-lbl">Attempts</div><div className="ft-istat-val">{t.a}</div></div>
              </div>
              <div className="ft-item-actions">
                <button className="ft-btn-start">Start Test</button>
                <button className="ft-btn-more"><MoreVertical size={16}/></button>
              </div>
            </div>
          ))}
          <button className="ft-load-more">Load More <ChevronDown size={14}/></button>
        </div>

        {/* Bottom Banner */}
        <div className="ft-bottom-features">
          <div className="ft-bf-item">
            <Shield className="ft-bf-icon"/>
            <div className="ft-bf-text"><span className="ft-bf-title">100% Free</span><span className="ft-bf-sub">No Hidden Charges</span></div>
          </div>
          <div className="ft-bf-item">
            <CheckCircle2 className="ft-bf-icon"/>
            <div className="ft-bf-text"><span className="ft-bf-title">Expert Verified</span><span className="ft-bf-sub">By Nursing Experts</span></div>
          </div>
          <div className="ft-bf-item">
            <Clock className="ft-bf-icon"/>
            <div className="ft-bf-text"><span className="ft-bf-title">Real Exam Environment</span><span className="ft-bf-sub">Time Bound Tests</span></div>
          </div>
          <div className="ft-bf-item">
            <Activity className="ft-bf-icon"/>
            <div className="ft-bf-text"><span className="ft-bf-title">Instant Results</span><span className="ft-bf-sub">Detailed Analysis</span></div>
          </div>
        </div>

      </div>

      {/* ─── RIGHT SIDEBAR ─── */}
      <div className="ft-sidebar">
        
        {/* Performance */}
        <div className="ft-card">
          <div className="ft-card-title">Your Free Test Performance <span style={{fontSize:11, color:'#64748b', fontWeight:500}}>This Month <ChevronDown size={12}/></span></div>
          
          <div className="ft-perf-wrap">
            <div className="ft-donut">
              <svg viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f1f5f9" strokeWidth="3"/>
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="74 26" strokeLinecap="round" transform="rotate(-90 18 18)"/>
              </svg>
              <div className="ft-donut-label">
                <div className="ft-donut-val">74%</div>
                <div className="ft-donut-sub">Average Score</div>
              </div>
            </div>
            
            <div className="ft-perf-stats">
              <div className="ft-ps-row"><div className="ft-ps-lbl"><div className="cert-s-icon" style={{background:'#e0e7ff',color:'#4f46e5',width:12,height:12,borderRadius:2,fontSize:8,display:'flex',alignItems:'center',justifyContent:'center'}}>📋</div> Tests Attempted</div><div className="ft-ps-val">12</div></div>
              <div className="ft-ps-row"><div className="ft-ps-lbl"><div className="cert-s-icon" style={{background:'#dcfce7',color:'#16a34a',width:12,height:12,borderRadius:2,fontSize:8,display:'flex',alignItems:'center',justifyContent:'center'}}>✅</div> Tests Completed</div><div className="ft-ps-val">10</div></div>
              <div className="ft-ps-row"><div className="ft-ps-lbl"><div className="cert-s-icon" style={{background:'#fee2e2',color:'#ef4444',width:12,height:12,borderRadius:2,fontSize:8,display:'flex',alignItems:'center',justifyContent:'center'}}>🎯</div> Average Score</div><div className="ft-ps-val">74%</div></div>
              <div className="ft-ps-row"><div className="ft-ps-lbl"><div className="cert-s-icon" style={{background:'#fef3c7',color:'#d97706',width:12,height:12,borderRadius:2,fontSize:8,display:'flex',alignItems:'center',justifyContent:'center'}}>⭐</div> Best Score</div><div className="ft-ps-val">186 / 200</div></div>
              <div className="ft-ps-row"><div className="ft-ps-lbl"><div className="cert-s-icon" style={{background:'#ffedd5',color:'#ea580c',width:12,height:12,borderRadius:2,fontSize:8,display:'flex',alignItems:'center',justifyContent:'center'}}>⏱️</div> Total Time</div><div className="ft-ps-val">18h 40m</div></div>
            </div>
          </div>
          
          <button className="ft-link-btn">View Detailed Analysis <ArrowRight size={12}/></button>
        </div>

        {/* Why Take */}
        <div className="ft-card">
          <div className="ft-card-title">Why Take Free Tests?</div>
          <div className="ft-why-list">
            <div className="ft-why-item">
              <div className="ft-why-icon" style={{background:'#fff7ed', color:'#ea580c'}}><Target size={16}/></div>
              <div><div className="ft-why-title">Understand Exam Pattern</div><div className="ft-why-desc">Get familiar with the real exam structure.</div></div>
            </div>
            <div className="ft-why-item">
              <div className="ft-why-icon" style={{background:'#eff6ff', color:'#3b82f6'}}><Activity size={16}/></div>
              <div><div className="ft-why-title">Boost Confidence</div><div className="ft-why-desc">Regular practice builds speed and accuracy.</div></div>
            </div>
            <div className="ft-why-item">
              <div className="ft-why-icon" style={{background:'#dcfce7', color:'#16a34a'}}><CheckCircle2 size={16}/></div>
              <div><div className="ft-why-title">Identify Weak Areas</div><div className="ft-why-desc">Analyze performance and improve strategically.</div></div>
            </div>
            <div className="ft-why-item">
              <div className="ft-why-icon" style={{background:'#fef3c7', color:'#d97706'}}><Shield size={16}/></div>
              <div><div className="ft-why-title">100% Free & Accessible</div><div className="ft-why-desc">Learn, practice and grow at no cost.</div></div>
            </div>
          </div>
        </div>

        {/* Promo Card */}
        <div className="ft-promo-card">
          <div className="ft-promo-title">Ready for the Real Challenge?</div>
          <div className="ft-promo-text">Attempt full length tests and track your All India Rank with Test Series.</div>
          <button className="ft-promo-btn">Explore Test Series <ArrowRight size={14}/></button>
          <div className="ft-promo-img">🏆</div>
        </div>

      </div>
    </div>
  );
}
