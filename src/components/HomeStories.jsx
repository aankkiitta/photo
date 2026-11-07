import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { storiesData } from '../data/stories-data';
import StoryCard from './StoryCard'; 
import './HomeStories.css';

// 🔥 Direct Path (No Import)
const pattern = '/assets/pattern.png';

const HomeStories = () => {
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

  const featuredStories = storiesData.slice(0, 4);

  return (
    <section 
      className={`hs-main-section ${isVisible ? 'animate-in' : ''}`} 
      ref={domRef}
    >
      
      {/* Header */}
      <div className="hs-header">
        <img src={pattern} alt="pattern" className="hs-pattern" />
        <h1 className="hs-title">STORIES</h1>
        <p className="hs-subtitle">Delve deeper into our world of story-telling!</p>
      </div>

      {/* Grid for 4 Cards */}
      <div className="hs-grid">
        {featuredStories.map((story) => (
          <StoryCard key={story.slug} story={story} />
        ))}
      </div>

      {/* View More Button */}
      <div className="hs-btn-container">
        <Link to="/stories" className="hs-view-more-btn">VIEW MORE STORIES</Link>
      </div>

    </section>
  );
};

export default HomeStories;