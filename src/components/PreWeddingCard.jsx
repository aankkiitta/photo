import React from 'react';
import { Link } from 'react-router-dom';
import './PreWeddingCard.css';

const PreWeddingCard = ({ story }) => {
  // 🔥 Story ke andar 'pre-wedding' category dhoondhna
  const preWeddingCat = story.categories?.find(cat => cat.slug === "pre-wedding");

  // Agar us story mein pre-wedding images nahi hain, toh kuch mat dikhao
  if (!preWeddingCat || !preWeddingCat.images || preWeddingCat.images.length === 0) {
    return null;
  }

  return (
    <div className="prewedding-card">
      <Link to={`/pre-wedding/${story.slug}`} className="prewedding-link">
        
        <div className="prewedding-image-wrapper">
          {/* preWeddingCat.images[0] mein direct '/assets/...' path aayega */}
          <img src={preWeddingCat.images[0]} alt={story.couple} className="prewedding-image" />
          
          <div className="prewedding-hover-layer">
            <button className="view-photos-btn">VIEW PHOTOS</button>
          </div>
        </div>

        <h2 className="prewedding-card-title">{story.couple}</h2>

      </Link>
    </div>
  );
};

export default PreWeddingCard;