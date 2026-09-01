import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Megaphone, Plus, Download, Send, Calendar, Archive, Users, Filter, Eye, Edit3, MoreVertical, Edit, BookOpen, Layers, Settings, Gift, ChevronRight, Activity } from 'lucide-react';
import './AdminAnnouncements.css';

const MOCK_DATA = [
  { id: 1, title: 'Live Class on Pharmacology', isNew: true, desc: 'Join our live session on "Antibiotics Overview" tomorrow at 7:00 PM.', cat: 'Live Class', audience: 'All Students', status: 'Published', date: '22 May 2024', time: '10:30 AM', icon: 'Calendar', iconColor: '#8b5cf6', iconBg: '#f3e8ff', badgeC: '#8b5cf6', badgeBg: '#f3e8ff' },
  { id: 2, title: 'New Course: Medical Surgical Nursing', isNew: false, desc: 'The complete course is now live. Enroll and start learning today!', cat: 'New Course', audience: 'All Students', status: 'Published', date: '21 May 2024', time: '09:15 AM', icon: 'BookOpen', iconColor: '#10b981', iconBg: '#d1fae5', badgeC: '#10b981', badgeBg: '#d1fae5' },
  { id: 3, title: 'Test Series Update', isNew: false, desc: '10 new mock tests have been added in the Test Series section.', cat: 'Test Update', audience: 'Enrolled Students', status: 'Published', date: '20 May 2024', time: '04:45 PM', icon: 'Layers', iconColor: '#f59e0b', iconBg: '#ffedd5', badgeC: '#f59e0b', badgeBg: '#ffedd5' },
  { id: 4, title: 'Maintenance Downtime', isNew: false, desc: 'Our platform will be under maintenance on 25 May from 01:00 AM to 03:00 AM.', cat: 'System Update', audience: 'All Users', status: 'Scheduled', date: '25 May 2024', time: '01:00 AM', icon: 'Settings', iconColor: '#3b82f6', iconBg: '#dbeafe', badgeC: '#3b82f6', badgeBg: '#dbeafe' },
  { id: 5, title: 'Scholarship Program 2024', isNew: false, desc: 'Apply now for the Nursing Excellence Scholarship. Limited seats!', cat: 'General', audience: 'All Students', status: 'Draft', date: '-', time: '-', icon: 'Gift', iconColor: '#ec4899', iconBg: '#fce7f3', badgeC: '#ec4899', badgeBg: '#fce7f3' }
];

export default function AdminAnnouncements() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');

  const renderIcon = (name, color) => {
    switch(name) {
      case 'Calendar': return <Calendar size={18} color={color}/>;
      case 'BookOpen': return <BookOpen size={18} color={color}/>;
      case 'Layers': return <Layers size={18} color={color}/>;
      case 'Settings': return <Settings size={18} color={color}/>;
      case 'Gift': return <Gift size={18} color={color}/>;
      default: return <Megaphone size={18} color={color}/>;
    }
  };

  const getStatusColor = (status) => {
    if (status === 'Published') return '#10b981';
    if (status === 'Scheduled') return '#f59e0b';
    return '#9ca3af';
  };

  return (
    <div className="aa-page">
      <div className="aa-header">
        <div className="aa-header-left">
          <div className="aa-header-icon"><Megaphone size={20} /></div>
          <div className="aa-header-title">
            <h1>Announcements</h1>
            <p>Share important updates and keep your students, faculty & team informed.</p>
          </div>
        </div>
        <div className="aa-header-right">
          <button className="aa-btn-primary" onClick={() => navigate('/admin/announcements/new')}><Plus size={16}/> Create Announcement</button>
          <button className="aa-btn-outline"><Download size={16}/> Export</button>
        </div>
      </div>

      <div className="aa-metrics">
        <div className="aa-metric-card" style={{border: '1px solid #c7d2fe', background:'#fdfcff'}}>
          <div className="aa-mc-icon" style={{color:'#8b5cf6', background:'#f3e8ff', border:'none'}}><Megaphone size={20} /></div>
          <div className="aa-mc-body">
            <div className="aa-mc-label">Total Announcements</div>
            <div className="aa-mc-val">28</div>
            <div className="aa-mc-trend">All time</div>
          </div>
        </div>
        <div className="aa-metric-card">
          <div className="aa-mc-icon" style={{color:'#10b981', background:'#d1fae5', border:'none'}}><Send size={20} /></div>
          <div className="aa-mc-body">
            <div className="aa-mc-label">Published</div>
            <div className="aa-mc-val">22</div>
            <div className="aa-mc-trend">Active announcements</div>
          </div>
        </div>
        <div className="aa-metric-card">
          <div className="aa-mc-icon" style={{color:'#f59e0b', background:'#ffedd5', border:'none'}}><Calendar size={20} /></div>
          <div className="aa-mc-body">
            <div className="aa-mc-label">Scheduled</div>
            <div className="aa-mc-val">4</div>
            <div className="aa-mc-trend">Upcoming announcements</div>
          </div>
        </div>
        <div className="aa-metric-card">
          <div className="aa-mc-icon" style={{color:'#3b82f6', background:'#dbeafe', border:'none'}}><Archive size={20} /></div>
          <div className="aa-mc-body">
            <div className="aa-mc-label">Drafts</div>
            <div className="aa-mc-val">2</div>
            <div className="aa-mc-trend">Not published</div>
          </div>
        </div>
        <div className="aa-metric-card">
          <div className="aa-mc-icon" style={{color:'#ec4899', background:'#fce7f3', border:'none'}}><Users size={20} /></div>
          <div className="aa-mc-body">
            <div className="aa-mc-label">Reach (This Month)</div>
            <div className="aa-mc-val">12,458</div>
            <div className="aa-mc-trend" style={{display:'flex', alignItems:'center', gap:4, color:'#10b981'}}><Activity size={12}/> 18.6% vs last month</div>
          </div>
        </div>
      </div>

      <div className="aa-layout">
        
        {/* Main Left Column */}
        <div>
          <div className="aa-table-container">
            <div className="aa-table-toolbar">
              <div className="aa-tabs">
                <div className={`aa-tab ${activeTab==='All'?'active':''}`} onClick={()=>setActiveTab('All')}>All Announcements</div>
                <div className={`aa-tab ${activeTab==='Published'?'active':''}`} onClick={()=>setActiveTab('Published')}>Published</div>
                <div className={`aa-tab ${activeTab==='Scheduled'?'active':''}`} onClick={()=>setActiveTab('Scheduled')}>Scheduled</div>
                <div className={`aa-tab ${activeTab==='Drafts'?'active':''}`} onClick={()=>setActiveTab('Drafts')}>Drafts</div>
                <div className={`aa-tab ${activeTab==='Archived'?'active':''}`} onClick={()=>setActiveTab('Archived')}>Archived</div>
              </div>
              
              <div className="aa-toolbar-actions">
                <select className="aa-select"><option>All Categories</option></select>
                <select className="aa-select"><option>20 May 2024 - 26 May 2024</option></select>
                <button className="aa-btn-outline"><Filter size={16}/> Filters</button>
              </div>
            </div>

            <table className="aa-table">
              <thead>
                <tr>
                  <th>Announcement</th>
                  <th>Category</th>
                  <th>Audience</th>
                  <th>Status</th>
                  <th>Published / Scheduled</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_DATA.map((item) => (
                  <tr key={item.id}>
                    <td style={{width: 300}}>
                      <div className="aa-item-cell">
                        <div className="aa-item-icon" style={{background: item.iconBg}}>
                          {renderIcon(item.icon, item.iconColor)}
                        </div>
                        <div>
                          <div className="aa-item-title">
                            {item.title} {item.isNew && <span className="aa-new-badge">NEW</span>}
                          </div>
                          <div className="aa-item-desc">{item.desc}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="aa-cat-badge" style={{color: item.badgeC, background: item.badgeBg}}>{item.cat}</span>
                    </td>
                    <td><div className="aa-stat-val">{item.audience}</div></td>
                    <td>
                      <div className="aa-status-badge" style={{color: getStatusColor(item.status)}}>
                        <div className="aa-status-dot" style={{background: getStatusColor(item.status)}}></div>
                        {item.status}
                      </div>
                    </td>
                    <td>
                      <div className="aa-stat-val" style={{fontSize:12}}>{item.date}</div>
                      <div className="aa-stat-lbl">{item.time}</div>
                    </td>
                    <td>
                      <div className="aa-actions-cell">
                        <button className="aa-action-btn"><Eye size={14} /></button>
                        <button className="aa-action-btn"><Edit3 size={14} /></button>
                        <button className="aa-action-btn"><MoreVertical size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="aa-insights-card">
            <div className="aa-insights-header">
              <div className="aa-insights-title">Announcement Insights (This Month)</div>
              <button className="aa-btn-outline" style={{color:'#4f46e5', borderColor:'#e0e7ff'}}>View Full Report</button>
            </div>
            
            <div className="aa-insights-metrics">
              <div className="aa-im-col">
                <div className="aa-im-label">Total Impressions</div>
                <div className="aa-im-val">24,568</div>
                <div className="aa-im-trend"><Activity size={10}/> 16.4%</div>
              </div>
              <div className="aa-im-col">
                <div className="aa-im-label">Total Clicks</div>
                <div className="aa-im-val">6,214</div>
                <div className="aa-im-trend"><Activity size={10}/> 22.7%</div>
              </div>
              <div className="aa-im-col">
                <div className="aa-im-label">Average CTR</div>
                <div className="aa-im-val">25.31%</div>
                <div className="aa-im-trend"><Activity size={10}/> 5.3%</div>
              </div>
            </div>

            <div className="aa-chart-placeholder">
              {/* Mock simple SVG line chart */}
              <svg width="100%" height="100%" viewBox="0 0 500 160" preserveAspectRatio="none">
                <linearGradient id="aa-gradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0"/>
                </linearGradient>
                <path className="aa-chart-area" d="M0 120 L100 80 L200 130 L300 40 L400 90 L500 20 L500 160 L0 160 Z" />
                <path className="aa-chart-line" d="M0 120 L100 80 L200 130 L300 40 L400 90 L500 20" />
                <circle cx="0" cy="120" r="4" className="aa-chart-dot"/>
                <circle cx="100" cy="80" r="4" className="aa-chart-dot"/>
                <circle cx="200" cy="130" r="4" className="aa-chart-dot"/>
                <circle cx="300" cy="40" r="4" className="aa-chart-dot"/>
                <circle cx="400" cy="90" r="4" className="aa-chart-dot"/>
                <circle cx="500" cy="20" r="4" className="aa-chart-dot"/>
              </svg>
              <div style={{position:'absolute', bottom:10, left:20, fontSize:10, color:'#9ca3af'}}>20 May</div>
              <div style={{position:'absolute', bottom:10, right:20, fontSize:10, color:'#9ca3af'}}>26 May</div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div>
          
          <div className="aa-card">
            <div className="aa-card-title">Quick Actions</div>
            
            <div className="aa-qa-list">
              <div className="aa-qa-item" onClick={() => navigate('/admin/announcements/new')}>
                <div className="aa-qa-content">
                  <div className="aa-qa-icon"><Edit size={16}/></div>
                  <div className="aa-qa-text">
                    <span className="aa-qa-title">Create Announcement</span>
                    <span className="aa-qa-sub">Publish a new announcement</span>
                  </div>
                </div>
                <ChevronRight size={16} color="#9ca3af"/>
              </div>
              <div className="aa-qa-item">
                <div className="aa-qa-content">
                  <div className="aa-qa-icon"><Calendar size={16}/></div>
                  <div className="aa-qa-text">
                    <span className="aa-qa-title">Schedule Announcement</span>
                    <span className="aa-qa-sub">Plan for future updates</span>
                  </div>
                </div>
                <ChevronRight size={16} color="#9ca3af"/>
              </div>
              <div className="aa-qa-item">
                <div className="aa-qa-content">
                  <div className="aa-qa-icon"><BookOpen size={16}/></div>
                  <div className="aa-qa-text">
                    <span className="aa-qa-title">Announcement Templates</span>
                    <span className="aa-qa-sub">Use ready-to-use templates</span>
                  </div>
                </div>
                <ChevronRight size={16} color="#9ca3af"/>
              </div>
              <div className="aa-qa-item">
                <div className="aa-qa-content">
                  <div className="aa-qa-icon"><Activity size={16}/></div>
                  <div className="aa-qa-text">
                    <span className="aa-qa-title">View Analytics</span>
                    <span className="aa-qa-sub">See announcement performance</span>
                  </div>
                </div>
                <ChevronRight size={16} color="#9ca3af"/>
              </div>
            </div>
          </div>

          <div className="aa-top-announcement">
            <div className="aa-ta-header">
              <div className="aa-card-title" style={{margin:0}}>Top Announcement (This Month)</div>
            </div>
            <div className="aa-ta-info">
              <div className="aa-ta-icon"><Megaphone size={18}/></div>
              <div className="aa-ta-text">
                <div className="aa-ta-title">Live Class on Pharmacology</div>
                <div className="aa-ta-date">22 May 2024</div>
              </div>
              <div style={{marginLeft:'auto'}}>
                <span className="aa-ta-badge">Published</span>
              </div>
            </div>
            
            <div className="aa-ta-stats">
              <div className="aa-ta-stat-col">
                <span className="aa-ta-stat-lbl">Impressions</span>
                <span className="aa-ta-stat-val">8,452</span>
              </div>
              <div className="aa-ta-stat-col" style={{borderLeft:'1px solid #dcfce7', borderRight:'1px solid #dcfce7'}}>
                <span className="aa-ta-stat-lbl">Clicks</span>
                <span className="aa-ta-stat-val">2,145</span>
              </div>
              <div className="aa-ta-stat-col">
                <span className="aa-ta-stat-lbl">CTR</span>
                <span className="aa-ta-stat-val">25.36%</span>
              </div>
            </div>
          </div>

          <div className="aa-card">
            <div className="aa-card-title">
              Categories
              <span className="aa-view-link" style={{fontSize:12}}>View All</span>
            </div>
            
            <div className="aa-cat-list">
              <div className="aa-cat-item">
                <div className="aa-cat-label"><div className="aa-cat-dot" style={{background:'#8b5cf6'}}></div> Live Class</div>
                <div className="aa-cat-count">6</div>
              </div>
              <div className="aa-cat-item">
                <div className="aa-cat-label"><div className="aa-cat-dot" style={{background:'#10b981'}}></div> New Course</div>
                <div className="aa-cat-count">5</div>
              </div>
              <div className="aa-cat-item">
                <div className="aa-cat-label"><div className="aa-cat-dot" style={{background:'#f59e0b'}}></div> Test Update</div>
                <div className="aa-cat-count">4</div>
              </div>
              <div className="aa-cat-item">
                <div className="aa-cat-label"><div className="aa-cat-dot" style={{background:'#3b82f6'}}></div> System Update</div>
                <div className="aa-cat-count">3</div>
              </div>
              <div className="aa-cat-item">
                <div className="aa-cat-label"><div className="aa-cat-dot" style={{background:'#ec4899'}}></div> General</div>
                <div className="aa-cat-count">10</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
