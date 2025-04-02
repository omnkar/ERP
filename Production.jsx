import React from "react";
import './Production.css';

const ProductionDashboard = () => {
  // Sample data - in a real app, this would come from an API
  const productionStats = {
    totalOrders: 24,
    inProgress: 12,
    completedToday: 5,
    delayed: 2,
    efficiency: 87,
  };

  const recentOrders = [
    { id: "CNV-1001", customer: "ACME Corp", status: "In Production", dueDate: "2023-06-15" },
    { id: "CNV-1002", customer: "Global Logistics", status: "Design Approved", dueDate: "2023-06-20" },
    { id: "CNV-1003", customer: "Mega Warehousing", status: "Assembly", dueDate: "2023-06-10" },
    { id: "CNV-1004", customer: "BoxMovers Inc", status: "Quality Check", dueDate: "2023-06-12" },
  ];

  const inventoryAlerts = [
    { item: "Roller Bearings", status: "Low", quantity: 45 },
    { item: "Conveyor Belts", status: "Medium", quantity: 320 },
    { item: "Steel Frames", status: "Critical", quantity: 12 },
  ];

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Production Dashboard</h1>
        <div className="quick-actions">
          <button className="btn primary">New Production Order</button>
          <button className="btn secondary">Generate Report</button>
        </div>
      </header>

      <div className="stats-grid">
        <StatCard 
          title="Total Orders" 
          value={productionStats.totalOrders} 
          icon="📋" 
          color="#4e73df" 
        />
        <StatCard 
          title="In Progress" 
          value={productionStats.inProgress} 
          icon="⚙️" 
          color="#f6c23e" 
        />
        <StatCard 
          title="Completed Today" 
          value={productionStats.completedToday} 
          icon="✅" 
          color="#1cc88a" 
        />
        <StatCard 
          title="Delayed" 
          value={productionStats.delayed} 
          icon="⚠️" 
          color="#e74a3b" 
        />
        <StatCard 
          title="Efficiency" 
          value={`${productionStats.efficiency}%`} 
          icon="📈" 
          color="#36b9cc" 
        />
      </div>

      <div className="content-grid">
        <div className="card recent-orders">
          <h2>Recent Production Orders</h2>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>
                    <span className={`status-badge ${order.status.replace(/\s+/g, '-').toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{order.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn link">View All Orders</button>
        </div>

        <div className="card inventory-alerts">
          <h2>Inventory Alerts</h2>
          <ul>
            {inventoryAlerts.map((item, index) => (
              <li key={index} className={`alert-item ${item.status.toLowerCase()}`}>
                <span className="alert-icon">
                  {item.status === "Critical" ? "🚨" : item.status === "Low" ? "⚠️" : "ℹ️"}
                </span>
                <span className="item-name">{item.item}</span>
                <span className="item-qty">{item.quantity} units</span>
              </li>
            ))}
          </ul>
          <button className="btn link">Manage Inventory</button>
        </div>

        <div className="card production-progress">
          <h2>Production Stages</h2>
          <div className="stage-tracker">
            <div className="stage completed">
              <span className="stage-name">Design</span>
              <div className="stage-bar"></div>
            </div>
            <div className="stage completed">
              <span className="stage-name">Material Prep</span>
              <div className="stage-bar"></div>
            </div>
            <div className="stage active">
              <span className="stage-name">Assembly</span>
              <div className="stage-bar"></div>
            </div>
            <div className="stage">
              <span className="stage-name">Quality Check</span>
              <div className="stage-bar"></div>
            </div>
            <div className="stage">
              <span className="stage-name">Shipping</span>
              <div className="stage-bar"></div>
            </div>
          </div>
          <div className="current-project">
            <h3>Current Project: ACME Corp Conveyor System</h3>
            <p>Order CNV-1001 | Due in 3 days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="stat-card" style={{ borderTop: `4px solid ${color}` }}>
      <div className="stat-content">
        <span className="stat-icon">{icon}</span>
        <div>
          <h3>{title}</h3>
          <p className="stat-value">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductionDashboard;