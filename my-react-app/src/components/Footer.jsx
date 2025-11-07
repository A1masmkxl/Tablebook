import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter, FiMail, FiPhone } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import './Footer.css';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">
              <span className="brand-icon">🍽️</span>
              TableBook
            </h3>
            <p className="footer-description">
              {t('welcomeSubtitle')}
            </p>
            <div className="social-links">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FiInstagram />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FiFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FiTwitter />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">{t('restaurants')}</h4>
            <ul className="footer-links">
              <li><Link to="/restaurants">{t('all')}</Link></li>
              <li><Link to="/restaurants?city=Almaty">{t('almaty')}</Link></li>
              <li><Link to="/restaurants?city=Astana">{t('astana')}</Link></li>
              <li><Link to="/restaurants?city=Shymkent">{t('shymkent')}</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">{t('profile')}</h4>
            <ul className="footer-links">
              <li><Link to="/my-bookings">{t('myBookings')}</Link></li>
              <li><Link to="/profile">{t('profile')}</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Контакты</h4>
            <div className="contact-info">
              <div className="contact-item">
                <FiMail />
                <span>info@tablebook.kz</span>
              </div>
              <div className="contact-item">
                <FiPhone />
                <span>+7 (700) 123-45-67</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 TableBook. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;