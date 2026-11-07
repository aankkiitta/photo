import React, { useEffect, useRef, useState } from 'react';
import './WhatWeBelieveAbout.css';

const WhatWeBelieveAbout = () => {
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
      className={`believe-about-section ${isVisible ? 'animate-in' : ''}`} 
      ref={domRef}
    >
      <div className="believe-about-container">
        
        {/* Upar ki thin line (Left se aayegi) */}
        <hr className="believe-about-divider slide-left" />

        <div className="believe-about-text-wrapper">
          {/* Pehla paragraph (Left se aayega) */}
          <p className="believe-about-text slide-left">
            We believe that marriages are a promise of forever, synonymous to "...and they lived happily ever after."
          </p>
          
          {/* Dusra paragraph (Right se aayega) */}
          <p className="believe-about-text slide-right">
            We are here to encapsulate your "happily ever after" onto the screen just as magically as you had imagined.
          </p>
        </div>

        {/* Niche ki thin line (Right se aayegi) */}
        <hr className="believe-about-divider slide-right" />

      </div>
    </section>
  );
};

export default WhatWeBelieveAbout;