import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import Admin from './Admin/Admin'
import SalesDashboard from './components/SalesDashboard'
import { Navigate } from 'react-router-dom'
function App() {
  const [user, setUser] = useState(null);
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin/dashboard" element={<Admin/>}/>
      <Route path="/sales" element={SalesDashboard}/>
      <Route path="/login" element={<Login setUser={setUser} />} />
        <Route 
          path="/sales" 
          element={user ? <SalesDashboard user={user} setUser={setUser} /> : <Navigate to="/login" />} 
        />
       
    </Routes>
  )
}

export default App
