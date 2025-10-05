import React, { useState } from "react";
import logo from "../assets/img/logo.png";
import "../Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
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
        <div className="logo">
          <img src={logo} height={60} width={70} alt="Everest Home Care" />
        </div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#whyus">Why Us</a>
          <a href="#about">About</a>
          <a href="#mission">Missons & Values</a>
          <a href="#services">Services</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>
        <div className="d-flex loginBtn-container mx-2 gap-3">
        <Link to={"/login"}>
          <button className="btn btn-outline-info"> Log In</button>
        </Link>
        </div>
        </div>
    
      </nav>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "active" : ""}`}>
        <a href="#home" onClick={toggleSidebar}>Home</a>
        <a href="#about" onClick={toggleSidebar}>About</a>
        <a href="#mission" onClick={toggleSidebar}>Mission & Values</a>
        <a href="#services" onClick={toggleSidebar}>Services</a>
        <a href="#gallery" onClick={toggleSidebar}>Gallery</a>
        <a href="#contact" onClick={toggleSidebar}>Contact</a>
        <div className="loginBtn-container d-flex mx-2 gap-3">
        <Link to={"/login"}>
          <button className="btn btn-outline-info "> Log In</button>
        </Link>
        </div>
 
      </div>

      {/* Optional overlay for better UX */}
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Navbar;