import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import AuthModal from './AuthModal';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const { user, logout, isAdmin } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-content">
            <Link to="/" className="navbar-brand">
              <span className="brand-icon">🍽️</span>
              <span className="brand-name">TableBook</span>
            </Link>

            <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
              <Link to="/" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                {t('home')}
              </Link>
              <Link to="/restaurants" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                {t('restaurants')}
              </Link>
              
              {user && (
                <>
                  <Link to="/my-bookings" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                    {t('myBookings')}
                  </Link>
                  <Link to="/profile" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                    {t('profile')}
                  </Link>
                  {isAdmin() && (
                    <Link to="/admin" className="navbar-link admin-link" onClick={() => setIsMenuOpen(false)}>
                      {t('admin')}
                    </Link>
                  )}
                </>
              )}
            </div>

            <div className="navbar-actions">
              <ThemeToggle />
              <LanguageSwitcher />
              
              {user ? (
                <div className="user-menu">
                  <div className="user-info">
                    <FiUser className="user-icon" />
                    <span className="user-name">{user.name}</span>
                  </div>
                  <button onClick={handleLogout} className="btn-logout">
                    <FiLogOut /> {t('logout')}
                  </button>
                </div>
              ) : (
                <div className="auth-buttons">
                  <button onClick={() => handleAuthClick('login')} className="btn btn-outline">
                    {t('login')}
                  </button>
                  <button onClick={() => handleAuthClick('register')} className="btn btn-primary">
                    {t('register')}
                  </button>
                </div>
              )}

              <button 
                className="navbar-toggle" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <FiX /> : <FiMenu />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isAuthModalOpen && (
        <AuthModal 
          mode={authMode} 
          onClose={() => setIsAuthModalOpen(false)} 
        />
      )}
    </>
  );
};

export default Navbar;