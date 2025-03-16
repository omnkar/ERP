const mongoose = require("mongoose");

const PermissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, // Permission name (e.g., "Create Users", "Delete Orders")
    description: { type: String, required: true } // Brief explanation of the permission
  },
  { timestamps: true }
);

module.exports = mongoose.model("Permission", PermissionSchema);
