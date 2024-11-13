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
  Chip
} from '@mui/material';
import api from '../services/api';

const UserDashboard = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserAssets = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const userAssets = await api.getAssets(token);
      setAssets(userAssets);
    } catch (error) {
      console.error('Error fetching assets:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchUserAssets();
  }, []);

  // Polling for updates every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchUserAssets();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'success';
      case 'in-use':
        return 'warning';
      case 'maintenance':
        return 'error';
      default:
        return 'default';
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
      <Typography variant="h4" gutterBottom>User Dashboard</Typography>
      <Typography variant="h6" gutterBottom>Available Assets</Typography>
      
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Asset Type</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Serial Number</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Purchase Date</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Vendor</TableCell>
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
                  <TableCell>
                    {new Date(asset.purchaseDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>${asset.price}</TableCell>
                  <TableCell>
                    {asset.vendor?.name || 'N/A'}
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

export default UserDashboard;
