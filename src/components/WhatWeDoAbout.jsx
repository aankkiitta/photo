import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // 🔥 Import kiya
import './WhatWeDoAbout.css';

const WhatWeDoAbout = () => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();
  
  // 🔥 Current page check karne ke liye
  const location = useLocation();
  const isHomePage = location.pathname === '/';

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

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section className={`do-about-section ${isVisible ? 'animate-in' : ''}`} ref={domRef}>
      <div className="do-about-container">
        
        <hr className="do-about-divider slide-left" />

        <div className="do-about-text-wrapper">
          <p className="do-about-text slide-left">
            We document handpicked elements and moments that are packed with love, to render your wedding film as illustrious as a contemporary cinematic record.
          </p>
          <p className="do-about-text slide-right">
            The footage is edited meticulously to provide you with an everlasting treasured testament of your dream story. The ageless quality of our images complements the energy of our films.
          </p>
        </div>

        <hr className="do-about-divider slide-right" />

        {/* 🔥 Sirf Home Page par button dikhega */}
        {isHomePage && (
          <div className="do-about-btn-wrapper">
            <Link to="/about" className="do-about-view-more-btn">
              View More
            </Link>
          </div>
        )}

      </div>
    </section>
  );
};
 
export default WhatWeDoAbout;