import React, { useState } from 'react';
import { Menu, Search, Plus, FileText, Star, Folder, Clock, Trash2, List, Grid, Edit3, Mic, Download, ChevronRight, MoreVertical } from 'lucide-react';
import './AdminNotes.css';

const MOCK_NOTES = [];

export default function AdminNotes() {
  const [activeTab, setActiveTab] = useState('All');
  const [view, setView] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="an-page">
      <div className="an-header">
        <div className="an-header-left">
          <div className="an-header-icon"><Menu size={20} /></div>
          <div className="an-header-title">
            <h1>Notes</h1>
            <p>Create, organize and manage your personal study notes</p>
          </div>
        </div>
        <div className="an-header-right">
          <div className="an-search">
            <Search size={16} color="#9ca3af" />
            <input type="text" placeholder="Search notes..."
              value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <button className="an-btn-primary"><Plus size={16}/> New Note</button>
        </div>
      </div>

      <div className="an-metrics">
        <div className="an-metric-card active">
          <div className="an-mc-icon" style={{color:'#8b5cf6'}}><FileText size={24} /></div>
          <div className="an-mc-body">
            <div className="an-mc-label">All Notes</div>
            <div className="an-mc-val">156</div>
            <div className="an-mc-trend">Total notes</div>
          </div>
        </div>
        <div className="an-metric-card">
          <div className="an-mc-icon" style={{color:'#10b981', background:'#f0fdf4', borderColor:'#dcfce7'}}><Star size={24} fill="#10b981" /></div>
          <div className="an-mc-body">
            <div className="an-mc-label">Favourites</div>
            <div className="an-mc-val">28</div>
            <div className="an-mc-trend">Starred notes</div>
          </div>
        </div>
        <div className="an-metric-card">
          <div className="an-mc-icon" style={{color:'#f59e0b', background:'#fffbeb', borderColor:'#fef3c7'}}><Folder size={24} /></div>
          <div className="an-mc-body">
            <div className="an-mc-label">Folders</div>
            <div className="an-mc-val">12</div>
            <div className="an-mc-trend">Organized folders</div>
          </div>
        </div>
        <div className="an-metric-card">
          <div className="an-mc-icon" style={{color:'#3b82f6', background:'#eff6ff', borderColor:'#dbeafe'}}><Clock size={24} /></div>
          <div className="an-mc-body">
            <div className="an-mc-label">Recent Notes</div>
            <div className="an-mc-val">8</div>
            <div className="an-mc-trend">Viewed recently</div>
          </div>
        </div>
        <div className="an-metric-card">
          <div className="an-mc-icon" style={{color:'#ef4444', background:'#fef2f2', borderColor:'#fee2e2'}}><Trash2 size={24} /></div>
          <div className="an-mc-body">
            <div className="an-mc-label">Trash</div>
            <div className="an-mc-val">3</div>
            <div className="an-mc-trend">Deleted notes</div>
          </div>
        </div>
      </div>

      <div className="an-layout">
        
        {/* Main Left Column */}
        <div className="an-table-container">
          <div className="an-table-toolbar">
            <div className="an-tabs">
              <div className={`an-tab ${activeTab==='All'?'active':''}`} onClick={()=>setActiveTab('All')}>All Notes (156)</div>
              <div className={`an-tab ${activeTab==='Favs'?'active':''}`} onClick={()=>setActiveTab('Favs')}>Favourites (28)</div>
              <div className={`an-tab ${activeTab==='Folds'?'active':''}`} onClick={()=>setActiveTab('Folds')}>Folders (12)</div>
              <div className={`an-tab ${activeTab==='Shared'?'active':''}`} onClick={()=>setActiveTab('Shared')}>Shared with me (10)</div>
            </div>
            
            <div className="an-toolbar-actions">
              <select className="an-select"><option>All Types</option></select>
              <select className="an-select"><option>Sort: Recently Updated</option></select>
              <div className="an-view-toggles">
                <button className={`an-view-btn ${view==='list'?'active':''}`} onClick={()=>setView('list')}><List size={16}/></button>
                <button className={`an-view-btn ${view==='grid'?'active':''}`} onClick={()=>setView('grid')}><Grid size={16}/></button>
              </div>
            </div>
          </div>

          <table className="an-table">
            <thead>
              <tr>
                <th style={{width: 40}}><input type="checkbox" className="an-checkbox"/></th>
                <th>Note Title</th>
                <th>Folder / Course</th>
                <th>Tags</th>
                <th>Updated On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_NOTES.filter(note =>
                note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                note.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                note.folder.toLowerCase().includes(searchTerm.toLowerCase()) ||
                note.course.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((note) => (
                <tr key={note.id}>
                  <td><input type="checkbox" className="an-checkbox"/></td>
                  <td style={{width: 320}}>
                    <div className="an-item-cell">
                      <div className="an-item-icon" style={{background: note.iconBg, color: note.iconColor}}>
                        <FileText size={20} />
                      </div>
                      <div>
                        <div className="an-item-title">
                          {note.title} {note.isStarred && <Star size={12} fill="#f59e0b" color="#f59e0b"/>}
                        </div>
                        <div className="an-item-desc">{note.desc}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="an-folder-cell">
                      <Folder size={14} color="#9ca3af" style={{marginTop:2}}/>
                      <div className="an-folder-text">
                        <span className="an-folder-title">{note.folder}</span>
                        <span className="an-folder-sub">{note.course}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="an-tags-cell">
                      {note.tags.map((t,i) => (
                        <span key={i} className="an-tag" style={{color:t.c, background:t.bg}}>{t.lbl}</span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="an-stat-val" style={{fontSize:12}}>{note.date}</div>
                    <div className="an-stat-lbl">{note.time}</div>
                  </td>
                  <td>
                    <div className="an-actions-cell">
                      <button className="an-action-btn"><Star size={14} fill={note.isStarred?"#f59e0b":"none"} color={note.isStarred?"#f59e0b":"#4b5563"}/></button>
                      <button className="an-action-btn"><MoreVertical size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="an-pagination">
            <div className="an-page-info">Showing 1 to 10 of 156 notes</div>
            <div className="an-page-btns">
              <button className="an-page-btn">{'<'}</button>
              <button className="an-page-btn active">1</button>
              <button className="an-page-btn">2</button>
              <button className="an-page-btn">3</button>
              <button className="an-page-btn">4</button>
              <button className="an-page-btn" style={{border:'none', background:'none'}}>...</button>
              <button className="an-page-btn">16</button>
              <button className="an-page-btn">{'>'}</button>
              <div className="an-page-limit">10 / page ▼</div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div>
          
          <div className="an-card">
            <div className="an-card-title">Quick Create</div>
            <div className="an-card-sub">Create a new note quickly</div>
            
            <div className="an-qc-list">
              <div className="an-qc-item">
                <div className="an-qc-icon"><FileText size={18}/></div>
                <div className="an-qc-text">
                  <span className="an-qc-title">Text Note</span>
                  <span className="an-qc-desc">Write simple text notes</span>
                </div>
              </div>
              <div className="an-qc-item">
                <div className="an-qc-icon"><Edit3 size={18}/></div>
                <div className="an-qc-text">
                  <span className="an-qc-title">Handwritten Note</span>
                  <span className="an-qc-desc">Upload handwritten notes</span>
                </div>
              </div>
              <div className="an-qc-item">
                <div className="an-qc-icon"><Mic size={18}/></div>
                <div className="an-qc-text">
                  <span className="an-qc-title">Voice Note</span>
                  <span className="an-qc-desc">Record and save voice notes</span>
                </div>
              </div>
              <div className="an-qc-item">
                <div className="an-qc-icon"><Download size={18}/></div>
                <div className="an-qc-text">
                  <span className="an-qc-title">Import File</span>
                  <span className="an-qc-desc">Import PDF, DOC, or images</span>
                </div>
              </div>
            </div>
          </div>

          <div className="an-card">
            <div className="an-card-title">My Folders</div>
            <div className="an-card-sub">Organize your notes in folders</div>
            
            <div className="an-folder-list">
              <div className="an-folder-item">
                <div className="an-folder-label"><Folder size={16} fill="#f59e0b" color="#f59e0b"/> Pharmacology</div>
                <div className="an-folder-count">18 <ChevronRight size={14}/></div>
              </div>
              <div className="an-folder-item">
                <div className="an-folder-label"><Folder size={16} fill="#f59e0b" color="#f59e0b"/> Anatomy & Physiology</div>
                <div className="an-folder-count">22 <ChevronRight size={14}/></div>
              </div>
              <div className="an-folder-item">
                <div className="an-folder-label"><Folder size={16} fill="#f59e0b" color="#f59e0b"/> Medical Surgical Nursing</div>
                <div className="an-folder-count">16 <ChevronRight size={14}/></div>
              </div>
              <div className="an-folder-item">
                <div className="an-folder-label"><Folder size={16} fill="#f59e0b" color="#f59e0b"/> Nursing Fundamentals</div>
                <div className="an-folder-count">14 <ChevronRight size={14}/></div>
              </div>
              <div className="an-folder-item">
                <div className="an-folder-label"><Folder size={16} fill="#f59e0b" color="#f59e0b"/> Community Health Nursing</div>
                <div className="an-folder-count">12 <ChevronRight size={14}/></div>
              </div>
            </div>
            
            <div className="an-view-link">View All Folders <ArrowRightIcon size={14}/></div>
          </div>

          <div className="an-card">
            <div className="an-card-title">Recent Activity</div>
            <div className="an-card-sub">Your recent note activities</div>
            
            <div className="an-activity-list">
              <div className="an-activity-item">
                <div className="an-activity-icon"><FileText size={14}/></div>
                <div className="an-activity-text">
                  <span className="an-activity-title">Pharmacology - Important Drug Classes</span>
                  <span className="an-activity-time">Updated 20 May 2024</span>
                </div>
              </div>
              <div className="an-activity-item">
                <div className="an-activity-icon" style={{background:'#d1fae5', color:'#10b981'}}><FileText size={14}/></div>
                <div className="an-activity-text">
                  <span className="an-activity-title">AIIMS NORCET 2024 - Preparation Strategy</span>
                  <span className="an-activity-time">Viewed 19 May 2024</span>
                </div>
              </div>
              <div className="an-activity-item">
                <div className="an-activity-icon" style={{background:'#ffedd5', color:'#f59e0b'}}><FileText size={14}/></div>
                <div className="an-activity-text">
                  <span className="an-activity-title">Anatomy - Heart Diagram Notes</span>
                  <span className="an-activity-time">Updated 18 May 2024</span>
                </div>
              </div>
            </div>

            <div className="an-view-link">View All Activity <ArrowRightIcon size={14}/></div>
          </div>

          <div className="an-card">
            <div className="an-card-title">Storage Usage</div>
            <div className="an-storage">
              <div className="an-st-top">You have used <span>245 MB of 1 GB</span></div>
              <div className="an-st-bar">
                <div className="an-st-fill" style={{width: '24%'}}></div>
              </div>
              <div className="an-st-pct">24%</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function ArrowRightIcon({size}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"></path>
      <path d="m12 5 7 7-7 7"></path>
    </svg>
  );
}
