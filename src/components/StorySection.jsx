import React, { useEffect, useRef, useState } from 'react';
import './StorySection.css';

const StorySection = () => {
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
      className={`story-section ${isVisible ? 'animate-in' : ''}`} 
      ref={domRef}
    >
      <div className="story-container">
        
        <p className="story-quote">
          "Without stories of love, our lives would pass by in the blink of an eye. 
          These stories have the power to stop the world for a moment."
        </p>
        
        <span className="story-author">
          - FUSION PRODUCTION STORy
        </span>
        
      </div>
    </section>
  );
};

export default StorySection;