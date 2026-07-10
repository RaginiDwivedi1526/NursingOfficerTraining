import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, Video, Plus, Trash2, ArrowRight } from 'lucide-react';
import ScheduleClassModal from '../components/ScheduleClassModal';

const LiveClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const userStr = localStorage.getItem('nursingUser');
      const token = userStr ? JSON.parse(userStr).token : null;
      const res = await axios.get('http://localhost:5000/api/live-classes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClasses(res.data);
    } catch (error) {
      console.error('Error fetching live classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClassScheduled = (newClass) => {
    setClasses([newClass, ...classes].sort((a, b) => new Date(a.startTime) - new Date(b.startTime)));
  };

  const handleDeleteClass = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this class?')) return;
    try {
      const userStr = localStorage.getItem('nursingUser');
      const token = userStr ? JSON.parse(userStr).token : null;
      await axios.delete(`http://localhost:5000/api/live-classes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClasses(classes.filter(c => c._id !== id));
    } catch (error) {
      console.error('Error deleting class:', error);
      alert('Failed to cancel class');
    }
  };

  const getStatus = (startTime, durationMins) => {
    const start = new Date(startTime);
    const end = new Date(start.getTime() + durationMins * 60000);
    const now = new Date();

    if (now > end) return 'ended';
    if (now >= start && now <= end) return 'live';
    return 'upcoming';
  };

  return (
    <div className="live-classes-page page-container">
      <div className="live-header-banner">
        <div className="live-header-content">
          <div className="live-badge">
            <span className="live-dot pulse"></span>
            Interactive Learning
          </div>
          <h1>Live Classes Dashboard</h1>
          <p>Join our expert nursing educators for daily interactive sessions. Enhance your skills and prepare for your exams in real-time.</p>
        </div>
        
        {isAdmin && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn-primary schedule-btn"
          >
            <Plus size={20} />
            Schedule New Class
          </button>
        )}
      </div>

      <div className="live-main-content">
        {loading ? (
          <div className="loading-state">
            <div className="spinner-large"></div>
            <p>Loading your schedule...</p>
          </div>
        ) : classes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon-box">
              <Video size={40} />
            </div>
            <h3>No Classes Scheduled</h3>
            <p>There are no live classes scheduled at the moment. Take a break or explore our practice tests!</p>
          </div>
        ) : (
          <div className="live-grid">
            {classes.map((cls) => {
              const classDate = new Date(cls.startTime);
              const status = getStatus(cls.startTime, cls.duration);
              
              return (
                <div key={cls._id} className={`live-card status-${status}`}>
                  <div className="live-card-strip"></div>
                  
                  <div className="live-card-body">
                    <div className="live-card-top">
                      <span className={`status-badge badge-${status}`}>
                        {status === 'live' && <span className="live-dot pulse"></span>}
                        {status === 'live' ? 'Live Now' : status === 'upcoming' ? 'Upcoming' : 'Ended'}
                      </span>

                      {isAdmin && (
                        <button 
                          onClick={() => handleDeleteClass(cls._id)} 
                          className="delete-class-btn"
                          title="Cancel Class"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                    
                    <h3>{cls.title}</h3>
                    {cls.description && <p className="class-desc">{cls.description}</p>}
                    
                    <div className="class-meta">
                      <div className="meta-item">
                        <div className="meta-icon blue"><Calendar size={16} /></div>
                        <span>{classDate.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="meta-item">
                        <div className="meta-icon purple"><Clock size={16} /></div>
                        <span>
                          {classDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })} 
                          <span className="duration">({cls.duration} mins)</span>
                        </span>
                      </div>
                    </div>
                    
                    <a 
                      href={cls.meetLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`join-btn btn-${status}`}
                    >
                      <Video size={18} />
                      {status === 'ended' ? 'View Details' : 'Join Google Meet'}
                      {status !== 'ended' && <ArrowRight size={18} className="arrow-icon" />}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <ScheduleClassModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onClassScheduled={handleClassScheduled}
      />
    </div>
  );
};

export default LiveClasses;
