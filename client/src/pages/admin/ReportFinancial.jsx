import React from 'react';
import { 
  Line, Doughnut, Bar 
} from 'react-chartjs-2';
import { 
  TrendingUp, Database, Activity, CreditCard, Percent, FileText, Download, TrendingDown, Lightbulb, Settings, ChevronRight
} from 'lucide-react';

export default function ReportFinancial() {
  const lineData = {
    labels: ['20 May', '21 May', '22 May', '23 May', '24 May', '25 May', '26 May'],
    datasets: [
      {
        label: 'Revenue',
        data: [8000, 9500, 10500, 11000, 12000, 11500, 12480],
        borderColor: '#7c3aed',
        backgroundColor: '#7c3aed',
        tension: 0.4,
        pointRadius: 4,
        borderWidth: 2
      },
      {
        label: 'Expenses',
        data: [4000, 4500, 4800, 5000, 5500, 6000, 6320],
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
      y: { display: true, min: 0, max: 15000, ticks: { stepSize: 5000, callback: v => v >= 1000 ? '$'+v/1000 + 'K' : '$'+v, color: '#9ca3af', font: { size: 11 } }, grid: { color: '#f3f4f6' } },
      x: { grid: { display: false }, ticks: { color: '#9ca3af', font: { size: 11 } } }
    }
  };

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      { label: 'Revenue', data: [12000, 15000, 14000, 18000, 19000, 20000], backgroundColor: '#7c3aed', borderRadius: 4 },
      { label: 'Expenses', data: [8000, 9000, 8500, 10000, 11000, 12000], backgroundColor: '#3b82f6', borderRadius: 4 },
      { label: 'Profit', data: [4000, 6000, 5500, 8000, 8000, 8000], backgroundColor: '#10b981', borderRadius: 4 }
    ]
  };
  const barOpts = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { position: 'top', align: 'end', labels: { usePointStyle: true, boxWidth: 6, font: {size: 11} } } },
    scales: {
      y: { display: true, min: 0, max: 20000, ticks: { stepSize: 5000, callback: v => v >= 1000 ? '$'+v/1000 + 'K' : '$'+v, color: '#9ca3af', font: { size: 11 } }, grid: { color: '#f3f4f6' } },
      x: { grid: { display: false }, ticks: { color: '#9ca3af', font: { size: 11 } } }
    }
  };

  const revData = {
    labels: ['Courses', 'Subscriptions', 'Tests', 'Other', 'Refunds'],
    datasets: [{ data: [42.3, 24.1, 15.8, 10.5, 2.7], backgroundColor: ['#7c3aed', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'], borderWidth: 0, hoverOffset: 4 }]
  };
  const expData = {
    labels: ['Infrastructure', 'Marketing', 'Operations', 'Staff & HR', 'Other'],
    datasets: [{ data: [35.2, 22.8, 18.7, 12.1, 11.2], backgroundColor: ['#7c3aed', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'], borderWidth: 0, hoverOffset: 4 }]
  };
  const donutOpts = { responsive: true, maintainAspectRatio: false, cutout: '75%', plugins: { legend: { display: false } } };

  return (
    <div style={{ display: 'grid', gap: '20px' }}>
      
      {/* TOP METRICS */}
      <div className="reports-metrics-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
        <div className="reports-metric-card">
          <div className="reports-metric-icon" style={{ background: '#d1fae5', color: '#10b981' }}><TrendingUp size={22} /></div>
          <div className="reports-metric-info">
            <span className="reports-metric-label">Total Revenue</span>
            <span className="reports-metric-value">$12,480</span>
            <span className="reports-metric-trend reports-trend-up">↑ 16.8% vs last 7 days</span>
          </div>
        </div>
        <div className="reports-metric-card">
          <div className="reports-metric-icon" style={{ background: '#eff6ff', color: '#3b82f6' }}><Database size={22} /></div>
          <div className="reports-metric-info">
            <span className="reports-metric-label">Total Expenses</span>
            <span className="reports-metric-value">$6,320</span>
            <span className="reports-metric-trend reports-trend-up">↑ 8.4% vs last 7 days</span>
          </div>
        </div>
        <div className="reports-metric-card">
          <div className="reports-metric-icon" style={{ background: '#f3e8ff', color: '#7c3aed' }}><Activity size={22} /></div>
          <div className="reports-metric-info">
            <span className="reports-metric-label">Net Profit</span>
            <span className="reports-metric-value">$6,160</span>
            <span className="reports-metric-trend reports-trend-up">↑ 24.3% vs last 7 days</span>
          </div>
        </div>
        <div className="reports-metric-card">
          <div className="reports-metric-icon" style={{ background: '#ffedd5', color: '#ea580c' }}><CreditCard size={22} /></div>
          <div className="reports-metric-info">
            <span className="reports-metric-label">Avg. Revenue per User</span>
            <span className="reports-metric-value">$8.42</span>
            <span className="reports-metric-trend reports-trend-up">↑ 12.7% vs last 7 days</span>
          </div>
        </div>
        <div className="reports-metric-card">
          <div className="reports-metric-icon" style={{ background: '#fee2e2', color: '#ef4444' }}><Percent size={22} /></div>
          <div className="reports-metric-info">
            <span className="reports-metric-label">Profit Margin</span>
            <span className="reports-metric-value">49.4%</span>
            <span className="reports-metric-trend reports-trend-up">↑ 6.2% vs last 7 days</span>
          </div>
        </div>
      </div>

      {/* ROW 1: Revenue vs Expenses Line + Donut + Table */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '20px' }}>
        <div className="rc-card" style={{ display:'flex', flexDirection:'column' }}>
          <div className="rc-header"><div className="rc-title">Revenue vs Expenses</div></div>
          <div style={{ height: '250px', width: '100%', marginTop: -20 }}>
            <Line data={lineData} options={lineOpts} />
          </div>
        </div>

        <div className="rc-card">
          <div className="rc-title" style={{marginBottom: 20}}>Revenue Breakdown</div>
          <div style={{ display: 'flex', flexDirection:'column', alignItems: 'center', gap: 20 }}>
            <div style={{ width: '140px', height: '140px', position:'relative' }}>
              <Doughnut data={revData} options={donutOpts} />
              <div style={{ position:'absolute', top:0, left:0, right:0, bottom:0, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
                <div style={{ fontSize:22, fontWeight:700 }}>$12,480</div>
                <div style={{ fontSize:10, color:'#6b7280' }}>Total Revenue</div>
              </div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:8, width:'100%' }}>
              {[
                { l:'Courses', n:'$5,279', p:'42.3%', c:'#7c3aed' },
                { l:'Subscriptions', n:'$3,007', p:'24.1%', c:'#3b82f6' },
                { l:'Tests', n:'$1,974', p:'15.8%', c:'#10b981' },
                { l:'Other', n:'$1,311', p:'10.5%', c:'#f59e0b' },
                { l:'Refunds', n:'-$337', p:'-2.7%', c:'#ef4444' },
              ].map(d => (
                <div key={d.l} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:11 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <div style={{ width:8, height:8, borderRadius:'50%', background:d.c }} />
                    <div style={{ color:'#374151', fontWeight:500 }}>{d.l}</div>
                  </div>
                  <div style={{ color:'#6b7280', display:'flex', justifyContent:'space-between', width:80 }}>
                    <span>{d.p}</span><span>{d.n}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rc-card">
          <div className="rc-header"><div className="rc-title">Top Revenue Sources</div><div className="rc-view-all">View All</div></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, fontWeight:600, color:'#6b7280', borderBottom:'1px solid #f3f4f6', paddingBottom:8 }}>
              <span>Source</span><span>Amount</span><span>% of Total</span>
            </div>
            {[
              { p:'Course Enrollments', v:'$5,279', t:'42.3%', bg:'#f3e8ff', c:'#7c3aed', i:<FileText size={14} color="#7c3aed"/> },
              { p:'Subscriptions', v:'$3,007', t:'24.1%', bg:'#eff6ff', c:'#3b82f6', i:<Database size={14} color="#3b82f6"/> },
              { p:'Tests & Assessments', v:'$1,974', t:'15.8%', bg:'#d1fae5', c:'#10b981', i:<FileText size={14} color="#10b981"/> },
              { p:'Other Income', v:'$1,311', t:'10.5%', bg:'#ffedd5', c:'#f59e0b', i:<Database size={14} color="#f59e0b"/> },
              { p:'Refunds', v:'-$337', t:'-2.7%', bg:'#fee2e2', c:'#ef4444', i:<TrendingDown size={14} color="#ef4444"/> },
            ].map((r,i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:'#374151', alignItems:'center' }}>
                <span style={{ fontWeight:500, display:'flex', gap:8, alignItems:'center' }}>
                  <div style={{width:24,height:24,borderRadius:6,background:r.bg,display:'flex',justifyContent:'center',alignItems:'center'}}>{r.i}</div>
                  {r.p}
                </span>
                <span style={{ width: 60, textAlign:'right' }}>{r.v}</span>
                <span style={{ width: 60, textAlign:'right', color:'#6b7280' }}>{r.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 2: Monthly Bar + Recent Transactions + Expense Categories */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.5fr 1fr', gap: '20px' }}>
        
        {/* Monthly Summary Bar Chart */}
        <div className="rc-card" style={{ display:'flex', flexDirection:'column' }}>
          <div className="rc-header"><div className="rc-title">Monthly Financial Summary</div></div>
          <div style={{ height: '220px', width: '100%', marginTop: -10 }}>
            <Bar data={barData} options={barOpts} />
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="rc-card" style={{ padding: '24px 0' }}>
          <div className="rc-header" style={{ padding: '0 24px' }}>
            <div className="rc-title">Recent Transactions</div>
            <div className="rc-view-all">View All</div>
          </div>
          <table className="rc-table">
            <thead>
              <tr><th>Date</th><th>Description</th><th>Type</th><th>Amount</th><th>Status</th></tr>
            </thead>
            <tbody>
              {[
                { d:'26 May 2024', desc:'Course Enrollment - Medical', t:'Revenue', a:'$299', s:'Completed' },
                { d:'25 May 2024', desc:'Platform Subscription', t:'Revenue', a:'$199', s:'Completed' },
                { d:'24 May 2024', desc:'Server Hosting', t:'Expense', a:'$120', s:'Completed' },
                { d:'23 May 2024', desc:'Refund to Student', t:'Refund', a:'-$50', s:'Completed' },
                { d:'22 May 2024', desc:'Marketing Campaign', t:'Expense', a:'$75', s:'Completed' },
              ].map((r,i) => (
                <tr key={i}>
                  <td style={{ color: '#6b7280' }}>{r.d}</td>
                  <td style={{ fontWeight: 500 }}>{r.desc}</td>
                  <td>{r.t}</td>
                  <td style={{ fontWeight: 600 }}>{r.a}</td>
                  <td><span className="rc-badge green">{r.s}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Expense Categories */}
        <div className="rc-card">
          <div className="rc-title" style={{marginBottom: 20}}>Expense Categories</div>
          <div style={{ display: 'flex', flexDirection:'column', alignItems: 'center', gap: 20 }}>
            <div style={{ width: '140px', height: '140px', position:'relative' }}>
              <Doughnut data={expData} options={donutOpts} />
              <div style={{ position:'absolute', top:0, left:0, right:0, bottom:0, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
                <div style={{ fontSize:22, fontWeight:700 }}>$6,320</div>
                <div style={{ fontSize:10, color:'#6b7280' }}>Total Expenses</div>
              </div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:8, width:'100%' }}>
              {[
                { l:'Infrastructure', n:'$2,224', p:'35.2%', c:'#7c3aed' },
                { l:'Marketing', n:'$1,439', p:'22.8%', c:'#3b82f6' },
                { l:'Operations', n:'$1,183', p:'18.7%', c:'#10b981' },
                { l:'Staff & HR', n:'$765', p:'12.1%', c:'#f59e0b' },
                { l:'Other', n:'$709', p:'11.2%', c:'#ef4444' },
              ].map(d => (
                <div key={d.l} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:11 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <div style={{ width:8, height:8, borderRadius:'50%', background:d.c }} />
                    <div style={{ color:'#374151', fontWeight:500 }}>{d.l}</div>
                  </div>
                  <div style={{ color:'#6b7280', display:'flex', justifyContent:'space-between', width:80 }}>
                    <span>{d.p}</span><span>{d.n}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ROW 3: Insights & Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '20px' }}>
        <div className="rc-card" style={{background:'#f3e8ff', borderColor:'#e9d5ff'}}>
          <div style={{display:'flex', gap:12, marginBottom:12}}>
            <TrendingUp size={24} color="#7c3aed"/>
            <div style={{fontSize:14, fontWeight:700, color:'#5b21b6'}}>Revenue Growth</div>
          </div>
          <div style={{fontSize:12, color:'#4c1d95', lineHeight:1.5}}>Your revenue increased by 16.8% compared to last 7 days.</div>
        </div>
        <div className="rc-card" style={{background:'#eff6ff', borderColor:'#bfdbfe'}}>
          <div style={{display:'flex', gap:12, marginBottom:12}}>
            <Database size={24} color="#3b82f6"/>
            <div style={{fontSize:14, fontWeight:700, color:'#1e40af'}}>Expense Control</div>
          </div>
          <div style={{fontSize:12, color:'#1e3a8a', lineHeight:1.5}}>Expenses are 8.4% higher, keep an eye on marketing costs.</div>
        </div>
        <div className="rc-card" style={{background:'#ffedd5', borderColor:'#fed7aa'}}>
          <div style={{display:'flex', gap:12, marginBottom:12}}>
            <Activity size={24} color="#ea580c"/>
            <div style={{fontSize:14, fontWeight:700, color:'#9a3412'}}>Profit Margin</div>
          </div>
          <div style={{fontSize:12, color:'#7c2d12', lineHeight:1.5}}>Your profit margin is 49.4%, up by 6.2%.</div>
        </div>
        <div className="rc-card" style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid #f3f4f6', paddingBottom:12, marginBottom:12}}>
            <div style={{fontSize:13, fontWeight:600, display:'flex', alignItems:'center', gap:8}}><FileText size={16} color="#7c3aed"/> Generate Report</div>
            <ChevronRight size={16} color="#9ca3af"/>
          </div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div style={{fontSize:13, fontWeight:600, display:'flex', alignItems:'center', gap:8}}><Download size={16} color="#7c3aed"/> Export Data</div>
            <ChevronRight size={16} color="#9ca3af"/>
          </div>
        </div>
      </div>

    </div>
  );
}
