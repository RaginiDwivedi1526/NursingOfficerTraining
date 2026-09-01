import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, Bell, Phone, Search, ChevronDown, ExternalLink } from 'lucide-react';
import './AdminLayout.css';

const NAV = [
  { section:'MANAGE', items:[
    { icon:'🏠', label:'Dashboard',        path:'/admin'                        },
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
    { icon:'🤖', label:'AI Insights',      path:'/admin/ai-insights'            },
  ]},
  { section:'ENGAGEMENT', items:[
    { icon:'📢', label:'Announcements',    path:'/admin/announcements'           },
    { icon:'💬', label:'Messages',         path:'/admin/messages'               },
    { icon:'⭐', label:'Reviews & Feedback',path:'/admin/reviews'                },
  ]},
  { section:'REPORTS AND ANALYTICS', items:[
    { icon:'📄', label:'Reports',        path:'/admin/reports'                  },
    { icon:'📊', label:'Analytics',      path:'/admin/analytics'                },
    { icon:'🤖', label:'AI Reports',     path:'/admin/ai-reports'               },
  ]},
];

export default function AdminLayout({ children }) {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => { 
    logoutUser(); 
    navigate('/admin/login'); 
  };

  const closeSidebar = () => {
    if (window.innerWidth <= 900) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="al-shell">
      
      {/* Mobile overlay */}
      {sidebarOpen && <div className="al-sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

      {/* ══════════════════════════════════════
          SIDEBAR
          ══════════════════════════════════════ */}
      <aside className={`al-sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="al-logo">
          <div className="al-logo-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M9 12h6M12 9v6"/>
            </svg>
          </div>
          <span className="al-logo-text">NursingOfficer<br/><span>Training™</span></span>
          <button className="al-sidebar-close-btn" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="al-nav">
          {NAV.map(section => (
            <div key={section.section} className="al-nav-section">
              <div className="al-nav-section-title">{section.section}</div>
              {section.items.map(item => {
                const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={closeSidebar}
                    className={`al-nav-item ${isActive ? ' active' : ''}`}
                  >
                    <span style={{ fontSize:15 }}>{item.icon}</span>
                    <span>{item.label}</span>
                    {item.badge && <span className="al-nav-badge">{item.badge}</span>}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* View Website */}
        <button className="al-view-site-btn" onClick={() => window.open('/', '_blank')}>
          <ExternalLink size={16} />
          <span>View Website</span>
        </button>
      </aside>

      {/* ══════════════════════════════════════
          TOPBAR
          ══════════════════════════════════════ */}
      <div className="al-main-wrapper">
        <header className="al-topbar">
          
          {/* Hamburger menu for mobile */}
          <button className="al-menu-btn" onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>

          <div className="al-topbar-left">
            <div className="al-topbar-title">Admin Panel</div>
          </div>

          <div className="al-search">
            <span className="al-search-icon"><Search size={14} /></span>
            <input type="text" placeholder="Search..." />
          </div>

          <div className="al-topbar-actions">
            <button className="al-icon-btn" title="Call"><Phone size={15} /></button>
            <button className="al-icon-btn" title="Notifications">
              <Bell size={15} />
              <span className="al-notif-dot" />
            </button>

            {/* Admin chip */}
            <div className="al-admin-chip" onClick={handleLogout} title="Logout">
              <div className="al-admin-avatar">
                {(user?.name ?? 'A').charAt(0).toUpperCase()}
              </div>
              <div className="al-admin-info">
                <div className="al-admin-name">{user?.name ?? 'Admin'}</div>
                <div className="al-admin-role">Site Admin</div>
              </div>
              <ChevronDown size={12} className="al-admin-chevron" color="#9ca3af" />
            </div>
          </div>
        </header>

        {/* ══════════════════════════════════════
            MAIN CONTENT
            ══════════════════════════════════════ */}
        <main className="al-content">
          {children}
        </main>
      </div>
    </div>
  );
}
