// Dashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import {
  FiDollarSign,
  FiFileText,
  FiUsers,
  FiShoppingCart,
} from "react-icons/fi";

const Dashboard = () => {
  // Sample data for dashboard cards
  const stats = [
    {
      title: "Total Revenue",
      value: "$25,345",
      icon: <FiDollarSign size={24} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Orders",
      value: "1,234",
      icon: <FiFileText size={24} />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Total Customers",
      value: "568",
      icon: <FiUsers size={24} />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Pending Quotations",
      value: "12",
      icon: <FiShoppingCart size={24} />,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];
  const navigate = useNavigate();

  const handleGenerateNew = () => {
    navigate("/generate-quotation");
  };

  const handleNewOrder = () => {
    navigate("/create-order");
  };

  const handleNewInvoice = () => {
    navigate("/invoices");
  };
  // Sample recent activities
  const recentActivities = [
    { id: 1, activity: "New order #5001 received", time: "10 mins ago" },
    {
      id: 2,
      activity: "Quotation QT-1002 sent to client",
      time: "25 mins ago",
    },
    { id: 3, activity: "Invoice INV-2023-05 paid", time: "1 hour ago" },
    { id: 4, activity: "New customer registered", time: "2 hours ago" },
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>

      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card ${stat.color}`}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <h3>{stat.title}</h3>
              <p>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="recent-activities">
        <h2>Recent Activities</h2>
        <ul className="activity-list">
          {recentActivities.map((activity) => (
            <li key={activity.id} className="activity-item">
              <div className="activity-dot"></div>
              <div className="activity-content">
                <p>{activity.activity}</p>
                <span>{activity.time}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button className="action-btn" onClick={handleGenerateNew}>
            <FiFileText /> Create Quotation
          </button>
          <button className="action-btn" onClick={handleNewOrder}>
            <FiShoppingCart /> New Order
          </button>
          <button className="action-btn" onClick={handleNewInvoice}>
            <FiDollarSign /> Generate Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
