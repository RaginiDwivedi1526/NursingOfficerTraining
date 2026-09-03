import React, { useState } from 'react';
import axios from 'axios';
import { X, Save, User, Mail, Phone, Target, Shield, BookOpen } from 'lucide-react';
import './AddStudentModal.css'; // Reuse styles from AddStudentModal where possible

export default function EditStudentModal({ student, onClose, onUpdated }) {
  const [form, setForm] = useState({
    name: student.name || '',
    email: student.email || '',
    phone: student.phone || '',
    role: student.role || 'free',
    examGoal: student.examGoal || '',
    batch: student.batch || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const userStr = localStorage.getItem('nursingUser');
      const token = userStr ? JSON.parse(userStr).token : null;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
      const url = baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`;
      
      // Update logic: assuming PUT /api/admin/users/:id exists or we can use the role endpoint.
      // Wait, we only have PUT /api/admin/users/:id/role right now. 
      // I should add a PUT /api/admin/users/:id to update all details.
      await axios.put(`${url}/admin/users/${student._id}`, form, config);
      onUpdated();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to update student');
      setLoading(false);
    }
  };

  return (
    <div className="asm-overlay">
      <div className="asm-modal" style={{ maxWidth: '500px' }}>
        <div className="asm-header">
          <div className="asm-title">
            <span className="asm-title-icon"><User size={18} /></span>
            <h2>Edit Student</h2>
          </div>
          <button className="asm-close" onClick={onClose}><X size={20}/></button>
        </div>
        
        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {error && <div style={{ color: 'red', fontSize: '14px', marginBottom: '8px' }}>{error}</div>}
          
          <div className="asm-input-wrap">
            <span className="asm-input-icon"><User size={15}/></span>
            <input name="name" value={form.name} onChange={handleChange} className="asm-input" placeholder="Full Name" required />
          </div>
          
          <div className="asm-input-wrap">
            <span className="asm-input-icon"><Mail size={15}/></span>
            <input name="email" value={form.email} onChange={handleChange} className="asm-input" placeholder="Email" type="email" required />
          </div>
          
          <div className="asm-input-wrap">
            <span className="asm-input-icon"><Phone size={15}/></span>
            <input name="phone" value={form.phone} onChange={handleChange} className="asm-input" placeholder="Phone Number" />
          </div>
          
          <div className="asm-input-wrap">
            <span className="asm-input-icon"><Target size={15}/></span>
            <input name="examGoal" value={form.examGoal} onChange={handleChange} className="asm-input" placeholder="Exam Goal (e.g. NORCET 2025)" />
          </div>

          <div className="asm-input-wrap">
            <span className="asm-input-icon"><BookOpen size={15}/></span>
            <input name="batch" value={form.batch} onChange={handleChange} className="asm-input" placeholder="Batch Name" />
          </div>
          
          <div className="asm-input-wrap">
            <span className="asm-input-icon"><Shield size={15}/></span>
            <select name="role" value={form.role} onChange={handleChange} className="asm-select" style={{ paddingLeft: '40px' }}>
              <option value="free">Free</option>
              <option value="basic">Basic</option>
              <option value="standard">Standard</option>
              <option value="pro">Pro</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
            <button type="button" onClick={onClose} className="asm-btn-outline" style={{ padding: '8px 16px' }}>Cancel</button>
            <button type="submit" disabled={loading} className="asm-btn-primary" style={{ padding: '8px 16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Save size={16} /> {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
