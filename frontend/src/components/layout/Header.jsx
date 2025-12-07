import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  CheckSquare, 
  LayoutDashboard, 
  ListTodo, 
  User, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import './Header.css';

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/tasks', label: 'Tasks', icon: ListTodo },
    { path: '/account', label: 'Account', icon: User },
  ];

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <CheckSquare size={28} className="logo-icon" />
          <span className="logo-text">TaskFlow</span>
        </Link>

        {isAuthenticated && (
          <>
            <nav className={`header-nav ${mobileMenuOpen ? 'open' : ''}`}>
              {navLinks.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`nav-link ${isActive(path) ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </Link>
              ))}
              <button className="nav-link logout-btn" onClick={handleLogout}>
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </nav>

            <div className="header-user">
              <span className="user-greeting">
                Hi, <strong>{user?.name?.split(' ')[0]}</strong>
              </span>
              <button
                className="mobile-menu-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </>
        )}

        {!isAuthenticated && (
          <div className="header-actions">
            <Link to="/login" className="auth-link">Login</Link>
            <Link to="/register" className="auth-link primary">Sign Up</Link>
          </div>
        )}
      </div>
    </header>
  );
}
