import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import VendorDashboard from './pages/VendorDashboard';
import ProtectedRoute from './ProtectedRoute';
import PurchaseOrderPage from './pages/PurchaseOrderPage';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard/manager"
            element={
              <ProtectedRoute roles={['manager']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/user"
            element={
              <ProtectedRoute roles={['user', 'manager']}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/vendor"
            element={
              <ProtectedRoute roles={['vendor', 'manager']}>
                <VendorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/purchase-orders"
            element={
              <ProtectedRoute roles={['manager', 'vendor', 'user']}>
                <PurchaseOrderPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
