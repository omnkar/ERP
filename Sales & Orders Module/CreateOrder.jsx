import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateOrder.css";

const CreateOrder = ({ onSave }) => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState({
    orderNumber: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().split("T")[0],
    customer: "",
    salesperson: "",
    paymentTerms: "30 days",
    status: "Draft",
    notes: "",
  });

  const [products, setProducts] = useState([
    { id: "P001", name: "", quantity: 1, unitPrice: 0, total: 0 },
  ]);

  const subtotal = products.reduce((sum, product) => sum + product.total, 0);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const total = subtotal - discount + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [name]:
        name === "quantity" || name === "unitPrice"
          ? parseFloat(value) || 0
          : value,
    };

    if (name === "quantity" || name === "unitPrice") {
      updatedProducts[index].total =
        updatedProducts[index].quantity * updatedProducts[index].unitPrice;
    }

    setProducts(updatedProducts);
  };

  const addProduct = () => {
    setProducts([
      ...products,
      {
        id: `P00${products.length + 1}`,
        name: "",
        quantity: 1,
        unitPrice: 0,
        total: 0,
      },
    ]);
  };

  const removeProduct = (index) => {
    if (products.length > 1) {
      const updatedProducts = [...products];
      updatedProducts.splice(index, 1);
      setProducts(updatedProducts);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!orderData.customer || products.some((p) => !p.name)) {
      alert(
        "Please fill in all required fields (customer and all product names)"
      );
      return;
    }

    const newOrder = {
      ...orderData,
      products,
      subtotal,
      discount,
      tax,
      total,
      status: "To Invoice",
    };

    if (typeof onSave === "function") {
      onSave(newOrder);
    }

    navigate("/orders");
  };

  return (
    <div className="order-container">
      <h1>Create New Order</h1>

      <form onSubmit={handleSubmit}>
        <div className="order-header">
          <div className="form-group">
            <label>Order Number</label>
            <input
              type="text"
              name="orderNumber"
              value={orderData.orderNumber}
              readOnly
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={orderData.date}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="customer-details">
          <div className="form-group">
            <label>Customer Name</label>
            <input
              type="text"
              name="customer"
              value={orderData.customer}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Salesperson</label>
            <input
              type="text"
              name="salesperson"
              value={orderData.salesperson}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Payment Terms</label>
            <select
              name="paymentTerms"
              value={orderData.paymentTerms}
              onChange={handleInputChange}
            >
              <option value="7 days">7 days</option>
              <option value="15 days">15 days</option>
              <option value="30 days">30 days</option>
            </select>
          </div>
        </div>

        <div className="products-section">
          <h3>Products/Services</h3>
          <table className="products-table">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      name="id"
                      value={product.id}
                      onChange={(e) => handleProductChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={product.name}
                      onChange={(e) => handleProductChange(index, e)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="quantity"
                      value={product.quantity}
                      onChange={(e) => handleProductChange(index, e)}
                      min="1"
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="unitPrice"
                      value={product.unitPrice}
                      onChange={(e) => handleProductChange(index, e)}
                      min="0"
                      step="0.01"
                      required
                    />
                  </td>
                  <td>₹{product.total.toFixed(2)}</td>
                  <td>
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeProduct(index)}
                      disabled={products.length <= 1}
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            className="add-product-btn"
            onClick={addProduct}
          >
            + Add Product
          </button>
        </div>

        <div className="totals-section">
          <div className="total-row">
            <span>Subtotal:</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="total-row">
            <span>
              Discount:
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                min="0"
                step="0.01"
              />
            </span>
            <span>- ₹{discount.toFixed(2)}</span>
          </div>
          <div className="total-row">
            <span>
              Tax:
              <input
                type="number"
                value={tax}
                onChange={(e) => setTax(parseFloat(e.target.value) || 0)}
                min="0"
                step="0.01"
              />
            </span>
            <span>+ ₹{tax.toFixed(2)}</span>
          </div>
          <div className="total-row grand-total">
            <span>Total Amount:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        <div className="form-group notes">
          <label>Additional Notes</label>
          <textarea
            name="notes"
            value={orderData.notes}
            onChange={handleInputChange}
            rows="3"
          />
        </div>

        <div className="action-buttons">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/orders")}
          >
            Cancel
          </button>
          <button type="submit" className="save-btn">
            Save Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateOrder;
