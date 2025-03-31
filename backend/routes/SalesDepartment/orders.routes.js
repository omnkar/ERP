const express = require("express");
const { createOrder, getOrders } = require("../../controller/SalesDepartment/order.controller");
const router = express.Router();

router.post("/create", createOrder);
router.get("/get", getOrders);
// router.get("/:id", getQuotationById);
// router.put("/:id", updateQuotation);
// router.delete("/:id", deleteQuotation);

module.exports = router;
