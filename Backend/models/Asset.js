const mongoose = require('mongoose');

// Define the Asset schema
const assetSchema = new mongoose.Schema({
  type: { type: String, required: true },
  productName: { type: String, required: true },
  serialNumber: { type: Number, required: true, unique: true },
  purchaseDate: { type: Date, required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ['available', 'in-use', 'maintenance'], default: 'available' },
  price: { type: Number, required: true }, // New price field
  quantity: { type: Number, required: true }, // New quantity field
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true }, // Reference to Vendor
});

// Export the Asset model
module.exports = mongoose.model('Asset', assetSchema);
