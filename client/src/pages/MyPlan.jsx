import React from 'react';
import { ChevronDown, ArrowRight, DownloadCloud, CheckCircle2, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import './StudentMyPlan.css';

export default function MyPlan() {
  const TODAY_TASKS = [
    { icon: '📖', iconBg: '#f0fdf4', color: '#16a34a', title: 'Anatomy & Physiology', sub: 'Blood & Circulatory System', status: '30%' },
    { icon: '📝', iconBg: '#f5f3ff', color: '#7c3aed', title: 'Mock Test – 05', sub: 'Full Length Test', status: 'Pending' },
    { icon: '📋', iconBg: '#fff7ed', color: '#ea580c', title: 'Revise Notes', sub: 'Pharmacology - Antibiotics', status: 'Pending' },
  ];

  const UPCOMING = [
    { date: '23 May, 2024\nThu', task: 'Anatomy & Physiology', sub: 'Blood & Circulatory System', type: 'Topic', typeBg: '#dcfce7', typeCol: '#16a34a', dur: '1h 30m', status: 'In Progress', statBg: '#e0e7ff', statCol: '#4f46e5' },
    { date: '23 May, 2024\nThu', task: 'Mock Test – 05', sub: 'Full Length Test', type: 'Test', typeBg: '#f3e8ff', typeCol: '#a855f7', dur: '3h 00m', status: 'Pending', statBg: '#ffedd5', statCol: '#ea580c' },
    { date: '23 May, 2024\nThu', task: 'Revise Notes', sub: 'Pharmacology - Antibiotics', type: 'Revision', typeBg: '#ffedd5', typeCol: '#ea580c', dur: '1h 00m', status: 'Pending', statBg: '#ffedd5', statCol: '#ea580c' },
  ];

  const WEEK_GOALS = [
    { icon: '⏱️', name: 'Study Time', goal: '15h', val: '9h 30m', pct: '63%', color: '#4f46e5' },
    { icon: '📝', name: 'Tests', goal: '5', val: '3', pct: '60%', color: '#10b981' },
    { icon: '📋', name: 'Topics', goal: '12', val: '6', pct: '50%', color: '#f59e0b' },
    { icon: '🎯', name: 'Accuracy', goal: '70%', val: '68%', pct: '97%', color: '#8b5cf6' },
  ];

  const CALENDAR = [
    { day: 'Mon', date: '20 May', tasks: '3 Tasks', topics: 2, tests: 1, time: '5h 30m' },
    { day: 'Tue', date: '21 May', tasks: '4 Tasks', topics: 3, tests: 1, time: '6h' },
    { day: 'Wed', date: '22 May', tasks: '3 Tasks', topics: 2, tests: 1, time: '5h' },
    { day: 'Thu', date: '23 May', tasks: '3 Tasks', topics: 2, tests: 1, time: '5h 30m', active: true },
    { day: 'Fri', date: '24 May', tasks: '4 Tasks', topics: 3, tests: 1, time: '6h' },
    { day: 'Sat', date: '25 May', tasks: '2 Tasks', topics: 1, tests: 1, time: '4h' },
    { day: 'Sun', date: '26 May', tasks: '2 Tasks', topics: 1, tests: 1, time: '4h' },
  ];

  return (
    <div className="mp-container">
      {/* Header */}
      <div className="mp-header">
        <div className="mp-header-left">
          <h1>My Plan 📋</h1>
          <p>Your personalized study plan to crack NORCET with confidence.</p>
        </div>
        <button className="mp-export-btn"><DownloadCloud size={16}/> Export Plan</button>
      </div>

      <div className="mp-main-grid">
        {/* LEFT COLUMN */}
        <div className="mp-left">
          
          {/* Hero */}
          <div className="mp-hero">
            <div className="mp-hero-title">Stay Consistent, Achieve Excellence! ✨</div>
            <div className="mp-hero-sub">Follow your plan daily and achieve your target score.</div>
            <div className="mp-hero-stats">
              <div className="mp-hero-circ">
                <svg viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e2e8f0" strokeWidth="4"/>
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#4f46e5" strokeWidth="4" strokeDasharray="42 58" strokeLinecap="round" transform="rotate(-90 18 18)"/>
                </svg>
                <div className="mp-hero-c-val">42%</div>
              </div>
              <div className="mp-hero-stat">
                <div className="mp-h-slbl">Plan Progress</div>
                <div className="mp-h-sval">42%</div>
                <div className="mp-h-ssub">Completed</div>
              </div>
              <div className="mp-hero-stat">
                <div className="mp-h-slbl">Days in Plan</div>
                <div className="mp-h-sval">28 <span style={{fontSize:12,color:'#94a3b8'}}>/ 90</span></div>
                <div className="mp-h-ssub">Days Completed</div>
              </div>
              <div className="mp-hero-stat">
                <div className="mp-h-slbl">Tests Planned</div>
                <div className="mp-h-sval">36</div>
                <div className="mp-h-ssub">Total Tests</div>
              </div>
              <div className="mp-hero-stat">
                <div className="mp-h-slbl">Topics Planned</div>
                <div className="mp-h-sval">78</div>
                <div className="mp-h-ssub">Total Topics</div>
              </div>
              <div className="mp-hero-stat">
                <div className="mp-h-slbl">Target Exam</div>
                <div className="mp-h-sval" style={{fontSize:16}}>NORCET 2025</div>
                <div className="mp-h-ssub">Expected Month: Sept 2025</div>
              </div>
            </div>
            <div className="mp-hero-bg">🎯</div>
          </div>

          <div className="mp-mid-row">
            {/* Overall Progress */}
            <div className="mp-card">
              <div className="mp-card-title">Overall Plan Progress</div>
              <div className="mp-prog-bar-wrap">
                <div className="mp-prog-top">42%</div>
                <div className="mp-prog-track"><div className="mp-prog-fill" style={{width:'42%'}}></div></div>
              </div>
              <div className="mp-prog-stats">
                <div className="mp-p-stat">
                  <div className="mp-p-icon" style={{background:'#e0e7ff',color:'#4f46e5'}}>⏱️</div>
                  <div className="mp-p-lbl">Study Time</div>
                  <div className="mp-p-val">48h 30m</div>
                </div>
                <div className="mp-p-stat">
                  <div className="mp-p-icon" style={{background:'#dcfce7',color:'#16a34a'}}>✅</div>
                  <div className="mp-p-lbl">Tests Completed</div>
                  <div className="mp-p-val">15 / 36</div>
                </div>
                <div className="mp-p-stat">
                  <div className="mp-p-icon" style={{background:'#eff6ff',color:'#3b82f6'}}>📋</div>
                  <div className="mp-p-lbl">Topics Completed</div>
                  <div className="mp-p-val">32 / 78</div>
                </div>
                <div className="mp-p-stat">
                  <div className="mp-p-icon" style={{background:'#ffe4e6',color:'#e11d48'}}>🎯</div>
                  <div className="mp-p-lbl">Accuracy</div>
                  <div className="mp-p-val">68%</div>
                </div>
              </div>
            </div>

            {/* Today's Plan */}
            <div className="mp-card">
              <div className="mp-tp-head">
                <div className="mp-card-title" style={{margin:0}}>Today's Plan</div>
                <div className="mp-tp-badge">3 Tasks</div>
              </div>
              <div className="mp-tp-list">
                {TODAY_TASKS.map((t, i) => (
                  <div className="mp-tp-item" key={i}>
                    <div className="mp-tp-icon" style={{background:t.iconBg}}>{t.icon}</div>
                    <div className="mp-tp-info">
                      <div className="mp-tp-name">{t.title}</div>
                      <div className="mp-tp-sub">{t.sub}</div>
                    </div>
                    <div className="mp-tp-status">{t.status}</div>
                    <ChevronRight size={14} color="#94a3b8" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div className="mp-card">
            <div className="mp-cal-head">
              <div className="mp-card-title" style={{margin:0}}>Study Plan Calendar <Info size={12} color="#94a3b8"/></div>
              <div className="mp-cal-ctrls">
                <div className="mp-cal-month">May 2024</div>
                <ChevronLeft size={16} className="mp-cal-nav"/>
                <ChevronRight size={16} className="mp-cal-nav"/>
                <div className="mp-cal-toggle">
                  <button className="mp-cal-tbtn active">Week</button>
                  <button className="mp-cal-tbtn">Month</button>
                </div>
              </div>
            </div>
            
            <div className="mp-cal-grid">
              {CALENDAR.map((d, i) => (
                <div className={`mp-cal-day ${d.active ? 'active' : ''}`} key={i}>
                  <div className="mp-cal-dname">{d.day}</div>
                  <div className="mp-cal-dnum">{d.date}</div>
                  <div className="mp-cal-dtasks">{d.tasks}</div>
                  <div className="mp-cal-dots">
                    {d.topics > 0 && <div className="mp-cal-dot-row"><div className="mp-cal-dot" style={{background:'#10b981'}}></div>{d.topics} {d.topics>1?'Topics':'Topic'}</div>}
                    {d.tests > 0 && <div className="mp-cal-dot-row"><div className="mp-cal-dot" style={{background:'#8b5cf6'}}></div>{d.tests} {d.tests>1?'Tests':'Test'}</div>}
                  </div>
                  <div className="mp-cal-time">{d.time}</div>
                  {d.active && <div className="mp-cal-today-badge">Today</div>}
                </div>
              ))}
            </div>
            <div className="mp-cal-legend">
              <div className="mp-cl-item"><div className="mp-cal-dot" style={{background:'#10b981'}}></div>Topic</div>
              <div className="mp-cl-item"><div className="mp-cal-dot" style={{background:'#8b5cf6'}}></div>Test</div>
              <div className="mp-cl-item"><div className="mp-cal-dot" style={{background:'#f59e0b'}}></div>Revision</div>
              <div className="mp-cl-item"><div className="mp-cal-dot" style={{background:'#3b82f6'}}></div>Other</div>
            </div>
          </div>

          {/* Upcoming Plan */}
          <div className="mp-card">
            <div className="mp-card-title">Upcoming Plan</div>
            <table className="mp-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Task</th>
                  <th>Topic / Test</th>
                  <th>Type</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {UPCOMING.map((u, i) => (
                  <tr key={i}>
                    <td className="mp-td-date" style={{whiteSpace:'pre-line'}}>{u.date}</td>
                    <td className="mp-td-task">{u.task}</td>
                    <td className="mp-td-sub" style={{fontSize:11, color:'#64748b'}}>{u.sub}</td>
                    <td><span className="mp-type-badge" style={{background:u.typeBg, color:u.typeCol}}>{u.type}</span></td>
                    <td style={{fontSize:11}}>{u.dur}</td>
                    <td><span className="mp-status-badge" style={{background:u.statBg, color:u.statCol}}>{u.status}</span></td>
                    <td><button className="mp-action-btn">Start</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="mp-view-all">View Full Plan →</button>
          </div>

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="mp-sidebar">
          
          {/* Target */}
          <div className="mp-card">
            <div className="mp-target-head">
              <div className="mp-card-title" style={{margin:0}}>Your Target</div>
              <div className="mp-edit-link">Edit Goal</div>
            </div>
            <div className="mp-tgrid">
              <div className="mp-tbox">
                <div className="mp-tb-icon" style={{background:'#dcfce7',color:'#16a34a'}}>🎯</div>
                <div><div className="mp-tb-lbl">Target Exam</div><div className="mp-tb-val">NORCET 2025</div></div>
              </div>
              <div className="mp-tbox" style={{background:'#f5f3ff', borderColor:'#ede9fe'}}>
                <div className="mp-tb-icon" style={{background:'#e0e7ff',color:'#4f46e5'}}>🎯</div>
                <div><div className="mp-tb-lbl">Target Score</div><div className="mp-tb-val" style={{color:'#4f46e5'}}>190+ / 200</div></div>
              </div>
            </div>
            <div className="mp-tbox" style={{background:'#fff7ed', borderColor:'#ffedd5'}}>
              <div className="mp-tb-icon" style={{background:'#ffedd5',color:'#ea580c'}}>📅</div>
              <div><div className="mp-tb-lbl">Target Date</div><div className="mp-tb-val">15 Sept 2025</div></div>
            </div>
          </div>

          {/* Motivational Card */}
          <div className="mp-moti-card">
            <div className="mp-moti-title">A goal without a plan is just a wish.</div>
            <div className="mp-moti-text">Keep following your plan and you are closer than you think!</div>
            <div className="mp-moti-img">🏆</div>
          </div>

          {/* Weekly Study Goals */}
          <div className="mp-card">
            <div className="mp-target-head">
              <div className="mp-card-title" style={{margin:0}}>Weekly Study Goals</div>
              <div className="mp-edit-link">Edit Goals</div>
            </div>
            <div style={{marginTop:16}}>
              {WEEK_GOALS.map((w, i) => (
                <div className="mp-wg-item" key={i}>
                  <div className="mp-wg-head">
                    <div className="mp-wg-left">
                      <div className="mp-wg-icon" style={{color:w.color}}>{w.icon}</div>
                      <div>
                        <div className="mp-wg-name">{w.name}</div>
                        <div className="mp-wg-sub">Goal: {w.goal}</div>
                      </div>
                    </div>
                    <div className="mp-wg-right">
                      <div className="mp-wg-val">{w.val} <span style={{fontSize:9,color:'#94a3b8',fontWeight:500}}>/ {w.goal}</span></div>
                      <div className="mp-wg-pct">{w.pct}</div>
                    </div>
                  </div>
                  <div className="mp-wg-track"><div className="mp-wg-fill" style={{width:w.pct, background:w.color}}></div></div>
                </div>
              ))}
            </div>
            <div className="mp-reset-info"><Info size={10}/> Resets every Monday</div>
          </div>

          {/* Tips */}
          <div className="mp-tips-card">
            <div className="mp-tips-title">💡 Plan Tips</div>
            <div className="mp-tip-item"><span className="mp-tip-check">✓</span> Follow your plan daily for best results.</div>
            <div className="mp-tip-item"><span className="mp-tip-check">✓</span> Take tests regularly to track progress.</div>
            <div className="mp-tip-item"><span className="mp-tip-check">✓</span> Revise your weak topics and notes.</div>
            <div className="mp-tip-item"><span className="mp-tip-check">✓</span> Stay consistent and don't break your streak!</div>
            <div className="mp-tips-img">📝</div>
          </div>

        </div>
      </div>
    </div>
  );
}
