const PurchaseOrder = require('../models/PurchaseOrder');
const Asset = require('../models/Asset');
const Vendor = require('../models/Vendor');

// Create a new purchase order
exports.createPurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = new PurchaseOrder({
      ...req.body,
      requestedBy: req.user.username
    });
    await purchaseOrder.save();
    res.status(201).json(purchaseOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all purchase orders based on role
exports.getPurchaseOrders = async (req, res) => {
  try {
    let orders;
    switch (req.user.role) {
      case 'manager':
        // Managers can see all orders
        orders = await PurchaseOrder.find();
        break;
      case 'user':
        // Users can only see their own orders
        orders = await PurchaseOrder.find({ requestedBy: req.user.username });
        break;
      case 'vendor':
        // Vendors can only see orders that are pending or approved
        orders = await PurchaseOrder.find({
          status: { $in: ['pending', 'approved'] }
        });
        break;
      default:
        orders = [];
    }
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update purchase order status
exports.updatePurchaseOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    console.log(req.body);
    

    const order = await PurchaseOrder.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Role-based status update validation
    if (req.user.role === 'manager' && order.status === 'requested') {
      if (status !== 'pending' && status !== 'rejected') {
        return res.status(400).json({ message: 'Invalid status update' });
      }
    } else if (req.user.role === 'vendor' && order.status === 'pending') {
      if (status !== 'approved' && status !== 'rejected') {
        return res.status(400).json({ message: 'Invalid status update' });
      }

      // If vendor approves the order, create a new asset
      if (status === 'approved') {
        try {
          // Check if vendor exists or create new
          let vendor = await Vendor.findOne({ name: req.user.username });
          if (!vendor) {
            vendor = new Vendor({
              name: req.user.username,
              contactInfo: req.user.email || 'No contact info'
            });
            await vendor.save();
          }

          // Generate a unique serial number (you might want to implement a better system)
          const serialNumber = Math.floor(Math.random() * 1000000);

          // Create new asset with all required fields
          const asset = new Asset({
            type: order.vendorName,
            productName: order.vendorName,
            serialNumber: serialNumber,
            purchaseDate: order.deliveryDate || new Date(),
            location: 'Warehouse',
            status: 'available',
            price: order.totalAmount,
            quantity: 1,
            vendor: vendor._id,
            notes: order.notes
          });

          // Save the asset
          await asset.save();
          console.log('Asset created successfully:', asset);
        } catch (assetError) {
          console.error('Error creating asset:', assetError);
          return res.status(400).json({ 
            message: 'Error creating asset', 
            error: assetError.message 
          });
        }
      }
    } else {
      return res.status(403).json({ message: 'Unauthorized status update' });
    }

    // Update order status
    order.status = status;
    await order.save();
    res.json(order);
  } catch (error) {
    console.error('Error in updatePurchaseOrderStatus:', error);
    res.status(400).json({ message: error.message });
  }
}; 