import { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Timer, ClipboardList, TrendingUp, TrendingDown } from 'lucide-react';
import { getStatsStrip } from '../../services/api';
import './StatsStrip.css';

function StatsStrip() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try { const { data } = await getStatsStrip(); setStats(data); }
      catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  if (loading || !stats) return null;

  const cards = [
    { icon: <CheckCircle2 size={24} />, color: 'var(--success)', bg: 'rgba(39,174,96,0.1)', value: stats.totalCorrect.toLocaleString(), label: 'Total Correct', trend: stats.trendCorrect },
    { icon: <XCircle size={24} />, color: 'var(--crimson)', bg: 'rgba(192,57,43,0.1)', value: stats.totalWrong.toLocaleString(), label: 'Total Wrong', trend: stats.trendWrong },
    { icon: <Timer size={24} />, color: 'var(--gold)', bg: 'rgba(243,156,18,0.1)', value: `${stats.avgTimePerQuestion} sec`, label: 'Avg/Question', trend: stats.trendTime },
    { icon: <ClipboardList size={24} />, color: 'var(--navy)', bg: 'rgba(13,43,94,0.1)', value: stats.testsAttempted, label: 'Tests', trend: stats.trendTests },
  ];

  return (
    <div className="stats-strip">
      {cards.map((card, i) => (
        <div className="ss-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
          <div className="ss-icon-wrap" style={{ background: card.bg }}>
            <span style={{ color: card.color }}>{card.icon}</span>
          </div>
          <div className="ss-value">{card.value}</div>
          <div className="ss-label">{card.label}</div>
          <div className="ss-trend">
            {card.trend === 'up' && <><TrendingUp size={13} color="var(--success)" /> <span style={{ color: 'var(--success)' }}>Up</span></>}
            {card.trend === 'down' && <><TrendingDown size={13} color="var(--crimson)" /> <span style={{ color: 'var(--crimson)' }}>Down</span></>}
            {card.trend === 'stable' && <span style={{ color: 'var(--gray)', fontSize: '12px' }}>Stable</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsStrip;
