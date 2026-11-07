import React, { useEffect, useRef, useState } from 'react';
import './LoveSection.css';

// 🔥 Direct Path (No Import)
const loveImage = '/assets/book2.jpg'; 

const LoveSection = () => {
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
    <section 
      className={`love-section ${isVisible ? 'animate-in' : ''}`} 
      ref={domRef}
    >
      <div className="love-image-wrapper">
        <div 
          className="love-background" 
          style={{ backgroundImage: `url(${loveImage})` }}
        ></div>
        <div className="love-overlay"></div>
      </div>

      <div className="love-content">
        <h2 className="love-title">WHAT WE LOVE?</h2>
        <p className="love-subtitle">
          Stories that touch the soul. Moments that last a lifetime.
        </p>
      </div>
    </section>
  );
};

export default LoveSection;