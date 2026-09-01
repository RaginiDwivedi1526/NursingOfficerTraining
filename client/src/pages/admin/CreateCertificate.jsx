import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, UploadCloud, Plus, Save } from 'lucide-react';
import './AdminCertificates.css';

export default function CreateCertificate() {
  const navigate = useNavigate();
  const [template, setTemplate] = useState('Classic');
  const [showQR, setShowQR] = useState(false);
  const [awardType, setAwardType] = useState('Manual');
  const [validity, setValidity] = useState('Never');
  const [publishStatus, setPublishStatus] = useState('Draft');
  
  const [criteria, setCriteria] = useState({
    course: true,
    score: false,
    test: false,
    custom: false
  });
  const toggleCriteria = (key) => setCriteria({ ...criteria, [key]: !criteria[key] });

  return (
    <div className="acf-page">
      <div className="acf-header">
        <div className="acf-header-left">
          <button className="acf-back-btn" onClick={() => navigate('/admin/certificates')}><ArrowLeft size={18} /></button>
          <div className="acf-header-title">
            <h1>Create Certificate</h1>
            <p>Certificates {'>'} Create Certificate</p>
          </div>
        </div>
        <div className="acf-header-right">
          <button className="acf-btn-outline" style={{color:'#4f46e5', borderColor:'#e0e7ff'}}><Eye size={16}/> Preview Certificate</button>
          <button className="acf-btn-outline" onClick={() => navigate('/admin/certificates')}>Cancel</button>
        </div>
      </div>

      <div className="ccf-layout">
        
        {/* Main Left Column */}
        <div>
          <div className="ccf-card">
            <div className="ccf-card-title">Certificate Information</div>
            <div className="ccf-card-sub">Provide the basic details for the certificate</div>

            <div className="ccf-grid-2" style={{marginBottom: 20}}>
              <div className="acf-field">
                <label className="acf-label">Certificate Title <span>*</span></label>
                <input type="text" className="acf-input" placeholder="Enter certificate title" />
                <div className="acf-help">Example: Certificate of Completion</div>
              </div>
              <div className="acf-field">
                <label className="acf-label">Course / Test / Event <span>*</span></label>
                <select className="acf-input"><option>Select course, test series or event</option></select>
              </div>
            </div>

            <div className="ccf-grid-2" style={{marginBottom: 20}}>
              <div className="acf-field">
                <label className="acf-label">Certificate Type <span>*</span></label>
                <select className="acf-input"><option>Select certificate type</option></select>
              </div>
              <div className="acf-field">
                <label className="acf-label">Certificate ID (Optional)</label>
                <input type="text" className="acf-input" placeholder="Enter certificate ID" />
                <div className="acf-help">Unique ID for tracking (e.g. CERT-2024-001)</div>
              </div>
            </div>

            <div className="acf-field">
              <label className="acf-label">Description (Optional)</label>
              <div className="acf-editor">
                <div className="acf-editor-toolbar">
                  <select className="acf-editor-select"><option>Normal</option></select>
                  <div className="acf-editor-icons">
                    <span>B</span><span>I</span><span style={{textDecoration:'underline'}}>U</span><span>🔗</span>
                  </div>
                </div>
                <textarea className="acf-editor-textarea" placeholder="Write a short description about this certificate"></textarea>
              </div>
              <div className="acf-help" style={{textAlign:'right'}}>0/1000 characters</div>
            </div>
          </div>

          <div className="ccf-card">
            <div className="ccf-card-title">Certificate Template</div>
            <div className="ccf-card-sub">Choose a template and customize the design</div>

            <div className="ccf-grid-2" style={{gridTemplateColumns: '1.5fr 1fr'}}>
              <div>
                <div className="acf-label" style={{marginBottom:12}}>Choose Template</div>
                <div className="ccf-templates-grid">
                  <div className={`ccf-template-card ${template==='Classic'?'active':''}`} onClick={()=>setTemplate('Classic')}>
                    {template==='Classic' && <div className="ccf-template-check">✓</div>}
                    <img src="https://images.unsplash.com/photo-1594236873919-61b691eb2d48?auto=format&fit=crop&q=80&w=200&h=140" alt="Classic" className="ccf-template-img" />
                    <div className="ccf-template-name">Classic</div>
                  </div>
                  <div className={`ccf-template-card ${template==='Modern'?'active':''}`} onClick={()=>setTemplate('Modern')}>
                    {template==='Modern' && <div className="ccf-template-check">✓</div>}
                    <img src="https://images.unsplash.com/photo-1594236873919-61b691eb2d48?auto=format&fit=crop&q=80&w=200&h=140" alt="Modern" className="ccf-template-img" />
                    <div className="ccf-template-name">Modern</div>
                  </div>
                  <div className={`ccf-template-card ${template==='Elegant'?'active':''}`} onClick={()=>setTemplate('Elegant')}>
                    {template==='Elegant' && <div className="ccf-template-check">✓</div>}
                    <img src="https://images.unsplash.com/photo-1594236873919-61b691eb2d48?auto=format&fit=crop&q=80&w=200&h=140" alt="Elegant" className="ccf-template-img" />
                    <div className="ccf-template-name">Elegant</div>
                  </div>
                  <div className={`ccf-template-card ${template==='Minimal'?'active':''}`} onClick={()=>setTemplate('Minimal')}>
                    {template==='Minimal' && <div className="ccf-template-check">✓</div>}
                    <img src="https://images.unsplash.com/photo-1594236873919-61b691eb2d48?auto=format&fit=crop&q=80&w=200&h=140" alt="Minimal" className="ccf-template-img" />
                    <div className="ccf-template-name">Minimal</div>
                  </div>
                  <div className={`ccf-template-card ${template==='Professional'?'active':''}`} onClick={()=>setTemplate('Professional')}>
                    {template==='Professional' && <div className="ccf-template-check">✓</div>}
                    <img src="https://images.unsplash.com/photo-1594236873919-61b691eb2d48?auto=format&fit=crop&q=80&w=200&h=140" alt="Professional" className="ccf-template-img" />
                    <div className="ccf-template-name">Professional</div>
                  </div>
                  <div className="ccf-more-templates">
                    <Plus size={20} className="ccf-more-icon"/>
                    <div className="ccf-more-text">More Templates</div>
                  </div>
                </div>
              </div>

              <div>
                <div className="acf-field" style={{marginBottom:16}}>
                  <label className="acf-label">Primary Color</label>
                  <div style={{display:'flex', gap:8, alignItems:'center'}}>
                    <div style={{width:32, height:32, background:'#4f46e5', borderRadius:4, border:'1px solid #d1d5db'}}></div>
                    <input type="text" className="acf-input" defaultValue="#4F46E5" />
                  </div>
                </div>
                <div className="acf-field" style={{marginBottom:16}}>
                  <label className="acf-label">Secondary Color</label>
                  <div style={{display:'flex', gap:8, alignItems:'center'}}>
                    <div style={{width:32, height:32, background:'#f59e0b', borderRadius:4, border:'1px solid #d1d5db'}}></div>
                    <input type="text" className="acf-input" defaultValue="#F59E0B" />
                  </div>
                </div>
                <div className="acf-field" style={{marginBottom:16}}>
                  <label className="acf-label">Font Style</label>
                  <select className="acf-input"><option>Playfair Display</option></select>
                </div>
                <div className="acf-field" style={{marginBottom:16}}>
                  <label className="acf-label">Add Logo</label>
                  <div className="ccf-upload-logo">
                    <UploadCloud size={20} color="#4b5563" style={{margin:'0 auto 4px'}} />
                    <div style={{fontSize:12, fontWeight:600}}>Upload Logo</div>
                    <div style={{fontSize:11, color:'#6b7280'}}>PNG, JPG or SVG (Max. 2MB)</div>
                  </div>
                </div>
                <div className="ccf-toggle-wrap">
                  <div className={`ccf-toggle ${showQR?'active':''}`} onClick={()=>setShowQR(!showQR)}><div className="ccf-toggle-thumb"></div></div>
                  <div style={{display:'flex', flexDirection:'column'}}>
                    <span style={{fontSize:13, fontWeight:600, color:'#111827'}}>Show QR Code</span>
                    <span style={{fontSize:11, color:'#6b7280'}}>Add QR code for verification</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="ccf-card">
            <div className="ccf-card-title">Certificate Content</div>
            <div className="ccf-card-sub">Customize the text that will appear on the certificate</div>

            <div className="ccf-grid-2" style={{marginBottom:20}}>
              <div className="acf-field">
                <label className="acf-label">Heading <span>*</span></label>
                <input type="text" className="acf-input" defaultValue="Certificate of Completion" />
              </div>
              <div className="acf-field">
                <label className="acf-label">Subheading (Optional)</label>
                <input type="text" className="acf-input" defaultValue="Proudly presented to" />
              </div>
            </div>

            <div className="ccf-grid-2">
              <div className="acf-field">
                <label className="acf-label">Body Text <span>*</span></label>
                <input type="text" className="acf-input" defaultValue="For successfully completing the course requirements and demonstrating excellence." />
              </div>
              <div className="acf-field">
                <label className="acf-label">Footer Text (Optional)</label>
                <input type="text" className="acf-input" defaultValue="Keep learning, keep growing!" />
              </div>
            </div>
          </div>

        </div>

        {/* Right Sidebar Column */}
        <div>
          
          <div className="ccf-card" style={{padding:0, border:'none', background:'transparent'}}>
            <div className="ccf-card-title">Certificate Preview</div>
            <div className="ccf-card-sub" style={{marginBottom:12}}>This is how your certificate will look</div>
            
            <div className="ccf-preview-box">
              <img src="https://images.unsplash.com/photo-1594236873919-61b691eb2d48?auto=format&fit=crop&q=80&w=400&h=280" alt="Preview" className="ccf-preview-img" />
            </div>
          </div>

          <div className="ccf-card">
            <div className="ccf-card-title">Certificate Settings</div>
            <div className="ccf-card-sub">Configure award criteria and validity</div>
            
            <div className="acf-label" style={{marginBottom:12}}>Award Type <span>*</span></div>
            <div className="ccf-radio-group">
              <label className="ccf-radio">
                <input type="radio" checked={awardType==='Manual'} onChange={()=>setAwardType('Manual')} /> 
                <div style={{display:'flex', flexDirection:'column'}}>
                  <span>Manual</span>
                  <span style={{fontSize:11, color:'#6b7280', fontWeight:400}}>Award certificates manually</span>
                </div>
              </label>
              <label className="ccf-radio">
                <input type="radio" checked={awardType==='Automatic'} onChange={()=>setAwardType('Automatic')} />
                <div style={{display:'flex', flexDirection:'column'}}>
                  <span>Automatic</span>
                  <span style={{fontSize:11, color:'#6b7280', fontWeight:400}}>Auto-generate on completion</span>
                </div>
              </label>
            </div>

            <div className="acf-label" style={{marginBottom:12, marginTop:24}}>Award Criteria <span>*</span></div>
            <div className="ccf-checkbox-wrap" onClick={()=>toggleCriteria('course')}>
              <div className={`ccf-checkbox ${criteria.course?'active':''}`}>{criteria.course && '✓'}</div>
              <div className="ccf-check-text">Course Completion</div>
            </div>
            <div style={{display:'flex', alignItems:'center', gap:16, marginBottom:12}}>
              <div className="ccf-checkbox-wrap" style={{marginBottom:0}} onClick={()=>toggleCriteria('score')}>
                <div className={`ccf-checkbox ${criteria.score?'active':''}`}>{criteria.score && '✓'}</div>
                <div className="ccf-check-text">Minimum Score</div>
              </div>
              {criteria.score && (
                <div style={{display:'flex', alignItems:'center', gap:8}}>
                  <input type="text" className="acf-input" style={{width:60, padding:'6px 12px'}} defaultValue="80" /> %
                </div>
              )}
            </div>
            <div className="ccf-checkbox-wrap" onClick={()=>toggleCriteria('test')}>
              <div className={`ccf-checkbox ${criteria.test?'active':''}`}>{criteria.test && '✓'}</div>
              <div className="ccf-check-text">Test Series Completion</div>
            </div>
            <div className="ccf-checkbox-wrap" onClick={()=>toggleCriteria('custom')}>
              <div className={`ccf-checkbox ${criteria.custom?'active':''}`}>{criteria.custom && '✓'}</div>
              <div className="ccf-check-text">Custom Criteria ℹ️</div>
            </div>


            <div className="acf-label" style={{marginBottom:12, marginTop:24}}>Validity (Optional)</div>
            <div style={{display:'flex', flexDirection:'column', gap:12}}>
              <label className="ccf-radio">
                <input type="radio" checked={validity==='Never'} onChange={()=>setValidity('Never')} /> 
                <span>Certificate never expires</span>
              </label>
              <label className="ccf-radio" style={{alignItems:'flex-start'}}>
                <input type="radio" checked={validity==='Date'} onChange={()=>setValidity('Date')} style={{marginTop:8}}/>
                <div style={{display:'flex', flexDirection:'column', width:'100%'}}>
                  <span>Set expiry date</span>
                  {validity === 'Date' && (
                    <input type="text" className="acf-input" placeholder="dd/mm/yyyy" style={{marginTop:8}} />
                  )}
                </div>
              </label>
            </div>
          </div>

          <div className="ccf-card">
            <div className="ccf-card-title">Publish Certificate</div>
            <div className="ccf-card-sub" style={{marginBottom:16}}>Choose the status of this certificate</div>
            
            <div className="ccf-radio-group" style={{justifyContent:'space-between', gap:0}}>
              <label className="ccf-radio">
                <input type="radio" checked={publishStatus==='Draft'} onChange={()=>setPublishStatus('Draft')} /> 
                <div style={{display:'flex', flexDirection:'column'}}>
                  <span>Draft</span>
                  <span style={{fontSize:10, color:'#6b7280', fontWeight:400, maxWidth:60}}>Save as draft and publish later</span>
                </div>
              </label>
              <label className="ccf-radio">
                <input type="radio" checked={publishStatus==='Active'} onChange={()=>setPublishStatus('Active')} />
                <div style={{display:'flex', flexDirection:'column'}}>
                  <span>Active</span>
                  <span style={{fontSize:10, color:'#6b7280', fontWeight:400, maxWidth:60}}>Make available</span>
                </div>
              </label>
              <label className="ccf-radio">
                <input type="radio" checked={publishStatus==='Inactive'} onChange={()=>setPublishStatus('Inactive')} />
                <div style={{display:'flex', flexDirection:'column'}}>
                  <span>Inactive</span>
                  <span style={{fontSize:10, color:'#6b7280', fontWeight:400, maxWidth:60}}>Keep disabled</span>
                </div>
              </label>
            </div>
          </div>

          <div style={{position:'sticky', bottom:0, background:'#f9fafb', paddingTop:20}}>
            <button className="ccf-bottom-sticky"><Save size={16}/> Create Certificate</button>
            <div style={{fontSize:12, color:'#6b7280', textAlign:'center', marginTop:12}}>You can edit all details later.</div>
          </div>

        </div>
      </div>
    </div>
  );
}
