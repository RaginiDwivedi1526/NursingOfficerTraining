import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getDashboard, generateAI } from '../services/api';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { 
  Activity, CheckCircle2, XCircle, BrainCircuit, Shield, 
  Target, BarChart3, Clock, ArrowRight, Check, Play, BookOpen, Settings,
  Video, Download, FileText, Beaker
} from 'lucide-react';
import './StudentDashboard.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchDashboard(); }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboard();
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{padding:40, textAlign:'center'}}>Loading Dashboard...</div>;

  const score = data?.overallScore || 82; // Default to 82 matching image if data is missing
  const ai = data?.aiAssessment;

  // Chart data setup matching image trend
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Performance',
      data: [30, 50, 45, 65, 40, 82, 55],
      borderColor: '#4f46e5',
      backgroundColor: 'rgba(79, 70, 229, 0.1)',
      borderWidth: 2,
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#fff',
      pointBorderColor: '#4f46e5',
      pointRadius: 4,
    }]
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { display: true, min: 0, max: 100, ticks: { stepSize: 25, font: { size: 10 } }, grid: { color: '#f1f5f9' } },
      x: { grid: { display: false }, ticks: { font: { size: 10 } } }
    }
  };

  return (
    <div className="sd-container">
      {/* Header */}
      <div className="sd-header">
        <div className="sd-greeting">
          <h1>Good Morning, {user?.name?.split(' ')[0] || 'Student'}! 🌻</h1>
          <p>Every small step today, brings you closer to your dream.</p>
        </div>
        <div className="sd-quote">
          "Discipline today, Selection tomorrow."
          <span className="sd-quote-author">- Keep Going!</span>
        </div>
      </div>

      {/* Top Grid: Readiness & Metrics & Goal */}
      <div className="sd-grid-top">
        {/* Readiness Score */}
        <div className="sd-card">
          <div className="sd-card-title">
            NURSING READINESS SCORE <Shield size={14} color="#94a3b8" style={{marginLeft:4}}/>
          </div>
          <div className="sd-readiness">
            <div className="sd-r-left">
              <div className="sd-r-score">{score}%</div>
              <div className="sd-r-status">Above Average ↑</div>
              <div className="sd-r-desc">You're ahead of 72% of learners at your preparation stage.</div>
            </div>
            <div className="sd-r-right">
              <svg width="80" height="80" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="12" fill="none" />
                <circle cx="50" cy="50" r="40" stroke="#4f46e5" strokeWidth="12" fill="none" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * score / 100)} strokeLinecap="round" transform="rotate(-90 50 50)" />
                <foreignObject x="30" y="30" width="40" height="40">
                  <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',color:'#4f46e5'}}><Shield size={24}/></div>
                </foreignObject>
              </svg>
            </div>
          </div>
          <Link to="/performance" className="sd-card-link" style={{marginTop:'auto', paddingTop:16}}>View Full Analysis <ArrowRight size={14}/></Link>
        </div>

        {/* 4 Metrics */}
        <div className="sd-card sd-metrics-4">
          <div className="sd-m4-item">
            <div className="sd-m4-icon" style={{background:'#f3e8ff', color:'#8b5cf6'}}><BrainCircuit size={20}/></div>
            <div className="sd-m4-info">
              <span className="sd-m4-label">Concepts Mastered</span>
              <span className="sd-m4-val">86%</span>
            </div>
          </div>
          <div className="sd-m4-item">
            <div className="sd-m4-icon" style={{background:'#d1fae5', color:'#10b981'}}><Target size={20}/></div>
            <div className="sd-m4-info">
              <span className="sd-m4-label">Accuracy</span>
              <span className="sd-m4-val">82%</span>
            </div>
          </div>
          <div className="sd-m4-item">
            <div className="sd-m4-icon" style={{background:'#eff6ff', color:'#3b82f6'}}><BarChart3 size={20}/></div>
            <div className="sd-m4-info">
              <span className="sd-m4-label">Test Score Avg.</span>
              <span className="sd-m4-val">78%</span>
            </div>
          </div>
          <div className="sd-m4-item">
            <div className="sd-m4-icon" style={{background:'#ffedd5', color:'#f97316'}}><Activity size={20}/></div>
            <div className="sd-m4-info">
              <span className="sd-m4-label">Consistency</span>
              <span className="sd-m4-val">79%</span>
            </div>
          </div>
        </div>

        {/* Your Goal */}
        <div className="sd-goal-card">
          <div>
            <div style={{fontSize:14, fontWeight:600, marginBottom:20}}>Your Goal: {user?.examGoal || 'NORCET 2024'}</div>
            <div className="sd-goal-days">
              <span className="sd-goal-days-num">64</span>
              <span className="sd-goal-days-lbl">Days Left</span>
            </div>
          </div>
          <div className="sd-goal-info">
            <div className="sd-goal-row"><span>Target Exam</span> <span>{user?.examGoal || 'NORCET 2024'}</span></div>
            <div className="sd-goal-row"><span>Target Score</span> <span>95%+</span></div>
            <div className="sd-goal-row"><span>Target Rank</span> <span>Top 500</span></div>
            <button className="sd-goal-btn">Edit Goal</button>
          </div>
        </div>
      </div>

      {/* Middle Grid: Subject Mastery, Trend, Today's Plan */}
      <div className="sd-grid-mid">
        {/* Subject Mastery */}
        <div className="sd-card">
          <div className="sd-card-title">Subject Mastery <Link to="/performance" className="sd-card-link" style={{fontSize:11}}>View All</Link></div>
          <div className="sd-subject-row"><div className="sd-sub-icon"><BookOpen size={12}/></div><div className="sd-sub-name">Medical Surgical Nursing</div><div className="sd-sub-track"><div className="sd-sub-fill" style={{width:'91%', background:'#0f172a'}}></div></div><div className="sd-sub-pct">91%</div></div>
          <div className="sd-subject-row"><div className="sd-sub-icon"><BookOpen size={12}/></div><div className="sd-sub-name">Pharmacology</div><div className="sd-sub-track"><div className="sd-sub-fill" style={{width:'67%', background:'#f59e0b'}}></div></div><div className="sd-sub-pct">67%</div></div>
          <div className="sd-subject-row"><div className="sd-sub-icon"><BookOpen size={12}/></div><div className="sd-sub-name">Community Health Nursing</div><div className="sd-sub-track"><div className="sd-sub-fill" style={{width:'78%', background:'#10b981'}}></div></div><div className="sd-sub-pct">78%</div></div>
          <div className="sd-subject-row"><div className="sd-sub-icon"><BookOpen size={12}/></div><div className="sd-sub-name">Anatomy & Physiology</div><div className="sd-sub-track"><div className="sd-sub-fill" style={{width:'88%', background:'#10b981'}}></div></div><div className="sd-sub-pct">88%</div></div>
          <div className="sd-subject-row"><div className="sd-sub-icon"><BookOpen size={12}/></div><div className="sd-sub-name">Child Health Nursing</div><div className="sd-sub-track"><div className="sd-sub-fill" style={{width:'73%', background:'#f59e0b'}}></div></div><div className="sd-sub-pct">73%</div></div>
          <div className="sd-subject-row"><div className="sd-sub-icon"><BookOpen size={12}/></div><div className="sd-sub-name">Mental Health Nursing</div><div className="sd-sub-track"><div className="sd-sub-fill" style={{width:'69%', background:'#f59e0b'}}></div></div><div className="sd-sub-pct">69%</div></div>
        </div>

        {/* Weekly Trend */}
        <div className="sd-card">
          <div className="sd-card-title">Weekly Performance Trend <span style={{fontSize:11, color:'#64748b'}}>This Week ▼</span></div>
          <div style={{height:'140px', marginBottom:'16px'}}>
            <Line data={chartData} options={chartOptions} />
          </div>
          <div style={{display:'flex', justifyContent:'space-between', borderTop:'1px solid #f1f5f9', paddingTop:16}}>
            <div style={{textAlign:'center'}}><div style={{fontSize:11, color:'#64748b', fontWeight:600}}>Tests</div><div style={{fontSize:16, fontWeight:700, color:'#0f172a'}}>12</div></div>
            <div style={{textAlign:'center'}}><div style={{fontSize:11, color:'#64748b', fontWeight:600}}>Questions</div><div style={{fontSize:16, fontWeight:700, color:'#0f172a'}}>650</div></div>
            <div style={{textAlign:'center'}}><div style={{fontSize:11, color:'#64748b', fontWeight:600}}>Accuracy</div><div style={{fontSize:16, fontWeight:700, color:'#0f172a'}}>82%</div></div>
            <div style={{textAlign:'center'}}><div style={{fontSize:11, color:'#64748b', fontWeight:600}}>Study Time</div><div style={{fontSize:16, fontWeight:700, color:'#0f172a'}}>12h 45m</div></div>
          </div>
        </div>

        {/* Today's Plan */}
        <div className="sd-card">
          <div className="sd-card-title">Today's Plan <span style={{fontSize:11, color:'#64748b'}}>5/6 Completed</span></div>
          <div style={{flex:1}}>
            <div className="sd-plan-item"><div className="sd-plan-left"><CheckCircle2 size={16} color="#10b981"/> Pharmacology - Diuretics</div><div className="sd-plan-right">30 min <CheckCircle2 size={14} color="#10b981"/></div></div>
            <div className="sd-plan-item"><div className="sd-plan-left"><CheckCircle2 size={16} color="#10b981"/> 50 MCQs Practice</div><div className="sd-plan-right">40 min <CheckCircle2 size={14} color="#10b981"/></div></div>
            <div className="sd-plan-item"><div className="sd-plan-left"><CheckCircle2 size={16} color="#10b981"/> NORCET PYQ Set</div><div className="sd-plan-right">30 min <CheckCircle2 size={14} color="#10b981"/></div></div>
            <div className="sd-plan-item"><div className="sd-plan-left"><CheckCircle2 size={16} color="#10b981"/> Revision - Notes</div><div className="sd-plan-right">20 min <CheckCircle2 size={14} color="#10b981"/></div></div>
            <div className="sd-plan-item"><div className="sd-plan-left"><BrainCircuit size={16} color="#8b5cf6"/> Quick Quiz</div><div className="sd-plan-right">10 min <div style={{width:14,height:14,borderRadius:7,border:'1px solid #cbd5e1'}}></div></div></div>
            <div className="sd-plan-item"><div className="sd-plan-left"><Clock size={16} color="#94a3b8"/> AI Mentor - Doubt Session</div><div className="sd-plan-right">15 min <div style={{width:14,height:14,borderRadius:7,border:'1px solid #cbd5e1'}}></div></div></div>
          </div>
          <button className="sd-card-link" style={{width:'100%',justifyContent:'center',border:'1px solid #e2e8f0',borderRadius:8,padding:8,marginTop:12}}>Continue Next Task <Play size={12}/></button>
        </div>
      </div>

      {/* Bottom Grid: Test Progress, Mock Test, AI Mentor */}
      <div className="sd-grid-mid">
        <div className="sd-card sd-tp-grid">
          <div>
            <div className="sd-card-title" style={{marginBottom:0}}>Test Series Progress</div>
            <Link to="/tests" className="sd-card-link" style={{fontSize:11, marginBottom:24}}>View All</Link>
            
            <svg viewBox="0 0 36 36" className="circular-chart">
              <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="circle" stroke="#10b981" strokeDasharray="68, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <text x="18" y="18" textAnchor="middle" fontWeight="800" fontSize="8" fill="#0f172a">68%</text>
              <text x="18" y="24" textAnchor="middle" fontSize="4" fill="#64748b">Overall Progress</text>
            </svg>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:16, marginTop:24}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:12}}><span style={{color:'#64748b',display:'flex',alignItems:'center',gap:4}}><CheckCircle2 size={12} color="#10b981"/> Completed Tests</span><span style={{fontWeight:700,color:'#0f172a'}}>18</span></div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:12}}><span style={{color:'#64748b',display:'flex',alignItems:'center',gap:4}}><FileText size={12} color="#94a3b8"/> Total Tests</span><span style={{fontWeight:700,color:'#0f172a'}}>26</span></div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:12}}><span style={{color:'#64748b',display:'flex',alignItems:'center',gap:4}}><BarChart3 size={12} color="#8b5cf6"/> Avg. Score</span><span style={{fontWeight:700,color:'#0f172a'}}>74%</span></div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:12}}><span style={{color:'#64748b',display:'flex',alignItems:'center',gap:4}}><Target size={12} color="#f59e0b"/> Best Score</span><span style={{fontWeight:700,color:'#0f172a'}}>92%</span></div>
          </div>
        </div>

        <div className="sd-card">
          <div className="sd-card-title">Recent Mock Test</div>
          <div className="sd-mt-inner">
            <div className="sd-mt-left">
              <div className="sd-mt-title">NORCET Mock Test - 08</div>
              <div className="sd-mt-date">Attempted on 25 Aug 2024</div>
              <div className="sd-mt-score">108<span>/120</span></div>
              <div className="sd-mt-stats">
                <div><span style={{color:'#64748b'}}>Accuracy:</span> <span style={{fontWeight:600,color:'#10b981'}}>86%</span></div>
                <div><span style={{color:'#64748b'}}>Percentile:</span> <span style={{fontWeight:600,color:'#0f172a'}}>93.4%</span></div>
              </div>
              <button className="sd-card-link" style={{border:'1px solid #e2e8f0',padding:'6px 12px',borderRadius:6}}>View Detailed Report</button>
            </div>
            <div style={{width:80,display:'flex',alignItems:'center',justifyContent:'center'}}>
              <div style={{width:64,height:80,background:'#eff6ff',borderRadius:8,display:'flex',flexDirection:'column',padding:8,gap:6,border:'1px solid #bfdbfe'}}>
                <div style={{width:'60%',height:4,background:'#3b82f6',borderRadius:2}}></div>
                <div style={{display:'flex',gap:4,alignItems:'center'}}><div style={{width:10,height:10,borderRadius:5,background:'#10b981'}}></div><div style={{width:'80%',height:4,background:'#93c5fd',borderRadius:2}}></div></div>
                <div style={{display:'flex',gap:4,alignItems:'center'}}><div style={{width:10,height:10,borderRadius:5,background:'#10b981'}}></div><div style={{width:'80%',height:4,background:'#93c5fd',borderRadius:2}}></div></div>
                <div style={{display:'flex',gap:4,alignItems:'center'}}><div style={{width:10,height:10,borderRadius:5,background:'#10b981'}}></div><div style={{width:'80%',height:4,background:'#93c5fd',borderRadius:2}}></div></div>
              </div>
            </div>
          </div>
        </div>

        <div className="sd-card" style={{position:'relative', overflow:'hidden'}}>
          <div className="sd-card-title">AI Mentor <span style={{color:'#8b5cf6'}}>✨</span></div>
          <div className="sd-ai-inner">
            <div style={{flex:1}}>
              <div style={{color:'#4f46e5', fontWeight:700, fontSize:15, marginBottom:4}}>Ask Anything</div>
              <div style={{color:'#64748b', fontSize:12, marginBottom:16}}>Get instant answers, explanations & doubt solving</div>
              <div className="sd-ai-input">
                <input type="text" placeholder="Type your question..." />
                <button><ArrowRight size={14}/></button>
              </div>
            </div>
            <div style={{width:60,height:60,background:'#f3e8ff',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#8b5cf6'}}>
              <BrainCircuit size={32} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Grid */}
      <div className="sd-grid-bottom">
        <div className="sd-card">
          <div className="sd-card-title">Your Weak Areas</div>
          <div style={{fontSize:12, color:'#64748b', marginBottom:16}}>Focus more to improve your score</div>
          <div className="sd-chip-row" style={{marginBottom:24}}>
            <div className="sd-chip sd-chip-red">Drug Calculations<div style={{fontSize:10,fontWeight:500,marginTop:2}}>High Priority</div></div>
            <div className="sd-chip sd-chip-red">Cardiovascular Drugs<div style={{fontSize:10,fontWeight:500,marginTop:2}}>High Priority</div></div>
            <div className="sd-chip sd-chip-orange">Microbiology<div style={{fontSize:10,fontWeight:500,marginTop:2}}>Medium Priority</div></div>
            <div className="sd-chip sd-chip-orange">Nursing Process<div style={{fontSize:10,fontWeight:500,marginTop:2}}>Medium Priority</div></div>
          </div>
          <Link to="/mistakes" className="sd-card-link" style={{border:'1px solid #e2e8f0',padding:'6px 12px',borderRadius:6,width:'max-content'}}>View All Weak Areas</Link>
        </div>

        <div className="sd-card">
          <div className="sd-card-title">AI Recommendation for You</div>
          <div style={{fontSize:12, color:'#8b5cf6', fontWeight:600, marginBottom:12}}>Based on your performance</div>
          <div style={{fontSize:13, color:'#0f172a', fontWeight:600, lineHeight:1.5, marginBottom:8}}>Strengthen Pharmacology & Drug Calculations this week.</div>
          <div style={{fontSize:13, color:'#64748b', lineHeight:1.5, marginBottom:24}}>Practice 2 more mock tests to improve speed.</div>
          <button className="sd-card-link" style={{border:'1px solid #e2e8f0',padding:'6px 12px',borderRadius:6,width:'max-content'}}>View Smart Plan</button>
        </div>

        <div className="sd-card">
          <div className="sd-card-title">Keep the Streak Alive! 🔥 <Link to="/plan" className="sd-card-link" style={{fontSize:11,border:'1px solid #e2e8f0',padding:'4px 8px',borderRadius:4}}>View Calendar</Link></div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end'}}>
            <div style={{fontSize:13, color:'#0f172a', fontWeight:500}}>You're doing great!</div>
            <div style={{textAlign:'right'}}>
              <div style={{fontSize:10, color:'#64748b', fontWeight:600}}>Current Streak</div>
              <div style={{fontSize:24, color:'#10b981', fontWeight:800, lineHeight:1}}>12 <span style={{fontSize:12,fontWeight:600,color:'#64748b'}}>Days</span></div>
            </div>
          </div>
          <div className="sd-streak-days">
            <div className="sd-s-day">Mon <div className="sd-s-circle active"><Check size={14}/></div></div>
            <div className="sd-s-day">Tue <div className="sd-s-circle active"><Check size={14}/></div></div>
            <div className="sd-s-day">Wed <div className="sd-s-circle active"><Check size={14}/></div></div>
            <div className="sd-s-day">Thu <div className="sd-s-circle active"><Check size={14}/></div></div>
            <div className="sd-s-day">Fri <div className="sd-s-circle active"><Check size={14}/></div></div>
            <div className="sd-s-day">Sat <div className="sd-s-circle"></div></div>
            <div className="sd-s-day">Sun <div className="sd-s-circle"></div></div>
          </div>
        </div>
      </div>

      {/* Quick Actions and Promo */}
      <div style={{display:'flex', gap:24, alignItems:'stretch', paddingBottom:40}}>
        <div className="sd-qa-bar" style={{flex:2}}>
          <div className="sd-qa-title">Explore Quick Actions</div>
          <div className="sd-qa-items">
            <div className="sd-qa-item"><div className="sd-qa-icon"><BookOpen size={18}/></div> Take Free Test</div>
            <div className="sd-qa-item"><div className="sd-qa-icon"><Video size={18}/></div> Join Live Class</div>
            <div className="sd-qa-item"><div className="sd-qa-icon"><BrainCircuit size={18}/></div> AI Explain Concept</div>
            <div className="sd-qa-item"><div className="sd-qa-icon"><Download size={18}/></div> Download Notes</div>
            <div className="sd-qa-item"><div className="sd-qa-icon"><FileText size={18}/></div> PYQ Practice</div>
            <div className="sd-qa-item"><div className="sd-qa-icon"><Beaker size={18}/></div> Skill Lab</div>
            <div className="sd-qa-item"><div className="sd-qa-icon"><Activity size={18}/></div> Clinical Simulator</div>
          </div>
        </div>

        <div className="sd-promo-card" style={{flex:1, marginBottom:24}}>
          <div className="sd-promo-left">
            <h4>Refer & Earn</h4>
            <p>Invite friends and earn exciting rewards</p>
            <button className="sd-promo-btn" style={{marginTop:12}}>Invite Now →</button>
          </div>
          <div>
            <div style={{fontSize:40}}>🎁</div>
          </div>
        </div>
      </div>

    </div>
  );
}
