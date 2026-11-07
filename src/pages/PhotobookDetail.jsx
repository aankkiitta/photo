import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { storiesData } from '../data/stories-data'; 
import './PhotobookDetail.css';

// 🔥 Direct Paths (No Import)
const pattern = '/assets/pattern.png'; 
const pattern2 = '/assets/pattern2.png'; 

const PhotobookDetail = () => {
  const { slug } = useParams();
  
  const currentIndex = storiesData.findIndex((p) => p.slug === slug);
  const album = storiesData[currentIndex];

  const [slideIndex, setSlideIndex] = useState(0);

  // 🔥 Reveal Animation State & Ref
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

  if (!album) {
    return <div style={{ padding: '150px', textAlign: 'center' }}>Photobook not found!</div>;
  }

  const prevAlbum = currentIndex > 0 ? storiesData[currentIndex - 1] : storiesData[storiesData.length - 1];
  const nextAlbum = currentIndex < storiesData.length - 1 ? storiesData[currentIndex + 1] : storiesData[0];

  const nextSlide = () => {
    setSlideIndex((prev) => (prev === album.photobookImages.length - 1 ? 0 : prev + 1));
  };
  const prevSlide = () => {
    setSlideIndex((prev) => (prev === 0 ? album.photobookImages.length - 1 : prev - 1));
  };

  return (
    <div 
      className={`photobook-detail-page ${isVisible ? 'animate-in' : ''}`} 
      ref={domRef}
    >
      
      {/* Title */}
      <h1 className="photobook-detail-title reveal-item">{album.couple}</h1>

      {/* Upar wala Pattern */}
      <img src={pattern} alt="pattern" className="top-pattern-img reveal-item" />

      {/* Slider Section */}
      <div className="photobook-slider-section reveal-item">
        <div className="photobook-slider-container">
          <img 
            src={album.photobookImages[slideIndex]} 
            alt={`Slide ${slideIndex + 1}`} 
            className="slider-image" 
          />
          
          <button className="slider-arrow left-arrow" onClick={prevSlide}>&#10094;</button>
          <button className="slider-arrow right-arrow" onClick={nextSlide}>&#10095;</button>
        </div>
      </div>

      {/* Niche wala Pattern */}
      <img src={pattern2} alt="pattern" className="bottom-pattern-img reveal-item" />
      
      {/* NEXT / PREVIOUS ALBUM NAVIGATION */}
      <div className="photobook-bottom-nav reveal-item">
        <Link to={`/photobooks/${prevAlbum.slug}`} className="photobook-nav-item photobook-prev-item">
          <div className="photobook-nav-text">
            <span className="photobook-nav-label">PREVIOUS ALBUM</span>
            <span className="photobook-nav-title">{prevAlbum.couple}</span>
          </div>
        </Link>

        <Link to={`/photobooks/${nextAlbum.slug}`} className="photobook-nav-item photobook-next-item">
          <div className="photobook-nav-text">
            <span className="photobook-nav-label">NEXT ALBUM</span>
            <span className="photobook-nav-title">{nextAlbum.couple}</span>
          </div>
        </Link>
      </div>
      
      <Link to="/photobooks" className="back-btn reveal-item">← Back to Photobooks</Link>
    </div>
  );
};

export default PhotobookDetail;