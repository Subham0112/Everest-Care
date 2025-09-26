import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "../Footer.css";
import logo from "../assets/img/logo.png";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* ---- Company Info ---- */}
        <div className="footer-about">
          <img src={logo} height={100} width={100} className="footer-logo" alt="Everest Home Care" />
          <p>
            Providing compassionate and professional home care services to help
            you or your loved ones live comfortably and independently.
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
        </div>

        {/* ---- Contact Info ---- */}
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p><FaMapMarkerAlt className="footer-icon" /> 109 Dewalt Ave STE 201, Pittsburgh, PA 15227</p>
          <p><FaMapMarkerAlt className="footer-icon" /> 2800 W 21st St, Erie, PA 16506, USA</p>
          <p><FaMapMarkerAlt className="footer-icon" /> 3425 Simpson Ferry Rd, Camp Hill, PA 17011, USA</p>
          <p><FaEnvelope className="footer-icon" /> everesthomecarellc@gmail.com</p>
          <p><FaPhoneAlt className="footer-icon" /> (412) 207-7383</p>
        </div>

        {/* ---- Social Media ---- */}
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
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