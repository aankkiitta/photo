import React from 'react';
import './Footer.css';

// 🔥 Direct Paths (No Imports)
const pattern1 = '/assets/pattern1.png';
const instagramIcon = '/assets/instagram.png';
const youtubeIcon = '/assets/youtube.png';

const Footer = () => {
  return (
    <footer className="site-footer">
      
      {/* Pattern Full Width */}
      <div 
        className="footer-pattern-full" 
        style={{ backgroundImage: `url(${pattern1})` }}
      ></div>

      <div className="footer-container">
        
        {/* Naya Text Section (Icons ke upar) */}
        <div className="footer-social-text">
          <h3 className="footer-social-title">TAKE A LOOK. FEEL THE STORY.</h3>
          <p className="footer-social-subtitle">Follow Us for More Beautiful Moments.</p>
        </div>

        {/* Social Icons (Center) */}
        <div className="footer-socials">
          <a href="#instagram" className="social-link" target="_blank" rel="noreferrer">
            <img src={instagramIcon} alt="Instagram" />
          </a>
          <a href="#youtube" className="social-link" target="_blank" rel="noreferrer">
            <img src={youtubeIcon} alt="YouTube" />
          </a>
        </div>

        {/* Bottom Text Section (Left & Right) */}
        <div className="footer-bottom">
          <p className="copyright-text">Fusionproduction © 2023</p>
          <p className="crafted-text">
            Crafted by{' '}
            <a href="https://avanaaa.com" target="_blank" rel="noreferrer">
              Avanaaa
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;