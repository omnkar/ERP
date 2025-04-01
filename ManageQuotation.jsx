// ManageQuotation.jsx (updated)
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ManageQuotation.css";
import { FiEdit2, FiTrash2, FiPlus, FiSearch } from "react-icons/fi";

const ManageQuotations = ({ quotations, setQuotations }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredQuotations = quotations.filter((quote) => {
    const matchesSearch =
      quote.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || quote.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleGenerateNew = () => {
    navigate("/generate-quotation");
  };

  const handleDelete = (id) => {
    setQuotations(quotations.filter((q) => q.id !== id));
  };

  const handleEdit = (id) => {
    navigate(`/generate-quotation/${id}`);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      draft: "badge-draft",
      sent: "badge-sent",
      accepted: "badge-accepted",
      expired: "badge-expired",
      rejected: "badge-rejected",
    };
    return (
      <span className={`status-badge ${statusClasses[status]}`}>{status}</span>
    );
  };

  return (
    <div className="manage-quotations-container">
      <div className="page-header">
        <h1>Manage Quotations</h1>
        <button className="add-btn" onClick={handleGenerateNew}>
          <FiPlus /> New Quotation
        </button>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search quotations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="accepted">Accepted</option>
            <option value="expired">Expired</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="quotations-table-container">
        <table className="quotations-table">
          <thead>
            <tr>
              <th>Quotation ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Expiry</th>
              <th>Amount (₹)</th>
              <th>Status</th>
              <th>Salesperson</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuotations.map((quotation) => (
              <tr key={quotation.id}>
                <td>{quotation.id}</td>
                <td>{quotation.customer}</td>
                <td>{quotation.date}</td>
                <td>{quotation.expiryDate}</td>
                <td>{quotation.amount.toLocaleString("en-IN")}</td>
                <td>{getStatusBadge(quotation.status)}</td>
                <td>{quotation.salesperson}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(quotation.id)}
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(quotation.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageQuotations;
