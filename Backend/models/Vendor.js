const mongoose = require('mongoose');

// Define the Vendor schema
const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Unique name for each vendor
  contactInfo: { type: String, required: true }, // Contact information for the vendor
});

// Export the Vendor model
module.exports = mongoose.model('Vendor', vendorSchema);
