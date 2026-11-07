import React, { useState, useEffect } from 'react';
import './AutoPopupModal.css';

const AutoPopupModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    eventDetails: '',
    weddingDates: '',
    contactNumber: '',
    email: ''
  });

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('hasSeenContactModal');

    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('hasSeenContactModal', 'true');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response from server:", data); // Debugging ke liye

      if (response.ok) {
        setIsSubmitted(true); 
      } else {
        alert(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to connect to the server.");
    }
  };


  if (!isOpen) return null;

  return (
    <div className="auto-modal-overlay" onClick={handleClose}>
      <div className="auto-modal-content" onClick={(e) => e.stopPropagation()}>
        
        <button className="auto-modal-close" onClick={handleClose}>✕</button>

        {/* Header Block */}
        <div className="auto-modal-header">
          <h2>CONTACT US</h2>
        </div>

        <div className="auto-modal-body">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="auto-popup-form">
              
              <div className="popup-form-group">
                <label>NAME (required)</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Your Name" 
                  onChange={handleChange} 
                  required 
                />
              </div>

              {/* 🔥 Textarea ki jagah chota Input lagaya */}
              <div className="popup-form-group">
                <label>EVENT DETAILS (required)</label>
                <input 
                  type="text" 
                  name="eventDetails" 
                  placeholder="e.g. Haldi, Sangeet, Wedding" 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="popup-form-group">
                <label>YOUR WEDDING DATES (required)</label>
                <input 
                  type="text" 
                  name="weddingDates" 
                  placeholder="e.g. Dec 10-12, 2025" 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="popup-form-group">
                <label>CONTACT NUMBER (required)</label>
                <input 
                  type="tel" 
                  name="contactNumber" 
                  placeholder="Your Number" 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="popup-form-group">
                <label>YOUR EMAIL (required)</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Your Email" 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <button type="submit" className="popup-submit-btn">
                Submit
              </button>
            </form>
          ) : (
            <div className="popup-success-msg">
              <h3>THANK YOU</h3>
              <p>We will shortly connect with you.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AutoPopupModal;