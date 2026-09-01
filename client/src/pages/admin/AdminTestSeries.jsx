import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, FileText, CheckCircle, Clock, XCircle, MoreVertical, Edit3, Settings } from 'lucide-react';
import './AdminTestSeries.css';

const MOCK_SERIES = [
  { id: 1, name: 'NORCET 2025 Test Series', desc: 'Complete mock tests for AIIMS NORCET 2025.', cat: 'NORCET', tests: 25, duration: '90 mins', status: 'Active', statSub: 'Live', students: 1245, icon: 'FileText', color: '#4f46e5', bg: '#e0e7ff' },
  { id: 2, name: 'RRB Staff Nurse Test Series', desc: 'Section-wise tests and full length mocks for RRB.', cat: 'RRB', tests: 15, duration: '120 mins', status: 'Active', statSub: 'Live', students: 986, icon: 'CheckCircle', color: '#10b981', bg: '#d1fae5' },
  { id: 3, name: 'AIIMS Nursing Officer Mocks', desc: 'High yield questions for AIIMS Nursing Officer exam.', cat: 'AIIMS', tests: 30, duration: '180 mins', status: 'Draft', statSub: 'Not Published', students: 0, icon: 'Clock', color: '#f59e0b', bg: '#fef3c7' }
];

export default function AdminTestSeries() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active': return 'ats-badge green';
      case 'Draft': return 'ats-badge orange';
      default: return 'ats-badge';
    }
  };
  const getStatusDot = (status) => {
    switch (status) {
      case 'Active': return '#10b981';
      case 'Draft': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  return (
    <div className="ats-page">
      <div className="ats-header">
        <div className="ats-header-left">
          <div className="ats-header-title">
            <h1>Test Series</h1>
            <p>Create and manage test series packages</p>
          </div>
        </div>
        <div className="ats-header-right">
          <button className="ats-btn-icon"><Filter size={16} /></button>
          <button className="ats-btn-primary" onClick={() => navigate('/admin/tests/new')}><Plus size={16} /> Create Test Series</button>
        </div>
      </div>

      <div className="ats-metrics">
        <div className="ats-metric-card">
          <div className="ats-mc-icon" style={{background:'#f3e8ff', color:'#8b5cf6'}}><FileText size={24} /></div>
          <div className="ats-mc-body">
            <div className="ats-mc-label">Total Test Series</div>
            <div className="ats-mc-val">12</div>
            <div className="ats-mc-trend">Across all categories</div>
          </div>
        </div>
        <div className="ats-metric-card">
          <div className="ats-mc-icon" style={{background:'#d1fae5', color:'#10b981'}}><CheckCircle size={24} /></div>
          <div className="ats-mc-body">
            <div className="ats-mc-label">Active Series</div>
            <div className="ats-mc-val">9</div>
            <div className="ats-mc-trend">Live for students</div>
          </div>
        </div>
        <div className="ats-metric-card">
          <div className="ats-mc-icon" style={{background:'#eff6ff', color:'#3b82f6'}}><Clock size={24} /></div>
          <div className="ats-mc-body">
            <div className="ats-mc-label">Total Tests</div>
            <div className="ats-mc-val">145</div>
            <div className="ats-mc-trend">Within all series</div>
          </div>
        </div>
        <div className="ats-metric-card">
          <div className="ats-mc-icon" style={{background:'#ffedd5', color:'#f59e0b'}}><XCircle size={24} /></div>
          <div className="ats-mc-body">
            <div className="ats-mc-label">Drafts</div>
            <div className="ats-mc-val">3</div>
            <div className="ats-mc-trend">Not published yet</div>
          </div>
        </div>
      </div>

      <div className="ats-table-container">
        <div className="ats-table-toolbar">
          <div className="ats-tabs">
            <div className={`ats-tab ${activeTab==='All'?'active':''}`} onClick={()=>setActiveTab('All')}>All Series (12)</div>
            <div className={`ats-tab ${activeTab==='Active'?'active':''}`} onClick={()=>setActiveTab('Active')}>Active (9)</div>
            <div className={`ats-tab ${activeTab==='Drafts'?'active':''}`} onClick={()=>setActiveTab('Drafts')}>Drafts (3)</div>
          </div>
          <div className="ats-search">
            <Search size={16} color="#9ca3af" />
            <input type="text" placeholder="Search test series..." />
          </div>
        </div>

        <table className="ats-table">
          <thead>
            <tr>
              <th>Test Series Name</th>
              <th>Category</th>
              <th>Total Tests</th>
              <th>Duration/Test</th>
              <th>Status</th>
              <th>Students</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_SERIES.map((ts) => (
              <tr key={ts.id}>
                <td style={{width: 320}}>
                  <div className="ats-series-cell">
                    <div className="ats-series-icon" style={{background: ts.bg}}>
                      <FileText size={24} color={ts.color} />
                    </div>
                    <div>
                      <div className="ats-series-title">{ts.name}</div>
                      <div className="ats-series-desc">{ts.desc}</div>
                    </div>
                  </div>
                </td>
                <td><span className="ats-cat-badge" style={{color: ts.color, background: ts.bg}}>{ts.cat}</span></td>
                <td><div className="ats-stat-val">{ts.tests}</div><div className="ats-stat-lbl">Tests</div></td>
                <td><div className="ats-stat-val">{ts.duration}</div><div className="ats-stat-lbl">Avg.</div></td>
                <td>
                  <div>
                    <span className={getStatusBadge(ts.status)}>{ts.status}</span>
                    <div className="ats-sub-badge"><div className="ats-dot" style={{background: getStatusDot(ts.status)}}/> {ts.statSub}</div>
                  </div>
                </td>
                <td><div className="ats-stat-val">{ts.students}</div><div className="ats-stat-lbl">Enrolled</div></td>
                <td>
                  <div className="ats-actions-cell">
                    <button className="ats-action-btn"><Edit3 size={16} /></button>
                    <button className="ats-action-btn gray"><MoreVertical size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="ats-pagination">
          <div className="ats-page-info">Showing 1 to 3 of 12 series</div>
          <div className="ats-page-btns">
            <button className="ats-page-btn">{'<'}</button>
            <button className="ats-page-btn active">1</button>
            <button className="ats-page-btn">2</button>
            <button className="ats-page-btn">{'>'}</button>
            <div className="ats-page-limit">10 / page ▼</div>
          </div>
        </div>
      </div>
    </div>
  );
}
