import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrdersInvoice.css";

const OrdersInvoice = ({ orders, setOrders }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter(
    (order) =>
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateNew = () => {
    navigate("/create-order");
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "To Invoice":
        return "to-invoice";
      case "Invoiced":
        return "invoiced";
      case "Paid":
        return "paid";
      default:
        return "";
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h2 className="title">Orders to Invoice</h2>
          <button className="create-btn" onClick={handleCreateNew}>
            + Create New Order
          </button>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Order Date</th>
              <th>Customer Name</th>
              <th>Salesperson</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={index}>
                <td>{order.orderNumber}</td>
                <td>{order.date}</td>
                <td>{order.customer}</td>
                <td>{order.salesperson}</td>
                <td>₹{order.total.toFixed(2)}</td>
                <td>
                  <span className={`status ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <button
                    className="action-btn view-btn"
                    onClick={() => navigate(`/orders/${order.orderNumber}`)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersInvoice;
