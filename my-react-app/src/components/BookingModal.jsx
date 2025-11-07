import React, { useState } from 'react';
import { FiX, FiCalendar, FiClock, FiUsers } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { bookingService } from '../services/bookingService';
import { toast } from 'react-toastify';
import { TIME_SLOTS, GUEST_OPTIONS } from '../utils/constants';
import './BookingModal.css';

const BookingModal = ({ restaurant, onClose, onSuccess }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    guests: 2,
    specialRequests: '',
  });

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Пожалуйста, войдите в систему');
      return;
    }

    if (!bookingData.date || !bookingData.time) {
      toast.error('Выберите дату и время');
      return;
    }

    setLoading(true);

    try {
      await bookingService.createBooking({
        restaurantId: restaurant.id,
        date: bookingData.date,
        time: bookingData.time,
        guests: bookingData.guests,
        specialRequests: bookingData.specialRequests,
      });

      toast.success(t('bookingSuccess'));
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Booking error:', error);
      const errorData = error.response?.data;
      
      // Показываем детальные ошибки валидации
      if (errorData?.errors) {
        const errorMessages = Object.values(errorData.errors).join(', ');
        toast.error(errorMessages || 'Ошибка валидации');
      } else if (errorData?.message) {
        toast.error(errorData.message);
      } else {
        toast.error('Ошибка при создании бронирования');
      }
    } finally {
      setLoading(false);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const today = new Date();
    const maxDate = new Date(today.setMonth(today.getMonth() + 3));
    return maxDate.toISOString().split('T')[0];
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content booking-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FiX />
        </button>

        <div className="booking-header">
          <img src={restaurant.image} alt={restaurant.name} className="booking-restaurant-image" />
          <div className="booking-restaurant-info">
            <h2 className="booking-title">{t('bookTable')}</h2>
            <h3 className="booking-restaurant-name">{restaurant.name}</h3>
            <p className="booking-restaurant-location">
              {restaurant.city}, {restaurant.address}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                <FiCalendar /> {t('selectDate')}
              </label>
              <input
                type="date"
                name="date"
                className="form-input"
                value={bookingData.date}
                onChange={handleChange}
                min={getMinDate()}
                max={getMaxDate()}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <FiClock /> {t('selectTime')}
              </label>
              <select
                name="time"
                className="form-select"
                value={bookingData.time}
                onChange={handleChange}
                required
              >
                <option value="">{t('selectTime')}</option>
                {TIME_SLOTS.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <FiUsers /> {t('selectGuests')}
            </label>
            <select
              name="guests"
              className="form-select"
              value={bookingData.guests}
              onChange={handleChange}
              required
            >
              {GUEST_OPTIONS.map((num) => (
                <option key={num} value={num}>
                  {num} {t('guests')}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Особые пожелания (опционально)</label>
            <textarea
              name="specialRequests"
              className="form-input"
              rows="3"
              value={bookingData.specialRequests}
              onChange={handleChange}
              placeholder="Например: окно, детский стульчик..."
            />
          </div>

          <div className="booking-summary">
            <h4>Детали бронирования:</h4>
            <div className="summary-item">
              <span>Дата:</span>
              <strong>{bookingData.date || '-'}</strong>
            </div>
            <div className="summary-item">
              <span>Время:</span>
              <strong>{bookingData.time || '-'}</strong>
            </div>
            <div className="summary-item">
              <span>Гостей:</span>
              <strong>{bookingData.guests}</strong>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? t('loading') : t('confirmBooking')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;