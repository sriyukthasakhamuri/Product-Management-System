import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, TextField, Grid, Box, Snackbar } from '@mui/material';
import api from '../services/api';

const AdminDashboard = () => {
  const [assets, setAssets] = useState([]);
  const [newAsset, setNewAsset] = useState({
    type: '',
    productName: '', // New productName field
    serialNumber: '',
    purchaseDate: '',
    location: '',
    status: 'available',
    price: '',
    quantity: '',
    vendorName: '',
    contactInfo: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const fetchAssets = async () => {
    const token = localStorage.getItem('token');
    const assetsData = await api.getAssets(token);
    setAssets(assetsData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAsset((prevAsset) => ({
      ...prevAsset,
      [name]: value,
    }));
  };

  const handleCreateAsset = async () => {
    try {
      const token = localStorage.getItem('token');
      await api.createAsset({ ...newAsset }, token);
      setSnackbarMessage('Asset created successfully!');
      setSnackbarOpen(true);
      fetchAssets(); // Refresh the assets list after creating a new asset
      setNewAsset({
        type: '',
        productName: '',
        serialNumber: '',
        purchaseDate: '',
        location: '',
        status: 'available',
        price: '',
        quantity: '',
        vendorName: '',
        contactInfo: '',
      }); // Reset the form
    } catch (error) {
      setSnackbarMessage('Error creating asset. Please try again.');
      setSnackbarOpen(true);
      console.error('Error creating asset:', error);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">Create Asset</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Type"
              fullWidth
              name="type"
              value={newAsset.type}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Product Name" // New Product Name field
              fullWidth
              name="productName"
              value={newAsset.productName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Serial Number"
              fullWidth
              name="serialNumber"
              value={newAsset.serialNumber}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Purchase Date"
              type="date"
              fullWidth
              name="purchaseDate"
              value={newAsset.purchaseDate}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Location"
              fullWidth
              name="location"
              value={newAsset.location}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Status"
              select
              fullWidth
              name="status"
              value={newAsset.status}
              onChange={handleInputChange}
              SelectProps={{
                native: true,
              }}
            >
              <option value="available">Available</option>
              <option value="in-use">In Use</option>
              <option value="maintenance">Maintenance</option>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price"
              type="number"
              fullWidth
              name="price"
              value={newAsset.price}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Quantity"
              type="number"
              fullWidth
              name="quantity"
              value={newAsset.quantity}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Vendor Name"
              fullWidth
              name="vendorName"
              value={newAsset.vendorName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Vendor Contact Info"
              fullWidth
              name="contactInfo"
              value={newAsset.contactInfo}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateAsset}
          sx={{ mt: 2 }}
        >
          Create Asset
        </Button>
      </Box>

      <Typography variant="h6">Assets List</Typography>
      {assets.map(asset => (
        <Typography key={asset._id}>
          {asset.type} - {asset.productName} - {asset.serialNumber}
        </Typography>
      ))}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default AdminDashboard;
