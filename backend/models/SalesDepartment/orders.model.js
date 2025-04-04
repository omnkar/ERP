const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  date: { type: Date, required: true, default: Date.now },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  salesperson: { type: String, required: true },
  paymentTerms: { 
    type: String, 
    enum: ["7 days", "15 days", "30 days"], 
    required: true 
  },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true, min: 1 }
    }
  ],
  additionalNotes: { type: String },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  orderStatus: { type: String, enum: ["Pending", "Completed", "Cancelled"], default: "Pending" }
});

module.exports = mongoose.model("Order", OrderSchema);
