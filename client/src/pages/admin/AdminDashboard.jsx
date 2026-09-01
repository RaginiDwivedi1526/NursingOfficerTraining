import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Filler, Tooltip, Legend
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { useAuth } from '../../context/AuthContext';
import AddStudentModal from './AddStudentModal';
import CreateTestSeriesModal from './CreateTestSeriesModal';
import SendAnnouncementModal from './SendAnnouncementModal';
import ScheduleClassModal from './ScheduleClassModal';
import UploadMaterialModal from './UploadMaterialModal';
import IssueCertificateModal from './IssueCertificateModal';
import './AdminPanel.css';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Filler, Tooltip, Legend
);

/* ─── helpers ─── */
const fmt = (n) => n >= 1000 ? (n / 1000).toFixed(1) + 'k' : n?.toString() ?? '0';

const AVATAR_COLORS = ['#4f46e5','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#f97316'];
const avatarColor = (i) => AVATAR_COLORS[i % AVATAR_COLORS.length];

const today = new Date();
const dateStr = today.toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });

/* ─── Mock / static data ─── */
const TOP_STUDENTS = [
  { name:'Priya Sharma',   exam:'NORCET 2025', avg:91, tests:40, prog:88, pass:'95%' },
  { name:'Anjali Verma',   exam:'AIIMS NORCET',avg:89, tests:42, prog:85, pass:'90%' },
  { name:'Neha Kumari',    exam:'NORCET 2025', avg:87, tests:45, prog:82, pass:'85%' },
  { name:'Rohit Yadav',    exam:'SSC Nursing', avg:85, tests:38, prog:78, pass:'82%' },
  { name:'Anjali Patel',   exam:'AIIMS/NORCET',avg:80, tests:37, prog:75, pass:'80%' },
];

const RECENT_ACTIVITY = [
  { icon:'👤', bg:'#ede9fe', text:'New student registered', sub:'Priya Sharma', time:'3 min ago' },
  { icon:'📝', bg:'#dbeafe', text:'Mock test attempted',    sub:'Mock Test 05', time:'6 min ago' },
  { icon:'🏅', bg:'#d1fae5', text:'Certificate issued',     sub:'',             time:'18 min ago' },
  { icon:'⭐', bg:'#fef3c7', text:'New review received',    sub:'4 Stars',      time:'21 min ago' },
  { icon:'💳', bg:'#d1fae5', text:'Payment received',       sub:'₹1,999 · Pro', time:'35 min ago' },
  { icon:'📅', bg:'#dbeafe', text:'Live class scheduled',   sub:'Topic: ECG',   time:'1 hr ago'   },
];

const RECENT_ENROLLMENTS = [
  { name:'Sunita Singh',   course:'NORCET 2025',       date:'30 May 2026',  status:'Active'  },
  { name:'Sandeep Yadav',  course:'AIIMS NORCET',      date:'30 May 2026',  status:'Active'  },
  { name:'Meera Joshi',    course:'SSC Nursing Officer',date:'29 May 2026',  status:'Pending' },
  { name:'Vikram Raj',     course:'MRB Nursing Officer',date:'29 May 2026',  status:'Active'  },
  { name:'Pooja Mehta',    course:'NORCET 2025',        date:'29 May 2026',  status:'Active'  },
];

const COURSES = [
  { name:'Medical Surgical Nursing',  enroll:9045, comp:9045, prog:100, rating:4.8 },
  { name:'Pediatric Nursing',         enroll:7200, comp:5780, prog:80,  rating:4.7 },
  { name:'Child Health Nursing',      enroll:6200, comp:5420, prog:74,  rating:4.5 },
  { name:'Community Health Nursing',  enroll:7060, comp:4087, prog:61,  rating:4.5 },
  { name:'Mental Health Nursing',     enroll:6840, comp:4122, prog:60,  rating:4.3 },
];

const EXAM_GOALS = [
  { label:'NORCET',            num:12542, pct:49, color:'#4f46e5' },
  { label:'AIIMS Nursing Off.',num:5291,  pct:21, color:'#10b981' },
  { label:'SSC Nursing Off.',  num:3815,  pct:15, color:'#f59e0b' },
  { label:'MRB Nursing Off.',  num:2465,  pct:10, color:'#ef4444' },
  { label:'Other Courses',     num:1294,  pct:5,  color:'#8b5cf6' },
];

const PERF_LABELS  = ['22 May','24 May','26 May','28 May','30 May','1 Jun','3 Jun'];
const PERF_ATTEMPT = [2800, 2400, 2600, 3200, 2900, 3800, 3400];
const PERF_SCORE   = [74,72,75,80,78,82,79];
const PERF_ACTIVE  = [160,140,180,200,170,220,195];

const REV_LABELS = ['22 May','24 May','26 May','28 May','30 May','1 Jun','3 Jun'];
const REV_DATA   = [18000,22000,19500,28000,24000,35000,31200];

/* ─── Sidebar nav data ─── */
const NAV = [
  { section:'MANAGE', items:[
    { icon:'🏠', label:'Dashboard',        path:'/admin',          active:true  },
    { icon:'👥', label:'Students',         path:'/admin/users'                  },
    { icon:'📋', label:'Enrollments',      path:'/admin/enrollments'            },
    { icon:'📚', label:'Courses & Topics', path:'/admin/courses'                },
    { icon:'📝', label:'Test Series',      path:'/admin/tests'                  },
    { icon:'🎯', label:'Mock Tests',       path:'/admin/mock-tests'             },
    { icon:'📡', label:'Live Classes',     path:'/admin/live-classes'           },
    { icon:'📅', label:'Schedule',         path:'/admin/schedule'               },
    { icon:'⬇️', label:'Downloads',        path:'/admin/downloads'              },
    { icon:'🔖', label:'Bookmarks',        path:'/admin/bookmarks'              },
    { icon:'📒', label:'Notes',            path:'/admin/notes'                  },
    { icon:'❌', label:'My Mistakes',      path:'/admin/mistakes'               },
    { icon:'🤖', label:'AI Insights',      path:'/admin/ai'                     },
    { icon:'📂', label:'Study Materials',  path:'/admin/materials'              },
  ]},
  { section:'ENGAGEMENT', items:[
    { icon:'📢', label:'Announcements',    path:'/admin/announcements', badge:3  },
    { icon:'🔔', label:'Notifications',    path:'/admin/notifications', badge:12 },
    { icon:'💬', label:'Messages',         path:'/admin/messages',      badge:5  },
    { icon:'⭐', label:'Reviews & Feedback',path:'/admin/reviews'                },
  ]},
  { section:'REPORTS & ANALYTICS', items:[
    { icon:'📈', label:'Performance',      path:'/admin/performance'            },
    { icon:'📊', label:'Analytics',        path:'/admin/analytics'              },
    { icon:'🗂️', label:'All Reports',      path:'/admin/reports'                },
  ]},
  { section:'SYSTEM', items:[
    { icon:'👤', label:'Users & Admin',    path:'/admin/users'                  },
    { icon:'🔐', label:'Roles & Permissions',path:'/admin/roles'                },
    { icon:'⚙️', label:'Settings',         path:'/admin/settings'               },
    { icon:'💰', label:'Billing & Payments',path:'/admin/billing'               },
    { icon:'🆘', label:'Support',          path:'/admin/support'                },
  ]},
];

/* ──────────────────────────────────────────────
   MAIN COMPONENT
   ────────────────────────────────────────────── */
function AdminDashboard() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAddStudent, setShowAddStudent]       = useState(false);
  const [showCreateTest, setShowCreateTest]       = useState(false);
  const [showSendAnnouncement, setShowSendAnnouncement] = useState(false);
  const [showScheduleClass, setShowScheduleClass] = useState(false);
  const [showUploadMaterial, setShowUploadMaterial] = useState(false);
  const [showIssueCertificate, setShowIssueCertificate] = useState(false);

  const fetchStats = async () => {
    try {
      const userStr = localStorage.getItem('nursingUser');
      const token = userStr ? JSON.parse(userStr).token : null;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
      const url = baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`;
      const { data } = await axios.get(`${url}/admin/stats`, config);
      
      let recentStudents = [];
      try {
        const usersRes = await axios.get(`${url}/admin/users`, config);
        recentStudents = usersRes.data.filter(u => u.role !== 'admin').slice(0, 5);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }

      setStats({ ...data, recentStudents });
    } catch (e) {
      console.error(e);
      setStats({ totalUsers:25430, totalTests:54, totalResults:46289, roleStats:[], recentStudents:[] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleLogout = () => { logoutUser(); navigate('/admin/login'); };

  // Refresh stats after a student is added
  const handleStudentCreated = async () => {
    fetchStats();
  };

  const totalUsers = stats?.totalUsers ?? 0;
  const totalTests = stats?.totalTests ?? 0;
  const totalResults = stats?.totalResults ?? 0;

  const examGoals = stats?.examGoals?.length ? stats.examGoals : [
    { label: 'No Data', num: 1, pct: 100, color: '#e5e7eb' }
  ];

  /* ── Chart configs ── */
  const perfChartData = {
    labels: stats?.performance?.labels || ['No Data'],
    datasets: [
      {
        label:'Tests Attempted',
        data: stats?.performance?.attempts || [0],
        borderColor:'#4f46e5',
        backgroundColor:'rgba(79,70,229,.08)',
        fill: true,
        tension: .4,
        pointRadius: 4,
        pointBackgroundColor:'#4f46e5',
        borderWidth: 2,
        yAxisID:'y',
      },
      {
        label:'Avg. Score (%)',
        data: stats?.performance?.scores || [0],
        borderColor:'#10b981',
        backgroundColor:'rgba(16,185,129,.06)',
        fill: true,
        tension: .4,
        pointRadius: 4,
        pointBackgroundColor:'#10b981',
        borderWidth: 2,
        yAxisID:'y1',
      },
      {
        label:'Active Students',
        data: stats?.performance?.active || [0],
        borderColor:'#f59e0b',
        backgroundColor:'rgba(245,158,11,.06)',
        fill: true,
        tension: .4,
        pointRadius: 4,
        pointBackgroundColor:'#f59e0b',
        borderWidth: 2,
        yAxisID:'y',
      },
    ]
  };
  const perfChartOpts = {
    responsive:true, maintainAspectRatio:false,
    interaction:{ mode:'index', intersect:false },
    plugins:{ legend:{ position:'top', labels:{ font:{size:11}, boxWidth:10, padding:12 } }, tooltip:{ bodyFont:{size:11} } },
    scales:{
      y:  { type:'linear', display:true, position:'left', grid:{color:'#f3f4f6'}, ticks:{font:{size:10}, color:'#9ca3af'} },
      y1: { type:'linear', display:true, position:'right', grid:{drawOnChartArea:false}, ticks:{font:{size:10}, color:'#9ca3af', callback:v=>`${v}%`} },
      x:  { grid:{display:false}, ticks:{font:{size:10}, color:'#9ca3af'} },
    }
  };

  const donutData = {
    labels: examGoals.map(g=>g.label),
    datasets:[{
      data: examGoals.map(g=>g.num),
      backgroundColor: examGoals.map(g=>g.color),
      borderWidth: 0,
      hoverOffset: 6,
    }]
  };
  const donutOpts = {
    responsive:true, maintainAspectRatio:false, cutout:'70%',
    plugins:{ legend:{display:false}, tooltip:{ bodyFont:{size:11} } },
  };

  const revChartData = {
    labels: stats?.revenue?.labels || ['No Data'],
    datasets:[{
      label:'Revenue (₹)',
      data: stats?.revenue?.data || [0],
      borderColor:'#4f46e5',
      backgroundColor: (ctx) => {
        const chart = ctx.chart;
        const { ctx:c, chartArea } = chart;
        if (!chartArea) return 'rgba(79,70,229,.1)';
        const grad = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        grad.addColorStop(0, 'rgba(79,70,229,.25)');
        grad.addColorStop(1, 'rgba(79,70,229,.01)');
        return grad;
      },
      fill:true, tension:.4, pointRadius:4,
      pointBackgroundColor:'#4f46e5', borderWidth:2,
    }]
  };
  const revOpts = {
    responsive:true, maintainAspectRatio:false,
    plugins:{ legend:{display:false}, tooltip:{ callbacks:{ label: ctx=>`₹${ctx.parsed.y.toLocaleString('en-IN')}` }, bodyFont:{size:11} } },
    scales:{
      y: { grid:{color:'#f3f4f6'}, ticks:{font:{size:10}, color:'#9ca3af', callback:v=>`₹${(v/1000).toFixed(0)}k`} },
      x: { grid:{display:false}, ticks:{font:{size:10}, color:'#9ca3af'} },
    }
  };

  if (loading) return (
    <div className="ap-shell" style={{ alignItems:'center', justifyContent:'center' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ width:40,height:40,border:'3px solid #e5e7eb',borderTop:'3px solid #4f46e5',borderRadius:'50%',animation:'spin .7s linear infinite',margin:'0 auto 12px' }} />
        <div style={{ color:'#6b7280',fontSize:13 }}>Loading dashboard…</div>
      </div>
    </div>
  );

  return (
    <div className="ap-dashboard-content">

        {/* Date bar */}
        <div className="ap-date-bar">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          {dateStr} — {new Date(today.getTime() + 7*24*3600*1000).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}
        </div>

        {/* ── STAT CARDS ── */}
        <div className="ap-stats-grid">
          {[
            { icon:'👥', bg:'#ede9fe', num:fmt(totalUsers),   label:'Total Students',       delta:'+10.5%', sub:'in last 7 days', dir:'up' },
            { icon:'🟢', bg:'#d1fae5', num:'18,692',          label:'Active Students',      delta:'+8.2%',  sub:'in last 7 days', dir:'up' },
            { icon:'🆕', bg:'#dbeafe', num:fmt(totalUsers>1000?2543:totalUsers), label:'New Registrations', delta:'+12.1%',sub:'in last 7 days', dir:'up' },
            { icon:'📝', bg:'#fef3c7', num:fmt(totalResults), label:'Tests Attempted',      delta:'+9.8%',  sub:'in last 7 days', dir:'up' },
            { icon:'🏅', bg:'#d1fae5', num:'3,278',           label:'Certificates Issued',  delta:'+4.3%',  sub:'in last month',  dir:'up' },
            { icon:'💰', bg:'#ede9fe', num:'₹2,48,650',       label:'Revenue This Month',   delta:'+15.9%', sub:'vs last month',  dir:'up' },
          ].map((s,i) => (
            <div className="ap-stat-card" key={i}>
              <div className="ap-stat-icon" style={{ background:s.bg }}>{s.icon}</div>
              <div className="ap-stat-num">{s.num}</div>
              <div className="ap-stat-label">{s.label}</div>
              <div className={`ap-stat-delta ${s.dir}`}>
                {s.delta}
                <span className="ap-stat-delta-sub">{s.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── PERFORMANCE + DONUT ── */}
        <div className="ap-row-2-3">
          <div className="ap-card">
            <div className="ap-section-header">
              <div className="ap-section-title">Performance Overview</div>
              <select style={{ fontSize:12,border:'1px solid #e5e7eb',borderRadius:7,padding:'3px 8px',color:'#6b7280',cursor:'pointer' }}>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 3 Months</option>
              </select>
            </div>
            <div style={{ height:220 }}>
              <Line data={perfChartData} options={perfChartOpts} />
            </div>
          </div>

          <div className="ap-card">
            <div className="ap-section-header">
              <div className="ap-section-title">Students by Exam Goal</div>
            </div>
            <div className="ap-donut-wrap">
              <div style={{ position:'relative', width:130, height:130, flexShrink:0 }}>
                <Doughnut data={donutData} options={donutOpts} />
                <div className="ap-donut-center">
                  <div className="ap-donut-center-num">{fmt(totalUsers)}</div>
                  <div className="ap-donut-center-label">Total Students</div>
                </div>
              </div>
              <div className="ap-donut-legend">
                {EXAM_GOALS.map((g,i) => (
                  <div className="ap-legend-item" key={i}>
                    <div className="ap-legend-dot" style={{ background:g.color }} />
                    <span className="ap-legend-name" style={{ fontSize:11 }}>{g.label}</span>
                    <span className="ap-legend-num" style={{ fontSize:11 }}>{g.num.toLocaleString('en-IN')}</span>
                  </div>
                ))}
                <a className="ap-view-all" style={{ fontSize:11, marginTop:6, display:'block' }}>View all exam goals →</a>
              </div>
            </div>
          </div>
        </div>

        {/* ── TOP STUDENTS + RECENT ACTIVITY ── */}
        <div className="ap-row-2">
          <div className="ap-card">
            <div className="ap-section-header">
              <div className="ap-section-title">Top Performing Students</div>
              <span className="ap-view-all">View All</span>
            </div>
            <table className="ap-table">
              <thead>
                <tr>
                  <th>#</th><th>Student Name</th><th>Exam Goal</th>
                  <th>Avg. Score</th><th>Tests</th><th>Progress</th><th>Pass%</th>
                </tr>
              </thead>
              <tbody>
                {(stats?.recentStudents || []).map((s,i) => (
                  <tr key={i}>
                    <td style={{ color:'#9ca3af', fontWeight:600 }}>{i+1}</td>
                    <td>
                      <div className="ap-tbl-user">
                        <div className="ap-tbl-avatar" style={{ background:avatarColor(i) }}>
                          {s.name.charAt(0)}
                        </div>
                        <span className="ap-tbl-name">{s.name}</span>
                      </div>
                    </td>
                    <td style={{ color:'#6b7280', fontSize:11.5 }}>{s.examGoal || s.exam || 'Nursing Officer'}</td>
                    <td style={{ fontWeight:700 }}>{s.avg || Math.floor(Math.random()*15 + 75)}%</td>
                    <td>{s.tests || Math.floor(Math.random()*20 + 20)}</td>
                    <td>
                      <div className="ap-progress-bar-bg">
                        <div className="ap-progress-bar-fill" style={{ width:`${s.prog || Math.floor(Math.random()*20 + 70)}%` }} />
                      </div>
                    </td>
                    <td>
                      <span className="ap-badge ap-badge-green">{s.pass || `${Math.floor(Math.random()*15 + 80)}%`}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="ap-card">
            <div className="ap-section-header">
              <div className="ap-section-title">Recent Activity</div>
              <span className="ap-view-all">View All</span>
            </div>
            <div className="ap-activity-list">
              {(stats?.recentStudents || []).map((rs, i) => {
                const a = {
                  icon: '👤', bg: '#ede9fe', text: 'New student registered', sub: rs.name, time: new Date(rs.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                };
                return (
                  <div className="ap-activity-item" key={i}>
                  <div className="ap-activity-icon" style={{ background:a.bg }}>{a.icon}</div>
                  <div className="ap-activity-body">
                    <div className="ap-activity-text">
                      {a.text} {a.sub && <span className="ap-activity-name">{a.sub}</span>}
                    </div>
                    <div className="ap-activity-time">{a.time}</div>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── TESTS + SYSTEM + QUICK ACTIONS ── */}
        <div className="ap-row-3">
          {/* Tests Overview */}
          <div className="ap-card">
            <div className="ap-section-header">
              <div className="ap-section-title">Tests Overview</div>
              <span className="ap-view-all">View All</span>
            </div>
            <div className="ap-sys-list">
              {[
                { icon:'📝', bg:'#ede9fe', label:'Total Test Series', val:totalTests  },
                { icon:'🎯', bg:'#dbeafe', label:'Total Mock Tests',   val:'184'       },
                { icon:'✅', bg:'#d1fae5', label:'Live Tests Conducted',val:fmt(totalResults) },
                { icon:'📅', bg:'#fef3c7', label:'Upcoming Tests',     val:'12'        },
                { icon:'👤', bg:'#d1fae5', label:'Tests Attempted',    val:fmt(totalResults) },
              ].map((r,i) => (
                <div className="ap-sys-row" key={i}>
                  <div className="ap-sys-icon" style={{ background:r.bg }}>{r.icon}</div>
                  <span className="ap-sys-label">{r.label}</span>
                  <span className="ap-sys-val">{r.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* System Overview */}
          <div className="ap-card">
            <div className="ap-section-header">
              <div className="ap-section-title">System Overview</div>
              <span className="ap-view-all">View Report</span>
            </div>
            <div className="ap-sys-list">
              {[
                { icon:'🌐', bg:'#d1fae5', label:'Server Status',   val:<span className="ap-badge ap-badge-green">Excellent</span>, bar:null },
                { icon:'🖥️', bg:'#dbeafe', label:'Website Visitors',val:'48,291', bar:null },
                { icon:'💾', bg:'#fef3c7', label:'Storage Usage',    val:'35%', bar:35, barColor:'#f59e0b' },
                { icon:'🗄️', bg:'#ede9fe', label:'Database',         val:'Optimal', bar:null },
                { icon:'🔒', bg:'#d1fae5', label:'SSL Certificate',  val:<span className="ap-badge ap-badge-green">Secure</span>, bar:null },
              ].map((r,i) => (
                <div className="ap-sys-row" key={i} style={{ flexWrap:'wrap', gap:6 }}>
                  <div className="ap-sys-icon" style={{ background:r.bg }}>{r.icon}</div>
                  <span className="ap-sys-label">{r.label}</span>
                  {r.bar != null
                    ? <>
                        <div className="ap-sys-bar-bg"><div className="ap-sys-bar-fill" style={{ width:`${r.bar}%`, background:r.barColor }} /></div>
                        <span className="ap-sys-val">{r.val}</span>
                      </>
                    : <span className="ap-sys-val">{r.val}</span>
                  }
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="ap-card">
            <div className="ap-section-header">
              <div className="ap-section-title">Quick Actions</div>
            </div>
            <div className="ap-qa-grid">
              {[
                { icon:'👥', label:'Add New Student',      action: () => setShowAddStudent(true) },
                { icon:'📝', label:'Create Test Series',   action: () => setShowCreateTest(true) },
                { icon:'📋', label:'Upload Study Material',action: () => setShowUploadMaterial(true) },
                { icon:'📅', label:'Schedule a Live Class',action: () => setShowScheduleClass(true) },
                { icon:'📢', label:'Send Announcement',    action: () => setShowSendAnnouncement(true) },
                { icon:'📄', label:'Generate Report',      action: () => {} },
                { icon:'📤', label:'View Exports',         action: () => {} },
                { icon:'📊', label:'Manage Goals',         action: () => {} },
                { icon:'🏅', label:'Issue Certificate',    action: () => setShowIssueCertificate(true) },
              ].map((q,i) => (
                <button className="ap-qa-btn" key={i} onClick={q.action}>
                  <span className="ap-qa-icon">{q.icon}</span>
                  {q.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── RECENT ENROLLMENTS + REVENUE ── */}
        <div className="ap-row-2">
          <div className="ap-card">
            <div className="ap-section-header">
              <div className="ap-section-title">Recent Enrollments</div>
              <span className="ap-view-all">View All</span>
            </div>
            <table className="ap-table">
              <thead>
                <tr><th>Student Name</th><th>Course</th><th>Date</th><th>Status</th></tr>
              </thead>
              <tbody>
                {(stats?.recentStudents || []).map((e,i) => (
                  <tr key={i}>
                    <td>
                      <div className="ap-tbl-user">
                        <div className="ap-tbl-avatar" style={{ background:avatarColor(i) }}>
                          {e.name.charAt(0)}
                        </div>
                        <span className="ap-tbl-name">{e.name}</span>
                      </div>
                    </td>
                    <td style={{ fontSize:11.5, color:'#6b7280' }}>
                      {e.enrolledCourses && e.enrolledCourses.length > 0 ? e.enrolledCourses[0] : (e.course || e.batch || 'General Prep')}
                    </td>
                    <td style={{ fontSize:11.5, color:'#6b7280' }}>
                      {e.createdAt ? new Date(e.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : e.date}
                    </td>
                    <td>
                      <span className={`ap-badge ${(e.status || 'Active') === 'Active' ? 'ap-badge-green' : 'ap-badge-orange'}`}>
                        {e.status || 'Active'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="ap-card">
            <div className="ap-section-header">
              <div className="ap-section-title">Revenue Overview</div>
              <span className="ap-view-all">View Details</span>
            </div>
            <div style={{ marginBottom:10 }}>
              <div style={{ fontSize:22, fontWeight:800, color:'#1a1d23' }}>₹2,48,650</div>
              <div style={{ fontSize:11, color:'#10b981', fontWeight:600 }}>▲ 15.9% vs last month</div>
            </div>
            <div style={{ height:140 }}>
              <Line data={revChartData} options={revOpts} />
            </div>
          </div>
        </div>

        {/* ── COURSES + FEEDBACK ── */}
        <div className="ap-row-2">
          <div className="ap-card">
            <div className="ap-section-header">
              <div className="ap-section-title">Popular Courses &amp; Topics</div>
              <span className="ap-view-all">View All</span>
            </div>
            <table className="ap-table">
              <thead>
                <tr><th>Topic / Course</th><th>Enrollments</th><th>Completions</th><th>Avg. Progress</th><th>Rating</th></tr>
              </thead>
              <tbody>
                {COURSES.map((c,i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <div style={{ width:7, height:7, borderRadius:'50%', background:EXAM_GOALS[i]?.color ?? '#4f46e5' }} />
                        <span style={{ fontWeight:600, fontSize:12 }}>{c.name}</span>
                      </div>
                    </td>
                    <td style={{ fontWeight:600 }}>{c.enroll.toLocaleString('en-IN')}</td>
                    <td style={{ fontWeight:600 }}>{c.comp.toLocaleString('en-IN')}</td>
                    <td>
                      <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                        <div className="ap-progress-bar-bg"><div className="ap-progress-bar-fill green" style={{ width:`${c.prog}%` }} /></div>
                        <span style={{ fontSize:11, color:'#6b7280' }}>{c.prog}%</span>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize:12, fontWeight:600 }}>⭐ {c.rating}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="ap-card">
            <div className="ap-section-header">
              <div className="ap-section-title">Feedback Summary</div>
              <span className="ap-view-all">View All</span>
            </div>
            <div style={{ display:'flex', gap:20, alignItems:'flex-start' }}>
              <div style={{ textAlign:'center' }}>
                <div className="ap-feedback-big-num">4.6</div>
                <div className="ap-feedback-stars">★★★★★</div>
                <div className="ap-feedback-sub">Based on 32,547 Reviews</div>
              </div>
              <div style={{ flex:1 }}>
                {[
                  { star:5, pct:71 },
                  { star:4, pct:18 },
                  { star:3, pct:7  },
                  { star:2, pct:2  },
                  { star:1, pct:1  },
                ].map(r => (
                  <div className="ap-feedback-bar-row" key={r.star}>
                    <span className="ap-feedback-bar-label">{r.star} ★</span>
                    <div className="ap-feedback-bar-bg">
                      <div className="ap-feedback-bar-fill" style={{ width:`${r.pct}%` }} />
                    </div>
                    <span className="ap-feedback-count">{r.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── CTA BANNER ── */}
        <div className="ap-cta-banner">
          <div className="ap-cta-trophy">🏆</div>
          <div className="ap-cta-body">
            <div className="ap-cta-title">Empower more future nurses with quality education.</div>
            <div className="ap-cta-sub">Your platform is making a difference to students' lives.</div>
          </div>
          <div className="ap-cta-stats">
            <div className="ap-cta-stat">
              <div className="ap-cta-stat-num">1,25,000+</div>
              <div className="ap-cta-stat-label">Total Students</div>
            </div>
            <div className="ap-cta-stat">
              <div className="ap-cta-stat-num">85,000+</div>
              <div className="ap-cta-stat-label">Tests Completed</div>
            </div>
            <div className="ap-cta-stat">
              <div className="ap-cta-stat-num">15,000+</div>
              <div className="ap-cta-stat-label">Certificates Issued</div>
            </div>
            <div className="ap-cta-stat">
              <div className="ap-cta-stat-num">4.6/5</div>
              <div className="ap-cta-stat-label">Average Rating</div>
            </div>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className="ap-footer">
          <div className="ap-footer-grid">
            {/* Brand */}
            <div>
              <div className="ap-footer-brand">
                <div className="ap-logo-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12h6M12 9v6"/></svg></div>
                <span className="ap-footer-brand-name">NursingOfficer Training™</span>
              </div>
              <div className="ap-footer-desc">India's most trusted platform for Nursing Officer exam preparation.</div>
              <div className="ap-footer-social">
                {['f','t','in','yt'].map(s=>(
                  <button key={s} className="ap-footer-social-btn">{s}</button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div className="ap-footer-col-title">Quick Links</div>
              {['About Us','Contact Us','Blog','Terms & Conditions','Refund Policy'].map(l=>(
                <a key={l} className="ap-footer-link" href="#">{l}</a>
              ))}
            </div>

            {/* Support */}
            <div>
              <div className="ap-footer-col-title">Support</div>
              {['Help Center','Video Tutorials','Report an Issue','Live Chat','System Status'].map(l=>(
                <a key={l} className="ap-footer-link" href="#">{l}</a>
              ))}
            </div>

            {/* Contact */}
            <div>
              <div className="ap-footer-col-title">Contact Us</div>
              <div className="ap-footer-link">📧 info@nursingofficertraining.com</div>
              <div className="ap-footer-link">📞 +91-XXX-XXXXXX</div>
              <div className="ap-footer-link" style={{ whiteSpace:'pre-line' }}>📍 Noida, Uttar Pradesh, India</div>
            </div>

            {/* Newsletter */}
            <div>
              <div className="ap-footer-col-title">Newsletter</div>
              <div className="ap-footer-desc">Stay updated with the latest news and updates.</div>
              <div className="ap-newsletter-input-row">
                <input className="ap-newsletter-input" type="email" placeholder="Enter your email" />
                <button className="ap-newsletter-btn">Subscribe</button>
              </div>
            </div>
          </div>

          <hr className="ap-footer-divider" />
          <div className="ap-footer-bottom">
            <span>© 2024 NursingOfficer Training™. All rights reserved.</span>
            <span className="ap-footer-made">Made with ❤️ for Nursing Aspirants</span>
          </div>
        </div>

      {/* CSS keyframe for loading spinner */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* ── Add Student Modal ── */}
      {showAddStudent && (
        <AddStudentModal
          onClose={() => setShowAddStudent(false)}
          onCreated={handleStudentCreated}
        />
      )}

      {/* ── Create Test Series Modal ── */}
      {showCreateTest && <CreateTestSeriesModal onClose={() => setShowCreateTest(false)} onCreated={() => { setShowCreateTest(false); fetchStats(); }} />}
      {showSendAnnouncement && <SendAnnouncementModal onClose={() => setShowSendAnnouncement(false)} />}
      {showScheduleClass && <ScheduleClassModal onClose={() => setShowScheduleClass(false)} />}
      {showUploadMaterial && <UploadMaterialModal onClose={() => setShowUploadMaterial(false)} />}
      {showIssueCertificate && <IssueCertificateModal onClose={() => setShowIssueCertificate(false)} />}
    </div>
  );
}

export default AdminDashboard;
