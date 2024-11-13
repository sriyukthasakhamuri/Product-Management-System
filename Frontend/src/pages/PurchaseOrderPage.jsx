import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import PurchaseOrderForm from '../components/PurchaseOrder/PurchaseOrderForm';
import PurchaseOrderList from '../components/PurchaseOrder/PurchaseOrderList';
import api from '../services/api';

const PurchaseOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const orders = await api.getPurchaseOrders(token);
      setOrders(orders || []);
      setError(null);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to fetch orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleOrderCreated = (newOrder) => {
    setOrders([...orders, newOrder]);
  };

  const handleStatusUpdate = async (orderId, status) => {
    try {
      const token = localStorage.getItem('token');
      await api.updatePurchaseOrderStatus(orderId, status, token);
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  if (loading) {
    return (
      <Container sx={{ mt: 12, mb: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 12, mb: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 12, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Purchase Order Management
      </Typography>
      <Box sx={{ mb: 4 }}>
        <PurchaseOrderForm onOrderCreated={handleOrderCreated} />
      </Box>
      <PurchaseOrderList 
        orders={orders} 
        onStatusUpdate={handleStatusUpdate} 
      />
    </Container>
  );
};

export default PurchaseOrderPage; 