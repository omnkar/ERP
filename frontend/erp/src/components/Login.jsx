import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, message, Card } from "antd";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Ensure cookies are sent
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        message.success("Login successful!");
        navigate("/sales"); // Redirect to Sales Dashboard
      } else {
        message.error(data.message || "Login failed");
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
