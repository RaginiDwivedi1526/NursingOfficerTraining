import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, Award, CheckCircle, Clock, Copy, MoreVertical, Edit3, Image as ImageIcon } from 'lucide-react';
import './AdminCertificates.css';

const MOCK_CERTS = [];

export default function AdminCertificates() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active': return 'acf-badge green';
      case 'Draft': return 'acf-badge orange';
      case 'Inactive': return 'acf-badge gray';
      default: return 'acf-badge';
    }
  };

  return (
    <div className="acf-page">
      <div className="acf-header">
        <div className="acf-header-left">
          <div className="acf-header-title">
            <h1>Certificates</h1>
            <p>Design and manage certificates for students</p>
          </div>
        </div>
        <div className="acf-header-right">
          <button className="acf-btn-icon"><Filter size={16} /></button>
          <button className="acf-btn-primary" onClick={() => navigate('/admin/certificates/new')}><Plus size={16} /> Create Certificate</button>
        </div>
      </div>

      <div className="acf-metrics">
        <div className="acf-metric-card">
          <div className="acf-mc-icon" style={{background:'#f3e8ff', color:'#8b5cf6'}}><Award size={24} /></div>
          <div className="acf-mc-body">
            <div className="acf-mc-label">Total Templates</div>
            <div className="acf-mc-val">12</div>
            <div className="acf-mc-trend">Active designs</div>
          </div>
        </div>
        <div className="acf-metric-card">
          <div className="acf-mc-icon" style={{background:'#d1fae5', color:'#10b981'}}><CheckCircle size={24} /></div>
          <div className="acf-mc-body">
            <div className="acf-mc-label">Total Issued</div>
            <div className="acf-mc-val">4.2k</div>
            <div className="acf-mc-trend">All time</div>
          </div>
        </div>
        <div className="acf-metric-card">
          <div className="acf-mc-icon" style={{background:'#eff6ff', color:'#3b82f6'}}><Clock size={24} /></div>
          <div className="acf-mc-body">
            <div className="acf-mc-label">Issued This Month</div>
            <div className="acf-mc-val">345</div>
            <div className="acf-mc-trend">Across all courses</div>
          </div>
        </div>
        <div className="acf-metric-card">
          <div className="acf-mc-icon" style={{background:'#ffedd5', color:'#f59e0b'}}><ImageIcon size={24} /></div>
          <div className="acf-mc-body">
            <div className="acf-mc-label">Custom Designs</div>
            <div className="acf-mc-val">3</div>
            <div className="acf-mc-trend">Uploaded templates</div>
          </div>
        </div>
      </div>

      <div className="acf-table-container">
        <div className="acf-table-toolbar">
          <div className="acf-tabs">
            <div className={`acf-tab ${activeTab==='All'?'active':''}`} onClick={()=>setActiveTab('All')}>All Certificates</div>
            <div className={`acf-tab ${activeTab==='Active'?'active':''}`} onClick={()=>setActiveTab('Active')}>Active</div>
            <div className={`acf-tab ${activeTab==='Drafts'?'active':''}`} onClick={()=>setActiveTab('Drafts')}>Drafts</div>
          </div>
          <div className="acf-search">
            <Search size={16} color="#9ca3af" />
            <input type="text" placeholder="Search certificates..."
              value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
        </div>

        <table className="acf-table">
          <thead>
            <tr>
              <th>Certificate Title</th>
              <th>Course / Event</th>
              <th>Template Type</th>
              <th>Issued</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_CERTS.filter(cert =>
              cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              cert.course.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((cert) => (
              <tr key={cert.id}>
                <td style={{width: 320}}>
                  <div className="acf-cert-cell">
                    <div className="acf-cert-icon" style={{background: cert.bg}}>
                      <Award size={24} color={cert.color} />
                    </div>
                    <div>
                      <div className="acf-cert-title">{cert.title}</div>
                      <div className="acf-cert-desc">{cert.type}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="acf-stat-val" style={{fontSize:13, fontWeight:600}}>{cert.course}</div>
                </td>
                <td>
                  <span className="acf-cat-badge">{cert.template}</span>
                </td>
                <td><div className="acf-stat-val">{cert.issued}</div><div className="acf-stat-lbl">Students</div></td>
                <td><span className={getStatusBadge(cert.status)}>{cert.status}</span></td>
                <td>
                  <div className="acf-actions-cell">
                    <button className="acf-action-btn"><Edit3 size={16} /></button>
                    <button className="acf-action-btn gray"><Copy size={16} /></button>
                    <button className="acf-action-btn gray"><MoreVertical size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="acf-pagination">
          <div className="acf-page-info">Showing 1 to 3 of 12 certificates</div>
          <div className="acf-page-btns">
            <button className="acf-page-btn">{'<'}</button>
            <button className="acf-page-btn active">1</button>
            <button className="acf-page-btn">2</button>
            <button className="acf-page-btn">{'>'}</button>
            <div className="acf-page-limit">10 / page ▼</div>
          </div>
        </div>
      </div>
    </div>
  );
}
