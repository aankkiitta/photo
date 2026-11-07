import React from 'react';
import { Link } from 'react-router-dom';
import './PhotobookCard.css';

const PhotobookCard = ({ story }) => {
  return (
    <div className="photobook-card">
      <Link to={`/photobooks/${story.slug}`} className="photobook-link">
        
        <div className="photobook-image-wrapper">
          {/* story.photobookImages[0] mein direct '/assets/...' path aayega */}
          <img src={story.photobookImages[0]} alt={story.title} className="photobook-image" />
          
          <div className="photobook-hover-layer">
            <button className="view-photos-btn">VIEW PHOTOS</button>
          </div>
        </div>

        <h2 className="photobook-title">{story.title}</h2>

      </Link>
    </div>
  );
};

export default PhotobookCard;