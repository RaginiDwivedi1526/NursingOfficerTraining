import { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Shield, Trash2, ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      };
      const { data } = await axios.get('http://localhost:5000/api/admin/users', config);
      setUsers(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const updateRole = async (id, role) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      };
      await axios.put(`http://localhost:5000/api/admin/users/${id}/role`, { role }, config);
      setMessage({ text: 'User role updated successfully', type: 'success' });
      fetchUsers();
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Update failed', type: 'error' });
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      };
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, config);
      setMessage({ text: 'User deleted successfully', type: 'success' });
      fetchUsers();
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Delete failed', type: 'error' });
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading"><div className="spinner"></div></div>;

  return (
    <div className="test-list-page">
      <div style={{ marginBottom: '20px' }}>
        <Link to="/admin" className="btn-outline" style={{ padding: '8px 16px', fontSize: '13px' }}>
          <ArrowLeft size={14} /> Back to Admin
        </Link>
      </div>

      <div className="dash-header">
        <div>
          <h1>Student Management</h1>
          <p className="subtitle">Manage user permissions and account status</p>
        </div>
        <div className="search-box" style={{ display: 'flex', alignItems: 'center', background: 'white', padding: '8px 15px', borderRadius: '10px', border: '1px solid var(--light-gray)' }}>
          <Search size={18} color="var(--gray)" />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            style={{ border: 'none', marginLeft: '10px', outline: 'none', fontSize: '14px', width: '250px' }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {message.text && (
        <div className={message.type === 'success' ? 'free-badge' : 'auth-error'} style={{ marginBottom: '20px', padding: '12px' }}>
          {message.text}
        </div>
      )}

      <div className="topics-card" style={{ padding: '0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: 'var(--off-white)', borderBottom: '1px solid var(--light-gray)' }}>
            <tr>
              <th style={{ padding: '15px 20px', fontSize: '13px', color: 'var(--gray)' }}>USER</th>
              <th style={{ padding: '15px 20px', fontSize: '13px', color: 'var(--gray)' }}>PLAN</th>
              <th style={{ padding: '15px 20px', fontSize: '13px', color: 'var(--gray)' }}>JOINED</th>
              <th style={{ padding: '15px 20px', fontSize: '13px', color: 'var(--gray)' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u._id} style={{ borderBottom: '1px solid var(--light-gray)' }}>
                <td style={{ padding: '15px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="nav-user-avatar" style={{ width: '32px', height: '32px', fontSize: '13px' }}>
                      {u.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '14px' }}>{u.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--gray)' }}>{u.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '15px 20px' }}>
                  <select 
                    value={u.role} 
                    onChange={(e) => updateRole(u._id, e.target.value)}
                    style={{ padding: '4px 8px', borderRadius: '6px', fontSize: '13px', border: '1px solid var(--light-gray)' }}
                  >
                    <option value="free">Free</option>
                    <option value="basic">Basic</option>
                    <option value="standard">Standard</option>
                    <option value="pro">Pro</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td style={{ padding: '15px 20px', fontSize: '13px', color: 'var(--gray)' }}>
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: '15px 20px' }}>
                  <button 
                    onClick={() => deleteUser(u._id)}
                    style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', padding: '5px' }}
                    title="Delete User"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;
