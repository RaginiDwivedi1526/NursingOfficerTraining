import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './AdminLoginPage.css';

function AdminLoginPage() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd]   = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
      const url = baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`;
      const { data } = await axios.post(`${url}/auth/login`, { email, password });
      if (data.role !== 'admin') {
        setError('Access denied. Admin credentials required.');
        setLoading(false);
        return;
      }
      loginUser(data);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="al-page">
      {/* ── Left Panel ── */}
      <div className="al-left">
        <div className="al-grid-bg" aria-hidden="true" />

        {/* Animated glow blobs */}
        <div className="al-blob al-blob-1" aria-hidden="true" />
        <div className="al-blob al-blob-2" aria-hidden="true" />

        {/* Brand */}
        <div className="al-brand">
          <div className="al-brand-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M9 12h6M12 9v6"/>
            </svg>
          </div>
          <span className="al-brand-name">NursingOfficer<br/>Training™</span>
        </div>

        {/* Portal Badge */}
        <div className="al-portal-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          ADMIN PORTAL
        </div>

        {/* Headline */}
        <div className="al-hero">
          <h2 className="al-hero-title">Welcome Back,</h2>
          <h2 className="al-hero-accent">Admin!</h2>
          <p className="al-hero-sub">
            Sign in to access the admin dashboard<br/>and manage the learning experience.
          </p>
        </div>

        {/* Illustration container */}
        <div className="al-illustration">
          <div className="al-illus-monitor">
            {/* Mini Dashboard Screen */}
            <div className="al-screen">
              <div className="al-screen-header">
                <span className="al-screen-dot red"/>
                <span className="al-screen-dot yellow"/>
                <span className="al-screen-dot green"/>
                <span className="al-screen-title">Dashboard</span>
              </div>
              <div className="al-screen-body">
                {/* Ring Chart */}
                <div className="al-ring-wrap">
                  <svg className="al-ring" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="3"/>
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="url(#rgrad)" strokeWidth="3"
                      strokeDasharray="78 22" strokeDashoffset="25" strokeLinecap="round"/>
                    <defs>
                      <linearGradient id="rgrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#818cf8"/>
                        <stop offset="100%" stopColor="#a78bfa"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="al-ring-pct">78%</span>
                </div>

                {/* Mini Stat Cards */}
                <div className="al-mini-stats">
                  <div className="al-mini-stat">
                    <div className="al-mini-label">Total Students</div>
                    <div className="al-mini-num">2,543</div>
                    <div className="al-mini-tag">▲ 12.9%</div>
                  </div>
                  <div className="al-mini-stat">
                    <div className="al-mini-label">Tests Conducted</div>
                    <div className="al-mini-num">1,245</div>
                    <div className="al-mini-tag">▲ 8.2%</div>
                  </div>
                  <div className="al-mini-stat">
                    <div className="al-mini-label">Average Score</div>
                    <div className="al-mini-num">76%</div>
                    <div className="al-mini-tag">▲ 4.0%</div>
                  </div>
                </div>

                {/* Bar chart */}
                <div className="al-bars">
                  {[40, 65, 50, 80, 60, 90, 70].map((h, i) => (
                    <div key={i} className="al-bar" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
            {/* Monitor stand */}
            <div className="al-stand" />
            <div className="al-base" />
          </div>

          {/* Decorative elements */}
          <div className="al-plant" aria-hidden="true">🪴</div>
          <div className="al-mug" aria-hidden="true">
            <span className="al-mug-cross">✚</span>
          </div>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="al-right">
        <div className="al-form-card">
          {/* Shield Icon */}
          <div className="al-shield-wrap">
            <div className="al-shield">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
          </div>

          <h1 className="al-title">Admin Login</h1>
          <p className="al-subtitle">Secure access to your admin account</p>

          {error && (
            <div className="al-error" role="alert">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          <form id="admin-login-form" onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="al-field-group">
              <label className="al-label" htmlFor="admin-email">Email Address</label>
              <div className="al-input-wrap">
                <span className="al-input-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </span>
                <input
                  id="admin-email"
                  type="email"
                  className="al-input"
                  placeholder="admin@nursingofficertraining.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="al-field-group">
              <div className="al-label-row">
                <label className="al-label" htmlFor="admin-password">Password</label>
                <a href="/forgot-password" className="al-forgot" id="admin-forgot-link">Forgot Password?</a>
              </div>
              <div className="al-input-wrap">
                <span className="al-input-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  id="admin-password"
                  type={showPwd ? 'text' : 'password'}
                  className="al-input"
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  id="admin-toggle-pwd"
                  className="al-eye-btn"
                  onClick={() => setShowPwd(!showPwd)}
                  aria-label={showPwd ? 'Hide password' : 'Show password'}
                >
                  {showPwd ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember + Help */}
            <div className="al-options-row">
              <label className="al-remember" htmlFor="admin-remember">
                <input
                  type="checkbox"
                  id="admin-remember"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span className="al-checkmark" aria-hidden="true" />
                Remember me
              </label>
              <a href="#" className="al-help" id="admin-help-link">Need help?</a>
            </div>

            {/* Sign In */}
            <button
              type="submit"
              id="admin-signin-btn"
              className={`al-submit-btn${loading ? ' al-loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <span className="al-spinner" />
              ) : (
                <>
                  Sign In
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </>
              )}
            </button>

            {/* Divider */}
            <div className="al-divider"><span>or</span></div>

            {/* OTP */}
            <button
              type="button"
              id="admin-otp-btn"
              className="al-otp-btn"
              onClick={() => alert('OTP login coming soon!')}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Login with OTP
            </button>
          </form>

          {/* SSL Badge */}
          <div className="al-ssl-badge">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span>Secure login protected by<br/>256-bit SSL encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
