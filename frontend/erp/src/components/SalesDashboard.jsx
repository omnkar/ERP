import React, { useEffect, useState } from "react";
import { Table, Tabs, Card, Button, message } from "antd";
import { fetchData, deleteData } from "../services/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SalesDashboard = () => {
  const [user, setUser] = useState(null);
  const [salesOrders, setSalesOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
    loadData();
  }, []);

  const loadData = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      const salesData = await axios
        .get(`${import.meta.env.VITE_URI}/salesorders/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            setSalesOrders(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      const invoiceData = await axios.get(
        `${import.meta.env.VITE_URI}/invoices/get`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setInvoices(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      const paymentData = await axios.get(
        `${import.meta.env.VITE_URI}/payments/get`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((response) => {
        if (response.status === 200) {
            console.log(response.data);
            setPayments(response.data);
        }}).catch((error) => {
          console.log(error);
        });
    } catch (error) {
      if (error.response && error.response.status === 403) {
        message.error("You do not have permission to access this data.");
        navigate("/login");
      } else {
        message.error("Error fetching data");
      }
    }
  };

  const handleLogout = async () => {
    await fetch(`${import.meta.env.VITE_URI}/logout`, {
      method: "POST",
      credentials: "include",
    });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    message.success("Logged out successfully!");
    navigate("/login");
  };

  const handleDelete = async (endpoint, id) => {
    try {
      await deleteData(`${endpoint}/${id}`);
      message.success("Deleted successfully");
      loadData();
    } catch (error) {
      message.error("Error deleting data");
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const tabItems = [
    {
      key: "salesOrders",
      label: "Sales Orders",
      children: (
        <>
          {["Super Admin", "Sales Manager"].includes(user.role) && (
            <Button type="primary" style={{ marginBottom: 10 }}>
              Add Sales Order
            </Button>
          )}
          <Table
            dataSource={salesOrders}
            columns={[
              {
                title: "Order No",
                dataIndex: "orderNumber",
                key: "orderNumber",
              },
              {
                title: "Total Amount",
                dataIndex: "totalAmount",
                key: "totalAmount",
              },
              { title: "Status", dataIndex: "status", key: "status" },
              {
                title: "Actions",
                render: (record) => (
                  <>
                    {["Super Admin", "Sales Manager"].includes(user.role) && (
                      <Button>Edit</Button>
                    )}
                    {user.role === "Super Admin" && (
                      <Button
                        danger
                        onClick={() => handleDelete("/salesorders", record._id)}
                      >
                        Delete
                      </Button>
                    )}
                  </>
                ),
              },
            ]}
            rowKey="_id"
          />
        </>
      ),
    },
    {
      key: "invoices",
      label: "Invoices",
      children: (
        <>
          {["Super Admin", "Sales Manager"].includes(user.role) && (
            <Button type="primary" style={{ marginBottom: 10 }}>
              Add Invoice
            </Button>
          )}
          <Table
            dataSource={invoices}
            columns={[
              {
                title: "Invoice No",
                dataIndex: "invoiceNumber",
                key: "invoiceNumber",
              },
              {
                title: "Total Amount",
                dataIndex: "totalAmount",
                key: "totalAmount",
              },
              {
                title: "Payment Status",
                dataIndex: "paymentStatus",
                key: "paymentStatus",
              },
              {
                title: "Actions",
                render: (record) => (
                  <>
                    {["Super Admin", "Sales Manager"].includes(user.role) && (
                      <Button>Edit</Button>
                    )}
                    {user.role === "Super Admin" && (
                      <Button
                        danger
                        onClick={() => handleDelete("/invoices", record._id)}
                      >
                        Delete
                      </Button>
                    )}
                  </>
                ),
              },
            ]}
            rowKey="_id"
          />
        </>
      ),
    },
    {
      key: "payments",
      label: "Payments",
      children: (
        <>
          {["Super Admin", "Sales Manager"].includes(user.role) && (
            <Button type="primary" style={{ marginBottom: 10 }}>
              Add Payment
            </Button>
          )}
          <Table
            dataSource={payments}
            columns={[
              {
                title: "Payment Date",
                dataIndex: "paymentDate",
                key: "paymentDate",
              },
              {
                title: "Amount Paid",
                dataIndex: "amountPaid",
                key: "amountPaid",
              },
              { title: "Status", dataIndex: "status", key: "status" },
              {
                title: "Actions",
                render: (record) => (
                  <>
                    {["Super Admin", "Sales Manager"].includes(user.role) && (
                      <Button>Edit</Button>
                    )}
                    {user.role === "Super Admin" && (
                      <Button
                        danger
                        onClick={() => handleDelete("/payments", record._id)}
                      >
                        Delete
                      </Button>
                    )}
                  </>
                ),
              },
            ]}
            rowKey="_id"
          />
        </>
      ),
    },
  ];

  return (
    <Card title={`Sales Department - ${user.role}`}>
      <Button
        type="primary"
        danger
        onClick={handleLogout}
        style={{ marginBottom: 10 }}
      >
        Logout
      </Button>
      <Tabs defaultActiveKey="salesOrders" items={tabItems} />
    </Card>
  );
};

export default SalesDashboard;
