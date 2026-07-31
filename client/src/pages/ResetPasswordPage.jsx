import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/api';
import { useAuth } from '../context/AuthContext';

function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { token } = useParams();
  const navigate = useNavigate();
  const { loginUser } = useAuth(); // If backend returns auth data on reset, we can log them in. Wait, the backend returns { success: true, token }. We might not have full user profile. Just redirect to login.

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      await resetPassword(token, { password });
      setSuccess('Password reset successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not reset password. The link might be invalid or expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Reset Password 🔒</h2>
        <p className="subtitle">Please enter your new password below</p>
        
        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success" style={{ background: 'rgba(46, 204, 113, 0.1)', color: '#2ecc71', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', border: '1px solid rgba(46, 204, 113, 0.3)' }}>{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>New Password</label>
            <input 
              type="password" 
              placeholder="Enter new password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input 
              type="password" 
              placeholder="Confirm new password" 
              value={confirmPassword} 
              onChange={e => setConfirmPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="auth-btn" disabled={loading || !!success}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
