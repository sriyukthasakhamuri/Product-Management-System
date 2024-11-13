import axios from 'axios';

const API_URL = 'http://localhost:5500/api'; // Update with your backend URL

// Function to register a new user
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

// Function to login a user
export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);
  return response.data;
};

// Function to create a new asset
export const createAsset = async (assetData, token) => {
  const response = await axios.post(`${API_URL}/assets`, assetData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Function to get all assets
export const getAssets = async (token) => {
  const response = await axios.get(`${API_URL}/assets`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Create purchase order
export const createPurchaseOrder = async (orderData, token) => {
  const response = await axios.post(`${API_URL}/purchase-orders`, orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Get all purchase orders
export const getPurchaseOrders = async (token) => {
  const response = await axios.get(`${API_URL}/purchase-orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Update purchase order status
export const updatePurchaseOrderStatus = async (orderId, status, token) => {
  const response = await axios.patch(
    `${API_URL}/purchase-orders/${orderId}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Export all functions
export default {
  registerUser,
  loginUser,
  createAsset,
  getAssets,
  createPurchaseOrder,
  getPurchaseOrders,
  updatePurchaseOrderStatus,
};
