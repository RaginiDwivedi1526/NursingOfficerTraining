import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowRight, Sparkles, Target, Activity, FileText, BrainCircuit } from 'lucide-react';
import { getInsights } from '../services/api';
import { Line, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Tooltip, Filler, RadialLinearScale, RadarController
} from 'chart.js';
import './StudentAIInsights.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, RadialLinearScale, RadarController);

const radarData = {
  labels: ['Medical Surgical Nursing', 'Pharmacology', 'Anatomy & Physiology', 'Community Health Nursing', 'Mental Health Nursing', 'Child Health Nursing'],
  datasets: [
    {
      label: 'You',
      data: [85, 75, 55, 72, 60, 68],
      backgroundColor: 'rgba(79, 70, 229, 0.2)',
      borderColor: '#4f46e5',
      borderWidth: 2,
      pointBackgroundColor: '#4f46e5',
      pointRadius: 3,
    },
    {
      label: 'Top 10% Learners',
      data: [90, 85, 80, 85, 75, 80],
      backgroundColor: 'transparent',
      borderColor: '#94a3b8',
      borderWidth: 1,
      borderDash: [5, 5],
      pointRadius: 0,
    }
  ]
};
const radarOptions = {
  responsive: true, maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: { r: { angleLines: { color: '#f1f5f9' }, grid: { color: '#f1f5f9' }, pointLabels: { font: { size: 9 }, color: '#64748b' }, ticks: { display: false, min: 0, max: 100 } } }
};

const smallRadarData = {
  labels: ['Consistency', 'Focus', 'Speed', 'Accuracy', 'Retention'],
  datasets: [{
    data: [85, 75, 66, 78, 70],
    backgroundColor: 'rgba(79, 70, 229, 0.2)',
    borderColor: '#4f46e5',
    borderWidth: 1.5,
    pointRadius: 0,
  }]
};
const smallRadarOptions = {
  responsive: true, maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { enabled: false } },
  scales: { r: { angleLines: { color: '#f1f5f9' }, grid: { color: '#f1f5f9' }, pointLabels: { font: { size: 8 }, color: '#64748b' }, ticks: { display: false, min: 0, max: 100 } } }
};


const lineData = {
  labels: ['May 1', 'May 8', 'May 15', 'May 22', 'May 29', 'Jun 5'],
  datasets: [
    {
      label: 'Your Score',
      data: [120, 145, 130, 155, 165, null],
      borderColor: '#4f46e5',
      backgroundColor: 'rgba(79,70,229,0.0)',
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: '#fff',
      pointBorderColor: '#4f46e5',
      pointBorderWidth: 2,
    },
    {
      label: 'AI Predicted Score',
      data: [null, null, null, null, 165, 195],
      borderColor: '#4f46e5',
      borderDash: [5, 5],
      tension: 0.4,
      pointRadius: 5,
      pointBackgroundColor: '#4f46e5',
    }
  ]
};
const lineOptions = {
  responsive: true, maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    y: { min: 0, max: 200, ticks: { font: { size: 10 } }, grid: { color: '#f1f5f9' } },
    x: { grid: { display: false }, ticks: { font: { size: 10 } } }
  }
};

const TOPICS_DATA = [
  { icon: '💊', bg: '#f0fdf4', topic: 'Pharmacology', mastery: '85%', trend: 'up', trendColor: '#10b981', acc: '82%', rec: 'Excellent! Maintain your consistency.' },
  { icon: '🏥', bg: '#eff6ff', topic: 'Medical Surgical Nursing', mastery: '80%', trend: 'up', trendColor: '#10b981', acc: '76%', rec: 'Great! Solve more case based questions.' },
  { icon: '🌍', bg: '#fdf4ff', topic: 'Community Health Nursing', mastery: '72%', trend: 'up', trendColor: '#10b981', acc: '68%', rec: 'Good progress. Revise important topics.' },
  { icon: '👶', bg: '#f0fdfa', topic: 'Child Health Nursing', mastery: '60%', trend: 'flat', trendColor: '#94a3b8', acc: '62%', rec: 'Focus on high yield topics and MCQs.' },
  { icon: '🧠', bg: '#fdf2f8', topic: 'Mental Health Nursing', mastery: '55%', trend: 'down', trendColor: '#ef4444', acc: '58%', rec: 'Needs improvement. Practice more questions.' },
  { icon: '🫀', bg: '#fff7ed', topic: 'Anatomy & Physiology', mastery: '45%', trend: 'down', trendColor: '#ef4444', acc: '50%', rec: 'Weak area. Watch videos and make notes.' },
];

export default function AIInsights() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInsights().then(res => {
      setData(res.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{padding:40, textAlign:'center'}}>Loading AI Insights...</div>;

  return (
    <div className="ai-ins-container">
      
      {/* Header */}
      <div className="ai-ins-header">
        <div className="ai-ins-header-left">
          <h1>AI Insights <Sparkles size={24} color="#8b5cf6" /></h1>
          <p>Smart analysis of your learning behavior to help you study better and achieve more.</p>
        </div>
        <button className="ai-ins-month-btn">📅 This Month <ChevronDown size={12}/></button>
      </div>

      {/* Top Metrics Strip */}
      <div className="ai-ins-metrics">
        {/* Learning Score */}
        <div className="ai-ins-metric-card" style={{padding: '16px 20px'}}>
          <div className="ai-ins-metric-title">Learning Score</div>
          <div className="ai-ins-metric-body" style={{justifyContent:'center'}}>
            <div style={{position:'relative', width:60, height:60}}>
              <svg viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f1f5f9" strokeWidth="3"/>
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeDasharray="78 22" strokeLinecap="round" transform="rotate(-90 18 18)"/>
              </svg>
              <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <Activity size={20} color="#8b5cf6"/>
              </div>
            </div>
            <div>
              <div className="ai-ins-m-val">78<span style={{fontSize:14,color:'#94a3b8'}}>/100</span></div>
              <div className="ai-ins-m-sub">Good Progress!</div>
            </div>
          </div>
          <div className="ai-ins-m-trend"><span style={{color:'#10b981'}}>↑ 12%</span> from last month</div>
        </div>

        {/* Concept Mastery */}
        <div className="ai-ins-metric-card" style={{padding: '16px 20px'}}>
          <div className="ai-ins-metric-title">Concept Mastery</div>
          <div className="ai-ins-metric-body" style={{justifyContent:'center'}}>
            <div style={{position:'relative', width:60, height:60}}>
              <svg viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f1f5f9" strokeWidth="3"/>
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="68 32" strokeLinecap="round" transform="rotate(-90 18 18)"/>
              </svg>
              <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <Target size={20} color="#10b981"/>
              </div>
            </div>
            <div>
              <div className="ai-ins-m-val">68%</div>
              <div className="ai-ins-m-sub">Strong in 15 topics</div>
            </div>
          </div>
          <div className="ai-ins-m-trend" style={{color:'#64748b'}}><div style={{width:10,height:3,background:'#ef4444',borderRadius:2}}></div> Needs work in 9 topics</div>
        </div>

        {/* Predicted NORCET Score */}
        <div className="ai-ins-metric-card" style={{padding: '16px 20px'}}>
          <div className="ai-ins-metric-title">Predicted NORCET Score</div>
          <div className="ai-ins-metric-body" style={{justifyContent:'center'}}>
            <div style={{position:'relative', width:60, height:60}}>
              <svg viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#eff6ff" strokeWidth="3"/>
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="93 7" strokeLinecap="round" transform="rotate(-90 18 18)"/>
              </svg>
              <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <FileText size={20} color="#3b82f6"/>
              </div>
            </div>
            <div>
              <div className="ai-ins-m-val">186<span style={{fontSize:14,color:'#94a3b8'}}>/200</span></div>
              <div className="ai-ins-m-sub">Excellent Potential</div>
            </div>
          </div>
          <div className="ai-ins-m-trend" style={{color:'#64748b'}}>Top 22% of learners</div>
        </div>

        {/* Learning Consistency */}
        <div className="ai-ins-metric-card" style={{padding: '16px 20px'}}>
          <div className="ai-ins-metric-title">Learning Consistency</div>
          <div className="ai-ins-metric-body" style={{justifyContent:'center'}}>
            <div className="ai-ins-m-icon" style={{background:'#fef3c7',color:'#d97706'}}>🏠</div>
            <div>
              <div className="ai-ins-m-val" style={{color:'#d97706'}}>85%</div>
              <div className="ai-ins-m-sub">You are consistent!</div>
            </div>
          </div>
          <div className="ai-ins-m-trend ai-ins-m-trend-purple">🔮 Keep it up <ChevronRight size={12} style={{marginLeft:'auto'}}/></div>
        </div>

        {/* Improvement Potential */}
        <div className="ai-ins-metric-card" style={{padding: '16px 20px'}}>
          <div className="ai-ins-metric-title">Improvement Potential</div>
          <div className="ai-ins-metric-body" style={{justifyContent:'center'}}>
            <div className="ai-ins-m-icon" style={{background:'#ffe4e6',color:'#e11d48'}}>🚀</div>
            <div>
              <div className="ai-ins-m-val" style={{color:'#e11d48'}}>High</div>
              <div className="ai-ins-m-sub" style={{lineHeight:1.3}}>With focused practice,<br/>you can reach 195+</div>
            </div>
          </div>
        </div>
      </div>

      <div className="ai-ins-main-grid">
        {/* Left Content */}
        <div className="ai-ins-left-content">
          
          {/* Row 1: Charts */}
          <div className="ai-ins-3col">
            {/* Strength vs Weakness */}
            <div className="ai-ins-card">
              <div className="ai-ins-card-title">Strength vs Weakness Analysis</div>
              <div className="ai-ins-radar-legend">
                <div className="ai-ins-legend-item"><div className="ai-ins-legend-dot" style={{background:'#4f46e5'}}></div>You</div>
                <div className="ai-ins-legend-item"><div className="ai-ins-legend-dash"></div>Top 10% Learners</div>
              </div>
              <div className="ai-ins-radar-wrap">
                <Radar data={radarData} options={radarOptions} />
              </div>
              <div className="ai-ins-insight-box">
                <div className="ai-ins-ib-icon">👍</div>
                <div className="ai-ins-ib-text">You are strong in <strong>Pharmacology</strong> and <strong>Medical Surgical Nursing</strong>.</div>
              </div>
            </div>

            {/* Learning Trend */}
            <div className="ai-ins-card">
              <div className="ai-ins-card-title">Learning Trend (AI Prediction)</div>
              <div className="ai-ins-line-legend">
                <div className="ai-ins-legend-item"><div className="ai-ins-legend-dot" style={{background:'#4f46e5'}}></div>Your Score</div>
                <div className="ai-ins-legend-item"><div className="ai-ins-legend-dash"></div>AI Predicted Score</div>
              </div>
              <div style={{height:180, marginBottom:12, position:'relative'}}>
                <Line data={lineData} options={lineOptions} />
                <div style={{position:'absolute',right:0,top:20,background:'#4f46e5',color:'white',padding:'2px 6px',borderRadius:4,fontSize:10,fontWeight:700}}>195+</div>
              </div>
              <div className="ai-ins-insight-box-blue">
                <div className="ai-ins-ib-icon">📈</div>
                <div className="ai-ins-ibb-text">If you continue like this, you can score 195+ in NORCET.<br/>Stay consistent and focus on weak areas.</div>
              </div>
            </div>

            {/* Time & Accuracy Insights */}
            <div className="ai-ins-card">
              <div className="ai-ins-card-title">Time & Accuracy Insights</div>
              <div className="ai-ins-ta-row">
                <div className="ai-ins-donut">
                  <svg viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f1f5f9" strokeWidth="3.5"/>
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#2563eb" strokeWidth="3.5" strokeDasharray="74 26" strokeLinecap="round" transform="rotate(-90 18 18)"/>
                  </svg>
                  <div className="ai-ins-donut-label">
                    <div className="ai-ins-donut-sub" style={{marginBottom:2}}>Avg. Accuracy</div>
                    <div className="ai-ins-donut-val">74%</div>
                    <div className="ai-ins-donut-sub" style={{marginTop:2}}>Good</div>
                  </div>
                </div>
                <div className="ai-ins-ta-stats">
                  <div className="ai-ins-ta-stat">
                    <div className="ai-ins-ta-dot" style={{background:'#64748b'}}></div>
                    <div>
                      <div className="ai-ins-donut-sub">Questions Attempted</div>
                      <div className="ai-ins-ta-sval">1284</div>
                    </div>
                  </div>
                  <div className="ai-ins-ta-stat">
                    <div className="ai-ins-ta-dot" style={{background:'#2563eb'}}></div>
                    <div>
                      <div className="ai-ins-donut-sub">Correct Answers</div>
                      <div className="ai-ins-ta-sval">950</div>
                    </div>
                  </div>
                  <div className="ai-ins-ta-stat">
                    <div className="ai-ins-ta-dot" style={{background:'#ef4444'}}></div>
                    <div>
                      <div className="ai-ins-donut-sub">Incorrect Answers</div>
                      <div className="ai-ins-ta-sval" style={{color:'#ef4444'}}>334</div>
                    </div>
                  </div>
                  <div className="ai-ins-ta-stat" style={{marginTop:4}}>
                    <div className="ai-ins-ta-dot" style={{background:'#10b981'}}></div>
                    <div>
                      <div className="ai-ins-donut-sub">Accuracy Improvement</div>
                      <div className="ai-ins-ta-sval" style={{color:'#10b981',fontSize:11}}>↑ 8% this month</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ai-ins-insight-box" style={{background:'#f8fafc', border:'1px solid #e2e8f0'}}>
                <div className="ai-ins-ib-icon">⏱️</div>
                <div className="ai-ins-ib-text" style={{color:'#334155'}}>You take more time on difficult questions.<br/>Try time-bound practice to improve speed.</div>
              </div>
            </div>
          </div>

          {/* Row 2: Table & Donut */}
          <div className="ai-ins-2col">
            {/* Topic Insights */}
            <div className="ai-ins-card" style={{padding:0}}>
              <div className="ai-ins-card-title" style={{padding:'20px 20px 0 20px'}}>Topic Insights (AI Powered)</div>
              <table className="ai-ins-table">
                <thead>
                  <tr>
                    <th>Topic</th>
                    <th>Mastery</th>
                    <th>Trend</th>
                    <th>Accuracy</th>
                    <th>Recommendation</th>
                  </tr>
                </thead>
                <tbody>
                  {TOPICS_DATA.map((t, i) => (
                    <tr key={i}>
                      <td>
                        <div className="ai-ins-t-subject">
                          <div className="ai-ins-t-icon" style={{background:t.bg}}>{t.icon}</div>
                          {t.topic}
                        </div>
                      </td>
                      <td style={{fontWeight:600}}>{t.mastery}</td>
                      <td>
                        {t.trend === 'up' && <span className="ai-ins-t-trend-up">↗</span>}
                        {t.trend === 'down' && <span className="ai-ins-t-trend-down">↘</span>}
                        {t.trend === 'flat' && <span className="ai-ins-t-trend-flat">↔</span>}
                      </td>
                      <td>{t.acc}</td>
                      <td style={{color:'#475569'}}>{t.rec}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="ai-ins-view-all-topics" style={{padding:'0 20px 20px'}}>
                <button className="ai-ins-vat-btn">View All Topics Analysis →</button>
              </div>
            </div>

            {/* Study Behavior */}
            <div className="ai-ins-card">
              <div className="ai-ins-card-title">Study Behavior</div>
              <div className="ai-ins-sb-row">
                <div className="ai-ins-sb-donut">
                  <svg viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#f1f5f9" strokeWidth="4"/>
                    {/* Practice Tests 45% (Blue) */}
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#4f46e5" strokeWidth="4" strokeDasharray="45 55" strokeDashoffset="0" transform="rotate(-90 18 18)"/>
                    {/* Study Material 25% (Green) */}
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="25 75" strokeDashoffset="-45" transform="rotate(-90 18 18)"/>
                    {/* AI Learning 15% (Orange) */}
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="15 85" strokeDashoffset="-70" transform="rotate(-90 18 18)"/>
                    {/* Notes & Revision 10% (Purple) */}
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#ec4899" strokeWidth="4" strokeDasharray="10 90" strokeDashoffset="-85" transform="rotate(-90 18 18)"/>
                    {/* Other 5% (Teal) */}
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#06b6d4" strokeWidth="4" strokeDasharray="5 95" strokeDashoffset="-95" transform="rotate(-90 18 18)"/>
                  </svg>
                  <div className="ai-ins-donut-label">
                    <div className="ai-ins-donut-val">28h 45m</div>
                    <div className="ai-ins-donut-sub" style={{fontSize:9}}>Total Study Time</div>
                  </div>
                </div>
                <div className="ai-ins-sb-legend">
                  <div className="ai-ins-sbl-item"><div className="ai-ins-ta-dot" style={{background:'#4f46e5'}}></div><span className="ai-ins-sbl-name">Practice Tests</span><span className="ai-ins-sbl-val">45%</span></div>
                  <div className="ai-ins-sbl-item"><div className="ai-ins-ta-dot" style={{background:'#10b981'}}></div><span className="ai-ins-sbl-name">Study Material</span><span className="ai-ins-sbl-val">25%</span></div>
                  <div className="ai-ins-sbl-item"><div className="ai-ins-ta-dot" style={{background:'#f59e0b'}}></div><span className="ai-ins-sbl-name">AI Learning</span><span className="ai-ins-sbl-val">15%</span></div>
                  <div className="ai-ins-sbl-item"><div className="ai-ins-ta-dot" style={{background:'#ec4899'}}></div><span className="ai-ins-sbl-name">Notes & Revision</span><span className="ai-ins-sbl-val">10%</span></div>
                  <div className="ai-ins-sbl-item"><div className="ai-ins-ta-dot" style={{background:'#06b6d4'}}></div><span className="ai-ins-sbl-name">Other Activities</span><span className="ai-ins-sbl-val">5%</span></div>
                </div>
              </div>
              <div className="ai-ins-insight-box" style={{background:'#f5f3ff'}}>
                <div className="ai-ins-ib-icon" style={{fontSize:18}}><BrainCircuit size={18} color="#7c3aed" /></div>
                <div className="ai-ins-ib-text">You spend most time on Practice Tests.<br/>Balance it with revision and notes.</div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Sidebar */}
        <div className="ai-ins-sidebar">
          
          {/* AI Study Coach */}
          <div className="ai-ins-card">
            <div className="ai-ins-card-title">AI Study Coach</div>
            <div className="ai-ins-coach-head">
              <div className="ai-ins-coach-img">🤖</div>
              <div>
                <div className="ai-ins-coach-greet">Hi Priya! ✨</div>
                <div className="ai-ins-coach-msg">I've analyzed your performance and here's what I recommend for you today.</div>
              </div>
            </div>
            
            <div className="ai-ins-task">
              <div className="ai-ins-task-icon">🏠</div>
              <div className="ai-ins-task-info">
                <div className="ai-ins-task-title">Focus on weak topics</div>
                <div className="ai-ins-task-sub">Anatomy & Physiology needs more attention.</div>
              </div>
            </div>
            
            <div className="ai-ins-task">
              <div className="ai-ins-task-icon">🎯</div>
              <div className="ai-ins-task-info">
                <div className="ai-ins-task-title">Practice 15 more questions</div>
                <div className="ai-ins-task-sub">To improve your accuracy in Pharmacology.</div>
              </div>
            </div>
            
            <div className="ai-ins-task">
              <div className="ai-ins-task-icon">⚠️</div>
              <div className="ai-ins-task-info">
                <div className="ai-ins-task-title">Revise your mistakes</div>
                <div className="ai-ins-task-sub">Review 24 mistakes from last 7 days.</div>
              </div>
            </div>

            <button className="ai-ins-btn-primary">Start Smart Practice →</button>
          </div>

          {/* AI Recommended Plan */}
          <div className="ai-ins-card">
            <div className="ai-ins-plan-head">
              <div className="ai-ins-card-title" style={{margin:0}}>AI Recommended Plan for You</div>
              <div className="ai-ins-badge-purp">Personalized</div>
            </div>
            
            <div className="ai-ins-task">
              <div className="ai-ins-task-icon" style={{background:'#eff6ff',color:'#3b82f6'}}>🎯</div>
              <div className="ai-ins-task-info">
                <div className="ai-ins-task-title">Today's Focus</div>
                <div className="ai-ins-task-sub">Anatomy & Physiology + PYQs</div>
              </div>
            </div>
            
            <div className="ai-ins-task">
              <div className="ai-ins-task-icon" style={{background:'#fdf4ff',color:'#c026d3'}}>📋</div>
              <div className="ai-ins-task-info">
                <div className="ai-ins-task-title">Recommended Test</div>
                <div className="ai-ins-task-sub">Topic Test – Anatomy & Physiology</div>
              </div>
            </div>
            
            <div className="ai-ins-task">
              <div className="ai-ins-task-icon" style={{background:'#fef3c7',color:'#d97706'}}>🏆</div>
              <div className="ai-ins-task-info">
                <div className="ai-ins-task-title">Study Goal</div>
                <div className="ai-ins-task-sub">Score 190+ in NORCET</div>
              </div>
            </div>

            <button className="ai-ins-btn-primary">View Your Plan →</button>
          </div>

          {/* Learning Personality */}
          <div className="ai-ins-card">
            <div className="ai-ins-pers-head">
              <div className="ai-ins-card-title" style={{margin:0,color:'#16a34a'}}>Your Learning Personality</div>
              <div style={{fontSize:10,color:'#16a34a',fontWeight:600}}>Detail Analysis →</div>
            </div>
            <div className="ai-ins-pers-type">You are a "Strategic Learner" 🎯</div>
            <div className="ai-ins-pers-desc">You plan well and are consistent. With a little more focus on weak topics, you can achieve an excellent rank!</div>
            <div className="ai-ins-pers-radar">
              <Radar data={smallRadarData} options={smallRadarOptions} />
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="ai-ins-footer">
        <div className="ai-ins-f-left">
          <div className="ai-ins-f-icon"><BrainCircuit size={40} color="#c4b5fd" /></div>
          <div>
            <div className="ai-ins-f-title">AI is learning with you!</div>
            <div className="ai-ins-f-sub">The more you study, the smarter our insights become.<br/>Keep learning, keep growing!</div>
          </div>
        </div>
        <div className="ai-ins-f-right">
          <div className="ai-ins-f-stat"><span className="ai-ins-f-stat-icon">📊</span><div>Data Driven Insights<br/><span style={{color:'#c4b5fd',fontSize:10}}>100% Personalized</span></div></div>
          <div className="ai-ins-f-stat"><span className="ai-ins-f-stat-icon">✨</span><div>Smart Recommendations<br/><span style={{color:'#c4b5fd',fontSize:10}}>Just for You</span></div></div>
          <div className="ai-ins-f-stat"><span className="ai-ins-f-stat-icon">🎯</span><div>Better Every Day<br/><span style={{color:'#c4b5fd',fontSize:10}}>Track. Improve. Succeed.</span></div></div>
        </div>
      </div>

    </div>
  );
}
