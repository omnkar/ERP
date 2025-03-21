const express = require("express");
const { createQuotation, getQuotations, getQuotationById, updateQuotation, deleteQuotation } = require("../controller/quotation.controller");

const router = express.Router();

router.post("/create", createQuotation);
router.get("/get", getQuotations);
router.get("/:id", getQuotationById);
router.put("/:id", updateQuotation);
router.delete("/:id", deleteQuotation);

module.exports = router;
