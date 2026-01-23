import React from 'react';
import './login.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import Navbar from './Navbar';

export default function LoginPage({ handleAlert }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://www.everesthealth.somee.com/api/Auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save token + user info
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        navigate('/home');
        return;
      } else {
        handleAlert(data.message || "Login failed", "danger");
      }
    } catch (error) {
      handleAlert("An error occurred during login", "warning");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className='login-container'>
        <div className='login-form'>
          <div className="login-title">
            <h3>Login</h3>
          </div>
          <div>
            <form className='login-form-container' onSubmit={handleSubmit}>
              <div className="login-items">
                <label htmlFor="username">Email</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Enter Your Email" 
                  required 
                  disabled={isLoading}
                />
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
                    disabled={isLoading}
                  />
                  <span 
                    className="toggle-icon"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              <div className="login-items mt-2">
                <button className="login-btn" disabled={isLoading}>
                  {isLoading ? (
                    <span className="spinner-container">
                      <span className="spinner"></span>
                      <span style={{ marginLeft: '8px' }}>Logging in...</span>
                    </span>
                  ) : (
                    'Login'
                  )}
                </button>
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
            Main page
          </Link>
        </div>
      </div>
    </>
  );
}