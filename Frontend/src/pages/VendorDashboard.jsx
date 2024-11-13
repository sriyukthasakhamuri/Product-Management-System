import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Typography, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button
} from '@mui/material';
import api from '../services/api';

const VendorDashboard = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVendorAssets = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const vendorAssets = await api.getAssets(token);
      setAssets(vendorAssets);
    } catch (error) {
      console.error('Error fetching assets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendorAssets();
  }, []);

  // Auto refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchVendorAssets();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'success';
      case 'in-use': return 'warning';
      case 'maintenance': return 'error';
      default: return 'default';
    }
  };

  if (loading && assets.length === 0) {
    return (
      <Container sx={{ mt: 12, mb: 4 }}>
        <Typography>Loading assets...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 12, mb: 4 }}>
      <Typography variant="h4" gutterBottom>Vendor Dashboard</Typography>
      <Typography variant="h6" gutterBottom>Your Products</Typography>
      
      <TableContainer component={Paper} sx={{ mt: 3 }}>
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
              <TableCell>Purchase Date</TableCell>
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
                  <TableCell>
                    {new Date(asset.purchaseDate).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No assets found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default VendorDashboard;
