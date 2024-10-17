import React, { useContext, useState } from 'react';
import { TextField, Button, Box, Typography, Link } from '@mui/material'; 
import { AuthContext } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const { login } = useContext(AuthContext); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    await login(email, password); 
  };

  return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }} className="form"> {/* Add form class for styling */}
        <Typography variant="h4" gutterBottom align="center">Login</Typography>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleLogin} style={{ marginTop: '20px' }}>
          Login
        </Button>
        <Typography variant="body1" style={{ marginTop: '10px', textAlign: 'center' }}>
          Don't have an account? <Link href="/register">Sign Up</Link>
        </Typography>
      </Box>
  );
};

export default Login;
