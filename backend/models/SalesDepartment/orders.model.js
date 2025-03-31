const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  // orderId: { type:mongoose.Schema.ObjectId, required: true, unique: true },
  orderDate: { type: Date, required: true, default: Date.now },
  deliveryDate: { type: Date, required: true },
  orderStatus: { type: String, enum: ["Pending", "Confirmed", "Shipped"], required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
