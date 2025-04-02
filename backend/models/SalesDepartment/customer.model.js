const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  customerName: { type: String, required: true }, // Updated field name
  customerEmail: { type: String, required: true, unique: true }, // Updated field name
  // gstNumber: { type: String, required: true, unique: true }, // Ensure uniqueness and non-null
  // contactNo: { type: String, required: true },
  orderId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  paymentId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Payment" }],
  productId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
}, { timestamps: true });

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
