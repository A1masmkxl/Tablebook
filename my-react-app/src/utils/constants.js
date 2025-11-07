export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081/api';

export const FAMOUS_RESTAURANTS = [
  {
    name: 'Gakku',
    city: 'Almaty',
    cuisine: 'Казахская',
    priceRange: '$$$',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
  },
  {
    name: 'Line Brew',
    city: 'Almaty',
    cuisine: 'Европейская',
    priceRange: '$$',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800',
  },
  {
    name: 'Navat',
    city: 'Astana',
    cuisine: 'Восточная',
    priceRange: '$$$',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
  },
  {
    name: 'Selfie',
    city: 'Almaty',
    cuisine: 'Паназиатская',
    priceRange: '$$',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
  },
  {
    name: 'Burger Heroes',
    city: 'Almaty',
    cuisine: 'Американская',
    priceRange: '$',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800',
  },
  {
    name: 'Del Papa',
    city: 'Astana',
    cuisine: 'Итальянская',
    priceRange: '$$$',
    image: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800',
  },
];

export const CUISINE_TYPES = [
  'Казахская',
  'Европейская',
  'Восточная',
  'Паназиатская',
  'Американская',
  'Итальянская',
  'Японская',
  'Грузинская',
  'Узбекская',
];

export const CITIES = ['Almaty', 'Astana', 'Shymkent'];

export const TIME_SLOTS = [
  '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00', '21:30',
  '22:00', '22:30', '23:00'
];

export const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];