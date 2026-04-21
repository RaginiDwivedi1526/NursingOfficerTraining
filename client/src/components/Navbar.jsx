import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import logo from '../assets/logo.png';

function Navbar() {
  const { user, logoutUser } = useAuth();
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <nav className="app-nav">
      <Link to="/" className="nav-logo-link">
        <img src={logo} alt="NursingOfficer Training" className="nav-logo-img" />
      </Link>
      <div className="nav-links">
        {isLanding && (
          <>
            <a href="#features">Features</a>
            <a href="#courses">Courses</a>
            <a href="#pricing">Pricing</a>
          </>
        )}
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/tests">Tests</Link>
            <div className="nav-user-info">
              <div className="nav-user-avatar">{user.name?.charAt(0).toUpperCase()}</div>
              <span className="nav-user-name">{user.name}</span>
              <button className="nav-logout" onClick={logoutUser}>Logout</button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="nav-cta">Sign Up Free</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
