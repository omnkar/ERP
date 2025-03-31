import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import Admin from './Admin/Admin'
import SalesDashboard from './components/Sales/Quotation/SalesDashboard'


function App() {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin/dashboard" element={<Admin/>}/>
      <Route path="/sales" element={<SalesDashboard/>} />
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route 
        path="/sales" 
        element={ <SalesDashboard />} 
      />
    </Routes>
  )
}

export default App
