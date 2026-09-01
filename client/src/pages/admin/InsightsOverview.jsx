import React from 'react';
import { ArrowUpRight, TrendingUp, ShieldAlert, FileText, CheckCircle, Clock, BookOpen, AlertTriangle, IndianRupee, Users } from 'lucide-react';
import './AdminAIInsights.css';

const COURSES = [
  { id: 1, name: 'Pharmacology', enrolls: '2,450', trend: '↑ 18.2%' },
  { id: 2, name: 'Medical Surgical Nursing', enrolls: '2,120', trend: '↑ 15.8%' },
  { id: 3, name: 'Anatomy & Physiology', enrolls: '1,890', trend: '↑ 14.6%' },
  { id: 4, name: 'Community Health Nursing', enrolls: '1,650', trend: '↑ 10.4%' },
  { id: 5, name: 'Nursing Fundamentals', enrolls: '1,430', trend: '↑ 8.7%' }
];

export default function InsightsOverview() {
  return (
    <div>
      <div className="aii-grid-layout">
        
        {/* Main Column */}
        <div className="aii-grid-main">
          
          <div className="aii-grid-2" style={{marginBottom: 0}}>
            
            <div className="aii-card">
              <div className="aii-card-title" style={{marginBottom: 24}}>Business Health Score</div>
              <div className="aii-score-container">
                <div className="aii-score-ring">
                  <div className="aii-score-inner">
                    <div className="aii-score-val">87</div>
                    <div className="aii-score-max">/100</div>
                  </div>
                </div>
                <div className="aii-score-text">
                  <span className="aii-badge-success">Excellent</span>
                  <div className="aii-score-desc">Your platform is performing great! Keep up the good work and focus on the suggested areas to reach 100.</div>
                  <div className="aii-score-metrics">
                    <div className="aii-sm-row">
                      <span style={{color:'#6b7280', display:'flex', alignItems:'center', gap:6}}><div style={{width:6,height:6,borderRadius:3,background:'#4f46e5'}}></div> Student Engagement</span>
                      <span style={{color:'#10b981'}}>90/100</span>
                    </div>
                    <div className="aii-sm-row">
                      <span style={{color:'#6b7280', display:'flex', alignItems:'center', gap:6}}><div style={{width:6,height:6,borderRadius:3,background:'#3b82f6'}}></div> Course Performance</span>
                      <span style={{color:'#10b981'}}>84/100</span>
                    </div>
                    <div className="aii-sm-row">
                      <span style={{color:'#6b7280', display:'flex', alignItems:'center', gap:6}}><div style={{width:6,height:6,borderRadius:3,background:'#f59e0b'}}></div> Test Performance</span>
                      <span style={{color:'#10b981'}}>88/100</span>
                    </div>
                    <div className="aii-sm-row">
                      <span style={{color:'#6b7280', display:'flex', alignItems:'center', gap:6}}><div style={{width:6,height:6,borderRadius:3,background:'#10b981'}}></div> Revenue Growth</span>
                      <span style={{color:'#10b981'}}>86/100</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="aii-card-link" style={{marginTop: 24}}>View Detailed Report →</div>
            </div>

            <div className="aii-card">
              <div className="aii-card-header">
                <div className="aii-card-title">Student Engagement Trend</div>
                <select className="aii-select" style={{padding:'4px 8px'}}><option>Last 7 Days</option></select>
              </div>
              
              <div className="aii-chart-wrap">
                <div className="aii-chart-top">
                  <div className="aii-chart-stat">
                    <div className="aii-cs-lbl">Daily Active Students</div>
                    <div className="aii-cs-val">2,450 <span style={{fontSize:11, color:'#10b981', fontWeight:600}}>↑ 11.3%</span></div>
                  </div>
                  <div className="aii-chart-stat">
                    <div className="aii-cs-lbl">Study Sessions</div>
                    <div className="aii-cs-val">18,752 <span style={{fontSize:11, color:'#10b981', fontWeight:600}}>↑ 14.6%</span></div>
                  </div>
                  <div className="aii-chart-stat">
                    <div className="aii-cs-lbl">Avg. Session Time</div>
                    <div className="aii-cs-val">42m <span style={{fontSize:11, color:'#10b981', fontWeight:600}}>↑ 6.4%</span></div>
                  </div>
                </div>
                
                <svg className="aii-chart-svg" viewBox="0 0 400 120" preserveAspectRatio="none">
                  <linearGradient id="aii-grad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0"/>
                  </linearGradient>
                  
                  {/* Grid Lines */}
                  <line x1="0" y1="15" x2="400" y2="15" className="aii-cl-grid" />
                  <line x1="0" y1="50" x2="400" y2="50" className="aii-cl-grid" />
                  <line x1="0" y1="85" x2="400" y2="85" className="aii-cl-grid" />

                  {/* Y Axis Labels */}
                  <text x="0" y="20" className="aii-cl-axis">4K</text>
                  <text x="0" y="55" className="aii-cl-axis">3K</text>
                  <text x="0" y="90" className="aii-cl-axis">2K</text>
                  <text x="0" y="115" className="aii-cl-axis">1K</text>

                  {/* X Axis Labels */}
                  <text x="20" y="115" className="aii-cl-axis">20 May</text>
                  <text x="80" y="115" className="aii-cl-axis">21 May</text>
                  <text x="140" y="115" className="aii-cl-axis">22 May</text>
                  <text x="200" y="115" className="aii-cl-axis">23 May</text>
                  <text x="260" y="115" className="aii-cl-axis">24 May</text>
                  <text x="320" y="115" className="aii-cl-axis">25 May</text>
                  <text x="370" y="115" className="aii-cl-axis">26 May</text>

                  {/* Line and Area */}
                  <path className="aii-cl-area" d="M35 70 L95 80 L155 40 L215 55 L275 45 L335 60 L385 50 L385 100 L35 100 Z" />
                  <path className="aii-cl-line" d="M35 70 L95 80 L155 40 L215 55 L275 45 L335 60 L385 50" />
                  
                  {/* Dots */}
                  <circle cx="35" cy="70" r="4" className="aii-cl-dot"/>
                  <circle cx="95" cy="80" r="4" className="aii-cl-dot"/>
                  <circle cx="155" cy="40" r="4" className="aii-cl-dot"/>
                  <circle cx="215" cy="55" r="4" className="aii-cl-dot"/>
                  <circle cx="275" cy="45" r="4" className="aii-cl-dot"/>
                  <circle cx="335" cy="60" r="4" className="aii-cl-dot"/>
                  <circle cx="385" cy="50" r="4" className="aii-cl-dot"/>

                </svg>
                {/* Tooltip mockup */}
                <div className="aii-cl-tooltip" style={{top: -5, left: 235}}>
                  <div style={{fontSize:10, color:'#6b7280', marginBottom:2}}>24 May</div>
                  <div style={{fontSize:13, fontWeight:700, color:'#111827'}}>2,986</div>
                  <div style={{fontSize:10, color:'#10b981', fontWeight:600}}>↑ 12.5%</div>
                </div>
              </div>
            </div>

          </div>

          <div className="aii-grid-3" style={{marginBottom: 0}}>
            
            <div className="aii-card" style={{padding:'24px 0'}}>
              <div className="aii-card-header" style={{padding:'0 24px'}}>
                <div className="aii-card-title">Top Performing Courses</div>
                <select className="aii-select" style={{padding:'4px 8px'}}><option>By Enrollments</option></select>
              </div>
              <table className="aii-table">
                <tbody>
                  {COURSES.map((c, i) => (
                    <tr key={c.id}>
                      <td className="aii-t-num">{i+1}</td>
                      <td style={{fontWeight:500}}>{c.name}</td>
                      <td style={{textAlign:'right', fontWeight:600}}>{c.enrolls}</td>
                      <td style={{textAlign:'right'}}><span className="aii-t-trend" style={{color:'#10b981'}}>{c.trend}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="aii-card-link" style={{padding:'16px 24px 0'}}>View All Courses →</div>
            </div>

            <div className="aii-card">
              <div className="aii-card-header">
                <div className="aii-card-title">Test Performance Overview</div>
                <select className="aii-select" style={{padding:'4px 8px'}}><option>All Tests</option></select>
              </div>
              <div className="aii-bc-legend">
                <span><span className="aii-bc-dot" style={{background:'#4f46e5'}}></span> Average Score</span>
                <span><span className="aii-bc-dot" style={{background:'#10b981'}}></span> Pass Percentage</span>
              </div>
              <div className="aii-bar-chart">
                {/* Y Axis Mock */}
                <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between', height:'100%', fontSize:10, color:'#9ca3af', position:'absolute', left:0}}>
                  <span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span>
                </div>
                <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between', height:'100%', fontSize:10, color:'#9ca3af', position:'absolute', right:0}}>
                  <span>100</span><span>75</span><span>50</span><span>25</span><span>0</span>
                </div>

                <div className="aii-bc-group" style={{marginLeft:20}}>
                  <div className="aii-bc-bar1" style={{height:'75%'}}></div>
                  <div className="aii-bc-bar2" style={{height:'45%'}}></div>
                  <div className="aii-bc-lbl">AIIMS</div>
                  {/* Mock line connecting points */}
                </div>
                <div className="aii-bc-group">
                  <div className="aii-bc-bar1" style={{height:'85%'}}></div>
                  <div className="aii-bc-bar2" style={{height:'65%'}}></div>
                  <div className="aii-bc-lbl">NORCET</div>
                </div>
                <div className="aii-bc-group">
                  <div className="aii-bc-bar1" style={{height:'55%'}}></div>
                  <div className="aii-bc-bar2" style={{height:'70%'}}></div>
                  <div className="aii-bc-lbl">State PSC</div>
                </div>
                <div className="aii-bc-group">
                  <div className="aii-bc-bar1" style={{height:'65%'}}></div>
                  <div className="aii-bc-bar2" style={{height:'40%'}}></div>
                  <div className="aii-bc-lbl">ESIC</div>
                </div>
                <div className="aii-bc-group">
                  <div className="aii-bc-bar1" style={{height:'80%'}}></div>
                  <div className="aii-bc-bar2" style={{height:'55%'}}></div>
                  <div className="aii-bc-lbl">PGI</div>
                </div>
                
                {/* Mock Connecting Line overlay (just a rough SVG) */}
                <svg width="100%" height="100%" style={{position:'absolute', top:20, left:20, width:'calc(100% - 40px)', zIndex:1}}>
                   <path d="M 20 70 L 80 40 L 140 30 L 200 80 L 260 50" fill="none" stroke="#10b981" strokeWidth="2"/>
                   <circle cx="20" cy="70" r="4" fill="#fff" stroke="#10b981" strokeWidth="2"/>
                   <circle cx="80" cy="40" r="4" fill="#fff" stroke="#10b981" strokeWidth="2"/>
                   <circle cx="140" cy="30" r="4" fill="#fff" stroke="#10b981" strokeWidth="2"/>
                   <circle cx="200" cy="80" r="4" fill="#fff" stroke="#10b981" strokeWidth="2"/>
                   <circle cx="260" cy="50" r="4" fill="#fff" stroke="#10b981" strokeWidth="2"/>
                </svg>

              </div>
              <div className="aii-card-link" style={{marginTop: 16}}>View Detailed Analytics →</div>
            </div>

            <div className="aii-card">
              <div className="aii-card-header">
                <div className="aii-card-title">Revenue Overview</div>
                <select className="aii-select" style={{padding:'4px 8px'}}><option>This Week</option></select>
              </div>
              <div style={{fontSize:24, fontWeight:700, color:'#111827', display:'flex', alignItems:'center', gap:8, marginBottom:16}}>
                ₹18.75L <span style={{fontSize:12, color:'#10b981'}}>↑ 13.7% vs last 7 days</span>
              </div>
              <div style={{height: 60, position:'relative'}}>
                <svg width="100%" height="100%" viewBox="0 0 200 50" preserveAspectRatio="none">
                  <path d="M0 40 L40 35 L80 45 L120 20 L160 30 L200 10" fill="none" stroke="#8b5cf6" strokeWidth="3"/>
                  <circle cx="0" cy="40" r="3" fill="#8b5cf6"/>
                  <circle cx="40" cy="35" r="3" fill="#8b5cf6"/>
                  <circle cx="80" cy="45" r="3" fill="#8b5cf6"/>
                  <circle cx="120" cy="20" r="3" fill="#8b5cf6"/>
                  <circle cx="160" cy="30" r="3" fill="#8b5cf6"/>
                  <circle cx="200" cy="10" r="3" fill="#8b5cf6"/>
                </svg>
              </div>
              <div style={{marginTop:24, display:'flex', flexDirection:'column', gap:12}}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:12}}>
                  <span style={{color:'#4b5563', display:'flex', alignItems:'center', gap:6}}><div className="aii-bc-dot" style={{background:'#8b5cf6'}}></div> Course Sales</span>
                  <span style={{fontWeight:600, color:'#111827'}}>₹11.25L <span style={{color:'#6b7280', fontWeight:400}}>(60%)</span></span>
                </div>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:12}}>
                  <span style={{color:'#4b5563', display:'flex', alignItems:'center', gap:6}}><div className="aii-bc-dot" style={{background:'#10b981'}}></div> Test Series</span>
                  <span style={{fontWeight:600, color:'#111827'}}>₹4.80L <span style={{color:'#6b7280', fontWeight:400}}>(25%)</span></span>
                </div>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:12}}>
                  <span style={{color:'#4b5563', display:'flex', alignItems:'center', gap:6}}><div className="aii-bc-dot" style={{background:'#f59e0b'}}></div> Live Classes</span>
                  <span style={{fontWeight:600, color:'#111827'}}>₹1.95L <span style={{color:'#6b7280', fontWeight:400}}>(10%)</span></span>
                </div>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:12}}>
                  <span style={{color:'#4b5563', display:'flex', alignItems:'center', gap:6}}><div className="aii-bc-dot" style={{background:'#3b82f6'}}></div> Other Sources</span>
                  <span style={{fontWeight:600, color:'#111827'}}>₹0.75L <span style={{color:'#6b7280', fontWeight:400}}>(5%)</span></span>
                </div>
              </div>
              <div className="aii-card-link" style={{marginTop: 16}}>View Financial Report →</div>
            </div>

          </div>

        </div>

        {/* Sidebar Column */}
        <div>
          
          <div className="aii-card">
            <div className="aii-card-title" style={{marginBottom: 24}}>Top Insights</div>
            <div className="aii-insights-list">
              <div className="aii-ins-item">
                <div className="aii-ins-icon" style={{background:'#d1fae5', color:'#10b981'}}><CheckCircle size={16}/></div>
                <div className="aii-ins-text">
                  <div className="aii-ins-title">High Course Completion Rate</div>
                  <div className="aii-ins-desc">"Pharmacology" has 92% completion rate, 18% higher than average.</div>
                </div>
              </div>
              <div className="aii-ins-item">
                <div className="aii-ins-icon" style={{background:'#ffedd5', color:'#f59e0b'}}><TrendingUp size={16}/></div>
                <div className="aii-ins-text">
                  <div className="aii-ins-title">Mock Test Performance</div>
                  <div className="aii-ins-desc">Students are scoring 15% higher in "AIIMS NORCET Mock Tests".</div>
                </div>
              </div>
              <div className="aii-ins-item">
                <div className="aii-ins-icon" style={{background:'#f3e8ff', color:'#8b5cf6'}}><Clock size={16}/></div>
                <div className="aii-ins-text">
                  <div className="aii-ins-title">Peak Learning Time</div>
                  <div className="aii-ins-desc">Most students are active between 7PM - 10PM.</div>
                </div>
              </div>
              <div className="aii-ins-item">
                <div className="aii-ins-icon" style={{background:'#dbeafe', color:'#3b82f6'}}><IndianRupee size={16}/></div>
                <div className="aii-ins-text">
                  <div className="aii-ins-title">Revenue Growth</div>
                  <div className="aii-ins-desc">Your revenue grew by 13.7% this week compared to last week.</div>
                </div>
              </div>
            </div>
            <div className="aii-card-link" style={{marginTop: 24}}>View All Insights →</div>
          </div>

          <div className="aii-card">
            <div className="aii-card-title" style={{marginBottom: 24}}>AI Recommendations</div>
            <div className="aii-rec-list">
              
              <div className="aii-rec-item">
                <div className="aii-rec-icon" style={{background:'#f3e8ff', color:'#8b5cf6'}}><BookOpen size={20}/></div>
                <div className="aii-rec-text">
                  <div className="aii-rec-title">Launch New Course</div>
                  <div className="aii-rec-desc">High demand for "Pediatric Nursing". Consider launching a new course.</div>
                  <div className="aii-rec-action">View Details</div>
                </div>
              </div>

              <div className="aii-rec-item">
                <div className="aii-rec-icon" style={{background:'#ffedd5', color:'#f59e0b'}}><Users size={20}/></div>
                <div className="aii-rec-text">
                  <div className="aii-rec-title">Engage Inactive Students</div>
                  <div className="aii-rec-desc">You have 1,245 inactive students. Send personalized reminders.</div>
                  <div className="aii-rec-action">Take Action</div>
                </div>
              </div>

              <div className="aii-rec-item">
                <div className="aii-rec-icon" style={{background:'#e0f2fe', color:'#0ea5e9'}}><Clock size={20}/></div>
                <div className="aii-rec-text">
                  <div className="aii-rec-title">Optimize Test Schedule</div>
                  <div className="aii-rec-desc">Increase mock test frequency for better engagement.</div>
                  <div className="aii-rec-action">Optimize</div>
                </div>
              </div>

            </div>
            <div className="aii-card-link" style={{marginTop: 16}}>View All Recommendations →</div>
          </div>

        </div>

      </div>

      {/* Smart Alerts Bottom Row */}
      <div className="aii-alerts-wrap">
        <div className="aii-alert-title">Smart Alerts</div>
        <div className="aii-alerts-grid">
          
          <div className="aii-al-card" style={{background:'#fef2f2', borderColor:'#fecaca', color:'#991b1b'}}>
            <div className="aii-al-header"><AlertTriangle size={16} color="#ef4444"/> Low Engagement Alert</div>
            <div className="aii-al-desc">15% of students haven't logged in for 7+ days.</div>
            <div className="aii-al-link" style={{color:'#ef4444'}}>View Students</div>
            <div className="aii-al-close">×</div>
          </div>
          
          <div className="aii-al-card" style={{background:'#fffbeb', borderColor:'#fef3c7', color:'#92400e'}}>
            <div className="aii-al-header"><FileText size={16} color="#f59e0b"/> Course Update Needed</div>
            <div className="aii-al-desc">3 courses need content updates.</div>
            <div className="aii-al-link" style={{color:'#d97706'}}>Update Now</div>
            <div className="aii-al-close">×</div>
          </div>

          <div className="aii-al-card" style={{background:'#f0fdfa', borderColor:'#ccfbf1', color:'#115e59'}}>
            <div className="aii-al-header"><ShieldAlert size={16} color="#0d9488"/> Server Performance</div>
            <div className="aii-al-desc">All systems are running smoothly.</div>
            <div className="aii-al-link" style={{color:'#0f766e'}}>View Status</div>
            <div className="aii-al-close">×</div>
          </div>

          <div className="aii-al-card" style={{background:'#f0fdf4', borderColor:'#dcfce7', color:'#166534'}}>
            <div className="aii-al-header"><CheckCircle size={16} color="#10b981"/> Payment Success Rate</div>
            <div className="aii-al-desc">98.6% payments successful this week.</div>
            <div className="aii-al-link" style={{color:'#15803d'}}>View Details</div>
            <div className="aii-al-close">×</div>
          </div>

        </div>
      </div>
    </div>
  );
}
