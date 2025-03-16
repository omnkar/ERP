import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Select, message, Card } from "antd";
import axios from "axios";

const { Option } = Select;

const SignUp = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Sales Representative",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (value) => {
    setUserData({ ...userData, role: value });
  };

  const handleSignUp = async () => {
    try {
      console.log(import.meta.env.VITE_URI);
      const response = await axios.post(`${import.meta.env.VITE_URI}/register`, userData);
      message.success(response.data.message);
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      message.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Card title="Sign Up" style={{ width: 350, margin: "100px auto" }}>
      <Input name="name" placeholder="Full Name" onChange={handleChange} style={{ marginBottom: 10 }} />
      <Input name="email" type="email" placeholder="Email" onChange={handleChange} style={{ marginBottom: 10 }} />
      <Input.Password name="password" placeholder="Password" onChange={handleChange} style={{ marginBottom: 10 }} />
      <Select defaultValue="Sales Representative" onChange={handleRoleChange} style={{ width: "100%", marginBottom: 10 }}>
        <Option value="Super Admin">Super Admin</Option>
        <Option value="Sales Manager">Sales Manager</Option>
        <Option value="Sales Representative">Sales Representative</Option>
        <Option value="Worker">Worker</Option>
      </Select>
      <Button type="primary" onClick={handleSignUp} block>Sign Up</Button>
    </Card>
  );
};

export default SignUp;
