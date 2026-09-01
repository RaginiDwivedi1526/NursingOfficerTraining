import React, { useState } from 'react';
import { Star, Calendar, Download, MessageSquare, Smile, ThumbsUp, Frown, Users, MoreHorizontal, Send, Settings, BarChart2, ClipboardList } from 'lucide-react';
import './AdminReviews.css';

const RECENT_FEEDBACK = [
  { id: 1, name: 'Anjali Sharma', role: 'Student', subject: 'Pharmacology', subdesc: 'Live Class', rating: 5, text: 'Excellent explanation of concepts! The instructor made difficult topics easy to understand.', tag: 'Course Content', tagColor: '#10b981', tagBg: '#d1fae5', date: '24 May 2024', time: '10:30 AM' },
  { id: 2, name: 'Rohit Kumar', role: 'Student', subject: 'Medical Surgical Nursing', subdesc: 'Test Review', rating: 4, text: 'Good test structure and relevant questions. Could add more scenario-based questions.', tag: 'Test Review', tagColor: '#f59e0b', tagBg: '#ffedd5', date: '24 May 2024', time: '09:15 AM' },
  { id: 3, name: 'Priya Verma', role: 'Student', subject: 'Nursing Fundamentals', subdesc: 'Course Review', rating: 3, text: 'Content is good but videos are a bit lengthy. Shorter videos would be more effective.', tag: 'Study Materials', tagColor: '#3b82f6', tagBg: '#dbeafe', date: '23 May 2024', time: '04:45 PM' },
  { id: 4, name: 'Arjun Singh', role: 'Student', subject: 'Platform Feedback', subdesc: 'General', rating: 2, text: 'The platform is slow sometimes and mobile experience needs improvement.', tag: 'Platform & UI', tagColor: '#ef4444', tagBg: '#fee2e2', date: '23 May 2024', time: '02:10 PM' },
  { id: 5, name: 'Neha Patel', role: 'Student', subject: 'Instructor Feedback', subdesc: 'General', rating: 5, text: 'Very supportive instructor! Always clears doubts patiently.', tag: 'Instructor & Teaching', tagColor: '#10b981', tagBg: '#d1fae5', date: '22 May 2024', time: '11:20 AM' }
];

const CATEGORIES = [
  { name: 'Course Content', val: '96 (37%)', trend: '↑', tCol: '#10b981', bg: '#f3e8ff', c: '#8b5cf6', icon: <ClipboardList size={14}/> },
  { name: 'Instructor & Teaching', val: '68 (26%)', trend: '↑', tCol: '#10b981', bg: '#dbeafe', c: '#3b82f6', icon: <Users size={14}/> },
  { name: 'Study Materials', val: '42 (16%)', trend: '↑', tCol: '#10b981', bg: '#ffedd5', c: '#f59e0b', icon: <BookOpenIcon size={14}/> },
  { name: 'Platform & UI', val: '30 (12%)', trend: '↓', tCol: '#ef4444', bg: '#fee2e2', c: '#ef4444', icon: <Settings size={14}/> },
  { name: 'Support & Helpdesk', val: '20 (8%)', trend: '↑', tCol: '#10b981', bg: '#ffedd5', c: '#f59e0b', icon: <MessageSquare size={14}/> }
];

function BookOpenIcon({size}) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>);
}

function FilterIcon({size}) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>);
}

export default function AdminReviews() {
  const [activeTab, setActiveTab] = useState('All Feedback');

  return (
    <div className="ar-page">
      <div className="ar-header">
        <div className="ar-header-left">
          <div className="ar-header-icon"><Star size={24} fill="#8b5cf6"/></div>
          <div className="ar-header-title">
            <h1>Reviews & Feedback</h1>
            <p>Collect, analyze and act on feedback to improve training quality.</p>
          </div>
        </div>
        <div className="ar-header-right">
          <button className="ar-btn-outline"><Calendar size={14}/> 20 May 2024 - 26 May 2024</button>
          <button className="ar-btn-outline"><Download size={14}/> Export Report</button>
        </div>
      </div>

      <div className="ar-metrics">
        <div className="ar-metric-card">
          <div className="ar-mc-icon" style={{color:'#8b5cf6', background:'#f3e8ff'}}><MessageSquare size={20} /></div>
          <div className="ar-mc-body">
            <div className="ar-mc-label">Total Feedback</div>
            <div className="ar-mc-val">256</div>
            <div className="ar-mc-trend" style={{color:'#10b981'}}>↑ 18.5% vs last 7 days</div>
          </div>
        </div>
        <div className="ar-metric-card">
          <div className="ar-mc-icon" style={{color:'#10b981', background:'#d1fae5'}}><Smile size={20} /></div>
          <div className="ar-mc-body">
            <div className="ar-mc-label">Average Rating</div>
            <div className="ar-mc-val">4.6 / 5 <div style={{display:'flex', color:'#fbbf24', marginLeft:8}}><Star size={14} fill="#fbbf24"/><Star size={14} fill="#fbbf24"/><Star size={14} fill="#fbbf24"/><Star size={14} fill="#fbbf24"/><Star size={14} fill="#fbbf24" style={{opacity:0.5}}/></div></div>
            <div className="ar-mc-trend" style={{color:'#10b981'}}>↑ 0.3 vs last 7 days</div>
          </div>
        </div>
        <div className="ar-metric-card">
          <div className="ar-mc-icon" style={{color:'#f59e0b', background:'#ffedd5'}}><ThumbsUp size={20} /></div>
          <div className="ar-mc-body">
            <div className="ar-mc-label">Positive Feedback</div>
            <div className="ar-mc-val">198 (77%)</div>
            <div className="ar-mc-trend" style={{color:'#10b981'}}>↑ 14.2% vs last 7 days</div>
          </div>
        </div>
        <div className="ar-metric-card">
          <div className="ar-mc-icon" style={{color:'#ef4444', background:'#fee2e2'}}><Frown size={20} /></div>
          <div className="ar-mc-body">
            <div className="ar-mc-label">Areas to Improve</div>
            <div className="ar-mc-val">58</div>
            <div className="ar-mc-trend" style={{color:'#ef4444'}}>↓ 6.1% vs last 7 days</div>
          </div>
        </div>
        <div className="ar-metric-card">
          <div className="ar-mc-icon" style={{color:'#3b82f6', background:'#dbeafe'}}><Users size={20} /></div>
          <div className="ar-mc-body">
            <div className="ar-mc-label">Unique Contributors</div>
            <div className="ar-mc-val">142</div>
            <div className="ar-mc-trend" style={{color:'#10b981'}}>↑ 12.8% vs last 7 days</div>
          </div>
        </div>
      </div>

      <div className="ar-toolbar">
        <div className="ar-tabs">
          {['All Feedback', 'Course Reviews', 'Test Reviews', 'Instructor Reviews', 'General Feedback'].map(t => (
            <div key={t} className={`ar-tab ${activeTab===t?'active':''}`} onClick={()=>setActiveTab(t)}>{t}</div>
          ))}
        </div>
        <div className="ar-toolbar-right">
          <select className="ar-select"><option>All Types</option></select>
          <select className="ar-select"><option>All Ratings</option></select>
          <button className="ar-btn-outline"><FilterIcon size={14}/> Filters</button>
        </div>
      </div>

      <div className="ar-grid-layout">
        
        {/* Main Column */}
        <div>
          
          <div className="ar-card">
            <div className="ar-card-title" style={{marginBottom: 24}}>Feedback Overview</div>
            <div className="ar-overview-layout">
              <div className="ar-overview-pie">
                <div className="ar-pie-chart">
                  <div className="ar-pie-inner">
                    <span style={{fontSize:24, fontWeight:700}}>256</span>
                    <span style={{fontSize:11, color:'#6b7280'}}>Total</span>
                  </div>
                </div>
                <div className="ar-pie-legend">
                  <div className="ar-pl-item">
                    <span style={{display:'flex', alignItems:'center', gap:8, fontWeight:500}}><div style={{width:8, height:8, borderRadius:4, background:'#10b981'}}></div> Positive (4-5 <Star size={10} fill="#fbbf24" color="#fbbf24"/>)</span>
                    <span>198 (77%)</span>
                  </div>
                  <div className="ar-pl-item">
                    <span style={{display:'flex', alignItems:'center', gap:8, fontWeight:500}}><div style={{width:8, height:8, borderRadius:4, background:'#3b82f6'}}></div> Neutral (3 <Star size={10} fill="#fbbf24" color="#fbbf24"/>)</span>
                    <span>34 (13%)</span>
                  </div>
                  <div className="ar-pl-item">
                    <span style={{display:'flex', alignItems:'center', gap:8, fontWeight:500}}><div style={{width:8, height:8, borderRadius:4, background:'#f59e0b'}}></div> Negative (1-2 <Star size={10} fill="#fbbf24" color="#fbbf24"/>)</span>
                    <span>24 (10%)</span>
                  </div>
                </div>
              </div>

              <div style={{width: 1, height: 120, background:'#e5e7eb', margin:'0 16px'}}></div>

              <div style={{flex: 1}}>
                <div style={{fontSize:13, fontWeight:600, marginBottom:16}}>Rating Distribution</div>
                <div className="ar-overview-bars">
                  <div className="ar-bar-row">
                    <div className="ar-bar-lbl">5 Star</div>
                    <div className="ar-bar-track"><div className="ar-bar-fill" style={{width:'49%', background:'#10b981'}}></div></div>
                    <div className="ar-bar-val">126 (49%)</div>
                  </div>
                  <div className="ar-bar-row">
                    <div className="ar-bar-lbl">4 Star</div>
                    <div className="ar-bar-track"><div className="ar-bar-fill" style={{width:'28%', background:'#10b981'}}></div></div>
                    <div className="ar-bar-val">72 (28%)</div>
                  </div>
                  <div className="ar-bar-row">
                    <div className="ar-bar-lbl">3 Star</div>
                    <div className="ar-bar-track"><div className="ar-bar-fill" style={{width:'13%', background:'#3b82f6'}}></div></div>
                    <div className="ar-bar-val">34 (13%)</div>
                  </div>
                  <div className="ar-bar-row">
                    <div className="ar-bar-lbl">2 Star</div>
                    <div className="ar-bar-track"><div className="ar-bar-fill" style={{width:'6%', background:'#f59e0b'}}></div></div>
                    <div className="ar-bar-val">16 (6%)</div>
                  </div>
                  <div className="ar-bar-row">
                    <div className="ar-bar-lbl">1 Star</div>
                    <div className="ar-bar-track"><div className="ar-bar-fill" style={{width:'3%', background:'#ef4444'}}></div></div>
                    <div className="ar-bar-val">8 (3%)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="ar-card">
            <div className="ar-card-title" style={{marginBottom: 16}}>Recent Feedback</div>
            <div className="ar-feedback-list">
              {RECENT_FEEDBACK.map(f => (
                <div key={f.id} className="ar-fb-item">
                  <div className="ar-fb-user">
                    <img src={`https://ui-avatars.com/api/?name=${f.name}&background=random`} alt="av" className="ar-fb-avatar"/>
                    <div>
                      <div className="ar-fb-name">{f.name}</div>
                      <div className="ar-fb-role">{f.role}</div>
                    </div>
                  </div>
                  <div>
                    <div className="ar-fb-subject">{f.subject}</div>
                    <div className="ar-fb-subdesc">{f.subdesc}</div>
                  </div>
                  <div className="ar-fb-stars">
                    {[1,2,3,4,5].map(s => <Star key={s} size={14} fill={s <= f.rating ? '#fbbf24' : '#e5e7eb'} color={s <= f.rating ? '#fbbf24' : '#e5e7eb'}/>)}
                  </div>
                  <div className="ar-fb-text">{f.text}</div>
                  <div>
                    <span className="ar-fb-tag" style={{background: f.tagBg, color: f.tagColor}}>
                      <div style={{width:6, height:6, borderRadius:3, background:f.tagColor}}></div> {f.tag}
                    </span>
                  </div>
                  <div className="ar-fb-date">
                    <div>{f.date}</div>
                    <div>{f.time}</div>
                  </div>
                  <div>
                    <button className="ar-fb-action"><MoreHorizontal size={16}/></button>
                  </div>
                </div>
              ))}
            </div>
            <div className="ar-card-link" style={{marginTop: 16}}>View All Feedback →</div>
          </div>

        </div>

        {/* Sidebar Column */}
        <div>
          
          <div className="ar-card">
            <div className="ar-card-header">
              <div className="ar-card-title">Top Feedback Categories</div>
              <div className="ar-card-link">View All</div>
            </div>
            <div className="ar-cat-list">
              {CATEGORIES.map(c => (
                <div key={c.name} className="ar-cat-item">
                  <div className="ar-cat-left">
                    <div className="ar-cat-icon" style={{background: c.bg, color: c.c}}>{c.icon}</div>
                    <div className="ar-cat-name">{c.name}</div>
                  </div>
                  <div style={{display:'flex', alignItems:'center', gap:12}}>
                    <span className="ar-cat-val">{c.val}</span>
                    <span style={{color: c.tCol, fontSize:12, fontWeight:700}}>{c.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="ar-card">
            <div className="ar-card-header">
              <div className="ar-card-title">Sentiment Trend</div>
              <div className="ar-card-link">View Report</div>
            </div>
            <div style={{display:'flex', gap:16, fontSize:10, color:'#6b7280', fontWeight:500, justifyContent:'center'}}>
              <span style={{display:'flex', alignItems:'center', gap:4}}><div style={{width:8,height:8,borderRadius:4,background:'#10b981'}}></div> Positive</span>
              <span style={{display:'flex', alignItems:'center', gap:4}}><div style={{width:8,height:8,borderRadius:4,background:'#3b82f6'}}></div> Neutral</span>
              <span style={{display:'flex', alignItems:'center', gap:4}}><div style={{width:8,height:8,borderRadius:4,background:'#ef4444'}}></div> Negative</span>
            </div>
            
            <div className="ar-chart-wrap">
              <svg className="ar-chart-svg" viewBox="0 0 300 120" preserveAspectRatio="none">
                {/* Grid Lines */}
                <line x1="0" y1="15" x2="300" y2="15" className="ar-cl-grid" />
                <line x1="0" y1="50" x2="300" y2="50" className="ar-cl-grid" />
                <line x1="0" y1="85" x2="300" y2="85" className="ar-cl-grid" />
                
                {/* Y Axis Labels */}
                <text x="0" y="20" className="ar-cl-axis">150</text>
                <text x="0" y="55" className="ar-cl-axis">100</text>
                <text x="0" y="90" className="ar-cl-axis">50</text>
                <text x="0" y="115" className="ar-cl-axis">0</text>

                {/* X Axis Labels */}
                <text x="20" y="115" className="ar-cl-axis">20 May</text>
                <text x="60" y="115" className="ar-cl-axis">21 May</text>
                <text x="110" y="115" className="ar-cl-axis">22 May</text>
                <text x="160" y="115" className="ar-cl-axis">23 May</text>
                <text x="210" y="115" className="ar-cl-axis">24 May</text>
                <text x="260" y="115" className="ar-cl-axis">25 May</text>
                <text x="290" y="115" className="ar-cl-axis" textAnchor="end">26 May</text>

                {/* Negative Line (Red) */}
                <path d="M30 90 L70 92 L120 88 L170 85 L220 87 L270 85 L300 87" fill="none" stroke="#ef4444" strokeWidth="2"/>
                <circle cx="30" cy="90" r="3" fill="#fff" stroke="#ef4444" strokeWidth="2"/>
                <circle cx="70" cy="92" r="3" fill="#fff" stroke="#ef4444" strokeWidth="2"/>
                <circle cx="120" cy="88" r="3" fill="#fff" stroke="#ef4444" strokeWidth="2"/>
                <circle cx="170" cy="85" r="3" fill="#fff" stroke="#ef4444" strokeWidth="2"/>
                <circle cx="220" cy="87" r="3" fill="#fff" stroke="#ef4444" strokeWidth="2"/>
                <circle cx="270" cy="85" r="3" fill="#fff" stroke="#ef4444" strokeWidth="2"/>
                <circle cx="300" cy="87" r="3" fill="#fff" stroke="#ef4444" strokeWidth="2"/>

                {/* Neutral Line (Blue) */}
                <path d="M30 75 L70 65 L120 70 L170 55 L220 60 L270 50 L300 60" fill="none" stroke="#3b82f6" strokeWidth="2"/>
                <circle cx="30" cy="75" r="3" fill="#fff" stroke="#3b82f6" strokeWidth="2"/>
                <circle cx="70" cy="65" r="3" fill="#fff" stroke="#3b82f6" strokeWidth="2"/>
                <circle cx="120" cy="70" r="3" fill="#fff" stroke="#3b82f6" strokeWidth="2"/>
                <circle cx="170" cy="55" r="3" fill="#fff" stroke="#3b82f6" strokeWidth="2"/>
                <circle cx="220" cy="60" r="3" fill="#fff" stroke="#3b82f6" strokeWidth="2"/>
                <circle cx="270" cy="50" r="3" fill="#fff" stroke="#3b82f6" strokeWidth="2"/>
                <circle cx="300" cy="60" r="3" fill="#fff" stroke="#3b82f6" strokeWidth="2"/>

                {/* Positive Line (Green) */}
                <path d="M30 35 L70 25 L120 38 L170 20 L220 15 L270 25 L300 35" fill="none" stroke="#10b981" strokeWidth="2"/>
                <circle cx="30" cy="35" r="3" fill="#fff" stroke="#10b981" strokeWidth="2"/>
                <circle cx="70" cy="25" r="3" fill="#fff" stroke="#10b981" strokeWidth="2"/>
                <circle cx="120" cy="38" r="3" fill="#fff" stroke="#10b981" strokeWidth="2"/>
                <circle cx="170" cy="20" r="3" fill="#fff" stroke="#10b981" strokeWidth="2"/>
                <circle cx="220" cy="15" r="3" fill="#fff" stroke="#10b981" strokeWidth="2"/>
                <circle cx="270" cy="25" r="3" fill="#fff" stroke="#10b981" strokeWidth="2"/>
                <circle cx="300" cy="35" r="3" fill="#fff" stroke="#10b981" strokeWidth="2"/>
              </svg>
            </div>
          </div>

          <div className="ar-card">
            <div className="ar-card-title" style={{marginBottom: 20}}>Quick Actions</div>
            <div className="ar-act-list">
              <div className="ar-act-item">
                <div className="ar-act-icon"><MessageSquare size={16}/></div>
                <div>
                  <div className="ar-act-name">Request Feedback</div>
                  <div className="ar-act-desc">Send feedback request to students</div>
                </div>
              </div>
              <div className="ar-act-item">
                <div className="ar-act-icon"><ClipboardList size={16}/></div>
                <div>
                  <div className="ar-act-name">Create Feedback Form</div>
                  <div className="ar-act-desc">Customize feedback collection form</div>
                </div>
              </div>
              <div className="ar-act-item">
                <div className="ar-act-icon"><BarChart2 size={16}/></div>
                <div>
                  <div className="ar-act-name">View Analytics</div>
                  <div className="ar-act-desc">Detailed feedback analytics</div>
                </div>
              </div>
              <div className="ar-act-item">
                <div className="ar-act-icon"><Settings size={16}/></div>
                <div>
                  <div className="ar-act-name">Manage Feedback Settings</div>
                  <div className="ar-act-desc">Configure feedback preferences</div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Banner */}
      <div className="ar-bottom-banner">
        <div className="ar-bb-left">
          <div className="ar-bb-icon"><ClipboardList size={32}/></div>
          <div>
            <div className="ar-bb-title">We value your feedback!</div>
            <div className="ar-bb-desc">Your feedback helps us improve the quality of training and learning experience.</div>
          </div>
        </div>
        <button className="ar-bb-btn"><Send size={16}/> Send Feedback Request</button>
      </div>

    </div>
  );
}
