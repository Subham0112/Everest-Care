import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./login.css";

export default function ForgotPassword({ handleAlert }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("https://localhost:44345/api/Auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        handleAlert(data.message, "success");
        setEmail("");
      } else {
        handleAlert(data.message || "Failed to send reset link.", "error");
      }
    } catch (error) {
      handleAlert("Network error. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-form">
          <div className="login-title">
            <h3>Forgot Password</h3>
          </div>

          <form className="login-form-container" onSubmit={handleSubmit}>
            <div className="login-items">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
              <small className="form-text">
                Enter the email address associated with your account. We'll send you a password reset link.
              </small>
            </div>

            <div className="login-items mt-2">
              <button className="login-btn" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </div>
          </form>

          <p className="text-center mt-3">
            <Link to="/login" className="login-link">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}