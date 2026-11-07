import React, { useEffect, useRef, useState } from 'react';
import './Reveal.css';

const Reveal = ({ image, title, text, reverse = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 } // 10% dikhne par animation start hogi
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
    <div 
      className={`reveal-section ${reverse ? 'reverse' : ''} ${isVisible ? 'active' : ''}`} 
      ref={domRef}
    >
      <div className="reveal-container">
        
        {/* Image Container */}
        <div className="reveal-image-wrapper">
          <img src={image} alt={title} className="reveal-image" />
        </div>

        {/* Text Container */}
        <div className="reveal-text-wrapper">
          <h2 className="reveal-title">{title}</h2>
          <p className="reveal-text">{text}</p>
        </div>

      </div>
    </div>
  );
};

export default Reveal;