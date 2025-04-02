import React, { useState } from 'react';
import { 
  FiPieChart, FiUsers, FiSettings, FiTruck, FiDollarSign, 
  FiClipboard, FiBell, FiSearch, FiPlus, FiMenu 
} from 'react-icons/fi';
import './Admin.css';

const AdminDashboard = () => {
  // Sample data
  const [metrics] = useState({
    totalOrders: 142,
    productionRate: '87%',
    inventoryValue: '$1.42M',
    pendingShipments: 8,
    maintenanceDue: 3,
    activeEmployees: 128
  });

  const [recentOrders] = useState([
    { id: 1001, customer: 'ABC Manufacturing', status: 'In Production', value: '$42,500' },
    { id: 1002, customer: 'XYZ Industries', status: 'Design Approval', value: '$28,750' },
    { id: 1003, customer: 'Global Conveyors', status: 'Shipped', value: '$65,200' },
    { id: 1004, customer: 'Bulk Material Co', status: 'Payment Pending', value: '$37,800' }
  ]);

  const [systemAlerts] = useState([
    { id: 1, message: 'Maintenance required for Assembly Line 2', severity: 'high' },
    { id: 2, message: 'Low inventory: Roller bearings (200 units left)', severity: 'medium' },
    { id: 3, message: '3 supplier invoices awaiting approval', severity: 'low' }
  ]);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={`admin-dashboard ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>ConveyorERP</h2>
          <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FiMenu />
          </button>
        </div>
        <nav>
          <ul>
            <li 
              className={activeTab === 'dashboard' ? 'active' : ''}
              onClick={() => setActiveTab('dashboard')}
            >
              <FiPieChart className="icon" />
              <span>Dashboard</span>
            </li>
            <li 
              className={activeTab === 'production' ? 'active' : ''}
              onClick={() => setActiveTab('production')}
            >
              <FiTruck className="icon" />
              <span>Production</span>
            </li>
            <li 
              className={activeTab === 'inventory' ? 'active' : ''}
              onClick={() => setActiveTab('inventory')}
            >
              <FiClipboard className="icon" />
              <span>Inventory</span>
            </li>
            <li 
              className={activeTab === 'finance' ? 'active' : ''}
              onClick={() => setActiveTab('finance')}
            >
              <FiDollarSign className="icon" />
              <span>Finance</span>
            </li>
            <li 
              className={activeTab === 'employees' ? 'active' : ''}
              onClick={() => setActiveTab('employees')}
            >
              <FiUsers className="icon" />
              <span>Employees</span>
            </li>
            <li 
              className={activeTab === 'settings' ? 'active' : ''}
              onClick={() => setActiveTab('settings')}
            >
              <FiSettings className="icon" />
              <span>Settings</span>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input type="text" placeholder="Search across ERP..." />
          </div>
          <div className="header-actions">
            <div className="notifications">
              <FiBell />
              <span className="badge">3</span>
            </div>
            <div className="user-profile">
              <div className="avatar">A</div>
              <span className="username">Admin</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        {activeTab === 'dashboard' && (
          <div className="content-area">
            <h1>Admin Dashboard</h1>
            <p className="subtitle">Conveyor Manufacturing Overview</p>

            {/* Key Metrics */}
            <div className="metrics-grid">
              <MetricCard 
                title="Total Orders" 
                value={metrics.totalOrders} 
                change="+12% this month" 
                icon={<FiClipboard />}
              />
              <MetricCard 
                title="Production Rate" 
                value={metrics.productionRate} 
                change="+5% from last week" 
                icon={<FiTruck />}
              />
              <MetricCard 
                title="Inventory Value" 
                value={metrics.inventoryValue} 
                change="Updated today" 
                icon={<FiClipboard />}
              />
              <MetricCard 
                title="Pending Shipments" 
                value={metrics.pendingShipments} 
                change="2 delayed" 
                icon={<FiTruck />}
              />
              <MetricCard 
                title="Maintenance Due" 
                value={metrics.maintenanceDue} 
                change="1 critical" 
                icon={<FiSettings />}
              />
              <MetricCard 
                title="Active Employees" 
                value={metrics.activeEmployees} 
                change="3 on leave" 
                icon={<FiUsers />}
              />
            </div>

            {/* Recent Orders */}
            <div className="dashboard-section">
              <div className="section-header">
                <h2>Recent Orders</h2>
                <button className="btn view-all">View All</button>
              </div>
              <div className="card">
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Status</th>
                      <th>Value</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map(order => (
                      <tr key={order.id}>
                        <td>#{order.id}</td>
                        <td>{order.customer}</td>
                        <td>
                          <span className={`status-badge ${order.status.replace(' ', '-').toLowerCase()}`}>
                            {order.status}
                          </span>
                        </td>
                        <td>{order.value}</td>
                        <td>
                          <button className="btn small">Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* System Alerts */}
            <div className="dashboard-section">
              <div className="section-header">
                <h2>System Alerts</h2>
                <button className="btn view-all">View All</button>
              </div>
              <div className="alerts-grid">
                {systemAlerts.map(alert => (
                  <div key={alert.id} className={`alert-card ${alert.severity}`}>
                    <div className="alert-content">
                      <h3>{alert.message}</h3>
                      <p>Requires immediate attention</p>
                    </div>
                    <button className="btn small">Resolve</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Other Tabs Content */}
        {activeTab !== 'dashboard' && (
          <div className="content-area">
            <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management</h1>
            <p className="subtitle">Conveyor Manufacturing System</p>
            <div className="coming-soon">
              <h2>{activeTab} Module Coming Soon</h2>
              <p>This section is currently under development</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable Components
const MetricCard = ({ title, value, change, icon }) => {
  return (
    <div className="metric-card">
      <div className="metric-icon">{icon}</div>
      <div className="metric-content">
        <h3>{title}</h3>
        <p className="metric-value">{value}</p>
        <p className="metric-change">{change}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;