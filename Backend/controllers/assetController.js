const Asset = require('../models/Asset');
const Vendor = require('../models/Vendor'); // Ensure you have the Vendor model
const sendEmail = require('../utils/nodemailer'); // Import sendEmail function
const sendSMS = require('../utils/twilio'); // Import sendSMS function

// Create new asset
exports.createAsset = async (req, res) => {
  try {
    // Destructure necessary fields from the request body
    const {
      type,
      productName,
      serialNumber,
      purchaseDate,
      location,
      status,
      price,
      quantity,
      vendorName,
      contactInfo
    } = req.body;

    // Check if the vendor already exists
    let vendor = await Vendor.findOne({ name: vendorName });

    // If vendor does not exist, create a new one
    if (!vendor) {
      vendor = new Vendor({ name: vendorName, contactInfo });
      await vendor.save(); // Save the new vendor
    }

    // Create a new asset and link it to the vendor
    const asset = new Asset({
      type,
      productName,
      serialNumber,
      purchaseDate,
      location,
      status,
      price,
      quantity,
      vendor: vendor._id // Use the vendor's ID
    });

    await asset.save(); // Save the new asset

    // Uncomment the following lines if you want to send notifications
    // await sendEmail(req.user.email, 'Asset Created', `Asset ${asset.type} has been created successfully.`);
    // await sendSMS('+1234567890', `Asset ${asset.type} has been created successfully.`); // Replace with the actual phone number

    res.status(201).json({ message: 'Asset created successfully', asset });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all assets
exports.getAssets = async (req, res) => {
  try {
    const assets = await Asset.find();
    res.json(assets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update asset
exports.updateAsset = async (req, res) => {
  try {
    const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Asset updated', asset });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete asset
exports.deleteAsset = async (req, res) => {
  try {
    await Asset.findByIdAndDelete(req.params.id);
    res.json({ message: 'Asset deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
