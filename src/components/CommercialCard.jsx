import React from 'react';
import './CommercialCard.css';

const CommercialCard = ({ video }) => {
  return (
    <div className="commercial-card">
      <a 
        href={video.instagramUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="commercial-link"
      >
        <div className="commercial-thumbnail-wrapper">
          {/* video.thumbnail mein direct '/assets/...' path aayega */}
          <img src={video.thumbnail} alt={video.title} className="commercial-thumbnail" />
          
          <div className="commercial-overlay">
            <div className="play-btn">▶</div>
          </div>
        </div>

        <div className="commercial-info">
          <h2 className="commercial-title">{video.title}</h2>
          <p className="commercial-subtitle">{video.subtitle}</p>
        </div>
      </a>
    </div>
  );
};

export default CommercialCard;