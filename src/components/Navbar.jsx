// Navbar.jsx

import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/img/Everest_logo.png";
import logo2 from "../assets/img/logo.png";
import "../Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sideDrop, setSideDrop] = useState(false);

  const dropdownRef = useRef(null);
  const sidebarDropRef = useRef(null);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleSideDrop = () => setSideDrop(!sideDrop);

  const closeAll = () => {
    setDropdownOpen(false);
    setSideDrop(false);
  };

  // 🔽 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        sidebarDropRef.current &&
        !sidebarDropRef.current.contains(e.target)
      ) {
        closeAll();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const go = (route) => {
    navigate(route);
    closeAll();
    setIsOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar p-0">
        <div className="menu-btn" onClick={toggleSidebar}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="logo-container">
          <div className="logo">
            <img src={logo2} height={60} width={60} alt="Everest Home Care" />
          </div>
           <div className="logo-2">
            <img src={logo} height={75} width={75} alt="Everest Home Care" />
          </div>
          <div className="slogan">
            <span className="slogan-text">Care you can trust,</span>
            <span className="slogan-subtext">from home health to home care and ODP</span>
          </div>
         
        </div>

        <div className="nav-links text-base">
          <a href="/">Home</a>
          <a href="/#about">About</a>
          <a href="/#mission">Missions</a>
          <a href="/#services">Services</a>
          <a href="/#gallery">Gallery</a>
          <a href="/miss-evv">Missed EVV</a>
          <a href="/#contact">Contact</a>

          {/* ⭐ Custom Dropdown */}
          {/* <div className="custom-dropdown" ref={dropdownRef}>
            <button className="dropdown-btn" onClick={toggleDropdown}>
              Forms ▾
            </button>

            <div className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
              <div onClick={() => go("/form/consumer")}>Consumer Packet</div>
              <div onClick={() => go("/form/orientation")}>
                Orientation Packet
              </div>
              <div onClick={() => go("/form/hab")}>HAB Consumer Packet</div>
            </div>
          </div> */}

          <div className="d-flex loginBtn-container mx-2 gap-3">
            <Link to={"/login"}>
              <button className="btn btn-outline-info">Log In</button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "active" : ""}`}>
        <a href="/" onClick={toggleSidebar}>
          Home
        </a>
          <a href="/#about" onClick={toggleSidebar}>About</a>
          <a href="/#mission" onClick={toggleSidebar}>Mission</a>
          <a href="/#services" onClick={toggleSidebar}>Services</a>
          <a href="/#gallery" onClick={toggleSidebar}>Gallery</a>
           <a href="/miss-evv" onClick={toggleSidebar}>Missed EVV</a>
          <a href="/#contact" onClick={toggleSidebar}>Contact</a>

        {/* ⭐ Sidebar dropdown */}
        {/* <div className="custom-dropdown sidebar-dropdown" ref={sidebarDropRef}>
          <button className="dropdown-btn" onClick={toggleSideDrop}>
            Choose Form ▾
          </button>

          <div className={`dropdown-menu ${sideDrop ? "show" : ""}`}>
            <div onClick={() => go("/form/consumer")}>Consumer Packet</div>
            <div onClick={() => go("/form/orientation")}>
              Orientation Packet
            </div>
            <div onClick={() => go("/form/hab")}>HAB Consumer Packet</div>
          </div>
        </div> */}

        <div className="loginBtn-container d-flex mx-2 gap-3">
          <Link to={"/login"}>
            <button className="btn btn-outline-info">Log In</button>
          </Link>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Navbar;