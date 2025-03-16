require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const AuthRoutes = require("./routes/authRoutes")
const ProductionRoutes = require("./routes/productionRoutes")
const InventoryRoutes = require("./routes/inventoryRoutes")
const app = express();
connectDB(); // Connect to MongoDB

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("Hello World");
})
// Routes
app.use("/auth", AuthRoutes);
app.use("/production", ProductionRoutes);
app.use("/inventory", InventoryRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
