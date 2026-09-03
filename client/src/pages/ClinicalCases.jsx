import React, { useState } from 'react';
import { Stethoscope, Clock, CheckCircle2, ChevronDown, Filter, FileText, Target, Activity, AlertCircle } from 'lucide-react';
import './StudentClinicalCases.css';

export default function ClinicalCases() {
  const [filter, setFilter] = useState('All');
  
  const CASES = [
    { 
      id: 1, title: '65-year-old Male with Acute Chest Pain', 
      tags: ['Cardiology', 'Emergency'], diff: 'Hard', status: 'new',
      desc: 'Patient presents to the ED diaphoretic with crushing substernal chest pain radiating to the left arm. Vitals: BP 160/90, HR 110, RR 24. Evaluate the initial nursing interventions, ECG prioritization, and medication administration (MONA protocol).', 
      qCount: 15, time: '25 mins'
    },
    { 
      id: 2, title: 'Pediatric Asthma Exacerbation', 
      tags: ['Pediatrics', 'Respiratory'], diff: 'Medium', status: 'prog',
      desc: 'A 6-year-old child is brought in with severe wheezing, suprasternal retractions, and SpO2 88% on room air. Determine the correct sequence of oxygen therapy, bronchodilator administration, and reassessment protocols.', 
      qCount: 10, time: '15 mins', score: '60%'
    },
    { 
      id: 3, title: 'Post-Op Day 1: Hip Replacement Complications', 
      tags: ['Medical Surgical', 'Orthopedics'], diff: 'Medium', status: 'done',
      desc: 'Patient is POD 1 for right total hip arthroplasty. Sudden onset of shortness of breath and pleuritic chest pain. Assess for pulmonary embolism versus fat embolism and identify immediate nursing priorities.', 
      qCount: 12, time: '20 mins', score: '92%'
    },
    { 
      id: 4, title: 'Primigravida in Active Labor', 
      tags: ['Obstetrics', 'Maternity'], diff: 'Easy', status: 'new',
      desc: '39-weeks gestation patient admitted in active labor. Fetal heart tracing shows late decelerations. Identify the physiological cause and demonstrate the correct intrauterine resuscitation steps.', 
      qCount: 8, time: '12 mins'
    },
    { 
      id: 5, title: 'Diabetic Ketoacidosis (DKA) Management', 
      tags: ['Endocrinology', 'Critical Care'], diff: 'Hard', status: 'new',
      desc: '19-year-old type 1 diabetic presents with confusion, Kussmaul respirations, and blood glucose of 650 mg/dL. Manage the fluid resuscitation, insulin drip protocols, and electrolyte monitoring.', 
      qCount: 18, time: '30 mins'
    }
  ];

  const filteredCases = filter === 'All' ? CASES : CASES.filter(c => c.status === filter);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'new': return <div className="cc-status-icon cc-status-new"><Stethoscope /></div>;
      case 'done': return <div className="cc-status-icon cc-status-done"><CheckCircle2 /></div>;
      case 'prog': return <div className="cc-status-icon cc-status-prog"><Activity /></div>;
      default: return null;
    }
  };

  return (
    <div className="cc-container">
      {/* Header */}
      <div className="cc-header">
        <h1>Clinical Cases 🩺</h1>
        <p>Apply your theoretical knowledge to realistic patient scenarios.</p>
      </div>

      {/* Hero */}
      <div className="cc-hero">
        <div className="cc-hero-content">
          <div className="cc-hero-title">Think Like a Nurse</div>
          <div className="cc-hero-sub">Engage in interactive, unfolding clinical case studies. Test your critical thinking, prioritization, and clinical judgment in a safe environment.</div>
          <button className="cc-hero-btn">Attempt Case of the Day <ChevronDown size={16}/></button>
        </div>
        <div className="cc-hero-icon">🏥</div>
      </div>

      {/* Grid Title */}
      <div className="cc-grid-title">
        Case Scenarios
        <div className="cc-grid-filters">
          <button className={`cc-filter-btn ${filter === 'All' ? 'active' : ''}`} onClick={() => setFilter('All')}>All Cases</button>
          <button className={`cc-filter-btn ${filter === 'new' ? 'active' : ''}`} onClick={() => setFilter('new')}>Unattempted</button>
          <button className={`cc-filter-btn ${filter === 'done' ? 'active' : ''}`} onClick={() => setFilter('done')}>Completed</button>
          <button className="cc-filter-btn"><Filter size={14}/> Topic Filters</button>
        </div>
      </div>

      {/* List */}
      <div className="cc-list">
        {filteredCases.map(c => (
          <div className="cc-card" key={c.id}>
            {getStatusIcon(c.status)}
            
            <div className="cc-card-main">
              <div className="cc-card-top">
                <div className="cc-card-title">{c.title}</div>
              </div>
              
              <div className="cc-card-tags">
                <span className={`cc-tag cc-tag-diff ${c.diff.toLowerCase()}`}>{c.diff}</span>
                {c.tags.map(t => <span key={t} className="cc-tag cc-tag-cat">{t}</span>)}
              </div>
              
              <div className="cc-card-desc">{c.desc}</div>
              
              <div className="cc-card-foot">
                <div className="cc-foot-item"><FileText size={14}/> {c.qCount} Questions</div>
                <div className="cc-foot-item"><Clock size={14}/> {c.time}</div>
                {c.status === 'done' && <div className="cc-foot-item" style={{color:'#16a34a'}}><Target size={14}/> Score: {c.score}</div>}
              </div>
            </div>

            <div className="cc-card-action">
              {c.status === 'new' && <button className="cc-action-btn">Start Case</button>}
              {c.status === 'prog' && <button className="cc-action-btn">Resume</button>}
              {c.status === 'done' && <button className="cc-action-btn done">Review</button>}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
