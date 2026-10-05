import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { 
  Radio, Users, Star, Heart, Play, Pause, Maximize, Settings,
  MessageSquare, FileText, Download, CheckCircle2, 
  Calendar, Clock, BookOpen, BrainCircuit, Bell, ArrowRight, Video, Target, X, Send, Sparkles
} from 'lucide-react';
import './StudentLiveClasses.css';

export default function LiveClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Interactive Live Chat State
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, name: 'Neha Verma', time: '7:30 PM', text: 'Sir, cephalosporins and penicillins में major difference क्या है?', isTutor: false },
    { id: 2, name: 'Aman Patel', time: '7:31 PM', text: 'Great explanation sir! High yield for NORCET 👍', isTutor: false },
    { id: 3, name: 'Shalini Gupta', time: '7:31 PM', text: 'Notes मिल जाएंगे क्या class के बाद?', isTutor: false },
    { id: 4, name: 'Dr. Jinjwaria (Tutor)', time: '7:32 PM', text: 'Yes Neha, class के end में comparison chart साझा करूंगा। Please note down key points.', isTutor: true },
  ]);

  // Interactive Video Player State
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeFilter, setActiveFilter] = useState('This Week');
  const [subjectFilter, setSubjectFilter] = useState('All Subjects');
  const [reminders, setReminders] = useState({});

  // Interactive AI Modal State
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  // Active Join Modal State
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const userStr = localStorage.getItem('nursingUser');
      const token = userStr ? JSON.parse(userStr).token : null;
      const baseUrl = import.meta.env.VITE_API_BASE_URL || '/api';
      const res = await axios.get(`${baseUrl}/live-classes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (Array.isArray(res.data) && res.data.length > 0) {
        setClasses(res.data);
      }
    } catch (error) {
      console.error('Error fetching live classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg = {
      id: Date.now(),
      name: user?.name || 'Student',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: chatInput,
      isTutor: false
    };

    setChatMessages(prev => [...prev, newMsg]);
    setChatInput('');

    // Simulate tutor response after 2 seconds
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          name: 'Dr. Jinjwaria (Tutor)',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `Thank you ${user?.name?.split(' ')[0] || 'Student'}, very important question. Let us break it down on the slide right now.`,
          isTutor: true
        }
      ]);
    }, 2000);
  };

  const toggleReminder = (idx) => {
    setReminders(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleAskAI = async (e) => {
    e?.preventDefault();
    if (!aiQuestion.trim() || aiLoading) return;
    setAiLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || '/api';
      const res = await axios.post(`${baseUrl}/ai/chat`, {
        messages: [{ role: 'user', content: aiQuestion }]
      });
      setAiResponse(res.data?.reply || 'Here is the detailed clinical explanation for your doubt.');
    } catch (err) {
      setAiResponse('Pharmacology Tip: Penicillins and Cephalosporins are both Beta-Lactam antibiotics, but Cephalosporins have higher resistance against beta-lactamase enzymes.');
    } finally {
      setAiLoading(false);
    }
  };

  const scheduleList = [
    { id: 1, date: 'Today', time: '07:00 PM - 08:00 PM', sub: 'Pharmacology', topic: 'Antibiotics & Antimicrobial Therapy - Complete Overview', fac: 'Dr. Rajendra Jinjwaria', cred: 'PhD | MSN | RN', mode: 'live', bg: 'bg-purple', meetUrl: 'https://meet.google.com/abc-defg-hij' },
    { id: 2, date: 'Tomorrow', time: '07:00 PM - 08:00 PM', sub: 'Medical Surgical Nursing', topic: 'Cardiac Arrhythmias & ECG Interpretation', fac: 'Prof. Anjali Singh', cred: 'MSc Nursing', mode: 'upcoming', bg: 'bg-green', meetUrl: 'https://meet.google.com/xyz-uvwx-rst' },
    { id: 3, date: 'Thu, 29 Aug', time: '07:00 PM - 08:00 PM', sub: 'Community Health', topic: 'Disease Surveillance & Epidemiology Ratios', fac: 'Dr. Kavita Rao', cred: 'PhD (Community)', mode: 'upcoming', bg: 'bg-yellow', meetUrl: 'https://meet.google.com/mno-pqrst-uvw' },
    { id: 4, date: 'Fri, 30 Aug', time: '07:00 PM - 08:00 PM', sub: 'Child Health Nursing', topic: 'Immunization Schedule & Pediatric Dosages', fac: 'Ms. Ritu Yadav', cred: 'MSc Pediatric Nursing', mode: 'upcoming', bg: 'bg-red', meetUrl: 'https://meet.google.com/ijk-lmno-pqr' },
    { id: 5, date: 'Sat, 31 Aug', time: '07:00 PM - 08:00 PM', sub: 'Anatomy & Physiology', topic: 'Respiratory System Mechanics & Blood Gases', fac: 'Dr. Neeraj Kumar', cred: 'MSc Nursing', mode: 'upcoming', bg: 'bg-blue', meetUrl: 'https://meet.google.com/def-ghij-klm' }
  ];

  const filteredSchedule = scheduleList.filter(item => {
    if (subjectFilter !== 'All Subjects' && item.sub !== subjectFilter) return false;
    return true;
  });

  const handleJoinClass = (cls) => {
    setSelectedClass(cls);
    setShowJoinModal(true);
  };

  return (
    <div className="slc-container">
      {/* Top Banner */}
      <div className="slc-top-banner">
        <div className="slc-title">
          <Radio size={32} className="slc-title-icon" />
          <div>
            <h1>Live Interactive Classes</h1>
            <p>Learn directly from top nursing educators. Ask live doubts and master high-yield NORCET concepts.</p>
          </div>
        </div>
        <div className="slc-stats">
          <div className="slc-stat-item">
            <div className="slc-stat-val">10+</div>
            <div className="slc-stat-lbl">Live Classes / Week</div>
          </div>
          <div className="slc-stat-item">
            <div className="slc-stat-val">25,000+</div>
            <div className="slc-stat-lbl">Active Students</div>
          </div>
          <div className="slc-stat-item">
            <div className="slc-stat-val">4.9/5 <Star size={14} color="#f59e0b" fill="#f59e0b"/></div>
            <div className="slc-stat-lbl">Student Rating</div>
          </div>
        </div>
        <div className="slc-promo-badge">
          <Heart size={16} fill="#e11d48" color="#e11d48"/>
          <div>Together We Prepare<br/>For Your Selection</div>
        </div>
      </div>

      {/* Hero Section: Live Stream & Live Chat */}
      <div className="slc-hero">
        {/* Video Player */}
        <div className="slc-video-box">
          <div className="slc-video-top">
            <div className="slc-live-badge"><Radio size={14}/> LIVE NOW</div>
            <div className="slc-watchers"><Users size={14}/> 1,248 students watching live</div>
          </div>
          
          <div className="slc-video-content">
            <div className="slc-video-left">
              <div className="slc-video-title">Pharmacology Masterclass</div>
              <div className="slc-video-sub">Antibiotics - Complete Classification & Clinical Uses</div>
              
              <div className="slc-instructor">
                <div className="slc-inst-img" style={{ background: '#4f46e5', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 18 }}>
                  RJ
                </div>
                <div className="slc-inst-info">
                  <div className="slc-inst-name">Dr. Rajendra Jinjwaria</div>
                  <div className="slc-inst-creds">PhD | MSN | RN<br/>Nurse Educator & NORCET Mentor</div>
                </div>
              </div>

              <div className="slc-video-features">
                <div className="slc-v-feat"><CheckCircle2 size={16}/> Live Chat Interaction</div>
                <div className="slc-v-feat"><CheckCircle2 size={16}/> Clinical Scenarios</div>
                <div className="slc-v-feat"><CheckCircle2 size={16}/> Exam High-Yield</div>
                <div className="slc-v-feat"><CheckCircle2 size={16}/> PYQ Discussion</div>
              </div>

              <button 
                onClick={() => handleJoinClass(scheduleList[0])}
                className="slc-join-btn" 
                style={{ marginTop: 20, padding: '12px 24px', fontSize: 15, width: 'max-content', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
              >
                Join Google Meet Room <Play size={16}/>
              </button>
            </div>

            <div className="slc-video-right">
              <div className="slc-slide-title">Classification of Antibiotics</div>
              <div className="slc-diagram">
                <div className="slc-d-main">Antibiotics</div>
                <div className="slc-d-lines">
                  <div className="slc-d-line"></div><div className="slc-d-line"></div><div className="slc-d-line"></div><div className="slc-d-line"></div><div className="slc-d-line"></div>
                </div>
                <div className="slc-d-nodes">
                  <div className="slc-d-node"><div className="slc-d-ntitle">Beta Lactams</div><div className="slc-d-nsub">(Penicillins, Cephalosporins)</div></div>
                  <div className="slc-d-node"><div className="slc-d-ntitle">Aminoglycosides</div><div className="slc-d-nsub">(Gentamicin, Amikacin)</div></div>
                  <div className="slc-d-node"><div className="slc-d-ntitle">Macrolides</div><div className="slc-d-nsub">(Azithromycin, Erythromycin)</div></div>
                  <div className="slc-d-node"><div className="slc-d-ntitle">Tetracyclines</div><div className="slc-d-nsub">(Doxycycline, Tetracycline)</div></div>
                  <div className="slc-d-node"><div className="slc-d-ntitle">Fluoroquinolones</div><div className="slc-d-nsub">(Ciprofloxacin, Levofloxacin)</div></div>
                </div>
              </div>
            </div>
          </div>

          <div className="slc-video-controls">
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <button 
                onClick={() => setIsPlaying(!isPlaying)} 
                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
              >
                {isPlaying ? <Pause size={18}/> : <Play size={18}/>}
              </button>
              <div style={{ fontSize: 13, fontWeight: 600 }}>
                <span style={{ color: '#ef4444' }}>● LIVE STREAM</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ fontSize: 12, fontWeight: 700, border: '1px solid white', padding: '2px 6px', borderRadius: 4 }}>1080p HD</div>
              <Settings size={18} cursor="pointer"/>
              <Maximize size={18} cursor="pointer"/>
            </div>
          </div>
        </div>

        {/* Live Interactive Chat Box */}
        <div className="slc-chat">
          <div className="slc-chat-header">
            Live Class Doubts Chat
            <div className="slc-chat-online"><span style={{ width: 6, height: 6, background: '#10b981', borderRadius: 3 }}></span> 1.2K Online</div>
          </div>
          <div className="slc-chat-tabs">
            <div className="slc-chat-tab active">Top Chat</div>
            <div className="slc-chat-tab">Instructor Doubts</div>
          </div>
          
          <div className="slc-chat-msgs" style={{ overflowY: 'auto', height: 320, padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {chatMessages.map((msg) => (
              <div className="slc-msg" key={msg.id}>
                <div 
                  className="slc-msg-avatar" 
                  style={{ background: msg.isTutor ? '#1d4ed8' : '#64748b', color: '#fff', width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 'bold' }}
                >
                  {msg.name.charAt(0)}
                </div>
                <div className={`slc-msg-content ${msg.isTutor ? 'tutor' : ''}`}>
                  <div className="slc-msg-head">
                    <span className="slc-msg-name" style={{ color: msg.isTutor ? '#1d4ed8' : '#0f172a', fontWeight: msg.isTutor ? 700 : 600 }}>
                      {msg.name}
                    </span>
                    <span className="slc-msg-time">{msg.time}</span>
                  </div>
                  <div className="slc-msg-text">{msg.text}</div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="slc-chat-input">
            <input 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask a doubt live in class..." 
            />
            <button type="submit" className="slc-chat-send" style={{ cursor: 'pointer' }}><ArrowRight size={18}/></button>
          </form>
        </div>
      </div>

      {/* Today's Live Session Bar */}
      <div className="slc-today-bar">
        <div className="slc-tb-title">Today's Live Session Details</div>
        <div className="slc-tb-item">
          <div className="slc-tb-icon"><BookOpen size={18}/></div>
          <div className="slc-tb-info"><span className="slc-tb-lbl">Subject</span><span className="slc-tb-val">Pharmacology</span></div>
        </div>
        <div className="slc-tb-item">
          <div className="slc-tb-icon"><Target size={18}/></div>
          <div className="slc-tb-info"><span className="slc-tb-lbl">Topic</span><span className="slc-tb-val">Antibiotics</span></div>
        </div>
        <div className="slc-tb-item">
          <div className="slc-tb-icon"><Clock size={18}/></div>
          <div className="slc-tb-info"><span className="slc-tb-lbl">Duration</span><span className="slc-tb-val">60 Minutes</span></div>
        </div>
        <div className="slc-tb-item">
          <div className="slc-tb-icon"><MessageSquare size={18}/></div>
          <div className="slc-tb-info"><span className="slc-tb-lbl">Language</span><span className="slc-tb-val">Hinglish</span></div>
        </div>
        <div className="slc-tb-item">
          <div className="slc-tb-icon"><FileText size={18}/></div>
          <div className="slc-tb-info"><span className="slc-tb-lbl">Class Notes</span><span className="slc-tb-val">PDF Notes Included</span></div>
        </div>
      </div>

      {/* Schedule Table & AI Widget */}
      <div className="slc-bottom">
        <div className="slc-schedule">
          <div className="slc-sch-head">
            <div className="slc-sch-title">Upcoming Live Class Schedule</div>
            <div className="slc-sch-filters">
              {['This Week', 'Next Week'].map(tab => (
                <button 
                  key={tab}
                  className={`slc-sch-btn ${activeFilter === tab ? 'active' : 'outline'}`}
                  onClick={() => setActiveFilter(tab)}
                >
                  {tab}
                </button>
              ))}
              <select 
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="slc-sch-btn outline"
                style={{ cursor: 'pointer' }}
              >
                <option value="All Subjects">All Subjects ▼</option>
                <option value="Pharmacology">Pharmacology</option>
                <option value="Medical Surgical Nursing">Medical Surgical</option>
                <option value="Community Health">Community Health</option>
                <option value="Child Health Nursing">Child Health</option>
                <option value="Anatomy & Physiology">Anatomy & Physiology</option>
              </select>
            </div>
          </div>

          <table className="slc-table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Subject</th>
                <th>Topic</th>
                <th>Faculty</th>
                <th>Mode</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSchedule.map((item, idx) => (
                <tr key={idx}>
                  <td><div className="slc-date-col"><span>{item.date}</span><span>{item.time}</span></div></td>
                  <td><span className={`slc-sub-badge ${item.bg}`}>{item.sub}</span></td>
                  <td style={{ fontWeight: 500 }}>{item.topic}</td>
                  <td>
                    <div className="slc-fac-col">
                      <div className="slc-fac-img" style={{ background: '#3b82f6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 12 }}>
                        {item.fac.charAt(0)}
                      </div>
                      <div>
                        <span className="slc-fac-name">{item.fac}</span>
                        <span className="slc-fac-cred">{item.cred}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    {item.mode === 'live' ? (
                      <span style={{ color: '#ef4444', fontWeight: 700, fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ width: 6, height: 6, background: '#ef4444', borderRadius: 3 }}></span> LIVE NOW
                      </span>
                    ) : (
                      <span style={{ color: '#4f46e5', fontWeight: 600, fontSize: 12 }}>Upcoming</span>
                    )}
                  </td>
                  <td>
                    {item.mode === 'live' ? (
                      <button className="slc-join-btn" onClick={() => handleJoinClass(item)} style={{ cursor: 'pointer' }}>
                        Join Now <Play size={12}/>
                      </button>
                    ) : (
                      <button 
                        className="slc-rem-btn" 
                        onClick={() => toggleReminder(idx)}
                        style={{ cursor: 'pointer', background: reminders[idx] ? '#dcfce7' : '#f1f5f9', color: reminders[idx] ? '#15803d' : '#475569' }}
                      >
                        <Bell size={12}/> {reminders[idx] ? 'Reminder Set! 🔔' : 'Set Reminder'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Resources & AI Widget */}
        <div>
          <div className="slc-ai-widget">
            <div>
              <div className="slc-ai-w-title"><BrainCircuit size={16}/> Ask AI Tutor During Class</div>
              <div className="slc-ai-w-sub">Instant concept clarity & dosage calculations</div>
              <button className="slc-ai-w-btn" onClick={() => setShowAiModal(true)} style={{ cursor: 'pointer' }}>
                Ask AI Doubt →
              </button>
            </div>
            <div style={{ width: 64, height: 64, background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <BrainCircuit size={32}/>
            </div>
          </div>

          <div className="slc-resources">
            <div className="slc-res-head">Class PDF Downloads</div>
            <div className="slc-res-list">
              {[
                { name: "Today's Pharmacology Class Notes", size: 'PDF • 2.4 MB' },
                { name: 'Antibiotics Classification Cheat Sheet', size: 'PDF • 1.8 MB' },
                { name: 'NORCET PYQ Pharmacology Discussion', size: 'PDF • 1.2 MB' },
                { name: 'Handwritten Key Points Notes', size: 'PDF • 3.1 MB' }
              ].map((res, i) => (
                <div className="slc-res-item" key={i}>
                  <div className="slc-res-icon"><FileText size={18}/></div>
                  <div className="slc-res-info">
                    <div className="slc-res-name">{res.name}</div>
                    <div className="slc-res-size">{res.size}</div>
                  </div>
                  <button 
                    className="slc-res-dl"
                    onClick={() => alert(`Downloading "${res.name}"...`)}
                    style={{ cursor: 'pointer' }}
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Doubt Modal */}
      {showAiModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: '#ffffff', borderRadius: 16, padding: 24, width: '90%', maxWidth: 460, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 18, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Sparkles size={18} color="#8b5cf6"/> Ask AI Live Mentor
              </h3>
              <button onClick={() => setShowAiModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><X size={20}/></button>
            </div>
            
            <form onSubmit={handleAskAI}>
              <textarea 
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                placeholder="Ask any nursing concept, dosage calculation or doubt..."
                rows={3}
                style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14, fontFamily: 'inherit', resize: 'none' }}
              />
              <button 
                type="submit" 
                disabled={aiLoading}
                style={{ marginTop: 12, width: '100%', padding: '10px 0', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}
              >
                {aiLoading ? 'Asking AI Mentor...' : 'Get Instant Answer'}
              </button>
            </form>

            {aiResponse && (
              <div style={{ marginTop: 16, padding: 12, background: '#f8fafc', borderRadius: 8, borderLeft: '4px solid #8b5cf6', fontSize: 13, color: '#334155', lineHeight: 1.5 }}>
                <strong>AI Explanation:</strong> {aiResponse}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Join Meeting Modal */}
      {showJoinModal && selectedClass && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: '#ffffff', borderRadius: 16, padding: 24, width: '90%', maxWidth: 440, textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🎥</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: 18, color: '#0f172a' }}>{selectedClass.topic}</h3>
            <p style={{ fontSize: 13, color: '#64748b', marginBottom: 20 }}>Faculty: {selectedClass.fac} ({selectedClass.cred})</p>
            
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button 
                onClick={() => setShowJoinModal(false)}
                style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', fontWeight: 600 }}
              >
                Cancel
              </button>
              <a 
                href={selectedClass.meetUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => setShowJoinModal(false)}
                style={{ padding: '10px 24px', borderRadius: 8, border: 'none', background: '#10b981', color: '#fff', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                Launch Google Meet Room →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
