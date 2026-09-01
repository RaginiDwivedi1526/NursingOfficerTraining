import React, { useState } from 'react';
import { Search, Filter, Bookmark, BookOpen, Layers, CheckSquare, Video, FileText, ExternalLink, Trash2, Clock, FolderOpen, Download, Lightbulb, ChevronRight } from 'lucide-react';
import './AdminBookmarks.css';

const MOCK_BOOKMARKS = [
  { id: 1, title: 'Pharmacology - Introduction', desc: 'Basic concepts of pharmacology and drug action', type: 'Topic', course: 'Pharmacology', date: '20 May 2024', time: '10:30 AM', iconColor: '#8b5cf6', iconBg: '#f3e8ff' },
  { id: 2, title: 'AIIMS Nursing Officer Test Series 2024', desc: 'Complete test series for AIIMS NORCET', type: 'Test Series', course: 'AIIMS NORCET 2024', date: '19 May 2024', time: '09:15 AM', iconColor: '#10b981', iconBg: '#d1fae5' },
  { id: 3, title: 'Cardiovascular System - Lecture 03', desc: 'Detailed explanation of heart anatomy', type: 'Live Class', course: 'Anatomy & Physiology', date: '18 May 2024', time: '07:30 PM', iconColor: '#f59e0b', iconBg: '#ffedd5' },
  { id: 4, title: 'Mock Test - Medical Surgical Nursing', desc: 'Full length mock test with solutions', type: 'Mock Test', course: 'Medical Surgical Nursing', date: '17 May 2024', time: '04:20 PM', iconColor: '#3b82f6', iconBg: '#dbeafe' },
  { id: 5, title: 'Nursing Process - Quick Revision Notes', desc: 'Short notes for quick revision', type: 'Study Material', course: 'Nursing Fundamentals', date: '16 May 2024', time: '11:05 AM', iconColor: '#ef4444', iconBg: '#fee2e2' },
  { id: 6, title: 'Fluid & Electrolyte Balance', desc: 'Important concepts and nursing management', type: 'Topic', course: 'Nutrition & Biochemistry', date: '15 May 2024', time: '06:40 PM', iconColor: '#8b5cf6', iconBg: '#f3e8ff' },
  { id: 7, title: 'ESIC Nursing Officer Test Series', desc: 'Subject wise tests and full length tests', type: 'Test Series', course: 'ESIC NORCET', date: '14 May 2024', time: '10:10 AM', iconColor: '#10b981', iconBg: '#d1fae5' },
  { id: 8, title: 'Respiratory System - Full Lecture', desc: 'Complete lecture with important diagrams', type: 'Live Class', course: 'Anatomy & Physiology', date: '13 May 2024', time: '08:50 PM', iconColor: '#f59e0b', iconBg: '#ffedd5' }
];

export default function AdminBookmarks() {
  const [activeTab, setActiveTab] = useState('All');

  const renderIcon = (type, color) => {
    switch (type) {
      case 'Topic': return <BookOpen size={20} color={color} />;
      case 'Test Series': return <Layers size={20} color={color} />;
      case 'Live Class': return <Video size={20} color={color} />;
      case 'Mock Test': return <CheckSquare size={20} color={color} />;
      case 'Study Material': return <FileText size={20} color={color} />;
      default: return <Bookmark size={20} color={color} />;
    }
  };

  const getBadgeStyle = (type) => {
    switch (type) {
      case 'Topic': return { color: '#8b5cf6', background: '#f3e8ff' };
      case 'Test Series': return { color: '#10b981', background: '#d1fae5' };
      case 'Live Class': return { color: '#f59e0b', background: '#ffedd5' };
      case 'Mock Test': return { color: '#3b82f6', background: '#dbeafe' };
      case 'Study Material': return { color: '#ef4444', background: '#fee2e2' };
      default: return { color: '#6b7280', background: '#f3f4f6' };
    }
  };

  return (
    <div className="ab-page">
      <div className="ab-header">
        <div className="ab-header-left">
          <div className="ab-header-icon"><Bookmark size={20} /></div>
          <div className="ab-header-title">
            <h1>Bookmarks</h1>
            <p>Save your important items for quick access</p>
          </div>
        </div>
        <div className="ab-header-right">
          <div className="ab-search">
            <Search size={16} color="#9ca3af" />
            <input type="text" placeholder="Search bookmarks..." />
          </div>
          <button className="ab-btn-outline"><Filter size={16}/> Filter</button>
        </div>
      </div>

      <div className="ab-metrics-row">
        <div className={`ab-metric-pill ${activeTab==='All'?'active':''}`} onClick={()=>setActiveTab('All')}>
          <Bookmark size={20} className="ab-mp-icon" />
          <div className="ab-mp-text">
            <div className="ab-mp-label">All Bookmarks</div>
            <div className="ab-mp-val">128</div>
          </div>
        </div>
        <div className={`ab-metric-pill ${activeTab==='Courses'?'active':''}`} onClick={()=>setActiveTab('Courses')}>
          <BookOpen size={20} className="ab-mp-icon" />
          <div className="ab-mp-text">
            <div className="ab-mp-label">Courses</div>
            <div className="ab-mp-val">42</div>
          </div>
        </div>
        <div className={`ab-metric-pill ${activeTab==='Topics'?'active':''}`} onClick={()=>setActiveTab('Topics')}>
          <Layers size={20} className="ab-mp-icon" />
          <div className="ab-mp-text">
            <div className="ab-mp-label">Topics</div>
            <div className="ab-mp-val">38</div>
          </div>
        </div>
        <div className={`ab-metric-pill ${activeTab==='Tests'?'active':''}`} onClick={()=>setActiveTab('Tests')}>
          <CheckSquare size={20} className="ab-mp-icon" />
          <div className="ab-mp-text">
            <div className="ab-mp-label">Test Series</div>
            <div className="ab-mp-val">21</div>
          </div>
        </div>
        <div className={`ab-metric-pill ${activeTab==='Mock'?'active':''}`} onClick={()=>setActiveTab('Mock')}>
          <CheckSquare size={20} className="ab-mp-icon" />
          <div className="ab-mp-text">
            <div className="ab-mp-label">Mock Tests</div>
            <div className="ab-mp-val">15</div>
          </div>
        </div>
        <div className={`ab-metric-pill ${activeTab==='Live'?'active':''}`} onClick={()=>setActiveTab('Live')}>
          <Video size={20} className="ab-mp-icon" />
          <div className="ab-mp-text">
            <div className="ab-mp-label">Live Classes</div>
            <div className="ab-mp-val">8</div>
          </div>
        </div>
        <div className={`ab-metric-pill ${activeTab==='Material'?'active':''}`} onClick={()=>setActiveTab('Material')}>
          <FileText size={20} className="ab-mp-icon" />
          <div className="ab-mp-text">
            <div className="ab-mp-label">Study Materials</div>
            <div className="ab-mp-val">4</div>
          </div>
        </div>
      </div>

      <div className="ab-layout">
        
        {/* Main Left Column */}
        <div className="ab-table-container">
          <div className="ab-table-title">Bookmarked Items (128)</div>

          <table className="ab-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Type</th>
                <th>Course / Test</th>
                <th>Bookmarked On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_BOOKMARKS.map((item) => (
                <tr key={item.id}>
                  <td style={{width: 320}}>
                    <div className="ab-item-cell">
                      <div className="ab-item-icon" style={{background: item.iconBg}}>
                        {renderIcon(item.type, item.iconColor)}
                      </div>
                      <div>
                        <div className="ab-item-title">{item.title}</div>
                        <div className="ab-item-desc">{item.desc}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="ab-type-badge" style={getBadgeStyle(item.type)}>{item.type}</span>
                  </td>
                  <td>
                    <div className="ab-stat-val" style={{fontSize:13, fontWeight:600}}>{item.course}</div>
                  </td>
                  <td>
                    <div className="ab-stat-val" style={{fontSize:12}}>{item.date}</div>
                    <div className="ab-stat-lbl">{item.time}</div>
                  </td>
                  <td>
                    <div className="ab-actions-cell">
                      <button className="ab-action-btn"><ExternalLink size={14} /></button>
                      <button className="ab-action-btn"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="ab-pagination">
            <div className="ab-page-info">Showing 1 to 8 of 128 bookmarks</div>
            <div className="ab-page-btns">
              <button className="ab-page-btn">{'<'}</button>
              <button className="ab-page-btn active">1</button>
              <button className="ab-page-btn">2</button>
              <button className="ab-page-btn">3</button>
              <button className="ab-page-btn">4</button>
              <button className="ab-page-btn" style={{border:'none', background:'none'}}>...</button>
              <button className="ab-page-btn">16</button>
              <button className="ab-page-btn">{'>'}</button>
              <div className="ab-page-limit">10 / page ▼</div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div>
          
          <div className="ab-card">
            <div className="ab-card-title">Bookmark Overview</div>
            <div className="ab-card-sub">Your saved items at a glance</div>
            
            <div className="ab-doughnut-container">
              <div className="ab-doughnut">
                <div className="ab-doughnut-inner">
                  <span>128</span>
                  <span>Total</span>
                </div>
              </div>
              <div className="ab-legend">
                <div className="ab-legend-item">
                  <div className="ab-legend-label"><div className="ab-legend-dot" style={{background:'#8b5cf6'}}></div> Topics</div>
                  <div className="ab-legend-val">38 (29.7%)</div>
                </div>
                <div className="ab-legend-item">
                  <div className="ab-legend-label"><div className="ab-legend-dot" style={{background:'#3b82f6'}}></div> Courses</div>
                  <div className="ab-legend-val">42 (32.8%)</div>
                </div>
                <div className="ab-legend-item">
                  <div className="ab-legend-label"><div className="ab-legend-dot" style={{background:'#ef4444'}}></div> Test Series</div>
                  <div className="ab-legend-val">21 (16.4%)</div>
                </div>
                <div className="ab-legend-item">
                  <div className="ab-legend-label"><div className="ab-legend-dot" style={{background:'#f59e0b'}}></div> Mock Tests</div>
                  <div className="ab-legend-val">15 (11.7%)</div>
                </div>
                <div className="ab-legend-item">
                  <div className="ab-legend-label"><div className="ab-legend-dot" style={{background:'#10b981'}}></div> Live Classes</div>
                  <div className="ab-legend-val">8 (6.3%)</div>
                </div>
                <div className="ab-legend-item">
                  <div className="ab-legend-label"><div className="ab-legend-dot" style={{background:'#ec4899'}}></div> Materials</div>
                  <div className="ab-legend-val">4 (3.1%)</div>
                </div>
              </div>
            </div>
          </div>

          <div className="ab-card">
            <div className="ab-card-title">Quick Actions</div>
            
            <div className="ab-qa-list" style={{marginTop: 16}}>
              <div className="ab-qa-item">
                <div className="ab-qa-content">
                  <div className="ab-qa-icon"><BookOpen size={16}/></div>
                  <div className="ab-qa-text">
                    <span className="ab-qa-title">View All Bookmarked Items</span>
                    <span className="ab-qa-sub">Browse all your saved items</span>
                  </div>
                </div>
                <ChevronRight size={16} color="#9ca3af"/>
              </div>
              <div className="ab-qa-item">
                <div className="ab-qa-content">
                  <div className="ab-qa-icon"><Clock size={16}/></div>
                  <div className="ab-qa-text">
                    <span className="ab-qa-title">Recently Bookmarked</span>
                    <span className="ab-qa-sub">See items saved in last 7 days</span>
                  </div>
                </div>
                <ChevronRight size={16} color="#9ca3af"/>
              </div>
              <div className="ab-qa-item">
                <div className="ab-qa-content">
                  <div className="ab-qa-icon"><FolderOpen size={16}/></div>
                  <div className="ab-qa-text">
                    <span className="ab-qa-title">Organize Bookmarks</span>
                    <span className="ab-qa-sub">Manage and organize bookmarks</span>
                  </div>
                </div>
                <ChevronRight size={16} color="#9ca3af"/>
              </div>
              <div className="ab-qa-item">
                <div className="ab-qa-content">
                  <div className="ab-qa-icon"><Download size={16}/></div>
                  <div className="ab-qa-text">
                    <span className="ab-qa-title">Export Bookmarks</span>
                    <span className="ab-qa-sub">Download your bookmarks list</span>
                  </div>
                </div>
                <ChevronRight size={16} color="#9ca3af"/>
              </div>
            </div>
          </div>

          <div className="ab-tips-card">
            <div className="ab-tips-title"><Lightbulb size={16} color="#4f46e5"/> Tips</div>
            <div className="ab-tips-body">
              Bookmark important topics, tests, classes and materials for quick access anytime.
            </div>
            <div className="ab-tips-box">
              <span className="ab-tips-box-text">Tip: You can bookmark any topic, test, class or material by clicking on the bookmark icon.</span>
              <Bookmark size={20} color="#8b5cf6" style={{flexShrink:0}}/>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
