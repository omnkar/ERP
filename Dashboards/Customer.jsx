import React from "react";
import "./Customer.css";
import {
  // FaConveyorBelt,
  FaBoxes,
  FaTools,
  FaTruck,
  FaChartLine,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdDashboard, MdPayment, MdSupport } from "react-icons/md";

const CustomerDashboard = () => {
  return (
    <div className="customer-dashboard">
      {/* Sidebar */}
      <div className="cd-sidebar">
        <div className="cd-sidebar-header">
          {/* <FaConveyorBelt className="cd-company-logo" /> */}
          <h3>ConveyorPro</h3>
        </div>

        <div className="cd-sidebar-menu">
          <ul>
            <li>
              <a href="#dashboard" className="active">
                <MdDashboard className="cd-icon" />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#orders">
                <FaBoxes className="cd-icon" />
                <span>My Orders</span>
              </a>
            </li>
            <li>
              <a href="#maintenance">
                <FaTools className="cd-icon" />
                <span>Maintenance</span>
              </a>
            </li>
            <li>
              <a href="#shipments">
                <FaTruck className="cd-icon" />
                <span>Shipments</span>
              </a>
            </li>
            <li>
              <a href="#reports">
                <FaChartLine className="cd-icon" />
                <span>Reports</span>
              </a>
            </li>
            <li>
              <a href="#payments">
                <MdPayment className="cd-icon" />
                <span>Payments</span>
              </a>
            </li>
          </ul>

          <div className="cd-sidebar-divider"></div>

          <ul>
            <li>
              <a href="#settings">
                <FaCog className="cd-icon" />
                <span>Settings</span>
              </a>
            </li>
            <li>
              <a href="#support">
                <MdSupport className="cd-icon" />
                <span>Support</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="cd-main-content">
        {/* Header */}
        <div className="cd-header">
          <div className="cd-header-left">
            <h1>Customer Dashboard</h1>
            <p>Welcome back to ConveyorPro Portal</p>
          </div>
          <div className="cd-header-right">
            <div className="cd-user-profile">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="User"
              />
              <div className="cd-user-info">
                <h4>John Smith</h4>
                <p>Premium Customer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="cd-cards">
          <div className="cd-card">
            <div className="cd-card-header">
              <h3 className="cd-card-title">Active Orders</h3>
              <div className="cd-card-icon cd-blue">
                <FaBoxes />
              </div>
            </div>
            <h2 className="cd-card-value">4</h2>
            <p className="cd-card-footer">2 in production</p>
          </div>

          <div className="cd-card">
            <div className="cd-card-header">
              <h3 className="cd-card-title">Maintenance Requests</h3>
              <div className="cd-card-icon cd-orange">
                <FaTools />
              </div>
            </div>
            <h2 className="cd-card-value">2</h2>
            <p className="cd-card-footer">1 pending</p>
          </div>

          <div className="cd-card">
            <div className="cd-card-header">
              <h3 className="cd-card-title">Shipments</h3>
              <div className="cd-card-icon cd-green">
                <FaTruck />
              </div>
            </div>
            <h2 className="cd-card-value">3</h2>
            <p className="cd-card-footer">1 in transit</p>
          </div>

          <div className="cd-card">
            <div className="cd-card-header">
              <h3 className="cd-card-title">Total Spent</h3>
              <div className="cd-card-icon cd-purple">
                <MdPayment />
              </div>
            </div>
            <h2 className="cd-card-value">$24,580</h2>
            <p className="cd-card-footer">This year</p>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="cd-recent-orders">
          <div className="cd-section-header">
            <h2>Recent Orders</h2>
            <a href="#view-all">View All</a>
          </div>

          <div className="cd-orders-table">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Conveyor Type</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#CV-78945</td>
                  <td>Belt Conveyor</td>
                  <td>
                    <span className="cd-status cd-in-production">
                      In Production
                    </span>
                  </td>
                  <td>May 15, 2023</td>
                  <td>
                    <button className="cd-btn-view">Track</button>
                  </td>
                </tr>
                <tr>
                  <td>#CV-78231</td>
                  <td>Roller Conveyor</td>
                  <td>
                    <span className="cd-status cd-shipped">Shipped</span>
                  </td>
                  <td>May 10, 2023</td>
                  <td>
                    <button className="cd-btn-view">Details</button>
                  </td>
                </tr>
                <tr>
                  <td>#CV-77982</td>
                  <td>Overhead Conveyor</td>
                  <td>
                    <span className="cd-status cd-delivered">Delivered</span>
                  </td>
                  <td>Apr 28, 2023</td>
                  <td>
                    <button className="cd-btn-view">Details</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
