import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowLeft, Mail, Edit3, MoreVertical, BookOpen, Clock, PlayCircle, 
  CheckCircle, FileText, Download, Phone, Calendar, User, Shield, 
  MapPin, AlertCircle, Laptop, Smartphone
} from 'lucide-react';
import './StudentProfile.css';

const TABS = [
  'Overview', 'Enrollments', 'Test Performance', 'Live Classes', 
  'Certificates', 'Payments', 'Activity Log', 'Notes', 'Login Credentials'
];

export default function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const userStr = localStorage.getItem('nursingUser');
        const token = userStr ? JSON.parse(userStr).token : null;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
        const url = baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`;
        // Fetch specific user
        const { data } = await axios.get(`${url}/admin/users/${id}`, config);
        setStudent(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  if (loading) return <div style={{padding:40, textAlign:'center'}}>Loading...</div>;
  if (!student) return <div style={{padding:40, textAlign:'center'}}>Student not found</div>;

  const enrId = `ENR-2024-${student._id?.substring(0,5).toUpperCase()}`;

  // ── Tab Renderers ──
  
  const renderOverview = () => (
    <div>
      <div className="sp-section-title">About Student</div>
      <div className="sp-grid-2" style={{marginBottom: 32}}>
        <div style={{display:'flex', flexDirection:'column', gap:12}}>
          <div className="sp-meta-item"><div className="sp-meta-label" style={{width:100}}>Full Name</div><div className="sp-meta-val">{student.name}</div></div>
          <div className="sp-meta-item"><div className="sp-meta-label" style={{width:100}}>Date of Birth</div><div className="sp-meta-val">{student.dob ? new Date(student.dob).toLocaleDateString() : 'N/A'}</div></div>
          <div className="sp-meta-item"><div className="sp-meta-label" style={{width:100}}>Gender</div><div className="sp-meta-val" style={{textTransform:'capitalize'}}>{student.gender || 'N/A'}</div></div>
          <div className="sp-meta-item"><div className="sp-meta-label" style={{width:100}}>Email</div><div className="sp-meta-val">{student.email}</div></div>
          <div className="sp-meta-item"><div className="sp-meta-label" style={{width:100}}>Phone</div><div className="sp-meta-val">{student.phone || 'N/A'}</div></div>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:12}}>
          <div className="sp-meta-item"><div className="sp-meta-label" style={{width:100}}>Address</div><div className="sp-meta-val">{student.address || 'N/A'}</div></div>
          <div className="sp-meta-item"><div className="sp-meta-label" style={{width:100}}>Category</div><div className="sp-meta-val">{student.category || 'N/A'}</div></div>
          <div className="sp-meta-item"><div className="sp-meta-label" style={{width:100}}>Exam Goal</div><div className="sp-meta-val">{student.examGoal || student.examTarget || 'N/A'}</div></div>
          <div className="sp-meta-item"><div className="sp-meta-label" style={{width:100}}>Emergency</div><div className="sp-meta-val">{student.emergencyContact?.name ? `${student.emergencyContact.name} (${student.emergencyContact.relationship || 'Contact'})` : 'N/A'}<br/>{student.emergencyContact?.phone || ''}</div></div>
        </div>
      </div>

      <div className="sp-section-title">Enrollments <span style={{fontSize:12, color:'#4f46e5', cursor:'pointer', fontWeight:600}}>View All</span></div>
      {(!student.enrolledCourses || student.enrolledCourses.length === 0) ? (
        <div style={{padding:20, color:'#6b7280', fontStyle:'italic'}}>No enrollments found.</div>
      ) : (
        student.enrolledCourses.map((courseName, idx) => (
          <div key={idx} style={{border:'1px solid #e5e7eb', borderRadius:12, padding:20, marginBottom:16}}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:12}}>
              <div style={{display:'flex', gap:12, alignItems:'center'}}>
                <div style={{width:40,height:40,borderRadius:8,background:'#eff6ff',color:'#3b82f6',display:'flex',justifyContent:'center',alignItems:'center'}}><BookOpen size={20}/></div>
                <div>
                  <div style={{fontSize:14,fontWeight:700}}>{courseName} <span className="sp-badge green" style={{marginLeft:8}}>Active</span></div>
                  <div style={{fontSize:11,color:'#6b7280',marginTop:4}}>Enrolled on: {new Date(student.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
            <div style={{display:'flex', gap:24, fontSize:12, color:'#6b7280', fontWeight:500}}>
              <div style={{display:'flex',alignItems:'center',gap:6}}><PlayCircle size={14}/> Modules</div>
              <div style={{display:'flex',alignItems:'center',gap:6}}><Clock size={14}/> Hours</div>
              <button className="sp-btn-outline" style={{padding:'4px 12px', fontSize:11, marginLeft:'auto'}}>View Details</button>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const renderEnrollments = () => (
    <div>
      <div className="sp-section-title">Enrollment Details</div>
      {(!student.enrolledCourses || student.enrolledCourses.length === 0) ? (
        <div style={{padding:20, color:'#6b7280', fontStyle:'italic'}}>No enrollments found.</div>
      ) : (
        student.enrolledCourses.map((courseName, idx) => (
          <div key={idx} style={{border:'1px solid #e5e7eb', borderRadius:12, padding:24, display:'flex', gap:32, alignItems:'center', marginBottom:16}}>
            <div style={{width:48,height:48,borderRadius:8,background:'#f3e8ff',color:'#8b5cf6',display:'flex',justifyContent:'center',alignItems:'center'}}><BookOpen size={24}/></div>
            <div>
              <div style={{fontSize:15,fontWeight:700,marginBottom:4}}>{courseName} <span className="sp-badge green" style={{marginLeft:8}}>Active</span></div>
              <div style={{fontSize:12,color:'#6b7280'}}>Enrolled on: {new Date(student.createdAt).toLocaleDateString()}</div>
            </div>
            <button className="sp-btn-outline" style={{marginLeft:'auto', color:'#4f46e5'}}>View Course</button>
          </div>
        ))
      )}

      <div className="sp-grid-2" style={{marginBottom:32}}>
        <div>
          <div style={{fontSize:14,fontWeight:700,marginBottom:16}}>Enrollment Information</div>
          <table className="sp-table" style={{border:'1px solid #e5e7eb', borderRadius:8}}>
            <tbody>
              <tr><td style={{width:120,color:'#6b7280',fontWeight:500}}>Enrollment ID</td><td style={{fontWeight:600}}>{enrId}</td></tr>
              <tr><td style={{color:'#6b7280',fontWeight:500}}>Enrollment Date</td><td style={{fontWeight:600}}>20 May 2024, 10:45 AM</td></tr>
              <tr><td style={{color:'#6b7280',fontWeight:500}}>Payment Status</td><td><span className="sp-badge green">Paid</span></td></tr>
              <tr><td style={{color:'#6b7280',fontWeight:500}}>Payment Method</td><td style={{fontWeight:600}}>Credit Card (•••• 4242)</td></tr>
              <tr><td style={{color:'#6b7280',fontWeight:500}}>Amount Paid</td><td style={{fontWeight:600}}>₹2,499.00</td></tr>
              <tr><td style={{color:'#6b7280',fontWeight:500}}>Invoice</td><td>INV-2024-05125 <span style={{marginLeft:12,color:'#4f46e5',fontSize:11,cursor:'pointer'}}><Download size={12}/> Download</span></td></tr>
            </tbody>
          </table>
        </div>
        <div>
          <div style={{fontSize:14,fontWeight:700,marginBottom:16}}>Payment Summary</div>
          <div style={{border:'1px solid #e5e7eb', borderRadius:8, padding:20, display:'flex', flexDirection:'column', gap:16}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:13}}><span style={{color:'#6b7280'}}>Course Fee</span><span style={{fontWeight:600}}>₹2,999.00</span></div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:13}}><span style={{color:'#6b7280'}}>Discount (Promo: NF20)</span><span style={{fontWeight:600,color:'#10b981'}}>- ₹500.00</span></div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:13}}><span style={{color:'#6b7280'}}>Tax (GST 18%)</span><span style={{fontWeight:600}}>₹0.00</span></div>
            <div style={{height:1,background:'#e5e7eb'}}/>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:14,fontWeight:700}}><span>Total Amount</span><span>₹2,499.00</span></div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:14,fontWeight:700}}><span>Amount Paid</span><span style={{color:'#10b981'}}>₹2,499.00</span></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPayments = () => (
    <div>
      <div className="sp-grid-4" style={{marginBottom:32}}>
        <div style={{border:'1px solid #e5e7eb',borderRadius:12,padding:20}}>
          <div style={{display:'flex',gap:12,alignItems:'center'}}>
            <div style={{width:40,height:40,borderRadius:8,background:'#f3e8ff',color:'#8b5cf6',display:'flex',justifyContent:'center',alignItems:'center'}}><Shield size={20}/></div>
            <div><div style={{fontSize:12,color:'#6b7280',fontWeight:600}}>Total Fees</div><div style={{fontSize:20,fontWeight:700}}>₹12,499.00</div></div>
          </div>
        </div>
        <div style={{border:'1px solid #e5e7eb',borderRadius:12,padding:20}}>
          <div style={{display:'flex',gap:12,alignItems:'center'}}>
            <div style={{width:40,height:40,borderRadius:8,background:'#d1fae5',color:'#10b981',display:'flex',justifyContent:'center',alignItems:'center'}}><CheckCircle size={20}/></div>
            <div><div style={{fontSize:12,color:'#6b7280',fontWeight:600}}>Amount Paid</div><div style={{fontSize:20,fontWeight:700}}>₹7,499.00</div></div>
          </div>
        </div>
        <div style={{border:'1px solid #e5e7eb',borderRadius:12,padding:20}}>
          <div style={{display:'flex',gap:12,alignItems:'center'}}>
            <div style={{width:40,height:40,borderRadius:8,background:'#ffedd5',color:'#f59e0b',display:'flex',justifyContent:'center',alignItems:'center'}}><Clock size={20}/></div>
            <div><div style={{fontSize:12,color:'#6b7280',fontWeight:600}}>Pending Amount</div><div style={{fontSize:20,fontWeight:700}}>₹5,000.00</div></div>
          </div>
        </div>
        <div style={{border:'1px solid #e5e7eb',borderRadius:12,padding:20}}>
          <div style={{display:'flex',gap:12,alignItems:'center'}}>
            <div style={{width:40,height:40,borderRadius:8,background:'#f3f4f6',color:'#6b7280',display:'flex',justifyContent:'center',alignItems:'center'}}><FileText size={20}/></div>
            <div><div style={{fontSize:12,color:'#6b7280',fontWeight:600}}>Total Transactions</div><div style={{fontSize:20,fontWeight:700}}>7</div></div>
          </div>
        </div>
      </div>

      <div className="sp-section-title">Transaction History</div>
      <table className="sp-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Invoice ID</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Payment Method</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>20 May 2024</td><td>INV-2024-00125</td>
            <td><div style={{fontWeight:600}}>Enrollment Fee</div><div style={{fontSize:11,color:'#6b7280'}}>Nursing Fundamentals</div></td>
            <td style={{fontWeight:600}}>₹2,499.00</td>
            <td><span className="sp-badge green">Paid</span></td>
            <td><div style={{fontWeight:500}}>Credit Card (Visa)</div><div style={{fontSize:11,color:'#6b7280'}}>•••• 4242</div></td>
            <td><button className="sp-btn-outline" style={{padding:'4px 8px',fontSize:11}}>View Invoice</button></td>
          </tr>
          <tr>
            <td>12 Jun 2024</td><td>INV-2024-00128</td>
            <td><div style={{fontWeight:600}}>Course Fee (Part 3)</div></td>
            <td style={{fontWeight:600}}>₹2,500.00</td>
            <td><span className="sp-badge orange">Pending</span></td>
            <td>-</td>
            <td><button className="sp-btn-outline" style={{padding:'4px 8px',fontSize:11,color:'#4f46e5',borderColor:'#4f46e5'}}>Pay Now</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderCertificates = () => (
    <div>
      <div className="sp-grid-4" style={{marginBottom:32}}>
        <div style={{border:'1px solid #e5e7eb',borderRadius:12,padding:20,display:'flex',gap:12,alignItems:'center'}}>
          <div style={{width:48,height:48,borderRadius:50,background:'#d1fae5',color:'#10b981',display:'flex',justifyContent:'center',alignItems:'center'}}><Shield size={24}/></div>
          <div><div style={{fontSize:11,color:'#6b7280',fontWeight:600}}>Certificates Earned</div><div style={{fontSize:24,fontWeight:700}}>6</div></div>
        </div>
        <div style={{border:'1px solid #e5e7eb',borderRadius:12,padding:20,display:'flex',gap:12,alignItems:'center'}}>
          <div style={{width:48,height:48,borderRadius:50,background:'#eff6ff',color:'#3b82f6',display:'flex',justifyContent:'center',alignItems:'center'}}><Clock size={24}/></div>
          <div><div style={{fontSize:11,color:'#6b7280',fontWeight:600}}>In Progress</div><div style={{fontSize:24,fontWeight:700}}>1</div></div>
        </div>
      </div>
      <div className="sp-section-title">
        <div style={{display:'flex', gap:12}}>
          <button className="sp-btn-outline" style={{background:'#f3e8ff',color:'#8b5cf6',borderColor:'#8b5cf6'}}>All Certificates (7)</button>
          <button className="sp-btn-outline">Earned (6)</button>
          <button className="sp-btn-outline">In Progress (1)</button>
        </div>
      </div>
      <table className="sp-table">
        <thead>
          <tr>
            <th>Certificate</th>
            <th>Course / Program</th>
            <th>Issued On</th>
            <th>Expiry Date</th>
            <th>Status</th>
            <th>Credential ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div style={{display:'flex',gap:12,alignItems:'center'}}>
                <div style={{width:48,height:32,background:'#e0e7ff',borderRadius:4,border:'1px solid #c7d2fe'}}></div>
                <div><div style={{fontWeight:700,fontSize:13}}>Nursing Fundamentals</div><div style={{fontSize:11,color:'#6b7280'}}>Certificate of Completion</div></div>
              </div>
            </td>
            <td><div style={{fontWeight:500}}>Nursing Fundamentals</div><div style={{fontSize:11,color:'#6b7280'}}>- Complete Course</div></td>
            <td>20 May 2024</td><td>-</td>
            <td><span className="sp-badge green">Earned</span></td>
            <td>NFT240520001</td>
            <td><div style={{display:'flex',gap:8}}><button className="sp-btn-outline" style={{padding:'4px 8px',fontSize:11}}>View</button><button className="sp-btn-outline" style={{padding:'4px'}}><Download size={14}/></button></div></td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderActivityLog = () => (
    <div>
      <div className="sp-section-title">Activity Log <div style={{fontSize:13,color:'#6b7280',fontWeight:400}}>Track all activities and actions performed by {student.name}</div></div>
      <table className="sp-table">
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>Activity</th>
            <th>Details</th>
            <th>IP Address / Device</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><div style={{display:'flex',gap:8,alignItems:'center'}}><div className="sp-al-icon" style={{color:'#10b981',background:'#d1fae5'}}><User size={14}/></div> <div><div className="sp-al-date">19 May 2024, 09:30 PM</div></div></div></td>
            <td style={{fontWeight:600}}>Logged In</td>
            <td style={{color:'#6b7280'}}>Student logged in to the platform</td>
            <td><div style={{fontWeight:500}}>122.176.45.22</div><div style={{fontSize:11,color:'#6b7280'}}>Chrome on Windows</div></td>
            <td><span className="sp-badge green">Login</span></td>
          </tr>
          <tr>
            <td><div style={{display:'flex',gap:8,alignItems:'center'}}><div className="sp-al-icon" style={{color:'#8b5cf6',background:'#f3e8ff'}}><PlayCircle size={14}/></div> <div><div className="sp-al-date">19 May 2024, 09:35 PM</div></div></div></td>
            <td style={{fontWeight:600}}>Joined Live Class</td>
            <td style={{color:'#6b7280'}}>Joined live class: Medical Surgical Nursing</td>
            <td><div style={{fontWeight:500}}>122.176.45.22</div><div style={{fontSize:11,color:'#6b7280'}}>Chrome on Windows</div></td>
            <td><span className="sp-badge" style={{background:'#f3e8ff',color:'#8b5cf6'}}>Live Class</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderLoginCredentials = () => (
    <div>
      <div className="sp-section-title">Login Credentials <div style={{fontSize:13,color:'#6b7280',fontWeight:400}}>Manage student login information and security settings.</div></div>
      
      <div style={{fontWeight:700,marginBottom:16,marginTop:24}}>Account Information</div>
      <div className="sp-lc-grid" style={{marginBottom:32}}>
        <div className="sp-lc-field">
          <label className="sp-lc-label">Registered Email ID *</label>
          <div className="sp-lc-input-wrap">
            <span className="sp-lc-val">{student.email}</span>
            <span className="sp-lc-verified"><CheckCircle size={14}/> Verified</span>
          </div>
          <div className="sp-lc-help">This email is used for login and important notifications.</div>
        </div>
        <div className="sp-lc-field">
          <label className="sp-lc-label">Username *</label>
          <div className="sp-lc-input-wrap"><span className="sp-lc-val">{student.name.replace(/\s+/g,'').toLowerCase()}</span></div>
        </div>
        <div className="sp-lc-field">
          <label className="sp-lc-label">Mobile Number *</label>
          <div className="sp-lc-input-wrap">
            <span className="sp-lc-val">+91 98765 43210</span>
            <span className="sp-lc-verified"><CheckCircle size={14}/> Verified</span>
          </div>
        </div>
        <div className="sp-lc-field">
          <label className="sp-lc-label">Account Status</label>
          <div className="sp-lc-input-wrap" style={{cursor:'pointer'}}><span className="sp-lc-val">Active</span> <MoreVertical size={16} color="#9ca3af"/></div>
          <div className="sp-lc-help">Inactive accounts cannot access the platform.</div>
        </div>
      </div>

      <div style={{fontWeight:700,marginBottom:16}}>Security Settings</div>
      <div className="sp-lc-grid" style={{marginBottom:32}}>
        <div className="sp-lc-field">
          <label className="sp-lc-label">Password</label>
          <div className="sp-lc-input-wrap">
            <span className="sp-lc-val" style={{fontSize:20,lineHeight:1}}>••••••••••</span>
            <button className="sp-lc-btn">Change</button>
          </div>
          <div className="sp-lc-help">Last changed on 12 May 2024</div>
        </div>
        <div className="sp-lc-field">
          <label className="sp-lc-label">Two-Factor Authentication (2FA) <span className="sp-badge green" style={{marginLeft:8}}>Enabled</span></label>
          <div className="sp-lc-input-wrap">
            <span className="sp-lc-val">Login secured with OTP via mobile number.</span>
            <button className="sp-lc-btn">Manage</button>
          </div>
        </div>
      </div>
      
      <div style={{fontWeight:700,marginBottom:16}}>Login Sessions <div style={{fontSize:12,color:'#6b7280',fontWeight:400,marginTop:4}}>These are the devices where the student is currently logged in.</div></div>
      <div style={{border:'1px solid #e5e7eb',borderRadius:8,padding:'0 24px'}}>
        <div className="sp-session-card">
          <div className="sp-session-left">
            <Laptop className="sp-session-icon" size={24}/>
            <div><div className="sp-session-name">Windows • Chrome <span className="sp-session-badge">Current Session</span></div></div>
          </div>
          <div style={{width:150}}><div className="sp-session-name">Gurugram, India</div></div>
          <div style={{width:150}}><div className="sp-session-name">19 May 2024, 09:30 PM</div></div>
        </div>
        <div className="sp-session-card">
          <div className="sp-session-left">
            <Smartphone className="sp-session-icon" size={24}/>
            <div><div className="sp-session-name">Android Mobile • App</div></div>
          </div>
          <div style={{width:150}}><div className="sp-session-name">Gurugram, India</div></div>
          <div style={{width:150}}><div className="sp-session-name">18 May 2024, 08:15 PM</div></div>
          <button className="sp-session-logout">Logout</button>
        </div>
      </div>
      <button className="sp-session-logout" style={{marginTop:16}}>Logout from All Devices</button>
    </div>
  );

  const renderLiveClasses = () => (
    <div>
      <div className="sp-grid-4" style={{marginBottom:32}}>
        <div style={{border:'1px solid #e5e7eb',borderRadius:12,padding:20,display:'flex',gap:16,alignItems:'center'}}>
          <div style={{width:48,height:48,borderRadius:50,background:'#eff6ff',color:'#3b82f6',display:'flex',justifyContent:'center',alignItems:'center'}}><PlayCircle size={24}/></div>
          <div><div style={{fontSize:11,color:'#6b7280',fontWeight:600}}>Classes Attended</div><div style={{fontSize:24,fontWeight:700}}>18</div></div>
        </div>
        <div style={{border:'1px solid #e5e7eb',borderRadius:12,padding:20,display:'flex',gap:16,alignItems:'center'}}>
          <div style={{width:48,height:48,borderRadius:50,background:'#ffedd5',color:'#f59e0b',display:'flex',justifyContent:'center',alignItems:'center'}}><Calendar size={24}/></div>
          <div><div style={{fontSize:11,color:'#6b7280',fontWeight:600}}>Upcoming Classes</div><div style={{fontSize:24,fontWeight:700}}>4</div></div>
        </div>
        <div style={{border:'1px solid #e5e7eb',borderRadius:12,padding:20,display:'flex',gap:16,alignItems:'center'}}>
          <div style={{width:48,height:48,borderRadius:50,background:'#d1fae5',color:'#10b981',display:'flex',justifyContent:'center',alignItems:'center'}}><CheckCircle size={24}/></div>
          <div><div style={{fontSize:11,color:'#6b7280',fontWeight:600}}>Completed Classes</div><div style={{fontSize:24,fontWeight:700}}>14</div></div>
        </div>
        <div style={{border:'1px solid #e5e7eb',borderRadius:12,padding:20,display:'flex',gap:16,alignItems:'center'}}>
          <div style={{width:48,height:48,borderRadius:50,background:'#f3e8ff',color:'#8b5cf6',display:'flex',justifyContent:'center',alignItems:'center'}}><Clock size={24}/></div>
          <div><div style={{fontSize:11,color:'#6b7280',fontWeight:600}}>Total Hours</div><div style={{fontSize:24,fontWeight:700}}>36h 20m</div></div>
        </div>
      </div>
      
      <table className="sp-table">
        <thead>
          <tr>
            <th>Class Details</th>
            <th>Topic</th>
            <th>Instructor</th>
            <th>Schedule</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div style={{display:'flex',gap:12,alignItems:'center'}}>
                <div className="sp-lc-thumb pink">LIVE</div>
                <div><div style={{fontWeight:700,fontSize:13}}>Community Health Nursing</div><div style={{fontSize:11,color:'#6b7280'}}>Nursing Fundamentals</div></div>
              </div>
            </td>
            <td><div style={{fontWeight:500}}>Intro to Community Health</div></td>
            <td>
              <div className="sp-lc-instructor">
                <div style={{width:24,height:24,borderRadius:50,background:'#e5e7eb'}}/>
                <div><div style={{fontWeight:600}}>Dr. Anjali Verma</div></div>
              </div>
            </td>
            <td><div style={{fontWeight:500}}>20 May 2024</div><div style={{fontSize:11,color:'#6b7280'}}>04:00 PM - 05:30 PM</div></td>
            <td><div style={{color:'#10b981',fontWeight:700,fontSize:12}}>Upcoming</div><div style={{fontSize:10,color:'#10b981'}}>Starts in 2h 15m</div></td>
            <td><button className="sp-btn-primary" style={{padding:'6px 12px',fontSize:11}}>Join Class</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderNotes = () => (
    <div className="sp-notes-layout">
      <div className="sp-notes-sidebar">
        <div className="sp-note-cat active"><span>All Notes</span><span className="sp-note-count">6</span></div>
        <div className="sp-note-cat"><span>Academic Notes</span><span className="sp-note-count">3</span></div>
        <div className="sp-note-cat"><span>Performance Notes</span><span className="sp-note-count">2</span></div>
        <div className="sp-note-cat"><span>Behavior Notes</span><span className="sp-note-count">1</span></div>
        <div className="sp-note-cat"><span>General Notes</span><span className="sp-note-count">0</span></div>
      </div>
      <div>
        <div className="sp-note-card">
          <div className="sp-note-icon" style={{background:'#f3e8ff',color:'#8b5cf6'}}><Calendar size={20}/></div>
          <div className="sp-note-body">
            <div className="sp-note-header">
              <span className="sp-note-title">Excellent participation in Live Class</span>
              <span className="sp-note-tag" style={{background:'#e0e7ff',color:'#4f46e5'}}>Academic</span>
            </div>
            <div className="sp-note-text">Riya actively participated in today's live class on Medical Surgical Nursing. Asked relevant questions and interacted well.</div>
            <div className="sp-note-meta">Added by Anjali Verma • 20 May 2024, 04:15 PM</div>
          </div>
          <button className="sp-btn-icon-only" style={{border:'none',background:'none'}}><MoreVertical size={16}/></button>
        </div>
        <div className="sp-note-card">
          <div className="sp-note-icon" style={{background:'#d1fae5',color:'#10b981'}}><CheckCircle size={20}/></div>
          <div className="sp-note-body">
            <div className="sp-note-header">
              <span className="sp-note-title">Strong performance in Mock Test 04</span>
              <span className="sp-note-tag" style={{background:'#d1fae5',color:'#047857'}}>Performance</span>
            </div>
            <div className="sp-note-text">Scored 96% in Mock Test 04. Shows excellent understanding of the topics. Keep up the good work!</div>
            <div className="sp-note-meta">Added by Rahul Kapoor • 19 May 2024, 10:30 AM</div>
          </div>
          <button className="sp-btn-icon-only" style={{border:'none',background:'none'}}><MoreVertical size={16}/></button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="sp-page">
      {/* Top Nav */}
      <div className="sp-top-nav">
        <button className="sp-back-btn" onClick={() => navigate('/admin/users')}><ArrowLeft size={18} /></button>
        <div className="sp-title-area">
          <h1>Student Profile</h1>
          <div className="sp-breadcrumbs">Students / <span>{student.name} ({enrId})</span></div>
        </div>
        <div className="sp-top-actions">
          <button className="sp-btn-outline"><Mail size={16}/> Send Message</button>
          <button className="sp-btn-outline"><Edit3 size={16}/> Edit Student</button>
          <button className="sp-btn-icon-only"><MoreVertical size={16}/></button>
        </div>
      </div>

      <div className="sp-layout">
        
        {/* Main Area */}
        <div className="sp-main">
          
          {/* Header Card */}
          <div className="sp-header-card">
            <div className="sp-avatar-large">
              {student.profilePhoto ? <img src={student.profilePhoto} alt="" /> : student.name[0].toUpperCase()}
            </div>
            <div className="sp-header-info">
              <div className="sp-name-row">
                <span className="sp-name">{student.name}</span>
                <span className="sp-badge-active">Active</span>
              </div>
              <div className="sp-contact-row">
                <div className="sp-contact-item"><User size={14}/> {enrId}</div>
                <div className="sp-contact-item"><Mail size={14}/> {student.email}</div>
                <div className="sp-contact-item"><Phone size={14}/> +91 98765 43210</div>
              </div>
              <div className="sp-meta-row">
                <div className="sp-meta-item">
                  <Calendar className="sp-meta-icon" size={18}/>
                  <div className="sp-meta-text"><span className="sp-meta-label">Joined on</span><span className="sp-meta-val">{new Date(student.createdAt).toLocaleDateString('en-GB', {day:'2-digit', month:'short', year:'numeric'})}</span></div>
                </div>
                <div className="sp-meta-item">
                  <BookOpen className="sp-meta-icon" size={18}/>
                  <div className="sp-meta-text"><span className="sp-meta-label">Current Course</span><span className="sp-meta-val">Nursing Fundamentals<br/>- Complete Course</span></div>
                </div>
                <div className="sp-meta-item">
                  <User className="sp-meta-icon" size={18}/>
                  <div className="sp-meta-text"><span className="sp-meta-label">Batch</span><span className="sp-meta-val">May 2024 Batch</span></div>
                </div>
              </div>
            </div>
            <div className="sp-actions-dropdown">
              <button className="sp-btn-primary">Actions <span style={{fontSize:10}}>▼</span></button>
            </div>
          </div>

          {/* Tabs */}
          <div className="sp-tabs">
            {TABS.map(tab => (
              <div key={tab} className={`sp-tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                {tab}
              </div>
            ))}
          </div>

          {/* Tab Content */}
          <div className="sp-tab-content">
            {activeTab === 'Overview' && renderOverview()}
            {activeTab === 'Enrollments' && renderEnrollments()}
            {activeTab === 'Payments' && renderPayments()}
            {activeTab === 'Certificates' && renderCertificates()}
            {activeTab === 'Activity Log' && renderActivityLog()}
            {activeTab === 'Login Credentials' && renderLoginCredentials()}
            {activeTab === 'Live Classes' && renderLiveClasses()}
            {activeTab === 'Notes' && renderNotes()}
            {activeTab === 'Test Performance' && <div><div className="sp-section-title">Test Performance</div><p style={{color:'#6b7280'}}>No test performance data available.</p></div>}
          </div>

        </div>

        {/* Right Sidebar */}
        <div className="sp-sidebar">
          
          <div className="sp-side-card">
            <div className="sp-side-title">Course Progress <span className="sp-side-link">View Progress</span></div>
            <div style={{display:'flex', gap:24, alignItems:'center'}}>
              <div className="sp-circ-progress">
                <div className="sp-circ-inner">
                  <span className="sp-circ-val">78%</span>
                  <span className="sp-circ-sub">Course Completed</span>
                </div>
              </div>
              <div style={{flex:1, display:'flex', flexDirection:'column', gap:8}}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:11}}><span style={{color:'#6b7280',fontWeight:500}}>Total Modules</span><span style={{fontWeight:700}}>28</span></div>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:11}}><span style={{color:'#6b7280',fontWeight:500}}>Completed</span><span style={{fontWeight:700}}>22</span></div>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:11}}><span style={{color:'#6b7280',fontWeight:500}}>In Progress</span><span style={{fontWeight:700}}>4</span></div>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:11}}><span style={{color:'#6b7280',fontWeight:500}}>Not Started</span><span style={{fontWeight:700}}>2</span></div>
              </div>
            </div>
            <div style={{marginTop:20, background:'#f9fafb', padding:12, borderRadius:8, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div>
                <div style={{fontSize:10,color:'#6b7280',fontWeight:600,display:'flex',alignItems:'center',gap:4}}><Clock size={12}/> Last Access</div>
                <div style={{fontSize:11,fontWeight:700,marginTop:2}}>19 May 2024, 09:30 PM</div>
              </div>
              <button className="sp-btn-primary" style={{padding:'6px 12px', fontSize:11}}>Continue Learning</button>
            </div>
          </div>

          <div className="sp-side-card">
            <div className="sp-side-title">Quick Actions</div>
            <div className="sp-qa-list">
              <div className="sp-qa-item"><div className="sp-qa-item-left"><div className="sp-qa-icon" style={{background:'#eff6ff',color:'#3b82f6'}}><BookOpen size={14}/></div> View Course Progress</div><span style={{color:'#9ca3af'}}>{'>'}</span></div>
              <div className="sp-qa-item"><div className="sp-qa-item-left"><div className="sp-qa-icon" style={{background:'#d1fae5',color:'#10b981'}}><Download size={14}/></div> Download Study Material</div><span style={{color:'#9ca3af'}}>{'>'}</span></div>
              <div className="sp-qa-item"><div className="sp-qa-item-left"><div className="sp-qa-icon" style={{background:'#f3e8ff',color:'#8b5cf6'}}><PlayCircle size={14}/></div> Join Live Class</div><span style={{color:'#9ca3af'}}>{'>'}</span></div>
              <div className="sp-qa-item"><div className="sp-qa-item-left"><div className="sp-qa-icon" style={{background:'#ffedd5',color:'#f59e0b'}}><Edit3 size={14}/></div> Take a Mock Test</div><span style={{color:'#9ca3af'}}>{'>'}</span></div>
              <div className="sp-qa-item"><div className="sp-qa-item-left"><div className="sp-qa-icon" style={{background:'#f3f4f6',color:'#6b7280'}}><FileText size={14}/></div> Payment History</div><span style={{color:'#9ca3af'}}>{'>'}</span></div>
            </div>
          </div>

          <div className="sp-side-card" style={{background:'#fdfcff', borderColor:'#e9d5ff'}}>
            <div className="sp-side-title">Need Help?</div>
            <div className="sp-help-text">Have questions about this course?<br/>Our support team is here to help you.</div>
            <button className="sp-btn-blue"><Phone size={14}/> Contact Support</button>
          </div>

          <div className="sp-side-card">
            <div className="sp-side-title">Related Courses <span className="sp-side-link">View All</span></div>
            <div className="sp-rc-list">
              <div className="sp-rc-item">
                <div className="sp-rc-img" style={{background:'#e5e7eb'}}/>
                <div style={{flex:1}}>
                  <div className="sp-rc-title">Medical Surgical Nursing</div>
                  <div className="sp-rc-sub">Complete Course</div>
                  <div className="sp-rc-price">₹2,999 <span className="sp-rc-price-old">₹3,999</span></div>
                </div>
                <div className="sp-rc-view">View Course</div>
              </div>
              <div className="sp-rc-item">
                <div className="sp-rc-img" style={{background:'#e5e7eb'}}/>
                <div style={{flex:1}}>
                  <div className="sp-rc-title">Pediatric Nursing Essentials</div>
                  <div className="sp-rc-sub">Complete Course</div>
                  <div className="sp-rc-price">₹2,499 <span className="sp-rc-price-old">₹3,299</span></div>
                </div>
                <div className="sp-rc-view">View Course</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
