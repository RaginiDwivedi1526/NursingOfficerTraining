import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Target, Sparkles, Microscope, Pill, HeartPulse, Stethoscope, BookOpen, Layers, ChevronRight, XCircle, AlertTriangle, Award, Play } from 'lucide-react';
import { getRecommendations } from '../../services/api';
import './SmartTestRecommendation.css';

const topicIcons = {
  'Microbiology': <Microscope size={24} color="#059669" />,
  'Pharmacology': <Pill size={24} color="#0284c7" />,
  'Anatomy': <HeartPulse size={24} color="var(--crimson)" />,
  'Nursing Procedures': <Stethoscope size={24} color="var(--navy)" />,
};

const diffBadge = (d) => {
  const dl = d?.toLowerCase();
  if (dl === 'easy') return { bg: 'rgba(39,174,96,0.1)', color: 'var(--success)', border: 'rgba(39,174,96,0.3)' };
  if (dl === 'hard') return { bg: 'rgba(192,57,43,0.1)', color: 'var(--crimson)', border: 'rgba(192,57,43,0.3)' };
  return { bg: 'rgba(243,156,18,0.1)', color: 'var(--gold)', border: 'rgba(243,156,18,0.3)' };
};

function SmartTestRecommendation() {
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try { const { data } = await getRecommendations(); setRecs(data); }
      catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  if (loading) return null;

  return (
    <div className="str-card">
      <div className="str-header">
        <Target size={20} color="var(--crimson)" />
        <div>
          <span className="str-title">Recommended For You</span>
          <span className="str-subtitle">Based on your weak areas</span>
        </div>
        <Sparkles size={20} color="var(--purple)" className="shimmer-icon" />
      </div>

      {recs.length === 0 ? (
        <div className="str-allclear">
          <Award size={32} color="var(--gold)" />
          <p>Great job! All topics above 60%. Try a Full Mock Test.</p>
          <Link to="/tests" className="str-mock-btn"><Play size={16} /> Start Mock</Link>
        </div>
      ) : (
        <div className="str-list">
          {recs.map((r, i) => {
            const badge = diffBadge(r.difficulty);
            return (
              <div className="str-rec" key={i}>
                <div className="str-rec-icon">{topicIcons[r.topic] || <BookOpen size={24} color="var(--navy)" />}</div>
                <div className="str-rec-body">
                  <div className="str-rec-topic">{r.topic}</div>
                  <div className="str-rec-title">{r.title}</div>
                  <div className="str-rec-meta">
                    <span className="str-diff-badge" style={{ background: badge.bg, color: badge.color, borderColor: badge.border }}><Layers size={12} /> {r.difficulty}</span>
                    <span className="str-acc">Last: {r.lastAccuracy}% {r.lastAccuracy < 50 ? <XCircle size={12} color="var(--crimson)" /> : <AlertTriangle size={12} color="var(--gold)" />}</span>
                  </div>
                </div>
                <Link to={`/test/${r.testId}`} className="str-start-btn"><ChevronRight size={16} /> Start</Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SmartTestRecommendation;
