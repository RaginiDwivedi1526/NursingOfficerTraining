import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import {
  BookOpen, BarChart3, Video, Brain, Users, Headphones, Star,
  CheckCircle, Phone, Mail, MapPin, Target, TrendingUp,
  CalendarCheck, Zap, Globe, Download, Smartphone, Award,
  PlayCircle, MessageCircle, ArrowRight, FileText, Clock,
  Shield, GraduationCap, Stethoscope, ClipboardList, Trophy,
  Bookmark, PenTool, Layers, Activity
} from 'lucide-react';

/* ─── DATA ──────────────────────────────────────── */
const NAV_LINKS = ['Home', 'Courses', 'Test Series', 'Live Classes', 'QBank', 'Resources', 'Results', 'Contact'];

const EXAMS_COVERED = [
  { name: 'AIIMS NORCET', icon: <Stethoscope size={24} />, desc: 'All India Institute of Medical Sciences Nursing Officer Recruitment', color: '#7c3aed' },
  { name: 'ESIC', icon: <Shield size={24} />, desc: 'Employees State Insurance Corporation Nursing Exam', color: '#2563eb' },
  { name: 'RRB', icon: <ClipboardList size={24} />, desc: 'Railway Recruitment Board Staff Nurse Exam', color: '#059669' },
  { name: 'PGIMER', icon: <GraduationCap size={24} />, desc: 'Post Graduate Institute of Medical Education & Research', color: '#d97706' },
  { name: 'JIPMER', icon: <Activity size={24} />, desc: 'Jawaharlal Institute of Postgraduate Medical Education', color: '#dc2626' },
  { name: 'State Nursing', icon: <Layers size={24} />, desc: 'UP, MP, Rajasthan, Bihar & All State Level Nursing Exams', color: '#0891b2' },
];

const FEATURES = [
  { icon: <FileText size={28} />, title: 'Test Series', desc: '500+ topic-wise & full-length mock tests for all major exams', color: '#7c3aed' },
  { icon: <BookOpen size={28} />, title: 'Question Bank', desc: '1 Lakh+ MCQs covering all nursing subjects with detailed explanations', color: '#2563eb' },
  { icon: <Video size={28} />, title: 'Live Classes', desc: 'Daily interactive classes by expert nursing faculty', color: '#059669' },
  { icon: <Brain size={28} />, title: 'AI Analytics', desc: 'Smart performance tracking with weakness identification', color: '#d97706' },
  { icon: <PenTool size={28} />, title: 'Previous Year Papers', desc: 'Solved papers from AIIMS, ESIC, RRB & all major exams', color: '#dc2626' },
  { icon: <CalendarCheck size={28} />, title: 'Study Planner', desc: 'Personalised daily study schedule based on your exam date', color: '#0891b2' },
];

const STATS = [
  { num: '25,000+', label: 'Students Trained' },
  { num: '1 Lakh+', label: 'Questions Available' },
  { num: '92%', label: 'Selection Rate' },
  { num: '500+', label: 'Mock Tests' },
  { num: '50+', label: 'Expert Faculty' },
];

const COURSES = [
  {
    name: 'Free Plan',
    price: '₹0',
    period: '',
    color: '#64748b',
    tag: null,
    features: ['10 Free Mock Tests', 'Basic Question Bank', 'Daily Quiz', 'Community Access'],
  },
  {
    name: 'Standard',
    price: '₹999',
    period: '/ 3 Months',
    color: '#2563eb',
    tag: null,
    features: ['200+ Mock Tests', 'Full Question Bank', 'Previous Year Papers', 'Performance Reports', 'Study Planner'],
  },
  {
    name: 'Pro',
    price: '₹1,999',
    period: '/ 6 Months',
    color: '#7c3aed',
    tag: 'MOST POPULAR',
    features: ['All Mock Tests', 'Live Classes', 'Full Question Bank', 'AI Performance Analytics', 'Doubt Clearing Sessions', 'Study Material PDFs'],
  },
  {
    name: 'Ultimate',
    price: '₹3,499',
    period: '/ 12 Months',
    color: '#d97706',
    tag: null,
    features: ['Everything in Pro', '1-on-1 Mentorship', 'Interview Preparation', 'Job Placement Support', 'Lifetime Access to Updates', 'Certificate on Completion'],
  },
];

const TESTIMONIALS = [
  { name: 'Priya Sharma', exam: 'AIIMS NORCET', text: 'I cleared AIIMS NORCET in my first attempt! The mock tests and study materials were exactly what I needed. The AI analytics helped me focus on my weak areas.', stars: 5, avatar: 'https://i.pravatar.cc/80?img=32' },
  { name: 'Rahul Kumar', exam: 'ESIC Staff Nurse', text: 'The question bank is incredible — so many questions with detailed explanations. Live classes by expert faculty made complex topics easy to understand.', stars: 5, avatar: 'https://i.pravatar.cc/80?img=33' },
  { name: 'Sneha Patel', exam: 'RRB Staff Nurse', text: 'Thanks to the previous year papers and mock tests, I scored in the top 100 in RRB exam. The study planner kept me disciplined throughout my preparation.', stars: 5, avatar: 'https://i.pravatar.cc/80?img=25' },
  { name: 'Amit Singh', exam: 'PGIMER', text: 'Best platform for nursing exam preparation. The faculty is knowledgeable and the doubt clearing sessions were extremely helpful. Highly recommended!', stars: 5, avatar: 'https://i.pravatar.cc/80?img=52' },
];

const FOOTER_LINKS = {
  'Test Series': ['AIIMS NORCET', 'ESIC', 'RRB Staff Nurse', 'PGIMER', 'JIPMER', 'State Nursing'],
  Resources: ['Study Materials', 'Previous Year Papers', 'Nursing Blog', 'Free Quizzes', 'Downloads'],
  Company: ['About Us', 'Our Faculty', 'Careers', 'Contact Us'],
  Support: ['Help Center', 'FAQ', 'Doubt Support', 'Terms & Conditions', 'Privacy Policy'],
};

const WEAK_TOPICS = [
  { name: 'Pharmacology', pct: 62, color: '#ef4444' },
  { name: 'Medical Surgical', pct: 85, color: '#22c55e' },
  { name: 'Community Health', pct: 71, color: '#f59e0b' },
  { name: 'OBG Nursing', pct: 78, color: '#8b5cf6' },
  { name: 'Pediatric Nursing', pct: 66, color: '#06b6d4' },
];

/* ─── CIRCULAR PROGRESS ──────────────────────── */
function CircularProgress({ value, color, size }) {
  const s = size || 90;
  const r = (s - 14) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;
  return (
    <svg width={s} height={s}>
      <circle cx={s / 2} cy={s / 2} r={r} fill="none" stroke="#f0e6f6" strokeWidth={9} />
      <circle
        cx={s / 2} cy={s / 2} r={r}
        fill="none" stroke={color} strokeWidth={9}
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${s / 2} ${s / 2})`}
        style={{ transition: 'stroke-dasharray 1.2s ease' }}
      />
      <text x="50%" y="50%" textAnchor="middle" dy=".35em" fontSize={15} fontWeight="800" fill="#2d1b4e">{value}%</text>
    </svg>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────── */
export default function IndiaPreparationPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="india-prep-page" style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", color: '#2d1b4e', overflowX: 'hidden' }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

      {/* ══ NAVBAR ══════════════════════════════════════ */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.95)',
        boxShadow: scrolled ? '0 2px 24px rgba(124,58,237,.12)' : '0 1px 0 #ede6f6',
        transition: 'all .3s', backdropFilter: 'blur(12px)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', height: 66 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src={logo} alt="NursingOfficer Training" style={{ height: 42, objectFit: 'contain' }} onError={e => { e.target.style.display = 'none'; }} />
          </div>

          <ul className="india-nav-links" style={{ display: 'flex', gap: 26, listStyle: 'none', margin: 0, padding: 0 }}>
            {NAV_LINKS.map(l => (
              <li key={l}>
                <a href="#" style={{ fontSize: 13.5, fontWeight: 500, color: '#4a3560', textDecoration: 'none', transition: 'color .2s' }}
                  onMouseEnter={e => e.target.style.color = '#7c3aed'}
                  onMouseLeave={e => e.target.style.color = '#4a3560'}>{l}</a>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Link to="/login" style={{ padding: '8px 20px', borderRadius: 8, border: '1.5px solid #d8cfe6', fontSize: 13.5, fontWeight: 600, color: '#4a3560', textDecoration: 'none', transition: 'all .2s' }}
              onMouseEnter={e => { e.target.style.borderColor = '#7c3aed'; e.target.style.color = '#7c3aed'; }}
              onMouseLeave={e => { e.target.style.borderColor = '#d8cfe6'; e.target.style.color = '#4a3560'; }}>Login</Link>
            <Link to="/register" style={{ padding: '8px 20px', borderRadius: 8, background: 'linear-gradient(135deg,#7c3aed,#6d28d9)', fontSize: 13.5, fontWeight: 700, color: '#fff', textDecoration: 'none', boxShadow: '0 4px 14px rgba(124,58,237,.35)', transition: 'transform .2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}>Enroll Now</Link>
          </div>
        </div>
      </nav>

      {/* ══ HERO ════════════════════════════════════════ */}
      <section style={{
        minHeight: '100vh', paddingTop: 80,
        background: 'linear-gradient(160deg, #f0e6ff 0%, #e8dff7 25%, #dde8fc 50%, #e6dff8 75%, #f5f0ff 100%)',
        display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative blobs */}
        <div style={{ position: 'absolute', top: -120, right: -120, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', width: '100%' }}>
          {/* Left */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(124,58,237,.12)', borderRadius: 50, padding: '6px 16px', marginBottom: 24 }}>
              <span style={{ fontSize: 16 }}>🇮🇳</span>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: '#7c3aed', letterSpacing: '.5px' }}>FOR INDIA</span>
            </div>

            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)', fontWeight: 900, lineHeight: 1.12, margin: '0 0 20px', color: '#1a0e2e' }}>
              Crack Every{' '}
              <span style={{ background: 'linear-gradient(135deg,#7c3aed,#2563eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Nursing</span>
              <br />Officer Exam<br />
              <span style={{ color: '#1a0e2e' }}>in India</span>
            </h1>

            <p style={{ fontSize: 16, color: '#5a4570', lineHeight: 1.7, maxWidth: 480, marginBottom: 28 }}>
              Complete preparation for AIIMS NORCET, ESIC, RRB, PGIMER, JIPMER & all State Nursing Officer exams with AI-powered learning.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 20px', marginBottom: 32 }}>
              {['AIIMS NORCET Expert Faculty', '1 Lakh+ Practice MCQs', '500+ Full Mock Tests', 'Trusted by 25,000+ Nurses'].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13.5, color: '#4a3560', fontWeight: 500 }}>
                  <CheckCircle size={15} color="#7c3aed" /> {t}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 40 }}>
              <Link to="/register" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 30px', borderRadius: 12,
                background: 'linear-gradient(135deg,#7c3aed,#6d28d9)',
                color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none',
                boxShadow: '0 8px 28px rgba(124,58,237,.4)', transition: 'transform .2s',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                Start Free Trial <ArrowRight size={16} />
              </Link>
              <a href="#exams" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 26px', borderRadius: 12,
                border: '2px solid #7c3aed', color: '#7c3aed',
                fontWeight: 700, fontSize: 15, textDecoration: 'none',
                background: 'rgba(124,58,237,.04)', transition: 'all .2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#7c3aed'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(124,58,237,.04)'; e.currentTarget.style.color = '#7c3aed'; }}>
                <PlayCircle size={16} /> Free Mock Test
              </a>
            </div>

            {/* Exam badges */}
            <div>
              <p style={{ fontSize: 11.5, color: '#7c6b91', fontWeight: 600, letterSpacing: '.5px', margin: '0 0 10px' }}>EXAMS WE COVER</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['AIIMS', 'ESIC', 'RRB', 'PGIMER', 'JIPMER', 'State'].map(e => (
                  <div key={e} style={{ background: '#fff', border: '1.5px solid #ede6f6', borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 700, color: '#7c3aed', boxShadow: '0 2px 8px rgba(124,58,237,.08)' }}>{e}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Hero Image + Stats */}
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
            <div style={{ flex: 1, borderRadius: 24, overflow: 'hidden', boxShadow: '0 32px 80px rgba(124,58,237,.18)', background: 'linear-gradient(160deg,#ede6f6,#dde8fc)', minHeight: 420, display: 'flex', alignItems: 'flex-end' }}>
              <img src="https://images.unsplash.com/photo-1551190822-a9ce113ac100?w=600&q=80" alt="Indian Nurse"
                style={{ width: '100%', objectFit: 'cover', display: 'block', minHeight: 420 }}
                onError={e => { e.target.style.display = 'none'; }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 155 }}>
              {[
                { num: '1 Lakh+', label: 'Practice MCQs' },
                { num: '92%', label: 'Selection Rate' },
                { num: '500+', label: 'Mock Tests' },
              ].map((s, i) => (
                <div key={i} style={{
                  background: '#fff', borderRadius: 16, padding: '18px 20px',
                  boxShadow: '0 8px 24px rgba(124,58,237,.10)', border: '1px solid rgba(124,58,237,.08)',
                  animation: `indiaFloat ${2 + i * 0.5}s ease-in-out infinite alternate`,
                }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: '#7c3aed', lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontSize: 12, color: '#7c6b91', fontWeight: 500, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ FEATURE GRID ═══════════════════════════ */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(124,58,237,.08)', borderRadius: 50, padding: '6px 16px', marginBottom: 16 }}>
              <Zap size={14} color="#7c3aed" />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#7c3aed', letterSpacing: '.5px' }}>EVERYTHING YOU NEED</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.4rem)', fontWeight: 800, color: '#1a0e2e', margin: '0 0 12px' }}>Complete Exam Preparation Platform</h2>
            <p style={{ color: '#7c6b91', fontSize: 15 }}>All the tools you need to crack any Nursing Officer exam in India</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {FEATURES.map((f, i) => (
              <div key={i} style={{
                background: '#faf8ff', border: '1.5px solid #ede6f6', borderRadius: 20, padding: '32px 28px',
                transition: 'transform .25s, box-shadow .25s', cursor: 'default',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 40px ${f.color}18`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${f.color}14`, color: f.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>{f.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1a0e2e', margin: '0 0 8px' }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: '#7c6b91', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STATS BAR ═══════════════════════════════ */}
      <section style={{ background: 'linear-gradient(135deg, #2d1b4e 0%, #1a0e2e 50%, #1e1145 100%)', padding: '40px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 48px', borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,.12)' : 'none' }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,.65)', fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ EXAMS COVERED ═══════════════════════════ */}
      <section id="exams" style={{ padding: '80px 24px', background: 'linear-gradient(160deg, #faf8ff 0%, #f0e6ff 50%, #e8f0ff 100%)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.4rem)', fontWeight: 800, color: '#1a0e2e', margin: '0 0 12px' }}>Exams We Cover</h2>
            <p style={{ color: '#7c6b91', fontSize: 15 }}>Comprehensive preparation for all major Nursing Officer exams in India</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {EXAMS_COVERED.map((ex, i) => (
              <div key={i} style={{
                background: '#fff', border: '1.5px solid #ede6f6', borderRadius: 20, padding: '28px 24px',
                transition: 'transform .25s, box-shadow .25s, border-color .25s', cursor: 'pointer',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 40px ${ex.color}18`; e.currentTarget.style.borderColor = ex.color + '40'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#ede6f6'; }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${ex.color}14`, color: ex.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>{ex.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1a0e2e', margin: '0 0 8px' }}>{ex.name}</h3>
                <p style={{ fontSize: 13.5, color: '#7c6b91', lineHeight: 1.6, margin: '0 0 16px' }}>{ex.desc}</p>
                <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13.5, fontWeight: 700, color: ex.color, textDecoration: 'none' }}>
                  View Test Series <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ COURSE PACKAGES ══════════════════════════ */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.4rem)', fontWeight: 800, color: '#1a0e2e', margin: '0 0 12px' }}>Choose Your Plan</h2>
            <p style={{ color: '#7c6b91', fontSize: 15 }}>Affordable plans designed for every nursing aspirant</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {COURSES.map((c, i) => (
              <div key={i} style={{
                border: c.tag ? `2.5px solid ${c.color}` : '2px solid #ede6f6',
                borderRadius: 20, padding: '32px 24px', position: 'relative',
                background: c.tag ? `linear-gradient(160deg, ${c.color}08, #fff)` : '#fff',
                boxShadow: c.tag ? `0 16px 48px ${c.color}20` : '0 4px 20px rgba(0,0,0,.04)',
                transition: 'transform .25s, box-shadow .25s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = `0 24px 60px ${c.color}25`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = c.tag ? `0 16px 48px ${c.color}20` : '0 4px 20px rgba(0,0,0,.04)'; }}>
                {c.tag && (
                  <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: c.color, color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 16px', borderRadius: 50, whiteSpace: 'nowrap', letterSpacing: '.3px' }}>{c.tag}</div>
                )}
                <div style={{ fontSize: 18, fontWeight: 800, color: '#1a0e2e', marginBottom: 4 }}>{c.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 20 }}>
                  <span style={{ fontSize: 36, fontWeight: 900, color: c.color }}>{c.price}</span>
                  <span style={{ fontSize: 13, color: '#7c6b91' }}>{c.period}</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {c.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#4a3560' }}>
                      <CheckCircle size={14} color={c.color} style={{ flexShrink: 0 }} /> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/register" style={{
                  display: 'block', textAlign: 'center', padding: '11px',
                  borderRadius: 10, background: c.tag ? c.color : 'transparent',
                  border: `2px solid ${c.color}`, color: c.tag ? '#fff' : c.color,
                  fontWeight: 700, fontSize: 14, textDecoration: 'none', transition: 'all .2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = c.color; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = c.tag ? c.color : 'transparent'; e.currentTarget.style.color = c.tag ? '#fff' : c.color; }}>
                  {c.price === '₹0' ? 'Start Free' : 'Choose Plan'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ AI DASHBOARD SECTION ════════════════════ */}
      <section style={{ padding: '80px 24px', background: 'linear-gradient(160deg, #faf8ff 0%, #f0e6ff 50%, #e8f0ff 100%)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          {/* Dashboard Preview */}
          <div style={{ background: '#fff', borderRadius: 24, padding: 32, boxShadow: '0 24px 80px rgba(124,58,237,.12)', border: '1px solid rgba(124,58,237,.08)' }}>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#7c6b91', letterSpacing: '.5px', textTransform: 'uppercase' }}>Dashboard</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#1a0e2e', marginTop: 4 }}>Welcome back, Anjali 👋</div>
              <div style={{ fontSize: 13, color: '#7c6b91' }}>Your AIIMS NORCET preparation is on track</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 28 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#7c6b91', marginBottom: 10 }}>Overall Score</div>
                <CircularProgress value={78} color="#7c3aed" size={90} />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#7c6b91', marginBottom: 10 }}>Exam Readiness</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ background: '#f0e6ff', borderRadius: 8, padding: '6px 10px', fontSize: 12, fontWeight: 700, color: '#7c3aed', textAlign: 'center' }}>Good</div>
                  <div style={{ fontSize: 10, color: '#7c6b91', textAlign: 'center' }}>Predicted Score</div>
                  <div style={{ background: '#faf5ff', borderRadius: 8, padding: '6px 10px', fontSize: 13, fontWeight: 800, color: '#7c3aed', textAlign: 'center' }}>142/200</div>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#7c6b91', marginBottom: 10 }}>Questions Done</div>
                <div style={{ fontSize: 30, fontWeight: 900, color: '#7c3aed', lineHeight: 1, marginTop: 10 }}>3,200</div>
                <div style={{ fontSize: 11, color: '#7c6b91', marginTop: 6 }}>Accuracy: <strong style={{ color: '#059669' }}>74%</strong></div>
              </div>
            </div>

            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1a0e2e', marginBottom: 14 }}>Subject-wise Performance</div>
              {WEAK_TOPICS.map(t => (
                <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 11 }}>
                  <div style={{ fontSize: 12, color: '#4a3560', width: 120, fontWeight: 500, flexShrink: 0 }}>{t.name}</div>
                  <div style={{ flex: 1, height: 7, background: '#f0e6f6', borderRadius: 10, overflow: 'hidden' }}>
                    <div style={{ width: `${t.pct}%`, height: '100%', background: t.color, borderRadius: 10, transition: 'width 1s ease' }} />
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: t.color, width: 36, textAlign: 'right' }}>{t.pct}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Text */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(124,58,237,.1)', borderRadius: 50, padding: '6px 16px', marginBottom: 20 }}>
              <Brain size={14} color="#7c3aed" />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#7c3aed', letterSpacing: '.5px' }}>AI POWERED</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.5rem,2.5vw,2.5rem)', fontWeight: 800, color: '#1a0e2e', lineHeight: 1.2, margin: '0 0 16px' }}>
              Smart Dashboard.<br />Track Every Subject.
            </h2>
            <p style={{ color: '#5a4570', fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}>
              Our AI analyses your performance across all nursing subjects and creates a personalised study plan targeting your weak areas for maximum improvement.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 36 }}>
              {[
                { icon: <Target size={18} />, color: '#7c3aed', title: 'Identify Weak Subjects', desc: 'Know exactly where you need to improve' },
                { icon: <CalendarCheck size={18} />, color: '#2563eb', title: 'Smart Study Schedule', desc: 'AI-built daily plan based on your exam date' },
                { icon: <TrendingUp size={18} />, color: '#059669', title: 'Predict Your Score', desc: 'Real-time score prediction based on your progress' },
                { icon: <Zap size={18} />, color: '#d97706', title: 'Subject-wise Reports', desc: 'Detailed analytics for every nursing subject' },
              ].map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${f.color}14`, color: f.color, flexShrink: 0 }}>{f.icon}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#1a0e2e' }}>{f.title}</div>
                    <div style={{ fontSize: 13, color: '#7c6b91', marginTop: 2 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/register" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px', borderRadius: 12, background: 'linear-gradient(135deg,#7c3aed,#6d28d9)', color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: '0 8px 25px rgba(124,58,237,.35)' }}>
              Explore Dashboard <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ════════════════════════════ */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.4rem)', fontWeight: 800, color: '#1a0e2e', margin: '0 0 12px' }}>Success Stories</h2>
            <p style={{ color: '#7c6b91', fontSize: 15 }}>Hear from nurses who cracked their dream exams</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{
                background: '#faf8ff', border: '1.5px solid #ede6f6', borderRadius: 20, padding: '28px 24px',
                transition: 'transform .25s, box-shadow .25s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(124,58,237,.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div style={{ display: 'flex', gap: 3, marginBottom: 14 }}>
                  {Array(t.stars).fill(0).map((_, j) => <Star key={j} size={14} fill="#f59e0b" color="#f59e0b" />)}
                </div>
                <p style={{ fontSize: 13.5, color: '#4a3560', lineHeight: 1.7, margin: '0 0 20px', fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <img src={t.avatar} alt={t.name} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: '2px solid #ede6f6' }} onError={e => { e.target.style.background = '#f0e6ff'; e.target.src = ''; }} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#1a0e2e' }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: '#7c3aed', fontWeight: 600 }}>{t.exam}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MOBILE APP SECTION ══════════════════════ */}
      <section style={{ padding: '72px 24px', background: 'linear-gradient(135deg, #2d1b4e 0%, #1a0e2e 60%, #1e1145 100%)', color: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr auto', gap: 60, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.5rem)', fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>Study Anytime, Anywhere</h2>
            <p style={{ color: 'rgba(255,255,255,.7)', fontSize: 15, lineHeight: 1.7, marginBottom: 28, maxWidth: 500 }}>
              Download our app and prepare for your nursing exam on the go. Practice MCQs, attend live classes, and track your progress — all from your phone.
            </p>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 32 }}>
              {['Test Series', 'QBank', 'Live Classes', 'AI Analytics', 'Study Plan'].map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,.8)' }}>
                  <CheckCircle size={14} color="#a78bfa" /> {f}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              {[
                { top: 'GET IT ON', bottom: 'Google Play', icon: <Smartphone size={22} /> },
                { top: 'DOWNLOAD ON THE', bottom: 'App Store', icon: <Download size={22} /> },
              ].map((btn, i) => (
                <a key={i} href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#000', border: '1.5px solid rgba(255,255,255,.2)', borderRadius: 12, padding: '10px 20px', textDecoration: 'none', color: '#fff', transition: 'transform .2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                  {btn.icon}
                  <div>
                    <div style={{ fontSize: 9, color: 'rgba(255,255,255,.6)' }}>{btn.top}</div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{btn.bottom}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Phone mockups */}
          <div style={{ display: 'flex', gap: 20 }}>
            {[
              { bg: 'linear-gradient(160deg,#7c3aed,#6d28d9)', rotate: '-4deg', title: '📝 Mock Test' },
              { bg: 'linear-gradient(160deg,#2563eb,#1d4ed8)', rotate: '3deg', title: '📊 Analytics' },
            ].map((p, j) => (
              <div key={j} style={{
                width: 155, height: 300, borderRadius: 28,
                background: p.bg, border: '8px solid rgba(255,255,255,.12)',
                boxShadow: '0 20px 60px rgba(0,0,0,.5)',
                transform: `rotate(${p.rotate})`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 14,
              }}>
                <div style={{ width: '100%', background: 'rgba(255,255,255,.1)', borderRadius: 10, padding: 10 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#fff', marginBottom: 8, textAlign: 'center' }}>{p.title}</div>
                  {j === 0 ? (
                    ['A. Amlodipine', 'B. Enalapril', 'C. Metformin', 'D. Digoxin'].map((opt, k) => (
                      <div key={k} style={{ fontSize: 9, color: k === 1 ? '#a78bfa' : 'rgba(255,255,255,.7)', background: k === 1 ? 'rgba(167,139,250,.15)' : 'rgba(255,255,255,.05)', borderRadius: 6, padding: '4px 7px', marginBottom: 4, border: k === 1 ? '1px solid rgba(167,139,250,.4)' : 'none' }}>{opt}</div>
                    ))
                  ) : (
                    <>
                      <div style={{ width: 56, height: 56, borderRadius: '50%', border: '4px solid #a78bfa', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '6px auto 10px', fontSize: 13, fontWeight: 900, color: '#fff' }}>78%</div>
                      {[62, 85, 71, 78].map((v, k) => <div key={k} style={{ width: '100%', height: 5, background: 'rgba(255,255,255,.1)', borderRadius: 4, marginBottom: 5, overflow: 'hidden' }}><div style={{ width: `${v}%`, height: '100%', background: '#a78bfa', borderRadius: 4 }} /></div>)}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ══════════════════════════════ */}
      <section style={{ padding: '72px 24px', background: 'linear-gradient(135deg,#2d1b4e 0%,#1a0e2e 50%,#1e1145 100%)', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.8rem)', fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>
            Ready to Crack Your{' '}
            <span style={{ background: 'linear-gradient(135deg,#a78bfa,#60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Nursing Officer Exam?</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,.7)', fontSize: 15.5, lineHeight: 1.7, marginBottom: 36 }}>
            Join 25,000+ nursing aspirants who are already preparing with us. Start your free trial today.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 36px', borderRadius: 12, background: 'linear-gradient(135deg,#7c3aed,#a855f7)', color: '#fff', fontWeight: 800, fontSize: 16, textDecoration: 'none', boxShadow: '0 8px 30px rgba(124,58,237,.5)', transition: 'transform .2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
              Start Free Trial <ArrowRight size={18} />
            </Link>
            <a href="tel:+919828474951" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 32px', borderRadius: 12, border: '2px solid rgba(255,255,255,.3)', color: '#fff', fontWeight: 700, fontSize: 16, textDecoration: 'none', background: 'transparent', transition: 'background .2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <MessageCircle size={18} /> Talk to Advisor
            </a>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════ */}
      <footer style={{ background: '#1a0e2e', color: 'rgba(255,255,255,.8)', padding: '60px 24px 28px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }}>
            <div>
              <img src={logo} alt="NursingOfficer Training" style={{ height: 40, objectFit: 'contain', marginBottom: 16, filter: 'brightness(10)' }} onError={e => { e.target.style.display = 'none'; }} />
              <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,.45)', lineHeight: 1.7, marginBottom: 20 }}>
                India's most trusted platform for Nursing Officer exam preparation. Comprehensive test series, question bank & live classes.
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                {['📘', '📸', '▶', '🐦', '💼'].map((s, i) => (
                  <a key={i} href="#" style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, textDecoration: 'none', transition: 'background .2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.14)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.06)'}>{s}</a>
                ))}
              </div>
            </div>
            {Object.entries(FOOTER_LINKS).map(([cat, links]) => (
              <div key={cat}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '.5px', marginBottom: 16 }}>{cat}</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {links.map(l => (
                    <li key={l}><a href="#" style={{ fontSize: 13, color: 'rgba(255,255,255,.45)', textDecoration: 'none', transition: 'color .2s' }}
                      onMouseEnter={e => e.target.style.color = '#fff'}
                      onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,.45)'}>{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, padding: '20px 0', borderTop: '1px solid rgba(255,255,255,.08)', borderBottom: '1px solid rgba(255,255,255,.08)', marginBottom: 24 }}>
            {[
              { icon: <Phone size={13} />, text: '+91 98284 74951' },
              { icon: <Mail size={13} />, text: 'support@nursingofficertraining.com' },
              { icon: <MapPin size={13} />, text: '123, Medical Tower, Sector 15, Noida, UP - 201301' },
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(255,255,255,.5)' }}>
                <span style={{ color: '#7c3aed' }}>{c.icon}</span> {c.text}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,.3)' }}>© 2024 NursingOfficerTraining.com — All Rights Reserved.</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {['Visa', 'MasterCard', 'UPI', 'PhonePe'].map(p => (
                <div key={p} style={{ background: 'rgba(255,255,255,.06)', borderRadius: 6, padding: '3px 10px', fontSize: 11, color: 'rgba(255,255,255,.35)', fontWeight: 600 }}>{p}</div>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ══ STYLES ══════════════════════════════════ */}
      <style>{`
        @keyframes indiaFloat {
          from { transform: translateY(0); }
          to   { transform: translateY(-8px); }
        }
        .india-prep-page * { box-sizing: border-box; }
        @media (max-width: 1024px) {
          .india-nav-links { display: none !important; }
          .india-prep-page section > div { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .india-prep-page footer > div > div:first-child { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}
