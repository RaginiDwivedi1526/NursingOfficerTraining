import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Menu, X, Bell, Search, Calendar, Trophy, Download, 
  BookOpen, Video, BrainCircuit, FileText, Beaker, 
  Activity, CheckCircle2, Bookmark, Award, LayoutDashboard, Target, BarChart3
} from 'lucide-react';
import './StudentLayout.css';

const NAV = [
  { 
    section: '', 
    items: [
      { icon: <LayoutDashboard size={16}/>, label: 'Dashboard', path: '/dashboard' }
    ]
  },
  { 
    section: 'Learn', 
    items: [
      { icon: <Video size={16}/>, label: 'Live Classes', path: '/live-classes', badge: 'LIVE', badgeColor: 'red' },
      { icon: <PlaySquare size={16}/>, label: 'Recorded Classes', path: '/recorded' },
      { icon: <BrainCircuit size={16}/>, label: 'AI Learning', path: '/ai-learning', badge: 'NEW', badgeColor: 'purple' },
      { icon: <BookOpen size={16}/>, label: 'Study Material', path: '/study-material' },
      { icon: <FileText size={16}/>, label: 'Notes', path: '/notes' },
      { icon: <Beaker size={16}/>, label: 'Skill Lab', path: '/skill-lab' },
      { icon: <Activity size={16}/>, label: 'Clinical Cases', path: '/clinical-cases' },
    ]
  },
  { 
    section: 'Practice', 
    items: [
      { icon: <CheckCircle2 size={16}/>, label: 'Test Series', path: '/test-series' },
      { icon: <Target size={16}/>, label: 'Mock Tests', path: '/mock-tests' },
      { icon: <BookOpen size={16}/>, label: 'PYQ Practice', path: '/pyq-practice' },
      { icon: <FileText size={16}/>, label: 'Question Bank', path: '/question-bank' },
      { icon: <CheckCircle2 size={16}/>, label: 'Free Tests', path: '/free-tests' },
    ]
  },
  { 
    section: 'Analyze', 
    items: [
      { icon: <BarChart3 size={16}/>, label: 'Performance', path: '/performance' },
      { icon: <XCircle size={16}/>, label: 'My Mistakes', path: '/mistakes' },
      { icon: <BrainCircuit size={16}/>, label: 'AI Insights', path: '/insights' },
    ]
  },
  { 
    section: 'My Space', 
    items: [
      { icon: <Calendar size={16}/>, label: 'My Plan', path: '/my-plan' },
      { icon: <Bookmark size={16}/>, label: 'Bookmarks', path: '/bookmarks' },
      { icon: <Download size={16}/>, label: 'Downloads', path: '/downloads' },
      { icon: <Award size={16}/>, label: 'Certificates', path: '/certificates' },
    ]
  },
];

// Helper icons missing from lucide import
function PlaySquare({size}) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 8 6 4-6 4Z"/></svg>;
}
function XCircle({size}) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>;
}

export default function StudentLayout({ children }) {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => {
    if (window.innerWidth <= 900) setSidebarOpen(false);
  };

  return (
    <div className="sl-shell">
      {/* Mobile overlay */}
      {sidebarOpen && <div className="al-sidebar-overlay" onClick={() => setSidebarOpen(false)} style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', zIndex:90}}></div>}

      {/* Sidebar */}
      <aside className={`sl-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sl-logo">
          <div className="sl-logo-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M9 12h6M12 9v6"/>
            </svg>
          </div>
          <span className="sl-logo-text">NursingOfficer<br/><span>Training™</span></span>
        </div>

        <nav className="sl-nav">
          {NAV.map((section, idx) => (
            <div key={idx}>
              {section.section && <div className="sl-nav-section-title">{section.section}</div>}
              {section.items.map(item => {
                const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={closeSidebar}
                    className={`sl-nav-item ${isActive ? (item.path === '/dashboard' ? 'active-blue' : 'active') : ''}`}
                  >
                    <span style={{ opacity: isActive ? 1 : 0.7 }}>{item.icon}</span>
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className={`sl-nav-badge badge-${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Mobile App Promo */}
        <div className="sl-app-card">
          <div className="sl-app-title">NursingOfficer Training Mobile App</div>
          <div className="sl-app-sub">Learn, Practice, Succeed.</div>
          <button className="sl-app-btn">Download Now →</button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="sl-main">
        {/* Header */}
        <header className="sl-header">
          <div className="sl-header-left">
            <button className="sl-menu-btn" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="sl-search">
              <Search size={16} color="#94a3b8" />
              <input type="text" placeholder="Search topics, tests, PYQs, classes..." />
            </div>
          </div>
          <div className="sl-header-right">
            <button className="sl-icon-btn"><Calendar size={18} /></button>
            <button className="sl-icon-btn">
              <Bell size={18} />
              <span className="sl-badge-dot">8</span>
            </button>
            <button className="sl-icon-btn"><Trophy size={18} /></button>
            
            <div className="sl-user-profile" onClick={() => navigate('/dashboard')}>
              {user?.profilePhoto ? (
                <img src={user.profilePhoto} alt="Profile" className="sl-user-avatar" />
              ) : (
                <div className="sl-user-avatar-placeholder">{(user?.name || 'S').charAt(0).toUpperCase()}</div>
              )}
              <div className="sl-user-info">
                <div className="sl-user-name" style={{display:'flex', alignItems:'center', gap:4}}>
                  Hi, {user?.name?.split(' ')[0] || 'Student'} <span style={{fontSize:14}}>👋</span>
                </div>
                <div className="sl-user-sub">{user?.examGoal || 'NORCET Aspirant'}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="sl-content">
          {children}
        </main>
      </div>
    </div>
  );
}
