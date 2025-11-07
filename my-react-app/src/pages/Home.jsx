import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiArrowRight } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { restaurantService } from '../services/bookingService';
import RestaurantCard from '../components/RestaurantCard';
import './Home.css';

const Home = () => {
  const { t } = useLanguage();
  const [popularRestaurants, setPopularRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPopularRestaurants();
  }, []);

  const fetchPopularRestaurants = async () => {
    try {
      const data = await restaurantService.getAllRestaurants({ limit: 6 });
      setPopularRestaurants(data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/restaurants?search=${searchQuery}`;
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1 className="hero-title fade-in">
            {t('welcomeTitle')}
          </h1>
          <p className="hero-subtitle fade-in">
            {t('welcomeSubtitle')}
          </p>

          <form onSubmit={handleSearch} className="search-form fade-in">
            <div className="search-input-wrapper">
              <FiSearch className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary search-btn">
              {t('search')}
            </button>
          </form>

          <div className="hero-stats fade-in">
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">{t('restaurants')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">{t('totalBookings')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">4.9</span>
              <span className="stat-label">{t('rating')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Restaurants Section */}
      <section className="popular-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('popularRestaurants')}</h2>
            <Link to="/restaurants" className="view-all-link">
              {t('viewAll')} <FiArrowRight />
            </Link>
          </div>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="grid grid-3">
              {popularRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Почему выбирают нас?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Простое бронирование</h3>
              <p>Забронируйте столик всего за несколько кликов</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Мгновенное подтверждение</h3>
              <p>Получите подтверждение сразу после бронирования</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌟</div>
              <h3>Лучшие рестораны</h3>
              <p>Только проверенные и популярные заведения</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Безопасность</h3>
              <p>Ваши данные защищены и конфиденциальны</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="cities-section">
        <div className="container">
          <h2 className="section-title">Выберите город</h2>
          <div className="cities-grid">
            <Link to="/restaurants?city=Almaty" className="city-card">
              <img 
                src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600" 
                alt="Almaty" 
              />
              <div className="city-overlay">
                <h3>{t('almaty')}</h3>
                <p>30+ ресторанов</p>
              </div>
            </Link>
            <Link to="/restaurants?city=Astana" className="city-card">
              <img 
                src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600" 
                alt="Astana" 
              />
              <div className="city-overlay">
                <h3>{t('astana')}</h3>
                <p>15+ ресторанов</p>
              </div>
            </Link>
            <Link to="/restaurants?city=Shymkent" className="city-card">
              <img 
                src="https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?w=600" 
                alt="Shymkent" 
              />
              <div className="city-overlay">
                <h3>{t('shymkent')}</h3>
                <p>10+ ресторанов</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;