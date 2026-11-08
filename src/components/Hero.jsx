import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

// 🔥 Aapke public/assets folder ke exact naam (extension ke saath)
const heroImage1 = '/assets/IMG488.jpg'; 
const heroImage2 = '/assets/IMG488.jpg'; 
// heroImage3 nahi hai, isliye hata diya

const pattern = '/assets/pattern.png'; 
const pattern2 = '/assets/pattern2.png';

// Slider mein sirf 2 images hain
const slides = [heroImage1, heroImage2];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000); 
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  return (
    <section className="hero-section">
      
      <div 
        className="hero-background" 
        style={{ backgroundImage: `url(${slides[currentSlide]})` }}
      ></div>
      
      <div className="hero-overlay"></div>

      <button className="nav-arrow left-arrow" onClick={prevSlide}>&#10094;</button>
      <button className="nav-arrow right-arrow" onClick={nextSlide}>&#10095;</button>

      <div className="hero-content">
        
        <img src={pattern} alt="pattern" className="hero-pattern" />

        <h2 className="welcome-text">WELCOME</h2>
        
        <div className="hero-text-container">
          <p className="hero-subtext">
            Imagine waking up to a job that lifts you up and transports you to a different world.
          </p>
          <p className="hero-subtext">
            A world populated with a billion heartfelt feelings and stories etched ceremoniously in magic, love and joie de vivre.
          </p>
         
          <p className="hero-subtext highlight">
            This is our world. The Wedding Story world!
          </p>

          <img src={pattern2} alt="pattern" className="hero-unique-pattern" />

          <div className="hero-buttons">
            <Link to="/images" className="hero-btn primary">
              View Our Work
            </Link>
            <Link to="/contact" className="hero-btn secondary">
              Book a Consultation
            </Link>
          </div>

        </div>

      </div>
      
    </section>
  );
};

export default Hero;
