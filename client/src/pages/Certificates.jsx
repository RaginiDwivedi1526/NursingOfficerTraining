import React, { useState } from 'react';
import { Award, Download, MoreVertical, SlidersHorizontal, ChevronDown, CheckCircle2, Trophy, Shield, Share2, TrendingUp, Target, BookOpen, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './StudentCertificates.css';

export default function Certificates() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('All Certificates');
  const [isDownloading, setIsDownloading] = useState(false);
  const TABS = ['All Certificates', 'Test Series', 'Mock Tests', 'Special Awards', 'Participation'];

  const downloadCertificate = () => {
    setIsDownloading(true);
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    script.onload = () => {
      const certElement = document.getElementById('certificate-preview-node');
      window.html2canvas(certElement, { scale: 2, useCORS: true }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Certificate_${user?.name?.replace(/\s+/g, '_') || 'Student'}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        setIsDownloading(false);
      }).catch(err => {
        console.error("Download failed:", err);
        setIsDownloading(false);
      });
    };
    document.body.appendChild(script);
  };

  const CERTS = [
    { bg: '#312e81', icon: '🏆', type: 'TEST SERIES', title: 'NORCET 2025 - Grand Test Series', badge: 'Topper', badgeClass: 'cb-green', stat1L: 'Score:', stat1V: '186 / 200 (93%)', stat2L: 'Rank:', stat2V: 'Top 5%', date: '25 May 2024' },
    { bg: '#3b82f6', icon: '🛡️', type: 'MOCK TEST', title: 'Mock Test – 05', stat1L: 'Score:', stat1V: '172 / 200 (86%)', stat2L: 'Percentile:', stat2V: '92.4', date: '22 May 2024' },
    { bg: '#16a34a', icon: '🎯', type: 'PYQ PRACTICE', title: 'PYQ Marathon - 1000 Questions', stat1L: 'Score:', stat1V: '168 / 200 (84%)', stat2L: 'Questions Solved:', stat2V: '1000', date: '18 May 2024' },
    { bg: '#ea580c', icon: '🏅', type: 'SUBJECT WARRIOR', title: 'Pharmacology - Subject Warrior', stat1L: 'Completed all topic tests in Pharmacology', date: '15 May 2024' },
    { bg: '#6d28d9', icon: '✨', type: 'PERFECT SCORE', title: 'Full Length Test - 03', badge: 'Perfect Score', badgeClass: 'cb-yellow', stat1L: 'Score:', stat1V: '200 / 200 (100%)', date: '10 May 2024' },
    { bg: '#0891b2', icon: '🌅', type: 'EARLY BIRD', title: 'Early Bird Learner', stat1L: 'Consistent learner - 7 days streak', date: '05 May 2024' },
  ];

  return (
    <div className="cert-container">
      {/* ─── LEFT ─── */}
      <div className="cert-left">
        
        {/* Header */}
        <div className="cert-header">
          <h1>My Certificates 🏅</h1>
          <p>Your achievements, your milestones. Keep learning, keep growing!</p>
        </div>

        {/* Stats */}
        <div className="cert-stats">
          <div className="cert-sbox">
            <div className="cert-sicon">🎓</div>
            <div className="cert-sval">08</div>
            <div className="cert-slbl">Certificates Earned</div>
            <div className="cert-strend trend-up">↑ 2 this month</div>
          </div>
          <div className="cert-sbox">
            <div className="cert-sicon">🛡️</div>
            <div className="cert-sval">06</div>
            <div className="cert-slbl">Tests Completed</div>
            <div className="cert-strend trend-up">↑ 3 this month</div>
          </div>
          <div className="cert-sbox">
            <div className="cert-sicon">🏅</div>
            <div className="cert-sval">100%</div>
            <div className="cert-slbl">Verified Certificates</div>
            <div className="cert-strend trend-trust">Trusted & Secure</div>
          </div>
          <div className="cert-sbox">
            <div className="cert-sicon">📥</div>
            <div className="cert-sval">12</div>
            <div className="cert-slbl">Total Downloads</div>
            <div className="cert-strend trend-grey">All time</div>
          </div>
          <div className="cert-sbox">
            <div className="cert-sicon">⭐</div>
            <div className="cert-sval">1250</div>
            <div className="cert-slbl">Total Score Points</div>
            <div className="cert-strend trend-grey">Keep it up!</div>
          </div>
        </div>

        {/* Tabs & Filters */}
        <div className="cert-tabs-row">
          <div className="cert-tabs">
            {TABS.map(t => (
              <div key={t} className={`cert-tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>{t}</div>
            ))}
          </div>
          <div className="cert-filters">
            <select className="cert-select"><option>Latest First</option></select>
            <button className="cert-filter-btn"><SlidersHorizontal size={14}/> Filters</button>
          </div>
        </div>

        {/* List */}
        <div className="cert-list">
          {CERTS.map((c, i) => (
            <div className="cert-item" key={i}>
              <div className="cert-img-box" style={{background: c.bg}}>
                {c.icon}<br/>{c.type}
              </div>
              <div className="cert-info">
                <div className="cert-title-row">
                  <div className="cert-title">{c.title}</div>
                  {c.badge && <div className={`cert-badge ${c.badgeClass}`}>{c.badge}</div>}
                </div>
                <div className="cert-stats-row">
                  {c.stat1L && <div><span className="cert-s-label">{c.stat1L}</span> <span className="cert-s-value">{c.stat1V}</span></div>}
                  {c.stat2L && <div><span className="cert-s-label">{c.stat2L}</span> <span className="cert-s-value">{c.stat2V}</span></div>}
                </div>
              </div>
              <div className="cert-meta">
                <div className="cert-date-lbl">Issued on</div>
                <div className="cert-date-val">{c.date}</div>
              </div>
              <div className="cert-actions">
                <button className="cert-btn-dl"><Download size={16}/></button>
                <button className="cert-btn-more"><MoreVertical size={16}/></button>
              </div>
            </div>
          ))}
          <button className="cert-load-more">Load More <ChevronDown size={14}/></button>
        </div>

        {/* Promo */}
        <div className="cert-promo">
          <div className="cert-promo-left">
            <div className="cert-promo-img">🏆</div>
            <div>
              <div className="cert-promo-title">Every certificate is a step towards your dream.</div>
              <div className="cert-promo-sub">Stay consistent, keep learning, and achieve excellence!</div>
            </div>
          </div>
          <button className="cert-promo-btn">Explore More Tests <ArrowRight size={14}/></button>
        </div>

      </div>

      {/* ─── RIGHT SIDEBAR ─── */}
      <div className="cert-sidebar">
        
        {/* Featured Certificate */}
        <div className="cert-card" style={{padding:16}}>
          <div className="cert-card-title">Featured Certificate 🪄</div>
          
          <div className="cert-preview-wrap">
            <div className="cert-preview" id="certificate-preview-node">
              <div className="cert-p-ribbon">🏅</div>
              <div className="cert-p-border"></div>
              <div className="cert-p-head">CERTIFICATE</div>
              <div className="cert-p-sub">OF EXCELLENCE</div>
              <div className="cert-p-desc">This is proudly presented to</div>
              <div className="cert-p-name">{user?.name || 'Nursing Student'}</div>
              <div className="cert-p-desc">for outstanding performance in</div>
              <div className="cert-p-score">NORCET 2025 - Grand Test Series<br/><span style={{fontSize:9, fontWeight:600, color:'#b45309'}}>Score: 186 / 200 (93%) | Rank: Top 5%</span></div>
              
              <div className="cert-p-foot">
                <div className="cert-p-sig">
                  <div className="cert-p-sig-img">M. Sharma</div>
                  <div className="cert-p-sig-lbl">Academic Head</div>
                </div>
                <div className="cert-p-badge">🎖️</div>
                <div className="cert-p-sig">
                  <div className="cert-p-sig-img">R. Kumar</div>
                  <div className="cert-p-sig-lbl">Director</div>
                </div>
              </div>
            </div>
          </div>

          <div className="cert-prev-actions">
            <button className="cert-pa-btn cert-pa-dl" onClick={downloadCertificate} disabled={isDownloading}>
              <Download size={14}/> {isDownloading ? 'Downloading...' : 'Download Certificate'}
            </button>
            <button className="cert-pa-btn cert-pa-sh"><Share2 size={14}/> Share Certificate</button>
          </div>
        </div>

        {/* Progress */}
        <div className="cert-card">
          <div className="cert-card-title" style={{marginBottom:8}}>
            Certificate Progress
            <div className="cert-prog-link">View All</div>
          </div>
          <div className="cert-prog-sub">Keep going! More achievements await you.</div>
          
          <div className="cert-prog-bar">
            <div className="cert-pb-track"><div className="cert-pb-fill" style={{width:'53%'}}></div></div>
            <div className="cert-pb-val">8 / 15</div>
          </div>
          
          <div className="cert-prog-foot">
            <div>You have earned 8 out of 15 possible certificates.</div>
            <div className="cert-prog-img">🏆</div>
          </div>
        </div>

        {/* Benefits */}
        <div className="cert-card">
          <div className="cert-card-title">Benefits of Certificates</div>
          <div className="cert-ben-list">
            <div className="cert-ben-item">
              <div className="cert-ben-icon blue"><Shield size={16}/></div>
              <div className="cert-ben-info">
                <div className="cert-ben-title">100% Verified</div>
                <div className="cert-ben-desc">All certificates are verified and trusted.</div>
              </div>
            </div>
            <div className="cert-ben-item">
              <div className="cert-ben-icon orange"><Target size={16}/></div>
              <div className="cert-ben-info">
                <div className="cert-ben-title">Boost Your Profile</div>
                <div className="cert-ben-desc">Add to your resume and impress recruiters.</div>
              </div>
            </div>
            <div className="cert-ben-item">
              <div className="cert-ben-icon purple"><TrendingUp size={16}/></div>
              <div className="cert-ben-info">
                <div className="cert-ben-title">Track Your Growth</div>
                <div className="cert-ben-desc">See your progress and celebrate milestones.</div>
              </div>
            </div>
            <div className="cert-ben-bg">📜</div>
          </div>
        </div>

      </div>
    </div>
  );
}
