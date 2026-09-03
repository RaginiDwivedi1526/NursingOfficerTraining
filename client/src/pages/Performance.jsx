import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, Tooltip, Legend, Filler
} from 'chart.js';
import { ArrowRight, ChevronDown, ChevronRight } from 'lucide-react';
import { getPerformance } from '../services/api';
import './StudentPerformance.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend, Filler);



/* ─── Static Data ─── */
const SUBJECTS = [
  { name: 'Medical Surgical Nursing', pct: 76, color: '#4f46e5' },
  { name: 'Pharmacology', pct: 68, color: '#10b981' },
  { name: 'Anatomy & Physiology', pct: 65, color: '#f59e0b' },
  { name: 'Community Health Nursing', pct: 72, color: '#3b82f6' },
  { name: 'Mental Health Nursing', pct: 62, color: '#ec4899' },
  { name: 'Child Health Nursing', pct: 70, color: '#06b6d4' },
];

const STRENGTHS = [
  { name: 'Medical Surgical Nursing', pct: 76, color: '#10b981' },
  { name: 'Child Health Nursing', pct: 72, color: '#10b981' },
  { name: 'Community Health Nursing', pct: 70, color: '#10b981' },
];
const WEAKNESSES = [
  { name: 'Anatomy & Physiology', pct: 65, color: '#ef4444' },
  { name: 'Mental Health Nursing', pct: 62, color: '#ef4444' },
  { name: 'Pharmacology', pct: 60, color: '#ef4444' },
];

const RECENT_TESTS = [
  { icon: '📋', bg: '#e0e7ff', name: 'Mock Test – 05', date: '20 May, 2024', score: '186 / 200', pct: '93%', scoreColor: '#16a34a' },
  { icon: '📝', bg: '#dcfce7', name: 'Sectional Test - Pharmacology', date: '18 May, 2024', score: '68 / 100', pct: '68%', scoreColor: '#d97706' },
  { icon: '📖', bg: '#fef3c7', name: 'PYQ Test - 2023', date: '16 May, 2024', score: '134 / 200', pct: '67%', scoreColor: '#d97706' },
  { icon: '🏆', bg: '#ffedd5', name: 'Free Full Length Test – 01', date: '14 May, 2024', score: '142 / 200', pct: '71%', scoreColor: '#16a34a' },
];

const TIME_BREAKDOWN = [
  { color: '#4f46e5', name: 'Tests', time: '16h 20m', pct: '57%' },
  { color: '#10b981', name: 'Study Material', time: '7h 15m', pct: '25%' },
  { color: '#f59e0b', name: 'AI Learning', time: '3h 40m', pct: '13%' },
  { color: '#ec4899', name: 'Notes & Others', time: '1h 30m', pct: '5%' },
];

const INSIGHTS = [
  { icon: '📈', title: 'Excellent Progress!', text: 'You have improved your score by 18% this month.', link: 'Keep up the great work! 🎉', color: '#4f46e5' },
  { icon: '🎯', title: 'Focus on Weak Areas', text: 'Anatomy & Physiology needs more attention. Practice more topic tests.', link: 'Start Practicing →', color: '#ef4444' },
  { icon: '⏰', title: 'Optimize Your Time', text: 'Try to spend more time on questions you find difficult.', link: 'Time Management Tips →', color: '#f59e0b' },
  { icon: '⭐', title: 'Attempt More Tests', text: 'You attempted 12 tests this month. Try to attempt more for better rank.', link: 'Explore Test Series →', color: '#8b5cf6' },
];

export default function Performance() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPerformance().then(res => {
      setData(res.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{padding:40, textAlign:'center'}}>Loading Performance Data...</div>;

  /* ─── Chart Data ─── */
  const trendData = {
    labels: data?.trendData?.length ? data.trendData.map(d => new Date(d.date).toLocaleDateString(undefined, {month:'short', day:'numeric'})) : ['1 May', '8 May', '15 May', '22 May', '29 May', 'Today'],
    datasets: [{
      label: 'Score %',
      data: data?.trendData?.length ? data.trendData.map(d => d.score) : [45, 52, 60, 55, 65, 72],
      borderColor: '#4f46e5',
      backgroundColor: 'rgba(79,70,229,0.08)',
      tension: 0.4,
      fill: true,
      pointRadius: 5,
      pointBackgroundColor: '#fff',
      pointBorderColor: '#4f46e5',
      pointBorderWidth: 2,
    }]
  };
  const trendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { min: 0, max: 100, ticks: { callback: v => v + '%', font: { size: 10 } }, grid: { color: '#f1f5f9' } },
      x: { grid: { display: false }, ticks: { font: { size: 10 } } }
    }
  };

  const scoreDistData = {
    labels: ['0-20%', '21-40%', '41-60%', '61-80%', '81-100%'],
    datasets: [{
      label: 'Tests',
      data: data?.scoreDistribution?.length ? data.scoreDistribution : [2, 4, 15, 8, 3],
      backgroundColor: ['#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981'],
      borderRadius: 4,
    }]
  };
  const scoreDistOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { min: 0, ticks: { font: { size: 10 } }, grid: { color: '#f1f5f9' } },
      x: { grid: { display: false }, ticks: { font: { size: 10 } } }
    }
  };

  const subjectPerf = data?.subjectData?.length ? data.subjectData : [
    { subject: 'Nursing Fundamentals', accuracy: 82 },
    { subject: 'Pharmacology', accuracy: 65 },
    { subject: 'Medical Surgical', accuracy: 74 },
    { subject: 'Pediatrics', accuracy: 58 },
    { subject: 'Community Health', accuracy: 88 }
  ];

  return (
    <div className="perf-container">
      {/* Header */}
      <div className="perf-header">
        <div className="perf-header-left">
          <h1>My Performance 📊</h1>
          <p>Track your progress, analyze performance and improve every day.</p>
        </div>
        <button className="perf-month-btn">📅 This Month <ChevronDown size={12}/></button>
      </div>

      {/* Top Stats Strip */}
      <div className="perf-stats-strip">
        {/* Overall Score Donut */}
        <div className="perf-overall-card">
          <div className="perf-oc-label">Overall Score</div>
          <div className="perf-oc-donut">
            <svg viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.9155" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3"/>
              <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#a5f3fc" strokeWidth="3"
                strokeDasharray="72 28" strokeLinecap="round" transform="rotate(-90 18 18)"/>
            </svg>
            <div className="perf-oc-pct">
              <div className="perf-oc-pct-val">72%</div>
            </div>
          </div>
          <div className="perf-oc-sub">Great Performance!</div>
        </div>

        {/* Stats */}
        <div className="perf-stat-card">
          <div className="perf-sc-icon">🎯</div>
          <div className="perf-sc-lbl">Tests Attempted</div>
          <div className="perf-sc-val">48</div>
          <div className="perf-sc-trend">↑ 12 this month</div>
        </div>
        <div className="perf-stat-card">
          <div className="perf-sc-icon">✅</div>
          <div className="perf-sc-lbl">Tests Completed</div>
          <div className="perf-sc-val">36</div>
          <div className="perf-sc-trend muted">75% Completion Rate</div>
        </div>
        <div className="perf-stat-card">
          <div className="perf-sc-icon">📊</div>
          <div className="perf-sc-lbl">Average Score</div>
          <div className="perf-sc-val">68%</div>
          <div className="perf-sc-trend">↑ 8% vs last month</div>
        </div>
        <div className="perf-stat-card">
          <div className="perf-sc-icon">🏆</div>
          <div className="perf-sc-lbl">Best Score</div>
          <div className="perf-sc-val" style={{fontSize:18}}>186 / 200</div>
          <div className="perf-sc-trend muted">In Mock Test – 05</div>
        </div>
        <div className="perf-stat-card">
          <div className="perf-sc-icon">⏱️</div>
          <div className="perf-sc-lbl">Total Time Spent</div>
          <div className="perf-sc-val" style={{fontSize:18}}>28h 45m</div>
          <div className="perf-sc-trend">↑ 6h 20m this month</div>
        </div>
      </div>

      {/* Main Grid Row 1: Trend | Subject Wise | Score Distribution */}
      <div className="perf-main-grid">
        {/* Performance Trend */}
        <div className="perf-card">
          <div className="perf-card-head">
            <div className="perf-card-title">Performance Trend ℹ️</div>
            <div className="perf-card-filter">Score (%) <ChevronDown size={12}/></div>
          </div>
          <div className="perf-card-sub">Your average score over time</div>
          <div style={{height: 160}}>
            <Line data={trendData} options={trendOptions}/>
          </div>
          {/* Motivational Banner */}
          <div className="perf-moti-bar">
            <div>
              <div className="perf-moti-text">You've improved by 18% compared to last month.</div>
              <div className="perf-moti-sub">Keep it up! You're on the right track.</div>
            </div>
            <div className="perf-moti-icon">🎯</div>
          </div>
        </div>

        {/* Subject Wise Performance */}
        <div className="perf-card">
          <div className="perf-card-head">
            <div className="perf-card-title">Subject Wise Performance</div>
            <span className="perf-view-all" style={{fontSize:11,color:'#4f46e5',fontWeight:600,cursor:'pointer'}}>View All</span>
          </div>
          <div style={{height:160, marginBottom:12}}>
            <svg viewBox="0 0 36 36" width="120" height="120" style={{margin:'0 auto',display:'block'}}>
              {/* Multi-segment pie approximation using strokeDasharray */}
              {[
                {color:'#4f46e5',d:76,offset:0},
                {color:'#10b981',d:68,offset:-76},
                {color:'#f59e0b',d:65,offset:-144},
                {color:'#3b82f6',d:72,offset:-209},
                {color:'#ec4899',d:62,offset:-281},
                {color:'#06b6d4',d:70,offset:-343},
              ].map((s,i) => (
                <circle key={i} cx="18" cy="18" r="15.9155" fill="none" stroke={s.color} strokeWidth="3.5"
                  strokeDasharray={`${s.d * 0.17} ${100 * 0.17}`}
                  strokeDashoffset={`${-s.offset * 0.17}`}
                  transform="rotate(-90 18 18)"
                />
              ))}
              <circle cx="18" cy="18" r="12" fill="white"/>
              <text x="18" y="16" textAnchor="middle" fontSize="3.5" fill="#94a3b8">Overall</text>
              <text x="18" y="21" textAnchor="middle" fontSize="5" fontWeight="800" fill="#0f172a">72%</text>
            </svg>
          </div>
          <div className="perf-sw-legend">
            {SUBJECTS.map((s, i) => (
              <div className="perf-sw-row" key={i}>
                <div className="perf-sw-dot" style={{background: s.color}}></div>
                <div className="perf-sw-name">{s.name}</div>
                <div className="perf-sw-pct">{s.pct}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Score Distribution */}
        <div className="perf-card">
          <div className="perf-card-head">
            <div className="perf-card-title">Score Distribution</div>
            <div className="perf-card-filter">This Month</div>
          </div>
          <div style={{height: 200}}>
            <Bar data={scoreDistData} options={scoreDistOptions}/>
          </div>
          <div className="perf-top27">↗ You are in the top 27% of learners <ArrowRight size={11}/></div>
        </div>
      </div>

      {/* Main Grid Row 2: Strengths | Recent Tests | Time Analysis */}
      <div className="perf-second-grid">
        {/* Strengths & Weaknesses */}
        <div className="perf-card">
          <div className="perf-card-head">
            <div className="perf-card-title">Strengths & Weaknesses</div>
            <span style={{fontSize:11,color:'#4f46e5',fontWeight:600,cursor:'pointer'}}>View Details</span>
          </div>
          <div className="perf-sw2-cols" style={{marginTop:12}}>
            <div>
              <div className="perf-sw2-title green-title">Your Strengths</div>
              {STRENGTHS.map((s, i) => (
                <div className="perf-sw2-item" key={i}>
                  <div className="perf-sw2-head">
                    <span className="perf-sw2-name">{s.name}</span>
                    <span className="perf-sw2-val" style={{color:s.color}}>{s.pct}%</span>
                  </div>
                  <div className="perf-sw2-track"><div className="perf-sw2-fill" style={{width:`${s.pct}%`,background:s.color}}></div></div>
                </div>
              ))}
            </div>
            <div>
              <div className="perf-sw2-title red-title">Areas to Improve</div>
              {WEAKNESSES.map((s, i) => (
                <div className="perf-sw2-item" key={i}>
                  <div className="perf-sw2-head">
                    <span className="perf-sw2-name">{s.name}</span>
                    <span className="perf-sw2-val" style={{color:s.color}}>{s.pct}%</span>
                  </div>
                  <div className="perf-sw2-track"><div className="perf-sw2-fill" style={{width:`${s.pct}%`,background:s.color}}></div></div>
                </div>
              ))}
            </div>
          </div>
          <div className="perf-focus-bar">
            <div className="perf-focus-icon">⭐</div>
            <div>
              <div className="perf-focus-text">Focus more on weak areas and take topic tests</div>
              <div className="perf-focus-sub">Improve 2 weak areas to boost your score by 15%</div>
            </div>
            <div className="perf-focus-arrow">→</div>
          </div>
        </div>

        {/* Recent Tests Performance */}
        <div className="perf-card">
          <div className="perf-card-head">
            <div className="perf-card-title">Recent Tests Performance</div>
            <span style={{fontSize:11,color:'#4f46e5',fontWeight:600,cursor:'pointer'}}>View All</span>
          </div>
          <div style={{marginTop:8}}>
            {RECENT_TESTS.map((t, i) => (
              <div className="perf-rt-item" key={i}>
                <div className="perf-rt-icon" style={{background: t.bg}}>{t.icon}</div>
                <div className="perf-rt-info">
                  <div className="perf-rt-name">{t.name}</div>
                  <div className="perf-rt-date">{t.date}</div>
                </div>
                <div className="perf-rt-score">
                  <div className="perf-rt-sval" style={{color: t.scoreColor}}>{t.score}</div>
                  <div className="perf-rt-spct">{t.pct}</div>
                </div>
                <ChevronRight size={14} className="perf-rt-arrow"/>
              </div>
            ))}
          </div>
        </div>

        {/* Time Analysis */}
        <div className="perf-card">
          <div className="perf-card-head">
            <div className="perf-card-title">Time Analysis</div>
            <div className="perf-card-filter">This Month</div>
          </div>
          <div className="perf-ta-inner" style={{marginTop:12}}>
            <div className="perf-ta-donut">
              <svg viewBox="0 0 36 36" width="110" height="110">
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#f1f5f9" strokeWidth="3"/>
                {/* Tests: 57% */}
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#4f46e5" strokeWidth="3.5"
                  strokeDasharray="57 43" strokeDashoffset="0" transform="rotate(-90 18 18)"/>
                {/* Study: 25% */}
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#10b981" strokeWidth="3.5"
                  strokeDasharray="25 75" strokeDashoffset="-57" transform="rotate(-90 18 18)"/>
                {/* AI: 13% */}
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#f59e0b" strokeWidth="3.5"
                  strokeDasharray="13 87" strokeDashoffset="-82" transform="rotate(-90 18 18)"/>
                {/* Notes: 5% */}
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#ec4899" strokeWidth="3.5"
                  strokeDasharray="5 95" strokeDashoffset="-95" transform="rotate(-90 18 18)"/>
                <circle cx="18" cy="18" r="12" fill="white"/>
              </svg>
              <div className="perf-ta-label">
                <div className="perf-ta-val">28h<br/>45m</div>
                <div className="perf-ta-sub">Total Time</div>
              </div>
            </div>
            <div className="perf-ta-legend">
              {TIME_BREAKDOWN.map((t, i) => (
                <div className="perf-ta-row" key={i}>
                  <div className="perf-ta-dot" style={{background: t.color}}></div>
                  <span className="perf-ta-name">{t.name}</span>
                  <span className="perf-ta-time">{t.time}</span>
                  <span className="perf-ta-pct">({t.pct})</span>
                </div>
              ))}
            </div>
          </div>
          <div className="perf-more-time">↑ You study 1h 15m more than last month <ArrowRight size={11}/></div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="perf-insights">
        <div className="perf-insights-title">Performance Insights</div>
        <div className="perf-insights-grid">
          {INSIGHTS.map((ins, i) => (
            <div className="perf-insight-card" key={i}>
              <div className="perf-in-icon">{ins.icon}</div>
              <div className="perf-in-title">{ins.title}</div>
              <div className="perf-in-text">{ins.text}</div>
              <div className="perf-in-link" style={{color: ins.color}}>{ins.link} <ArrowRight size={11}/></div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Quote */}
      <div className="perf-footer-quote">
        <div className="perf-quote-text">" Consistency is the key to success. Keep learning, keep growing!" →</div>
        <div className="perf-quote-attr">– NursingOfficer Training Team ❤️</div>
      </div>
    </div>
  );
}
