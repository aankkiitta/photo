import React, { useEffect, useRef, useState } from 'react';
import { storiesData } from '../data/stories-data';
import PreWeddingCard from '../components/PreWeddingCard'; 
import './PreWedding.css';

// 🔥 Direct Path (No Import)
const pattern = '/assets/pattern.png';

const PreWedding = () => {
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

  // 🔥 Filter Logic: Sirf woh stories jinki 'pre-wedding' category hai
  const filteredStories = storiesData.filter(story => 
    story.categories?.some(cat => cat.slug === "pre-wedding")
  );

  return (
    <div 
      className={`prewedding-page ${isVisible ? 'animate-in' : ''}`} 
      ref={domRef}
    >
      
      <div className="prewedding-header">
        <img src={pattern} alt="pattern" className="prewedding-top-pattern" />
        <h1 className="prewedding-title">PRE-WEDDING</h1>
        <p className="prewedding-subtitle">Capturing love stories before the big day!</p>
      </div>

      <div className="prewedding-grid">
        {filteredStories.map((story) => (
          <PreWeddingCard key={story.id} story={story} />
        ))}
      </div>

    </div>
  );
};

export default PreWedding;