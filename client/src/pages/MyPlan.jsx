import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ArrowRight, DownloadCloud, CheckCircle2, ChevronLeft, ChevronRight, RefreshCw, Play } from 'lucide-react';
import { getStudyPlan, patchStudyPlanTask } from '../services/api';
import './StudentMyPlan.css';

export default function MyPlan() {
  const navigate = useNavigate();
  const [planData, setPlanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeDayIdx, setActiveDayIdx] = useState(0);

  useEffect(() => {
    fetchPlan();
  }, []);

  const fetchPlan = async () => {
    setLoading(true);
    try {
      const res = await getStudyPlan();
      setPlanData(res.data);
    } catch (err) {
      console.error('Error loading study plan:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleTaskCompleted = async (dayIndex, taskIndex, currentStatus) => {
    try {
      const res = await patchStudyPlanTask({
        dayIndex,
        taskIndex,
        completed: !currentStatus
      });
      setPlanData(res.data);
    } catch (err) {
      console.error('Error updating task status:', err);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: 60, textAlign: 'center', color: '#64748b' }}>
        <RefreshCw className="animate-spin" size={32} style={{ marginBottom: 12, color: '#4f46e5' }} />
        <div style={{ fontSize: 16, fontWeight: 600 }}>Building Your AIIMS NORCET Weekly Study Plan...</div>
      </div>
    );
  }

  const days = planData?.plan || [
    { day: 'Monday', tasks: [{ topic: 'Pharmacology - Diuretics', duration: '2 hrs', type: 'Lecture', completed: true }] },
    { day: 'Tuesday', tasks: [{ topic: 'Anatomy - Cardiovascular', duration: '30 Qs', type: 'MCQ', completed: true }] },
    { day: 'Wednesday', tasks: [{ topic: 'Medical Surgical Nursing', duration: '1.5 hrs', type: 'Revision', completed: true }] },
    { day: 'Thursday', tasks: [{ topic: 'Community Health Nursing', duration: '2 hrs', type: 'Lecture', completed: false }] },
    { day: 'Friday', tasks: [{ topic: 'Mental Health Nursing MCQs', duration: '30 Qs', type: 'MCQ', completed: false }] },
    { day: 'Saturday', tasks: [{ topic: 'Full NORCET Mock Test', duration: 'Full', type: 'Mock', completed: false }] },
    { day: 'Sunday', tasks: [{ topic: 'Weekly Revision & Doubt Session', duration: '1 hr', type: 'Rest', completed: false }] },
  ];

  const activeDayObj = days[activeDayIdx] || days[0];

  return (
    <div className="mp-container">
      {/* Header */}
      <div className="mp-header">
        <div className="mp-header-left">
          <h1>My NORCET Study Plan 📋</h1>
          <p>Structured daily targets to keep your exam preparation consistent.</p>
        </div>
        <button 
          onClick={() => alert('Exporting study plan PDF...')} 
          className="mp-export-btn"
          style={{ cursor: 'pointer' }}
        >
          <DownloadCloud size={16}/> Export Plan PDF
        </button>
      </div>

      <div className="mp-main-grid">
        {/* LEFT COLUMN */}
        <div className="mp-left">
          {/* Hero */}
          <div className="mp-hero">
            <div className="mp-hero-title">Stay Consistent, Achieve Selection! ✨</div>
            <div className="mp-hero-sub">Complete daily tasks to stay ahead of 78% of aspirants.</div>
            
            <div className="mp-hero-stats">
              <div className="mp-hero-circ">
                <svg viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e2e8f0" strokeWidth="4"/>
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#4f46e5" strokeWidth="4" strokeDasharray="57 43" strokeLinecap="round" transform="rotate(-90 18 18)"/>
                </svg>
                <div className="mp-hero-c-val">57%</div>
              </div>
              
              <div className="mp-hero-stat">
                <div className="mp-h-slbl">Weekly Target</div>
                <div className="mp-h-sval">57%</div>
                <div className="mp-h-ssub">Completed</div>
              </div>
              
              <div className="mp-hero-stat">
                <div className="mp-h-slbl">Days Completed</div>
                <div className="mp-h-sval">4 <span style={{ fontSize: 12, color: '#94a3b8' }}>/ 7</span></div>
                <div className="mp-h-ssub">This Week</div>
              </div>
              
              <div className="mp-hero-stat">
                <div className="mp-h-slbl">Tests Planned</div>
                <div className="mp-h-sval">5</div>
                <div className="mp-h-ssub">Practice Mock Tests</div>
              </div>
            </div>
          </div>

          {/* Interactive Days Row */}
          <div style={{ display: 'flex', gap: 10, margin: '20px 0', overflowX: 'auto', paddingBottom: 4 }}>
            {days.map((d, idx) => (
              <div
                key={idx}
                onClick={() => setActiveDayIdx(idx)}
                style={{
                  flex: 1,
                  minWidth: 90,
                  padding: '12px 10px',
                  borderRadius: 12,
                  border: '1px solid #e2e8f0',
                  background: activeDayIdx === idx ? '#4f46e5' : '#ffffff',
                  color: activeDayIdx === idx ? '#ffffff' : '#0f172a',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700 }}>{d.day}</div>
                <div style={{ fontSize: 11, opacity: 0.8, marginTop: 4 }}>
                  {d.tasks?.filter(t => t.completed).length || 0}/{d.tasks?.length || 1} Done
                </div>
              </div>
            ))}
          </div>

          {/* Active Day Tasks List */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>
                Tasks for {activeDayObj.day}
              </div>
              <span style={{ fontSize: 12, color: '#10b981', fontWeight: 600 }}>
                {activeDayObj.tasks?.filter(t => t.completed).length || 0} / {activeDayObj.tasks?.length || 0} Completed
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {activeDayObj.tasks?.map((t, taskIdx) => (
                <div 
                  key={taskIdx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 14,
                    borderRadius: 10,
                    border: '1px solid #f1f5f9',
                    background: t.completed ? '#f0fdf4' : '#f8fafc',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div 
                    onClick={() => toggleTaskCompleted(activeDayIdx, taskIdx, t.completed)}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', flex: 1 }}
                  >
                    {t.completed ? (
                      <CheckCircle2 size={20} color="#10b981"/>
                    ) : (
                      <div style={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid #cbd5e1' }} />
                    )}
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: '#0f172a', textDecoration: t.completed ? 'line-through' : 'none' }}>
                        {t.topic}
                      </div>
                      <div style={{ fontSize: 12, color: '#64748b' }}>
                        Type: {t.type} • Duration: {t.duration}
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigate('/tests')}
                    style={{ padding: '6px 12px', borderRadius: 6, background: '#4f46e5', color: '#fff', border: 'none', fontWeight: 600, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                  >
                    Start Task <Play size={10}/>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 20, marginBottom: 20 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>Weekly Target Summary</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                  <span>Study Hours</span> <strong>14h / 20h</strong>
                </div>
                <div style={{ height: 6, background: '#f1f5f9', borderRadius: 3 }}>
                  <div style={{ width: '70%', height: '100%', background: '#4f46e5', borderRadius: 3 }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                  <span>Questions Solved</span> <strong>350 / 500 Qs</strong>
                </div>
                <div style={{ height: 6, background: '#f1f5f9', borderRadius: 3 }}>
                  <div style={{ width: '70%', height: '100%', background: '#10b981', borderRadius: 3 }} />
                </div>
              </div>
            </div>

            <button 
              onClick={() => navigate('/tests')}
              style={{ marginTop: 20, width: '100%', padding: '10px 0', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}
            >
              Take Today's Planned MCQs →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
