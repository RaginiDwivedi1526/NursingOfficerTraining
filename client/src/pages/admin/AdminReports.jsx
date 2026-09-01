import React, { useState } from 'react';
import { Calendar, Download, FileText, Filter, Eye, Database, Activity } from 'lucide-react';
import './AdminReports.css';

import ReportOverview from './ReportOverview';
import ReportUsage from './ReportUsage';
import ReportFinancial from './ReportFinancial';
import ReportLearning from './ReportLearning';

const TABS = ['Overview', 'Usage', 'Financial', 'Learning', 'Engagement', 'Performance', 'Custom Reports'];

export default function AdminReports() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="reports-container">
      {/* HEADER */}
      <div className="reports-header">
        <div className="reports-title">
          <div className="reports-title-icon">
            <Activity size={24} />
          </div>
          <div>
            <h1>Reports</h1>
            <p>Track performance, analyze data and generate insightful reports.</p>
          </div>
        </div>
        <div className="reports-actions">
          <div className="reports-date-picker">
            <Calendar size={16} color="#6b7280" />
            <span>20 May 2024 - 26 May 2024</span>
          </div>
          <button className="reports-export-btn">
            <Download size={16} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* TABS & FILTERS */}
      <div className="reports-tabs-bar">
        <div className="reports-tabs">
          {TABS.map(tab => (
            <div 
              key={tab}
              className={`reports-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
        <div className="reports-filters">
          <select className="reports-select">
            <option>All Categories</option>
            <option>Learning</option>
            <option>Financial</option>
          </select>
          <button className="reports-filter-btn">
            <Filter size={14} /> Filters
          </button>
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className="reports-content-wrapper">
        {activeTab === 'Overview' && <ReportOverview />}
        {activeTab === 'Usage' && <ReportUsage />}
        {activeTab === 'Financial' && <ReportFinancial />}
        {activeTab === 'Learning' && <ReportLearning />}
        {['Engagement', 'Performance', 'Custom Reports'].includes(activeTab) && (
          <div style={{padding:40, textAlign:'center', color:'#6b7280'}}>Content for {activeTab} coming soon!</div>
        )}
      </div>

    </div>
  );
}
