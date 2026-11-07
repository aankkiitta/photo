import React, { useEffect, useRef, useState } from 'react';
import './WhatWeBelieveSection.css';

// 🔥 Direct Path (Extension .png kiya)
const believeImage = '/assets/book1.jpg'; 

const WhatWeBelieveSection = () => {
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
    <section className={`believe-section ${isVisible ? 'animate-in' : ''}`} ref={domRef}>
      <div className="believe-image-wrapper">
        <div 
          className="believe-background" 
          style={{ backgroundImage: `url(${believeImage})` }}
        ></div>
        <div className="believe-overlay"></div>
      </div>

      <div className="believe-content slide-left">
        <h2 className="believe-title">WHAT WE BELIEVE?</h2>
        <p className="believe-subtitle">
          Every love story is beautiful, but yours is our favorite.
        </p>
      </div>
    </section>
  );
};

export default WhatWeBelieveSection;