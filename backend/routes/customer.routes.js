const express = require("express");
const { createCustomer, getCustomers, getCustomerById, updateCustomer, deleteCustomer } = require("../controller/customer.controller");

const router = express.Router();

router.post("/", createCustomer); // Create new customer
router.get("/", getCustomers); // Get all customers
router.get("/:id", getCustomerById); // Get customer by ID
router.put("/:id", updateCustomer); // Update customer
router.delete("/:id", deleteCustomer); // Delete customer

module.exports = router;
