import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiSave } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { authService } from '../services/authService';
import { toast } from 'react-toastify';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.updateProfile(formData);
      toast.success('Профиль успешно обновлен!');
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      toast.error('Ошибка при обновлении профиля');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-avatar">
              <FiUser />
            </div>
            <div>
              <h1 className="profile-name">{user?.name}</h1>
              <p className="profile-email">{user?.email}</p>
            </div>
          </div>

          <div className="profile-content">
            <div className="profile-card card">
              <div className="card-header">
                <h2>{t('profileTitle')}</h2>
                {!isEditing && (
                  <button
                    className="btn btn-outline"
                    onClick={() => setIsEditing(true)}
                  >
                    {t('editProfile')}
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="profile-form">
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

                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      <FiSave /> {loading ? t('loading') : t('saveChanges')}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          name: user?.name || '',
                          email: user?.email || '',
                          phone: user?.phone || '',
                        });
                      }}
                    >
                      {t('cancel')}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="profile-info">
                  <div className="info-row">
                    <div className="info-label">
                      <FiUser /> {t('fullName')}
                    </div>
                    <div className="info-value">{user?.name}</div>
                  </div>

                  <div className="info-row">
                    <div className="info-label">
                      <FiMail /> {t('email')}
                    </div>
                    <div className="info-value">{user?.email}</div>
                  </div>

                  <div className="info-row">
                    <div className="info-label">
                      <FiPhone /> {t('phone')}
                    </div>
                    <div className="info-value">{user?.phone}</div>
                  </div>

                  <div className="info-row">
                    <div className="info-label">Роль</div>
                    <div className="info-value">
                      <span className={`badge ${user?.role === 'admin' ? 'badge-warning' : 'badge-info'}`}>
                        {user?.role === 'admin' ? 'Администратор' : 'Пользователь'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="profile-stats">
              <div className="stat-card card">
                <div className="stat-icon">📅</div>
                <div className="stat-content">
                  <h3>Всего бронирований</h3>
                  <p className="stat-number">12</p>
                </div>
              </div>

              <div className="stat-card card">
                <div className="stat-icon">⭐</div>
                <div className="stat-content">
                  <h3>Любимых ресторанов</h3>
                  <p className="stat-number">5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;