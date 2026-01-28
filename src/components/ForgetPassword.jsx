// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Navbar from "./Navbar";
// import "./login.css"; // reuse styles

// export default function ForgotPassword({ handleAlert }) {
//   const [email, setEmail] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const validatePassword = (password) => {
//     if (password.length < 8){
//       return "Password must be at least 8 characters.";

//     }
//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const passwordError = validatePassword(newPassword);
//     if (passwordError) {
//       handleAlert(passwordError, "warning");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       handleAlert("Passwords do not match.", "warning");
//       return;
//     }

//     setIsLoading(true);

//     // 🔴 TEMP: no real API call
//     setTimeout(() => {
//       handleAlert("Password reset successfully (demo).", "success");
//       setIsLoading(false);
//     }, 1000);
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="login-container">
//         <div className="login-form">
//           <div className="login-title">
//             <h3>Reset Password</h3>
//           </div>

//           <form className="login-form-container" onSubmit={handleSubmit}>
//             <div className="login-items">
//               <label>Email</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 required
//                 disabled={isLoading}
//               />
//               <small className="form-text">
//                 Enter the email whose password you want to reset
//               </small>
//             </div>

//             <div className="login-items">
//               <label>New Password</label>
//               <input
//                 type="password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 placeholder="Enter new password"
//                 required
//                 disabled={isLoading}
//               />
//             </div>

//             <div className="login-items">
//               <label>Confirm New Password</label>
//               <input
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 placeholder="Confirm new password"
//                 required
//                 disabled={isLoading}
//               />
//             </div>

//             <div className="login-items mt-2">
//               <button className="login-btn" disabled={isLoading}>
//                 {isLoading ? "Resetting..." : "Reset Password"}
//               </button>
//             </div>
//           </form>

//           <p className="text-center mt-3">
//             <Link to="/login" className="login-link">
//               Back to Login
//             </Link>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// }
