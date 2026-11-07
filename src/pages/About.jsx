import React, { useState, useEffect, useRef } from 'react';
import './About.css';

// 🔥 Direct Paths (No Import)
const pattern = '/assets/pattern.png';
const aboutImage = '/assets/birth1.jpg';

// 🔥 Imported Components
import StorySection from '../components/StorySection';
import LoveSection from '../components/LoveSection';
import LoveAboutSection from '../components/LoveAboutSection';
import WhatWeBelieveSection from '../components/WhatWeBelieveSection';
import WhatWeBelieveAbout from '../components/WhatWeBelieveAbout';
import WhatWeDo from '../components/WhatWeDo';
import WhatWeDoAbout from '../components/WhatWeDoAbout';

// Reusable Reveal Component
const RevealSection = ({ children, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); 
          }
        });
      },
      { threshold: 0.1 } 
    );

    if (domRef.current) observer.observe(domRef.current);
    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  return (
    <div ref={domRef} className={`reveal-item ${isVisible ? 'animate-in' : ''} ${className}`}>
      {children}
    </div>
  );
};

const About = () => {
  return (
    <div className="about-page">
      
      {/* 1. INTRO SECTION */}
      <RevealSection className="full-width-wrapper">
        <div className="about-header">
          <img src={pattern} alt="pattern" className="about-pattern" />
          <h1 className="about-title">ABOUT US</h1>
        </div>
      </RevealSection>

      <RevealSection className="full-width-wrapper">
        <div className="about-intro">
          <p>
            We are a team of storytellers, filmmakers, and photographers dedicated to capturing the raw, unscripted beauty of your most cherished moments. 
          </p>
        </div>
      </RevealSection>

      <RevealSection className="full-width-wrapper">
        <div className="about-image-container">
          <img src={aboutImage} alt="About Us" className="about-main-image" />
        </div>
      </RevealSection>

      {/* 2. PHILOSOPHY SECTION */}
      <RevealSection className="full-width-wrapper">
        <div className="about-content">
          <h2 className="about-subtitle">OUR PHILOSOPHY</h2>
          <p>
            We believe that a wedding film is more than just a video. It's an heirloom—a timeless capsule of emotions, stolen glances, and joyous tears that you can revisit years down the line. We don't just point cameras; we invest in your story, getting to know you to ensure your personalities shine through every frame.
          </p>
          <p>
            From the quiet moments of getting ready to the high energy of the dance floor, our approach is unobtrusive and candid. We are there to document the day as it naturally unfolds, preserving the authentic energy of your celebration.
          </p>
        </div>
      </RevealSection>

      {/* 3. QUOTE SECTION */}
      <StorySection />

      {/* 4. THE THREE PILLARS */}
      <LoveSection />
      <LoveAboutSection />

      <WhatWeBelieveSection />
      <WhatWeBelieveAbout />

      <WhatWeDo />
      <WhatWeDoAbout />

      {/* 5. CONCLUSION */}
      <RevealSection className="full-width-wrapper">
        <div className="about-quote-section">
          <p className="about-quote">"The best stories are the ones that make you feel alive."</p>
          <p className="about-author">— THE FUSION STORY TEAM</p>
        </div>
      </RevealSection>

    </div>
  );
};

export default About;