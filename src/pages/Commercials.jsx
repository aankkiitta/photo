import React, { useState, useEffect, useRef } from 'react';
import { commercialsData } from '../data/commercials-data';
import CommercialCard from '../components/CommercialCard'; 
import './Commercials.css';

// 🔥 Direct Path (No Import)
const pattern = '/assets/pattern.png';

const Commercials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  // Reveal Animation Logic
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
      { threshold: 0 } 
    );

    if (domRef.current) observer.observe(domRef.current);
    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  return (
    <div 
      className={`commercials-page ${isVisible ? 'animate-in' : ''}`} 
      ref={domRef}
    >
      
      <div className="commercials-header">
        <img src={pattern} alt="pattern" className="commercials-top-pattern" />
        <h1 className="commercials-title">COMMERCIALS</h1>
      </div>

      <div className="commercials-grid">
        {commercialsData.map((video) => (
          <CommercialCard key={video.id} video={video} />
        ))}
      </div>

    </div>
  );
};

export default Commercials;