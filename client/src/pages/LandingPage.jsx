import { Link } from 'react-router-dom';
import { CheckCircle, Video, BarChart3, BookOpen, Users, Headphones, Bot, ChevronRight, Star, Download, Globe, User, Stethoscope, Brain, Target, TrendingUp, CalendarCheck, NotebookPen, Rocket, Award, FlaskConical, GraduationCap, Microscope, ShieldCheck, Plane, MapPin, HeartPulse, Siren, Scissors } from 'lucide-react';
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

const WHY_JOIN_FEATURES = [
  { icon: <Brain size={22} color="#fff" />, bg: 'linear-gradient(135deg,#c0392b,#e74c3c)', title: 'Experience-Based Learning', desc: '15+ years of real clinical, teaching & government nursing experience brought into every lesson.' },
  { icon: <Target size={22} color="#fff" />, bg: 'linear-gradient(135deg,#0d2b5e,#1a4a8a)', title: 'Exam-Focused Strategy', desc: 'High-yield topics, PYQ analysis, exam-pattern tests and proven strategies to maximise your score.' },
  { icon: <ShieldCheck size={22} color="#fff" />, bg: 'linear-gradient(135deg,#27ae60,#16a085)', title: 'Concept + Clinical Reasoning', desc: 'Not just memorisation — learn the "why" behind every answer for lasting retention.' },
  { icon: <Plane size={22} color="#fff" />, bg: 'linear-gradient(135deg,#8e44ad,#6c3483)', title: 'Indian & International Pathways', desc: 'One mentor, multiple destinations — AIIMS, NORCET, NCLEX-RN, DHA, SNB and beyond.' },
  { icon: <FlaskConical size={22} color="#fff" />, bg: 'linear-gradient(135deg,#d35400,#e67e22)', title: 'Research-Backed Teaching', desc: 'Lessons enriched by RCTs, validated assessment tools and published international research.' },
  { icon: <Users size={22} color="#fff" />, bg: 'linear-gradient(135deg,#2980b9,#3498db)', title: 'Continuous Mentorship', desc: 'Personal doubt resolution, mock tests, performance tracking and career guidance — all in one place.' },
];

const MENTOR_ACHIEVEMENTS = [
  { emoji: '🥇', label: 'Gold Medalist' },
  { emoji: '🎓', label: 'PhD — BHU, 1st Rank' },
  { emoji: '🎓', label: 'MSc — KGMU, 1st Rank' },
  { emoji: '🎓', label: 'GNM — 1st Rank' },
  { emoji: '🌎', label: 'RN — USA (Illinois)' },
  { emoji: '🌎', label: 'RN — Canada & India' },
  { emoji: '🩺', label: 'NCLEX-RN Qualified' },
  { emoji: '📝', label: 'OET Qualified' },
  { emoji: '🏥', label: '15+ Yrs Govt Experience' },
  { emoji: '🪖', label: 'BSF Sub-Inspector / Staff Nurse' },
  { emoji: '🏛️', label: 'Former Matron — NIA Panchkula' },
  { emoji: '🔬', label: 'RCT Researcher & PhD Guide' },
];

const INDIA_EXAMS = ['AIIMS CRE', 'NORCET', 'ESIC', 'RRB', 'JIPMER', 'NIMHANS', 'State Exams', 'MNS', 'Paramilitary'];
const INTL_EXAMS  = ['NCLEX-RN', 'CBT', 'UAE DHA', 'UAE DOH', 'UAE MOHAP', 'Singapore SNB'];

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
            <h2 className="lp-card-title">Competitive Nursing<br/><span>Exams (India)</span></h2>
            <p className="lp-card-sub">Prepare for Top Indian Nursing Officer, SNO | ANS, Clinical Instructor &amp; Assistant Professor Exams</p>
            <ul className="lp-card-list lp-card-list-india">
              <li><CheckCircle size={13} color="#27ae60"/> <strong>AIIMS CRE &amp; NORCET</strong></li>
              <li><CheckCircle size={13} color="#27ae60"/> <strong>ESIC &nbsp;•&nbsp; RRB &nbsp;•&nbsp; JIPMER &nbsp;•&nbsp; NIMHANS &nbsp;•&nbsp; CHO</strong></li>
              <li><CheckCircle size={13} color="#27ae60"/> <strong>State Exams</strong> — SGPGI, GMCH, RML, KGMU, RUHS, RGUHS, ISRO…</li>
              <li><CheckCircle size={13} color="#27ae60"/> <strong>Military Nursing (MNS)</strong></li>
              <li><CheckCircle size={13} color="#27ae60"/> <strong>Paramilitary</strong> — BSF, ITBP, CRPF, SSB, CISF</li>
            </ul>
            <div className="lp-card-img-wrap">
              <img src={INDIA_IMG} alt="India Gate" className="lp-card-img" onError={e => { e.target.style.display='none'; }}/>
            </div>
            <Link to="/india-preparation" className="lp-btn-india lp-card-btn" target="_blank" rel="noopener noreferrer">Start India Preparation →</Link>
          </div>

          {/* Right card — NCLEX */}
          <div className="lp-path-card lp-card-nclex">
            <div className="lp-card-badge lp-badge-blue">✈ FYI ABROAD</div>
            <h2 className="lp-card-title">Global Nursing<br/><span>Opportunities</span></h2>
            <p className="lp-card-sub">Prepare for NCLEX-RN &amp; build your International Nursing Career</p>
            <ul className="lp-card-list lp-card-list-intl">
              <li><CheckCircle size={14} color="#3498db"/> <strong>NCLEX-RN</strong> — USA / Canada / Australia</li>
              <li><CheckCircle size={14} color="#3498db"/> <strong>CBT</strong> — UK / New Zealand</li>
              <li><CheckCircle size={14} color="#3498db"/> <strong>UAE Nursing Exams</strong> — DHA / DOH / MOHAP</li>
              <li><CheckCircle size={14} color="#3498db"/> <strong>Singapore Nursing</strong> — SNB</li>
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



      {/* ── STATS ROW ── */}
      <div className="lp-stats-bar">
        {STATS.map((s, i) => (
          <div className="lp-stat-item" key={i}>
            <div className="lp-stat-num">{s.num}</div>
            <div className="lp-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── WHY JOIN US ── */}
      <section className="lp-wj-section" id="why-join-us">
        <div className="lp-wj-inner">
          <div className="lp-wj-header">
            <div className="lp-section-tag lp-tag-gold"><Star size={13}/> WHY JOIN US</div>
            <h2 className="lp-wj-h2">Learn From Experience.<br/><span className="lp-wj-accent">Prepare With Confidence.</span></h2>
            <p className="lp-wj-sub">Build Your Nursing Future with a mentor who has lived every role — clinician, educator, researcher and government officer.</p>
          </div>

          <div className="lp-wj-grid">
            {WHY_JOIN_FEATURES.map((f, i) => (
              <div className="lp-wj-card" key={i}>
                <div className="lp-wj-icon" style={{background: f.bg}}>{f.icon}</div>
                <h4 className="lp-wj-card-title">{f.title}</h4>
                <p className="lp-wj-card-desc">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="lp-wj-pathways">
            <div className="lp-wj-pathway-col">
              <div className="lp-wj-pathway-label"><span>🇮🇳</span> Indian Nursing Exams</div>
              <div className="lp-wj-pills">
                {INDIA_EXAMS.map(e => <span key={e} className="lp-wj-pill lp-wj-pill-india">{e}</span>)}
              </div>
            </div>
            <div className="lp-wj-pathway-divider"/>
            <div className="lp-wj-pathway-col">
              <div className="lp-wj-pathway-label"><span>🌎</span> International Pathways</div>
              <div className="lp-wj-pills">
                {INTL_EXAMS.map(e => <span key={e} className="lp-wj-pill lp-wj-pill-intl">{e}</span>)}
              </div>
            </div>
          </div>

          <div className="lp-wj-cta">
            <Link to="/register" className="lp-btn-india" style={{display:'inline-flex',alignItems:'center',gap:8}}>
              <Rocket size={16}/> Start Your Journey Today
            </Link>
            <p className="lp-wj-cta-note">One Mentor • One Platform • Multiple Exam Pathways</p>
          </div>
        </div>
      </section>

      {/* ── MENTOR SECTION ── */}
      <section className="lp-mentor-section" id="mentor">
        <div className="lp-mentor-inner">

          {/* Left — Avatar & Key Badges */}
          <div className="lp-mentor-left">
            <div className="lp-mentor-avatar-ring">
              <div className="lp-mentor-avatar-outer">
                <img
                  src="/mentor's pic.jpeg"
                  alt="Dr. Rajendra Kumar Jinjwaria"
                  className="lp-mentor-avatar"
                  style={{ objectFit: 'cover', objectPosition: 'top' }}
                />
              </div>
              <div className="lp-mentor-gold-badge">🥇 Gold Medalist</div>
            </div>

            <h3 className="lp-mentor-name">Dr. Rajendra Kumar Jinjwaria</h3>
            <p className="lp-mentor-creds">PhD, MSN, RN</p>
            <p className="lp-mentor-tagline">Nurse Educator • Researcher • Clinical Mentor</p>

            <div className="lp-mentor-flags">
              <span className="lp-mentor-flag">🇮🇳 India</span>
              <span className="lp-mentor-flag">🇺🇸 USA</span>
              <span className="lp-mentor-flag">🇨🇦 Canada</span>
            </div>

            <div className="lp-mentor-exp-badge">
              <span className="lp-mentor-exp-num">15+</span>
              <span className="lp-mentor-exp-label">Years of Government &amp;<br/>Clinical Experience</span>
            </div>
          </div>

          {/* Right — Bio & Achievements */}
          <div className="lp-mentor-right">
            <div className="lp-mentor-bio-header">
              <div className="lp-section-tag lp-tag-gold"><Award size={13}/> MEET YOUR MENTOR</div>
              <h2 className="lp-mentor-h2">Why Learn From<br/><span className="lp-mentor-accent">Dr. Jinjwaria?</span></h2>
            </div>

            <p className="lp-mentor-bio">
              Dr. Rajendra Kumar Jinjwaria is an experienced nursing professional, educator and researcher with
              15+ years of government and tertiary-care nursing experience. His professional journey includes
              working as a <strong>Nursing Officer, Nursing Supervisor, Nursing Tutor, Clinical Instructor,
              Researcher, Matron</strong> and <strong>BSF Sub-Inspector / Staff Nurse</strong>, giving him a
              unique understanding of clinical practice, nursing examinations, teaching, leadership and
              professional growth.
            </p>

            <div className="lp-mentor-achievements">
              {MENTOR_ACHIEVEMENTS.map((a, i) => (
                <div className="lp-mentor-ach-chip" key={i}>
                  <span className="lp-ach-emoji">{a.emoji}</span>
                  <span className="lp-ach-label">{a.label}</span>
                </div>
              ))}
            </div>

            <div className="lp-mentor-clinical">
              <div className="lp-mentor-clinical-title">Clinical Expertise</div>
              <div className="lp-mentor-clinical-chips">
                {['Critical Care', 'ICU', 'Emergency & Trauma', 'Operating Room', 'Neurosurgery',
                  'Orthopaedics', 'CTVS ICU', 'Cardiac Cath Lab', 'Medical-Surgical', 'Nursing Administration'
                ].map(s => <span key={s} className="lp-mentor-clin-chip">{s}</span>)}
              </div>
            </div>

            <div className="lp-mentor-approach">
              <div className="lp-mentor-approach-title">🎯 More Than Lectures — A Complete Mentoring Approach</div>
              <p className="lp-mentor-approach-desc">
                At JINA, preparation is built around <strong>strong concepts, clinical reasoning, high-yield
                practice, examination strategy, mock testing</strong> and <strong>continuous mentorship</strong>.
              </p>
              <div className="lp-mentor-approach-tags">
                {['Strong Concepts','Clinical Reasoning','High-Yield Practice','Exam Strategy','Mock Testing','Continuous Mentorship'].map(t => (
                  <span key={t} className="lp-mentor-atag"><CheckCircle size={12} color="#27ae60"/> {t}</span>
                ))}
              </div>
            </div>

            <div className="lp-mentor-cta">
              <Link to="/register" className="lp-btn-india" style={{display:'inline-flex',alignItems:'center',gap:8}}>
                <Rocket size={15}/> Start Learning with Dr. Jinjwaria
              </Link>
              <p className="lp-mentor-disclaimer">
                * 100% Passing Guarantee is subject to official eligibility, participation and refund terms and conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

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
