const express = require("express");
const { authMiddleware, roleMiddleware } = require("../../middlewares/authMiddleware");
const { createSalesOrder, getSalesOrders, updateSalesOrder, deleteSalesOrder } = require("../controller/salesOrder.controller");

const router = express.Router();

// ✅ Only Super Admin & Sales Managers can create Sales Orders
router.post("/create", authMiddleware, roleMiddleware(["Super Admin", "Sales Manager"]), createSalesOrder);

// ✅ All Sales roles can view Sales Orders
router.get("/get", authMiddleware, roleMiddleware(["Super Admin", "Sales Manager", "Sales Representative"]), getSalesOrders);

// ✅ Only Super Admin & Sales Managers can update Sales Orders
router.put("/:id", authMiddleware, roleMiddleware(["Super Admin", "Sales Manager"]), updateSalesOrder);

// ✅ Only Super Admin can delete Sales Orders
router.delete("/:id", authMiddleware, roleMiddleware(["Super Admin"]), deleteSalesOrder);

module.exports = router;
