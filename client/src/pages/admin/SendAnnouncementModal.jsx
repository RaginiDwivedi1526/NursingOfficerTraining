import { useState } from 'react';
import './SendAnnouncementModal.css';

/* ── UI Helpers ── */
const Ic = ({ d, size = 16, stroke="currentColor", fill="none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);
const icons = {
  megaphone: <><path d="M2 12a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v7z" /><path d="M8 5.5l11-4a1 1 0 0 1 1 1v19a1 1 0 0 1-1 1l-11-4" /><circle cx="20" cy="12" r="2" /></>,
  flag: <><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></>,
  bold: <><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/></>,
  italic: <><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></>,
  underline: <><path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"/><line x1="4" y1="21" x2="20" y2="21"/></>,
  list: <><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></>,
  listNum: <><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></>,
  link: <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></>,
  image: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></>,
  smile: <><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></>,
  users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
  book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></>,
  grad: <><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></>,
  person: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
  info: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
  bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>
};

const Field = ({ label, req, children }) => (
  <div className="sam-field">
    <label className="sam-label">{label}{req && <span className="sam-req">*</span>}</label>
    {children}
  </div>
);

const RadioCard = ({ active, onClick, title, sub, icon }) => (
  <div className={`sam-radio-card ${active ? 'active' : ''}`} onClick={onClick}>
    <div className="sam-radio-indicator">
      {active && <div className="sam-radio-dot" />}
    </div>
    <div className="sam-radio-content">
      <div className="sam-rc-icon">{icon}</div>
      <div>
        <div className="sam-rc-title">{title}</div>
        <div className="sam-rc-sub">{sub}</div>
      </div>
    </div>
  </div>
);

const ToggleSwitch = ({ on, onClick, label, sub, help }) => (
  <div className="sam-toggle-switch-wrap">
    <div className={`sam-ts-track ${on ? 'on' : ''}`} onClick={onClick}>
      <div className="sam-ts-thumb" />
    </div>
    <div style={{display:'flex', justifyContent:'space-between', flex:1, marginLeft:12}}>
      <div style={{display:'flex', flexDirection:'column'}}>
        <div className="sam-ts-label">{label}</div>
        <div className="sam-ts-sub">{sub}</div>
      </div>
      {help && <div className="sam-ts-help"><Ic d={icons.info} size={14} stroke="#9ca3af"/></div>}
    </div>
  </div>
);


export default function SendAnnouncementModal({ onClose }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Normal');
  const [message, setMessage] = useState('');
  
  const [sendTo, setSendTo] = useState('All Students');
  
  const [pushNotif, setPushNotif] = useState(true);
  const [sendEmail, setSendEmail] = useState(true);
  const [schedule, setSchedule] = useState(false);
  
  const [schedDate, setSchedDate] = useState('');
  const [schedTime, setSchedTime] = useState('');

  return (
    <div className="sam-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="sam-modal">
        
        {/* Header */}
        <div className="sam-header">
          <div className="sam-header-left">
            <div className="sam-icon-bg"><Ic d={icons.megaphone} size={24} stroke="#8b5cf6" /></div>
            <div>
              <div className="sam-title">Send Announcement</div>
              <div className="sam-subtitle">Send important updates and announcements to your students.</div>
            </div>
          </div>
          <button className="sam-close" onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="sam-body">
          <div className="sam-grid-2">
            <Field label="Announcement Title" req>
              <div className="sam-input-wrap">
                <input className="sam-inp" placeholder="Enter announcement title" value={title} onChange={e=>setTitle(e.target.value)} maxLength={100} />
                <span className="sam-char-count">{title.length}/100</span>
              </div>
            </Field>
            <Field label="Priority">
              <div className="sam-input-wrap">
                <span style={{position:'absolute', left:12, top:10, color:'#f59e0b'}}><Ic d={icons.flag} size={16}/></span>
                <select className="sam-inp" style={{paddingLeft:36}} value={priority} onChange={e=>setPriority(e.target.value)}>
                  <option>Normal</option>
                  <option>High</option>
                </select>
              </div>
              <div className="sam-help">Select priority level for this announcement</div>
            </Field>
          </div>

          <Field label="Message" req>
            <div className="sam-editor">
              <div className="sam-toolbar">
                <button><Ic d={icons.bold}/></button>
                <button><Ic d={icons.italic}/></button>
                <button><Ic d={icons.underline}/></button>
                <span className="sam-divider"/>
                <button><Ic d={icons.list}/></button>
                <button><Ic d={icons.listNum}/></button>
                <button><Ic d={icons.link}/></button>
                <button><Ic d={icons.image}/></button>
                <button><Ic d={icons.smile}/></button>
              </div>
              <textarea className="sam-textarea" placeholder="Write your announcement message here..." rows={4} value={message} onChange={e=>setMessage(e.target.value)} maxLength={2000} />
              <div className="sam-char-count-editor">{message.length}/2000</div>
            </div>
          </Field>

          <Field label="Send To" req>
            <div className="sam-grid-4">
              <RadioCard active={sendTo==='All Students'} onClick={()=>setSendTo('All Students')} title="All Students" sub="Send to all registered students" icon={<Ic d={icons.users} stroke="#8b5cf6"/>} />
              <RadioCard active={sendTo==='Course'} onClick={()=>setSendTo('Course')} title="Course / Batch" sub="Select specific courses or batches" icon={<Ic d={icons.book} stroke="#4f46e5"/>} />
              <RadioCard active={sendTo==='Year'} onClick={()=>setSendTo('Year')} title="Year / Exam" sub="Select specific year or exam" icon={<Ic d={icons.grad} stroke="#4f46e5"/>} />
              <RadioCard active={sendTo==='Custom'} onClick={()=>setSendTo('Custom')} title="Custom" sub="Select specific students" icon={<Ic d={icons.person} stroke="#4f46e5"/>} />
            </div>
          </Field>

          <div className="sam-grid-2" style={{marginTop: 24}}>
            <div className="sam-opts-col">
              <div className="sam-sec-title">Additional Options</div>
              <ToggleSwitch on={pushNotif} onClick={()=>setPushNotif(!pushNotif)} label="Send as Push Notification" sub="Send push notification to mobile app users" help />
              <ToggleSwitch on={sendEmail} onClick={()=>setSendEmail(!sendEmail)} label="Send Email" sub="Send announcement via email" help />
              <ToggleSwitch on={schedule} onClick={()=>setSchedule(!schedule)} label="Schedule Announcement" sub="Schedule for later" help />
            </div>
            
            <div className="sam-opts-col">
              <div className="sam-sec-title" style={{opacity: schedule ? 1 : 0.5}}>Schedule (If enabled)</div>
              <div className="sam-grid-2" style={{opacity: schedule ? 1 : 0.5, pointerEvents: schedule ? 'auto' : 'none'}}>
                <input type="date" className="sam-inp" value={schedDate} onChange={e=>setSchedDate(e.target.value)} />
                <input type="time" className="sam-inp" value={schedTime} onChange={e=>setSchedTime(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="sam-preview-sec">
            <div className="sam-sec-title">Preview</div>
            <div className="sam-preview-box">
              <div className="sam-preview-icon"><Ic d={icons.megaphone} stroke="#8b5cf6" size={24}/></div>
              <div className="sam-preview-content">
                <div className="sam-preview-header">
                  <div className="sam-preview-title">{title || 'Announcement Title'}</div>
                  <div className="sam-preview-badge">{priority}</div>
                </div>
                <div className="sam-preview-msg">{message || 'This is how your announcement will appear to students.'}</div>
                <div className="sam-preview-date">22 May 2024 • 10:30 AM</div>
              </div>
              <div className="sam-preview-bell"><Ic d={icons.bell} stroke="#e2e8f0" size={64}/></div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="sam-footer">
          <button className="sam-btn sam-btn-outline" onClick={onClose}>Cancel</button>
          <div style={{display:'flex', gap:12}}>
            <button className="sam-btn sam-btn-outline" onClick={onClose}>Save as Draft</button>
            <button className="sam-btn sam-btn-primary" onClick={onClose}><Ic d={icons.megaphone} size={16}/> Send Announcement</button>
          </div>
        </div>

      </div>
    </div>
  );
}
