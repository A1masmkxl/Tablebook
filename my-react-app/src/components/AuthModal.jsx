import React, { useState } from 'react';
import { FiX, FiMail, FiLock, FiUser, FiPhone } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { toast } from 'react-toastify';
import './AuthModal.css';

const AuthModal = ({ mode, onClose }) => {
  const [isLogin, setIsLogin] = useState(mode === 'login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const { t } = useLanguage();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const result = await login(formData.email, formData.password);
        if (result.success) {
          toast.success('Вход выполнен успешно!');
          onClose();
        } else {
          toast.error(result.error);
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          toast.error('Пароли не совпадают');
          setLoading(false);
          return;
        }
        const result = await register({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        });
        if (result.success) {
          toast.success('Регистрация успешна!');
          onClose();
        } else {
          toast.error(result.error);
        }
      }
    } catch (error) {
      toast.error('Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FiX />
        </button>

        <h2 className="auth-title">
          {isLogin ? t('loginTitle') : t('registerTitle')}
        </h2>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <>
              <div className="form-group">
                <label className="form-label">
                  <FiUser /> {t('fullName')}
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <FiPhone /> {t('phone')}
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="form-input"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label className="form-label">
              <FiMail /> {t('email')}
            </label>
            <input
              type="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <FiLock /> {t('password')}
            </label>
            <input
              type="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label className="form-label">
                <FiLock /> {t('confirmPassword')}
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="form-input"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? t('loading') : isLogin ? t('login') : t('register')}
          </button>
        </form>

        <div className="auth-switch">
          <p>
            {isLogin ? t('dontHaveAccount') : t('alreadyHaveAccount')}
            {' '}
            <button
              type="button"
              className="link-button"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? t('registerHere') : t('loginHere')}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;