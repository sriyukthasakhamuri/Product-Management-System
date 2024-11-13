import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import api from '../services/api';

const UserDashboard = () => {
  const [assets, setAssets] = useState([]);

  const fetchUserAssets = async () => {
    const token = localStorage.getItem('token');
    // Assuming there is a user-specific endpoint for fetching assets
    const userAssets = await api.getAssets(token); // Fetch assets for the user
    setAssets(userAssets);
  };

  useEffect(() => {
    fetchUserAssets();
  }, []);

  return (
    <Container sx={{ mt: 12, mb: 4 }}>
      <Typography variant="h4" gutterBottom>User Dashboard</Typography>
      <Typography variant="h6">Your Products</Typography>
      {assets.length > 0 ? (
        assets.map(asset => (
          <Typography key={asset._id}>{asset.type} - {asset.serialNumber}</Typography>
        ))
      ) : (
        <Typography>No assets found.</Typography>
      )}
    </Container>
  );
};

export default UserDashboard;
