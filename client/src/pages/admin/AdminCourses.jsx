import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, BookOpen, FileText, PlaySquare, Users, Edit3, MoreVertical, X, Image as ImageIcon, GripVertical, Trash2 } from 'lucide-react';
import './AdminCourses.css';

const MOCK_COURSES = [];

export default function AdminCourses() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [editingCourse, setEditingCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Published': return 'ac-badge green';
      case 'Draft': return 'ac-badge orange';
      case 'In Review': return 'ac-badge blue';
      default: return 'ac-badge';
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case 'Published': return '#10b981';
      case 'Draft': return '#f59e0b';
      case 'In Review': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  // Mock icons for the course cell
  const renderIcon = (iconName, color) => {
    return <BookOpen size={24} color={color} />; // Fallback icon for simplicity
  };

  return (
    <div className="ac-page">
      {/* Header */}
      <div className="ac-header">
        <div className="ac-header-left">
          <div className="ac-header-title">
            <h1>Courses & Topics</h1>
            <p>Create and manage courses, sections and topics</p>
          </div>
        </div>
        <div className="ac-header-right">
          <button className="ac-btn-icon"><Filter size={16} /></button>
          <button className="ac-btn-primary" onClick={() => navigate('/admin/courses/new')}><Plus size={16} /> Create Course</button>
        </div>
      </div>

      {/* Metrics */}
      <div className="ac-metrics">
        <div className="ac-metric-card">
          <div className="ac-mc-icon" style={{background:'#f3e8ff', color:'#8b5cf6'}}><BookOpen size={24} /></div>
          <div className="ac-mc-body">
            <div className="ac-mc-label">Total Courses</div>
            <div className="ac-mc-val">24</div>
            <div className="ac-mc-trend">Active courses</div>
          </div>
        </div>
        <div className="ac-metric-card">
          <div className="ac-mc-icon" style={{background:'#d1fae5', color:'#10b981'}}><FileText size={24} /></div>
          <div className="ac-mc-body">
            <div className="ac-mc-label">Total Topics</div>
            <div className="ac-mc-val">382</div>
            <div className="ac-mc-trend">Across all courses</div>
          </div>
        </div>
        <div className="ac-metric-card">
          <div className="ac-mc-icon" style={{background:'#ffedd5', color:'#f59e0b'}}><PlaySquare size={24} /></div>
          <div className="ac-mc-body">
            <div className="ac-mc-label">Total Sections</div>
            <div className="ac-mc-val">108</div>
            <div className="ac-mc-trend">Across all courses</div>
          </div>
        </div>
        <div className="ac-metric-card">
          <div className="ac-mc-icon" style={{background:'#eff6ff', color:'#3b82f6'}}><Users size={24} /></div>
          <div className="ac-mc-body">
            <div className="ac-mc-label">Published Courses</div>
            <div className="ac-mc-val">18</div>
            <div className="ac-mc-trend">Live for students</div>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="ac-table-container">
        <div className="ac-table-toolbar">
          <div className="ac-tabs">
            <div className={`ac-tab ${activeTab==='All'?'active':''}`} onClick={()=>setActiveTab('All')}>All Courses (24)</div>
            <div className={`ac-tab ${activeTab==='Published'?'active':''}`} onClick={()=>setActiveTab('Published')}>Published (18)</div>
            <div className={`ac-tab ${activeTab==='Drafts'?'active':''}`} onClick={()=>setActiveTab('Drafts')}>Drafts (6)</div>
            <div className={`ac-tab ${activeTab==='Archived'?'active':''}`} onClick={()=>setActiveTab('Archived')}>Archived (0)</div>
          </div>
          <div className="ac-search">
            <Search size={16} color="#9ca3af" />
            <input type="text" placeholder="Search courses..."
              value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
        </div>

        <table className="ac-table">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Category</th>
              <th>Topics</th>
              <th>Sections</th>
              <th>Status</th>
              <th>Students</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_COURSES.filter(course =>
              course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              course.cat.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((course) => (
              <tr key={course.id}>
                <td style={{width: 320}}>
                  <div className="ac-course-cell">
                    <div className="ac-course-icon" style={{background: course.bg}}>
                      {renderIcon(course.icon, course.color)}
                    </div>
                    <div>
                      <div className="ac-course-title">{course.name}</div>
                      <div className="ac-course-desc">{course.desc}</div>
                    </div>
                  </div>
                </td>
                <td><span className="ac-cat-badge" style={{color: course.color, background: course.bg}}>{course.cat}</span></td>
                <td>
                  <div className="ac-stat-val">{course.topics}</div>
                  <div className="ac-stat-lbl">Topics</div>
                </td>
                <td>
                  <div className="ac-stat-val">{course.sections}</div>
                  <div className="ac-stat-lbl">Sections</div>
                </td>
                <td>
                  <div>
                    <span className={getStatusBadge(course.status)}>{course.status}</span>
                    <div className="ac-sub-badge"><div className="ac-dot" style={{background: getStatusDot(course.status)}}/> {course.statSub}</div>
                  </div>
                </td>
                <td>
                  <div className="ac-stat-val">{course.students}</div>
                  <div className="ac-stat-lbl">Students</div>
                </td>
                <td>
                  <div className="ac-actions-cell">
                    <button className={`ac-action-btn ${editingCourse?.id === course.id ? 'active' : ''}`} onClick={() => setEditingCourse(course)}><Edit3 size={16} /></button>
                    <button className="ac-action-btn gray"><MoreVertical size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="ac-pagination">
          <div className="ac-page-info">Showing 1 to 6 of 24 courses</div>
          <div className="ac-page-btns">
            <button className="ac-page-btn">{'<'}</button>
            <button className="ac-page-btn active">1</button>
            <button className="ac-page-btn">2</button>
            <button className="ac-page-btn">3</button>
            <button className="ac-page-btn" style={{border:'none', background:'none'}}>...</button>
            <button className="ac-page-btn">5</button>
            <button className="ac-page-btn">{'>'}</button>
            <div className="ac-page-limit">10 / page ▼</div>
          </div>
        </div>
      </div>

      {/* Edit Drawer Overlay */}
      {editingCourse && (
        <div className="ac-drawer-overlay">
          <div className="ac-drawer">
            <div className="ac-drawer-header">
              <div className="ac-drawer-title">
                <h2>Edit Course</h2>
                <p>Update your course information</p>
              </div>
              <button className="ac-drawer-close" onClick={() => setEditingCourse(null)}><X size={20}/></button>
            </div>
            
            <div className="ac-drawer-body">
              <div className="ac-field">
                <label className="ac-label">Course Title <span>*</span></label>
                <input type="text" className="ac-input" defaultValue={editingCourse.name} />
                <div className="ac-help">Keep it clear, specific and engaging.</div>
              </div>

              <div className="ac-field">
                <label className="ac-label">Course Category <span>*</span></label>
                <select className="ac-input" defaultValue={editingCourse.cat}>
                  <option>Clinical Nursing</option>
                  <option>Pharmacology</option>
                  <option>Pediatric Nursing</option>
                  <option>Mental Health</option>
                </select>
              </div>

              <div className="ac-field">
                <label className="ac-label">Course Description <span>*</span></label>
                <div className="ac-editor">
                  <div className="ac-editor-toolbar">
                    <select className="ac-editor-select"><option>Normal</option></select>
                    <div className="ac-editor-icons">
                      <span>B</span><span>I</span><span style={{textDecoration:'underline'}}>U</span>
                    </div>
                  </div>
                  <textarea className="ac-editor-textarea" defaultValue={editingCourse.desc}></textarea>
                </div>
                <div className="ac-help" style={{textAlign:'right'}}>154/2000 characters</div>
              </div>

              <div className="ac-field">
                <label className="ac-label">Course Thumbnail</label>
                <div className="ac-thumb-preview">
                  <div className="ac-thumb-img"><ImageIcon size={24}/></div>
                  <div className="ac-thumb-info">
                    <div className="ac-thumb-name">medical-surgical.jpg</div>
                    <div className="ac-thumb-size">1280x720px • 268KB</div>
                  </div>
                  <div className="ac-thumb-actions">
                    <div className="ac-thumb-action">Change</div>
                    <div className="ac-thumb-action" style={{color:'#ef4444'}}><Trash2 size={14}/></div>
                  </div>
                </div>
              </div>

              <div className="ac-field">
                <label className="ac-label">What will students learn in this course? <span>*</span></label>
                {['Understand pre-operative and post-operative care', 'Manage surgical patients effectively', 'Apply infection control techniques', 'Practice evidence-based nursing care'].map((val, i) => (
                  <div className="ac-outcome-row" key={i}>
                    <GripVertical className="ac-outcome-drag" size={16} />
                    <input type="text" className="ac-outcome-input" defaultValue={val} />
                    <X className="ac-outcome-del" size={18} />
                  </div>
                ))}
                <div className="ac-add-btn"><Plus size={16}/> Add Learning Outcome</div>
              </div>
            </div>

            <div className="ac-drawer-footer">
              <button className="ac-btn-outline" style={{flex:1, justifyContent:'center'}} onClick={() => setEditingCourse(null)}>Cancel</button>
              <button className="ac-btn-primary" style={{flex:1, justifyContent:'center'}}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
