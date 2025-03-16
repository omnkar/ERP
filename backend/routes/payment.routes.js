const express = require("express");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");
const { createPayment, getPayments, updatePayment, deletePayment } = require("../controller/payment.controller");

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware(["Super Admin", "Sales Manager"]), createPayment);
router.get("/", authMiddleware, roleMiddleware(["Super Admin", "Sales Manager", "Sales Representative"]), getPayments);
router.put("/:id", authMiddleware, roleMiddleware(["Super Admin", "Sales Manager"]), updatePayment);
router.delete("/:id", authMiddleware, roleMiddleware(["Super Admin"]), deletePayment);

module.exports = router;
