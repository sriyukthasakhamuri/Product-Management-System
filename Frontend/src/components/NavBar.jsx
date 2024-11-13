import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none', color: 'white', flexGrow: 1 }}>
          <Typography 
            variant="h6" 
            style={{ 
              cursor: 'pointer'
            }}
          >
            Product Management System
          </Typography>
        </Link>
        {user ? (
          <>
            {user.role === 'manager' && (
              <>
                <Link to="/dashboard/manager" style={{ textDecoration: 'none', color: 'white' }}>
                  <Button color="inherit">Manager Dashboard</Button>
                </Link>
                <Link to="/dashboard/user" style={{ textDecoration: 'none', color: 'white' }}>
                  <Button color="inherit">User Dashboard</Button>
                </Link>
                <Link to="/dashboard/vendor" style={{ textDecoration: 'none', color: 'white' }}>
                  <Button color="inherit">Vendor Dashboard</Button>
                </Link>
                <Link to="/purchase-orders" style={{ textDecoration: 'none', color: 'white' }}>
                  <Button color="inherit">Purchase Orders</Button>
                </Link>
              </>
            )}
            {user.role === 'user' && (
              <>
                <Link to="/dashboard/user" style={{ textDecoration: 'none', color: 'white' }}>
                  <Button color="inherit">User Dashboard</Button>
                </Link>
                <Link to="/purchase-orders" style={{ textDecoration: 'none', color: 'white' }}>
                  <Button color="inherit">Purchase Orders</Button>
                </Link>
              </>
            )}
            {user.role === 'vendor' && (
              <>
                <Link to="/dashboard/vendor" style={{ textDecoration: 'none', color: 'white' }}>
                  <Button color="inherit">Vendor Dashboard</Button>
                </Link>
                <Link to="/purchase-orders" style={{ textDecoration: 'none', color: 'white' }}>
                  <Button color="inherit">Purchase Orders</Button>
                </Link>
              </>
            )}
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
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
