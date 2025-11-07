import React, { useState, useEffect } from 'react';
import { FiCalendar, FiFilter } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import './ManageBookings.css';

const ManageBookings = () => {
  const { t } = useLanguage();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/admin/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Ошибка загрузки бронирований');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await api.patch(`/admin/bookings/${bookingId}`, { status: newStatus });
      toast.success('Статус обновлен!');
      fetchBookings();
    } catch (error) {
      toast.error('Ошибка при обновлении статуса');
    }
  };

  const filteredBookings = statusFilter === 'all'
    ? bookings
    : bookings.filter(booking => booking.status === statusFilter);

  const getStatusBadge = (status) => {
    const badges = {
      pending: { class: 'badge-warning', text: 'В ожидании' },
      confirmed: { class: 'badge-success', text: 'Подтверждено' },
      cancelled: { class: 'badge-secondary', text: 'Отменено' },
      completed: { class: 'badge-info', text: 'Завершено' },
    };
    const badge = badges[status] || badges.pending;
    return <span className={`badge ${badge.class}`}>{badge.text}</span>;
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="manage-bookings">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">{t('manageBookings')}</h1>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
              onClick={() => setStatusFilter('all')}
            >
              Все ({bookings.length})
            </button>
            <button
              className={`filter-btn ${statusFilter === 'pending' ? 'active' : ''}`}
              onClick={() => setStatusFilter('pending')}
            >
              В ожидании ({bookings.filter(b => b.status === 'pending').length})
            </button>
            <button
              className={`filter-btn ${statusFilter === 'confirmed' ? 'active' : ''}`}
              onClick={() => setStatusFilter('confirmed')}
            >
              Подтверждено ({bookings.filter(b => b.status === 'confirmed').length})
            </button>
          </div>
        </div>

        <div className="bookings-table-container card">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Ресторан</th>
                <th>Клиент</th>
                <th>Дата</th>
                <th>Время</th>
                <th>Гостей</th>
                <th>Статус</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>#{booking.id.toString().slice(-6)}</td>
                  <td>
                    <div className="table-restaurant">
                      <img src={booking.restaurant?.image} alt="" />
                      <span>{booking.restaurant?.name}</span>
                    </div>
                  </td>
                  <td>
                    <div className="table-user">
                      <strong>{booking.user?.name}</strong>
                      <span>{booking.user?.email}</span>
                    </div>
                  </td>
                  <td>{format(new Date(booking.date), 'dd.MM.yyyy')}</td>
                  <td>{booking.time}</td>
                  <td>{booking.guests}</td>
                  <td>{getStatusBadge(booking.status)}</td>
                  <td>
                    <select
                      className="status-select"
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                    >
                      <option value="pending">В ожидании</option>
                      <option value="confirmed">Подтвердить</option>
                      <option value="cancelled">Отменить</option>
                      <option value="completed">Завершить</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredBookings.length === 0 && (
            <div className="no-data">
              <FiCalendar size={48} />
              <p>Нет бронирований</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;