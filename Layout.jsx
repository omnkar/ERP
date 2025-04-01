// Layout.jsx
import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
