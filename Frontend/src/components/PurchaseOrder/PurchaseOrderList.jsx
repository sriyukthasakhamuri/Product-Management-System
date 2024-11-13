import React, { useContext } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Typography,
} from '@mui/material';
import { AuthContext } from '../../context/AuthContext';

const PurchaseOrderList = ({ orders = [], onStatusUpdate }) => {
  const { user } = useContext(AuthContext);

  const getStatusColor = (status) => {
    switch (status) {
      case 'requested': return 'info';
      case 'pending': return 'warning';
      case 'approved': return 'success';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  const renderActions = (order) => {
    if (!order) return null;

    if (user.role === 'manager') {
      return order.status === 'requested' && (
        <>
          <Button
            size="small"
            color="success"
            onClick={() => onStatusUpdate(order._id, 'pending')}
            sx={{ mr: 1 }}
          >
            Forward to Vendor
          </Button>
          <Button
            size="small"
            color="error"
            onClick={() => onStatusUpdate(order._id, 'rejected')}
          >
            Reject
          </Button>
        </>
      );
    }

    if (user.role === 'vendor') {
      return order.status === 'pending' && (
        <>
          <Button
            size="small"
            color="success"
            onClick={() => onStatusUpdate(order._id, 'approved')}
            sx={{ mr: 1 }}
          >
            Accept
          </Button>
          <Button
            size="small"
            color="error"
            onClick={() => onStatusUpdate(order._id, 'rejected')}
          >
            Reject
          </Button>
        </>
      );
    }

    if (user.role === 'user') {
      return (
        <Chip 
          label={`Status: ${order.status}`}
          color={getStatusColor(order.status)}
        />
      );
    }

    return null;
  };

  if (!orders || orders.length === 0) {
    return (
      <Paper sx={{ p: 2, mt: 3 }}>
        <Typography align="center">No purchase orders found.</Typography>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Request ID</TableCell>
            <TableCell>Requested By</TableCell>
            <TableCell>Product Type</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => order && (
            <TableRow key={order._id || `order-${Math.random()}`}>
              <TableCell>{order._id || 'N/A'}</TableCell>
              <TableCell>{order.requestedBy || 'N/A'}</TableCell>
              <TableCell>{order.vendorName || 'N/A'}</TableCell>
              <TableCell>${order.totalAmount || '0'}</TableCell>
              <TableCell>
                <Chip 
                  label={order.status || 'unknown'}
                  color={getStatusColor(order.status)}
                />
              </TableCell>
              <TableCell>
                {renderActions(order)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PurchaseOrderList; 