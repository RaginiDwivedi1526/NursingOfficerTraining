import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Megaphone, UploadCloud, Info, Send, Clock, Edit2 } from 'lucide-react';
import './AdminAnnouncements.css';

export default function CreateAnnouncement() {
  const navigate = useNavigate();
  const [priority, setPriority] = useState('Normal');
  const [audience, setAudience] = useState('All');
  const [schedule, setSchedule] = useState('Immediate');
  const [previewTab, setPreviewTab] = useState('Web');

  return (
    <div className="aa-page">
      <div className="aa-header">
        <div className="aa-header-left">
          <div className="aa-header-title" style={{display:'flex', alignItems:'center', gap:8}}>
            <h1 style={{fontSize:20}}>Announcements</h1>
            <ChevronRightIcon size={16} color="#9ca3af"/>
            <h1 style={{fontSize:20, color:'#4f46e5'}}>Create Announcement</h1>
          </div>
        </div>
        <div className="aa-header-right">
          <button className="aa-btn-outline" onClick={() => navigate('/admin/announcements')}>Cancel</button>
          <button className="aa-btn-primary"><Send size={16}/> Publish Announcement</button>
        </div>
      </div>
      <p style={{fontSize:14, color:'#6b7280', marginTop:'-16px', marginBottom:'24px'}}>Create and send an announcement to users or specific groups.</p>

      <div className="ca-layout">
        
        {/* Main Left Column */}
        <div>
          
          {/* Section 1 */}
          <div className="ca-card">
            <div className="ca-card-header">
              <div className="ca-step-badge">1</div>
              <div className="ca-card-title">Announcement Details</div>
            </div>

            <div className="ca-field">
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <label className="ca-label">Title <span>*</span></label>
                <span style={{fontSize:11, color:'#9ca3af'}}>0/100</span>
              </div>
              <input type="text" className="ca-input" placeholder="Enter announcement title" />
            </div>

            <div className="ca-field">
              <label className="ca-label">Message <span>*</span></label>
              <div className="ca-editor">
                <div className="ca-editor-toolbar">
                  <select className="ca-editor-select"><option>Paragraph</option></select>
                  <div className="ca-editor-icons">
                    <span>B</span><span>I</span><span style={{textDecoration:'underline'}}>U</span><span style={{textDecoration:'line-through'}}>S</span>
                    <span>≡</span><span>≡</span><span>🔗</span><span>🖼️</span>
                  </div>
                </div>
                <textarea className="ca-editor-textarea" placeholder="Write your announcement message here..."></textarea>
                <div style={{textAlign:'right', padding:'8px 12px', fontSize:11, color:'#9ca3af', borderTop:'1px solid #e5e7eb', background:'#f9fafb'}}>0/2000</div>
              </div>
            </div>

            <div className="ca-field">
              <label className="ca-label">Add Banner / Image <span style={{color:'#6b7280', fontWeight:400}}>(Optional)</span></label>
              <div className="ca-upload-zone">
                <div className="ca-upload-btn">
                  <UploadCloud size={16}/> Click to upload <span style={{color:'#6b7280', fontWeight:400}}>or drag and drop</span>
                </div>
                <div className="ca-upload-desc">PNG, JPG, JPEG up to 2MB (Recommended 1200x628px)</div>
              </div>
            </div>

            <div className="ca-field" style={{marginBottom: 0}}>
              <label className="ca-label" style={{display:'flex', alignItems:'center', gap:4}}>Priority <Info size={12} color="#9ca3af"/></label>
              <div className="ca-radio-grid">
                <div className={`ca-radio-card ${priority==='Low'?'active':''}`} onClick={()=>setPriority('Low')}>
                  <div className="ca-radio-header">
                    <div className="ca-radio-circle"><div className="ca-radio-dot" style={{background:'#10b981'}}></div></div>
                    <span className="ca-radio-title">Low</span>
                  </div>
                  <div className="ca-radio-sub">Normal visibility</div>
                </div>
                <div className={`ca-radio-card ${priority==='Normal'?'active':''}`} onClick={()=>setPriority('Normal')}>
                  <div className="ca-radio-header">
                    <div className="ca-radio-circle"><div className="ca-radio-dot" style={{background:'#4f46e5'}}></div></div>
                    <span className="ca-radio-title">Normal</span>
                  </div>
                  <div className="ca-radio-sub">Default priority</div>
                </div>
                <div className={`ca-radio-card ${priority==='High'?'active':''}`} onClick={()=>setPriority('High')}>
                  <div className="ca-radio-header">
                    <div className="ca-radio-circle"><div className="ca-radio-dot" style={{background:'#f59e0b'}}></div></div>
                    <span className="ca-radio-title">High</span>
                  </div>
                  <div className="ca-radio-sub">Important</div>
                </div>
                <div className={`ca-radio-card ${priority==='Urgent'?'active':''}`} onClick={()=>setPriority('Urgent')}>
                  <div className="ca-radio-header">
                    <div className="ca-radio-circle"><div className="ca-radio-dot" style={{background:'#ef4444'}}></div></div>
                    <span className="ca-radio-title">Urgent</span>
                  </div>
                  <div className="ca-radio-sub">Critical alert</div>
                </div>
              </div>
            </div>

          </div>

          {/* Section 2 */}
          <div className="ca-card">
            <div className="ca-card-header">
              <div className="ca-step-badge">2</div>
              <div className="ca-card-title">Audience</div>
            </div>

            <div className="ca-field">
              <label className="ca-label">Send To <span>*</span></label>
              <div className="ca-radio-grid">
                <div className={`ca-radio-card ${audience==='All'?'active':''}`} onClick={()=>setAudience('All')}>
                  <div className="ca-radio-header">
                    <div className="ca-radio-circle"><div className="ca-radio-dot"></div></div>
                    <span className="ca-radio-title">All Users</span>
                  </div>
                  <div className="ca-radio-sub">Send to all platform users</div>
                </div>
                <div className={`ca-radio-card ${audience==='Roles'?'active':''}`} onClick={()=>setAudience('Roles')}>
                  <div className="ca-radio-header">
                    <div className="ca-radio-circle"><div className="ca-radio-dot"></div></div>
                    <span className="ca-radio-title">Specific Roles</span>
                  </div>
                  <div className="ca-radio-sub">Select user roles</div>
                </div>
                <div className={`ca-radio-card ${audience==='Groups'?'active':''}`} onClick={()=>setAudience('Groups')}>
                  <div className="ca-radio-header">
                    <div className="ca-radio-circle"><div className="ca-radio-dot"></div></div>
                    <span className="ca-radio-title">Specific Groups</span>
                  </div>
                  <div className="ca-radio-sub">Select user groups</div>
                </div>
                <div className={`ca-radio-card ${audience==='Users'?'active':''}`} onClick={()=>setAudience('Users')}>
                  <div className="ca-radio-header">
                    <div className="ca-radio-circle"><div className="ca-radio-dot"></div></div>
                    <span className="ca-radio-title">Specific Users</span>
                  </div>
                  <div className="ca-radio-sub">Select individual users</div>
                </div>
              </div>
            </div>

            <div className="ca-field" style={{marginBottom:0}}>
              <label className="ca-label">Role / Group <span style={{color:'#6b7280', fontWeight:400}}>(Select)</span></label>
              <select className="ca-input"><option>Select roles</option></select>
            </div>
          </div>

          {/* Section 3 */}
          <div className="ca-card">
            <div className="ca-card-header">
              <div className="ca-step-badge">3</div>
              <div className="ca-card-title">Schedule</div>
            </div>

            <div style={{display:'flex', gap:24}}>
              <div className="ca-field" style={{flex:1, marginBottom:0}}>
                <label className="ca-label">Publish At</label>
                <div style={{display:'flex', gap:16, marginTop:8}}>
                  <div style={{display:'flex', alignItems:'center', gap:8, cursor:'pointer'}} onClick={()=>setSchedule('Immediate')}>
                    <div className="ca-radio-circle" style={{borderColor:schedule==='Immediate'?'#8b5cf6':'#d1d5db'}}><div className="ca-radio-dot" style={{display:schedule==='Immediate'?'block':'none'}}></div></div>
                    <span style={{fontSize:13, fontWeight:600, color:'#111827'}}>Publish Immediately</span>
                  </div>
                  <div style={{display:'flex', alignItems:'center', gap:8, cursor:'pointer'}} onClick={()=>setSchedule('Later')}>
                    <div className="ca-radio-circle" style={{borderColor:schedule==='Later'?'#8b5cf6':'#d1d5db'}}><div className="ca-radio-dot" style={{display:schedule==='Later'?'block':'none'}}></div></div>
                    <span style={{fontSize:13, fontWeight:600, color:'#374151'}}>Schedule for Later</span>
                  </div>
                </div>
              </div>

              <div className="ca-field" style={{flex:1, marginBottom:0}}>
                <label className="ca-label">Expiry <span style={{color:'#6b7280', fontWeight:400}}>(Optional)</span></label>
                <div style={{position:'relative'}}>
                  <input type="text" className="ca-input" placeholder="Select expiry date and time" style={{paddingLeft:36}}/>
                  <Clock size={16} color="#9ca3af" style={{position:'absolute', left:12, top:10}}/>
                </div>
                <div style={{fontSize:11, color:'#6b7280'}}>Leave empty if announcement never expires</div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Sidebar Column */}
        <div>
          
          <div className="ca-card">
            <div className="aa-card-title">Preview</div>
            <div style={{fontSize:12, color:'#6b7280', marginBottom:20}}>This is how your announcement will appear to users.</div>
            
            <div className="ca-preview-tabs">
              <div className={`ca-preview-tab ${previewTab==='Web'?'active':''}`} onClick={()=>setPreviewTab('Web')}>🖥️ Web</div>
              <div className={`ca-preview-tab ${previewTab==='Mobile'?'active':''}`} onClick={()=>setPreviewTab('Mobile')}>📱 Mobile</div>
            </div>

            <div className="ca-mock-screen">
              <div className="ca-mock-img">
                <Megaphone size={48} color="#8b5cf6" />
              </div>
              <div className="ca-mock-title">
                Announcement Title
                <span className="ca-mock-badge">Normal</span>
              </div>
              <div className="ca-mock-meta">Just now • By Admin</div>
              <div className="ca-mock-body">
                This is where your announcement message will appear. Users will be able to read the full content here.
              </div>
              <div className="ca-mock-footer">
                <div style={{display:'flex', alignItems:'center', gap:4}}><Users size={12}/> All Users</div>
                <div style={{display:'flex', alignItems:'center', gap:4}}><Clock size={12}/> No Expiry</div>
              </div>
              <div style={{textAlign:'right', marginTop:12}}>
                <span className="ca-mock-link">Read More →</span>
              </div>
            </div>
          </div>

          <div className="ca-card">
            <div className="aa-card-title">Summary</div>
            <div className="ca-summary-list">
              <div className="ca-summary-item">
                <div className="ca-summary-label"><Users size={14}/> Audience</div>
                <div className="ca-summary-val">All Users</div>
              </div>
              <div className="ca-summary-item">
                <div className="ca-summary-label"><Megaphone size={14}/> Priority</div>
                <div className="ca-summary-val"><span className="ca-mock-badge">Normal</span></div>
              </div>
              <div className="ca-summary-item">
                <div className="ca-summary-label"><Clock size={14}/> Publish At</div>
                <div className="ca-summary-val">Immediately</div>
              </div>
              <div className="ca-summary-item">
                <div className="ca-summary-label"><Calendar size={14}/> Expiry</div>
                <div className="ca-summary-val">Never</div>
              </div>
            </div>
          </div>

          <div className="ca-info-alert">
            <Info size={16} style={{flexShrink:0}}/>
            Users will be notified via in-app notifications and email (if enabled).
          </div>

        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="ca-bottom-bar">
        <div className="ca-bb-left">
          <Edit2 size={16}/> Announcements are visible to users based on their permissions and role.
        </div>
        <div className="ca-bb-right">
          <button className="aa-btn-outline" style={{color:'#4f46e5'}}>Save as Draft</button>
          <button className="aa-btn-primary"><Send size={16}/> Publish Announcement</button>
        </div>
      </div>

    </div>
  );
}

function ChevronRightIcon({size, color}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6"></path>
    </svg>
  );
}
