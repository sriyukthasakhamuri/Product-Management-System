const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/roleMiddleware'); // Ensure correct import
const purchaseOrderController = require('../controllers/purchaseOrderController');

// Create purchase order - accessible by users and managers
router.post('/', verifyToken, checkRole(['user', 'manager']), purchaseOrderController.createPurchaseOrder);

// Get purchase orders - accessible by all roles
router.get('/', verifyToken, checkRole(['user', 'manager', 'vendor']), purchaseOrderController.getPurchaseOrders);

// Update purchase order status - accessible by managers and vendors
router.patch('/:id/status', verifyToken, checkRole(['manager', 'vendor']), purchaseOrderController.updatePurchaseOrderStatus);

module.exports = router; 