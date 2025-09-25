import React from "react";


import { FaHome, FaUserNurse, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
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
  const services = [
  {
    img: personalCareImg,
    title: "Personal Care",
    desc: "Our personal care services are tailored to meet the unique needs of each client, ensuring dignity and comfort every day."
  },
  {
    img: housekeepingImg,
    title: "Housekeeping",
    desc: "We create a clean, comfortable, and hygienic living space so our clients can enjoy a safe and relaxing home environment."
  },
  {
    img: companionshipImg,
    title: "Companionship",
    desc: "Companionship care to reduce loneliness, encourage social interaction, and help maintain emotional well-being."
  },
  {
    img: transportationImg,
    title: "Transportation",
    desc: "Safe and reliable transportation for appointments, errands, or social outings, keeping clients active and connected."
  }
];
  const images = [
    personalCareImg,
    companionshipImg,
    gallery_1,
    gallery_2,
    gallery_4,
    gallery_5,
 
  ];


  return (
    <>
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
        <div className="whyus-cards">
          <div className="card">
            <h3>Hourly Home Care</h3>
            <p>
              Hourly home care allows clients to hire our caregivers on an as-needed basis, Our caregivers enable clients to maintain their normal daily routines.
            </p>
          </div>

          <div className="card">
            <h3>24-Hour Home Care</h3>
            <p>
             24 hour home care provides around-the-clock care for those who are homebound due to physical or other limitations. Families enjoy peace of mind knowing that our caregivers are monitoring their family member diligently.
            </p>
          </div>

          <div className="card">
            <h3>Specialized Home Care</h3>
            <p>
              Specialized Home Care offers personalized assistance for individuals with specific medical conditions or unique care requirements. Our trained professionals deliver tailored support, ensuring your loved one receives the specialized attention they deserve..
            </p>
          </div>
        </div>
      </div>
    </section>

  <section className="about-section" id="about">
      <div className="about-container">
        {/* LEFT CONTENT */}
        <div className="about-text">
          <h2>About Everest Home Care</h2>
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

      <section className="services-section" id="services">
      <div className="services-container">
        <h2 className="services-title">Our Services</h2>
        <p className="services-subtitle">
          We provide a range of personalized care services to support independence, comfort,
          and well-being for our clients.
        </p>

        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-img-wrapper">
                <img src={service.img} alt={service.title} />
              </div>
              <div className="service-content">
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            </div>
          ))}
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

        {/* Custom Arrows */}
   
    
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
     <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.963969727073!2d-79.98693052485295!3d40.36532325876786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8834f09f0fc2b51d%3A0xb0f6501cc9d52f8d!2s109%20Dewalt%20Ave%2C%20Pittsburgh%2C%20PA%2015227%2C%20USA!5e0!3m2!1sen!2snp!4v1758772097361!5m2!1sen!2snp"  loading="lazy" ></iframe>
        </div>

        <div className="map-card">
     <iframe 
     title="Office 2"
     src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5921.338836233973!2d-80.138724!3d42.093132!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88327fa96a6f8751%3A0x2d6170cdb137b344!2s2800%20W%2021st%20St%20%23416%2C%20Erie%2C%20PA%2016506%2C%20USA!5e0!3m2!1sen!2snp!4v1758772048707!5m2!1sen!2snp"   loading="lazy" ></iframe>
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
              <p>109 Dewalt Ave STE 2018, Pittsburgh, PA 15227</p>
            </div>
          </div>

          <div className="info-item">
            <FaEnvelope className="info-icon" />
            <div style={{width:"80%", display:"flex",flexDirection:"column"}}>
              <h5>Email</h5>
              <p>everesthomecarellc@gmail.com</p>
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
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
          </div>
          <input type="text" placeholder="Subject" required />
          <textarea placeholder="Message" rows="5" required></textarea>
          <button type="submit" className="contact-btn">
            Send Message
          </button>
        </form>
      </div>
    </section>

    </>
  );
}