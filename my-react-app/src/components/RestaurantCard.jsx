import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiStar, FiClock } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import './RestaurantCard.css';

const RestaurantCard = ({ restaurant }) => {
  const { t } = useLanguage();

  return (
    <div className="restaurant-card fade-in">
      <div className="restaurant-image">
        <img src={restaurant.image} alt={restaurant.name} />
        <div className="restaurant-badge">
          <FiStar className="star-icon" />
          <span>{restaurant.rating || '4.8'}</span>
        </div>
      </div>

      <div className="restaurant-content">
        <h3 className="restaurant-name">{restaurant.name}</h3>
        
        <div className="restaurant-info">
          <div className="info-item">
            <FiMapPin className="info-icon" />
            <span>{restaurant.city}, {restaurant.address}</span>
          </div>
          
          <div className="info-item">
            <FiClock className="info-icon" />
            <span>{restaurant.workingHours || '10:00 - 23:00'}</span>
          </div>
        </div>

        <div className="restaurant-meta">
          <span className="cuisine-tag">{restaurant.cuisine}</span>
          <span className="price-tag">{restaurant.priceRange}</span>
        </div>

        <p className="restaurant-description">
          {restaurant.description || 'Уютное место с прекрасной атмосферой и изысканной кухней'}
        </p>

        <Link to={`/restaurant/${restaurant.id}`} className="btn btn-primary btn-block">
          {t('bookNow')}
        </Link>
      </div>
    </div>
  );
};

export default RestaurantCard;