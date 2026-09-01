import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLiveClasses.css';

export default function AdminLiveClasses() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLiveClasses();
  }, []);

  const fetchLiveClasses = async () => {
    try {
      const userStr = localStorage.getItem('nursingUser');
      const token = userStr ? JSON.parse(userStr).token : null;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
      const url = baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`;
      const { data } = await axios.get(`${url}/live-classes`, config);
      setClasses(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const getStatusBadge = (startTime) => {
    const now = new Date();
    const start = new Date(startTime);
    if (start > now) return <span className="alc-badge upcoming">Upcoming</span>;
    return <span className="alc-badge completed">Completed</span>;
  };

  const isUpcoming = (startTime) => new Date(startTime) > new Date();

  const filteredClasses = classes.filter(c => {
    const matchesSearch = c.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const upcoming = isUpcoming(c.startTime);
    const matchesTab = activeTab === 'All' || 
                       (activeTab === 'Upcoming' && upcoming) || 
                       (activeTab === 'Completed' && !upcoming);
    return matchesSearch && matchesTab;
  });

  return (
    <div className="alc-page">
      <div className="alc-header">
        <div className="alc-header-left">
          <div className="alc-header-title">
            <h1>Live Classes</h1>
            <p>Schedule and manage interactive live sessions</p>
          </div>
        </div>
        <div className="alc-header-right">
          <button className="alc-btn-icon"><Filter size={16} /></button>
          <button className="alc-btn-primary" onClick={() => navigate('/admin/live-classes/new')}><Plus size={16} /> Schedule Class</button>
        </div>
      </div>

      <div className="alc-metrics">
        <div className="alc-metric-card">
          <div className="alc-mc-icon" style={{background:'#f3e8ff', color:'#8b5cf6'}}><Video size={24} /></div>
          <div className="alc-mc-body">
            <div className="alc-mc-label">Total Classes</div>
            <div className="alc-mc-val">{classes.length}</div>
            <div className="alc-mc-trend">This month</div>
          </div>
        </div>
        <div className="alc-metric-card">
          <div className="alc-mc-icon" style={{background:'#d1fae5', color:'#10b981'}}><Calendar size={24} /></div>
          <div className="alc-mc-body">
            <div className="alc-mc-label">Upcoming</div>
            <div className="alc-mc-val">{classes.filter(c => isUpcoming(c.startTime)).length}</div>
            <div className="alc-mc-trend">Scheduled sessions</div>
          </div>
        </div>
        <div className="alc-metric-card">
          <div className="alc-mc-icon" style={{background:'#eff6ff', color:'#3b82f6'}}><Users size={24} /></div>
          <div className="alc-mc-body">
            <div className="alc-mc-label">Avg. Attendance</div>
            <div className="alc-mc-val">84%</div>
            <div className="alc-mc-trend">Across all classes</div>
          </div>
        </div>
      </div>

      <div className="alc-table-container">
        <div className="alc-table-toolbar">
          <div className="alc-tabs">
            <div className={`alc-tab ${activeTab==='Upcoming'?'active':''}`} onClick={()=>setActiveTab('Upcoming')}>Upcoming</div>
            <div className={`alc-tab ${activeTab==='Completed'?'active':''}`} onClick={()=>setActiveTab('Completed')}>Completed</div>
            <div className={`alc-tab ${activeTab==='All'?'active':''}`} onClick={()=>setActiveTab('All')}>All Classes</div>
          </div>
          <div className="alc-search">
            <Search size={16} color="#9ca3af" />
            <input 
              type="text" 
              placeholder="Search classes..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div style={{padding:40, textAlign:'center'}}>Loading live classes...</div>
        ) : (
          <table className="alc-table">
            <thead>
              <tr>
                <th>Class Title</th>
                <th>Date & Time</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClasses.map((lc) => (
                <tr key={lc._id}>
                  <td style={{width: 350}}>
                    <div className="alc-class-cell">
                      <div className="alc-class-icon">
                        <Video size={20} color="#4f46e5"/>
                      </div>
                      <div>
                        <div className="alc-class-title">{lc.title}</div>
                        <div className="alc-class-desc">{lc.description?.substring(0, 50) || 'No description'}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="alc-stat-val" style={{display:'flex', alignItems:'center', gap:6}}><Calendar size={14} color="#6b7280"/> {new Date(lc.startTime).toLocaleDateString()}</div>
                    <div className="alc-stat-lbl" style={{display:'flex', alignItems:'center', gap:6}}><Clock size={14}/> {new Date(lc.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                  </td>
                  <td>
                    <div className="alc-stat-val">{lc.duration} mins</div>
                  </td>
                  <td>
                    {getStatusBadge(lc.startTime)}
                  </td>
                  <td>
                    <div className="alc-actions-cell">
                      <button className="alc-action-btn"><Edit3 size={16} /></button>
                      <button className="alc-action-btn delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredClasses.length === 0 && (
                <tr>
                  <td colSpan="5" style={{textAlign:'center', padding:40, color:'#6b7280'}}>No live classes found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
