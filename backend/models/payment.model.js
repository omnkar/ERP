const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: "Invoice", required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    paymentDate: { type: Date, required: true },
    paymentMethod: { type: String, enum: ["Bank Transfer", "Credit Card", "Cash", "UPI"], required: true },
    amountPaid: { type: Number, required: true },
    remainingBalance: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Completed", "Failed"], default: "Pending" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);
