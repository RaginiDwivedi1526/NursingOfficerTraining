import { Link } from 'react-router-dom';
import { CheckCircle, Video, BarChart3, BookOpen, Users, Headphones, Bot, ChevronRight, Star, Download, Globe, User, Stethoscope, Brain, Target, TrendingUp, CalendarCheck, NotebookPen, Rocket } from 'lucide-react';
import logo from '../assets/logo.png';

const INDIA_IMG = '/india_gate.png';
const LIBERTY_IMG = '/statue_of_liberty.png';

/* ─────────────────────────────────────
   DATA
───────────────────────────────────── */
const FEATURE_STRIP = [
  { icon: <Video size={20} />, label: 'Live Classes & Recordings' },
  { icon: <BarChart3 size={20} />, label: 'AI Performance Analytics' },
  { icon: <BookOpen size={20} />, label: '1M+ Questions & Mock Tests' },
  { icon: <Brain size={20} />, label: 'Personalized Study Plan' },
  { icon: <Users size={20} />, label: 'Expert Faculty Support' },
  { icon: <Headphones size={20} />, label: '24/7 Guide Support' },
];

const INSTITUTIONS = ['AIIMS', 'PGIMER', 'ESIC', 'Apollo', 'Fortis', 'MAX Hospitals', 'USA Hospitals', 'Canada Hospitals'];

const AI_FEATURES = [
  { icon: <Target size={18} color="#27ae60" />, title: 'Weak Topic Identification', desc: 'Pinpoints exactly where you lose marks' },
  { icon: <CalendarCheck size={18} color="#3498db" />, title: 'Personalized Study Plan', desc: 'AI-built daily schedule based on your gaps' },
  { icon: <TrendingUp size={18} color="#9b59b6" />, title: 'Predicted Exam Readiness', desc: 'Know your readiness score before exam day' },
  { icon: <Bot size={18} color="#f39c12" />, title: 'Daily Targets & Reminders', desc: 'Stay on track with intelligent nudges' },
];

const STATS = [
  { num: '25,000+', label: 'Students Trained' },
  { num: '1M+', label: 'Questions Practised' },
  { num: '95%', label: 'Success Rate' },
  { num: '500+', label: 'Live Classes / Month' },
  { num: '50+', label: 'Expert Faculty' },
  { num: '24/7', label: 'Support Available' },
];

const WHY_CARDS = [
  { icon: <Users size={22} color="#c0392b" />, bg: '#fff0f0', title: 'Expert Faculty', desc: "Learn from India's best nursing faculty" },
  { icon: <Bot size={22} color="#2980b9" />, bg: '#f0f7ff', title: 'AI Study Assistant', desc: 'Smart AI that guides you every step' },
  { icon: <BookOpen size={22} color="#27ae60" />, bg: '#f0fff5', title: 'Smart Test Series', desc: 'Exam-pattern based practice tests' },
  { icon: <Headphones size={22} color="#8e44ad" />, bg: '#f8f0ff', title: 'Personal Mentorship', desc: 'One-to-one guidance & support' },
  { icon: <Star size={22} color="#f39c12" />, bg: '#fffbf0', title: 'Affordable Plans', desc: 'Best quality education at affordable price' },
  { icon: <TrendingUp size={22} color="#16a085" />, bg: '#f0fffe', title: 'Proven Results', desc: 'Thousands of students already selected' },
];

const TESTIMONIALS = [
  { text: 'I cracked AIIMS Nursing Officer Exam in my first attempt. The AI Analysis helped me improve my weak topics!', name: 'Neha Sharma', role: 'AIIMS, Delhi', init: 'NS', color: '#c0392b' },
  { text: 'The best platform for NCLEX preparation. Highly recommended!', name: 'Aditi Verma', role: 'Nursing in USA', init: 'AV', color: '#2980b9' },
  { text: 'The test series and AI performance dashboard are game changers. Thank you for the support.', name: 'Ritika Patel', role: 'ESIC Hospital', init: 'RP', color: '#27ae60' },
  { text: 'Got selected in NORCET with AIR 128. The live classes and notes are the best. Highly satisfied!', name: 'Pooja Yadav', role: 'AIIMS, Rishikesh', init: 'PY', color: '#8e44ad' },
];

function LandingPage() {
  return (
    <div className="lp-root">

      {/* ── HERO ── */}
      <section className="lp-hero">
        <div className="lp-hero-inner">

          {/* Left */}
          <div className="lp-hero-left">
            <p className="lp-hero-tagline">One Platform. Two Career Paths.</p>
            <h1 className="lp-hero-h1">
              Your Nursing Career<br />
              <span className="lp-hero-accent">Starts Here</span>
            </h1>
            <p className="lp-hero-sub">
              India's most trusted platform for Nursing Officer Exams &amp; NCLEX preparation with AI-Powered learning, expert faculty and proven results.
            </p>

            <div className="lp-hero-avatars">
              <div className="lp-avatar-stack">
                {['NS','AV','RP','PY','KS'].map((i, idx) => (
                  <div className="lp-avatar" key={idx} style={{ background: ['#c0392b','#2980b9','#27ae60','#8e44ad','#f39c12'][idx], zIndex: 5 - idx }}>{i}</div>
                ))}
              </div>
              <div>
                <div className="lp-avatar-count">25,000+</div>
                <div className="lp-avatar-label">Students Already Trust Us</div>
              </div>
            </div>

            <div className="lp-hero-google">
              <div className="lp-google-icon">G</div>
              <div>
                <div className="lp-stars">★★★★★</div>
                <div className="lp-rating-label">4.6/5 &nbsp; Google Rating</div>
              </div>
            </div>

            <div className="lp-hero-btns">
              <Link to="/register" className="lp-btn-india"><Rocket size={15}/> Start Free Trial</Link>
              <Link to="/login" className="lp-btn-outline">Login →</Link>
            </div>
          </div>

          {/* Middle card — India */}
          <div className="lp-path-card lp-card-india">
            <div className="lp-card-badge lp-badge-green">● FOR NOW</div>
            <h2 className="lp-card-title">Nursing Officer<br/><span>(India)</span></h2>
            <p className="lp-card-sub">Prepare for Top Indian Nursing Officer Exams</p>
            <ul className="lp-card-list">
              {['AIIMS', 'NORCET', 'ESIC', 'RRB', 'State Nursing Exams'].map(e => (
                <li key={e}><CheckCircle size={14} color="#27ae60"/> {e}</li>
              ))}
            </ul>
            <div className="lp-card-img-wrap">
              <img src={INDIA_IMG} alt="India Gate" className="lp-card-img" onError={e => { e.target.style.display='none'; }}/>
            </div>
            <Link to="/india-preparation" className="lp-btn-india lp-card-btn" target="_blank" rel="noopener noreferrer">Start India Preparation →</Link>
          </div>

          {/* Right card — NCLEX */}
          <div className="lp-path-card lp-card-nclex">
            <div className="lp-card-badge lp-badge-blue">✈ FYI ABROAD</div>
            <h2 className="lp-card-title">NCLEX-RN<br/><span>(USA / Canada)</span></h2>
            <p className="lp-card-sub">Prepare for NCLEX-6 &amp; build your International Nursing Career</p>
            <ul className="lp-card-list">
              {['NCLEX-RN', 'USA', 'Canada', 'Global Opportunities'].map(e => (
                <li key={e}><CheckCircle size={14} color="#3498db"/> {e}</li>
              ))}
            </ul>
            <div className="lp-card-img-wrap">
              <img src={LIBERTY_IMG} alt="Statue of Liberty" className="lp-card-img" onError={e => { e.target.style.display='none'; }}/>
            </div>
            <Link to="/nclex-preparation" className="lp-btn-nclex lp-card-btn" target="_blank" rel="noopener noreferrer">Start NCLEX Preparation →</Link>
          </div>
        </div>
      </section>

      {/* ── FEATURE STRIP ── */}
      <div className="lp-feature-strip">
        {FEATURE_STRIP.map((f, i) => (
          <div className="lp-feature-strip-item" key={i}>
            <span className="lp-fstrip-icon">{f.icon}</span>
            <span>{f.label}</span>
          </div>
        ))}
      </div>

      {/* ── TRUSTED BY ── */}
      <div className="lp-trusted">
        <p className="lp-trusted-label">Trusted by Students. Recognised by Institutions.</p>
        <div className="lp-marquee-wrap">
          <div className="lp-marquee-track">
            {[...INSTITUTIONS, ...INSTITUTIONS].map((inst, i) => (
              <div className="lp-marquee-logo" key={i}>{inst}</div>
            ))}
          </div>
        </div>
      </div>

      {/* ── AI SECTION ── */}
      <section className="lp-ai-section" id="ai-dashboard">
        <div className="lp-ai-inner">
          <div className="lp-ai-left">
            <div className="lp-section-tag lp-tag-gold"><Bot size={13}/> SMART LEARNING WITH AI</div>
            <h2 className="lp-ai-h2">AI-Powered Learning.<br/>Real Results.</h2>
            <p className="lp-ai-desc">
              Our AI system analyses your performance in depth, identifies weak areas and helps you make personalised recommendations.
            </p>
            <ul className="lp-ai-list">
              {AI_FEATURES.map((f, i) => (
                <li key={i} className="lp-ai-list-item">
                  <span className="lp-ai-icon">{f.icon}</span>
                  <div><strong>{f.title}</strong><br/><span>{f.desc}</span></div>
                </li>
              ))}
            </ul>
            <Link to="/dashboard" className="lp-btn-india" style={{marginTop: 24, display:'inline-flex', alignItems:'center', gap:6}}>
              Explore AI Dashboard →
            </Link>
          </div>

          {/* Dashboard mockup */}
          <div className="lp-ai-right">
            <div className="lp-dashboard-mock">
              <div className="lp-dash-header">
                <div className="lp-dash-dots"><span/><span/><span/></div>
                <span className="lp-dash-title">Welcome back, Priya 👋</span>
              </div>
              <div className="lp-dash-body">
                <div className="lp-dash-cards-row">
                  <div className="lp-dash-mini-card">
                    <div className="lp-dash-mini-label">Overall Score</div>
                    <div className="lp-dash-ring-wrap">
                      <svg width="80" height="80" viewBox="0 0 80 80" style={{transform:'rotate(-90deg)'}}>
                        <circle cx="40" cy="40" r="32" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none"/>
                        <circle cx="40" cy="40" r="32" stroke="url(#dashGrad)" strokeWidth="8" fill="none" strokeDasharray="201" strokeDashoffset="54" strokeLinecap="round"/>
                        <defs><linearGradient id="dashGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#27ae60"/><stop offset="100%" stopColor="#f39c12"/></linearGradient></defs>
                      </svg>
                      <div className="lp-dash-ring-val">82%</div>
                    </div>
                  </div>
                  <div className="lp-dash-mini-card">
                    <div className="lp-dash-mini-label">Exam Readiness</div>
                    <div className="lp-dash-badge-high">High</div>
                    <div className="lp-dash-mini-sub">82%</div>
                  </div>
                  <div className="lp-dash-mini-card">
                    <div className="lp-dash-mini-label">Questions Attempted</div>
                    <div className="lp-dash-big-num">2,450</div>
                    <div className="lp-dash-mini-sub">78% Accuracy</div>
                  </div>
                </div>

                <div className="lp-dash-section-title">Weak Topics</div>
                {[
                  { label: 'Pharmacology', pct: 42, color: '#e74c3c' },
                  { label: 'Microbiology', pct: 58, color: '#e67e22' },
                  { label: 'Anatomy', pct: 76, color: '#27ae60' },
                  { label: 'Psychiatry', pct: 65, color: '#3498db' },
                ].map((t, i) => (
                  <div className="lp-dash-bar-row" key={i}>
                    <span className="lp-dash-bar-label">{t.label}</span>
                    <div className="lp-dash-bar-bg">
                      <div className="lp-dash-bar-fill" style={{ width: `${t.pct}%`, background: t.color }}/>
                    </div>
                    <span className="lp-dash-bar-pct">{t.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHOOSE YOUR PATH ── */}
      <section className="lp-paths-section">
        <div className="lp-section-header">
          <h2 className="lp-paths-h2">Choose Your Path. Achieve Your Dreams.</h2>
        </div>
        <div className="lp-paths-grid">
          <div className="lp-path-big lp-path-big-india">
            <div className="lp-path-big-left">
              <div className="lp-path-big-tag">India → Nursing Officer Exams</div>
              <p className="lp-path-big-desc">Government Jobs. Job Security. Respect.</p>
              <div className="lp-path-exam-list">
                {['AIIMS', 'NORCET', 'ESIC', 'RRB', 'State Exams'].map(e => <span key={e} className="lp-exam-pill">{e}</span>)}
              </div>
              <p className="lp-path-big-features">LIVE Classes • Test Series • PYQs • Notes • AI Analysis</p>
              <Link to="/register" className="lp-btn-india" style={{marginTop:16, display:'inline-flex', alignItems:'center', gap:6}}>
                Explore India Programs →
              </Link>
            </div>
            <div className="lp-path-big-nurse" style={{background:'linear-gradient(135deg,#0d2b5e,#163a7a)'}}>
              <div style={{fontSize:64}}>👩‍⚕️</div>
            </div>
          </div>

          <div className="lp-path-big lp-path-big-nclex">
            <div className="lp-path-big-left">
              <div className="lp-path-big-tag lp-tag-blue-soft">Abroad → NCLEX Preparation</div>
              <p className="lp-path-big-desc">Work in USA &amp; Canada. Global Opportunities.</p>
              <div className="lp-path-exam-list">
                {['NCLEX-RN', 'USA', 'Canada', 'Career Support'].map(e => <span key={e} className="lp-exam-pill lp-pill-blue">{e}</span>)}
              </div>
              <p className="lp-path-big-features">LIVE Classes • NCLEX QBank • Case Studies • AI Analysis</p>
              <Link to="/register" className="lp-btn-nclex" style={{marginTop:16, display:'inline-flex', alignItems:'center', gap:6}}>
                Explore NCLEX Programs →
              </Link>
            </div>
            <div className="lp-path-big-nurse" style={{background:'linear-gradient(135deg,#1a4a8a,#2471c8)'}}>
              <div style={{fontSize:64}}>👨‍⚕️</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ROW ── */}
      <div className="lp-stats-bar">
        {STATS.map((s, i) => (
          <div className="lp-stat-item" key={i}>
            <div className="lp-stat-num">{s.num}</div>
            <div className="lp-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── WHY STUDENTS LOVE ── */}
      <section className="lp-why-section">
        <div className="lp-section-header">
          <p className="lp-section-tag-plain">Why Students Love NursingOfficerTraining.com</p>
        </div>
        <div className="lp-why-grid">
          {WHY_CARDS.map((c, i) => (
            <div className="lp-why-card" key={i}>
              <div className="lp-why-icon" style={{background: c.bg}}>{c.icon}</div>
              <h4 className="lp-why-title">{c.title}</h4>
              <p className="lp-why-desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SUCCESS STORIES ── */}
      <section className="lp-testi-section">
        <div className="lp-section-header">
          <p className="lp-section-tag-plain">Success Stories That Inspire</p>
        </div>
        <div className="lp-testi-grid">
          {TESTIMONIALS.map((t, i) => (
            <div className="lp-testi-card" key={i}>
              <div className="lp-testi-stars">★★★★★</div>
              <p className="lp-testi-text">"{t.text}"</p>
              <div className="lp-testi-author">
                <div className="lp-testi-avatar" style={{background: t.color}}>{t.init}</div>
                <div>
                  <div className="lp-testi-name">{t.name}</div>
                  <div className="lp-testi-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── APP DOWNLOAD ── */}
      <section className="lp-app-section">
        <div className="lp-app-inner">
          <div className="lp-app-left">
            <h2 className="lp-app-h2">Learn Anytime, Anywhere!</h2>
            <p className="lp-app-sub">Download our App and take your preparation on the go.</p>
            <div className="lp-app-pills">
              {[
                {icon: <Video size={14}/>, label: 'Live Classes'},
                {icon: <BookOpen size={14}/>, label: 'Test Series'},
                {icon: <Bot size={14}/>, label: 'AI Analysis'},
                {icon: <NotebookPen size={14}/>, label: 'PDF Notes'},
              ].map((p,i) => <span key={i} className="lp-app-pill">{p.icon} {p.label}</span>)}
            </div>
            <div className="lp-app-store-btns">
              <a href="#" className="lp-store-btn">
                <span className="lp-store-icon">▶</span>
                <div><div className="lp-store-sub">Get it on</div><div className="lp-store-name">Google Play</div></div>
              </a>
              <a href="#" className="lp-store-btn">
                <span className="lp-store-icon lp-apple">⌘</span>
                <div><div className="lp-store-sub">Download on the</div><div className="lp-store-name">App Store</div></div>
              </a>
            </div>
          </div>
          <div className="lp-app-right">
            <div className="lp-qr-box">
              <div className="lp-qr-placeholder">
                <div style={{fontSize:48}}>📱</div>
                <div style={{fontSize:12,color:'#666',marginTop:8}}>QR Code<br/>Coming Soon</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="lp-cta-section">
        <div className="lp-cta-inner">
          <div className="lp-cta-left">
            <h2 className="lp-cta-h2">Ready to Start Your Journey?</h2>
            <p className="lp-cta-sub">Join thousands of aspiring nurses and take the first step towards your dream career.</p>
          </div>
          <div className="lp-cta-btns">
            <Link to="/india-preparation" className="lp-btn-india lp-cta-btn" target="_blank" rel="noopener noreferrer">Start India Preparation →</Link>
            <Link to="/nclex-preparation" className="lp-btn-nclex lp-cta-btn" target="_blank" rel="noopener noreferrer">Start NCLEX Preparation →</Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="lp-footer">
        <div className="lp-footer-top">
          <div className="lp-footer-brand">
            <img src={logo} alt="NursingOfficer Training" className="lp-footer-logo" />
            <p className="lp-footer-brand-desc">India's most trusted platform for Nursing Officer Exams &amp; NCLEX preparation with AI-Powered learning, expert faculty and proven results.</p>
            <div className="lp-footer-social">
              <a href="https://www.facebook.com/share/1DihgeCGnt/" target="_blank" rel="noopener noreferrer" className="lp-social-btn"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="lp-social-btn"><i className="fa-brands fa-instagram"></i></a>
              <a href="https://youtube.com/@dr.rajendrajinjwaria1845" target="_blank" rel="noopener noreferrer" className="lp-social-btn"><i className="fa-brands fa-youtube"></i></a>
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="lp-social-btn"><i className="fa-brands fa-whatsapp"></i></a>
            </div>
          </div>

          <div className="lp-footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/tests">Courses</Link></li>
              <li><Link to="/tests">Test Series</Link></li>
              <li><Link to="/dashboard">AI Dashboard</Link></li>
              <li><Link to="/dashboard">Results</Link></li>
              <li><Link to="/career">Contact Us</Link></li>
            </ul>
          </div>

          <div className="lp-footer-col">
            <h4>India Programs</h4>
            <ul>
              <li><Link to="/tests">AIIMS</Link></li>
              <li><Link to="/tests">NORCET</Link></li>
              <li><Link to="/tests">ESIC</Link></li>
              <li><Link to="/tests">RRB</Link></li>
              <li><Link to="/tests">State Exams</Link></li>
            </ul>
          </div>

          <div className="lp-footer-col">
            <h4>Abroad Programs</h4>
            <ul>
              <li><Link to="/tests">NCLEX-RN</Link></li>
              <li><Link to="/tests">USA</Link></li>
              <li><Link to="/tests">Canada</Link></li>
              <li><a href="#">Career Support</a></li>
            </ul>
          </div>

          <div className="lp-footer-col">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Doubt Support</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Refund Policy</a></li>
            </ul>
          </div>

          <div className="lp-footer-col">
            <h4>Contact Us</h4>
            <ul>
              <li><a href="tel:+911234567890">+91 12345-67890</a></li>
              <li><a href="mailto:support@nursingofficertraining.com">support@nursingofficer<br/>training.com</a></li>
              <li style={{color:'rgba(255,255,255,0.55)', fontSize:13, lineHeight:'1.5'}}>123, Medline Tower, Sector 12,<br/>Noida, Uttar Pradesh - 201301</li>
            </ul>
          </div>
        </div>

        <div className="lp-footer-bottom">
          <p>© 2024 NursingOfficerTraining.com | All Rights Reserved.</p>
        </div>
      </footer>

    </div>
  );
}

export default LandingPage;
