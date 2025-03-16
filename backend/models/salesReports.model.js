const mongoose = require("mongoose");

const SalesReportSchema = new mongoose.Schema(
  {
    reportDate: { type: Date, required: true },
    totalSales: { type: Number, required: true },
    totalInvoices: { type: Number, required: true },
    totalPaymentsReceived: { type: Number, required: true },
    topSellingProducts: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        salesCount: { type: Number, required: true }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("SalesReport", SalesReportSchema);
