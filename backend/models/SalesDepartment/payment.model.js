const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema({
  // paymentId: {type:mongoose.Schema.ObjectId, required: true, unique: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  paymentMode: { type: String, enum: ["Cash", "Online"], required: true },
  paymentStatus: { type: String, enum: ["Pending", "Completed"], required: true }
}, { timestamps: true });

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
