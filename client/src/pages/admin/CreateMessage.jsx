import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, UploadCloud, Info, Send, Clock, ChevronRight, Search, X, FileText, Check } from 'lucide-react';
import './AdminMessages.css';

export default function CreateMessage() {
  const navigate = useNavigate();
  const [audience, setAudience] = useState('Specific Users');
  const [schedule, setSchedule] = useState('Immediate');

  const [selectedUsers, setSelectedUsers] = useState([
    { id: 1, name: 'Riya Sharma', email: 'riya.sharma@ainsights.com', initial: 'RS' },
    { id: 2, name: 'Arjun Verma', email: 'arjun.verma@ainsights.com', initial: 'AV' },
    { id: 3, name: 'Neha Patel', email: 'neha.patel@ainsights.com', initial: 'NP' }
  ]);

  const removeUser = (id) => {
    setSelectedUsers(selectedUsers.filter(u => u.id !== id));
  };

  return (
    <div className="am-page">
      <div className="am-header">
        <div className="am-header-left">
          <div className="am-header-title" style={{display:'flex', alignItems:'center', gap:8}}>
            <h1 style={{fontSize:20}}>Messages</h1>
            <ChevronRightIcon size={16} color="#9ca3af"/>
            <h1 style={{fontSize:20, color:'#4f46e5'}}>New Message</h1>
          </div>
        </div>
        <div className="am-header-right">
          <button className="am-btn-outline" onClick={() => navigate('/admin/messages')}><SaveIcon size={16}/> Save as Draft</button>
          <button className="am-btn-primary"><Send size={16}/> Send Message</button>
        </div>
      </div>
      <p style={{fontSize:14, color:'#6b7280', marginTop:'-16px', marginBottom:'24px'}}>Send a message to one or more users or groups.</p>

      <div className="cm-layout">
        
        {/* Main Left Column */}
        <div>
          
          {/* Section 1 */}
          <div className="cm-card">
            <div className="cm-card-header">
              <div className="cm-step-badge">1</div>
              <div className="cm-card-title">Recipients</div>
            </div>

            <div className="cm-field">
              <label className="cm-label">Send To <span>*</span></label>
              <div className="cm-radio-grid">
                <div className={`cm-radio-card ${audience==='All'?'active':''}`} onClick={()=>setAudience('All')}>
                  <div className="cm-radio-header">
                    <div className="cm-radio-circle"><div className="cm-radio-dot"></div></div>
                    <span className="cm-radio-title">All Users</span>
                  </div>
                  <div className="cm-radio-sub">Send to all platform users</div>
                </div>
                <div className={`cm-radio-card ${audience==='Roles'?'active':''}`} onClick={()=>setAudience('Roles')}>
                  <div className="cm-radio-header">
                    <div className="cm-radio-circle"><div className="cm-radio-dot"></div></div>
                    <span className="cm-radio-title">Specific Roles</span>
                  </div>
                  <div className="cm-radio-sub">Select user roles</div>
                </div>
                <div className={`cm-radio-card ${audience==='Groups'?'active':''}`} onClick={()=>setAudience('Groups')}>
                  <div className="cm-radio-header">
                    <div className="cm-radio-circle"><div className="cm-radio-dot"></div></div>
                    <span className="cm-radio-title">Specific Groups</span>
                  </div>
                  <div className="cm-radio-sub">Select user groups</div>
                </div>
                <div className={`cm-radio-card ${audience==='Specific Users'?'active':''}`} onClick={()=>setAudience('Specific Users')}>
                  <div className="cm-radio-header">
                    <div className="cm-radio-circle"><div className="cm-radio-dot"></div></div>
                    <span className="cm-radio-title">Specific Users</span>
                  </div>
                  <div className="cm-radio-sub">Select individual users</div>
                </div>
              </div>
            </div>

            {audience === 'Specific Users' && (
              <div className="cm-field" style={{marginBottom:0, marginTop:24}}>
                <label className="cm-label">Select Users <span>*</span></label>
                <div className="cm-search-container">
                  <input type="text" className="cm-search-input" placeholder="Search users by name or email..." />
                  <Search size={16} className="cm-search-icon" style={{right: 40}}/>
                  <div style={{position:'absolute', right:12, top:10, borderLeft:'1px solid #e5e7eb', paddingLeft:8, display:'flex', alignItems:'center'}}>
                    <UserIcon size={14} color="#6b7280"/>
                    <ChevronDownIcon size={14} color="#6b7280"/>
                  </div>
                </div>

                {selectedUsers.length > 0 && (
                  <>
                    <div className="cm-selected-users">
                      {selectedUsers.map(u => (
                        <div key={u.id} className="cm-user-pill">
                          <img src={`https://ui-avatars.com/api/?name=${u.name}&background=random`} alt="avatar" className="cm-user-pill-avatar" />
                          <div className="cm-user-pill-info">
                            <span className="cm-user-pill-name">{u.name}</span>
                            <span className="cm-user-pill-email">{u.email}</span>
                          </div>
                          <div className="cm-user-pill-close" onClick={()=>removeUser(u.id)}><X size={14}/></div>
                        </div>
                      ))}
                    </div>
                    <div className="cm-total-recipients">
                      <UsersIcon size={14}/> Total Recipients: {selectedUsers.length} users
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Section 2 */}
          <div className="cm-card">
            <div className="cm-card-header">
              <div className="cm-step-badge">2</div>
              <div className="cm-card-title">Message Content</div>
            </div>

            <div className="cm-field">
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <label className="cm-label">Subject <span>*</span></label>
                <span style={{fontSize:11, color:'#9ca3af'}}>0/150</span>
              </div>
              <input type="text" className="cm-input" placeholder="Enter message subject" />
            </div>

            <div className="cm-field">
              <label className="cm-label">Message <span>*</span></label>
              <div className="cm-editor">
                <div className="cm-editor-toolbar">
                  <select className="cm-editor-select"><option>Paragraph</option></select>
                  <div className="cm-editor-icons">
                    <span>B</span><span>I</span><span style={{textDecoration:'underline'}}>U</span><span style={{textDecoration:'line-through'}}>S</span>
                    <span>≡</span><span>≡</span><span>🔗</span><span>🖼️</span><span>🙂</span>
                  </div>
                </div>
                <textarea className="cm-editor-textarea" placeholder="Write your message here..."></textarea>
                <div style={{textAlign:'right', padding:'8px 12px', fontSize:11, color:'#9ca3af', borderTop:'1px solid #e5e7eb', background:'#f9fafb'}}>0/2000</div>
              </div>
            </div>

            <div className="cm-field" style={{marginBottom: 0}}>
              <div className="cm-upload-zone">
                <div className="cm-upload-btn">
                  <PaperclipIcon size={16}/> Add Attachment <span style={{color:'#6b7280', fontWeight:400}}>(Optional)</span>
                </div>
                <div style={{fontSize:13, color:'#4b5563', marginTop:4}}><span style={{color:'#4f46e5', fontWeight:600}}>Click to upload</span> or drag and drop</div>
                <div className="cm-upload-desc">PNG, JPG, PDF, DOC, DOCX (Max 10MB)</div>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="cm-card">
            <div className="cm-card-header">
              <div className="cm-step-badge">3</div>
              <div className="cm-card-title">Schedule <span style={{color:'#6b7280', fontWeight:400}}>(Optional)</span></div>
            </div>

            <div className="cm-schedule-grid">
              <div className={`cm-radio-card ${schedule==='Immediate'?'active':''}`} onClick={()=>setSchedule('Immediate')}>
                <div className="cm-radio-header">
                  <div className="cm-radio-circle"><div className="cm-radio-dot"></div></div>
                  <span className="cm-radio-title" style={{color: schedule==='Immediate'?'#4f46e5':'#111827'}}>Send Now</span>
                </div>
                <div className="cm-radio-sub" style={{color: schedule==='Immediate'?'#4f46e5':'#6b7280'}}>Send message immediately</div>
              </div>
              <div className={`cm-radio-card ${schedule==='Later'?'active':''}`} onClick={()=>setSchedule('Later')}>
                <div className="cm-radio-header">
                  <div className="cm-radio-circle"><div className="cm-radio-dot"></div></div>
                  <span className="cm-radio-title">Schedule for Later</span>
                </div>
                <div className="cm-radio-sub">Choose date and time to send</div>
              </div>
            </div>
          </div>

          <div className="cm-info-alert" style={{marginBottom:32}}>
            <Info size={16} style={{flexShrink:0}}/>
            Messages will be delivered to recipients based on their notification preferences.
          </div>

        </div>

        {/* Right Sidebar Column */}
        <div>
          
          <div className="cm-card">
            <div className="cm-card-title" style={{marginBottom:8}}>Preview</div>
            <div style={{fontSize:12, color:'#6b7280', marginBottom:20}}>This is how your message will appear to recipients.</div>
            
            <div className="cm-mock-screen">
              <div className="cm-mock-header">
                <div className="cm-mock-avatar">AI</div>
                <div>
                  <div className="cm-mock-sender">AI Insights</div>
                  <div className="cm-mock-time">Just now</div>
                </div>
              </div>
              <div className="cm-mock-subject">Message Subject</div>
              <div className="cm-mock-body">
                This is where your message content will appear. Users will receive this message in their inbox.
              </div>
              <div className="cm-mock-attachment">
                <div style={{display:'flex', gap:12, alignItems:'center'}}>
                  <div style={{width:32, height:32, background:'#fee2e2', color:'#ef4444', borderRadius:8, display:'flex', justifyContent:'center', alignItems:'center', fontWeight:700, fontSize:10}}>PDF</div>
                  <div style={{display:'flex', flexDirection:'column'}}>
                    <span style={{fontSize:12, fontWeight:600, color:'#111827'}}>Product_Updates.pdf</span>
                    <span style={{fontSize:10, color:'#6b7280'}}>2.4 MB</span>
                  </div>
                </div>
                <DownloadIcon size={16} color="#6b7280"/>
              </div>
            </div>
          </div>

          <div className="cm-card">
            <div className="cm-card-title" style={{marginBottom:24}}>Message Settings</div>
            
            <div className="cm-setting-item">
              <div className="cm-setting-label"><UserIcon size={16}/> Message Type</div>
              <div className="cm-badge">Direct Message</div>
            </div>
            
            <div className="cm-setting-item">
              <div className="cm-setting-label"><BellIcon size={16}/> Priority</div>
              <div className="cm-badge">Normal</div>
            </div>

            <div style={{borderTop:'1px solid #e5e7eb', margin:'16px 0'}}></div>

            <div style={{marginBottom:20}}>
              <div className="cm-setting-item" style={{marginBottom:4}}>
                <div className="cm-setting-label"><MessageSquareIcon size={16}/> Allow Replies</div>
                <div className="cm-toggle"></div>
              </div>
              <div className="cm-setting-desc">Recipients can reply to this message</div>
            </div>

            <div>
              <div className="cm-setting-item" style={{marginBottom:4}}>
                <div className="cm-setting-label"><CheckIcon size={16}/> Read Receipts</div>
                <div className="cm-toggle"></div>
              </div>
              <div className="cm-setting-desc">You will be notified when recipients read the message</div>
            </div>
          </div>

          <div className="cm-card">
            <div className="cm-card-title" style={{marginBottom:24}}>Message Summary</div>
            <div className="cm-summary-list">
              <div className="cm-summary-item">
                <div className="cm-summary-label"><UserIcon size={14}/> Recipients</div>
                <div className="cm-summary-val">{audience==='Specific Users'? '3 Users' : audience}</div>
              </div>
              <div className="cm-summary-item">
                <div className="cm-summary-label"><CheckIcon size={14}/> Subject</div>
                <div className="cm-summary-val">-</div>
              </div>
              <div className="cm-summary-item">
                <div className="cm-summary-label"><PaperclipIcon size={14}/> Attachments</div>
                <div className="cm-summary-val">1 File</div>
              </div>
              <div className="cm-summary-item">
                <div className="cm-summary-label"><Clock size={14}/> Send Time</div>
                <div className="cm-summary-val">Immediately</div>
              </div>
              <div className="cm-summary-item">
                <div className="cm-summary-label"><BellIcon size={14}/> Priority</div>
                <div className="cm-summary-val">Normal</div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

// Custom icons to match the design where Lucide isn't perfect
function ChevronRightIcon({size, color}) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"></path></svg>);
}
function ChevronDownIcon({size, color}) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"></path></svg>);
}
function SaveIcon({size}) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>);
}
function UserIcon({size, color="currentColor"}) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>);
}
function UsersIcon({size, color="currentColor"}) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>);
}
function PaperclipIcon({size}) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>);
}
function DownloadIcon({size, color="currentColor"}) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>);
}
function BellIcon({size}) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>);
}
function MessageSquareIcon({size}) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>);
}
function CheckIcon({size}) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>);
}
