import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, Image as ImageIcon, GripVertical, X, Plus, Calendar, Clock, Lock, Globe, Users } from 'lucide-react';
import './AdminCourses.css';

export default function CreateCourse() {
  const navigate = useNavigate();
  const [courseStatus, setCourseStatus] = useState('Draft');
  const [publishOption, setPublishOption] = useState('Immediately');
  const [visibility, setVisibility] = useState('Public');
  const [courseType, setCourseType] = useState('Free');

  const [outcomes, setOutcomes] = useState(['', '', '']);

  const addOutcome = () => setOutcomes([...outcomes, '']);

  return (
    <div className="ac-page">
      <div className="ac-header">
        <div className="ac-header-left">
          <button className="ac-back-btn" onClick={() => navigate('/admin/courses')}><ArrowLeft size={18} /></button>
          <div className="ac-header-title">
            <h1>Create Course</h1>
            <p>Courses & Topics {'>'} Create Course</p>
          </div>
        </div>
        <div className="ac-header-right">
          <button className="ac-btn-outline" style={{color:'#4f46e5', borderColor:'#e0e7ff'}}><Eye size={16}/> Preview Course</button>
          <button className="ac-btn-outline" onClick={() => navigate('/admin/courses')}>Cancel</button>
        </div>
      </div>

      <div className="cc-layout">
        
        {/* Main Left Column */}
        <div>
          <div className="cc-card">
            <div className="cc-card-title">Basic Information</div>
            <div className="cc-card-sub">Provide the basic details of your course</div>

            <div className="cc-grid-2" style={{marginBottom: 20}}>
              <div className="ac-field">
                <label className="ac-label">Course Title <span>*</span></label>
                <input type="text" className="ac-input" placeholder="Enter course title" />
                <div className="ac-help">Keep it clear, specific and engaging.</div>
              </div>
              <div className="ac-field">
                <label className="ac-label">Course Category <span>*</span></label>
                <select className="ac-input"><option>Select category</option></select>
              </div>
            </div>

            <div className="cc-grid-2" style={{marginBottom: 20, gridTemplateColumns: '1.5fr 1fr'}}>
              <div className="ac-field">
                <label className="ac-label">Course Description <span>*</span></label>
                <div className="ac-editor">
                  <div className="ac-editor-toolbar">
                    <select className="ac-editor-select"><option>Normal</option></select>
                    <div className="ac-editor-icons">
                      <span>B</span><span>I</span><span style={{textDecoration:'underline'}}>U</span><span>🔗</span>
                    </div>
                  </div>
                  <textarea className="ac-editor-textarea" placeholder="Write a detailed description about the course, what students will learn and how it will help them."></textarea>
                </div>
                <div className="ac-help">0/2000 characters</div>
              </div>
              <div className="ac-field">
                <label className="ac-label">Course Thumbnail <span>*</span></label>
                <div className="ac-thumb-widget">
                  <ImageIcon size={32} className="ac-thumb-icon" />
                  <div className="ac-thumb-title">Upload Thumbnail</div>
                  <div className="ac-thumb-sub">Recommended size: 1280x720px<br/>Max file size: 2MB</div>
                  <button className="ac-btn-outline" style={{margin:'0 auto', color:'#4f46e5', borderColor:'#e0e7ff'}}>Upload Image</button>
                </div>
              </div>
            </div>

            <div className="ac-field" style={{marginBottom: 0}}>
              <label className="ac-label">What will students learn in this course? <span>*</span></label>
              <div style={{display:'flex', flexDirection:'column', gap:12}}>
                {outcomes.map((_, i) => (
                  <div className="ac-outcome-row" key={i} style={{marginBottom:0}}>
                    <GripVertical className="ac-outcome-drag" size={16} />
                    <input type="text" className="ac-input" placeholder="Add learning outcome" />
                    <div className="ac-btn-icon" style={{width:32, height:32, border:'none', background:'none', color:'#9ca3af'}}><Trash2 size={16}/></div>
                  </div>
                ))}
              </div>
              <div className="ac-add-btn" style={{marginTop:12}} onClick={addOutcome}><Plus size={16}/> Add Learning Outcome</div>
            </div>
          </div>

          <div className="cc-card">
            <div className="cc-card-title">Course Details</div>
            <div className="cc-card-sub">Additional settings and configurations</div>

            <div className="cc-grid-2" style={{marginBottom: 20}}>
              <div className="ac-field">
                <label className="ac-label">Level <span>*</span></label>
                <select className="ac-input"><option>Select level</option></select>
              </div>
              <div className="ac-field">
                <label className="ac-label">Language <span>*</span></label>
                <select className="ac-input"><option>Select language</option></select>
              </div>
            </div>

            <div className="cc-grid-2" style={{marginBottom: 20}}>
              <div className="ac-field">
                <label className="ac-label">Course Price <span>*</span></label>
                <div className="cc-radio-group">
                  <label className="cc-radio">
                    <input type="radio" name="price" checked={courseType==='Free'} onChange={()=>setCourseType('Free')}/> Free Course
                  </label>
                  <label className="cc-radio">
                    <input type="radio" name="price" checked={courseType==='Paid'} onChange={()=>setCourseType('Paid')}/> Paid Course
                  </label>
                </div>
              </div>
              <div className="ac-field">
                <label className="ac-label">Course Duration</label>
                <input type="text" className="ac-input" placeholder="e.g. 10 hours" />
              </div>
            </div>

            <div className="cc-grid-2">
              <div className="ac-field">
                <label className="ac-label">Course Tags</label>
                <input type="text" className="ac-input" placeholder="Enter tags and press Enter" />
                <div className="ac-help">Add relevant tags to help students find your course easily.</div>
              </div>
              <div className="ac-field">
                <label className="ac-label">Course Requirements</label>
                <input type="text" className="ac-input" placeholder="Enter any requirements" />
                <div className="ac-help">List any prerequisites or requirements for this course.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div>
          
          <div className="cc-side-card">
            <div className="cc-side-title">Course Status</div>
            <div className="cc-side-sub">Choose the initial status of your course</div>
            
            <div className={`cc-radio-box ${courseStatus==='Draft'?'active':''}`} onClick={()=>setCourseStatus('Draft')}>
              <input type="radio" checked={courseStatus==='Draft'} readOnly style={{marginTop:2}}/>
              <div className="cc-radio-box-content">
                <div className="cc-radio-box-title">Draft</div>
                <div className="cc-radio-box-sub">Save as draft and publish later</div>
              </div>
            </div>
            <div className={`cc-radio-box ${courseStatus==='In Review'?'active':''}`} onClick={()=>setCourseStatus('In Review')}>
              <input type="radio" checked={courseStatus==='In Review'} readOnly style={{marginTop:2}}/>
              <div className="cc-radio-box-content">
                <div className="cc-radio-box-title">In Review</div>
                <div className="cc-radio-box-sub">Submit for review before publishing</div>
              </div>
            </div>
            <div className={`cc-radio-box ${courseStatus==='Published'?'active':''}`} onClick={()=>setCourseStatus('Published')}>
              <input type="radio" checked={courseStatus==='Published'} readOnly style={{marginTop:2}}/>
              <div className="cc-radio-box-content">
                <div className="cc-radio-box-title">Published</div>
                <div className="cc-radio-box-sub">Make course live for students</div>
              </div>
            </div>
          </div>

          <div className="cc-side-card">
            <div className="cc-side-title">Publishing Options</div>
            <div className="cc-side-sub">Choose how you want to publish</div>
            
            <div className={`cc-radio-box ${publishOption==='Immediately'?'active':''}`} onClick={()=>setPublishOption('Immediately')}>
              <input type="radio" checked={publishOption==='Immediately'} readOnly style={{marginTop:2}}/>
              <div className="cc-radio-box-content">
                <div className="cc-radio-box-title">Publish Immediately</div>
                <div className="cc-radio-box-sub">Make the course available right away</div>
              </div>
            </div>
            <div className={`cc-radio-box ${publishOption==='Schedule'?'active':''}`} onClick={()=>setPublishOption('Schedule')}>
              <input type="radio" checked={publishOption==='Schedule'} readOnly style={{marginTop:2}}/>
              <div className="cc-radio-box-content">
                <div className="cc-radio-box-title">Schedule for Later</div>
                <div className="cc-radio-box-sub">Choose date and time to publish</div>
              </div>
            </div>

            {publishOption === 'Schedule' && (
              <div style={{marginTop: 16}}>
                <label className="ac-label" style={{fontSize:12}}>Publish Date & Time</label>
                <div className="cc-date-row">
                  <div style={{flex:1, position:'relative'}}>
                    <Calendar size={14} style={{position:'absolute', left:10, top:10, color:'#9ca3af'}}/>
                    <input type="text" className="ac-input" placeholder="dd/mm/yyyy" style={{paddingLeft:32}} />
                  </div>
                  <div style={{flex:1, position:'relative'}}>
                    <Clock size={14} style={{position:'absolute', right:10, top:10, color:'#9ca3af'}}/>
                    <input type="text" className="ac-input" placeholder="--:--" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="cc-side-card">
            <div className="cc-side-title">Course Visibility</div>
            <div className="cc-side-sub">Who can see this course?</div>
            
            <div className={`cc-radio-box ${visibility==='Public'?'active':''}`} onClick={()=>setVisibility('Public')}>
              <input type="radio" checked={visibility==='Public'} readOnly style={{marginTop:2}}/>
              <div className="cc-radio-box-content">
                <div className="cc-radio-box-title">Public</div>
                <div className="cc-radio-box-sub">Anyone can view and enroll</div>
              </div>
            </div>
            <div className={`cc-radio-box ${visibility==='Private'?'active':''}`} onClick={()=>setVisibility('Private')}>
              <input type="radio" checked={visibility==='Private'} readOnly style={{marginTop:2}}/>
              <div className="cc-radio-box-content">
                <div className="cc-radio-box-title">Private</div>
                <div className="cc-radio-box-sub">Only invited students can enroll</div>
              </div>
            </div>
            <div className={`cc-radio-box ${visibility==='Restricted'?'active':''}`} onClick={()=>setVisibility('Restricted')}>
              <input type="radio" checked={visibility==='Restricted'} readOnly style={{marginTop:2}}/>
              <div className="cc-radio-box-content">
                <div className="cc-radio-box-title">Restricted</div>
                <div className="cc-radio-box-sub">Only specific groups can enroll</div>
              </div>
            </div>
          </div>

          <div className="cc-bottom-sticky">
            <button className="ac-btn-primary" style={{justifyContent:'center', padding:'12px', fontSize:14}}>
              <BookOpen size={16} /> Create Course
            </button>
            <div className="cc-bottom-text">Your course will be saved as draft</div>
          </div>

        </div>
      </div>
    </div>
  );
}
