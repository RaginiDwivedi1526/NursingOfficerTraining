import { useState, useCallback } from 'react';
import axios from 'axios';
import './AddStudentModal.css';

/* ─── constants ─── */
const STEPS = [
  { num: 1, label: 'Personal Details' },
  { num: 2, label: 'Academic Details' },
  { num: 3, label: 'Enrollments'      },
  { num: 4, label: 'Login & Access'   },
  { num: 5, label: 'Review & Submit'  },
];

const QUALIFICATIONS = [
  '10th (SSC)', '12th (HSC)', 'GNM', 'ANM', 'B.Sc Nursing', 'Post Basic B.Sc Nursing',
  'M.Sc Nursing', 'Diploma in Nursing', 'Other',
];
const STREAMS = [
  'Science (PCB)', 'Science (PCM)', 'Commerce', 'Arts', 'Nursing', 'Paramedical', 'Other',
];
const ACADEMIC_STATUS = [
  'Currently Studying', 'Passed Out', 'Appeared (Result Awaited)', 'Dropped', 'Other',
];
const BOARDS = ['CBSE', 'ICSE', 'State Board', 'IB', 'Other'];
const YEAR_OPTIONS = Array.from({ length: 15 }, (_, i) => String(new Date().getFullYear() - i));

const COURSE_OPTIONS = [
  { value: 'norcet2025', label: 'NORCET 2025 Complete Course' },
  { value: 'aiims',      label: 'AIIMS Nursing Officer Course' },
  { value: 'ssc',        label: 'SSC Nursing Officer Course'   },
  { value: 'mrb',        label: 'MRB Nursing Officer Course'   },
  { value: 'esic',       label: 'ESIC Nursing Officer Course'  },
  { value: 'dsssb',      label: 'DSSSB Nursing Officer Course' },
  { value: 'rpsc',       label: 'RPSC Nursing Officer Course'  },
  { value: 'jipmer',     label: 'JIPMER Staff Nurse Course'    },
];
const BATCH_OPTIONS = [
  'NORCET 2025 Regular Batch',
  'NORCET 2025 Fast Track Batch',
  'AIIMS 2025 Batch',
  'SSC Nursing 2025 Batch',
  'General 2025 Batch',
];
const STUDY_MODES    = ['Online', 'Offline', 'Hybrid'];
const DURATION_OPTIONS = ['1 Month', '3 Months', '6 Months', '12 Months', '18 Months', '24 Months', 'Lifetime'];
const FEATURES = ['Live Classes', 'Recorded Lectures', 'Mock Tests', 'Study Materials', 'Notes', 'Downloads', 'Doubt Support', 'Mentorship Program'];

const ROLES = [
  { value: 'free',     icon: '🆓', name: 'Free',     desc: 'Basic access'     },
  { value: 'basic',    icon: '📘', name: 'Basic',    desc: 'Limited courses'  },
  { value: 'standard', icon: '📗', name: 'Standard', desc: 'Most features'    },
  { value: 'pro',      icon: '👑', name: 'Pro',      desc: 'Full access'      },
  { value: 'admin',    icon: '🛡️', name: 'Admin',    desc: 'Admin privileges' },
];

const GENDERS      = ['Male', 'Female', 'Other'];
const CATEGORIES   = ['General', 'OBC', 'SC', 'ST', 'EWS', 'Other'];
const RELATIONSHIPS= ['Father', 'Mother', 'Spouse', 'Sibling', 'Friend', 'Other'];

/* auto-generate Enrollment ID */
const genEnrollId = () => `ENR${new Date().getFullYear()}${String(Math.floor(Math.random() * 9000) + 1000)}`;

const INIT = {
  /* Step 1 */
  firstName:'', lastName:'', email:'', phone:'',
  dob:'', gender:'', category:'', address:'', profilePhoto: null,
  ecName:'', ecRelationship:'', ecPhone:'',
  /* Step 2 */
  qualification:'', stream:'', passingYear:'', college:'',
  rollNumber:'', academicStatus:'', cgpa:'',
  schoolName:'', board:'', schoolYear:'', academicNotes:'',
  /* Step 3 */
  course:'', batch:'', enrollmentDate: new Date().toISOString().split('T')[0],
  enrollmentId: genEnrollId(), studyMode:'Online', accessDuration:'12 Months',
  features: ['Live Classes','Recorded Lectures','Mock Tests','Study Materials','Notes','Downloads','Doubt Support'],
  referral:'', coupon:'', adminNotes:'',
  /* Step 4 */
  password:'', confirmPassword:'', role:'free',
  /* Step 5 */
  confirmed: false,
};

/* ─── helpers ─── */
const getToken = () => { const s = localStorage.getItem('nursingUser'); return s ? JSON.parse(s).token : null; };
const apiBase  = () => { const b = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'; return b.endsWith('/api') ? b : `${b}/api`; };

const SVG = ({ d, size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
);

/* ── Icon shortcuts ── */
const I = {
  user:    <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
  mail:    <><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></>,
  phone:   <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.38 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5A16 16 0 0 0 12 12.58a16 16 0 0 0 4.09 2.5l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>,
  cal:     <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
  tag:     <><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></>,
  map:     <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
  book:    <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></>,
  grad:    <><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></>,
  home:    <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
  doc:     <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></>,
  lock:    <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
  eye:     <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
  eyeOff:  <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></>,
  search:  <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
  pct:     <><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></>,
  check:   <polyline points="20 6 9 17 4 12"/>,
  edit:    <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
  shield:  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
  chevron: <polyline points="6 9 12 15 18 9"/>,
  monitor: <><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>,
  activity:<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>,
  circle:  <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
};

/* ════════════════════════════════════════════════════
   COMPONENT
   ════════════════════════════════════════════════════ */
export default function AddStudentModal({ onClose, onCreated }) {
  const [step, setStep]         = useState(1);
  const [form, setForm]         = useState(INIT);
  const [errors, setErrors]     = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);
  const [showPwd, setShowPwd]   = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [couponApplied, setCouponApplied] = useState(false);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  /* Photo */
  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setPhotoPreview(ev.target.result); set('profilePhoto', ev.target.result); };
    reader.readAsDataURL(file);
  };

  /* Feature toggle */
  const toggleFeature = (f) =>
    set('features', form.features.includes(f) ? form.features.filter(x => x !== f) : [...form.features, f]);

  /* Validation */
  const validate = useCallback((s) => {
    const e = {};
    if (s === 1) {
      if (!form.firstName.trim()) e.firstName = 'Required';
      if (!form.lastName.trim())  e.lastName  = 'Required';
      if (!form.email.trim())     e.email     = 'Required';
      else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
      if (!form.phone.trim())     e.phone     = 'Required';
      if (!form.address.trim())   e.address   = 'Required';
      if (!form.ecName.trim())    e.ecName    = 'Required';
      if (!form.ecPhone.trim())   e.ecPhone   = 'Required';
    }
    if (s === 2) {
      if (!form.qualification)    e.qualification    = 'Required';
      if (!form.academicStatus)   e.academicStatus   = 'Required';
      if (!form.college.trim())   e.college          = 'Required';
    }
    if (s === 3) {
      if (!form.course)           e.course = 'Required';
      if (!form.batch)            e.batch  = 'Required';
    }
    if (s === 4) {
      if (!form.password)              e.password = 'Required';
      else if (form.password.length < 6) e.password = 'Min 6 characters';
      if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    }
    if (s === 5 && !form.confirmed)   e.confirmed = 'Please confirm the details';
    return e;
  }, [form]);

  const next = () => {
    const e = validate(step);
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setStep(s => s + 1);
  };
  const back = () => { setErrors({}); setStep(s => s - 1); };
  const goTo = (s) => { if (s < step) { setErrors({}); setStep(s); } };

  /* Submit */
  const handleSubmit = async () => {
    const e = validate(5);
    if (Object.keys(e).length) { setErrors(e); return; }
    setApiError(''); setLoading(true);
    try {
      await axios.post(`${apiBase()}/admin/students`, {
        firstName: form.firstName, lastName: form.lastName,
        email: form.email, phone: form.phone,
        dob: form.dob, gender: form.gender.toLowerCase(),
        category: form.category, address: form.address, profilePhoto: form.profilePhoto,
        emergencyContact: { name: form.ecName, relationship: form.ecRelationship, phone: form.ecPhone },
        qualification: form.qualification, college: form.college,
        passingYear: form.passingYear, registrationNo: form.rollNumber,
        examGoal: form.stream,
        enrolledCourses: form.course ? [COURSE_OPTIONS.find(c=>c.value===form.course)?.label ?? form.course] : [],
        password: form.password, role: form.role,
      }, { headers: { Authorization: `Bearer ${getToken()}` } });
      setSuccess(true); onCreated?.();
    } catch (err) {
      setApiError(err.response?.data?.message || 'Something went wrong.');
    } finally { setLoading(false); }
  };

  /* ── Reusable field components ── */
  const Field = ({ label, req, error, children }) => (
    <div className="asm-field">
      <label className="asm-label">{label}{req && <span className="req"> *</span>}</label>
      {children}
      {error && <span className="asm-error-text">{error}</span>}
    </div>
  );
  const Input = ({ id, icon, error, ...props }) => (
    <div className="asm-input-wrap">
      {icon && <span className="asm-input-icon"><SVG d={icon}/></span>}
      <input id={id} className={`asm-input${!icon?' no-icon':''}${error?' error':''}`} {...props}/>
    </div>
  );
  const Select = ({ id, icon, error, children, ...props }) => (
    <div className="asm-input-wrap">
      {icon && <span className="asm-input-icon"><SVG d={icon}/></span>}
      <select id={id} className={`asm-select${!icon?' no-icon':''}${error?' error':''}`} {...props}>{children}</select>
      <span className="asm-select-arrow"><SVG d={I.chevron}/></span>
    </div>
  );

  /* ── Review row helper ── */
  const RItem = ({ label, value }) => (
    <div className="asm-review-row">
      <span className="asm-review-key">{label}</span>
      <span className="asm-review-val">{value || '—'}</span>
    </div>
  );
  const ReviewSection = ({ icon, num, title, onEdit, children }) => (
    <div className="asm-rv-section">
      <div className="asm-rv-section-head">
        <div className="asm-rv-section-left">
          <span className="asm-rv-icon">{icon}</span>
          <span className="asm-rv-num">{num}.</span>
          <span className="asm-rv-title">{title}</span>
          <span className="asm-badge-complete">Complete</span>
        </div>
        <button className="asm-rv-edit-btn" onClick={onEdit}>
          <SVG d={I.edit} size={13}/> Edit
        </button>
      </div>
      <div className="asm-rv-body">{children}</div>
    </div>
  );

  /* ── Course label helper ── */
  const courseLabel = COURSE_OPTIONS.find(c => c.value === form.course)?.label ?? form.course;

  /* ════════════════════════════════════════
     RENDER
     ════════════════════════════════════════ */
  return (
    <div className="asm-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="asm-modal" role="dialog" aria-modal="true">

        {/* ── Header ── */}
        <div className="asm-header">
          <div className="asm-header-left">
            <div className="asm-icon">👤<span style={{fontSize:12,marginLeft:-4}}>+</span></div>
            <div>
              <p className="asm-title">Add New Student</p>
              <p className="asm-subtitle">Create a new student profile and add to the system</p>
            </div>
          </div>
          <button className="asm-close" onClick={onClose}>✕</button>
        </div>

        {/* ── Stepper ── */}
        {!success && (
          <div className="asm-stepper">
            {STEPS.map((s, i) => (
              <div key={s.num} style={{display:'flex',alignItems:'flex-start',flex:1}}>
                <div className={`asm-step${step===s.num?' active':step>s.num?' done':''}`}
                     style={{cursor: s.num < step ? 'pointer' : 'default'}}
                     onClick={() => goTo(s.num)}>
                  <div className="asm-step-num">{step > s.num ? <SVG d={I.check} size={14}/> : s.num}</div>
                  <div className="asm-step-label">{s.label}</div>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`asm-step-line${step > s.num ? ' done' : ''}`} style={{marginTop:16}}/>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── Body ── */}
        <div className="asm-body">
          {apiError && (
            <div className="asm-alert asm-alert-error">
              <SVG d={<><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>}/>
              {apiError}
            </div>
          )}

          {/* ── SUCCESS ── */}
          {success && (
            <div className="asm-success">
              <div className="asm-success-icon">✅</div>
              <div className="asm-success-title">Student Added Successfully!</div>
              <div className="asm-success-sub">
                <strong>{form.firstName} {form.lastName}</strong> has been created and can now log in.
              </div>
              <button className="asm-btn asm-btn-primary" style={{marginTop:16}} onClick={onClose}>Close</button>
            </div>
          )}

          {/* ════════════════════════════════════════
              STEP 1 — Personal Details
              ════════════════════════════════════════ */}
          {!success && step === 1 && (
            <>
              <div className="asm-section-title">Personal Information</div>
              <div className="asm-grid-2">
                <Field label="First Name" req error={errors.firstName}>
                  <Input id="asm-fname" icon={I.user} placeholder="Enter first name"
                    value={form.firstName} onChange={e=>set('firstName',e.target.value)} error={errors.firstName}/>
                </Field>
                <Field label="Last Name" req error={errors.lastName}>
                  <Input id="asm-lname" icon={I.user} placeholder="Enter last name"
                    value={form.lastName} onChange={e=>set('lastName',e.target.value)} error={errors.lastName}/>
                </Field>
                <Field label="Email Address" req error={errors.email}>
                  <Input id="asm-email" type="email" icon={I.mail} placeholder="Enter email address"
                    value={form.email} onChange={e=>set('email',e.target.value)} error={errors.email}/>
                </Field>
                <Field label="Mobile Number" req error={errors.phone}>
                  <div className="asm-phone-wrap">
                    <div className="asm-phone-code"><span className="flag">🇮🇳</span> +91 <SVG d={I.chevron} size={10}/></div>
                    <input id="asm-phone" type="tel" className={`asm-phone-input${errors.phone?' error':''}`}
                      placeholder="Enter mobile number" value={form.phone} onChange={e=>set('phone',e.target.value)}/>
                  </div>
                </Field>
              </div>
              <div className="asm-grid-3 asm-spacer">
                <Field label="Date of Birth" req>
                  <Input id="asm-dob" type="date" icon={I.cal} value={form.dob} onChange={e=>set('dob',e.target.value)}/>
                </Field>
                <Field label="Gender" req>
                  <Select id="asm-gender" icon={I.user} value={form.gender} onChange={e=>set('gender',e.target.value)}>
                    <option value="">Select gender</option>
                    {GENDERS.map(g=><option key={g} value={g.toLowerCase()}>{g}</option>)}
                  </Select>
                </Field>
                <Field label="Category">
                  <Select id="asm-cat" icon={I.tag} value={form.category} onChange={e=>set('category',e.target.value)}>
                    <option value="">Select category</option>
                    {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
                  </Select>
                </Field>
              </div>
              <div className="asm-grid-2 asm-spacer">
                <Field label="Profile Photo">
                  <label className="asm-photo-upload" htmlFor="asm-photo-input">
                    <input type="file" id="asm-photo-input" accept="image/*" onChange={handlePhoto}/>
                    {photoPreview
                      ? <img src={photoPreview} alt="Preview" className="asm-photo-preview"/>
                      : <><div className="asm-photo-icon">☁️</div><div className="asm-photo-title">Upload Photo</div><div className="asm-photo-sub">JPG, PNG or WEBP (Max. 2MB)</div></>
                    }
                  </label>
                </Field>
                <Field label="Address" req error={errors.address}>
                  <textarea id="asm-address" className={`asm-textarea${errors.address?' error':''}`}
                    style={{paddingLeft:14}} placeholder="Enter full address" rows={4}
                    value={form.address} onChange={e=>set('address',e.target.value)}/>
                </Field>
              </div>
              <div className="asm-spacer">
                <div className="asm-section-title">Emergency Contact</div>
                <div className="asm-grid-3">
                  <Field label="Contact Person Name" req error={errors.ecName}>
                    <Input id="asm-ecname" icon={I.user} placeholder="Enter contact person name"
                      value={form.ecName} onChange={e=>set('ecName',e.target.value)} error={errors.ecName}/>
                  </Field>
                  <Field label="Relationship">
                    <Select id="asm-ecrel" icon={I.user} value={form.ecRelationship} onChange={e=>set('ecRelationship',e.target.value)}>
                      <option value="">Select relationship</option>
                      {RELATIONSHIPS.map(r=><option key={r} value={r}>{r}</option>)}
                    </Select>
                  </Field>
                  <Field label="Contact Number" req error={errors.ecPhone}>
                    <div className="asm-phone-wrap">
                      <div className="asm-phone-code"><span className="flag">🇮🇳</span> +91</div>
                      <input id="asm-ecphone" type="tel" className={`asm-phone-input${errors.ecPhone?' error':''}`}
                        placeholder="Enter contact number" value={form.ecPhone} onChange={e=>set('ecPhone',e.target.value)}/>
                    </div>
                  </Field>
                </div>
              </div>
            </>
          )}

          {/* ════════════════════════════════════════
              STEP 2 — Academic Details
              ════════════════════════════════════════ */}
          {!success && step === 2 && (
            <>
              <div className="asm-section-title">Academic Information</div>

              {/* Row 1: Qualification · Stream · Year */}
              <div className="asm-grid-3">
                <Field label="Highest Qualification" req error={errors.qualification}>
                  <Select id="asm-qual" icon={I.grad} value={form.qualification}
                    onChange={e=>set('qualification',e.target.value)} error={errors.qualification}>
                    <option value="">Select qualification</option>
                    {QUALIFICATIONS.map(q=><option key={q} value={q}>{q}</option>)}
                  </Select>
                </Field>
                <Field label="Stream / Specialization" req>
                  <Select id="asm-stream" icon={I.book} value={form.stream} onChange={e=>set('stream',e.target.value)}>
                    <option value="">Select stream / specialization</option>
                    {STREAMS.map(s=><option key={s} value={s}>{s}</option>)}
                  </Select>
                </Field>
                <Field label="Year of Passing" req>
                  <Select id="asm-year" icon={I.cal} value={form.passingYear} onChange={e=>set('passingYear',e.target.value)}>
                    <option value="">Select year</option>
                    {YEAR_OPTIONS.map(y=><option key={y} value={y}>{y}</option>)}
                  </Select>
                </Field>
              </div>

              {/* Row 2: Institute · Roll No */}
              <div className="asm-grid-2 asm-spacer">
                <Field label="Institute / University" req error={errors.college}>
                  <Input id="asm-college" icon={I.home} placeholder="Enter institute or university name"
                    value={form.college} onChange={e=>set('college',e.target.value)} error={errors.college}/>
                </Field>
                <Field label="Roll Number / Enrollment ID">
                  <Input id="asm-roll" icon={I.doc} placeholder="Enter roll number or enrollment id"
                    value={form.rollNumber} onChange={e=>set('rollNumber',e.target.value)}/>
                </Field>
              </div>

              {/* Row 3: Academic Status · CGPA */}
              <div className="asm-grid-2 asm-spacer">
                <Field label="Current Academic Status" req error={errors.academicStatus}>
                  <Select id="asm-status" icon={I.activity} value={form.academicStatus}
                    onChange={e=>set('academicStatus',e.target.value)} error={errors.academicStatus}>
                    <option value="">Select status</option>
                    {ACADEMIC_STATUS.map(s=><option key={s} value={s}>{s}</option>)}
                  </Select>
                </Field>
                <Field label="CGPA / Percentage">
                  <div className="asm-input-wrap">
                    <span className="asm-input-icon"><SVG d={I.pct}/></span>
                    <input id="asm-cgpa" type="text" className="asm-input" placeholder="Enter CGPA or percentage"
                      value={form.cgpa} onChange={e=>set('cgpa',e.target.value)} style={{paddingRight:44}}/>
                    <span style={{position:'absolute',right:12,fontSize:12,fontWeight:700,color:'#9ca3af',background:'#f3f4f6',padding:'2px 8px',borderRadius:6}}>%</span>
                  </div>
                </Field>
              </div>

              {/* School / Previous Education */}
              <div className="asm-spacer">
                <div className="asm-section-title">School / Previous Education <span style={{fontWeight:400,color:'#9ca3af',fontSize:13}}>(Optional)</span></div>
                <div className="asm-grid-3">
                  <Field label="School Name">
                    <Input id="asm-school" icon={I.home} placeholder="Enter school name"
                      value={form.schoolName} onChange={e=>set('schoolName',e.target.value)}/>
                  </Field>
                  <Field label="Board">
                    <Select id="asm-board" icon={I.shield} value={form.board} onChange={e=>set('board',e.target.value)}>
                      <option value="">Select board</option>
                      {BOARDS.map(b=><option key={b} value={b}>{b}</option>)}
                    </Select>
                  </Field>
                  <Field label="Year of Completion">
                    <Select id="asm-schoolyear" icon={I.cal} value={form.schoolYear} onChange={e=>set('schoolYear',e.target.value)}>
                      <option value="">Select year</option>
                      {YEAR_OPTIONS.map(y=><option key={y} value={y}>{y}</option>)}
                    </Select>
                  </Field>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="asm-spacer">
                <div className="asm-section-title">Additional Information <span style={{fontWeight:400,color:'#9ca3af',fontSize:13}}>(Optional)</span></div>
                <Field label="Notes">
                  <div style={{position:'relative'}}>
                    <textarea id="asm-anotes" className="asm-textarea" rows={4}
                      placeholder="Enter any additional academic notes or achievements"
                      maxLength={500} value={form.academicNotes}
                      onChange={e=>set('academicNotes',e.target.value)}/>
                    <span style={{position:'absolute',bottom:10,right:14,fontSize:11,color:'#9ca3af'}}>
                      {form.academicNotes.length}/500
                    </span>
                  </div>
                </Field>
              </div>
            </>
          )}

          {/* ════════════════════════════════════════
              STEP 3 — Enrollments
              ════════════════════════════════════════ */}
          {!success && step === 3 && (
            <>
              <div className="asm-section-title">Enrollment Information</div>
              <p style={{fontSize:12.5,color:'#6b7280',marginBottom:18,marginTop:-10}}>
                Add student to a course, batch and set enrollment details
              </p>

              {/* Course + Batch */}
              <div className="asm-grid-2">
                <Field label="Select Course" req error={errors.course}>
                  <Select id="asm-course" icon={I.book} value={form.course}
                    onChange={e=>set('course',e.target.value)} error={errors.course}>
                    <option value="">Select course</option>
                    {COURSE_OPTIONS.map(c=><option key={c.value} value={c.value}>{c.label}</option>)}
                  </Select>
                </Field>
                <Field label="Select Batch" req error={errors.batch}>
                  <Select id="asm-batch" icon={I.user} value={form.batch}
                    onChange={e=>set('batch',e.target.value)} error={errors.batch}>
                    <option value="">Select batch</option>
                    {BATCH_OPTIONS.map(b=><option key={b} value={b}>{b}</option>)}
                  </Select>
                </Field>
              </div>

              {/* Enrollment Date + ID */}
              <div className="asm-grid-2 asm-spacer">
                <Field label="Enrollment Date" req>
                  <Input id="asm-edate" type="date" icon={I.cal}
                    value={form.enrollmentDate} onChange={e=>set('enrollmentDate',e.target.value)}/>
                </Field>
                <Field label="Enrollment ID">
                  <div>
                    <Input id="asm-eid" icon={I.doc} value={form.enrollmentId} readOnly
                      style={{background:'#f9fafb',fontFamily:'monospace',color:'#4f46e5',fontWeight:700}}/>
                    <div style={{fontSize:11,color:'#9ca3af',marginTop:4}}>Auto-generated enrollment ID</div>
                  </div>
                </Field>
              </div>

              {/* Study Mode + Duration */}
              <div className="asm-grid-2 asm-spacer">
                <Field label="Study Mode" req>
                  <Select id="asm-mode" icon={I.monitor} value={form.studyMode} onChange={e=>set('studyMode',e.target.value)}>
                    {STUDY_MODES.map(m=><option key={m} value={m}>{m}</option>)}
                  </Select>
                </Field>
                <Field label="Access Duration" req>
                  <div>
                    <Select id="asm-dur" icon={I.cal} value={form.accessDuration} onChange={e=>set('accessDuration',e.target.value)}>
                      {DURATION_OPTIONS.map(d=><option key={d} value={d}>{d}</option>)}
                    </Select>
                    <div style={{fontSize:11,color:'#9ca3af',marginTop:4}}>Student access validity from enrollment date</div>
                  </div>
                </Field>
              </div>

              {/* Course Access & Features */}
              <div className="asm-spacer">
                <div className="asm-section-title">Course Access &amp; Features</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:12,marginBottom:6}}>
                  {FEATURES.map(f => {
                    const sel = form.features.includes(f);
                    return (
                      <label key={f} className={`asm-feature-check${sel?' selected':''}`}>
                        <input type="checkbox" checked={sel} onChange={()=>toggleFeature(f)} style={{display:'none'}}/>
                        <span className="asm-feature-box">{sel && <SVG d={I.check} size={10}/>}</span>
                        {f}
                      </label>
                    );
                  })}
                </div>
                <div style={{fontSize:11.5,color:'#9ca3af'}}>Select features student will have access to</div>
              </div>

              {/* Referral + Coupon */}
              <div className="asm-grid-2 asm-spacer">
                <Field label={<>Referral <span style={{fontWeight:400,color:'#9ca3af'}}>(Optional)</span></>}>
                  <Input id="asm-ref" icon={I.search} placeholder="Search referrer name or ID (Optional)"
                    value={form.referral} onChange={e=>set('referral',e.target.value)}/>
                  <div style={{fontSize:11.5,color:'#9ca3af',marginTop:4}}>Who referred this student?</div>
                </Field>
                <Field label={<>Discount / Coupon <span style={{fontWeight:400,color:'#9ca3af'}}>(Optional)</span></>}>
                  <div className="asm-coupon-wrap">
                    <div className="asm-input-wrap" style={{flex:1}}>
                      <span className="asm-input-icon"><SVG d={I.tag}/></span>
                      <input id="asm-coupon" className="asm-input" placeholder="Enter coupon code"
                        value={form.coupon} onChange={e=>{set('coupon',e.target.value);setCouponApplied(false)}}/>
                    </div>
                    <button className={`asm-apply-btn${couponApplied?' applied':''}`}
                      onClick={()=>{ if(form.coupon) setCouponApplied(true); }}>
                      {couponApplied ? '✓ Applied' : 'Apply'}
                    </button>
                  </div>
                  <div style={{fontSize:11.5,color:'#9ca3af',marginTop:4}}>Leave empty if no discount</div>
                </Field>
              </div>

              {/* Admin Notes */}
              <div className="asm-spacer">
                <Field label={<>Admin Notes <span style={{fontWeight:400,color:'#9ca3af'}}>(Optional)</span></>}>
                  <div style={{position:'relative'}}>
                    <textarea id="asm-adminnotes" className="asm-textarea" rows={3}
                      placeholder="Add any notes about this enrollment"
                      maxLength={300} value={form.adminNotes}
                      onChange={e=>set('adminNotes',e.target.value)}/>
                    <span style={{position:'absolute',bottom:10,right:14,fontSize:11,color:'#9ca3af'}}>
                      {form.adminNotes.length}/300
                    </span>
                  </div>
                </Field>
              </div>
            </>
          )}

          {/* ════════════════════════════════════════
              STEP 4 — Login & Access
              ════════════════════════════════════════ */}
          {!success && step === 4 && (
            <>
              <div className="asm-section-title">Login Credentials</div>
              <div className="asm-grid-2">
                <Field label="Password" req error={errors.password}>
                  <div className="asm-input-wrap">
                    <span className="asm-input-icon"><SVG d={I.lock}/></span>
                    <input id="asm-pwd" type={showPwd?'text':'password'} className={`asm-input${errors.password?' error':''}`}
                      placeholder="Create password" value={form.password} onChange={e=>set('password',e.target.value)}/>
                    <button type="button" className="asm-pwd-toggle" onClick={()=>setShowPwd(p=>!p)}>
                      <SVG d={showPwd ? I.eyeOff : I.eye}/>
                    </button>
                  </div>
                </Field>
                <Field label="Confirm Password" req error={errors.confirmPassword}>
                  <div className="asm-input-wrap">
                    <span className="asm-input-icon"><SVG d={I.lock}/></span>
                    <input id="asm-cpwd" type={showPwd?'text':'password'} className={`asm-input${errors.confirmPassword?' error':''}`}
                      placeholder="Confirm password" value={form.confirmPassword} onChange={e=>set('confirmPassword',e.target.value)}/>
                  </div>
                </Field>
              </div>
              <div className="asm-spacer">
                <div className="asm-section-title">Access Level / Role</div>
                <div className="asm-role-grid">
                  {ROLES.map(r=>(
                    <div key={r.value} className={`asm-role-card${form.role===r.value?' selected':''}`}
                      onClick={()=>set('role',r.value)}>
                      <div className="asm-role-icon">{r.icon}</div>
                      <div className="asm-role-name">{r.name}</div>
                      <div className="asm-role-desc">{r.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ════════════════════════════════════════
              STEP 5 — Review & Submit
              ════════════════════════════════════════ */}
          {!success && step === 5 && (
            <>
              <div className="asm-rv-header">
                <div>
                  <div className="asm-rv-main-title">Review Student Information</div>
                  <div className="asm-rv-main-sub">Please review all the details before submitting. You can go back and edit any section.</div>
                </div>
                <button className="asm-rv-edit-all-btn" onClick={()=>goTo(1)}>
                  <SVG d={I.edit} size={13}/> Edit All
                </button>
              </div>

              {/* 1. Personal Details */}
              <ReviewSection icon="👤" num="1" title="Personal Details" onEdit={()=>goTo(1)}>
                <div className="asm-rv-personal">
                  {photoPreview && (
                    <img src={photoPreview} alt="Student" className="asm-rv-photo"/>
                  )}
                  <div className="asm-rv-personal-fields">
                    <div className="asm-review-grid">
                      <RItem label="Name"   value={`${form.firstName} ${form.lastName}`}/>
                      <RItem label="Date of Birth" value={form.dob}/>
                      <RItem label="Email"  value={form.email}/>
                      <RItem label="Gender" value={form.gender}/>
                      <RItem label="Mobile" value={`+91 ${form.phone}`}/>
                      <RItem label="Category" value={form.category}/>
                      <RItem label="Address" value={form.address}/>
                    </div>
                  </div>
                </div>
              </ReviewSection>

              {/* 2. Academic Details */}
              <ReviewSection icon="🎓" num="2" title="Academic Details" onEdit={()=>goTo(2)}>
                <div className="asm-review-grid">
                  <RItem label="Highest Qualification" value={form.qualification}/>
                  <RItem label="Stream / Specialization" value={form.stream}/>
                  <RItem label="Year of Passing" value={form.passingYear}/>
                  <RItem label="Institute / University" value={form.college}/>
                  <RItem label="Roll Number / Enrollment ID" value={form.rollNumber}/>
                  <RItem label="Academic Status" value={form.academicStatus}/>
                  {form.cgpa && <RItem label="CGPA / Percentage" value={`${form.cgpa}%`}/>}
                </div>
              </ReviewSection>

              {/* 3. Enrollments */}
              <ReviewSection icon="📚" num="3" title="Enrollments" onEdit={()=>goTo(3)}>
                <div className="asm-review-grid">
                  <RItem label="Course"         value={courseLabel}/>
                  <RItem label="Batch"          value={form.batch}/>
                  <RItem label="Enrollment ID"  value={form.enrollmentId}/>
                  <RItem label="Enrollment Date"value={form.enrollmentDate}/>
                  <RItem label="Study Mode"     value={form.studyMode}/>
                  <RItem label="Access Duration"value={form.accessDuration}/>
                </div>
                {form.features.length > 0 && (
                  <div style={{marginTop:10}}>
                    <div style={{fontSize:11.5,fontWeight:600,color:'#6b7280',marginBottom:6}}>Module Access</div>
                    <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                      {form.features.map(f=>(
                        <span key={f} style={{display:'inline-flex',alignItems:'center',gap:4,fontSize:11.5,color:'#15803d',background:'#f0fdf4',padding:'3px 10px',borderRadius:20,fontWeight:600}}>
                          <SVG d={I.check} size={10}/>{f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </ReviewSection>

              {/* 4. Login & Access */}
              <ReviewSection icon="🔐" num="4" title="Login & Access" onEdit={()=>goTo(4)}>
                <div className="asm-review-grid">
                  <RItem label="Login Email" value={form.email}/>
                  <RItem label="Login Role"  value={ROLES.find(r=>r.value===form.role)?.name ?? form.role}/>
                  <RItem label="Account Status" value={<span style={{color:'#15803d',background:'#f0fdf4',padding:'2px 10px',borderRadius:20,fontSize:11.5,fontWeight:600}}>Active</span>}/>
                </div>
              </ReviewSection>

              {/* Confirm checkbox */}
              <label className="asm-confirm-check">
                <input type="checkbox" checked={form.confirmed}
                  onChange={e=>set('confirmed',e.target.checked)}/>
                <span className="asm-checkmark" aria-hidden="true"/>
                I have reviewed all the information and confirm that the details are correct.
              </label>
              {errors.confirmed && <div className="asm-error-text" style={{marginTop:6}}>{errors.confirmed}</div>}
            </>
          )}
        </div>

        {/* ── Footer ── */}
        {!success && (
          <div className="asm-footer">
            <div className="asm-footer-left">
              <button className="asm-btn asm-btn-cancel" onClick={onClose}>Cancel</button>
            </div>
            <div style={{display:'flex',gap:10}}>
              {step > 1 && (
                <button className="asm-btn asm-btn-secondary" onClick={back}>← Back</button>
              )}
              {step < 5 && (
                <>
                  <button className="asm-btn asm-btn-secondary" onClick={()=>{setErrors({});setStep(s=>s+1);}}>
                    Save &amp; Add Another
                  </button>
                  <button id="asm-next-btn" className="asm-btn asm-btn-primary" onClick={next}>
                    Save &amp; Next →
                  </button>
                </>
              )}
              {step === 5 && (
                <>
                  <button className="asm-btn asm-btn-secondary" onClick={()=>setStep(1)}>
                    Save &amp; Add Another
                  </button>
                  <button id="asm-submit-btn" className="asm-btn asm-btn-primary" onClick={handleSubmit} disabled={loading}>
                    {loading ? <><span className="asm-spinner"/> Submitting…</> : <>Submit Student ✓</>}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
