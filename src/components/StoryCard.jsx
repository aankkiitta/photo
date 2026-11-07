import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './StoryCard.css';

const StoryCard = ({ story }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div className={`sc-card ${isVisible ? 'sc-reveal' : ''}`} ref={cardRef}>
      {/* story.slug par link ja raha hai */}
      <Link to={`/stories/${story.slug}`} className="sc-link">
        
        <div className="sc-image-wrapper">
          {/* story.image mein direct '/assets/...' path aayega */}
          <img src={story.image} alt={story.title} className="sc-image" />
        </div>

        <div className="sc-content">
          <h2 className="sc-title">{story.title}</h2>
          <p className="sc-couple">{story.couple}</p>
          <p className="sc-description">{story.description}</p>
          
          <span className="sc-read-more">
            READ MORE <span>&rarr;</span>
          </span>
        </div>
      </Link>
    </div>
  );
};

export default StoryCard;