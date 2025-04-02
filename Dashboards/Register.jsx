// import React, { useState } from 'react';
// import './Register.css';

// const Register = ({ onRegister, onSwitchToLogin }) => {
//   const [userData, setUserData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     employeeId: '',
//     department: '',
//     role: ''
//   });

//   const departments = [
//     'Production',
//     'Engineering',
//     'Quality Control',
//     'Maintenance',
//     'Purchasing',
//     'Inventory',
//     'Sales',
//     'HR',
//     'Finance',
//     'Management'
//   ];

//   const roles = [
//     'Operator',
//     'Technician',
//     'Engineer',
//     'Supervisor',
//     'Manager',
//     'Director',
//     'Admin'
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (userData.password !== userData.confirmPassword) {
//       alert("Passwords don't match!");
//       return;
//     }
//     onRegister(userData);
//   };

//   return (
//     <div className="register-container">
//       <div className="register-box">
//         <div className="register-header">
//           <h2>Employee Registration</h2>
//           <p>Join ConveyorERP Manufacturing System</p>
//         </div>
        
//         <form onSubmit={handleSubmit}>
//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="name">Full Name</label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={userData.name}
//                 onChange={handleChange}
//                 placeholder="Enter your full name"
//                 required
//               />
//             </div>
            
//             <div className="form-group">
//               <label htmlFor="employeeId">Employee ID</label>
//               <input
//                 type="text"
//                 id="employeeId"
//                 name="employeeId"
//                 value={userData.employeeId}
//                 onChange={handleChange}
//                 placeholder="Enter employee ID"
//                 required
//               />
//             </div>
//           </div>
          
//           <div className="form-group">
//             <label htmlFor="email">Company Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={userData.email}
//               onChange={handleChange}
//               placeholder="Enter company email"
//               required
//             />
//           </div>
          
//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="department">Department</label>
//               <select
//                 id="department"
//                 name="department"
//                 value={userData.department}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select Department</option>
//                 {departments.map(dept => (
//                   <option key={dept} value={dept}>{dept}</option>
//                 ))}
//               </select>
//             </div>
            
//             <div className="form-group">
//               <label htmlFor="role">Role</label>
//               <select
//                 id="role"
//                 name="role"
//                 value={userData.role}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select Role</option>
//                 {roles.map(role => (
//                   <option key={role} value={role}>{role}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
          
//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 value={userData.password}
//                 onChange={handleChange}
//                 placeholder="Create a password"
//                 required
//               />
//               <p className="input-hint">Minimum 8 characters with at least one number</p>
//             </div>
            
//             <div className="form-group">
//               <label htmlFor="confirmPassword">Confirm Password</label>
//               <input
//                 type="password"
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 value={userData.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="Confirm password"
//                 required
//               />
//             </div>
//           </div>
          
//           <div className="form-footer">
//             <button type="submit" className="register-button">Register Employee</button>
//             <p className="terms-notice">
//               By registering, you agree to our <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>.
//             </p>
//           </div>
//         </form>
        
//         <div className="switch-auth">
//           <p>Already have an account? <button onClick={onSwitchToLogin} className="switch-button">Sign in</button></p>
//         </div>
//       </div>
      
//       <div className="register-footer">
//         <p>© {new Date().getFullYear()} Conveyor Manufacturing ERP. All rights reserved.</p>
//       </div>
//     </div>
//   );
// };

// export default Register;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = ({ onRegister }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    /* ... existing state ... */
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    
    const success = await onRegister(userData);
    if (success) {
      navigate('/login');
    } else {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      {/* ... rest of your component ... */}
      
      <div className="switch-auth">
        <p>Already have an account? 
          <button 
            onClick={() => navigate('/login')} 
            className="switch-button"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;