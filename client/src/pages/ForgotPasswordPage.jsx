import { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../services/api';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [directResetUrl, setDirectResetUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setDirectResetUrl('');
    setLoading(true);

    try {
      const cleanEmail = email.trim().toLowerCase();
      const res = await forgotPassword({ email: cleanEmail });
      
      if (res.data?.resetUrl) {
        setDirectResetUrl(res.data.resetUrl);
        setSuccess('Reset link generated! Click the button below to set your new password:');
      } else {
        setSuccess('Email sent! Please check your inbox (and Spam folder) for the reset link.');
      }
    } catch (err) {
      console.error('Forgot password error:', err);
      const msg = err.response?.data?.message || err.message || 'Could not process request. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Forgot Password 🔑</h2>
        <p className="subtitle">Enter your email and we'll send you a link to reset your password</p>
        
        {error && <div className="auth-error">{error}</div>}
        {success && (
          <div className="auth-success" style={{ background: 'rgba(46, 204, 113, 0.1)', color: '#2ecc71', padding: '14px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', border: '1px solid rgba(46, 204, 113, 0.3)' }}>
            <div>{success}</div>
            {directResetUrl && (
              <div style={{ marginTop: '12px' }}>
                <a
                  href={directResetUrl}
                  style={{
                    display: 'inline-block',
                    background: '#4f46e5',
                    color: '#ffffff',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}
                >
                  Reset Password Now →
                </a>
              </div>
            )}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="you@example.com" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        
        <div className="auth-link">
          Remember your password? <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
