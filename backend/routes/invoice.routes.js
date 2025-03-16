const express = require("express");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");
const { createInvoice, getInvoices, updateInvoice, deleteInvoice } = require("../controller/invoice.controller");

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware(["Super Admin", "Sales Manager"]), createInvoice);
router.get("/", authMiddleware, roleMiddleware(["Super Admin", "Sales Manager", "Sales Representative"]), getInvoices);
router.put("/:id", authMiddleware, roleMiddleware(["Super Admin", "Sales Manager"]), updateInvoice);
router.delete("/:id", authMiddleware, roleMiddleware(["Super Admin"]), deleteInvoice);

module.exports = router;
