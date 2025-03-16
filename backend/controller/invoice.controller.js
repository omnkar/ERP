const Invoice = require("../models/Invoice");

module.exports.createInvoice = async (req, res) => {
  try {
    const newInvoice = new Invoice(req.body);
    await newInvoice.save();
    res.status(201).json({ message: "Invoice created successfully", invoice: newInvoice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate("orderId");
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateInvoice = async (req, res) => {
  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedInvoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.deleteInvoice = async (req, res) => {
  try {
    await Invoice.findByIdAndDelete(req.params.id);
    res.json({ message: "Invoice deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
