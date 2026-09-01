import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, Image as ImageIcon, Calendar, FileText } from 'lucide-react';
import './AdminTestSeries.css';

export default function CreateTestSeries() {
  const navigate = useNavigate();
  const [showSolutions, setShowSolutions] = useState(true);
  const [shuffleQuestions, setShuffleQuestions] = useState(false);
  const [features, setFeatures] = useState({
    rank: true,
    analysis: true,
    allIndia: false,
    share: true,
    cert: false
  });

  const toggleFeature = (key) => setFeatures({ ...features, [key]: !features[key] });

  return (
    <div className="ats-page">
      <div className="ats-header">
        <div className="ats-header-left">
          <button className="ats-back-btn" onClick={() => navigate('/admin/tests')}><ArrowLeft size={18} /></button>
          <div className="ats-header-title">
            <h1>Create Test Series</h1>
            <p>Test Series {'>'} Create Test Series</p>
          </div>
        </div>
        <div className="ats-header-right">
          <button className="ats-btn-outline" style={{color:'#4f46e5', borderColor:'#e0e7ff'}}><Eye size={16}/> Preview</button>
          <button className="ats-btn-outline" onClick={() => navigate('/admin/tests')}>Cancel</button>
        </div>
      </div>

      <div className="cts-layout">
        
        {/* Main Left Column */}
        <div>
          <div className="cts-card">
            <div className="cts-card-title">Basic Information</div>
            <div className="cts-card-sub">Provide basic details of the test series</div>

            <div className="cts-grid-2" style={{marginBottom: 20}}>
              <div className="ats-field">
                <label className="ats-label">Test Series Title <span>*</span></label>
                <input type="text" className="ats-input" placeholder="Enter test series title" />
                <div className="ats-help">Example: RRB Staff Nurse Complete Test Series</div>
              </div>
              <div className="ats-field">
                <label className="ats-label">Test Series Category <span>*</span></label>
                <select className="ats-input"><option>Select category</option></select>
              </div>
            </div>

            <div className="cts-grid-2" style={{marginBottom: 20, gridTemplateColumns: '1.5fr 1fr'}}>
              <div className="ats-field">
                <label className="ats-label">Description</label>
                <div className="ats-editor">
                  <div className="ats-editor-toolbar">
                    <select className="ats-editor-select"><option>Normal</option></select>
                    <div className="ats-editor-icons">
                      <span>B</span><span>I</span><span style={{textDecoration:'underline'}}>U</span><span>🔗</span>
                    </div>
                  </div>
                  <textarea className="ats-editor-textarea" placeholder="Write a brief description about this test series, its purpose and what students will learn."></textarea>
                </div>
                <div className="ats-help" style={{textAlign:'right'}}>0/2000 characters</div>
              </div>
              <div className="ats-field">
                <label className="ats-label">Test Series Banner <span style={{color:'#6b7280',fontWeight:400}}>(Optional)</span></label>
                <div className="ats-thumb-widget">
                  <ImageIcon size={32} className="ats-thumb-icon" />
                  <div className="ats-thumb-title">Upload Banner</div>
                  <div className="ats-thumb-sub">Recommended size: 1280x720px<br/>Max file size: 2MB</div>
                  <button className="ats-btn-outline" style={{margin:'0 auto', color:'#4f46e5', borderColor:'#e0e7ff'}}>Upload Image</button>
                </div>
              </div>
            </div>

            <div className="cts-grid-2">
              <div className="ats-field">
                <label className="ats-label">Level <span>*</span></label>
                <select className="ats-input"><option>Select level</option></select>
              </div>
              <div className="ats-field">
                <label className="ats-label">Target Exam <span style={{color:'#6b7280',fontWeight:400}}>(Optional)</span></label>
                <input type="text" className="ats-input" placeholder="Enter target exam" />
              </div>
            </div>
          </div>

          <div className="cts-card">
            <div className="cts-card-title">Test Series Details</div>
            <div className="cts-card-sub">Configure the test series structure and settings</div>

            <div className="cts-grid-4" style={{marginBottom: 20}}>
              <div className="ats-field">
                <label className="ats-label">Total Tests <span>*</span></label>
                <input type="number" className="ats-input" defaultValue="10" />
                <div className="ats-help">Total number of tests in this series</div>
              </div>
              <div className="ats-field">
                <label className="ats-label">Questions per Test <span>*</span></label>
                <input type="number" className="ats-input" defaultValue="100" />
                <div className="ats-help">Number of questions in each test</div>
              </div>
              <div className="ats-field">
                <label className="ats-label">Total Marks <span>*</span></label>
                <input type="number" className="ats-input" defaultValue="100" />
                <div className="ats-help">Total marks for each test</div>
              </div>
              <div className="ats-field">
                <label className="ats-label">Negative Marking</label>
                <input type="number" step="0.25" className="ats-input" defaultValue="0.25" />
                <div className="ats-help">Marks deducted for wrong answer</div>
              </div>
            </div>

            <div className="cts-grid-4">
              <div className="ats-field">
                <label className="ats-label">Duration (Minutes) <span>*</span></label>
                <input type="number" className="ats-input" defaultValue="90" />
                <div className="ats-help">Total time for each test</div>
              </div>
              <div className="ats-field">
                <label className="ats-label">Difficulty Level</label>
                <select className="ats-input"><option>Select difficulty level</option></select>
              </div>
              <div className="ats-field">
                <label className="ats-label">Passing Marks (%)</label>
                <input type="number" className="ats-input" defaultValue="40" />
                <div className="ats-help">Minimum percentage to pass</div>
              </div>
              <div className="ats-field">
                <label className="ats-label">Show Solutions</label>
                <div className="cts-toggle-wrap" style={{marginTop:8}}>
                  <div className={`cts-toggle ${showSolutions?'active':''}`} onClick={()=>setShowSolutions(!showSolutions)}>
                    <div className="cts-toggle-thumb"></div>
                  </div>
                </div>
                <div className="ats-help">Allow students to view solutions</div>
              </div>
            </div>
          </div>

          <div className="cts-card">
            <div className="cts-card-title">Availability</div>
            <div className="cts-card-sub">Set when and how this test series will be available</div>

            <div className="cts-grid-3">
              <div className="ats-field">
                <label className="ats-label">Start Date <span>*</span></label>
                <div style={{position:'relative'}}>
                  <input type="text" className="ats-input" placeholder="dd/mm/yyyy" />
                  <Calendar size={16} color="#9ca3af" style={{position:'absolute', right:12, top:10}}/>
                </div>
              </div>
              <div className="ats-field">
                <label className="ats-label">End Date <span style={{color:'#6b7280',fontWeight:400}}>(Optional)</span></label>
                <div style={{position:'relative'}}>
                  <input type="text" className="ats-input" placeholder="dd/mm/yyyy" />
                  <Calendar size={16} color="#9ca3af" style={{position:'absolute', right:12, top:10}}/>
                </div>
              </div>
              <div className="ats-field">
                <label className="ats-label">Attempt Limit</label>
                <select className="ats-input"><option>Select attempt limit</option></select>
                <div className="ats-help">Number of attempts allowed for the test series</div>
              </div>
              <div className="ats-field">
                <label className="ats-label">Shuffle Questions</label>
                <div className="cts-toggle-wrap" style={{marginTop:8}}>
                  <div className={`cts-toggle ${shuffleQuestions?'active':''}`} onClick={()=>setShuffleQuestions(!shuffleQuestions)}>
                    <div className="cts-toggle-thumb"></div>
                  </div>
                </div>
                <div className="ats-help">Randomize question order for each attempt</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div>
          <div className="cts-card" style={{padding:0, border:'none', background:'transparent'}}>
            <div className="cts-card-title">Add Tests</div>
            <div className="cts-card-sub">Add tests to this test series</div>
            
            <div className="cts-add-test-box">
              <FileText size={28} color="#8b5cf6" style={{margin:'0 auto'}}/>
              <div className="cts-add-test-title">No tests added yet</div>
              <div className="cts-add-test-sub">Start adding tests to build your test series</div>
            </div>
            
            <button className="ats-btn-outline" style={{width:'auto', color:'#4f46e5', borderColor:'#e0e7ff'}}><Plus size={16}/> Add Tests</button>
          </div>

          <div className="cts-card" style={{padding:0, border:'none', background:'transparent'}}>
            <div className="cts-card-title" style={{marginBottom:16}}>Test Series Features</div>
            
            <div className="cts-checkbox-wrap" onClick={() => toggleFeature('rank')}>
              <div className={`cts-checkbox ${features.rank?'active':''}`}>{features.rank && '✓'}</div>
              <div className="cts-toggle-text">
                <span className="cts-toggle-text-main">Rank & Leaderboard</span>
                <span className="cts-toggle-text-sub">Show leaderboard to students</span>
              </div>
            </div>
            <div className="cts-checkbox-wrap" onClick={() => toggleFeature('analysis')}>
              <div className={`cts-checkbox ${features.analysis?'active':''}`}>{features.analysis && '✓'}</div>
              <div className="cts-toggle-text">
                <span className="cts-toggle-text-main">Performance Analysis</span>
                <span className="cts-toggle-text-sub">Provide detailed performance analytics</span>
              </div>
            </div>
            <div className="cts-checkbox-wrap" onClick={() => toggleFeature('allIndia')}>
              <div className={`cts-checkbox ${features.allIndia?'active':''}`}>{features.allIndia && '✓'}</div>
              <div className="cts-toggle-text">
                <span className="cts-toggle-text-main">All India Ranking</span>
                <span className="cts-toggle-text-sub">Compare with all India candidates</span>
              </div>
            </div>
            <div className="cts-checkbox-wrap" onClick={() => toggleFeature('share')}>
              <div className={`cts-checkbox ${features.share?'active':''}`}>{features.share && '✓'}</div>
              <div className="cts-toggle-text">
                <span className="cts-toggle-text-main">Share Results</span>
                <span className="cts-toggle-text-sub">Allow students to share their results</span>
              </div>
            </div>
            <div className="cts-checkbox-wrap" onClick={() => toggleFeature('cert')}>
              <div className={`cts-checkbox ${features.cert?'active':''}`}>{features.cert && '✓'}</div>
              <div className="cts-toggle-text">
                <span className="cts-toggle-text-main">Certificate</span>
                <span className="cts-toggle-text-sub">Award certificate on completion</span>
              </div>
            </div>
          </div>

          <div className="cts-card" style={{padding:0, border:'none', background:'transparent'}}>
            <div className="cts-card-title">Notes <span style={{color:'#6b7280',fontWeight:400}}>(Optional)</span></div>
            <div className="cts-card-sub" style={{marginBottom:8}}>Add any important notes for this test series</div>
            <textarea className="ats-input" placeholder="Enter notes..." style={{minHeight:120, resize:'vertical'}}></textarea>
            <div className="ats-help" style={{textAlign:'right'}}>0/500 characters</div>
          </div>

          <button className="cts-bottom-sticky"><FileText size={16}/> Create Test Series</button>

        </div>
      </div>
    </div>
  );
}
