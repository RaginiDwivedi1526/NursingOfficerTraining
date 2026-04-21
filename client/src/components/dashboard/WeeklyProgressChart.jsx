import { useState, useEffect } from 'react';
import { TrendingUp, Flame } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { getWeeklyProgress } from '../../services/api';
import './WeeklyProgressChart.css';

function WeeklyProgressChart() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getWeeklyProgress();
        setScores(data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  if (loading) return (
    <div className="wpc-card">
      <div className="wpc-header"><TrendingUp size={20} color="var(--success)" /><span>Your Weekly Progress</span></div>
      <div className="wpc-skeleton"><div className="shimmer-bar" /><div className="shimmer-bar" /><div className="shimmer-bar" /></div>
    </div>
  );

  if (scores.length === 0) return null;

  const improvement = scores.length >= 2 ? scores[scores.length - 1].score - scores[0].score : 0;

  const chartData = {
    labels: scores.map(s => s.week),
    datasets: [{
      label: 'Score %',
      data: scores.map(s => s.score),
      borderColor: '#0d2b5e',
      borderWidth: 3,
      pointBackgroundColor: '#c0392b',
      pointRadius: 6,
      pointHoverRadius: 9,
      fill: true,
      backgroundColor: (ctx) => {
        const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(13,43,94,0.3)');
        gradient.addColorStop(1, 'rgba(13,43,94,0)');
        return gradient;
      },
      tension: 0.4
    }]
  };

  const chartOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { min: 0, max: 100, ticks: { callback: v => v + '%' } },
      x: { grid: { display: false } }
    }
  };

  return (
    <div className="wpc-card">
      <div className="wpc-header">
        <TrendingUp size={20} color="var(--success)" />
        <div>
          <span className="wpc-title">Your Weekly Progress</span>
          <span className="wpc-subtitle">Last {scores.length} weeks of performance</span>
        </div>
      </div>
      <div className="wpc-chart"><Line data={chartData} options={chartOptions} /></div>
      {improvement > 0 && (
        <div className="wpc-improvement">
          <Flame size={20} color="#f97316" className="flicker-icon" />
          <span>Your score improved by <strong>+{improvement}%</strong> this month!</span>
        </div>
      )}
    </div>
  );
}

export default WeeklyProgressChart;
