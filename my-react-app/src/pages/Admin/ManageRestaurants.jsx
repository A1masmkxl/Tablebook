import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiSearch } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import { restaurantService } from '../../services/bookingService';
import { toast } from 'react-toastify';
import { CUISINE_TYPES, CITIES } from '../../utils/constants';
import './ManageRestaurants.css';

const ManageRestaurants = () => {
  const { t } = useLanguage();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    address: '',
    cuisine: '',
    priceRange: '',
    image: '',
    description: '',
    phone: '',
    email: '',
    workingHours: '',
    rating: 4.5,
  });

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const data = await restaurantService.getAllRestaurants();
      setRestaurants(data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      toast.error('Ошибка загрузки ресторанов');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingRestaurant) {
        await restaurantService.updateRestaurant(editingRestaurant.id, formData);
        toast.success('Ресторан успешно обновлен!');
      } else {
        await restaurantService.createRestaurant(formData);
        toast.success('Ресторан успешно добавлен!');
      }
      
      setShowModal(false);
      resetForm();
      fetchRestaurants();
    } catch (error) {
      toast.error('Ошибка при сохранении ресторана');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (restaurant) => {
    setEditingRestaurant(restaurant);
    setFormData({
      name: restaurant.name,
      city: restaurant.city,
      address: restaurant.address,
      cuisine: restaurant.cuisine,
      priceRange: restaurant.priceRange,
      image: restaurant.image,
      description: restaurant.description || '',
      phone: restaurant.phone || '',
      email: restaurant.email || '',
      workingHours: restaurant.workingHours || '',
      rating: restaurant.rating || 4.5,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот ресторан?')) {
      return;
    }

    try {
      await restaurantService.deleteRestaurant(id);
      toast.success('Ресторан успешно удален!');
      fetchRestaurants();
    } catch (error) {
      toast.error('Ошибка при удалении ресторана');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      city: '',
      address: '',
      cuisine: '',
      priceRange: '',
      image: '',
      description: '',
      phone: '',
      email: '',
      workingHours: '',
      rating: 4.5,
    });
    setEditingRestaurant(null);
  };

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="manage-restaurants">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">{t('manageRestaurants')}</h1>
          <button
            className="btn btn-primary"
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
          >
            <FiPlus /> {t('addRestaurant')}
          </button>
        </div>

        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            className="form-input"
            placeholder="Поиск ресторанов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="restaurants-grid">
            {filteredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="restaurant-admin-card card">
                <img src={restaurant.image} alt={restaurant.name} />
                <div className="card-content">
                  <h3>{restaurant.name}</h3>
                  <p className="location">{restaurant.city}, {restaurant.address}</p>
                  <div className="tags">
                    <span className="tag">{restaurant.cuisine}</span>
                    <span className="tag">{restaurant.priceRange}</span>
                  </div>
                  <div className="card-actions">
                    <button
                      className="btn btn-outline"
                      onClick={() => handleEdit(restaurant)}
                    >
                      <FiEdit /> Редактировать
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleDelete(restaurant.id)}
                    >
                      <FiTrash2 /> Удалить
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content restaurant-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                ×
              </button>

              <h2>{editingRestaurant ? t('editRestaurant') : t('addRestaurant')}</h2>

              <form onSubmit={handleSubmit} className="restaurant-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Название *</label>
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
                    <label className="form-label">Город *</label>
                    <select
                      name="city"
                      className="form-select"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Выберите город</option>
                      {CITIES.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Адрес *</label>
                  <input
                    type="text"
                    name="address"
                    className="form-input"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Кухня *</label>
                    <select
                      name="cuisine"
                      className="form-select"
                      value={formData.cuisine}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Выберите кухню</option>
                      {CUISINE_TYPES.map((cuisine) => (
                        <option key={cuisine} value={cuisine}>
                          {cuisine}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Ценовой диапазон *</label>
                    <select
                      name="priceRange"
                      className="form-select"
                      value={formData.priceRange}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Выберите диапазон</option>
                      <option value="$">$ - Бюджетный</option>
                      <option value="$$">$$ - Средний</option>
                      <option value="$$$">$$$ - Премиум</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">URL изображения *</label>
                  <input
                    type="url"
                    name="image"
                    className="form-input"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Телефон</label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-input"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+7 (700) 123-45-67"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-input"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="info@restaurant.kz"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Часы работы</label>
                    <input
                      type="text"
                      name="workingHours"
                      className="form-input"
                      value={formData.workingHours}
                      onChange={handleChange}
                      placeholder="10:00 - 23:00"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Рейтинг</label>
                    <input
                      type="number"
                      name="rating"
                      className="form-input"
                      value={formData.rating}
                      onChange={handleChange}
                      min="1"
                      max="5"
                      step="0.1"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Описание</label>
                  <textarea
                    name="description"
                    className="form-input"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Расскажите о ресторане..."
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                  {loading ? 'Сохранение...' : 'Сохранить'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageRestaurants;