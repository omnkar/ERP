const express = require("express");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");
const { getAllUsers, updateUserRole, deleteUser } = require("../controller/admin.controller");

const router = express.Router();

// ✅ Only Super Admins can manage users
router.get("/users", authMiddleware, roleMiddleware(["Super Admin"]), getAllUsers);
router.put("/users/:id", authMiddleware, roleMiddleware(["Super Admin"]), updateUserRole);
router.delete("/users/:id", authMiddleware, roleMiddleware(["Super Admin"]), deleteUser);

module.exports = router;
