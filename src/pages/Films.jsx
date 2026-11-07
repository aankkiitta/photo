import React, { useState, useEffect, useRef } from 'react';
import { filmsData } from '../data/films-data';
import './Films.css';

// 🔥 Direct Path (No Import)
const pattern = '/assets/pattern.png';

// 🔥 Reusable Component (Har category ke liye)
const FilmCategory = ({ section, openVideo }) => {
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

    if (domRef.current) observer.observe(domRef.current);
    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  return (
    <div 
      className={`film-category-section reveal-item ${isVisible ? 'animate-in' : ''}`} 
      ref={domRef}
    >
      <div className="films-header">
        <img src={pattern} alt="pattern" className="films-top-pattern" />
        <h1 className="films-title">{section.sectionTitle}</h1>
      </div>

      <div className="films-grid">
        {section.videos.map((film) => (
          <div key={film.id} className="film-card">
            
            <div className="film-thumbnail-wrapper" onClick={() => openVideo(film.videoUrl)}>
              <img src={film.thumbnail} alt={film.title} className="film-thumbnail" />
              <div className="film-overlay">
                <div className="play-btn">▶</div>
              </div>
            </div>

            <div className="film-info">
              <h2 className="film-title">{film.title}</h2>
              <p className="film-subtitle">{film.subtitle}</p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

// 🔥 Main Films Component
const Films = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  const openVideo = (url) => setActiveVideo(url);
  const closeVideo = () => setActiveVideo(null);

  return (
    <div className="films-page">
      
      {filmsData.map((section, index) => (
        <FilmCategory key={index} section={section} openVideo={openVideo} />
      ))}

      {activeVideo && (
        <div className="video-modal" onClick={closeVideo}>
          <button className="close-btn" onClick={closeVideo}>✕</button>
          <div className="video-container" onClick={(e) => e.stopPropagation()}>
            <iframe 
              width="100%" height="100%" 
              src={`${activeVideo}?autoplay=1`} 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

    </div>
  );
};

export default Films;