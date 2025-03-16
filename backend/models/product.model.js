const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    sku: { type: String, unique: true, required: true },
    category: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    stockAvailable: { type: Number, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
