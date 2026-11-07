import React from 'react';
import './WhatsAppButton.css';

// 🔥 Direct Path (No Import)
const whatsappIcon = '/assets/whatsapp.png';

const WhatsAppButton = () => {
  // 🔥 Apna WhatsApp number yahan daalein (Country code ke saath, bina + ke)
  const phoneNumber = "919820037027"; 
  const message = "Hello! I am interested in your wedding photography services.";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a 
      href={whatsappUrl} 
      className="whatsapp-float" 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <img src={whatsappIcon} alt="WhatsApp" className="whatsapp-icon-img" />
    </a>
  );
};

export default WhatsAppButton;