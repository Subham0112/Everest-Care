import React from "react";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import './assets/css/everestcare.css';

import { FaHome, FaUserNurse,FaDotCircle, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import {FaHandHoldingHeart, FaClock } from "react-icons/fa";

import { FaBullseye,FaEye, FaUsers, FaLightbulb } from "react-icons/fa";
import { IoDiamondOutline } from "react-icons/io5";
import aboutImg from "./assets/img/about.jpg";
import personalCareImg from "./assets/img/personal-care.jpg";
import gallery_1 from "./assets/img/caring-1.jpg";
import gallery_2 from "./assets/img/caring-2.jpg";
import gallery_3 from "./assets/img/caring-3.jpg";
import gallery_4 from "./assets/img/caring-4.jpg";
import gallery_5 from "./assets/img/gallery-5.jpg";
import housekeepingImg from "./assets/img/housekeeping.jpg";
import companionshipImg from "./assets/img/companionship.jpg";
import transportationImg from "./assets/img/transportation.jpg";


export default function Content() {

  const images = [
    personalCareImg,
    companionshipImg,
    gallery_1,
    gallery_2,
    gallery_4,
    gallery_5,
 
  ];
  const PittsburghcountyServe = [
    "Allegheny",
    "Armstrong",
    "Beaver",
    "Fayette",
    "Greene", 
    "Washington",
    "Westmoreland",
    "Adams",
    "Cumberland",
    "Dauphin",
    "Franklin",
    "Lancaster",
    "Lebanon",
    "Perry",
    "York"
   ];
  const EriecountyServe = [
    "Buttler",
    "Cameron",
    "Clarion",
    "Clearfield",
    "Crawford", 
    "Washington",
    "Elk",
    "Erie",
    "Forest",
    "Jefferson",
    "Lawrence",
    "McKean",
    "Mercer",
    "Potter",
    "Vennango",
    "Warren"
   ];
    const duplicatedCounties = [...PittsburghcountyServe, ...PittsburghcountyServe, ...PittsburghcountyServe];
    const duplicatedCounties2 = [...EriecountyServe, ...EriecountyServe, ...EriecountyServe];


  return (
    <div  className="home-care-page">
     <Navbar />
    <section className="hero-section container-fluid" id="home">
      <div className="hero-overlay">
        <div className="hero-text-box">
          <h2 className="hero-title">
            Caring Beyond  Boundaries
          </h2>

          <p className="hero-subtitle">
            At Everest Home Care, we provide
            compassionate, reliable, and professional care for your loved ones.
          </p>

          <ul className="hero-points">
            <li>✔ Personalized and family-focused care</li>
            <li>✔ Licensed, trained, and compassionate staff</li>
            <li>✔ Affordable and transparent pricing</li>
            <li>✔ 24/7 support you can rely on</li>
          </ul>

          <div className="hero-actions">
            <button className="btn-custom">Get Started</button>
            <p className="hero-call">
              Or call us directly at{" "}
              <a href="tel:4122077383">(412) 207-7383</a>
            </p>
          </div>
        </div>
      </div>
    </section>
 <section className="whyus-section container-fluid" id="whyus">
      <div className="container">
        {/* WHY US Heading */}
        <div className="whyus-header">
          <h2>Why Choose <span className="highlight">Everest Home Care</span>?</h2>
          <p>
            We are committed to delivering compassionate, reliable, and professional care 
            that brings peace of mind to families. With trained caregivers and 
            personalized care plans, we go beyond expectations to provide support 
            that truly makes a difference.
          </p>
        </div>

        {/* Cards */}
    
     {/* Cards */}
        <div className="whyus-cards">
          <div className="card">
            <div className="card-icon-wrapper">
              <div className="card-icon-circle">
                <FaClock className="card-icon" />
              </div>
            </div>
            <h3>Hourly Home Care</h3>
            <p>
              Hourly home care allows clients to hire our caregivers on an as-needed basis. Our caregivers enable clients to maintain their normal daily routines with flexible, personalized support.
            </p>
          </div>

          <div className="card">
            <div className="card-icon-wrapper">
              <div className="card-icon-circle">
                <FaHome className="card-icon" />
              </div>
            </div>
            <h3>24-Hour Home Care</h3>
            <p>
              24-hour home care provides around-the-clock care for those who are homebound due to physical or other limitations. Families enjoy peace of mind knowing our caregivers are monitoring their loved ones diligently.
            </p>
          </div>

          <div className="card">
            <div className="card-icon-wrapper">
              <div className="card-icon-circle">
                <FaHandHoldingHeart className="card-icon" />
              </div>
            </div>
            <h3>Specialized Home Care</h3>
            <p>
              Specialized Home Care offers personalized assistance for individuals with specific medical conditions or unique care requirements. Our trained professionals deliver tailored support, ensuring your loved one receives the specialized attention they deserve.
            </p>
          </div>
        </div>
      </div>
    </section>

  <section className="about-section" id="about">
      <div className="about-container">
        {/* LEFT CONTENT */}
        <div className="about-text">
          <h2 className='fw-bold'>About Everest Home Care</h2>
          <p>
            Everest Home Care respects the rights of individuals to live their lives to the fullest, 
            even when facing health challenges or limitations. All team members are carefully 
            selected, insured, and bonded. Our commitment to excellence in home care makes an 
            undeniable difference to the clients we proudly serve.
          </p>

          <div className="about-cards">
            <div className="about-card">
              <div className="icon"><FaBullseye /></div>
              <div>
                <h4>Objectives</h4>
                <p>Enhance quality of life, promote independence, ensure safety, and continually improve care programs.</p>
              </div>
            </div>

            <div className="about-card">
              <div className="icon"><FaUsers /></div>
              <div>
                <h4>Beneficiaries</h4>
                <p>Individuals with limitations — including the elderly, those recovering from surgery or illness, and those with chronic conditions — as well as their families and caregivers.</p>
              </div>
            </div>

            <div className="about-card">
              <div className="icon"><FaLightbulb /></div>
              <div>
                <h4>Strategy</h4>
                <p>Provide personalized care plans, employ skilled and compassionate caregivers, conduct regular assessments, and maintain open communication with families and communities.</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="about-image">
          <img src={aboutImg} alt="Everest Home Care" />
        </div>
      </div>
    </section>
  

 <section className="mission-section container-fluid px-3 pt-3 pb-5" id="mission">
      <div className="container text-center ">
        {/* Mission Heading */}
        <div className="mission-header">
          <h2>Our Missions, Visions & Values</h2>
        </div>

        {/* Cards */}
        <div className="whyus-cards">
          <div className="card">
            <div className="d-flex justify-content-center w-100 gap-2">
            <FaBullseye className="icon" />
            <h3>Mission</h3>
            </div>
            <div>
            <p>
              Hourly home care allows clients to hire our caregivers on an as-needed basis, Our caregivers enable clients to maintain their normal daily routines.
            </p>
          </div>
          </div>

          <div className="card">
            <div className="d-flex justify-content-center w-100 gap-2">
            <FaEye className="icon" />
            <h3>Visions</h3>
            </div>
            <p>
             24 hour home care provides around-the-clock care for those who are homebound due to physical or other limitations. Families enjoy peace of mind knowing that our caregivers are monitoring their family member diligently.
            </p>
          </div>

          <div className="card">
            <div className="d-flex justify-content-center w-100 gap-2">
            <IoDiamondOutline className="icon" />
            <h3>Value</h3>
            </div>
            <p>
              Specialized Home Care offers personalized assistance for individuals with specific medical conditions or unique care requirements. Our trained professionals deliver tailored support, ensuring your loved one receives the specialized attention they deserve..
            </p>
          </div>
        </div>
      </div>
    </section>
{/* Services section */}
<div className="services-wrapper">
      <section className="services-section" id="services">
        <div className="container">
          {/* Header */}
          <div className="services-header">
            <h2>Our Services</h2>
          </div>

          {/* Services Grid */}
          <div className="services-grid">
            {/* Home Health Services */}
            <div className="service-card">
              <div className="service-icon-wrapper">
                <div className="service-icon-circle">
                  <FaUserNurse className="service-icon" />
                </div>
              </div>
              <div className="service-content">
                <h3>Home Health Services</h3>
                <p className="service-description">
                  Skilled nursing care delivered by experienced professionals right in the comfort of your home. 
                </p>
              </div>
            </div>

            {/* Home Care Services */}
            <div className="service-card">
              <div className="service-icon-wrapper">
                <div className="service-icon-circle">
                  <FaHome className="service-icon" />
                </div>
              </div>
              <div className="service-content">
                <h3>Home Care Services</h3>
                <p className="service-description">
                  Compassionate daily support to help with personal care, mobility, and everyday living while maintaining dignity and independence.
                </p>
              </div>
            </div>

            {/* ODP Services */}
            <div className="service-card">
              <div className="service-icon-wrapper">
                <div className="service-icon-circle">
                  <FaHandHoldingHeart className="service-icon" />
                </div>
              </div>
              <div className="service-content">
                <h3>ODP Services (Adults 21+)</h3>
                <p className="service-description">
                  Specialized support for adults with developmental and physical challenges, focused on 
                  dignity, independence, and quality of life.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="services-cta">
            <div className="cta-content">
              <h3>Need a Custom Care Plan?</h3>
              <p>Every individual has unique needs. Let us create a personalized care plan for your loved one.</p>
              <button className="cta-button">Contact Us Today</button>
            </div>
          </div>
        </div>
      </section>
    </div>
     
    {/* county serve section */}
     <section className="county-serve-scroll">
      <div className="county-scroll-container">
        <div className="county-header">
          <h3 className="county-title">Counties We Serve</h3>
          <p className="county-subtitle">
            Providing exceptional care across Pennsylvania and beyond
          </p>
        </div>

        <div className="scroll-wrapper">
           <h2>Pittsburgh & Harrisburgh Approved</h2>
          {/* Gradient overlays for fade effect */}
          <div className="fade-left"></div>
          <div className="fade-right"></div>

          {/* Scrolling container */}
          <div className="scroll-track">
            <div className="scroll-content">
              {duplicatedCounties.map((county, index) => (
                <div key={`${county}-${index}`} className="county-block">
                  {/* Top accent bar */}
                  <div className="county-accent"></div>
                  
                  <div className="county-inner">
                    {/* Icon */}
                    <div className="county-icon-wrapper">
                      <svg 
                        className="county-icon" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2.5} 
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                        />
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2.5} 
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                        />
                      </svg>
                    </div>

                    {/* County name */}
                    <h4 className="county-name">{county}</h4>
                    
                    <p className="county-label">County</p>

                    {/* Decorative element */}
                    <div className="county-divider"></div>

                    {/* Service badge */}
                    <div className="service-badge">
                      <svg 
                        className="badge-icon" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      <span>Serving</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
         <div className="service-note">
          <div className="note-badge">
            <svg className="note-icon" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Proudly serving {PittsburghcountyServe.length} counties with compassionate care</span>
          </div>
        </div>

        <div className="scroll-wrapper mt-5">
          <h2>Erie Approved</h2>
          {/* Gradient overlays for fade effect */}
          <div className="fade-left"></div>
          <div className="fade-right"></div>

          {/* Scrolling container */}
          <div className="scroll-track">
            <div className="scroll-content">
              {duplicatedCounties2.map((county, index) => (
                <div key={`${county}-${index}`} className="county-block">
                  {/* Top accent bar */}
                  <div className="county-accent"></div>
                  
                  <div className="county-inner">
                    {/* Icon */}
                    <div className="county-icon-wrapper">
                      <svg 
                        className="county-icon" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2.5} 
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                        />
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2.5} 
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                        />
                      </svg>
                    </div>

                    {/* County name */}
                    <h4 className="county-name">{county}</h4>
                    
                    <p className="county-label">County</p>

                    {/* Decorative element */}
                    <div className="county-divider"></div>

                    {/* Service badge */}
                    <div className="service-badge">
                      <svg 
                        className="badge-icon" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      <span>Serving</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Service note */}
        <div className="service-note">
          <div className="note-badge">
            <svg className="note-icon" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Proudly serving {EriecountyServe.length} counties with compassionate care</span>
          </div>
        </div>
      </div>
      </section>
{/* care section */}
      <section className="care-section py-5">
      <div className="container">
        <div className="row g-4">
          {/* Live In Care */}
          <div className="col-md-6">
            <div className="care-box p-4 rounded shadow-sm ">
              <div className="d-flex align-items-center icon-container  mb-3">
                <div className="icon-circle me-3">
                  <FaHome className="text-primary fs-3" />
                </div>
                <h3 className="mb-0 fw-bold ">Live In Care</h3>
              </div>
              <p className="text-muted mb-0">
                Everest HomeCare understands how important and comforting it is
                to have the same caregiver every day. Building relationships,
                understanding client preferences, and developing a routine are
                key to quality home care. We provide continuous, reliable care
                and peace of mind day and night.
              </p>
            </div>
          </div>

          {/* Our Caregivers */}
          <div className="col-md-6">
            <div className="care-box p-4 rounded shadow-sm ">
              <div className="d-flex align-items-center icon-container mb-3">
                <div className="icon-circle me-3">
                  <FaUserNurse className="text-danger fs-3" />
                </div>
                <h3 className="mb-0 fw-bold">Our Caregivers</h3>
              </div>
              <p className="text-muted mb-0">
                We provide certified caregivers trained to assist with personal
                care and homemaking needs such as bathing, dressing, and
                companionship. Every caregiver is insured, background-checked,
                and dedicated to providing safe, compassionate, and reliable
                care for your loved ones.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>


    <section className="gallery-section" id="gallery">
      <div className="text-center mb-4">
        <h2 className="gallery-title">Gallery</h2>
        <p className="gallery-subtitle">
          A glimpse of our work and care in action
        </p>
      </div>

      <div
        id="galleryCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        {/* Indicators */}
        <div className="carousel-indicators custom-indicators">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              data-bs-target="#galleryCarousel"
              data-bs-slide-to={idx}
              className={idx === 0 ? "active" : ""}
              aria-current={idx === 0 ? "true" : "false"}
              aria-label={`Slide ${idx + 1}`}
            ></button>
          ))}
        </div>

        {/* Slides */}
        <div className="carousel-inner">
          {images.map((src, idx) => (
            <div
              key={idx}
              className={`carousel-item ${idx === 0 ? "active" : ""}`}
            >
              <img src={src} className="d-block w-100 rounded-3" alt={`Slide ${idx + 1}`} />
            </div>
          ))}
        </div>
   
    
      </div>
    </section>

           <section className="contact-section" id="contact">
      {/* ----- HEADER ----- */}
      <div className="text-center mb-5">
        <h2 className="contact-title">Contact</h2>
        <p className="contact-subtitle">
          We’d love to hear from you! Whether you have a question, need help, or
          just want to say hello — our team is here for you.
        </p>
      </div>

      {/* ----- MAPS ----- */}
      <div className="maps-container">
        <div className="map-card">
 <iframe
 title="Office 1"
 
 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.9575553960235!2d-79.98419590081316!3d40.3654654831067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8834f09f0fe551ab%3A0xfc54f65c27f1f3f2!2s109%20Dewalt%20Ave%20%23201%2C%20Brentwood%2C%20PA%2015227%2C%20USA!5e0!3m2!1sen!2snp!4v1758811380463!5m2!1sen!2snp"  loading="lazy" ></iframe>
        </div>
        <div className="map-card">
     <iframe 
     title="Office 2"
     src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5921.338836233973!2d-80.138724!3d42.093132!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88327fa96a6f8751%3A0x2d6170cdb137b344!2s2800%20W%2021st%20St%20%23416%2C%20Erie%2C%20PA%2016506%2C%20USA!5e0!3m2!1sen!2snp!4v1758772048707!5m2!1sen!2snp"   loading="lazy" ></iframe>
        </div>
      <div className="map-card">
    <iframe 
    title="Office 3"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3046.2347727650226!2d-76.93985882486088!3d40.22608196722208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c8c20d8dd0082b%3A0x7cf2b5bf76a315d3!2s3425%20Simpson%20Ferry%20Rd%20%23100%2C%20Camp%20Hill%2C%20PA%2017011%2C%20USA!5e0!3m2!1sen!2snp!4v1758898070721!5m2!1sen!2snp" loading="lazy" ></iframe>
        </div>
      <div className="map-card">
    <iframe
    title="Office 4"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3260.220315685076!2d-80.77223927767255!3d35.20098080366557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88542031910c7ebb%3A0xbf6b5c923e6d8a0b!2s4037%20E%20Independence%20Blvd%2C%20Charlotte%2C%20NC%2028205%2C%20USA!5e0!3m2!1sen!2snp!4v1768826050997!5m2!1sen!2snp" loading="lazy" ></iframe>
        </div>
      </div>

      {/* ----- CONTACT INFO + FORM ----- */}
      <div className="contact-box">
        {/* LEFT INFO */}
        <div className="contact-info">
          <div className="info-item">
            <FaMapMarkerAlt className="info-icon" />
            <div>
              <h5>Location</h5>
              <p><span className="text-info font-smaller"><FaDotCircle/></span> 109 Dewalt Ave Suite 201, Pittsburgh, PA 15227, USA</p>
              <p> <span className="text-info"><FaDotCircle/></span> 2800 W 21st St, Erie, PA 16506, USA</p>
              <p><span className="text-info"><FaDotCircle/></span> 3425 Simpson Ferry Rd, Camp Hill, PA 17011, USA</p>
              <p><span className="text-info"><FaDotCircle/></span> 4037 E Independence Blvd, Charlotte, NC 28205, USA</p>
            </div>
          </div>

          <div className="info-item">
            <FaEnvelope className="info-icon" />
            <div style={{width:"80%", display:"flex",flexDirection:"column"}}>
              <h5>Email</h5>
              <p className="text-wrap">everesthomecarellc@gmail.com</p>
            </div>
          </div>

          <div className="info-item">
            <FaPhoneAlt className="info-icon" />
            <div>
              <h5>Call</h5>
              <p>(412) 207-7383</p>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <form className="contact-form">
          <div className="form-row">
            <input type="text" name="name" autoComplete="on" placeholder="Your Name" required />
            <input type="email" name="email" autoComplete="on" placeholder="Your Email" required />
          </div>
          <input type="text" name="subject" placeholder="Subject" required />
          <textarea placeholder="Message" name="message"  rows="5" required></textarea>
          <button type="submit"  className="contact-btn">
            Send Message
          </button>
        </form>
      </div>
    </section>

    <Footer />
    </div>
  );
}