import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "./Navbar";
import "./login.css";

export default function ResetPassword({ handleAlert }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);

  // Verify token on component mount
  useEffect(() => {
    verifyToken();
  }, [token]);

  const verifyToken = async () => {
    if (!token) {
      handleAlert("Invalid reset link.", "error");
      setIsVerifying(false);
      return;
    }

    try {
      const response = await fetch(
        `https://www.everesthealth.somee.com/api/Auth/verify-reset-token?token=${token}`
      );

      const data = await response.json();

      if (response.ok) {
        setTokenValid(true);
      } else {
        handleAlert(data.message || "Invalid or expired reset link.", "error");
        setTokenValid(false);
      }
    } catch (error) {
      handleAlert("Network error. Please try again.", "error");
      setTokenValid(false);
    } finally {
      setIsVerifying(false);
    }
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      handleAlert(passwordError, "warning");
      return;
    }

    if (newPassword !== confirmPassword) {
      handleAlert("Passwords do not match.", "warning");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://www.everesthealth.somee.com/api/Auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        handleAlert(data.message, "success");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        handleAlert(data.message || "Failed to reset password.", "error");
      }
    } catch (error) {
      handleAlert("Network error. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  if (isVerifying) {
    return (
      <>
        <Navbar />
        <div className="login-container">
          <div className="login-form">
            <div className="login-title">
              <h3>Verifying Reset Link...</h3>
            </div>
            <p className="text-center">Please wait while we verify your reset link.</p>
          </div>
        </div>
      </>
    );
  }

  if (!tokenValid) {
    return (
      <>
        <Navbar />
        <div className="login-container">
          <div className="login-form">
            <div className="login-title">
              <h3>Invalid Reset Link</h3>
            </div>
            <p className="text-center">
              This password reset link is invalid or has expired.
            </p>
            <p className="text-center mt-3">
              <Link to="/forgot-password" className="login-link">
                Request a New Reset Link
              </Link>
            </p>
            <p className="text-center mt-2">
              <Link to="/login" className="login-link">
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-form">
          <div className="login-title">
            <h3>Reset Password</h3>
          </div>

          <form className="login-form-container" onSubmit={handleSubmit}>
            <div className="login-items">
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
                disabled={isLoading}
              />
              <small className="form-text">
                Password must be at least 8 characters long.
              </small>
            </div>

            <div className="login-items">
              <label>Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                disabled={isLoading}
              />
            </div>

            <div className="login-items mt-2">
              <button className="login-btn" disabled={isLoading}>
                {isLoading ? "Resetting..." : "Reset Password"}
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