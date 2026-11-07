import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Faq.css';

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
      { threshold: 0.15 }
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

const Faq = () => {
  // Data Seedha Yahan Array Mein Daal Diya
  const faqData = [
    {
      id: 1,
      question: "Where is The Wedding Story based? Do you travel worldwide?",
      answer: "We are based in Mumbai (India) and Boston (USA), and we travel all across the world to shoot weddings. Some of our best weddings have been shot in locations like Istanbul, Puerto Rico, Barcelona, Dubai, Montreux, Seychelles, Marrakech among others."
    },
    {
      id: 2,
      question: "What is the typical team strength of TWS team that will be traveling to cover my wedding? Will a reduction in crew affect the cost?",
      answer: "We usually film with a crew of 3-4 cinematographers (candid style) and 2-3 photographers (candid and documentary style) along with a director, a production manager and an aerial drone operator. The crew works as one coherent team with different cameramen specializing in different lenses and styles including aerial, time-lapse and underwater filming. For a larger scale wedding, we don't recommend a reduction in the size of the crew as this is likely to affect the quality and grandeur of the film."
    },
    {
      id: 3,
      question: "How far in advance should we book you?",
      answer: "We recommend booking your date at least 6-8 months in advance, especially for peak wedding season. If your wedding is a destination wedding, even earlier is better to secure our team."
    },
    {
      id: 4,
      question: "What kind of equipment do you use?",
      answer: "We use state-of-the-art cinema-grade cameras (like ARRI, RED) and high-end lenses to ensure your film looks cinematic and timeless. We also use professional drones for aerial shots and high-quality audio equipment."
    },
    {
      id: 5,
      question: "Do you provide raw footage?",
      answer: "We do not provide raw footage as our films are heavily edited and color-graded to tell a cohesive story. However, we do provide high-resolution images and the final edited films in multiple formats."
    }
  ];

  return (
    <div className="faq-page">
      
      <RevealSection>
        <div className="faq-header">
          <img src={pattern} alt="pattern" className="faq-top-pattern" />
          <h1 className="faq-title">FREQUENTLY ASKED QUESTIONS</h1>
        </div>
      </RevealSection>

      <RevealSection>
        <div className="faq-quote-container">
          <p className="faq-quote">"The Beauty lies in the Details"</p>
        </div>
      </RevealSection>

      {/* Questions List */}
      <div className="faq-list">
        {faqData.map((item, index) => (
          <RevealSection key={item.id}>
            <div className="faq-item">
              <h2 className="faq-question">
                <span className="faq-number">{index + 1})</span> {item.question}
              </h2>
              <p className="faq-answer">{item.answer}</p>
     
              {index !== faqData.length - 1 && <hr className="faq-divider" />}
            </div>
          </RevealSection>
        ))}
      </div>

      <RevealSection>
        <Link to="/" className="back-btn">← Back to Home</Link>
      </RevealSection>

    </div>
  );
};

export default Faq;