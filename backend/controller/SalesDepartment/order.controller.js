const Customer = require("../../models/SalesDepartment/customer.model")
const Order = require("../../models/SalesDepartment/orders.model");
const Product = require("../../models/SalesDepartment/product.model");
const Payment = require("../../models/SalesDepartment/payment.model");

module.exports.createOrder = async (req, res) => {
    // console.log("Request body:", req.body);
    // const {name,email,contactNp}=req.body;
    // const orderDetails=req.body.orderDetails;
    // const products=req.body.products;
    // const paymentDetails=req.body.paymentDetails;
    // console.log("Order Details:", orderDetails);
    // console.log("Products:", products);
    // console.log("Payment Details:", paymentDetails);

  try {
    
    const { name, email, contactNo, orderDetails, products, paymentDetails } = req.body;

    // Step 1: Find or create a customer
    console.log(orderDetails);
    let customer = await Customer.findOne({ email });
    if (!customer) {
      customer = new Customer({ name, email, contactNo });
      await customer.save();
    }

    // Step 2: Create an order
    const newOrder = new Order({
      orderDate: orderDetails.orderDate,
      deliveryDate: orderDetails.deliveryDate,
      orderStatus: orderDetails.orderStatus,
      customerId: customer._id
    });
    await newOrder.save();

    // Step 3: Create products
    for (const product of products) {
      await new Product({
        customerId: customer._id,
        productName: product.productName,
        quantity: product.quantity,
        rate: product.rate,
        amount: product.amount
      }).save();
    }

    // Step 4: Create a payment
    const newPayment = new Payment({
      customerId: customer._id,
      paymentMode: paymentDetails.paymentMode,
      paymentStatus: paymentDetails.paymentStatus
    });
    await newPayment.save();

    // Step 5: Update customer document
    customer.orderId=newOrder._id;
    customer.paymentId=newPayment._id;
    // customer.productId=newProduct._id;
    await customer.save();

    res.status(201).json({ message: "Order created successfully!", orderId: newOrder._id });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

};

module.exports.getOrder = async (req, res) => {
  try {
    // const { orderId } = req.params;

    // Find the order by ID
    const order = await Order.find().populate('customerId');
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
      payment
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('customerId');
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

