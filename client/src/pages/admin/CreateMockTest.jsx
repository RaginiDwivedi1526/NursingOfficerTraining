import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, Image as ImageIcon, FileText, Settings, Clock, ListOrdered, CheckCircle } from 'lucide-react';
import './AdminMockTests.css';

export default function CreateMockTest() {
  const navigate = useNavigate();
  const [topicSelection, setTopicSelection] = useState('Selected Topics');
  
  const [settings, setSettings] = useState({
    results: true,
    solutions: true,
    review: true,
    correctAnswers: true,
    randomize: false
  });

  const toggleSetting = (key) => setSettings({ ...settings, [key]: !settings[key] });

  return (
    <div className="amt-page">
      <div className="amt-header">
        <div className="amt-header-left">
          <button className="amt-back-btn" onClick={() => navigate('/admin/mock-tests')}><ArrowLeft size={18} /></button>
          <div className="amt-header-title">
            <h1>Create Mock Test</h1>
            <p>Mock Tests {'>'} Create Mock Test</p>
          </div>
        </div>
        <div className="amt-header-right">
          <button className="amt-btn-outline" style={{color:'#4f46e5', borderColor:'#e0e7ff'}}><Eye size={16}/> Preview Test</button>
          <button className="amt-btn-outline" onClick={() => navigate('/admin/mock-tests')}>Cancel</button>
        </div>
      </div>

      <div className="cmt-layout">
        
        {/* Main Left Column */}
        <div>
          <div className="cmt-card">
            <div className="cmt-card-title">Basic Information</div>
            <div className="cmt-card-sub">Provide basic details of the mock test</div>

            <div className="cmt-grid-2" style={{marginBottom: 20}}>
              <div className="amt-field">
                <label className="amt-label">Mock Test Title <span>*</span></label>
                <input type="text" className="amt-input" placeholder="Enter mock test title" />
                <div className="amt-help">Example: AIIMS Staff Nurse Mock Test 01</div>
              </div>
              <div className="amt-field">
                <label className="amt-label">Select Category <span>*</span></label>
                <select className="amt-input"><option>Select category</option></select>
              </div>
            </div>

            <div className="cmt-grid-2" style={{marginBottom: 20, gridTemplateColumns: '1.5fr 1fr'}}>
              <div className="amt-field">
                <label className="amt-label">Description</label>
                <div className="amt-editor">
                  <div className="amt-editor-toolbar">
                    <select className="amt-editor-select"><option>Normal</option></select>
                    <div className="amt-editor-icons">
                      <span>B</span><span>I</span><span style={{textDecoration:'underline'}}>U</span><span>🔗</span>
                    </div>
                  </div>
                  <textarea className="amt-editor-textarea" placeholder="Write a brief description about this mock test, its pattern and what students will get."></textarea>
                </div>
                <div className="amt-help" style={{textAlign:'right'}}>0/2000 characters</div>
              </div>
              <div className="amt-field">
                <label className="amt-label">Test Thumbnail <span style={{color:'#6b7280',fontWeight:400}}>(Optional)</span></label>
                <div className="amt-thumb-widget">
                  <ImageIcon size={32} className="amt-thumb-icon" />
                  <div className="amt-thumb-title">Upload Image</div>
                  <div className="amt-thumb-sub" style={{marginBottom:12}}>Recommended size: 1280x720px<br/>Max file size: 2MB</div>
                  <button className="amt-btn-outline" style={{margin:'0 auto', color:'#4f46e5', borderColor:'#e0e7ff'}}>Upload Image</button>
                </div>
              </div>
            </div>

            <div className="cmt-grid-2">
              <div className="amt-field">
                <label className="amt-label">Exam Conducting Authority <span style={{color:'#6b7280',fontWeight:400}}>(Optional)</span></label>
                <input type="text" className="amt-input" placeholder="Enter authority name (e.g., AIIMS)" />
              </div>
              <div className="amt-field">
                <label className="amt-label">Test Language</label>
                <select className="amt-input"><option>Select language</option></select>
              </div>
            </div>
          </div>

          <div className="cmt-card">
            <div className="cmt-card-title">Test Configuration</div>
            <div className="cmt-card-sub">Set the structure and pattern of your mock test</div>

            <div className="cmt-grid-4" style={{marginBottom: 20}}>
              <div className="amt-field">
                <label className="amt-label">Total Questions <span>*</span></label>
                <input type="number" className="amt-input" defaultValue="100" />
                <div className="amt-help">Total number of questions</div>
              </div>
              <div className="amt-field">
                <label className="amt-label">Total Marks <span>*</span></label>
                <input type="number" className="amt-input" defaultValue="100" />
                <div className="amt-help">Total marks of the test</div>
              </div>
              <div className="amt-field">
                <label className="amt-label">Duration (Minutes) <span>*</span></label>
                <input type="number" className="amt-input" defaultValue="90" />
                <div className="amt-help">Total time for the test</div>
              </div>
              <div className="amt-field">
                <label className="amt-label">Negative Marking</label>
                <input type="number" step="0.25" className="amt-input" defaultValue="0.25" />
                <div className="amt-help">Marks deducted for wrong answer</div>
              </div>
            </div>

            <div className="cmt-grid-3">
              <div className="amt-field">
                <label className="amt-label">Question Type</label>
                <select className="amt-input"><option>MCQ (Single Correct)</option></select>
              </div>
              <div className="amt-field">
                <label className="amt-label">Difficulty Level</label>
                <select className="amt-input"><option>Select difficulty level</option></select>
              </div>
              <div className="amt-field">
                <label className="amt-label">Passing Marks (%)</label>
                <input type="number" className="amt-input" defaultValue="40" />
                <div className="amt-help">Minimum percentage to pass</div>
              </div>
            </div>
          </div>

          <div className="cmt-card">
            <div className="cmt-card-title">Include Topics / Chapters</div>
            <div className="cmt-card-sub">Choose topics or chapters to include in this mock test</div>

            <div className="cmt-radio-group">
              <label className="cmt-radio">
                <input type="radio" name="topicSelection" checked={topicSelection==='All Topics'} onChange={()=>setTopicSelection('All Topics')} /> All Topics
              </label>
              <label className="cmt-radio">
                <input type="radio" name="topicSelection" checked={topicSelection==='Selected Topics'} onChange={()=>setTopicSelection('Selected Topics')} /> Selected Topics
              </label>
              <label className="cmt-radio">
                <input type="radio" name="topicSelection" checked={topicSelection==='Custom Selection'} onChange={()=>setTopicSelection('Custom Selection')} /> Custom Selection
              </label>
            </div>

            <div style={{display:'flex', gap:16, marginBottom:16}}>
              <div className="amt-help" style={{flex:1, margin:0}}>{topicSelection==='All Topics' ? 'Include all topics from the selected category' : topicSelection==='Selected Topics' ? 'Choose specific topics or chapters' : 'Manually select questions'}</div>
            </div>

            {(topicSelection === 'Selected Topics' || topicSelection === 'Custom Selection') && (
              <button className="amt-btn-outline" style={{width:'100%', justifyContent:'center', color:'#4f46e5', borderColor:'#e0e7ff', padding: '12px'}}><Plus size={16}/> Select Topics or Chapters</button>
            )}
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div>
          <div className="cmt-card">
            <div className="cmt-card-title">Test Summary</div>
            <div className="cmt-card-sub">Review your mock test details</div>
            
            <div className="cmt-summary-list">
              <div className="cmt-summary-item">
                <div className="cmt-summary-label"><div className="cmt-summary-icon"><FileText size={16}/></div> Total Questions</div>
                <div className="cmt-summary-val">-</div>
              </div>
              <div className="cmt-summary-item">
                <div className="cmt-summary-label"><div className="cmt-summary-icon"><CheckCircle size={16}/></div> Total Marks</div>
                <div className="cmt-summary-val">-</div>
              </div>
              <div className="cmt-summary-item">
                <div className="cmt-summary-label"><div className="cmt-summary-icon"><Clock size={16}/></div> Duration</div>
                <div className="cmt-summary-val">-</div>
              </div>
              <div className="cmt-summary-item">
                <div className="cmt-summary-label"><div className="cmt-summary-icon"><Settings size={16}/></div> Negative Marking</div>
                <div className="cmt-summary-val">-</div>
              </div>
              <div className="cmt-summary-item">
                <div className="cmt-summary-label"><div className="cmt-summary-icon"><ListOrdered size={16}/></div> Difficulty Level</div>
                <div className="cmt-summary-val">-</div>
              </div>
              <div className="cmt-summary-item">
                <div className="cmt-summary-label"><div className="cmt-summary-icon" style={{background:'#d1fae5', color:'#059669'}}><CheckCircle size={16}/></div> Passing Marks</div>
                <div className="cmt-summary-val">-</div>
              </div>
            </div>
          </div>

          <div className="cmt-card">
            <div className="cmt-card-title">Test Settings</div>
            <div className="cmt-card-sub">Configure test behavior</div>
            
            <div className="cmt-toggle-wrap">
              <div className="cmt-toggle-text">
                <span className="cmt-toggle-text-main">Show Results</span>
                <span className="cmt-toggle-text-sub">Allow students to view results</span>
              </div>
              <div className={`cmt-toggle ${settings.results?'active':''}`} onClick={()=>toggleSetting('results')}><div className="cmt-toggle-thumb"></div></div>
            </div>
            <div className="cmt-toggle-wrap">
              <div className="cmt-toggle-text">
                <span className="cmt-toggle-text-main">Show Solutions</span>
                <span className="cmt-toggle-text-sub">Allow students to view solutions</span>
              </div>
              <div className={`cmt-toggle ${settings.solutions?'active':''}`} onClick={()=>toggleSetting('solutions')}><div className="cmt-toggle-thumb"></div></div>
            </div>
            <div className="cmt-toggle-wrap">
              <div className="cmt-toggle-text">
                <span className="cmt-toggle-text-main">Allow Review</span>
                <span className="cmt-toggle-text-sub">Students can review answers after test</span>
              </div>
              <div className={`cmt-toggle ${settings.review?'active':''}`} onClick={()=>toggleSetting('review')}><div className="cmt-toggle-thumb"></div></div>
            </div>
            <div className="cmt-toggle-wrap">
              <div className="cmt-toggle-text">
                <span className="cmt-toggle-text-main">Show Correct Answers</span>
                <span className="cmt-toggle-text-sub">Display correct answers with results</span>
              </div>
              <div className={`cmt-toggle ${settings.correctAnswers?'active':''}`} onClick={()=>toggleSetting('correctAnswers')}><div className="cmt-toggle-thumb"></div></div>
            </div>
            <div className="cmt-toggle-wrap">
              <div className="cmt-toggle-text">
                <span className="cmt-toggle-text-main">Randomize Questions</span>
                <span className="cmt-toggle-text-sub">Randomize question order for each attempt</span>
              </div>
              <div className={`cmt-toggle ${settings.randomize?'active':''}`} onClick={()=>toggleSetting('randomize')}><div className="cmt-toggle-thumb"></div></div>
            </div>
          </div>

          <div className="cmt-card" style={{padding:0, border:'none', background:'transparent'}}>
            <div className="cmt-card-title">Add Instructions</div>
            <div className="cmt-card-sub" style={{marginBottom:8}}>Add important instructions for students</div>
            <textarea className="amt-input" placeholder="Enter instructions for students..." style={{minHeight:120, resize:'vertical'}}></textarea>
            <div className="amt-help" style={{textAlign:'right'}}>0/500 characters</div>
          </div>

          <button className="cmt-bottom-sticky"><FileText size={16}/> Create Mock Test</button>

        </div>
      </div>
    </div>
  );
}
