import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { storiesData } from '../data/stories-data'; 
import './PreWeddingDetail.css';

// 🔥 Direct Paths (No Import)
const pattern = '/assets/pattern.png';
const pattern2 = '/assets/pattern2.png'; // Yahan .png2 ki galti theek ki

const PreWeddingDetail = () => {
  const { slug } = useParams();
  
  // 1. Current story dhoondhna
  const currentIndex = storiesData.findIndex((s) => s.slug === slug);
  const story = storiesData[currentIndex];

  const [slideIndex, setSlideIndex] = useState(0);

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

  // 2. 🔥 Us specific story ki 'pre-wedding' category nikalna
  const preWeddingCat = story.categories?.find(cat => cat.slug === "pre-wedding");

  // Agar us story mein pre-wedding category nahi hai
  if (!preWeddingCat || !preWeddingCat.images || preWeddingCat.images.length === 0) {
    return <div style={{ padding: '150px', textAlign: 'center' }}>No Pre-Wedding photos found for this story!</div>;
  }

  // 3. Next/Prev logic (Sirf un stories me se jisme pre-wedding category ho)
  const filteredStories = storiesData.filter(s => s.categories?.some(cat => cat.slug === "pre-wedding"));
  const filteredIndex = filteredStories.findIndex(s => s.slug === slug);
  
  const prevStory = filteredIndex > 0 ? filteredStories[filteredIndex - 1] : filteredStories[filteredStories.length - 1];
  const nextStory = filteredIndex < filteredStories.length - 1 ? filteredStories[filteredIndex + 1] : filteredStories[0];

  const nextSlide = () => {
    setSlideIndex((prev) => (prev === preWeddingCat.images.length - 1 ? 0 : prev + 1));
  };
  const prevSlide = () => {
    setSlideIndex((prev) => (prev === 0 ? preWeddingCat.images.length - 1 : prev - 1));
  };

  return (
    <div 
      className={`prewedding-detail-page ${isVisible ? 'animate-in' : ''}`} 
      ref={domRef}
    >
      
      <h1 className="prewedding-detail-title reveal-item">{story.couple}</h1>
      <img src={pattern} alt="pattern" className="detail-pattern reveal-item" />

      {/* 🔥 Slider Section */}
      <div className="prewedding-slider-section reveal-item">
        <div className="prewedding-slider-container">
          <img 
            src={preWeddingCat.images[slideIndex]} 
            alt={`Slide ${slideIndex + 1}`} 
            className="slider-image" 
          />
          
          <button className="slider-arrow left-arrow" onClick={prevSlide}>&#10094;</button>
          <button className="slider-arrow right-arrow" onClick={nextSlide}>&#10095;</button>
        </div>
      </div>

      <img src={pattern2} alt="pattern" className="detail-pattern detail-pattern-bottom reveal-item" />
      
      {/* Navigation */}
      <div className="story-navigation reveal-item">
        <Link to={`/pre-wedding/${prevStory.slug}`} className="nav-link prev-link">
          <div className="nav-text">
            <span className="nav-label">PREVIOUS</span>
            <span className="nav-title">{prevStory.couple}</span>
          </div>
        </Link>

        <Link to={`/pre-wedding/${nextStory.slug}`} className="nav-link next-link">
          <div className="nav-text text-right">
            <span className="nav-label">NEXT</span>
            <span className="nav-title">{nextStory.couple}</span>
          </div>
        </Link>
      </div>

      <Link to="/pre-weddings" className="back-btn reveal-item">← Back to Pre-Weddings</Link>
    </div>
  );
};

export default PreWeddingDetail;