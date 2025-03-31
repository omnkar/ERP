const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  // productId: { type:mongoose.Schema.ObjectId, required: true, unique: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  rate: { type: Number, required: true },
  amount: { type: Number, required: true }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
