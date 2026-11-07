import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { storiesData } from '../data/stories-data';
import './StoryDetail.css';

// 🔥 Direct Paths (No Import)
const pattern = '/assets/pattern.png';
const pattern2 = '/assets/pattern1.png';

const StoryDetail = () => {
  const { slug } = useParams(); 
  
  const currentIndex = storiesData.findIndex((s) => s.slug === slug);
  const story = storiesData[currentIndex];

  // 🔥 Reveal Animation Logic
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
      { threshold: 0 } 
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

  if (!story) {
    return <div style={{ padding: '150px', textAlign: 'center' }}>Story not found!</div>;
  }

  const prevStory = currentIndex > 0 ? storiesData[currentIndex - 1] : storiesData[storiesData.length - 1];
  const nextStory = currentIndex < storiesData.length - 1 ? storiesData[currentIndex + 1] : storiesData[0];

  return (
    <div 
      className={`story-detail-page ${isVisible ? 'animate-in' : ''}`} 
      ref={domRef}
    >
      
      <img src={pattern} alt="pattern" className="detail-pattern reveal-item" />

      <div className="detail-header reveal-item">
        <h1 className="detail-title">{story.title}</h1>
        <h2 className="detail-couple">{story.couple}</h2>
        <p className="detail-meta">{story.date} | {story.location}</p>
      </div>

      <div className="detail-cover-wrapper reveal-item">
        <img src={story.image} alt={story.title} className="detail-cover" />
      </div>

      <div className="detail-text-container reveal-item">
        <p className="detail-paragraph">{story.description}</p>
      </div>

      <div className="detail-pattern2-full reveal-item" style={{ backgroundImage: `url(${pattern2})` }}></div>

      {/* 🔥 Gallery Sections */}
      <div className="story-gallery-container reveal-item">
        {story.gallery.map((section, index) => (
          <div key={index} className="gallery-section">
            
            <h3 className="gallery-section-title">{section.title}</h3>
            
            <div className="masonry-grid">
              {section.images.map((img, imgIndex) => (
                <div key={imgIndex} className="masonry-item">
                  <img src={img} alt={`${section.title} ${imgIndex + 1}`} />
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

      {/* 🔥 NEXT / PREVIOUS NAVIGATION */}
      <div className="story-bottom-nav reveal-item">
        
        <Link to={`/stories/${prevStory.slug}`} className="story-nav-item story-prev-item">
          <div className="story-nav-text">
            <span className="story-nav-label">PREVIOUS</span>
            <span className="story-nav-title">{prevStory.title}</span>
          </div>
        </Link>

        <Link to={`/stories/${nextStory.slug}`} className="story-nav-item story-next-item">
          <div className="story-nav-text">
            <span className="story-nav-label">NEXT</span>
            <span className="story-nav-title">{nextStory.title}</span>
          </div>
        </Link>

      </div>
      
      <Link to="/stories" className="back-btn reveal-item" style={{ marginTop: '40px' }}>← Back to Stories</Link>

    </div>
  );
};

export default StoryDetail;