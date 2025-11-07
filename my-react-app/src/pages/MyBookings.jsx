import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiUsers, FiMapPin, FiX } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { bookingService } from '../services/bookingService';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import './MyBookings.css';

const MyBookings = () => {
  const { t } = useLanguage();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await bookingService.getUserBookings();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Ошибка загрузки бронирований');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Вы уверены, что хотите отменить бронирование?')) {
      return;
    }

    try {
      await bookingService.cancelBooking(bookingId);
      toast.success(t('bookingCancelled'));
      fetchBookings();
    } catch (error) {
      toast.error('Ошибка при отмене бронирования');
    }
  };

  const isUpcoming = (booking) => {
    const bookingDate = new Date(booking.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return bookingDate >= today && booking.status !== 'cancelled';
  };

  const upcomingBookings = bookings.filter(isUpcoming);
  const pastBookings = bookings.filter(booking => !isUpcoming(booking));

  const getStatusBadge = (status) => {
    const badges = {
      pending: { class: 'badge-warning', text: t('pending') },
      confirmed: { class: 'badge-success', text: t('confirmed') },
      cancelled: { class: 'badge-secondary', text: t('cancelled') },
      completed: { class: 'badge-info', text: t('completed') },
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
    <div className="my-bookings-page">
      <div className="container">
        <h1 className="page-title">{t('myBookingsTitle')}</h1>

        <div className="bookings-tabs">
          <button
            className={`tab-button ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            {t('upcomingBookings')} ({upcomingBookings.length})
          </button>
          <button
            className={`tab-button ${activeTab === 'past' ? 'active' : ''}`}
            onClick={() => setActiveTab('past')}
          >
            {t('pastBookings')} ({pastBookings.length})
          </button>
        </div>

        {activeTab === 'upcoming' && (
          <div className="bookings-list">
            {upcomingBookings.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📅</div>
                <h3>{t('noBookings')}</h3>
                <p>Забронируйте столик в одном из наших ресторанов</p>
                <Link to="/restaurants" className="btn btn-primary">
                  Посмотреть рестораны
                </Link>
              </div>
            ) : (
              upcomingBookings.map((booking) => (
                <div key={booking.id} className="booking-card card">
                  <div className="booking-image">
                    <img src={booking.restaurant.image} alt={booking.restaurant.name} />
                  </div>
                  <div className="booking-info">
                    <div className="booking-header">
                      <div>
                        <h3>{booking.restaurant.name}</h3>
                        <p className="booking-location">
                          <FiMapPin />
                          {booking.restaurant.city}, {booking.restaurant.address}
                        </p>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>

                    <div className="booking-details">
                      <div className="detail-item">
                        <FiCalendar className="detail-icon" />
                        <span>{format(new Date(booking.date), 'dd.MM.yyyy')}</span>
                      </div>
                      <div className="detail-item">
                        <FiClock className="detail-icon" />
                        <span>{booking.time}</span>
                      </div>
                      <div className="detail-item">
                        <FiUsers className="detail-icon" />
                        <span>{booking.guests} {t('guests')}</span>
                      </div>
                    </div>

                    {booking.specialRequests && (
                      <div className="special-requests">
                        <strong>Особые пожелания:</strong>
                        <p>{booking.specialRequests}</p>
                      </div>
                    )}

                    <div className="booking-actions">
                      <Link to={`/restaurant/${booking.restaurant.id}`} className="btn btn-outline">
                        Детали ресторана
                      </Link>
                      {booking.status !== 'cancelled' && (
                        <button
                          className="btn btn-secondary"
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          <FiX /> Отменить
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'past' && (
          <div className="bookings-list">
            {pastBookings.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📜</div>
                <h3>Нет прошлых бронирований</h3>
              </div>
            ) : (
              pastBookings.map((booking) => (
                <div key={booking.id} className="booking-card card past">
                  <div className="booking-image">
                    <img src={booking.restaurant.image} alt={booking.restaurant.name} />
                  </div>
                  <div className="booking-info">
                    <div className="booking-header">
                      <div>
                        <h3>{booking.restaurant.name}</h3>
                        <p className="booking-location">
                          <FiMapPin />
                          {booking.restaurant.city}, {booking.restaurant.address}
                        </p>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>

                    <div className="booking-details">
                      <div className="detail-item">
                        <FiCalendar className="detail-icon" />
                        <span>{format(new Date(booking.date), 'dd.MM.yyyy')}</span>
                      </div>
                      <div className="detail-item">
                        <FiClock className="detail-icon" />
                        <span>{booking.time}</span>
                      </div>
                      <div className="detail-item">
                        <FiUsers className="detail-icon" />
                        <span>{booking.guests} {t('guests')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;