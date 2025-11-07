import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter, FiX } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { restaurantService } from '../services/bookingService';
import RestaurantCard from '../components/RestaurantCard';
import { CUISINE_TYPES, CITIES } from '../utils/constants';
import './Restaurants.css';

const Restaurants = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    city: searchParams.get('city') || '',
    cuisine: searchParams.get('cuisine') || '',
    priceRange: searchParams.get('priceRange') || '',
  });

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.city) params.city = filters.city;
      if (filters.cuisine) params.cuisine = filters.cuisine;
      if (filters.priceRange) params.priceRange = filters.priceRange;

      const data = await restaurantService.getAllRestaurants(params);
      setRestaurants(data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const applyFilters = () => {
    const params = {};
    Object.keys(filters).forEach((key) => {
      if (filters[key]) params[key] = filters[key];
    });
    setSearchParams(params);
    fetchRestaurants();
    setShowFilters(false);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      city: '',
      cuisine: '',
      priceRange: '',
    });
    setSearchParams({});
    fetchRestaurants();
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="restaurants-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">{t('restaurants')}</h1>
          <button 
            className="btn btn-outline filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter /> {t('filter')}
          </button>
        </div>

        <div className={`filters-panel ${showFilters ? 'active' : ''}`}>
          <div className="filters-header">
            <h3>{t('filter')}</h3>
            <button className="close-filters" onClick={() => setShowFilters(false)}>
              <FiX />
            </button>
          </div>

          <div className="filters-content">
            <div className="filter-group">
              <label className="filter-label">{t('search')}</label>
              <input
                type="text"
                className="form-input"
                placeholder={t('searchPlaceholder')}
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">{t('location')}</label>
              <select
                className="form-select"
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
              >
                <option value="">{t('all')}</option>
                {CITIES.map((city) => (
                  <option key={city} value={city}>
                    {t(city.toLowerCase())}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">{t('cuisine')}</label>
              <select
                className="form-select"
                value={filters.cuisine}
                onChange={(e) => handleFilterChange('cuisine', e.target.value)}
              >
                <option value="">{t('all')}</option>
                {CUISINE_TYPES.map((cuisine) => (
                  <option key={cuisine} value={cuisine}>
                    {cuisine}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">{t('priceRange')}</label>
              <select
                className="form-select"
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              >
                <option value="">{t('all')}</option>
                <option value="$">$ - Бюджетный</option>
                <option value="$$">$$ - Средний</option>
                <option value="$$$">$$$ - Премиум</option>
              </select>
            </div>

            <div className="filter-actions">
              <button className="btn btn-primary btn-block" onClick={applyFilters}>
                Применить
              </button>
              {hasActiveFilters && (
                <button className="btn btn-secondary btn-block" onClick={clearFilters}>
                  Сбросить
                </button>
              )}
            </div>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="active-filters">
            <span>Активные фильтры:</span>
            {filters.search && (
              <span className="filter-tag">
                Поиск: {filters.search}
                <button onClick={() => handleFilterChange('search', '')}>
                  <FiX />
                </button>
              </span>
            )}
            {filters.city && (
              <span className="filter-tag">
                {t(filters.city.toLowerCase())}
                <button onClick={() => handleFilterChange('city', '')}>
                  <FiX />
                </button>
              </span>
            )}
            {filters.cuisine && (
              <span className="filter-tag">
                {filters.cuisine}
                <button onClick={() => handleFilterChange('cuisine', '')}>
                  <FiX />
                </button>
              </span>
            )}
            {filters.priceRange && (
              <span className="filter-tag">
                {filters.priceRange}
                <button onClick={() => handleFilterChange('priceRange', '')}>
                  <FiX />
                </button>
              </span>
            )}
          </div>
        )}

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : restaurants.length === 0 ? (
          <div className="no-results">
            <h3>Рестораны не найдены</h3>
            <p>Попробуйте изменить параметры поиска</p>
          </div>
        ) : (
          <>
            <div className="results-count">
              Найдено: {restaurants.length} {restaurants.length === 1 ? 'ресторан' : 'ресторанов'}
            </div>
            <div className="grid grid-3">
              {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Restaurants;