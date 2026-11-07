import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { galleryImagesData } from '../data/stories-data';
import './HomeImages.css';

// 🔥 Direct Path (No Import)
const pattern = '/assets/pattern.png';

const HomeImages = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const isHovered = useRef(false);

  const maxIndex = galleryImagesData.length > 4 ? galleryImagesData.length - 4 : 0;

  useEffect(() => {
    const timer = setInterval(() => {
      if (window.innerWidth > 768 && !isHovered.current) {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [maxIndex]);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === galleryImagesData.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? galleryImagesData.length - 1 : prev - 1));
  };

  return (
    <section className="hi-page">
      
      <div className="hi-header">
        <img src={pattern} alt="pattern" className="hi-top-pattern" />
        <h1 className="hi-title">IMAGES</h1>
      </div>

      <div className="hi-slider-wrapper">
        <div className="hi-slider-container">
          <div 
            className="hi-slider-track"
            onMouseEnter={() => { isHovered.current = true; }}
            onMouseLeave={() => { isHovered.current = false; }}
            style={{ 
              transform: window.innerWidth > 768 ? `translateX(calc(-${currentIndex} * 25% - ${currentIndex * 5}px))` : 'none' 
            }}
          >
            {galleryImagesData.map((img, index) => (
              <div 
                key={index} 
                className="hi-slider-item"
                onClick={() => openLightbox(index)}
              >
                <img src={img} alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hi-btn-container">
        <Link to="/images" className="hi-load-btn">VIEW ALL IMAGES</Link>
      </div>

      {lightboxIndex !== null && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          
          <button className="lightbox-close" onClick={closeLightbox}>✕</button>
          <button className="lightbox-arrow left" onClick={prevImage}>&#10094;</button>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={galleryImagesData[lightboxIndex]} alt="Fullscreen" />
          </div>

          <button className="lightbox-arrow right" onClick={nextImage}>&#10095;</button>

        </div>
      )}

    </section>
  );
};

export default HomeImages;