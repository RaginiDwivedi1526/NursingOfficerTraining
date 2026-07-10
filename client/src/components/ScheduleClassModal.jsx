import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Clock, AlignLeft, FileText } from 'lucide-react';
import axios from 'axios';

const ScheduleClassModal = ({ isOpen, onClose, onClassScheduled }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: 60,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const startTime = new Date(`${formData.date}T${formData.time}:00`).toISOString();
      const userStr = localStorage.getItem('nursingUser');
      const token = userStr ? JSON.parse(userStr).token : null;
      
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
      const url = baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`;
      const response = await axios.post(
        `${url}/live-classes`, 
        {
          title: formData.title,
          description: formData.description,
          startTime,
          duration: formData.duration,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      onClassScheduled(response.data);
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || err.response?.data || 'Failed to schedule class');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content slide-down">
        <div className="custom-modal-header">
          <h2>Schedule Google Meet Class</h2>
          <button onClick={onClose} className="close-modal-btn">
            <X size={24} />
          </button>
        </div>
        
        {error && (
          <div className="auth-error" style={{ marginBottom: '20px' }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="custom-modal-form">
          <div className="form-group-modern">
            <label>
              <FileText size={16} /> Class Title
            </label>
            <input 
              type="text" 
              name="title" 
              required 
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Anatomy - Skeletal System"
            />
          </div>
          
          <div className="form-group-modern">
            <label>
              <AlignLeft size={16} /> Description (Optional)
            </label>
            <textarea 
              name="description" 
              value={formData.description}
              onChange={handleChange}
              rows={2}
              placeholder="What will you cover in this session?"
            ></textarea>
          </div>
          
          <div className="form-row-modern">
            <div className="form-group-modern half-width">
              <label>
                <CalendarIcon size={16} /> Date
              </label>
              <input 
                type="date" 
                name="date" 
                required 
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <div className="form-group-modern half-width">
              <label>
                <Clock size={16} /> Time
              </label>
              <input 
                type="time" 
                name="time" 
                required 
                value={formData.time}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="form-group-modern">
            <label>
              <Clock size={16} /> Duration (minutes)
            </label>
            <select 
              name="duration" 
              value={formData.duration}
              onChange={handleChange}
            >
              <option value={30}>30 mins</option>
              <option value={45}>45 mins</option>
              <option value={60}>60 mins (1 hr)</option>
              <option value={90}>90 mins (1.5 hr)</option>
              <option value={120}>120 mins (2 hr)</option>
            </select>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary w-full schedule-submit-btn"
          >
            {loading ? (
               <><div className="spinner-small"></div> Scheduling...</>
            ) : (
               'Create & Schedule Class'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleClassModal;
