import React from 'react';
import { FileText, CheckCircle, Target, TrendingUp, AlertCircle, Clock, BookOpen, Star, AlertTriangle, Lightbulb } from 'lucide-react';
import './AdminAIInsights.css';

const TOP_TESTS = [
  { id: 1, name: 'Pharmacology Mock Test 12', type: 'Mock Test', attempts: '1,245', score: '84.7%', pass: '78.5%', trend: '↑ 12.4%', typeCol: '#8b5cf6', typeBg: '#f3e8ff' },
  { id: 2, name: 'Medical Surgical FLT 05', type: 'Full Length', attempts: '856', score: '72.3%', pass: '65.8%', trend: '↑ 8.2%', typeCol: '#f59e0b', typeBg: '#ffedd5' },
  { id: 3, name: 'Anatomy Chapter Test 04', type: 'Chapter Test', attempts: '1,102', score: '71.6%', pass: '62.4%', trend: '↑ 6.7%', typeCol: '#10b981', typeBg: '#d1fae5' },
  { id: 4, name: 'Community Health Mock 07', type: 'Mock Test', attempts: '942', score: '68.9%', pass: '61.2%', trend: '↑ 3.1%', typeCol: '#8b5cf6', typeBg: '#f3e8ff' },
  { id: 5, name: 'Nursing Fundamentals Test 09', type: 'Topic Test', attempts: '1,356', score: '66.2%', pass: '59.7%', trend: '↓ 1.3%', trendCol: '#ef4444', typeCol: '#3b82f6', typeBg: '#dbeafe' }
];

export default function InsightsTests() {
  return (
    <div>
      {/* Tab-specific Metrics (as seen in the screenshot, overriding/supplementing global ones) */}
      <div className="aii-metrics" style={{gridTemplateColumns: 'repeat(6, 1fr)'}}>
        <div className="aii-metric-card" style={{padding: '16px'}}>
          <div className="aii-mc-icon" style={{width:36, height:36, color:'#8b5cf6', background:'#f3e8ff'}}><FileText size={18} /></div>
          <div className="aii-mc-body">
            <div className="aii-mc-label" style={{fontSize:11}}>Total Tests Conducted</div>
            <div className="aii-mc-val" style={{fontSize:18}}>18,732</div>
            <div className="aii-mc-trend" style={{color:'#10b981'}}>↑ 14.2% vs last 7 days</div>
          </div>
        </div>
        <div className="aii-metric-card" style={{padding: '16px'}}>
          <div className="aii-mc-icon" style={{width:36, height:36, color:'#10b981', background:'#d1fae5'}}><CheckCircle size={18} /></div>
          <div className="aii-mc-body">
            <div className="aii-mc-label" style={{fontSize:11}}>Tests Attempted</div>
            <div className="aii-mc-val" style={{fontSize:18}}>12,548</div>
            <div className="aii-mc-trend" style={{color:'#10b981'}}>↑ 12.8% vs last 7 days</div>
          </div>
        </div>
        <div className="aii-metric-card" style={{padding: '16px'}}>
          <div className="aii-mc-icon" style={{width:36, height:36, color:'#3b82f6', background:'#dbeafe'}}><TrendingUp size={18} /></div>
          <div className="aii-mc-body">
            <div className="aii-mc-label" style={{fontSize:11}}>Average Score</div>
            <div className="aii-mc-val" style={{fontSize:18}}>68.4%</div>
            <div className="aii-mc-trend" style={{color:'#10b981'}}>↑ 6.7% vs last 7 days</div>
          </div>
        </div>
        <div className="aii-metric-card" style={{padding: '16px'}}>
          <div className="aii-mc-icon" style={{width:36, height:36, color:'#f59e0b', background:'#ffedd5'}}><Target size={18} /></div>
          <div className="aii-mc-body">
            <div className="aii-mc-label" style={{fontSize:11}}>Average Accuracy</div>
            <div className="aii-mc-val" style={{fontSize:18}}>72.6%</div>
            <div className="aii-mc-trend" style={{color:'#10b981'}}>↑ 5.3% vs last 7 days</div>
          </div>
        </div>
        <div className="aii-metric-card" style={{padding: '16px'}}>
          <div className="aii-mc-icon" style={{width:36, height:36, color:'#ec4899', background:'#fce7f3'}}><TrendingUp size={18} /></div>
          <div className="aii-mc-body">
            <div className="aii-mc-label" style={{fontSize:11}}>Pass Percentage</div>
            <div className="aii-mc-val" style={{fontSize:18}}>61.3%</div>
            <div className="aii-mc-trend" style={{color:'#10b981'}}>↑ 8.9% vs last 7 days</div>
          </div>
        </div>
        <div className="aii-metric-card" style={{padding: '16px'}}>
          <div className="aii-mc-icon" style={{width:36, height:36, color:'#8b5cf6', background:'#f3e8ff'}}><TrendingUp size={18} /></div>
          <div className="aii-mc-body">
            <div className="aii-mc-label" style={{fontSize:11}}>Revenue (Est.)</div>
            <div className="aii-mc-val" style={{fontSize:18}}>₹7.85L</div>
            <div className="aii-mc-trend" style={{color:'#10b981'}}>↑ 13.1% vs last 7 days</div>
          </div>
        </div>
      </div>

      <div className="aii-grid-layout" style={{gridTemplateColumns: '1fr 300px', alignItems: 'stretch'}}>
        
        {/* Main Column */}
        <div className="aii-grid-main">
          
          <div className="aii-grid-2" style={{marginBottom: 0}}>
            
            <div className="aii-card">
              <div className="aii-card-header">
                <div className="aii-card-title">Test Performance Overview</div>
                <select className="aii-select" style={{padding:'4px 8px'}}><option>Last 7 Days</option></select>
              </div>
              
              <div style={{display:'flex', gap:24, alignItems:'center', height:200}}>
                <div style={{width: 140, height: 140, borderRadius:'50%', background:'conic-gradient(#4f46e5 51.4%, #10b981 0 76.3%, #f59e0b 0 93.5%, #ef4444 0)', position:'relative', display:'flex', justifyContent:'center', alignItems:'center'}}>
                   <div style={{width:100, height:100, background:'#fff', borderRadius:'50%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                     <span style={{fontSize:11, color:'#6b7280'}}>Total Tests<br/>Attempted</span>
                     <span style={{fontSize:18, fontWeight:700}}>12,548</span>
                   </div>
                </div>
                <div style={{display:'flex', flexDirection:'column', gap:16, flex:1}}>
                  <div style={{display:'flex', gap:8, alignItems:'flex-start'}}>
                    <div style={{width:8, height:8, borderRadius:4, background:'#4f46e5', marginTop:4}}></div>
                    <div style={{display:'flex', flexDirection:'column'}}>
                      <span style={{fontSize:12, fontWeight:600}}>Mock Tests</span>
                      <span style={{fontSize:11, color:'#6b7280'}}>6,452 (51.4%)</span>
                    </div>
                  </div>
                  <div style={{display:'flex', gap:8, alignItems:'flex-start'}}>
                    <div style={{width:8, height:8, borderRadius:4, background:'#10b981', marginTop:4}}></div>
                    <div style={{display:'flex', flexDirection:'column'}}>
                      <span style={{fontSize:12, fontWeight:600}}>Chapter Tests</span>
                      <span style={{fontSize:11, color:'#6b7280'}}>3,125 (24.9%)</span>
                    </div>
                  </div>
                  <div style={{display:'flex', gap:8, alignItems:'flex-start'}}>
                    <div style={{width:8, height:8, borderRadius:4, background:'#f59e0b', marginTop:4}}></div>
                    <div style={{display:'flex', flexDirection:'column'}}>
                      <span style={{fontSize:12, fontWeight:600}}>Topic Tests</span>
                      <span style={{fontSize:11, color:'#6b7280'}}>2,156 (17.2%)</span>
                    </div>
                  </div>
                  <div style={{display:'flex', gap:8, alignItems:'flex-start'}}>
                    <div style={{width:8, height:8, borderRadius:4, background:'#ef4444', marginTop:4}}></div>
                    <div style={{display:'flex', flexDirection:'column'}}>
                      <span style={{fontSize:12, fontWeight:600}}>Full Length Tests</span>
                      <span style={{fontSize:11, color:'#6b7280'}}>815 (6.5%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="aii-card">
              <div className="aii-card-header">
                <div className="aii-card-title">Tests Attempted Over Time</div>
                <div className="aii-card-link">View Analytics →</div>
              </div>
              
              <div className="aii-chart-wrap" style={{height: 180}}>
                <svg className="aii-chart-svg" viewBox="0 0 400 120" preserveAspectRatio="none">
                  <linearGradient id="aii-grad-tests" x1="0" x2="0" y1="0" y2="1">
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
                  <path className="aii-cl-area" fill="url(#aii-grad-tests)" d="M35 70 L95 65 L155 55 L215 45 L275 35 L335 25 L385 15 L385 100 L35 100 Z" />
                  <path className="aii-cl-line" d="M35 70 L95 65 L155 55 L215 45 L275 35 L335 25 L385 15" />
                  
                  {/* Dots */}
                  <circle cx="35" cy="70" r="4" className="aii-cl-dot"/>
                  <circle cx="95" cy="65" r="4" className="aii-cl-dot"/>
                  <circle cx="155" cy="55" r="4" className="aii-cl-dot"/>
                  <circle cx="215" cy="45" r="4" className="aii-cl-dot"/>
                  <circle cx="275" cy="35" r="4" className="aii-cl-dot"/>
                  <circle cx="335" cy="25" r="4" className="aii-cl-dot"/>
                  <circle cx="385" cy="15" r="4" className="aii-cl-dot"/>
                </svg>
              </div>

              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:8, borderTop:'1px solid #e5e7eb', paddingTop:16, marginTop:8}}>
                <div>
                  <div style={{fontSize:10, color:'#6b7280'}}>Highest</div>
                  <div style={{fontSize:11, fontWeight:600}}>26 May</div>
                  <div style={{fontSize:11, color:'#10b981', fontWeight:600}}>3,339 Tests</div>
                </div>
                <div>
                  <div style={{fontSize:10, color:'#6b7280'}}>Lowest</div>
                  <div style={{fontSize:11, fontWeight:600}}>20 May</div>
                  <div style={{fontSize:11, color:'#ef4444', fontWeight:600}}>1,980 Tests</div>
                </div>
                <div>
                  <div style={{fontSize:10, color:'#6b7280'}}>Growth</div>
                  <div style={{fontSize:11, color:'#10b981', fontWeight:600}}>↑ 68.6%</div>
                  <div style={{fontSize:10, color:'#6b7280'}}>vs 20 May</div>
                </div>
                <div>
                  <div style={{fontSize:10, color:'#6b7280'}}>Daily Avg.</div>
                  <div style={{fontSize:11, fontWeight:600}}>2,678</div>
                  <div style={{fontSize:10, color:'#6b7280'}}>Tests</div>
                </div>
              </div>
            </div>

          </div>

          <div className="aii-grid-2" style={{marginBottom: 0}}>
            
            <div className="aii-card" style={{padding:'24px 0'}}>
              <div className="aii-card-header" style={{padding:'0 24px'}}>
                <div className="aii-card-title">Top Performing Tests</div>
                <div className="aii-card-link">View All Tests →</div>
              </div>
              <table className="aii-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Test Name</th>
                    <th>Type</th>
                    <th>Attempts</th>
                    <th>Avg. Score</th>
                    <th>Pass %</th>
                    <th>Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {TOP_TESTS.map((t, i) => (
                    <tr key={t.id}>
                      <td className="aii-t-num">{i+1}</td>
                      <td style={{fontWeight:500}}>{t.name}</td>
                      <td>
                        <span style={{background:t.typeBg, color:t.typeCol, padding:'2px 8px', borderRadius:12, fontSize:10, fontWeight:600, display:'inline-flex', alignItems:'center', gap:4}}>
                          <FileText size={10}/> {t.type}
                        </span>
                      </td>
                      <td style={{fontWeight:600}}>{t.attempts}</td>
                      <td>{t.score}</td>
                      <td>{t.pass}</td>
                      <td><span style={{color:t.trendCol || '#10b981', fontSize:11, fontWeight:600}}>{t.trend}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="aii-card">
              <div className="aii-card-header">
                <div className="aii-card-title">Score Distribution</div>
                <div className="aii-card-link">View Details →</div>
              </div>
              <div style={{display:'flex', gap:24, alignItems:'center', height:200}}>
                <div style={{width: 140, height: 140, borderRadius:'50%', background:'conic-gradient(#10b981 22.9%, #3b82f6 0 57.6%, #f59e0b 0 83.5%, #ef4444 0)', position:'relative', display:'flex', justifyContent:'center', alignItems:'center'}}>
                   <div style={{width:100, height:100, background:'#fff', borderRadius:'50%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                     <span style={{fontSize:18, fontWeight:700}}>12,548</span>
                     <span style={{fontSize:10, color:'#6b7280'}}>Total Attempts</span>
                   </div>
                </div>
                <div style={{display:'flex', flexDirection:'column', gap:16, flex:1}}>
                  <div style={{display:'flex', justifyContent:'space-between', fontSize:11}}>
                    <span style={{display:'flex', alignItems:'center', gap:6}}><div style={{width:8, height:8, borderRadius:4, background:'#10b981'}}></div> 80% and above</span>
                    <span style={{color:'#6b7280'}}>2,876 (22.9%)</span>
                  </div>
                  <div style={{display:'flex', justifyContent:'space-between', fontSize:11}}>
                    <span style={{display:'flex', alignItems:'center', gap:6}}><div style={{width:8, height:8, borderRadius:4, background:'#3b82f6'}}></div> 60% - 79%</span>
                    <span style={{color:'#6b7280'}}>4,352 (34.7%)</span>
                  </div>
                  <div style={{display:'flex', justifyContent:'space-between', fontSize:11}}>
                    <span style={{display:'flex', alignItems:'center', gap:6}}><div style={{width:8, height:8, borderRadius:4, background:'#f59e0b'}}></div> 40% - 59%</span>
                    <span style={{color:'#6b7280'}}>3,248 (25.9%)</span>
                  </div>
                  <div style={{display:'flex', justifyContent:'space-between', fontSize:11}}>
                    <span style={{display:'flex', alignItems:'center', gap:6}}><div style={{width:8, height:8, borderRadius:4, background:'#ef4444'}}></div> Below 40%</span>
                    <span style={{color:'#6b7280'}}>2,072 (16.5%)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Sidebar Column */}
        <div style={{display:'flex', flexDirection:'column', gap:24}}>
          
          <div className="aii-card">
            <div className="aii-card-title" style={{marginBottom: 24}}>Top Test Insights</div>
            <div className="aii-insights-list">
              <div className="aii-ins-item">
                <div className="aii-ins-icon" style={{background:'#d1fae5', color:'#10b981'}}><Star size={16}/></div>
                <div className="aii-ins-text">
                  <div className="aii-ins-title">Most Popular Test Type</div>
                  <div className="aii-ins-desc">Mock Tests are the most attempted type with 51.4% of total attempts.</div>
                </div>
              </div>
              <div className="aii-ins-item">
                <div className="aii-ins-icon" style={{background:'#ffedd5', color:'#f59e0b'}}><TrendingUp size={16}/></div>
                <div className="aii-ins-text">
                  <div className="aii-ins-title">High Scoring Test</div>
                  <div className="aii-ins-desc">"Pharmacology Mock Test 12" has the highest average score of 84.7%.</div>
                </div>
              </div>
              <div className="aii-ins-item">
                <div className="aii-ins-icon" style={{background:'#dbeafe', color:'#3b82f6'}}><AlertCircle size={16}/></div>
                <div className="aii-ins-text">
                  <div className="aii-ins-title">Drop in Accuracy</div>
                  <div className="aii-ins-desc">Accuracy dropped by 3.2% in "Anatomy & Physiology" tests this week.</div>
                </div>
              </div>
              <div className="aii-ins-item">
                <div className="aii-ins-icon" style={{background:'#f3e8ff', color:'#8b5cf6'}}><BookOpen size={16}/></div>
                <div className="aii-ins-text">
                  <div className="aii-ins-title">Improvement Opportunity</div>
                  <div className="aii-ins-desc">Students take 22% more time in "Full Length Tests" compared to last week.</div>
                </div>
              </div>
            </div>
            <div className="aii-card-link" style={{marginTop: 24}}>View All Insights →</div>
          </div>

          <div className="aii-card">
            <div className="aii-card-header">
              <div className="aii-card-title">Need Attention</div>
              <div className="aii-card-link">View All →</div>
            </div>
            <div className="aii-rec-list">
              <div className="aii-rec-item" style={{background:'#fff', borderColor:'#fecaca', padding:12}}>
                <div className="aii-rec-icon" style={{background:'#fee2e2', color:'#ef4444', width:32, height:32}}><AlertTriangle size={14}/></div>
                <div className="aii-rec-text" style={{flex:1}}>
                  <div className="aii-rec-title" style={{fontSize:12}}>Anatomy & Physiology Tests</div>
                  <div className="aii-rec-desc" style={{fontSize:10, marginBottom:0}}>Drop in average score by 6.2%</div>
                </div>
                <span style={{background:'#fee2e2', color:'#ef4444', padding:'2px 8px', borderRadius:12, fontSize:10, fontWeight:700}}>-6.2%</span>
              </div>
              
              <div className="aii-rec-item" style={{background:'#fff', borderColor:'#fecaca', padding:12}}>
                <div className="aii-rec-icon" style={{background:'#fee2e2', color:'#ef4444', width:32, height:32}}><Clock size={14}/></div>
                <div className="aii-rec-text" style={{flex:1}}>
                  <div className="aii-rec-title" style={{fontSize:12}}>Chapter Tests (Overall)</div>
                  <div className="aii-rec-desc" style={{fontSize:10, marginBottom:0}}>Lower pass percentage compared to last week</div>
                </div>
                <span style={{background:'#fee2e2', color:'#ef4444', padding:'2px 8px', borderRadius:12, fontSize:10, fontWeight:700}}>-4.7%</span>
              </div>

              <div className="aii-rec-item" style={{background:'#fff', borderColor:'#fecaca', padding:12}}>
                <div className="aii-rec-icon" style={{background:'#fee2e2', color:'#ef4444', width:32, height:32}}><FileText size={14}/></div>
                <div className="aii-rec-text" style={{flex:1}}>
                  <div className="aii-rec-title" style={{fontSize:12}}>Full Length Tests</div>
                  <div className="aii-rec-desc" style={{fontSize:10, marginBottom:0}}>Accuracy dropped by 3.9%</div>
                </div>
                <span style={{background:'#fee2e2', color:'#ef4444', padding:'2px 8px', borderRadius:12, fontSize:10, fontWeight:700}}>-3.9%</span>
              </div>

              <div className="aii-rec-item" style={{background:'#fff', borderColor:'#fef3c7', padding:12}}>
                <div className="aii-rec-icon" style={{background:'#ffedd5', color:'#f59e0b', width:32, height:32}}><BookOpen size={14}/></div>
                <div className="aii-rec-text" style={{flex:1}}>
                  <div className="aii-rec-title" style={{fontSize:12}}>Community Health Tests</div>
                  <div className="aii-rec-desc" style={{fontSize:10, marginBottom:0}}>Time taken increased by 18%</div>
                </div>
                <span style={{background:'#ffedd5', color:'#f59e0b', padding:'2px 8px', borderRadius:12, fontSize:10, fontWeight:700}}>+18%</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Row - Test Type Analytics */}
      <div style={{marginTop: 24, marginBottom: 16}}>
        <div className="aii-card-title" style={{marginBottom: 16}}>Test Type Analytics</div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr 300px', gap:16}}>
          
          <div className="aii-card" style={{padding: 16}}>
             <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:16}}>
               <div style={{width:32, height:32, background:'#f3e8ff', color:'#8b5cf6', borderRadius:8, display:'flex', justifyContent:'center', alignItems:'center'}}><FileText size={16}/></div>
               <div style={{fontSize:13, fontWeight:700}}>Mock Tests</div>
             </div>
             <div style={{display:'flex', justifyContent:'space-between'}}>
               <div>
                 <div style={{fontSize:10, color:'#6b7280'}}>Attempts</div>
                 <div style={{fontSize:14, fontWeight:700}}>6,452</div>
                 <div style={{fontSize:10, color:'#10b981'}}>↑ 14.8%</div>
               </div>
               <div>
                 <div style={{fontSize:10, color:'#6b7280'}}>Avg. Score</div>
                 <div style={{fontSize:14, fontWeight:700}}>71.4%</div>
                 <div style={{fontSize:10, color:'#10b981'}}>↑ 7.2%</div>
               </div>
               <div>
                 <div style={{fontSize:10, color:'#6b7280'}}>Pass %</div>
                 <div style={{fontSize:14, fontWeight:700}}>63.4%</div>
                 <div style={{fontSize:10, color:'#10b981'}}>↑ 9.1%</div>
               </div>
             </div>
          </div>

          <div className="aii-card" style={{padding: 16}}>
             <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:16}}>
               <div style={{width:32, height:32, background:'#d1fae5', color:'#10b981', borderRadius:8, display:'flex', justifyContent:'center', alignItems:'center'}}><BookOpen size={16}/></div>
               <div style={{fontSize:13, fontWeight:700}}>Chapter Tests</div>
             </div>
             <div style={{display:'flex', justifyContent:'space-between'}}>
               <div>
                 <div style={{fontSize:10, color:'#6b7280'}}>Attempts</div>
                 <div style={{fontSize:14, fontWeight:700}}>3,125</div>
                 <div style={{fontSize:10, color:'#10b981'}}>↑ 10.3%</div>
               </div>
               <div>
                 <div style={{fontSize:10, color:'#6b7280'}}>Avg. Score</div>
                 <div style={{fontSize:14, fontWeight:700}}>66.1%</div>
                 <div style={{fontSize:10, color:'#10b981'}}>↑ 4.5%</div>
               </div>
               <div>
                 <div style={{fontSize:10, color:'#6b7280'}}>Pass %</div>
                 <div style={{fontSize:14, fontWeight:700}}>56.8%</div>
                 <div style={{fontSize:10, color:'#10b981'}}>↑ 6.2%</div>
               </div>
             </div>
          </div>

          <div className="aii-card" style={{padding: 16}}>
             <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:16}}>
               <div style={{width:32, height:32, background:'#dbeafe', color:'#3b82f6', borderRadius:8, display:'flex', justifyContent:'center', alignItems:'center'}}><Target size={16}/></div>
               <div style={{fontSize:13, fontWeight:700}}>Topic Tests</div>
             </div>
             <div style={{display:'flex', justifyContent:'space-between'}}>
               <div>
                 <div style={{fontSize:10, color:'#6b7280'}}>Attempts</div>
                 <div style={{fontSize:14, fontWeight:700}}>2,156</div>
                 <div style={{fontSize:10, color:'#10b981'}}>↑ 9.6%</div>
               </div>
               <div>
                 <div style={{fontSize:10, color:'#6b7280'}}>Avg. Score</div>
                 <div style={{fontSize:14, fontWeight:700}}>63.7%</div>
                 <div style={{fontSize:10, color:'#10b981'}}>↑ 3.8%</div>
               </div>
               <div>
                 <div style={{fontSize:10, color:'#6b7280'}}>Pass %</div>
                 <div style={{fontSize:14, fontWeight:700}}>54.3%</div>
                 <div style={{fontSize:10, color:'#10b981'}}>↑ 5.5%</div>
               </div>
             </div>
          </div>

          <div className="aii-card" style={{padding: 16}}>
             <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:16}}>
               <div style={{width:32, height:32, background:'#ffedd5', color:'#f59e0b', borderRadius:8, display:'flex', justifyContent:'center', alignItems:'center'}}><FileText size={16}/></div>
               <div style={{fontSize:13, fontWeight:700}}>Full Length Tests</div>
             </div>
             <div style={{display:'flex', justifyContent:'space-between'}}>
               <div>
                 <div style={{fontSize:10, color:'#6b7280'}}>Attempts</div>
                 <div style={{fontSize:14, fontWeight:700}}>815</div>
                 <div style={{fontSize:10, color:'#10b981'}}>↑ 7.4%</div>
               </div>
               <div>
                 <div style={{fontSize:10, color:'#6b7280'}}>Avg. Score</div>
                 <div style={{fontSize:14, fontWeight:700}}>68.9%</div>
                 <div style={{fontSize:10, color:'#10b981'}}>↑ 5.9%</div>
               </div>
               <div>
                 <div style={{fontSize:10, color:'#6b7280'}}>Pass %</div>
                 <div style={{fontSize:14, fontWeight:700}}>60.2%</div>
                 <div style={{fontSize:10, color:'#10b981'}}>↑ 6.3%</div>
               </div>
             </div>
          </div>

          <div className="aii-card" style={{background:'#f5f3ff', borderColor:'#ede9fe', padding: 16, display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
            <div>
              <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:8, color:'#7c3aed'}}>
                <Lightbulb size={16} fill="#7c3aed"/>
                <span style={{fontSize:13, fontWeight:700}}>AI Recommendation</span>
              </div>
              <div style={{fontSize:11, color:'#4c1d95', lineHeight:1.5}}>Focus on Anatomy & Physiology and Chapter Tests to improve overall performance and pass percentage.</div>
            </div>
            <div className="aii-card-link" style={{fontSize:11}}>View Recommendations →</div>
          </div>

        </div>
      </div>
    </div>
  );
}
