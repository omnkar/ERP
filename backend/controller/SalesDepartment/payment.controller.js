const Payment = require("../../models/payment.model");
const Customer = require("../../models/customer.model");

module.exports.createPayment = async (req, res) => {
  try {
    const newPayment = new Payment(req.body);
    await newPayment.save();
    res.status(201).json({ message: "Payment recorded successfully", payment: newPayment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getPayments = async (req, res) => {
  try {
    if (!req.user || !["Super Admin", "Sales Manager", "Sales Representative"].includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    const payments = await Payment.find().populate("invoiceId customerId");
    console.log(payments);
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updatePayment = async (req, res) => {
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPayment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.deletePayment = async (req, res) => {
  try {
    await Payment.findByIdAndDelete(req.params.id);
    res.json({ message: "Payment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
