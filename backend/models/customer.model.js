const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    contactPerson: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true }
    },
    billingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true }
    },
    gstNumber: { type: String, unique: true },
    creditLimit: { type: Number, default: 0 },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", CustomerSchema);
