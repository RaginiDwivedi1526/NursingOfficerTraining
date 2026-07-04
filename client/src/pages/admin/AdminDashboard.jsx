import { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, ClipboardList, CheckCircle, BarChart3, TrendingUp, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };
        const { data } = await axios.get('http://localhost:5000/api/admin/stats', config);
        setStats(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch admin stats');
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="loading"><div className="spinner"></div></div>;
  if (error) return <div className="auth-error">{error}</div>;

  return (
    <div className="dashboard">
      <div className="dash-header">
        <div>
          <h1>Admin Command Center</h1>
          <p className="subtitle">Platform overview and management</p>
        </div>
        <div className="admin-badge">
          <ShieldAlert size={16} /> Restricted Access
        </div>
      </div>

      <div className="dash-grid">
        <div className="dash-stat-card">
          <div className="dash-stat-icon">👥</div>
          <div className="dash-stat-num">{stats.totalUsers}</div>
          <div className="dash-stat-label">Total Registered Students</div>
        </div>
        <div className="dash-stat-card">
          <div className="dash-stat-icon">📝</div>
          <div className="dash-stat-num">{stats.totalTests}</div>
          <div className="dash-stat-label">Live Test Modules</div>
        </div>
        <div className="dash-stat-card">
          <div className="dash-stat-icon">✅</div>
          <div className="dash-stat-num">{stats.totalResults}</div>
          <div className="dash-stat-label">Exams Completed</div>
        </div>
      </div>

      <div className="perf-layout">
        <div className="topics-card">
          <h3>User Role Distribution</h3>
          <div style={{ marginTop: '20px' }}>
            {stats.roleStats.map((role, i) => (
              <div key={i} className="topic-row">
                <div className="topic-label" style={{ textTransform: 'capitalize' }}>{role._id} Users</div>
                <div className="topic-bar-bg">
                  <div 
                    className="topic-bar green" 
                    style={{ width: `${(role.count / stats.totalUsers) * 100}%` }}
                  ></div>
                </div>
                <div className="topic-pct">{role.count}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <h3>Quick Management</h3>
          <div className="rec-grid">
            <div className="rec-card" style={{ cursor: 'pointer', borderLeftColor: 'var(--navy)' }} onClick={() => window.location.href='/admin/users'}>
              <h4>Manage Students</h4>
              <p>View list, change roles, or remove accounts.</p>
              <span className="badge">Action Required</span>
            </div>
            <div className="rec-card" style={{ cursor: 'pointer', borderLeftColor: 'var(--gold)' }} onClick={() => window.location.href='/admin/tests'}>
              <h4>Content Manager</h4>
              <p>Create and edit MCQ test modules.</p>
              <span className="badge">System Tool</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
