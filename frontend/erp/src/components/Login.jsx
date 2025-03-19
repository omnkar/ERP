import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, message, Card } from "antd";
import axios from "axios";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userData = { email, password };
      const response = await axios.post(`${import.meta.env.VITE_URI}/auth/login`, userData, {
        withCredentials: true,
      });
      console.log("Cookies After Login:", document.cookie); // ✅ Log cookies in frontend
      console.log("Login Response:", response.data);
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
        message.success("Login successful!");
        navigate("/sales");
      } else {
        message.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      message.error("Something went wrong");
    }
  };

  return (
    <Card title="Login" style={{ width: 300, margin: "100px auto" }}>
      <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} style={{ marginBottom: 10 }} />
      <Input.Password placeholder="Password" onChange={(e) => setPassword(e.target.value)} style={{ marginBottom: 10 }} />
      <Button type="primary" onClick={handleLogin} block>Login</Button>
    </Card>
  );
};

export default Login;
