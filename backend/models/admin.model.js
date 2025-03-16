const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // References Users collection
    adminType: { 
      type: String, 
      enum: ["Super Admin", "Company Executive", "IT Admin"], 
      required: true 
    },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }], // References Permissions collection
    activityLogs: [
      {
        action: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        ipAddress: { type: String, required: true }
      }
    ],
    securitySettings: {
      mfaEnabled: { type: Boolean, default: false },
      sessionTimeout: { type: Number, default: 30 }, // Default timeout: 30 minutes
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", AdminSchema);
