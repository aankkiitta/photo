import React, { useEffect, useRef, useState } from 'react';
import './WhatWeDo.css';

// 🔥 Direct Path - Aapke folder ke exact naam ke saath
const doImage = '/assets/heroimage1.jpg'; // heroimage1.jpg (1 ke saath)

const WhatWeDo = () => {
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
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section className={`do-section ${isVisible ? 'animate-in' : ''}`} ref={domRef}>
      <div className="do-image-wrapper">
        <div 
          className="do-background" 
          style={{ backgroundImage: `url(${doImage})` }}
        ></div>
        <div className="do-overlay"></div>
      </div>

      <div className="do-content slide-left">
        <h2 className="do-title">WHAT WE DO?</h2>
      </div>
    </section>
  );
};

export default WhatWeDo;