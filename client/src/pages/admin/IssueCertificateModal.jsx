import { useState, useEffect } from 'react';
import axios from 'axios';
import './IssueCertificateModal.css';

/* ── UI Helpers ── */
const Ic = ({ d, size = 16, stroke="currentColor", fill="none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);
const icons = {
  certificate: <><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></>,
  search: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
  user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
  book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></>,
  eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
  download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
  mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
  printer: <><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></>,
  share: <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></>,
  shieldCheck: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></>,
  info: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
  check: <><polyline points="20 6 9 17 4 12"/></>
};

const Field = ({ label, req, children, help }) => (
  <div className="icm-field">
    <label className="icm-label">{label}{req && <span className="icm-req">*</span>}</label>
    {children}
    {help && <div className="icm-help">{help}</div>}
  </div>
);

const OptionCard = ({ active, onClick, title, sub, icon }) => (
  <div className={`icm-opt-card ${active ? 'active' : ''}`} onClick={onClick}>
    <div className="icm-opt-indicator">
      {active && <div className="icm-opt-dot"><Ic d={icons.check} size={10} stroke="#fff" strokeWidth="3"/></div>}
    </div>
    <div className="icm-opt-content">
      <div className="icm-opt-icon">{icon}</div>
      <div className="icm-opt-title">{title}</div>
      <div className="icm-opt-sub">{sub}</div>
    </div>
  </div>
);


export default function IssueCertificateModal({ onClose, onCreated }) {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [studentId, setStudentId] = useState('');
  const [course, setCourse] = useState('');
  const [template, setTemplate] = useState('Modern Blue Certificate');
  const [title, setTitle] = useState('Certificate of Completion');
  const [desc, setDesc] = useState('For successfully completing the Nursing Fundamentals - Complete Course.');
  const [certId, setCertId] = useState('CERT-' + Date.now().toString().slice(-6));
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);
  const [expiryDate, setExpiryDate] = useState('');

  const [options, setOptions] = useState({
    download: true, email: true, print: false, share: false, verify: false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userStr = localStorage.getItem('nursingUser');
        const token = userStr ? JSON.parse(userStr).token : null;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const envUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
        const baseUrl = envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`;
        
        const [usersRes, statsRes] = await Promise.all([
          axios.get(`${baseUrl}/admin/users`, config),
          axios.get(`${baseUrl}/admin/stats`, config)
        ]);
        
        setUsers(usersRes.data || []);
        if (usersRes.data?.length > 0) {
          setStudentId(usersRes.data[0]._id);
        }
        
        const cList = statsRes.data?.courses || [];
        setCourses(cList);
        if (cList.length > 0) {
          setCourse(cList[0].title);
        } else {
          setCourse('General Prep');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch data');
      } finally {
        setLoadingData(false);
      }
    };
    fetchData();
  }, []);

  const toggleOption = (key) => setOptions(prev => ({ ...prev, [key]: !prev[key] }));

  const handleIssue = async () => {
    try {
      setSubmitting(true);
      setError('');
      const userStr = localStorage.getItem('nursingUser');
      const token = userStr ? JSON.parse(userStr).token : null;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const envUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
      const baseUrl = envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`;

      await axios.post(`${baseUrl}/admin/certificates`, {
        student: studentId,
        course,
        title,
        type: template,
        status: 'Active',
        issuedDate: issueDate
      }, config);

      if (onCreated) onCreated();
      else onClose();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to issue certificate');
      setSubmitting(false);
    }
  };

  const selectedUser = users.find(u => u._id === studentId);

  return (
    <div className="icm-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="icm-modal">
        
        {/* Header */}
        <div className="icm-header">
          <div className="icm-header-left">
            <div className="icm-icon-bg"><Ic d={icons.certificate} size={24} stroke="#8b5cf6" /></div>
            <div>
              <div className="icm-title">Issue Certificate</div>
              <div className="icm-subtitle">Generate and issue a certificate to the student.</div>
            </div>
          </div>
          <button className="icm-close" onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="icm-body">
          
          {/* Section 1 */}
          <div className="icm-sec-title">Student Information</div>
          <div className="icm-grid-2">
            <Field label="Select Student" req>
              <div className="icm-input-wrap">
                <span className="icm-inp-icon"><Ic d={icons.user} stroke="#9ca3af" size={16}/></span>
                <select className="icm-inp icm-inp-with-icon" value={studentId} onChange={e=>setStudentId(e.target.value)} disabled={loadingData}>
                  {loadingData ? <option>Loading...</option> : users.map(u => (
                    <option key={u._id} value={u._id}>{u.name} ({u.email})</option>
                  ))}
                </select>
              </div>
              {selectedUser && (
                <div className="icm-card">
                  <div className="icm-card-icon"><Ic d={icons.user} stroke="#8b5cf6" size={20}/></div>
                  <div>
                    <div className="icm-card-title">{selectedUser.name}</div>
                    <div className="icm-card-sub">{selectedUser.email}</div>
                    <div className="icm-card-sub" style={{marginTop:4}}>Joined: {new Date(selectedUser.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
              )}
            </Field>

            <Field label="Select Course / Program" req>
              <select className="icm-inp" value={course} onChange={e=>setCourse(e.target.value)} disabled={loadingData}>
                {courses.length > 0 ? courses.map((c, i) => (
                  <option key={i} value={c.title}>{c.title}</option>
                )) : <option value="General Prep">General Prep</option>}
              </select>
              <div className="icm-card">
                <div className="icm-card-icon" style={{background:'#eff6ff'}}><Ic d={icons.book} stroke="#3b82f6" size={20}/></div>
                <div>
                  <div className="icm-card-title">{course}</div>
                  <div className="icm-card-sub">Selected Course</div>
                </div>
              </div>
            </Field>
          </div>

          <div className="icm-divider" />

          {/* Section 2 */}
          <div className="icm-sec-title">Certificate Details</div>
          <div className="icm-grid-2">
            <Field label="Certificate Template" req>
              <div className="icm-input-wrap" style={{display:'flex', alignItems:'center'}}>
                <select className="icm-inp" value={template} onChange={e=>setTemplate(e.target.value)}>
                  <option value="Modern Blue Certificate">Modern Blue Certificate</option>
                </select>
                <div className="icm-preview-link"><Ic d={icons.eye} size={14}/> Preview Template</div>
              </div>
            </Field>
            <Field label="Certificate Title" req help="Enter certificate title as it will appear">
              <div className="icm-input-wrap">
                <input className="icm-inp" value={title} onChange={e=>setTitle(e.target.value)} maxLength={100} />
                <span className="icm-char-count">{title.length}/100</span>
              </div>
            </Field>
          </div>

          <div className="icm-grid-2">
            <Field label="Achievement / Description (Optional)" help="A short description of the achievement">
              <div className="icm-input-wrap" style={{height:'100%'}}>
                <textarea className="icm-textarea" value={desc} onChange={e=>setDesc(e.target.value)} maxLength={255} rows={3} />
                <span className="icm-char-count-ta">{desc.length}/255</span>
              </div>
            </Field>
            <Field label="Certificate ID / Number" req help="Unique certificate number (auto-generated or custom)">
              <input className="icm-inp" value={certId} onChange={e=>setCertId(e.target.value)} />
            </Field>
          </div>

          <div className="icm-grid-2">
            <Field label="Issue Date" req help="Date when the certificate is issued">
              <input type="date" className="icm-inp" value={issueDate} onChange={e=>setIssueDate(e.target.value)} />
            </Field>
            <Field label="Expiry Date (Optional)" help="Leave empty if certificate does not expire">
              <input type="date" className="icm-inp" value={expiryDate} onChange={e=>setExpiryDate(e.target.value)} placeholder="Select expiry date" />
            </Field>
          </div>

          <div className="icm-divider" />

          {/* Section 3 */}
          <div className="icm-sec-title" style={{marginBottom:16}}>Additional Options</div>
          <div className="icm-opts-grid">
            <OptionCard active={options.download} onClick={()=>toggleOption('download')} title="Allow Download" sub="Student can download certificate" icon={<Ic d={icons.download}/>} />
            <OptionCard active={options.email} onClick={()=>toggleOption('email')} title="Send via Email" sub="Send certificate to student email" icon={<Ic d={icons.mail}/>} />
            <OptionCard active={options.print} onClick={()=>toggleOption('print')} title="Allow Print" sub="Student can print the certificate" icon={<Ic d={icons.printer}/>} />
            <OptionCard active={options.share} onClick={()=>toggleOption('share')} title="Allow Share" sub="Student can share certificate" icon={<Ic d={icons.share}/>} />
            <OptionCard active={options.verify} onClick={()=>toggleOption('verify')} title="Include Verification Link" sub="Add QR code and verification link" icon={<Ic d={icons.shieldCheck}/>} />
          </div>

          <div className="icm-alert">
            <Ic d={icons.info} stroke="#8b5cf6" size={16}/> Certificate will be saved in the student's certificate section and can be verified using the certificate ID.
          </div>

        </div>

        {/* Footer */}
        <div className="icm-footer">
          {error && <div style={{color:'red', fontSize:13, marginRight:'auto'}}>{error}</div>}
          <button className="icm-btn icm-btn-outline" onClick={onClose} disabled={submitting}>Cancel</button>
          <div style={{display:'flex', gap:12}}>
            <button className="icm-btn icm-btn-primary" onClick={handleIssue} disabled={submitting || loadingData}>
              {submitting ? 'Issuing...' : <><Ic d={icons.certificate} size={16}/> Issue Certificate</>}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
