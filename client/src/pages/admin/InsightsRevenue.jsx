import React from 'react';
import { Star, FileText, ArrowUpRight, TrendingUp } from 'lucide-react';
import './AdminAIInsights.css';

const RECENT_TRANSACTIONS = [
  { id: 1, name: 'Aaradhya Singh', item: 'Pharmacology Course', amt: '₹2,499', method: 'UPI', date: '26 May 2024' },
  { id: 2, name: 'Rohan Mehta', item: 'Nursing Bundle', amt: '₹3,999', method: 'Card', date: '26 May 2024' },
  { id: 3, name: 'Pooja Sharma', item: 'Subscription (Quarterly)', amt: '₹1,999', method: 'Net Banking', date: '26 May 2024' },
  { id: 4, name: 'Neha Verma', item: 'Test Series', amt: '₹899', method: 'UPI', date: '26 May 2024' },
  { id: 5, name: 'Vikram Patel', item: 'Community Health Course', amt: '₹2,299', method: 'Card', date: '25 May 2024' }
];

const REVENUE_COURSES = [
  { id: 1, name: 'Pharmacology', rev: '₹4.25L', pct: '22.6%', trend: '↑ 15.5%' },
  { id: 2, name: 'Medical Surgical Nursing', rev: '₹3.15L', pct: '16.8%', trend: '↑ 12.4%' },
  { id: 3, name: 'Anatomy & Physiology', rev: '₹2.45L', pct: '13.0%', trend: '↑ 10.7%' },
  { id: 4, name: 'Community Health Nursing', rev: '₹1.95L', pct: '10.4%', trend: '↑ 9.8%' },
  { id: 5, name: 'Nursing Fundamentals', rev: '₹1.45L', pct: '7.7%', trend: '↑ 8.3%' }
];

export default function InsightsRevenue() {
  return (
    <div>
      <div className="aii-grid-layout">
        
        {/* Main Column */}
        <div className="aii-grid-main">
          
          <div className="aii-grid-2" style={{marginBottom: 0}}>
            
            <div className="aii-card">
              <div className="aii-card-header">
                <div className="aii-card-title">Revenue Overview</div>
                <select className="aii-select" style={{padding:'4px 8px'}}><option>Last 7 Days</option></select>
              </div>
              
              <div className="aii-chart-wrap" style={{height:250}}>
                <div className="aii-chart-stat" style={{position:'absolute', top:0, left:0}}>
                  <div className="aii-cs-lbl">Total Revenue (Est.)</div>
                  <div className="aii-cs-val">₹18.75L <span style={{fontSize:11, color:'#10b981', fontWeight:600}}>↑ 13.7%</span></div>
                </div>
                
                <svg className="aii-chart-svg" viewBox="0 0 400 160" preserveAspectRatio="none" style={{marginTop: 60}}>
                  <linearGradient id="aii-grad-rev" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0"/>
                  </linearGradient>
                  
                  {/* Grid Lines */}
                  <line x1="0" y1="15" x2="400" y2="15" className="aii-cl-grid" />
                  <line x1="0" y1="65" x2="400" y2="65" className="aii-cl-grid" />
                  <line x1="0" y1="115" x2="400" y2="115" className="aii-cl-grid" />

                  {/* Y Axis Labels */}
                  <text x="0" y="20" className="aii-cl-axis">20L</text>
                  <text x="0" y="70" className="aii-cl-axis">15L</text>
                  <text x="0" y="120" className="aii-cl-axis">10L</text>
                  <text x="0" y="145" className="aii-cl-axis">5L</text>

                  {/* X Axis Labels */}
                  <text x="20" y="145" className="aii-cl-axis">20 May</text>
                  <text x="80" y="145" className="aii-cl-axis">21 May</text>
                  <text x="140" y="145" className="aii-cl-axis">22 May</text>
                  <text x="200" y="145" className="aii-cl-axis">23 May</text>
                  <text x="260" y="145" className="aii-cl-axis">24 May</text>
                  <text x="320" y="145" className="aii-cl-axis">25 May</text>
                  <text x="370" y="145" className="aii-cl-axis">26 May</text>

                  {/* Line and Area */}
                  <path className="aii-cl-area" fill="url(#aii-grad-rev)" d="M35 110 L95 105 L155 90 L215 95 L275 80 L335 70 L385 45 L385 130 L35 130 Z" />
                  <path className="aii-cl-line" d="M35 110 L95 105 L155 90 L215 95 L275 80 L335 70 L385 45" />
                  
                  {/* Dots */}
                  <circle cx="35" cy="110" r="4" className="aii-cl-dot"/>
                  <circle cx="95" cy="105" r="4" className="aii-cl-dot"/>
                  <circle cx="155" cy="90" r="4" className="aii-cl-dot"/>
                  <circle cx="215" cy="95" r="4" className="aii-cl-dot"/>
                  <circle cx="275" cy="80" r="4" className="aii-cl-dot"/>
                  <circle cx="335" cy="70" r="4" className="aii-cl-dot"/>
                  <circle cx="385" cy="45" r="4" className="aii-cl-dot"/>

                </svg>
                {/* Tooltip mockup */}
                <div className="aii-cl-tooltip" style={{top: 5, left: 330}}>
                  <div style={{fontSize:10, color:'#6b7280', marginBottom:2}}>26 May</div>
                  <div style={{fontSize:13, fontWeight:700, color:'#111827'}}>₹3.42L</div>
                  <div style={{fontSize:10, color:'#10b981', fontWeight:600}}>↑ 12.5%</div>
                </div>
              </div>
            </div>

            <div className="aii-card">
              <div className="aii-card-header">
                <div className="aii-card-title">Revenue by Source</div>
                <div className="aii-card-link">View Full Breakdown →</div>
              </div>
              <div style={{display:'flex', gap:24, alignItems:'center', height:200}}>
                <div style={{width: 140, height: 140, borderRadius:'50%', background:'conic-gradient(#4f46e5 66.4%, #10b981 0 86.9%, #f59e0b 0 96.5%, #3b82f6 0 99.5%, #ef4444 0)', position:'relative', display:'flex', justifyContent:'center', alignItems:'center'}}>
                   <div style={{width:100, height:100, background:'#fff', borderRadius:'50%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                     <span style={{fontSize:11, color:'#6b7280'}}>Total Revenue</span>
                     <span style={{fontSize:18, fontWeight:700}}>₹18.75L</span>
                   </div>
                </div>
                <div style={{display:'flex', flexDirection:'column', gap:12, flex:1}}>
                  <div style={{display:'flex', gap:8, alignItems:'flex-start'}}>
                    <div style={{width:8, height:8, borderRadius:4, background:'#4f46e5', marginTop:4}}></div>
                    <div style={{display:'flex', flexDirection:'column'}}>
                      <span style={{fontSize:12, fontWeight:600}}>Courses</span>
                      <span style={{fontSize:11, color:'#6b7280'}}>₹12.45L (66.4%)</span>
                    </div>
                  </div>
                  <div style={{display:'flex', gap:8, alignItems:'flex-start'}}>
                    <div style={{width:8, height:8, borderRadius:4, background:'#10b981', marginTop:4}}></div>
                    <div style={{display:'flex', flexDirection:'column'}}>
                      <span style={{fontSize:12, fontWeight:600}}>Subscriptions</span>
                      <span style={{fontSize:11, color:'#6b7280'}}>₹3.85L (20.5%)</span>
                    </div>
                  </div>
                  <div style={{display:'flex', gap:8, alignItems:'flex-start'}}>
                    <div style={{width:8, height:8, borderRadius:4, background:'#f59e0b', marginTop:4}}></div>
                    <div style={{display:'flex', flexDirection:'column'}}>
                      <span style={{fontSize:12, fontWeight:600}}>Test Series</span>
                      <span style={{fontSize:11, color:'#6b7280'}}>₹1.95L (10.4%)</span>
                    </div>
                  </div>
                  <div style={{display:'flex', gap:8, alignItems:'flex-start'}}>
                    <div style={{width:8, height:8, borderRadius:4, background:'#3b82f6', marginTop:4}}></div>
                    <div style={{display:'flex', flexDirection:'column'}}>
                      <span style={{fontSize:12, fontWeight:600}}>Live Classes</span>
                      <span style={{fontSize:11, color:'#6b7280'}}>₹0.85L (4.5%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="aii-grid-2" style={{marginBottom: 0}}>
            
            <div className="aii-card" style={{padding:'24px 0'}}>
              <div className="aii-card-header" style={{padding:'0 24px'}}>
                <div className="aii-card-title">Top Revenue Generating Courses</div>
                <div className="aii-card-link">View All Courses →</div>
              </div>
              <table className="aii-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Course Name</th>
                    <th>Revenue (Est.)</th>
                    <th>% Contribution</th>
                    <th>Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {REVENUE_COURSES.map((c, i) => (
                    <tr key={c.id}>
                      <td className="aii-t-num">{i+1}</td>
                      <td style={{fontWeight:500}}>
                         <div style={{display:'flex', alignItems:'center', gap:8}}>
                           <div style={{width:24, height:24, background:['#f3e8ff','#d1fae5','#ffedd5','#dbeafe','#fce7f3'][i], color:['#8b5cf6','#10b981','#f59e0b','#3b82f6','#ec4899'][i], borderRadius:4, display:'flex', justifyContent:'center', alignItems:'center'}}><BookOpen size={12}/></div>
                           {c.name}
                         </div>
                      </td>
                      <td style={{textAlign:'center', fontWeight:600}}>{c.rev}</td>
                      <td>
                        <div style={{display:'flex', alignItems:'center', gap:8}}>
                          <div style={{width:40, height:4, background:'#e5e7eb', borderRadius:2, overflow:'hidden'}}>
                            <div style={{width:c.pct, height:'100%', background:'#4f46e5'}}></div>
                          </div>
                          <span style={{fontSize:11}}>{c.pct}</span>
                        </div>
                      </td>
                      <td><span style={{color:'#10b981', fontSize:11, fontWeight:600}}>{c.trend}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="aii-card">
              <div className="aii-card-header">
                <div className="aii-card-title">Revenue Trend (Weekly)</div>
                <div className="aii-card-link">View Report →</div>
              </div>
              <div className="aii-chart-stat" style={{marginBottom: 16}}>
                <div className="aii-cs-val">₹18.75L <span style={{fontSize:11, color:'#10b981', fontWeight:600}}>↑ 13.7% vs last 7 days</span></div>
              </div>
              <div className="aii-bar-chart" style={{height: 200, alignItems:'flex-end'}}>
                <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between', height:'100%', fontSize:10, color:'#9ca3af', position:'absolute', left:0, paddingBottom:20}}>
                  <span>20L</span><span>15L</span><span>10L</span><span>5L</span><span>0</span>
                </div>
                {/* Mock Bar Chart */}
                <div className="aii-bc-group" style={{marginLeft:20}}>
                  <div style={{fontSize:10, fontWeight:600, color:'#111827', marginBottom:4}}>₹2.65L</div>
                  <div style={{width:24, height:'45%', background:'#4f46e5', borderRadius:'4px 4px 0 0'}}></div>
                  <div style={{fontSize:10, color:'#6b7280', marginTop:4}}>20 May</div>
                </div>
                <div className="aii-bc-group">
                  <div style={{fontSize:10, fontWeight:600, color:'#111827', marginBottom:4}}>₹2.72L</div>
                  <div style={{width:24, height:'48%', background:'#4f46e5', borderRadius:'4px 4px 0 0'}}></div>
                  <div style={{fontSize:10, color:'#6b7280', marginTop:4}}>21 May</div>
                </div>
                <div className="aii-bc-group">
                  <div style={{fontSize:10, fontWeight:600, color:'#111827', marginBottom:4}}>₹2.45L</div>
                  <div style={{width:24, height:'42%', background:'#4f46e5', borderRadius:'4px 4px 0 0'}}></div>
                  <div style={{fontSize:10, color:'#6b7280', marginTop:4}}>22 May</div>
                </div>
                <div className="aii-bc-group">
                  <div style={{fontSize:10, fontWeight:600, color:'#111827', marginBottom:4}}>₹2.98L</div>
                  <div style={{width:24, height:'55%', background:'#4f46e5', borderRadius:'4px 4px 0 0'}}></div>
                  <div style={{fontSize:10, color:'#6b7280', marginTop:4}}>23 May</div>
                </div>
                <div className="aii-bc-group">
                  <div style={{fontSize:10, fontWeight:600, color:'#111827', marginBottom:4}}>₹2.86L</div>
                  <div style={{width:24, height:'52%', background:'#4f46e5', borderRadius:'4px 4px 0 0'}}></div>
                  <div style={{fontSize:10, color:'#6b7280', marginTop:4}}>24 May</div>
                </div>
                <div className="aii-bc-group">
                  <div style={{fontSize:10, fontWeight:600, color:'#111827', marginBottom:4}}>₹3.67L</div>
                  <div style={{width:24, height:'70%', background:'#4f46e5', borderRadius:'4px 4px 0 0'}}></div>
                  <div style={{fontSize:10, color:'#6b7280', marginTop:4}}>25 May</div>
                </div>
                <div className="aii-bc-group">
                  <div style={{fontSize:10, fontWeight:600, color:'#111827', marginBottom:4}}>₹3.42L</div>
                  <div style={{width:24, height:'65%', background:'#8b5cf6', borderRadius:'4px 4px 0 0'}}></div>
                  <div style={{ fontSize: 10, marginTop: 4, fontWeight: 700, color: '#4f46e5' }}>26 May</div>
                </div>
              </div>
            </div>

          </div>

          <div className="aii-grid-2">
            
            <div className="aii-card" style={{padding:'24px 0'}}>
              <div className="aii-card-header" style={{padding:'0 24px'}}>
                <div className="aii-card-title">Recent Transactions</div>
                <div className="aii-card-link">View All →</div>
              </div>
              <table className="aii-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Item</th>
                    <th>Amount</th>
                    <th>Payment Method</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_TRANSACTIONS.map((s) => (
                    <tr key={s.id}>
                      <td>
                        <div style={{display:'flex', alignItems:'center', gap:8, fontWeight:500}}>
                          <img src={`https://ui-avatars.com/api/?name=${s.name}&background=random`} alt="u" style={{width:24, height:24, borderRadius:12}}/>
                          {s.name}
                        </div>
                      </td>
                      <td style={{color:'#6b7280'}}>{s.item}</td>
                      <td style={{fontWeight:600}}>{s.amt}</td>
                      <td style={{fontSize:11}}>{s.method}</td>
                      <td style={{color:'#6b7280', fontSize:11}}>{s.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="aii-card">
              <div className="aii-card-header">
                <div className="aii-card-title">Revenue Forecast</div>
                <div className="aii-card-link">View Forecast →</div>
              </div>
              <div style={{fontSize:12, color:'#6b7280', marginBottom:16}}>Based on current trends, your estimated revenue for next 4 weeks is:</div>
              <div style={{display:'flex', gap:24, alignItems:'baseline'}}>
                <div style={{fontSize:24, fontWeight:700}}>₹82.40L <span style={{fontSize:12, color:'#10b981'}}>↑ 14.2%</span></div>
              </div>
              <div style={{fontSize:11, color:'#6b7280', marginTop:8, marginBottom:24}}>Expected Range<br/><span style={{fontWeight:600, color:'#111827'}}>₹74.20L - ₹90.60L</span></div>
              
              <div style={{height: 120, position:'relative'}}>
                <svg width="100%" height="100%" viewBox="0 0 200 80" preserveAspectRatio="none">
                  {/* Forecast Line */}
                  <path d="M0 60 L50 45 L100 30 L150 20 L200 5" fill="none" stroke="#a78bfa" strokeWidth="2" strokeDasharray="4 4"/>
                  
                  {/* Forecast Range Area */}
                  <path d="M0 50 L50 35 L100 20 L150 10 L200 0 L200 10 L150 30 L100 40 L50 55 L0 70 Z" fill="#ede9fe" opacity="0.5"/>

                  <circle cx="0" cy="60" r="3" fill="#8b5cf6"/>
                  <circle cx="50" cy="45" r="3" fill="#8b5cf6"/>
                  <circle cx="100" cy="30" r="3" fill="#8b5cf6"/>
                  <circle cx="150" cy="20" r="3" fill="#8b5cf6"/>
                  <circle cx="200" cy="5" r="3" fill="#8b5cf6"/>
                </svg>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:10, color:'#9ca3af', marginTop:8}}>
                  <span>This Week</span><span>Next Week</span><span>Week 3</span><span>Week 4</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Sidebar Column */}
        <div>
          
          <div className="aii-card">
            <div className="aii-card-title" style={{marginBottom: 24}}>Top Revenue Insights</div>
            <div className="aii-insights-list">
              <div className="aii-ins-item">
                <div className="aii-ins-icon" style={{background:'#d1fae5', color:'#10b981'}}><Star size={16}/></div>
                <div className="aii-ins-text">
                  <div className="aii-ins-title">Highest Revenue Day</div>
                  <div className="aii-ins-desc">Saturday generated the highest revenue of ₹3.42L.</div>
                </div>
              </div>
              <div className="aii-ins-item">
                <div className="aii-ins-icon" style={{background:'#ffedd5', color:'#f59e0b'}}><TrendingUp size={16}/></div>
                <div className="aii-ins-text">
                  <div className="aii-ins-title">Top Revenue Course</div>
                  <div className="aii-ins-desc">"Pharmacology" contributed ₹4.25L (22.6%) of total revenue.</div>
                </div>
              </div>
              <div className="aii-ins-item">
                <div className="aii-ins-icon" style={{background:'#f3e8ff', color:'#8b5cf6'}}><FileText size={16}/></div>
                <div className="aii-ins-text">
                  <div className="aii-ins-title">Subscription Growth</div>
                  <div className="aii-ins-desc">Subscription revenue increased by 11.2% compared to last week.</div>
                </div>
              </div>
              <div className="aii-ins-item">
                <div className="aii-ins-icon" style={{background:'#dbeafe', color:'#3b82f6'}}><ArrowUpRight size={16}/></div>
                <div className="aii-ins-text">
                  <div className="aii-ins-title">Upsell Opportunity</div>
                  <div className="aii-ins-desc">Bundles have 18% higher conversion and revenue per order.</div>
                </div>
              </div>
            </div>
            <div className="aii-card-link" style={{marginTop: 24}}>View All Insights →</div>
          </div>

          <div className="aii-card">
            <div className="aii-card-header">
              <div className="aii-card-title">Revenue by Payment Method</div>
              <div className="aii-card-link">View Details →</div>
            </div>
            
            <div style={{display:'flex', gap:16, alignItems:'center', height:160}}>
              <div style={{width: 120, height: 120, borderRadius:'50%', background:'conic-gradient(#4f46e5 44%, #10b981 0 76.5%, #f59e0b 0 90.6%, #3b82f6 0 95.1%, #ef4444 0)', position:'relative', display:'flex', justifyContent:'center', alignItems:'center'}}>
                 <div style={{width:80, height:80, background:'#fff', borderRadius:'50%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                   <span style={{fontSize:10, color:'#6b7280'}}>Total</span>
                   <span style={{fontSize:14, fontWeight:700}}>₹18.75L</span>
                 </div>
              </div>
              <div style={{display:'flex', flexDirection:'column', gap:8, flex:1}}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:11}}>
                  <span style={{display:'flex', alignItems:'center', gap:6}}><div style={{width:6, height:6, borderRadius:3, background:'#4f46e5'}}></div> UPI / Wallets</span>
                  <span style={{color:'#6b7280'}}>₹8.25L (44.0%)</span>
                </div>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:11}}>
                  <span style={{display:'flex', alignItems:'center', gap:6}}><div style={{width:6, height:6, borderRadius:3, background:'#10b981'}}></div> Credit / Debit Cards</span>
                  <span style={{color:'#6b7280'}}>₹6.10L (32.5%)</span>
                </div>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:11}}>
                  <span style={{display:'flex', alignItems:'center', gap:6}}><div style={{width:6, height:6, borderRadius:3, background:'#f59e0b'}}></div> Net Banking</span>
                  <span style={{color:'#6b7280'}}>₹2.65L (14.1%)</span>
                </div>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:11}}>
                  <span style={{display:'flex', alignItems:'center', gap:6}}><div style={{width:6, height:6, borderRadius:3, background:'#3b82f6'}}></div> Other</span>
                  <span style={{color:'#6b7280'}}>₹0.85L (4.5%)</span>
                </div>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:11}}>
                  <span style={{display:'flex', alignItems:'center', gap:6}}><div style={{width:6, height:6, borderRadius:3, background:'#ef4444'}}></div> EMI</span>
                  <span style={{color:'#6b7280'}}>₹0.90L (4.9%)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="aii-card">
            <div className="aii-card-header">
              <div className="aii-card-title">Revenue by Plan Type</div>
              <div className="aii-card-link">View Details →</div>
            </div>
            
            <div style={{display:'flex', flexDirection:'column', gap:20}}>
              <div>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:12, marginBottom:8}}>
                  <span style={{fontWeight:500}}>Single Course Purchase</span>
                  <span style={{fontWeight:600}}>₹9.85L <span style={{color:'#6b7280'}}>(52.5%)</span></span>
                </div>
                <div style={{width:'100%', height:6, background:'#e5e7eb', borderRadius:3}}>
                  <div style={{width:'52.5%', height:'100%', background:'#4f46e5', borderRadius:3}}></div>
                </div>
              </div>
              <div>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:12, marginBottom:8}}>
                  <span style={{fontWeight:500}}>Subscription Plans</span>
                  <span style={{fontWeight:600}}>₹5.70L <span style={{color:'#6b7280'}}>(30.4%)</span></span>
                </div>
                <div style={{width:'100%', height:6, background:'#e5e7eb', borderRadius:3}}>
                  <div style={{width:'30.4%', height:'100%', background:'#10b981', borderRadius:3}}></div>
                </div>
              </div>
              <div>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:12, marginBottom:8}}>
                  <span style={{fontWeight:500}}>Test Series</span>
                  <span style={{fontWeight:600}}>₹2.60L <span style={{color:'#6b7280'}}>(13.9%)</span></span>
                </div>
                <div style={{width:'100%', height:6, background:'#e5e7eb', borderRadius:3}}>
                  <div style={{width:'13.9%', height:'100%', background:'#f59e0b', borderRadius:3}}></div>
                </div>
              </div>
              <div>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:12, marginBottom:8}}>
                  <span style={{fontWeight:500}}>Bundle Offers</span>
                  <span style={{fontWeight:600}}>₹0.60L <span style={{color:'#6b7280'}}>(3.2%)</span></span>
                </div>
                <div style={{width:'100%', height:6, background:'#e5e7eb', borderRadius:3}}>
                  <div style={{width:'3.2%', height:'100%', background:'#3b82f6', borderRadius:3}}></div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
