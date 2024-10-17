import React, { useEffect, useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import api from '../services/api';

const VendorDashboard = () => {
  const [assets, setAssets] = useState([]);

  const fetchVendorAssets = async () => {
    const token = localStorage.getItem('token');
    // Assuming there's a vendor-specific endpoint for fetching assets
    const vendorAssets = await api.getAssets(token); // Fetch assets for the vendor
    setAssets(vendorAssets);
  };

  useEffect(() => {
    fetchVendorAssets();
  }, []);

  const handleCreateAsset = () => {
    // Logic to handle asset creation (could open a modal or redirect to a form)
    alert('Redirect to asset creation form');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Vendor Dashboard</Typography>
      <Button variant="contained" color="primary" onClick={handleCreateAsset}>
        Create New Asset
      </Button>
      <Typography variant="h6" gutterBottom>Your Assets</Typography>
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

export default VendorDashboard;
