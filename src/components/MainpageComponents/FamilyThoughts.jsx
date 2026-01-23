import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";
import "../../assets/css/FamilyThought.css";

const FamilyTestimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slidesPerView, setSlidesPerView] = useState(2);

  const testimonials = [
    {
      quote: "From the first visit, we felt supported and confident in the care provided.",
      family: "The Brown Family",
      gradientClass: "gradient-blue-purple",
    },
    {
      quote: "Professional, attentive, and truly compassionate care we could rely on.",
      family: "The Reynolds Family",
      gradientClass: "gradient-purple-pink",
    },
    {
      quote: "Our RN and CNA felt like trusted partners in our loved one's care.",
      family: "The Mehta Family",
      gradientClass: "gradient-pink-rose",
    },
    {
      quote: "The consistency and professionalism brought peace of mind to our entire family.",
      family: "The Johnson Family",
      gradientClass: "gradient-teal-cyan",
    },
    {
      quote: "They treated our mother with the dignity and respect she deserved every single day.",
      family: "The Garcia Family",
      gradientClass: "gradient-indigo-blue",
    },
  ];

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(window.innerWidth < 992 ? 1 : 2);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxSlides = testimonials.length - (slidesPerView - 1);

  // Auto play
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % maxSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxSlides]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % maxSlides);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        {/* Header */}
        <div className="testimonials-header">
          <h2 className="testimonials-title">What Families Say</h2>
          <p className="testimonials-subtitle">
            Families trust Everest Home Health for the consistency, professionalism, and genuine care we bring into every home. Clients often share how reassuring it feels to work with a team that listens, communicates clearly, and treats their loved ones with dignity and respect.
          </p>
        </div>

        {/* Carousel */}
        <div className="testimonials-carousel-wrapper">
          <div className="testimonials-carousel-container">
            <div
              className="testimonials-carousel-track"
              style={{
                transform: `translateX(-${
                  currentSlide * (100 / slidesPerView)
                }%)`,
              }}
            >
              {testimonials.map((item, index) => (
                <div key={index} className="testimonials-slide-wrapper">
                  <div className={`testimonials-card ${item.gradientClass}`}>
                    <FaQuoteLeft className="testimonials-quote-icon" />
                    <p className="testimonials-quote-text">
                      “{item.quote}”
                    </p>
                    <div className="testimonials-family-section">
                      <div className="testimonials-divider" />
                      <p className="testimonials-family-name">
                        {item.family}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nav buttons */}
          <button
            className="testimonials-nav-btn testimonials-nav-btn-left"
            onClick={prevSlide}
          >
            <FaChevronLeft />
          </button>

          <button
            className="testimonials-nav-btn testimonials-nav-btn-right"
            onClick={nextSlide}
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Dots */}
        <div className="testimonials-dots-container">
          {Array.from({ length: maxSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`testimonials-dot ${
                currentSlide === index ? "testimonials-dot-active" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FamilyTestimonials;
