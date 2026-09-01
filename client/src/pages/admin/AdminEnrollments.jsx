import React, { useState } from 'react';
import { Search, Filter, Download, Plus, Users, CheckCircle, FileText, Clock, XCircle, Calendar, Settings, MoreVertical, Eye } from 'lucide-react';
import './AdminEnrollments.css';

const MOCK_DATA = [
  { id: 1, name: 'Riya Sharma', email: 'riya.sharma@email.com', avatar: 'R', course: 'Nursing Fundamentals', type: '- Complete Course', batch: 'May 2024 Batch', date: '20 May 2024', status: 'Active', progress: 78, payment: 'Paid' },
  { id: 2, name: 'Ankit Verma', email: 'ankit.verma@email.com', avatar: 'A', course: 'Nursing Officer', type: 'Foundation', batch: 'May 2024 Batch', date: '18 May 2024', status: 'Active', progress: 45, payment: 'Paid' },
  { id: 3, name: 'Sneha Patel', email: 'sneha.patel@email.com', avatar: 'S', course: 'Staff Nurse', type: 'Crash Course', batch: 'May 2024 Batch', date: '17 May 2024', status: 'Active', progress: 92, payment: 'Paid' },
  { id: 4, name: 'Vikram Singh', email: 'vikram.singh@email.com', avatar: 'V', course: 'Nursing Fundamentals', type: '- Complete Course', batch: 'Apr 2024 Batch', date: '16 Apr 2024', status: 'Completed', progress: 100, payment: 'Paid' },
  { id: 5, name: 'Pooja Mehta', email: 'pooja.mehta@email.com', avatar: 'P', course: 'Medical Surgical', type: 'Nursing', batch: 'Apr 2024 Batch', date: '15 Apr 2024', status: 'Completed', progress: 100, payment: 'Paid' },
  { id: 6, name: 'Rahul Yadav', email: 'rahul.yadav@email.com', avatar: 'R', course: 'Nursing Officer', type: 'Foundation', batch: 'May 2024 Batch', date: '14 May 2024', status: 'Pending', progress: 0, payment: 'Pending' },
  { id: 7, name: 'Neha Gupta', email: 'neha.gupta@email.com', avatar: 'N', course: 'Pediatric Nursing', type: 'Essentials', batch: 'May 2024 Batch', date: '13 May 2024', status: 'Active', progress: 30, payment: 'Paid' },
  { id: 8, name: 'Aman Kumar', email: 'aman.kumar@email.com', avatar: 'A', course: 'Nursing Fundamentals', type: '- Complete Course', batch: 'Apr 2024 Batch', date: '10 Apr 2024', status: 'Cancelled', progress: 15, payment: 'Refunded' },
  { id: 9, name: 'Priya Nair', email: 'priya.nair@email.com', avatar: 'P', course: 'ICU Nursing', type: 'Specialization', batch: 'May 2024 Batch', date: '09 May 2024', status: 'Active', progress: 60, payment: 'Paid' },
  { id: 10, name: 'Saurabh Joshi', email: 'saurabh.joshi@email.com', avatar: 'S', course: 'Nursing Officer', type: 'Foundation', batch: 'May 2024 Batch', date: '08 May 2024', status: 'Active', progress: 20, payment: 'Paid' }
];

export default function AdminEnrollments() {
  const [activeTab, setActiveTab] = useState('All');

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
            <input type="text" placeholder="Search by student name, email, course..." />
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
            <div className="ae-mc-val">3,285</div>
            <div className="ae-mc-trend ae-trend-up">↑ 12.8% vs last month</div>
          </div>
        </div>
        <div className="ae-metric-card">
          <div className="ae-mc-icon" style={{background:'#d1fae5', color:'#10b981'}}><CheckCircle size={24} /></div>
          <div className="ae-mc-body">
            <div className="ae-mc-label">Active Enrollments</div>
            <div className="ae-mc-val">2,620</div>
            <div className="ae-mc-trend ae-trend-up">79.7% of total</div>
          </div>
        </div>
        <div className="ae-metric-card">
          <div className="ae-mc-icon" style={{background:'#eff6ff', color:'#3b82f6'}}><FileText size={24} /></div>
          <div className="ae-mc-body">
            <div className="ae-mc-label">Completed</div>
            <div className="ae-mc-val">458</div>
            <div className="ae-mc-trend ae-trend-up">13.9% of total</div>
          </div>
        </div>
        <div className="ae-metric-card">
          <div className="ae-mc-icon" style={{background:'#ffedd5', color:'#f59e0b'}}><Clock size={24} /></div>
          <div className="ae-mc-body">
            <div className="ae-mc-label">Pending</div>
            <div className="ae-mc-val">152</div>
            <div className="ae-mc-trend ae-trend-neutral">4.6% of total</div>
          </div>
        </div>
        <div className="ae-metric-card">
          <div className="ae-mc-icon" style={{background:'#fee2e2', color:'#ef4444'}}><XCircle size={24} /></div>
          <div className="ae-mc-body">
            <div className="ae-mc-label">Cancelled</div>
            <div className="ae-mc-val">55</div>
            <div className="ae-mc-trend ae-trend-down">1.7% of total</div>
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
            {MOCK_DATA.map((row) => (
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
                    <button className="ae-action-btn"><Eye size={14} /></button>
                    <button className="ae-action-btn"><MoreVertical size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="ae-pagination">
          <div className="ae-page-info">Showing 1 to 10 of 3,285 enrollments</div>
          <div style={{display:'flex', alignItems:'center'}}>
            <div className="ae-page-btns">
              <button className="ae-page-btn">{'<'}</button>
              <button className="ae-page-btn active">1</button>
              <button className="ae-page-btn">2</button>
              <button className="ae-page-btn">3</button>
              <button className="ae-page-btn" style={{border:'none', background:'none'}}>...</button>
              <button className="ae-page-btn">329</button>
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
