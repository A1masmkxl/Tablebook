import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Restaurants from './pages/Restaurants';
import RestaurantDetail from './pages/RestaurantDetail';
import MyBookings from './pages/MyBookings';
import Profile from './pages/Profile';

import AdminDashboard from './pages/Admin/Dashboard';
import ManageRestaurants from './pages/Admin/ManageRestaurants';
import ManageBookings from './pages/Admin/ManageBookings';
import ManageUsers from './pages/Admin/ManageUsers';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <div className="app">
              <Navbar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/restaurants" element={<Restaurants />} />
                  <Route path="/restaurant/:id" element={<RestaurantDetail />} />
                  
                  <Route path="/my-bookings" element={
                    <ProtectedRoute>
                      <MyBookings />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />

                  <Route path="/admin" element={
                    <ProtectedRoute adminOnly>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/admin/restaurants" element={
                    <ProtectedRoute adminOnly>
                      <ManageRestaurants />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/admin/bookings" element={
                    <ProtectedRoute adminOnly>
                      <ManageBookings />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/admin/users" element={
                    <ProtectedRoute adminOnly>
                      <ManageUsers />
                    </ProtectedRoute>
                  } />
                </Routes>
              </main>
              <Footer />
              <ToastContainer position="top-right" autoClose={3000} />
            </div>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;