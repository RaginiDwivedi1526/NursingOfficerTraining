import { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../services/api';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await forgotPassword({ email });
      setSuccess('Email sent! Please check your inbox for the reset link.');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not process request. Please try again.');
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
        {success && <div className="auth-success" style={{ background: 'rgba(46, 204, 113, 0.1)', color: '#2ecc71', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', border: '1px solid rgba(46, 204, 113, 0.3)' }}>{success}</div>}
        
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
