import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiMapPin, FiClock, FiDollarSign, FiStar, FiArrowLeft, FiPhone, FiMail } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { restaurantService } from '../services/bookingService';
import BookingModal from '../components/BookingModal';
import { toast } from 'react-toastify';
import './RestaurantDetail.css';

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useAuth();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    fetchRestaurant();
  }, [id]);

  const fetchRestaurant = async () => {
    try {
      const data = await restaurantService.getRestaurantById(id);
      setRestaurant(data);
    } catch (error) {
      console.error('Error fetching restaurant:', error);
      toast.error('Ресторан не найден');
      navigate('/restaurants');
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = () => {
    if (!user) {
      toast.error('Пожалуйста, войдите в систему для бронирования');
      return;
    }
    setIsBookingModalOpen(true);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!restaurant) {
    return null;
  }

  return (
    <div className="restaurant-detail-page">
      <div className="detail-hero">
        <img src={restaurant.image} alt={restaurant.name} />
        <div className="detail-hero-overlay">
          <div className="container">
            <button className="back-button" onClick={() => navigate(-1)}>
              <FiArrowLeft /> Назад
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="detail-content">
          <div className="detail-main">
            <div className="detail-header">
              <div>
                <h1 className="detail-title">{restaurant.name}</h1>
                <div className="detail-rating">
                  <FiStar className="star-icon" />
                  <span>{restaurant.rating || '4.8'}</span>
                  <span className="reviews-count">(250+ отзывов)</span>
                </div>
              </div>
              <button className="btn btn-primary btn-large" onClick={handleBookClick}>
                {t('bookTable')}
              </button>
            </div>

            <div className="detail-info-grid">
              <div className="info-card">
                <FiMapPin className="info-icon" />
                <div>
                  <h4>{t('location')}</h4>
                  <p>{restaurant.city}, {restaurant.address}</p>
                </div>
              </div>

              <div className="info-card">
                <FiClock className="info-icon" />
                <div>
                  <h4>{t('workingHours')}</h4>
                  <p>{restaurant.workingHours || '10:00 - 23:00'}</p>
                </div>
              </div>

              <div className="info-card">
                <FiDollarSign className="info-icon" />
                <div>
                  <h4>{t('priceRange')}</h4>
                  <p>{restaurant.priceRange}</p>
                </div>
              </div>

              <div className="info-card">
                <span className="cuisine-badge">{restaurant.cuisine}</span>
              </div>
            </div>

            <div className="detail-section">
              <h2 className="section-title">О ресторане</h2>
              <p className="detail-description">
                {restaurant.description || 
                  'Добро пожаловать в наш ресторан! Мы предлагаем изысканные блюда, приготовленные из свежих и качественных ингредиентов. Наша команда профессиональных поваров создаст для вас незабываемый кулинарный опыт. Уютная атмосфера и внимательный сервис сделают ваш визит особенным.'}
              </p>
            </div>

            <div className="detail-section">
              <h2 className="section-title">Особенности</h2>
              <div className="features-list">
                <div className="feature-item">
                  <span className="feature-icon">🍷</span>
                  <span>Винная карта</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🅿️</span>
                  <span>Парковка</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">👶</span>
                  <span>Детское меню</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📶</span>
                  <span>WiFi</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">💳</span>
                  <span>Безналичный расчет</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🎵</span>
                  <span>Живая музыка</span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h2 className="section-title">Галерея</h2>
              <div className="gallery-grid">
                <img src={restaurant.image} alt="Gallery 1" />
                <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600" alt="Gallery 2" />
                <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600" alt="Gallery 3" />
                <img src="https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=600" alt="Gallery 4" />
              </div>
            </div>
          </div>

          <div className="detail-sidebar">
            <div className="booking-card card">
              <h3>Забронировать столик</h3>
              <p>Выберите удобное время и количество гостей</p>
              <button className="btn btn-primary btn-block" onClick={handleBookClick}>
                {t('bookNow')}
              </button>
            </div>

            <div className="contact-card card">
              <h3>Контакты</h3>
              <div className="contact-item">
                <FiPhone />
                <span>{restaurant.phone || '+7 (700) 123-45-67'}</span>
              </div>
              <div className="contact-item">
                <FiMail />
                <span>{restaurant.email || 'info@restaurant.kz'}</span>
              </div>
            </div>

            <div className="map-card card">
              <h3>Расположение</h3>
              <div className="map-placeholder">
                <iframe
                  title="Restaurant Location"
                  src={`https://maps.google.com/maps?q=${restaurant.city}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  width="100%"
                  height="250"
                  style={{ border: 0, borderRadius: '8px' }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isBookingModalOpen && (
        <BookingModal
          restaurant={restaurant}
          onClose={() => setIsBookingModalOpen(false)}
          onSuccess={() => {
            setIsBookingModalOpen(false);
            navigate('/my-bookings');
          }}
        />
      )}
    </div>
  );
};

export default RestaurantDetail;