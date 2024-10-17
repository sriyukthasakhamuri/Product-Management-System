import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext); // Get user info and logout function

  const handleLogout = () => {
    logout(); // Call the logout function from context
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Asset Control System
        </Typography>
        {user ? ( // Check if user is logged in
          <>
            <Link to="/dashboard/manager" style={{ textDecoration: 'none', color: 'white' }}>
              <Button color="inherit">Admin Dashboard</Button>
            </Link>
            <Link to="/dashboard/user" style={{ textDecoration: 'none', color: 'white' }}>
              <Button color="inherit">User Dashboard</Button>
            </Link>
            <Link to="/dashboard/vendor" style={{ textDecoration: 'none', color: 'white' }}>
              <Button color="inherit">Vendor Dashboard</Button>
            </Link>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              <Button color="inherit">Login</Button>
            </Link>
            <Link to="/register" style={{ textDecoration: 'none', color: 'white' }}>
              <Button color="inherit">Register</Button>
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
