const express = require("express");
const { authMiddleware, roleMiddleware } = require("../../middlewares/authMiddleware");
const invoiceController = require("../../controller/SalesDepartment/invoice.controller");

const router = express.Router();

router.post("/create",  invoiceController.createInvoice);
router.get("/get",  invoiceController.getInvoices);
router.put("/:id",  invoiceController.updateInvoice);
router.delete("/:id", invoiceController.deleteInvoice);

module.exports = router;
