import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, TextField, Box, Snackbar, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'success';
      case 'in-use': return 'warning';
      case 'maintenance': return 'error';
      default: return 'default';
    }
  };

  const handleEditAsset = (asset) => {
    // Implement edit functionality
    console.log('Edit asset:', asset);
  };

  const handleDeleteAsset = async (assetId) => {
    try {
      const token = localStorage.getItem('token');
      await api.deleteAsset(assetId, token);
      fetchAssets(); // Refresh the list
      setSnackbarMessage('Asset deleted successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting asset:', error);
      setSnackbarMessage('Error deleting asset');
      setSnackbarOpen(true);
    }
  };

  return (
    <Box sx={{ 
      flexGrow: 1, 
      mt: { xs: 26, sm: 52 }, // Increased top margin
      mb: 12,
      pt: 16 // Added top padding
    }}>
      <Container maxWidth="xl" sx={{ mt: 4 }}> {/* Added container margin */}
        <Box sx={{ py: 3 }}>
          <Typography variant="h4" gutterBottom>
            Manager Dashboard
          </Typography>
        </Box>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Create Product
          </Typography>
          <Grid container spacing={3}>
            <Grid item size={4}>
              <TextField
                label="Type"
                fullWidth
                name="type"
                value={newAsset.type}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item size={4}>
              <TextField
                label="Product Name"
                fullWidth
                name="productName"
                value={newAsset.productName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item size={4}>
              <TextField
                label="Serial Number"
                fullWidth
                name="serialNumber"
                value={newAsset.serialNumber}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item size={4}>
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
            <Grid item size={4}>
              <TextField
                label="Location"
                fullWidth
                name="location"
                value={newAsset.location}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item size={4}>
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
            <Grid item size={4}>
              <TextField
                label="Price"
                type="number"
                fullWidth
                name="price"
                value={newAsset.price}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item size={4}>
              <TextField
                label="Quantity"
                type="number"
                fullWidth
                name="quantity"
                value={newAsset.quantity}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item size={4}>
              <TextField
                label="Vendor Name"
                fullWidth
                name="vendorName"
                value={newAsset.vendorName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item size={4}>
              <TextField
                label="Vendor Contact Info"
                fullWidth
                name="contactInfo"
                value={newAsset.contactInfo}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateAsset}
              size="large"
            >
              Create Product
            </Button>
          </Box>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Products List
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product Type</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Serial Number</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Vendor</TableCell>
                  <TableCell>Purchase Date</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assets.length > 0 ? (
                  assets.map((asset) => (
                    <TableRow key={asset._id}>
                      <TableCell>{asset.type}</TableCell>
                      <TableCell>{asset.productName}</TableCell>
                      <TableCell>{asset.serialNumber}</TableCell>
                      <TableCell>{asset.location}</TableCell>
                      <TableCell>
                        <Chip 
                          label={asset.status}
                          color={getStatusColor(asset.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>${asset.price}</TableCell>
                      <TableCell>{asset.quantity}</TableCell>
                      <TableCell>{asset.vendor?.name || 'N/A'}</TableCell>
                      <TableCell>
                        {new Date(asset.purchaseDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                          <Button
                            size="small"
                            color="primary"
                            variant="outlined"
                            onClick={() => handleEditAsset(asset)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="small"
                            color="error"
                            variant="outlined"
                            onClick={() => handleDeleteAsset(asset._id)}
                          >
                            Delete
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} align="center">
                      No assets found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
        />
      </Container>
    </Box>
  );
};

export default AdminDashboard;