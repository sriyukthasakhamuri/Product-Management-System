import React, { useContext } from 'react';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActionArea 
} from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import Grid from '@mui/material/Grid2';

const HomePage = () => {
  const { user } = useContext(AuthContext);

  const features = [
    {
      title: "Product Management",
      description: "Efficiently manage and track all your Products in one place. Monitor status, location, and maintenance schedules with ease.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=60", // Replace with your image
    },
    {
      title: "Vendor Integration",
      description: "Seamlessly connect with vendors, manage purchases, and maintain vendor relationships through our integrated platform.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=60", // Replace with your image
    },
    {
      title: "User Access Control",
      description: "Role-based access control ensures secure product management with appropriate permissions for managers, users, and vendors.",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=60", // Replace with your image
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
      <Typography 
        variant="h3" 
        gutterBottom 
        align="center" 
        sx={{ 
          mb: 6,
          fontWeight: 'bold',
          color: (theme) => theme.palette.primary.main 
        }}
      >
        Welcome to Product Management System
        {user && ` - ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}`}
      </Typography>

      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item key={index} size={4}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: (theme) => theme.shadows[10],
                },
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={feature.image}
                  alt={feature.title}
                  sx={{
                    objectFit: 'cover',
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="h2"
                    sx={{ 
                      fontWeight: 'bold',
                      color: (theme) => theme.palette.primary.main 
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body1"
                    color="text.secondary"
                    sx={{ 
                      lineHeight: 1.6,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage; 