import React, { useEffect, useRef, useState } from 'react';
import { storiesData } from '../data/stories-data'; 
import PhotobookCard from '../components/PhotobookCard';
import './Photobooks.css';

// 🔥 Direct Path (No Import)
const pattern = '/assets/pattern.png';

const Photobooks = () => {
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
    <div 
      className={`photobooks-page ${isVisible ? 'animate-in' : ''}`} 
      ref={domRef}
    >
      
      <div className="photobooks-header">
        <img src={pattern} alt="pattern" className="photobooks-top-pattern" />
        <h1 className="photobooks-title">PHOTOBOOKS</h1>
        <p className="photobooks-subtitle">Capturing your timeless moments in frames!</p>
      </div>

      <div className="photobooks-grid">
        {storiesData.map((story) => (
          <PhotobookCard key={story.id} story={story} />
        ))}
      </div>

    </div>
  );
};

export default Photobooks;