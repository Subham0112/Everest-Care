import React, { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { FaArrowLeft} from 'react-icons/fa';




import logo from "./EHH_Final_logo.png";
// import '../styles/Sidebar.css';

function Sidebar() {

  const location = useLocation();
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  // Check if ODP section is active (ODP page + its training/quiz pages)
  const isODPActive = () => {
    return (
      location.pathname === "/home/odp" ||
      // Check if we're in training/quiz for ODP (type = 'odp')
      (location.pathname.includes("/training") && location.pathname.includes("/home/odp/")) ||
      (location.pathname.includes("/quiz") && location.pathname.includes("/home/odp/")) ||
      // Alternative check using URL segments for /training/odp/* or /quiz/odp/*
      location.pathname.startsWith("/home/training/odp") ||
      location.pathname.startsWith("/homr/quiz/odp")
    );
  };

  // Check if HOD section is active (HOD page + its training/quiz pages)
  const isHODActive = () => {
    return (
      location.pathname === "/home/hab" ||
      // Check if we're in training/quiz for HOD (type = 'hod')
      (location.pathname.includes("/training") && location.pathname.includes("/home/hab/")) ||
      (location.pathname.includes("/quiz") && location.pathname.includes("/home/hab/")) ||
      // Alternative check using URL segments for /training/hod/* or /quiz/hod/*
      location.pathname.startsWith("/home/training/hab") ||
      location.pathname.startsWith("/home/quiz/hab")
    );
  };

  const handleClick = () => {
    document.getElementById("mySidebar").classList.remove("visibleNav");
  };
const handleLogout = () => {
  // localStorage.removeItem('token');
  navigate('/login');
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
      <button onClick={handleClick} className="cancel-btn  mb-4 ">
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
        <Link
          onClick={handleClick}
          to="/home/member-approval"
          className={`nav-link ${isActive("/home/member-approval") ? "active" : ""}`}
        >
          Member Approval
        </Link>
        {/* making logout */}
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
       <FaArrowLeft/>
      </button>
    </div>
  );
}

export default Sidebar;