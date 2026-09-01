import { useState } from 'react';
import axios from 'axios';
import './CreateTestSeriesModal.css';

/* ─── constants ─── */
const STEPS = [
  { num: 1, label: 'Basic Information' },
  { num: 2, label: 'Tests & Pattern' },
  { num: 3, label: 'Schedule' },
  { num: 4, label: 'Settings' },
  { num: 5, label: 'Review & Publish' },
];

const INIT = {
  // Step 1
  title: '',
  description: '',
  course: '',
  targetExam: '',
  testSeriesType: 'Chapter Wise',
  difficulty: 'Medium',
  totalTests: 10,
  marksPerTest: 100,
  negativeMarking: 0.25,
  passingPct: 40,
  coverImage: null,
  tags: '',

  // Step 2
  patternType: 'Similar to Exam Pattern',
  testMode: 'Online',
  questionTypes: { mcq: true, msq: true, tf: false, match: false },
  sectionalTests: true,
  testInstructions: '',
  subjects: [
    { name: 'Nursing Foundation', questions: 40, marks: 40 },
    { name: 'Medical Surgical Nursing', questions: 30, marks: 30 },
    { name: 'Pharmacology', questions: 20, marks: 20 },
  ],
  correctMark: 1,
  incorrectMark: 0.25,
  unattemptedMark: 0,
  timeDuration: 120,

  // Step 3
  startDate: '2024-06-01',
  endDate: '2024-06-30',
  testAvailability: 'Entire duration',
  dailyTimeWindow: true,
  timeFrom: '08:00',
  timeTo: '10:00',
  testSchedule: 'Auto Schedule',
  scheduleInterval: 'Every 2 Days',
  firstTestDate: '2024-06-01',
  optCountdown: true,
  optSendReminder: true,
  optAutoSubmit: true,
  optLockTest: true,
  optShowResults: true,
  optAllowResume: true,

  // Step 4
  status: 'Active',
  resultDeclaration: 'Immediately After Test',
  leaderboard: true,
  certificate: true,
  showSolutions: true,
  attemptsAllowed: 'Unlimited',
  reattemptAfter: 'Immediately',
  viewResult: 'Every Time',
  skipQuestions: true,
  backNavigation: true,
  questionShuffle: true,
  optionShuffle: true,
  preventCopyPaste: true,
  fullScreenMode: true,
  browserWarning: true,
  optAutoSubmitTime: true,
  optShowTimeLeft: true,
  optNotifyStart: true,
  optNotifyResult: true,
  optSendReminderStart: true,
  imageQuality: 'Medium',
  loadNextQuestion: 'On Click',
};

const getToken = () => { const s = localStorage.getItem('nursingUser'); return s ? JSON.parse(s).token : null; };
const apiBase = () => { const b = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'; return b.endsWith('/api') ? b : `${b}/api`; };

/* ── UI Helpers ── */
const Ic = ({ d, size = 16, stroke="currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);
const icons = {
  check: <polyline points="20 6 9 17 4 12" />,
  plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
  minus: <line x1="5" y1="12" x2="19" y2="12"/>,
  trash: <><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></>,
  upload: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></>,
  info: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
  basicInfo: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />,
  testsPattern: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></>,
  schedule: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
};

/* ── Reusable Custom Components ── */
const Field = ({ label, req, children, help }) => (
  <div className="cts-field">
    <label className="cts-label">{label}{req && <span className="cts-req">*</span>}</label>
    {children}
    {help && <div className="cts-help">{help}</div>}
  </div>
);

const RadioCard = ({ active, onClick, title, sub, icon, accent }) => (
  <div className={`cts-radio-card ${active ? 'active' : ''}`} onClick={onClick}>
    {active && <div className="cts-radio-indicator" style={{borderColor: accent || '#4f46e5'}}>
      <div className="cts-radio-dot" style={{backgroundColor: accent || '#4f46e5'}} />
    </div>}
    {!active && <div className="cts-radio-indicator empty" />}
    <div className="cts-radio-content">
      <div className="cts-rc-title">{icon && <span style={{marginRight:8}}>{icon}</span>}{title}</div>
      {sub && <div className="cts-rc-sub">{sub}</div>}
    </div>
  </div>
);

const ToggleSwitch = ({ on, onClick, label, sub }) => (
  <div className="cts-toggle-switch-wrap">
    <div>
      <div className="cts-ts-label">{label}</div>
      {sub && <div className="cts-ts-sub">{sub}</div>}
    </div>
    <div className={`cts-ts-track ${on ? 'on' : ''}`} onClick={onClick}>
      <div className="cts-ts-thumb" />
    </div>
  </div>
);

const Counter = ({ val, setVal }) => (
  <div className="cts-counter">
    <button type="button" onClick={() => setVal(Math.max(1, val - 1))}><Ic d={icons.minus} size={14}/></button>
    <input type="number" value={val} onChange={e=>setVal(+e.target.value)} />
    <button type="button" onClick={() => setVal(val + 1)}><Ic d={icons.plus} size={14}/></button>
  </div>
);

const CheckboxGridItem = ({ label, desc, checked, onChange }) => (
  <div className="cts-cb-item">
    <div className={`cts-cb-box ${checked?'checked':''}`} onClick={onChange}>
      {checked && <Ic d={icons.check} size={12} stroke="#fff" />}
    </div>
    <div className="cts-cb-text" onClick={onChange}>
      <div className="cts-cb-label">{label}</div>
      {desc && <div className="cts-cb-desc">{desc}</div>}
    </div>
  </div>
);


export default function CreateTestSeriesModal({ onClose, onCreated }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(INIT);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const qSet = (k) => setForm(f => ({ ...f, questionTypes: { ...f.questionTypes, [k]: !f.questionTypes[k] } }));

  const next = () => setStep(s => s + 1);
  const back = () => setStep(s => s - 1);
  const goTo = (s) => setStep(s);

  const handlePublish = async (asDraft = false) => {
    setLoading(true);
    try {
      const token = getToken();
      const payload = {
        title: form.title, description: form.description,
        topic: form.course, difficulty: form.difficulty,
        duration: form.timeDuration, examType: 'nursing_officer', isFree: false,
        questions: [],
        _meta: { ...form, asDraft },
      };
      await axios.post(`${apiBase()}/admin/test-series`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess(true);
      onCreated?.();
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  const setSubj = (i, k, v) => setForm(f => {
    const s = [...f.subjects]; s[i] = { ...s[i], [k]: v }; return { ...f, subjects: s };
  });
  const addSubject = () => setForm(f => ({ ...f, subjects: [...f.subjects, { name: '', questions: 0, marks: 0 }] }));
  const removeSubj = (i) => setForm(f => ({ ...f, subjects: f.subjects.filter((_, idx) => idx !== i) }));
  
  const totalSubjQ = form.subjects.reduce((a,s)=>a+(+s.questions||0),0);
  const totalSubjM = form.subjects.reduce((a,s)=>a+(+s.marks||0),0);

  return (
    <div className="cts-overlay">
      <div className="cts-modal">
        {/* Header */}
        <div className="cts-header">
          <div className="cts-header-left">
            <div className="cts-icon-bg"><Ic d={icons.testsPattern} size={24} stroke="#4f46e5" /></div>
            <div>
              <div className="cts-title">Create Test Series</div>
              <div className="cts-subtitle">Create a new test series for students</div>
            </div>
          </div>
          <button className="cts-close" onClick={onClose}>✕</button>
        </div>

        {/* Stepper */}
        {!success && (
          <div className="cts-stepper">
            {STEPS.map((s, i) => (
              <div key={s.num} className={`cts-step-wrap ${step >= s.num ? 'active' : ''}`} onClick={() => goTo(s.num)}>
                <div className="cts-step-num">{step > s.num ? <Ic d={icons.check} size={14} /> : s.num}</div>
                <div className="cts-step-label">{s.label}</div>
                {i < STEPS.length - 1 && <div className="cts-step-line" />}
              </div>
            ))}
          </div>
        )}

        <div className="cts-body">
          {success && (
             <div className="cts-success-view">
               {/* Just closing on success as screenshot ends at review publish */}
             </div>
          )}

          {!success && step === 1 && (
            <div className="cts-step-content">
              <h3 className="cts-sec-title">Basic Information</h3>
              <div className="cts-grid-2">
                <Field label="Test Series Title" req><input className="cts-inp" value={form.title} onChange={e=>set('title',e.target.value)} placeholder="Enter test series title" /></Field>
                <Field label="Short Description" req><input className="cts-inp" value={form.description} onChange={e=>set('description',e.target.value)} placeholder="Enter short description (e.g. Based on NORCET pattern)" /></Field>
              </div>
              <div className="cts-grid-2">
                <Field label="Select Course" req>
                  <select className="cts-inp" value={form.course} onChange={e=>set('course',e.target.value)}>
                    <option value="">Select course</option>
                    <option value="NORCET 2025 Complete Course">NORCET 2025 Complete Course</option>
                  </select>
                </Field>
                <Field label="Target Exam" req>
                  <select className="cts-inp" value={form.targetExam} onChange={e=>set('targetExam',e.target.value)}>
                    <option value="">Select target exam</option>
                    <option value="NORCET 2025">NORCET 2025</option>
                  </select>
                </Field>
              </div>

              <div className="cts-grid-2">
                <Field label="Test Series Type" req>
                  <div className="cts-radio-row">
                    <RadioCard active={form.testSeriesType==='Chapter Wise'} onClick={()=>set('testSeriesType','Chapter Wise')} title="Chapter Wise" sub="Tests based on individual chapters" />
                    <RadioCard active={form.testSeriesType==='Full Syllabus'} onClick={()=>set('testSeriesType','Full Syllabus')} title="Full Syllabus" sub="Tests covering complete syllabus" />
                  </div>
                </Field>
                <Field label="Difficulty Level" req>
                  <div className="cts-radio-row" style={{display:'flex',gap:12}}>
                    <RadioCard active={form.difficulty==='Easy'} onClick={()=>set('difficulty','Easy')} title="Easy" accent="#10b981" />
                    <RadioCard active={form.difficulty==='Medium'} onClick={()=>set('difficulty','Medium')} title="Medium" accent="#f59e0b" />
                    <RadioCard active={form.difficulty==='Hard'} onClick={()=>set('difficulty','Hard')} title="Hard" accent="#ef4444" />
                  </div>
                </Field>
              </div>

              <div className="cts-grid-4">
                <Field label="Total Tests" req><Counter val={form.totalTests} setVal={v=>set('totalTests',v)}/></Field>
                <Field label="Total Marks (Per Test)" req><input type="number" className="cts-inp" value={form.marksPerTest} onChange={e=>set('marksPerTest',e.target.value)} /></Field>
                <Field label="Negative Marking" help={<Ic d={icons.info} size={12}/>}>
                  <select className="cts-inp" value={form.negativeMarking} onChange={e=>set('negativeMarking',e.target.value)}>
                    <option value="0.25">0.25 (Recommended)</option>
                    <option value="0.33">0.33</option>
                    <option value="0.5">0.5</option>
                    <option value="0">None</option>
                  </select>
                </Field>
                <Field label="Passing Percentage" req>
                  <div style={{position:'relative'}}>
                    <input type="number" className="cts-inp" value={form.passingPct} onChange={e=>set('passingPct',e.target.value)} />
                    <span style={{position:'absolute',right:12,top:10,color:'#9ca3af'}}>%</span>
                  </div>
                </Field>
              </div>

              <div className="cts-grid-2">
                <Field label="Cover Image (Optional)">
                  <div className="cts-upload-zone">
                    <Ic d={icons.upload} size={20} stroke="#6b7280"/>
                    <div className="cts-uz-text">Upload Image</div>
                    <div className="cts-uz-sub">JPG, PNG or WEBP (Max. 2MB)</div>
                  </div>
                </Field>
                <Field label="Series Tags (Optional)">
                  <input className="cts-inp" value={form.tags} onChange={e=>set('tags',e.target.value)} placeholder="Add tags (e.g. NORCET, 2025, Nursing Officer)" />
                  <div className="cts-help" style={{display:'flex',justifyContent:'space-between',marginTop:6}}>
                    <span>Add keywords to help students find this test series easily</span>
                    <span>0/10 tags</span>
                  </div>
                </Field>
              </div>
            </div>
          )}

          {!success && step === 2 && (
            <div className="cts-step-content">
              <h3 className="cts-sec-title">Tests & Pattern</h3>
              <div className="cts-help" style={{marginBottom:24}}>Configure the tests and pattern for this test series</div>
              
              <div className="cts-grid-2">
                <Field label="Number of Tests" req><Counter val={form.totalTests} setVal={v=>set('totalTests',v)}/></Field>
                <Field label="Pattern Type" req>
                  <div className="cts-radio-row">
                    <RadioCard active={form.patternType==='Similar to Exam Pattern'} onClick={()=>set('patternType','Similar to Exam Pattern')} title="Similar to Exam Pattern" sub="Tests will follow the official exam pattern" />
                    <RadioCard active={form.patternType==='Custom Pattern'} onClick={()=>set('patternType','Custom Pattern')} title="Custom Pattern" sub="Create your own pattern for tests" />
                  </div>
                </Field>
              </div>

              <div className="cts-grid-2">
                <Field label="Test Mode" req>
                  <div className="cts-radio-row">
                    <RadioCard active={form.testMode==='Online'} onClick={()=>set('testMode','Online')} title="Online" sub="Tests will be conducted online" icon="🌐" />
                    <RadioCard active={form.testMode==='Offline'} onClick={()=>set('testMode','Offline')} title="Offline" sub="Tests will be conducted offline" icon="📄" />
                  </div>
                </Field>
                <div className="cts-grid-2" style={{gap:16}}>
                  <Field label="Total Questions (Per Test)" req><Counter val={100} setVal={()=>{}}/></Field>
                  <Field label="Total Mark (Per Test)" req><input type="number" className="cts-inp" value={form.marksPerTest} onChange={e=>set('marksPerTest',e.target.value)} /></Field>
                </div>
              </div>

              <div className="cts-grid-2">
                <Field label="Question Type" req>
                  <div className="cts-grid-2" style={{gap:12}}>
                    <CheckboxGridItem label="Multiple Choice Questions (MCQ)" checked={form.questionTypes.mcq} onChange={()=>qSet('mcq')} />
                    <CheckboxGridItem label="Multiple Select Questions (MSQ)" checked={form.questionTypes.msq} onChange={()=>qSet('msq')} />
                    <CheckboxGridItem label="True / False" checked={form.questionTypes.tf} onChange={()=>qSet('tf')} />
                    <CheckboxGridItem label="Fill in the Blanks" checked={form.questionTypes.match} onChange={()=>qSet('match')} />
                  </div>
                </Field>
                <Field label="Marking Scheme" req>
                  <div className="cts-marking-grid">
                    <div className="cts-m-row">
                      <span>Correct Answer</span>
                      <Counter val={form.correctMark} setVal={v=>set('correctMark',v)} />
                      <span className="cts-m-unit">marks</span>
                    </div>
                    <div className="cts-m-row">
                      <span>Incorrect Answer</span>
                      <div className="cts-counter">
                        <button type="button">-</button>
                        <input type="number" value={form.incorrectMark} onChange={e=>set('incorrectMark',e.target.value)}/>
                        <button type="button">+</button>
                      </div>
                      <span className="cts-m-unit">marks</span>
                    </div>
                    <div className="cts-m-row">
                      <span>Unattempted</span>
                      <input type="number" className="cts-inp" style={{width:100,textAlign:'center'}} value={form.unattemptedMark} onChange={e=>set('unattemptedMark',e.target.value)} />
                      <span className="cts-m-unit">marks</span>
                    </div>
                  </div>
                </Field>
              </div>

              <div className="cts-grid-2">
                <Field label="Sectional Tests" help={<Ic d={icons.info} size={12}/>}>
                  <ToggleSwitch on={form.sectionalTests} onClick={()=>set('sectionalTests',!form.sectionalTests)} label="Include Sectional / Topic-wise Tests" sub="Enable this to add section-wise tests in the series" />
                </Field>
                <Field label="Time Duration (Per Test)" req>
                  <div style={{position:'relative'}}>
                    <input type="number" className="cts-inp" value={form.timeDuration} onChange={e=>set('timeDuration',e.target.value)} />
                    <span style={{position:'absolute',right:12,top:10,color:'#9ca3af',fontSize:14}}>Minutes</span>
                  </div>
                  <div className="cts-help" style={{marginTop:6}}>Total time for each test</div>
                </Field>
              </div>

              <Field label="Test Instructions (Optional)">
                <textarea className="cts-inp" rows={2} value={form.testInstructions} onChange={e=>set('testInstructions',e.target.value)} placeholder="Enter instructions that will be shown to students before each test" />
              </Field>

              <Field label="Subjects / Sections" req>
                <table className="cts-tbl">
                  <thead>
                    <tr><th>#</th><th>Section Name</th><th>No. of Questions</th><th>Marks</th><th>Actions</th></tr>
                  </thead>
                  <tbody>
                    {form.subjects.map((s,i) => (
                      <tr key={i}>
                        <td>{i+1}</td>
                        <td><input className="cts-inp" value={s.name} onChange={e=>setSubj(i,'name',e.target.value)} /></td>
                        <td><input className="cts-inp" type="number" value={s.questions} onChange={e=>setSubj(i,'questions',e.target.value)} /></td>
                        <td><input className="cts-inp" type="number" value={s.marks} onChange={e=>setSubj(i,'marks',e.target.value)} /></td>
                        <td><button className="cts-del-btn" onClick={()=>removeSubj(i)}><Ic d={icons.trash} size={16} stroke="#ef4444" /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className="cts-add-btn" onClick={addSubject}>+ Add Section</button>
              </Field>
            </div>
          )}

          {!success && step === 3 && (
            <div className="cts-step-content">
              <h3 className="cts-sec-title">Schedule</h3>
              <div className="cts-help" style={{marginBottom:24}}>Set the schedule and availability for this test series</div>

              <div className="cts-grid-2">
                <Field label="Series Start Date" req><input type="date" className="cts-inp" value={form.startDate} onChange={e=>set('startDate',e.target.value)}/></Field>
                <Field label="Series End Date" req><input type="date" className="cts-inp" value={form.endDate} onChange={e=>set('endDate',e.target.value)}/></Field>
              </div>

              <div className="cts-grid-2" style={{marginTop:16}}>
                <Field label="Test Availability Window" help={<Ic d={icons.info} size={12}/>}>
                  <div style={{display:'flex',flexDirection:'column',gap:12}}>
                    <RadioCard active={form.testAvailability==='Entire duration'} onClick={()=>set('testAvailability','Entire duration')} title="Entire duration (Recommended)" sub="Students can attempt tests anytime between start and end date" />
                    <RadioCard active={form.testAvailability==='Specific days'} onClick={()=>set('testAvailability','Specific days')} title="Specific days of the week" sub="Choose specific days when tests will be available" />
                    <RadioCard active={form.testAvailability==='Custom dates'} onClick={()=>set('testAvailability','Custom dates')} title="Custom dates" sub="Select specific dates for each test" />
                  </div>
                </Field>
                <Field label="Daily Time Window" help={<Ic d={icons.info} size={12}/>}>
                  <ToggleSwitch on={form.dailyTimeWindow} onClick={()=>set('dailyTimeWindow',!form.dailyTimeWindow)} label="Enable time window" />
                  {form.dailyTimeWindow && (
                    <div className="cts-grid-2" style={{marginTop:16}}>
                      <Field label="From"><input type="time" className="cts-inp" value={form.timeFrom} onChange={e=>set('timeFrom',e.target.value)}/></Field>
                      <Field label="To"><input type="time" className="cts-inp" value={form.timeTo} onChange={e=>set('timeTo',e.target.value)}/></Field>
                    </div>
                  )}
                  <div className="cts-help" style={{marginTop:12}}>Tests can be attempted only within the selected time range</div>
                </Field>
              </div>

              <h4 className="cts-sub-title" style={{marginTop:24}}>Test Schedule</h4>
              <div className="cts-help" style={{marginBottom:16}}>Add individual test dates or set automatic schedule</div>
              
              <div className="cts-grid-2">
                <div style={{display:'flex',flexDirection:'column',gap:12}}>
                  <RadioCard active={form.testSchedule==='Auto Schedule'} onClick={()=>set('testSchedule','Auto Schedule')} title="Auto Schedule (Recommended)" sub="Tests will be scheduled automatically at regular intervals" />
                  <RadioCard active={form.testSchedule==='Manual Schedule'} onClick={()=>set('testSchedule','Manual Schedule')} title="Manual Schedule" sub="Set custom dates for each test" />
                </div>
                {form.testSchedule==='Auto Schedule' && (
                  <div>
                    <div className="cts-grid-2">
                      <Field label="Schedule Interval">
                        <select className="cts-inp" value={form.scheduleInterval} onChange={e=>set('scheduleInterval',e.target.value)}>
                          <option value="Every 2 Days">Every 2 Days</option>
                          <option value="Daily">Daily</option>
                          <option value="Weekly">Weekly</option>
                        </select>
                      </Field>
                      <Field label="First Test Date">
                        <input type="date" className="cts-inp" value={form.firstTestDate} onChange={e=>set('firstTestDate',e.target.value)} />
                      </Field>
                    </div>
                    <div style={{color:'#10b981',fontSize:13,fontWeight:500,marginTop:12}}>{form.totalTests} tests will be scheduled till 30 Jun 2024</div>
                  </div>
                )}
              </div>

              <h4 className="cts-sub-title" style={{marginTop:32}}>Additional Options</h4>
              <div className="cts-grid-2" style={{rowGap:16}}>
                <CheckboxGridItem label="Show countdown timer for upcoming tests" desc="Display countdown on student dashboard" checked={form.optCountdown} onChange={()=>set('optCountdown',!form.optCountdown)}/>
                <CheckboxGridItem label="Lock test after start time" desc="Students cannot start test after the scheduled time" checked={form.optLockTest} onChange={()=>set('optLockTest',!form.optLockTest)}/>
                <CheckboxGridItem label="Send reminder notifications" desc="Notify students before test start" checked={form.optSendReminder} onChange={()=>set('optSendReminder',!form.optSendReminder)}/>
                <CheckboxGridItem label="Show results after test completion" desc="Results will be shown immediately after test" checked={form.optShowResults} onChange={()=>set('optShowResults',!form.optShowResults)}/>
                <CheckboxGridItem label="Auto-submit on timeout" desc="Automatically submit test when time expires" checked={form.optAutoSubmit} onChange={()=>set('optAutoSubmit',!form.optAutoSubmit)}/>
                <CheckboxGridItem label="Allow test resume" desc="Students can resume test if interrupted" checked={form.optAllowResume} onChange={()=>set('optAllowResume',!form.optAllowResume)}/>
              </div>
            </div>
          )}

          {!success && step === 4 && (
            <div className="cts-step-content">
              <h3 className="cts-sec-title">Settings</h3>
              <div className="cts-help" style={{marginBottom:24}}>Configure additional settings and preferences for this test series</div>

              <div className="cts-grid-3">
                {/* Col 1 */}
                <div className="cts-settings-col">
                  <div className="cts-col-title">General Settings</div>
                  <Field label="Test Series Status">
                    <select className="cts-inp" value={form.status} onChange={e=>set('status',e.target.value)}><option>Active</option><option>Draft</option></select>
                  </Field>
                  <div className="cts-help" style={{marginTop:-8}}>Set the status of this test series</div>

                  <Field label="Result Declaration">
                    <select className="cts-inp" value={form.resultDeclaration} onChange={e=>set('resultDeclaration',e.target.value)}><option>Immediately After Test</option></select>
                  </Field>
                  <div className="cts-help" style={{marginTop:-8}}>When to declare results</div>

                  <ToggleSwitch on={form.leaderboard} onClick={()=>set('leaderboard',!form.leaderboard)} label="Enable Leaderboard" sub="Show leaderboard to students" />
                  <ToggleSwitch on={form.certificate} onClick={()=>set('certificate',!form.certificate)} label="Enable Certificate" sub="Generate certificate for this test series" />
                  <ToggleSwitch on={form.showSolutions} onClick={()=>set('showSolutions',!form.showSolutions)} label="Show Solutions After Test" sub="Allow students to view solutions" />
                </div>

                {/* Col 2 */}
                <div className="cts-settings-col">
                  <div className="cts-col-title">Attempt & Access Settings</div>
                  <Field label="Attempts Allowed">
                    <select className="cts-inp" value={form.attemptsAllowed} onChange={e=>set('attemptsAllowed',e.target.value)}><option>Unlimited</option><option>1</option></select>
                  </Field>
                  <div className="cts-help" style={{marginTop:-8}}>Total attempts allowed per student</div>

                  <Field label="Re-attempt After">
                    <select className="cts-inp" value={form.reattemptAfter} onChange={e=>set('reattemptAfter',e.target.value)}><option>Immediately</option></select>
                  </Field>
                  <div className="cts-help" style={{marginTop:-8}}>When can student re-attempt</div>

                  <Field label="View Result">
                    <select className="cts-inp" value={form.viewResult} onChange={e=>set('viewResult',e.target.value)}><option>Every Time</option></select>
                  </Field>
                  <div className="cts-help" style={{marginTop:-8}}>When students can view their results</div>

                  <ToggleSwitch on={form.skipQuestions} onClick={()=>set('skipQuestions',!form.skipQuestions)} label="Allow Skip Questions" sub="Students can skip questions during test" />
                  <ToggleSwitch on={form.backNavigation} onClick={()=>set('backNavigation',!form.backNavigation)} label="Allow Back Navigation" sub="Students can go back to previous questions" />
                </div>

                {/* Col 3 */}
                <div className="cts-settings-col">
                  <div className="cts-col-title">Security Settings</div>
                  <ToggleSwitch on={form.questionShuffle} onClick={()=>set('questionShuffle',!form.questionShuffle)} label="Enable Question Shuffle" sub="Shuffle questions for each student" />
                  <ToggleSwitch on={form.optionShuffle} onClick={()=>set('optionShuffle',!form.optionShuffle)} label="Enable Option Shuffle" sub="Shuffle options for each question" />
                  <ToggleSwitch on={form.preventCopyPaste} onClick={()=>set('preventCopyPaste',!form.preventCopyPaste)} label="Enable Copy-Paste Protection" sub="Block copy-paste during the test" />
                  <ToggleSwitch on={form.fullScreenMode} onClick={()=>set('fullScreenMode',!form.fullScreenMode)} label="Enable Full Screen Mode" sub="Force test to be taken in full screen" />
                  <ToggleSwitch on={form.browserWarning} onClick={()=>set('browserWarning',!form.browserWarning)} label="Enable Browser Leave Warning" sub="Warn students before leaving test" />
                </div>
              </div>

              <div className="cts-col-title" style={{marginTop:32}}>Additional Preferences</div>
              <div className="cts-grid-3">
                <div className="cts-settings-col">
                  <div className="cts-sub-title">Time Settings</div>
                  <div className="cts-help" style={{marginBottom:12}}>Configure time-related preferences</div>
                  <CheckboxGridItem label="Auto submit when time expires" checked={form.optAutoSubmitTime} onChange={()=>set('optAutoSubmitTime',!form.optAutoSubmitTime)}/>
                  <CheckboxGridItem label="Show time left during test" checked={form.optShowTimeLeft} onChange={()=>set('optShowTimeLeft',!form.optShowTimeLeft)}/>
                </div>
                <div className="cts-settings-col">
                  <div className="cts-sub-title">Notification Settings</div>
                  <div className="cts-help" style={{marginBottom:12}}>Configure email & in-app notifications</div>
                  <CheckboxGridItem label="Notify on test series start" checked={form.optNotifyStart} onChange={()=>set('optNotifyStart',!form.optNotifyStart)}/>
                  <CheckboxGridItem label="Notify on result declaration" checked={form.optNotifyResult} onChange={()=>set('optNotifyResult',!form.optNotifyResult)}/>
                  <CheckboxGridItem label="Send reminder before test" checked={form.optSendReminderStart} onChange={()=>set('optSendReminderStart',!form.optSendReminderStart)}/>
                </div>
                <div className="cts-settings-col">
                  <div className="cts-sub-title">Performance Settings</div>
                  <div className="cts-help" style={{marginBottom:12}}>Optimize performance and loading</div>
                  <Field label="Image Quality">
                    <select className="cts-inp" value={form.imageQuality} onChange={e=>set('imageQuality',e.target.value)}><option>Medium</option><option>High</option></select>
                  </Field>
                  <Field label="Load Next Question">
                    <select className="cts-inp" value={form.loadNextQuestion} onChange={e=>set('loadNextQuestion',e.target.value)}><option>On Click</option></select>
                  </Field>
                </div>
              </div>
            </div>
          )}

          {!success && step === 5 && (
            <div className="cts-step-content">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                <div>
                  <h3 className="cts-sec-title">Review & Publish</h3>
                  <div className="cts-help" style={{marginBottom:24}}>Review all details of your test series before publishing.</div>
                </div>
                <div style={{display:'flex',gap:12}}>
                  <button className="cts-btn cts-btn-outline"><Ic d={icons.settings} size={14}/> Edit Details</button>
                  <button className="cts-btn cts-btn-outline" style={{color:'#4f46e5',borderColor:'#4f46e5'}}>👁 Preview Test Series</button>
                </div>
              </div>

              <div className="cts-review-grid">
                {/* Col 1 */}
                <div className="cts-rv-col">
                  <div className="cts-rv-card">
                    <div className="cts-rv-card-header"><Ic d={icons.basicInfo} stroke="#4f46e5"/> Basic Information</div>
                    <div className="cts-rv-item"><div className="cts-rv-lbl">Test Series Title</div><div className="cts-rv-val">{form.title||'NORCET 2025 Complete Test Series'}</div></div>
                    <div className="cts-rv-item"><div className="cts-rv-lbl">Description</div><div className="cts-rv-val">{form.description||'Complete test series for NORCET 2025...'}</div></div>
                    <div className="cts-rv-item"><div className="cts-rv-lbl">Course</div><div className="cts-rv-val">{form.course||'NORCET 2025 Complete Course'}</div></div>
                    <div className="cts-rv-item"><div className="cts-rv-lbl">Target Exam</div><div className="cts-rv-val">{form.targetExam||'NORCET 2025'}</div></div>
                    <div className="cts-rv-item"><div className="cts-rv-lbl">Difficulty Level</div><div className="cts-rv-val" style={{display:'flex',alignItems:'center',gap:6}}><div className="cts-radio-dot" style={{width:8,height:8,background:'#f59e0b'}}/> {form.difficulty}</div></div>
                  </div>
                  <div className="cts-rv-card">
                    <div className="cts-rv-card-header"><Ic d={icons.settings} stroke="#8b5cf6"/> Settings</div>
                    <div className="cts-rv-settings-list">
                      <div className="cts-rv-set-item"><Ic d={icons.check} stroke="#10b981"/> <span>Status</span> <strong>{form.status}</strong></div>
                      <div className="cts-rv-set-item"><Ic d={icons.check} stroke="#10b981"/> <span>Attempts Allowed</span> <strong>{form.attemptsAllowed}</strong></div>
                      <div className="cts-rv-set-item"><Ic d={icons.check} stroke="#10b981"/> <span>Leaderboard</span> <strong>{form.leaderboard?'Enabled':'Disabled'}</strong></div>
                      <div className="cts-rv-set-item"><Ic d={icons.check} stroke="#10b981"/> <span>Question Shuffle</span> <strong>{form.questionShuffle?'Enabled':'Disabled'}</strong></div>
                      <div className="cts-rv-set-item"><Ic d={icons.check} stroke="#10b981"/> <span>Option Shuffle</span> <strong>{form.optionShuffle?'Enabled':'Disabled'}</strong></div>
                      <div className="cts-rv-set-item"><Ic d={icons.check} stroke="#10b981"/> <span>Show Solutions</span> <strong>{form.showSolutions?'After Test':'No'}</strong></div>
                    </div>
                  </div>
                </div>

                {/* Col 2 */}
                <div className="cts-rv-col">
                  <div className="cts-rv-card">
                    <div className="cts-rv-card-header"><Ic d={icons.testsPattern} stroke="#8b5cf6"/> Tests & Pattern</div>
                    <div className="cts-rv-item"><div className="cts-rv-lbl">Total Tests</div><div className="cts-rv-val">{form.totalTests}</div></div>
                    <div className="cts-rv-item"><div className="cts-rv-lbl">Test Mode</div><div className="cts-rv-val">{form.testMode}</div></div>
                    <div className="cts-rv-item"><div className="cts-rv-lbl">Pattern Type</div><div className="cts-rv-val">{form.patternType}</div></div>
                    <div className="cts-rv-item"><div className="cts-rv-lbl">Total Questions (Per Test)</div><div className="cts-rv-val">100</div></div>
                    <div className="cts-rv-item"><div className="cts-rv-lbl">Total Marks (Per Test)</div><div className="cts-rv-val">{form.marksPerTest}</div></div>
                    <div className="cts-rv-item"><div className="cts-rv-lbl">Question Type</div><div className="cts-rv-val">MCQ, MSQ, True/False, Fill in the Blanks</div></div>
                    <div className="cts-rv-item">
                      <div className="cts-rv-lbl">Marking Scheme</div>
                      <ul style={{margin:0,paddingLeft:20,fontSize:13,color:'#1f2937'}}>
                        <li>Correct Answer: <span style={{color:'#10b981'}}>+{form.correctMark}</span></li>
                        <li>Incorrect Answer: <span style={{color:'#ef4444'}}>-{form.incorrectMark}</span></li>
                        <li>Unattempted: 0</li>
                      </ul>
                    </div>
                    <div className="cts-rv-item"><div className="cts-rv-lbl">Negative Marking</div><div className="cts-rv-val">{form.negativeMarking} (Per Wrong Answer)</div></div>
                    <div className="cts-rv-item"><div className="cts-rv-lbl">Passing Percentage</div><div className="cts-rv-val">{form.passingPct}%</div></div>
                  </div>
                  <div className="cts-rv-card">
                    <div className="cts-rv-card-header"><Ic d={icons.testsPattern} stroke="#4f46e5"/> Subjects / Sections</div>
                    <table className="cts-tbl" style={{fontSize:12}}>
                      <thead><tr><th>#</th><th>Section Name</th><th>No. of Qs</th><th>Marks</th></tr></thead>
                      <tbody>
                        {form.subjects.map((s,i)=><tr key={i}><td>{i+1}</td><td>{s.name}</td><td>{s.questions}</td><td>{s.marks}</td></tr>)}
                        <tr style={{fontWeight:700}}><td></td><td>Total</td><td>{totalSubjQ}</td><td>{totalSubjM}</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Col 3 */}
                <div className="cts-rv-col">
                  <div className="cts-rv-card">
                    <div className="cts-rv-card-header"><Ic d={icons.schedule} stroke="#f59e0b"/> Schedule</div>
                    <div className="cts-rv-item"><div className="cts-rv-lbl">Series Start Date</div><div className="cts-rv-val">{form.startDate}</div></div>
                    <div className="cts-rv-item"><div className="cts-rv-lbl">Series End Date</div><div className="cts-rv-val">{form.endDate}</div></div>
                    <div className="cts-rv-item"><div className="cts-rv-lbl">Daily Time Window</div><div className="cts-rv-val">{form.timeFrom} – {form.timeTo}</div></div>
                    <div className="cts-rv-item"><div className="cts-rv-lbl">Test Schedule</div><div className="cts-rv-val">{form.testSchedule}</div></div>
                    <div className="cts-rv-item"><div className="cts-rv-lbl">Total Tests in Series</div><div className="cts-rv-val">{form.totalTests}</div></div>
                    <div className="cts-rv-item"><div className="cts-rv-lbl">Next Test Date</div><div className="cts-rv-val">{form.firstTestDate}, {form.timeFrom}</div></div>
                    <div className="cts-rv-item"><div className="cts-rv-lbl">Show Results</div><div className="cts-rv-val">{form.resultDeclaration}</div></div>
                  </div>
                  <div className="cts-rv-card">
                    <div className="cts-rv-card-header"><Ic d={icons.settings} stroke="#10b981"/> Additional Preferences</div>
                    <div className="cts-rv-settings-list">
                      <div className="cts-rv-set-item"><Ic d={icons.check} stroke="#10b981"/> <span>Auto submit when time expires</span></div>
                      <div className="cts-rv-set-item"><Ic d={icons.check} stroke="#10b981"/> <span>Show time left during test</span></div>
                      <div className="cts-rv-set-item"><Ic d={icons.check} stroke="#10b981"/> <span>Notify on test series start</span></div>
                      <div className="cts-rv-set-item"><Ic d={icons.check} stroke="#10b981"/> <span>Notify on result declaration</span></div>
                      <div className="cts-rv-set-item"><Ic d={icons.check} stroke="#10b981"/> <span>Send reminder before test</span></div>
                    </div>
                    <div className="cts-rv-item" style={{marginTop:16}}><div className="cts-rv-lbl">Image Quality</div><div className="cts-rv-val">{form.imageQuality}</div></div>
                    <div className="cts-rv-item"><div className="cts-rv-lbl">Load Next Question</div><div className="cts-rv-val">{form.loadNextQuestion}</div></div>
                  </div>
                </div>
              </div>

              <div className="cts-publish-banner">
                <div className="cts-pb-left">
                  <div className="cts-pb-icon"><Ic d={icons.check} size={24} stroke="#10b981"/></div>
                  <div>
                    <div className="cts-pb-title">Ready to Publish!</div>
                    <div className="cts-pb-sub">All settings look good. Once published, students will be able to see and enroll in this test series.</div>
                  </div>
                </div>
                <div className="cts-pb-right">
                  <div className="cts-pb-lbl">Visibility</div>
                  <div className="cts-pb-val">👁 <strong>Public</strong></div>
                  <div className="cts-pb-sub2">All students can view and enroll</div>
                </div>
              </div>
            </div>
          )}

        </div>
        
        {/* Footer */}
        {!success && (
          <div className="cts-footer">
            {step > 1 ? (
              <button className="cts-btn cts-btn-outline" onClick={back}>← Back</button>
            ) : <div/>}
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="cts-btn cts-btn-outline" onClick={() => handlePublish(true)}>Save as Draft</button>
              {step < 5 ? (
                <button className="cts-btn cts-btn-primary" onClick={next}>Next →</button>
              ) : (
                <button className="cts-btn cts-btn-primary" onClick={() => handlePublish(false)} disabled={loading}>
                  {loading ? 'Publishing...' : '🚀 Publish Test Series'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
