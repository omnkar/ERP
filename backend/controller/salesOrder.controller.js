const SalesOrder = require("../models/SalesOrder");

module.exports.createSalesOrder = async (req, res) => {
  try {
    const newOrder = new SalesOrder(req.body);
    await newOrder.save();
    res.status(201).json({ message: "Sales Order created successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getSalesOrders = async (req, res) => {
  try {
    const orders = await SalesOrder.find().populate("customerId");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateSalesOrder = async (req, res) => {
  try {
    const updatedOrder = await SalesOrder.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.deleteSalesOrder = async (req, res) => {
  try {
    await SalesOrder.findByIdAndDelete(req.params.id);
    res.json({ message: "Sales Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
