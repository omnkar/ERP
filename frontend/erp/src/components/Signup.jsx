import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [roleType, setRoleType] = useState('')
  const [phone, setPhone] = useState('')
  const [department, setDepartment] = useState('')
  const [designation, setDesignation] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${import.meta.env.VITE_URI}/register`, { 
        name, email, password, roleType, phone, department, designation, street, city, state, postalCode, country 
      })
      navigate('/login')
    } catch (error) {
      toastify({
        text: error.response.data.message || 'Signup failed',
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#ff0000",
      }).showToast();
      console.error('Signup failed:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div>
        <label>Role Type:</label>
        <select value={roleType} onChange={(e) => setRoleType(e.target.value)} required>
          <option value="">Select Role Type</option>
          <option value="Super Admin">Super Admin</option>
          <option value="Company Executive">Company Executive</option>
          <option value="IT Admin">IT Admin</option>
          <option value="Department Manager">Department Manager</option>
          <option value="Supervisor">Supervisor</option>
          <option value="Worker">Worker</option>
        </select>
      </div>
      <div>
        <label>Phone:</label>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </div>
      <div>
        <label>Department:</label>
        <select value={department} onChange={(e) => setDepartment(e.target.value)} required>
          <option value="">Select Department</option>
          <option value="HR">HR</option>
          <option value="Sales">Sales</option>
          <option value="Production">Production</option>
          <option value="IT">IT</option>
          <option value="Finance">Finance</option>
          <option value="Logistics">Logistics</option>
        </select>
      </div>
      <div>
        <label>Designation:</label>
        <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} required />
      </div>
      <div>
        <label>Street:</label>
        <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} required />
      </div>
      <div>
        <label>City:</label>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
      </div>
      <div>
        <label>State:</label>
        <input type="text" value={state} onChange={(e) => setState(e.target.value)} required />
      </div>
      <div>
        <label>Postal Code:</label>
        <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
      </div>
      <div>
        <label>Country:</label>
        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
      </div>
      <button type="submit">Signup</button>
    </form>
  )
}

export default Signup
