const express = require('express');
const user = require('../models/user.model');
const router = express.Router();
const userController = require("../controller/user.controller");
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

console.log("in routes");
router.post("/login", userController.loginUser);
router.post("/register", userController.registerUser);
router.get("/logout", userController.logoutUser);

module.exports = router;