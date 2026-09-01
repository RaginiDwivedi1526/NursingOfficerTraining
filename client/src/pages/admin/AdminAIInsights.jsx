import React, { useState } from 'react';
import { Sparkles, Calendar, Download, Users, UserPlus, Activity, CheckSquare, IndianRupee } from 'lucide-react';
import './AdminAIInsights.css';
import InsightsOverview from './InsightsOverview';
import InsightsStudents from './InsightsStudents';
// import InsightsCourses from './InsightsCourses';
import InsightsTests from './InsightsTests';
// import InsightsEngagement from './InsightsEngagement';
import InsightsRevenue from './InsightsRevenue';

export default function AdminAIInsights() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="aii-page">
      <div className="aii-header">
        <div className="aii-header-left">
          <div className="aii-header-icon"><Sparkles size={20} /></div>
          <div className="aii-header-title">
            <h1>AI Insights</h1>
            <p>Smart insights and recommendations to grow your training business</p>
          </div>
        </div>
        <div className="aii-header-right">
          <button className="aii-btn-outline"><Calendar size={14}/> 20 May 2024 - 26 May 2024</button>
          <button className="aii-btn-outline"><Download size={14}/> Export Report</button>
        </div>
      </div>

      {activeTab !== 'Tests' && (
        <div className="aii-metrics">
          <div className="aii-metric-card" style={{border: activeTab==='Students'?'1px solid #c7d2fe':''}}>
            <div className="aii-mc-icon" style={{color:'#8b5cf6', background:'#f3e8ff'}}><Users size={20} /></div>
            <div className="aii-mc-body">
              <div className="aii-mc-label">Total Students</div>
              <div className="aii-mc-val">12,548</div>
              <div className="aii-mc-trend" style={{color:'#8b5cf6'}}>↑ 12.4% vs last 7 days</div>
            </div>
          </div>
          <div className="aii-metric-card">
            <div className="aii-mc-icon" style={{color:'#10b981', background:'#d1fae5'}}><UserPlus size={20} /></div>
            <div className="aii-mc-body">
              <div className="aii-mc-label">New Enrollments</div>
              <div className="aii-mc-val">1,245</div>
              <div className="aii-mc-trend" style={{color:'#10b981'}}>↑ 9.8% vs last 7 days</div>
            </div>
          </div>
          <div className="aii-metric-card" style={{border: activeTab==='Engagement'?'1px solid #c7d2fe':''}}>
            <div className="aii-mc-icon" style={{color:'#3b82f6', background:'#dbeafe'}}><Activity size={20} /></div>
            <div className="aii-mc-body">
              <div className="aii-mc-label">Active Students</div>
              <div className="aii-mc-val">8,932</div>
              <div className="aii-mc-trend" style={{color:'#10b981'}}>↑ 8.2% vs last 7 days</div>
            </div>
          </div>
          <div className="aii-metric-card">
            <div className="aii-mc-icon" style={{color:'#f59e0b', background:'#ffedd5'}}><CheckSquare size={20} /></div>
            <div className="aii-mc-body">
              <div className="aii-mc-label">Tests Attempted</div>
              <div className="aii-mc-val">5,314</div>
              <div className="aii-mc-trend" style={{color:'#f59e0b'}}>↑ 15.6% vs last 7 days</div>
            </div>
          </div>
          <div className="aii-metric-card" style={{border: activeTab==='Revenue'?'1px solid #c7d2fe':''}}>
            <div className="aii-mc-icon" style={{color:'#8b5cf6', background:'#f3e8ff'}}><IndianRupee size={20} /></div>
            <div className="aii-mc-body">
              <div className="aii-mc-label">Revenue (Est.)</div>
              <div className="aii-mc-val">₹18.75L</div>
              <div className="aii-mc-trend" style={{color:'#8b5cf6'}}>↑ 13.7% vs last 7 days</div>
            </div>
          </div>
        </div>
      )}

      <div className="aii-toolbar">
        <div className="aii-tabs">
          <div className={`aii-tab ${activeTab==='Overview'?'active':''}`} onClick={()=>setActiveTab('Overview')}>Overview</div>
          <div className={`aii-tab ${activeTab==='Students'?'active':''}`} onClick={()=>setActiveTab('Students')}>Students</div>
          <div className={`aii-tab ${activeTab==='Courses'?'active':''}`} onClick={()=>setActiveTab('Courses')}>Courses</div>
          <div className={`aii-tab ${activeTab==='Tests'?'active':''}`} onClick={()=>setActiveTab('Tests')}>Tests</div>
          <div className={`aii-tab ${activeTab==='Engagement'?'active':''}`} onClick={()=>setActiveTab('Engagement')}>Engagement</div>
          <div className={`aii-tab ${activeTab==='Revenue'?'active':''}`} onClick={()=>setActiveTab('Revenue')}>Revenue</div>
        </div>
        <div className="aii-toolbar-right">
          <select className="aii-select"><option>{activeTab === 'Tests' ? 'All Test Types' : 'All Courses'}</option></select>
          <button className="aii-btn-outline"><Filter size={14}/> Filters</button>
        </div>
      </div>

      <div className="aii-content">
        {activeTab === 'Overview' && <InsightsOverview />}
        {activeTab === 'Students' && <InsightsStudents />}
        {activeTab === 'Courses' && <div style={{padding:40, textAlign:'center'}}>Courses Module (To be implemented)</div>}
        {activeTab === 'Tests' && <InsightsTests />}
        {activeTab === 'Engagement' && <div style={{padding:40, textAlign:'center'}}>Engagement Module (To be implemented)</div>}
        {activeTab === 'Revenue' && <InsightsRevenue />}
      </div>
    </div>
  );
}

function Filter({size}) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>);
}
