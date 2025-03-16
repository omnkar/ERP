const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema(
  {
    roleName: { 
      type: String, 
      enum: ["Super Admin", "IT Admin", "Company Executive", "Department Manager", "Supervisor", "Worker"], 
      required: true 
    },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }] // References Permissions collection
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", RoleSchema);
