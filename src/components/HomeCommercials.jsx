import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { commercialsData } from '../data/commercials-data';
import CommercialCard from './CommercialCard';
import './HomeCommercials.css';

// --- SIRF YEH LINE CHANGE HUI HAI ---
const pattern = '/assets/pattern.png';

const HomeCommercials = () => {
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
      { threshold: 0 } 
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

  // 🔥 Sirf pehle 4 commercials show karne ke liye
  const featuredCommercials = commercialsData.slice(0, 4);

  return (
    <section 
      className={`hc-section ${isVisible ? 'animate-in' : ''}`} 
      ref={domRef}
    >
      
      <div className="hc-header">
        <img src={pattern} alt="pattern" className="hc-pattern" />
        <h1 className="hc-title">COMMERCIALS</h1>
        <p className="hc-subtitle">Creative brand stories and campaigns!</p>
      </div>

      <div className="hc-grid">
        {featuredCommercials.map((video) => (
          <CommercialCard key={video.id} video={video} />
        ))}
      </div>

      <div className="hc-btn-container">
        <Link to="/commercials" className="hc-load-btn">VIEW ALL COMMERCIALS</Link>
      </div>

    </section>
  );
};

export default HomeCommercials;