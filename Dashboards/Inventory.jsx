import React, { useState } from 'react';
import { 
  FiPackage, FiTruck, FiAlertTriangle, FiTrendingUp, 
  FiDollarSign, FiSearch, FiPlus, FiFilter, 
  FiRefreshCw, FiPrinter, FiDownload 
} from 'react-icons/fi';
import './Inventory.css';

// Metric Card Component (moved outside main component)
const MetricCard = ({ title, value, icon, trend, change, variant }) => {
  return (
    <div className={`metric-card ${variant || ''}`}>
      <div className="metric-icon">{icon}</div>
      <div className="metric-content">
        <h3>{title}</h3>
        <p className="metric-value">{value}</p>
        <div className={`metric-trend ${trend}`}>
          <span>{change}</span>
        </div>
      </div>
    </div>
  );
};

// Report Card Component (moved outside main component)
const ReportCard = ({ title, description, icon }) => {
  return (
    <div className="report-card">
      <div className="report-icon">{icon}</div>
      <div className="report-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="report-actions">
        <button className="btn secondary">
          <FiPrinter />
          <span>Print</span>
        </button>
        <button className="btn primary">
          <FiDownload />
          <span>Export</span>
        </button>
      </div>
    </div>
  );
};

const InventoryDashboard = () => {
  // Inventory data state
  const [metrics] = useState({
    totalItems: 1428,
    lowStockItems: 24,
    outOfStock: 5,
    inventoryValue: '$1.42M',
    incomingShipments: 8,
    stockMovement: '+12%'
  });

  const [inventoryItems] = useState([
    { id: 'CNV-1001', name: 'Conveyor Belt Rollers', category: 'Components', stock: 142, threshold: 50, status: 'in-stock' },
    { id: 'CNV-1002', name: 'Steel Frame Sections', category: 'Structural', stock: 87, threshold: 30, status: 'in-stock' },
    { id: 'CNV-1003', name: 'Drive Motors (5HP)', category: 'Electrical', stock: 12, threshold: 15, status: 'low-stock' },
    { id: 'CNV-1004', name: 'Control Panels', category: 'Electrical', stock: 0, threshold: 10, status: 'out-of-stock' },
    { id: 'CNV-1005', name: 'Rubber Belting (50m)', category: 'Materials', stock: 28, threshold: 20, status: 'in-stock' },
  ]);

  const [incomingShipments] = useState([
    { id: 'SH-2301', supplier: 'SteelCo Inc.', items: 'Frame Sections', eta: new Date('2023-06-15'), status: 'in-transit' },
    { id: 'SH-2302', supplier: 'MotionTech', items: 'Drive Motors', eta: new Date('2023-06-18'), status: 'processing' },
    { id: 'SH-2303', supplier: 'RubberWorks', items: 'Belting Material', eta: new Date('2023-06-20'), status: 'delayed' },
  ]);

  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Filter inventory items
  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ['all', ...new Set(inventoryItems.map(item => item.category))];

  // Format date
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="inventory-dashboard">
      {/* Main Header */}
      <header className="dashboard-header">
        <div className="header-title">
          <FiPackage className="header-icon" />
          <h1>Inventory Management</h1>
          <span className="last-updated">Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
        
        <div className="header-controls">
          <div className="search-container">
            <FiSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search inventory..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="action-buttons">
            <button className="btn primary">
              <FiPlus />
              <span>New Item</span>
            </button>
            <button className="btn secondary">
              <FiRefreshCw />
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="dashboard-container">
        {/* Navigation Sidebar */}
        <nav className="sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-title">Inventory Views</h3>
            <ul className="nav-menu">
              <li 
                className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <span className="nav-icon"><FiTrendingUp /></span>
                <span className="nav-text">Overview</span>
              </li>
              <li 
                className={`nav-item ${activeTab === 'items' ? 'active' : ''}`}
                onClick={() => setActiveTab('items')}
              >
                <span className="nav-icon"><FiPackage /></span>
                <span className="nav-text">Inventory Items</span>
              </li>
              <li 
                className={`nav-item ${activeTab === 'shipments' ? 'active' : ''}`}
                onClick={() => setActiveTab('shipments')}
              >
                <span className="nav-icon"><FiTruck /></span>
                <span className="nav-text">Incoming Shipments</span>
              </li>
              <li 
                className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}
                onClick={() => setActiveTab('reports')}
              >
                <span className="nav-icon"><FiDollarSign /></span>
                <span className="nav-text">Reports</span>
              </li>
            </ul>
          </div>
          
          <div className="sidebar-section">
            <h3 className="sidebar-title">Quick Filters</h3>
            <div className="filter-options">
              <div className="filter-group">
                <label>Category</label>
                <select 
                  value={filterCategory} 
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="filter-select"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="main-content">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="tab-content">
              <div className="metrics-container">
                <div className="metrics-grid">
                  <MetricCard 
                    title="Total Items" 
                    value={metrics.totalItems} 
                    icon={<FiPackage />}
                    trend="up"
                    change="+24 items this month"
                  />
                  <MetricCard 
                    title="Low Stock" 
                    value={metrics.lowStockItems} 
                    icon={<FiAlertTriangle />}
                    trend="up"
                    change="+3 from last week"
                    variant="warning"
                  />
                  <MetricCard 
                    title="Out of Stock" 
                    value={metrics.outOfStock} 
                    icon={<FiAlertTriangle />}
                    trend="same"
                    change="No change"
                    variant="danger"
                  />
                  <MetricCard 
                    title="Inventory Value" 
                    value={metrics.inventoryValue} 
                    icon={<FiDollarSign />}
                    trend="up"
                    change="+5.2% from last month"
                  />
                  <MetricCard 
                    title="Incoming Shipments" 
                    value={metrics.incomingShipments} 
                    icon={<FiTruck />}
                    trend="down"
                    change="-2 from last week"
                  />
                  <MetricCard 
                    title="Stock Movement" 
                    value={metrics.stockMovement} 
                    icon={<FiTrendingUp />}
                    trend="up"
                    change="Increased activity"
                  />
                </div>
              </div>

              <div className="content-section">
                <div className="section-header">
                  <h2>Low Stock Alerts</h2>
                  <div className="section-actions">
                    <button className="btn secondary">
                      <FiRefreshCw />
                      <span>Refresh</span>
                    </button>
                    <button className="btn tertiary">
                      <FiPrinter />
                    </button>
                  </div>
                </div>
                <div className="card">
                  <div className="table-responsive">
                    <table className="inventory-table">
                      <thead>
                        <tr>
                          <th>Item ID</th>
                          <th>Item Name</th>
                          <th>Category</th>
                          <th>Current Stock</th>
                          <th>Threshold</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inventoryItems
                          .filter(item => item.status !== 'in-stock')
                          .map(item => (
                            <tr key={item.id}>
                              <td>{item.id}</td>
                              <td className="item-name">{item.name}</td>
                              <td>{item.category}</td>
                              <td className={`stock-amount ${item.status}`}>{item.stock}</td>
                              <td>{item.threshold}</td>
                              <td>
                                <span className={`status-badge ${item.status}`}>
                                  {item.status.replace('-', ' ')}
                                </span>
                              </td>
                              <td>
                                <button className="btn small primary">Reorder</button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Inventory Items Tab */}
          {activeTab === 'items' && (
            <div className="tab-content">
              <div className="content-section">
                <div className="section-header">
                  <h2>Inventory Items</h2>
                  <div className="section-actions">
                    <button className="btn primary">
                      <FiPlus />
                      <span>Add Item</span>
                    </button>
                    <button className="btn tertiary">
                      <FiDownload />
                    </button>
                  </div>
                </div>
                <div className="card">
                  <div className="table-responsive">
                    <table className="inventory-table">
                      <thead>
                        <tr>
                          <th>Item ID</th>
                          <th>Item Name</th>
                          <th>Category</th>
                          <th>Current Stock</th>
                          <th>Threshold</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredItems.map(item => (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td className="item-name">{item.name}</td>
                            <td>{item.category}</td>
                            <td className={`stock-amount ${item.status}`}>{item.stock}</td>
                            <td>{item.threshold}</td>
                            <td>
                              <span className={`status-badge ${item.status}`}>
                                {item.status.replace('-', ' ')}
                              </span>
                            </td>
                            <td className="actions">
                              <button className="btn-icon" title="View">
                                <FiPackage />
                              </button>
                              <button className="btn-icon" title="Edit">
                                <FiTrendingUp />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Incoming Shipments Tab */}
          {activeTab === 'shipments' && (
            <div className="tab-content">
              <div className="content-section">
                <div className="section-header">
                  <h2>Incoming Shipments</h2>
                  <div className="section-actions">
                    <button className="btn primary">
                      <FiPlus />
                      <span>New Shipment</span>
                    </button>
                    <button className="btn tertiary">
                      <FiRefreshCw />
                    </button>
                  </div>
                </div>
                <div className="card">
                  <div className="table-responsive">
                    <table className="inventory-table">
                      <thead>
                        <tr>
                          <th>Shipment ID</th>
                          <th>Supplier</th>
                          <th>Items</th>
                          <th>ETA</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {incomingShipments.map(shipment => (
                          <tr key={shipment.id}>
                            <td>{shipment.id}</td>
                            <td>{shipment.supplier}</td>
                            <td>{shipment.items}</td>
                            <td>{formatDate(shipment.eta)}</td>
                            <td>
                              <span className={`status-badge ${shipment.status}`}>
                                {shipment.status.replace('-', ' ')}
                              </span>
                            </td>
                            <td>
                              <button className="btn small">Track</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="tab-content">
              <div className="content-section">
                <div className="section-header">
                  <h2>Inventory Reports</h2>
                  <div className="section-actions">
                    <button className="btn tertiary">
                      <FiRefreshCw />
                    </button>
                  </div>
                </div>
                <div className="reports-grid">
                  <ReportCard 
                    title="Stock Level Report" 
                    description="Detailed analysis of current stock levels across all categories"
                    icon={<FiPackage />}
                  />
                  <ReportCard 
                    title="Reorder Recommendations" 
                    description="Suggested purchase orders based on current stock and usage"
                    icon={<FiAlertTriangle />}
                  />
                  <ReportCard 
                    title="Inventory Valuation" 
                    description="Current value of inventory with breakdown by category"
                    icon={<FiDollarSign />}
                  />
                  <ReportCard 
                    title="Stock Movement Analysis" 
                    description="Trends and patterns in inventory movement"
                    icon={<FiTrendingUp />}
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default InventoryDashboard;
