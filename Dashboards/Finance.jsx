import React, { useState } from 'react';
import { 
  FiDollarSign, FiTrendingUp, FiTrendingDown, FiPieChart, 
  FiCreditCard, FiCalendar, FiRefreshCw, FiDownload,
  FiFilter, FiSearch, FiPlus, FiPrinter, FiBarChart2
} from 'react-icons/fi';
import './Finance.css';

const FinanceDashboard = () => {
  // Financial data state
  const [financialMetrics] = useState({
    revenue: '$1,248,750',
    expenses: '$842,900',
    profit: '$405,850',
    profitMargin: '32.5%',
    accountsReceivable: '$328,420',
    accountsPayable: '$215,670'
  });

  const [transactions] = useState([
    { id: 'TRX-1001', date: '2023-06-15', description: 'Conveyor System Sale', amount: '$42,500', type: 'revenue', status: 'completed' },
    { id: 'TRX-1002', date: '2023-06-14', description: 'Steel Frame Purchase', amount: '$28,750', type: 'expense', status: 'completed' },
    { id: 'TRX-1003', date: '2023-06-13', description: 'Maintenance Parts', amount: '$6,520', type: 'expense', status: 'pending' },
    { id: 'TRX-1004', date: '2023-06-12', description: 'Belt Component Sale', amount: '$37,800', type: 'revenue', status: 'completed' },
    { id: 'TRX-1005', date: '2023-06-11', description: 'Electrical Components', amount: '$12,450', type: 'expense', status: 'completed' },
  ]);

  const [invoices] = useState([
    { id: 'INV-2301', client: 'ABC Manufacturing', amount: '$42,500', dueDate: '2023-06-30', status: 'unpaid' },
    { id: 'INV-2302', client: 'XYZ Industries', amount: '$28,750', dueDate: '2023-07-05', status: 'unpaid' },
    { id: 'INV-2303', client: 'Global Conveyors', amount: '$65,200', dueDate: '2023-06-25', status: 'paid' },
    { id: 'INV-2304', client: 'Bulk Material Co', amount: '$37,800', dueDate: '2023-07-10', status: 'unpaid' },
  ]);

  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [timePeriod, setTimePeriod] = useState('month');

  // Filter transactions
  const filteredTransactions = transactions.filter(transaction => 
    transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
    transaction.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="finance-dashboard">
      {/* Main Header */}
      <header className="dashboard-header">
        <div className="header-title">
          <FiDollarSign className="header-icon" />
          <h1>Finance Dashboard</h1>
          <span className="last-updated">Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
        
        <div className="header-controls">
          <div className="time-period-selector">
            <select 
              value={timePeriod} 
              onChange={(e) => setTimePeriod(e.target.value)}
              className="period-select"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
          
          <div className="search-container">
            <FiSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search transactions..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="action-buttons">
            <button className="btn primary">
              <FiPlus />
              <span>New Transaction</span>
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="dashboard-container">
        {/* Navigation Sidebar */}
        <nav className="sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-title">Finance Views</h3>
            <ul className="nav-menu">
              <li 
                className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <span className="nav-icon"><FiPieChart /></span>
                <span className="nav-text">Overview</span>
              </li>
              <li 
                className={`nav-item ${activeTab === 'transactions' ? 'active' : ''}`}
                onClick={() => setActiveTab('transactions')}
              >
                <span className="nav-icon"><FiCreditCard /></span>
                <span className="nav-text">Transactions</span>
              </li>
              <li 
                className={`nav-item ${activeTab === 'invoices' ? 'active' : ''}`}
                onClick={() => setActiveTab('invoices')}
              >
                <span className="nav-icon"><FiDollarSign /></span>
                <span className="nav-text">Invoices</span>
              </li>
              <li 
                className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}
                onClick={() => setActiveTab('reports')}
              >
                <span className="nav-icon"><FiBarChart2 /></span>
                <span className="nav-text">Reports</span>
              </li>
            </ul>
          </div>
          
          <div className="sidebar-section">
            <h3 className="sidebar-title">Quick Actions</h3>
            <div className="quick-actions">
              <button className="btn secondary">
                <FiDownload />
                <span>Export Data</span>
              </button>
              <button className="btn secondary">
                <FiPrinter />
                <span>Print Reports</span>
              </button>
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
                    title="Revenue" 
                    value={financialMetrics.revenue} 
                    icon={<FiTrendingUp />}
                    trend="up"
                    change="+12.5% from last month"
                  />
                  <MetricCard 
                    title="Expenses" 
                    value={financialMetrics.expenses} 
                    icon={<FiTrendingDown />}
                    trend="down"
                    change="-3.2% from last month"
                  />
                  <MetricCard 
                    title="Net Profit" 
                    value={financialMetrics.profit} 
                    icon={<FiDollarSign />}
                    trend="up"
                    change="+18.7% from last month"
                    variant="success"
                  />
                  <MetricCard 
                    title="Profit Margin" 
                    value={financialMetrics.profitMargin} 
                    icon={<FiPieChart />}
                    trend="up"
                    change="+2.4% from last month"
                  />
                  <MetricCard 
                    title="Accounts Receivable" 
                    value={financialMetrics.accountsReceivable} 
                    icon={<FiTrendingUp />}
                    trend="up"
                    change="+8.3% from last month"
                    variant="warning"
                  />
                  <MetricCard 
                    title="Accounts Payable" 
                    value={financialMetrics.accountsPayable} 
                    icon={<FiTrendingDown />}
                    trend="down"
                    change="-5.1% from last month"
                    variant="danger"
                  />
                </div>
              </div>

              <div className="content-section">
                <div className="section-header">
                  <h2>Recent Transactions</h2>
                  <div className="section-actions">
                    <button className="btn secondary">
                      <FiRefreshCw />
                      <span>Refresh</span>
                    </button>
                    <button className="btn tertiary">
                      <FiDownload />
                    </button>
                  </div>
                </div>
                <div className="card">
                  <div className="table-responsive">
                    <table className="finance-table">
                      <thead>
                        <tr>
                          <th>Transaction ID</th>
                          <th>Date</th>
                          <th>Description</th>
                          <th>Amount</th>
                          <th>Type</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map(transaction => (
                          <tr key={transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{formatDate(transaction.date)}</td>
                            <td>{transaction.description}</td>
                            <td className={`amount ${transaction.type}`}>
                              {transaction.type === 'expense' ? '-' : ''}{transaction.amount}
                            </td>
                            <td>
                              <span className={`type-badge ${transaction.type}`}>
                                {transaction.type}
                              </span>
                            </td>
                            <td>
                              <span className={`status-badge ${transaction.status}`}>
                                {transaction.status}
                              </span>
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

          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <div className="tab-content">
              <div className="content-section">
                <div className="section-header">
                  <h2>All Transactions</h2>
                  <div className="section-actions">
                    <div className="filter-group">
                      <FiFilter className="filter-icon" />
                      <select className="filter-select">
                        <option>All Types</option>
                        <option>Revenue</option>
                        <option>Expense</option>
                      </select>
                    </div>
                    <button className="btn primary">
                      <FiPlus />
                      <span>Add Transaction</span>
                    </button>
                  </div>
                </div>
                <div className="card">
                  <div className="table-responsive">
                    <table className="finance-table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Date</th>
                          <th>Description</th>
                          <th>Amount</th>
                          <th>Type</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTransactions.map(transaction => (
                          <tr key={transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{formatDate(transaction.date)}</td>
                            <td>{transaction.description}</td>
                            <td className={`amount ${transaction.type}`}>
                              {transaction.type === 'expense' ? '-' : ''}{transaction.amount}
                            </td>
                            <td>
                              <span className={`type-badge ${transaction.type}`}>
                                {transaction.type}
                              </span>
                            </td>
                            <td>
                              <span className={`status-badge ${transaction.status}`}>
                                {transaction.status}
                              </span>
                            </td>
                            <td>
                              <button className="btn-icon" title="View">
                                <FiDollarSign />
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

          {/* Invoices Tab */}
          {activeTab === 'invoices' && (
            <div className="tab-content">
              <div className="content-section">
                <div className="section-header">
                  <h2>Invoices</h2>
                  <div className="section-actions">
                    <button className="btn primary">
                      <FiPlus />
                      <span>Create Invoice</span>
                    </button>
                    <button className="btn secondary">
                      <FiDownload />
                    </button>
                  </div>
                </div>
                <div className="card">
                  <div className="table-responsive">
                    <table className="finance-table">
                      <thead>
                        <tr>
                          <th>Invoice ID</th>
                          <th>Client</th>
                          <th>Amount</th>
                          <th>Due Date</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoices.map(invoice => (
                          <tr key={invoice.id}>
                            <td>{invoice.id}</td>
                            <td>{invoice.client}</td>
                            <td className="amount">{invoice.amount}</td>
                            <td>{formatDate(invoice.dueDate)}</td>
                            <td>
                              <span className={`status-badge ${invoice.status}`}>
                                {invoice.status}
                              </span>
                            </td>
                            <td>
                              <button className="btn small">View</button>
                              {invoice.status === 'unpaid' && (
                                <button className="btn small primary">Send Reminder</button>
                              )}
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
                  <h2>Financial Reports</h2>
                  <div className="section-actions">
                    <button className="btn secondary">
                      <FiRefreshCw />
                    </button>
                  </div>
                </div>
                <div className="reports-grid">
                  <ReportCard 
                    title="Profit & Loss Statement" 
                    description="Summary of revenues, costs and expenses"
                    icon={<FiBarChart2 />}
                  />
                  <ReportCard 
                    title="Balance Sheet" 
                    description="Snapshot of company's financial position"
                    icon={<FiDollarSign />}
                  />
                  <ReportCard 
                    title="Cash Flow Statement" 
                    description="Tracking cash inflows and outflows"
                    icon={<FiTrendingUp />}
                  />
                  <ReportCard 
                    title="Accounts Receivable Aging" 
                    description="Summary of outstanding customer balances"
                    icon={<FiCreditCard />}
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

// Metric Card Component
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

// Report Card Component
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

export default FinanceDashboard;