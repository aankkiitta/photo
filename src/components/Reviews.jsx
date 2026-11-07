import React, { useState, useEffect, useRef } from 'react';
import './Reviews.css';
import ReviewModal from './ReviewModal';

// 🔥 Direct Path (No Import)
const pattern = '/assets/pattern.png';

const RevealSection = ({ children, className = "" }) => {
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
    if (domRef.current) observer.observe(domRef.current);
    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  return (
    <div ref={domRef} className={`reveal-item ${isVisible ? 'animate-in' : ''} ${className}`}>
      {children}
    </div>
  );
};

const Reviews = () => {
  // 🔥 1. State to hold reviews from DB
  const [reviewsData, setReviewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(2);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔥 2. Fetch Reviews from Live Backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Live API URL
const response = await fetch('http://localhost:5000/api/reviews');
        const data = await response.json();
        
        // Database se 'review_text' aayega, frontend me 'text' chahiye
        const formattedData = data.map(item => ({
          id: item.id,
          name: item.name,
          rating: item.rating,
          text: item.review_text
        }));

        setReviewsData(formattedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Handle window resize for responsive slider
  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(window.innerWidth <= 768 ? 1 : 2);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = reviewsData.length > itemsToShow ? reviewsData.length - itemsToShow : 0;

  const nextSlide = () => { if (currentIndex < maxIndex) setCurrentIndex(currentIndex + 1); };
  const prevSlide = () => { if (currentIndex > 0) setCurrentIndex(currentIndex - 1); };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<span key={i} className={`star ${i <= rating ? 'filled' : ''}`}>★</span>);
    }
    return stars;
  };

  return (
    <div className="reviews-page">
      
      <RevealSection className="full-width-wrapper">
        <div className="reviews-header">
          <img src={pattern} alt="pattern" className="reviews-pattern" />
          <h1 className="reviews-title">CLIENT REVIEWS</h1>
          <p className="reviews-subtitle">What our beautiful couples say about us</p>
        </div>
      </RevealSection>

      <RevealSection className="full-width-wrapper">
        <div className="reviews-slider-wrapper">
          
          <button className="slider-arrow left-arrow" onClick={prevSlide} disabled={currentIndex === 0 || reviewsData.length === 0}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <div className="reviews-slider-container">
            {isLoading ? (
              <div className="loading-text">Loading Reviews...</div>
            ) : reviewsData.length === 0 ? (
              <div className="loading-text">No reviews yet. Be the first to share!</div>
            ) : (
              <div className="reviews-slider-track" style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}>
                {reviewsData.map((review) => (
                  <div key={review.id} className="review-slide" style={{ width: `${100 / itemsToShow}%` }}>
                    <div className="review-card">
                      <div className="review-stars">{renderStars(review.rating)}</div>
                      <p className="review-text">"{review.text}"</p>
                      <div className="review-author-info">
                        <h3 className="review-author">{review.name}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button className="slider-arrow right-arrow" onClick={nextSlide} disabled={currentIndex === maxIndex || reviewsData.length === 0}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

        </div>
      </RevealSection>

      <RevealSection className="full-width-wrapper">
        <div className="share-btn-wrapper">
          <button className="share-experience-btn" onClick={() => setIsModalOpen(true)}>
            Share Your Experience
          </button>
        </div>
      </RevealSection>

      <ReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  );
};

export default Reviews;