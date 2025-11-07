import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiCalendar, FiTrendingUp, FiShoppingBag } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import api from '../../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const { t } = useLanguage();
  const [stats, setStats] = useState({
    totalRestaurants: 0,
    totalBookings: 0,
    totalUsers: 0,
    todayBookings: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, bookingsRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/bookings?limit=5'),
      ]);
      
      setStats(statsRes.data);
      setRecentBookings(bookingsRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="container">
        <h1 className="page-title">{t('dashboard')}</h1>

        <div className="stats-grid">
          <div className="stat-card card">
            <div className="stat-icon" style={{ backgroundColor: '#4dabf7' }}>
              <FiShoppingBag />
            </div>
            <div className="stat-content">
              <h3>{t('totalRestaurants')}</h3>
              <p className="stat-number">{stats.totalRestaurants}</p>
            </div>
          </div>

          <div className="stat-card card">
            <div className="stat-icon" style={{ backgroundColor: '#51cf66' }}>
              <FiCalendar />
            </div>
            <div className="stat-content">
              <h3>{t('totalBookings')}</h3>
              <p className="stat-number">{stats.totalBookings}</p>
            </div>
          </div>

          <div className="stat-card card">
            <div className="stat-icon" style={{ backgroundColor: '#ff6b6b' }}>
              <FiUsers />
            </div>
            <div className="stat-content">
              <h3>{t('totalUsers')}</h3>
              <p className="stat-number">{stats.totalUsers}</p>
            </div>
          </div>

          <div className="stat-card card">
            <div className="stat-icon" style={{ backgroundColor: '#ffd43b' }}>
              <FiTrendingUp />
            </div>
            <div className="stat-content">
              <h3>{t('todayBookings')}</h3>
              <p className="stat-number">{stats.todayBookings}</p>
            </div>
          </div>
        </div>

        <div className="admin-actions">
          <Link to="/admin/restaurants" className="action-card card">
            <FiShoppingBag className="action-icon" />
            <h3>{t('manageRestaurants')}</h3>
            <p>Управление ресторанами и их информацией</p>
          </Link>

          <Link to="/admin/bookings" className="action-card card">
            <FiCalendar className="action-icon" />
            <h3>{t('manageBookings')}</h3>
            <p>Просмотр и управление бронированиями</p>
          </Link>

          <Link to="/admin/users" className="action-card card">
            <FiUsers className="action-icon" />
            <h3>{t('manageUsers')}</h3>
            <p>Управление пользователями системы</p>
          </Link>
        </div>

        <div className="recent-bookings card">
          <h2>Последние бронирования</h2>
          <div className="bookings-table">
            <table>
              <thead>
                <tr>
                  <th>Ресторан</th>
                  <th>Клиент</th>
                  <th>Дата</th>
                  <th>Время</th>
                  <th>Гостей</th>
                  <th>Статус</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.restaurant?.name}</td>
                    <td>{booking.user?.name}</td>
                    <td>{new Date(booking.date).toLocaleDateString()}</td>
                    <td>{booking.time}</td>
                    <td>{booking.guests}</td>
                    <td>
                      <span className={`badge badge-${booking.status}`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;