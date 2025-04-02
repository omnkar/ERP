const Customer = require("../../models/SalesDepartment/customer.model");
const Order = require("../../models/SalesDepartment/orders.model");
const Product = require("../../models/SalesDepartment/product.model");
const Payment = require("../../models/SalesDepartment/payment.model");

module.exports.createOrder = async (req, res) => {
  const {
    orderNumber,
    date,
    customerName,
    customerEmail,
    salesperson,
    paymentTerms,
    products,
    additionalNotes,
    gstNumber, // Ensure gstNumber is included
  } = req.body;
  // console.log(req.body);
  // console.log("Order Number: ", orderNumber);
  // console.log("Date: ", date);
  // console.log("Customer Name: ", customerName);
  // console.log("Customer Email: ", customerEmail);
  // console.log("Salesperson: ", salesperson);
  // console.log("Products: ", products);
  // console.log("Additional Notes: ", additionalNotes);
  // console.log("Payment Terms: ", paymentTerms);
  // // console.log(customerName," ",customerEmail)
  try {
    // Step 1: Find or create a customer
    let customer = await Customer.findOne({ gstNumber }); // Search by gstNumber
    if (!customer) {
      customer = new Customer({ customerName, customerEmail, gstNumber }); // Include gstNumber
      await customer.save();
    }

    // Step 2: Create an order
    const newOrder = new Order({
      orderNumber: orderNumber,
      date: date,
      customerName: customerName,
      customerEmail: customerEmail,
      salesperson: salesperson,
      paymentTerms: paymentTerms,
      products,
      additionalNotes: additionalNotes,
      customerId: customer._id,
      // orderStatus: orderDetails.orderStatus,
    });
    await newOrder.save();

    // Step 4: Update customer document
    customer.orderId = newOrder._id;
    customer.productId = products.map((product) => product.id);
    // customer.paymentId = newPayment._id;
    await customer.save();

    res
      .status(201)
      .json({ message: "Order created successfully!", orderId: newOrder._id });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getOrder = async (req, res) => {
  try {
    // const { orderId } = req.params;

    // Find the order by ID
    const order = await Order.find().populate("customerId");
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Fetch related products and payment details
    const products = await Product.find({ customerId: order.customerId });
    const payment = await Payment.findOne({ customerId: order.customerId });

    res.status(200).json({
      order,
      customer: order.customerId,
      products,
      payment,
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("customerId");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
