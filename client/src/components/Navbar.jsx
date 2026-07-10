import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Rocket, LayoutDashboard, ClipboardList, LogOut, Shield } from 'lucide-react';
import logo from '../assets/logo.png';

function Navbar() {
  const { user, logoutUser } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isLanding = location.pathname === '/';

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleAnchorClick = (e, id) => {
    closeMenu();
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        const offset = 80; // Height of the navbar
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <nav className="app-nav">
      <Link to="/" className="nav-logo-link" onClick={closeMenu}>
        <img src={logo} alt="NursingOfficer Training" className="nav-logo-img" />
      </Link>

      <button className="nav-mobile-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`nav-links ${isOpen ? 'open' : ''}`}>
        <a href="/#features" onClick={(e) => handleAnchorClick(e, 'features')}>Features</a>
        <a href="/#courses" onClick={(e) => handleAnchorClick(e, 'courses')}>Courses</a>
        <a href="/#pricing" onClick={(e) => handleAnchorClick(e, 'pricing')}>Pricing</a>
        {user ? (
          <>
            {user.role === 'admin' && (
              <Link to="/admin" onClick={closeMenu} style={{ color: 'var(--crimson)', fontWeight: 'bold' }}>
                <Shield size={14} className="nav-icon" /> Admin Panel
              </Link>
            )}
            <Link to="/dashboard" onClick={closeMenu}><LayoutDashboard size={14} className="nav-icon" /> Dashboard</Link>
            <Link to="/tests" onClick={closeMenu}><ClipboardList size={14} className="nav-icon" /> Tests</Link>
            <Link to="/live-classes" onClick={closeMenu}><Rocket size={14} className="nav-icon" /> Live Classes</Link>
            <div className="nav-user-info">
              <div className="nav-user-avatar">{user.name?.charAt(0).toUpperCase()}</div>
              <span className="nav-user-name">{user.name}</span>
              <button className="nav-logout" onClick={() => { logoutUser(); closeMenu(); }}><LogOut size={14} /> Logout</button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" onClick={closeMenu}>Login</Link>
            <Link to="/register" className="nav-cta" onClick={closeMenu}><Rocket size={14} /> Sign Up Free</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
