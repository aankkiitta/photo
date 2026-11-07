import React, { useState, useEffect, useRef } from 'react';
import './Contact.css';

// 🔥 Direct Path (No Import)
const pattern = '/assets/pattern.png';

// Reusable Reveal Component
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

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    eventDetails: '',
    weddingDates: '',
    contactNumber: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // 🔥 Live API URL
      const apiUrl = 'https://api.fusionstoryproduction.com';
      
      const response = await fetch(`${apiUrl}/api/enquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response from server:", data); 

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

  return (
    <div className="contact-page">
      
      {/* 1. Header Section */}
      <RevealSection className="full-width-wrapper">
        <div className="contact-header"> 
          <img src={pattern} alt="pattern" className="contact-pattern" />
          <h1 className="contact-title">CONTACT US</h1>
        </div>
      </RevealSection>

      {/* 4. FORM SECTION */}
      <RevealSection className="full-width-wrapper">
        <div className="contact-form-container">
          
          <div className="contact-form-box">
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="contact-form">
                
                <div className="form-group full-width">
                  <label>NAME (required)</label>
                  <input type="text" name="name" placeholder="Your Name" onChange={handleChange} required />
                </div>

                <div className="form-group full-width">
                  <label>EVENT DETAILS (required)</label>
                  <textarea name="eventDetails" placeholder="What are the tentative events / functions / timings per day?" onChange={handleChange} required></textarea>
                </div>

                <div className="form-group full-width">
                  <label>YOUR WEDDING DATES (required)</label>
                  <input type="text" name="weddingDates" placeholder="e.g. Dec 10-12, 2025" onChange={handleChange} required />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>CONTACT NUMBER (required)</label>
                    <input type="tel" name="contactNumber" placeholder="Your Number" onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>YOUR EMAIL (required)</label>
                    <input type="email" name="email" placeholder="Your Email" onChange={handleChange} required />
                  </div>
                </div>

                <button type="submit" className="submit-btn">Submit</button>
              </form>
            ) : (
              <div className="contact-thankyou-msg">
                <h2>THANK YOU</h2>
                <p>We have received your details. We will shortly connect with you.</p>
              </div>
            )}

          </div>

        </div>
      </RevealSection>

      {/* 5. Address & Contact Info Section */}
      <RevealSection className="full-width-wrapper">
        <div className="contact-info-section">
          
          <div className="info-block">
            <h3 className="info-title">INDIA</h3>
            <p className="info-text">
              mumbai maharashta<br />
              dombivli,<br />
              kalyan (E), Mumbai - 421201
            </p>
          </div>

          <div className="info-block">
            <h3 className="info-title">PHONE</h3>
            <p className="info-text">
              <a href="tel:+919820037027">+91 1234567894</a>
            </p>
          </div>

          <div className="info-block">
            <h3 className="info-title">EMAIL</h3>
            <p className="info-text">
              <a href="mailto:info@fusionstory.com">info@fusionstory.com</a>
            </p>
          </div>

        </div>
      </RevealSection>

      {/* 3. Quote Section */}
      <RevealSection className="full-width-wrapper">
        <div className="contact-quote-section">
          <p className="contact-quote">"The Beauty lies in the Details"</p>
          <p className="contact-author">— FOUNDER, FUSION PRODUCTION STORY</p>
        </div>
      </RevealSection>

    </div>
  );
};

export default Contact;