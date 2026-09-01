import { useState } from 'react';
import './UploadMaterialModal.css';

/* ── UI Helpers ── */
const Ic = ({ d, size = 16, stroke="currentColor", fill="none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);
const icons = {
  cloud: <><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></>,
  check: <><polyline points="20 6 9 17 4 12"/></>,
  file: <><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></>,
  trash: <><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></>,
  upload: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></>,
  notes: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></>,
  question: <><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
  video: <><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></>,
  presentation: <><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>,
  other: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></>,
  globe: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
  lock: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
  person: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
  info: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
  edit: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
  eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
  book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></>,
  send: <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>
};

const Field = ({ label, req, children, help }) => (
  <div className="umm-field">
    <label className="umm-label">{label}{req && <span className="umm-req">*</span>}</label>
    {help && <div className="umm-help">{help}</div>}
    {children}
  </div>
);

const RadioCard = ({ active, onClick, title, sub, icon }) => (
  <div className={`umm-radio-card ${active ? 'active' : ''}`} onClick={onClick}>
    <div className="umm-radio-indicator">
      {active && <div className="umm-radio-dot" />}
    </div>
    <div className="umm-radio-content">
      <div className="umm-rc-icon">{icon}</div>
      <div>
        <div className="umm-rc-title">{title}</div>
        <div className="umm-rc-sub">{sub}</div>
      </div>
    </div>
  </div>
);

const MaterialCard = ({ active, onClick, title, icon }) => (
  <div className={`umm-mat-card ${active ? 'active' : ''}`} onClick={onClick}>
    <div className="umm-mat-indicator">{active && <Ic d={icons.check} size={12} stroke="#fff" />}</div>
    <div className="umm-mat-icon">{icon}</div>
    <div className="umm-mat-title">{title}</div>
  </div>
);

const ToggleSwitch = ({ on, onClick, label, sub, help }) => (
  <div className="umm-toggle-switch-wrap">
    <div className={`umm-ts-track ${on ? 'on' : ''}`} onClick={onClick}>
      <div className="umm-ts-thumb" />
    </div>
    <div style={{display:'flex', justifyContent:'space-between', flex:1, marginLeft:12}}>
      <div style={{display:'flex', flexDirection:'column'}}>
        <div className="umm-ts-label">{label}</div>
        <div className="umm-ts-sub">{sub}</div>
      </div>
      {help && <div className="umm-ts-help"><Ic d={icons.info} size={14} stroke="#9ca3af"/></div>}
    </div>
  </div>
);

const MOCK_FILES = [
  { name: 'Nursing Fundamentals_Notes.pdf', size: '2.45 MB', type: 'PDF', color: '#ef4444' },
  { name: 'Wound Care Procedure.mp4', size: '48.75 MB', type: 'MP4', color: '#3b82f6' },
  { name: 'Medical Abbreviations.docx', size: '1.28 MB', type: 'DOCX', color: '#10b981' },
];

export default function UploadMaterialModal({ onClose }) {
  const [step, setStep] = useState(1);
  const STEPS = ['Upload Details', 'Material Information', 'Visibility & Access', 'Review & Publish'];

  // Form State
  const [title, setTitle] = useState('Nursing Fundamentals - Complete Study Material');
  const [subject, setSubject] = useState('Nursing Foundation');
  const [topic, setTopic] = useState('Basic Nursing Concepts');
  const [matType, setMatType] = useState('Notes');
  const [exam, setExam] = useState('NORCET 2025');
  const [language, setLanguage] = useState('English');
  const [desc, setDesc] = useState('Comprehensive notes covering basic nursing concepts, principles and practices. Useful for NORCET and other nursing exams.');
  
  const [access, setAccess] = useState('Public');
  const [allowDownload, setAllowDownload] = useState(true);
  const [allowPrint, setAllowPrint] = useState(true);
  const [allowShare, setAllowShare] = useState(true);
  const [markImportant, setMarkImportant] = useState(true);
  const [addToLib, setAddToLib] = useState(true);
  
  const [availability, setAvailability] = useState('Always Available');

  const renderStep = () => {
    switch (step) {
      case 1: return (
        <div className="umm-grid-2">
          <div>
            <div className="umm-sec-title">Choose File(s) to Upload <span className="umm-req">*</span></div>
            <div className="umm-upload-dropzone">
              <div className="umm-ud-icon"><Ic d={icons.upload} size={32} stroke="#8b5cf6" /></div>
              <div className="umm-ud-title">Drag & drop files here</div>
              <div className="umm-ud-or">or</div>
              <button className="umm-ud-btn">Browse Files</button>
            </div>
            <div className="umm-ud-help">Supported formats: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, MP4, ZIP, JPG, PNG<br/>Maximum file size: 200 MB per file</div>
          </div>
          <div>
            <div className="umm-sec-title" style={{display:'flex', justifyContent:'space-between'}}>
              <span>Uploaded Files <span style={{color:'#6b7280', fontWeight:500}}>(3)</span></span>
              <span style={{color:'#8b5cf6', fontSize:13, cursor:'pointer'}}>+ Add More Files</span>
            </div>
            <div className="umm-files-list">
              {MOCK_FILES.map((f, i) => (
                <div className="umm-file-item" key={i}>
                  <div className="umm-fi-icon" style={{background: f.color}}><Ic d={icons.file} stroke="#fff" /></div>
                  <div className="umm-fi-body">
                    <div className="umm-fi-name">{f.name}</div>
                    <div className="umm-fi-sub">{f.size} • {f.type}</div>
                  </div>
                  <button className="umm-fi-del"><Ic d={icons.trash} stroke="#9ca3af" size={16} /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
      case 2: return (
        <div className="umm-step-col">
          <div className="umm-sec-title">Material Information</div>
          <div className="umm-sec-sub">Provide detailed information about the study material.</div>
          
          <div className="umm-grid-2">
            <Field label="Title" req help="Enter a clear and descriptive title">
              <input className="umm-inp" value={title} onChange={e=>setTitle(e.target.value)} />
            </Field>
            <Field label="Subject / Course" req help="Select the relevant subject or course">
              <select className="umm-inp" value={subject} onChange={e=>setSubject(e.target.value)}>
                <option>{subject}</option>
              </select>
            </Field>
          </div>

          <div className="umm-grid-2">
            <Field label="Topic (Optional)" help="Specific topic covered in this material">
              <input className="umm-inp" value={topic} onChange={e=>setTopic(e.target.value)} />
            </Field>
            <Field label="Material Type" req>
              <div className="umm-mat-grid">
                <MaterialCard active={matType==='Notes'} onClick={()=>setMatType('Notes')} title="Notes" icon={<Ic d={icons.notes} size={24} stroke="#8b5cf6"/>} />
                <MaterialCard active={matType==='Question Bank'} onClick={()=>setMatType('Question Bank')} title="Question Bank" icon={<Ic d={icons.question} size={24} stroke="#6b7280"/>} />
                <MaterialCard active={matType==='Video'} onClick={()=>setMatType('Video')} title="Video Lecture" icon={<Ic d={icons.video} size={24} stroke="#6b7280"/>} />
                <MaterialCard active={matType==='Presentation'} onClick={()=>setMatType('Presentation')} title="Presentation" icon={<Ic d={icons.presentation} size={24} stroke="#6b7280"/>} />
                <MaterialCard active={matType==='Other'} onClick={()=>setMatType('Other')} title="Other" icon={<Ic d={icons.other} size={24} stroke="#6b7280"/>} />
              </div>
            </Field>
          </div>

          <div className="umm-grid-2">
            <Field label="For Exam" req help="Select the exam this material is for">
              <select className="umm-inp" value={exam} onChange={e=>setExam(e.target.value)}>
                <option>{exam}</option>
              </select>
            </Field>
            <Field label="Language" req help="Select the language of the material">
              <select className="umm-inp" value={language} onChange={e=>setLanguage(e.target.value)}>
                <option>{language}</option>
              </select>
            </Field>
          </div>

          <div className="umm-grid-2">
            <Field label="Description" req help="Provide a brief description of this material">
              <div style={{position:'relative'}}>
                <textarea className="umm-textarea" rows={4} value={desc} onChange={e=>setDesc(e.target.value)} maxLength={500} />
                <span className="umm-char-count">{desc.length}/500</span>
              </div>
            </Field>
            <div style={{display:'flex', flexDirection:'column', gap:20}}>
              <Field label="Tags (Optional)" help="Add relevant tags to help students find this material">
                <input className="umm-inp" placeholder="Enter tags and press Enter" />
                <div style={{display:'flex', gap:8, marginTop:8}}>
                  {['Nursing', 'Fundamentals', 'Basic Concepts', 'Notes'].map(t=>(
                    <div className="umm-tag" key={t}>{t} <span style={{marginLeft:4, cursor:'pointer'}}>✕</span></div>
                  ))}
                </div>
              </Field>
            </div>
          </div>

        </div>
      );
      case 3: return (
        <div className="umm-step-col">
          <div className="umm-sec-title">Visibility & Access</div>
          <div className="umm-sec-sub">Choose who can view and access this study material.</div>

          <Field label="Access Level" req>
            <div className="umm-grid-3">
              <RadioCard active={access==='Public'} onClick={()=>setAccess('Public')} title="Public" sub="Visible to all students. Anyone can view and access" icon={<Ic d={icons.globe} stroke="#8b5cf6"/>} />
              <RadioCard active={access==='Restricted'} onClick={()=>setAccess('Restricted')} title="Restricted" sub="Only for selected courses or batches. Limited to selected audience" icon={<Ic d={icons.lock} stroke="#4b5563"/>} />
              <RadioCard active={access==='Private'} onClick={()=>setAccess('Private')} title="Private" sub="Only for you. Only you can view and access" icon={<Ic d={icons.person} stroke="#4b5563"/>} />
            </div>
          </Field>

          <Field label="Select Courses / Batches" req help="Select one or more courses or batches">
            <select className="umm-inp" value={subject} onChange={e=>setSubject(e.target.value)}>
              <option>{subject}</option>
            </select>
          </Field>

          <div className="umm-sec-title" style={{marginTop:8}}>Student Access Options</div>
          <div className="umm-grid-2">
            <div className="umm-options-col">
              <ToggleSwitch on={allowDownload} onClick={()=>setAllowDownload(!allowDownload)} label="Allow Download" sub="Students can download this material" help />
              <ToggleSwitch on={allowPrint} onClick={()=>setAllowPrint(!allowPrint)} label="Allow Print" sub="Students can print this material" help />
              <ToggleSwitch on={allowShare} onClick={()=>setAllowShare(!allowShare)} label="Allow Share" sub="Students can share this material with others" help />
            </div>
            <div className="umm-options-col">
              <ToggleSwitch on={markImportant} onClick={()=>setMarkImportant(!markImportant)} label="Mark as Important" sub="Material will be marked as important for students" help />
              <ToggleSwitch on={addToLib} onClick={()=>setAddToLib(!addToLib)} label="Add to Study Material Library" sub="Show in students' study material section" help />
            </div>
          </div>

          <div className="umm-grid-2">
            <Field label="Availability" req>
              <div className="umm-avail-card">
                <div className="umm-radio-row" onClick={()=>setAvailability('Always Available')}>
                  <div className={`umm-radio-circ ${availability==='Always Available'?'on':''}`}/>
                  <div>
                    <div className="umm-rc-title">Always Available</div>
                    <div className="umm-rc-sub">Material will be available without any time limit</div>
                  </div>
                </div>
                <div className="umm-radio-row" onClick={()=>setAvailability('Period')}>
                  <div className={`umm-radio-circ ${availability==='Period'?'on':''}`}/>
                  <div>
                    <div className="umm-rc-title">Set Availability Period</div>
                    <div className="umm-rc-sub">Choose start and end date</div>
                  </div>
                </div>
                <div className="umm-radio-row" onClick={()=>setAvailability('Limited')}>
                  <div className={`umm-radio-circ ${availability==='Limited'?'on':''}`}/>
                  <div>
                    <div className="umm-rc-title">Available for Limited Days</div>
                    <div className="umm-rc-sub">Material will be available for limited days after publishing</div>
                  </div>
                </div>
              </div>
            </Field>
            <Field label="Expiry (Optional)" help={<span style={{display:'flex', gap:4, alignItems:'center', color:'#8b5cf6', background:'#faf5ff', padding:'8px 12px', borderRadius:8, marginTop:8}}><Ic d={icons.info} size={14}/> Students won't be able to access this material after the expiry date.</span>}>
              <div className="umm-avail-card" style={{opacity:0.6, pointerEvents:'none'}}>
                <label style={{display:'flex', alignItems:'center', gap:8}}>
                  <input type="checkbox" /> Set Expiry Date
                </label>
                <div className="umm-rc-sub" style={{marginBottom:12}}>Material will not be accessible after this date</div>
                <div className="umm-input-wrap">
                  <input type="date" className="umm-inp" />
                </div>
              </div>
            </Field>
          </div>

        </div>
      );
      case 4: return (
        <div className="umm-step-col" style={{gap:16}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <div className="umm-sec-title">Review & Publish</div>
              <div className="umm-sec-sub">Review all the information before publishing the material. You can go back and edit if needed.</div>
            </div>
            <div style={{display:'flex', gap:12}}>
              <button className="umm-btn umm-btn-outline"><Ic d={icons.edit}/> Edit Details</button>
              <button className="umm-btn umm-btn-outline" style={{color:'#8b5cf6', borderColor:'#8b5cf6'}}><Ic d={icons.eye}/> Preview Material</button>
            </div>
          </div>
          
          <div className="umm-review-layout">
            <div className="umm-review-main">
              {/* Cards Grid */}
              <div className="umm-grid-3">
                <div className="umm-review-card">
                  <div className="umm-rcard-header"><Ic d={icons.cloud} stroke="#8b5cf6"/> Upload Details <span className="umm-rcard-edit"><Ic d={icons.edit} size={12}/> Edit</span></div>
                  <div className="umm-rcard-body">
                    <div className="umm-rcard-bold">3 Files Uploaded</div>
                    <div className="umm-rcard-sub">Total Size: 52.35 MB</div>
                    <div className="umm-files-list" style={{marginTop:12}}>
                      {MOCK_FILES.map((f, i) => (
                        <div className="umm-file-item" key={i} style={{padding:8}}>
                          <div className="umm-fi-icon" style={{background: f.color}}><Ic d={icons.file} stroke="#fff" size={12}/></div>
                          <div className="umm-fi-body">
                            <div className="umm-fi-name" style={{fontSize:12}}>{f.name}</div>
                            <div className="umm-fi-sub" style={{fontSize:10}}>{f.size} • {f.type}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="umm-review-card">
                  <div className="umm-rcard-header"><Ic d={icons.file} stroke="#8b5cf6"/> Material Information <span className="umm-rcard-edit"><Ic d={icons.edit} size={12}/> Edit</span></div>
                  <div className="umm-rcard-body">
                    <div className="umm-r-item"><div className="umm-r-label">Title</div><div className="umm-r-val">{title}</div></div>
                    <div className="umm-r-item"><div className="umm-r-label">Subject / Course</div><div className="umm-r-val">{subject}</div></div>
                    <div className="umm-r-item"><div className="umm-r-label">Topic</div><div className="umm-r-val">{topic}</div></div>
                    <div className="umm-r-item"><div className="umm-r-label">Material Type</div><div className="umm-r-val"><span className="umm-badge"><Ic d={icons.notes} size={12}/> {matType}</span></div></div>
                    <div className="umm-r-item"><div className="umm-r-label">For Exam</div><div className="umm-r-val">{exam}</div></div>
                    <div className="umm-r-item"><div className="umm-r-label">Language</div><div className="umm-r-val">{language}</div></div>
                    <div className="umm-r-item"><div className="umm-r-label">Description</div><div className="umm-r-val">{desc.substring(0,80)}...</div></div>
                  </div>
                </div>

                <div className="umm-review-card">
                  <div className="umm-rcard-header"><Ic d={icons.globe} stroke="#8b5cf6"/> Visibility & Access <span className="umm-rcard-edit"><Ic d={icons.edit} size={12}/> Edit</span></div>
                  <div className="umm-rcard-body">
                    <div className="umm-r-item"><div className="umm-r-label">Access Level</div><div className="umm-r-val"><span className="umm-badge-green">Public</span></div><div className="umm-r-sub">Anyone can view and access</div></div>
                    <div className="umm-r-item"><div className="umm-r-label">Courses / Batches</div><div className="umm-r-val"><span className="umm-tag">{subject}</span></div></div>
                    <div className="umm-r-item">
                      <div className="umm-r-label">Options</div>
                      <div className="umm-options-list">
                        <div className="umm-opt-item"><Ic d={icons.check} stroke="#10b981" size={14}/> Allow Download</div>
                        <div className="umm-opt-item"><Ic d={icons.check} stroke="#10b981" size={14}/> Allow Print</div>
                        <div className="umm-opt-item"><Ic d={icons.check} stroke="#10b981" size={14}/> Allow Share</div>
                        <div className="umm-opt-item"><Ic d={icons.check} stroke="#10b981" size={14}/> Mark as Important</div>
                        <div className="umm-opt-item"><Ic d={icons.check} stroke="#10b981" size={14}/> Add to Library</div>
                      </div>
                    </div>
                    <div className="umm-r-item"><div className="umm-r-label">Availability</div><div className="umm-r-val"><span className="umm-badge-green">{availability}</span></div></div>
                  </div>
                </div>
              </div>

              {/* Banner */}
              <div className="umm-pub-banner">
                <div className="umm-sec-title">Publishing Summary</div>
                <div className="umm-sec-sub">You are about to publish this study material with the above settings.</div>
                <div className="umm-pub-grid">
                  <div className="umm-pub-stat"><Ic d={icons.file} size={20} stroke="#8b5cf6"/> <div><b>3</b> Files</div></div>
                  <div className="umm-pub-stat"><Ic d={icons.book} size={20} stroke="#f59e0b"/> <div><b>1</b> Course / Batch</div></div>
                  <div className="umm-pub-stat"><Ic d={icons.globe} size={20} stroke="#10b981"/> <div><b>Public</b> Access</div></div>
                  <div className="umm-pub-stat"><Ic d={icons.calendar} size={20} stroke="#3b82f6"/> <div><b>Always Available</b></div></div>
                </div>
              </div>

            </div>
            
            <div className="umm-review-sidebar">
              <div className="umm-rcard-header">Material Summary</div>
              <div className="umm-r-item"><div className="umm-r-label" style={{display:'flex', alignItems:'center', gap:8}}><Ic d={icons.file} size={14}/> Files</div><div className="umm-r-val">3</div></div>
              <div className="umm-r-item"><div className="umm-r-label" style={{display:'flex', alignItems:'center', gap:8}}><Ic d={icons.server} size={14}/> Total Size</div><div className="umm-r-val">52.35 MB</div></div>
              <div className="umm-r-item"><div className="umm-r-label" style={{display:'flex', alignItems:'center', gap:8}}><Ic d={icons.book} size={14}/> Course / Batch</div><div className="umm-r-val">1</div></div>
              <div className="umm-r-item"><div className="umm-r-label" style={{display:'flex', alignItems:'center', gap:8}}><Ic d={icons.calendar} size={14}/> Availability</div><div className="umm-r-val">Always Available</div></div>
              <div className="umm-r-item"><div className="umm-r-label" style={{display:'flex', alignItems:'center', gap:8}}><Ic d={icons.globe} size={14}/> Access</div><div className="umm-r-val">Public</div></div>
              
              <div className="umm-rcard-header" style={{marginTop:24}}>Review Checklist</div>
              <div className="umm-chk-item">
                <div className="umm-chk-icon"><Ic d={icons.check} stroke="#10b981"/></div>
                <div><div className="umm-chk-title">Upload Details</div><div className="umm-chk-sub">All files uploaded successfully</div></div>
              </div>
              <div className="umm-chk-item">
                <div className="umm-chk-icon"><Ic d={icons.check} stroke="#10b981"/></div>
                <div><div className="umm-chk-title">Material Information</div><div className="umm-chk-sub">Title, topic and description added</div></div>
              </div>
              <div className="umm-chk-item">
                <div className="umm-chk-icon"><Ic d={icons.check} stroke="#10b981"/></div>
                <div><div className="umm-chk-title">Visibility & Access</div><div className="umm-chk-sub">Access level and options configured</div></div>
              </div>
              
              <div className="umm-ready-banner">
                <Ic d={icons.check} stroke="#10b981" size={24}/>
                <div>
                  <div style={{fontWeight:700, color:'#065f46'}}>Ready to Publish</div>
                  <div style={{fontSize:12, color:'#047857', marginTop:2}}>Everything looks good!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="umm-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="umm-modal">
        
        {/* Header & Stepper */}
        <div className="umm-header">
          <div className="umm-header-left">
            <div className="umm-icon-bg"><Ic d={icons.upload} size={24} stroke="#8b5cf6" /></div>
            <div>
              <div className="umm-title">Upload Study Material</div>
              <div className="umm-subtitle">Upload notes, PDFs, videos and other study materials for your students.</div>
            </div>
          </div>
          <button className="umm-close" onClick={onClose}>✕</button>
        </div>
        
        <div className="umm-stepper">
          {STEPS.map((s, i) => (
            <div className={`umm-step ${step === i + 1 ? 'active' : step > i + 1 ? 'completed' : ''}`} key={i}>
              <div className="umm-step-num">
                {step > i + 1 ? <Ic d={icons.check} stroke="#fff" size={14} /> : (i + 1)}
              </div>
              <div className="umm-step-label">{s}</div>
              {i < STEPS.length - 1 && <div className="umm-step-line" />}
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="umm-body">
          {renderStep()}
        </div>

        {/* Footer */}
        <div className="umm-footer">
          <button className="umm-btn umm-btn-outline" onClick={() => step > 1 ? setStep(step - 1) : onClose()}>
            {step === 1 ? 'Cancel' : '← Back'}
          </button>
          <div style={{display:'flex', gap:12}}>
            <button className="umm-btn umm-btn-outline">Save as Draft</button>
            <button className="umm-btn umm-btn-primary" onClick={() => step < 4 ? setStep(step + 1) : onClose()}>
              {step === 4 ? <><Ic d={icons.send} size={16}/> Publish Material</> : 'Next →'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
