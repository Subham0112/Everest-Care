import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
//IMPORTing back arrow from react-icons;
import { FaArrowLeft } from 'react-icons/fa';


export default function LogInPage() {
  return (
  <>
  <div className='login-container'>
    <div className='login-form'>
      <div className="login-title">
      <h3>Login</h3>
      </div>
      <div >
        <form className='login-form-container'>
          <div className="login-items ">
            <label htmlFor="username">Email</label>
            <input type="email" placeholder="Enter Your Email" required />
          </div>
          <div className="login-items d-flex flex-column">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Enter Your Password" required />
          </div>
          <div className="login-items mt-2">
            <button className="login-btn">Login</button>
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
