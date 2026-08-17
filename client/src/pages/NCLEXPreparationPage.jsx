import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import {
  Video, BarChart3, BookOpen, Brain, Users, Headphones, Star,
  CheckCircle, ChevronRight, ChevronLeft, Menu, X, Phone,
  Mail, MapPin, Target, TrendingUp, CalendarCheck, Bot,
  Globe, Download, Smartphone, Award, Zap, Shield, Clock,
  PlayCircle, MessageCircle, ArrowRight
} from 'lucide-react';

/* ─── DATA ──────────────────────────────────────── */
const NAV_LINKS = ['Home', 'Courses', 'QBank', 'Live Classes', 'Test Series', 'Resources', 'Results', 'Mentorship'];

const FEATURE_STRIP = [
  { icon: <Video size={22} />, label: 'Live Classes', sub: 'Interactive Sessions' },
  { icon: <BookOpen size={22} />, label: 'NCLEX-RN QBank', sub: '500k+ Questions' },
  { icon: <BarChart3 size={22} />, label: 'AI Performance', sub: 'Smart Analytics' },
  { icon: <Brain size={22} />, label: 'Case Studies', sub: 'Real Clinical Scenarios' },
  { icon: <CalendarCheck size={22} />, label: 'Study Planner', sub: 'Personalised Plan' },
  { icon: <Headphones size={22} />, label: '24/7 Support', sub: 'Always Here' },
];

const STATS = [
  { num: '10,000+', label: 'Nurses Trained' },
  { num: '1M+', label: 'Questions Practised' },
  { num: '95%', label: 'Success Rate' },
  { num: '500+', label: 'Live Classes / Month' },
  { num: '50+', label: 'Expert Faculty' },
];

const HERO_STATS = [
  { num: '1M+', label: 'Practice Questions' },
  { num: '95%', label: 'First Attempt Success' },
  { num: '500+', label: 'Live Classes/Month' },
];

const COURSES = [
  {
    name: 'Starter',
    tag: null,
    price: '$49',
    period: '/ 1 Month',
    icon: 'rocket',
    color: '#3498db',
    features: ['Live Classes', 'Practice Questions', 'Basic Analytics', 'Email Support'],
  },
  {
    name: 'Professional',
    tag: 'MOST POPULAR',
    price: '$99',
    period: '/ 3 Months',
    icon: 'star',
    color: '#2ecc71',
    features: ['Everything in Starter', 'NCLEX-RN QBank', 'AI Performance Reports', 'Priority Support', 'Study Planner'],
  },
  {
    name: 'Elite',
    tag: null,
    price: '$149',
    period: '',
    icon: 'crown',
    color: '#f39c12',
    features: ['Everything in Professional', 'Live + Recorded Classes', 'Case Studies', 'Custom Mock Tests', 'Doubt Clearing Sessions'],
  },
  {
    name: 'VIP Mentorship',
    tag: null,
    price: '$199',
    period: '/ 6 Months',
    icon: 'gem',
    color: '#9b59b6',
    features: ['Everything in Elite', '1-on-1 Mentorship', 'Resume Review', 'Interview Guidance', 'Career Support'],
  },
];

const ICON_MAP = { rocket: '🚀', star: '⭐', crown: '👑', gem: '💎' };

const AI_FEATURES = [
  { icon: <Target size={18} />, color: '#27ae60', title: 'Identify Weak Topics Instantly', desc: 'Pinpoints exactly where you lose marks' },
  { icon: <CalendarCheck size={18} />, color: '#3498db', title: 'Get AI Study Recommendations', desc: 'AI-built daily schedule based on your gaps' },
  { icon: <TrendingUp size={18} />, color: '#9b59b6', title: 'Track Your Daily Progress', desc: 'Know your readiness score before exam day' },
  { icon: <Zap size={18} />, color: '#f39c12', title: 'Improve Accuracy and Speed', desc: 'Stay on track with intelligent nudges' },
];

const TESTIMONIALS = [
  {
    name: 'Sarah J.',
    country: 'USA',
    flag: '🇺🇸',
    text: 'Thanks to NursingOfficer Training, I cracked NCLEX in my first attempt! The AI study plan was a game changer.',
    stars: 5,
    avatar: 'https://i.pravatar.cc/80?img=47',
  },
  {
    name: 'Margaret K.',
    country: 'UK',
    flag: '🇬🇧',
    text: 'The best resource for NCLEX prep. Questions are very relevant and easy to understand. Highly recommended!',
    stars: 5,
    avatar: 'https://i.pravatar.cc/80?img=48',
  },
  {
    name: 'Emily R.',
    country: 'Canada',
    flag: '🇨🇦',
    text: 'Best platform to crack NCLEX. The instructors are knowledgeable and supportive. Worth every penny!',
    stars: 5,
    avatar: 'https://i.pravatar.cc/80?img=44',
  },
  {
    name: 'Priya M.',
    country: 'India',
    flag: '🇮🇳',
    text: 'Excellent study material and mock tests. Passed NCLEX-RN on first attempt. Forever grateful!',
    stars: 5,
    avatar: 'https://i.pravatar.cc/80?img=45',
  },
];

const FOOTER_LINKS = {
  Programs: ['NCLEX-RN Course', 'Live Classes', 'QBank', 'Free Quiz', 'Mock Tests', 'Case Studies'],
  Resources: ['Study Materials', 'NCLEX Blog', 'Free Quiz', 'NCLEX-RN Guide', 'Downloads'],
  Company: ['About Us', 'Our Faculty', 'Careers', 'Contact Us'],
  Support: ['Help Center', 'FAQ', 'Doubt Support', 'Terms & Conditions', 'Privacy Policy'],
};

const COUNTRY_FLAGS = ['🇺🇸', '🇨🇦', '🇬🇧', '🇦🇺', '🇮🇳'];

const WEAK_TOPICS = [
  { name: 'Pharmacology', pct: 62, color: '#ef4444' },
  { name: 'Nursing Care', pct: 88, color: '#22c55e' },
  { name: 'Medical Content', pct: 68, color: '#f59e0b' },
  { name: 'Before Apply', pct: 70, color: '#8b5cf6' },
];

/* ─── CIRCULAR PROGRESS ──────────────────────── */
function CircularProgress({ value, color, size }) {
  const s = size || 88;
  const r = (s - 14) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;
  return (
    <svg width={s} height={s}>
      <circle cx={s / 2} cy={s / 2} r={r} fill="none" stroke="#e8ecf0" strokeWidth={9} />
      <circle
        cx={s / 2} cy={s / 2} r={r}
        fill="none" stroke={color} strokeWidth={9}
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${s / 2} ${s / 2})`}
        style={{ transition: 'stroke-dasharray 1.2s ease' }}
      />
      <text x="50%" y="50%" textAnchor="middle" dy=".35em" fontSize={15} fontWeight="800" fill="#1a2332">{value}%</text>
    </svg>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────── */
export default function NCLEXPreparationPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", color: '#1a2332', overflowX: 'hidden', background: '#fff' }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

      {/* ══ NAVBAR ══════════════════════════════════════ */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.98)',
        boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.10)' : '0 1px 0 #e8ecf0',
        transition: 'all .3s', backdropFilter: 'blur(12px)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', height: 66 }}>
          <img src={logo} alt="NursingOfficer Training" style={{ height: 42, objectFit: 'contain' }} onError={e => { e.target.style.display = 'none'; }} />

          <ul style={{ display: 'flex', gap: 28, listStyle: 'none', margin: 0, padding: 0 }}>
            {NAV_LINKS.map(l => (
              <li key={l}>
                <a href="#" style={{ fontSize: 13.5, fontWeight: 500, color: '#374151', textDecoration: 'none' }}>{l}</a>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Link to="/login" style={{ padding: '8px 20px', borderRadius: 8, border: '1.5px solid #d1d5db', fontSize: 13.5, fontWeight: 600, color: '#374151', textDecoration: 'none' }}>Login</Link>
            <Link to="/register" style={{ padding: '8px 20px', borderRadius: 8, background: 'linear-gradient(135deg,#2563eb,#1d4ed8)', fontSize: 13.5, fontWeight: 700, color: '#fff', textDecoration: 'none', boxShadow: '0 4px 12px rgba(37,99,235,.35)' }}>Enroll Now</Link>
          </div>
        </div>
      </nav>

      {/* ══ HERO ════════════════════════════════════════ */}
      <section style={{
        minHeight: '100vh', paddingTop: 80,
        background: 'linear-gradient(135deg, #f0f7ff 0%, #e8f4fd 40%, #f5f0ff 100%)',
        display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -100, left: -60, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', width: '100%' }}>
          {/* Left */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(37,99,235,.1)', borderRadius: 50, padding: '6px 16px', marginBottom: 24 }}>
              <Globe size={14} color="#2563eb" />
              <span style={{ fontSize: 12.5, fontWeight: 600, color: '#2563eb', letterSpacing: '.5px' }}>FOR ABROAD</span>
            </div>

            <h1 style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 900, lineHeight: 1.12, margin: '0 0 20px', color: '#0f172a' }}>
              Crack{' '}
              <span style={{ background: 'linear-gradient(135deg,#2563eb,#7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>NCLEX-RN</span>
              <br />Build Your Global<br />Nursing Career
            </h1>

            <p style={{ fontSize: 16, color: '#4b5563', lineHeight: 1.7, maxWidth: 480, marginBottom: 28 }}>
              Comprehensive NCLEX preparation with expert guidance, high-yield content, smart practice and AI-powered learning.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 20px', marginBottom: 32 }}>
              {['NCLEX-RN Expert Faculty', 'Next-Gen NCLEX Prep', 'Advanced Question Bank', 'Trusted by 10,000+ Nurses'].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13.5, color: '#374151', fontWeight: 500 }}>
                  <CheckCircle size={15} color="#2563eb" /> {t}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 40 }}>
              <Link to="/register" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 28px', borderRadius: 12,
                background: 'linear-gradient(135deg,#2563eb,#1d4ed8)',
                color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none',
                boxShadow: '0 8px 25px rgba(37,99,235,.4)',
              }}>
                Explore Courses <ArrowRight size={16} />
              </Link>
              <a href="#" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 24px', borderRadius: 12,
                border: '2px solid #2563eb', color: '#2563eb',
                fontWeight: 700, fontSize: 15, textDecoration: 'none',
                background: 'rgba(37,99,235,.04)',
              }}>
                <PlayCircle size={16} /> Free NCLEX Quiz
              </a>
            </div>

            <div>
              <p style={{ fontSize: 11.5, color: '#6b7c93', fontWeight: 600, letterSpacing: '.5px', marginBottom: 10, margin: '0 0 10px' }}>TRUSTED BY NURSES IN</p>
              <div style={{ display: 'flex', gap: 10 }}>
                {COUNTRY_FLAGS.map((f, i) => (
                  <div key={i} style={{ width: 40, height: 40, borderRadius: 10, background: '#fff', border: '2px solid #e8ecf0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, boxShadow: '0 2px 8px rgba(0,0,0,.08)' }}>{f}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Nurse + stat cards */}
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
            <div style={{ flex: 1, borderRadius: 24, overflow: 'hidden', boxShadow: '0 32px 80px rgba(37,99,235,.18)', background: 'linear-gradient(160deg,#dbeafe,#ede9fe)', minHeight: 420, display: 'flex', alignItems: 'flex-end' }}>
              <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80" alt="NCLEX Nurse" style={{ width: '100%', objectFit: 'cover', display: 'block', minHeight: 420 }} onError={e => { e.target.style.display = 'none'; }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 155 }}>
              {HERO_STATS.map((s, i) => (
                <div key={i} style={{
                  background: '#fff', borderRadius: 16, padding: '18px 20px',
                  boxShadow: '0 8px 24px rgba(0,0,0,.10)', border: '1px solid rgba(37,99,235,.08)',
                  animation: `nxFloat ${2 + i * 0.5}s ease-in-out infinite alternate`,
                }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: '#2563eb', lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontSize: 12, color: '#6b7c93', fontWeight: 500, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ FEATURE STRIP ════════════════════════════ */}
      <section style={{ background: '#f8fafc', borderTop: '1px solid #e8ecf0', borderBottom: '1px solid #e8ecf0', padding: '24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {FEATURE_STRIP.map((f, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '16px 36px', borderRight: i < FEATURE_STRIP.length - 1 ? '1px solid #e8ecf0' : 'none' }}>
              <div style={{ color: '#2563eb' }}>{f.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1a2332' }}>{f.label}</div>
              <div style={{ fontSize: 11.5, color: '#6b7c93' }}>{f.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ STATS BAR ═══════════════════════════════ */}
      <section style={{ background: '#1e2d4e', padding: '36px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 44px', borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,.15)' : 'none' }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,.7)', fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ COURSE PACKAGES ══════════════════════════ */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.5rem)', fontWeight: 800, color: '#0f172a', margin: 0 }}>NCLEX-RN Course Packages</h2>
            <p style={{ color: '#6b7c93', marginTop: 12, fontSize: 15 }}>Choose the plan that fits your learning journey</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {COURSES.map((c, i) => (
              <div key={i} style={{
                border: c.tag ? `2.5px solid ${c.color}` : '2px solid #e8ecf0',
                borderRadius: 20, padding: '32px 24px', position: 'relative',
                background: c.tag ? `linear-gradient(160deg, ${c.color}0a, #fff)` : '#fff',
                boxShadow: c.tag ? `0 16px 48px ${c.color}20` : '0 4px 20px rgba(0,0,0,.05)',
                transition: 'transform .25s, box-shadow .25s',
              }}>
                {c.tag && (
                  <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: c.color, color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 16px', borderRadius: 50, whiteSpace: 'nowrap' }}>{c.tag}</div>
                )}
                <div style={{ fontSize: 28, marginBottom: 10 }}>{ICON_MAP[c.icon]}</div>
                <div style={{ fontSize: 17, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>{c.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 20 }}>
                  <span style={{ fontSize: 34, fontWeight: 900, color: c.color }}>{c.price}</span>
                  <span style={{ fontSize: 12, color: '#6b7c93' }}>{c.period}</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {c.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#374151' }}>
                      <CheckCircle size={14} color={c.color} style={{ flexShrink: 0 }} /> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/register" style={{
                  display: 'block', textAlign: 'center', padding: '11px',
                  borderRadius: 10, background: c.tag ? c.color : 'transparent',
                  border: `2px solid ${c.color}`, color: c.tag ? '#fff' : c.color,
                  fontWeight: 700, fontSize: 14, textDecoration: 'none',
                }}>
                  Choose Plan
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ AI DASHBOARD SECTION ════════════════════ */}
      <section style={{ padding: '80px 24px', background: 'linear-gradient(135deg,#f8fafc 0%,#f0f7ff 100%)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          {/* Dashboard Card */}
          <div style={{ background: '#fff', borderRadius: 24, padding: 32, boxShadow: '0 24px 80px rgba(37,99,235,.12)', border: '1px solid rgba(37,99,235,.08)' }}>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#6b7c93', letterSpacing: '.5px', textTransform: 'uppercase' }}>Dashboard</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', marginTop: 4 }}>Welcome back, Priya 👋</div>
              <div style={{ fontSize: 13, color: '#6b7c93' }}>Keeping you on the right track</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 28 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#6b7c93', marginBottom: 10 }}>Overall Score</div>
                <CircularProgress value={82} color="#2563eb" size={88} />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#6b7c93', marginBottom: 10 }}>Exam Readiness</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ background: '#dcfce7', borderRadius: 8, padding: '6px 10px', fontSize: 12, fontWeight: 700, color: '#16a34a', textAlign: 'center' }}>High</div>
                  <div style={{ fontSize: 10, color: '#6b7c93', textAlign: 'center' }}>Predicted Pass Rate</div>
                  <div style={{ background: '#f0fdf4', borderRadius: 8, padding: '6px 10px', fontSize: 13, fontWeight: 800, color: '#16a34a', textAlign: 'center' }}>86%</div>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#6b7c93', marginBottom: 10 }}>Questions Attempted</div>
                <div style={{ fontSize: 30, fontWeight: 900, color: '#2563eb', lineHeight: 1, marginTop: 10 }}>2,450</div>
                <div style={{ fontSize: 11, color: '#6b7c93', marginTop: 6 }}>Accuracy: <strong style={{ color: '#16a34a' }}>78%</strong></div>
              </div>
            </div>

            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 14 }}>Weak Topics</div>
              {WEAK_TOPICS.map(t => (
                <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 11 }}>
                  <div style={{ fontSize: 12, color: '#374151', width: 112, fontWeight: 500, flexShrink: 0 }}>{t.name}</div>
                  <div style={{ flex: 1, height: 7, background: '#f1f5f9', borderRadius: 10, overflow: 'hidden' }}>
                    <div style={{ width: `${t.pct}%`, height: '100%', background: t.color, borderRadius: 10 }} />
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: t.color, width: 36, textAlign: 'right' }}>{t.pct}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Text */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(37,99,235,.1)', borderRadius: 50, padding: '6px 16px', marginBottom: 20 }}>
              <Zap size={14} color="#2563eb" />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#2563eb', letterSpacing: '.5px' }}>AI POWERED</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.6rem,2.5vw,2.6rem)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, margin: '0 0 16px' }}>
              Smart Dashboard.<br />Better Preparation.
            </h2>
            <p style={{ color: '#4b5563', fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}>
              Our AI analyses your performance and creates a personalised plan to help you focus on what matters most.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 36 }}>
              {AI_FEATURES.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${f.color}18`, color: f.color, flexShrink: 0 }}>{f.icon}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{f.title}</div>
                    <div style={{ fontSize: 13, color: '#6b7c93', marginTop: 2 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/register" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px', borderRadius: 12, background: 'linear-gradient(135deg,#2563eb,#1d4ed8)', color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: '0 8px 25px rgba(37,99,235,.35)' }}>
              Explore Dashboard <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ════════════════════════════ */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 800, color: '#0f172a', margin: 0 }}>Success Stories from Around the World</h2>
            <p style={{ color: '#6b7c93', marginTop: 12, fontSize: 15 }}>Hear from nurses who achieved their dreams with us</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ background: '#f8fafc', border: '1.5px solid #e8ecf0', borderRadius: 20, padding: '28px 24px', transition: 'transform .25s, box-shadow .25s' }}>
                <div style={{ display: 'flex', gap: 3, marginBottom: 14 }}>
                  {Array(t.stars).fill(0).map((_, j) => <Star key={j} size={14} fill="#f59e0b" color="#f59e0b" />)}
                </div>
                <p style={{ fontSize: 13.5, color: '#374151', lineHeight: 1.7, margin: '0 0 20px', fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <img src={t.avatar} alt={t.name} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: '2px solid #e8ecf0' }} onError={e => { e.target.style.background = '#dbeafe'; e.target.src = ''; }} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{t.name}</div>
                    <div style={{ fontSize: 13, color: '#6b7c93' }}>{t.flag} {t.country}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MOBILE APP SECTION ══════════════════════ */}
      <section style={{ padding: '72px 24px', background: 'linear-gradient(135deg, #0f172a 0%, #1e2d4e 60%, #1a1046 100%)', color: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr auto', gap: 60, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.6rem)', fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>Study Anytime, Anywhere</h2>
            <p style={{ color: 'rgba(255,255,255,.7)', fontSize: 15, lineHeight: 1.7, marginBottom: 28, maxWidth: 500 }}>
              Download our app and take your preparation on the go. Access all features seamlessly on mobile.
            </p>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 32 }}>
              {['Live Classes', 'QBank', 'Mock Tests', 'AI Analytics', 'Study Plan'].map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,.8)' }}>
                  <CheckCircle size={14} color="#4ade80" /> {f}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              {[
                { top: 'GET IT ON', bottom: 'Google Play', icon: <Smartphone size={22} /> },
                { top: 'DOWNLOAD ON THE', bottom: 'App Store', icon: <Download size={22} /> },
              ].map((btn, i) => (
                <a key={i} href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#000', border: '1.5px solid rgba(255,255,255,.2)', borderRadius: 12, padding: '10px 20px', textDecoration: 'none', color: '#fff' }}>
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
              { bg: 'linear-gradient(160deg,#1e40af,#1d4ed8)', rotate: '-4deg', title: '📝 NCLEX Quiz' },
              { bg: 'linear-gradient(160deg,#7c3aed,#6d28d9)', rotate: '3deg', title: '📊 Dashboard' },
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
                    ['A. Administer', 'B. Notify physician', 'C. Document', 'D. Assess patient'].map((opt, k) => (
                      <div key={k} style={{ fontSize: 9, color: k === 1 ? '#4ade80' : 'rgba(255,255,255,.7)', background: k === 1 ? 'rgba(74,222,128,.15)' : 'rgba(255,255,255,.05)', borderRadius: 6, padding: '4px 7px', marginBottom: 4, border: k === 1 ? '1px solid rgba(74,222,128,.4)' : 'none' }}>{opt}</div>
                    ))
                  ) : (
                    <>
                      <div style={{ width: 56, height: 56, borderRadius: '50%', border: '4px solid #4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '6px auto 10px', fontSize: 13, fontWeight: 900, color: '#fff' }}>82%</div>
                      {[70, 88, 65].map((v, k) => <div key={k} style={{ width: '100%', height: 5, background: 'rgba(255,255,255,.1)', borderRadius: 4, marginBottom: 5, overflow: 'hidden' }}><div style={{ width: `${v}%`, height: '100%', background: '#4ade80', borderRadius: 4 }} /></div>)}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ══════════════════════════════ */}
      <section style={{ padding: '72px 24px', background: 'linear-gradient(135deg,#0f172a 0%,#1e2d4e 50%,#1a1046 100%)', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.8rem)', fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>
            Ready to Achieve Your<br />
            <span style={{ background: 'linear-gradient(135deg,#60a5fa,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>International Nursing Dream?</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,.75)', fontSize: 15.5, lineHeight: 1.7, marginBottom: 36 }}>
            Join thousands of nurses who cracked NCLEX and are building successful careers worldwide.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 36px', borderRadius: 12, background: 'linear-gradient(135deg,#2563eb,#7c3aed)', color: '#fff', fontWeight: 800, fontSize: 16, textDecoration: 'none', boxShadow: '0 8px 30px rgba(37,99,235,.5)' }}>
              Start NCLEX Journey <ArrowRight size={18} />
            </Link>
            <a href="tel:+917234567890" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 32px', borderRadius: 12, border: '2px solid rgba(255,255,255,.3)', color: '#fff', fontWeight: 700, fontSize: 16, textDecoration: 'none', background: 'transparent' }}>
              <MessageCircle size={18} /> Talk to Advisor
            </a>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════ */}
      <footer style={{ background: '#0f172a', color: 'rgba(255,255,255,.8)', padding: '60px 24px 28px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }}>
            <div>
              <img src={logo} alt="NursingOfficer Training" style={{ height: 40, objectFit: 'contain', marginBottom: 16, filter: 'brightness(10)' }} onError={e => { e.target.style.display = 'none'; }} />
              <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,.5)', lineHeight: 1.7, marginBottom: 20 }}>
                Empowering nurses to achieve their dreams. India's most trusted platform for NCLEX-RN preparation.
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                {['📘', '📸', '▶', '🐦', '💼'].map((s, i) => (
                  <a key={i} href="#" style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, textDecoration: 'none' }}>{s}</a>
                ))}
              </div>
            </div>
            {Object.entries(FOOTER_LINKS).map(([cat, links]) => (
              <div key={cat}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '.5px', marginBottom: 16 }}>{cat}</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {links.map(l => (
                    <li key={l}><a href="#" style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, padding: '20px 0', borderTop: '1px solid rgba(255,255,255,.08)', borderBottom: '1px solid rgba(255,255,255,.08)', marginBottom: 24 }}>
            {[
              { icon: <Phone size={13} />, text: '+91 72345 67890' },
              { icon: <Mail size={13} />, text: 'support@nursingofficertraining.com' },
              { icon: <MapPin size={13} />, text: '123, Medical Tower, Sector 15, Noida, Uttar Pradesh - 201301' },
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(255,255,255,.55)' }}>
                <span style={{ color: '#2563eb' }}>{c.icon}</span> {c.text}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,.35)' }}>© 2024 NursingOfficerTraining.com — All Rights Reserved.</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {['Visa', 'MasterCard', 'PayPal', 'UPI'].map(p => (
                <div key={p} style={{ background: 'rgba(255,255,255,.08)', borderRadius: 6, padding: '3px 10px', fontSize: 11, color: 'rgba(255,255,255,.4)', fontWeight: 600 }}>{p}</div>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes nxFloat {
          from { transform: translateY(0); }
          to   { transform: translateY(-8px); }
        }
        * { box-sizing: border-box; }
        @media (max-width: 1024px) {
          section > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
