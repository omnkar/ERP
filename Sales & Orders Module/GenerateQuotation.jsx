// GenerateQuotation.jsx (updated)
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GenerateQuotation.css";
import SendQuotationEmail from "./SendQuotationEmail";

const GenerateQuotation = ({ onGenerate }) => {
  const navigate = useNavigate();
  // Form state
  const [quotationData, setQuotationData] = useState({
    quotationNumber: "QT-" + Math.floor(1000 + Math.random() * 9000),
    date: new Date().toISOString().split("T")[0],
    customer: " ",
    salesperson: " ",
    paymentTerms: " ",
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    notes: "",
  });
  const [showEmailModal, setShowEmailModal] = useState(false);

  // Products state
  const [products, setProducts] = useState([
    { id: " ", name: "", quantity: 0, unitPrice: 0, total: 0 },
  ]);

  // Calculations
  const subtotal = products.reduce((sum, product) => sum + product.total, 0);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const total = subtotal - discount + tax;

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuotationData({ ...quotationData, [name]: value });
  };

  // Handle product changes
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

    // Auto-calculate total
    if (name === "quantity" || name === "unitPrice") {
      updatedProducts[index].total =
        updatedProducts[index].quantity * updatedProducts[index].unitPrice;
    }

    setProducts(updatedProducts);
  };

  // Add new product row
  const addProduct = () => {
    setProducts([
      ...products,
      {
        id: `P${products.length + 1}`,
        name: "",
        quantity: 0,
        unitPrice: 0,
        total: 0,
      },
    ]);
  };

  // Remove product row
  const removeProduct = (index) => {
    if (products.length > 1) {
      const updatedProducts = [...products];
      updatedProducts.splice(index, 1);
      setProducts(updatedProducts);
    }
  };

  // Submit quotation
  const handleSubmit = (e) => {
    e.preventDefault();
    const quotation = {
      id: quotationData.quotationNumber,
      customer: quotationData.customer,
      date: quotationData.date,
      expiryDate: quotationData.expiryDate,
      amount: total,
      status: "draft",
      salesperson: quotationData.salesperson,
      paymentTerms: quotationData.paymentTerms,
      products: [...products],
      subtotal,
      discount,
      tax,
      total,
    };

    if (typeof onGenerate === "function") {
      onGenerate(quotation);
    } else {
      console.log("Quotation generated:", quotation);
    }

    navigate("/quotations");
  };

  return (
    <div className="quotation-container">
      <h1>Generate Quotation</h1>

      <form onSubmit={handleSubmit}>
        {/* Header Section */}
        <div className="quotation-header">
          <div className="form-group">
            <label>Quotation Number</label>
            <input
              type="text"
              name="quotationNumber"
              value={quotationData.quotationNumber}
              readOnly
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={quotationData.date}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              value={quotationData.expiryDate}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* Customer Details */}
        <div className="customer-details">
          <div className="form-group">
            <label>Customer Name</label>
            <input
              type="text"
              name="customer"
              value={quotationData.customer}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Salesperson</label>
            <input
              type="text"
              name="salesperson"
              value={quotationData.salesperson}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Payment Terms</label>
            <select
              name="paymentTerms"
              value={quotationData.paymentTerms}
              onChange={handleInputChange}
            >
              <option value="7 days">7 days</option>
              <option value="15 days">15 days</option>
              <option value="30 days">30 days</option>
              <option value="60 days">60 days</option>
            </select>
          </div>
        </div>
        {/* Products Table */}
        <div className="products-section">
          <h3>Products/Services</h3>
          <table className="products-table">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit Price (₹)</th>
                <th>Total (₹)</th>
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
        {/* Totals Section */}
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
              Tax (%):
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
        {/* Notes */}
        <div className="form-group notes">
          <label>Additional Notes</label>
          <textarea
            name="notes"
            value={quotationData.notes}
            onChange={handleInputChange}
            rows="3"
          />
        </div>
        {showEmailModal && (
          <SendQuotationEmail
            quotationData={quotationData}
            onClose={() => setShowEmailModal(false)}
          />
        )}
        {/* Action Buttons */}

        <div className="action-buttons">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/")} // Changed to navigate to dashboard
          >
            Back to Dashboard
          </button>
          <button type="submit" className="generate-btn">
            Generate Quotation
          </button>
          <button
            type="button"
            className="send-btn"
            onClick={() => setShowEmailModal(true)}
          >
            Send over email
          </button>
        </div>
      </form>
    </div>
  );
};

export default GenerateQuotation;
