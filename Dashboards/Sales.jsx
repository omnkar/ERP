import React, { useState } from "react";
import './Sales.css';
import { 
  FiDollarSign, FiTarget, FiTrendingUp, FiSearch, FiBarChart2, FiPackage,
  FiHome, FiFileText, FiUsers, FiTruck, FiPieChart, FiSettings, FiMenu 
} from "react-icons/fi";
import { 
  BsCheckCircle, BsClock, BsCurrencyExchange, BsExclamationTriangle 
} from "react-icons/bs";

const SalesDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeModule, setActiveModule] = useState('dashboard');

  // Data - would come from API in real app
  const stats = [
    { 
      title: "Monthly Revenue", 
      value: "$125,000", 
      icon: <FiDollarSign size={20} />, 
      color: "#4e73df",
      trend: "up",
      trendValue: "12%"
    },
    { 
      title: "Quarterly Target", 
      value: "$500,000", 
      icon: <FiTarget size={20} />, 
      color: "#f6c23e" 
    },
    { 
      title: "Achieved", 
      value: "$375,000", 
      icon: <FiTrendingUp size={20} />, 
      color: "#1cc88a",
      trend: "up",
      trendValue: "8%"
    },
    { 
      title: "Open Opportunities", 
      value: "18", 
      icon: <FiSearch size={20} />, 
      color: "#36b9cc" 
    },
    { 
      title: "Conversion Rate", 
      value: "32%", 
      icon: <FiBarChart2 size={20} />, 
      color: "#e74a3b",
      trend: "down",
      trendValue: "2%"
    },
    { 
      title: "Avg Deal Size", 
      value: "$8,500", 
      icon: <FiPackage size={20} />, 
      color: "#858796",
      trend: "up",
      trendValue: "5%"
    }
  ];

  const quotes = [
    { id: "QT-2023-101", customer: "ACME Corp", value: 24500, status: "pending", daysOpen: 3 },
    { id: "QT-2023-102", customer: "Global Logistics", value: 18700, status: "approved", daysOpen: 7 },
    { id: "QT-2023-103", customer: "Mega Warehousing", value: 32500, status: "negotiation", daysOpen: 5 },
    { id: "QT-2023-104", customer: "BoxMovers Inc", value: 14200, status: "lost", daysOpen: 10 },
  ];

  const customers = [
    { name: "ACME Corp", revenue: 185000, projects: 8, growth: "up" },
    { name: "Global Logistics", revenue: 142500, projects: 6, growth: "up" },
    { name: "Mega Warehousing", revenue: 97500, projects: 4, growth: "down" },
    { name: "BoxMovers Inc", revenue: 87500, projects: 5, growth: "neutral" },
  ];

  const pipeline = [
    { stage: "Prospect", value: 125000, count: 12, color: "#4e73df" },
    { stage: "Qualified", value: 225000, count: 8, color: "#36b9cc" },
    { stage: "Proposal", value: 175000, count: 5, color: "#1cc88a" },
    { stage: "Negotiation", value: 150000, count: 3, color: "#f6c23e" },
    { stage: "Closed Won", value: 375000, count: 9, color: "#e74a3b" },
  ];

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiHome /> },
    { id: 'quotes', label: 'Quotes', icon: <FiFileText /> },
    { id: 'customers', label: 'Customers', icon: <FiUsers /> },
    { id: 'orders', label: 'Orders', icon: <FiTruck /> },
    { id: 'reports', label: 'Reports', icon: <FiPieChart /> },
    { id: 'settings', label: 'Settings', icon: <FiSettings /> }
  ];

  return (
    <div className="erp-dashboard-container">
      {/* Sidebar */}
      <div className={`erp-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Sales Module</h2>
          <button 
            className="sidebar-toggle" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FiMenu />
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`nav-item ${activeModule === item.id ? 'active' : ''}`}
                  onClick={() => setActiveModule(item.id)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {sidebarOpen && <span className="nav-label">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        {sidebarOpen && (
          <div className="sidebar-footer">
            <div className="user-profile">
              <div className="avatar">SM</div>
              <div className="user-info">
                <h4>Sales Manager</h4>
                <p>sales@conveyor.com</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className={`erp-main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="sales-dashboard">
          {/* Header */}
          <div className="dashboard-header">
            <div className="header-left">
              <button 
                className="mobile-menu-toggle" 
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <FiMenu />
              </button>
              <h1>Sales Dashboard</h1>
              <p>Overview of your sales performance</p>
            </div>
            <div className="header-right">
              <button className="btn-primary">Create New Quote</button>
              <button className="btn-secondary">Generate Report</button>
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card" style={{ borderLeft: `4px solid ${stat.color}` }}>
                <div className="stat-content">
                  <div className="stat-text">
                    <p className="stat-title">{stat.title}</p>
                    <h3 className="stat-value">{stat.value}</h3>
                    {stat.trend && (
                      <div className={`stat-trend ${stat.trend}`}>
                        {stat.trend === 'up' ? '↑' : '↓'} {stat.trendValue}
                      </div>
                    )}
                  </div>
                  <div className="stat-icon" style={{ backgroundColor: stat.color }}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="dashboard-content">
            {/* Left Column */}
            <div className="content-column">
              {/* Recent Quotes Card */}
              <div className="dashboard-card">
                <div className="card-header">
                  <h2>Recent Quotes</h2>
                  <button className="card-action">View All</button>
                </div>
                <div className="card-body">
                  <table className="erp-table">
                    <thead>
                      <tr>
                        <th>Quote ID</th>
                        <th>Customer</th>
                        <th>Value</th>
                        <th>Status</th>
                        <th>Days Open</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quotes.map((quote) => (
                        <tr key={quote.id}>
                          <td>{quote.id}</td>
                          <td>{quote.customer}</td>
                          <td>${quote.value.toLocaleString()}</td>
                          <td>
                            <span className={`status-badge ${quote.status}`}>
                              {quote.status === 'pending' && <BsClock />}
                              {quote.status === 'approved' && <BsCheckCircle />}
                              {quote.status === 'negotiation' && <BsCurrencyExchange />}
                              {quote.status === 'lost' && <BsExclamationTriangle />}
                              {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                            </span>
                          </td>
                          <td>{quote.daysOpen}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Top Customers Card */}
              <div className="dashboard-card">
                <div className="card-header">
                  <h2>Top Customers</h2>
                  <button className="card-action">View All</button>
                </div>
                <div className="card-body">
                  <div className="customer-list">
                    {customers.map((customer, index) => (
                      <div key={index} className="customer-item">
                        <div className="customer-rank">{index + 1}</div>
                        <div className="customer-info">
                          <h3>{customer.name}</h3>
                          <p>${customer.revenue.toLocaleString()} • {customer.projects} projects</p>
                        </div>
                        <div className={`customer-growth ${customer.growth}`}>
                          {customer.growth === 'up' && '↑'}
                          {customer.growth === 'down' && '↓'}
                          {customer.growth === 'neutral' && '→'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="content-column">
              {/* Sales Pipeline Card */}
              <div className="dashboard-card">
                <div className="card-header">
                  <h2>Sales Pipeline</h2>
                </div>
                <div className="card-body">
                  <div className="pipeline-visual">
                    {pipeline.map((stage, index) => (
                      <div key={index} className="pipeline-stage">
                        <div className="stage-header">
                          <h4>{stage.stage}</h4>
                          <span>{stage.count} deals</span>
                        </div>
                        <div className="stage-bar-container">
                          <div 
                            className="stage-bar" 
                            style={{
                              width: `${(stage.value / 500000) * 100}%`,
                              backgroundColor: stage.color
                            }}
                          ></div>
                        </div>
                        <div className="stage-value">${stage.value.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Conversion Funnel Card */}
              <div className="dashboard-card">
                <div className="card-header">
                  <h2>Conversion Funnel</h2>
                </div>
                <div className="card-body">
                  <div className="funnel-visual">
                    {pipeline.map((stage, index) => (
                      <div 
                        key={index} 
                        className="funnel-stage"
                        style={{
                          width: `${100 - (index * 15)}%`,
                          backgroundColor: stage.color
                        }}
                      >
                        <div className="funnel-stage-label">
                          <span>{stage.stage}</span>
                          <span>{stage.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;