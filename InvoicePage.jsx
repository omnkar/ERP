import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./InvoicePage.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const InvoicePage = () => {
  const navigate = useNavigate();
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");
  const defaultEmail = "company@example.com";
  const [invoicePDF, setInvoicePDF] = useState("");

  // Form state
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "INV-" + Math.floor(1000 + Math.random() * 9000),
    date: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    customer: "",
    salesperson: "",
    paymentTerms: "30 days",
    status: "To Invoice",
    notes: "",
  });

  // Products state
  const [products, setProducts] = useState([
    {
      id: "P001",
      name: "",
      quantity: 1,
      unitPrice: 0,
      downPayment: 0,
      total: 0,
    },
  ]);

  // Calculations
  const subtotal = products.reduce((sum, product) => sum + product.total, 0);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const total = subtotal - discount + tax;

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  // Handle product changes
  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [name]:
        name === "quantity" || name === "unitPrice" || name === "downPayment"
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
        id: `P00${products.length + 1}`,
        name: "",
        quantity: 1,
        unitPrice: 0,
        downPayment: 0,
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

  // Generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`Invoice ${invoiceData.invoiceNumber}`, 20, 20);
    doc.text(`Invoice Date: ${invoiceData.date}`, 20, 30);
    doc.text(`Due Date: ${invoiceData.dueDate}`, 20, 40);
    doc.text(`Customer: ${invoiceData.customer}`, 20, 50);
    doc.text(`Salesperson: ${invoiceData.salesperson}`, 20, 60);
    doc.text(`Payment Terms: ${invoiceData.paymentTerms}`, 20, 70);
    doc.text(`Invoice Status: ${invoiceData.status}`, 20, 80);

    autoTable(doc, {
      startY: 90,
      head: [
        [
          "Product ID",
          "Product",
          "Quantity",
          "Unit Price",
          "Total",
          "Down Payment",
        ],
      ],
      body: products.map((product) => [
        product.id,
        product.name,
        product.quantity,
        `Rs.${product.unitPrice.toFixed(2)}`,
        `Rs.${product.total.toFixed(2)}`,
        `Rs.${product.downPayment.toFixed(2)}`,
      ]),
    });

    doc.text(
      `Subtotal: Rs. ${subtotal.toFixed(2)}`,
      20,
      doc.lastAutoTable.finalY + 10
    );
    doc.text(
      `Discount: Rs. ${discount.toFixed(2)}`,
      20,
      doc.lastAutoTable.finalY + 20
    );
    doc.text(`Tax: Rs. ${tax.toFixed(2)}`, 20, doc.lastAutoTable.finalY + 30);
    doc.text(
      `Total: Rs. ${total.toFixed(2)}`,
      20,
      doc.lastAutoTable.finalY + 40
    );

    if (invoiceData.notes) {
      doc.text(
        `Notes: ${invoiceData.notes}`,
        20,
        doc.lastAutoTable.finalY + 60
      );
    }

    const pdfBlob = doc.output("bloburl");
    setInvoicePDF(pdfBlob);
  };

  const handleSendEmail = () => {
    // Validate required fields
    if (!invoiceData.customer || products.some((p) => !p.name)) {
      alert(
        "Please fill in all required fields (customer and all product names)"
      );
      return;
    }
    generatePDF();
    setShowEmailPopup(true);
  };

  const handleClosePopup = () => {
    setShowEmailPopup(false);
  };

  const handleSend = () => {
    alert(`Invoice sent from ${defaultEmail} to ${recipientEmail}`);
    setShowEmailPopup(false);
  };

  const handleSave = () => {
    // Validate required fields
    if (!invoiceData.customer || products.some((p) => !p.name)) {
      alert(
        "Please fill in all required fields (customer and all product names)"
      );
      return;
    }
    alert("Invoice saved successfully!");
    // Here you would typically send the data to your backend
  };

  return (
    <div className="container">
      <div className="invoice-box">
        <header className="invoice-header">
          <h1>Invoice {invoiceData.invoiceNumber}</h1>
          <div className="invoice-info">
            <div className="form-group">
              <label>Invoice Date</label>
              <input
                type="date"
                name="date"
                value={invoiceData.date}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={invoiceData.dueDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </header>

        <section className="invoice-details">
          <div className="form-group">
            <label>Customer</label>
            <input
              type="text"
              name="customer"
              value={invoiceData.customer}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Salesperson</label>
            <input
              type="text"
              name="salesperson"
              value={invoiceData.salesperson}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Payment Terms</label>
            <select
              name="paymentTerms"
              value={invoiceData.paymentTerms}
              onChange={handleInputChange}
            >
              <option value="7 days">7 days</option>
              <option value="15 days">15 days</option>
              <option value="30 days">30 days</option>
              <option value="60 days">60 days</option>
            </select>
          </div>
          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={invoiceData.status}
              onChange={handleInputChange}
            >
              <option value="To Invoice">To Invoice</option>
              <option value="Sent">Sent</option>
              <option value="Paid">Paid</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </section>

        <table className="invoice-table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total</th>
              <th>Down Payment</th>
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
                <td>Rs.{product.total.toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    name="downPayment"
                    value={product.downPayment}
                    onChange={(e) => handleProductChange(index, e)}
                    min="0"
                    step="0.01"
                  />
                </td>
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
        <button type="button" className="add-product-btn" onClick={addProduct}>
          + Add Product
        </button>

        <div className="invoice-summary">
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>Rs.{subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
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
            <span>- Rs.{discount.toFixed(2)}</span>
          </div>
          <div className="summary-row">
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
            <span>+ Rs.{tax.toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total Amount:</span>
            <span>Rs.{total.toFixed(2)}</span>
          </div>
        </div>

        <div className="form-group notes">
          <label>Additional Notes</label>
          <textarea
            name="notes"
            value={invoiceData.notes}
            onChange={handleInputChange}
            rows="3"
          />
        </div>

        <div className="invoice-actions">
          <button className="btn cancel" onClick={() => navigate("/orders")}>
            Cancel
          </button>
          <button className="btn save" onClick={handleSave}>
            Save
          </button>
          <button className="btn email" onClick={handleSendEmail}>
            Send over email
          </button>
        </div>
      </div>

      {showEmailPopup && (
        <div className="email-popup">
          <div className="popup-content">
            <h2>Send Invoice</h2>
            <label>Sender Email:</label>
            <input type="email" value={defaultEmail} disabled />
            <label>Recipient Email:</label>
            <input
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder="Enter recipient email"
              required
            />
            <label>Attached File:</label>
            {invoicePDF && (
              <a
                href={invoicePDF}
                target="_blank"
                rel="noopener noreferrer"
                download={`Invoice_${invoiceData.invoiceNumber}.pdf`}
              >
                View Invoice (PDF)
              </a>
            )}
            <div className="popup-buttons">
              <button onClick={handleSend}>Send</button>
              <button onClick={handleClosePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoicePage;
