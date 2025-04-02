const mongoose = require("mongoose");

const QuotationSchema = new mongoose.Schema({
  quotationNumber: { type: String, required: true, unique: true },
  date: { type: Date, required: true, default: Date.now },
  expiryDate: { type: Date, required: true },
  customerName: { type: String, required: true },
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
  additionalNotes: { type: String }
});

module.exports = mongoose.model("Quotation", QuotationSchema);
