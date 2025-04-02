
// import Login from './components/Auth/Login';
// import Register from './components/Auth/Register';
// import AdminDashboard from './pages/Dashboard/Admin';
// import ProductionDashboard from './pages/Dashboard/Production';
// import FinanceDashboard from './pages/Dashboard/Finance';
// import HRDashboard from './pages/Dashboard/HR';
// import SalesDashboard from './pages/Dashboard/Sales';
// import InventoryDashboard from './pages/Dashboard/Inventory';

// import React from 'react'

// const App = () => {
//   return (
//     <div>
//       {/* <AdminDashboard /> */}
//       {/* <Login /> not working*/}
//       {/* <Register /> not working*/}
//       {/* <FinanceDashboard /> */}
//       {/* <ProductionDashboard /> */}
//       {/* <HRDashboard /> */}
//       {/* <SalesDashboard /> */}
//       {/* <Login /> */}
//       <Register />
//     </div>
//   )
// }

// export default App


import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdminDashboard from './pages/Dashboard/Admin';
import ProductionDashboard from './pages/Dashboard/Production';
import FinanceDashboard from './pages/Dashboard/Finance';
import HRDashboard from './pages/Dashboard/HR';
import SalesDashboard from './pages/Dashboard/Sales';
import InventoryDashboard from './pages/Dashboard/Inventory';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (credentials) => {
    // In a real app, you would authenticate with your backend here
    console.log('Login attempt with:', credentials);
    
    // Mock authentication - replace with actual API call
    const mockUsers = {
      'admin@conveyor.com': { role: 'admin', name: 'Admin User' },
      'hr@conveyor.com': { role: 'hr', name: 'HR Manager' },
      'production@conveyor.com': { role: 'production', name: 'Production Manager' }
    };
    
    const authenticatedUser = mockUsers[credentials.email];
    
    if (authenticatedUser && credentials.password === 'password123') { // Default password for demo
      setUser(authenticatedUser);
      return true;
    }
    return false;
  };

  const handleRegister = (userData) => {
    console.log('Registration attempt with:', userData);
    // In a real app, you would register with your backend here
    // For demo, we'll just log the data and redirect to login
    return true;
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          user ? <Navigate to={`/${user.role}-dashboard`} /> : <Navigate to="/login" />
        } />
        
        <Route path="/login" element={
          user ? <Navigate to={`/${user.role}-dashboard`} /> : 
          <Login 
            onLogin={handleLogin} 
            onSwitchToRegister={() => <Navigate to="/register" />}
          />
        } />
        
        <Route path="/register" element={
          <Register 
            onRegister={handleRegister} 
            onSwitchToLogin={() => <Navigate to="/login" />}
          />
        } />
        
        <Route path="/admin-dashboard" element={
          user?.role === 'admin' ? 
            <AdminDashboard user={user} onLogout={handleLogout} /> : 
            <Navigate to="/login" />
        } />
        
        <Route path="/hr-dashboard" element={
          user?.role === 'hr' ? 
            <HRDashboard user={user} onLogout={handleLogout} /> : 
            <Navigate to="/login" />
        } />
        
        <Route path="/production-dashboard" element={
          user?.role === 'production' ? 
            <ProductionDashboard user={user} onLogout={handleLogout} /> : 
            <Navigate to="/login" />
        } />
        
        {/* Add other dashboard routes as needed */}
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;