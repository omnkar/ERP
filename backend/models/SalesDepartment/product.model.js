const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true, min: 0 },
  total: { 
    type: Number, 
    required: true, 
    min: 0,
    default: function () {
      return this.quantity * this.unitPrice;
    }
  }
});
module.exports =  mongoose.model("Product", ProductSchema);