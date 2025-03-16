import React, { useEffect, useState } from "react";
import { Table, Tabs, Card, Button, message } from "antd";
import { fetchData, deleteData } from "../services/api";
import { useNavigate } from "react-router-dom";

const { TabPane } = Tabs;

const SalesDashboard = ({ user, setUser }) => {
  const [salesOrders, setSalesOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setSalesOrders(await fetchData("/salesorders"));
    setInvoices(await fetchData("/invoices"));
    setPayments(await fetchData("/payments"));
  };

  const handleDelete = async (endpoint, id) => {
    await deleteData(endpoint, id);
    message.success("Deleted successfully!");
    loadData();
  };

  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/auth/logout", { method: "POST", credentials: "include" });
    setUser(null);
    message.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <Card title={`Sales Department - ${user.role}`}>
      <Button type="primary" danger onClick={handleLogout} style={{ marginBottom: 10 }}>Logout</Button>
      <Tabs defaultActiveKey="salesOrders">
        
        {/* Sales Orders Tab */}
        <TabPane tab="Sales Orders" key="salesOrders">
          {["Super Admin", "Sales Manager"].includes(user.role) && (
            <Button type="primary" style={{ marginBottom: 10 }}>Add Sales Order</Button>
          )}
          <Table
            dataSource={salesOrders}
            columns={[
              { title: "Order No", dataIndex: "orderNumber", key: "orderNumber" },
              { title: "Total Amount", dataIndex: "totalAmount", key: "totalAmount" },
              { title: "Status", dataIndex: "status", key: "status" },
              {
                title: "Actions",
                render: (record) => (
                  <>
                    {["Super Admin", "Sales Manager"].includes(user.role) && (
                      <Button>Edit</Button>
                    )}
                    {user.role === "Super Admin" && (
                      <Button danger onClick={() => handleDelete("/salesorders", record._id)}>Delete</Button>
                    )}
                  </>
                ),
              },
            ]}
            rowKey="_id"
          />
        </TabPane>

        {/* Invoices Tab */}
        <TabPane tab="Invoices" key="invoices">
          {["Super Admin", "Sales Manager"].includes(user.role) && (
            <Button type="primary" style={{ marginBottom: 10 }}>Add Invoice</Button>
          )}
          <Table
            dataSource={invoices}
            columns={[
              { title: "Invoice No", dataIndex: "invoiceNumber", key: "invoiceNumber" },
              { title: "Total Amount", dataIndex: "totalAmount", key: "totalAmount" },
              { title: "Payment Status", dataIndex: "paymentStatus", key: "paymentStatus" },
              {
                title: "Actions",
                render: (record) => (
                  <>
                    {["Super Admin", "Sales Manager"].includes(user.role) && (
                      <Button>Edit</Button>
                    )}
                    {user.role === "Super Admin" && (
                      <Button danger onClick={() => handleDelete("/invoices", record._id)}>Delete</Button>
                    )}
                  </>
                ),
              },
            ]}
            rowKey="_id"
          />
        </TabPane>

        {/* Payments Tab */}
        <TabPane tab="Payments" key="payments">
          {["Super Admin", "Sales Manager"].includes(user.role) && (
            <Button type="primary" style={{ marginBottom: 10 }}>Add Payment</Button>
          )}
          <Table
            dataSource={payments}
            columns={[
              { title: "Payment Date", dataIndex: "paymentDate", key: "paymentDate" },
              { title: "Amount Paid", dataIndex: "amountPaid", key: "amountPaid" },
              { title: "Status", dataIndex: "status", key: "status" },
              {
                title: "Actions",
                render: (record) => (
                  <>
                    {["Super Admin", "Sales Manager"].includes(user.role) && (
                      <Button>Edit</Button>
                    )}
                    {user.role === "Super Admin" && (
                      <Button danger onClick={() => handleDelete("/payments", record._id)}>Delete</Button>
                    )}
                  </>
                ),
              },
            ]}
            rowKey="_id"
          />
        </TabPane>

      </Tabs>
    </Card>
  );
};

export default SalesDashboard;
