const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    roleType: {
      type: String,
      enum: ["Super Admin", "IT Admin", "Company Executive", "Department Manager", "Supervisor", "Worker"],
      required: true,
    }, // References Roles collection
    status: {
      type: String,
      enum: ["Active", "Inactive", "Suspended"],
      default: "Active",
    },
    profile: {
      phone: { type: String, required: true },
      department: {
        type: String,
        enum: ["HR", "Sales", "Production", "IT", "Finance", "Logistics"],
        required: true,
      },
      designation: { type: String, required: true },
      address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
      },
    },
    auditLogs: [
      {
        action: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    securitySettings: {
      mfaEnabled: { type: Boolean, default: false },
      passwordUpdatedAt: { type: Date, default: Date.now },
      lastLogin: { type: Date },
      failedLoginAttempts: { type: Number, default: 0 },
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model("User", UserSchema);
