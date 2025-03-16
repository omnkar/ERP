const express = require("express");
const { createSalesOrder, getSalesOrders, updateSalesOrder, deleteSalesOrder } = require("../controller/salesOrder.controller");

const router = express.Router();

router.post("/", createSalesOrder);
router.get("/", getSalesOrders);
// router.get("/:id", getSalesOrderById);
router.put("/:id", updateSalesOrder);
router.delete("/:id", deleteSalesOrder);

module.exports = router;
