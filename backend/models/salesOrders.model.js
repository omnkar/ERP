const mongoose = require("mongoose");

const SalesOrderSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    quotationId: { type: mongoose.Schema.Types.ObjectId, ref: "Quotation" },
    orderNumber: { type: String, required: true, unique: true },
    orderDate: { type: Date, required: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true }
      }
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Processing", "Completed", "Cancelled"], default: "Pending" },
    expectedDeliveryDate: { type: Date, required: true },
    paymentStatus: { type: String, enum: ["Unpaid", "Partially Paid", "Paid"], default: "Unpaid" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("SalesOrder", SalesOrderSchema);
