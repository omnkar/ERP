const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({

  // custometId: { type:mongoose.Schema.ObjectId, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNo: { type: String, required: true },
  orderId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  paymentId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Payment" }],
  productId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
}, { timestamps: true });

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
