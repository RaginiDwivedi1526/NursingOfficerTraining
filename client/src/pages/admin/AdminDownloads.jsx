import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw, FileDown, FileText, Video, Image as ImageIcon, Headphones, Search, Filter, Download, MoreVertical, FolderOpen, Calendar, Clock, ArrowRight, Info, ChevronRight, Star } from 'lucide-react';
import './AdminDownloads.css';

const MOCK_FILES = [];

export default function AdminDownloads() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const renderFileIcon = (type, color) => {
    switch (type) {
      case 'PDF': return <FileText size={20} color={color} />;
      case 'DOCX': return <FileText size={20} color={color} />;
      case 'XLSX': return <FileText size={20} color={color} />;
      case 'MP4': return <Video size={20} color={color} />;
      case 'PNG': return <ImageIcon size={20} color={color} />;
      case 'MP3': return <Headphones size={20} color={color} />;
      default: return <FileText size={20} color={color} />;
    }
  };

  const getBadgeStyle = (type) => {
    switch (type) {
      case 'PDF': return { color: '#ef4444', background: '#fee2e2' };
      case 'DOCX': return { color: '#10b981', background: '#d1fae5' };
      case 'XLSX': return { color: '#10b981', background: '#d1fae5' };
      case 'MP4': return { color: '#8b5cf6', background: '#f3e8ff' };
      case 'PNG': return { color: '#3b82f6', background: '#dbeafe' };
      case 'MP3': return { color: '#f59e0b', background: '#ffedd5' };
      default: return { color: '#6b7280', background: '#f3f4f6' };
    }
  };

  return (
    <div className="ad-page">
      <div className="ad-header">
        <div className="ad-header-left">
          <button className="ad-back-btn" onClick={() => navigate(-1)}><ArrowLeft size={18} /></button>
          <div className="ad-header-title">
            <h1>Downloads</h1>
            <p>Home {'>'} Downloads</p>
          </div>
        </div>
        <div className="ad-header-right">
          <div className="ad-storage-widget">
            <div className="ad-sw-top">
              <span>Storage Used</span>
              <span>2.45 GB / 10 GB</span>
            </div>
            <div className="ad-sw-bar-bg">
              <div className="ad-sw-bar-fill" style={{ width: '24%' }}></div>
            </div>
            <div style={{fontSize:10, color:'#6b7280', textAlign:'right', marginTop:-4}}>24%</div>
          </div>
          <button className="ad-btn-outline"><RefreshCw size={16}/> Refresh</button>
        </div>
      </div>

      <div className="ad-metrics">
        <div className="ad-metric-card">
          <div className="ad-mc-icon" style={{background:'#f3e8ff', color:'#8b5cf6'}}><FileDown size={24} /></div>
          <div className="ad-mc-body">
            <div className="ad-mc-label">Total Downloads</div>
            <div className="ad-mc-val">1,248</div>
            <div className="ad-mc-trend">Files downloaded</div>
          </div>
        </div>
        <div className="ad-metric-card">
          <div className="ad-mc-icon" style={{background:'#d1fae5', color:'#10b981'}}><FileText size={24} /></div>
          <div className="ad-mc-body">
            <div className="ad-mc-label">Study Materials</div>
            <div className="ad-mc-val">842</div>
            <div className="ad-mc-trend">Notes, PDFs, eBooks</div>
          </div>
        </div>
        <div className="ad-metric-card">
          <div className="ad-mc-icon" style={{background:'#ffedd5', color:'#f59e0b'}}><Video size={24} /></div>
          <div className="ad-mc-body">
            <div className="ad-mc-label">Videos</div>
            <div className="ad-mc-val">256</div>
            <div className="ad-mc-trend">Video lectures</div>
          </div>
        </div>
        <div className="ad-metric-card">
          <div className="ad-mc-icon" style={{background:'#dbeafe', color:'#3b82f6'}}><ImageIcon size={24} /></div>
          <div className="ad-mc-body">
            <div className="ad-mc-label">Images</div>
            <div className="ad-mc-val">98</div>
            <div className="ad-mc-trend">Diagrams, Charts</div>
          </div>
        </div>
        <div className="ad-metric-card">
          <div className="ad-mc-icon" style={{background:'#f3e8ff', color:'#8b5cf6'}}><Headphones size={24} /></div>
          <div className="ad-mc-body">
            <div className="ad-mc-label">Audios</div>
            <div className="ad-mc-val">52</div>
            <div className="ad-mc-trend">Audio files</div>
          </div>
        </div>
      </div>

      <div className="ad-layout">
        
        {/* Main Left Column */}
        <div className="ad-table-container">
          <div className="ad-table-toolbar">
            <div className="ad-tabs">
              <div className={`ad-tab ${activeTab==='All'?'active':''}`} onClick={()=>setActiveTab('All')}>All Downloads (1,248)</div>
              <div className={`ad-tab ${activeTab==='Docs'?'active':''}`} onClick={()=>setActiveTab('Docs')}>Documents (842)</div>
              <div className={`ad-tab ${activeTab==='Vids'?'active':''}`} onClick={()=>setActiveTab('Vids')}>Videos (256)</div>
              <div className={`ad-tab ${activeTab==='Imgs'?'active':''}`} onClick={()=>setActiveTab('Imgs')}>Images (98)</div>
              <div className={`ad-tab ${activeTab==='Audios'?'active':''}`} onClick={()=>setActiveTab('Audios')}>Audios (52)</div>
            </div>
            <div className="ad-search-filter">
              <div className="ad-search">
                <Search size={16} color="#9ca3af" />
                <input type="text" placeholder="Search downloads..."
                  value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
              <button className="ad-btn-outline"><Filter size={16}/> Filter</button>
            </div>
          </div>

          <table className="ad-table">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Type</th>
                <th>Course / Topic</th>
                <th>Size</th>
                <th>Downloaded On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_FILES.filter(file =>
                file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                file.course.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((file) => (
                <tr key={file.id}>
                  <td style={{width: 320}}>
                    <div className="ad-file-cell">
                      <div className="ad-file-icon" style={{background: file.iconBg}}>
                        {renderFileIcon(file.type, file.iconColor)}
                      </div>
                      <div>
                        <div className="ad-file-title">{file.name}</div>
                        <div className="ad-file-desc">{file.desc}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="ad-type-badge" style={getBadgeStyle(file.type)}>{file.type}</span>
                  </td>
                  <td>
                    <div className="ad-stat-val" style={{fontSize:13, fontWeight:600}}>{file.course}</div>
                  </td>
                  <td>
                    <div className="ad-stat-val">{file.size}</div>
                  </td>
                  <td>
                    <div className="ad-stat-val" style={{fontSize:12}}>{file.date}</div>
                    <div className="ad-stat-lbl">{file.time}</div>
                  </td>
                  <td>
                    <div className="ad-actions-cell">
                      <button className="ad-action-btn gray"><Download size={16} /></button>
                      <button className="ad-action-btn gray"><MoreVertical size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="ad-pagination">
            <div className="ad-page-info">Showing 1 to 10 of 1,248 downloads</div>
            <div className="ad-page-btns">
              <button className="ad-page-btn">{'<'}</button>
              <button className="ad-page-btn active">1</button>
              <button className="ad-page-btn">2</button>
              <button className="ad-page-btn">3</button>
              <button className="ad-page-btn">4</button>
              <button className="ad-page-btn" style={{border:'none', background:'none'}}>...</button>
              <button className="ad-page-btn">125</button>
              <button className="ad-page-btn">{'>'}</button>
              <div className="ad-page-limit">10 / page ▼</div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div>
          
          <div className="ad-card" style={{padding:20}}>
            <div className="ad-card-title">Storage Overview</div>
            
            <div className="ad-doughnut-container">
              <div className="ad-doughnut">
                <div className="ad-doughnut-inner">
                  <span>2.45 GB</span>
                  <span>Used</span>
                </div>
              </div>
              <div className="ad-legend">
                <div className="ad-legend-item">
                  <div className="ad-legend-label"><div className="ad-legend-dot" style={{background:'#4f46e5'}}></div> Documents</div>
                  <div className="ad-legend-val">1.45 GB (59%)</div>
                </div>
                <div className="ad-legend-item">
                  <div className="ad-legend-label"><div className="ad-legend-dot" style={{background:'#f59e0b'}}></div> Videos</div>
                  <div className="ad-legend-val">0.75 GB (31%)</div>
                </div>
                <div className="ad-legend-item">
                  <div className="ad-legend-label"><div className="ad-legend-dot" style={{background:'#3b82f6'}}></div> Images</div>
                  <div className="ad-legend-val">0.15 GB (6%)</div>
                </div>
                <div className="ad-legend-item">
                  <div className="ad-legend-label"><div className="ad-legend-dot" style={{background:'#10b981'}}></div> Audios</div>
                  <div className="ad-legend-val">0.10 GB (4%)</div>
                </div>
              </div>
            </div>

            <button className="ad-manage-btn"><FolderOpen size={16}/> Manage Storage</button>
          </div>

          <div className="ad-card" style={{padding:20}}>
            <div className="ad-card-title">Quick Filters</div>
            
            <div className="ad-qf-list">
              <div className="ad-qf-item">
                <div className="ad-qf-label"><Calendar size={16} color="#6b7280"/> Downloaded Today</div>
                <div className="ad-qf-val">14 <ChevronRight size={14}/></div>
              </div>
              <div className="ad-qf-item">
                <div className="ad-qf-label"><Calendar size={16} color="#6b7280"/> Downloaded This Week</div>
                <div className="ad-qf-val">48 <ChevronRight size={14}/></div>
              </div>
              <div className="ad-qf-item">
                <div className="ad-qf-label"><Calendar size={16} color="#6b7280"/> Downloaded This Month</div>
                <div className="ad-qf-val">156 <ChevronRight size={14}/></div>
              </div>
              <div className="ad-qf-item">
                <div className="ad-qf-label"><FileDown size={16} color="#6b7280"/> Large Files ({'>'} 100 MB)</div>
                <div className="ad-qf-val">23 <ChevronRight size={14}/></div>
              </div>
              <div className="ad-qf-item">
                <div className="ad-qf-label"><Star size={16} color="#6b7280"/> Favorites</div>
                <div className="ad-qf-val">32 <ChevronRight size={14}/></div>
              </div>
            </div>
          </div>

          <div className="ad-tips-card">
            <div className="ad-tips-title"><Info size={16} color="#4f46e5"/> Tips</div>
            <div className="ad-tips-body">
              You can download study materials, notes, videos and other resources for offline access.
            </div>
            <div className="ad-help-link">
              <div className="ad-help-text">
                <span>Having trouble downloading?</span>
                <span>View Help Center</span>
              </div>
              <ArrowRight size={16} color="#9ca3af"/>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
