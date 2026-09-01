import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search, Filter, Plus, FileText, CheckCircle, Target, Trophy, MoreVertical, Edit3 } from 'lucide-react';
import './AdminMockTests.css';

export default function AdminMockTests() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const userStr = localStorage.getItem('nursingUser');
      const token = userStr ? JSON.parse(userStr).token : null;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
      const url = baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`;
      const { data } = await axios.get(`${url}/admin/tests`, config);
      setTests(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active': return 'amt-badge green';
      case 'Draft': return 'amt-badge orange';
      default: return 'amt-badge';
    }
  };
  const getStatusDot = (status) => {
    switch (status) {
      case 'Active': return '#10b981';
      case 'Draft': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const renderIcon = (iconName, color) => {
    switch(iconName) {
      case 'Target': return <Target size={24} color={color} />;
      case 'CheckCircle': return <CheckCircle size={24} color={color} />;
      default: return <FileText size={24} color={color} />;
    }
  }

  const filteredTests = tests.filter(t => {
    const matchesSearch = t.title?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="amt-page">
      <div className="amt-header">
        <div className="amt-header-left">
          <div className="amt-header-title">
            <h1>Mock Tests</h1>
            <p>Create and manage individual mock tests</p>
          </div>
        </div>
        <div className="amt-header-right">
          <button className="amt-btn-icon"><Filter size={16} /></button>
          <button className="amt-btn-primary" onClick={() => navigate('/admin/mock-tests/new')}><Plus size={16} /> Create Mock Test</button>
        </div>
      </div>

      <div className="amt-metrics">
        <div className="amt-metric-card">
          <div className="amt-mc-icon" style={{background:'#f3e8ff', color:'#8b5cf6'}}><FileText size={24} /></div>
          <div className="amt-mc-body">
            <div className="amt-mc-label">Total Tests</div>
            <div className="amt-mc-val">{tests.length}</div>
            <div className="amt-mc-trend">Across all categories</div>
          </div>
        </div>
        <div className="amt-metric-card">
          <div className="amt-mc-icon" style={{background:'#d1fae5', color:'#10b981'}}><CheckCircle size={24} /></div>
          <div className="amt-mc-body">
            <div className="amt-mc-label">Active Tests</div>
            <div className="amt-mc-val">{tests.filter(t => t.isActive !== false).length}</div>
            <div className="amt-mc-trend">Live for students</div>
          </div>
        </div>
        <div className="amt-metric-card">
          <div className="amt-mc-icon" style={{background:'#eff6ff', color:'#3b82f6'}}><Target size={24} /></div>
          <div className="amt-mc-body">
            <div className="amt-mc-label">Total Attempts</div>
            <div className="amt-mc-val">12.4k</div>
            <div className="amt-mc-trend">Across all tests</div>
          </div>
        </div>
        <div className="amt-metric-card">
          <div className="amt-mc-icon" style={{background:'#ffedd5', color:'#f59e0b'}}><Trophy size={24} /></div>
          <div className="amt-mc-body">
            <div className="amt-mc-label">Avg. Score</div>
            <div className="amt-mc-val">68%</div>
            <div className="amt-mc-trend">Overall average</div>
          </div>
        </div>
      </div>

      <div className="amt-table-container">
        <div className="amt-table-toolbar">
          <div className="amt-tabs">
            <div className={`amt-tab ${activeTab==='All'?'active':''}`} onClick={()=>setActiveTab('All')}>All Tests ({tests.length})</div>
            <div className={`amt-tab ${activeTab==='Active'?'active':''}`} onClick={()=>setActiveTab('Active')}>Active ({tests.filter(t => t.isActive !== false).length})</div>
            <div className={`amt-tab ${activeTab==='Drafts'?'active':''}`} onClick={()=>setActiveTab('Drafts')}>Drafts ({tests.filter(t => t.isActive === false).length})</div>
            <div className={`amt-tab ${activeTab==='Archived'?'active':''}`} onClick={()=>setActiveTab('Archived')}>Archived (0)</div>
          </div>
          <div className="amt-search">
            <Search size={16} color="#9ca3af" />
            <input 
              type="text" 
              placeholder="Search mock tests..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div style={{padding:40, textAlign:'center'}}>Loading tests...</div>
        ) : (
          <table className="amt-table">
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Category</th>
                <th>Questions</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Students</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTests.map((ts, i) => {
                const statusStr = ts.isActive === false ? 'Draft' : 'Active';
                return (
                  <tr key={ts._id || i}>
                    <td style={{width: 350}}>
                      <div className="amt-test-cell">
                        <div className="amt-test-icon" style={{background: '#e0e7ff'}}>
                          {renderIcon('FileText', '#4f46e5')}
                        </div>
                        <div>
                          <div className="amt-test-title">{ts.title}</div>
                          <div className="amt-test-desc">{ts.description?.substring(0, 50) || 'No description'}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className="amt-cat-badge" style={{color: '#4f46e5', background: '#e0e7ff'}}>{ts.topic || ts.examType}</span></td>
                    <td><div className="amt-stat-val">{ts.questions?.length || 0}</div><div className="amt-stat-lbl">Questions</div></td>
                    <td><div className="amt-stat-val">{ts.duration || 60}</div><div className="amt-stat-lbl">Time limit</div></td>
                    <td>
                      <div>
                        <span className={getStatusBadge(statusStr)}>{statusStr}</span>
                        <div className="amt-sub-badge"><div className="amt-dot" style={{background: getStatusDot(statusStr)}}/> {statusStr === 'Active' ? 'Live' : 'Not Published'}</div>
                      </div>
                    </td>
                    <td><div className="amt-stat-val">0</div><div className="amt-stat-lbl">Attempts</div></td>
                    <td>
                      <div className="amt-actions-cell">
                        <button className="amt-action-btn"><Edit3 size={16} /></button>
                        <button className="amt-action-btn gray"><MoreVertical size={16} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
