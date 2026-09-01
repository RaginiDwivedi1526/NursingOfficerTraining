import React from 'react';
import { 
  Line, Doughnut 
} from 'react-chartjs-2';
import { 
  Clock, FileText, CheckCircle, AlertTriangle, 
  FilePlus, Calendar as CalendarIcon, Filter, Save, Database, MoreHorizontal
} from 'lucide-react';

const RECENT_REPORTS = [
  { name: 'Course Performance Report', category: 'Learning', user: 'Pankaj Thakur', date: '26 May 2024 10:30 AM', status: 'Completed' },
  { name: 'Test Analysis Report', category: 'Assessment', user: 'Anjali Sharma', date: '26 May 2024 09:15 AM', status: 'Completed' },
  { name: 'Revenue Summary Report', category: 'Financial', user: 'Pankaj Thakur', date: '25 May 2024 04:45 PM', status: 'Completed' },
  { name: 'User Engagement Report', category: 'Engagement', user: 'Rohit Kumar', date: '25 May 2024 02:20 PM', status: 'Completed' },
  { name: 'Learning Progress Report', category: 'Learning', user: 'Priya Verma', date: '24 May 2024 11:20 AM', status: 'Failed' },
];

export default function ReportOverview() {
  const lineData = {
    labels: ['20 May', '21 May', '22 May', '23 May', '24 May', '25 May', '26 May'],
    datasets: [{
      label: 'Reports Generated',
      data: [82, 105, 122, 138, 168, 149, 188],
      borderColor: '#7c3aed',
      backgroundColor: 'rgba(124, 58, 237, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: '#7c3aed',
      borderWidth: 2
    }]
  };

  const lineOpts = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { display: true, min: 0, max: 200, ticks: { stepSize: 50, color: '#9ca3af', font: { size: 11 } }, grid: { color: '#f3f4f6' } },
      x: { grid: { display: false }, ticks: { color: '#9ca3af', font: { size: 11 } } }
    }
  };

  const donutData = {
    labels: ['Learning', 'Assessment', 'Engagement', 'Financial', 'System'],
    datasets: [{
      data: [42, 31, 22, 18, 15],
      backgroundColor: ['#4f46e5', '#3b82f6', '#10b981', '#f59e0b', '#6b7280'],
      borderWidth: 0,
      hoverOffset: 4
    }]
  };

  const donutOpts = {
    responsive: true, maintainAspectRatio: false, cutout: '75%',
    plugins: { legend: { display: false } }
  };

  return (
    <div style={{ display: 'grid', gap: '20px' }}>
      
      {/* TOP METRICS */}
      <div className="reports-metrics-grid">
        <div className="reports-metric-card">
          <div className="reports-metric-icon" style={{ background: '#f3e8ff', color: '#7c3aed' }}>
            <FileText size={22} />
          </div>
          <div className="reports-metric-info">
            <span className="reports-metric-label">Total Reports</span>
            <span className="reports-metric-value">128</span>
            <span className="reports-metric-trend reports-trend-up">↑ 18.6% vs last 7 days</span>
          </div>
        </div>

        <div className="reports-metric-card">
          <div className="reports-metric-icon" style={{ background: '#d1fae5', color: '#10b981' }}>
            <CalendarIcon size={22} />
          </div>
          <div className="reports-metric-info">
            <span className="reports-metric-label">Scheduled Reports</span>
            <span className="reports-metric-value">24</span>
            <span className="reports-metric-trend reports-trend-up">↑ 14.2% vs last 7 days</span>
          </div>
        </div>

        <div className="reports-metric-card">
          <div className="reports-metric-icon" style={{ background: '#eff6ff', color: '#3b82f6' }}>
            <Database size={22} />
          </div>
          <div className="reports-metric-info">
            <span className="reports-metric-label">Downloaded Reports</span>
            <span className="reports-metric-value">752</span>
            <span className="reports-metric-trend reports-trend-up">↑ 22.8% vs last 7 days</span>
          </div>
        </div>

        <div className="reports-metric-card">
          <div className="reports-metric-icon" style={{ background: '#ffedd5', color: '#ea580c' }}>
            <Database size={22} />
          </div>
          <div className="reports-metric-info">
            <span className="reports-metric-label">Data Sources</span>
            <span className="reports-metric-value">15</span>
            <span className="reports-metric-trend reports-trend-neutral">Active Sources</span>
          </div>
        </div>
      </div>

      {/* ROW 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        
        <div className="rc-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="rc-header">
            <div className="rc-title">Reports Overview</div>
            <select className="reports-select"><option>Daily</option></select>
          </div>
          <div style={{ height: '220px', width: '100%' }}>
            <Line data={lineData} options={lineOpts} />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '24px' }}>
            {[
              { label:'Avg. Generation Time', val:'2m 34s', trend:'↓ 8.4%', tColor:'#10b981', icon:<Clock size={18} color="#7c3aed"/>, bg:'#f3e8ff' },
              { label:'Avg. File Size', val:'3.2 MB', trend:'↓ 5.7%', tColor:'#10b981', icon:<FileText size={18} color="#10b981"/>, bg:'#d1fae5' },
              { label:'Success Rate', val:'98.6%', trend:'↑ 1.3%', tColor:'#10b981', icon:<CheckCircle size={18} color="#3b82f6"/>, bg:'#eff6ff' },
              { label:'Error Rate', val:'1.4%', trend:'↓ 1.3%', tColor:'#10b981', icon:<AlertTriangle size={18} color="#ef4444"/>, bg:'#fee2e2' },
            ].map((s,i) => (
              <div key={i} style={{ border:'1px solid #f3f4f6', borderRadius:'10px', padding:'16px', display:'flex', gap:'12px', alignItems:'center' }}>
                <div style={{ width:36, height:36, borderRadius:8, background:s.bg, display:'flex', justifyContent:'center', alignItems:'center' }}>{s.icon}</div>
                <div>
                  <div style={{ fontSize:11, color:'#6b7280', fontWeight:600 }}>{s.label}</div>
                  <div style={{ fontSize:16, fontWeight:700, margin:'2px 0' }}>{s.val}</div>
                  <div style={{ fontSize:10, color:s.tColor, fontWeight:600 }}>{s.trend}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rc-card">
          <div className="rc-header">
            <div className="rc-title">Top Reports</div>
            <div className="rc-view-all">View All</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { n:'Course Performance Report', c:124, r:4.8, i:<FileText size={16} color="#7c3aed"/>, bg:'#f3e8ff' },
              { n:'Test Analysis Report', c:98, r:4.6, i:<Database size={16} color="#3b82f6"/>, bg:'#eff6ff' },
              { n:'Revenue Summary Report', c:76, r:4.5, i:<FileText size={16} color="#10b981"/>, bg:'#d1fae5' },
              { n:'User Engagement Report', c:65, r:4.3, i:<Database size={16} color="#ef4444"/>, bg:'#fee2e2' },
              { n:'Learning Progress Report', c:58, r:4.2, i:<FileText size={16} color="#4f46e5"/>, bg:'#e0e7ff' },
            ].map((tr, i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div style={{ display:'flex', gap:'12px', alignItems:'center' }}>
                  <div style={{ fontSize:12, color:'#9ca3af', fontWeight:600, width:12 }}>{i+1}</div>
                  <div style={{ width:36, height:36, borderRadius:8, background:tr.bg, display:'flex', justifyContent:'center', alignItems:'center' }}>{tr.i}</div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:'#374151' }}>{tr.n}</div>
                    <div style={{ fontSize:11, color:'#6b7280' }}>Generated {tr.c} times</div>
                  </div>
                </div>
                <div style={{ fontSize:12, fontWeight:700, display:'flex', alignItems:'center', gap:4 }}>
                  {tr.r} {i<3 ? <span style={{color:'#10b981'}}>↑</span> : <span style={{color:'#ef4444'}}>↓</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '20px' }}>
        
        {/* Category Donut */}
        <div className="rc-card">
          <div className="rc-title" style={{marginBottom: 20}}>Reports by Category</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ width: '120px', height: '120px', position:'relative' }}>
              <Doughnut data={donutData} options={donutOpts} />
              <div style={{ position:'absolute', top:0, left:0, right:0, bottom:0, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
                <div style={{ fontSize:20, fontWeight:700 }}>128</div>
                <div style={{ fontSize:10, color:'#6b7280' }}>Total</div>
              </div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {[
                { l:'Learning', n:42, p:'32.8%', c:'#4f46e5' },
                { l:'Assessment', n:31, p:'24.2%', c:'#3b82f6' },
                { l:'Engagement', n:22, p:'17.2%', c:'#10b981' },
                { l:'Financial', n:18, p:'14.1%', c:'#f59e0b' },
                { l:'System', n:15, p:'11.7%', c:'#6b7280' },
              ].map(d => (
                <div key={d.l} style={{ display:'flex', alignItems:'center', gap:8, fontSize:11 }}>
                  <div style={{ width:8, height:8, borderRadius:'50%', background:d.c }} />
                  <div style={{ width:65, color:'#374151', fontWeight:500 }}>{d.l}</div>
                  <div style={{ color:'#6b7280' }}>{d.n} ({d.p})</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Reports Table */}
        <div className="rc-card" style={{ padding: '24px 0' }}>
          <div className="rc-header" style={{ padding: '0 24px' }}>
            <div className="rc-title">Recent Reports</div>
            <div className="rc-view-all">View All</div>
          </div>
          <table className="rc-table">
            <thead>
              <tr>
                <th>Report Name</th>
                <th>Category</th>
                <th>Generated By</th>
                <th>Generated On</th>
                <th>Status</th>
                <th style={{textAlign:'center'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_REPORTS.map((r,i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{r.name}</td>
                  <td>{r.category}</td>
                  <td>{r.user}</td>
                  <td>
                    <div style={{ fontSize:12, fontWeight:500 }}>{r.date.split(' ')[0]} {r.date.split(' ')[1]} {r.date.split(' ')[2]}</div>
                    <div style={{ fontSize:10, color:'#6b7280' }}>{r.date.split(' ')[3]} {r.date.split(' ')[4]}</div>
                  </td>
                  <td><span className={`rc-badge ${r.status === 'Completed' ? 'green' : 'red'}`}>{r.status}</span></td>
                  <td style={{textAlign:'center'}}>
                    <button style={{ background:'none', border:'1px solid #e5e7eb', borderRadius:4, padding:4, cursor:'pointer', color:'#6b7280' }}>
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display:'flex', justifyContent:'space-between', padding:'16px 24px 0', fontSize:12, color:'#6b7280', alignItems:'center' }}>
            <div>Showing 1 to 5 of 128 reports</div>
            <div style={{ display:'flex', gap:4 }}>
              <div style={{ border:'1px solid #e5e7eb', padding:'4px 10px', borderRadius:4 }}>«</div>
              <div style={{ border:'1px solid #e5e7eb', padding:'4px 10px', borderRadius:4 }}>‹</div>
              <div style={{ background:'#4f46e5', color:'white', padding:'4px 10px', borderRadius:4, fontWeight:600 }}>1</div>
              <div style={{ border:'1px solid #e5e7eb', padding:'4px 10px', borderRadius:4 }}>2</div>
              <div style={{ border:'1px solid #e5e7eb', padding:'4px 10px', borderRadius:4 }}>3</div>
              <div style={{ padding:'4px 10px' }}>...</div>
              <div style={{ border:'1px solid #e5e7eb', padding:'4px 10px', borderRadius:4 }}>26</div>
              <div style={{ border:'1px solid #e5e7eb', padding:'4px 10px', borderRadius:4 }}>›</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rc-card">
          <div className="rc-title" style={{marginBottom: 20}}>Quick Actions</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { title:'Generate New Report', sub:'Create a new custom report', icon:<FilePlus size={18} color="#7c3aed"/>, bg:'#f3e8ff' },
              { title:'Schedule Report', sub:'Set up automatic report delivery', icon:<CalendarIcon size={18} color="#7c3aed"/>, bg:'#f3e8ff' },
              { title:'Report Builder', sub:'Build custom reports with filters', icon:<Filter size={18} color="#7c3aed"/>, bg:'#f3e8ff' },
              { title:'Saved Reports', sub:'View and manage saved reports', icon:<Save size={18} color="#7c3aed"/>, bg:'#f3e8ff' },
              { title:'Data Sources', sub:'Manage data connections', icon:<Database size={18} color="#7c3aed"/>, bg:'#f3e8ff' },
            ].map((qa, i) => (
              <div key={i} style={{ display:'flex', gap:'16px', alignItems:'center', cursor:'pointer' }}>
                <div style={{ width:40, height:40, borderRadius:8, background:qa.bg, display:'flex', justifyContent:'center', alignItems:'center' }}>
                  {qa.icon}
                </div>
                <div>
                  <div style={{ fontSize:13, fontWeight:600, color:'#374151' }}>{qa.title}</div>
                  <div style={{ fontSize:11, color:'#6b7280' }}>{qa.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
