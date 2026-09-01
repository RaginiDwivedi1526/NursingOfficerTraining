import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, Image as ImageIcon, Calendar, Clock, Video, Users, MessageSquare, Hand, Save, FileText, CheckCircle, Radio, Link } from 'lucide-react';
import './AdminLiveClasses.css';

export default function CreateLiveClass() {
  const navigate = useNavigate();
  const [classType, setClassType] = useState('Live');
  const [classAccess, setClassAccess] = useState('Enrolled');
  const [maxCapacity, setMaxCapacity] = useState(false);
  
  const [settings, setSettings] = useState({
    chat: true,
    qa: true,
    raiseHand: true,
    record: true,
    waitingRoom: false,
    onlyEnrolled: true,
    reminder: true
  });

  const toggleSetting = (key) => setSettings({ ...settings, [key]: !settings[key] });

  const [options, setOptions] = useState({
    cert: false,
    shareRec: false,
    replay: false
  });
  const toggleOption = (key) => setOptions({ ...options, [key]: !options[key] });

  return (
    <div className="alc-page">
      <div className="alc-header">
        <div className="alc-header-left">
          <button className="alc-back-btn" onClick={() => navigate('/admin/live-classes')}><ArrowLeft size={18} /></button>
          <div className="alc-header-title">
            <h1>Create Live Class</h1>
            <p>Live Classes {'>'} Create Live Class</p>
          </div>
        </div>
        <div className="alc-header-right">
          <button className="alc-btn-outline" style={{color:'#4f46e5', borderColor:'#e0e7ff'}}><Eye size={16}/> Preview Class</button>
          <button className="alc-btn-outline" onClick={() => navigate('/admin/live-classes')}>Cancel</button>
        </div>
      </div>

      <div className="clc-layout">
        
        {/* Main Left Column */}
        <div>
          <div className="clc-card">
            <div className="clc-card-title">Basic Information</div>
            <div className="clc-card-sub">Provide the basic details for your live class</div>

            <div className="clc-grid-2" style={{marginBottom: 20}}>
              <div className="alc-field">
                <label className="alc-label">Class Title <span>*</span></label>
                <input type="text" className="alc-input" placeholder="Enter live class title" />
                <div className="alc-help">Example: Pharmacology - Antimicrobial Drugs</div>
              </div>
              <div className="alc-field">
                <label className="alc-label">Course / Topic <span>*</span></label>
                <select className="alc-input"><option>Select course or topic</option></select>
              </div>
            </div>

            <div className="clc-grid-2" style={{marginBottom: 20}}>
              <div className="alc-field">
                <label className="alc-label">Instructor / Faculty <span>*</span></label>
                <select className="alc-input"><option>Select instructor</option></select>
              </div>
              <div className="alc-field">
                <label className="alc-label">Class Type <span>*</span></label>
                <div style={{display:'flex', gap:16, marginTop:4}}>
                  <div className={`clc-radio-card ${classType==='Live'?'active':''}`} onClick={()=>setClassType('Live')} style={{flex:1}}>
                    <input type="radio" checked={classType==='Live'} readOnly />
                    <div className="clc-radio-content">
                      <div className="clc-radio-title">Live (Interactive)</div>
                      <div className="clc-radio-sub">Conduct class live with students</div>
                    </div>
                  </div>
                  <div className={`clc-radio-card ${classType==='Webinar'?'active':''}`} onClick={()=>setClassType('Webinar')} style={{flex:1}}>
                    <input type="radio" checked={classType==='Webinar'} readOnly />
                    <div className="clc-radio-content">
                      <div className="clc-radio-title">Webinar</div>
                      <div className="clc-radio-sub">Live session with guest access</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="clc-grid-2" style={{marginBottom: 20, gridTemplateColumns: '1.5fr 1fr'}}>
              <div className="alc-field">
                <label className="alc-label">Description</label>
                <div className="alc-editor">
                  <div className="alc-editor-toolbar">
                    <select className="alc-editor-select"><option>Normal</option></select>
                    <div className="alc-editor-icons">
                      <span>B</span><span>I</span><span style={{textDecoration:'underline'}}>U</span><span>🔗</span>
                    </div>
                  </div>
                  <textarea className="alc-editor-textarea" placeholder="Write a brief description about the live class, what students will learn, and how it will help them."></textarea>
                </div>
                <div className="alc-help" style={{textAlign:'right'}}>0/2000 characters</div>
              </div>
              <div className="alc-field">
                <label className="alc-label">Class Thumbnail <span style={{color:'#6b7280',fontWeight:400}}>(Optional)</span></label>
                <div className="alc-thumb-widget">
                  <ImageIcon size={32} className="alc-thumb-icon" />
                  <div className="alc-thumb-title">Upload Image</div>
                  <div className="alc-thumb-sub" style={{marginBottom:12}}>Recommended size: 1280x720px<br/>Max file size: 2MB</div>
                  <button className="alc-btn-outline" style={{margin:'0 auto', color:'#4f46e5', borderColor:'#e0e7ff'}}>Upload Image</button>
                </div>
              </div>
            </div>
          </div>

          <div className="clc-card">
            <div className="clc-card-title">Schedule</div>
            <div className="clc-card-sub">Set the date, time and duration for your live class</div>

            <div className="clc-grid-4" style={{marginBottom: 20}}>
              <div className="alc-field">
                <label className="alc-label">Date <span>*</span></label>
                <div style={{position:'relative'}}>
                  <input type="text" className="alc-input" placeholder="dd/mm/yyyy" />
                  <Calendar size={16} color="#9ca3af" style={{position:'absolute', right:12, top:10}}/>
                </div>
              </div>
              <div className="alc-field">
                <label className="alc-label">Start Time <span>*</span></label>
                <div style={{position:'relative'}}>
                  <input type="text" className="alc-input" placeholder="--:--" />
                  <Clock size={16} color="#9ca3af" style={{position:'absolute', right:12, top:10}}/>
                </div>
              </div>
              <div className="alc-field">
                <label className="alc-label">Duration (Minutes) <span>*</span></label>
                <input type="text" className="alc-input" placeholder="e.g. 60" />
              </div>
              <div className="alc-field">
                <label className="alc-label">Time Zone <span>*</span></label>
                <select className="alc-input"><option>(GMT+05:30) Asia/Kolkata</option></select>
              </div>
            </div>

            <div className="clc-grid-4">
              <div className="alc-field">
                <label className="alc-label">Repeat Class (Optional)</label>
                <select className="alc-input"><option>Does not repeat</option></select>
              </div>
              <div className="alc-field">
                <label className="alc-label">End Time</label>
                <div style={{position:'relative'}}>
                  <input type="text" className="alc-input" placeholder="--:--" />
                  <Clock size={16} color="#9ca3af" style={{position:'absolute', right:12, top:10}}/>
                </div>
              </div>
              <div className="alc-field" style={{gridColumn: 'span 2'}}>
                <div style={{display:'flex', gap:16, alignItems:'flex-end'}}>
                  <div style={{flex:1}}>
                    <label className="alc-label">
                      <div className="clc-toggle-wrap left-align" style={{marginBottom:4}}>
                        <div className={`clc-toggle ${maxCapacity?'active':''}`} onClick={()=>setMaxCapacity(!maxCapacity)}>
                          <div className="clc-toggle-thumb"></div>
                        </div>
                        <span style={{marginLeft:8}}>Set Maximum Capacity</span>
                      </div>
                    </label>
                    <div className="alc-help">Limit the number of students who can join</div>
                  </div>
                  <div style={{flex:1}}>
                    <label className="alc-label" style={{opacity: maxCapacity?1:0.5}}>Max Capacity</label>
                    <input type="text" className="alc-input" placeholder="e.g. 200" disabled={!maxCapacity} style={{opacity: maxCapacity?1:0.5}} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="clc-card">
            <div className="clc-card-title">Class Settings</div>
            <div className="clc-card-sub">Configure interaction and access settings</div>

            <div className="clc-grid-2">
              <div style={{display:'flex', flexDirection:'column', gap:16}}>
                <div className="clc-toggle-wrap">
                  <div className="clc-toggle-text">
                    <span className="clc-toggle-text-main"><MessageSquare size={16} className="clc-icon"/> Allow Chat</span>
                    <span className="clc-toggle-text-sub">Students can send messages in live chat</span>
                  </div>
                  <div className={`clc-toggle ${settings.chat?'active':''}`} onClick={()=>toggleSetting('chat')}><div className="clc-toggle-thumb"></div></div>
                </div>
                <div className="clc-toggle-wrap">
                  <div className="clc-toggle-text">
                    <span className="clc-toggle-text-main"><MessageSquare size={16} className="clc-icon"/> Allow Q&A</span>
                    <span className="clc-toggle-text-sub">Students can ask questions</span>
                  </div>
                  <div className={`clc-toggle ${settings.qa?'active':''}`} onClick={()=>toggleSetting('qa')}><div className="clc-toggle-thumb"></div></div>
                </div>
                <div className="clc-toggle-wrap">
                  <div className="clc-toggle-text">
                    <span className="clc-toggle-text-main"><Hand size={16} className="clc-icon"/> Allow Raise Hand</span>
                    <span className="clc-toggle-text-sub">Students can raise hand to interact</span>
                  </div>
                  <div className={`clc-toggle ${settings.raiseHand?'active':''}`} onClick={()=>toggleSetting('raiseHand')}><div className="clc-toggle-thumb"></div></div>
                </div>
                <div className="clc-toggle-wrap">
                  <div className="clc-toggle-text">
                    <span className="clc-toggle-text-main"><Save size={16} className="clc-icon"/> Record Class</span>
                    <span className="clc-toggle-text-sub">Record and save the class for later</span>
                  </div>
                  <div className={`clc-toggle ${settings.record?'active':''}`} onClick={()=>toggleSetting('record')}><div className="clc-toggle-thumb"></div></div>
                </div>
              </div>

              <div style={{display:'flex', flexDirection:'column', gap:16}}>
                <div className="clc-toggle-wrap">
                  <div className="clc-toggle-text">
                    <span className="clc-toggle-text-main" style={{color:'#6b7280'}}><Users size={16}/> Enable Waiting Room</span>
                    <span className="clc-toggle-text-sub">Students will wait until admitted</span>
                  </div>
                  <div className={`clc-toggle ${settings.waitingRoom?'active':''}`} onClick={()=>toggleSetting('waitingRoom')}><div className="clc-toggle-thumb"></div></div>
                </div>
                <div className="clc-toggle-wrap">
                  <div className="clc-toggle-text">
                    <span className="clc-toggle-text-main"><Users size={16} className="clc-icon"/> Only Enrolled Students</span>
                    <span className="clc-toggle-text-sub">Restrict access to enrolled students only</span>
                  </div>
                  <div className={`clc-toggle ${settings.onlyEnrolled?'active':''}`} onClick={()=>toggleSetting('onlyEnrolled')}><div className="clc-toggle-thumb"></div></div>
                </div>
                <div className="clc-toggle-wrap" style={{alignItems:'flex-start'}}>
                  <div className="clc-toggle-text">
                    <span className="clc-toggle-text-main"><Clock size={16} className="clc-icon"/> Send Reminder</span>
                    <span className="clc-toggle-text-sub">Send email/app reminder before the class</span>
                    {settings.reminder && (
                      <select className="alc-input" style={{marginTop:8, marginLeft:24, width:'80%'}}><option>15 minutes before</option></select>
                    )}
                  </div>
                  <div className={`clc-toggle ${settings.reminder?'active':''}`} onClick={()=>toggleSetting('reminder')}><div className="clc-toggle-thumb"></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div>
          <div className="clc-card">
            <div className="clc-card-title">Class Overview</div>
            <div className="clc-card-sub">Review your live class details</div>
            
            <div className="clc-summary-list">
              <div className="clc-summary-item">
                <div className="clc-summary-label"><div className="clc-summary-icon"><FileText size={16}/></div> Title</div>
                <div className="clc-summary-val">-</div>
              </div>
              <div className="clc-summary-item">
                <div className="clc-summary-label"><div className="clc-summary-icon"><BookOpen size={16}/></div> Course / Topic</div>
                <div className="clc-summary-val">-</div>
              </div>
              <div className="clc-summary-item">
                <div className="clc-summary-label"><div className="clc-summary-icon"><Users size={16}/></div> Instructor</div>
                <div className="clc-summary-val">-</div>
              </div>
              <div className="clc-summary-item">
                <div className="clc-summary-label"><div className="clc-summary-icon"><Calendar size={16}/></div> Date & Time</div>
                <div className="clc-summary-val">-</div>
              </div>
              <div className="clc-summary-item">
                <div className="clc-summary-label"><div className="clc-summary-icon"><Clock size={16}/></div> Duration</div>
                <div className="clc-summary-val">-</div>
              </div>
              <div className="clc-summary-item">
                <div className="clc-summary-label"><div className="clc-summary-icon"><Video size={16}/></div> Type</div>
                <div className="clc-summary-val">-</div>
              </div>
              <div className="clc-summary-item">
                <div className="clc-summary-label"><div className="clc-summary-icon"><Users size={16}/></div> Capacity</div>
                <div className="clc-summary-val">-</div>
              </div>
            </div>
          </div>

          <div className="clc-card">
            <div className="clc-card-title">Class Access</div>
            <div className="clc-card-sub">Choose who can join this live class</div>
            
            <div style={{display:'flex', flexDirection:'column', gap:12}}>
              <div className={`clc-radio-card ${classAccess==='Enrolled'?'active':''}`} onClick={()=>setClassAccess('Enrolled')} style={{background: classAccess==='Enrolled'?'#fdfcff':'#fff'}}>
                <input type="radio" checked={classAccess==='Enrolled'} readOnly />
                <div className="clc-radio-content">
                  <div className="clc-radio-title" style={{display:'flex', alignItems:'center', gap:8}}><CheckCircle size={14} color="#8b5cf6"/> Enrolled Students Only</div>
                  <div className="clc-radio-sub" style={{marginLeft:22}}>Only students enrolled in the course can join</div>
                </div>
              </div>
              <div className={`clc-radio-card ${classAccess==='Link'?'active':''}`} onClick={()=>setClassAccess('Link')} style={{background: classAccess==='Link'?'#fdfcff':'#fff'}}>
                <input type="radio" checked={classAccess==='Link'} readOnly />
                <div className="clc-radio-content">
                  <div className="clc-radio-title" style={{display:'flex', alignItems:'center', gap:8}}><Link size={14} color="#6b7280"/> Anyone with Link</div>
                  <div className="clc-radio-sub" style={{marginLeft:22}}>Anyone with the link can join the class</div>
                </div>
              </div>
            </div>
          </div>

          <div className="clc-card" style={{padding:0, border:'none', background:'transparent'}}>
            <div className="clc-card-title" style={{marginBottom:16}}>Additional Options</div>
            
            <div className="clc-checkbox-wrap" onClick={() => toggleOption('cert')}>
              <div className={`clc-checkbox ${options.cert?'active':''}`}>{options.cert && '✓'}</div>
              <div className="clc-toggle-text">
                <span className="clc-toggle-text-main">Enable Class Certificate</span>
                <span className="clc-toggle-text-sub" style={{marginLeft:0}}>Award certificate to attendees</span>
              </div>
            </div>
            <div className="clc-checkbox-wrap" onClick={() => toggleOption('shareRec')}>
              <div className={`clc-checkbox ${options.shareRec?'active':''}`}>{options.shareRec && '✓'}</div>
              <div className="clc-toggle-text">
                <span className="clc-toggle-text-main">Share Class Recording</span>
                <span className="clc-toggle-text-sub" style={{marginLeft:0}}>Share recording after the class</span>
              </div>
            </div>
            <div className="clc-checkbox-wrap" onClick={() => toggleOption('replay')}>
              <div className={`clc-checkbox ${options.replay?'active':''}`}>{options.replay && '✓'}</div>
              <div className="clc-toggle-text">
                <span className="clc-toggle-text-main">Make Class Replay Available</span>
                <span className="clc-toggle-text-sub" style={{marginLeft:0}}>Allow students to watch replay later</span>
              </div>
            </div>
          </div>

          <div className="clc-card" style={{padding:0, border:'none', background:'transparent', marginTop:24}}>
            <div className="clc-card-title">Live Class Agenda <span style={{color:'#6b7280',fontWeight:400}}>(Optional)</span></div>
            <div className="clc-card-sub" style={{marginBottom:8}}>Add key topics you will cover in this class</div>
            <textarea className="alc-input" placeholder="Enter agenda points (one per line)..." style={{minHeight:100, resize:'vertical'}}></textarea>
            <div className="alc-help" style={{textAlign:'right'}}>0/500 characters</div>
          </div>

          <div style={{position:'sticky', bottom:0, background:'#f9fafb', paddingTop:20}}>
            <button className="clc-bottom-sticky"><Radio size={16}/> Create Live Class</button>
            <div style={{fontSize:12, color:'#6b7280', textAlign:'center', marginTop:12}}>You can edit the class details later.</div>
          </div>

        </div>
      </div>
    </div>
  );
}

const BookOpen = ({size, color}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);
