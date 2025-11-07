import api from './api';

export const bookingService = {
  createBooking: async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },

  getUserBookings: async () => {
    const response = await api.get('/bookings/my-bookings');
    return response.data;
  },

  cancelBooking: async (bookingId) => {
    const response = await api.delete(`/bookings/${bookingId}`);
    return response.data;
  },

  getAllBookings: async () => {
    const response = await api.get('/bookings');
    return response.data;
  },

  updateBookingStatus: async (bookingId, status) => {
    const response = await api.patch(`/bookings/${bookingId}/status`, { status });
    return response.data;
  },
};

export const restaurantService = {
  getAllRestaurants: async (filters) => {
    const response = await api.get('/restaurants', { params: filters });
    return response.data;
  },

  getRestaurantById: async (id) => {
    const response = await api.get(`/restaurants/${id}`);
    return response.data;
  },

  createRestaurant: async (restaurantData) => {
    const response = await api.post('/restaurants', restaurantData);
    return response.data;
  },

  updateRestaurant: async (id, restaurantData) => {
    const response = await api.put(`/restaurants/${id}`, restaurantData);
    return response.data;
  },

  deleteRestaurant: async (id) => {
    const response = await api.delete(`/restaurants/${id}`);
    return response.data;
  },
};