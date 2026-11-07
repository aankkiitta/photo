import React, { useEffect, useRef, useState } from 'react';
import './LoveAboutSection.css';

const LoveAboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // Ek baar animate hone ke baad ruk jayega
          }
        });
      },
      { threshold: 0.1 } // 10% dikhne par trigger hoga
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
      className={`love-about-section ${isVisible ? 'animate-in' : ''}`} 
      ref={domRef}
    >
      <div className="love-about-container">
        
      
        <hr className="love-about-divider slide-left" />

        <div className="love-about-text-wrapper">
      
          <p className="love-about-text slide-left">
            We believe that marriages are a promise of forever, synonymous to "...and they lived happily ever after."
          </p>
          
       
          <p className="love-about-text slide-right">
            We are here to encapsulate your "happily ever after" onto the screen just as magically as you had imagined.
          </p>
        </div>

    
        <hr className="love-about-divider slide-right" />

      </div>
    </section>
  );
};

export default LoveAboutSection;