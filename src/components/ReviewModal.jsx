import React, { useState } from 'react';
import './ReviewModal.css';

const ReviewModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    reviewText: ''
  });
  
  const [rating, setRating] = useState(5); // Default 5 stars
  const [hoverRating, setHoverRating] = useState(0); // Hover state
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Final data jo backend jayega
    const finalData = { 
      name: formData.name, 
      reviewText: formData.reviewText, 
      rating: rating 
    };

    try {
      // Backend API call
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      });

      if (response.ok) {
        setIsSubmitted(true); // Thank You message dikhayein

        // 3 second baad modal band ho jaye aur page refresh ho jaye (taaki naya review turant dikhe)
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', reviewText: '' });
          setRating(5);
          onClose();
          window.location.reload(); // 🔥 Page reload karein naye data ke liye
        }, 3000);
      } else {
        alert("Failed to submit review. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Server connection failed.");
    }
  };
  return (
    <div className="review-modal-overlay" onClick={onClose}>
      <div className="review-modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button className="review-modal-close" onClick={onClose}>✕</button>

        {/* Header */}
        <div className="review-modal-header">
          <h2>SHARE YOUR EXPERIENCE</h2>
        </div>

        {/* Body */}
        <div className="review-modal-body">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="review-form-modal">
              
              {/* 🔥 Custom Name Field */}
              <div className="form-group">
                <label>YOUR NAMES (required)</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="e.g. Rachel & Avinash" 
                  onChange={handleChange} 
                  required 
                />
              </div>

              {/* 🔥 Interactive Star Rating */}
              <div className="form-group">
                <label>RATING</label>
                <div className="star-rating">
                  {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                      <span
                        key={starValue}
                        className={`star-btn ${starValue <= (hoverRating || rating) ? 'filled' : ''}`}
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHoverRating(starValue)}
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        ★
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Review Field */}
              <div className="form-group">
                <label>YOUR REVIEW (required)</label>
                <textarea 
                  name="reviewText" 
                  placeholder="Tell us about your experience with us..." 
                  rows="4" 
                  onChange={handleChange} 
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">Submit Review</button>
            </form>
          ) : (
            <div className="review-thankyou">
              <h3>THANK YOU!</h3>
              <p>Your review has been submitted successfully.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ReviewModal;