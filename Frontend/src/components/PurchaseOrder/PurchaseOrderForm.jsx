import React, { useState, useContext } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
} from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import Grid from '@mui/material/Grid2';
import api from '../../services/api';

const PurchaseOrderForm = ({ onOrderCreated }) => {
  const { user } = useContext(AuthContext);
  const [order, setOrder] = useState({
    vendorName: '',
    totalAmount: '',
    deliveryDate: '',
    status: 'requested',
    notes: '',
    requestedBy: user?.username || '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const orderData = {
        ...order,
        totalAmount: Number(order.totalAmount),
      };
      
      const response = await api.createPurchaseOrder(orderData, token);
      onOrderCreated(response.data);
      setOrder({
        vendorName: '',
        totalAmount: '',
        deliveryDate: '',
        status: 'requested',
        notes: '',
        requestedBy: user?.username || '',
      });
    } catch (error) {
      console.error('Error creating purchase order:', error);
    }
  };

  if (user?.role === 'vendor') {
    return null;
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Request New Product
      </Typography>
      <Grid container spacing={2}>
        <Grid item size={6}>
          <TextField
            fullWidth
            label="Product Type"
            name="vendorName"
            value={order.vendorName}
            onChange={(e) => setOrder({ ...order, vendorName: e.target.value })}
            required
          />
        </Grid>
        <Grid item size={6}>
          <TextField
            fullWidth
            label="Estimated Amount"
            type="number"
            name="totalAmount"
            value={order.totalAmount}
            onChange={(e) => setOrder({ ...order, totalAmount: e.target.value })}
            required
          />
        </Grid>
        <Grid item size={6}>
          <TextField
            fullWidth
            label="Delivery Date"
            type="date"
            name="deliveryDate"
            value={order.deliveryDate}
            onChange={(e) => setOrder({ ...order, deliveryDate: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
        </Grid>
        <Grid item size={12}>
          <TextField
            fullWidth
            label="Request Details"
            multiline
            rows={4}
            name="notes"
            value={order.notes}
            onChange={(e) => setOrder({ ...order, notes: e.target.value })}
            required
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Submit Request
      </Button>
    </Box>
  );
};

export default PurchaseOrderForm; 