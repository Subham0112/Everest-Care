import React from 'react';
import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
//IMPORTing back arrow from react-icons;
import { FaArrowLeft, FaEye,FaEyeSlash } from 'react-icons/fa';



export default function LoginPage() {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [showPassword, setShowPassword] = useState(false);
     const navigate = useNavigate();



const handleCLick=()=>{
  navigate('/home')
}
const handleSubmit = async (e) => {
    e.preventDefault();
}
//     console.log(email, password);
//     const submitData = {
//       email: email,
//       password: password,
//     };
//     console.log(submitData);
//     try {
//       const response = await fetch('https://localhost:44345/api/Auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(submitData),
//       });
//       if (response.ok) {
//         console.log('Success: successfully login', response);
//         // token
//         localStorage.setItem('token', response.token);
//         // navigate to home page
//         navigate('/home');

//       } else {
//         console.error('Error: failed to login', response.status);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

  return (
  <>
  <div className='login-container'>
    <div className='login-form'>
      <div className="login-title">
      <h3>Login</h3>
      </div>
      <div >
        <form className='login-form-container' onSubmit={handleSubmit}>
          <div className="login-items ">
            <label htmlFor="username">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email" required />
          </div>
<div className="login-items">
  <label htmlFor="password">Password</label>
  <div className="password-wrapper">
    <input 
      type={showPassword ? "text" : "password"} 
      value={password} 
      onChange={(e) => setPassword(e.target.value)}  
      placeholder="Enter Your Password" 
      required 
    />
    <span 
      className="toggle-icon"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </span>
  </div>
</div>
          <div className="login-items mt-2">
            <button onClick={handleCLick} className="login-btn">Login</button>
          </div>
        </form>
      </div>
      <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="login-link">
            Create an Account
          </Link>
        
        </p>
          <Link to="/" className="login-link">
           <FaArrowLeft/> Main page
          </Link>
    </div>

  </div>
  </>
  )
}
