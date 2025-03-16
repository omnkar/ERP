const User = require("../models/user.model");
const Role = require("../models/roles.model");
const Admin = require("../models/admin.model"); // Add Admin model
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const toastify = require("toastify-js");

const checkPermissions = async (userId, requiredPermission) => {
  const user = await User.findById(userId).populate('roleId');
  const role = await Role.findById(user.roleId).populate('permissions');
  return role.permissions.some(permission => permission.name === requiredPermission);
};

module.exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, roleType, phone, department, designation, street, city, state, postalCode, country } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User Already Exist" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({ 
      name, 
      email, 
      passwordHash: hashedPassword, 
      roleType,
      profile: {
        phone,
        department,
        designation,
        address: {
          street,
          city,
          state,
          postalCode,
          country
        }
      },
      auditLogs: [{ action: "User Registered" }]
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    toastify({
      text: error.message,
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      backgroundColor: "#ff0000",
    }).showToast();
    res.status(500).json({ error: error.message });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.roleType }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Set token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevent JavaScript access
      secure: process.env.NODE_ENV === "production", // Secure in production (HTTPS)
      sameSite: "Strict", // Prevent CSRF
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Determine redirection based on user role
    let redirectUrl;
    if (["Super Admin", "Company Executive", "IT Admin"].includes(user.roleType)) {
      redirectUrl = "/admin/dashboard";
    } else if (["Department Manager", "Supervisor", "Worker"].includes(user.roleType)) {
      redirectUrl = "/user/dashboard";
    } else {
      redirectUrl = "/login"; // Default redirection if role is not recognized
    }

    res.json({ message: "Login successful", user, redirectUrl });
  } catch (error) {
    toastify({
      text: error.message,
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      backgroundColor: "#ff0000",
    }).showToast();
    res.status(500).json({ error: error.message });
  }
};

module.exports.logoutUser = async (req, res) => {
  // Check if user has permission to logout
  if (!await checkPermissions(req.user.id, 'Logout')) {
    return res.status(403).json({ message: "Forbidden" });
  }

  res.cookie("token", "", { httpOnly: true, expires: new Date(0) }); // Clear token
  res.json({ message: "Logged out successfully" });
};
