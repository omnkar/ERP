const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "SalesOrder", required: true },
    invoiceNumber: { type: String, required: true, unique: true },
    invoiceDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true }
      }
    ],
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ["Unpaid", "Partially Paid", "Paid"], default: "Unpaid" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", InvoiceSchema);
