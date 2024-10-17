const express = require('express');
const {
  createAsset,
  getAssets,
  updateAsset,
  deleteAsset,
} = require('../controllers/assetController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/roleMiddleware'); // Ensure correct import

const router = express.Router();

// Define the routes
router.post('/', verifyToken, checkRole(['manager', 'vendor']), createAsset); // Create asset
router.get('/', verifyToken, getAssets); // Get all assets
router.put('/:id', verifyToken, checkRole(['manager']), updateAsset); // Update asset
router.delete('/:id', verifyToken, checkRole(['manager']), deleteAsset); // Delete asset

module.exports = router;
