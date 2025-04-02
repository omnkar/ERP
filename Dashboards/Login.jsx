// import React, { useState } from 'react';
// import './Login.css';

// const Login = ({ onLogin, onSwitchToRegister }) => {
//   const [credentials, setCredentials] = useState({
//     email: '',
//     password: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onLogin(credentials);
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <div className="login-header">
//           <h2>ConveyorERP Login</h2>
//           <p>Welcome back! Please enter your details.</p>
//         </div>
        
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={credentials.email}
//               onChange={handleChange}
//               placeholder="Enter your email"
//               required
//             />
//           </div>
          
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={credentials.password}
//               onChange={handleChange}
//               placeholder="Enter your password"
//               required
//             />
//           </div>
          
//           <div className="form-options">
//             <div className="remember-me">
//               <input type="checkbox" id="remember" />
//               <label htmlFor="remember">Remember me</label>
//             </div>
//             <a href="#forgot" className="forgot-password">Forgot password?</a>
//           </div>
          
//           <button type="submit" className="login-button">Sign In</button>
//         </form>
        
//         <div className="switch-auth">
//           <p>Don't have an account? <button onClick={onSwitchToRegister} className="switch-button">Sign up</button></p>
//         </div>
//       </div>
      
//       <div className="login-footer">
//         <p>© 2023 Conveyor Manufacturing ERP. All rights reserved.</p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const success = await onLogin(credentials);
    if (!success) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h2>ConveyorERP Login</h2>
          <p>Welcome back! Please enter your details.</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          {/* ... rest of your form ... */}
        </form>
        
        <div className="switch-auth">
          <p>Don't have an account? 
            <button 
              onClick={() => navigate('/register')} 
              className="switch-button"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;