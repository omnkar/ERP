require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const AuthRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/SalesDepartment/orders.routes");
const quotationRoutes = require("./routes/SalesDepartment/quotation.routes");
const invoiceRoutes = require("./routes/SalesDepartment/invoice.routes");
// const customerRoutes = require("./routes/customer.routes");
// const paymentRoutes = require("./routes/payment.routes");
// const invoiceRoutes = require("./routes/invoice.routes");
const app = express();
connectDB(); // Connect to MongoDB

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World");
});
// Routes
app.use("/auth", AuthRoutes);
// app.use("/customers", customerRoutes);
app.use("/order", orderRoutes);
app.use("/quotation",quotationRoutes)
app.use("/invoice", invoiceRoutes);
// app.use("/payments", paymentRoutes);
// app.use("/invoices", invoiceRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
