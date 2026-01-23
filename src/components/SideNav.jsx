// Sidebar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { FaArrowLeft } from 'react-icons/fa';

import logo from "./EHH_Final_logo.png";

function Sidebar() {
  const location = useLocation();
  const sidebarRef = useRef(null);
  const [sideDrop, setSideDrop] = useState(false);
   const toggleSideDrop = () => setSideDrop(!sideDrop);
   const sidebarDropRef = useRef(null);
  const navigate = useNavigate();


  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.role === 1; // 1 = admin, 0 = user

  const isActive = (path) => location.pathname === path;

  // Check if ODP section is active (ODP page + its training/quiz pages)
  const isODPActive = () => {
    return (
      location.pathname === "/home/odp" ||
      (location.pathname.includes("/training") && location.pathname.includes("/home/odp/")) ||
      (location.pathname.includes("/quiz") && location.pathname.includes("/home/odp/")) ||
      location.pathname.startsWith("/home/training/odp") ||
      location.pathname.startsWith("/home/quiz/odp")
    );
  };

  // Check if HOD section is active (HOD page + its training/quiz pages)
  const isHODActive = () => {
    return (
      location.pathname === "/home/hab" ||
      (location.pathname.includes("/training") && location.pathname.includes("/home/hab/")) ||
      (location.pathname.includes("/quiz") && location.pathname.includes("/home/hab/")) ||
      location.pathname.startsWith("/home/training/hab") ||
      location.pathname.startsWith("/home/quiz/hab")
    );
  };

  const handleClick = () => {
    document.getElementById("mySidebar").classList.remove("visibleNav");
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  }

  // Click outside functionality
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = sidebarRef.current;
      const menuBtn = document.querySelector(".menu-btn");

      if (sidebar && sidebar.classList.contains("visibleNav")) {
        if (
          !sidebar.contains(event.target) &&
          !menuBtn?.contains(event.target)
        ) {
          sidebar.classList.remove("visibleNav");
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="sidebar2" id="mySidebar" ref={sidebarRef}>
      {/* Close button (X) */}
      <button onClick={handleClick} className="cancel-btn mb-4">
        <ImCross />
      </button>

      {/* Sidebar brand */}
      <div className="sidebar-brand">
        <Link to="/home" className="brand-link d-flex flex-column align-items-center">
          <img src={logo} height={110} width={110} alt="Everest Home Health Logo" className="sidebar-logo" />
        </Link>
      </div>

      {/* Navigation links */}
      <nav className="nav flex-column pt-3">
        {/* Navigation section header */}
        <div className="nav-section-header">
          <h6 className="nav-header">Learning Center</h6>
        </div>

        {/* ODP Navigation Link */}
        <Link
          onClick={handleClick}
          to="/home/odp"
          className={`nav-link ${isODPActive() ? "active" : ""}`}
        >
          📋 ODP Training
        </Link>

        {/* HOD Navigation Link */}
        <Link
          onClick={handleClick}
          to="/home/hab"
          className={`nav-link ${isHODActive() ? "active" : ""}`}
        >
          👨‍💼 HAB Training
        </Link>

      {/* Forms */}
      <div className="custom-dropdown sidebar-dropdown" ref={sidebarDropRef}>
          <button className="nav-link " onClick={toggleSideDrop}>
            Choose Form ▾
          </button>

          <div className={`dropdown-menu ${sideDrop ? "show" : ""}`}>
            <Link onClick={handleClick} to="/home/form/consumer" className={`nav-link ${isActive("/home/form/consumer") ? "active" : ""}`}>
              Consumer Packet
            </Link>
            <Link onClick={handleClick} to="/home/form/orientation" className={`nav-link ${isActive("/home/form/orientation") ? "active" : ""}`}>
              Orientation Packet
            </Link>
            <Link onClick={handleClick} to="/home/form/hab" className={`nav-link ${isActive("/home/form/hab") ? "active" : ""}`}>
              HAB Consumer Packet
            </Link>
          </div>
        </div> 

        {/* Admin-only links */}
        {isAdmin && (
          <>
            <Link
              onClick={handleClick}
              to="/home/member-list"
              className={`nav-link ${isActive("/home/member-list") ? "active" : ""}`}
            >
              Members List
            </Link>
            <Link
              onClick={handleClick}
              to="/home/member-approval"
              className={`nav-link ${isActive("/home/member-approval") ? "active" : ""}`}
            >
             Member Approval
            </Link>
          </>
        )}

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="btn btn-danger mt-5 m-auto w-50 btn-sm"
        >
          Logout
        </button>
      </nav>

      {/* Arrow back button */}
      <button
        onClick={handleClick}
        style={{ width: "50px" }}
        className="position-absolute closebtn-2 mt-3"
      >
        <FaArrowLeft />
      </button>
    </div>
  );
}

export default Sidebar;