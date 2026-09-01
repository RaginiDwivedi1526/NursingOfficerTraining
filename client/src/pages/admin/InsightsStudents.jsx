import React from 'react';
import { ArrowUpRight, ShieldAlert, Zap, BookOpen, Send, Calendar, MonitorPlay } from 'lucide-react';
import './AdminAIInsights.css';

const TOP_STUDENTS = [
  { id: 1, name: 'Aaradhya Singh', courses: 4, score: '92%', progress: 92, lastActive: '2 hours ago' },
  { id: 2, name: 'Rohan Mehta', courses: 3, score: '89%', progress: 89, lastActive: '2 hours ago' },
  { id: 3, name: 'Pooja Sharma', courses: 5, score: '87%', progress: 87, lastActive: '5 hours ago' },
  { id: 4, name: 'Vikram Patel', courses: 2, score: '85%', progress: 85, lastActive: '5 hours ago' },
  { id: 5, name: 'Neha Verma', courses: 4, score: '83%', progress: 83, lastActive: '8 hours ago' }
];

const AT_RISK = [
  { id: 1, name: 'Anjali Kumari', lastActive: '7 days ago', score: '28/100', risk: 'High' },
  { id: 2, name: 'Mohit Yadav', lastActive: '5 days ago', score: '32/100', risk: 'High' },
  { id: 3, name: 'Simran Kaur', lastActive: '4 days ago', score: '35/100', risk: 'Medium' },
  { id: 4, name: 'Deepak Singh', lastActive: '6 days ago', score: '38/100', risk: 'Medium' },
  { id: 5, name: 'Kavya Reddy', lastActive: '3 days ago', score: '40/100', risk: 'Medium' }
];

export default function InsightsStudents() {
  return (
    <div>
      <div className="aii-grid-layout">
        
        {/* Main Column */}
        <div className="aii-grid-main">
          
          <div className="aii-grid-2" style={{marginBottom: 0}}>
            
            <div className="aii-card">
              <div className="aii-card-header">
                <div className="aii-card-title">Student Growth</div>
                <select className="aii-select" style={{padding:'4px 8px'}}><option>Last 7 Days</option></select>
              </div>
              
              <div className="aii-chart-wrap" style={{height:250}}>
                <div className="aii-chart-stat" style={{position:'absolute', top:0, left:0}}>
                  <div className="aii-cs-lbl">Total Students</div>
                  <div className="aii-cs-val">12,545 <span style={{fontSize:11, color:'#10b981', fontWeight:600}}>↑ 12.4%</span></div>
                </div>
                
                <svg className="aii-chart-svg" viewBox="0 0 400 160" preserveAspectRatio="none" style={{marginTop: 60}}>
                  <linearGradient id="aii-grad-growth" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0"/>
                  </linearGradient>
                  
                  {/* Grid Lines */}
                  <line x1="0" y1="15" x2="400" y2="15" className="aii-cl-grid" />
                  <line x1="0" y1="65" x2="400" y2="65" className="aii-cl-grid" />
                  <line x1="0" y1="115" x2="400" y2="115" className="aii-cl-grid" />

                  {/* Y Axis Labels */}
                  <text x="0" y="20" className="aii-cl-axis">15K</text>
                  <text x="0" y="70" className="aii-cl-axis">10K</text>
                  <text x="0" y="120" className="aii-cl-axis">5K</text>
                  <text x="0" y="145" className="aii-cl-axis">0</text>

                  {/* X Axis Labels */}
                  <text x="20" y="145" className="aii-cl-axis">20 May</text>
                  <text x="80" y="145" className="aii-cl-axis">21 May</text>
                  <text x="140" y="145" className="aii-cl-axis">22 May</text>
                  <text x="200" y="145" className="aii-cl-axis">23 May</text>
                  <text x="260" y="145" className="aii-cl-axis">24 May</text>
                  <text x="320" y="145" className="aii-cl-axis">25 May</text>
                  <text x="370" y="145" className="aii-cl-axis">26 May</text>

                  {/* Line and Area */}
                  <path className="aii-cl-area" fill="url(#aii-grad-growth)" d="M35 100 L95 80 L155 70 L215 50 L275 65 L335 45 L385 60 L385 130 L35 130 Z" />
                  <path className="aii-cl-line" d="M35 100 L95 80 L155 70 L215 50 L275 65 L335 45 L385 60" />
                  
                  {/* Dots */}
                  <circle cx="35" cy="100" r="4" className="aii-cl-dot"/>
                  <circle cx="95" cy="80" r="4" className="aii-cl-dot"/>
                  <circle cx="155" cy="70" r="4" className="aii-cl-dot"/>
                  <circle cx="215" cy="50" r="4" className="aii-cl-dot"/>
                  <circle cx="275" cy="65" r="4" className="aii-cl-dot"/>
                  <circle cx="335" cy="45" r="4" className="aii-cl-dot"/>
                  <circle cx="385" cy="60" r="4" className="aii-cl-dot"/>

                </svg>
                {/* Tooltip mockup */}
                <div className="aii-cl-tooltip" style={{top: 35, left: 180}}>
                  <div style={{fontSize:10, color:'#6b7280', marginBottom:2}}>24 May</div>
                  <div style={{fontSize:13, fontWeight:700, color:'#111827'}}>12,102</div>
                  <div style={{fontSize:10, color:'#10b981', fontWeight:600}}>↑ 13.2%</div>
                </div>
              </div>
            </div>

            <div className="aii-card">
              <div className="aii-card-header">
                <div className="aii-card-title">Student Status</div>
                <div className="aii-card-link">View Details →</div>
              </div>
              <div style={{display:'flex', gap:24, alignItems:'center', height:200}}>
                <div style={{width: 140, height: 140, borderRadius:'50%', background:'conic-gradient(#10b981 71%, #f59e0b 0 81%, #3b82f6 0 91%, #ef4444 0)', position:'relative', display:'flex', justifyContent:'center', alignItems:'center'}}>
                   <div style={{width:100, height:100, background:'#fff', borderRadius:'50%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                     <span style={{fontSize:11, color:'#6b7280'}}>Total</span>
                     <span style={{fontSize:20, fontWeight:700}}>12,545</span>
                   </div>
                </div>
                <div style={{display:'flex', flexDirection:'column', gap:12, flex:1}}>
                  <div style={{display:'flex', gap:8, alignItems:'flex-start'}}>
                    <div style={{width:8, height:8, borderRadius:4, background:'#10b981', marginTop:4}}></div>
                    <div style={{display:'flex', flexDirection:'column'}}>
                      <span style={{fontSize:12, fontWeight:600}}>Active Students</span>
                      <span style={{fontSize:11, color:'#6b7280'}}>8,932 (71.2%)</span>
                    </div>
                  </div>
                  <div style={{display:'flex', gap:8, alignItems:'flex-start'}}>
                    <div style={{width:8, height:8, borderRadius:4, background:'#f59e0b', marginTop:4}}></div>
                    <div style={{display:'flex', flexDirection:'column'}}>
                      <span style={{fontSize:12, fontWeight:600}}>Inactive Students</span>
                      <span style={{fontSize:11, color:'#6b7280'}}>1,254 (10.0%)</span>
                    </div>
                  </div>
                  <div style={{display:'flex', gap:8, alignItems:'flex-start'}}>
                    <div style={{width:8, height:8, borderRadius:4, background:'#3b82f6', marginTop:4}}></div>
                    <div style={{display:'flex', flexDirection:'column'}}>
                      <span style={{fontSize:12, fontWeight:600}}>New Students</span>
                      <span style={{fontSize:11, color:'#6b7280'}}>1,245 (9.9%)</span>
                    </div>
                  </div>
                  <div style={{display:'flex', gap:8, alignItems:'flex-start'}}>
                    <div style={{width:8, height:8, borderRadius:4, background:'#ef4444', marginTop:4}}></div>
                    <div style={{display:'flex', flexDirection:'column'}}>
                      <span style={{fontSize:12, fontWeight:600}}>At Risk Students</span>
                      <span style={{fontSize:11, color:'#6b7280'}}>1,114 (8.9%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="aii-grid-2" style={{marginBottom: 0}}>
            
            <div className="aii-card" style={{padding:'24px 0'}}>
              <div className="aii-card-header" style={{padding:'0 24px'}}>
                <div className="aii-card-title">Top Performing Students</div>
                <div className="aii-card-link">View All →</div>
              </div>
              <table className="aii-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Student Name</th>
                    <th>Courses Enrolled</th>
                    <th>Tests Score</th>
                    <th>Progress</th>
                    <th>Last Active</th>
                  </tr>
                </thead>
                <tbody>
                  {TOP_STUDENTS.map((s, i) => (
                    <tr key={s.id}>
                      <td className="aii-t-num">{i+1}</td>
                      <td>
                        <div style={{display:'flex', alignItems:'center', gap:8, fontWeight:500}}>
                          <img src={`https://ui-avatars.com/api/?name=${s.name}&background=random`} alt="u" style={{width:24, height:24, borderRadius:12}}/>
                          {s.name}
                        </div>
                      </td>
                      <td style={{textAlign:'center'}}>{s.courses}</td>
                      <td style={{textAlign:'center'}}>{s.score}</td>
                      <td>
                        <div style={{display:'flex', alignItems:'center', gap:8}}>
                          <div style={{width:40, height:4, background:'#e5e7eb', borderRadius:2, overflow:'hidden'}}>
                            <div style={{width:`${s.progress}%`, height:'100%', background:'#4f46e5'}}></div>
                          </div>
                          <span style={{fontSize:11}}>{s.progress}%</span>
                        </div>
                      </td>
                      <td style={{color:'#6b7280'}}>{s.lastActive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="aii-card">
              <div className="aii-card-header">
                <div className="aii-card-title">Student Engagement</div>
                <div className="aii-card-link">View Analytics →</div>
              </div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
                
                <div style={{border:'1px solid #e5e7eb', borderRadius:8, padding:16, display:'flex', alignItems:'center', gap:12}}>
                  <div style={{width:40, height:40, borderRadius:8, background:'#f3e8ff', color:'#8b5cf6', display:'flex', justifyContent:'center', alignItems:'center'}}><Clock size={20}/></div>
                  <div>
                    <div style={{fontSize:11, color:'#6b7280'}}>Avg. Study Time</div>
                    <div style={{fontSize:18, fontWeight:700, color:'#111827'}}>42m</div>
                    <div style={{fontSize:10, color:'#10b981'}}>↑ 6.4% vs last 7 days</div>
                  </div>
                </div>

                <div style={{border:'1px solid #e5e7eb', borderRadius:8, padding:16, display:'flex', alignItems:'center', gap:12}}>
                  <div style={{width:40, height:40, borderRadius:8, background:'#d1fae5', color:'#10b981', display:'flex', justifyContent:'center', alignItems:'center'}}><MonitorPlay size={20}/></div>
                  <div>
                    <div style={{fontSize:11, color:'#6b7280'}}>Live Classes Joined</div>
                    <div style={{fontSize:18, fontWeight:700, color:'#111827'}}>1,245</div>
                    <div style={{fontSize:10, color:'#10b981'}}>↑ 11.2% vs last 7 days</div>
                  </div>
                </div>

                <div style={{border:'1px solid #e5e7eb', borderRadius:8, padding:16, display:'flex', alignItems:'center', gap:12}}>
                  <div style={{width:40, height:40, borderRadius:8, background:'#dbeafe', color:'#3b82f6', display:'flex', justifyContent:'center', alignItems:'center'}}><BookOpen size={20}/></div>
                  <div>
                    <div style={{fontSize:11, color:'#6b7280'}}>Avg. Sessions / Student</div>
                    <div style={{fontSize:18, fontWeight:700, color:'#111827'}}>18.6</div>
                    <div style={{fontSize:10, color:'#10b981'}}>↑ 9.3% vs last 7 days</div>
                  </div>
                </div>

                <div style={{border:'1px solid #e5e7eb', borderRadius:8, padding:16, display:'flex', alignItems:'center', gap:12}}>
                  <div style={{width:40, height:40, borderRadius:8, background:'#fee2e2', color:'#ef4444', display:'flex', justifyContent:'center', alignItems:'center'}}><Zap size={20}/></div>
                  <div>
                    <div style={{fontSize:11, color:'#6b7280'}}>Study Streak (Avg.)</div>
                    <div style={{fontSize:18, fontWeight:700, color:'#111827'}}>7.2 Days</div>
                    <div style={{fontSize:10, color:'#10b981'}}>↑ 8.1% vs last 7 days</div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          <div className="aii-grid-2">
            
            <div className="aii-card" style={{padding:'24px 0'}}>
              <div className="aii-card-header" style={{padding:'0 24px'}}>
                <div className="aii-card-title">At Risk Students</div>
                <div className="aii-card-link">View All At Risk →</div>
              </div>
              <table className="aii-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Last Active</th>
                    <th>Engagement Score</th>
                    <th>Risk Level</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {AT_RISK.map((s) => (
                    <tr key={s.id}>
                      <td>
                        <div style={{display:'flex', alignItems:'center', gap:8, fontWeight:500}}>
                          <img src={`https://ui-avatars.com/api/?name=${s.name}&background=random`} alt="u" style={{width:24, height:24, borderRadius:12}}/>
                          {s.name}
                        </div>
                      </td>
                      <td style={{color:'#6b7280'}}>{s.lastActive}</td>
                      <td>{s.score}</td>
                      <td>
                        <span style={{
                          background: s.risk==='High'?'#fee2e2':'#ffedd5',
                          color: s.risk==='High'?'#ef4444':'#f59e0b',
                          padding:'2px 8px', borderRadius:12, fontSize:10, fontWeight:700
                        }}>{s.risk}</span>
                      </td>
                      <td>
                        <button style={{background:'#f3f4f6', border:'none', width:28, height:28, borderRadius:4, display:'flex', justifyContent:'center', alignItems:'center', cursor:'pointer'}}><Send size={14} color="#4b5563"/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="aii-card">
              <div className="aii-card-header">
                <div className="aii-card-title">New Students Trend</div>
                <select className="aii-select" style={{padding:'4px 8px'}}><option>Last 7 Days</option></select>
              </div>
              <div className="aii-bar-chart" style={{height: 200, alignItems:'flex-end'}}>
                
                {/* Mock Bar Chart */}
                <div className="aii-bc-group">
                  <div style={{fontSize:10, fontWeight:600, color:'#111827', marginBottom:4}}>980</div>
                  <div style={{width:24, height:'50%', background:'#8b5cf6', borderRadius:'4px 4px 0 0'}}></div>
                  <div style={{fontSize:10, color:'#6b7280', marginTop:4}}>20 May</div>
                </div>
                <div className="aii-bc-group">
                  <div style={{fontSize:10, fontWeight:600, color:'#111827', marginBottom:4}}>1,125</div>
                  <div style={{width:24, height:'60%', background:'#8b5cf6', borderRadius:'4px 4px 0 0'}}></div>
                  <div style={{fontSize:10, color:'#6b7280', marginTop:4}}>21 May</div>
                </div>
                <div className="aii-bc-group">
                  <div style={{fontSize:10, fontWeight:600, color:'#111827', marginBottom:4}}>1,068</div>
                  <div style={{width:24, height:'55%', background:'#8b5cf6', borderRadius:'4px 4px 0 0'}}></div>
                  <div style={{fontSize:10, color:'#6b7280', marginTop:4}}>22 May</div>
                </div>
                <div className="aii-bc-group">
                  <div style={{fontSize:10, fontWeight:600, color:'#111827', marginBottom:4}}>1,312</div>
                  <div style={{width:24, height:'80%', background:'#8b5cf6', borderRadius:'4px 4px 0 0'}}></div>
                  <div style={{fontSize:10, color:'#6b7280', marginTop:4}}>23 May</div>
                </div>
                <div className="aii-bc-group">
                  <div style={{fontSize:10, fontWeight:600, color:'#111827', marginBottom:4}}>1,245</div>
                  <div style={{width:24, height:'75%', background:'#8b5cf6', borderRadius:'4px 4px 0 0'}}></div>
                  <div style={{fontSize:10, color:'#6b7280', marginTop:4}}>24 May</div>
                </div>
                <div className="aii-bc-group">
                  <div style={{fontSize:10, fontWeight:600, color:'#111827', marginBottom:4}}>1,158</div>
                  <div style={{width:24, height:'65%', background:'#8b5cf6', borderRadius:'4px 4px 0 0'}}></div>
                  <div style={{fontSize:10, color:'#6b7280', marginTop:4}}>25 May</div>
                </div>
                <div className="aii-bc-group">
                  <div style={{fontSize:10, fontWeight:600, color:'#111827', marginBottom:4}}>1,245</div>
                  <div style={{width:24, height:'75%', background:'#8b5cf6', borderRadius:'4px 4px 0 0'}}></div>
                  <div style={{fontSize:10, color:'#6b7280', marginTop:4}}>26 May</div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Sidebar Column */}
        <div>
          
          <div className="aii-card">
            <div className="aii-card-title" style={{marginBottom: 24}}>Top Insights</div>
            <div className="aii-insights-list">
              <div className="aii-ins-item">
                <div className="aii-ins-icon" style={{background:'#d1fae5', color:'#10b981'}}><ArrowUpRight size={16}/></div>
                <div className="aii-ins-text">
                  <div className="aii-ins-title">Active Students Increased</div>
                  <div className="aii-ins-desc">Active students increased by 8.2% this week. Keep engaging them with live classes.</div>
                </div>
              </div>
              <div className="aii-ins-item">
                <div className="aii-ins-icon" style={{background:'#ffedd5', color:'#f59e0b'}}><ShieldAlert size={16}/></div>
                <div className="aii-ins-text">
                  <div className="aii-ins-title">At Risk Students</div>
                  <div className="aii-ins-desc">1,114 students are at risk of becoming inactive. Reach out to re-engage them.</div>
                </div>
              </div>
              <div className="aii-ins-item">
                <div className="aii-ins-icon" style={{background:'#dbeafe', color:'#3b82f6'}}><BookOpen size={16}/></div>
                <div className="aii-ins-text">
                  <div className="aii-ins-title">High Performer</div>
                  <div className="aii-ins-desc">Top 10% students have a 92% higher test pass rate. Analyze their learning patterns.</div>
                </div>
              </div>
              <div className="aii-ins-item">
                <div className="aii-ins-icon" style={{background:'#d1fae5', color:'#10b981'}}><ShieldAlert size={16}/></div>
                <div className="aii-ins-text">
                  <div className="aii-ins-title">Course Completion</div>
                  <div className="aii-ins-desc">Completion rate improved by 15.3%. Consider similar strategies for other courses.</div>
                </div>
              </div>
            </div>
            <div className="aii-card-link" style={{marginTop: 24}}>View All Insights →</div>
          </div>

          <div className="aii-card">
            <div className="aii-card-header">
              <div className="aii-card-title">Student Segmentation</div>
              <div className="aii-card-link">View Details →</div>
            </div>
            
            <div style={{display:'flex', flexDirection:'column', gap:20}}>
              <div>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:12, marginBottom:8}}>
                  <span style={{fontWeight:500}}>High Performers (80%+)</span>
                  <span style={{fontWeight:600}}>2,354 <span style={{color:'#6b7280'}}>(18.8%)</span></span>
                </div>
                <div style={{width:'100%', height:6, background:'#e5e7eb', borderRadius:3}}>
                  <div style={{width:'18.8%', height:'100%', background:'#4f46e5', borderRadius:3}}></div>
                </div>
              </div>
              <div>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:12, marginBottom:8}}>
                  <span style={{fontWeight:500}}>Medium Performers (50-80%)</span>
                  <span style={{fontWeight:600}}>7,852 <span style={{color:'#6b7280'}}>(62.6%)</span></span>
                </div>
                <div style={{width:'100%', height:6, background:'#e5e7eb', borderRadius:3}}>
                  <div style={{width:'62.6%', height:'100%', background:'#4f46e5', borderRadius:3}}></div>
                </div>
              </div>
              <div>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:12, marginBottom:8}}>
                  <span style={{fontWeight:500}}>Low Performers ({"<"}50%)</span>
                  <span style={{fontWeight:600}}>2,339 <span style={{color:'#6b7280'}}>(18.6%)</span></span>
                </div>
                <div style={{width:'100%', height:6, background:'#e5e7eb', borderRadius:3}}>
                  <div style={{width:'18.6%', height:'100%', background:'#4f46e5', borderRadius:3}}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="aii-card">
            <div className="aii-card-title" style={{marginBottom: 24}}>Recommended Actions</div>
            <div className="aii-rec-list">
              
              <div className="aii-rec-item">
                <div className="aii-rec-icon" style={{background:'#f3e8ff', color:'#8b5cf6'}}><Users size={20}/></div>
                <div className="aii-rec-text">
                  <div className="aii-rec-title">Engage At Risk Students</div>
                  <div className="aii-rec-desc">Send personalized messages and offers to 1,114 at risk students.</div>
                  <div className="aii-rec-action">Take Action →</div>
                </div>
              </div>

              <div className="aii-rec-item">
                <div className="aii-rec-icon" style={{background:'#d1fae5', color:'#10b981'}}><Calendar size={20}/></div>
                <div className="aii-rec-text">
                  <div className="aii-rec-title">Schedule More Live Classes</div>
                  <div className="aii-rec-desc">Students are most active between 7PM - 10PM. Schedule accordingly.</div>
                  <div className="aii-rec-action">Schedule Now →</div>
                </div>
              </div>

              <div className="aii-rec-item">
                <div className="aii-rec-icon" style={{background:'#ffedd5', color:'#f59e0b'}}><BookOpen size={20}/></div>
                <div className="aii-rec-text">
                  <div className="aii-rec-title">Create Advanced Content</div>
                  <div className="aii-rec-desc">High performers need advanced content to stay engaged.</div>
                  <div className="aii-rec-action">Create Content →</div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
