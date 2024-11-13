const mongoose = require('mongoose');

const purchaseOrderSchema = new mongoose.Schema({
  vendorName: {
    type: String,
    required: true
  },
  requestedBy: {
    type: String,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  deliveryDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['requested', 'pending', 'approved', 'rejected'],
    default: 'requested'
  },
  notes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PurchaseOrder', purchaseOrderSchema); 