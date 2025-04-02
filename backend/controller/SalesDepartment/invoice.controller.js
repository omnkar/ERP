const Invoice = require("../../models/SalesDepartment/invoice.model");

module.exports.createInvoice = async (req, res) => {
  try {
    console.log(req.body);
    const invoiceNumber = `INV-${Date.now()}`; // Generate unique invoice number
    const newInvoice = new Invoice({ ...req.body, invoiceNumber }); // Include invoiceNumber
    await newInvoice.save();
    res.status(201).json({ message: "Invoice created successfully!", invoice: newInvoice });
  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate("products.productId");
    res.status(200).json(invoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedInvoice = await Invoice.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedInvoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }
    res.status(200).json({ message: "Invoice updated successfully!", invoice: updatedInvoice });
  } catch (error) {
    console.error("Error updating invoice:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInvoice = await Invoice.findByIdAndDelete(id);
    if (!deletedInvoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }
    res.status(200).json({ message: "Invoice deleted successfully!" });
  } catch (error) {
    console.error("Error deleting invoice:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
