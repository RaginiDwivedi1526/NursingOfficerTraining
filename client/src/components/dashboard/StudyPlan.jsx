import { useState, useEffect } from 'react';
import { Calendar, Zap, Lock, BookOpen, NotebookPen, Play, ScanLine, AlertTriangle, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getStudyPlan, patchStudyPlanTask } from '../../services/api';
import './StudyPlan.css';

const taskIcons = {
  'Lecture': <Play size={13} />,
  'MCQ': <NotebookPen size={13} />,
  'Revision': <BookOpen size={13} />,
  'Mock': <ScanLine size={13} />,
  'Rest': <BookOpen size={13} />
};

function StudyPlan() {
  const { isPro } = useAuth();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try { const { data } = await getStudyPlan(); setPlan(data); }
      catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  const toggleTask = async (dayIndex, taskIndex, completed) => {
    try {
      const { data } = await patchStudyPlanTask({ dayIndex, taskIndex, completed: !completed });
      setPlan(data);
    } catch (err) { console.error(err); }
  };

  if (loading) return null;

  const userIsPro = isPro();

  // Locked state for non-pro users
  if (!userIsPro) {
    return (
      <div className="sp-card sp-locked-wrap">
        <div className="sp-blur-bg">
          <div className="sp-fake-grid">
            {['MON','TUE','WED','THU','FRI','SAT','SUN'].map(d => (
              <div className="sp-fake-day" key={d}><span>{d}</span><div className="sp-fake-task" /></div>
            ))}
          </div>
        </div>
        <div className="sp-lock-overlay">
          <Lock size={32} color="var(--gold)" />
          <h3>Personalized Daily Study Plan</h3>
          <div className="sp-pro-badge"><Zap size={14} color="var(--gold)" /> Pro Feature</div>
          <p>AI builds your perfect weekly schedule based on your weak areas.</p>
          <a href="/pricing" className="sp-upgrade-btn">Upgrade to Pro — ₹4,999/month →</a>
        </div>
      </div>
    );
  }

  if (!plan) return null;

  const weekStart = new Date(plan.weekStart);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);
  const fmt = (d) => d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });

  return (
    <div className="sp-card">
      <div className="sp-header">
        <Calendar size={20} color="var(--navy)" />
        <div>
          <span className="sp-title">Your Study Plan</span>
          <span className="sp-week">{fmt(weekStart)} – {fmt(weekEnd)}</span>
        </div>
        <div className="sp-pro-badge"><Zap size={14} color="var(--gold)" /> Pro</div>
      </div>
      <div className="sp-ai-note"><Sparkles size={14} color="var(--purple)" /> AI-generated based on your weak areas</div>

      <div className="sp-grid">
        {plan.plan.map((day, di) => (
          <div className="sp-day" key={di}>
            <div className="sp-day-label">{day.day.slice(0, 3).toUpperCase()}</div>
            {day.tasks.map((task, ti) => (
              <div className="sp-task" key={ti}>
                <span className="sp-task-icon">{taskIcons[task.type] || <BookOpen size={13} />}</span>
                <span className="sp-task-topic">{task.topic}</span>
                <span className="sp-task-dur">{task.duration}</span>
                <span className="sp-task-type">{task.type}</span>
                <label className="sp-check">
                  <input type="checkbox" checked={task.completed} onChange={() => toggleTask(di, ti, task.completed)} />
                  <span className="sp-checkmark" />
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudyPlan;
