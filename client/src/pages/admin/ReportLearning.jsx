import React from 'react';
import { 
  Line, Doughnut 
} from 'react-chartjs-2';
import { 
  BookOpen, Users, PlayCircle, Clock, Trophy, ChevronRight, FileText, Download, Database, CalendarIcon
} from 'lucide-react';

export default function ReportLearning() {
  const lineData = {
    labels: ['20 May', '21 May', '22 May', '23 May', '24 May', '25 May', '26 May'],
    datasets: [
      {
        label: 'Sessions',
        data: [2100, 2400, 2300, 2800, 2600, 3100, 3682],
        borderColor: '#7c3aed',
        backgroundColor: '#7c3aed',
        tension: 0.4,
        pointRadius: 4,
        borderWidth: 2
      },
      {
        label: 'Active Learners',
        data: [800, 950, 900, 1100, 1050, 1200, 1257],
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
      y: { display: true, min: 0, max: 5000, ticks: { stepSize: 1000, callback: v => v >= 1000 ? v/1000 + 'K' : v, color: '#9ca3af', font: { size: 11 } }, grid: { color: '#f3f4f6' } },
      x: { grid: { display: false }, ticks: { color: '#9ca3af', font: { size: 11 } } }
    }
  };

  const deviceData = {
    labels: ['Mobile', 'Desktop', 'Tablet', 'Others'],
    datasets: [{ data: [58.7, 29.3, 8.6, 3.4], backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'], borderWidth: 0, hoverOffset: 4 }]
  };
  const contentData = {
    labels: ['Video', 'Document', 'Quiz', 'Live Session', 'Other'],
    datasets: [{ data: [55.2, 22.1, 11.4, 7.5, 3.8], backgroundColor: ['#7c3aed', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'], borderWidth: 0, hoverOffset: 4 }]
  };
  const perfData = {
    labels: ['Excellent', 'Good', 'Average', 'Needs Improvement'],
    datasets: [{ data: [22.4, 45.6, 21.1, 10.9], backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'], borderWidth: 0, hoverOffset: 4 }]
  };
  const donutOpts = { responsive: true, maintainAspectRatio: false, cutout: '75%', plugins: { legend: { display: false } } };

  return (
    <div style={{ display: 'grid', gap: '20px' }}>
      
      {/* TOP METRICS */}
      <div className="reports-metrics-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
        <div className="reports-metric-card">
          <div className="reports-metric-icon" style={{ background: '#f3e8ff', color: '#7c3aed' }}><BookOpen size={22} /></div>
          <div className="reports-metric-info">
            <span className="reports-metric-label">Total Courses</span>
            <span className="reports-metric-value">48</span>
            <span className="reports-metric-trend reports-trend-up">↑ 9.1% vs last 7 days</span>
          </div>
        </div>
        <div className="reports-metric-card">
          <div className="reports-metric-icon" style={{ background: '#eff6ff', color: '#3b82f6' }}><Users size={22} /></div>
          <div className="reports-metric-info">
            <span className="reports-metric-label">Active Learners</span>
            <span className="reports-metric-value">1,257</span>
            <span className="reports-metric-trend reports-trend-up">↑ 14.8% vs last 7 days</span>
          </div>
        </div>
        <div className="reports-metric-card">
          <div className="reports-metric-icon" style={{ background: '#d1fae5', color: '#10b981' }}><PlayCircle size={22} /></div>
          <div className="reports-metric-info">
            <span className="reports-metric-label">Learning Sessions</span>
            <span className="reports-metric-value">3,682</span>
            <span className="reports-metric-trend reports-trend-up">↑ 11.6% vs last 7 days</span>
          </div>
        </div>
        <div className="reports-metric-card">
          <div className="reports-metric-icon" style={{ background: '#ffedd5', color: '#ea580c' }}><Clock size={22} /></div>
          <div className="reports-metric-info">
            <span className="reports-metric-label">Avg. Learning Time</span>
            <span className="reports-metric-value">4h 32m</span>
            <span className="reports-metric-trend reports-trend-up">↑ 8.7% vs last 7 days</span>
          </div>
        </div>
        <div className="reports-metric-card">
          <div className="reports-metric-icon" style={{ background: '#fee2e2', color: '#ef4444' }}><Trophy size={22} /></div>
          <div className="reports-metric-info">
            <span className="reports-metric-label">Course Completion Rate</span>
            <span className="reports-metric-value">68.4%</span>
            <span className="reports-metric-trend reports-trend-up">↑ 6.5% vs last 7 days</span>
          </div>
        </div>
      </div>

      {/* ROW 1: Activity Line + 2 Donuts */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '20px' }}>
        <div className="rc-card" style={{ display:'flex', flexDirection:'column' }}>
          <div className="rc-header"><div className="rc-title">Learning Activity Over Time</div></div>
          <div style={{ height: '250px', width: '100%', marginTop: -20 }}>
            <Line data={lineData} options={lineOpts} />
          </div>
        </div>

        <div className="rc-card">
          <div className="rc-title" style={{marginBottom: 20}}>Learning by Device</div>
          <div style={{ display: 'flex', flexDirection:'column', alignItems: 'center', gap: 20 }}>
            <div style={{ width: '140px', height: '140px', position:'relative' }}>
              <Doughnut data={deviceData} options={donutOpts} />
              <div style={{ position:'absolute', top:0, left:0, right:0, bottom:0, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
                <div style={{ fontSize:22, fontWeight:700 }}>3,682</div>
                <div style={{ fontSize:10, color:'#6b7280' }}>Sessions</div>
              </div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:8, width:'100%' }}>
              {[
                { l:'Mobile', n:'2,160', p:'58.7%', c:'#3b82f6' },
                { l:'Desktop', n:'1,079', p:'29.3%', c:'#10b981' },
                { l:'Tablet', n:'317', p:'8.6%', c:'#f59e0b' },
                { l:'Others', n:'126', p:'3.4%', c:'#ef4444' },
              ].map(d => (
                <div key={d.l} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:11 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <div style={{ width:8, height:8, borderRadius:'50%', background:d.c }} />
                    <div style={{ color:'#374151', fontWeight:500 }}>{d.l}</div>
                  </div>
                  <div style={{ color:'#6b7280' }}>{d.p} ({d.n})</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rc-card">
          <div className="rc-title" style={{marginBottom: 20}}>Learning by Content Type</div>
          <div style={{ display: 'flex', flexDirection:'column', alignItems: 'center', gap: 20 }}>
            <div style={{ width: '140px', height: '140px', position:'relative' }}>
              <Doughnut data={contentData} options={donutOpts} />
              <div style={{ position:'absolute', top:0, left:0, right:0, bottom:0, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
                <div style={{ fontSize:22, fontWeight:700 }}>3,682</div>
                <div style={{ fontSize:10, color:'#6b7280' }}>Sessions</div>
              </div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:8, width:'100%' }}>
              {[
                { l:'Video', n:'2,032', p:'55.2%', c:'#7c3aed' },
                { l:'Document', n:'814', p:'22.1%', c:'#3b82f6' },
                { l:'Quiz', n:'420', p:'11.4%', c:'#10b981' },
                { l:'Live Session', n:'276', p:'7.5%', c:'#f59e0b' },
                { l:'Other', n:'140', p:'3.8%', c:'#ef4444' },
              ].map(d => (
                <div key={d.l} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:11 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <div style={{ width:8, height:8, borderRadius:'50%', background:d.c }} />
                    <div style={{ color:'#374151', fontWeight:500 }}>{d.l}</div>
                  </div>
                  <div style={{ color:'#6b7280' }}>{d.p} ({d.n})</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ROW 2: Tables and Bars */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '20px' }}>
        
        {/* Top Courses */}
        <div className="rc-card">
          <div className="rc-header"><div className="rc-title">Top Courses by Enrollments</div><div className="rc-view-all">View All</div></div>
          <table className="rc-table">
            <thead>
              <tr><th>Course</th><th>Enrollments</th><th>Completions</th><th>Completion Rate</th></tr>
            </thead>
            <tbody>
              {[
                { n:'AI for Beginners', i:<BookOpen size={16} color="#7c3aed"/>, bg:'#f3e8ff', e:842, c:612, p:72.7 },
                { n:'Machine Learning Basics', i:<BookOpen size={16} color="#3b82f6"/>, bg:'#eff6ff', e:726, c:512, p:70.5 },
                { n:'Data Science Fundamentals', i:<BookOpen size={16} color="#10b981"/>, bg:'#d1fae5', e:658, c:428, p:65.0 },
                { n:'Deep Learning Advanced', i:<BookOpen size={16} color="#f59e0b"/>, bg:'#ffedd5', e:512, c:356, p:69.5 },
                { n:'Prompt Engineering', i:<BookOpen size={16} color="#ef4444"/>, bg:'#fee2e2', e:498, c:332, p:66.7 },
              ].map((r,i) => (
                <tr key={i}>
                  <td style={{display:'flex', gap:12, alignItems:'center', padding:'12px 16px', fontWeight:600}}>
                    <div style={{width:32,height:32,borderRadius:8,background:r.bg,display:'flex',justifyContent:'center',alignItems:'center'}}>{r.i}</div>
                    {r.n}
                  </td>
                  <td style={{padding:'12px 16px', fontWeight:600}}>{r.e}</td>
                  <td style={{padding:'12px 16px', fontWeight:600}}>{r.c}</td>
                  <td style={{padding:'12px 16px'}}>
                    <div style={{display:'flex', alignItems:'center', gap:8}}>
                      <div style={{fontWeight:600, width:40}}>{r.p}%</div>
                      <div style={{flex:1, height:6, background:'#f3f4f6', borderRadius:3}}>
                        <div style={{width:`${r.p}%`, height:'100%', background:'#7c3aed', borderRadius:3}}/>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Learner Performance */}
        <div className="rc-card">
          <div className="rc-header"><div className="rc-title">Learner Performance Overview</div><div className="rc-view-all">View All</div></div>
          <div style={{ display: 'flex', flexDirection:'column', alignItems: 'center', gap: 20 }}>
            <div style={{ width: '160px', height: '160px', position:'relative', marginTop: 10 }}>
              <Doughnut data={perfData} options={donutOpts} />
              <div style={{ position:'absolute', top:0, left:0, right:0, bottom:0, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
                <div style={{ fontSize:24, fontWeight:700 }}>1,257</div>
                <div style={{ fontSize:11, color:'#6b7280' }}>Learners</div>
              </div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:12, width:'100%', marginTop: 10 }}>
              {[
                { l:'Excellent (90-100%)', n:'282', p:'22.4%', c:'#10b981' },
                { l:'Good (70-89%)', n:'574', p:'45.6%', c:'#3b82f6' },
                { l:'Average (50-69%)', n:'266', p:'21.1%', c:'#f59e0b' },
                { l:'Needs Improvement (<50%)', n:'135', p:'10.9%', c:'#ef4444' },
              ].map(d => (
                <div key={d.l} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:12 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <div style={{ width:10, height:10, borderRadius:'50%', background:d.c }} />
                    <div style={{ color:'#374151', fontWeight:500 }}>{d.l}</div>
                  </div>
                  <div style={{ color:'#6b7280', fontWeight:600 }}>{d.p} ({d.n})</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Average Scores */}
        <div className="rc-card">
          <div className="rc-header"><div className="rc-title">Average Score by Assessments</div><div className="rc-view-all">View All</div></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: 10 }}>
            {[
              { l:'Quizzes', p:78.6 },
              { l:'Assignments', p:74.2 },
              { l:'Tests', p:71.5 },
              { l:'Projects', p:82.3 },
              { l:'Live Assessments', p:76.8 },
            ].map((a,i) => (
              <div key={i}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8, fontSize:13, fontWeight:600 }}>
                  <span style={{ color:'#374151' }}>{a.l}</span>
                  <span>{a.p}%</span>
                </div>
                <div style={{ height:8, background:'#f3f4f6', borderRadius:4 }}>
                  <div style={{ width:`${a.p}%`, height:'100%', background:'#7c3aed', borderRadius:4 }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
