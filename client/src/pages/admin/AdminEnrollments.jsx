import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, Download, Plus, Users, CheckCircle, FileText, Clock, XCircle, Calendar, Settings, MoreVertical, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './AdminEnrollments.css';

export default function AdminEnrollments() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const userStr = localStorage.getItem('nursingUser');
        const token = userStr ? JSON.parse(userStr).token : null;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
        const url = baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`;
        
        const { data } = await axios.get(`${url}/admin/users`, config);
        
        // Flatten users into individual course enrollments
        let allEnrollments = [];
        data.forEach(user => {
          if (user.role !== 'admin' && user.enrolledCourses && user.enrolledCourses.length > 0) {
            user.enrolledCourses.forEach((courseName, idx) => {
              allEnrollments.push({
                id: `${user._id}-${idx}`,
                userId: user._id,
                name: user.name,
                email: user.email,
                avatar: user.profilePhoto ? <img src={user.profilePhoto} alt=""/> : user.name.charAt(0).toUpperCase(),
                course: courseName,
                type: 'Complete Course',
                batch: user.batch || 'Batch 2025',
                date: new Date(user.createdAt).toLocaleDateString('en-GB', {day:'2-digit', month:'short', year:'numeric'}),
                status: user.status || 'Active', // Default active
                progress: Math.floor(Math.random() * 40) + 60, // Mock progress for now
                payment: 'Paid' // Mock payment status for now
              });
            });
          }
        });
        
        setEnrollments(allEnrollments);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEnrollments();
  }, []);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Active': return 'ae-badge green';
      case 'Completed': return 'ae-badge blue';
      case 'Pending': return 'ae-badge orange';
      case 'Cancelled': return 'ae-badge red';
      default: return 'ae-badge';
    }
  };
  
  const getPaymentBadgeClass = (status) => {
    switch (status) {
      case 'Paid': return 'ae-badge green';
      case 'Pending': return 'ae-badge orange';
      case 'Refunded': return 'ae-badge blue';
      default: return 'ae-badge';
    }
  };

  return (
    <div className="ae-page">
      {/* Header */}
      <div className="ae-header">
        <div className="ae-header-left">
          <h1>Enrollments</h1>
          <p>Manage and track all course enrollments.</p>
        </div>
        <div className="ae-header-right">
          <div className="ae-search">
            <Search size={16} color="#9ca3af" />
            <input type="text" placeholder="Search by student name, email, course..."
              value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <button className="ae-btn-outline"><Filter size={16} /> Filters</button>
          <button className="ae-btn-outline"><Download size={16} /> Export</button>
          <button className="ae-btn-primary"><Plus size={16} /> New Enrollment</button>
        </div>
      </div>

      {/* Metrics */}
      <div className="ae-metrics">
        <div className="ae-metric-card">
          <div className="ae-mc-icon" style={{background:'#f3e8ff', color:'#8b5cf6'}}><Users size={24} /></div>
          <div className="ae-mc-body">
            <div className="ae-mc-label">Total Enrollments</div>
            <div className="ae-mc-val">{enrollments.length}</div>
            <div className="ae-mc-trend ae-trend-neutral">Genuine Data</div>
          </div>
        </div>
        <div className="ae-metric-card">
          <div className="ae-mc-icon" style={{background:'#d1fae5', color:'#10b981'}}><CheckCircle size={24} /></div>
          <div className="ae-mc-body">
            <div className="ae-mc-label">Active Enrollments</div>
            <div className="ae-mc-val">{enrollments.filter(e => e.status === 'Active').length}</div>
            <div className="ae-mc-trend ae-trend-neutral">Genuine Data</div>
          </div>
        </div>
        <div className="ae-metric-card">
          <div className="ae-mc-icon" style={{background:'#eff6ff', color:'#3b82f6'}}><FileText size={24} /></div>
          <div className="ae-mc-body">
            <div className="ae-mc-label">Completed</div>
            <div className="ae-mc-val">{enrollments.filter(e => e.status === 'Completed').length}</div>
            <div className="ae-mc-trend ae-trend-neutral">Genuine Data</div>
          </div>
        </div>
        <div className="ae-metric-card">
          <div className="ae-mc-icon" style={{background:'#ffedd5', color:'#f59e0b'}}><Clock size={24} /></div>
          <div className="ae-mc-body">
            <div className="ae-mc-label">Pending</div>
            <div className="ae-mc-val">{enrollments.filter(e => e.status === 'Pending').length}</div>
            <div className="ae-mc-trend ae-trend-neutral">Genuine Data</div>
          </div>
        </div>
        <div className="ae-metric-card">
          <div className="ae-mc-icon" style={{background:'#fee2e2', color:'#ef4444'}}><XCircle size={24} /></div>
          <div className="ae-mc-body">
            <div className="ae-mc-label">Cancelled</div>
            <div className="ae-mc-val">{enrollments.filter(e => e.status === 'Cancelled').length}</div>
            <div className="ae-mc-trend ae-trend-neutral">Genuine Data</div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="ae-filters-bar">
        <div className="ae-filter-group">
          <label className="ae-filter-label">Course</label>
          <select className="ae-filter-input"><option>All Courses</option></select>
        </div>
        <div className="ae-filter-group">
          <label className="ae-filter-label">Batch</label>
          <select className="ae-filter-input"><option>All Batches</option></select>
        </div>
        <div className="ae-filter-group">
          <label className="ae-filter-label">Enrollment Status</label>
          <select className="ae-filter-input"><option>All Status</option></select>
        </div>
        <div className="ae-filter-group">
          <label className="ae-filter-label">Date Range</label>
          <div style={{position:'relative', display:'flex', alignItems:'center'}}>
            <span style={{position:'absolute', left:12, color:'#9ca3af'}}><Calendar size={14}/></span>
            <input type="text" className="ae-filter-input" style={{paddingLeft:32}} defaultValue="01 May 2024 - 28 May 2024" />
          </div>
        </div>
        <button className="ae-filter-clear">Clear All</button>
      </div>

      {/* Table Container */}
      <div className="ae-table-container">
        <div className="ae-table-toolbar">
          <div className="ae-tabs">
            <div className={`ae-tab ${activeTab==='All'?'active':''}`} onClick={()=>setActiveTab('All')}>
              All Enrollments <span className="ae-tab-count">(3,285)</span>
            </div>
            <div className={`ae-tab ${activeTab==='Active'?'active':''}`} onClick={()=>setActiveTab('Active')}>
              Active <span className="ae-tab-count">(2,620)</span>
            </div>
            <div className={`ae-tab ${activeTab==='Completed'?'active':''}`} onClick={()=>setActiveTab('Completed')}>
              Completed <span className="ae-tab-count">(458)</span>
            </div>
            <div className={`ae-tab ${activeTab==='Pending'?'active':''}`} onClick={()=>setActiveTab('Pending')}>
              Pending <span className="ae-tab-count">(152)</span>
            </div>
            <div className={`ae-tab ${activeTab==='Cancelled'?'active':''}`} onClick={()=>setActiveTab('Cancelled')}>
              Cancelled <span className="ae-tab-count">(55)</span>
            </div>
          </div>
          <div className="ae-bulk">
            <select className="ae-bulk-select">
              <option>Bulk Actions</option>
            </select>
            <button className="ae-btn-icon"><Settings size={16}/></button>
          </div>
        </div>

        <table className="ae-table">
          <thead>
            <tr>
              <th style={{width: 40}}><input type="checkbox" className="ae-cb" /></th>
              <th>Student</th>
              <th>Course</th>
              <th>Batch</th>
              <th>Enrollment Date</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="9" style={{textAlign:'center', padding:20}}>Loading enrollments...</td></tr>
            ) : enrollments.length === 0 ? (
              <tr><td colSpan="9" style={{textAlign:'center', padding:20}}>No enrollments found.</td></tr>
            ) : (
              enrollments.filter(row =>
                row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                row.course.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((row) => (
                <tr key={row.id}>
                  <td><input type="checkbox" className="ae-cb" /></td>
                  <td>
                    <div className="ae-student-cell">
                      <div className="ae-avatar">
                        {row.avatar}
                      </div>
                      <div>
                        <div className="ae-stu-name">{row.name}</div>
                        <div className="ae-stu-email">{row.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="ae-course-name">{row.course}</div>
                    <div className="ae-course-type">{row.type}</div>
                  </td>
                  <td><div style={{fontSize:12}}>{row.batch}</div></td>
                  <td><div style={{fontSize:12, fontWeight:500}}>{row.date}</div></td>
                  <td><span className={getStatusBadgeClass(row.status)}>{row.status}</span></td>
                  <td>
                    <div className="ae-progress-val">{row.progress}%</div>
                    <div className="ae-progress-track"><div className="ae-progress-fill" style={{width:`${row.progress}%`}}/></div>
                  </td>
                  <td><span className={getPaymentBadgeClass(row.payment)}>{row.payment}</span></td>
                  <td>
                    <div className="ae-actions-cell">
                      <button className="ae-action-btn" onClick={() => navigate(`/admin/student/${row.userId}`)}><Eye size={14} /></button>
                      <button className="ae-action-btn"><MoreVertical size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="ae-pagination">
          <div className="ae-page-info">Showing 1 to {Math.min(10, enrollments.length)} of {enrollments.length} enrollments</div>
          <div style={{display:'flex', alignItems:'center'}}>
            <div className="ae-page-btns">
              <button className="ae-page-btn">{'<'}</button>
              <button className="ae-page-btn active">1</button>
              <button className="ae-page-btn">{'>'}</button>
            </div>
            <div className="ae-per-page">
              Show
              <select><option>10</option></select>
              per page
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
