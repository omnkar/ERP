import { useState } from "react";
import axios from "axios";

export default function NewOrderForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNo: "",
    orderDetails: { orderDate: "", deliveryDate: "", orderStatus: "" },
    products: [{ productName: "", quantity: "", rate: "", amount: "" }],
    paymentDetails: { paymentMode: "", paymentStatus: "" }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const newProducts = [...formData.products];
    newProducts[index][name] = value;
    setFormData({ ...formData, products: newProducts });
  };

  const addProduct = () => {
    setFormData({
      ...formData,
      products: [...formData.products, { productName: "", quantity: "", rate: "", amount: "" }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/sales/create", formData);
      alert(response.data.message);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">New Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Customer Name" onChange={handleChange} className="input" />
        <input name="email" placeholder="Customer Email" onChange={handleChange} className="input" />
        <input name="contactNo" placeholder="Contact No" onChange={handleChange} className="input" />

        <input name="orderDetails.orderDate" type="date" onChange={handleChange} className="input" />
        <input name="orderDetails.deliveryDate" type="date" onChange={handleChange} className="input" />
        <select name="orderDetails.orderStatus" onChange={handleChange} className="input">
          <option value="">Select Order Status</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Shipped">Shipped</option>
        </select>

        <h3 className="text-lg font-semibold mt-4">Product Details</h3>
        {formData.products.map((product, index) => (
          <div key={index} className="space-y-2">
            <input
              name="productName"
              placeholder="Product Name"
              value={product.productName}
              onChange={(e) => handleProductChange(index, e)}
              className="input"
            />
            <input
              name="quantity"
              type="number"
              placeholder="Quantity"
              value={product.quantity}
              onChange={(e) => handleProductChange(index, e)}
              className="input"
            />
            <input
              name="rate"
              type="number"
              placeholder="Rate"
              value={product.rate}
              onChange={(e) => handleProductChange(index, e)}
              className="input"
            />
            <input
              name="amount"
              type="number"
              placeholder="Amount"
              value={product.amount}
              onChange={(e) => handleProductChange(index, e)}
              className="input"
            />
          </div>
        ))}
        <button type="button" onClick={addProduct} className="bg-green-600 text-white px-3 py-1 rounded-lg">+ Add Product</button>

        <h3 className="text-lg font-semibold mt-4">Payment Details</h3>
        <select name="paymentDetails.paymentMode" onChange={handleChange} className="input">
          <option value="">Select Payment Mode</option>
          <option value="Cash">Cash</option>
          <option value="Online">Online</option>
        </select>
        <select name="paymentDetails.paymentStatus" onChange={handleChange} className="input">
          <option value="">Select Payment Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full">Create Order</button>
      </form>
    </div>
  );
}
