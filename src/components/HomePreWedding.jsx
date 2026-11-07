import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { storiesData } from '../data/stories-data';
import PreWeddingCard from './PreWeddingCard'; 
import './HomePreWedding.css';

// 🔥 Direct Path (No Import)
const pattern = '/assets/pattern.png';

const HomePreWedding = () => {
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

    if (domRef.current) observer.observe(domRef.current);
    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  // 🔥 Filter Logic: Sirf woh stories jinki 'pre-wedding' category hai
  const filteredStories = storiesData.filter(story => 
    story.categories?.some(cat => cat.slug === "pre-wedding")
  );

  const featuredPreWeddings = filteredStories.slice(0, 4);

  return (
    <section className={`hpw-section ${isVisible ? 'animate-in' : ''}`} ref={domRef}>
      
      <div className="hpw-header">
        <img src={pattern} alt="pattern" className="hpw-pattern" />
        <h1 className="hpw-title">PRE-WEDDING</h1>
        <p className="hpw-subtitle">Capturing love stories before the big day!</p>
      </div>

      <div className="hpw-grid">
        {featuredPreWeddings.map((story) => (
          <PreWeddingCard key={story.id} story={story} />
        ))}
      </div>

      <div className="hpw-btn-container">
        <Link to="/pre-weddings" className="hpw-load-btn">VIEW MORE PRE-WEDDINGS</Link>
      </div>

    </section>
  );
};

export default HomePreWedding;