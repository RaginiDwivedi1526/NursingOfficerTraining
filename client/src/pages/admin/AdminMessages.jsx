import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Plus, Download, Search, Filter, MoreVertical, Users, CheckCircle, User, FileText, Send, Smile, Paperclip, Bell, Trash2 } from 'lucide-react';
import './AdminMessages.css';

const MOCK_CHATS = [
  { id: 1, name: 'Anjali Sharma', role: 'Student • B.Sc. Nursing 2nd Year', msg: 'Sir, I have a doubt in the Pharmacology chapter.', time: '10:30 AM', unread: 2, isOnline: true },
  { id: 2, name: 'Rohit Kumar', role: 'Student', msg: 'Please share the assignment details for Medical-Surgical...', time: '09:15 AM', unread: 1, isOnline: false },
  { id: 3, name: 'Priya Verma', role: 'Student', msg: 'Thank you sir! The test series is really helpful.', time: 'Yesterday', unread: 0, isOnline: false },
  { id: 4, name: 'Faculty Group', role: 'Group', msg: 'Dr. Meena: Please review the new test questions.', time: 'Yesterday', unread: 3, isGroup: true },
  { id: 5, name: 'System Updates', role: 'System', msg: 'Scheduled maintenance on 25 May from 01:00 AM to 03:00 AM.', time: '23 May', unread: 0, isSystem: true },
  { id: 6, name: 'Arjun Singh', role: 'Student', msg: 'When will the next live class be scheduled?', time: '22 May', unread: 0, isOnline: false },
  { id: 7, name: 'Neha Patel', role: 'Student', msg: 'Can you share the notes for yesterday\'s class?', time: '20 May', unread: 0, isOnline: false }
];

export default function AdminMessages() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [activeChatId, setActiveChatId] = useState(1);

  const activeChat = MOCK_CHATS.find(c => c.id === activeChatId);

  return (
    <div className="am-page">
      <div className="am-header">
        <div className="am-header-left">
          <div className="am-header-icon"><MessageSquare size={20} /></div>
          <div className="am-header-title">
            <h1>Messages</h1>
            <p>Communicate with students, faculty and your team in one place.</p>
          </div>
        </div>
        <div className="am-header-right">
          <button className="am-btn-primary" onClick={() => navigate('/admin/messages/new')}><Plus size={16}/> New Message</button>
          <button className="am-btn-outline"><Download size={16}/> Export</button>
        </div>
      </div>

      <div className="am-metrics">
        <div className="am-metric-card" style={{border: '1px solid #c7d2fe', background:'#fdfcff'}}>
          <div className="am-mc-icon" style={{color:'#8b5cf6', background:'#f3e8ff', border:'none'}}><MessageSquare size={20} /></div>
          <div className="am-mc-body">
            <div className="am-mc-label">Total Conversations</div>
            <div className="am-mc-val">128</div>
            <div className="am-mc-trend">All time</div>
          </div>
        </div>
        <div className="am-metric-card">
          <div className="am-mc-icon" style={{color:'#10b981', background:'#d1fae5', border:'none'}}><MessageSquare size={20} /></div>
          <div className="am-mc-body">
            <div className="am-mc-label">Unread Messages</div>
            <div className="am-mc-val">5</div>
            <div className="am-mc-trend">Require your attention</div>
          </div>
        </div>
        <div className="am-metric-card">
          <div className="am-mc-icon" style={{color:'#f59e0b', background:'#ffedd5', border:'none'}}><Users size={20} /></div>
          <div className="am-mc-body">
            <div className="am-mc-label">Students</div>
            <div className="am-mc-val">96</div>
            <div className="am-mc-trend">Active conversations</div>
          </div>
        </div>
        <div className="am-metric-card">
          <div className="am-mc-icon" style={{color:'#3b82f6', background:'#dbeafe', border:'none'}}><User size={20} /></div>
          <div className="am-mc-body">
            <div className="am-mc-label">Team / Faculty</div>
            <div className="am-mc-val">18</div>
            <div className="am-mc-trend">Active conversations</div>
          </div>
        </div>
        <div className="am-metric-card">
          <div className="am-mc-icon" style={{color:'#ec4899', background:'#fce7f3', border:'none'}}><CheckCircle size={20} /></div>
          <div className="am-mc-body">
            <div className="am-mc-label">Resolved</div>
            <div className="am-mc-val">104</div>
            <div className="am-mc-trend">This month</div>
          </div>
        </div>
      </div>

      <div className="am-chat-layout">
        
        {/* Column 1: Chat List */}
        <div className="am-chat-list-col">
          <div className="am-cl-tabs">
            <div className={`am-cl-tab ${activeTab==='All'?'active':''}`} onClick={()=>setActiveTab('All')}>All</div>
            <div className={`am-cl-tab ${activeTab==='Unread'?'active':''}`} onClick={()=>setActiveTab('Unread')}>Unread <span className="am-cl-badge">5</span></div>
            <div className={`am-cl-tab ${activeTab==='Students'?'active':''}`} onClick={()=>setActiveTab('Students')}>Students</div>
            <div className={`am-cl-tab ${activeTab==='Team'?'active':''}`} onClick={()=>setActiveTab('Team')}>Team</div>
            <div className={`am-cl-tab ${activeTab==='Groups'?'active':''}`} onClick={()=>setActiveTab('Groups')}>Groups</div>
          </div>
          
          <div className="am-cl-toolbar">
            <div className="am-search-box">
              <Search size={16} color="#9ca3af"/>
              <input type="text" placeholder="Search messages..."/>
            </div>
            <div className="am-filter-btn"><Filter size={14}/> Filters</div>
          </div>

          <div className="am-cl-items">
            {MOCK_CHATS.map(chat => (
              <div key={chat.id} className={`am-cl-item ${activeChatId===chat.id?'active':''}`} onClick={()=>setActiveChatId(chat.id)}>
                {chat.isGroup ? (
                  <div className="am-cl-avatar" style={{background:'#f3e8ff', color:'#8b5cf6'}}><Users size={20}/></div>
                ) : chat.isSystem ? (
                  <div className="am-cl-avatar" style={{background:'#e0e7ff', color:'#4f46e5'}}><Bell size={20}/></div>
                ) : (
                  <img src={`https://ui-avatars.com/api/?name=${chat.name}&background=random`} alt="avatar" className="am-cl-avatar" />
                )}
                <div className="am-cl-content">
                  <div className="am-cl-header">
                    <span className="am-cl-name">{chat.name}</span>
                    <span className="am-cl-time">{chat.time}</span>
                  </div>
                  <div className="am-cl-msg" style={{fontWeight: chat.unread>0?600:400, color: chat.unread>0?'#111827':'#6b7280'}}>{chat.msg}</div>
                  {chat.unread > 0 && (
                    <div className="am-cl-unread"><span className="am-cl-unread-badge">{chat.unread}</span></div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="am-cl-link">View All Conversations →</div>
        </div>

        {/* Column 2: Active Chat */}
        <div className="am-chat-main-col">
          {activeChat && (
            <>
              <div className="am-cm-header">
                <div className="am-cm-user">
                  <img src={`https://ui-avatars.com/api/?name=${activeChat.name}&background=random`} alt="avatar" className="am-cm-avatar" />
                  <div className="am-cm-info">
                    <div className="am-cm-name">
                      {activeChat.name}
                      {activeChat.isOnline && <div className="am-online-dot"></div>}
                      {activeChat.isOnline && <span style={{fontSize:11, color:'#10b981', fontWeight:500}}>Online</span>}
                    </div>
                    <div className="am-cm-role">{activeChat.role}</div>
                  </div>
                </div>
                <button className="am-btn-outline" style={{padding:8, border:'none'}}><MoreVertical size={16}/></button>
              </div>
              
              <div className="am-cm-body">
                <div className="am-cm-date-sep">Today</div>
                
                <div className="am-msg-row">
                  <img src={`https://ui-avatars.com/api/?name=${activeChat.name}&background=random`} className="am-msg-avatar" alt="user"/>
                  <div className="am-msg-content">
                    <div className="am-msg-bubble">Sir, I have a doubt in the Pharmacology chapter.</div>
                    <div className="am-msg-time">10:28 AM</div>
                  </div>
                </div>

                <div className="am-msg-row out">
                  <img src={`https://ui-avatars.com/api/?name=Admin&background=4f46e5&color=fff`} className="am-msg-avatar" alt="me"/>
                  <div className="am-msg-content">
                    <div className="am-msg-bubble">Sure Anjali, please tell me which topic you are finding difficult?</div>
                    <div className="am-msg-time">10:29 AM ✓✓</div>
                  </div>
                </div>

                <div className="am-msg-row">
                  <img src={`https://ui-avatars.com/api/?name=${activeChat.name}&background=random`} className="am-msg-avatar" alt="user"/>
                  <div className="am-msg-content">
                    <div className="am-msg-bubble">It's about the mechanism of action of beta blockers. Could you please explain with an example?</div>
                    <div className="am-msg-time">10:30 AM</div>
                  </div>
                </div>

                <div className="am-msg-row out">
                  <img src={`https://ui-avatars.com/api/?name=Admin&background=4f46e5&color=fff`} className="am-msg-avatar" alt="me"/>
                  <div className="am-msg-content">
                    <div className="am-msg-bubble">Of course! I'll explain it in detail and also share a short PDF for better understanding.</div>
                    <div className="am-msg-time">10:30 AM ✓✓</div>
                  </div>
                </div>

                <div className="am-msg-row out">
                  <img src={`https://ui-avatars.com/api/?name=Admin&background=4f46e5&color=fff`} className="am-msg-avatar" alt="me" style={{opacity:0}}/>
                  <div className="am-msg-content">
                    <div className="am-msg-attachment">
                      <div className="am-att-icon"><FileText size={20}/></div>
                      <div className="am-att-info">
                        <span className="am-att-name">Beta-Blockers_Mechanism.pdf</span>
                        <span className="am-att-meta">PDF • 1.2 MB</span>
                      </div>
                    </div>
                    <div className="am-msg-time">10:32 AM ✓✓</div>
                  </div>
                </div>

              </div>

              <div className="am-cm-footer">
                <div className="am-cm-input-area">
                  <div className="am-cm-icon-btn"><Paperclip size={20}/></div>
                  <div className="am-cm-icon-btn"><Smile size={20}/></div>
                  <input type="text" placeholder="Type your message..." />
                  <button className="am-cm-send-btn"><Send size={16}/></button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Column 3: Details */}
        <div className="am-chat-details-col">
          {activeChat && (
            <>
              <div className="am-cd-section">
                <div className="am-cd-title">Conversation Details</div>
                <div className="am-cd-profile">
                  <img src={`https://ui-avatars.com/api/?name=${activeChat.name}&background=random`} alt="avatar" className="am-cd-avatar" />
                  <div className="am-cd-pinfo">
                    <div className="am-cd-pname">{activeChat.name}</div>
                    <div className="am-cd-pemail">anjali.sharma21@example.com</div>
                    <div className="am-cd-pphone">+91 98765 43210</div>
                  </div>
                </div>

                <div className="am-cd-grid">
                  <div className="am-cd-glbl">Program</div><div className="am-cd-gval">B.Sc. Nursing</div>
                  <div className="am-cd-glbl">Year / Batch</div><div className="am-cd-gval">2nd Year / Batch 2023</div>
                  <div className="am-cd-glbl">Enrolled Courses</div><div className="am-cd-gval">6</div>
                </div>

                <div className="am-cd-link">View Student Profile →</div>
              </div>

              <div className="am-cd-section">
                <div className="am-cd-title">Conversation Info</div>
                <div className="am-cd-grid" style={{marginBottom:0}}>
                  <div className="am-cd-glbl">First Message</div><div className="am-cd-gval" style={{textAlign:'right'}}>20 May 2024, 11:20 AM</div>
                  <div className="am-cd-glbl">Last Message</div><div className="am-cd-gval" style={{textAlign:'right'}}>Today, 10:32 AM</div>
                  <div className="am-cd-glbl">Status</div>
                  <div className="am-cd-gval" style={{textAlign:'right'}}>
                    <div className="am-cd-status-badge"><div className="am-cd-status-dot"></div> Active</div>
                  </div>
                  <div className="am-cd-glbl">Messages</div><div className="am-cd-gval" style={{textAlign:'right'}}>12</div>
                </div>
              </div>

              <div className="am-cd-section" style={{borderBottom:'none'}}>
                <div className="am-cd-title">Quick Actions</div>
                <div className="am-qa-list">
                  <div className="am-qa-item"><User size={16}/> View Student Profile</div>
                  <div className="am-qa-item"><CheckCircle size={16}/> Mark as Resolved</div>
                  <div className="am-qa-item"><Bell size={16}/> Mute Conversation</div>
                  <div className="am-qa-item danger"><Trash2 size={16}/> Delete Conversation</div>
                </div>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
