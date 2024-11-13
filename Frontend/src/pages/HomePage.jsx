import React, { useContext } from 'react';
import { Container, Typography, Paper } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import Grid from '@mui/material/Grid2';

const HomePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
      <Typography variant="h3" gutterBottom align="center" sx={{ mb: 6 }}>
        Welcome to Product Management System
        {user && ` - ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}`}
      </Typography>

      <Grid container spacing={3}>
        <Grid item size={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Product Management
            </Typography>
            <Typography>
              Efficiently manage and track all your Pro in one place. Monitor status, 
              location, and maintenance schedules with ease.
            </Typography>
          </Paper>
        </Grid>

        <Grid item size={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Vendor Integration
            </Typography>
            <Typography>
              Seamlessly connect with vendors, manage purchases, and maintain 
              vendor relationships through our integrated platform.
            </Typography>
          </Paper>
        </Grid>

        <Grid item size={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              User Access Control
            </Typography>
            <Typography>
              Role-based access control ensures secure product management with 
              appropriate permissions for managers, users, and vendors.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage; 