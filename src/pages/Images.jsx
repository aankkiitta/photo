import React, { useState } from 'react';
import { storiesData } from '../data/stories-data'; 
import { commercialsData } from '../data/commercials-data';
import './Images.css';

// 🔥 Direct Path (No Import)
const pattern = '/assets/pattern.png'; 

// 🔥 Dono files se data merge karke ek master array banaya
const getCombinedImages = () => {
  let combined = [];

  // 1. Stories se images nikalo
  storiesData.forEach((story) => {
    if (story.categories) {
      story.categories.forEach((cat) => {
        cat.images.forEach((img, idx) => {
          combined.push({
            id: `story-${story.id}-${cat.slug}-${idx}`,
            src: img,
            category: cat.slug, 
            categoryTitle: cat.title,
          });
        });
      });
    }
  });

  // 2. Commercials ki images add karo
  commercialsData.forEach((cmm) => {
    combined.push({
      id: `cmm-${cmm.id}`,
      src: cmm.thumbnail,
      // 🔥 Commercials ki category ab 'commercials' hai
      category: 'commercials', 
      categoryTitle: 'COMMERCIALS',
      link: cmm.instagramUrl
    });
  });

  return combined;
};

const allImagesData = getCombinedImages();

// 🔥 Filter Categories mein Engagement aur Real Estate add kiye
const filterCategories = [
  { label: 'All', value: 'all' },
  { label: 'Wedding', value: 'wedding' },
  { label: 'Pre-Wedding', value: 'pre-wedding' },
  { label: 'Engagement', value: 'engagement' }, // 🔥 Engagement
  { label: 'Real Estate', value: 'real-estate' }, // 🔥 Real Estate
  { label: 'Commercials', value: 'commercials' }
];

const Images = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // 🔥 Filter Logic
  const filteredImages = allImagesData.filter((img) => 
    activeFilter === 'all' ? true : img.category === activeFilter
  );

  // 🔥 GROUPING LOGIC: Images ko category ke hisaab se group karo
  const groupedImages = filteredImages.reduce((acc, img) => {
    const cat = img.category;
    if (!acc[cat]) {
      acc[cat] = {
        title: img.categoryTitle || cat.replace('-', ' ').toUpperCase(),
        images: []
      };
    }
    acc[cat].images.push(img);
    return acc;
  }, {});

  const openLightbox = (imgObj) => {
    const index = filteredImages.findIndex(img => img.id === imgObj.id);
    setLightboxIndex(index);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const nextImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1));
  };

  return (
    <div className="images-page">
      
      {/* Header Section */}
      <div className="images-header">
        <img src={pattern} alt="pattern" className="images-top-pattern" />
        <h1 className="images-title">IMAGES</h1>
      </div>

      {/* 🔥 Filter Bar */}
      <div className="images-filter-bar">
        {filterCategories.map((cat) => (
          <button
            key={cat.value}
            className={`filter-btn ${activeFilter === cat.value ? 'active' : ''}`}
            onClick={() => {
              setActiveFilter(cat.value);
              setLightboxIndex(null);
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 🔥 RENDER LOGIC */}
      <div className="images-content-wrapper">
        {filteredImages.length > 0 ? (
          activeFilter === 'all' ? (
            Object.keys(groupedImages).map((catKey) => (
              <div key={catKey} className="image-section">
                <h2 className="section-title">{groupedImages[catKey].title}</h2>
                <div className="images-grid">
                  {groupedImages[catKey].images.map((imgObj) => (
                    <div 
                      key={imgObj.id} 
                      className="image-card" 
                      onClick={() => openLightbox(imgObj)}
                    >
                      <img src={imgObj.src} alt="Gallery" />
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="images-grid">
              {filteredImages.map((imgObj) => (
                <div 
                  key={imgObj.id} 
                  className="image-card" 
                  onClick={() => openLightbox(imgObj)}
                >
                  <img src={imgObj.src} alt="Gallery" />
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="no-images-msg">
            <p>No images found for this category yet.</p>
          </div>
        )}
      </div>

      {/* 🔥 FULLSCREEN LIGHTBOX MODAL */}
      {lightboxIndex !== null && filteredImages[lightboxIndex] && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          
          <button className="lightbox-close" onClick={closeLightbox}>✕</button>
          <button className="lightbox-arrow left" onClick={prevImage}>&#10094;</button>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={filteredImages[lightboxIndex].src} alt="Fullscreen" />
            
            {filteredImages[lightboxIndex].link && (
              <a 
                href={filteredImages[lightboxIndex].link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="lightbox-insta-link"
              >
                Watch on Instagram
              </a>
            )}
          </div>

          <button className="lightbox-arrow right" onClick={nextImage}>&#10095;</button>
        </div>
      )}

    </div>
  );
};

export default Images;