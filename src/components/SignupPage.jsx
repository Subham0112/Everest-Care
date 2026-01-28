// Signup.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaChevronDown } from "react-icons/fa";
import Navbar from "./Navbar";

import Alert from "./Alert";


// import "./Signup.css";

// Country codes data
const countryCodes = [
  { name: "United States", code: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { name: "Australia", code: "+61", flag: "🇦🇺" },
  { name: "India", code: "+91", flag: "🇮🇳" },
  { name: "Nepal", code: "+977", flag: "🇳🇵" },
  { name: "China", code: "+86", flag: "🇨🇳" },
  { name: "Japan", code: "+81", flag: "🇯🇵" },
  { name: "Germany", code: "+49", flag: "🇩🇪" },
  { name: "France", code: "+33", flag: "🇫🇷" },
  { name: "Italy", code: "+39", flag: "🇮🇹" },
  { name: "Spain", code: "+34", flag: "🇪🇸" },
  { name: "Mexico", code: "+52", flag: "🇲🇽" },
  { name: "Brazil", code: "+55", flag: "🇧🇷" },
  { name: "South Korea", code: "+82", flag: "🇰🇷" },
  { name: "Singapore", code: "+65", flag: "🇸🇬" },
  { name: "Malaysia", code: "+60", flag: "🇲🇾" },
  { name: "Thailand", code: "+66", flag: "🇹🇭" },
  { name: "Pakistan", code: "+92", flag: "🇵🇰" },
  { name: "Bangladesh", code: "+880", flag: "🇧🇩" },
  { name: "UAE", code: "+971", flag: "🇦🇪" },
  { name: "Saudi Arabia", code: "+966", flag: "🇸🇦" },
  { name: "South Africa", code: "+27", flag: "🇿🇦" },
  { name: "Nigeria", code: "+234", flag: "🇳🇬" },
  { name: "Philippines", code: "+63", flag: "🇵🇭" },
  { name: "Indonesia", code: "+62", flag: "🇮🇩" },
  { name: "Vietnam", code: "+84", flag: "🇻🇳" },
  { name: "Russia", code: "+7", flag: "🇷🇺" },
  { name: "Turkey", code: "+90", flag: "🇹🇷" },
  { name: "Argentina", code: "+54", flag: "🇦🇷" },
];

export default function Signup({handleAlert}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const dropdownRef = useRef(null);
const [error, setError] = useState(false);  

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    ssn: "",
    gender: "",
    countryCode: "+1",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    status:1,
    role:0
  });

  // Get selected country object
  const selectedCountry = countryCodes.find(c => c.code === formData.countryCode) || countryCodes[5];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCountryDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCountrySelect = (code) => {
    setFormData({...formData, countryCode: code});
    setShowCountryDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     const fullPhoneNumber = `${formData.countryCode}${formData.phone}`;
    // console.log(formData);
    const submitData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      ssn: formData.ssn,
      gender: formData.gender,
      phone: fullPhoneNumber,
      email: formData.email,
      role: formData.role,
      status: formData.status,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    try {
      const response = await fetch('https://everesthealth.somee.com/api/Auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      // Check if the response is JSON before parsing
      const contentType = response.headers.get("content-type");
      let data;
      
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        // If not JSON, get it as text
        data = await response.text();
      }
if (response.ok) {
  handleAlert(
    data.message || "Registration successful. Please wait for admin approval.",
    "success"
  );
} else {
  handleAlert(
    data.message || "Registration failed. Please check your details.",
    "warning"
  );
}
    } catch (error) {
      console.error("Request failed:", error);
      handleAlert("An error occured during signup " + error.message, "warning");
    }
  };
  
  



  return (
    <>
    <Navbar />
    <div className="signup-container">
      <div className="signup-card shadow-lg">
        <h2 className="text-center mb-1">Create Account</h2>

        <form onSubmit={handleSubmit}>
          {/* First + Last Name */}
          <div className="row mb-1">
            <div className="col-md-6">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
          </div>

          {/* Gender and SSN */}
          <div className="row mb-1">
            <div className="col-md-6">
              <label className="form-label">Gender</label>
              <select
                className="form-select"
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="col-md-6">
              <label className="form-label">SSN</label>
              <input
                type="text"
                className="form-control"
                placeholder="SSN"
                value={formData.ssn}
                onChange={(e) => setFormData({...formData, ssn: e.target.value})}
              />
            </div>
          </div>

          {/* Phone with Country Code */}
          <div className="mb-1">
            <label className="form-label">Phone</label>
            <div className="phone-input-wrapper">
              <div className="custom-country-select" ref={dropdownRef}>
                <div 
                  className="country-select-trigger"
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                >
                  <span className="selected-country">
                    <span className="country-flag">{selectedCountry.flag}</span>
                    <span className="country-code">{selectedCountry.code}</span>
                  </span>
                  <FaChevronDown className="dropdown-arrow" />
                </div>
                
                {showCountryDropdown && (
                  <div className="country-dropdown">
                    {countryCodes.map((country, index) => (
                      <div
                        key={index}
                        className={`country-option ${country.code === formData.countryCode ? 'selected' : ''}`}
                        onClick={() => handleCountrySelect(country.code)}
                      >
                        <span className="country-flag">{country.flag}</span>
                        <span className="country-name">{country.name}</span>
                        <span className="country-code">{country.code}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <input
                type="text"
                className="form-control phone-input"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-1">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {/* Password */}
          <div className="mb-1">
            <label className="form-label">Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <span 
                className="toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-1">
            <label className="form-label">Confirm Password</label>
            <div className="password-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
              <span 
                className="toggle-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="sign-btn mx-auto d-block mt-3">
            Create Account
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login
          </Link>
        </p>
      </div>
    </div>
    </>
  );
}