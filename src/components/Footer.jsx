import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import "../Footer.css";
import logo from "../assets/img/logo.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* ---- Company Info ---- */}
         <div>
        <div className="footer-about">
          <div className="logo-slogan">
          <img src={logo} height={100} width={100} className="footer-logo" alt="Everest Home Care" />
          <div className="footer-slogan">
            <p className="slogan-main">Care you can trust,</p>
            <p className="slogan-sub">from home health to home care and ODP</p>
          </div>
        </div>
          <p className="footer-description">
            Providing compassionate and professional home care services to help
            you or your loved ones live comfortably and independently.
          </p>
        </div>
        {/* ---- Hours of Operation ---- */}
        <div className="footer-hours">
          <h4><FaClock className="header-icon" /> Hours of Operation</h4>
          <div className="hours-list">
            <div className="hour-item">
              <span className="day">Monday - Friday</span>
              <span className="time">9am - 5pm</span>
            </div>
            <div className="hour-item weekend">
              <span className="day">Saturday</span>
              <span className="time">Closed</span>
            </div>
            <div className="hour-item weekend">
              <span className="day">Sunday</span>
              <span className="time">Closed</span>
            </div>
          </div>
          <p className="hours-note">
            <strong>Note:</strong> For emergencies, please contact us directly
          </p>
        </div>


        {/* ---- Quick Links ---- */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#whyus">Why Us</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#mission">Mission & Visions</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="footer-policy">
            <h4>Our Policy</h4>
            <a href="/policy">Non-Discrimination Policy</a>
          </div>
        </div>
       </div>
        {/* ---- Contact Info ---- */}
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p><FaMapMarkerAlt className="footer-icon" /> 109 Dewalt Ave Suite 201, Pittsburgh, PA 15227</p>
          <p><FaMapMarkerAlt className="footer-icon" /> 2800 W 21st St, Erie, PA 16506, USA</p>
          <p><FaMapMarkerAlt className="footer-icon" /> 3425 Simpson Ferry Rd, Camp Hill, PA 17011, USA</p>
          <p><FaMapMarkerAlt className="footer-icon" /> 4037 E Independence Blvd, Charlotte, NC 28205, USA</p>
          <p><FaEnvelope className="footer-icon" /> everesthomecarellc@gmail.com</p>
          <p><FaPhoneAlt className="footer-icon" /> (412) 207-7383</p>
          
          {/* ---- Social Media ---- */}
          <div className="footer-social-inline">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="#" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>
        
      </div>

      {/* ---- Bottom Bar ---- */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} <strong>Everest Home Care</strong>. All Rights Reserved.</p>
      </div>
    </footer>
  );
}