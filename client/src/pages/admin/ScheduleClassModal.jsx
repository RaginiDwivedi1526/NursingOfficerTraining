import { useState } from 'react';
import './ScheduleClassModal.css';

/* ── UI Helpers ── */
const Ic = ({ d, size = 16, stroke="currentColor", fill="none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);
const icons = {
  video: <><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></>,
  clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
  info: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
  bold: <><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/></>,
  italic: <><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></>,
  underline: <><path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"/><line x1="4" y1="21" x2="20" y2="21"/></>,
  list: <><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></>,
  listNum: <><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></>,
  link: <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></>,
  image: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></>,
  smile: <><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></>,
  upload: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></>,
  paperclip: <><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></>,
  users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
  book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></>,
  person: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
  youtube: <><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.17 1 12 1 12s0 3.83.46 5.58a2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.83 23 12 23 12s0-3.83-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></>,
  zoom: <><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm3.3 11.7a.8.8 0 0 1-1.2.7l-1.6-.9-1.6.9a.8.8 0 0 1-1.2-.7v-3.4a.8.8 0 0 1 1.2-.7l1.6.9 1.6-.9a.8.8 0 0 1 1.2.7v3.4z"/></>,
  server: <><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></>,
  play: <><polygon points="5 3 19 12 5 21 5 3"/></>
};

const Field = ({ label, req, children }) => (
  <div className="slc-field">
    <label className="slc-label">{label}{req && <span className="slc-req">*</span>}</label>
    {children}
  </div>
);

const RadioCard = ({ active, onClick, title, sub, icon }) => (
  <div className={`slc-radio-card ${active ? 'active' : ''}`} onClick={onClick}>
    <div className="slc-radio-indicator">
      {active && <div className="slc-radio-dot" />}
    </div>
    <div className="slc-radio-content">
      <div className="slc-rc-icon">{icon}</div>
      <div>
        <div className="slc-rc-title">{title}</div>
        <div className="slc-rc-sub">{sub}</div>
      </div>
    </div>
  </div>
);

const ToggleSwitch = ({ on, onClick, label, sub, help }) => (
  <div className="slc-toggle-switch-wrap">
    <div className={`slc-ts-track ${on ? 'on' : ''}`} onClick={onClick}>
      <div className="slc-ts-thumb" />
    </div>
    <div style={{display:'flex', justifyContent:'space-between', flex:1, marginLeft:12}}>
      <div style={{display:'flex', flexDirection:'column'}}>
        <div className="slc-ts-label">{label}</div>
        <div className="slc-ts-sub">{sub}</div>
      </div>
      {help && <div className="slc-ts-help"><Ic d={icons.info} size={14} stroke="#9ca3af"/></div>}
    </div>
  </div>
);


export default function ScheduleClassModal({ onClose }) {
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [desc, setDesc] = useState('');
  
  const [course, setCourse] = useState('');
  const [instructor, setInstructor] = useState('');
  
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [duration, setDuration] = useState('60 Minutes');
  
  const [attend, setAttend] = useState('All Students');
  
  const [liveChat, setLiveChat] = useState(true);
  const [recordSession, setRecordSession] = useState(true);
  const [requireApproval, setRequireApproval] = useState(false);
  
  const [platform, setPlatform] = useState('In-App');

  return (
    <div className="slc-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="slc-modal">
        
        {/* Header */}
        <div className="slc-header">
          <div className="slc-header-left">
            <div className="slc-icon-bg"><Ic d={icons.video} size={24} stroke="#8b5cf6" /></div>
            <div>
              <div className="slc-title">Schedule Live Class</div>
              <div className="slc-subtitle">Plan and schedule a live class for your students.</div>
            </div>
          </div>
          <button className="slc-close" onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="slc-body">
          <div className="slc-grid-2">
            <Field label="Class Title" req>
              <div className="slc-input-wrap">
                <input className="slc-inp" placeholder="Enter live class title" value={title} onChange={e=>setTitle(e.target.value)} maxLength={100} />
                <span className="slc-char-count">{title.length}/100</span>
              </div>
            </Field>
            <Field label="Subject / Course" req>
              <select className="slc-inp" value={course} onChange={e=>setCourse(e.target.value)}>
                <option value="">Select subject or course</option>
                <option value="NORCET 2025">NORCET 2025</option>
              </select>
            </Field>
          </div>

          <div className="slc-grid-2">
            <Field label="Topic" req>
              <div className="slc-input-wrap">
                <input className="slc-inp" placeholder="Enter topic of the live class" value={topic} onChange={e=>setTopic(e.target.value)} maxLength={150} />
                <span className="slc-char-count">{topic.length}/150</span>
              </div>
            </Field>
            <Field label="Instructor" req>
              <select className="slc-inp" value={instructor} onChange={e=>setInstructor(e.target.value)}>
                <option value="">Select instructor</option>
                <option value="Dr. Ramesh">Dr. Ramesh</option>
              </select>
              <div className="slc-help" style={{marginTop:4}}>Choose the instructor for this live class.</div>
            </Field>
          </div>

          <div className="slc-sec-title">Date & Time <span className="slc-req">*</span></div>
          <div className="slc-grid-4">
            <Field label="Date">
              <input type="date" className="slc-inp" value={date} onChange={e=>setDate(e.target.value)} />
            </Field>
            <Field label="Start Time">
              <input type="time" className="slc-inp" value={startTime} onChange={e=>setStartTime(e.target.value)} />
            </Field>
            <Field label="End Time">
              <input type="time" className="slc-inp" value={endTime} onChange={e=>setEndTime(e.target.value)} />
            </Field>
            <Field label="Duration">
              <select className="slc-inp" value={duration} onChange={e=>setDuration(e.target.value)}>
                <option>60 Minutes</option>
                <option>90 Minutes</option>
              </select>
            </Field>
          </div>
          
          <div className="slc-alert">
            <Ic d={icons.info} stroke="#8b5cf6" size={16}/> Students will be able to join the class 10 minutes before the scheduled start time.
          </div>

          <div className="slc-sec-title">Class Details</div>
          <div className="slc-grid-2">
            <Field label="Description (Optional)">
              <div className="slc-editor">
                <div className="slc-toolbar">
                  <button><Ic d={icons.bold}/></button>
                  <button><Ic d={icons.italic}/></button>
                  <button><Ic d={icons.underline}/></button>
                  <span className="slc-divider"/>
                  <button><Ic d={icons.list}/></button>
                  <button><Ic d={icons.listNum}/></button>
                  <button><Ic d={icons.link}/></button>
                  <button><Ic d={icons.image}/></button>
                  <button><Ic d={icons.smile}/></button>
                </div>
                <textarea className="slc-textarea" placeholder="Add class description, agenda or important notes..." rows={4} value={desc} onChange={e=>setDesc(e.target.value)} maxLength={1000} />
                <div className="slc-char-count-editor">{desc.length}/1000</div>
              </div>
            </Field>
            <Field label="Class Thumbnail (Optional)">
              <div className="slc-upload-zone" style={{height:'100%', display:'flex', flexDirection:'column', justifyContent:'center'}}>
                <Ic d={icons.upload} stroke="#6b7280" size={24}/>
                <div className="slc-uz-title">Upload thumbnail image</div>
                <div className="slc-uz-sub">Recommended size: 1280x720px (16:9)</div>
                <button className="slc-uz-btn">Choose File</button>
              </div>
            </Field>
          </div>

          <div className="slc-grid-2">
            <div>
              <div className="slc-sec-title">Who can attend? <span className="slc-req">*</span></div>
              <div className="slc-grid-3">
                <RadioCard active={attend==='All Students'} onClick={()=>setAttend('All Students')} title="All Students" sub="All enrolled students can join this class" icon={<Ic d={icons.users} stroke="#8b5cf6"/>} />
                <RadioCard active={attend==='Specific Batch'} onClick={()=>setAttend('Specific Batch')} title="Specific Batch" sub="Only selected batch students can join" icon={<Ic d={icons.book} stroke="#4f46e5"/>} />
                <RadioCard active={attend==='Specific Students'} onClick={()=>setAttend('Specific Students')} title="Specific Students" sub="Only selected students can join" icon={<Ic d={icons.person} stroke="#4f46e5"/>} />
              </div>
            </div>
            <div>
              <div className="slc-sec-title">Class Settings</div>
              <div className="slc-settings-col">
                <ToggleSwitch on={liveChat} onClick={()=>setLiveChat(!liveChat)} label="Enable Live Chat" sub="Allow students to chat during the class" help />
                <ToggleSwitch on={recordSession} onClick={()=>setRecordSession(!recordSession)} label="Record Session" sub="Record and share with students later" help />
                <ToggleSwitch on={requireApproval} onClick={()=>setRequireApproval(!requireApproval)} label="Require Approval" sub="Students need approval to join the class" help />
              </div>
            </div>
          </div>

          <div className="slc-grid-2">
            <div>
              <div className="slc-sec-title">Live Class Platform <span className="slc-req">*</span></div>
              <div className="slc-grid-4">
                <RadioCard active={platform==='In-App'} onClick={()=>setPlatform('In-App')} title="In-App Live Room" sub="Use our built-in live class room" icon={<Ic d={icons.play} stroke="#8b5cf6"/>} />
                <RadioCard active={platform==='YouTube'} onClick={()=>setPlatform('YouTube')} title="YouTube Live" sub="Stream using YouTube Live" icon={<Ic d={icons.youtube} stroke="#ef4444"/>} />
                <RadioCard active={platform==='Zoom'} onClick={()=>setPlatform('Zoom')} title="Zoom" sub="Use Zoom for live class" icon={<Ic d={icons.zoom} stroke="#3b82f6"/>} />
                <RadioCard active={platform==='Other'} onClick={()=>setPlatform('Other')} title="Other (RTMP)" sub="Use custom RTMP stream" icon={<Ic d={icons.server} stroke="#4b5563"/>} />
              </div>
            </div>
            <div>
              <div className="slc-sec-title">Attachments / Resources (Optional)</div>
              <div className="slc-upload-zone" style={{height:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:16, padding:16, flexDirection:'row'}}>
                <Ic d={icons.paperclip} stroke="#6b7280" size={20}/>
                <div style={{textAlign:'left', flex:1}}>
                  <div className="slc-uz-title" style={{marginTop:0, fontSize:13}}>Upload files or resources</div>
                  <div className="slc-uz-sub" style={{marginTop:2}}>PDF, PPT, DOCX (Max 50MB)</div>
                </div>
                <button className="slc-uz-btn">Choose Files</button>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="slc-footer">
          <button className="slc-btn slc-btn-outline" onClick={onClose}>Cancel</button>
          <div style={{display:'flex', gap:12}}>
            <button className="slc-btn slc-btn-outline" onClick={onClose}>Save as Draft</button>
            <button className="slc-btn slc-btn-primary" onClick={onClose}><Ic d={icons.calendar} size={16}/> Schedule Live Class</button>
          </div>
        </div>

      </div>
    </div>
  );
}
