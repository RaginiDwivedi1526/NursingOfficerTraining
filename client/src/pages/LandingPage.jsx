import { Link } from 'react-router-dom';
import { Stethoscope, Rocket, Monitor, Trophy, Smartphone, ChevronRight, Bot, Video, NotebookPen, BarChart3, MessageCircle, GraduationCap, Target, TrendingUp, Brain, CalendarCheck, Sparkles, Zap, Star, CheckCircle2, MapPin, Mail, Send, Heart, Hospital, Globe, User } from 'lucide-react';

import logo from '../assets/logo.png';

function LandingPage() {
  return (
    <>
      {/* Announcement Bar */}
      <div className="announce-bar">
        <Sparkles size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Batch 2025 Registration Open — Early Bird Discount Available <span>Limited Seats</span>
      </div>

      {/* Hero */}
      <section className="landing-hero">
        <div className="hero-bg-pattern"></div>
        <div className="hero-floating-badges">
          <div className="floating-badge"><div className="dot"></div> 50+ Students Enrolled Today</div>
          <div className="floating-badge"><Trophy size={14} color="var(--gold)" /> #1 Nursing Exam Platform</div>
          <div className="floating-badge"><Smartphone size={14} /> Hindi + English Content</div>
        </div>
        <div className="hero-content">
          <div className="hero-badge"><Stethoscope size={14} /> India's Most Advanced Nursing Prep</div>
          <h1 className="hero-title">
            Crack Nursing Officer &amp;<br />
            <span className="highlight">NCLEX</span> Exams<br />
            with AI-Powered Training
          </h1>
          <p className="hero-sub">
            Live classes, recorded lectures, smart MCQ tests, and an AI system that detects your weak areas and builds a personalized study plan — all in one platform.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn-primary"><Rocket size={16} /> Start Free Trial</Link>
            <a href="#ai-dashboard" className="btn-secondary"><Monitor size={16} /> See AI Dashboard</a>
          </div>
          <div className="hero-stats">
            <div className="stat"><span className="stat-num">15,000+</span><span className="stat-label">Students Trained</span></div>
            <div className="stat"><span className="stat-num">92%</span><span className="stat-label">Selection Rate</span></div>
            <div className="stat"><span className="stat-num">500+</span><span className="stat-label">MCQ Tests</span></div>
          </div>
        </div>
      </section>

      {/* Badge Strip */}
      <div className="badge-strip">
        <div className="badge-track">
          {['AIIMS Delhi', 'ESIC Nursing', 'Railway Nursing', 'NCLEX-RN', 'NCLEX-PN', 'State PSC Nursing', 'Army Nursing', 'NHM Nursing',
            'AIIMS Delhi', 'ESIC Nursing', 'Railway Nursing', 'NCLEX-RN', 'NCLEX-PN', 'State PSC Nursing', 'Army Nursing', 'NHM Nursing'
          ].map((b, i) => <div className="badge-item" key={i}>{b}</div>)}
        </div>
      </div>

      {/* Features */}
      <section className="features-section" id="features">
        <div className="section-header center">
          <div className="section-tag">Why Choose Us</div>
          <h2 className="section-title">Everything You Need to<br />Ace Your Nursing Exam</h2>
          <p className="section-sub">A complete ecosystem for nursing aspirants — from learning to testing to getting selected.</p>
        </div>
        <div className="features-grid">
          {[
            { colorClass: 'f-purple', icon: <Bot size={28} color="white" strokeWidth={1.5} />, title: 'AI Performance Tracking', desc: 'Our AI engine analyzes every test attempt, identifies your weak topics, and generates a personalized improvement plan automatically.' },
            { colorClass: 'f-blue', icon: <Video size={28} color="white" strokeWidth={1.5} />, title: 'Live + Recorded Classes', desc: 'Attend live doubt-clearing sessions or watch recorded lectures at your own pace. Available in both Hindi and English.' },
            { colorClass: 'f-orange', icon: <NotebookPen size={28} color="white" strokeWidth={1.5} />, title: 'Smart MCQ Test Series', desc: '500+ topic-wise tests with auto-scoring, timers, and detailed explanations. Simulate real exam conditions daily.' },
            { colorClass: 'f-teal', icon: <BarChart3 size={28} color="white" strokeWidth={1.5} />, title: 'Progress Analytics Dashboard', desc: 'Visualize your week-by-week growth with charts, topic accuracy graphs, and rank comparisons.' },
            { colorClass: 'f-green', icon: <MessageCircle size={28} color="white" strokeWidth={1.5} />, title: 'WhatsApp Community', desc: 'Join an exclusive WhatsApp group for daily MCQs, announcements, and peer support.' },
            { colorClass: 'f-gold', icon: <GraduationCap size={28} color="white" strokeWidth={1.5} />, title: '1-on-1 Mentorship', desc: 'Book personal mentorship sessions with expert faculty. Get career guidance and interview preparation.' }
          ].map((f, i) => (
            <div className="feature-card" key={i}>
              <div className={`feature-icon ${f.colorClass}`}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Courses */}
      <section className="courses-section" id="courses">
        <div className="section-header">
          <div className="section-tag">Our Courses</div>
          <h2 className="section-title">Comprehensive Courses for<br />Every Nursing Aspirant</h2>
          <p className="section-sub">Structured programs covering all major nursing entrance exams in India and globally.</p>
        </div>
        <div className="courses-grid">
          {[
            { color: 'blue', badge: <><Zap size={12} /> Most Popular</>, icon: <Hospital size={48} color="white" />, title: 'Nursing Officer (Government)', desc: 'Complete preparation for AIIMS, ESIC, Railway, Army, NHM & State PSC exams.', meta: [<><NotebookPen size={12} /> 200+ Videos</>, <><CalendarCheck size={12} /> 6 Months</>, <><Target size={12} /> 300 Tests</>] },
            { color: 'red', badge: <><Globe size={12} /> International</>, icon: <Globe size={48} color="white" />, title: 'NCLEX-RN / NCLEX-PN Prep', desc: 'US-based NCLEX preparation with NGN format, clinical judgment modules & CAT simulation.', meta: [<><NotebookPen size={12} /> 150+ Videos</>, <><CalendarCheck size={12} /> 4 Months</>, <><Target size={12} /> 200 Tests</>] },
            { color: 'gold', badge: <><Star size={12} /> Pro Feature</>, icon: <Brain size={48} color="white" />, title: 'AI-Powered Full Combo', desc: 'Both courses combined with AI analytics, personalized study plan, daily MCQ alerts & mentor access.', meta: [<><NotebookPen size={12} /> 350+ Videos</>, <><CalendarCheck size={12} /> 12 Months</>, <><Bot size={12} /> AI Analytics</>] }
          ].map((c, i) => (
            <div className="course-card" key={i}>
              <div className={`course-img ${c.color}`}>
                <div className="course-badge-pill">{c.badge}</div>
                {c.icon}
              </div>
              <div className="course-body">
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <div className="course-meta">{c.meta.map((m, j) => <span className="meta-pill" key={j}>{m}</span>)}</div>
                <Link to="/register" className="course-btn">View Course <ChevronRight size={14} /></Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Dashboard Live Preview */}
      <section id="ai-dashboard" className="ai-analytics-section">
        <div className="ai-analytics-overlay"></div>
        <div className="ai-analytics-grid">
          <div>
            <div className="section-tag" style={{ background: 'rgba(243,156,18,0.2)', color: '#f9c74f', borderColor: 'rgba(243,156,18,0.3)' }}><Bot size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} /> AI-Powered Analytics</div>
            <h2 className="section-title" style={{ color: 'white' }}>Your Personal AI<br />Performance Coach</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: '1.7', maxWidth: '520px', marginBottom: '32px' }}>
              After every test, our AI engine analyzes your performance, detects weak areas, and gives you a step-by-step improvement plan.
            </p>
            {[
              { icon: <Target size={20} color="#f9c74f" />, title: 'Weakness Detection', desc: 'AI identifies which topics you struggle with based on test history.' },
              { icon: <TrendingUp size={20} color="#2ecc71" />, title: 'Progress Tracking', desc: 'See your week-by-week score improvement visually.' },
              { icon: <Brain size={20} color="#a78bfa" />, title: 'Smart Recommendations', desc: 'AI suggests which test to attempt next based on your weak areas.' },
              { icon: <CalendarCheck size={20} color="#f9c74f" />, title: 'Personalized Study Plan', desc: 'Premium users get AI-generated daily study roadmaps.', pro: true }
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '16px', marginBottom: '12px', transition: 'all 0.3s' }}>
                <span style={{ flexShrink: 0, display: 'flex' }}>{f.icon}</span>
                <div>
                  <h4 style={{ color: 'white', fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>
                    {f.title}
                    {f.pro && <span style={{ background: 'rgba(243,156,18,0.3)', color: '#f9c74f', fontSize: '10px', padding: '2px 8px', borderRadius: '50px', marginLeft: '6px', fontWeight: 700 }}>PRO</span>}
                  </h4>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', lineHeight: '1.5' }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Dashboard Mock */}
          <div className="ai-dashboard-preview">
            <div style={{ background: '#0d1e38', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }}></div>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }}></div>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }}></div>
              <span style={{ marginLeft: 10, color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>AI Performance Dashboard</span>
            </div>
            <div style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #c0392b, #e74c3c)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={18} color="white" />
                </div>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px', fontWeight: 600 }}>Priya Sharma</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px' }}>Nursing Officer Aspirant • Batch 2025</div>
                </div>
              </div>

              {/* Score Ring */}
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <svg width="110" height="110" viewBox="0 0 110 110" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="55" cy="55" r="45" stroke="rgba(255,255,255,0.08)" strokeWidth="10" fill="none" />
                  <circle cx="55" cy="55" r="45" stroke="url(#heroRingGrad)" strokeWidth="10" fill="none" strokeDasharray="282.6" strokeDashoffset="76.3" strokeLinecap="round" />
                  <defs><linearGradient id="heroRingGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#c0392b" /><stop offset="100%" stopColor="#f39c12" /></linearGradient></defs>
                </svg>
                <div style={{ position: 'relative', top: '-75px', marginBottom: '-60px' }}>
                  <div style={{ fontSize: '24px', fontWeight: 900, color: 'white', fontFamily: 'var(--font-display)' }}>72%</div>
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>Overall Score</div>
                </div>
              </div>

              {/* Topic bars */}
              {[
                { label: 'Anatomy', pct: 85, color: 'linear-gradient(90deg,#27ae60,#2ecc71)' },
                { label: 'Pharmacology', pct: 70, color: 'linear-gradient(90deg,#f39c12,#f1c40f)' },
                { label: 'Microbiology', pct: 40, color: 'linear-gradient(90deg,#c0392b,#e74c3c)', weak: true },
                { label: 'Nursing Proc', pct: 52, color: 'linear-gradient(90deg,#e67e22,#e74c3c)', weak: true }
              ].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ color: t.weak ? '#ff8a7a' : 'rgba(255,255,255,0.7)', fontSize: '11px', width: 100, flexShrink: 0 }}>{t.label}</span>
                  <div style={{ flex: 1, height: 8, background: 'rgba(255,255,255,0.08)', borderRadius: 50, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${t.pct}%`, background: t.color, borderRadius: 50 }}></div>
                  </div>
                  <span style={{ color: t.weak ? '#ff8a7a' : 'rgba(255,255,255,0.7)', fontSize: '11px', fontWeight: 600, width: 32, textAlign: 'right' }}>{t.pct}%</span>
                </div>
              ))}

              {/* AI Box */}
              <div style={{ background: 'rgba(243,156,18,0.1)', border: '1px solid rgba(243,156,18,0.3)', borderRadius: '10px', padding: '12px', margin: '16px 0 12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <Bot size={14} color="#f9c74f" />
                  <span style={{ fontSize: '11px', color: '#f9c74f', fontWeight: 700 }}>AI Suggestion</span>
                </div>
                <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '11px', lineHeight: '1.5' }}>
                  You are weak in Microbiology (infection control). Revise 3 chapters and attempt 20 MCQs daily for next 7 days.
                </div>
              </div>

              {/* Suggestions */}
              {[
                { icon: <NotebookPen size={12} color="rgba(255,255,255,0.6)" />, text: 'Revise: Microbiology – Infection Control' },
                { icon: <Target size={12} color="rgba(255,255,255,0.6)" />, text: 'Practice: 20 MCQs daily' },
                { icon: <Video size={12} color="rgba(255,255,255,0.6)" />, text: 'Watch: Recorded Lecture 3' }
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '8px 10px', marginBottom: '6px' }}>
                  {s.icon}
                  <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '11px' }}>{s.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="pricing-section" id="pricing">
        <div className="section-header center">
          <div className="section-tag">Pricing Plans</div>
          <h2 className="section-title">Simple, Transparent Pricing</h2>
          <p className="section-sub">Choose the plan that fits your preparation stage.</p>
        </div>
        <div className="pricing-grid">
          {[
            { tier: 'Starter', name: 'Free Plan', price: '0', per: '/forever', features: ['10 MCQ tests per month', 'Basic performance chart', '2 recorded lectures'], noFeatures: ['AI analysis', 'Live classes', 'Mentorship'] },
            { tier: 'Basic', name: 'Basic Plan', price: '999', per: '/month', features: ['Unlimited MCQ tests', 'All recorded lectures', 'PDF materials', 'Basic AI analysis'], noFeatures: ['Live classes', 'Mentorship'] },
            { tier: 'Standard', name: 'Standard Plan', price: '1,999', per: '/month', featured: true, features: ['Everything in Basic', 'Live class access', 'Full AI analytics', 'Weekly progress reports', 'WhatsApp community', 'Doubt solving'], noFeatures: ['Personal mentorship'] },
            { tier: 'Pro', name: 'Pro Mentorship', price: '4,999', per: '/month', features: ['Everything in Standard', '1-on-1 mentorship', 'Personalized study plan', 'Interview preparation', 'AI doubt solver', 'Priority support', 'Job guidance'], noFeatures: [] }
          ].map((p, i) => (
            <div className={`price-card ${p.featured ? 'featured' : ''}`} key={i}>
              {p.featured && <div className="featured-pill"><Star size={10} /> MOST POPULAR</div>}
              <div className="price-tier">{p.tier}</div>
              <h3>{p.name}</h3>
              <div className="price-amount"><span className="currency">₹</span>{p.price}<span className="per">{p.per}</span></div>
              <div className="price-divider"></div>
              <ul className="price-features">
                {p.features.map((f, j) => <li key={j}>{f}</li>)}
                {p.noFeatures.map((f, j) => <li key={`no-${j}`} className="no">{f}</li>)}
              </ul>
              <Link to="/register" className="price-btn">{p.price === '0' ? 'Get Started Free' : `Choose ${p.tier}`}</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="section-header center">
          <div className="section-tag">Success Stories</div>
          <h2 className="section-title">Students Who Got Selected</h2>
          <p className="section-sub">Real students, real results.</p>
        </div>
        <div className="testi-grid">
          {[
            { badge: <><CheckCircle2 size={12} /> AIIMS Delhi Selected</>, text: 'The AI weakness detection changed my preparation completely. My score jumped from 52% to 81% in 6 weeks.', name: 'Priya Sharma', role: 'Nursing Officer — AIIMS Delhi', color: 'linear-gradient(135deg,var(--navy),var(--navy-light))', avatar: <User size={18} color="white" /> },
            { badge: <><CheckCircle2 size={12} /> NCLEX-RN Passed</>, text: 'Hindi explanations for NCLEX topics made a huge difference. Cleared in first attempt!', name: 'Rahul Verma', role: 'RN — Working in USA', color: 'linear-gradient(135deg,var(--crimson),#e74c3c)', avatar: <User size={18} color="white" /> },
            { badge: <><CheckCircle2 size={12} /> ESIC Nursing Selected</>, text: 'The personalized study plan in Pro Mentorship was worth every rupee. Got selected in 3 months.', name: 'Kavita Singh', role: 'Staff Nurse — ESIC Hospital', color: 'linear-gradient(135deg,#27ae60,#2ecc71)', avatar: <User size={18} color="white" /> }
          ].map((t, i) => (
            <div className="testi-card" key={i}>
              <div className="testi-exam-badge">{t.badge}</div>
              <div className="testi-stars">★★★★★</div>
              <div className="testi-quote">"</div>
              <p className="testi-text">{t.text}</p>
              <div className="testi-author">
                <div className="testi-avatar" style={{ background: t.color }}>{t.avatar}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="contact-section" id="contact">
        <div className="contact-layout">
          <div className="contact-info">
            <div className="section-tag" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)', borderColor: 'rgba(255,255,255,0.2)' }}>Get In Touch</div>
            <h2 className="section-title">Start Your Nursing<br />Officer Journey Today</h2>
            <p className="section-sub">Have questions? Our team responds within 2 hours.</p>
            <div className="contact-links">
              <a href="https://wa.me/919999999999" className="contact-link"><MessageCircle size={18} color="rgba(255,255,255,0.8)" /> WhatsApp: +91 99999 99999</a>
              <a href="mailto:info@nursingofficertraining.com" className="contact-link"><Mail size={18} color="rgba(255,255,255,0.8)" /> info@nursingofficertraining.com</a>
              <a href="#" className="contact-link"><MapPin size={18} color="rgba(255,255,255,0.8)" /> India (Pan-India Online Classes)</a>
            </div>
          </div>
          <div className="contact-form-wrap">
            <h3>Enroll / Enquire Now</h3>
            <div className="form-row">
              <div className="form-group"><label>Full Name</label><input type="text" placeholder="Your name" /></div>
              <div className="form-group"><label>Phone Number</label><input type="tel" placeholder="+91 XXXXX XXXXX" /></div>
            </div>
            <div className="form-group"><label>Email</label><input type="email" placeholder="you@example.com" /></div>
            <div className="form-group">
              <label>Interested In</label>
              <select>
                <option>Nursing Officer (Government) Course</option>
                <option>NCLEX-RN Preparation</option>
                <option>NCLEX-PN Preparation</option>
                <option>AI-Powered Combo Course</option>
                <option>Pro Mentorship Plan</option>
              </select>
            </div>
            <div className="form-group"><label>Your Message</label><textarea placeholder="Any questions..."></textarea></div>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '15px', border: 'none' }} onClick={() => alert('Thank you! Our team will contact you within 2 hours.')}>
              <Send size={16} /> Submit Enquiry
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="nav-logo" style={{ marginBottom: 4 }}>
              <img src={logo} alt="NursingOfficer Training" className="nav-logo-img" style={{ height: '60px' }} />
            </div>
            <p>India's most advanced AI-powered nursing exam preparation platform.</p>
            <div className="footer-social">
              <a href="https://www.facebook.com/share/1DihgeCGnt/" target="_blank" rel="noopener noreferrer" className="social-btn"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="https://www.linkedin.com/in/dr-rajendra-jinjwaria-phd-rn🥇gold-medalist-🥇matron-nia-076152103?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="social-btn"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href="https://youtube.com/@dr.rajendrajinjwaria1845?si=sHu5Gwy_6jILnxBd" target="_blank" rel="noopener noreferrer" className="social-btn"><i className="fa-brands fa-youtube"></i></a>
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="social-btn"><i className="fa-brands fa-whatsapp"></i></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Courses</h4>
            <ul className="footer-links">
              <li><a href="#courses">Nursing Officer Prep</a></li>
              <li><a href="#courses">NCLEX-RN</a></li>
              <li><a href="#courses">NCLEX-PN</a></li>
              <li><a href="#courses">Combo Course</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Platform</h4>
            <ul className="footer-links">
              <li><a href="#ai-dashboard">AI Analytics</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <ul className="footer-links">
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#">WhatsApp Help</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Use</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 NursingOfficerTraining.com • All rights reserved • Powered by Razorpay</p>
        </div>
      </footer>
    </>
  );
}

export default LandingPage;
