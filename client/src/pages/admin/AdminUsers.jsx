import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import { Search, Download, Plus, Users, UserCheck, UserMinus, UserPlus, MoreVertical, Eye } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import AddStudentModal from './AddStudentModal';
import './AdminUsers.css';

/* Icons from lucide-react */
export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [showAddStudent, setShowAddStudent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const userStr = localStorage.getItem('nursingUser');
      const token = userStr ? JSON.parse(userStr).token : null;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
      const url = baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`;
      const { data } = await axios.get(`${url}/admin/users`, config);
      setUsers(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const getStatus = (u) => u.role !== 'free' ? 'Active' : 'Inactive';
  
  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          u.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const status = getStatus(u);
    const matchesTab = activeTab === 'all' || 
                       (activeTab === 'active' && status === 'Active') || 
                       (activeTab === 'inactive' && status === 'Inactive');
    return matchesSearch && matchesTab;
  });

  const activeCount = users.filter(u => getStatus(u) === 'Active').length;
  const inactiveCount = users.filter(u => getStatus(u) === 'Inactive').length;

  if (loading) return <div style={{padding:40, textAlign:'center'}}>Loading...</div>;

  return (
    <div className="au-page">
      
      {/* Header */}
      <div className="au-header">
        <div className="au-header-left">
          <h1>Students</h1>
          <p>Manage and view all registered students.</p>
        </div>
        <div className="au-header-right">
          <div className="au-search">
            <Search size={16} color="#9ca3af" />
            <input 
              type="text" 
              placeholder="Search students by name, email or ID..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="au-btn-icon"><Download size={18} /></button>
          <button className="au-btn-primary" onClick={() => setShowAddStudent(true)}><Plus size={18} /> Add Student</button>
        </div>
      </div>

      {/* Metrics */}
      <div className="au-metrics">
        <div className="au-metric-card">
          <div className="au-mc-icon" style={{background:'#f3e8ff', color:'#8b5cf6'}}><Users size={24} /></div>
          <div className="au-mc-body">
            <div className="au-mc-label">Total Students</div>
            <div className="au-mc-val">{users.length.toLocaleString()}</div>
            <div className="au-mc-trend au-trend-up">↑ 12.5% vs last month</div>
          </div>
        </div>
        <div className="au-metric-card">
          <div className="au-mc-icon" style={{background:'#d1fae5', color:'#10b981'}}><UserCheck size={24} /></div>
          <div className="au-mc-body">
            <div className="au-mc-label">Active Students</div>
            <div className="au-mc-val">{activeCount.toLocaleString()}</div>
            <div className="au-mc-trend au-trend-up">85.5% of total</div>
          </div>
        </div>
        <div className="au-metric-card">
          <div className="au-mc-icon" style={{background:'#ffedd5', color:'#f59e0b'}}><UserMinus size={24} /></div>
          <div className="au-mc-body">
            <div className="au-mc-label">Inactive Students</div>
            <div className="au-mc-val">{inactiveCount.toLocaleString()}</div>
            <div className="au-mc-trend au-trend-neutral">14.5% of total</div>
          </div>
        </div>
        <div className="au-metric-card">
          <div className="au-mc-icon" style={{background:'#eff6ff', color:'#3b82f6'}}><UserPlus size={24} /></div>
          <div className="au-mc-body">
            <div className="au-mc-label">New This Month</div>
            <div className="au-mc-val">189</div>
            <div className="au-mc-trend au-trend-up">↑ 8.2% vs last month</div>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="au-table-container">
        
        {/* Toolbar */}
        <div className="au-table-toolbar">
          <div className="au-tabs">
            <div className={`au-tab ${activeTab==='all'?'active':''}`} onClick={()=>setActiveTab('all')}>
              All Students <span className="au-tab-count">({users.length})</span>
            </div>
            <div className={`au-tab ${activeTab==='active'?'active':''}`} onClick={()=>setActiveTab('active')}>
              Active <span className="au-tab-count">({activeCount})</span>
            </div>
            <div className={`au-tab ${activeTab==='inactive'?'active':''}`} onClick={()=>setActiveTab('inactive')}>
              Inactive <span className="au-tab-count">({inactiveCount})</span>
            </div>
          </div>
          <div className="au-bulk">
            <select className="au-bulk-select">
              <option>Bulk Actions</option>
            </select>
            <button className="au-btn-icon" style={{width:34,height:34}}><MoreVertical size={16}/></button>
          </div>
        </div>

        {/* Table */}
        <table className="au-table">
          <thead>
            <tr>
              <th style={{width: 40}}><input type="checkbox" className="au-cb" /></th>
              <th>Student</th>
              <th>Enrollment ID</th>
              <th>Course</th>
              <th>Status</th>
              <th>Joined On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.slice(0,10).map((u, i) => {
              const status = getStatus(u);
              const enrId = `ENR-2024-${String(100+i).padStart(5, '0')}`;
              const course = (u.enrolledCourses && u.enrolledCourses[0]) || 'Nursing Fundamentals - Complete Course';
              
              return (
                <tr key={u._id}>
                  <td><input type="checkbox" className="au-cb" /></td>
                  <td>
                    <div className="au-student-cell">
                      <div className="au-avatar">
                        {u.profilePhoto ? <img src={u.profilePhoto} alt=""/> : (u.name?.[0] || 'U')}
                      </div>
                      <div>
                        <Link to={`/admin/student/${u._id}`} className="au-stu-name" style={{textDecoration:'none'}}>{u.name}</Link>
                        <div className="au-stu-email">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{enrId}</td>
                  <td>{course}</td>
                  <td>
                    <span className={status === 'Active' ? 'au-badge-active' : 'au-badge-inactive'}>
                      {status}
                    </span>
                  </td>
                  <td>{new Date(u.createdAt).toLocaleDateString('en-GB', {day:'2-digit', month:'short', year:'numeric'})}</td>
                  <td>
                    <div className="au-actions-cell">
                      <button className="au-action-btn" onClick={() => navigate(`/admin/student/${u._id}`)}><Eye size={16} /></button>
                      <button className="au-action-btn"><MoreVertical size={16} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="au-pagination">
          <div className="au-page-info">Showing 1 to {Math.min(10, filteredUsers.length)} of {filteredUsers.length} students</div>
          <div className="au-page-btns">
            <button className="au-page-btn">{'<'}</button>
            <button className="au-page-btn active">1</button>
            <button className="au-page-btn">2</button>
            <button className="au-page-btn">3</button>
            <button className="au-page-btn" style={{border:'none', background:'none'}}>...</button>
            <button className="au-page-btn">{Math.ceil(filteredUsers.length/10) || 1}</button>
            <button className="au-page-btn">{'>'}</button>
          </div>
        </div>

      </div>

      {/* Add Student Modal — rendered via portal to bypass overflow stacking context */}
      {showAddStudent && createPortal(
        <AddStudentModal
          onClose={() => setShowAddStudent(false)}
          onCreated={() => { setShowAddStudent(false); fetchUsers(); }}
        />,
        document.body
      )}
    </div>
  );
}
