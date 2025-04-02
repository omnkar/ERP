import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const login = (email, password) => {
    // In a real app, you would verify credentials with your backend
    const role = determineRole(email)
    setUser({ email, role })
    
    switch(role) {
      case 'admin':
        navigate('/admin-dashboard')
        break
      case 'finance':
        navigate('/finance-dashboard')
        break
      case 'production':
        navigate('/production-dashboard')
        break
      case 'sales':
        navigate('/sales-dashboard')
        break
      case 'inventory':
        navigate('/inventory-dashboard')
        break
      case 'hr':
        navigate('/hr-dashboard')
        break
      default:
        navigate('/login')
    }
  }

  const register = (userData) => {
    // Registration logic would go here
    navigate('/login')
  }

  const determineRole = (email) => {
    if (email.includes('admin')) return 'admin'
    if (email.includes('finance')) return 'finance'
    if (email.includes('production')) return 'production'
    if (email.includes('sales')) return 'sales'
    if (email.includes('inventory')) return 'inventory'
    if (email.includes('hr')) return 'hr'
    return 'user'
  }

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  )
}
