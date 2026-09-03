import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { 
  Radio, Users, Star, Heart, Play, Pause, Maximize, Settings,
  MessageSquare, FileText, Download, CheckCircle2, 
  Calendar, Clock, BookOpen, BrainCircuit, Bell, ArrowRight, Video, Target
} from 'lucide-react';
import './StudentLiveClasses.css';

export default function LiveClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const userStr = localStorage.getItem('nursingUser');
      const token = userStr ? JSON.parse(userStr).token : null;
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
      const url = baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`;
      const res = await axios.get(`${url}/live-classes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // The API currently might not have enough items, so we'll merge them with our UI structure if needed, 
      // but for this design we will show the fetched ones in the schedule or placeholders if empty.
      setClasses(res.data);
    } catch (error) {
      console.error('Error fetching live classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const scheduleMock = [
    { date: 'Today, 27 Aug', time: '07:00 PM - 08:00 PM', sub: 'Pharmacology', topic: 'Antibiotics - Complete Overview', fac: 'Dr. Rajendra Jinjwaria', cred: 'PhD | MSN', mode: 'live', bg: 'bg-purple' },
    { date: 'Tomorrow, 28 Aug', time: '07:00 PM - 08:00 PM', sub: 'Medical Surgical', topic: 'Cardiac Arrhythmias', fac: 'Prof. Anjali Singh', cred: 'MSc Nursing', mode: 'upcoming', bg: 'bg-green' },
    { date: 'Thu, 29 Aug', time: '07:00 PM - 08:00 PM', sub: 'Community Health', topic: 'Disease Surveillance', fac: 'Dr. Kavita Rao', cred: 'PhD (Community)', mode: 'upcoming', bg: 'bg-yellow' },
    { date: 'Fri, 30 Aug', time: '07:00 PM - 08:00 PM', sub: 'Child Health', topic: 'Immunization Schedule', fac: 'Ms. Ritu Yadav', cred: 'MSc Pediatric Nursing', mode: 'upcoming', bg: 'bg-red' },
    { date: 'Sat, 31 Aug', time: '07:00 PM - 08:00 PM', sub: 'Anatomy', topic: 'Respiratory System - Applied', fac: 'Dr. Neeraj Kumar', cred: 'MSc Nursing', mode: 'upcoming', bg: 'bg-blue' }
  ];

  return (
    <div className="slc-container">
      {/* Top Banner */}
      <div className="slc-top-banner">
        <div className="slc-title">
          <Radio size={32} className="slc-title-icon" />
          <div>
            <h1>Live Classes</h1>
            <p>Learn from India's top nursing faculty. Ask doubts. Interact. Excel.</p>
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

      {/* Hero Section */}
      <div className="slc-hero">
        {/* Video Player */}
        <div className="slc-video-box">
          <div className="slc-video-top">
            <div className="slc-live-badge"><Radio size={14}/> LIVE NOW</div>
            <div className="slc-watchers"><Users size={14}/> 1,248 students watching</div>
          </div>
          <div className="slc-video-content">
            <div className="slc-video-left">
              <div className="slc-video-title">Pharmacology</div>
              <div className="slc-video-sub">Antibiotics - Complete Overview</div>
              
              <div className="slc-instructor">
                <div className="slc-inst-img">
                  {/* Mock Image Placeholder */}
                </div>
                <div className="slc-inst-info">
                  <div className="slc-inst-name">Dr. Rajendra Jinjwaria</div>
                  <div className="slc-inst-creds">PhD | MSN | RN<br/>Nurse Educator & Mentor</div>
                </div>
              </div>

              <div className="slc-video-features">
                <div className="slc-v-feat"><CheckCircle2 size={16}/> Live Interaction</div>
                <div className="slc-v-feat"><CheckCircle2 size={16}/> Real Examples</div>
                <div className="slc-v-feat"><CheckCircle2 size={16}/> Exam Focused</div>
                <div className="slc-v-feat"><CheckCircle2 size={16}/> PYQ Discussion</div>
              </div>
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
            <div style={{display:'flex',gap:16,alignItems:'center'}}>
              <Pause size={18} cursor="pointer"/>
              <div style={{fontSize:13,fontWeight:600}}><span style={{color:'#ef4444'}}>● LIVE</span></div>
            </div>
            <div style={{display:'flex',gap:16,alignItems:'center'}}>
              <div style={{fontSize:12,fontWeight:700,border:'1px solid white',padding:'2px 6px',borderRadius:4}}>HD</div>
              <Settings size={18} cursor="pointer"/>
              <Maximize size={18} cursor="pointer"/>
            </div>
          </div>
        </div>

        {/* Live Chat */}
        <div className="slc-chat">
          <div className="slc-chat-header">
            Live Chat
            <div className="slc-chat-online"><span style={{width:6,height:6,background:'#10b981',borderRadius:3}}></span> 1.2K online</div>
          </div>
          <div className="slc-chat-tabs">
            <div className="slc-chat-tab active">Top Chat</div>
            <div className="slc-chat-tab">My Doubts</div>
          </div>
          <div className="slc-chat-msgs">
            <div className="slc-msg">
              <div className="slc-msg-avatar"></div>
              <div className="slc-msg-content">
                <div className="slc-msg-head"><span className="slc-msg-name">Neha Verma</span><span className="slc-msg-time">7:30 PM</span></div>
                <div className="slc-msg-text">Sir, cephalosporins and penicillins में major difference क्या है?</div>
              </div>
            </div>
            <div className="slc-msg">
              <div className="slc-msg-avatar"></div>
              <div className="slc-msg-content">
                <div className="slc-msg-head"><span className="slc-msg-name">Aman Patel</span><span className="slc-msg-time">7:31 PM</span></div>
                <div className="slc-msg-text">Great explanation sir! 👍</div>
              </div>
            </div>
            <div className="slc-msg">
              <div className="slc-msg-avatar"></div>
              <div className="slc-msg-content">
                <div className="slc-msg-head"><span className="slc-msg-name">Shalini Gupta</span><span className="slc-msg-time">7:31 PM</span></div>
                <div className="slc-msg-text">Notes मिल जाएंगे क्या class के बाद?</div>
              </div>
            </div>
            <div className="slc-msg">
              <div className="slc-msg-avatar"></div>
              <div className="slc-msg-content tutor">
                <div className="slc-msg-head"><span className="slc-msg-name" style={{color:'#1d4ed8'}}>Dr. Jinjwaria</span><span className="slc-msg-time">7:32 PM</span></div>
                <div className="slc-msg-text">Yes Neha, class के end में comparison chart साझा करूंगा। Please note down key points.</div>
              </div>
            </div>
          </div>
          <div className="slc-chat-input">
            <input type="text" placeholder="Type your doubt..." />
            <button className="slc-chat-send"><ArrowRight size={18}/></button>
          </div>
        </div>
      </div>

      {/* Today's Live Session Bar */}
      <div className="slc-today-bar">
        <div className="slc-tb-title">Today's Live Session</div>
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
          <div className="slc-tb-info"><span className="slc-tb-lbl">Class Notes</span><span className="slc-tb-val">PDF After Class</span></div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="slc-bottom">
        {/* Schedule Table */}
        <div className="slc-schedule">
          <div className="slc-sch-head">
            <div className="slc-sch-title">Live Class Schedule</div>
            <div className="slc-sch-filters">
              <button className="slc-sch-btn active">This Week</button>
              <button className="slc-sch-btn outline">Next Week</button>
              <button className="slc-sch-btn outline">NORCET 2024 ▼</button>
              <button className="slc-sch-btn outline">All Subjects ▼</button>
              <button className="slc-sch-btn view-cal">View Calendar</button>
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
              {scheduleMock.map((item, idx) => (
                <tr key={idx}>
                  <td><div className="slc-date-col"><span>{item.date}</span><span>{item.time}</span></div></td>
                  <td><span className={`slc-sub-badge ${item.bg}`}>{item.sub}</span></td>
                  <td style={{fontWeight:500}}>{item.topic}</td>
                  <td>
                    <div className="slc-fac-col">
                      <div className="slc-fac-img"></div>
                      <div>
                        <span className="slc-fac-name">{item.fac}</span>
                        <span className="slc-fac-cred">{item.cred}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    {item.mode === 'live' ? (
                      <span style={{color:'#ef4444', fontWeight:700, fontSize:12, display:'flex', alignItems:'center', gap:4}}><span style={{width:6,height:6,background:'#ef4444',borderRadius:3}}></span> LIVE</span>
                    ) : (
                      <span style={{color:'#4f46e5', fontWeight:600, fontSize:12}}>Live</span>
                    )}
                  </td>
                  <td>
                    {item.mode === 'live' ? (
                      <button className="slc-join-btn">Join Now <Play size={12}/></button>
                    ) : (
                      <button className="slc-rem-btn"><Bell size={12}/> Set Reminder</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Resources & AI */}
        <div>
          <div className="slc-ai-widget">
            <div>
              <div className="slc-ai-w-title"><BrainCircuit size={16}/> Ask AI During Class</div>
              <div className="slc-ai-w-sub">Get instant concept clarity with our AI Mentor</div>
              <button className="slc-ai-w-btn">Ask Now →</button>
            </div>
            <div style={{width:64,height:64,background:'white',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#8b5cf6',boxShadow:'0 4px 12px rgba(0,0,0,0.05)'}}>
              <BrainCircuit size={32}/>
            </div>
          </div>

          <div className="slc-resources">
            <div className="slc-res-head">Study Resources <span style={{fontSize:12,color:'#4f46e5',cursor:'pointer'}}>View All</span></div>
            <div className="slc-res-list">
              <div className="slc-res-item">
                <div className="slc-res-icon"><FileText size={18}/></div>
                <div className="slc-res-info">
                  <div className="slc-res-name">Today's Class Notes</div>
                  <div className="slc-res-size">PDF • 2.4 MB</div>
                </div>
                <button className="slc-res-dl">Download</button>
              </div>
              <div className="slc-res-item">
                <div className="slc-res-icon"><FileText size={18}/></div>
                <div className="slc-res-info">
                  <div className="slc-res-name">Antibiotics Cheat Sheet</div>
                  <div className="slc-res-size">PDF • 1.8 MB</div>
                </div>
                <button className="slc-res-dl">Download</button>
              </div>
              <div className="slc-res-item">
                <div className="slc-res-icon" style={{background:'#e0e7ff', color:'#4f46e5'}}><FileText size={18}/></div>
                <div className="slc-res-info">
                  <div className="slc-res-name">Previous Year Questions</div>
                  <div className="slc-res-size">PDF • 1.2 MB</div>
                </div>
                <button className="slc-res-dl">Download</button>
              </div>
              <div className="slc-res-item">
                <div className="slc-res-icon" style={{background:'#dcfce7', color:'#10b981'}}><FileText size={18}/></div>
                <div className="slc-res-info">
                  <div className="slc-res-name">Handwritten Notes</div>
                  <div className="slc-res-size">PDF • 3.1 MB</div>
                </div>
                <button className="slc-res-dl">Download</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Banner */}
      <div className="slc-footer-banner">
        <div className="slc-fb-title">Why Our Live Classes Are Different?</div>
        <div className="slc-fb-features">
          <div className="slc-fbf-item"><div className="slc-fbf-icon"><Users size={20}/></div><div className="slc-fbf-text">Expert Faculty with real exam experience</div></div>
          <div className="slc-fbf-item"><div className="slc-fbf-icon"><BrainCircuit size={20}/></div><div className="slc-fbf-text">Concepts with clinical examples</div></div>
          <div className="slc-fbf-item"><div className="slc-fbf-icon"><FileText size={20}/></div><div className="slc-fbf-text">PYQ based discussion</div></div>
          <div className="slc-fbf-item"><div className="slc-fbf-icon"><MessageSquare size={20}/></div><div className="slc-fbf-text">Live doubt solving</div></div>
          <div className="slc-fbf-item"><div className="slc-fbf-icon"><Download size={20}/></div><div className="slc-fbf-text">Notes after each class</div></div>
          <div className="slc-fbf-item"><div className="slc-fbf-icon"><Video size={20}/></div><div className="slc-fbf-text">Recorded version for lifetime access</div></div>
        </div>
        <button className="slc-fb-btn">Explore All Live Classes →</button>
      </div>

    </div>
  );
}
