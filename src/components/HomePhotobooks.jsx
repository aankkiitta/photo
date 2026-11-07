import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { storiesData } from '../data/stories-data';
import PhotobookCard from './PhotobookCard';
import './HomePhotobooks.css';

// 🔥 Direct Path (No Import)
const pattern = '/assets/pattern.png';

const HomePhotobooks = () => {
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

  const featuredPhotobooks = storiesData.slice(0, 4);

  return (
    <section 
      className={`hp-main-section ${isVisible ? 'animate-in' : ''}`} 
      ref={domRef}
    >
      
      <div className="hp-header">
        <img src={pattern} alt="pattern" className="hp-pattern" />
        <h1 className="hp-title">PHOTOBOOKS</h1>
        <p className="hp-subtitle">Capturing your timeless moments in frames!</p>
      </div>

      <div className="hp-grid">
        {featuredPhotobooks.map((story) => (
          <PhotobookCard key={story.id} story={story} />
        ))}
      </div>

      <div className="hp-btn-container">
        <Link to="/photobooks" className="hp-view-more-btn">VIEW MORE PHOTOBOOKS</Link>
      </div>

    </section>
  );
};

export default HomePhotobooks;