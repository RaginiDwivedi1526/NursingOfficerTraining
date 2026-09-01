import React from 'react';
import { 
  Line, Doughnut 
} from 'react-chartjs-2';
import { 
  Users, PlayCircle, Eye, Clock, Activity, ChevronRight, CheckCircle, Smartphone, Info
} from 'lucide-react';

export default function ReportUsage() {
  const lineData = {
    labels: ['20 May', '21 May', '22 May', '23 May', '24 May', '25 May', '26 May'],
    datasets: [
      {
        label: 'Sessions',
        data: [2500, 2700, 2600, 2900, 2800, 3200, 3482],
        borderColor: '#7c3aed',
        backgroundColor: '#7c3aed',
        tension: 0.4,
        pointRadius: 4,
        borderWidth: 2
      },
      {
        label: 'Users',
        data: [900, 1050, 1000, 1150, 1100, 1200, 1257],
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f6',
        tension: 0.4,
        pointRadius: 4,
        borderWidth: 2
      }
    ]
  };

  const lineOpts = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { position: 'top', align: 'end', labels: { usePointStyle: true, boxWidth: 6, font: {size: 11} } } },
    scales: {
      y: { display: true, min: 0, max: 4000, ticks: { stepSize: 1000, callback: v => v >= 1000 ? v/1000 + 'K' : v, color: '#9ca3af', font: { size: 11 } }, grid: { color: '#f3f4f6' } },
      x: { grid: { display: false }, ticks: { color: '#9ca3af', font: { size: 11 } } }
    }
  };

  const userTypeData = {
    labels: ['Students', 'Instructors', 'Admins', 'Other Staff'],
    datasets: [{ data: [70.9, 14.5, 3.4, 11.2], backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#7c3aed'], borderWidth: 0, hoverOffset: 4 }]
  };
  const deviceData = {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    datasets: [{ data: [50.3, 40.8, 8.9], backgroundColor: ['#7c3aed', '#10b981', '#f59e0b'], borderWidth: 0, hoverOffset: 4 }]
  };
  const donutOpts = { responsive: true, maintainAspectRatio: false, cutout: '75%', plugins: { legend: { display: false } } };

  return (
    <div style={{ display: 'grid', gap: '20px' }}>
      
      {/* TOP METRICS */}
      <div className="reports-metrics-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
        <div className="reports-metric-card">
          <div className="reports-metric-icon" style={{ background: '#f3e8ff', color: '#7c3aed' }}><Users size={22} /></div>
          <div className="reports-metric-info">
            <span className="reports-metric-label">Total Active Users</span>
            <span className="reports-metric-value">1,257</span>
            <span className="reports-metric-trend reports-trend-up">↑ 16.4% vs last 7 days</span>
          </div>
        </div>
        <div className="reports-metric-card">
          <div className="reports-metric-icon" style={{ background: '#d1fae5', color: '#10b981' }}><PlayCircle size={22} /></div>
          <div className="reports-metric-info">
            <span className="reports-metric-label">Sessions</span>
            <span className="reports-metric-value">3,482</span>
            <span className="reports-metric-trend reports-trend-up">↑ 18.7% vs last 7 days</span>
          </div>
        </div>
        <div className="reports-metric-card">
          <div className="reports-metric-icon" style={{ background: '#ffedd5', color: '#ea580c' }}><Eye size={22} /></div>
          <div className="reports-metric-info">
            <span className="reports-metric-label">Page Views</span>
            <span className="reports-metric-value">12,846</span>
            <span className="reports-metric-trend reports-trend-up">↑ 20.3% vs last 7 days</span>
          </div>
        </div>
        <div className="reports-metric-card">
          <div className="reports-metric-icon" style={{ background: '#eff6ff', color: '#3b82f6' }}><Clock size={22} /></div>
          <div className="reports-metric-info">
            <span className="reports-metric-label">Avg. Session Duration</span>
            <span className="reports-metric-value">12m 34s</span>
            <span className="reports-metric-trend reports-trend-up">↑ 8.6% vs last 7 days</span>
          </div>
        </div>
        <div className="reports-metric-card">
          <div className="reports-metric-icon" style={{ background: '#fee2e2', color: '#ef4444' }}><Activity size={22} /></div>
          <div className="reports-metric-info">
            <span className="reports-metric-label">Bounce Rate</span>
            <span className="reports-metric-value">24.6%</span>
            <span className="reports-metric-trend reports-trend-down">↓ 4.2% vs last 7 days</span>
          </div>
        </div>
      </div>

      {/* ROW 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '20px' }}>
        <div className="rc-card" style={{ display:'flex', flexDirection:'column' }}>
          <div className="rc-header"><div className="rc-title">Usage Over Time</div></div>
          <div style={{ height: '250px', width: '100%', marginTop: -20 }}>
            <Line data={lineData} options={lineOpts} />
          </div>
        </div>

        <div className="rc-card">
          <div className="rc-title" style={{marginBottom: 20}}>Users by Type</div>
          <div style={{ display: 'flex', flexDirection:'column', alignItems: 'center', gap: 20 }}>
            <div style={{ width: '140px', height: '140px', position:'relative' }}>
              <Doughnut data={userTypeData} options={donutOpts} />
              <div style={{ position:'absolute', top:0, left:0, right:0, bottom:0, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
                <div style={{ fontSize:22, fontWeight:700 }}>1,257</div>
                <div style={{ fontSize:10, color:'#6b7280' }}>Total</div>
              </div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:8, width:'100%' }}>
              {[
                { l:'Students', n:'892', p:'70.9%', c:'#10b981' },
                { l:'Instructors', n:'182', p:'14.5%', c:'#3b82f6' },
                { l:'Admins', n:'43', p:'3.4%', c:'#f59e0b' },
                { l:'Other Staff', n:'140', p:'11.2%', c:'#7c3aed' },
              ].map(d => (
                <div key={d.l} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:11 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <div style={{ width:8, height:8, borderRadius:'50%', background:d.c }} />
                    <div style={{ color:'#374151', fontWeight:500 }}>{d.l}</div>
                  </div>
                  <div style={{ color:'#6b7280' }}>{d.n} ({d.p})</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rc-card">
          <div className="rc-header"><div className="rc-title">Top Pages</div><div className="rc-view-all">View All</div></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, fontWeight:600, color:'#6b7280', borderBottom:'1px solid #f3f4f6', paddingBottom:8 }}>
              <span>Page</span><span>Page Views</span><span>% of Total</span>
            </div>
            {[
              { p:'Dashboard', v:'2,984', t:'23.2%' },
              { p:'Courses', v:'2,457', t:'19.1%' },
              { p:'Tests', v:'2,103', t:'16.4%' },
              { p:'AI Insights', v:'1,834', t:'14.3%' },
              { p:'Engagement', v:'1,268', t:'9.9%' },
              { p:'Reports', v:'1,102', t:'8.6%' },
              { p:'Others', v:'1,098', t:'8.5%' },
            ].map((r,i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:'#374151' }}>
                <span style={{ fontWeight:500 }}>{r.p}</span>
                <span style={{ width: 80, textAlign:'right' }}>{r.v}</span>
                <span style={{ width: 60, textAlign:'right', color:'#6b7280' }}>{r.t}</span>
              </div>
            ))}
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, fontWeight:700, color:'#111827', paddingTop:8, borderTop:'1px solid #f3f4f6' }}>
              <span>Total</span><span style={{ width: 80, textAlign:'right' }}>12,846</span><span style={{ width: 60, textAlign:'right' }}>100%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '20px' }}>
        
        {/* Feature Usage */}
        <div className="rc-card">
          <div className="rc-header"><div className="rc-title">Feature Usage</div><div className="rc-view-all">View All</div></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, fontWeight:600, color:'#6b7280', paddingBottom:8 }}>
              <span style={{flex:2}}>Feature</span><span style={{flex:1}}>Users</span><span style={{flex:1}}>Sessions</span><span style={{flex:1}}>% of Users</span><span style={{flex:2}}></span>
            </div>
            {[
              { f:'AI Insights', u:956, s:1842, p:76.1, i:'🤖', bg:'#f3e8ff', c:'#7c3aed' },
              { f:'Tests', u:845, s:1632, p:67.2, i:'📝', bg:'#eff6ff', c:'#3b82f6' },
              { f:'Courses', u:1123, s:1584, p:89.4, i:'📚', bg:'#d1fae5', c:'#10b981' },
              { f:'Engagement', u:674, s:1203, p:53.6, i:'🎯', bg:'#ffedd5', c:'#f59e0b' },
              { f:'Reports', u:543, s:862, p:43.2, i:'📄', bg:'#f3e8ff', c:'#7c3aed' },
              { f:'Announcements', u:432, s:612, p:34.4, i:'📢', bg:'#fee2e2', c:'#ef4444' },
              { f:'Messages', u:398, s:556, p:31.7, i:'💬', bg:'#d1fae5', c:'#10b981' },
            ].map((r,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', fontSize:13, color:'#374151' }}>
                <span style={{flex:2, display:'flex', gap:8, alignItems:'center', fontWeight:600}}>
                  <span style={{width:24,height:24,borderRadius:6,background:r.bg,display:'flex',justifyContent:'center',alignItems:'center',fontSize:12}}>{r.i}</span> {r.f}
                </span>
                <span style={{flex:1}}>{r.u}</span>
                <span style={{flex:1}}>{r.s}</span>
                <span style={{flex:1}}>{r.p}%</span>
                <span style={{flex:2}}>
                  <div style={{height:6, background:'#f3f4f6', borderRadius:3, width:'100%'}}>
                    <div style={{width:`${r.p}%`, height:'100%', background:r.c, borderRadius:3}}/>
                  </div>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="rc-card" style={{ display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
          <div>
            <div className="rc-header" style={{marginBottom:0}}><div className="rc-title">Device Breakdown</div></div>
            <div style={{ display: 'flex', flexDirection:'column', alignItems: 'center', gap: 30, marginTop: 20 }}>
              <div style={{ width: '180px', height: '180px', position:'relative' }}>
                <Doughnut data={deviceData} options={donutOpts} />
                <div style={{ position:'absolute', top:0, left:0, right:0, bottom:0, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
                  <div style={{ fontSize:28, fontWeight:700 }}>3,482</div>
                  <div style={{ fontSize:12, color:'#6b7280' }}>Sessions</div>
                </div>
              </div>
              <div style={{ display:'flex', gap:20, width:'100%', justifyContent:'center' }}>
                {[
                  { l:'Desktop', n:'1,752 (50.3%)', c:'#7c3aed' },
                  { l:'Mobile', n:'1,421 (40.8%)', c:'#10b981' },
                  { l:'Tablet', n:'309 (8.9%)', c:'#f59e0b' },
                ].map(d => (
                  <div key={d.l} style={{ display:'flex', flexDirection:'column', alignItems:'center', fontSize:11 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:4 }}>
                      <div style={{ width:8, height:8, borderRadius:'50%', background:d.c }} />
                      <div style={{ color:'#374151', fontWeight:500 }}>{d.l}</div>
                    </div>
                    <div style={{ color:'#6b7280' }}>{d.n}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="rc-view-all" style={{textAlign:'center', marginTop:20}}>View device report →</div>
        </div>

        {/* User Retention & Insights */}
        <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
          
          <div className="rc-card">
            <div className="rc-header" style={{marginBottom:16}}><div className="rc-title">User Retention</div><div className="rc-view-all">View Full Report</div></div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:12 }}>
              {[
                { d:'Day 1', p:'62.4%' }, { d:'Day 7', p:'34.8%' }, { d:'Day 30', p:'18.7%' }, { d:'Day 60', p:'12.3%' }
              ].map(r => (
                <div key={r.d} style={{ border:'1px solid #f3f4f6', borderRadius:8, padding:'12px 8px', textAlign:'center' }}>
                  <div style={{ fontSize:11, color:'#6b7280', fontWeight:600, marginBottom:4 }}>{r.d}</div>
                  <div style={{ fontSize:16, fontWeight:700, color:'#111827' }}>{r.p}</div>
                </div>
              ))}
            </div>
            <div style={{ background:'#eff6ff', borderRadius:8, padding:12, marginTop:16, display:'flex', gap:8, alignItems:'flex-start', fontSize:12, color:'#1e40af' }}>
              <Info size={16} style={{minWidth:16, marginTop:2}}/>
              <span><strong>18.7%</strong> of users returned to the platform within 30 days.</span>
            </div>
          </div>

          <div className="rc-card" style={{ flex:1 }}>
            <div className="rc-title" style={{marginBottom: 16}}>Usage Insights</div>
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              {[
                { t:'Peak Usage Time', s:'Most users are active between 10:00 AM - 2:00 PM', i:<Clock size={16} color="#10b981"/>, bg:'#d1fae5' },
                { t:'Most Engaging Feature', s:'AI Insights has the highest engagement with 76.1% of users', i:<Activity size={16} color="#7c3aed"/>, bg:'#f3e8ff' },
                { t:'Mobile Usage', s:'40.8% of sessions are from mobile devices', i:<Smartphone size={16} color="#3b82f6"/>, bg:'#eff6ff' },
              ].map((u, i) => (
                <div key={i} style={{ display:'flex', gap:12, alignItems:'center', cursor:'pointer' }}>
                  <div style={{ width:32, height:32, borderRadius:8, background:u.bg, display:'flex', justifyContent:'center', alignItems:'center' }}>{u.i}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:'#374151' }}>{u.t}</div>
                    <div style={{ fontSize:11, color:'#6b7280' }}>{u.s}</div>
                  </div>
                  <ChevronRight size={16} color="#9ca3af"/>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
